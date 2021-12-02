import express from 'express';
import { body, validationResult } from 'express-validator';
import { cpf } from 'cpf-cnpj-validator';
import db from '../Service/ServicoFunService.js';

const router = express.Router();

router.post('/', [
    body('descricao').isLength({max:45}).withMessage('A descrição é no máximo 45 caracteres!'),
    body('valor_servico').isDecimal().withMessage('O valor é em decimal!'),
    body('tempo_servico').isLength().withMessage('Valor da hora de serviço em branco!'),
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
        await db.insertServicoFun(req.body);
        res.status(201).send({message: 'Serviço do Funcionário cadastrado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
    
});

router.put('/:id_servico/:id_funcionario/:FK_ID_Servico', [
    body('descricao').isLength({max:45}).withMessage('A descrição é no máximo 45 caracteres!'),
    body('valor_servico').isDecimal().withMessage('O valor é em decimal!'),
    body('tempo_servico').isLength().withMessage('Valor da hora de serviço em branco!'),
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
    const FK_ID_Servico = req.params;
    try {
        const servico = await db.validaServicoFun(FK_ID_Servico);
        if(servico.length > 0) {
            return res.status(404).send({message: 'Serviço do Funcionário não encontrado.'});
        }
        db.updateServicoFun(req.body, FK_ID_Servico);
        console.log(req.body);
        res.status(200).send({message: 'Serviço do Funcionário atualizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});
router.delete('/:id_servico/:id_funcionario/:FK_ID_Servico',  async ( req, res) => {
    const FK_ID_Servico = req.params;
    try {
        const servicoF = await db.validaServicoFun(FK_ID_Servico);
        
        if(servicoF.length > 0) {
            return res.status(404).send({message: 'Serviço do Funcionário não encontrado.'});
        }
        await db.deleteServicoFun(req.params, FK_ID_Servico);
        res.status(201).send({message: 'Serviço do Funcionário deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});
export default router;