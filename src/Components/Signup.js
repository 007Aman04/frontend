import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword : ""})
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(credentials.password !== credentials.cpassword){
            return alert("Password didn't match")
        }
        const response = await fetch("http://localhost:3001/api/auth/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name : credentials.name, email : credentials.email, password : credentials.password})
        })
        const json = await response.json()
        console.log(json)
        if(json){
            navigate("/login")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }

    return (
        <div className='container my-5'>
            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div class="mb-3">
                    <label for="cpassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup