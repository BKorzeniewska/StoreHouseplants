package com.houseplant.shop.plants.species;




import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.species.model.CreatePlantSpeciesRequest;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.model.PlantSpeciesResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlantSpeciesMapper {
    PlantSpecies toPlantSpecies(final CreatePlantSpeciesRequest createPlantSpeciesRequest);


    PlantSpeciesResponse toPlantSpeciesResponse(PlantSpecies plantSpecies);
}
