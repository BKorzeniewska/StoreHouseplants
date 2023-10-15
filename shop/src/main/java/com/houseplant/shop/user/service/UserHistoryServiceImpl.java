package com.houseplant.shop.user.service;


import com.houseplant.shop.blog.comments.exception.CommentIllegalStateException;
import com.houseplant.shop.user.exception.UserNotFoundException;
import com.houseplant.shop.user.model.entity.User;
import com.houseplant.shop.user.model.entity.UserHistory;
import com.houseplant.shop.user.repository.UserHistoryRepository;
import com.houseplant.shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class UserHistoryServiceImpl implements UserHistoryService {



    private final UserRepository userRepository;

    private final UserHistoryRepository userHistoryRepository;


    @Override
    public void saveHistory(final String bearerToken) {

        log.info("saveHistory() - start}");

        if (bearerToken == null || bearerToken.isBlank()) {
            throw new CommentIllegalStateException("Bearer token cannot be blank", "BEARER_TOKEN_BLANK");
        }

        final String token = bearerToken.substring(7);
        final User user = userRepository.findByToken(token)
                .orElseThrow(() -> new UserNotFoundException("User with provided token not found", "USER_NOT_FOUND"));


        final UserHistory userHistory = UserHistory.builder()
                .user(user)
                .build();

        userHistoryRepository.save(userHistory);
    }

    @Override
    public void deleteHistory(final String bearerToken) {
        //TODO

        if (bearerToken == null || bearerToken.isBlank()) {
            throw new CommentIllegalStateException("Bearer token cannot be blank", "BEARER_TOKEN_BLANK");
        }

        final String token = bearerToken.substring(7);

        userHistoryRepository.deleteByUserToken(token);
    }
}
