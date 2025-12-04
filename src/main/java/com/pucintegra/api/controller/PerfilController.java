package com.pucintegra.api.controller;

import com.pucintegra.api.model.Pessoa;
import com.pucintegra.api.repository.PessoaRepository;
import com.pucintegra.api.repository.PerguntaRepository;
import com.pucintegra.api.repository.RespostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class PerfilController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PerguntaRepository perguntaRepository;

    @Autowired
    private RespostaRepository respostaRepository;

    // GET: Carregar dados do perfil
    @GetMapping("/{matricula}")
    public ResponseEntity<?> getProfile(@PathVariable String matricula) {
        Optional<Pessoa> userOpt = pessoaRepository.findById(matricula);
        
        if (userOpt.isPresent()) {
            Pessoa p = userOpt.get();
            
            // --- CONTAGEM REAL NO BANCO DE DADOS ---
            long qtdPerguntas = perguntaRepository.countByMatriculaAluno(matricula);
            long qtdRespostas = respostaRepository.countByMatriculaPessoa(matricula);

            Map<String, Object> response = new HashMap<>();
            response.put("user", p);
            response.put("stats", Map.of("questions", qtdPerguntas, "answers", qtdRespostas));
            
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    // PUT: Atualizar perfil (com foto)
    @PutMapping("/{matricula}")
    public ResponseEntity<?> updateProfile(
            @PathVariable String matricula,
            @RequestParam(value = "nome", required = false) String nome,
            @RequestParam(value = "biografia", required = false) String biografia,
            @RequestParam(value = "foto_perfil", required = false) MultipartFile foto) {

        Optional<Pessoa> userOpt = pessoaRepository.findById(matricula);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        Pessoa p = userOpt.get();
        if (nome != null && !nome.isEmpty()) p.setNome(nome);
        if (biografia != null) p.setBiografia(biografia);

        if (foto != null && !foto.isEmpty()) {
            try {
                String fileName = matricula + "_" + foto.getOriginalFilename();
                Path path = Paths.get("src/main/resources/static/uploads/" + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, foto.getBytes());
                p.setFotoPerfil("/uploads/" + fileName); 
            } catch (IOException e) {
                return ResponseEntity.internalServerError().body("Erro ao salvar foto");
            }
        }

        pessoaRepository.save(p);
        return ResponseEntity.ok(p);
    }
}