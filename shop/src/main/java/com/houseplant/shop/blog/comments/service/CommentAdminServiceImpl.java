package com.houseplant.shop.blog.comments.service;


import com.houseplant.shop.blog.comments.model.Comment;
import com.houseplant.shop.blog.comments.repository.CommentRepository;
import com.houseplant.shop.blog.comments.exception.CommentNotFoundException;
import com.houseplant.shop.user.exception.UserRequestException;
import com.houseplant.shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentAdminServiceImpl implements CommentAdminService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    @Override
    public void deleteComment(final Long commentId) {
        if (commentId == null) {
            throw new CommentNotFoundException("Comment ID cannot be null", "COMMENT_ID_NULL");
        }
        //TODO : add validation user privilege

        commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment with provided ID not found", "COMMENT_NOT_FOUND"));
        commentRepository.deleteById(commentId);
    }

    private void checkIfCommentIsCreatedByUser(final Long commentId) {
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment with provided ID not found", "COMMENT_NOT_FOUND"));

    }
}
