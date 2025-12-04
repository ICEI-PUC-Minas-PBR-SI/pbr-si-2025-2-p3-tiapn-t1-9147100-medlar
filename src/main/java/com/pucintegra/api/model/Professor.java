package com.pucintegra.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "professor")
@PrimaryKeyJoinColumn(name = "Matricula_Professor") // Liga com a PK da Pessoa
public class Professor extends Pessoa {
    
    @Column(name = "Id_Disciplina_Principal")
    private Integer idDisciplinaPrincipal;

    // Getters e Setters
    public Integer getIdDisciplinaPrincipal() { return idDisciplinaPrincipal; }
    public void setIdDisciplinaPrincipal(Integer idDisciplinaPrincipal) { this.idDisciplinaPrincipal = idDisciplinaPrincipal; }
}