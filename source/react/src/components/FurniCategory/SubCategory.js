import React from 'react';
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


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

const SubCategory = props => (
    <div className="subcategory">
        <CategoryImage image={props.image}></CategoryImage>
        <a class="collapsible">{props.title}</a>
        <div class="content">
            {props.subcategories.sub.map(sub => (
                <p>{sub.list}</p>
            ))}
        </div>
    </div>
)


export default SubCategory