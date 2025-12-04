package com.pucintegra.api.controller;

import com.pucintegra.api.model.Pergunta;
import com.pucintegra.api.model.Pessoa;
import com.pucintegra.api.repository.PerguntaRepository;
import com.pucintegra.api.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    private PerguntaRepository perguntaRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @GetMapping("/questions")
    public ResponseEntity<List<Map<String, Object>>> getFeed(
            @RequestParam(required = false) Integer disciplinaId,
            @RequestParam(required = false) String tema
    ) {
        List<Pergunta> perguntas;

        // Lógica de Filtro
        if (disciplinaId != null) {
            perguntas = perguntaRepository.findByIdDisciplinaOrderByDataCriacaoDesc(disciplinaId);
        } else if (tema != null && !tema.isEmpty()) {
            perguntas = perguntaRepository.findByTituloContainingOrConteudoContainingOrderByDataCriacaoDesc(tema, tema);
        } else {
            perguntas = perguntaRepository.findAllByOrderByDataCriacaoDesc();
        }

        // Monta a resposta (DTO manual)
        List<Map<String, Object>> feedResponse = new ArrayList<>();

        for (Pergunta p : perguntas) {
            Map<String, Object> item = new HashMap<>();
            item.put("idPergunta", p.getIdPergunta());
            item.put("titulo", p.getTitulo());
            item.put("conteudo", p.getConteudo());
            item.put("dataCriacao", p.getDataCriacao());
            item.put("idDisciplina", p.getIdDisciplina());
            item.put("matriculaAluno", p.getMatriculaAluno());
            
            Optional<Pessoa> autor = pessoaRepository.findById(p.getMatriculaAluno());
            if (autor.isPresent()) {
                item.put("autorNome", autor.get().getNome());
                item.put("autorFoto", autor.get().getFotoPerfil());
            } else {
                item.put("autorNome", "Usuário Desconhecido");
            }
            feedResponse.add(item);
        }

        return ResponseEntity.ok(feedResponse);
    }
}