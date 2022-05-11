
import styled from "styled-components";
import amazon from '../images/Amazon.png'
import MercadoLibre from '../images/MercadoLibre.png'
import WooCommerce from '../images/WooCommerce.png'

const Modal =({estado,cambiarEstado}) =>{

return(
    
<div>

{estado &&
<Overlay>
    <ContenedorModal>
<EncabezadoModal>
<h3>
    Elige la plataforma a subir
</h3>

</EncabezadoModal>

<BotonCerrar onClick={()=>cambiarEstado(false)}>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>

</BotonCerrar>

<contImgs>

<form>
  <input type="image" src={amazon} width="200" alt=""></input>
  <input type="image" src={MercadoLibre} width="200" alt=""></input>
  <input type="image" src={WooCommerce} width="200" alt=""></input>
</form>
<form>


<div class="container">
  <div class="row">
    <div class="col">
	<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"></input>
  <label class="form-check-label" for="flexSwitchCheckChecked">Amazon</label>
</div>
    </div>
    <div class="col">
	<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" ></input>
  <label class="form-check-label" for="flexSwitchCheckChecked">MercadoLibre</label>
</div>
    </div>
    <div class="col">
	<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" ></input>
  <label class="form-check-label" for="flexSwitchCheckChecked">WooCommerce</label>
</div>
    </div>
  </div>
</div>

</form>
  
    
    
    </contImgs>

    <ContenedorBotones>
    <Boton onClick={()=>cambiarEstado(false)}>Publicar productos...</Boton>
    </ContenedorBotones>

    </ContenedorModal>

</Overlay>
}
</div>

);

}
export default Modal;

const Overlay = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background: rgba(0,0,0,.5);
padding: 40px;
display: flex;
align-items: center;
justify-content: center;
margin-bottom:20px;
padding-bottom: 1px solid#E8E8E8;
`;

const ContenedorModal= styled.div`
width: 600px;
min-height: 100px;
background : #fff;
position: relative;
border-radius: 5px;
box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
padding: 0px;
`;
const EncabezadoModal=styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
padding-bottom: 40px;
background: #B3294E;
h3{
    
    padding: 12px;
    height:10px;
    width: 500;
front-weinght:500;
font-size: 22px;
color: #fff;
}
`;

const BotonCerrar =styled.button`
position: absolute;
top: 15px;
right: 20px;
width: 30px;
heigth: 30px;
border:none;
background: none;
cursor: pointer;
transition: .3s ease all;
border-radius: 5px;
color: #fff;
&:hover {
    background: #34495E;
}
svg {
width: 100%;
heigth: 100%;
}
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
	padding: 10px 200px;
	border-radius: 100px;
	color: #fff;
	border: none;
	background: #34495E;
	cursor: pointer;
	font-family: 'Roboto', sans-serif;
	font-weight: 50;
    font-size: 100 ;
	transition: .3s ease all;
	&:hover {
		background: rgb(179,40,79);
	}
`;