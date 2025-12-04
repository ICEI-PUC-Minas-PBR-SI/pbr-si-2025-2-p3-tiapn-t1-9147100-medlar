package com.pucintegra.api.repository;

import com.pucintegra.api.model.Pergunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {
    List<Pergunta> findByMatriculaAluno(String matriculaAluno);
    //Conta quantas perguntas o aluno fez
    long countByMatriculaAluno(String matriculaAluno);
    
    // Lista todas ordenadas
    List<Pergunta> findAllByOrderByDataCriacaoDesc();

    // Filtra por ID da Disciplina
    List<Pergunta> findByIdDisciplinaOrderByDataCriacaoDesc(Integer idDisciplina);

    // Filtra por palavra no Título OU Conteúdo (Para a barra lateral de categorias)
    List<Pergunta> findByTituloContainingOrConteudoContainingOrderByDataCriacaoDesc(String titulo, String conteudo);
}