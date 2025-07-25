import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../utls/UserContext";

function Users() {
    const { me } = useUser();

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(()=> {
        if (me?.role !== "مدير") {
        return (navigate("/", {replace: true}));
        }

        fetch("https://cholera-map-back.up.railway.app/api/users", {method:"GET"})
        .then((res) => res.json())
        .then((data) => {
            setUsers(data.users)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setLoading(false)
        })

    }, [me.role, navigate]);

    const handleAddToggle = function () {
        if (isAdding) {
            
        }
        setIsAdding(!isAdding);
    }

    const isEditing = () => {
        
    }

    return (
            <div>
                <h4 className="text-primary mt-5 mb-4 text-center">المستخدمين</h4>
                {!isAdding ? (
                    <>
                        {loading ? (
                            <p>جاري تحميل البيانات ...</p>
                        ) : users && users.length > 0 ? (
                            <>
                                <Table striped bordered hover responsive variant="dark">
                                    <thead>
                                        <tr>
                                        <th>الرقم</th>
                                        <th>اسم المستخدم</th>
                                        <th>الإيميل</th>
                                        <th>الرتبة</th>
                                        <th>التحكم</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <p>جاري تحميل البيانات...</p>
                                        ) : users.length > 0 ? (
                                            users.map((user) => {
                                                return <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td><Link to={`/user?id=${user.id}`}>{user.username ? user.username : "لم يحدد"}</Link></td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button onClick={() => {
                                                    }}
                                                    variant="info">
                                                        <i className="fa fa-edit"></i>تعديل 
                                                    </Button>
                                                </td>
                                            </tr>
                                            })
                                        
                                        ) : (
                                            <p>لايوجد مستخدمين</p>
                                        )}

                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={handleAddToggle}>إضافة</Button>
                            </>
                        ) : (
                            <p>لايوجد مستخدمين</p>
                        )}
                    </>
                    ) : !isEditing ? (
                            <>
                                <Table striped bordered hover responsive variant="dark">
                                    <thead>
                                        <tr>
                                        <th>الرقم</th>
                                        <th>اسم المستخدم</th>
                                        <th>الإيميل</th>
                                        <th>الرتبة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <p>جاري تحميل البيانات...</p>
                                        ) : users.length > 0 ? (
                                            users.map((user) => {
                                                return <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td><Link to={`/user?id=${user.id}`}>{user.username ? user.username : "لم يحدد"}</Link></td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                            </tr>
                                            })
                                        
                                        ) : (
                                            <p>لايوجد مستخدمين</p>
                                        )}

                                    </tbody>
                                </Table>
                                <Button variant="primary" onClick={handleAddToggle}>إضافة</Button>
                            </>
                    ) : null}
            </div>
    )
}

export default Users;