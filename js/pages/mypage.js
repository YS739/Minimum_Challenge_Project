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
    const isOwner = currentUid === ptObj.creatorId;
    const temp_html = `<div class="card postCard">
    <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p class="commentText">${ptObj.text}</p>
            <p id="${
              ptObj.id
            }" class="noDisplay"><input class="newCmtInput" type="text" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
            <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
              ptObj.profileImg
            }" alt="profileImg" /><span>${
      ptObj.nickname ?? "회원"
    }</span></div><div class="cmtAt">${new Date(ptObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
        </blockquote>
        <div class="${isOwner ? "updateBtns" : "noDisplay"}">
             <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
          <button name="${
            ptObj.id
          }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
        </div>            
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
