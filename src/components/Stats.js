import { Col, Row } from "react-bootstrap";
import PieChart from "./MyChart";
import { Bounce } from "react-awesome-reveal";

function Stats({ selectedState }) {
    return selectedState ? (
        <div className="stats bg-dark text-light text-center p-1">
            <Bounce>
                <Row>
                    <Col className="mt-2">
                        <h1>{selectedState['total_cases']}</h1>
                        <h6>الإصابات</h6>
                    </Col>
                </Row>
            </Bounce>
            <Bounce>
                <Row>
                    <Col className="mt-2">
                        <h1>{selectedState['total_recovered']}</h1>
                        <h6>التعافي</h6>
                    </Col>
                </Row>
            </Bounce>
            <Bounce>
                <Row>
                    <Col className="mt-2">
                        <h1>{selectedState['total_death']}</h1>
                        <h6>الوفيات</h6>
                    </Col>
                </Row>
            </Bounce>
            <Row className="mt-2">
                <PieChart 
                    cases={selectedState['total_cases']}
                    recovered={selectedState['total_recovered']}
                    deaths={selectedState['total_death']}
                />
            </Row>
        </div>
    ) : (
        <div className="stats bg-dark text-light text-center p-1">
            <Bounce>
                <h5 className="mt-5">إضغط على ولاية لعرض البيانات</h5>
            </Bounce>
        </div>
    );
}

export default Stats;
