//modelo de autenticação
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const accountsCollection = require('./accountSchema')
const {InvalidArgumentError} = require('../models/errors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function verificaSenha(senha, senhaHash){
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('Senha inválida!');
    }
}


passport.use(
     new LocalStrategy({
         usernameField: 'email',
         passwordField: 'senha',
         session: false //obrigatório
     }, (email, senha, done) => { 
         //DESAFIO PARA QUARTA-FEIRA
         accountsCollection.findOne({'email': email}, async function (err, user){
            try {
                if(!user) {
                    throw new InvalidArgumentError('Usuario inválido!');
                }
                await verificaSenha(senha, user.senha, done);
                console.log(user);
                done(null, user);
            }catch(error){
                done(error);
            }
         });          
     })
)

passport.use(
    new BearerStrategy((token, done) =>{
       //validar o token 
       try { //fluxo FELIZ
           const payload = jwt.verify(token, process.env.SECRET)
           const usuario = accountsCollection.findById(payload.id, (error, account) =>{
              if (error) {
                  return error
              }
                  return error 
           })
           //console.log(payload); //verifica o payload retornado
           //const usuario = {} //buscar no banco de dados
           done(null, usuario, {token: token});
       } catch (error) { //fluxo com ERRO
          done(error);
       }       

    }
    )
)