package com.houseplant.shop.plants.species.controller;

import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;
import com.houseplant.shop.plants.species.service.PlantSpeciesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/api/v1/plant/species")
public class PlantSpeciesController {

    private final PlantSpeciesService plantSpeciesService;

    @GetMapping("/{id}")
    public ResponseEntity<PlantSpeciesResponse> getPlantSpeciesById(@PathVariable long id) {
        var plantSpeciesResponse = plantSpeciesService.getPlantSpeciesById(id);
        return new ResponseEntity<>(plantSpeciesResponse, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlantSpeciesResponse>> getAllPlantSpecies() {
        var plantSpeciesResponses = plantSpeciesService.getAllPlantSpecies();
        return new ResponseEntity<>(plantSpeciesResponses, HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<PlantSpeciesResponse>> getPlantSpeciesByName(@PathVariable String name) {
        var plantSpeciesResponses = plantSpeciesService.getPlantSpeciesByName(name);
        return new ResponseEntity<>(plantSpeciesResponses, HttpStatus.OK);
    }

    // Możesz dodać inne metody obsługi żądań HTTP w zależności od potrzeb

}
