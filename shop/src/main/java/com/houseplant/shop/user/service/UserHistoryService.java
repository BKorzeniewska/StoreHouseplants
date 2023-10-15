package com.houseplant.shop.user.service;

public interface UserHistoryService {
    void saveHistory(final String bearerToken);

    void deleteHistory(final String bearerToken);
}
