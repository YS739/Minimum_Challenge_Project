import {
  collection,
  orderBy,
  query,
  getDocs,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService } from "../firebase.js";

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
    const temp_html = `<div class="postingBox">
                        <div class="postPic">
                          <img class="postPicImg" src="${ptObj.postPic}">
                        </div>
                        <div class="contentBox" >
                            <p class="postTitle">${ptObj.title}</p>
                            <p class="postContent">${ptObj.post}</p>
                            <footer class="posting-footer">

                              <div class="profile-dateWrap">
                              <div class="profileWrap">
                                <img class="myProfileImg" width="50px" height="50px" 
                                src="${
                                  ptObj.profileImg ??
                                  "https://velog.velcdn.com/images/chmi4/post/6d8a9e5f-2255-4c4b-8dd3-daeec31b95f4/image.jpg"
                                }" 
                                alt="profileImg" /></div>
                                <p class= "nameSim">${
                                  ptObj.nickname ?? "회원"
                                }</p>
                              
                              <div class="postAt">${new Date(ptObj.createdAt)
                                .toString()
                                .slice(0, 25)}
                              </div>
                              </div>  
                              

                            </footer>
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
    const temp_html = `<div class="postingBox">
    <div class="postPic">
      <img class="postPicImg" src="${ptObj.postPic}">
    </div>
    <div class="contentBox" >
        <p class="postTitle">${ptObj.title}</p>
        <p class="postContent">${ptObj.post}</p>
        <footer class="posting-footer">

          <div class="profile-dateWrap">
          <div class="profileWrap">
            <img class="myProfileImg" width="50px" height="50px" 
            src="${
              ptObj.profileImg ??
              "https://velog.velcdn.com/images/chmi4/post/6d8a9e5f-2255-4c4b-8dd3-daeec31b95f4/image.jpg"
            }" 
            alt="profileImg" /></div>
            <p class= "nameSim">${ptObj.nickname ?? "회원"}</p>
          
          <div class="postAt">${new Date(ptObj.createdAt)
            .toString()
            .slice(0, 25)}
          </div>
          </div>  
          

        </footer>
    </div>
  </div>`;
    const div = document.createElement("div");
    div.classList.add("postcards");
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
    const temp_html = `<div class="postingBox">
    <div class="postPic">
      <img class="postPicImg" src="${ptObj.postPic}">
    </div>
    <div class="contentBox" >
        <p class="postTitle">${ptObj.title}</p>
        <p class="postContent">${ptObj.post}</p>
        <footer class="posting-footer">

          <div class="profile-dateWrap">
          <div class="profileWrap">
            <img class="myProfileImg" width="50px" height="50px" 
            src="${
              ptObj.profileImg ??
              "https://velog.velcdn.com/images/chmi4/post/6d8a9e5f-2255-4c4b-8dd3-daeec31b95f4/image.jpg"
            }" 
            alt="profileImg" /></div>
            <p class= "nameSim">${ptObj.nickname ?? "회원"}</p>
          
          <div class="postAt">${new Date(ptObj.createdAt)
            .toString()
            .slice(0, 25)}
          </div>
          </div>  
          

        </footer>
    </div>
  </div>`;
    const div = document.createElement("div");
    div.classList.add("postcards");
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
    const temp_html = `<div class="postingBox">
    <div class="postPic">
      <img class="postPicImg" src="${ptObj.postPic}">
    </div>
    <div class="contentBox" >
        <p class="postTitle">${ptObj.title}</p>
        <p class="postContent">${ptObj.post}</p>
        <footer class="posting-footer">

          <div class="profile-dateWrap">
          <div class="profileWrap">
            <img class="myProfileImg" width="50px" height="50px" 
            src="${
              ptObj.profileImg ??
              "https://velog.velcdn.com/images/chmi4/post/6d8a9e5f-2255-4c4b-8dd3-daeec31b95f4/image.jpg"
            }" 
            alt="profileImg" /></div>
            <p class= "nameSim">${ptObj.nickname ?? "회원"}</p>
          
          <div class="postAt">${new Date(ptObj.createdAt)
            .toString()
            .slice(0, 25)}
          </div>
          </div>  
          

        </footer>
    </div>
  </div>`;
    const div = document.createElement("div");
    div.classList.add("postcards");
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

  const newNickname = document.getElementById("nickname").value;
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
