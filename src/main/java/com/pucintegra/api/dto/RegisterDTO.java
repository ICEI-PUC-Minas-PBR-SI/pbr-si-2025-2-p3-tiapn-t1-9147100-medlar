package com.pucintegra.api.dto;

// Removemos o import do Enum pois vamos usar String direto
// import com.pucintegra.api.model.TipoPessoa; 

public record RegisterDTO(
    String nome,
    String cpf,
    String matricula,
    String emailInstitucional,
    String senha,
    String tipoPessoa // <-- MUDANÇA: Agora é String para aceitar "aluno" ou "Aluno"
) {}