//controlador dos usuários ---- Create Token
const jwt = require('jsonwebtoken')

//cria jsonwebtoken
function createToken(){
    /*const payload = { 
        id: id
    };*/
    return jwt.sign({}, 'senha-secreta'); //paylout{} e a senha-sereta
    //método acima retorna uma string
}

module.exports = { 
    login: (request, response) => {
        //chama o método 
        const token = createToken();
        //trás o token 
        response.set('Authorization', token) //autoriza o header para setar o token
        response.status(204).send();

    }
};