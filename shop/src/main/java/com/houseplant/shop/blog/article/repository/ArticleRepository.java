package com.houseplant.shop.blog.article.repository;


import com.houseplant.shop.blog.article.model.Article;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("SELECT a FROM Article a WHERE a.title LIKE %:titleFragment%")
    Optional<List<Article>> findByTitleContaining(String titleFragment);

    @Query("SELECT a FROM Article a WHERE a.creationDate BETWEEN :startDate AND :endDate")
    Optional<List<Article>> findByCreationDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT a FROM Article a WHERE a.creationDate=:date")
    Optional<List<Article>> findByCreationDate(LocalDate date);

    @Transactional
    @Modifying
    @Query(value = "UPDATE article SET title = :title, content = :content, visible = :visible WHERE article_id = :articleId", nativeQuery = true)
    void updateArticle(final String title, final String content, final boolean visible, final Long articleId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Article a WHERE a.id = :articleId")
    void deleteArticleById(final Long articleId);

    @Query("SELECT a FROM Article a WHERE a.visible = true ORDER BY a.creationDate DESC LIMIT 6")
    List<Article> findTop5ByOrderByCreationDateDesc();


}