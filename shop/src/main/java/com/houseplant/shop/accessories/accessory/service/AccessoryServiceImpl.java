package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.repository.AccessoryRepository;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;

    @Autowired
    public AccessoryServiceImpl(AccessoryRepository accessoryRepository) {
        this.accessoryRepository = accessoryRepository;
    }

    @Override
    public Optional<Accessory> getAccessoryById(long id) {
        return accessoryRepository.findById(id);
    }

    @Override
    public List<Accessory> getAccessoriesByCategory(AccessoryCategory category) {
        return accessoryRepository.findByCategory(category);
    }

    @Override
    public List<Accessory> getAccessoriesByPriceLessThan(double maxPrice) {
        return accessoryRepository.findByPriceLessThan(maxPrice);
    }

    @Override
    public List<Accessory> getAccessoriesByStockQuantityGreaterThan(int minStockQuantity) {
        return accessoryRepository.findByStockQuantityGreaterThan(minStockQuantity);
    }

    @Override
    public List<Accessory> getAllAccessories() {
        return accessoryRepository.findAll();
    }

    @Override
    public Accessory saveAccessory(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }

    @Override
    public void deleteAccessory(long id) {
        accessoryRepository.deleteById(id);
    }
}
