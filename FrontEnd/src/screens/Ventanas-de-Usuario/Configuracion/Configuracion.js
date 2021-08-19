import React, { useState, useEffect } from 'react';
import "../Configuracion/Configuracion.css";
import Menu from '../../../Components/Menu/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Button, DialogContentText, TextField } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {auth,database} from "../../../firebaseconf"



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


//import finanzas from '../assets/img/finanzas.jpg';
const API = process.env.REACT_APP_API;

const Configuracion = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contraseñaNueva, setContraseñaNueva] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [last_name, setLastName] = useState('');
    //campos nuevos favor agregar a la base
    const [direccion, setDireccion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [codigoPostal, setCodigoPostal] = useState('');
    const [descripccion, setDescripccion] = useState('');
    const [telefono, setTelefono] = useState('')
    const [editarContra, setEditarContra] = useState(false);
    const [editar, setEditar] = useState(false);

    /*falta implementacion dinamica en imput*/
    const handleSubmitActualizar = async (e) => {
        e.preventDefault();
        if(name.length<3 || last_name.length<3 || pais.length<3 || ciudad.length<3 || codigoPostal.length<3){
            alert("Nombre, apellido,pais y/o cuidad demasiado cortos(minimo 3 caracteres)")
        }else{
            const json_data = {
                //id_user : idUsuario,
                direccion: direccion,
                telefono: telefono,
                ciudad: ciudad,
                pais: pais,
                codigoPostal : codigoPostal,
                descripccion:descripccion
    
            };
            try{
                
                await auth.onAuthStateChanged((z)=>{if(z){
                    database.ref(`/${z.uid}/informacion/`).set(json_data)
                    .then(e=>{
                        let use=auth.currentUser;
                        use.updateProfile({
                        displayName:name+" "+last_name })
                        setEditar(false)})
                        }})
                        .then()
                }catch(e){
                   console.log(e);
             }
        }
    };

    const obtenerDatos = async () => {
        await auth.onAuthStateChanged((z) => {
          if (z) {
            let nombre=z.displayName.split(" ");
            setName(nombre[0])
            setLastName(nombre[1])
            setEmail(z.email)
            setTelefono(z.phoneNumber)
          }
        })
        await auth.onAuthStateChanged((z)=>{if(z){
            const data= async()=>{
                await database.ref().child(z.uid).child('informacion').on('value',(e)=>{
                const todos=e.val();
                console.log(todos.codigoPostal)
                if(todos){
                    setCodigoPostal(todos.codigoPostal)
                    setCiudad(todos.ciudad)
                    setDescripccion(todos.descripccion)
                    setDireccion(todos.direccion)
                    setPais(todos.pais)
                    setTelefono(todos.telefono)
                    console.log("llego")
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
        obtenerDatos();
    }, [])

    


    const openDialogoImagen = () => {
        document.getElementById('input-img-perfil').click();
    }

    const actualizarContrasena =async() => {
        if (contraseñaNueva !== confirmar) {
            alert("Las contraselas nuevas no coinciden")
        } else {
            console.log('hacer la peticion');
            const user =auth.currentUser;
            user.updatePassword(contraseñaNueva).then((e)=>{
                console.log('contraseña modificada correctamente')
                auth.signOut().then(()=>{window.location='/login'}).catch(e=>{console.log(e)})
            }).catch(e=>{
                if(e.message=="Password should be at least 6 characters"){
                    alert("La contraseña es muy corta, debe tener al menos 7 caracteres")
                }else{
                    if(e.code=="auth/requires-recent-login" || e.code=="auth/user-token-expired"){
                        alert("debe iniciar de nuevo para poder modificar la contraseña")
                        window.location="/login"
                    }
                }
                console.log(e)})
        }
    }
   
    return (
        <>
            <div className={classes.root}>
                <Menu title="Perfil de usuario"/>
                <main style={{ marginTop: "8vh" }} className={classes.content}>
                    <div className="content">
                        <div className="row-perfil d-flex justify-content-center" style={{ marginTop: "10vh" }}>
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="title" style={{textAlign: 'center'}} >CONFIGURACION DE PERFIL</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    Correo Electronico
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled
                      />
                </Grid>
                <Grid item xs={6}>
                    Nombre
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={6}>
                    Apellido
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={6}>
                    Cuidad
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={ciudad}
                        onChange={e => setCiudad(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={6}>
                    Pais
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={pais}
                        onChange={e => setPais(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={6}>
                    Codigo Postal
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={codigoPostal}
                        onChange={e => setCodigoPostal(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={6}>
                    Numero de Telefono
                    <TextField
                        style={{ width: '100%' }}
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                        disabled
                        />
                </Grid>
                <Grid item xs={12}>
                    Descripcion de Perfil
                    <TextareaAutosize
                        onChange={e => setDescripccion(e.target.value)}
                        style={{ width: '100%' }}
                        aria-label="minimum height"
                        minRows={7}
                        value={descripccion}
                       disabled
                            />
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={() => setEditar(true)} >
                            Actualizar Perfil
                        </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button  variant="contained" color="primary" onClick={() => setEditarContra(true)} >
                        Actualiza contraseña
                    </Button>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
                                        
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 d-none">
                                <div className="card-user card">

                                    <div>

                                        {/* MODAL CONTRASEÑA */}
                                        <div>
                                            <Dialog
                                                open={editarContra}
                                                onClose={() => setEditarContra(false)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                style={{ width: '100%' }}
                                            >
                                                <DialogTitle id="alert-dialog-title">Actualizar contraseña</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        <div className="modal-body" style={{ width: 300 }} >
                                                            <div className="form-group">
                                                                <label>Contraseña nueva</label>
                                                                <input placeholder="Contraseña nueva" value={contraseñaNueva} onChange={(e) => setContraseñaNueva(e.target.value)} type="password" className="form-control" ></input>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Confirmar Contraseña</label>
                                                                <input placeholder="Confirmar contraseña" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} type="password" className="form-control"></input>
                                                            </div>
                                                        </div>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setEditarContra(false)} color="primary">
                                                        Cancelar
                                                    </Button>
                                                    <Button color="primary" onClick={actualizarContrasena} autoFocus>
                                                        Actualizar
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                        {/* FIN MODAL CONTRASEÑA */}


                                        {/* MODAL EDITAR PERFIL */}
                                        <div>
                                            <Dialog
                                                open={editar}
                                                onClose={() => setEditar(false)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                style={{ width: '100%' }}
                                            >
                                                <DialogTitle id="alert-dialog-title">Actualizar perfil</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        <div className="modal-body" style={{ width: 500 }} >
                                            

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <TextField
                                                                        style={{ width: '100%' }}
                                                                        id="standard-multiline-flexible"
                                                                        label="Nombre"
                                                                        maxRows={4}
                                                                        value={name}
                                                                        onChange={e => setName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <TextField
                                                                        style={{ width: '100%' }}
                                                                        id="standard-multiline-flexible"
                                                                        label="Apellido"
                                                                        maxRows={4}
                                                                        value={last_name}
                                                                        onChange={e => setLastName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <TextField
                                                                        style={{ width: '100%' }}
                                                                        id="standard-multiline-flexible"
                                                                        label="Direccion"
                                                                        maxRows={4}
                                                                        value={direccion}
                                                                        onChange={e => setDireccion(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-6" >
                                                                    <div className="form-group">
                                                                        <TextField
                                                                            style={{ width: '100%' }}
                                                                            id="standard-multiline-flexible"
                                                                            label="Cuidad"
                                                                            maxRows={4}
                                                                            value={ciudad}
                                                                            onChange={e => setCiudad(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6" >
                                                                    <div className="form-group">
                                                                        <TextField
                                                                            style={{ width: '100%' }}
                                                                            id="standard-multiline-flexible"
                                                                            label="Pais"
                                                                            maxRows={4}
                                                                            value={pais}
                                                                            onChange={e => setPais(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6" >
                                                                    <div className="form-group">
                                                                        <TextField
                                                                            style={{ width: '100%' }}
                                                                            id="standard-multiline-flexible"
                                                                            label="Codigo postal"
                                                                            maxRows={4}
                                                                            value={codigoPostal}
                                                                            onChange={e => setCodigoPostal(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6" >
                                                                    <div className="form-group">
                                                                        <TextField
                                                                            style={{ width: '100%' }}
                                                                            id="standard-multiline-flexible"
                                                                            label="telefono"
                                                                            maxRows={4}
                                                                            value={telefono}
                                                                            onChange={e => setTelefono(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <TextareaAutosize
                                                                            onChange={e => setDescripccion(e.target.value)}
                                                                            style={{ width: '100%', height: '100%' }}
                                                                            aria-label="minimum height"
                                                                            minRows={5}
                                                                            value={descripccion}
                                                                            placeholder="Descripcion perfil"

                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setEditar(false)} color="primary">
                                                        Cancelar
                                                    </Button>
                                                    <Button  onClick={handleSubmitActualizar} color="primary" autoFocus>
                                                        Actualizar
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                        {/* FIN MODAL EDITAR PERFIL */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Configuracion;
