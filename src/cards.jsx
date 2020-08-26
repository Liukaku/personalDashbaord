import React, { Component } from "react";
import Card from "./cardsUI";
import img1 from "../src/assets/stock.jpeg";
import edit from "../src/assets/edit-xxl.png";
import deleter from "../src/assets/delete-xxl.png";
import TaskItemCard from "./taskItem";

import "./index.scss";

var placeholder = document.createElement("li");
placeholder.id = "placeholder";
placeholder.className = "15841";
var theHolder = document.getElementsByClassName("placeholder");

class Cards extends Component {
  constructor() {
    super();
    const whyIsItLikeThis = JSON.parse(localStorage.getItem('items'));
    JSON.parse(localStorage.getItem('items'))
  if (!localStorage.getItem('items')) {
    console.log("empty storage");
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: ""
      }
    };
    console.log(this.state.items);
   } else {
    console.log("using local storage");
    this.state = {
      items: JSON.parse(localStorage.getItem('items')),
      currentItem: {
        text: "",
        key: ""
      }
    };
    console.log(this.state);
    console.log(whyIsItLikeThis);
  }
  }

  getSnapshotBeforeUpdate(prevProps, prevState, nextProps, nextState) {
    localStorage.setItem('items', JSON.stringify(prevState.items));
    localStorage.setItem('items', JSON.stringify(prevState.items));
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('items', JSON.stringify(this.state.items));
    localStorage.setItem('items', JSON.stringify(this.state.items));
    console.log("allo");
    
  }

  localStorageCheck(){
    if (!localStorage.getItem('items')) {
      console.log("empty storage");
      this.state = {
        items: [],
        currentItem: {
          text: "",
          key: ""
        }
      };
      console.log(this.state.items);
     } else {
      console.log("using local storage");
      this.state = {
        items: JSON.parse(localStorage.getItem('items')),
        currentItem: {
          text: "",
          key: ""
        }
      };
    }
  }
  
 dragOver(e) {
  e.preventDefault();
  this.dragged.style.display = "none";
  if(e.target.className === 'placeholder') return;
  this.over = e.target;
  e.target.parentNode.insertBefore(placeholder, e.target);

  var relY = e.clientY - this.over.offsetTop;
  var height = this.over.offsetHeight / 2;
  var parent = e.target.parentNode;
  if(relY > height) {
    this.nodePlacement = "after";
    parent.insertBefore(placeholder, e.target.nextElementSibling);
  }
  else if(relY < height) {
    this.nodePlacement = "before"
    parent.insertBefore(placeholder, e.target);
  }

};
dragStart(e) {
  this.dragged = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.dragged);
  console.log(this.state);
  this.state = {
    items: JSON.parse(localStorage.getItem('items')),
    currentItem: {
      text: "",
      key: ""
    }
  };   
  
  
};

dragEnd(e) {


  this.dragged.style.display = 'block';
  this.dragged.parentNode.removeChild(placeholder);

  // update state
  var data = this.state.items;
  console.log(data[1]);
  
  
  //this function gets the position in the array (state)

  function indexOfObject( arr, key, value ) {
    var j = -1;
    var result = arr.some(function(obj, i) {
      j++
      return obj[key] == value;
    })

    if (!result) {
      return -1
    } else {
      return j;
    }
  }
  console.log(parseInt(this.dragged.className, 10));
  console.log(this.over.className);
  
  var from = indexOfObject(data,"key", parseInt(this.dragged.className, 10));
  var to = indexOfObject(data,"key", parseInt(this.over.className, 10));

  if(this.nodePlacement == "after") to++;
  
  //var from = Number(this.dragged.dataset.id);
  //var to = Number(this.over.dataset);

  console.log(from);
  
  console.log(to);
  if(from < to) to--;
  
  data.splice(to, 0, data.splice(from, 1)[0]);
  


  this.setState({
    items: data,
    currentItem: { text: "", key: "" }
   });
  console.log(this.state);
  localStorage.setItem('items', JSON.stringify(this.state.items));
  console.log(this.state);
};

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key;
    });    
    this.setState({
      items: filteredItems
    });
    
  };
  handleInput = e => {
    const itemText = e.target.value;
    const currentItem = {
      text: itemText,
      key: Date.now()
    };
    this.setState({
      currentItem
    });
  };
  addItem = e => {
    e.preventDefault();
    console.log("Item has been added!");
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { text: "", key: "" }
      });
      localStorage.setItem('items', JSON.stringify(this.state.items));
    }
  };
  beep = e => {
    console.log("beeping");
    
  }


  render() {
    
    const todoEntries = this.props.entries;
    var listItems = this.state.items.map((item, i) => {
      return (
        <li key={item.key}
        data-id={i}
        draggable="true"
        onDragEnd={this.dragEnd.bind(this)}
        onDragStart={this.dragStart.bind(this)}
        className={item.key}
        >      
          
            {item.text}
            
            <img className="icon" src={edit} alt="" />
            <img
              className="icon delete"
              src={deleter}
              alt=""
              onClick={() => this.deleteItem(item.key)}
            />
          
        </li>
      );
    }); 
    console.log(typeof listItems);
    
    return (
      <div className="theContainer container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-md-4">
            <div className="app">
              <TaskItemCard
                addItem={this.addItem}
                inputElement={this.inputElement}
                handleInput={this.handleInput}
                currentItem={this.state.currentItem}
                editIcon={edit}
                deleteIcon={deleter}
              />
              
              <ul className="theList"
              id="listID"
              onDragOver={this.dragOver.bind(this)}
              >
              {listItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
