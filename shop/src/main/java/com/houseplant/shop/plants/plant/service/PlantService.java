package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.model.Position;

import java.util.List;

public interface PlantService {
    PlantResponse getPlantById(final Long plantId);
    List<PlantResponse> getAllPlant();
    List<PlantResponse> getPlantBySpecies(final Long speciesId);
    List<PlantResponse> getPlantsByPosition(Position position);
    List<PlantResponse> getPlantsForBeginners(boolean isForBeginners);
    List<PlantResponse> getCollectiblePlants(boolean isCollectible);
}
