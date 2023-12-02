package com.houseplant.shop.blog.chapter.service;



import com.houseplant.shop.blog.chapter.model.ChapterResponse;
import com.houseplant.shop.blog.chapter.model.CreateChapterRequest;
import com.houseplant.shop.blog.chapter.model.MenuChapterResponse;

import java.util.List;

public interface ChapterService {
    ChapterResponse createChapter( CreateChapterRequest chapterRequest);
    List<ChapterResponse> getChapters();
    List<MenuChapterResponse> getMenuChapters();
}
