import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    return(
        accessToken ? <Outlet /> : <Navigate to="/login" />
    );
}

export default ProtectedRoute
