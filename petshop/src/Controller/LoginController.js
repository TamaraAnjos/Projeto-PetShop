import express from 'express';
import {body, validationResult} from 'express-validator';
import db from  '../Service/LoginService.js';
import { generatedPassword, generatedToken, sendEmail } from '../Helpers/userFutures.js';

const router = express.Router();

router.post('/', async(req, res) => {
    const {userEmail, password} = req.body;

    try{
        //const token = generatedToken(userFind[0].id_login, userFind[0].usuario);
        const userFind = await db.login(userEmail, password);
        if(userFind.length > 0){

            const {id_login, usuario} = userFind[0];

            const token = generatedToken(id_login, usuario);
            res.status(200).send({message: 'Login Efetuado com Sucesso', token});
        }else{
            res.status(401).send({message:'Login Incorreto'});
        }
    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }
});

router.post('/reset', async (req, res) => {
    const {userEmail} = req.body;
    const newPassword = generatedPassword();

    try{
    await db.changePassword(newPassword, userEmail);
    sendEmail(userEmail, 'Draco Malfoy', newPassword);
    res.status(200).send({message: 'Senha alterada com sucesso, enviada no seu email'});
    }catch(err) {
        res.status(500).send({message: 'Internal Server Error'});
    }
});

export default router;