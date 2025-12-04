package com.pucintegra.api.controller;

import com.pucintegra.api.model.Resposta;
import com.pucintegra.api.repository.RespostaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RespostaController {

    @Autowired
    private RespostaRepository respostaRepository;

    @PostMapping("/answers")
    public ResponseEntity<?> createAnswer(@RequestBody Resposta resposta) {
        try {
            // O ID e Data são gerados automáticos
            respostaRepository.save(resposta);
            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao salvar: " + e.getMessage());
        }
    }
}