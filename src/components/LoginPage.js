import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {useUser} from "../utls/UserContext";

function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();

    const handleSubmit  = function (e) {

        e.preventDefault();

        fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({email, password})
        })
        .then((res) => res.json())
        .then(data => {
            if (data.success) {
                login(data.user);
                navigate("/");
            } else {
                alert("فشل تسجيل الدخول");
            }
        })
        .catch((err) => console.error(err));

    };

    return (
        <>
        <h4 className="text-primary mt-5 mb-4 text-center">لوحة تسجيل الدخول</h4>
        <Form onSubmit={handleSubmit }>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>البريد الإلكتروني</Form.Label>
            <Form.Control className="form-control bg-dark text-light border-light" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="أدخل البريد الإلكتروني" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control className="form-control bg-dark text-light border-light" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="أدخل كلمة المرور" />
        </Form.Group>
        <Button variant="primary" type="submit">
            تسجيل الدخول
        </Button>
        </Form>
        </>
    )
}

export default LoginPage;