import express from 'express';
import { body, validationResult } from 'express-validator';
import {cpf} from 'cpf-cnpj-validator';
import db from '../Service/FuncionarioService.js';

const router = express.Router();

router.post('/', [
    body('name').isLength({min:3}).withMessage('Nome precisa conter no mínimo 3 caracteres!'),
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
        await db.insertFuncionario(req.body);
        res.status(201).send({message: 'Funcionario cadastrado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
    
});

router.put('/:id_funcionario', [
    body('name').isLength({min:3}).withMessage('Nome precisa conter no mínimo 3 caracteres!'),
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
    
    const id_funcionario = req.params;
    try {
        const funcionario = await db.validaFuncionario(id_funcionario);
        
        if(funcionario.length > 0) {
            return res.status(404).send({message: 'Usuario não encontrado.'});
        }
        
        db.updateFuncionario(req.body, id_funcionario);
        console.log(req.body);
        res.status(200).send({message: 'Funcionário atualizado com sucesso!'});
        
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});

router.delete('/:id_funcionario',  async ( req, res) => {
    const id_funcionario = req.params;
    try {
        const funcionario = await db.validaFuncionario(id_funcionario);
        
        if(funcionario.length > 1) {
            return res.status(404).send({message: 'Funcionário não encontrado.'});
        }
        await db.deleteFuncionario(req.params, id_funcionario);
        res.status(201).send({message: 'Funcionário deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});
export default router;