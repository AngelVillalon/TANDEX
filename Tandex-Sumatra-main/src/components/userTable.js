import React,{useState,useEffect}from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography,
    Divider,
    Button
} from '@material-ui/core';
import axios from 'axios'
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


//------------------------------------------
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//---------------------------------------------------------------

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'tipoUsuario', headerName: 'Tipo Usuario', width: 250 },
  { field: 'correo', headerName: 'Correo', width: 350 },
  { field: 'nombre', headerName: 'Nombre', width: 260 },
  { field: 'apellido', headerName: 'Apellido', width: 260 }
];


const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      margin: '0 auto',
      height: '50vh',
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
  

export default function UserTable() {
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

    //modales para alertas

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
    
    const [usuarios, setUsuarios] = useState([])
    const [open, setOpen] = React.useState(false)
    
    const renderUsuarios = () =>(
      
      <DataGrid className={classes.columnHeader} filterModel={{items: [{value: ''}],}} rows={usuarios} columns={columns} pageSize={12} onRowClick={item=>edit(item)}/>
      
      );
      
      const edit = (items) =>{  
        /* console.log(items.row) */
        setTipoUsuario(items.row.tipoUsuario)
        setCorreo(items.row.correo)
        setNombre(items.row.nombre)
        setApellido(items.row.apellido)
        setId(items.row.id)

        handleClickOpen()
      }

    const[id,setId] = useState([])  
    const[tipoUsuario,setTipoUsuario]=useState([])
    const[correo,setCorreo]=useState([])
    const[nombre,setNombre]= useState([])
    const[apellido,setApellido]= useState([])

    const[contraseña,setContraseña]=useState([])

    //form para editar campos del usuario
    const renderForm = () => (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Actualizar datos</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para actualizar producto edite los campos siguientes
            </DialogContentText>
              <TextField autoFocus margin="dense" id="tipoUsuario" label={"Tipo de Usuario: "+tipoUsuario} onChange={(e)=>setTipoUsuario(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Correo" label={"Correo: "+correo} onChange={(e)=>setCorreo(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Nombre" label={"Nombre: "+nombre} onChange={(e)=>setNombre(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Apellido" label={"Apellido: "+apellido} onChange={(e)=>setApellido(e.target.value)} type="text" fullWidth />
          
          </DialogContent><br/>
          <DialogActions>
            <Stack spacing={2} direction="row">

            <Button onClick={handleClose} variant="contained" color="primary">
              Cancelar
            </Button>
            <Button onClick={actualizar} variant="contained" color="primary">
              Actualizar
            </Button>
            <Button variant="outlined" onClick={eliminarUsuario}  color="secondary">
              Eliminar
            </Button>
            </Stack>
          </DialogActions><br/>
        </Dialog>
      </div> 
    )

    //modal de ayuda
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
              1.- De click en el usuario que desee editar
            </DialogContentText>
            <DialogContentText>
              2.- Cambie los datos que desea modificar
            </DialogContentText>
            <DialogContentText>
              3.- Oprima el botón "Actualizar"
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

    //form para agregar usuario

    const[nuevoUsuario,setNuevoUsuario]=React.useState(false)

    const handleClickOpenNuevoUsuario = () => {
      setNuevoUsuario(true)
    }

    const handleClickCloseNuevoUsuario =()=>{
      setNuevoUsuario(false)
    }

    const renderFormNuevoUsuario = () => (
      <div>
        <Dialog open={nuevoUsuario} onClose={handleClickCloseNuevoUsuario} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Añadir usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para agregar un nuevo usuario, deberá llenar todos los campos disponibles
            </DialogContentText>
              <TextField autoFocus margin="dense" id="Correo" label={"Correo: "} onChange={(e)=>setCorreo(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="constraseña" label={"Contraseña: "} onChange={(e)=>setContraseña(e.target.value)} type="password" fullWidth/>
              <TextField autoFocus margin="dense" id="tipoUsuario" label={"Tipo de Usuario: "} onChange={(e)=>setTipoUsuario(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Nombre" label={"Nombre: "} onChange={(e)=>setNombre(e.target.value)} type="text" fullWidth />
              <TextField autoFocus margin="dense" id="Apellido" label={"Apellido: "} onChange={(e)=>setApellido(e.target.value)} type="text" fullWidth />
          
          </DialogContent><br/>
          <DialogActions>
            <Stack spacing={2} direction="row">

            <Button onClick={handleClickCloseNuevoUsuario} variant="contained" color="primary">
              Cancelar
            </Button>
            <Button onClick={añadir} variant="contained" color="primary">
              Agregar
            </Button>
            </Stack>
          </DialogActions><br/>
        </Dialog>
      </div> 
    )

    //Funciones

    const añadir = () =>{
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`,
          
        }
      }
      
        console.log(correo,contraseña,nombre,apellido,tipoUsuario) 

        const data ={
          nombre:nombre,
          apellidoPaterno:apellido,
          email:correo,
          password:contraseña,
          nivelCuenta:tipoUsuario
        }

        axios.post('https://apitandexmx.herokuapp.com/upload_user',data,headers)
        .then(response=>{ 
          setMensajeExito('Usuario añadido correctamente')
          handleClickCloseNuevoUsuario()
          getUsuarios()
          handleClickOpenAlert()
        }).catch(error=>{
          setMensaje('El usuario no se pudo añadir!')
          handleClickCloseNuevoUsuario()
          handleClickOpenAlertError()
        }) 
    }
    const actualizar = ()=>{
        const token = sessionStorage.getItem('token')
        const headers = {
          headers:{
            'Authorization':`${token}`,
            
          }
        }
        
        const data = {
          nombre:nombre,
          apellido:apellido,
          correo:correo,
          tipoUsuario:tipoUsuario,
          id:id
        }

        axios.post('https://apitandexmx.herokuapp.com/update_user',data,headers)
        .then(res=>{
          setMensajeExito('Usuario actualizado correctamente')
          handleClose()
          getUsuarios()
          handleClickOpenAlert()
        }).catch(error=>{
          setMensaje('No se pude actualizar el usuario!')
          handleClose()
          handleClickOpenAlertError()
          
          console.log('error: ',error)
        })  
    }

    const eliminarUsuario = () =>{
      const token = sessionStorage.getItem('token')
        const headers = {
          headers:{
            'Authorization':`${token}`
          }
        }
        console.log(id)
        const data = {
          id:id
        }

        axios.post('https://apitandexmx.herokuapp.com/delete_user',data,headers)
        .then(res=>{
          setMensajeExito('Usuario eliminado correctamente')
          handleClose()
          getUsuarios()
          handleClickOpenAlert()
        }).catch(error=>{
          //error de inautorizacion
          setMensaje('No se pudo eliminar el usuario!')
          handleClose()
          handleClickOpenAlertError()
          console.log('error: ',error)
        }) 
    }

    const getUsuarios = () =>{
        
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`
        }
      }
      

      axios.get('https://apitandexmx.herokuapp.com/getUsers',headers)
      .then(response=>{
        /* console.log(response.data.usuarios) */
        setUsuarios(response.data.usuarios) 
        // concat(response.data.Usuarios)
      }).catch(error=>{
        //error de inautorizacion
        setMensaje('Ocurrió un error al cargar los usuarios')
        handleClickOpenAlertError()
        console.log('Error:',error)
        
      })
    }
  
    useEffect(()=>{
        getUsuarios();
      },[''])

  return (
       
        <Container maxWidth="xl" className="lg-mg-top"> 
            <br/>
            <br/>
            <Typography variant="h3" align="center" className="lg-mg-bottom">
                Lista de Usuarios
                <Divider variant="middle" />
            </Typography>
            <br/>
            <Typography variant="button" display="block" align="center" gutterBottom color="primary">
                <i>En esta sección verás los usuarios registrados en la base de datos</i>
            </Typography>
            <br/>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={handleClickOpenAyuda} color="secondary">
                Ayuda
              </Button>
              <Button onClick={handleClickOpenNuevoUsuario} variant="outlined" color="primary" >
                Agregar usuario
              </Button>
            </Stack>
            <br/><br/>
            <div className={classes.root}>  
                {renderUsuarios()}
                {renderForm()}
                {renderFormAyuda()}
                {renderFormNuevoUsuario()}
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
