package com.pucintegra.api.controller;

import com.pucintegra.api.model.Pergunta;
import com.pucintegra.api.model.Resposta;
import com.pucintegra.api.repository.PerguntaRepository;
import com.pucintegra.api.repository.RespostaRepository;
import com.pucintegra.api.repository.ReacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PerguntaController {

    @Autowired
    private PerguntaRepository perguntaRepository;

    @Autowired
    private RespostaRepository respostaRepository;

    @Autowired
    private ReacaoRepository reacaoRepository;

    // POST: Criar Pergunta
    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(
            @RequestParam("matricula_aluno") String matricula,
            @RequestParam("titulo") String titulo,
            @RequestParam("conteudo") String conteudo,
            @RequestParam("id_disciplina") int idDisciplina,
            @RequestParam(value = "palavras_chave", required = false) String tags,
            @RequestParam(value = "anexos", required = false) List<MultipartFile> anexos) {
        
        try {
            Pergunta p = new Pergunta();
            p.setMatriculaAluno(matricula);
            p.setTitulo(titulo);
            p.setConteudo(conteudo);
            p.setIdDisciplina(idDisciplina);
            perguntaRepository.save(p);
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erro: " + e.getMessage()));
        }
    }

    // GET: Minhas Perguntas (Perfil)
    @GetMapping("/users/{matricula}/questions")
    public ResponseEntity<?> getUserQuestions(@PathVariable String matricula) {
        List<Pergunta> lista = perguntaRepository.findByMatriculaAluno(matricula);
        return ResponseEntity.ok(lista);
    }
    
    // GET: Minhas Respostas (Perfil)
    @GetMapping("/users/{matricula}/answers")
    public ResponseEntity<?> getUserAnswers(@PathVariable String matricula) {
        List<Resposta> lista = respostaRepository.findByMatriculaPessoa(matricula);
        return ResponseEntity.ok(lista);
    }

    // GET: Listar respostas de uma pergunta (ENRIQUECIDAS COM LIKES)
    // --- ESTE É O ÚNICO MÉTODO PARA ESSA ROTA AGORA ---
    @GetMapping("/questions/{id}/answers")
    public ResponseEntity<?> getAnswersByQuestion(
            @PathVariable Long id,
            @RequestParam(required = false) String matriculaUsuario
    ) {
        List<Resposta> respostas = respostaRepository.findByIdPergunta(id);
        
        List<com.pucintegra.api.dto.RespostaFeedDTO> dtos = new java.util.ArrayList<>();

        for (Resposta r : respostas) {
            Long likes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "LIKE");
            Long dislikes = reacaoRepository.countByIdRespostaAndTipoReacao(r.getIdResposta(), "DISLIKE");

            String minhaReacao = null;
            if (matriculaUsuario != null) {
                var reacaoOpt = reacaoRepository.findByIdRespostaAndMatriculaPessoa(r.getIdResposta(), matriculaUsuario);
                if (reacaoOpt.isPresent()) {
                    minhaReacao = reacaoOpt.get().getTipoReacao();
                }
            }

            dtos.add(new com.pucintegra.api.dto.RespostaFeedDTO(
                r.getIdResposta(),
                r.getConteudo(),
                r.getDataCriacao(),
                r.getMatriculaPessoa(),
                likes,
                dislikes,
                minhaReacao
            ));
        }

        return ResponseEntity.ok(dtos);
    }

    // GET: Buscar Pergunta Única
    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        return perguntaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}