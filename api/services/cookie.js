import { jogaErro } from "./tratamentos.js";

export function cookie(cookies) {
    if (cookies == undefined) {
        jogaErro("Cookie de autorização não encontrado")
    }

    // Procura o cookie usuario e retorna ele para a variavel token
    const token =  cookies.split(';').filter((cookie) => {
        if (cookie.includes('usuario')) {
            return cookie
        }
    })
    
    // verifica se o cookie foi encontrado
    if (token[0] == undefined) {
        jogaErro("Cookie de autorização não encontrado")
    }

    // retorna o token sem o nome "usuario="
    return token[0].replace('usuario=', '').replace(' ', '')
}