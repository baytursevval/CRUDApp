package com.sevval.CrudApp.service;

import com.sevval.CrudApp.entity.Tiyatro;
import com.sevval.CrudApp.repository.TiyatroRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TiyatroService {

    private final TiyatroRepository tiyatroRepository;

    public Tiyatro postTiyatro(Tiyatro tiyatro) {
        return  tiyatroRepository.save(tiyatro);
    }

    public List<Tiyatro> getAllTiyatros(){
        return tiyatroRepository.findAll();
    }

    public void deleteTiyatro(Long id){
        if(!tiyatroRepository.existsById(id)){
            throw new EntityNotFoundException(id + " ID nolu oyun bulunamadı");
        }
        tiyatroRepository.deleteById(id);
    }



}
