package com.houseplant.shop.plants.species.service;


import com.houseplant.shop.plants.species.PlantSpeciesMapper;
import com.houseplant.shop.plants.species.exception.PlantSpeciesNotFoundException;
import com.houseplant.shop.plants.species.model.CreatePlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.ModifyPlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;
import com.houseplant.shop.plants.species.repository.PlantSpeciesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class PlantSpeciesAdminServiceImpl implements PlantSpeciesAdminService {

    private final PlantSpeciesRepository plantSpeciesRepository;
    private final PlantSpeciesMapper plantSpeciesMapper;

    // ... (createPlantSpecies method if needed)

    @Override
    public PlantSpeciesResponse createPlantSpecies(CreatePlantSpeciesRequest request) {
        return null;
    }

    @Override
    public PlantSpeciesResponse modifyPlantSpecies(ModifyPlantSpeciesRequest request) {
        if (request.getId() == null) {
            throw new PlantSpeciesNotFoundException("PlantSpecies ID cannot be null", "PLANTSPECIES_ID_NULL");
        }

        final PlantSpecies plantSpecies = plantSpeciesRepository.findById(request.getId())
                .orElseThrow(() -> new PlantSpeciesNotFoundException("PlantSpecies with provided ID not found", "PLANTSPECIES_NOT_FOUND"));

        log.info("Updating plant species with id: {}", plantSpecies.getId());

        if (request.getName() != null) {
            plantSpecies.setName(request.getName());
        }

        // Here you can add modifications for other fields if they exist

        plantSpeciesRepository.save(plantSpecies);

        return plantSpeciesMapper.toPlantSpeciesResponse(plantSpecies);
    }

    @Override
    public void deletePlantSpecies(Long plantSpeciesId) {
        if (plantSpeciesId == null) {
            throw new PlantSpeciesNotFoundException("PlantSpecies ID cannot be null", "PLANTSPECIES_ID_NULL");
        }

        final PlantSpecies plantSpecies = plantSpeciesRepository.findById(plantSpeciesId)
                .orElseThrow(() -> new PlantSpeciesNotFoundException("PlantSpecies with provided ID not found", "PLANTSPECIES_NOT_FOUND"));

        plantSpeciesRepository.delete(plantSpecies);
        log.info("Deleted plant species with id: {}", plantSpeciesId);
    }
}