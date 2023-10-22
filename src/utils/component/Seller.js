import { useCallback, useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { ProductPage } from "./ProductPage";

export const Seller=()=>{

    const [info,setInfo]=useState(null);
    const {request,loading}=useHttp()
    const {token} = useContext(AuthContext)
    const auth = useContext(AuthContext)

    const getInfo = useCallback(async () => {
        
        try {
          const fetched = await request(`http://localhost:8080/api/user`,'GET',null,{
            Authorization: `Bearer ${token}`
          })
        console.log(fetched)
          setInfo(fetched)
        } catch (e) {}
      }, [request])
    
      useEffect(() => {
        getInfo()
      }, [getInfo])

      if(loading){
        return(<></>)
      }

    return(<>
        <div className="text-white text-4xl">
          { info && <div>{info.hello}</div>}
          <br/>
             <div>
             <br/>
            </div>
             </div>
             <ProductPage/>
    </>)
}