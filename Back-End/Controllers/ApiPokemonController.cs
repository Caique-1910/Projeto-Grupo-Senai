using BackEndProjeto.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BackEndProjeto.Models;

namespace Back_End.Controllers
{
    public class ApiPokemonController : Controller
    {
        private readonly ApiPokemonService _apiPokemonService;

        public ApiPokemonController(ApiPokemonService apiPokemonService)
        {
            _apiPokemonService = apiPokemonService;
        }

        [HttpPost]
        public async Task<IActionResult> MomentoCriacao(Pokemon model)
        {
            bool nomeValido = await _apiPokemonService.NomeValidoAsync(model.Nome);

            if (!nomeValido)
            {
                ModelState.AddModelError("", "Digite um Pokémon que exista.");
                return View(model);
            }

            return View(model);
        }
    }
}
