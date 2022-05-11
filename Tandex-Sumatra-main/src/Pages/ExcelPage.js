
import styled from "styled-components";
import SideNavBar from "../components/SideNavBar"
import Button from '@material-ui/core/Button';
import xls from '../images/xlss.png'

//dependencia para leer el archivo
import xlsx from 'xlsx'

//depndencia para enviar peticiones al backend 
import axios from 'axios'



export default function ExcelPage() {

    //funcion en donde se procesa el archivo xls
  const cambio=(file)=>{

    const promise = new Promise((resolve,reject)=>{

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e)=>{
        const bufferArray = e.target.result

        const wb = xlsx.read(bufferArray,{type: "buffer"});

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = xlsx.utils.sheet_to_json(ws)

        resolve(data)
      }
      fileReader.onerror=((error)=>{
        reject(error)
      })
    })

    promise.then((data) =>{
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`
        }
      }
      axios.post('https://apitandexmx.herokuapp.com/upload_file',data,headers)
      .then(response=>{
        console.log(response.data)
        window.location.reload()
      }).catch(error=>{
        //error de inautorizacion
        if(error.response.status == 401){
          if(sessionStorage.getItem('token')){
            sessionStorage.removeItem('token');
            window.location = '/';
          }else{
            window.location = '/';
          }
        }
      })

    })
  }


    return(
        <div>
            <SideNavBar/>
                <div className="container-work">

                 <TituloCont>
                  <div class="col-md-8 offset-md-1">
                    <div class="col-md-9 offset-md-4">
                        <br/>
                        <br/>
                        <br/>
                        <h2 className="hola ms-auto">Actualización de Productos  
                         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z"/>
                          </svg>  
                        </h2>
                    </div>
                 </div>
           
                 <div class="container2 ">
                     <img class="imgxls" src={xls} width="500" alt=""/>
            
                    <ContenedorBotones>
                        <div>
                            <input 
                                accept="*" 
                                style={{ display: "none" }} 
                                id="contained-button-file" 
                                multiple 
                                type="file"
                                //onChange -> llama la funcion y envia el archivo que se debe procesar
                                onChange={(e)=>{
                                    const file = e.target.files[0]
                                    cambio(file)
                                }} 
                            />  
                            <label htmlFor="contained-button-file">
                                <Button
                                variant="contained"
                                color="secondary"
                                component="span"
                                fullWidth
                                >Subir Productos
                                </Button>
                            </label> 
                        </div>
                     </ContenedorBotones>
                 </div>  
                </TituloCont>

                </div>
         </div>
    )
}

const TituloCont= styled.div`
position: relative;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw-280px;
    overflow: hidden;
`;

const ContenedorBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const Boton = styled.button`
	display: block;
	padding: 10px 150px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #1b1a1a;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 50;
    font-size: 100 ;
	transition: .3s ease all;
	&:hover {
		background: rgb(179,40,79);
	}
`;