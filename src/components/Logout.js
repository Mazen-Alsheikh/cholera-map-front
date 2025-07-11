import { useUser } from "../utls/UserContext";
import { useNavigate } from "react-router-dom";

function Logout() {

    const { logout } = useUser();
    const navigate = useNavigate();

    logout();
    navigate("/");

}

export default Logout;