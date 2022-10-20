import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
const ServiceDetails = () => {
    const { serviceId } = useParams()

    const [data, setData] = useState([])
    useEffect(() => {
        fetch("/service.json")
            .then(res => res.json())
            .then(data => setData(data))
    }, [])
    const item = data.filter(service => service.id == serviceId)
    console.log(item);
    return (
        <div>

            <div className='service container'>
                <h2>This is service details {serviceId}</h2>
                <img src={item[0]?.img} className="w-100" alt="" />
                <h2>{item[0]?.name}</h2>
                <h5> Price : {item[0]?.price}</h5>
                <p>{item[0]?.description}</p>
                <button id='buttonId' className='btn btn-secondary'>Checkout</button>
            </div>
        </div>
    );
};

export default ServiceDetails;