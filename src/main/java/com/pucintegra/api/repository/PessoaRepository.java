package com.pucintegra.api.repository;

import com.pucintegra.api.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PessoaRepository extends JpaRepository<Pessoa, String> {
    Optional<Pessoa> findByEmailInstitucional(String emailInstitucional);
}