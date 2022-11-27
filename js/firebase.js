// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimumproject
// 본인 프로젝트 script 코드 이 부분만 긁어오기
const firebaseConfig = {
  apiKey: "AIzaSyDDJmqt4zdCrpVkMQYGmlX3smYW5DlkpLk",
  authDomain: "challenge-c9950.firebaseapp.com",
  projectId: "challenge-c9950",
  storageBucket: "challenge-c9950.appspot.com",
  messagingSenderId: "790789880452",
  appId: "1:790789880452:web:2998d15737a191c33ee0d1",
};
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
