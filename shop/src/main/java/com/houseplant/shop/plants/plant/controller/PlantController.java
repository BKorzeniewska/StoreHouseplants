package com.houseplant.shop.plants.plant.controller;

import com.houseplant.shop.blog.article.model.MenuArticleResponse;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.model.PlantResponseMenu;
import com.houseplant.shop.plants.plant.model.Position;
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
    @GetMapping("/position/{position}")
    public ResponseEntity<List<PlantResponse>> getPlantsByPosition(@PathVariable("position") Position position) {
        log.info("getPlantsByPosition - start, position: {}", position);
        var plants = plantService.getPlantsByPosition(position);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    @GetMapping("/beginners/{isForBeginners}")
    public ResponseEntity<List<PlantResponse>> getPlantsForBeginners(@PathVariable("isForBeginners") boolean isForBeginners) {
        log.info("getPlantsForBeginners - start, isForBeginners: {}", isForBeginners);
        var plants = plantService.getPlantsForBeginners(isForBeginners);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    @GetMapping("/collectible/{isCollectible}")
    public ResponseEntity<List<PlantResponse>> getCollectiblePlants(@PathVariable("isCollectible") boolean isCollectible) {
        log.info("getCollectiblePlants - start, isCollectible: {}", isCollectible);
        var plants = plantService.getCollectiblePlants(isCollectible);
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<PlantResponseMenu>> getPopularPlant() {
        var plants = plantService.getPopularPlant();
        return new ResponseEntity<>(plants, HttpStatus.OK);
    }

}
