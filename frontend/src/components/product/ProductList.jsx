import React, { useState, useEffect } from 'react'
import apiClient from '../../utils/apiClient'
import {Card} from "../common/Card";

export function ProductList() {
    const [product, setProducts] = useState([])

    useEffect(() => {
        apiClient.get('/api/v1/accessories/2')
            .then((response) => {setProducts(response.data)
            console.log(response.data)})
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div>
            <h1>Example Component</h1>
            <Card product={product} />
        </div>
    )
};
