/* 체크 */
import {
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export const getPostList = async () => {
  let pstObjList = [];
  const q = query(
    collection(dbService, "minipost"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      id: doc.id,
      ...doc.data(),
    };
    pstObjList.push(postObj);
  });
  console.log(pstObjList);
  const postList = document.getElementById("post-list");
  const currentUid = authService.currentUser.uid;
  postList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
    const isOwner = currentUid === ptObj.creatorId
    const temp_html = `<div class="postingbox">
        <div class="postPic"><img class="postPicImg" width="100px" height="100px"  src="${
          ptObj.postpic
        }"></div>
        <div class="contentbox">
            <p class="postTitle">${ptObj.title}</p>
            <p class="postContent">${ptObj.post}</p>
            <footer class="posting-footer"><div><img class="myProfileImg" width="50px" height="50px"  src="${
              ptObj.profileImg
            }" alt="profileImg" /><span>${
      ptObj.nickname ?? "회원"
    }</span></div><div class="postAt">${new Date(ptObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
            </div>
          </div>`;
    const div = document.createElement("div");
    div.classList.add("mypost");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
};
// 어떤 값을 초기화 해야 할지 몰라서 일단 주석 처리
// pstObjList.value = "";
getPostList();
