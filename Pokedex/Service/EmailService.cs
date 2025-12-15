using System.Net;
using System.Net.Mail;
using BackEndProjeto.Services;
namespace Back_End.Service
{
    public class EmailService
    {
        public readonly string _emailDestino;
        public int CodigoGerado{get; private set;}
        public EmailService(string construtorDestino)
        {
            _emailDestino = construtorDestino;

            CodigoGerado = new Random().Next(10000, 99999);

        }

        public async Task EnviarEmail()
        {
            var smtp = new SmtpClient("smtp.gmail.com"){
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential("noreplypokedex@gmail.com","leecmfeqprmdaqfx" )
                
            };

            var Email = new MailMessage("noreplypokedex@gmail.com", _emailDestino)
            {
                Subject = "Código para alterar senha", 
                Body = $"Seu código para redefinir senha é: {CodigoGerado}",
                IsBodyHtml = true
            };

            await smtp.SendMailAsync(Email);
        } 
    }
}