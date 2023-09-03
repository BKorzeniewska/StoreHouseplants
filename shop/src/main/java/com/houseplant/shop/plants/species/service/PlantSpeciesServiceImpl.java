package com.houseplant.shop.plants.species.service;

import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.repository.PlantSpeciesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantSpeciesServiceImpl implements PlantSpeciesService {

    private final PlantSpeciesRepository plantSpeciesRepository;



    @Override
    public Optional<PlantSpecies> getPlantSpeciesById(long id) {
        return plantSpeciesRepository.findById(id);
    }

    @Override
    public List<PlantSpecies> getAllPlantSpecies() {
        return plantSpeciesRepository.findAll();
    }

    @Override
    public List<PlantSpecies> getPlantSpeciesByName(String name) {
        return plantSpeciesRepository.findByName(name);
    }


}