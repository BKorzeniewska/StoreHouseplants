package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.Category;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;

import java.util.List;
import java.util.Optional;

public interface AccessoryService {
    Optional<Accessory> getAccessoryById(long id);

    List<Accessory> getAccessoriesByPriceLessThan(double maxPrice);

    List<Accessory> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity);

    List<Accessory> getAllAccessories();

}
