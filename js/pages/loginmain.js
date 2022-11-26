import {
  collection,
  orderBy,
  query,
  getDocs,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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
  const postList = document.getElementById("main-page");
  postList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
    const temp_html = `<div class="postingbox">


        <div class="postPic"><img class="postPicImg" width="100px" height="100px"  src="${
          ptObj.postpic
        }"></div>
        <div class="contentbox">
            <p class="postTitle">${ptObj.title}</p>
            <p class="postContent">${ptObj.post}</p>
            <footer class="posting-footer"><div><img class="myProfileImg" width="50px" height="50px"  src="${
              ptObj.profileImg ?? "/img/강아지.jpg"
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

// 운동하기 버튼
export const getWorkoutList = async () => {
  let pstObjList = [];
  const q = query(
    collection(dbService, "minipost"),
    where("category", "==", "운동하기"),

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
  const postList = document.getElementById("main-page");
  postList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
    // const isOwner = currentUid === ptObj.creatorId;
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

// 공부하기 버튼
export const getStudyList = async () => {
  let pstObjList = [];
  const q = query(
    collection(dbService, "minipost"),
    where("category", "==", "공부하기"),

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
  const postList = document.getElementById("main-page");
  postList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
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

// 독서하기 버튼
export const getBookList = async () => {
  let pstObjList = [];
  const q = query(
    collection(dbService, "minipost"),
    where("category", "==", "독서하기"),

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
  const postList = document.getElementById("main-page");
  postList.innerHTML = "";
  pstObjList.forEach((ptObj) => {
    // const isOwner = currentUid === ptObj.creatorId;
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

// profile.js for modal

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("profileBtnEdit").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }

  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "#loginmain";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
};

//프로필 사진을 클릭했을 때 나오는 동작
export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};
