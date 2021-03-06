import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../Configuracion/Configuracion.css";
import Menu from '../../../Components/Menu/Menu';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MenuItem, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth, database } from '../../../firebaseconf';

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


const API = process.env.REACT_APP_API;

const Cuentas = () => {
    const classes = useStyles();
    //probar 
    const idUsuario = localStorage.getItem("Session_id");
    const [iduser, setuser] = useState("");
    const [datosCuentas, setCuentas] = useState([]);
    const [dataCategoria, setDataCategoria] = useState([]);

    const [tipoCuenta, setTipoCuenta] = useState("");
    const [nombreBanco, setNombreBanco] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");
    const [csv, setCsv] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const [monto, setMonto] = useState("");
    const [montoPago, setMontoPago] = useState("");
    const [descripcionPago, setDescripcionPago] = useState("");
    const [idCuenta, setIdCuenta] = useState("");
    const [nombrePago, setNombrePago] = useState('');
    const [categoriaPago, setCategoriaPago] = useState('');
    const [csvValido, setCsvValido] = useState(false);


    const [openModalPagos, setOpenModalPagos] = useState(false);
    const [openModalCuentas, setOpenModalCuentas] = useState(false);


    const handleSubmitCuentas = async (e) => {
        e.preventDefault();
<<<<<<< HEAD
        if(nombreBanco.trim() ==""  || fechaVencimiento.trim() == "" || monto.trim() == ""){
            alert("No puede dejar campos vacios")
        }else{
            if(isNaN(numeroCuenta) || isNaN(monto)){
                alert("los campos numero de cuenta y monto deben ser numeros")
            }else{
                const json_data = {
                    //id_user : idUsuario,
                    
                    name_bank_account : nombreBanco,
                    date_out: fechaVencimiento,
                    validation_digits: csv,
                    number_account: numeroCuenta,
                    mount: monto,
                    type_bank : tipoCuenta
                };
                try{
                    await auth.onAuthStateChanged((z)=>{if(z){
                        database.ref(`/${z.uid}/cuentas/`).push(json_data)
                        .then(setOpenModalCuentas(false))
                            }})
                       
                    }catch(e){
                       
                        alert(e)
                        }
            }
=======

        const json_data = {
            //id_user : idUsuario,
            name_bank_account: nombreBanco,
            date_out: fechaVencimiento,
            validation_digits: csv,
            number_account: numeroCuenta,
            mount: monto,
            type_bank: tipoCuenta
        };
        try {
            await auth.onAuthStateChanged((z) => {
                if (z) {
                    database.ref(`/${z.uid}/cuentas/`).push(json_data)
                        .then(setOpenModalCuentas(false))
                }
            })

        } catch (e) {

            alert(e)
>>>>>>> 9dff1dc82d0d1afcf219ec437f658b28ab39cd9a
        }
    };

    const handleSubmitPagos = async (e) => {
        e.preventDefault();
        if(nombrePago.trim()=="" || descripcionPago.trim()==""){
            alert("no se puede dejar campos vacios")
        }else{
            if(isNaN(montoPago)){
                alert("el valor del monto debe ser un numero ")
            }else{
                const json_data = {
                    //id_user : idUsuario,
                    nombrePago : nombrePago,
                    descripccion: descripcionPago,
                    monto: montoPago,
                    categoria: categoriaPago
                };
                try{
                    await auth.onAuthStateChanged((z)=>{if(z){
                        database.ref(`/${z.uid}/Pagos/`).push(json_data)
                        .then(setOpenModalPagos(false))
                            }})
                       
                    }catch(e){
                       
                        alert(e)
                        }

<<<<<<< HEAD
            }
=======
        const json_data = {
            //id_user : idUsuario,
            nombrePago: nombrePago,
            descripccion: descripcionPago,
            monto: montoPago,
            categoria: categoriaPago
        };
        try {
            await auth.onAuthStateChanged((z) => {
                if (z) {
                    database.ref(`/${z.uid}/Pagos/`).push(json_data)
                        .then(setOpenModalPagos(false))
                }
            })

        } catch (e) {

            alert(e)
>>>>>>> 9dff1dc82d0d1afcf219ec437f658b28ab39cd9a
        }
    };
    const handleChangeCsv = (csv) => {
        if (String(csv).trim().length > 3) {
            setCsvValido(true);
        } else {
            setCsvValido(false);
        }

        console.log(csv)
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
    }, []);


    return (
        <div className={classes.root}>
            <Menu title="Cuentas y Pagos">
                {/**Barra Lateral y Barra Horizontal */}
            </Menu>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="content">
                        <div className="row-perfil">

                            <div className="col-md-6 mt-3">
                                <Card >
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="https://4.bp.blogspot.com/-ii1IjrLMs1s/VregTG3508I/AAAAAAAAAJo/uWAqXPFoBLI/s1600/calculo-calculadora-cuentas.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Cuentas
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => setOpenModalCuentas(true)} size="small" variant="contained" color="primary">
                                            Agregar
                                        </Button>
                                        <Link to="/listado-cuentas" >
                                            <Button size="small" variant="contained" color="secondary">
                                                Mostrar
                                            </Button>
                                        </Link>

                                    </CardActions>
                                </Card>
                            </div>

                            <div className="col-md-6 mt-3">
                                <Card >
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image="https://blog.cobiscorp.com/hubfs/automatizacionpagos.png"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Pagos
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => setOpenModalPagos(true)} variant="contained" size="small" color="primary">
                                            Agregar
                                        </Button>
                                        <Link to="/listado-pagos" >
                                            <Button variant="contained" size="small" color="secondary">
                                                Mostrar
                                            </Button>
                                        </Link>

                                    </CardActions>
                                </Card>
                            </div>

                            {/* MODAL CUENTAS */}
                            <div>
                                <Dialog
                                    open={openModalCuentas}
                                    onClose={() => setOpenModalCuentas(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    style={{ width: '100%' }}
                                >
                                    <DialogTitle id="alert-dialog-title">Agregar cuenta</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <TextField
                                                select
                                                label="Seleccione"
                                                helperText="Seleccione una cuenta"
                                                style={{ width: 400 }}
                                                onChange={e => setTipoCuenta(e.target.value)}
                                            >
                                                <MenuItem key="0" value="NULL">Seleccione una cuenta</MenuItem>
                                                <MenuItem key="1" value="Debito">Debito</MenuItem>
                                                <MenuItem key="2" value="Ahorro">Ahorro</MenuItem>
                                                <MenuItem key="3" value="Credito">Credito</MenuItem>
                                            </TextField>
                                            <div>
                                                {
                                                    tipoCuenta == 'Debito' &&
                                                    <>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Nombre del banco"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                autoComplete="Ingrese el nombre del banco"
                                                                onChange={(e) => setNombreBanco(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                id="datetime-local"
                                                                type="date"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setFechaVencimiento(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="CSV"
                                                                error={(csv.trim().length > 3) ? true : false}
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setCsv(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Numero de cuenta"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setNumeroCuenta(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Monto"
                                                                type="number"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setMonto(e.target.value)}
                                                            />
                                                        </div>
                                                    </>
                                                }
                                                {
                                                    tipoCuenta == "Ahorro" &&
                                                    <>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Nombre del banco"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                autoComplete="Ingrese el nomre del banco"
                                                                onChange={(e) => setNombreBanco(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                type="date"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setFechaVencimiento(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <TextField
                                                                label="Numero de cuenta"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setNumeroCuenta(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Monto"
                                                                type="number"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setMonto(e.target.value)}
                                                            />
                                                        </div>

                                                    </>
                                                }
                                                {
                                                    tipoCuenta == "Credito" &&
                                                    <>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Nombre del banco"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                autoComplete="Ingrese el nomre del banco"
                                                                onChange={(e) => setNombreBanco(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                type="date"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setFechaVencimiento(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="CSV"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => handleChangeCsv(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Numero de cuenta"
                                                                type="text"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setNumeroCuenta(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <TextField
                                                                label="Monto"
                                                                type="number"
                                                                style={{ width: 400 }}
                                                                onChange={(e) => setMonto(e.target.value)}
                                                            />
                                                        </div>

                                                    </>
                                                }
                                            </div>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalCuentas(false)} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={handleSubmitCuentas} color="primary" autoFocus>
                                            Agregar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            {/* FIN MODAL CUENTAS */}
                            {/* MODAL PAGOS */}
                            <div>
                                <Dialog
                                    open={openModalPagos}
                                    onClose={() => setOpenModalPagos(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    style={{ width: '100%' }}
                                >
                                    <DialogTitle id="alert-dialog-title">Agregar pagos</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            <div>
                                                <div className="form-group">
                                                    <TextField
                                                        label="Nombre Pago"
                                                        type="text"
                                                        style={{ width: 400 }}
                                                        onChange={e => setNombrePago(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <TextField
                                                        label="Descripcion"
                                                        type="text"
                                                        style={{ width: 400 }}
                                                        onChange={e => setDescripcionPago(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <TextField
                                                        label="Monto"
                                                        type="number"
                                                        style={{ width: 400 }}
                                                        onChange={e => setMontoPago(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <TextField
                                                        select
                                                        label="Categoria"
                                                        helperText="Seleccione una cuenta"
                                                        style={{ width: 400 }}
                                                        onChange={e => setCategoriaPago(e.target.value)}
                                                    >
                                                        <MenuItem key="0" value="Nullo">Seleccionar cuenta</MenuItem>
                                                        <MenuItem key="1" value="Medicos">Medicos</MenuItem>
                                                        <MenuItem key="2" value="Servicios Publicos">Servicios Publicos</MenuItem>
                                                        <MenuItem key="3" value="Otros">Otros</MenuItem>

                                                    </TextField>
                                                </div>
                                            </div>
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenModalPagos(false)} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button onClick={handleSubmitPagos} color="primary" autoFocus>
                                            Agregar
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            {/* FIN MODAL PAGOS */}
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    )
}
export default Cuentas