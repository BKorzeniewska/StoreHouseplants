package com.houseplant.shop.blog.chapter.model;


import com.houseplant.shop.blog.article.model.MenuArticleResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MenuChapterResponse {
    private Long id;
    private String name;
    private String image;
    private List<MenuArticleResponse> articles;
}
