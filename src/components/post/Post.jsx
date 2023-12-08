import { MoreVert } from "@mui/icons-material";
import React from "react";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post({ post, username }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  

  

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
     
        
      

      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { autoClose: 1500 });
      }
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    toast(!isLiked ? "Like this post" : "Dislike this post" , { autoClose: 1500 });
    setIsLike(!isLiked);
  };

  const toggleDeleteMenu = () => {
    setIsDeleteMenuOpen((prev) => !prev);
  };

  console.log(currentUser._id);
  const handleDeletePost = (key) => {
    try {
      axios.delete("/posts/" + key, { userId: currentUser._id });
      setIsDeleteMenuOpen(false);
      toast.success('Delete the post');
      window.location.reload()
    } catch (err) {
      console.log(err.message);
    }
  
  };

  return (
    <div className="post">
      <ToastContainer/>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {username ? (
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpg"
                }
                alt=""
                className="postProfileImg"
              />
            ) : (
              <Link to={`/profile/${user?.username}`}>
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.jpg"
                  }
                  alt=""
                  className="postProfileImg"
                />
              </Link>
            )}

            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          {post.userId === currentUser._id && (
            <div className="postTopRight">
              <MoreVert onClick={toggleDeleteMenu} className="moveIcon" />
              {isDeleteMenuOpen && (
                <div className="deleteMenu">
                  <button
                    key={post._id}
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post?.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like + " people like it"}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
