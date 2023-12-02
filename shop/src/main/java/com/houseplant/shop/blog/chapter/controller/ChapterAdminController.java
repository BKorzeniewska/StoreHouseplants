package com.houseplant.shop.blog.chapter.controller;

import com.houseplant.shop.blog.chapter.model.ChapterResponse;
import com.houseplant.shop.blog.chapter.model.CreateChapterRequest;
import com.houseplant.shop.blog.chapter.service.ChapterService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/v1/chapters")
@RequiredArgsConstructor
public class ChapterAdminController {

    private final ChapterService chapterService;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MODERATOR')")
    @Operation(summary = "Create a new chapter")
    @PostMapping("/create")
    public ResponseEntity<ChapterResponse> createChapter(@RequestBody final CreateChapterRequest chapterRequest) {
        var chapter = chapterService.createChapter(chapterRequest);
        return new ResponseEntity<>(chapter, HttpStatus.CREATED);
    }
}
