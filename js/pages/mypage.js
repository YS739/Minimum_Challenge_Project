import { dbService, authService } from "../firebase.js";

export const save_comment = async (event) => {
    event.preventDefault();
    const comment = document.getElementById("comment");
    const { uid, photoURL, displayName } = authService.currentUser;
    try {
      await addDoc(collection(dbService, "comments"), {
        text: comment.value,
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