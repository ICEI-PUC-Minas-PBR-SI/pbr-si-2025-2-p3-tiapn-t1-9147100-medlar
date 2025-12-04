package com.pucintegra.api.repository;

import com.pucintegra.api.model.Reacao;
import com.pucintegra.api.dto.MinhasInteracoesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository; 
import java.util.Optional;
import java.util.List;

@Repository
public interface ReacaoRepository extends JpaRepository<Reacao, Long> {
    Optional<Reacao> findByIdRespostaAndMatriculaPessoa(Long idResposta, String matriculaPessoa);
    Long countByIdRespostaAndTipoReacao(Long idResposta, String tipoReacao);
    
    // Busca o Título da Pergunta ATRAVÉS da Resposta
    @Query(value = """
        SELECT 
            r.Id_Reacao AS id, 
            r.Tipo_Reacao AS tipo, 
            r.Data_Reacao AS data,
            p.Titulo AS titulo
        FROM reacao r
        INNER JOIN resposta res ON r.Id_Resposta = res.Id_Resposta
        INNER JOIN pergunta p ON res.Id_Pergunta = p.Id_Pergunta
        WHERE r.Matricula_Pessoa = :matricula
        ORDER BY r.Data_Reacao DESC
    """, nativeQuery = true)
    List<MinhasInteracoesDTO> findInteracoesPorMatricula(@Param("matricula") String matricula);
}