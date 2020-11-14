//modelo de autenticação
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const jwt = require('jsonwebtoken')


passport.use(
     new LocalStrategy({
         usernameField: 'email',
         passwordField: 'senha',
         session: false //obrigatório
     }, (email, senha, done) => { 
         //DESAFIO PARA QUARTA-FEIRA
         if (email.usernameField === 'faustao@olocobixo' && senha.passwordField === '123') {
             const id = '5fb00b9dcd18ea467032df49';
             const token = jwt.sign({id}, process.env.SECRET,{
                 expiresIn: 300
             });
             return response.json({auth: true, token: token})             
         }
            response.status(500).json({
                message: 'Login Invalid!'
            })
         //autenticar usuario - pesquisar
         //buscar o user no db com find() | colocar numa constante
         //se o user n existir, ou estiver vazio, retorne erro "user inexistente"
         //se o user existe, compara a senha enviada na requisicao com a senha do objeto usuario(user.)
         //se  a senha for igual, done(null, user)
         //se a senha for diferente - mensagem: 'usuario/senha errado'
         done(null, {})
     })
)

passport.use(
    new BearerStrategy((token, done) =>{
       //validar o token
       try { //fluxo FELIZ
           const payload = jwt.verify(token, 'senha-secreta')
           console.log(payload); //verifica o payload retornado
           const usuario = {} //buscar no banco de dados
           done(null, usuario, {token: token});
       } catch (error) { //fluxo com ERRO
          done(error);
       }       

    })
)

/**Crypto e bcrypt */

//git commit --amment
//git pull stream //pega as alterações do pull
