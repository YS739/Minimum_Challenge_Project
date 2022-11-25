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

// post 부분
export const getOnePost = async () => {
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
  const onePostList = document.getElementById("showPostCmt");
  const currentUid = authService.currentUser.uid;
  // onePostList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
    const isOwner = currentUid === ptObj.creatorId;
    const temp_html = `<div class="postBox">
    <div class="onePostPic">
      <img
        class="postPicImg"
  
        src="${ptObj.postpic}"
      />
      <p id="${
        ptObj.id
      }" class="noPostDisplay"><button class="updatePostBtn" onclick="update_post(event)">완료</button></p>
      <div class="${isOwner ? "updatePostBtn" : "noPostDisplay"}">
          <button onclick="edit_Post(event)" class="editPostBtn">수정</button>
       <button name="${
         ptObj.id
       }" onclick="delete_Post(event)" class="deletePostBtn">삭제</button>
     </div>  
    </div>
    <div class="allPostingBox">
      <div class="postUserBox">
        <div class="userPofile">
          <img
            class="myProfileImg"
  
            src="${ptObj.profileImg}"
            alt="profileImg"
          /><span class="postUserName">${ptObj.nickname ?? "회원"}</span>
        </div>

      </div>
      <div class="postCmtBox">
        <div class="postContentBox">
          <p class="contentTitle">${ptObj.title}</p>
          <p class="contentMain">${ptObj.post}</p>
          <div class="onePostAt">
            ${new Date(ptObj.createdAt).toString().slice(0, 25)}
          </div>
        </div>
        <!-- <div class="postCmtBox">
                  <div class="inputCmt"></div>
                  <div class="postComments"></div>
              </div> -->
      </div>
    </div>
  </div>
  `;
    const div = document.createElement("div");
    div.classList.add("myFeed");
    div.innerHTML = temp_html;
    onePostList.appendChild(div);
  });
};
// 어떤 값을 초기화 해야 할지 몰라서 일단 주석 처리
// pstObjList.value = "";
getOnePost();

// 포스트 수정, 삭제
export const edit_Post = (event) => {
  event.preventDefault();
  const postUdBtns = document.querySelectorAll(".editPostBtn, .deletePostBtn");
  postUdBtns.forEach((udBtn) => (udBtn.disabled = "true"));
  // 수정하는 부분(제목, 글, 사진)마다 parentNode? 다 있어야함..

  const cardBody = event.target.parentNode.parentNode;
  const commentText = cardBody.children[0].children[0];
  const commentInputP = cardBody.children[0].children[1];

  commentText.classList.add("noDisplay");
  commentInputP.classList.add("d-flex");
  commentInputP.classList.remove("noDisplay");
  commentInputP.children[0].focus();
};

export const update_post = async (event) => {
  event.preventDefault();
  const newPost = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const commentText = parentNode.children[0];
  commentText.classList.remove("noDisplay");
  const commentInputP = parentNode.children[1];
  commentInputP.classList.remove("d-flex");
  commentInputP.classList.add("noDisplay");

  const postRef = doc(dbService, "minipost", id);
  try {
    await updateDoc(postRef, { text: newPost });
    // text, postPic 등 다 추가해야함
    getOnePost();
  } catch (error) {
    alert(error);
  }
};

export const delete_Post = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "minipost", id));
      getOnePost();
    } catch (error) {
      alert(error);
    }
  }
};

// 댓글부분

export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById("feedComment");
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
    getFeedCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const onEditing = (event) => {
  // 수정버튼 클릭
  event.preventDefault();
  const udBtns = document.querySelectorAll(".cmtEditBtn, .cmtDelBtn");
  udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

  const cardBody = event.target.parentNode.parentNode;
  const commentText = cardBody.children[0].children[0];
  const commentInputP = cardBody.children[0].children[1];

  commentText.classList.add("noDisplay");
  commentInputP.classList.add("d-flex");
  commentInputP.classList.remove("noDisplay");
  commentInputP.children[0].focus();
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
    getFeedCommentList();
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
      getFeedCommentList();
    } catch (error) {
      alert(error);
    }
  }
};

export const getFeedCommentList = async () => {
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
  const commentList = document.getElementById("feedCmt-list");
  const currentUid = authService.currentUser.uid;
  commentList.innerHTML = "";
  cmtObjList.forEach((cmtObj) => {
    const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `<div class="feed-commentCard">
            <div class="feed-cards">
                <blockquote class="blockquote mb-0">
                    <p class="commentText">${cmtObj.text}</p>
                    <p id="${
                      cmtObj.id
                    }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
                    <footer class="feedCards-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
                      cmtObj.profileImg
                    }" alt="profileImg" /><span>${
      cmtObj.nickname ?? "회원"
    }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
                </blockquote>
                <div class="${isOwner ? "updateBtns" : "noDisplay"}">
                     <button onclick="onEditing(event)" class="cmtEditBt">수정</button>
                  <button name="${
                    cmtObj.id
                  }" onclick="delete_comment(event)" class="cmtDelBtn">삭제</button>
                </div>            
              </div>
       </div>`;
    const div = document.createElement("div");
    div.classList.add("feedCards");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};
