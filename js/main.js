import { authService } from "./firebase.js";
import { handleLocation, route, goToPost, goToMyPage } from "./router.js";
// 윤숙 - 새로 만든 이벤트들 이렇게 수입(import)까지 잘 하기!
import { socialLogin } from "./pages/auth.js";
import { handleAuth, onToggle } from "./pages/auth.js";
// 유안 - 프로필.js 수입!
import { changeProfile, onFileChange } from "./pages/profile.js";

window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시
document.addEventListener("DOMContentLoaded", () => {
  authService.onAuthStateChanged((user) => {
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      if (hash === "auth") {
        window.location.replace("#loginmain");
      }
    } else {
      if (hash !== "") {
        window.location.replace("");
      }
    }
  });
});

// 전역 함수 리스트
window.route = route;
window.onToggle = onToggle;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
// 윤숙 - 새로 만든 이벤트 추가
window.goToPost = goToPost;
window.goToMyPage = goToMyPage;
// 유안 - 프로필 사진 변경
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
