import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { ProductCard } from "./ProductCard"

export const ProductPage=()=>{

    const {token} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()
    const [products,setProducts]=useState([])

    const getAllProducts = useCallback(async () => {

        try {
          const fetched = await request('http://localhost:8080/api/product/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
         setProducts(fetched)
        } catch (e) {}
      }, [token, request])
    
      useEffect(() => {
        getAllProducts()
      }, [getAllProducts])

    return(<>
        <div class="my-12 mx-auto px-4 md:px-12">
    <div class="items-center -mx-1 lg:-mx-4">
        <div class="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
    {products.map(item=>(<ProductCard data={item}/>))}
    </div>
    </div>
    </div>
    </>)
}