package com.houseplant.shop.plants.species.service;

import com.houseplant.shop.plants.species.exception.PlantSpeciesNotFoundException;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;
import com.houseplant.shop.plants.species.repository.PlantSpeciesRepository;
import com.houseplant.shop.plants.species.PlantSpeciesMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantSpeciesServiceImpl implements PlantSpeciesService {

    private final PlantSpeciesRepository plantSpeciesRepository;
    private final PlantSpeciesMapper plantSpeciesMapper;

    @Override
    public PlantSpeciesResponse getPlantSpeciesById(long id) {
        PlantSpecies plantSpecies = plantSpeciesRepository.findById(id)
                .orElseThrow(() -> new PlantSpeciesNotFoundException("PlantSpecies not found", "PLANTSPECIES_NOT_FOUND"));

        return plantSpeciesMapper.toPlantSpeciesResponse(plantSpecies);
    }

    @Override
    public List<PlantSpeciesResponse> getAllPlantSpecies() {
        return plantSpeciesRepository.findAll()
                .stream()
                .map(plantSpeciesMapper::toPlantSpeciesResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlantSpeciesResponse> getPlantSpeciesByName(String name) {
        return plantSpeciesRepository.findByName(name)
                .stream()
                .map(plantSpeciesMapper::toPlantSpeciesResponse)
                .collect(Collectors.toList());
    }

}
