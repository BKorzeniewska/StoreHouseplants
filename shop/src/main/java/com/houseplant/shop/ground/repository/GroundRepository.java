package com.houseplant.shop.ground.repository;

import com.houseplant.shop.ground.model.Ground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Long> {
    Optional<Ground> findById(long id); // Wyszukiwanie po identyfikatorze

    Optional<Ground> findByName(String name); // Wyszukiwanie po nazwie podłoża

}
