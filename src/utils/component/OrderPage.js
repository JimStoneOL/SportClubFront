import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const OrderPage=()=>{

    const [orders,setOrders]=useState([])
    const {token,role} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()

    const getOrders = useCallback(async () => {
    
        try {
          const fetched = await request('http://localhost:8080/api/order/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
         setOrders(fetched)
        } catch (e) {}
      }, [token, request])

      useEffect(()=>{
        getOrders()
      },[getOrders])

      const pressHandler=async (id)=>{
       
        try {
          const fetched = await request('http://localhost:8080/api/order/change/'+id, 'POST', null, {
            Authorization: `Bearer ${token}`
          })
          getOrders()
        } catch (e) {}
      }


    return(<>
        {orders.map(item=>(
            <>
             <div class="rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-white">Код для получения {item.code}</div>
        <div class="text-gray-400 text-base grid">
            <p>ID: {item.id}</p>
            <p>Дата доставки: {item.deliveryDate}</p>
            <p>Дата заказа: {item.orderDate}</p>
            <p>Пункт выдачи: {item.issue}</p>
            <p>Продукты: {item.orderedProducts}</p>
            <p>ФИО получателя: {item.user}</p>
            <p>Статус: {item.estatus}</p>
        </div>
  {role==='ROLE_ADMIN' && item.estatus==='Новый'  &&  <button onClick={()=>{pressHandler(item.id)}} className="bg-black text-pink-800 w-32 rounded-full">Завершить</button>
    }  </div>
    </div>
            </>
        ))}
    </>)
}