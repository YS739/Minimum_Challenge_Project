import { authService } from "./firebase.js";
import { handleLocation, route, goToPost, goToMyPage } from "./router.js";
import { socialLogin } from "./pages/auth.js";
import { handleAuth, onToggle } from "./pages/auth.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
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
// 새로 만든 이벤트 추가
window.goToPost = goToPost;
window.goToMyPage = goToMyPage;
