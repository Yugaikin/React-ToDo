import React, { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "../styles/PostItem.css";
import ModalWindow from "./ModalWindow";

const ListItem = ({
  post,
  setPosts,
  patchChangeTask,
  patchCheckTask,
  deleteTasks,
  getTasks,
}) => {

  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState(post.name);
  const [editing, setEditing] = useState(true);
  const [inpEditing, setInpEditing] = useState(post.name);

  const toggleCheck = (e, uuid) => {
    patchCheckTask(e, uuid);
  };

  const deletePosts = () => {
    deleteTasks(post, post.uuid);
  };

  const editingTask = () => {
    setEditing(false);
  };

  const saveTask = (e, inpEditing, uuid) => {
    if (e.keyCode === 27) {
      setInpEditing(post.name);
      setEditing(true);
    } else if (e.keyCode === 13) {
      inpEditing.length
        ? setPosts(
            (prev) =>
              prev.map((el) =>
                el.uuid === post.uuid ? { ...el, name: e.target.value } : el
              ),
            setEditing(true)
          )
        : setEditing(true);

      patchChangeTask(inpEditing, uuid);
    } else if(e.type==="blur"){
      inpEditing.length
      ? setPosts(
          (prev) =>
            prev.map((el) =>
              el.uuid === post.uuid ? { ...el, name: e.target.value } : el
            ),
          setEditing(true)
        )
      : setEditing(true);

    patchChangeTask(inpEditing, uuid);
    }
  };

  const saveTask1=(e,uuid)=>{
    console.log(e.key)
    if(e.key==='Enter' || e.type==='blur' ||e.key==='Escape'){
      e.key!=='Escape' && patchChangeTask(e.target.value, uuid);
      setEditing(true)
    }
  }

  const modalWindow = (e) => {
    e.stopPropagation();
    setModalValue(post.name);
    setModal(true);
  };
  // useEffect(() => {
  //   getTasks();
  // }, []);

  return (
    <li className="task">
      <ModalWindow
        modalValue={modalValue}
        setModalValue={setModalValue}
        visible={modal}
        setVisible={setModal}
        post={post}
        setPosts={setPosts}
        patchChangeTask={patchChangeTask}
      />
      <Input
        type={"checkbox"}
        classStyle={"flag"}
        checked={post.done}
        callback={(e) => toggleCheck(e, post.uuid)}
      />
      {editing ? (
        <span className="todo" onClick={editingTask}>
          {post.name.length < 15 ? (
            post.name
          ) : (
            <>
              {post.name.substring(0, 10)}
              <Button
                body={"..."}
                callback={modalWindow}
              />
            </>
          )}
        </span>
      ) : (
        <input
          autoFocus
          onBlur={(e) => saveTask1(e, post.uuid)}
          // onChange={(e) => setInpEditing(e.target.value)}
          onKeyDown={(e) => saveTask1(e, post.uuid)}
          defaultValue={post.name}
          style={{ width: "39%",marginLeft:"3%" }}
        />
      )}
      <span className="date">{post.updatedAt.substring(0,10)}</span>
      <Button body={"Delete"} callback={deletePosts} />
    </li>
  );
};

export default ListItem;