import { authService, storageService } from "../firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
    event.preventDefault();
    // 여러번 클릭 못하게 한 것
    document.getElementById("profileBtn").disabled = true;
    const imgRef = ref(
      //우리가 쓰는 storageService에 연결하는것, 스토리지서비스의 
      storageService,
      // 어떤 폴더안에 $uuidv4라는 이름의 파일을 저장하겠다. 
      // 우리가 만들어놓은 스토리지 서비스 안에, 
      // 폴더 이름이 ${authService.currentUser.uid}(현재유저의 유저아이디)
      // 현재 유저의 유저 아이디를 폴더로 만들고 그 폴더 안에 파일 이름은 uuidv4라는 해시값인데 이 값으로 저장을 할 것이다.
      // uuid란? 전세계적으로 겹치지않는 아이디를 만들어내는 라이브러리
      `${authService.currentUser.uid}/${uuidv4()}`
    );
    
    const newNickname = document.getElementById("profileNickname").value;
    // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
    // imgDataUrl에 값을 담는다.
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    let downloadUrl;
    if (imgDataUrl) {
      //이미지를 핸들링할 때 여러가지 타입이 있는데 그 중에 data_url이라는 타입의 이미지를 가장 많이 쓴다. 
      // data_url이라는 타입의 이미지는 브라우저에 이미지 url을 검색하면 이미지를 바로 볼 수 있다.
      // data_url이라는 타입의 이미지를 imgRef, 스토리지 서비스의 어디에 저장할건지 위치를 담고 있는 것
      // 즉, imgRef는 이미지 저장위치를 담고있다. 이미지를 어디에 저장할건지에 대한 변수를 담고,
      // imgDataUrl이 담긴 파일을 담고, "data_url"얘가 데이터url이라는 것을 명시한다음에
      // uploadString이라는 파이어베이스 스토리지에서 제공하는 api를 이용하면 response를 받을 수 있다. 
      // 정상적으로 reponse를 받는다는 건 파이어베이스 스토리지에 업로드가 됐습니다라는 뜻
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      // 그 response라는 객체에 ref라는 값이 있는데 걔가 바로 다운로드 url이다.
      // reponse에 ref값이 나오는데 reponse.ref값은 하나의 엄청나게 복잡한 객체.
      // response.ref값을 getDownloadURL이라는 api에다가 매개변수로 넣어서 나오는 reponse가 DownloadURL이다.
      // uploadString이라는 api를 통해서 파일을 스토리지에 업로드 하고, getDownloadURL을 통해서
      // downloadUrl을 받는 것이다.
      downloadUrl = await getDownloadURL(response.ref);
    }  
      // 화면에 이미지를 뿌릴 때 downloadUrl을 이용해서 뿌릴 거기 때문이다.
      // imgDagaUrl은 임시적으로 업로드를 하기 위한 준비단계에서 필요한 것뿐 바로 날라갈 애(임시적)
      // 영구적으로 쓸 건 downloadUrl
    await updateProfile(authService.currentUser, {
      displayName: newNickname ? newNickname : null,
      photoURL: downloadUrl ? downloadUrl : null,
    })