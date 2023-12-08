import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import "./share.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebaseConfig.js";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const toastId = React.useRef(null);


  useEffect(() => {
    toast.info("loading...");
}, []);
  async function postHandler(e) {
    e.preventDefault();
    if (!desc.current.value && !file) {
      toast.error("There is nothing to upload")
    } else if (file) {
      /** @type {any} */
      const metadata = {
        contentType: "image/jpg",
      };

      const storageRef = ref(storage, "/postImages/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              toast.success("upload please wait...");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            const newPost = {
              userId: user?._id,
              desc: desc.current.value,
              img: downloadURL || "",
            };

            try {
              await axios.post("/posts/", newPost);
              window.location.reload();
            } catch (error) {
              console.error(error);
            }
            desc.current.value = "";
            setFile(null);
          });
        }
      );
    } else {
      const newPost = {
        userId: user?._id,
        desc: desc.current.value,
      };
      try {
        await axios.post("/posts/", newPost);
      } catch (error) {
        console.error(error);
      }
      desc.current.value = "";
    }
  }
  return (
    <div className="share">
      <ToastContainer />
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What in your mind " + user.username + "?"}
            type="text"
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={PF + "/post/" + file?.name} alt="" className="shareImg" />
            <Cancel className="shareCancleImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBotton" onSubmit={postHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
