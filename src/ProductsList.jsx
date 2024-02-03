import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const [pending, setPending] = useState(false);

  const [isError, setIsError] = useState(false);

  const [patchError, setPatchError] = useState(null);

  const [updatedProduct, setUpdatedProduct] = useState({});

  const [key, setKey] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [noProducts, setNoProducts] = useState(false);

 const getProducts = async ()=>{
  try {
    setPending(true);
    const {data} = await axios.get('https://simple-backend-ashy.vercel.app/products');
    setProducts(data);
    setPending(false);
    setIsError(false);
    if(data.length === 0){
      setNoProducts(true)
    }
    else{
      setNoProducts(false)
    }
    console.log(data);
  } catch (error) {
    setPending(false);
    setIsError(true);
  }
 }  
    useEffect(()=>{
     getProducts();
    }, [])

    useEffect(()=>{
    console.log("patchError inside useEffect",patchError)
    }, [patchError])
  return (
    <>
    {pending?  <h1 className=' font-bold text-center mt-5'>Loading data please wait</h1> : (isError)? <h1 className=' font-bold text-center mt-5'>Sorry unable to fetch data from the server</h1> : (noProducts)? <h1 className=' font-bold text-center mt-5'>No products found in the database please add some products to the database</h1> :
    <div className=' flex justify-start items-start flex-wrap max-[600px]:flex-col max-[600px]:items-center'>
      {products?.map((product)=>(
        <div key={product._id} className=' mx-5 my-6'>
          <img src={product?.thumbnail} alt="" width={250}/>

        {(isEditing && (key === product._id))? 
        <div className=' flex flex-col items-center'>
        <input className=' border border-gray-200 my-2 w-[95%] bg-gray-100 font-semibold' placeholder='brand' type="text" value={updatedProduct?.brand} onChange={(e)=>setUpdatedProduct((preVal)=>({...preVal, brand: e.target.value}))}/>
        <input className=' border border-gray-200 mt-2 w-[95%] bg-gray-100 font-semibold' placeholder='title' type="text" value={updatedProduct?.title} onChange={(e)=>setUpdatedProduct((preVal)=>({...preVal, title: e.target.value}))}/>
        <div className=' w-[100%] flex justify-start mb-2'>
        <p className=' text-red-500 font-semibold text-sm ml-1'>{(patchError?.response?.data?.codeName === "DuplicateKey")? "this title already exists" : null }</p>
        </div>
        
        <input className=' border border-gray-200 mt-2 w-[95%] bg-gray-100 font-semibold' placeholder='price' type="number" value={updatedProduct?.price} onChange={(e)=>setUpdatedProduct((preVal)=>({...preVal, price: e.target.value}))}/>
        <div className=' w-[100%] flex justify-start mb-2'>
        <p className=' text-red-500 font-semibold text-sm ml-1'>{patchError?.response?.data?.priceError}</p>
        </div>

        <input className=' border border-gray-200 mt-2 w-[95%] bg-gray-100 font-semibold' placeholder='discount' type="number" value={updatedProduct?.discountPercentage} onChange={(e)=>setUpdatedProduct((preVal)=>({...preVal, discountPercentage: e.target.value}))}/>

        <div className=' w-[100%] flex justify-start mb-2'>
        <p className=' text-red-500 font-semibold text-sm ml-1'>{patchError?.response?.data?.discountError}</p>
        </div>

        <div className=' flex justify-center my-4'>
          <button onClick={()=>{
            if(/^\s*$/.test(updatedProduct.brand)){
               updatedProduct.brand = product.brand
            }

            if(/^\s*$/.test(updatedProduct.title)){
              updatedProduct.title = product.title
           }

           if(/^\s*$/.test(updatedProduct.price)){
            updatedProduct.price = product.price
         }

         if(/^\s*$/.test(updatedProduct.discountPercentage)){
          updatedProduct.discountPercentage = product.discountPercentage
       }

            axios.patch(`https://simple-backend-ashy.vercel.app/products/${product._id}`, updatedProduct).then((res)=> {
              const newData = res.data;
              const indx = products.findIndex((elem)=>elem._id == newData._id);
              products.splice(indx, 1, newData);
              setKey(null);
              setIsEditing(false);
              setPatchError(null);
            })
            .catch((error)=> {
              setPatchError(error);
              console.log( patchError);
            }
            )
          }} className=' bg-yellow-500 py-1 px-4 rounded text-white font-bold'>Done</button>
          </div>
        </div> 
        
        : 
        
        <div>
            <h1 className=' font-bold text-center'>Brand: {product?.brand}</h1>
            <h1 className=' text-center'>Title: {product?.title}</h1>
            <p className=' text-center'>Price: {product?.price}$</p>
            <p className=' text-center'>Discount: {product?.discountPercentage}%</p>
            <p className=' text-center'>Price after discount {Number((product?.price - ((product?.price)*(product?.discountPercentage/100))).toFixed(2))}$</p>

            <div className=' flex justify-center my-4'>
          <button onClick={()=>{
            setIsEditing(true);
            setKey(product._id);
            setUpdatedProduct(product);
           
          }} className=' bg-yellow-500 py-1 px-4 rounded text-white font-bold'>Edit Product</button>
          </div>
          </div>
          }


          <div className=' flex justify-center'>
          <button onClick={()=>{
            axios.delete(`https://simple-backend-ashy.vercel.app/products/${product._id}`).then(()=>{
              const newList = products.filter((elem)=>elem._id !== product._id);
              setProducts(newList);
            });
          }} className=' bg-red-500 py-1 px-4 rounded text-white font-bold'>Delete Product</button>
          </div>
         
        </div>
      ))}
    </div>
}
    </>
  )
}

export default ProductsList
