package com.houseplant.shop.delivery.repository;

import com.houseplant.shop.delivery.model.Delivery;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findById(long id);

    Optional<Delivery> findByName(String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE delivery SET name = :name, description = :description, price=:price, blocked = :blocked WHERE id = :id", nativeQuery = true)
    void updateDelivery(final String name, final String description, final double price, final Boolean blocked, final Long id);

    @Transactional
    @Modifying
    @Query("DELETE FROM Delivery d WHERE d.id = :deliveryId")
    void deleteDeliveryById(final Long deliveryId);
}
