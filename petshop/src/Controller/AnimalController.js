import express from 'express';
import {body, validationResult} from 'express-validator';
import {cpf} from 'cpf-cnpj-validator';
import db from '../Service/AnimalService.js';

const router = express.Router();

router.post('/', [
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
    body('nome_animal').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('especie').isLength({min: 3}).withMessage('O nome da espécie precisa conter ao menos 3 caracteres!'),
    body('sexo_a').isLength({max: 8}).withMessage('O sexo precisa conter no máximo 8 caracteres!'),
    body('nascimento_a').isDate().withMessage('Precisa ser uma data válida, como exemplo, "2020/05/25"!'),
    body('peso').isInt().withMessage('Peso está em branco!'),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try {
        await db.insertAnimal(req.body);
        res.status(200).send({message: 'Animal cadastrado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});


router.put('/:id_cliente/:id_animal', [
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
    body('nome_animal').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('especie').isLength({min: 3}).withMessage('O nome do cliente precisa conter ao menos 3 caracteres!'),
    body('sexo_a').isLength({max: 8}).withMessage('O sexo precisa conter no máximo 8 caracteres!'),
    body('nascimento_a').isDate().withMessage('Precisa ser uma data válida, como exemplo, "2020/05/25"!'),
    body('peso').isInt().withMessage('Peso está em branco!'),
], async (req, res)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).send({erros: erros.array()});
    }
    const id_animal = req.params;
    try{
        const animal = await db.validaAnimal(id_animal);
        if(animal.length > 0){
            console.log('teste', res);
            return res.status(404).send({message: 'Animal não encontrado'});
        }
        
        db.updateAnimal(req.body, id_animal);
        console.log(req.body);
        res.status(200).send({message: 'Animal atualizado com sucesso!'});

    }catch(err){
        res.status(500).send({message: 'Internal Server Error!'});
    }
});

router.delete('/:id_cliente/:id_animal',  async ( req, res) => {
    const id_animal = req.params;
    try {
        const animal = await db.validaAnimal(id_animal);
        
        if(animal.length > 0) {
            return res.status(404).send({message: 'Animal não encontrado.'});
        }
        await db.deleteAnimal(req.params, id_animal);
        console.log(req.params);
        res.status(201).send({message: 'Animal deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;