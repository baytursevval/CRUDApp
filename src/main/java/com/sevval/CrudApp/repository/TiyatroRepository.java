package com.sevval.CrudApp.repository;

import com.sevval.CrudApp.entity.Tiyatro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TiyatroRepository extends JpaRepository<Tiyatro, Long> {


}
