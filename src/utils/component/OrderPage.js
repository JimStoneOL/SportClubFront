import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const OrderPage=()=>{

    const [orders,setOrders]=useState([])
    const {token} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()

    const getOrders = useCallback(async () => {
    
        try {
          const fetched = await request('http://localhost:8080/api/order/get/all', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          console.log(fetched)
         setOrders(fetched)
        } catch (e) {}
      }, [token, request])

      useEffect(()=>{
        getOrders()
      },[getOrders])


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
        </div>
      </div>
    </div>
            </>
        ))}
    </>)
}