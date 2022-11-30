import React from 'react';

const Category = ({ category }) => {
    const { _id, categoryName, image } = category
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={image} alt="ImageFurniture" /></figure>
            <div className="card-body">
                <h2 className="card-title">{categoryName}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    );
};

export default Category;