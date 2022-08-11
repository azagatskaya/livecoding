import { useState, useEffect } from "react";

import "./App.css";
import Post from "./components/Post/Post";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((value) =>
        value.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/users").then((value) =>
        value.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments").then((value) =>
        value.json()
      ),
    ]).then((values) => {
      const [posts, users, comments] = values; //по индексу
      const usersObj = users.reduce((res, user) => {
        return { ...res, [user.id]: user.name };
      }, {});

      const preData = posts.map((post) => {
        const user = users.find((el) => el.id === post.userId)?.name || "user";
        const commentCount = comments.reduce((cnt, comment) => {
          return comment.postId === post.id ? cnt + 1 : cnt;
        }, 0);
        return { ...post, username: user, commentCount };
      });
      setData(preData);
      setIsLoaded(true);
    });
    // .then((data) => {});
  }, []);
  const renderPosts = () => {
    return data.map((post) => <Post key={post.id} {...post} />);
  };
  return (
    <div className="App">{isLoaded ? renderPosts() : <div>Loading</div>}</div>
  );
}

export default App;
