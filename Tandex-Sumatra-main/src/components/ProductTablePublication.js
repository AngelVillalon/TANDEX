import React,{useState,useEffect}from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider,
    Button
} from '@material-ui/core';
import Stack from '@mui/material/Stack';

import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//------------------------------------------------------------------------------

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//------------------------------------------------------------------------------
import axios from 'axios'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'claveProducto', headerName: 'Clave', width: 150 },
  { field: 'linea', headerName: 'linea', width: 120 },
  { field: 'descripcionP', headerName: 'Descripcion', width: 200 },
   { field: 'imagen', headerName: 'Img', width: 100 }, 
  { field: 'precio', headerName: 'Precio', width: 115 },
  { field: 'existencias', headerName: 'Existencias', width: 150 },
  { field: 'unidadEntrada', headerName: 'Unidad', width: 120 },
  /* { field: 'WarrantyML', headerName: 'Warranty ML', width: 150 },
  { field: 'listingTypeML', headerName: 'listingType ML', width: 200 },
  { field: 'currencyML', headerName: 'Currency ML', width: 200 },
  { field: 'buyingModeML', headerName: 'Buying Mode ML', width: 200 },
  { field: 'titleML', headerName: 'Title ML', width: 200 },
  { field: 'conditionML', headerName: 'Condition ML', width: 200 }, */
  { field: 'typeWOO', headerName: 'Type Woo', width: 200 },
  //nuevos campos de WOO
  { field: 'descriptionWoo', headerName: 'Description', width: 200 },
  { field: 'shortDescriptionWOO', headerName: 'Short Description WOO', width: 200 },
  { field: 'categoryWOO', headerName: 'Category WOO', width: 200 },
];


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '60vh',
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: "rgba(235,235,235,.7)"
      },
    },
    columnHeader: {
        backgroundColor: theme.palette.dark,
    },
  }));
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function ProductTablePublication() {
    const classes = useStyles();
    const rows = [
      { id: 1, 
        Clave: 'Snow',
        Descripción: 'Leo', 
        Existencias: 35, 
        Línea: 1, 
        Unidad_de_entrada: 'Snow', 
        Fecha_ultima_compra: 'Jon', 
        Ultimo_costo: 35, 
        ID_SAE: 'Snow', 
        Clave_unidad: 'Jon', 
        Clave_alterna: 35, 
      },
      
    ]; 
    
    const[itemsF,setItems] = useState([])
  
    const renderProductos = () =>(
      <DataGrid checkboxSelection disableSelectionOnClick onSelectionModelChange={(items)=> setItems(items)}
       style={{fontSize:'12px'}} className={classes.columnHeader} actions={[{icon:'edit',tooltip:'Edit'}]} filterModel={{items: [{value: ''}],}} rows={productos} columns={columns} pageSize={12}/>
      
      );
  
    //para abrir modal de ayuda
    const [ayuda, setAyuda] = React.useState(false);
    const handleClickOpenAyuda = () => {
      setAyuda(true);
    };
    const handleCloseAyuda = () => {
      setAyuda(false);
    };
    const renderFormAyuda = () => (
      <div>
        <Dialog open={ayuda} onClose={handleCloseAyuda} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Instrucciones</DialogTitle>
          <DialogContent>
            <DialogContentText>
              1.- De click en los productos que desee publicar
            </DialogContentText>
            <DialogContentText>
              2.- De click en boton "PUBLICAR PRODUCTOS"
            </DialogContentText>
            <DialogContentText>
              NOTA: Si los compos del producto elegido estan incompletos, este no será publicado en la plataforma
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAyuda} color="secondary">
              Aceptar
            </Button>
            
          </DialogActions>
        </Dialog>
      </div> 
    )

    //modales para alertas
                          //exito
    
                          const[mensajeExito,setMensajeExito] = React.useState();
                          const[openAlert,setOpenAlert] = React.useState(false);
                          
                          const handleClickOpenAlert = () => {
                            setOpenAlert(true);
                          };
                          
                          const handleCloseAlert = () => {
                            setOpenAlert(false);
                          };
                          
                                                //error
                          const[mensaje,setMensaje] = React.useState();
                          const[openAlertError,setOpenAlertError] = React.useState(false);      
                          
                          const handleClickOpenAlertError = () => {
                            setOpenAlertError(true);
                          };
                          
                          const handleCloseAlertError = () => {
                            setOpenAlertError(false);
                          };

    // funciones
    let dato = []

    const [productos, setProductos] = useState([])
    
    const publicar = () => {
      //console.log(itemsF)
      for(let i = 0; i < itemsF.length; i++) {
        //busco el producto en el arreglo PRODUCTOS con el id correspondiente
        const aux = productos.find(element => element.id === itemsF[i])
        
        if(!dato.find(element => element.id === aux.id)){
          dato.push(aux)
        }
       }
       //console.log(dato)
      let user = sessionStorage.getItem('email')
      console.log(user)
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`,
          'user':user
        }
      } 

      //http://localhost:8080/
      //https://apitandexmx.herokuapp.com/
      axios.post('http://localhost:8080/post_products',dato,headers)
      .then(res =>{
        //console.log(res)
        setMensajeExito('Producto(s) publicado(s) correctamente')
         
        handleClickOpenAlert()
        dato = []
      }).catch(error=>{
        //error de inautorizacion
        setMensaje('No se ha completado la petición con exito!')
        handleClickOpenAlertError()
        console.log('Datos insuficientes:',error)
        if(error.response.status == 401){
          if(sessionStorage.getItem('token')){
            sessionStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location = '/';
          }else{
            window.location = '/';
          }
        }
      })
    }

    //llamada a la autoprefixer
  const concat = (productos)=>{
   
   let id=0
   for(let i=0; i<productos.length;i++){
       if(productos[i].id==null){
           productos[i].id=id
           id++
       }
   }
  }
    const getProductos = () =>{
        
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`
        }
      } 
  
      axios.get('https://apitandexmx.herokuapp.com/getProductos',headers)
      .then(response=>{
        
        setProductos(response.data.productos) 
        concat(response.data.productos)
      }).catch(error=>{
        //error de inautorizacion
    
        console.log('Error:',error)
        
      })
    }
  
    useEffect(()=>{
        getProductos();
      },[''])

  return (
       
        <Container maxWidth="xl" className="lg-mg-top"> 
            <br/>
            <Typography variant="h3" align="center" className="lg-mg-bottom">
                Publicación de Productos
                <Divider variant="middle" />
            </Typography>
            
            <Typography variant="button" display="block" align="center" gutterBottom color="primary">
                <i>En esta sección podrás publicar los productos que selecciones</i>
            </Typography>
            <Stack spacing={2} direction="row">
              <Button onClick={handleClickOpenAyuda} variant="contained" color="secondary">
                Ayuda
              </Button>
            </Stack>
            
            <br/>
            <div className={classes.root}>  
                {renderProductos()}
                {renderFormAyuda()}
            </div> 
            <br/>
            <br/>
            <Stack direction="row" spacing={2} >
              <Button onClick={publicar}  variant="contained" color="primary">
                PUBLICAR PRODUCTOS
              </Button>
            </Stack>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
              <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
              {mensajeExito}
              </Alert>
            </Snackbar>

            <Snackbar open={openAlertError} autoHideDuration={3000} onClose={handleCloseAlertError}>
              <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
              {mensaje}
              </Alert>
            </Snackbar>
        </Container>
  );
}
