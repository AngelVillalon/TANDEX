import SideNavBar from "../components/SideNavBar"
import TablaPerrona from "../components/TablaPerrona"

export default function UsuariosPage() {

    return (        
        <div>
            <SideNavBar/>
            <div className="container-work">

            <div class="col-md-8 offset-md-2">
                     <div class="col-md-9 offset-md-4">
                    <h3 className="ms-auto">Usuarios <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                    </svg></h3>
                    </div>
                    <TablaPerrona />
                    </div>

            </div>
        </div>
    )
}