// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimumproject
// 본인 프로젝트 script 코드 이 부분만 긁어오기
const firebaseConfig = {
  apiKey: "AIzaSyDh1ZLFhgMWfNb5SEUfEOcnBaYXaL7HVRE",
  authDomain: "minimum-eb41f.firebaseapp.com",
  projectId: "minimum-eb41f",
  storageBucket: "minimum-eb41f.appspot.com",
  messagingSenderId: "674228747687",
  appId: "1:674228747687:web:ce945df4d785b57753ca82"
};
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
