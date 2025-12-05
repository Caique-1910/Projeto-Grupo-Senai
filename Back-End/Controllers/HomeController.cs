using System;
using System.Collections.Generic;
using BackEndProjeto.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEndProjeto.Data;

namespace BackEndProjeto.Controllers;

public class HomeController : Controller
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    public ActionResult Index()
    {
        if (HttpContext.Session.GetString("UsuarioNome") == null)
        {
            return RedirectToAction("Index", "Login");
        }

        ViewBag.Usuario = HttpContext.Session.GetString("UsuarioNome");

        // Carrega os Pokémons do usuário logado
        var usuarioId = HttpContext.Session.GetInt32("UsuarioId");
        if (usuarioId.HasValue)
        {
            var pokemons = _context.Pokemons.Where(p => p.IdUsuario == usuarioId.Value).ToList();
            ViewBag.Pokemons = pokemons;
        }
        else
        {
            ViewBag.Pokemons = new List<Pokemon>();
        }

        return View();
    }
}