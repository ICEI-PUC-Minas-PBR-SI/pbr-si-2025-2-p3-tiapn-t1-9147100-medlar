package com.pucintegra.api.repository;
import com.pucintegra.api.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, String> {}