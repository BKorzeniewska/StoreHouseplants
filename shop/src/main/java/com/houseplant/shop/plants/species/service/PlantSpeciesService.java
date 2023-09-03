package com.houseplant.shop.plants.species.service;

import com.houseplant.shop.plants.species.model.PlantSpecies;

import java.util.List;
import java.util.Optional;

public interface PlantSpeciesService {
    Optional<PlantSpecies> getPlantSpeciesById(long id);

    List<PlantSpecies> getAllPlantSpecies();

    List<PlantSpecies> getPlantSpeciesByName(String name);
}
