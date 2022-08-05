

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const firebase = require('../db');
const fireStore = firebase.firestore();
const Login = require('../models/login');
const app = express();








const {
    getAllEmployees,
    getEmployee,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    mostrarFormEmployee,
    formEditarEmployee
} = require('../controllers/employeeController');
const Employee = require('../models/login');
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())




// Código para ver todos los empleados. Manda al controller
router.get('/login', getAllEmployees);

// Código para ver un empleado. Manda al controller
//router.get('/employee/:id', getEmployee);

// Código para llegar al formulario de crear empleado. Manda al controller


// Código para agregar empleado. Manda al controller
router.post('/addemployee', addEmployee);

// Código para eliminar empleado. Manda al controller
router.get('/deleteemployee/:id', deleteEmployee);


router.post('/updateEmployee', updateEmployee)
// Código para llegar al formulario de editar empleado. Manda al controller


router.get('/formEditarEmployee/:id', formEditarEmployee)

// Código para actualizar un empleado. Manda al controller
//router.post('/employee/:id', updateEmployee);

module.exports = {
    routes: router
};

