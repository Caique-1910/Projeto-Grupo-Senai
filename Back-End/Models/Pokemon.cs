using System;
using System.Collections.Generic;

namespace BackEndProjeto.Models;

public partial class Pokemon
{
    public int PokemonId { get; set; }

    public string Nome { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public string? Tipo2 { get; set; }

    public int Nivel { get; set; }

    // FK
     public int IdUsuario { get; set; }
}
