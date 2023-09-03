package com.houseplant.shop.blog.article.controller;

import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import com.houseplant.shop.blog.article.model.ModifyArticleRequest;
import com.houseplant.shop.blog.article.model.VisibleChangeRequest;
import com.houseplant.shop.blog.article.service.ArticleAdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/v1/article")
@RequiredArgsConstructor
@Log4j2
public class ArticleAdminController {

    private final ArticleAdminService articleAdminService;

    @PostMapping("/create")
    public ArticleResponse createArticle(@RequestBody CreateArticleRequest request) {
        return articleAdminService.createArticle(request);
    }

    @PostMapping("/visible")
    public ArticleResponse changeVisibleArticle(@RequestBody VisibleChangeRequest request) {
        return articleAdminService.changeVisibleArticle(request);
    }

    @PostMapping("/modify")
    public ArticleResponse modifyArticle(@RequestBody ModifyArticleRequest request) {
        return articleAdminService.modifyArticle(request);
    }

    @DeleteMapping("/{articleId}")
    public void deleteArticle(@PathVariable Long articleId) {
        articleAdminService.deleteArticle(articleId);
    }
}