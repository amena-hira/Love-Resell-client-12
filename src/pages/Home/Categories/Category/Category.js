import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category }) => {
    const { _id, categoryName, image } = category
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt="ImageFurniture" /></figure>
            <div className="card-body">
                <h2 className="card-title">{categoryName}</h2>
                <div className="card-actions justify-end">
                    <Link to={`/products/${_id}`} className="btn btn-primary">View</Link>
                </div>
            </div>
        </div>
    );
};

export default Category;