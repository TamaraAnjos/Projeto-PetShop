import express from 'express';
import {body, validationResult} from 'express-validator';
import { cpf } from 'cpf-cnpj-validator';
import db from '../Service/CompraService.js';

const router = express.Router();

router.post('/', [
    body('valor').isDecimal().withMessage('Precisa ser uma valor em Decimal!'),
    body('date').isDate().withMessage('Precisa ser colocado a data da compra!'),
    body('name').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('nascimento').isDate().withMessage('Precisa ser uma data de aniverásio válida, como exemplo, "2020/05/25"!'),
    body('sexo').isLength({min:1}).withMessage('Sexo precisa conter 1 caractere!'),
    body('telefone').isLength({min: 11, max: 11}).withMessage('O número de telefone precisa conter no mínimo 11 dígitos, contando com DDD!'),
    body('email').isEmail().withMessage('Entre com um email válido!'),
    body('nome_f').isLength({min: 3}).withMessage('O nome do funcionário precisa conter ao menos 3 caracteres!'),

    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);
        if(!checkCPF) return Promise.reject('CPF do cliente inválido');
        return true;
    }),
    body('cpf_f').custom((cpffInput) => {
        const checkCPFf = cpf.isValid(cpffInput);
        if(!checkCPFf) return Promise.reject('CPF do funcionário inválido');
        return true;
    }),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try {
        await db.insertCompra(req.body);
        res.status(200).send({message: 'Compra cadastrada com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
})

router.put('/:id_compra/:id_cliente/:id_funcionario', [
    body('name').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('nascimento').isDate().withMessage('Precisa ser uma data de aniverásio válida, como exemplo, "2020/05/25"!'),
    body('sexo').isLength({min:1}).withMessage('Sexo precisa conter 1 caractere!'),
    body('telefone').isLength({min: 11, max: 11}).withMessage('O número de telefone precisa conter no mínimo 11 dígitos, contando com DDD!'),
    body('email').isEmail().withMessage('Entre com um email válido!'),
    body('nome_f').isLength({min: 3}).withMessage('O nome do funcionário precisa conter ao menos 3 caracteres!'),

    body('cpf').custom((cpfInput) => {
        const checkCPF = cpf.isValid(cpfInput);
        if(!checkCPF) return Promise.reject('CPF do cliente inválido');
        return true;
    }),
    body('cpf_f').custom((cpffInput) => {
        const checkCPFf = cpf.isValid(cpffInput);
        if(!checkCPFf) return Promise.reject('CPF do funcionário inválido');
        return true;
    }),
    body('valor').isDecimal().withMessage('Precisa ser uma valor em Decimal!'),
    body('date').isDate().withMessage('Precisa ser colocado a data da compra!'),
], async (req, res)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).send({erros: erros.array()});
    }
    const id_compra = req.params;
    try{
        const compra = await db.validaCompra(id_compra);
        if(compra.length > 0){
            return res.status(404).send({message: 'Servico não encontrado.'});
        }
        db.updateCompra(req.body, id_compra);
        res.status(200).send({message: 'Compra atualizada com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
});

router.delete('/:id_compra/:id_cliente/:id_funcionario',  async ( req, res) => {
    const id_compra = req.params;
    try {
        const compraS = await db.validaCompra(id_compra);
        
        if(compraS.length > 0) {
            return res.status(404).send({message: 'Compra deletada não encontrado.'});
        }
        await db.deleteCompraS(req.params, id_compra);
        res.status(201).send({message: 'Compra deletada com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;
