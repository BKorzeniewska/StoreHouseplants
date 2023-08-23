package com.houseplant.shop.accessories.accessory.model;

import com.houseplant.shop.accessories.category.model.AccessoryCategory;
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
    @Column(name = "ACCESSORY_ID")
    private long id;
    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "DESCRIPTION", length = 1000)
    private String description;

    @Column(name = "PRICE", nullable = false)
    private double price;

    @Column(name = "STOCK_QUANTITY", nullable = false)
    private int stockQuantity;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private AccessoryCategory category;

    @Column(name = "IMAGE_URL")
    private String imageUrl;

}
