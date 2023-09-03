package com.houseplant.shop.plants.species.controller;


import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.service.PlantSpeciesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/api/admin/v1//plant-species")
public class PlantSpeciesController {

    private final PlantSpeciesService plantSpeciesService;

    @GetMapping("/{id}")
    public Optional<PlantSpecies> getPlantSpeciesById(@PathVariable long id) {
        return plantSpeciesService.getPlantSpeciesById(id);
    }

    @GetMapping("/all")
    public List<PlantSpecies> getAllPlantSpecies() {
        return plantSpeciesService.getAllPlantSpecies();
    }

    @GetMapping("/name/{name}")
    public List<PlantSpecies> getPlantSpeciesByName(@PathVariable String name) {
        return plantSpeciesService.getPlantSpeciesByName(name);
    }

    // Możesz dodać inne metody obsługi żądań HTTP w zależności od potrzeb

}
