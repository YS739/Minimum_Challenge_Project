import { authService } from "./firebase.js";
import { getPostList } from "./pages/loginmain.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/index.html",
  post: "/pages/post.html",
  profile: "/pages/profile.html",
  mypage: "/pages/mypage.html",
  feed: "/pages/feed.html",
  auth: "/pages/auth.html",
  loginmain: "/pages/loginmain.html",
  404: "/pages/404.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // ""

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
    getPostList();
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]

  const html = await fetch(route).then((data) => data.text());

  document.getElementById("root").innerHTML = html;

  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === "loginmain") {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "회원";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "/img/강아지.jpg";
  }

  if (path === "mypage") {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    // 여기서 getpostlist 함수를 호출해야 마이페이지만 들어가도 포스트 불러오기가 됨
    getPostList();
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "회원";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "/img/강아지.jpg";
  }

  // 윤숙 - post.html, js 수정할 때 같이 볼 것
  if (path === "profile") {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/img/강아지.jpg";
    document.getElementById("profileNickname").placeholder =
      authService.currentUser.displayName ?? "회원";
  }

  const modal = document.getElementById("login-modal");
  const btnModal = document.getElementById("loginButton");
  btnModal.addEventListener("click", (e) => {
    modal.style.display = "flex";
  });

  const closeBtn = modal.querySelector("#closeBtn");
  closeBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });
};
// 윤숙 - 다른 페이지 이동할 때 이렇게 이벤트를 만들기!
export const goToPost = () => {
  window.location.hash = "#post";
};

export const goToMyPage = () => {
  window.location.hash = "#mypage";
};
