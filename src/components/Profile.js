import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../utls/UserContext';

function Profile() {

    const {me} = useUser();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    
    const navigate = useNavigate();

    useEffect(()=> {

        fetch(`http://localhost:5000/api/profile/${id}`, {method:"GET"})
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setLoading(false)
        })

    }, []);

    const handleDelete = () => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذا المستخدم؟")) {
            fetch(`http://localhost:5000/api/deleteUser/${id}`, { method: "POST" })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("تم حذف المستخدم بنجاح");
                    navigate("/users");
                } else if (data.error) {
                    alert("حدث خطأ أثناء الحذف: " + data.error);
                }
            })
            .catch(err => alert("حدث خطأ: " + err.message));
        }
    };

    const handleEditToggle = () => {

        if (!isEditing) {
            setUsername(user.username);
        }

        setIsEditing(!isEditing);
    };

    const handleSave = () => {

        if (username.length < 3) {
            alert("إسم المستخدم يجب أن يكون 3 أحرف على الأقل");
        }

        if (password && password.length < 6) {
            alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        }

        fetch(`http://localhost:5000/api/updateuser/${id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("تم تحديث المستخدم بنجاح");
                setIsEditing(false);
                setUser(prev => ({...prev, username}));
                setPassword("");
            } else if (data.error) {
                alert("حدث خطأ: " + data.error)
            }
        })

        .catch(err => alert("حدث خطأ: " + err.message));

    }

  return (
    <Card className='mx-auto mt-5 bg-dark text-light border-light' style={{ width: '18rem'}}>
      <Card.Img variant="top" src="user.webp" />
      {!loading ? (
        <>
        {!isEditing ? (
            <>
                <Card.Body>
                    <Card.Title className='text-center'>{user.username? user.username : "لم يحدد"}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush bg-dark text-light">
                    <ListGroup.Item className="bg-dark text-light border-light">الإيميل: {user.email}</ListGroup.Item>
                    <ListGroup.Item className="bg-dark text-light border-light">الرتبة: {user.group_id === 1 ? "مدير" : "محرر"}</ListGroup.Item>
                </ListGroup>
                <Card.Body className='text-center'>
                    <Button className='ms-2' onClick={handleEditToggle} variant='info'>تعديل</Button>
                    {me?.group_id === 1 && <Button variant='danger' onClick={handleDelete}>حذف</Button>}
                </Card.Body>
            </>
        ) : (
            <Form className='text-center p-2 bg-dark text-light'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>إسم المستخدم</Form.Label>
                    <Form.Control className="form-control bg-dark text-light border-light" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="أكتب الإسم الجديد" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>كلمة المرور</Form.Label>
                    <Form.Control className="form-control bg-dark text-light border-light" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أتركها فارغة إذا لا تريد التغيير" />
                </Form.Group>
                <Button variant='success ms-2' onClick={handleSave}>حفظ</Button>
                <Button variant='secondary' onClick={handleEditToggle}>إلغاء</Button>
            </Form>
        )}

        </>
      ) : <p>جاري التحميل...</p>}
    </Card>
  );
}

export default Profile;