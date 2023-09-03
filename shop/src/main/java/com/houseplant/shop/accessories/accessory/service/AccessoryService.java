package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;

import java.util.List;
import java.util.Optional;

public interface AccessoryService {
    Optional<Accessory> getAccessoryById(long id);

    List<Accessory> getAccessoriesByCategory(AccessoryCategory category);

    List<Accessory> getAccessoriesByPriceLessThan(double maxPrice);

    List<Accessory> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity);

    List<Accessory> getAllAccessories();

    Accessory saveAccessory(Accessory accessory);
    AccessoryResponse createAccessory(CreateAccessoryRequest createAccessoryRequest);

    void deleteAccessory(long id);
}
