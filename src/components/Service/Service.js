import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'
const Service = (props) => {


    const navigate = useNavigate()

    const { id, name, price, description, img } = props.service
    return (
        <div className='service'>
            <img src={img} className="w-100" alt="" />
            <h2>{name}</h2>
            <h5> Price : {price}</h5>
            <p>{description}</p>
            <button onClick={() => navigate(`/service/${id}`)} id='buttonId' className='btn btn-secondary'>Book {name}</button>
        </div>
    );
};

export default Service;