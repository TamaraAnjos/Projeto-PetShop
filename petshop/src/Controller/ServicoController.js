import express from 'express';
import { body, validationResult } from 'express-validator';
import db from '../Service/ServicoService.js';

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
        await db.insertServico(req.body);
        res.status(201).send({message: 'Serviço cadastrado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
    
});

router.put('/:id_servico', [
    body('descricao').isLength({max:45}).withMessage('A descrição é no máximo 45 caracteres!'),
    body('valor_servico').isDecimal().withMessage('O valor é em decimal!'),
    body('tempo_servico').isLength().withMessage('Valor da hora de serviço em branco!'),
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    const id_servico = req.params;
    try {
        const servico = await db.validaServico(id_servico);
        if(servico.length > 0) {
            return res.status(404).send({message: 'Servico não encontrado.'});
        }
        db.updateServico(req.body, id_servico);
        console.log(req.body);
        res.status(200).send({message: 'Servico atualizado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});

router.delete('/:id_servico',  async ( req, res) => {
    const id_servico = req.params;
    try {
        const servico = await db.validaServico(id_servico);
        
        if(servico.length > 1) {
            return res.status(404).send({message: 'Serviço não encontrado.'});
        }
        await db.deleteServico(req.params, id_servico);
        res.status(201).send({message: 'Serviço deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});
export default router;