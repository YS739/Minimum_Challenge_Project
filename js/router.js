import { authService } from "./firebase.js";
import { getPostList } from "./pages/loginmain.js";
import { getFeedCommentList } from "./pages/community.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/index.html",
  post: "/pages/post.html",
  profile: "/pages/profile.html",
  mypage: "/pages/mypage.html",

  auth: "/pages/auth.html",
  loginmain: "/pages/loginmain.html",
  community: "/pages/community.html",
  404: "/pages/404.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // ""

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
    getPostList(); //이 함수땜에 로그아웃해도 나오네요 이미지
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]

  const html = await fetch(route).then((data) => data.text());

  document.getElementById("root").innerHTML = html;

  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === "loginmain") {
    getPostList();
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    document.getElementById("nickname").textContent =
      authService.currentUser.displayName ?? "회원";

    document.getElementById("profileImg").src =
      authService.currentUser.photoURL ?? "/img/강아지.jpg";

    // 프로필 모달 기능 구현
    const modalProfile = document.getElementById("profile-modal");
    const btnModalProfile = document.getElementById("goMyBtn");
    btnModalProfile.addEventListener("click", (f) => {
      modalProfile.style.display = "flex";
    });

    const closeProBtn = modalProfile.querySelector("#closeProfileBtn");
    closeProBtn.addEventListener("click", (f) => {
      modalProfile.style.display = "none";
    });

    modalProfile.addEventListener("click", (f) => {
      const evTarget1 = f.target;
      if (evTarget1.classList.contains("blackModal")) {
        modalProfile.style.display = "none";
      }
    });
  }

  if (path === "community") {
    getFeedCommentList();
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

  // 로그인 모달 기능 구현 자바스크립트
  const modal = document.getElementById("login-modal");
  const btnModal = document.getElementById("loginButton");
  btnModal.addEventListener("click", (e) => {
    modal.style.display = "flex";
  });

  const closeBtn = modal.querySelector("#closeBtn");
  closeBtn.addEventListener("click", (e) => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    const evTarget = e.target;
    if (evTarget.classList.contains("modal-overlay")) {
      modal.style.display = "none";
    }
  });
};
// 윤숙 - 다른 페이지 이동할 때!
export const goToPost = () => {
  window.location.hash = "#post";
};

export const goToProfile = () => {
  window.location.hash = "#profile";
};

export const goToHome = () => {
  window.location.hash = "";
};

export const goToMyWrite = () => {
  window.location.hash = "#post";
};

export const goToMyEdit = () => {
  window.location.hash = "#profile";
};
