import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HobbyList from "../components/Home/Hobby";
import { addNewHobby, setActiveHobby } from "../actions/hobby";

const randomNumber = () => {
  return 1000 + Math.trunc(Math.random() * 9000);
};

function HomePage() {
  const hobbyList = useSelector((state) => state.hobby.list);
  const activeId = useSelector((state) => state.hobby.activeId);
  const dispatch = useDispatch();

  const handleAddHobbyClick = () => {
    // Random a hobby object: id + title
    const newId = randomNumber();
    const newHobby = {
      id: newId,
      title: `Hobby ${newId}`,
    };
    // Dispatch action to add a new hobby to redux store
    const action = addNewHobby(newHobby);
    dispatch(action);
  };
  const handelHobbyClick = (hobby) => {
    const action = setActiveHobby(hobby);
    dispatch(action);
  };
  return (
    <div>
      <h1>REDUX HOOKS - hobbyList</h1>
      <button onClick={handleAddHobbyClick}>Random hobby</button>
      <HobbyList
        hobbyList={hobbyList}
        activeId={activeId}
        onHobbyClick={handelHobbyClick}
      />
    </div>
  );
}

export default HomePage;
