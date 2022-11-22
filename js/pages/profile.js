import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
    event.preventDefault();
    // 여러번 클릭 못하게 한 것
    document.getElementById("profileBtn").disabled = true;
    const imgRef = ref(
      storageService,
      `${authService.currentUser.uid}/${uuidv4()}`
    );
};
