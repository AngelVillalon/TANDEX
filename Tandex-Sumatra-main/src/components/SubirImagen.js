//Joca hizo ésto
import React from 'react'
export default function SubirImagen () {
    
    return (
        <div className="container">
            <form action='https://apitandexmx.herokuapp.com/subirImagen' method="POST" enctype="multipart/form-data">
                <input input type="file" name="myFiles"/>
                <input type="submit" value="Subir" />
            </form>
        </div>
    )
}