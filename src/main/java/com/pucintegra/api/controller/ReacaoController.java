package com.pucintegra.api.controller;

import com.pucintegra.api.dto.MinhasInteracoesDTO;
import com.pucintegra.api.model.Reacao;
import com.pucintegra.api.repository.ReacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/reacoes")
public class ReacaoController {

    @Autowired
    private ReacaoRepository reacaoRepository;

    // Salvar Reação (Real)
    @PostMapping
    public ResponseEntity<?> salvarReacao(@RequestBody Reacao reacao) {
        try {
            // Verifica se já existe reação desse usuário para essa resposta (evitar duplicidade)
            // Lógica simplificada: Apenas salva. O banco barra duplicidade pelo UNIQUE KEY.
            reacaoRepository.save(reacao);
            return ResponseEntity.ok(Map.of("message", "Reação registrada!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Erro ao reagir."));
        }
    }

    // Buscar interações para o Perfil (Real)
    @GetMapping("/usuario/{matricula}")
    public ResponseEntity<List<MinhasInteracoesDTO>> getMinhasReacoes(@PathVariable String matricula) {
        List<MinhasInteracoesDTO> lista = reacaoRepository.findInteracoesPorMatricula(matricula);
        return ResponseEntity.ok(lista);
    }
}