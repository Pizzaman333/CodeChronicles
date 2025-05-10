import { getPostsAPI } from "./services/getPostsAPI";
import { addPostAPI } from "./services/createPostAPI";
import { createPostsList } from "./markup/createPostsList";
import { deletePostAPI } from "./services/deletePostAPI";

const postsList = document.querySelector(".blogs__posts");

getPostsAPI().then((posts) => {
  postsList.innerHTML = createPostsList(posts);
  document.querySelector(".blogs__btn--comment");
});

postsList.addEventListener("click", async (e) => {
  if (
    e.target.classList.contains("blogs__btn--comment") ||
    e.target.parentNode.classList.contains("blogs__btn--comment") ||
    e.target.parentNode.parentNode.classList.contains("blogs__btn--comment")
  ) {
    const thePost = e.target.closest(".blogs__container");
    thePost.children[1].classList.toggle("comments--down");
    thePost.firstElementChild.lastElementChild.children[2].classList.toggle(
      "blogs__btn--comment--clicked"
    );

    if (thePost.nextElementSibling === null) {
      return;
    }
    thePost.nextElementSibling.classList.toggle("post-down");
    if (thePost.nextElementSibling.classList.contains("post-down")) {
      thePost.nextElementSibling.style.marginTop = `${
        thePost.children[1].children.length >= 5
          ? 430
          : thePost.children[1].children.length * 80
      }px`;
    } else {
      thePost.nextElementSibling.style.transition = "all 0.3s ease";
      thePost.nextElementSibling.style.marginTop = "0";
    }
  } else if (
    e.target.classList.contains("blogs__btn--delete") ||
    e.target.parentNode.classList.contains("blogs__btn--delete") ||
    e.target.parentNode.parentNode.classList.contains("blogs__btn--delete")
  ) {
    const index = Array.from(postsList.children).indexOf(e.target.closest(".blogs__container"));
    await deletePostAPI(index + 1);
    await getPostsAPI().then((posts) => {
    postsList.innerHTML = createPostsList(posts);
    document.querySelector(".blogs__btn--comment");
  });
  }
});

document
  .querySelector(".add__cancel")
  .addEventListener("click", (e) =>
    document.querySelector(".add__backdrop").classList.add("is-hidden")
  );

document
  .querySelector(".blogs__add")
  .addEventListener("click", (e) =>
    document.querySelector(".add__backdrop").classList.remove("is-hidden")
  );

document.querySelector(".add__modal").addEventListener("submit", async (e) => {
  e.preventDefault();
  const obj = {
    account: document.querySelector("#postAccount").value,
    title: document.querySelector("#postTitle").value,
    text: document.querySelector("#postText").value,
    numOfLikes: 0,
    numOfDislikes: 0,
    comments: [],
  };
  await addPostAPI(obj);
  await getPostsAPI().then((posts) => {
    postsList.innerHTML = createPostsList(posts);
    document.querySelector(".blogs__btn--comment");
  });
  document.querySelector(".add__backdrop").classList.add("is-hidden");
  document.querySelector("#postAccount").value = "";
  document.querySelector("#postTitle").value = "";
  document.querySelector("#postText").value = "";
});
