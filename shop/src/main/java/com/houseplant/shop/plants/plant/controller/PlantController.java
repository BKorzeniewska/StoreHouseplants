package com.houseplant.shop.plants.plant.controller;

import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.service.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/plant")
@Log4j2
@RequiredArgsConstructor
public class PlantController {

    private final PlantService plantService;

    @GetMapping("/{id}")
    public ResponseEntity<PlantResponse> getPlantById(@PathVariable("id") Long plantId) {
        log.info("getPlantById - start, plantId: {}", plantId);
        var plant = plantService.getPlantById(plantId);
        return new ResponseEntity<>(plant, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlantResponse>> getAllPlants() {
        log.info("getAllPlants - start");
        var plants = plantService.getAllPlant();
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    @GetMapping("/species/{speciesId}")
    public ResponseEntity<List<PlantResponse>> getPlantsBySpecies(@PathVariable("speciesId") Long speciesId) {
        log.info("getPlantsBySpecies - start, speciesId: {}", speciesId);
        var plants = plantService.getPlantBySpecies(speciesId);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    // Add other endpoints as needed

}
