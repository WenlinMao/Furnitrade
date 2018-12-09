import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import './SubCategory.css';



const CategoryImage = styled.img`
    width: 75px;
    height: 55px;
    background: black;
    border-radius: 10px;
    background-image: url(${props => props.image});
    background-size: 75px;
`

const CategoryTitle = styled.div`
    font-size: 24px;
    border-bottom: 1px solid rgba(0,0,0, 0.1);
    padding: 30px 0;
    cursor: pointer;
`


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = document.getElementsByClassName("content");
    if (content.style.display==="block"){
      content.style.display = "none";
    } else {
      content.style.display ="block" ;
    }
  });
}


const SubCategory = props => (
  <label>
    <div className="subcategory">

      <CategoryImage image={props.image}></CategoryImage>
      <CategoryTitle><h5>{props.title}</h5></CategoryTitle>
      <input id="toggle" type="checkbox"/>
        <div id="content">
            {props.subcategories.sub.map(sub => (
                <Link to={"/furnipage/" + sub.list}><p>{sub.list}</p></Link>
            ))}
        </div>
    </div>
  </label>
)


export default SubCategory
