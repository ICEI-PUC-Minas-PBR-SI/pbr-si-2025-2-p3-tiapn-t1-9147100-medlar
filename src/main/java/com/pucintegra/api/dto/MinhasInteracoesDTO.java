package com.pucintegra.api.dto; // Ou model

import java.time.LocalDateTime;

public interface MinhasInteracoesDTO {
    Long getId();
    String getTipo();   // LIKE ou DISLIKE
    String getTitulo(); // Título da pergunta
    LocalDateTime getData();
}