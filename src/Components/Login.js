import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({email : "", password : ""})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email : credentials.email, password : credentials.password})
        })
        const json = await response.json()
        console.log(json.accessToken)
        if(json.accessToken){
            localStorage.setItem('token', json.accessToken)
            navigate("/")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    return (
        <>
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login