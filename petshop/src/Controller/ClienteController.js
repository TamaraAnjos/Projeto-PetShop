import express from 'express';
import { body, validationResult } from 'express-validator';
import {cpf} from 'cpf-cnpj-validator';
import db from '../Service/ClienteService.js';

const router = express.Router();

router.post('/', [
    body('name').isLength({min:3}).withMessage('Nome precisa conter no mínimo 3 caracteres!'),
    body('nascimento').isDate().withMessage('Data de nascimento precisa ser uma data!'),
    body('sexo').isLength({min:1}).withMessage('Sexo precisa conter no mínimo 1 caracter!'),
    body('telefone').isNumeric().withMessage('Telefone precisa conter números!'),
    body('email').isEmail().withMessage('Entre com um Email válido!'),
    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);
        if(!checkCPF) return Promise.reject('CPF informado inválido');
        return true;
    }),

], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    try{
        await db.insertCliente(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
    
});


router.put('/:id_cliente', [
    body('name').isLength({min:3}).withMessage('Nome precisa conter no mínimo 3 caracteres!'),
    body('cpf').isLength({min: 11, max: 11}).withMessage('O número de cpf precisa conter 11 dígitos.'),
    body('nascimento').isDate().withMessage('Data de nascimento precisa ser uma data!'),
    body('sexo').isLength({min:1}).withMessage('Sexo precisa conter no mínimo 1 caracter!'),
    body('telefone').isNumeric().withMessage('Telefone precisa conter números!'),
    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);
        if(!checkCPF) return Promise.reject('CPF informado inválido');
        return true;
    }),
], async (req, res) => {

    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id_cliente = req.params;
    try {
        const user = await db.validaCliente(id_cliente);
        
        if(user.length > 0) {
            return res.status(404).send({message: 'Usuario não encontrado.'});
        }
        
        db.updateCliente(req.body, id_cliente);
        console.log(req.body);
        res.status(200).send({message: 'Cliente atualizado com sucesso!'});

     }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});

router.delete('/:id_cliente',  async ( req, res) => {
    const id_cliente = req.params;
    try {
        const user = await db.validaCliente(id_cliente);
        
        if(user.length > 0) {
            return res.status(404).send({message: 'Usuario não encontrado.'});
        }
        await db.deleteCliente(req.params, id_cliente);
        console.log(req.params);
        res.status(201).send({message: 'Cliente deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;