package com.houseplant.shop.blog.article.controller;

import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.MenuArticleResponse;
import com.houseplant.shop.blog.article.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/v1/article")
@Log4j2
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticleById(@PathVariable("id") Long articleId) {
        var article = articleService.getArticleById(articleId);
        return new ResponseEntity<>(article, HttpStatus.OK);
    }

    @GetMapping("/chapter/page/{chapterId}")
    public ResponseEntity<?> getArticlesByChapter(@PathVariable(name = "chapterId") Long chapterId) {
        var articles = articleService.getArticlePageByChapter(chapterId);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/chapter/{chapterId}")
    public ResponseEntity<?> getArticlesByChapterID(@PathVariable(name = "chapterId") Long chapterId) {
        var articles = articleService.getArticlesByChapter(chapterId);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/timestamp/{date}")
    public ResponseEntity<List<ArticleResponse>> getArticleByDate(@PathVariable("date") LocalDate date) {
        var articles = articleService.getArticlesByDate(date);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/title/{titleFragment}")
    public ResponseEntity<List<ArticleResponse>> getArticleByTitleContaining(@PathVariable("titleFragment") String titleFragment) {
        var articles = articleService.getArticlesByTitleContaining(titleFragment);
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @GetMapping("/newest")
    public ResponseEntity<List<MenuArticleResponse>> getNewestArticle() {
        var articles = articleService.getNewestArticle();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

}
