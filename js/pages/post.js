export const save_post = async (event) => {
  event.preventDefault();
  const title = document.getElementById("title");
  const content = document.getElementById("posting");
  const { uid, photoURL, displayName } = authService.currentUser;
  // const storage의 포스팅 사진 추가해야 함
  try {
    await addDoc(collection(dbService, "posting"), {
      //   윤숙 - 포스팅하는 사진 추가해야 함 photo:
      title: title.value,
      post: content.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    comment.value = "";
    getCommentList();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};
