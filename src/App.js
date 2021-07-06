import { useEffect, useState } from "react";
import queryString from "query-string";

import "./App.scss";
import PostList from "./components/PostList";
// import ColorBox from "./components/ColorBox";
// import TodoForm from "./components/TodoForm";
// import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";

function App() {
  // const [todoList, setTodoList] = useState([
  //   { id: 1, title: "I love Easy Frontend! 😍" },
  //   { id: 2, title: "We love Easy Frontend! 🥰" },
  //   { id: 3, title: "They love Easy Frontend! 🚀" },
  // ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });
  // Post list
  // useEffect(() => {
  //   async function fetchPostList() {
  //     // ...
  //     try {
  //       const requestUrl =
  //         "http://js-post-api.herokuapp.com/api/posts?_limit=15&_page=1";
  //       const response = await fetch(requestUrl);
  //       const responseJSON = await response.json();
  //       // console.log({ responseJSON });

  //       const { data } = responseJSON;
  //       setPostList(data);
  //     } catch (error) {
  //       console.log("Failed to fetch post list: ", error.message);
  //     }
  //   }

  //   console.log("POST list effect");
  //   fetchPostList();
  // }, []);

  // Pagination
  useEffect(() => {
    async function fetchPostList() {
      // ...
      try {
        // _limit=10&_page=1
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    console.log("POST list effect");
    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("New page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  // TodoList
  // function handleTodoClick(todo) {
  //   console.log(todo);
  //   const index = todoList.findIndex((x) => x.id === todo.id);
  //   if (index < 0) return;

  //   const newTodoList = [...todoList];
  //   newTodoList.splice(index, 1);
  //   setTodoList(newTodoList);
  // }
  // // FormValues
  // function handleTodoFormSubmit(formValues) {
  //   console.log("Form submit: ", formValues);
  //   // add new todo to current todo list
  //   const newTodo = {
  //     id: todoList.length + 1,
  //     ...formValues,
  //   };
  //   const newTodoList = [...todoList];
  //   newTodoList.push(newTodo);
  //   setTodoList(newTodoList);
  // }

  function handleFiltersChange(newFilters) {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }
  return (
    <div className="app">
      <h1>Welcome to React.js</h1>
      {/* <ColorBox /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
