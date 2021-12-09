import React, { useState } from "react";
import "./CommentInput.css";
import { db } from "../../firebase";

function CommentInput({ comments, id, user }) {
  const [comment, setComment] = useState("");
  const [commentMap, setcommentMap] = useState(comments ? comments : []);

  const addComment = () => {
    // Add a new document in collection "cities"

    commentMap.push({
      comment: comment,
      username: user.displayName,
    });

    db.collection("posts")
      .doc(id)
      .update({
        comments: commentMap,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setComment("");
  };

  return (
    <div className="commentInput">
      <textarea
        rows="1"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="commentInput__textarea"
        placeholder="Add a comment.."
      ></textarea>

      <button
        onClick={addComment}
        className="button commentInput__button"
        style={{
          color: comment ? "black" : "black",
                backgroundColor: comment ? "rgba(102, 201, 240, 0.555)" : "rgba(102, 201, 240, 0.555)",
                border: comment ? "rgba(102, 201, 240, 0.993) solid 2px" : "rgba(102, 201, 240, 0.993) solid 2px",
                borderRadius: comment ? "10px" : "10px",
                fontWeight: comment ? "600" : "500",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CommentInput;
