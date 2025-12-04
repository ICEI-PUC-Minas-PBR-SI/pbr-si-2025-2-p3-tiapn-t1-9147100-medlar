package com.pucintegra.api.dto;

import java.time.LocalDateTime;

public record RespostaFeedDTO(
    Long idResposta,
    String conteudo,
    LocalDateTime dataCriacao,
    String matriculaAutor, // Ou nome se preferir buscar
    Long likes,
    Long dislikes,
    String minhaReacao // "LIKE", "DISLIKE" ou null
) {}