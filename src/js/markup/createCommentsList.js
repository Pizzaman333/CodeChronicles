export const createCommentsList = (comments) =>
  comments
    .map(
      (comment) =>
        `
 <li class="blogs__comment">
                  <h4 class="comments__author">${comment.commenter}</h4>
                  <p class="comments__text">${comment.comment}</p>
                </li>
      `
    )
    .join("");
