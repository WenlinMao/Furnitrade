import React from 'react';
import FurniCard from '../FurniCard/FurniCard';
import SubCategory from './SubCategory';
import styled from 'styled-components';
import './FurniCategory.css';

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    grid-gap: 25px;
    align-items: center;
`

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

const FurniCategory = props => (
    <CategoryGroup>
        {/* <CategoryImage image={props.image}></CategoryImage> */}
        {/* <CategoryTitle>{props.title}</CategoryTitle> */}
        <SubCategory image={props.image} subcategories={props.subcategories} title={props.title}></SubCategory>
    </CategoryGroup>
)

export default FurniCategory