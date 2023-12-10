package com.houseplant.shop.plants.species.service;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;

import java.util.List;
import java.util.Optional;

public interface PlantSpeciesService {
    PlantSpeciesResponse getPlantSpeciesById(long id);

    List<PlantSpeciesResponse> getAllPlantSpecies();

    List<PlantSpeciesResponse> getPlantSpeciesByName(String name);
}
