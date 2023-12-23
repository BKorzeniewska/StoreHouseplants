package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.PlantMapper;
import com.houseplant.shop.plants.plant.exception.PlantNotFoundException;
import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.repository.PlantRepository;
import com.houseplant.shop.plants.species.repository.PlantSpeciesRepository; // Assuming you have this
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantAdminServiceImpl implements PlantAdminService {

    private final PlantRepository plantRepository;
    private final PlantSpeciesRepository plantSpeciesRepository; // Assuming you have this
    private final PlantMapper plantMapper;

    @Override
    public PlantResponse createPlant(CreatePlantRequest request) {
        validateCreateRequest(request);

        var plantSpecies = plantSpeciesRepository.findById(request.getPlantSpeciesId())
                .orElseThrow(() -> new PlantNotFoundException("Species with provided ID not found", "SPECIES_NOT_FOUND"));

        var plant = Plant.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .groundType(request.getGroundType())
                .position(request.getPosition())
                .collectible(request.getCollectible())
                .beginners(request.getBeginners())
                .plantSpecies(plantSpecies) // Assuming you have a relationship with PlantSpecies
                .image(request.getImage())
                .build();

        plantRepository.save(plant);
        log.info("Plant created: {}", plant.getName());

        return plantMapper.toPlantResponse(plant);
    }

    @Override
    @Transactional
    public PlantResponse modifyPlant(ModifyPlantRequest request) {
        if (request.getId() == null) {
            throw new PlantNotFoundException("Plant ID cannot be null", "PLANT_ID_NULL");
        }

        final Plant plant = plantRepository.findById(request.getId())
                .orElseThrow(() -> new PlantNotFoundException("Plant with provided ID not found", "PLANT_NOT_FOUND"));

        updatePlantFields(plant, request);
        plantRepository.save(plant);  // Assuming save updates existing plants
        log.info("Plant updated: {}", plant.getId());

        return plantMapper.toPlantResponse(plant);
    }

    @Override
    public void deletePlant(Long plantId) {
        if (plantId == null) {
            throw new PlantNotFoundException("Plant ID cannot be null", "PLANT_ID_NULL");
        }

        plantRepository.findById(plantId)
                .orElseThrow(() -> new PlantNotFoundException("Plant with provided ID not found", "PLANT_NOT_FOUND"));

        plantRepository.deleteById(plantId);
        log.info("Deleted plant with id: {}", plantId);
    }

    private void validateCreateRequest(CreatePlantRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new PlantNotFoundException("Plant name cannot be null or empty", "PLANT_NAME_EMPTY");
        }
        // Add other validations as required
    }

    private void updatePlantFields(Plant plant, ModifyPlantRequest request) {
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
        if (request.getImage() != null) {
            plant.setImage(request.getImage());
        }
        if (request.getGroundType() != null)
            plant.setGroundType(request.getGroundType());

        if (request.getPosition() != null)
            plant.setPosition(request.getPosition());

        if (request.getCollectible() != null)
            plant.setCollectible(request.getCollectible());
        if (request.getBeginners() != null)
            plant.setBeginners(request.getBeginners());
        // Add other field updates as required
    }
}
