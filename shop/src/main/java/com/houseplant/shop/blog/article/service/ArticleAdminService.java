package com.houseplant.shop.blog.article.service;


import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import com.houseplant.shop.blog.article.model.ModifyArticleRequest;
import com.houseplant.shop.blog.article.model.VisibleChangeRequest;

public interface ArticleAdminService {

    ArticleResponse createArticle(final CreateArticleRequest request, final String bearerToken);
    ArticleResponse changeVisibleArticle(final VisibleChangeRequest request);

    ArticleResponse modifyArticle(final ModifyArticleRequest request);

    void deleteArticle(final Long articleId);
}
