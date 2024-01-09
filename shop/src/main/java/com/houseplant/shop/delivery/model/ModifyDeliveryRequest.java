package com.houseplant.shop.delivery.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyDeliveryRequest {    private long id;
    private String name;
    private String description;
    private Double price;
    private Boolean blocked;
}

