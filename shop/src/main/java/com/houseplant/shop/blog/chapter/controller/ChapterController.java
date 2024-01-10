package com.houseplant.shop.blog.chapter.controller;


import com.houseplant.shop.blog.chapter.model.ChapterResponse;
import com.houseplant.shop.blog.chapter.model.MenuChapterResponse;
import com.houseplant.shop.blog.chapter.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chapters")
@RequiredArgsConstructor
public class ChapterController {
    private final ChapterService chapterService;

    @GetMapping
    public ResponseEntity<List<ChapterResponse>> getChapters() {
        var chapters = chapterService.getChapters();
        return new ResponseEntity<>(chapters, HttpStatus.OK);
    }

    @GetMapping("/menu")
    public ResponseEntity<List<MenuChapterResponse>> getMenuChapters() {
        var chapters = chapterService.getMenuChapters();
        return new ResponseEntity<>(chapters, HttpStatus.OK);
    }
}
