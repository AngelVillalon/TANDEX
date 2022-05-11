import { Route, Redirect, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";


export default function PrivateRoute({ component: Component, ...rest}) {
    
    const auth = useAuth();
    const location = useLocation();

    return (
       // <Route exact={props.exact} path={props.path} component={props.component} />
       <Route {...rest} >
           {auth.user ? (<Component/>) : (<Redirect to={{ pathname: "/", state: {from: location }}}/>)}  
       </Route>
        //Se desestructura para pasar absolutamente todos los parametros de props
    )
}