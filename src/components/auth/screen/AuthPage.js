import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import logo from '../../../utils/img/logo.jpg'
import useLocalStorage from 'use-local-storage'


export const AuthPage = () => {

  const auth = useContext(AuthContext)
  const [time,setTime]=useState("")
  const [user,setUser]=useLocalStorage("user", {})
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    username: '', password: ''
  })
  const [login,setLogin]=useState(false)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    if(form.username===user.email && form.password===user.password){
      setLogin(true)
      var d = new Date(Date.now());
      if(d.getHours()>=4 && d.getHours()<12){
        setTime("Доброе утро "+user.lastname +" "+user.firstname+" "+user.middlename)
      } else if(d.getHours()>=12 && d.getHours()<17){
        setTime("Добрый день "+user.lastname +" "+user.firstname+" "+user.middlename)
      } else{
        setTime("Добрый вечер "+user.lastname +" "+user.firstname+" "+user.middlename)
      }
    }
  }
  
  if(login){
    return(<>
   
      {time}
    </>)
  }else{
    return (
      <div
      class="min-h-screen flex flex-col items-center justify-center"
    >
       Сделано Тимуром Мурадовым
      <div
        class="
          flex flex-col
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          w-50
          max-w-md
        "
      >
     
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Авторизация
        </div>

        <div class="mt-10">
       
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Логин:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i class="fas fa-at text-blue-500"></i>
                </div>

                <input
                  id="username"
                  type="email"
                  name="username"
                  onChange={changeHandler}
                  class="
                   
                  "
                  placeholder="Введите свой email"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Пароль:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  class="
             
                  "
                  placeholder="Введите свой пароль"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                onClick={loginHandler}
                class="
                 
                "
              >
                <span class="mr-2 uppercase">Войти</span>
                <span>
               
                </span>
              </button>
            </div>
         
        </div>
      </div>
      <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span class="ml-2"
            >
            <NavLink
              to="/register"
              class="text-xs ml-2 text-blue-500 font-semibold"
              >регистрация</NavLink
            ></span
          >
        </a>
      </div>
    </div>
    )
  }
  }
  