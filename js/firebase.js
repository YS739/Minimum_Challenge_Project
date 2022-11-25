// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimumproject
// 본인 프로젝트 script 코드 이 부분만 긁어오기
// 또 사용량 초과 spaprac key
const firebaseConfig = {
  apiKey: "AIzaSyBRPVg8-dgA06Dq8JbVllOF04T8e2ZgA4w",
  authDomain: "spaprac-82004.firebaseapp.com",
  projectId: "spaprac-82004",
  storageBucket: "spaprac-82004.appspot.com",
  messagingSenderId: "91765872556",
  appId: "1:91765872556:web:4effc865167d38058b0c09",
};
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
