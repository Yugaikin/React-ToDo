import React, { useState, useEffect } from "react";
import AddTask from "../components/AddTask";
import FilterTasks from "../components/FilterTasks";
import Header from "../components/Header";
import Pagination from "./Pagination";
import { http } from "../api/http";
import PostList from "./PostList";

const WrapperToDo = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);

  const getTasks = async () => {
    try {
      const response = await http.get(
        `/tasks/1?pp=5&page=${page}&order=${sort}&filterBy=${filter}`
      );
      setPosts(response.data.tasks);
      const count = response.data.count;
      setCountPage(Math.ceil(count / 5));
    } catch (err) {
      alert(err);
    }
  };

  const postTasks = async (obj) => {
    try {
      await http.post("task/1", obj);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const patchChangeTask = async (newValue, uuid) => {
    try {
      await http.patch(`/task/1/${uuid}`, { name: newValue });
    } catch (err) {
      alert(`Ошибка редактирования задачи: ${err}`);
    }
    getTasks()
  };

  const patchCheckTask = async (e, uuid) => {
    try {
      await http.patch(`/task/1/${uuid}`, {
        done: e.target.checked,
      });
    } catch (err) {
      alert(err);
    }
    getTasks()
  };

  const deleteTasks = async (obj, uuid) => {
    try {
      await http.delete(`/task/1/${uuid}`, obj);
    } catch (err) {
      alert(err);
    }
    getTasks();
  };

  const deleteAllTasks = async () => {
    const arr = posts.map(({ uuid }) => http.delete(`/task/1/${uuid}`));

    try {
      await Promise.all(arr);
    } catch (err) {
      alert(err);
    }
    getTasks();
  };

  const deleteCheckTasks = async () => {
    const filterPosts = posts.map((post) =>post.done && http.delete(`/task/1/${post.uuid}`));

    try {
      await Promise.all(filterPosts);
    } catch (err) {
      alert(err);
    }

    getTasks();
  };

  const deleteUncheckTasks = async () => {
    const filterPosts = posts.map((post) =>!post.done && http.delete(`/task/1/${post.uuid}`));

    try {
      await Promise.all(filterPosts);
    } catch (err) {
      alert(err);
    }
    getTasks();
  };

  useEffect(() => {
    if (posts.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [posts]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    getTasks();
  }, [filter, sort, page]);

  return (
    <div>
      <Header />
      <AddTask
        posts={posts}
        postTasks={postTasks}
        getTasks={getTasks}
        deleteAllTasks={deleteAllTasks}
        deleteCheckTasks={deleteCheckTasks}
        deleteUncheckTasks={deleteUncheckTasks}
      />
      <FilterTasks filter={filter} setFilter={setFilter} setSort={setSort} />
      <PostList
        posts={posts}
        setPosts={setPosts}
        patchCheckTask={patchCheckTask}
        patchChangeTask={patchChangeTask}
        deleteTasks={deleteTasks}
        getTasks={getTasks}
      />
      <Pagination
        amountTask={filter.length}
        page={page}
        setPage={setPage}
        countPage={countPage}
      />
    </div>
  );
};

export default WrapperToDo;
