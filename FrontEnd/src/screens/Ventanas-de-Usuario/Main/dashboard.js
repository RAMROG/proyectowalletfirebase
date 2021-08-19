import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from './../../../Components/Deposits/deposits';
import Orders from '../../../Components/MovList/movlist';
import Menu from '../../../Components/Menu/Menu';
import {auth,database} from '../../../firebaseconf';



const API = process.env.REACT_APP_API;


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Wallet
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [informacion, setInformacion] = useState([]);
  const session_id = localStorage.getItem("Session_id");
  const [datosCuentas, setCuentas] = useState(0);
  const [sumaCuentas,setSumaCuentas]=useState(0);
  const [datosPagos, setPagos] = useState({});
  const [sumaPagos,setSumaPagos]=useState(0);

  const obtenerCuentas = async () => {
    await auth.onAuthStateChanged((z)=>{if(z){
        const data= async()=>{
            await database.ref().child(z.uid).child('cuentas').on('value',(e)=>{
            let suma=0.0;
            const todos=e.val();
            for(let id in  todos){
                suma+=parseFloat(todos[id].mount)
            }
            console.log(suma)
            if(suma>=0){
                setSumaCuentas(suma);
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
                  let suma=0.0;
                  const todos=e.val();
                  for(let id in  todos){
                      suma+=parseFloat(todos[id].monto)
                  }
                  console.log(suma)
                  if(suma>=0){
                      setSumaPagos(suma);
                    }   
              })}
              data();
          }else{
              alert("error")
          }})
              }

      const comprobarLog=async ()=>{
        auth.onIdTokenChanged(f=>{
          if(f){console.log("usuario logueado")}else{
            window.location="/login";
          }
        })
      }

  useEffect(() => {
    comprobarLog();
    obtenerCuentas();
    obtenerPagos();
  }, [])
  
  return (
      <div className={classes.root}>
        <Menu title="Pagina Principal">
        </Menu>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item xs={6} md={4} lg={3}>
              <Deposits money={sumaCuentas-sumaPagos} title="Balance"/>              
            </Grid>

            <Grid item xs={6} md={4} lg={3}>
              <Deposits money={sumaPagos} title="Gastos"/>
            </Grid>

            <Grid item xs={6} md={4} lg={3}>
              <Deposits money={sumaCuentas} title="Cuentas"/>              
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Deposits money={((sumaPagos*100)/sumaCuentas).toFixed(2)} title="Porcentaje Gastos"/>              
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
    );
}
