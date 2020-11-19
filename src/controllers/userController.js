//controlador dos usuários ---- Create Token
const jwt = require('jsonwebtoken')

//cria jsonwebtoken
function createToken(){
    const payload = { 
        id: user.id
    };
    //DESAFIO .env
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '20m'}); //paylout{} e a senha-sereta
    //método acima retorna uma string
}

module.exports = { 
    login: (request, response) => {
        //chama o método 
        const token = createToken(request.user);
        
        
        //trás o token 
        response.set('Authorization', token) //autoriza o header para setar o token
        response.status(204).send();

    }
};