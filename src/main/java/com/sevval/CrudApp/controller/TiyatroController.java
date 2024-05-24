package com.sevval.CrudApp.controller;

import com.sevval.CrudApp.entity.Tiyatro;
import com.sevval.CrudApp.service.TiyatroService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") //localhost:5173'ün API'ye erişimine izin verdik
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TiyatroController {

    private final TiyatroService tiyatroService;

    @PostMapping("/tiyatro")
    public Tiyatro postTiyatro(@RequestBody Tiyatro tiyatro){
        return tiyatroService.postTiyatro(tiyatro);
    }

    @GetMapping("/tiyatrolar")
    public List<Tiyatro> getAllTiyatro(){
        return  tiyatroService.getAllTiyatros();
    }


    @DeleteMapping("/tiyatro/{id}")
    public ResponseEntity<?> deleteTiyatroById(@PathVariable("id") Long id)
    {
        try{
        tiyatroService.deleteTiyatro(id);
        return new ResponseEntity<>(id + "nolu oyun silindi", HttpStatus.OK);
    } catch (EntityNotFoundException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    }

    @GetMapping("/tiyatro/{id}")
    public ResponseEntity<?> getTiyatroById(@PathVariable Long id){
        Tiyatro tiyatro=tiyatroService.getTiyatroById(id);
        if(tiyatro==null) return  ResponseEntity.notFound().build();
        return ResponseEntity.ok(tiyatro);
    }
    @PatchMapping("/tiyatro/{id}")
    public ResponseEntity updateTiyatro(@PathVariable Long id, @RequestBody Tiyatro tiyatro){
        Tiyatro updatedTiyatro= tiyatroService.updateTiyatro(id, tiyatro);

        if(updatedTiyatro==null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updatedTiyatro);
    }


}
