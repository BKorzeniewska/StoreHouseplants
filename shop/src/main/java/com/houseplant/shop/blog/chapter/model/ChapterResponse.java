package com.houseplant.shop.blog.chapter.model;

import lombok.Builder;
import lombok.Data;

import java.sql.Blob;

@Data
@Builder
public class ChapterResponse {
    private Long id;
    private String name;
    private byte[] image;
}
