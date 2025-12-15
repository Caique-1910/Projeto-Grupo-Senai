using System;
using System.Collections.Generic;

namespace BackEndProjeto.Models;

public partial class Usuario
{
    public int UsuarioId { get; set; }

    public string Email { get; set; } = null!;

    public string NomeUsuario { get; set; } = null!;

    public string? SenhaHash { get; set; } // Fica Nulo para usuarios que logam com o google

    public string? GoogleId { get; set; }   
}
