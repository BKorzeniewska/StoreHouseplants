package com.houseplant.shop.ground.service;

import com.houseplant.shop.ground.model.CreateGroundRequest;
import com.houseplant.shop.ground.model.Ground;
import com.houseplant.shop.ground.model.GroundResponse;
import com.houseplant.shop.ground.model.ModifyGroundRequest;
import com.houseplant.shop.ground.repository.GroundRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class GroundServiceImpl implements GroundService {

    private final GroundRepository groundRepository;


    @Override
    public List<Ground> getAllGrounds() {
        return groundRepository.findAll();
    }

    @Override
    public Ground getGroundById(long id) {
        Optional<Ground> optionalGround = groundRepository.findById(id);
        return optionalGround.orElse(null);
    }

    @Override
    public Ground createGround(Ground ground) {
        return groundRepository.save(ground);
    }

    @Override
    public Ground updateGround(long id, Ground updatedGround) {
        Optional<Ground> optionalGround = groundRepository.findById(id);
        if (optionalGround.isPresent()) {
            updatedGround.setId(id);
            return groundRepository.save(updatedGround);
        }
        return null;
    }

    @Override
    public void deleteGround(long id) {
        groundRepository.deleteById(id);
    }

    @Override
    public GroundResponse createGround(CreateGroundRequest request) {
        return null;
    }

    @Override
    public GroundResponse modifyGround(ModifyGroundRequest request) {
        return null;
    }


}
