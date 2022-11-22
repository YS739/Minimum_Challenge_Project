// import { handleAuth, onToggle } from "./pages/auth.js";
// import { logout } from "loginmain.html"; // 윤숙 - index로 되어 있어서 loginmain으로 바꿈
// import { changeProfile, onFileChange } from "./pages/profile.js";
// import { socialLogin } from "./pages/auth.js";
import { handleLocation, route } from "./router.js";
// 윤숙 goToProfile 잠시 제외함!(페이지 이동이 안 돼서)
// import { authService } from "./firebase.js";

// import {
//   save_comment,
//   update_comment,
//   onEditing,
//   delete_comment,
// } from "./pages/feed.js";

window.addEventListener("hashchange", handleLocation);

// 윤숙 - 아래 주석 처리된 코드 쓰면 이 부분 지우기
document.addEventListener("DOMContentLoaded", handleLocation);

// 윤숙 - 회원가입이 되면 쓸 코드라 잠시 주석 처리
// document.addEventListener("DOMContentLoaded", function () {
//   authService.onAuthStateChanged((user) => {
//     handleLocation();
//     const hash = window.location.hash;
//     if (user) {
//       if (hash === "") {
//         alert("로그인 성공");
//         window.location.replace("#loginmain");
//       }
//     } else {
//       if (hash !== "") {
//         alert("로그아웃 성공");
//         window.location.replace("");
//       }
//     }
//   });
// });

// function closeTabClick() {
//   window.close();
// }

// onclick, onchange, onsubmit 이벤트 핸들러 리스트
window.route = route;
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
