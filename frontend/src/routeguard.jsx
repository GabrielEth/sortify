import { Outlet, Navigate } from 'react-router-dom'

/* can verify token with the back end if we decide to store that information */

const ProtectedRoute = () => {
    let authentication = { 'token': localStorage.getItem('authToken') }
    return(
        authentication.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute
