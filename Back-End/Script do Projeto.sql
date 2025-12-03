CREATE DATABASE Pokedex;
GO

USE Pokedex;
GO

--------------------------------------------
-- TABELA USUARIO 
--------------------------------------------
CREATE TABLE Usuario (
    UsuarioId INT IDENTITY PRIMARY KEY NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    NomeUsuario VARCHAR(50) NOT NULL,
    SenhaHash VARCHAR(64) NOT NULL  -- SHA2_256 = 64 caracteres
);
GO

--------------------------------------------
-- TABELA POKEMON 
--------------------------------------------
CREATE TABLE Pokemon (
    PokemonId INT IDENTITY PRIMARY KEY NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Tipo VARCHAR(30) NOT NULL,
    Tipo2 VARCHAR(30) NULL,
    Nivel INT NOT NULL
);
GO

--------------------------------------------
-- PROCEDIMENTO PARA CADASTRAR USUÁRIO
--------------------------------------------
CREATE PROCEDURE CadastrarUsuario
    @Email VARCHAR(100),
    @NomeUsuario VARCHAR(50),
    @SenhaTextoSimples VARCHAR(100)
AS
BEGIN
    DECLARE @SenhaHashHex VARCHAR(64);

    -- SHA2_256 gera 64 caracteres hex
    SET @SenhaHashHex = CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', @SenhaTextoSimples), 2);

    INSERT INTO Usuario (Email, NomeUsuario, SenhaHash)
    VALUES (@Email, @NomeUsuario, @SenhaHashHex);
END
GO

--------------------------------------------
-- PROCEDIMENTO PARA AUTENTICAR USUÁRIO 
--------------------------------------------
CREATE PROCEDURE AutenticarUsuario
    @Email VARCHAR(100),
    @SenhaTextoSimples VARCHAR(100)
AS
BEGIN
    DECLARE @StoredHash VARCHAR(64);
    DECLARE @InputHash VARCHAR(64);
    DECLARE @UserId INT;
    DECLARE @UserName VARCHAR(50);

    -- Obter hash armazenado
    SELECT 
        @StoredHash = SenhaHash,
        @UserId = UsuarioId,
        @UserName = NomeUsuario
    FROM Usuario
    WHERE Email = @Email;

    -- Verifica se o usuário existe
    IF @StoredHash IS NOT NULL
    BEGIN
        -- Gerar o hash da senha informada
        SET @InputHash = CONVERT(VARCHAR(64), HASHBYTES('SHA2_256', @SenhaTextoSimples), 2);

        -- Comparar hash com hash armazenado
        IF @InputHash = @StoredHash
        BEGIN
            SELECT 
                'Autenticação bem-sucedida' AS Resultado, 
                @UserId AS UsuarioId, 
                @UserName AS NomeUsuario;
        END
        ELSE
        BEGIN
            SELECT 'Senha incorreta' AS Resultado;
        END
    END
    ELSE
    BEGIN
        SELECT 'Usuário não encontrado' AS Resultado;
    END
END
GO

--------------------------------------------
-- PROCEDIMENTO CADASTRAR POKEMON 
--------------------------------------------
CREATE PROCEDURE CadastrarPokemon
    @Nome VARCHAR(50),
    @Tipo VARCHAR(30),
    @Tipo2 VARCHAR(30) = NULL,
    @Nivel INT
AS
BEGIN
    INSERT INTO Pokemon (Nome, Tipo, Tipo2, Nivel)
    VALUES (@Nome, @Tipo, @Tipo2, @Nivel);
END
GO

--------------------------------------------
-- TESTES
--------------------------------------------

-- Cadastrando usuário
EXEC CadastrarUsuario 'dudubernal@example.com', 'dudubernal', 'Edu123';
GO

-- Login correto
EXEC AutenticarUsuario 'dudubernal@example.com', 'Edu123';
GO

-- Login errado
EXEC AutenticarUsuario 'dudubernal@example.com', 'Edu1234';
GO

-- Cadastro de pokémon
EXEC CadastrarPokemon 'Pikachu', 'Elétrico', NULL, 15;
EXEC CadastrarPokemon 'Charizard', 'Fogo', 'Voador', 56;
GO

-- Ver usuários
SELECT * FROM Usuario;

-- Novo teste de cadastro
EXEC CadastrarUsuario 'teste@pokedex.com', 'poketest', 'teste';
GO
