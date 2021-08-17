import React, { useState, useEffect } from 'react';
//import Link from '@material-ui/core/Link';
import { Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title/title';
import Button from '@material-ui/core/Button';
import { auth,database } from '../../firebaseconf';


const API = process.env.REACT_APP_API;
const idUsuario = localStorage.getItem("idUsuario");

function preventDefault(event) {
  event.preventDefault();
}

const UseStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Movlist() {
  const session_id = localStorage.getItem("Session_id");
  const classes = UseStyles();
  const [movimientos, setMovimientos]=useState([]);
  const [datosCuentas, setCuentas] = useState({});
  let suma=0.0;
  const [sumaCuentas,setsuma]=useState(0);
  const [datosPagos, setPagos] = useState({});

  const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    table: {
        minWidth: 650,
    },
});

  const obtenerCuentas = async () => {
    await auth.onAuthStateChanged((z)=>{if(z){
        const data= async()=>{
            await database.ref().child(z.uid).child('cuentas').on('value',(e)=>{
            const todo=[];
            const da= e.forEach(element => {
                todo.push(element.val())
            });
            if(todo.length>0){
                setCuentas(todo);
              }   
        })}
        data();
    }else{
        alert("error")
    }})
        }


        const obtenerPagos = async () => {
          await auth.onAuthStateChanged((z)=>{if(z){
              const data= async()=>{
                  await database.ref().child(z.uid).child('Pagos').on('value',(e)=>{
                  const todo=[];
                  const da= e.forEach(element => {
                      todo.push(element.val())
                  });
                  if(todo.length>0){
                      setPagos(todo);
                    }   
              })}
              data();
          }else{
              alert("error")
          }})
              }

  useEffect(() => {
    obtenerCuentas();
    obtenerPagos();
  }, [])


  return (
    <React.Fragment>
      <Title align="center">Cuentas de Usuario</Title>
      <Table size="small">
      <TableHead>
             <TableRow>
                 <TableCell color="primary" align="right">#</TableCell>
                  <TableCell color="primary" align="right">Nombre del banco</TableCell>
                  <TableCell color="primary" align="right">Numero Cuenta</TableCell>
                  <TableCell color="primary" align="right">Tipo cuenta</TableCell>
                  <TableCell color="primary" align="right">Monto</TableCell>
                  </TableRow>
              </TableHead>
        <TableBody>
        {
            datosCuentas.length>0 ?
            (datosCuentas.map((row, key) => (
              <TableRow key={key}>
                           <TableCell  align="right">{++key}</TableCell>
                           <TableCell align="right">{row.name_bank_account}</TableCell>
                           <TableCell align="right">{row.number_account}</TableCell>
                            <TableCell align="right">{row.type_bank}</TableCell>
                            <TableCell align="right">{row.mount}</TableCell>
                            <TableCell align="right">
                            </TableCell>
                </TableRow>
                              ))):
            (console.log(' no existe data'))}
        </TableBody>
      </Table>
      <Title align="center"></Title>
      <br></br><br></br><br></br>
      <Title align="center">Pagos Realizados</Title>
      <Table className={styles.table} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell color="primary" align="right">#</TableCell>
                                                        <TableCell color="primary" align="right">Nombre</TableCell>
                                                        <TableCell color="primary" align="right">Monto</TableCell>
                                                        <TableCell color="primary" align="right">Categoria</TableCell>
                                                        <TableCell color="primary" align="right">Descripcion</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {
                                                    datosPagos.length>0 ?
                                                    (datosPagos.map((row, key) => (
                                                        <TableRow key={key}>
                                                            <TableCell align="right">{++key}</TableCell>
                                                            <TableCell align="right">{row.nombrePago}</TableCell>
                                                            <TableCell align="right">{row.monto}</TableCell>
                                                            <TableCell align="right">{row.categoria}</TableCell>
                                                            <TableCell align="right">{row.descripccion}</TableCell>
                                                            <TableCell align="right">
                                                            </TableCell>
                                                        </TableRow>
                                                     ))):
                                                    (console.log(' no existe data'))}
                                                </TableBody>
                          
                                            </Table>
                                            <br></br><br></br><br></br>
                                            <Link to='/cuentas'>
                                                    <p>Ir a crear cuentas y pagos nuevos</p>
                                                </Link>
      
      
      <div className={classes.seeMore}>
      </div>
    </React.Fragment>
  );
}
