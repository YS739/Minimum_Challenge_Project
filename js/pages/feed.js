// 댓글부분 입니다.
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
  
  export const save_comment = async (event) => {
    event.preventDefault();
    const comment = document.getElementById("feedComment");
    const { uid, photoURL, displayName } = authService.currentUser;
    try {
      await addDoc(collection(dbService, "feedCommentList"), {  // feedCommentList = firestore 저장되는 이름
        text: comment.value,
        createdAt: Date.now(),
        creatorId: uid, //id값을 만들어줘야 그 해당 id값을 가진 사람이 올린 댓글을 찾아 수정삭제할수잇어서
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
  }


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
    const temp_html = `<div class="card commentCard">
    <div class="card-body">
        <blockquote class="blockquote mb-0">
            <p class="commentText">${cmtObj.text}</p>
            <p id="${
              cmtObj.id
            }" class="noDisplay"><input class="newCmtInput" type="text"  /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
            <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
              cmtObj.profileImg
            }" alt="profileImg" /><span>${
      cmtObj.nickname ?? "회원"
    }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
      .toString()
      .slice(0, 25)}</div></footer>
        </blockquote>
        <div class="${isOwner ? "updateBtns" : "noDisplay"}">
             <button onclick="onEditing(event)" class="cmtEditBtn">수정</button>
          <button name="${
            cmtObj.id
          }" onclick="delete_comment(event)" class="cmtDelBtn">삭제</button>
        </div>            
      </div>
</div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;
    commentList.appendChild(div);
  });
};
