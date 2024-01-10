package com.houseplant.shop.blog.article;


import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import com.houseplant.shop.blog.article.model.MenuArticleResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(target="chapter.id", source="chapterId")
    Article toArticle(CreateArticleRequest createArticleRequest);

    @Mapping(target="chapterId", source="article.chapter.id")
    @Mapping(target="userId", source="article.user.id")
    @Mapping(target="date", source="article.creationDate")
    ArticleResponse toCreateArticleResponse(Article article);
    MenuArticleResponse toMenuArticleResponse(Article article);
}
