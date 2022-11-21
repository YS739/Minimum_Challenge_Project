import { handleAuth, onToggle, logout } from "./pages/auth.js";
import { changeProfile, onFileChange } from "./pages/profile.js";
import { socialLogin } from "./pages/auth.js";
import { handleLocation, goToProfile } from "./router.js";
import { authService } from "./firebase.js";
import {
  save_comment,
  update_comment,
  onEditing,
  delete_comment,
} from "./pages/fanLog.js";

window.addEventListener("hashchange", handleLocation);

document.addEventListener("DOMContentLoaded", function () {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      if (hash === "") {
        window.location.replace("");
      }
      //  윤숙- 로그인을 하고 로그인이 된 (글쓰기, 로그아웃, 프로필이 보이는)메인페이지로 보낼 건지,
      //  기존 메인페이지로 보내서 js로 글쓰기 버튼, 프로필을 추가해서 보여줄 건지 결정 필요
    } else {
      if (hash !== "") {
        window.location.replace("");
      }
      //  윤숙 - 이건 로그아웃 버튼을 눌렀을 때 메인페이지(로그인 버튼만 있는)로 가는 거라 괜찮을 것 같음
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
