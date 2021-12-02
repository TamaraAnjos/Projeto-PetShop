import  jwt  from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {config} from './smtp.js';

const transport = nodemailer.createTransport(config);

function generatedPassword(){
    const key = (Math.random() +1).toString(36).substring(2);
    const newPassword = key
    .replace('n', '@')
    .replace('w', '#')
    .replace('t', '$')
    .replace('a', '*')

    return newPassword;
}

function generatedToken(id_login, usuario){
    const secret = 'HarryPotter@';
    return jwt.sign({infouser:{
        id_login,
        usuario
    }}, secret, {expiresIn: 60 * 60 * 5});
}

function sendEmail(email, name, password){
    transport.sendMail({
        subject: 'Teste de envio de Email',
        from: 'Suporte PetShop <testeetec14@gmail.com>',
        to: email,
        html: `
            <html>
                <body>
                    <p> Olá, ${name}! Tudo ok? </p>
                    <p> Estamos vendo aqui que você solicitou uma nova senha, </p>
                    <p> então estamos enviando uma nova! </p>
                    <p> Sua nova senha de acesso é: <strong>${password}</strong></p>
                    <a href="https://www.google.com.br">Clique aqui para alterar. </a>
                    <p> Lembre-se que esta senha é temporada e que você deve trocar </p
                    <p> para uma senha mais segura e de sua confiança, esperamos vê-lo</p>
                    <p> no nosso site PetShop. </p>
                </body>
            </html>
        `
    });
}

export {generatedPassword, generatedToken, sendEmail};