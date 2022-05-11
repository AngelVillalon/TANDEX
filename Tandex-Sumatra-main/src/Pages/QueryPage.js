import { useLocation, useHistory } from 'react-router-dom'

export default function QueryPage() {

    const location = useLocation();
    const history = useHistory();
    
    const query = new URLSearchParams(location.search);
    console.log(query);

    const pipo = query.get("pepe") || "Sin parametro";
    console.log(pipo);

    const handleActualizarParametros = () =>{
        console.log("Enviando")
        query.set("pepe","ParametroNuevo")
        //history.push({pathname: "/contact",search:"?sabor=chocolate&color=blanco"})
        history.push({search: query.toString()})
    }

    return (
        <div>
            <h1>Query seleccionada: {pipo}</h1>
            <button onClick={handleActualizarParametros}>Boton para cambiar parametro</button>
        </div>
    )
}