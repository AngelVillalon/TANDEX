import { Route, Redirect } from "react-router-dom";
import useAuth from "../auth/useAuth";


export default function PublicRoute({ component: Component, ...rest}) {
    
    const auth = useAuth();

    return (
       // <Route exact={props.exact} path={props.path} component={props.component} />
       <Route {...rest} >
           {!auth.user ? (<Component/>) : (<Redirect to="/excel"/>)}  
       </Route>
        //Se desestructura para pasar absolutamente todos los parametros de props
    )
}