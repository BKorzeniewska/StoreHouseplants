package com.houseplant.shop.accessories.category.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AccessoryCategoryResponse {
    private Long id;
    private String name;
}
