using Back_End.Service;
using BackEndProjeto.Data;
using Microsoft.AspNetCore.Mvc;

namespace BackEndProjeto.Controllers
{
    public class EsqueciSenhaController : Controller
    {
        private readonly AppDbContext _context;
        public EsqueciSenhaController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task <IActionResult> EnviarLink(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                ViewBag.Erro = "Digite um e-mail válido.";
                return View("Index");
            }
            
            EmailService emailService = new EmailService(email);
            await emailService.EnviarEmail();

            var user = _context.Usuarios.FirstOrDefault(u => u.Email == email);
            if(user == null ){
                ViewBag.Erro("E-mail não encontrado.");
                return View("Index");
            }
                
            return RedirectToAction("Index");
        }
    }
}
