import React, { Component } from "react";
import Cards from "./cards";
import edit from "../src/assets/edit-xxl.png";
import deleter from "../src/assets/delete-xxl.png";


class TodoItems extends Component {

  constructor(props) {
    super(props);
    const whyIsItLikeThis = JSON.parse(localStorage.getItem('items'));
   this.state = {
     items: this.props.entries,
     currentItem: {
      text: "",
      key: "",
      words: ""
   }
  }
}

  
  getSnapshotBeforeUpdate(prevProps, prevState, nextProps, nextState) {
    localStorage.setItem('items', JSON.stringify(prevState.items));
  }
  


  componentDidUpdate(prevProps, prevState) {

    
    this.state = {
      items: JSON.parse(localStorage.getItem('items')),
      currentItem: {
        text: "",
        key: ""
      }
    }

    localStorage.setItem('items', JSON.stringify(this.state.items));
    console.log(this.state);
  };

 
  

  handleInput = () => {
    console.log("aaaaaaaaaaaylmao");
    
    this.setState({
      items: this.props.entries,
      currentItem: {
       text: "",
       key: "",
       words: ""
    }
    })
  };
/*
  createTasks = item => {
    return (
      <li key={item.key}
      draggable="true"
      onDragEnd={this.props.dragEnd.bind(this)}
      onDragStart={this.props.dragStart.bind(this)}
      className={item.key}
      >      
        
          {item.text}
          
          <img className="icon" src={edit} alt="" />
          <img
            className="icon delete"
            src={deleter}
            alt=""
            onClick={() => this.props.deleteItem(item.key)}
          />
        
      </li>
    );
  };
  */

  render(props){
    const todoEntries = this.props.entries;
    var listItems = this.props.entries.map((item, i) => {
      return (
        <li key={item.key}
        draggable="true"
        onDragEnd={this.props.dragEnd.bind(this)}
        onDragStart={this.props.dragStart.bind(this)}
        className={item.key}
        >      
          
            {item.text}
            
            <img className="icon" src={edit} alt="" />
            <img
              className="icon delete"
              src={deleter}
              alt=""
              onClick={() => this.props.deleteItem(item.key)}
            />
          
        </li>
      );
    }); 

    return(
      <ul className="theList"
    id="listID"
    onDragOver={this.props.dragOver.bind(this)}
    onClick={this.handleInput}
    >{listItems}</ul>
    )
  }

  /*
  render(props) {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList"
    id="listID"
    onDragOver={this.props.dragOver.bind(this)}
    onClick={this.handleInput}
    >{listItems}</ul>;
  }
  */
}

export default TodoItems;
