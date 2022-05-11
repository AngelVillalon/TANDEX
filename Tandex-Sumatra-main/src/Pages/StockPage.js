import SideNavBar from '../components/SideNavBar'
import ProductTable from '../components/ProductTable'

import SubirImagen from '../components/SubirImagen'
const StockPage = () => {
    return (
        <div>
            <SideNavBar/>
             <div className="container-work">
                <ProductTable/>
            </div>
        </div>
    )
}

export default StockPage