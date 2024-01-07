package com.houseplant.shop.delivery.model;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateDeliveryRequest {
    private String name;
    private String description;
    private double price;
    private Boolean blocked;
}

