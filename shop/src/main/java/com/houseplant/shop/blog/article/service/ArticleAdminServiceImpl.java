package com.houseplant.shop.blog.article.service;


import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import com.houseplant.shop.blog.article.model.ModifyArticleRequest;
import com.houseplant.shop.blog.article.model.VisibleChangeRequest;
import com.houseplant.shop.blog.article.repository.ArticleRepository;
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

    @Override
    public ArticleResponse createArticle(CreateArticleRequest request) {
        return null;
    }

    @Override
    public ArticleResponse changeVisibleArticle(VisibleChangeRequest request) {
        return null;
    }

    @Override
    public ArticleResponse modifyArticle(ModifyArticleRequest request) {
        return null;
    }

    @Override
    public void deleteArticle(Long articleId) {

    }
}
