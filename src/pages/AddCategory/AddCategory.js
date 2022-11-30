import React from 'react';
import { useForm } from 'react-hook-form';

const AddCategory = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const handleCategorySubmit = (data) =>{
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData => {
            console.log(imageData)
            if (imageData.success) {
                console.log(imageData.data.url)
                const category = {
                    categoryName: data.name,
                    image: imageData.data.url
                }
                fetch('http://localhost:5000/category',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(category)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                })
            }
        })
    }
    return (
        
        <div className='flex justify-center pt-12 '>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 drop-shadow-2xl">
                <form onSubmit={ handleSubmit(handleCategorySubmit) }  className="card-body">
                    <h2 className='text-center text-4xl'>Add Category</h2>
                
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category name</span>
                        </label>
                        <input type="text" 
                        {...register("name", {
                            required: "Category name is required"
                        })}
                        name='name' placeholder="Category Name" className="input input-bordered" />
                        {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category Image</span>
                        </label>
                        <input type="file"
                        {...register("image", {
                            required: "Image File is required"
                        })}
                        className="file-input file-input-bordered" />
                        {errors.image && <p className='text-error'>{errors.image?.message}</p>}
                    </div>
                    <div className="form-control my-2">
                        <button className="btn border-none bg-pink-700 hover:bg-pink-900">Submit</button>
                    </div>

                </form>
                
            </div>
        </div>
        
    );
};

export default AddCategory;