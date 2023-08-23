package com.houseplant.shop.accessories.category.service;

import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import com.houseplant.shop.accessories.category.model.AccessoryCategoryResponse;
import com.houseplant.shop.accessories.category.model.CreateAccessoryCategoryRequest;
import com.houseplant.shop.accessories.category.repository.AccessoryCategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccessoryCategoryServiceImpl  implements AccessoryCategoryService {
    private final AccessoryCategoryRepository accessoryCategoryRepository;

    @Transactional
    @Override
    public AccessoryCategoryResponse createChallenge(final String name) {

        AccessoryCategory accessoryCategory = AccessoryCategory.builder()
                .name(name)
                .build();

        accessoryCategoryRepository.save(accessoryCategory);

        log.info("accessoryCategory: {}", accessoryCategory);
        AccessoryCategoryResponse response = AccessoryCategoryResponse.builder()
                .name(accessoryCategory.getName())
                .build();
        return response;
    }
}
