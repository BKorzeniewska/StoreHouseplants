package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.PlantMapper;
import com.houseplant.shop.plants.plant.exception.PlantNotFoundException;
import com.houseplant.shop.plants.plant.model.*;
import com.houseplant.shop.plants.plant.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantServiceImpl implements PlantService {

    private final PlantRepository plantRepository;
    // Assuming there's a PlantMapper for mapping between entities and DTOs
    private final PlantMapper plantMapper;

    @Override
    public PlantResponse getPlantById(final Long plantId) {
        log.info("getPlantById - start, plantId: {}", plantId);

        var plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new PlantNotFoundException("Plant with provided ID not found", "PLANT_NOT_FOUND"));

        return plantMapper.toPlantResponse(plant);
    }

    @Override
    public List<PlantResponse> getAllPlant() {
        log.info("getAllPlant - start");

        var plants = plantRepository.findAll();

        return plants.stream()
                .map(plantMapper::toPlantResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlantResponse> getPlantBySpecies(final Long speciesId) {
        log.info("getPlantBySpecies - start, speciesId: {}", speciesId);

        var plants = plantRepository.findBySpeciesId(speciesId)
                .orElseThrow(() -> new PlantNotFoundException("Plants with provided SpeciesID not found", "PLANTS_NOT_FOUND"));

        return plants.stream()
                .map(plantMapper::toPlantResponse)
                .collect(Collectors.toList());
    }
    @Override
    public List<PlantResponse> getPlantsByPosition(Position position) {
        log.info("getPlantsByPosition - start, position: {}", position);
        return plantRepository.findByPosition(position).stream()
                .map(plantMapper::toPlantResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlantResponse> getPlantsForBeginners(boolean isForBeginners) {
        log.info("getPlantsForBeginners - start, isForBeginners: {}", isForBeginners);
        return plantRepository.findByBeginners(isForBeginners).stream()
                .map(plantMapper::toPlantResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlantResponse> getCollectiblePlants(boolean isCollectible) {
        log.info("getCollectiblePlants - start, isCollectible: {}", isCollectible);
        return plantRepository.findByCollectible(isCollectible).stream()
                .map(plantMapper::toPlantResponse)
                .collect(Collectors.toList());
    }

}
