package com.houseplant.shop.delivery.service;

import com.houseplant.shop.delivery.model.CreateDeliveryRequest;
import com.houseplant.shop.delivery.model.DeliveryResponse;
import com.houseplant.shop.delivery.model.ModifyDeliveryRequest;

import java.util.List;

public interface DeliveryService {
        List<DeliveryResponse> getAllDeliveries();

        DeliveryResponse getDeliveryById(long id);

        DeliveryResponse createDelivery(final CreateDeliveryRequest request);

        DeliveryResponse updateDelivery(final ModifyDeliveryRequest request);

        void deleteDelivery(final Long id);

}
