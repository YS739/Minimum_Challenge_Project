// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimumproject
// 본인 프로젝트 script 코드 이 부분만 긁어오기
const firebaseConfig = {
  apiKey: "AIzaSyCALyC0y-0Mmu1wyB3zbxmAKUSy0HmuhQU",
  authDomain: "minimum2-63270.firebaseapp.com",
  projectId: "minimum2-63270",
  storageBucket: "minimum2-63270.appspot.com",
  messagingSenderId: "451802140310",
  appId: "1:451802140310:web:4171acf3c8754496b93cb7",
};
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
