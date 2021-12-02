import express from 'express';
import db from '../service/registroService.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Informe um e-mail válido'),
    body('password').isLength({min: 8, max: 15}).withMessage('Informe uma senha com no mínimo 8 caracteres e no máximo 15 caracteres'),
    body('password').isNumeric().withMessage('A senha deve ser numérica'),
    body('userName').custom((userName) => {
        return true;
    }),
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    //Para cadastrar informe: Email, Senha e Nome
    const {email, password, userName} = req.body;

    try{
        
        const emailUserBD = await db.checkEmail(email);

        if(emailUserBD.length > 0) {
            return res.status(400).send({message: 'Email já cadastrado no sistema'});
        }
        
        await db.insertUser(email, password, `usuario.${userName}`);
        res.status(201).send({message: 'Usuário cadastrado com sucesso'});
    }catch(err) {
        res.status(500).send({message: `Houve um erro ao cadastrar. ${err}`})
    }
    
});

router.put('/:id_login', [
    body('email').isEmail().withMessage('Digite um email válido'),
    body('userName').isLength({min: 1}).withMessage('Nome do usuário está vazio.'),
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id_login = req.params;
    try {
        const user = await db.validaUser(id_login);
        
        if(user.length > 0) {
            return res.status(404).send({message: 'Usuario não encontrado.'});
        }
        
        db.updateUser(req.body, id_login);
        console.log(req.body);
        res.status(200).send({message: 'Usuário atualizado com sucesso!'});

     }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
     }
});

router.delete('/:id_login',  async ( req, res) => {
    const id_login = req.params;
    try {
        const user = await db.validaUser(id_login);
        
        if(user.length > 1) {
            return res.status(404).send({message: 'Usuario não encontrado.'});
        }
        await db.deleteUser(req.params, id_login);
        console.log(req.params);
        res.status(201).send({message: 'Usuário deletado com sucesso!'});
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;