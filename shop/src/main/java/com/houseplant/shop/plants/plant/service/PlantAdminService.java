package com.houseplant.shop.plants.plant.service;

import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.DeliveryPlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.PlantResponse;

public interface PlantAdminService {
    PlantResponse createPlant(final CreatePlantRequest request);
    PlantResponse modifyPlant(final ModifyPlantRequest request);
    PlantResponse deliveryPlant(final DeliveryPlantRequest request);
    void deletePlant(final Long plantId);
}
