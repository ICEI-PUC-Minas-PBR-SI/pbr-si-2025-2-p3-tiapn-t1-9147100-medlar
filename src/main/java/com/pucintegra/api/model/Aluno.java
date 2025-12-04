package com.pucintegra.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "aluno")
@PrimaryKeyJoinColumn(name = "Matricula_Aluno") // Liga com a PK da Pessoa
public class Aluno extends Pessoa {
    
    @Column(name = "Eh_Monitor")
    private Boolean ehMonitor = false;

    // Getters e Setters
    public Boolean getEhMonitor() { return ehMonitor; }
    public void setEhMonitor(Boolean ehMonitor) { this.ehMonitor = ehMonitor; }
}