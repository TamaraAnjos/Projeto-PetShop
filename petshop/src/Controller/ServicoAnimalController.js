import express from 'express';
import { body, validationResult } from 'express-validator';
import {cpf} from 'cpf-cnpj-validator';
import db from '../Service/ServicoAnimalService.js';

const router = express.Router();

router.post('/', [
    body('descricao').isLength({max:45}).withMessage('A descrição é no máximo 45 caracteres!'),
    body('valor_servico').isDecimal().withMessage('O valor é em decimal!'),
    body('tempo_servico').isLength().withMessage('Valor da hora de serviço em branco!'),
], async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    try{
        await db.insertServicoA(req.body);
        res.status(201).send({message: 'Serviço Animal cadastrado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
    
});

router.put('/:id_cliente/:id_animal/:id_servico/:FK_ID_Animal', [
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
    body('nome_animal').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('especie').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('sexo_a').isLength({max: 8}).withMessage('O sexo precisa conter no máximo 8 caracteres!'),
    body('nascimento_a').isDate().withMessage('Precisa ser uma data válida, como exemplo, "2020/05/25"!'),
    body('peso').isInt().withMessage('Peso está em branco!'),
    body('descricao').isLength({max:45}).withMessage('A descrição é no máximo 45 caracteres!'),
    body('valor_servico').isDecimal().withMessage('O valor é em decimal!'),
    body('tempo_servico').isLength().withMessage('Valor da hora de serviço em branco!'),
    body('data_servico').isDate().withMessage('Data de serviço do serviço animal inválida!'),

], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    const FK_ID_Animal = req.params;
    try {
        const servicoA = await db.validaServicoA(FK_ID_Animal);
        if(servicoA.length > 0) {
            return res.status(404).send({message: 'Serviço Animal não encontrado.'});
        }
        db.updateServicoA(req.body, FK_ID_Animal);
        console.log(req.body);
        res.status(200).send({message: 'Serviço Animal atualizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});

router.delete('/:id_cliente/:id_animal/:id_servico/:FK_ID_Animal',  async ( req, res) => {
    const FK_ID_Animal = req.params;
    try {
        const servicoA = await db.validaServicoA(FK_ID_Animal);
        
        if(servicoA.length > 0) {
            return res.status(404).send({message: 'Serviço Animal não encontrado.'});
        }
        await db.deleteServicoA(req.params, FK_ID_Animal);
        res.status(201).send({message: 'Serviço Animal deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;