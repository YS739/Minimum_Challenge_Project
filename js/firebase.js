// 더 이상 수정 안 해도 됩니다!! 건들지 마세욤!!

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 윤숙 firebase minimumproject
// 본인 프로젝트 script 코드 이 부분만 긁어오기
const firebaseConfig = {
  apiKey: "AIzaSyA-RnOOymnWgkfryru8lWITGO21QRrX20w",
  authDomain: "minimumproject-96fe6.firebaseapp.com",
  projectId: "minimumproject-96fe6",
  storageBucket: "minimumproject-96fe6.appspot.com",
  messagingSenderId: "650441348711",
  appId: "1:650441348711:web:f741d20c81a7df69cea6c2",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
