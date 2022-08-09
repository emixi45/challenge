import axios from "axios";
import swal from "@sweetalert/with-react";
import { useHistory , Redirect } from "react-router-dom";


function Login () {
    const history = useHistory()
    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

        if (email === '' || password === '') {
            swal(
                <h2>las casillas no pueden estar vacias</h2>
            );
            return
        }
        if (email !== '' && !regexEmail.test(email)) {
            swal(<h2>debes escribir un correo valido</h2>
            );
            return
        }
        if (email !== 'challenge@alkemy.org' || password !== 'react' ){
            swal(<h2>credenciales no validas</h2>
            );
            return
        }
        axios.post('http://challenge-react.alkemy.org', {email, password})
            .then(res =>{
                swal(<h2>ingresaste correctamente</h2>)
                const tokenRecibido = res.data.token;
                localStorage.setItem('token',tokenRecibido)
                history.push('/listado')
            });
        }
let token= localStorage.getItem('token');
        return (
            <>
            {token && <Redirect to="/listado"/>}
            <h2>formulario</h2>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label" >Email address "challenge@alkemy.org"</label>
                    <input type="email" name="email"className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label" placeholder="react">Password "react"</label>
                    <input type="password" name ='password'className="form-control" id="exampleInputPassword1"/>
                </div>
                
                <button type="submit" className="btn btn-primary my-3">Ingresar</button>
            </form>
        </>
    )
}

export default Login;