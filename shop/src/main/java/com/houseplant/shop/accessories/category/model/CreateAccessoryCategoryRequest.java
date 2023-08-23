package com.houseplant.shop.accessories.category.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CreateAccessoryCategoryRequest {
    private String name;
}
