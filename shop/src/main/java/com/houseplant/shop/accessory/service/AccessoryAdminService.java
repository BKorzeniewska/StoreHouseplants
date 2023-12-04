package com.houseplant.shop.accessory.service;

import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.CreateAccessoryRequest;

public interface AccessoryAdminService {


    AccessoryResponse createAccessory(CreateAccessoryRequest createAccessoryRequest);

    void deleteAccessory(long id);
}
