package com.pucintegra.api.repository;

import com.pucintegra.api.model.Resposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
    List<Resposta> findByIdPergunta(Long idPergunta);
    List<Resposta> findByMatriculaPessoa(String matriculaPessoa);
    // Conta quantas respostas a pessoa deu
    long countByMatriculaPessoa(String matriculaPessoa);
}