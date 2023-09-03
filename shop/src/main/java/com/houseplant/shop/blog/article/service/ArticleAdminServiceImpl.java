package com.houseplant.shop.blog.article.service;


import com.houseplant.shop.blog.article.ArticleMapper;
import com.houseplant.shop.blog.article.exception.ArticleNotFoundException;
import com.houseplant.shop.blog.article.model.*;
import com.houseplant.shop.blog.article.repository.ArticleRepository;
import com.houseplant.shop.blog.comments.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Log4j2
@RequiredArgsConstructor
public class ArticleAdminServiceImpl implements ArticleAdminService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final CommentRepository commentRepository;

    @Override
    public ArticleResponse createArticle(CreateArticleRequest request) {
        if (request.getTitle() == null || request.getTitle().isEmpty()) {
            throw new ArticleNotFoundException("Article title cannot be null or empty", "ARTICLE_TITLE_EMPTY");
        }

        if (request.getContent() == null || request.getContent().isEmpty()) {
            throw new ArticleNotFoundException("Article content cannot be null or empty", "ARTICLE_CONTENT_EMPTY");
        }



        var article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .creationDate(LocalDate.now())
                .visible(false)
                .build();

        articleRepository.save(article);

        log.info("article: {}", article.getTitle());

        return articleMapper.toArticleResponse(article);
    }

    @Override
    public ArticleResponse changeVisibleArticle(VisibleChangeRequest request) {
        if (request.getArticleId() == null) {
            throw new ArticleNotFoundException("Article ID cannot be null", "ARTICLE_ID_NULL");
        }

        final Article article = articleRepository.findById(request.getArticleId())
                .orElseThrow(() -> new ArticleNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        if (request.getVisible() != null) {
            article.setVisible(request.getVisible());
        }

        articleRepository.updateArticle(article.getTitle(), article.getContent(), article.getVisible(), article.getId());

        final Article updatedArticle = articleRepository.findById(request.getArticleId())
                .orElseThrow(() -> new ArticleNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        return articleMapper.toArticleResponse(updatedArticle);
    }

    @Override
    public ArticleResponse modifyArticle(ModifyArticleRequest request) {
        if (request.getId() == null) {
            throw new ArticleNotFoundException("Article ID cannot be null", "ARTICLE_ID_NULL");
        }

        final Article article = articleRepository.findById(request.getId())
                .orElseThrow(() -> new ArticleNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        log.info("Updating article with id: {}", article.getId());

        if (request.getTitle() != null) {
            article.setTitle(request.getTitle());
        }

        if (request.getContent() != null) {
            article.setContent(request.getContent());
        }
        if (request.getVisible() != null) {
            article.setVisible(request.getVisible());
        }

        articleRepository.updateArticle(article.getTitle(), article.getContent(), article.getVisible(), article.getId());

        final Article updatedArticle = articleRepository.findById(request.getId())
                .orElseThrow(() -> new ArticleNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));

        return articleMapper.toArticleResponse(updatedArticle);
    }

    @Override
    public void deleteArticle(Long articleId) {
        if (articleId == null) {
            throw new ArticleNotFoundException("Article ID cannot be null", "ARTICLE_ID_NULL");
        }

        final Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ArticleNotFoundException("Article with provided ID not found", "ARTICLE_NOT_FOUND"));
        article.setComments(null);

        int rows = commentRepository.updateArticleToNull(articleId);
        log.info("Updated {} rows", rows);

        articleRepository.deleteArticleById(articleId);
    }
}
