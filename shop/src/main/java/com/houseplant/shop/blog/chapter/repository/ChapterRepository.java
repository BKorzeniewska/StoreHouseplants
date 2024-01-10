package com.houseplant.shop.blog.chapter.repository;



import com.houseplant.shop.blog.chapter.model.Chapter;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    @Query("SELECT c FROM Chapter c")
    List<Chapter> findAllChaptersForMenu();
    @Transactional
    @Modifying
    @Query("DELETE FROM Chapter c WHERE c.id = :chapterId")
    void deleteChapterById(final Long chapterId);

}
