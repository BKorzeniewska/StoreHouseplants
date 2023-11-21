package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.PlantMapper;
import com.houseplant.shop.plants.plant.exception.PlantNotFoundException;
import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.repository.PlantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantAdminServiceImpl implements PlantAdminService {

    private final PlantRepository plantRepository;
    private final PlantMapper plantMapper;

    @Override
    public PlantResponse createPlant(CreatePlantRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new PlantNotFoundException("Plant name cannot be null or empty", "PLANT_NAME_EMPTY");
        }

        // Dodaj dodatkowe walidacje wg potrzeb

        var plant = Plant.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .imageUrl(request.getImageUrl())
                .build();

        plantRepository.save(plant);

        log.info("Plant: {}", plant.getName());

        return plantMapper.toPlantResponse(plant);
    }

    @Override
    public PlantResponse modifyPlant(ModifyPlantRequest request) {
        if (request.getId() == null) {
            throw new PlantNotFoundException("Plant ID cannot be null", "PLANT_ID_NULL");
        }

        final Plant plant = plantRepository.findById(request.getId())
                .orElseThrow(() -> new PlantNotFoundException("Plant with provided ID not found", "PLANT_NOT_FOUND"));

        log.info("Updating plant with id: {}", plant.getId());

        if (request.getName() != null) {
            plant.setName(request.getName());
        }

        if (request.getDescription() != null) {
            plant.setDescription(request.getDescription());
        }

        if (request.getPrice() != null) {
            plant.setPrice(request.getPrice());
        }

        if (request.getStockQuantity() != null) {
            plant.setStockQuantity(request.getStockQuantity());
        }

        if (request.getImageUrl() != null) {
            plant.setImageUrl(request.getImageUrl());
        }

        plantRepository.save(plant);  // Zakładając, że metoda save działa zarówno dla zapisu, jak i aktualizacji

        return plantMapper.toPlantResponse(plant);
    }

    @Override
    public void deletePlant(Long plantId) {
        if (plantId == null) {
            throw new PlantNotFoundException("Plant ID cannot be null", "PLANT_ID_NULL");
        }

        final Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new PlantNotFoundException("Plant with provided ID not found", "PLANT_NOT_FOUND"));

        plantRepository.delete(plant);  // Zakładając, że metoda delete usuwa obiekt z bazy
        log.info("Deleted plant with id: {}", plantId);
    }

}