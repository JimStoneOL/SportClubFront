import { Redirect, Route, Switch } from "react-router-dom"
import { AuthPage } from "../../components/auth/screen/AuthPage"
import { RegisterPage } from "../../components/auth/screen/RegisterPage"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Seller } from "../component/Seller"
import { Admin } from "../component/Admin"



export const useRoutes=(isAuthenticated,role)=>{
    const auth=useContext(AuthContext)
   
    //customer
    if(isAuthenticated && role==='ROLE_USER'){
        return(
        <Switch>
             <Route path="/" exact>
                <Seller/>
            </Route>
            <Redirect to="/" />
        </Switch>
        )
    }
    //Admin
   else if(isAuthenticated && role==='ROLE_ADMIN'){
    return(
        <Switch>
             <Route path="/" exact>
                <Admin/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
    }
   
    else{
        return(
            <Switch>
            <Route path="/" exact>
            <AuthPage/>  
            </Route>
            <Route path="/login" exact>
              <AuthPage/>  
            </Route>
            <Route path="/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
        )
}
}