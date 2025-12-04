using BackEndProjeto.Data;
using Microsoft.AspNetCore.Mvc;

namespace BackEndProjeto.Controllers
{
    public class PokemonController : Controller
    {
        private readonly AppDbContext _context;
        public PokemonController(AppDbContext context)
        {
            _context = context;
        }

        
    }
}