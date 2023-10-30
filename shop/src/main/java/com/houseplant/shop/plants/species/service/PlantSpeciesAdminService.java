package com.houseplant.shop.plants.species.service;

import com.houseplant.shop.plants.species.model.CreatePlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.ModifyPlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;

public interface PlantSpeciesAdminService {
    PlantSpeciesResponse createPlantSpecies(final CreatePlantSpeciesRequest request);
    PlantSpeciesResponse modifyPlantSpecies(final ModifyPlantSpeciesRequest request);
    void deletePlantSpecies(final Long plantSpeciesId);
}
