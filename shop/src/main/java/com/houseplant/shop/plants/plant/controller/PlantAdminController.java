package com.houseplant.shop.plants.plant.controller;


import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import com.houseplant.shop.blog.article.model.ModifyArticleRequest;
import com.houseplant.shop.plants.plant.model.CreatePlantRequest;
import com.houseplant.shop.plants.plant.model.ModifyPlantRequest;
import com.houseplant.shop.plants.plant.model.PlantResponse;
import com.houseplant.shop.plants.plant.service.PlantAdminService;
import com.houseplant.shop.plants.species.model.PlantSpecies;
import com.houseplant.shop.plants.species.service.PlantSpeciesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Log4j2
@RestController
@RequestMapping("/api/admin/v1//plant")
public class PlantAdminController {

    private final PlantAdminService plantAdminService;

    @PostMapping("/create")
    public PlantResponse createPlant(@RequestBody CreatePlantRequest request) {
        return plantAdminService.createPlant(request);
    }

    @PatchMapping("/modify")
    public PlantResponse  modifyPlant(@RequestBody ModifyPlantRequest request) {
        return plantAdminService.modifyPlant(request);
    }

    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable Long id) {
        plantAdminService.deletePlant(id);
    }

}
