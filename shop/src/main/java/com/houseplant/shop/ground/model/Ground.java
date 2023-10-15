package com.houseplant.shop.ground.model;

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
public class Ground {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GROUND_ID")
    private long id;

    @Column(name = "NAME", nullable = false)
    private String name; // Nazwa podłoża

    @Column(name = "TYPE", nullable = false)
    private GroundType type; // Typ podłoża (np. ziemia ogrodowa, torf, hydrożel, itp.)


    @Column(name = "MOISURE_RETENTION")
    private String moistureRetention; // Zdolność do zatrzymywania wilgoci

    @Column(name = "IMAGE_URL")
    private String imageUrl;
}
