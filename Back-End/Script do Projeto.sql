CREATE DATABASE Pokedex;
GO

USE Pokedex;
GO

CREATE TABLE Usuario (
    UsuarioId INT IDENTITY PRIMARY KEY NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    NomeUsuario VARCHAR(50) NOT NULL,
    SenhaHash VARCHAR(100) NOT NULL
);
GO

CREATE TABLE Pokemon (
    PokemonId INT IDENTITY PRIMARY KEY NOT NULL,
    Nome VARCHAR(50) NOT NULL,
    Tipo VARCHAR(30) NOT NULL,
    Tipo2 VARCHAR(30) NULL,
    Nivel INT NOT NULL,
    IdUsuario INT NOT NULL,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(UsuarioId)
);
GO

CREATE PROCEDURE CadastrarUsuario
    @Email VARCHAR(100),
    @NomeUsuario VARCHAR(50),
    @SenhaTextoSimples VARCHAR(100)
AS
BEGIN
    DECLARE @SenhaHashBase64 VARCHAR(100);

    SELECT @SenhaHashBase64 = CAST(N'' AS XML).value(
        'xs:base64Binary(xs:hexBinary(sql:column("HASHED")))',
        'VARCHAR(100)'
    )
    FROM (SELECT HASHBYTES('SHA2_256', @SenhaTextoSimples) AS HASHED) AS X;

    INSERT INTO Usuario (Email, NomeUsuario, SenhaHash)
    VALUES (@Email, @NomeUsuario, @SenhaHashBase64);
END
GO

CREATE PROCEDURE AutenticarUsuario
    @Email VARCHAR(100),
    @SenhaTextoSimples VARCHAR(100)
AS
BEGIN
    DECLARE @StoredHash VARCHAR(100);
    DECLARE @InputHash VARCHAR(100);
    DECLARE @UserId INT;
    DECLARE @UserName VARCHAR(50);

    SELECT 
        @StoredHash = SenhaHash,
        @UserId = UsuarioId,
        @UserName = NomeUsuario
    FROM Usuario
    WHERE Email = @Email;

    IF @StoredHash IS NOT NULL
    BEGIN
        SELECT @InputHash = CAST(N'' AS XML).value(
            'xs:base64Binary(xs:hexBinary(sql:column("HASHED")))',
            'VARCHAR(100)'
        )
        FROM (SELECT HASHBYTES('SHA2_256', @SenhaTextoSimples) AS HASHED) AS X;

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

CREATE PROCEDURE CadastrarPokemon
    @Nome VARCHAR(50),
    @Tipo VARCHAR(30),
    @Tipo2 VARCHAR(30) = NULL,
    @Nivel INT,
    @IdUsuario INT
AS
BEGIN
    INSERT INTO Pokemon (Nome, Tipo, Tipo2, Nivel, IdUsuario)
    VALUES (@Nome, @Tipo, @Tipo2, @Nivel, @IdUsuario);
END
GO

EXEC CadastrarUsuario 'dudubernal@example.com', 'dudubernal', 'Edu123';
GO

EXEC AutenticarUsuario 'dudubernal@example.com', 'Edu123';
GO

EXEC AutenticarUsuario 'dudubernal@example.com', 'Edu1234';
GO

SELECT * FROM Usuario;
GO

EXEC CadastrarUsuario '', 'poketest', 'teste';
GO
teste@pokedex.com
EXEC CadastrarUsuario 'teste2@teste.com', 'teste2', 'teste2';
GO
