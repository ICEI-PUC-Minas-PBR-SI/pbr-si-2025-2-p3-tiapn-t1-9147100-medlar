package com.pucintegra.api.controller;

import com.pucintegra.api.dto.RegisterDTO;
import com.pucintegra.api.repository.PessoaRepository;
import com.pucintegra.api.model.Pessoa;
import com.pucintegra.api.model.Aluno;     
import com.pucintegra.api.model.Professor; 
import com.pucintegra.api.repository.AlunoRepository;     
import com.pucintegra.api.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AutenticacaoController {

    @Autowired
    private PessoaRepository pessoaRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // --- SEU MÉTODO DE LOGIN ORIGINAL (MANTIDO) ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senhaDigitada = dados.get("senha");

        Optional<Pessoa> usuarioOpt = pessoaRepository.findByEmailInstitucional(email);

        if (usuarioOpt.isPresent()) {
            Pessoa p = usuarioOpt.get();
            boolean senhaConfere = passwordEncoder.matches(senhaDigitada, p.getSenha());
            
            if (!senhaConfere && senhaDigitada.equals(p.getSenha())) {
                senhaConfere = true;
            }

            if (senhaConfere) {
                return ResponseEntity.ok(Map.of(
                    "message", "Login realizado com sucesso",
                    "matricula", p.getMatricula(),
                    "nome", p.getNome(),
                    "tipo", p.getTipoPessoa()
                ));
            }
        }
        return ResponseEntity.status(401).body(Map.of("error", "E-mail ou senha inválidos"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
        if (pessoaRepository.existsById(data.matricula())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Matrícula já cadastrada!"));
        }
        if (pessoaRepository.findByEmailInstitucional(data.emailInstitucional()).isPresent()) {
             return ResponseEntity.badRequest().body(Map.of("error", "E-mail já cadastrado!"));
        }

        try {
            // --- A MÁGICA ACONTECE AQUI ---
            Pessoa novaPessoa; 

            // 1. Verifica o tipo que veio do Front e cria a classe certa
            // Isso garante que o Hibernate salve na tabela ALUNO ou PROFESSOR
            String tipoTexto = data.tipoPessoa();
            if (tipoTexto != null && tipoTexto.equalsIgnoreCase("Professor")) {
                novaPessoa = new com.pucintegra.api.model.Professor();
                novaPessoa.setTipoPessoa(com.pucintegra.api.model.TipoPessoa.Professor);
            } else {
                // Se for "Aluno", "aluno" ou qualquer outra coisa, cria um Aluno
                novaPessoa = new com.pucintegra.api.model.Aluno();
                novaPessoa.setTipoPessoa(com.pucintegra.api.model.TipoPessoa.Aluno);
            }

            // 2. Preenche os dados comuns (Herança)
            novaPessoa.setNome(data.nome());
            novaPessoa.setCpf(data.cpf());
            novaPessoa.setMatricula(data.matricula());
            novaPessoa.setEmailInstitucional(data.emailInstitucional());
            
            String senhaCriptografada = passwordEncoder.encode(data.senha());
            novaPessoa.setSenha(senhaCriptografada);

            // 3. Salva
            // O repositório é de Pessoa, mas como o objeto é 'Aluno', 
            // o JPA salva na tabela PESSOA E na tabela ALUNO automaticamente.
            pessoaRepository.save(novaPessoa);

            return ResponseEntity.ok(Map.of("message", "Usuário cadastrado com sucesso!"));
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao cadastrar: " + e.getMessage()));
        }
    }
}