import { authService } from "./firebase.js";

// 윤숙 - 페이지 경로 설정함 / "/"이 auth.html이 아니라 index.html(우리의 메인 페이지)
const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  post: "/pages/post.html",
  profile: "/pages/profile.html",
  mypage: "/pages/mypage.html",
  feed: "/pages/feed.html",
  auth: "/pages/auth.html",
};

// 윤숙 - 댓글을 다는 창이 feed.html이니까 feed.js로 수정함
import { getCommentList } from "./pages/feed.js";

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", "");
  const pathName = window.location.pathname;

  // 윤숙 - 우리는 메인이 index.page니까 이 코드가 필요하지 않을 것 같아 일단 주석처리
  // Live Server를 index.html에서 오픈할 경우
  // if (pathName === "/index.html") {
  //   window.history.pushState({}, "", "/");
  // }

  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("root").innerHTML = html;

  if (path === "fanLog") {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "../assets/blankProfile.webp";

    getCommentList();
  }
  if (path === "profile") {
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
    // 윤숙 - 기본 프로필 사진을 정해서 "/assets~ 부분에 넣어야 함"
    document.getElementById("profileNickname").placeholder =
      authService.currentUser.displayName ?? "닉네임 없음";
    // 윤숙 - 닉네임 없을 시 "닉네임 없음"으로 그대로 할 건지?
  }
};

export const goToProfile = () => {
  window.location.hash = "#profile";
};