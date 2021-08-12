import React, {useEffect,useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Fragment } from 'react';
import {auth,database} from '../../firebaseconf';

const UseStyles = makeStyles({
  root: {
    minWidth: 245,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Deposits(props) {
  const classes = UseStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [datosPagos, setPagos] = useState();
  
  
  const obtenerPagos = async ()=> {
     await auth.onAuthStateChanged((z)=>{if(z){
        const data= async()=>{
            await database.ref().child(z.uid).child('Pagos').on('value',(e)=>{
            const todo=0.0;
            if (e.length>0){
              e.map(item=>{
                todo+=item.monto;
              })
            }
            alert("entro")
            if(todo>=0){
                setPagos(todo);
              }   
        })}
        data()
    }else{
        alert("error")
    }})
        }
  useEffect(() => {
    obtenerPagos();
    }, [])

  return (
    <React.Fragment>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.title}
        </Typography>
        <Typography variant="h5" component="h2">
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Movimiento {datosPagos}
        </Typography>
        <Typography variant="body2" component="p">
          Este es el resumen de:
          <br />
          {props.title}
        </Typography>

      </CardContent>
      
    </Card>
    </React.Fragment>
  );
}
