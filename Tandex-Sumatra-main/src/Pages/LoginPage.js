import useAuth from "../auth/useAuth"; 
import WaveBorder2 from "../components/WaveBorder2";


import axios from 'axios'

import React,{useState} from 'react'
export default function LoginPage() {
    const auth = useAuth(); 


    const[password,setPassword] = useState([])
    const[email,setEmail] = useState([])

    const handleLogin = () => {
         
        axios.post('https://apitandexmx.herokuapp.com/login',{email,password})
        .then(response=>{
            if(response.status){
                auth.login(email,password); 
                sessionStorage.setItem('token', response.data.token)
                
            }
    }).catch(error => {
       console.log(error)
    }) 
    };


    return (
        <div>
            <WaveBorder2
                className="fixed-top"
                lowerColor="#d2d2d2"
                upperColor="#b3294e"
                animationNegativeDelay={2}
            /> 
            <img src={`${process.env.PUBLIC_URL}/imgLogin.jpg `} alt="electronics" className="img-fluid loginPage" /> 
            <div className="container formLogin">
                <div className="formLogin_control">
                    <h1 className="mb-5 ms-5 letraTandex">TANDEX ELECTRONICOS</h1>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="name@example.com" />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordControl" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Contraseña" />      
                    </div>
                    <div class="mb-3"> 
                        <button type="button" class="btn botonControl rounded position-relative start-50 translate-middle" onClick={handleLogin}>Iniciar sesión</button>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn botonControl rounded position-relative start-50 translate-middle" >Recuperar constraseña</button>
                    </div>
                </div>
            </div>
           <WaveBorder2
                className="fixed-bottom "
                upperColor="#d2d2d2"
                lowerColor="#b3294e"
                animationNegativeDelay={2}
            />  
        </div>
    )
}