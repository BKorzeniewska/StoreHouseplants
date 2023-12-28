package com.houseplant.shop.blog.chapter.controller;

import com.houseplant.shop.blog.chapter.model.ChapterResponse;
import com.houseplant.shop.blog.chapter.model.CreateChapterRequest;
import com.houseplant.shop.blog.chapter.service.ChapterService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@RestController
@RequestMapping("/api/admin/v1/chapters")
@RequiredArgsConstructor
@Log4j2
public class ChapterAdminController {

    private final ChapterService chapterService;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MODERATOR')")
    @Operation(summary = "Create a new chapter")
    @PostMapping("/create")
    public ResponseEntity<ChapterResponse> createChapter(@RequestBody final CreateChapterRequest chapterRequest) {
        var chapter = chapterService.createChapter(chapterRequest);
        return new ResponseEntity<>(chapter, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MODERATOR')")
    @DeleteMapping("/delete/{chapterId}")
    public ResponseEntity<?> deleteChapter(@PathVariable("chapterId") final Long chapterId) {
        log.info("deleteChapter() - start: {}", chapterId);
        chapterService.deleteChapter(chapterId);
        log.info("deleteChapter() - end");
        return new ResponseEntity<>(chapterId, HttpStatus.OK);
    }
}
