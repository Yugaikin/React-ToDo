import React, { useEffect, useState } from "react";
import "../styles/AddTask.css";
import Button from "./Button";
import Input from "./Input";

const AddTask = ({ posts, postTasks, getTasks,deleteCheckTasks, deleteUncheckTasks, deleteAllTasks }) => {
  const [task, setTask] = useState("");
  const [disableBtnAllTasks,setDisableBtnAllTasks] = useState(false)
  const [disableBtnDoneTasks,setDisableBtnDoneTasks] = useState(false)
  const [disableBtnUndoneTasks,setDisableBtnUndoneTasks] = useState(false)

  const addNewPost = () => {
    const newPost = {
      name: task,
      done: false,
    };

    if (task.trim()) {
      postTasks(newPost).then(() => getTasks());
    }
    setTask("");
  };

  const clearAll = () => {
    deleteAllTasks();
  };

  const clearDone = () => {
    deleteCheckTasks()
  };

  const clearUndone = () => {
    deleteUncheckTasks()
  };

  const getValue = (e) => {
    setTask(e.target.value);
  };

  const addEnter = (e) => {
    if (e.code === "Enter") {
      addNewPost();
    }
  };

  useEffect(()=>{
    if(posts.length>0){
      setDisableBtnAllTasks(false)
    } else{
      setDisableBtnAllTasks(true)
    }
    if(posts.filter(post=>post.done===true).length>0){
      setDisableBtnDoneTasks(false)
    } else {
      setDisableBtnDoneTasks(true)
    }
    if(posts.filter(post=>post.done===false).length>0){
      setDisableBtnUndoneTasks(false)
    } else {
      setDisableBtnUndoneTasks(true)
    }
  },[posts])

  return (
    <div className="add__task">
      <Input
        type={"text"}
        placeholder={"I want to..."}
        classStyle={"inp"}
        value={task}
        callback={getValue}
        addEnter={addEnter}
      />
      <Button body={"Add"} callback={addNewPost}>Add</Button>
      <Button body={"Clear All"} locked={disableBtnAllTasks} callback={clearAll} />
      <Button body={"Clear done"} locked={disableBtnDoneTasks} callback={clearDone} />
      <Button body={"Clear undone"} locked={disableBtnUndoneTasks} callback={clearUndone} />
    </div>
  );
};

export default AddTask;