package com.sevval.CrudApp.controller;

import com.sevval.CrudApp.entity.Tiyatro;
import com.sevval.CrudApp.service.TiyatroService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TiyatroController {

    private final TiyatroService tiyatroService;

    @PostMapping("/tiyatro")
    public Tiyatro postTiyatro(@RequestBody Tiyatro tiyatro){
        return tiyatroService.postTiyatro(tiyatro);
    }
}
