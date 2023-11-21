package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;

import java.util.List;
import java.util.Optional;

public interface AccessoryAdminService {


    AccessoryResponse createAccessory(CreateAccessoryRequest createAccessoryRequest);

    void deleteAccessory(long id);
}
