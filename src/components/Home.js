import { useState } from "react";
import ColeraMap from "./ColeraMap";
import Stats from "./Stats";

function Home() {
    
    const [selectedState, setSelectedState] = useState(null);
    return (
        <div className="d-flex">
            <ColeraMap onStateSelect={setSelectedState}/>
            <Stats selectedState={selectedState} />
        </div>
    )
}

export default Home;