import { useOktaAuth } from "@okta/okta-react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const { authState } = useOktaAuth();
    if (!authState) {
          // Render loading indicator or handle the case accordingly
          return <div>Loading...</div>;
        }
      
        // Destructure authState after ensuring it's not null
        const { isAuthenticated } = authState;
    return (
        isAuthenticated ? <Outlet/> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;

