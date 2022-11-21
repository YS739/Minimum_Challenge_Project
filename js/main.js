import { handleAuth, onToggle } from "./pages/auth.js";
import { logout } from "index.html";
import { changeProfile, onFileChange } from "./pages/profile.js";
import { socialLogin } from "./pages/auth.js";
import { handleLocation, goToProfile } from "./router.js";
import { authService } from "./firebase.js";
import {
  save_comment,
  update_comment,
  onEditing,
  delete_comment,
} from "./pages/feed.js";

window.addEventListener("hashchange", handleLocation);

document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      if (hash === "") {
        window.location.replace("#loginmain");
      }
    } else {
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

// onclick, onchange, onsubmit 이벤트 핸들러 리스트
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.save_comment = save_comment;
window.update_comment = update_comment;
window.onEditing = onEditing;
window.delete_comment = delete_comment;
