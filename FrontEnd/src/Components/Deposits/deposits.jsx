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
          {props.title=="Porcentaje Gastos"?
          (props.money>0 ?(<h5>Porcentaje Gasto: {props.money}%</h5>):(<h5>Porcentaje Gasto: 0 %</h5>))
          :
          (<h5>Total: L.{props.money}</h5>)}
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
