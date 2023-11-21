package com.houseplant.shop.accessories.accessory.service;

import com.houseplant.shop.accessories.accessory.AccessoryMapper;
import com.houseplant.shop.accessories.accessory.model.Accessory;
import com.houseplant.shop.accessories.accessory.model.AccessoryResponse;
import com.houseplant.shop.accessories.accessory.model.CreateAccessoryRequest;
import com.houseplant.shop.accessories.accessory.repository.AccessoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                .imageUrl(createAccessoryRequest.getImageUrl())
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
