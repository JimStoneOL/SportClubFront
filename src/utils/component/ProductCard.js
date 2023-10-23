import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import useLocalStorage from "use-local-storage";

export const ProductCard=({data})=>{

  const [showModal, setShowModal] = useState(false);
  const [issue,setIssue]=useState([])
  const {token} = useContext(AuthContext)
  const { request, error, clearError,loading} = useHttp()
  const [basketStorage, setBasketStorage] = useLocalStorage("basketStorage", []);
  const [added,setAdded]=useState(!!basketStorage.find(item=>item.article===data.article))
  // const [count,setCount]=useState(data.amount)
 
  // const increment=event=>{
  //   setCount(count+1)
  //   data.amount+=count
  //   setBasketStorage([...basketStorage,data])
  // }

  // const decrement=event=>{
  //   if(count>0){
  //   setCount(count-1)
  //   data.amount-=count
  //   setBasketStorage([...basketStorage,data])
  //   }
  // }
  
  const orderHandler=(article)=>{
    if(!added){
      // data.amount=1
    setBasketStorage([...basketStorage,article])
    setAdded(true)
    }else{
        var result=basketStorage.filter(o=>o.article!==data.article)
        setBasketStorage(result)
        setAdded(false)
    } 
  }

  

    return(<>
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-full" src={"http://localhost:8080/api/image/get/"+data.img} alt="img"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-white">{data.name}</div>
        <div class="text-gray-400 text-base grid">
            <p>Артикл: {data.article}</p>
            <p>Цена: {data.price}</p>
            <p>Компания: {data.company}</p>
            <p>Описание: {data.description}</p>
            <p>Категория: {data.category}</p>
            <p>Скидка: {data.discount}</p>
            <p>Осталось: {data.count}</p>
            <p>Поставщик: {data.provider}</p>
        </div>
        <button onClick={()=>orderHandler(data)} className="text-white bg-black rounded-full w-32 ">{added ? <div>Удалить</div> : <div>Добавить</div>}</button>
        {/* {added && <>
        
          <div class="flex items-center justify-center bg-black text-white font-bold rounded-full my-4">
  <button onClick={()=>decrement()} class=" rounded-l px-4 py-2">
    -
  </button>
  <div class="border rounded py-2 px-4 text-center outline-none text-sm w-16">{count}</div>
  <button onClick={()=>increment()} class="rounded-r px-4 py-2">
    +
  </button>
</div>
        </>} */}
      </div>
    </div>


    </>)
}