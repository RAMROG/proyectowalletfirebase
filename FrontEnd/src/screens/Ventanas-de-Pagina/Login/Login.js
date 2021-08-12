import "./Login.css";
import {auth} from '../../../firebaseconf';
import React, {useState} from 'react';
import  { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Mail } from "@material-ui/icons";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Wallet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser]=useState("");
  const [verifica,setVerifica]=useState("");

  const handleSubmit = async (e) => {
        e.preventDefault();  
        if (email.trim() == "" || password.trim() == "") {
            alert("No puede dejar campos vacios");
        }
        else{
        await auth.signInWithEmailAndPassword(email,password)
         .then(e=>{
           auth.onAuthStateChanged((user)=>{
              setIdUser(user.uid);
              setNameUser(user.displayName);
              setVerifica (user.emailVerified);
              if(user.emailVerified){
                window.location='/dashboard'
              }else{
                alert('su cuenta no esta verificada, revise su correo electronico')
              }
           })
          localStorage.setItem('Session_email', email);
          localStorage.setItem('Session_name', nameUser);
          localStorage.setItem('Session_id', idUser);
          localStorage.setItem('verficacion',verifica); 
        })
        .catch((error)=>{
          if(error=="Error: The password is invalid or the user does not have a password."){
            alert('Usuario y/o contraseña incorrectas, verifique su informacion')
          }else{
            if(error=="Error: The password is invalid or the user does not have a password."){
              alert("La contraseña no cumple los requisitos")
            }
          }
        })
    };
  }

    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesion
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Mantener session activa"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Iniciar Session
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/create-user" variant="body2">
                <p>No tienes cuenta? Crear usuario</p>
              </Link>
              <Link to="/" variant="body2">
                <p>volver a pagina principal</p>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}