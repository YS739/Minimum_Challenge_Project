// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimum project
// 본인 프로젝트 script 코드 이 부분만 긁어오기
const firebaseConfig = {
  apiKey: "AIzaSyD3o3-XC_gDlVs1ZjMyEap868XIXQUyjrc",
  authDomain: "minimum-3150e.firebaseapp.com",
  projectId: "minimum-3150e",
  storageBucket: "minimum-3150e.appspot.com",
  messagingSenderId: "325755616401",
  appId: "1:325755616401:web:07f0d070065e0b8e8c5330",
  measurementId: "G-5C66P5J89V"
};
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
