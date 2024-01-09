package com.houseplant.shop.delivery.service;

import com.houseplant.shop.delivery.exception.DeliveryNotFoundException;
import com.houseplant.shop.delivery.model.*;
import com.houseplant.shop.delivery.repository.DeliveryRepository;
import com.houseplant.shop.delivery.DeliveryMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DeliveryMapper deliveryMapper;

    @Override
    public List<DeliveryResponse> getAllDeliveries() {
        var deliveries = deliveryRepository.findAll();
        return deliveries.stream()
                .map(deliveryMapper::toDeliveryResponse)
                .toList();
    }

    @Override
    public DeliveryResponse getDeliveryById(long id) {
        var delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new DeliveryNotFoundException(
                        "Delivery with provided ID not found", "DELIVERY_NOT_FOUND"));
        return deliveryMapper.toDeliveryResponse(delivery);
    }

    @Override
    public DeliveryResponse createDelivery(CreateDeliveryRequest request) {
        var delivery = Delivery.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .blocked(request.getBlocked())
                .build();
        deliveryRepository.save(delivery);
        return deliveryMapper.toDeliveryResponse(delivery);
    }

    @Override
    public DeliveryResponse updateDelivery(ModifyDeliveryRequest request) {
        final Delivery delivery = deliveryRepository.findById(request.getId())
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery with provided ID not found", "DELIVERY_NOT_FOUND"));

        log.info("Updating delivery with id: {}", delivery.getId());

        if (request.getName() != null) {
            delivery.setName(request.getName());
        }
        if (request.getDescription() != null) {
            delivery.setDescription(request.getDescription());
        }
        if (request.getPrice() != null) {
            delivery.setPrice(request.getPrice());
        }
        if (request.getBlocked() != null) {
            delivery.setBlocked(request.getBlocked());
        }

        deliveryRepository.save(delivery);
        return deliveryMapper.toDeliveryResponse(delivery);
    }

    @Override
    public void deleteDelivery(Long id) {
        if (id == null) {
            throw new DeliveryNotFoundException("Delivery ID cannot be null", "DELIVERY_ID_NULL");
        }
        deliveryRepository.findById(id)
                .orElseThrow(() -> new DeliveryNotFoundException("Delivery with provided ID not found", "DELIVERY_NOT_FOUND"));
        deliveryRepository.deleteById(id);
        log.info("Deleted delivery with id: {}", id);
    }
}
