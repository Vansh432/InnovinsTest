import { queryPromis } from "../../utils/dboperation.js";


// create new products
export const createProduct=async(req,res)=>{
    try{
     const {name,description,price}=req?.body;
     const queryAddProduct=`INSERT INTO products (name,description,price) VALUES (?,?,?)`
     const addedProducts=await queryPromis(queryAddProduct,[name,description,price])
     return res.status(201).json({
        status:true,
        message:"product added successfully",
        addedProducts
     })
    }catch(err){
         return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })
    }
}

//get all products--->
export const getAllProducts=async(req,res)=>{

    try{
        const queryAllProducts=`SELECT * FROM products `
       const allProducts=await queryPromis(queryAllProducts);
 
       if(allProducts.length===0)return res.status(404).json({status:false,message:"products not found"})
        return res.status(200).json({
         status:true,
         message:"all products fetched successfully",
         allProducts
        })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })  
    }
}

//get specific product--->
export const getSpecificProduct=async(req,res)=>{
    try{
       const {productId}=req?.params;
       if(!productId)return res.status(404).json({
        status:false,
        message:"productId is required"
       })
       const queryExistProduct=`SELECT * FROM products WHERE id=?`
       const existProduct=await queryPromis(queryExistProduct,[productId]);
       if(existProduct?.length==0)return res.status(404).json({
        status:false,
        message:"productId does not exist"
       })

       return res.status(200).json({
        status:true,
        message:"product fetched successfully",
        existProduct
       })
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })  
    }
}

//deleted specific products-->
export const  deleteSpecificProduct=async(req,res)=>{
    try{
const {productId}=req?.params;
       if(!productId)return res.status(404).json({
        status:false,
        message:"productId is required"
       })
        const queryExistProduct=`SELECT * FROM products WHERE id=?`
       const existProduct=await queryPromis(queryExistProduct,[productId]);
       if(existProduct?.length==0)return res.status(404).json({
        status:false,
        message:"productId does not exist"
       })
       const queryDeletedProduct=`DELETE FROM products WHERE id=?`
       const response=await queryPromis(queryDeletedProduct,[productId]);
       if(response?.affectedRows==0)return res.status(500).json({status:false,message:"product not deleted"})
        return res.status(200).json({
         status:true,
         message:"product deleted successfully"
        })
    }catch(err){

        return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        })  
    }
}

//update product details--->
export const updatedProducts=async(req,res)=>{
    try{
   const {productId}=req?.params;
   const {name,description,price}=req?.body;
       if(!productId)return res.status(404).json({
        status:false,
        message:"productId is required"
       })
        const queryExistProduct=`SELECT * FROM products WHERE id=?`
       const existProduct=await queryPromis(queryExistProduct,[productId]);
       if(existProduct?.length==0)return res.status(404).json({
        status:false,
        message:"productId does not exist"
       })
       const newName=name || existProduct[0]?.name;
       const newDescription=description || existProduct[0]?.description;
       const newPrice=price || existProduct[0]?.price;
       const queryUpdated=`UPDATE products SET name=?, description=?, price=? WHERE id=?`
       const updatedProduct=await queryPromis(queryUpdated,[newName,newDescription,newPrice,productId])
       
       if(updatedProduct?.affectedRows==0)return res.status(404).json({status:false,message:"product does not exist"})
        return res.status(200).json({
         status:true,
         message:"product updated successfully"
        })
    }catch(err){
         return res.status(500).json({
            status:false,
            message:"Internal server error",
            err:err?.message
        }) 
    }
}