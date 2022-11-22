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
  }
  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]

  const html = await fetch(route).then((data) => data.text());

  document.getElementById("root").innerHTML = html;
};