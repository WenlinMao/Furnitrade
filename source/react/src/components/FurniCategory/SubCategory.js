import React,{ Component } from 'react';
import styled from 'styled-components';
import './SubCategory.css';



const CategoryImage = styled.div`
    width: 60px;
    height: 60px;
    background: black;
    border-radius: 10px;
    background-image: url(${props => props.image});
    background-size: 60px;
`

const CategoryTitle = styled.div`
    font-size: 24px;
    border-bottom: 1px solid rgba(0,0,0, 0.1);
    padding: 30px 0;
`


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementsByClassName("content");
    if (content.style.display=="block"){
      content.style.display = "none";
    } else {
      content.style.display ="block" ;
    }
  });
}


const SubCategory = props => (
  <div className="subcategory">
      <CategoryImage image={props.image}></CategoryImage>

    <label><CategoryTitle>{props.title}</CategoryTitle>
    <input id="toggle" type="checkbox"/>
      <div id="content">
          {props.subcategories.sub.map(sub => (
              <p>{sub.list}</p>
          ))}
      </div>
    </label>

  </div>
)


export default SubCategory
