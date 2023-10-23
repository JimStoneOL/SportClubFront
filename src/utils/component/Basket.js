import { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { ProductCard } from "./ProductCard";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Basket=()=>{

    const [basketStorage, setBasketStorage] = useLocalStorage("basketStorage", []);
    const [basketView,setBasketView]=useState([])
    const [showModal, setShowModal] = useState(false);
    const [issue,setIssue]=useState([])
    const {token} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()
    const history = useHistory()

    useEffect(()=>{
        setBasketView(basketStorage)
    },[basketStorage])

    const addOP = useCallback(async (opData) => {
        console.log(opData)
        try {
            const fetched =  request('http://localhost:8080/api/op/create', 'POST', {...opData}, {
              Authorization: `Bearer ${token}`
            })
          } catch (e) {}
      }, [token, request])

    const pressHandler=async (choose)=>{

    

        const formOrder={
          issue:choose
        }
        let orderId=0
    
        try {
          const fetched = await request('http://localhost:8080/api/order/create', 'POST', {...formOrder}, {
            Authorization: `Bearer ${token}`
          })
          orderId=fetched.id
        } catch (e) {}
    
    // //------------------------------------------
    
    basketStorage.map(item=>{

        const formOP={
            order:orderId,
            product:item.article,
            count:1
          }
          addOP(formOP)
    })

    history.push("/order")
      }

      
    
      const getIssue = useCallback(async () => {
    
        try {
          const fetched = await request('http://localhost:8080/api/issue/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
         setIssue(fetched)
        } catch (e) {}
      }, [token, request])

      useEffect(()=>{
        getIssue()
      },[getIssue])

    return(<>
    <div className="text-3xl text-center text-pink-500 font-bold">Корзина</div>
    <button onClick={()=>setShowModal(true)} className="text-xl text-center text-pink-800 font-bold bg-black rounded-full w-64">Оформить</button>
      <div class="my-12 mx-auto px-4 md:px-12">
    <div class="items-center -mx-1 lg:-mx-4">
        <div class="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {basketView && basketView.map(item=>(<ProductCard data={item}/>))}
        </div>
        </div>
        </div>
        {showModal && issue.length>0 ? (
<>
<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-800">
                <div className="relative p-6 flex-auto text-white">
       
          {issue.map(item=>(<>
          <div className="flex">
            <div className="text-sm">{item.name}</div>
            <button onClick={()=>pressHandler(item.id)} className="text-sm mx-2 bg-black rounded-full w-16">выбрать</button>
            </div>
          </>))}

          <button
                    className="absolute top-0 right-0 bg-slate-700 shadow-md  rounded rounded-xl border border-indigo-500/50 shadow-xl shadow-indigo-500/50"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
           <svg
           className="text-red-500"
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
    fill="currentColor"
  />
</svg>
                </button>
        </div>
      </div>
    </div>
  </div>
</>
) : null}
    </>)
}