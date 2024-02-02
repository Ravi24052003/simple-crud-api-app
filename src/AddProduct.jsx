import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
   const [product,setProduct] = useState({}); 
   const navigate = useNavigate();
  
    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(product);
      addProduct(product);
    }
  
    const addProduct = async(product)=>{
        const res = await axios.post('https://simple-backend-ashy.vercel.app/products', product);
      console.log("res.data->",res.data);
      navigate("/");
  }
  
  
    return (
      <form className=" flex flex-col items-center" onSubmit={handleSubmit}>
        <fieldset>
          {/* Form Name */}
          <legend className=' font-bold text-center text-3xl mb-4'> Add Product</legend>
          {/* Text input*/}
          <div className="form-group">
            <label className=" text-center" htmlFor="title">
              Title
            </label>
            <div className="col-md-4">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="title"
                className=" border border-gray-500 rounded w-[300px] mb-4 bg-gray-100"
                onChange={(e)=>{
                  setProduct((preVal)=>({...preVal, title: e.target.value}))
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="thumbnail">
              Thumbnail
            </label>
            <div className="col-md-4">
              <input
                id="thumbnail"
                name="thumbnail"
                type="text"
                placeholder="thumbnail"
                className=" border border-gray-500 rounded w-[300px] mb-4 bg-gray-100"
                onChange={(e)=>{
                  setProduct((preVal)=>({...preVal, thumbnail: e.target.value}))
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="price">
              Price
            </label>
            <div className="col-md-4">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="price"
                className=" border border-gray-500 rounded w-[300px] mb-4 bg-gray-100"
                onChange={(e)=>{
                  setProduct((preVal)=>({...preVal, price: e.target.value}))
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="col-md-4 control-label" htmlFor="category">
              Category
            </label>
            <div className="col-md-4">

              <input type="text" id='category' name='category' placeholder='category'
              
              className=" border border-gray-500 rounded w-[300px] mb-4 bg-gray-100"
              onChange={(e)=>{
                setProduct((preVal)=>({...preVal, category: e.target.value}))
              }}
              />
            </div>
          </div>
          
          <div>
            <label className="col-md-4 control-label" htmlFor="brand">
              Brand
            </label>
            <div className="col-md-4">

<input type="text" id='brand' name='brand' placeholder='brand'
              
              className=" border border-gray-500 rounded w-[300px] mb-4 bg-gray-100"
              onChange={(e)=>{
                setProduct((preVal)=>({...preVal, brand: e.target.value}))
              }}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="discountPercentage">
              Discount
            </label>
            <div className="col-md-4 mb-4">
              <input
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                placeholder="discountPercentage"
                className="form-control input-md bg-gray-100"
                onChange={(e)=>{
                  setProduct((preVal)=>({...preVal, discountPercentage: e.target.value}))
                }}
              />
              
            </div>
          </div>
          {/* Button */}
          <div className="form-group">
            <div className=" flex justify-center">
              <button
                id="singlebutton"
                name="singlebutton"
                className="bg-green-400  w-[80%] text-white py-1 font-bold rounded"
                >
                Add
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  };
  
  export default AddProduct;
