package com.houseplant.shop.plants.plant;



import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.Plant;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PlantMapper {
    @Mapping(target="plantSpecies.id", source="plantSpeciesId")
    Plant toPlant(final CreatePlantRequest createPlantRequest);


    @Mapping(target="plantSpeciesId", source="plant.plantSpecies.id")
   PlantResponse toPlantResponse(Plant plant);
}
