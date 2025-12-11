using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using BackEndProjeto.Data;
using BackEndProjeto.Models;
using BackEndProjeto.Services;
using System.Security.Claims;

namespace BackEndProjeto.Controllers
{
    public class LoginController : Controller
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        // TELA DE LOGIN
        public IActionResult Index()
        {
            return View();
        }

        // LOGIN COM E-MAIL E SENHA
        [HttpPost]
        public IActionResult Entrar(string email, string senha)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(senha))
            {
                ViewBag.Erro = "Preencha todos os campos.";
                return View("Index");
            }

            // Hash da senha digitada
            byte[] senhaBytes = HashService.GerarHashBytes(senha);
            string senhaHash = Convert.ToBase64String(senhaBytes);

            var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario == null || usuario.SenhaHash != senhaHash)
            {
                ViewBag.Erro = "E-mail ou senha incorretos.";
                return View("Index");
            }

            // Salvar sessão
            HttpContext.Session.SetString("UsuarioNome", usuario.NomeUsuario);
            HttpContext.Session.SetInt32("UsuarioId", usuario.UsuarioId);

            return RedirectToAction("Index", "Home");
        }

        // LOGIN VIA GOOGLE
        public IActionResult LoginGoogle()
        {
            var propriedades = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleCallback")
            };

            // Abre a tela de login do Google
            return Challenge(propriedades, GoogleDefaults.AuthenticationScheme);
        }

        // RETORNO DO GOOGLE
        public async Task<IActionResult> GoogleCallback()
        {
            // Essa autenticação precisa usar o esquema do Google
            var resultado = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (!resultado.Succeeded)
                return RedirectToAction("Index");

            var claims = resultado.Principal.Identities.First().Claims.ToList();

            string email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            string nome = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? "Usuário Google";

            if (email == null)
                return RedirectToAction("Index");

            // Se o usuário ainda não existe no banco ele cria soq com a senha vazia por conta que essa API usa o cookies
            // do negocio pra logar
            var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario == null)
            {
                usuario = new Usuario
                {
                    Email = email,
                    NomeUsuario = nome,
                    SenhaHash = "" // sem nada pq o google vai usar os cookies(nao e os de comer)
                };

                _context.Usuarios.Add(usuario);
                _context.SaveChanges();
            }

            // Essa identity pega todas as claims vindas da conta Google
            var identity = new ClaimsIdentity(resultado.Principal.Identity, resultado.Principal.Claims);

            // Cria cookie de login local, que mantém o usuário autenticado no site
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity)
            );

            // Armazena sessão usada no site
            HttpContext.Session.SetString("UsuarioNome", usuario.NomeUsuario);
            HttpContext.Session.SetInt32("UsuarioId", usuario.UsuarioId);

            return RedirectToAction("Index", "Home");
        }

        // LOGOUT
        public IActionResult Sair()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}
