package com.houseplant.shop.blog.article;



import com.houseplant.shop.accessories.category.model.AccessoryCategory;
import com.houseplant.shop.accessories.category.model.AccessoryCategoryResponse;
import com.houseplant.shop.accessories.category.model.CreateAccessoryCategoryRequest;
import com.houseplant.shop.blog.article.model.Article;
import com.houseplant.shop.blog.article.model.ArticleResponse;
import com.houseplant.shop.blog.article.model.CreateArticleRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ArticleMapper {
    Article toArticle(final CreateArticleRequest createArticleRequest);


    ArticleResponse toArticleResponse(Article article);
}
