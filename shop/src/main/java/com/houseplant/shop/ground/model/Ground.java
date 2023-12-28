package com.houseplant.shop.ground.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GROUND_ID")
    private long id;

    @Column(name = "NAME", nullable = false)
    private String name; // Nazwa podłoża

    @Column(name = "TYPE", nullable = false)
    private GroundType type; // Typ podłoża (np. ziemia ogrodowa, torf, hydrożel, itp.)


    @Column(name = "description")
    private String description; // Zdolność do zatrzymywania wilgoci
    @Column(name = "STOCK_QUANTITY", nullable = false)
    private int stockQuantity;
    @Column(name = "price")
    private Float price;

    @Column(name = "IMAGE_URL")
    private byte[] imageUrl;
}
