package com.pucintegra.api.model;
import com.pucintegra.api.model.TipoPessoa;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Para Aluno e Professor
@Table(name = "pessoa")
public class Pessoa {

    @Id
    @Column(length = 15)
    private String matricula;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "email_institucional", nullable = false, unique = true, length = 100)
    private String emailInstitucional;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa", nullable = false)
    private TipoPessoa tipoPessoa;

    // --- NOVOS CAMPOS ADICIONADOS PARA O PERFIL ---
    @Column(name = "biografia", columnDefinition = "TEXT")
    private String biografia;

    @Column(name = "foto_perfil")
    private String fotoPerfil;
    // ----------------------------------------------

    // Construtor Vazio (Obrigatório pro JPA)
    public Pessoa() {}

    // Getters e Setters
    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmailInstitucional() { return emailInstitucional; }
    public void setEmailInstitucional(String emailInstitucional) { this.emailInstitucional = emailInstitucional; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public TipoPessoa getTipoPessoa() { return tipoPessoa; }
    public void setTipoPessoa(TipoPessoa tipoPessoa) { this.tipoPessoa = tipoPessoa; }

    // --- NOVOS GETTERS E SETTERS ---
    public String getBiografia() { return biografia; }
    public void setBiografia(String biografia) { this.biografia = biografia; }

    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }
}