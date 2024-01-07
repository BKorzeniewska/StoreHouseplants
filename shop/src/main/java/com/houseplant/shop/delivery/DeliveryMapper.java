package com.houseplant.shop.delivery;

import com.houseplant.shop.delivery.model.CreateDeliveryRequest;
import com.houseplant.shop.delivery.model.Delivery;
import com.houseplant.shop.delivery.model.DeliveryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeliveryMapper {
    Delivery toDelivery(final CreateDeliveryRequest createDeliveryRequest);


    DeliveryResponse toGroundResponse(Delivery delivery);
}

