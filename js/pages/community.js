import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

// 댓글부분
export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("commuComment");
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "feedCommentList"), {
      text: comment.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    comment.value = "";
    getCommunityCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody = event.target.parentNode.parentNode;
  const commentText = cardBody.children[0].children[0];
  const commentInputP = cardBody.children[0].children[1];

  commentText.classList.add("noDisplay");
  commentInputP.classList.add("d-flex");
  commentInputP.classList.remove("noDisplay");
  commentInputP.children[0];
};

export const update_comment = async (event) => {
  event.preventDefault();
  const newComment = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const commentText = parentNode.children[0];
  commentText.classList.remove("noDisplay");
  const commentInputP = parentNode.children[1];
  commentInputP.classList.remove("d-flex");
  commentInputP.classList.add("noDisplay");

  const commentRef = doc(dbService, "feedCommentList", id);
  try {
    await updateDoc(commentRef, { text: newComment });
    getCommunityCommentList();
  } catch (error) {
    alert(error);
  }
};

export const delete_comment = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 댓글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "feedCommentList", id));
      getCommunityCommentList();
    } catch (error) {
      alert(error);
    }
  }
};

export const getCommunityCommentList = async () => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, "feedCommentList"),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
  });
  const commentList = document.getElementById("commuCmt-list");
  const currentUid = authService.currentUser.uid;
  commentList.innerHTML = "";
  cmtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `<div class="card commentCard">
    <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p class="commentText">${cmtObj.text}</p>
            <p id="${
              cmtObj.id
            }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
            <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmt-img" width="50px" height="50px" src="${
              cmtObj.profileImg
            }" alt="profileImg" /><span>${
      cmtObj.nickname ?? "회원"
    }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
        </blockquote>
        <div class="${isOwner ? "updateBtns" : "noDisplay"}">
             <button onclick="onEditing(event)" class="editBtn">수정</button>
          <button name="${
            cmtObj.id
          }" onclick="delete_comment(event)" class="deleteBtn">삭제</button>
        </div>            
      </div>
</div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};
