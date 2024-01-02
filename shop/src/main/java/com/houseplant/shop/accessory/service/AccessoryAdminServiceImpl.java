package com.houseplant.shop.accessory.service;

import com.houseplant.shop.accessory.AccessoryMapper;
import com.houseplant.shop.accessory.model.Accessory;
import com.houseplant.shop.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessory.repository.AccessoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class AccessoryAdminServiceImpl implements AccessoryAdminService {

    private final AccessoryRepository accessoryRepository;
    private final AccessoryMapper accessoryMapper;



    @Override
    public AccessoryResponse createAccessory(CreateAccessoryRequest createAccessoryRequest) {
        final Accessory accessory = Accessory.builder()
                .name(createAccessoryRequest.getName())
                .description(createAccessoryRequest.getDescription())
                .price(createAccessoryRequest.getPrice())
                .stockQuantity(createAccessoryRequest.getStockQuantity())
                .image(createAccessoryRequest.getImage())
                .category(createAccessoryRequest.getCategory())
                .build();
        accessoryRepository.save(accessory);

        log.info("accessory: {}", accessory.getName());

        return accessoryMapper.toAccessoryResponse(accessory);
    }

    @Override
    public void deleteAccessory(long id) {
        accessoryRepository.deleteById(id);
    }
}
