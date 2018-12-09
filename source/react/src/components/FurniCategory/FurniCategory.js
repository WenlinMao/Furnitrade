import React from 'react';
import SubCategory from './SubCategory';
import styled from 'styled-components';
import './FurniCategory.css';

const CategoryGroup = styled.div`
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 20px;
    align-items: center;
`

const FurniCategory = props => (
    <CategoryGroup>
        {/* <CategoryImage image={props.image}></CategoryImage> */}
        {/* <CategoryTitle>{props.title}</CategoryTitle> */}
        <SubCategory image={props.image} subcategories={props.subcategories} title={props.title}></SubCategory>
    </CategoryGroup>
)

export default FurniCategory