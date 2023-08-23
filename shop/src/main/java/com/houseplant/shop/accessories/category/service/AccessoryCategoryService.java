package com.houseplant.shop.accessories.category.service;

import com.houseplant.shop.accessories.category.model.AccessoryCategoryResponse;
import com.houseplant.shop.accessories.category.model.CreateAccessoryCategoryRequest;

public interface AccessoryCategoryService {
    AccessoryCategoryResponse createChallenge(final String name);
}
