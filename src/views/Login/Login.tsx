import { useEffect } from "react"
import { Button } from "react-bootstrap"
import "./Login.scss"

import { useNavigate } from "react-router-dom"

export const Login = () => { 
    const navTo = useNavigate()
    useEffect(()=> {
        if(localStorage.getItem("user") !== null) {
            navTo("/")
        }
    }, [])
    
    return (<div className="login__wrap">
    <Button variant="danger"> <a href={process.env.REACT_APP_BE_URL + "/user/login"}> Login With Google </a></Button>
</div>) }