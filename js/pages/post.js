export const save_comment = async (event) => {
    event.preventDefault();
    const category = document.getElementById("category");
    const title = document.getElementById("titile");
    const comment = document.getElementById("comment");
    const { uid, photoURL, displayName } = authService.currentUser;
    try {
      await addDoc(collection(dbService, "comments"), {
        text: comment.value,
        post: content.value
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