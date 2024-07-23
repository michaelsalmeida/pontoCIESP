const validacaoCadastro = (req, res, next) => {

    const { username, email, senha, confSenha } = req.body;
    
    if (username == '' || email == '' || senha == '') {
        res.status(400).json({ status : 'error', msg : 'Campos não podem estar vazios'});
    } else if (!email.includes('@')) {
        res.status(400).json({ status : 'error', msg : 'Forneça um email válido'});
    } else if (senha.length < 8) {
        res.status(400).json({ status : 'error', msg : 'Senha não atende os requisitos'});
    } else if (senha != confSenha) {
        res.status(400).json({ status : 'error', msg : 'Senhas enviadas não coincidem'});
    } else {
        next();
    }
}

export const validar = {
    validacaoCadastro,
};