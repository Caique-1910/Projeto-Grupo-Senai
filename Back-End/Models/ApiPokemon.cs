using System;
using System.Collections.Generic;

namespace BackEndProjeto.Models;
public partial class ApiPokemon
{
    public int PokemonId { get; set; }
    public string Nome { get; set; } = null!;
    public string Tipo1 { get; set; } = null!;
    public string? Tipo2 { get; set; }


}