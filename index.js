const express = require('express');
const cors = require("cors");
const fs = require('fs')
const config = require('./config');
const app = express();
const firebase = require('./db');
const fireStore = firebase.firestore();
const Login = require('./models/login');
const Preguntas = require('./models/preguntas');
const Respuestas = require('./models/respuestas');

// parse application/x-www-form-urlencoded
// parse application/json
const { json } = require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session application
var session = require('express-session');
app.use(session({ secret: 'plataforma5', resave: true, saveUninitialized: true }));


// Motor de plantillas, definición de rutas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

// Levanta servidor
app.listen(config.port, () => {
    console.log('Servidor andando');
})
//Mostrar página de inicio
app.get('/', async (req, res) => {
    res.render("./login")
})
//Mostrar página de error
app.get('/errorPagina', async (req, res) => {
    res.render("./errorPagina")
})
//Mostrar página principal
app.get('/paginaPrincipal', async (req, res) => {
    res.render("./paginaPrincipal")
})
//Mostrar página principal2
app.get('/paginaPrincipal2', async (req, res) => {
    res.render("./paginaPrincipal2")
})
//Mostrar página principal3
app.get('/paginaPrincipal3', async (req, res) => {
    res.render("./paginaPrincipal3")
})
//Mostrar página principal4
app.get('/paginaPrincipal4', async (req, res) => {
    res.render("./paginaPrincipal4")
})
//Mostrar Página de pregunta
app.get('/paginaPregunta', async (req, res) => {
    res.render("./paginaPregunta")
})
//Mostrar Página de pregunta Usuario
app.get('/paginaPreguntaUsuario', async (req, res) => {
    res.render("./paginaPreguntaUsuario")
})
//Mostrar la página de registro
app.get('/registro', async (req, res) => {
    console.log("*** entramos al registro ***");
    res.render("registro")
})
//Mostrar Pagina del juego
app.get('/Trivias', async (req, res) => {
    res.render("./Trivias")
})
//Acción de trivia
app.post('/Trivias', async (req, res) => {

    const respuestaBuena = req.body;

    const incorrecta1 = req.body.incorrecta1;
    const incorrecta2 = req.body.incorrecta2;
    var logueo = await fireStore.collection("preguntas");

    var data = await logueo.get();

    const arreglo = [];
    //const arregloPreguntas = [];
    if (data.empty) {
        res.status(200).json({ message: "No se encontró nada" });
    } else {


        await data.forEach((item) => {

            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );


            arreglo.push(resultado1);
        });
    };

    arreglo.sort((a, b) => Math.random() - 0.5)

    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado3 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado4 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado5 = await arreglo[Math.floor(Math.random() * arreglo.length)]

    res.render('Trivias', {
        pregunta: resultado2.agregarPregunta,
        respuestaCorrecta: resultado2.respuestaCorrecta,
        RespuestaIncorrecta1: resultado2.respuestaFalsa1,
        RespuestaIncorrecta2: resultado2.respuestaFalsa2,
        pregunta2: resultado3.agregarPregunta,
        respuestaCorrecta2: resultado3.respuestaCorrecta,
        RespuestaIncorrecta22: resultado3.respuestaFalsa1,
        RespuestaIncorrecta22: resultado3.respuestaFalsa2,
        pregunta3: resultado4.agregarPregunta,
        respuestaCorrecta3: resultado4.respuestaCorrecta,
        RespuestaIncorrecta33: resultado4.respuestaFalsa1,
        RespuestaIncorrecta33: resultado4.respuestaFalsa2,
        pregunta4: resultado5.agregarPregunta,
        respuestaCorrecta4: resultado5.respuestaCorrecta,
        RespuestaIncorrecta44: resultado5.respuestaFalsa1,
        RespuestaIncorrecta44: resultado5.respuestaFalsa2,

    })
})
//Mostrar Pagina del juego Para Usuarios
app.get('/TriviasUsuarios', async (req, res) => {
    res.render("./TriviasUsuarios")
})
//Acción de trivia Usuarios
app.post('/TriviasUsuarios', async (req, res) => {

    const respuestaBuena = req.body;

    const incorrecta1 = req.body.incorrecta1;
    const incorrecta2 = req.body.incorrecta2;
    var logueo = await fireStore.collection("preguntas");

    var data = await logueo.get();

    const arreglo = [];
    //const arregloPreguntas = [];
    if (data.empty) {
        res.status(200).json({ message: "No se encontró nada" });
    } else {


        await data.forEach((item) => {

            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );


            arreglo.push(resultado1);
        });
    };

    arreglo.sort((a, b) => Math.random() - 0.5)

    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado3 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado4 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const resultado5 = await arreglo[Math.floor(Math.random() * arreglo.length)]

    res.render('TriviasUsuarios', {
        pregunta: resultado2.agregarPregunta,
        respuestaCorrecta: resultado2.respuestaCorrecta,
        RespuestaIncorrecta1: resultado2.respuestaFalsa1,
        RespuestaIncorrecta2: resultado2.respuestaFalsa2,
        pregunta2: resultado3.agregarPregunta,
        respuestaCorrecta2: resultado3.respuestaCorrecta,
        RespuestaIncorrecta22: resultado3.respuestaFalsa1,
        RespuestaIncorrecta22: resultado3.respuestaFalsa2,
        pregunta3: resultado4.agregarPregunta,
        respuestaCorrecta3: resultado4.respuestaCorrecta,
        RespuestaIncorrecta33: resultado4.respuestaFalsa1,
        RespuestaIncorrecta33: resultado4.respuestaFalsa2,
        pregunta4: resultado5.agregarPregunta,
        respuestaCorrecta4: resultado5.respuestaCorrecta,
        RespuestaIncorrecta44: resultado5.respuestaFalsa1,
        RespuestaIncorrecta44: resultado5.respuestaFalsa2,

    })
})
//Accion Validar Trivia
app.post("/validar", async (req, res) => {
    const respuestaBuena = req.body;
    try {
        await fireStore.collection("respuestasCorrectas").doc().set(respuestaBuena);
        const logueo = await fireStore.collection("respuestasCorrectas");
        const data = await logueo.get();
        const arreglo2 = []
        if (data.empty) {
            response.status(200).json({ message: "No se encontró nada" });
        } else {
            let total = 0;
            data.forEach((item) => {
                const login = new Respuestas(
                    item.id,
                    item.data().rp1,
                    item.data().rp2,
                    item.data().rp3,
                );
                arreglo2.push(login)
            });
        };
        console.log("-------------------------------")
        res.render("finalTest", { respuesta1: respuestaBuena.rp1, respuesta2: respuestaBuena.rp2, respuesta3: respuestaBuena.rp3 })
    } catch (error) {
        console.log(error)
    }
})
//Logeo de usuario
app.post('/logueando', async (req, res) => {
    console.log("Entre a logueo");
    const logueo = await fireStore.collection("userLogin");
    const data = await logueo.get(); {
        if (data.empty) {
            res.status(200).json({ message: "No se encontró nada" });
        } else {
            await data.forEach((item) => {
                new Login(
                    item.data().user,
                    item.data().password,
                    item.data().es_admin
                );
                let ingresarNombre = req.body.ingresarNombre;
                let ingresarPassword = req.body.ingresarPassword;
                try {
                    if (item.data().user == ingresarNombre && item.data().password == ingresarPassword && item.data().es_admin == '0') {
                        res.render("paginaPrincipal", { mensaje: 'Usuario: ' + item.data().user })
                    }
                    if (item.data().user == ingresarNombre && item.data().password == ingresarPassword && item.data().es_admin == '1') {
                        res.render("paginaPrincipal3", { mensaje: 'Usuario: ' + item.data().user })
                    }
                    if ((ingresarNombre = '') || (ingresarPassword = '')) {
                        //res.render('errorPagina', {mensaje: 'Usuario o Password incorrecto. Intente nuevamente'})
                        res.status(404).json({ Mensaje: 'Usuario o Password incorrecto' })
                    }
                }
                catch (error) {
                    res.status(404).json({ mensaje: error.message })
                }
            });
        };
    }
})
//Registro del Usuario
app.post('/registro', async (req, res) => {
    console.log("Entre al registro");
    const datos = req.body;
    //console.log(registroNombre + registroPassword)
    try {
        await fireStore.collection("userLogin").doc().set(datos);
        res.render("exito", { mensaje: 'Usuario ha sido ingresado correctamente' })
        //res.status(200).json({message: 'registro exitoso'})
    } catch (error) {
        res.status(400).json({ message: error.mesagge });
    }
})
//Agregar preguntas en el form
app.post('/enviarPreguntas', async (req, res) => {
    const datos = req.body;
    try {
        if (datos = "") {
            res.render("errorPagina", { mensaje: 'Pregunta no ingresada. Intente nuevamente ' + error.mesagge })
        } else {
            await fireStore.collection("preguntas").doc().set(datos);
            res.render("exito", { mensaje: 'La pregunta ha sido registrada exitosamente' })
            //res.status(200).json({ mensaje: 'La pregunta ha sido registrada exitosamente' });
        }
    } catch (error) {
        // res.status(400).json({ message: error.mesagge });
        res.render("errorPagina", { mensaje: 'Pregunta no ingresada. Intente nuevamente ' + error.mesagge })
    }
})
//Acción del juego de preguntas
app.post('/preguntas', async (req, res) => {
    const correcta = req.body.correcta;
    const logueo = await fireStore.collection("preguntas");
    const data = await logueo.get();
    const arreglo = [];

    if (data.empty) {
        res.render("errorPagina", { mensaje: 'Pregunta no ingresada. Intente nuevamente' })
        //res.status(200).json({ message: "No se encontró nada" });
    } else {
        await data.forEach((item) => {
            const resultado1 = new Preguntas(
                item.data().agregarPregunta,
                item.data().respuestaCorrecta,
                item.data().respuestaFalsa1,
                item.data().respuestaFalsa2
            );
            arreglo.push(resultado1);
        });
    };
    arreglo.sort((a, b) => Math.random() - 0.5)
    const resultado2 = await arreglo[Math.floor(Math.random() * arreglo.length)]
    const objeto = {
        pregunta: resultado2.agregarPregunta,
        pregunta2: resultado2.respuestaCorrecta,
        pregunta3: resultado2.respuestaFalsa1,
        pregunta4: resultado2.respuestaFalsa2
    }
    res.render('paginaPrincipal', {
        pregunta: resultado2.agregarPregunta,
        pregunta2: resultado2.respuestaCorrecta,
        pregunta3: resultado2.respuestaFalsa1,
        pregunta4: resultado2.respuestaFalsa2
    })
    console.log("firebase " + resultado2.respuestaCorrecta + "usuario " + correcta)
})
//Mostrar puntaje
app.post("/puntajes", (req, res) => {
    const correcta = req.body.correcta;
    res.render("Puntajes",)
})