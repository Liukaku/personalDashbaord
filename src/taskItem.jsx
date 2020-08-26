import React from "react";

import "./index.scss";

const TaskItemCard = props => {
  return (
    <div className="card taskItem">
      <div className="flex-box headerBox">
        <h4 className="taskHeader float-left">Tasks</h4>
        <div className="flex-box float-right">
        </div>
      </div>

      <form onSubmit={props.addItem}>
        <input
        className="taskInput"
          type="text"
          placeholder="Start typing..."
          name=""
          id=""
          ref={props.inputElement}
          value={props.currentItem.text}
          onChange={props.handleInput}
        />
        <button className="createTask float-right" type="submit"> Add </button>
      </form>
    </div>
  );
};

export default TaskItemCard;
