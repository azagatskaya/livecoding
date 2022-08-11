import { useState } from "react";

import "./Post.css";

export default function Post({ id, username, title, body, commentCount }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const handleClick = () => {
    setIsCollapsed((prevState) => !prevState);
  };
  const classNames = `post ${
    isCollapsed ? "post--collapsed" : "post--expanded"
  }`;
  return (
    <div className={classNames}>
      <div className="post__title">{title}</div>
      {!isCollapsed && <div className="post__username">{username}</div>}
      <div className="post__body">{body}</div>
      <div className="post__comments-count">{commentCount}</div>
      <button className="post__button post__button--open" onClick={handleClick}>
        {isCollapsed ? "Open" : "Close"}
      </button>
    </div>
  );
}
