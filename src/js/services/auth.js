// auth.js
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const loginForm = document.querySelector(".login__form");
const registerForm = document.querySelector(".register__form");

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = loginForm.querySelectorAll(".login__input");
  const email = inputs[0].value.trim();
  const password = inputs[1].value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Logged in successfully!");
      console.log(userCredential.user);
      document.querySelector(".login__backdrop").classList.add("is-hidden");
    })
    .catch((error) => {
      alert(error.message);
    });

  document.querySelector(
    ".header__text"
  ).textContent = `Account in use: ${email}`;
});

// REGISTER
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = registerForm.querySelectorAll(".register__input");
  const email = inputs[0].value.trim();
  const name = inputs[1].value.trim(); // Save this later in Firestore
  const password = inputs[2].value.trim();
  const confirmPassword = inputs[3].value.trim();

  if (password !== confirmPassword) {
    return alert("Passwords don't match!");
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created!");
      console.log(userCredential.user);
      // save `name` to Firestore here
      document.querySelector(".register__backdrop").classList.add("is-hidden");
    })
    .catch((error) => {
      alert(error.message);
    });
});
