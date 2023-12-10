package com.houseplant.shop.plants.species.service;


import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
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

    @Override
    public PlantSpeciesResponse createPlantSpecies(CreatePlantSpeciesRequest request) {
        if (request.getName() == null || request.getName().isEmpty()) {
            throw new ArticleNotFoundException("Plant Species name cannot be null or empty", "PLANT_SPECIES_TITLE_EMPTY");
        }
        var plantSpecies = PlantSpecies.builder()
                .name(request.getName())
                .image(request.getImage())
                .plant(request.getPlant())
                .build();

        plantSpeciesRepository.save(plantSpecies);
        log.info("plant species: {}", plantSpecies.getName());

        return plantSpeciesMapper.toPlantSpeciesResponse(plantSpecies);
    }

    @Override
    public PlantSpeciesResponse modifyPlantSpecies(ModifyPlantSpeciesRequest request) {
        PlantSpecies plantSpecies = plantSpeciesRepository.findById(request.getId())
                .orElseThrow(() -> new PlantSpeciesNotFoundException("PlantSpecies not found", "PLANTSPECIES_NOT_FOUND"));

        if (request.getName() != null) {
            plantSpecies.setName(request.getName());
        }
        if (request.getPlant() != null) {
            plantSpecies.setPlant(request.getPlant());
        }
        if (request.getImage() != null) {
            plantSpecies.setImage(request.getImage());
        }

        plantSpeciesRepository.save(plantSpecies);

        return plantSpeciesMapper.toPlantSpeciesResponse(plantSpecies);
    }

    @Override
    public void deletePlantSpecies(Long id) {
        PlantSpecies plantSpecies = plantSpeciesRepository.findById(id)
                .orElseThrow(() -> new PlantSpeciesNotFoundException("PlantSpecies not found", "PLANTSPECIES_NOT_FOUND"));

        plantSpeciesRepository.delete(plantSpecies);
    }
}