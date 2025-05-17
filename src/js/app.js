import { getPostsAPI } from "./services/getPostsAPI";
import { addPostAPI } from "./services/createPostAPI";
import { createPostsList } from "./markup/createPostsList";
import { deletePostAPI } from "./services/deletePostAPI";
import { updatePostAPI } from "./services/updatePostAPI";
import { throttle } from "lodash";

const postsList = document.querySelector(".blogs__posts");
const addBtn = document.querySelector(".blogs__add");

getPostsAPI().then((posts) => {
  postsList.innerHTML = createPostsList(posts);
});

const throttledActionHandler = throttle((id, post) => {
  updatePostAPI(id, post);
}, 2000);

postsList.addEventListener("click", async (e) => {
  if (
    e.target.classList.contains("blogs__btn--comment") ||
    e.target.parentNode.classList.contains("blogs__btn--comment") ||
    e.target.parentNode.parentNode.classList.contains("blogs__btn--comment")
  ) {
    const thePost = e.target.closest(".blogs__container");
    thePost.children[1].classList.toggle("comments--down");
    thePost.firstElementChild.lastElementChild.children[2].classList.toggle(
      "blogs__btn--clicked"
    );
    if (thePost.nextElementSibling === null) {
      addBtn.classList.toggle("blogs__add__down");
      if (addBtn.classList.contains("blogs__add__down")) {
        addBtn.style.marginTop = `${
          thePost.children[1].children.length >= 5
            ? 450
            : thePost.children[1].children.length <= 0
            ? 30
            : thePost.children[1].children.length * 100
        }px`;
      } else {
        addBtn.style.marginTop = `30px`;
      }
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
    const index = Array.from(postsList.children).indexOf(
      e.target.closest(".blogs__container")
    );
    await deletePostAPI(index + 1);
    await getPostsAPI().then((posts) => {
      postsList.innerHTML = createPostsList(posts);
      document.querySelector(".blogs__btn--comment");
    });
  } else if (
    e.target.classList.contains("blogs__btn--like") ||
    e.target.parentNode.classList.contains("blogs__btn--like") ||
    e.target.parentNode.parentNode.classList.contains("blogs__btn--like")
  ) {
    const thePost = e.target.closest(".blogs__container");
    thePost.firstElementChild.lastElementChild.firstElementChild.classList.toggle(
      "blogs__btn--clicked"
    );
    const numOfLikes = Number(
      thePost.firstElementChild.lastElementChild.firstElementChild
        .lastElementChild.textContent
    );
    if (
      thePost.firstElementChild.lastElementChild.firstElementChild.classList.contains(
        "blogs__btn--clicked"
      )
    ) {
      thePost.firstElementChild.lastElementChild.firstElementChild.lastElementChild.textContent =
        numOfLikes + 1;
    } else {
      thePost.firstElementChild.lastElementChild.firstElementChild.lastElementChild.textContent =
        numOfLikes - 1;
    }

    if (
      thePost.firstElementChild.lastElementChild.children[1].classList.contains(
        "blogs__btn--clicked"
      )
    ) {
      thePost.firstElementChild.lastElementChild.children[1].classList.toggle(
        "blogs__btn--clicked"
      );
      thePost.firstElementChild.lastElementChild.children[1].lastElementChild.textContent =
        Number(
          thePost.firstElementChild.lastElementChild.children[1]
            .lastElementChild.textContent
        ) - 1;
    }

    const post = {
      account:
        thePost.firstElementChild.children[1].firstElementChild.textContent,
      title: thePost.firstElementChild.firstElementChild.textContent,
      text: thePost.firstElementChild.children[2].textContent.trim(),
      numOfLikes:
        thePost.firstElementChild.lastElementChild.firstElementChild
          .lastElementChild.textContent,
      numOfDislikes:
        thePost.firstElementChild.lastElementChild.children[1].lastElementChild
          .textContent,
      comments: [],
    };
    for (let i = 0; i < thePost.lastElementChild.children.length; i++) {
      post.comments.push({
        commenter:
          thePost.lastElementChild.children[i].firstElementChild.textContent,
        comment:
          thePost.lastElementChild.children[i].lastElementChild.textContent,
      });
    }
    const index = Array.from(postsList.children).indexOf(
      e.target.closest(".blogs__container")
    );
    throttledActionHandler(index + 1, post);
  } else if (
    e.target.classList.contains("blogs__btn--dislike") ||
    e.target.parentNode.classList.contains("blogs__btn--dislike") ||
    e.target.parentNode.parentNode.classList.contains("blogs__btn--dislike")
  ) {
    const thePost = e.target.closest(".blogs__container");
    thePost.firstElementChild.lastElementChild.children[1].classList.toggle(
      "blogs__btn--clicked"
    );
    if (
      thePost.firstElementChild.lastElementChild.children[1].classList.contains(
        "blogs__btn--clicked"
      )
    ) {
      thePost.firstElementChild.lastElementChild.children[1].lastElementChild.textContent =
        Number(
          thePost.firstElementChild.lastElementChild.children[1]
            .lastElementChild.textContent
        ) + 1;
    } else {
      thePost.firstElementChild.lastElementChild.children[1].lastElementChild.textContent =
        Number(
          thePost.firstElementChild.lastElementChild.children[1]
            .lastElementChild.textContent
        ) - 1;
    }

    if (
      thePost.firstElementChild.lastElementChild.firstElementChild.classList.contains(
        "blogs__btn--clicked"
      )
    ) {
      thePost.firstElementChild.lastElementChild.firstElementChild.classList.toggle(
        "blogs__btn--clicked"
      );
      thePost.firstElementChild.lastElementChild.firstElementChild.lastElementChild.textContent =
        Number(
          thePost.firstElementChild.lastElementChild.firstElementChild
            .lastElementChild.textContent
        ) - 1;
    }

    const post = {
      account:
        thePost.firstElementChild.children[1].firstElementChild.textContent,
      title: thePost.firstElementChild.firstElementChild.textContent,
      text: thePost.firstElementChild.children[2].textContent.trim(),
      numOfLikes:
        thePost.firstElementChild.lastElementChild.firstElementChild
          .lastElementChild.textContent,
      numOfDislikes:
        thePost.firstElementChild.lastElementChild.children[1].lastElementChild
          .textContent,
      comments: [],
    };
    for (let i = 0; i < thePost.lastElementChild.children.length; i++) {
      post.comments.push({
        commenter:
          thePost.lastElementChild.children[i].firstElementChild.textContent,
        comment:
          thePost.lastElementChild.children[i].lastElementChild.textContent,
      });
    }
    const index = Array.from(postsList.children).indexOf(
      e.target.closest(".blogs__container")
    );
    throttledActionHandler(index + 1, post);
  }
});

document
  .querySelector(".add__cancel")
  .addEventListener("click", (e) =>
    document.querySelector(".add__backdrop").classList.add("is-hidden")
  );

addBtn.addEventListener("click", (e) =>
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

const loginModal = document.querySelector(".login__backdrop");
const registerModal = document.querySelector(".register__backdrop");

document
  .querySelector(".header__btn--login")
  .addEventListener("click", (event) =>
    loginModal.classList.remove("is-hidden")
  );
document.querySelector(".login__link").addEventListener("click", (event) => {
  event.preventDefault();
  registerModal.classList.remove("is-hidden");
  loginModal.classList.add("is-hidden");
});
document
  .querySelector(".login__backdrop")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("login__backdrop")) {
      loginModal.classList.add("is-hidden");
    }
  });

document
  .querySelector(".header__btn--register")
  .addEventListener("click", (event) =>
    registerModal.classList.remove("is-hidden")
  );
document.querySelector(".register__link").addEventListener("click", (event) => {
  event.preventDefault();
  loginModal.classList.remove("is-hidden");
  registerModal.classList.add("is-hidden");
});
document
  .querySelector(".register__backdrop")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("register__backdrop")) {
      registerModal.classList.add("is-hidden");
    }
  });
