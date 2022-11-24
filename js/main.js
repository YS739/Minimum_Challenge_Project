import { authService } from "./firebase.js";
import {
  handleLocation,
  route,
  goToPost,
  goToMyPage,
  goToHome,
} from "./router.js";
// 윤숙 - 새로 만든 이벤트들 이렇게 수입(import)까지 잘 하기!
import { socialLogin } from "./pages/auth.js";
import { handleAuth, onToggle } from "./pages/auth.js";
// 유안 - 프로필.js 수입!
import { changeProfile, onFileChange } from "./pages/profile.js";
import { onPostChange, save_post } from "./pages/post.js";
import { getPostList } from "./pages/mypage.js";
import {
  save_comment,
  getFeedCommentList,
  onEditing,
  update_comment,
  delete_comment,
} from "./pages/feed.js";

window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시
document.addEventListener("DOMContentLoaded", () => {
  getPostList();

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
// post page에서 쓰는 이벤트
window.onPostChange = onPostChange;
window.save_post = save_post;
// my page event
window.getPostList = getPostList;
// 유안 - 프로필 사진 변경
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.goToHome = goToHome;
window.getFeedCommentList = getFeedCommentList;
window.onEditing = onEditing;
window.update_comment = update_comment;
window.delete_comment = delete_comment;
window.save_comment = save_comment;
