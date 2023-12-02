package com.houseplant.shop.blog.comment.service;

;
import com.houseplant.shop.blog.comment.exception.CommentNotFoundException;
import com.houseplant.shop.blog.comment.model.Comment;
import com.houseplant.shop.blog.comment.repository.CommentRepository;
import com.houseplant.shop.user.exception.*;
import com.houseplant.shop.user.model.entity.User;
import com.houseplant.shop.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentAdminServiceImpl implements CommentAdminService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    @Override
    public void deleteComment(final Long commentId, final String token) {

        if (token == null || !token.startsWith("Bearer ")) {
            throw new UserRequestException("Token or userId must be provided", "USER_NOT_FOUND");
        }
        final String jwt = token.substring(7);
        final User user = userRepository.findByToken(jwt).orElseThrow(() ->
                new UserNotFoundException("User with provided token not found", "USER_NOT_FOUND"));

        if (commentId == null) {
            throw new CommentNotFoundException("Comment ID cannot be null", "COMMENT_ID_NULL");
        }

        if (user.getRole().getValue() < 3) {
            checkIfCommentIsCreatedByUser(commentId, user);
        }

        commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment with provided ID not found", "COMMENT_NOT_FOUND"));
        commentRepository.deleteById(commentId);
    }

    private void checkIfCommentIsCreatedByUser(final Long commentId, final User user) {
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment with provided ID not found", "COMMENT_NOT_FOUND"));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new UserRequestException("User does not have permission to delete comment", "USER_NOT_AUTHORIZED");
        }
    }
}
