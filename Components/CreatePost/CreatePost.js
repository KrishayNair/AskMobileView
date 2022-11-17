import React from 'react';
import styles from "./CreatePost.module.css";
import { useCallback, useRef, useState } from "react";
import Tag from './Tag/Tag';
import MDE from "../../MDE";
import { useCookies ,getCookie } from "react-cookie";
import { CreateQuestion } from "../URL";




const CreatePost = () => {
  const titleRef = useRef();
  const [tagsValue, setTagsValue] = useState();
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "firstName",
    "lastName",
    "profileImage",
    "accessToken",
    "refreshToken",
    "accessTokenExpiresAt",
    "refreshTokenExpiresAt",
  ]);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === " " && tagsValue.trim() !== "") {
      setTags((prev) => [...prev, tagsValue.trim()]);
      setTagsValue("");
    }
  };

  const deletetag = useCallback((idx) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  async function handleSumbit() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie("access_token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: value,
      description: value,
      tags: tags,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(CreateQuestion, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  setValue("");
    
  }
  return (
    <div className={styles.body}>
      <div className={styles.background}></div>
     
      <h1 className={styles.mainHeading}>Ask </h1>
       <hr className={styles.line}/>

       <div className={styles.container}>
     <div className={styles.mainDiv}>
       
       <div className={styles.createPost}>
        <h1 className={styles.cpHeading}> Create Post</h1>
        <p className={styles.cpContent}>Have an Account already? <a className={styles.btnLogin}>Log in</a></p>
       </div>
       <div className={styles.questions}>
        <h1 className={styles.heading}>What is your Question?</h1>
        <input
        type="text"
        className={styles.input}
        placeholder="Type your Question..."
        
      />
      <h1 className={styles.heading2}>Tag your Question </h1>
      <p className={styles.cpContent2}>think of these tags as Hashtags to increase the reach </p>
      <input
        type="text"
        className={styles.input2}
        placeholder="SEO"
        value={tagsValue}
        onChange={(e) => setTagsValue(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
      <div className={styles.tags}>
        {tags.map((tag, idx) => (
          <Tag
            Tag={tag}
            key={idx}
            IDX={idx}
            Delete={() => {
              deletetag(idx);
            }}
          />
        ))}
       <h1 className={styles.heading3}>Description</h1>
       <p className={styles.cpContent3}>A detailed description of your question to help others better answer
        your question. </p>
        <div className={styles.mde}>
        <MDE value={value} onChange={onChange} />
      </div>
      <button className={styles.post} onClick={handleSumbit}>
        Post
      </button>
       </div>
       </div>
       </div>
    </div>
    </div>
  )
}

export default CreatePost