import {
  // doc,
  addDoc,
  // updateDoc,
  // deleteDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "../firebase.js";

export const save_post = async (event) => {
  event.preventDefault();
  // posting 내용에 따라 const 추가
  const postpic = document.getElementById("PostView").src;
  const category = document.getElementById("category");
  const title = document.getElementById("title");
  const content = document.getElementById("posting");
  const { uid, photoURL, displayName } = authService.currentUser;
  // const storage의 포스팅 사진 추가해야 함
  try {
    await addDoc(collection(dbService, "minipost"), {
      postpic: postpic,
      category: category.value,
      title: title.value,
      post: content.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    })
      .then(() => {
        alert("포스트 작성 완료");
        window.location.hash = "#mypage";
      })
      .catch((error) => {
        alert("포스트 작성 실패");
        console.log("error:", error);
      });
    // 기존 내 포스트 초기화 - 다시 가져오기 일단 주석처리
    // post.value = "";
    // getPostList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

export const onPostChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgPostDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgPostDataUrl", imgPostDataUrl);
    document.getElementById("PostView").src = imgPostDataUrl;
  };
};
