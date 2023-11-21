package com.houseplant.shop.blog.article.service;



import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.MenuArticleResponse;

import java.time.LocalDate;
import java.util.List;

public interface ArticleService {

    ArticleResponse getArticleById(Long articleId);

    List<ArticleResponse> getArticlesByTitleContaining(String titleFragment);

    List<ArticleResponse> getArticlesByDateBetween(LocalDate startDate, LocalDate endDate);

    List<ArticleResponse> getArticlesByDate(LocalDate date);

    List<MenuArticleResponse> getNewestArticle();

}
