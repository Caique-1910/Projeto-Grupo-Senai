using BackEndProjeto.Data;
using Microsoft.AspNetCore.Mvc;
using BackEndProjeto.Models;
using BackEndProjeto.Services;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndProjeto.Controllers
{
    public class PokemonController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ApiPokemonService _apiPokemonService;

        public PokemonController(AppDbContext context, ApiPokemonService apiPokemonService)
        {
            _context = context;
            _apiPokemonService = apiPokemonService;
        }

        // Ação para criar ou editar um Pokémon (POST via form HTML)
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Pokemon pokemon)
        {
            var usuarioId = HttpContext.Session.GetInt32("UsuarioId");
            if (usuarioId == null)
            {
                TempData["Error"] = "Usuário não logado.";
                return RedirectToAction("Index", "Home");
            }

            if (string.IsNullOrEmpty(pokemon.Nome) || string.IsNullOrEmpty(pokemon.Tipo))
            {
                TempData["Error"] = "Nome e Tipo são obrigatórios.";
                return RedirectToAction("Index", "Home");
            }

            bool nomeValido = await _apiPokemonService.NomeValidoAsync(pokemon.Nome);
            if (!nomeValido)
            {
                TempData["Error"] = "Esse Pokémon não existe";
                return RedirectToAction("Index", "Home");
            }



            pokemon.IdUsuario = usuarioId.Value;

            if (pokemon.PokemonId > 0)
            {
                // Editar Pokémon existente
                var existingPokemon = _context.Pokemons.FirstOrDefault(p => p.PokemonId == pokemon.PokemonId && p.IdUsuario == usuarioId);
                if (existingPokemon == null)
                {
                    TempData["Error"] = "Pokémon não encontrado.";
                    return RedirectToAction("Index", "Home");
                }

                existingPokemon.Nome = pokemon.Nome;
                existingPokemon.Tipo = pokemon.Tipo;
                existingPokemon.Tipo2 = pokemon.Tipo2;
                _context.SaveChanges();
                TempData["Success"] = "Pokémon editado com sucesso!";
            }
            else
            {
                // Criar novo Pokémon
                _context.Pokemons.Add(pokemon);
                _context.SaveChanges();
                TempData["Success"] = "Pokémon adicionado com sucesso!";
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public IActionResult Delete(int pokemonId)
        {
            var usuarioId = HttpContext.Session.GetInt32("UsuarioId");
            if (usuarioId == null)
            {
                TempData["Error"] = "Usuário não logado.";
                return RedirectToAction("Index", "Home");
            }

            var pokemon = _context.Pokemons.FirstOrDefault(p => p.PokemonId == pokemonId && p.IdUsuario == usuarioId);
            if (pokemon == null)
            {
                TempData["Error"] = "Pokémon não encontrado.";
                return RedirectToAction("Index", "Home");
            }

            _context.Pokemons.Remove(pokemon);
            _context.SaveChanges();

            return RedirectToAction("Index", "Home");
        }
    }
}