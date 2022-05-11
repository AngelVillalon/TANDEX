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

import TextField from '@material-ui/core/TextField';
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
      height: '80vh',
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

export default function ProductTable() {
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
                      
  
    const renderProductos = () =>(
      //onRowClick={item=>edit(item)}
      <DataGrid style={{fontSize:'12px'}} className={classes.columnHeader} onRowClick={item=>edit(item)} actions={[{icon:'edit',tooltip:'Edit'}]} filterModel={{items: [{value: ''}],}} rows={productos} columns={columns} pageSize={12}/>
      
      );
      
      //para abrir el formulario para editar el
      const [open, setOpen] = React.useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const[claveP,setClaveP]= useState([])
      
      const[linea,setLinea] = useState([])
      const[descripcion,setDescripcion] = useState([])
      const[precio,setPrecio] = useState([])
      const[existencias,setExistencias] = useState([])
      const[unidad,setUnidad]= useState([])

      const[warranty,setWarranty]= useState([])
      const[listingType,setListingType]= useState([])
      const[currency,setCurrency] = useState([])
      const[buyingMode,setbuyingMode]= useState([])
      const[title,setTitle]= useState([])
      const[condition,setCondition]= useState([])

      const[typeWoo,setTypeWoo]= useState([])
      const[shortDescription,setShortDescription]= useState([])
      //nuevas
      const[descriptionWoo,setDescriptionWoo]= useState([])
      const[categoryWoo,setCategoryWoo]= useState([])

    //Render del form para editar 
    const renderForm = () => (
      <div>
        <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Actualizar datos</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para actualizar producto edite los campos siguientes
            </DialogContentText>
              <TextField autoFocus margin="dense" id="Linea" label={"Linea: "+linea} onChange={(e) =>setLinea(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Descripcion" label={"Descripción: "+descripcion} onChange={(e) =>setDescripcion(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Precio" label={"Precio: "+precio} type="number" onChange={(e) =>setPrecio(e.target.value)} fullWidth />
              <TextField autoFocus margin="dense" id="Existencias" label={"Existencias: "+existencias} onChange={(e) =>setExistencias(e.target.value)} type="number" fullWidth />
              <TextField autoFocus margin="dense" id="Unidad" label={"Unidad: "+unidad} type="text" onChange={(e) =>setUnidad(e.target.value)} fullWidth />
              {/* <TextField autoFocus margin="dense" id="Warranty Mercado Libre" label={"Warranty Mercado Libre: "+warranty} onChange={(e) =>setWarranty(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Listing Type Libre" label={"Listing Type Mercado Libre: "+listingType} onChange={(e) =>setListingType(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Currency Libre" label={"Currency Mercado Libre: "+currency} onChange={(e) =>setCurrency(e.target.value)} type="text"  fullWidth  />
              <TextField autoFocus margin="dense" id="Buying Mode Libre" label={"Buying Mode Mercado Libre: "+buyingMode} onChange={(e) =>setbuyingMode(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Title Mercado Libre" label={"Title Mercado Libre: "+title} onChange={(e) =>setTitle(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Condition Mercado Libre" label={"Condition Mercado Libre: "+condition} onChange={(e) =>setCondition(e.target.value)} type="text" fullWidth  /> */}
              <TextField autoFocus margin="dense" id="Type Woocomerce" label={"Type Woocomerce: "+typeWoo} onChange={(e) =>setTypeWoo(e.target.value)} type="text" fullWidth  />

              <TextField autoFocus margin="dense" id="descriptionWoocomerce" label={"Description Woocomerce: "+descriptionWoo} onChange={(e) =>setDescriptionWoo(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="shortDescription Woocomerce" label={"Short Description Woocomerce: "+shortDescription} onChange={(e) =>setShortDescription(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="shortDescription Woocomerce" label={"Category Woocomerce: "+categoryWoo} onChange={(e) =>setCategoryWoo(e.target.value)} type="text" fullWidth  />
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row">

            <Button onClick={handleClose} variant="contained" color="primary">
              Cancelar
            </Button>
            <Button onClick={actualizar} variant="contained" color="primary">
              Actualizar
            </Button>
            <Button onClick={eliminarProducto} variant="outlined"  color="secondary">
              Eliminar
            </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div> 
    )
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
              1.- De click en el producto que desee editar
            </DialogContentText>
            <DialogContentText>
              2.- Llene los datos faltantes de su producto
            </DialogContentText>
            <DialogContentText>
              3.- Cambie los datos que desea modificar
            </DialogContentText>
            <DialogContentText>
              4.- Oprima el botón "Actualizar"
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

    //form para añadir producto individual 

    const[nuevoProducto,setNuevoProducto]= React.useState(false)

    const handleClickOpenNuevoUsuario = () =>{
      setNuevoProducto(true)
    }

    const handleClickCloseNuevoUsuario = () =>{
      setNuevoProducto(false)
    }
    
    const renderFormNuevoProducto = () => (
      <div>
        <Dialog open={nuevoProducto} onClose={handleClickCloseNuevoUsuario}  aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Agregar producto</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para agregar un nuevo prodcuto, deberá llenar todos los campos disponibles
            </DialogContentText>
              <TextField autoFocus margin="dense" id="Linea" label={"Clave: "+claveP} onChange={(e) =>setClaveP(e.target.value)} type="number" fullWidth />
              <TextField autoFocus margin="dense" id="Linea" label={"Linea: "+linea} onChange={(e) =>setLinea(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Descripcion" label={"Nombre: "+descripcion} onChange={(e) =>setDescripcion(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Precio" label={"Precio: "+precio} type="number" onChange={(e) =>setPrecio(e.target.value)} fullWidth />
              <TextField autoFocus margin="dense" id="Existencias" label={"Existencias: "+existencias} onChange={(e) =>setExistencias(e.target.value)} type="number" fullWidth />
              <TextField autoFocus margin="dense" id="Unidad" label={"Unidad: "+unidad} type="text" onChange={(e) =>setUnidad(e.target.value)} fullWidth />
              {/* <TextField autoFocus margin="dense" id="Warranty Mercado Libre" label={"Warranty Mercado Libre: "+warranty} onChange={(e) =>setWarranty(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Listing Type Libre" label={"Listing Type Mercado Libre: "+listingType} onChange={(e) =>setListingType(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Currency Libre" label={"Currency Mercado Libre: "+currency} onChange={(e) =>setCurrency(e.target.value)} type="text"  fullWidth  />
              <TextField autoFocus margin="dense" id="Buying Mode Libre" label={"Buying Mode Mercado Libre: "+buyingMode} onChange={(e) =>setbuyingMode(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Title Mercado Libre" label={"Title Mercado Libre: "+title} onChange={(e) =>setTitle(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Condition Mercado Libre" label={"Condition Mercado Libre: "+condition} onChange={(e) =>setCondition(e.target.value)} type="text" fullWidth  /> */}
              <TextField autoFocus margin="dense" id="Type Woocomerce" label={"Type Woocomerce: "+typeWoo} onChange={(e) =>setTypeWoo(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="descriptionWoocomerce" label={"Description Woocomerce: "+descriptionWoo} onChange={(e) =>setDescriptionWoo(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="shortDescription Woocomerce" label={"Short Description Woocomerce: "+shortDescription} onChange={(e) =>setShortDescription(e.target.value)} type="text" fullWidth  />
              <TextField autoFocus margin="dense" id="Category Woocomerce" label={"Category Woocomerce: "+categoryWoo} onChange={(e) =>setCategoryWoo(e.target.value)} type="text" fullWidth  />
          </DialogContent>
          <DialogActions>
            <Stack spacing={2} direction="row">

            <Button onClick={handleClickCloseNuevoUsuario} variant="contained" color="primary">
              Cancelar
            </Button>
            <Button onClick={addProducto}  variant="contained" color="primary">
              Agregar
            </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div> 
    )

    // funciones
    const [productos, setProductos] = useState([])

    const edit = (items) =>{  
      console.log(items.row)  
      
      setClaveP(items.row.claveProducto)

      setLinea(items.row.linea)
      setDescripcion(items.row.descripcionP)
      setPrecio(items.row.precio)
      setExistencias(items.row.existencias)
      /* console.log(existencias) */
      setUnidad(items.row.unidadEntrada)
      /* setWarranty(items.row.warrantyML)
      setListingType(items.row.listingTypeML)
      setCurrency(items.row.currencyML)
      setbuyingMode(items.row.buyingModeML)
      setTitle(items.row.titleML)
      setCondition(items.row.conditionML) */
      setTypeWoo(items.row.typeWOO)
      setDescriptionWoo(items.row.descriptionWoo)
      setShortDescription(items.row.shortDescriptionWOO)
      setCategoryWoo(items.row.categoryWOO)

      handleClickOpen()
    }
    
    const addProducto = () =>{
      const data={
        clave:claveP,
        linea:linea,
        descripcion:descripcion,
        precio:precio,
        existencias:existencias,
        unidad:unidad,
        typeWoo:typeWoo,
        shortDescription:shortDescription,
        descriptionWOO:descriptionWoo,
        categoryWOO:categoryWoo  
        }
        console.log(data)

        const token = sessionStorage.getItem('token')
        const headers = {
        headers:{
          'Authorization':`${token}`
        }
      }
      //console.log(data)
       axios.post('https://apitandexmx.herokuapp.com/add_producto',data,headers)
       .then(response=>{
        //console.log(response)
        setMensajeExito('Producto añadido correctamente')
        handleClickCloseNuevoUsuario()
        getProductos() 
        handleClickOpenAlert()
        //window.location.reload()
      }).catch(error=>{
        //error de inautorizacion
        setMensaje('No se pude añadir el producto!')
        handleClickCloseNuevoUsuario()
        handleClickOpenAlertError()
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

    const actualizar = (e) =>{
      const data={
        clave:claveP,
        linea:linea,
        descripcion:descripcion,
        precio:precio,
        existencias:existencias,
        unidad:unidad,
        typeWoo:typeWoo,
        descriptionWOO:descriptionWoo,
        shortDescriptionWOO:shortDescription,
        categoryWOO:categoryWoo
        }

        const token = sessionStorage.getItem('token')
        const headers = {
        headers:{
          'Authorization':`${token}`
        }
      }
      
      //console.log(data) 
       axios.post('https://apitandexmx.herokuapp.com/update_products',data,headers)
       .then(response=>{
        //console.log(response)
        setMensajeExito('Producto actualizado correctamente')
        handleClose()
        getProductos() 
        handleClickOpenAlert()
        //window.location.reload()
      }).catch(error=>{
        //error de inautorizacion
        setMensaje('No se pude actualizar el producto!')
        handleClose()
        handleClickOpenAlertError()
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

    const eliminarProducto = () =>{
      const token = sessionStorage.getItem('token')
        const headers = {
          headers:{
            'Authorization':`${token}`
          }
        }
        console.log(claveP)
        const data = {
          claveProducto:claveP
        }

        axios.post('https://apitandexmx.herokuapp.com/deleteProducto',data,headers)
        .then(res=>{
          setMensajeExito('Producto eliminado correctamente')
          handleClose()
          getProductos()
          handleClickOpenAlert()
        }).catch(error=>{
          //error de inautorizacion
          setMensaje('No se pudo eliminar el producto!')
          handleClose()
          handleClickOpenAlertError()
          console.log('error: ',error)
        }) 
    }
  const concat = (productos)=>{
   
   let id=1
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
                Lista de Productos
                <Divider variant="middle" />
            </Typography>
            
            <Typography variant="button" display="block" align="center" gutterBottom color="primary">
                <i>En esta sección verás los productos disponibes y la opción de editar sus atributos</i>
            </Typography>
            <Stack spacing={2} direction="row">
              <Button onClick={handleClickOpenAyuda} variant="contained" color="secondary">
                Ayuda
              </Button>
              <Button onClick={handleClickOpenNuevoUsuario} variant="outlined" color="primary" >
                Agregar producto
              </Button>
            </Stack>
            
            <br/>
            <div className={classes.root}>  
                {renderProductos()}
                {renderForm()}
                {renderFormAyuda()}
                {renderFormNuevoProducto()}
            </div>
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
