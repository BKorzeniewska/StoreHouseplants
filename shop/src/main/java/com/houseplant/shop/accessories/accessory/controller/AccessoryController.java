package com.houseplant.shop.accessories.accessory.controller;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.service.AccessoryService;
import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/accessories")
public class AccessoryController {

    private final AccessoryService accessoryService;

    @Autowired
    public AccessoryController(AccessoryService accessoryService) {
        this.accessoryService = accessoryService;
    }

    @GetMapping("/{id}")
    public Optional<Accessory> getAccessoryById(@PathVariable long id) {
        return accessoryService.getAccessoryById(id);
    }

    @GetMapping("/category/{category}")
    public List<Accessory> getAccessoriesByCategory(@PathVariable AccessoryCategory category) {
        return accessoryService.getAccessoriesByCategory(category);
    }

    @GetMapping("/price/{maxPrice}")
    public List<Accessory> getAccessoriesByPriceLessThan(@PathVariable double maxPrice) {
        return accessoryService.getAccessoriesByPriceLessThan(maxPrice);
    }

    @GetMapping("/stock/{minStockQuantity}")
    public List<Accessory> getAccessoriesByStockQuantityGreaterThan(@PathVariable int minStockQuantity) {
        return accessoryService.getAccessoriesByStockQuantityGreaterThan(minStockQuantity);
    }

    @GetMapping("/all")
    public List<Accessory> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

    @PostMapping("/")
    public Accessory saveAccessory(@RequestBody Accessory accessory) {
        return accessoryService.saveAccessory(accessory);
    }

    @DeleteMapping("/{id}")
    public void deleteAccessory(@PathVariable long id) {
        accessoryService.deleteAccessory(id);
    }
}
