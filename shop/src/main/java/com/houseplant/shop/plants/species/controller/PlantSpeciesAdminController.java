package com.houseplant.shop.plants.species.controller;

import com.houseplant.shop.plants.species.model.CreatePlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.ModifyPlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;
import com.houseplant.shop.plants.species.service.PlantSpeciesAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/v1/plant/species")
@RequiredArgsConstructor
@Log4j2
public class PlantSpeciesAdminController {

    private final PlantSpeciesAdminService plantSpeciesAdminService;

    @PostMapping("/create")
    public ResponseEntity<PlantSpeciesResponse> createPlantSpecies(@RequestBody CreatePlantSpeciesRequest request) {
        var plantSpeciesResponse = plantSpeciesAdminService.createPlantSpecies(request);
        return new ResponseEntity<>(plantSpeciesResponse, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<PlantSpeciesResponse> modifyPlantSpecies(@RequestBody ModifyPlantSpeciesRequest request) {
        var plantSpeciesResponse = plantSpeciesAdminService.modifyPlantSpecies(request);
        return new ResponseEntity<>(plantSpeciesResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePlantSpecies(@PathVariable Long id) {
        plantSpeciesAdminService.deletePlantSpecies(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Możesz dodać więcej endpointów, jeśli potrzebujesz obsługiwać inne operacje
}
