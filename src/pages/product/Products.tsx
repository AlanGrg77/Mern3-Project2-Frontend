import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllProducts } from "../../store/productSlice";
import { Status } from "../../globals/types/authType";
import Card from "./components/Card";


const Products = () => {
  const { products,status } = useAppSelector((state)=>state.product)
  const dispatch = useAppDispatch()
  

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])

    if(status === Status.Loading){
      return <div className="flex justify-center items-center h-screen">
      <img src="/fade-stagger-circles.svg" alt="Centered Example" className="w-32 h-32" />
    </div>
      
    }
  return (
    <>
      <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

      {
        products && products.map((product)=>{
           return <Card product = {product}/>
        })
      }
      </section>
    </>
  );
};

export default Products;
