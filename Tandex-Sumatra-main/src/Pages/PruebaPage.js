import { useParams } from 'react-router-dom'

export default function PruebaPage() {
    const { username } = useParams();

    return (
        <div>
            <h1>Prueba para mostrar parametros en el router: {username} </h1>
        </div>
    )
}