using System.Net.Http;
using System.Threading.Tasks;

namespace BackEndProjeto.Services
{
    public class ApiPokemonService
    {
        private readonly HttpClient _httpClient;

        public ApiPokemonService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://pokeapi.co/api/v2/");
        }

        public async Task<bool> NomeValidoAsync(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
                return false;

            if (nome.Contains(' '))
            {
                nome = nome.Replace(" ", "-");
            }

            try
            {
                var response = await _httpClient.GetAsync($"pokemon/{nome.ToLower()}");
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }
    }
}
