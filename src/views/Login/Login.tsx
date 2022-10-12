import { useEffect } from "react"
import { Button } from "react-bootstrap"
import "./Login.scss"

import { useNavigate, useSearchParams } from "react-router-dom"
import { login } from "API"


export const Login = () => { 
    const [searchParams, setSearchParams] = useSearchParams()
    const navTo = useNavigate()
    useEffect(()=> {
        
        if(localStorage.getItem("user") !== 'null' && localStorage.getItem("user") !== '' ) {
            navTo("/")
        } 
        //else {
    //         let key:string = ""
    // if(searchParams.get("id") !== null) {
    //   // login(searchParams.get("id"))
    //   key = searchParams.get("id") as string

    // }
    // login(key).then(isLoginSuccessfull => {
    //     if(isLoginSuccessfull === 200) {
    //         console.log(key)
    //     }
    // })
    //     }
    }, [])
    
    return (<div className="login__wrap">
    <Button variant="danger"> <a href={process.env.REACT_APP_BE_URL + "/user/login"}> Login With Google </a></Button>
</div>) }