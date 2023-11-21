package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.AccessoryMapper;
import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.repository.AccessoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;
    private final AccessoryMapper accessoryMapper;


    @Override
    public Optional<Accessory> getAccessoryById(long id) {
        return accessoryRepository.findById(id);
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

}
