import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginPage from "../Pages/LoginPage"
import NavBar from "../components/NavBar"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import ExcelPage from "../Pages/ExcelPage"
import ProductPage from "../Pages/ProductPage"
import StockPage from "../Pages/StockPage"
import BitacoraPage from "../Pages/bitacoraPage"
import UserPage from "../Pages/UserPage"
import PublicatedPage from "../Pages/PublicatedPage"


export default function TandexRouter () {
    return (
        <Router>
                <Switch>
                    <PrivateRoute exact path="/productos" component={ProductPage} />
                    <PrivateRoute exact path="/inventario" component={StockPage}/>
                    <PrivateRoute exact path="/excel" component={ExcelPage}/>
                    <PrivateRoute exact path="/bitacora" component={BitacoraPage}/> 
                    <PrivateRoute exact path="/usuarios" component={UserPage}/> 
                    <PrivateRoute exact path="/publicados" component={PublicatedPage}/> 
                    <Route  path="/navegacion" component={NavBar} />  
                                                         
                    <PublicRoute exact path="/" component={LoginPage}/>
                </Switch>
        </Router>
    )
}

/*
<Route exact path="/contact" component={ContactPage}/>
<Route exact path="/prueba/:username" component={PruebaPage}/>
<Route exact path="/query" component={QueryPage}/>
<PublicRoute exact path="/register" component={RegisterPage}/>
<PrivateRoute exact path="/dashboard" component={DashboardPage}/>
<PrivateRoute exact path="/about" component={AboutPage}/>
*/ 