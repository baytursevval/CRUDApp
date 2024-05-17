package com.sevval.CrudApp.service;

import com.sevval.CrudApp.entity.Tiyatro;
import com.sevval.CrudApp.repository.TiyatroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TiyatroService {

    private final TiyatroRepository tiyatroRepository;

    public Tiyatro postTiyatro(Tiyatro tiyatro) {
        return  tiyatroRepository.save(tiyatro);
    }
}
