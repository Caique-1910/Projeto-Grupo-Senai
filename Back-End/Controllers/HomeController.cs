using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BackEndProjeto.Models;

namespace BackEndProjeto.Controllers;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        if (HttpContext.Session.GetString("UsuarioNome") == null)
        {
            return RedirectToAction("Index", "Login");
        }

        ViewBag.Usuario = HttpContext.Session.GetString("UsuarioNome");
        return View();
    }
}
