import { useContext, useState } from "react"
import { UploadControl } from "./UploadControl"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const CreateIssue=()=>{

    const {token} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()
    const [form,setForm]=useState({})
    const history = useHistory()

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      }

      const pressHandler=async event=>{

        try{
            const fetched=await request('http://localhost:8080/api/issue/create', 'POST', {...form},{
            Authorization: `Bearer ${token}`
          })
      }catch(e){}

      }

    return(<>
     <div
      class="min-h-screen flex flex-col items-center justify-center"
    >
      <div
        class="
          flex flex-col
          bg-gray-800
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >
        <div class="font-medium self-center text-xl sm:text-3xl text-white">
          Добавить пункт выдачи
        </div>

        <div class="mt-10">
       
            <div class="flex flex-col mb-5">
              <label
                for="name"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Название:</label
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
                  id="name"
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Введите название"
                />
              </div>
            </div>
        

            <div class="flex w-full">
              <button
                type="submit"
                onClick={pressHandler}
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-rose-900
                  hover:bg-rose-700
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">Создать</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
        
        </a>
      </div>
    </div>
    </>)
}