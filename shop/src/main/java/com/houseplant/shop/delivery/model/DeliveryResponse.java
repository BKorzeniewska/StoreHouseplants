package com.houseplant.shop.delivery.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeliveryResponse {
    private String name;
    private String description;
    private double price;
    private Boolean blocked;
}
