package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.model.*;

import java.util.List;

public interface PlantService {
    PlantResponse getPlantById(final Long plantId);
    List<PlantResponse> getAllPlant();
    List<PlantResponse> getPlantBySpecies(final Long speciesId);
    List<PlantResponse> getPlantsByPosition(Position position);
    List<PlantResponse> getPlantsForBeginners(boolean isForBeginners);
    List<PlantResponse> getCollectiblePlants(boolean isCollectible);
    List<PlantResponseMenu> getPopularPlant();
}
