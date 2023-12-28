package com.houseplant.shop.accessory.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Accessory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "DESCRIPTION", length = 1000)
    private String description;

    @Column(name = "PRICE", nullable = false)
    private double price;

    @Column(name = "STOCK_QUANTITY", nullable = false)
    private int stockQuantity;

    @Column(name = "CATEGORY", nullable = false)
    private Category category;

    @Basic(fetch = FetchType.LAZY)// Indicates a Large Object, suitable for storing binary data
    @Column(name = "IMAGE_DATA")
    private byte[] imageUrl;
}
