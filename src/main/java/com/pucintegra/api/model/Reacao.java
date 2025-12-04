package com.pucintegra.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reacao")
public class Reacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Reacao")
    private Long idReacao; 
    
    @Column(name = "Id_Resposta")
    private Long idResposta; // Link correto com a resposta

    @Column(name = "Matricula_Pessoa", nullable = false)
    private String matriculaPessoa;

    @Column(name = "Tipo_Reacao", nullable = false)
    private String tipoReacao;

    @Column(name = "Data_Reacao")
    private LocalDateTime dataReacao;

    @PrePersist
    protected void onCreate() {
        dataReacao = LocalDateTime.now();
    }
}