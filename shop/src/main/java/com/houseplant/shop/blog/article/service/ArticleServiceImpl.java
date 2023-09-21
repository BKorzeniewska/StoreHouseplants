package com.houseplant.shop.blog.article.service;


import com.houseplant.shop.blog.article.ArticleMapper;
import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
import com.houseplant.shop.blog.article.exception.InvalidDateException;
import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.MenuArticleResponse;
import com.houseplant.shop.blog.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;




    @Override
    public ArticleResponse getArticleById(Long articleId) {
        var article = articleRepository
                .findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException(
                        "Article with provided ID not found", "ARTICLE_NOT_FOUND"));
        return articleMapper.toArticleResponse(article);
    }

    @Override
    public List<ArticleResponse> getArticlesByTitleContaining(String titleFragment) {
        var articles = articleRepository
                .findByTitleContaining(titleFragment)
                .orElseThrow(() -> new ArticleNotFoundException(
                        "Articles with provided title's fragment not found", "ARTICLES_NOT_FOUND"));

        return articles.stream()
                .map(articleMapper::toArticleResponse)
                .toList();
    }

    @Override
    public List<ArticleResponse> getArticlesByDateBetween(LocalDate startDate, LocalDate endDate) {
        if (startDate.isAfter(endDate))
            throw new InvalidDateException("End data is earlier than start date", "INVALID_DATE");
        var articles = articleRepository
                .findByCreationDateBetween(startDate, endDate)
                .orElseThrow(() -> new ArticleNotFoundException(
                        "Articles with provided timestamp between" + startDate + " and " + endDate + "  not found", "ARTICLES_NOT_FOUND"));

        return articles.stream()
                .map(articleMapper::toArticleResponse)
                .toList();
    }

    @Override
    public List<ArticleResponse> getArticlesByDate(LocalDate date) {
        var articles = articleRepository
                .findByCreationDate(date)
                .orElseThrow(() -> new ArticleNotFoundException(
                        "Articles with provided date not found", "ARTICLES_NOT_FOUND"));

        return articles.stream()
                .map(articleMapper::toArticleResponse)
                .toList();
    }

    @Override
    public List<MenuArticleResponse> getNewestArticle() {
        List<Article> articles = articleRepository.findTop5ByOrderByCreationDateDesc();

        return articles.stream()
                .map(article -> MenuArticleResponse.builder()
                        .id(article.getId())
                        .title(article.getTitle())
                        .build())
                .toList();
    }

}
