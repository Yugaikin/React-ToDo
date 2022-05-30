import ListItem from "./ListItem";
import "../styles/PostList.css";

const PostList = ({
  posts,
  setPosts,
  patchChangeTask,
  patchCheckTask,
  deleteTasks,
  getTasks,
}) => {

  return (
    <ul className="post__list">
      {posts.length ? (
        posts.map(
          (post, index) =>
            (
              <ListItem key={index}
                post={post}
                setPosts={setPosts}
                patchChangeTask={patchChangeTask}
                patchCheckTask={patchCheckTask}
                deleteTasks={deleteTasks}
                getTasks={getTasks}
              />
            )
        )
      ) : (
        <h2>Нет записей!</h2>
      )}
    </ul>
  );
};

export default PostList;