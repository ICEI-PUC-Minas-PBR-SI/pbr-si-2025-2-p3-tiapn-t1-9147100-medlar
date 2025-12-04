package com.pucintegra.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resposta")
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_resposta")
    private Long idResposta;

    // --- ALTERAÇÃO AQUI: De Integer para Long ---
    @Column(name = "id_pergunta", nullable = false)
    private Long idPergunta; 

    @Column(name = "matricula_pessoa", nullable = false)
    private String matriculaPessoa;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "is_accepted")
    private Boolean isAccepted = false;

    @Column(length = 20)
    private String status = "Visivel";

    public Long getIdResposta() { return idResposta; }
    public void setIdResposta(Long idResposta) { this.idResposta = idResposta; }
    
    public Long getIdPergunta() { return idPergunta; }
    public void setIdPergunta(Long idPergunta) { this.idPergunta = idPergunta; }

    public String getMatriculaPessoa() { return matriculaPessoa; }
    public void setMatriculaPessoa(String matriculaPessoa) { this.matriculaPessoa = matriculaPessoa; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}