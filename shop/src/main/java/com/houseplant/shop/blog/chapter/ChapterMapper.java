package com.houseplant.shop.blog.chapter;


import com.houseplant.shop.blog.chapter.model.Chapter;
import com.houseplant.shop.blog.chapter.model.ChapterResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChapterMapper {
    ChapterResponse toChapterResponse(Chapter chapter);
}
