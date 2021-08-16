import React,  {useState} from 'react';
import {auth} from '../../../firebaseconf';
import  { Redirect, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { LaptopWindowsRounded } from '@material-ui/icons';

const API = process.env.REACT_APP_API;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/#">
        Wallet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const UseStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateUser() {
    const classes = UseStyles();
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    

    const handleSubmitCreate = async (e) => {
        e.preventDefault(); 
        if (email.trim() == "" || password.trim() == "" || name.trim() == ""  || last_name.trim() == "" ) {
          alert("No puede dejar campos vacios");
         }else{
          await auth.createUserWithEmailAndPassword(email,password)
          .then(f=>{
            let use=auth.currentUser;
            use.updateProfile({displayName:name+last_name})
            use.sendEmailVerification()
            .then(f=>{
              alert("Revise su correo, se envio el enlace para que verifique");
              window.location='/login';
            })
          }  
          )
          .catch(e=>{
            if(e=="Error: The email address is already in use by another account."){
              alert("Usuario ya tiene una cuenta, registrada")
            }else{
              if(e=="Error: The email address is badly formatted."){
                alert("El email ingresado es incorrecto")
              }else{
                if(e=="Error: Password should be at least 6 characters"){
                  alert("Contraseña demasiado corta")
                }
              }
            }
          })
         }
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crear Usuarios
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellidos"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Acepto los terminos y condiciones"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitCreate}
          >
            Crear Usuario
          </Button>
          <Link to="/login" variant="body2" >
                <p>Ya tienes cuenta? Inicia Sesion</p>
          </Link>
          <Link to="/" variant="body2" >
                <p>Volver a la pagina Principal</p>
          </Link>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}