package com.houseplant.shop.plants.plant.controller;

import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.service.PlantAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/api/admin/v1/plant")
public class PlantAdminController {

    private final PlantAdminService plantAdminService;

    @PostMapping("/create")
    public ResponseEntity<PlantResponse> createPlant(@RequestBody CreatePlantRequest request) {
        PlantResponse plantResponse = plantAdminService.createPlant(request);
        return new ResponseEntity<>(plantResponse, HttpStatus.CREATED);
    }

    @PatchMapping("/modify")
    public ResponseEntity<PlantResponse> modifyPlant(@RequestBody ModifyPlantRequest request) {
        PlantResponse plantResponse = plantAdminService.modifyPlant(request);
        return new ResponseEntity<>(plantResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable Long id) {
        plantAdminService.deletePlant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
