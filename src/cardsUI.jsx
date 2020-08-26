import React from "react";

import "./index.scss";

const Card = props => {
  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={props.imgsrc} className="image-top" alt="" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text text-secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          expedita odit laborum perspiciatis mollitia ipsum amet minima sit ad
          neque voluptates tempore, in aspernatur modi doloremque libero autem
          unde dicta!
        </p>
        <a href="#" className="btn btn-outline-success">
          Go Somewhere
        </a>
      </div>
    </div>
  );
};

export default Card;
