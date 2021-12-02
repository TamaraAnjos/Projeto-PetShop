import express from 'express';
import cliente from './Controller/ClienteController.js';
import funcionario from './Controller/FuncionarioController.js';
import compra from './Controller/CompraController.js';
import login from './Controller/LoginController.js';
import animal from './Controller/AnimalController.js';
import servico from './Controller/ServicoController.js';
import servicoanimal from './Controller/ServicoAnimalController.js';
import servicofun from './Controller/ServicoFunController.js';
import registro from './Controller/registroController.js';
import {verifyJWT} from './middlewares/jwt.js';
const router = express.Router();

router.use('/cliente', verifyJWT, cliente);
router.use('/compra', compra);
router.use('/funcionario', funcionario);
router.use('/login', login);
router.use('/animal', animal);
router.use('/servico', servico);
router.use('/servicoanimal', servicoanimal);
router.use('/servicofuncionario', servicofun);
router.use('/registro', registro);
router.use('/*', (req, res)=>{

    res.status(404).send({message: 'Caminho não encontrado'});
});
export default router;