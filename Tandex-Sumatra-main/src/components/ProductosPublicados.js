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

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'claveProductoP', headerName: 'Clave', width: 200 },
  { field: 'descripcionP', headerName: 'Producto', width: 400 },
  { field: 'woocomerce', headerName: 'Plataforma', width: 150 },
];


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100wv',
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


export default function PublicatedProducts() {
    const classes = useStyles();
    const rows = [
      { id: 1, 
        Clave: 'Snow',
        Descripción: 'Leo', 
        Existencias: 35, 
      },
      
    ]; 

    const[datos,setDatos] =  useState([])
    
    const renderUsuarios = () =>(
      
      <DataGrid className={classes.columnHeader} filterModel={{items: [{value: ''}],}} rows={datos} columns={columns} pageSize={12} />
      
      );
      
    

   

    const concat = (datos)=>{
   
      let id=0
      for(let i=0; i<datos.length;i++){
          if(datos[i].id==null){
              datos[i].id=id
              id++
          }
      }
      setDatos(datos)
      console.log("datos",datos)
     }

    const getProductosPublicados = () =>{
        
      const token = sessionStorage.getItem('token')
      const headers = {
        headers:{
          'Authorization':`${token}`
        }
      }
      
      axios.get('https://apitandexmx.herokuapp.com/getProductosPublicados',headers)
      .then(response=>{
        /* console.log(response.data.usuarios) */
        
        setDatos(response.data.datos) 
        concat(response.data.datos)
        // concat(response.data.Usuarios)
      }).catch(error=>{
        //error de inautorizacion
        
        console.log('Error:',error)
        
      })
    }
  
    useEffect(()=>{ 
        getProductosPublicados()
      },[''])

  return (
       
        <Container maxWidth="xl" className="lg-mg-top"> 
            <br/>
            <br/>
            <Typography variant="h3" align="center" className="lg-mg-bottom">
                Productos publicados
                <Divider variant="middle" />
            </Typography>
            <br/>
            <Typography variant="button" display="block" align="center" gutterBottom color="primary">
                <i>En esta sección verás los productos publicados en las plataformas</i>
            </Typography>
            <br/>
            
            <br/><br/>
            <div className={classes.root}>  
                {renderUsuarios()}
            </div>
            
        </Container>
  );
}
