import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router";

export default function CholeraForm() {

    const [states, setStates] = useState([]);
    const [state, setState] = useState("");
    const [deaths, setDeaths] = useState("");
    const [recovered, setRecovered] = useState("");
    const [totalDeaths, setTotalDeaths] = useState("");
    const [totalCases, setTotalCases] = useState("");
    const [totalRecovered, setTotalRecovered] = useState("");
    const [cases, setCases] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:5000/api/stats")
        .then(res => res.json())
        .then(result => {
            setStates(result.data);
        })
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/api/states", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: state,
                cases: cases,
                deaths: deaths,
                recovered: recovered,
                totalDeaths: totalDeaths,
                totalCases: totalCases,
                totalRecovered: totalRecovered
            })
        })
        .then(res => res.json())
        .then(result => {
            if (result.message === "تم تحديث البيانات بنجاح") {
                alert(result.message);
                fetch("http://localhost:5000/api/stats", {
                    method: "GET"
                })
                .then(res => res.json())
                .then(result => {
                    setStates(result.data);
                })
                .catch(error => {
                    alert("حدث حاول مرة أخرى");
                    console.error(error);
                }) 
            }
            setState("");
            setCases("");
            setRecovered("");
            setDeaths("");
            setTotalCases("");
            setTotalDeaths("");
            setTotalRecovered("");
            setIsEditing(!isEditing);
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="container mt-4 bg-dark text-light">
            {isEditing? (
                <>
                    <h4 className="mb-4 text-center">بيانات ولاية {state}</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>عدد الإصابات</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                onChange={(e) => setCases(e.target.value)}
                                placeholder="أكتب عدد الإصابات"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>عدد التعافي</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                onChange={(e) => setRecovered(e.target.value)}
                                placeholder="أكتب عدد التعافي"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>عدد الوفيات</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                onChange={(e) => setDeaths(e.target.value)}
                                placeholder="أكتب عدد الوفيات"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>إجمالي الإصابات</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                value={totalCases}
                                onChange={(e) => setTotalCases(e.target.value)}
                                placeholder="أكتب إجمالي الإصابات"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>إجمالي التعافي</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                value={totalRecovered}
                                onChange={(e) => setTotalRecovered(e.target.value)}
                                placeholder="أكتب إجمالي التعافي"
                                />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>إجمالي الوفيات</Form.Label>
                            <Form.Control
                                className="form-control bg-dark text-light border-light"
                                type="number"
                                value={totalDeaths}
                                onChange={(e) => setTotalDeaths(e.target.value)}
                                placeholder="أكتب إجمالي الوفيات"
                                />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>التاريخ</Form.Label>
                            <Form.Control 
                                type="date"
                                className="mb-3 form-control bg-dark text-light border-light"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            حفظ
                        </Button>
                    </Form>
                </>
            ): (
                <>
                    <h4 className="mb-4 text-center">بيانات الولايات</h4>
                    <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>الولاية</th>
                            <th>الإصابات</th>
                            <th>التعافي</th>
                            <th>الوفيات</th>
                            <th>إجمالي الإصابات</th>
                            <th>إجمالي التعافي</th>
                            <th>إجمالي الوفيات</th>
                            <th>التحكم</th>
                        </tr>
                    </thead>
                    <tbody>
                            {states.map((i) => {
                                return ( 
                                    <>
                                    <tr>
                                        <td>{i.state}</td>
                                        <td>{i.cases}</td>
                                        <td>{i.deaths}</td>
                                        <td>{i.recovered}</td>
                                        <td>{i['total_cases']}</td>
                                        <td>{i['total_recovered']}</td>
                                        <td>{i['total_death']}</td>
                                        <td>
                                            <Button onClick={() => {
                                                setState(i.state);
                                                setTotalCases(i['total_cases']);
                                                setTotalDeaths(i['total_recovered']);
                                                setTotalRecovered(i['total_death']);
                                                setIsEditing(!isEditing);
                                            }}
                                            variant="info">
                                                <i className="fa fa-edit"></i>تعديل 
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                                );
                            })}
                    </tbody>
                    </Table>
                </>
            )}

        </div>
    );
}
