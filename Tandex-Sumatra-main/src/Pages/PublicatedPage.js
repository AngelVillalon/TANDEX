import SideNavBar from "../components/SideNavBar"
import  PublicatedProducts from "../components/ProductosPublicados"

export default function PublicatedPage() {

    return (
              
        <div>
            <SideNavBar/>
            <div className="container-work">

            <div class="col-md-8 offset-md-2">
                     <div class="col-md-9 offset-md-4">
                    </div>
                    < PublicatedProducts />
                    </div>

            </div>
        </div>
    )
}