var jwt = require("jsonwebtoken");

module.exports = {
  verifyUser(req, res, next) {
    if(req.headers.authorization !== null){
      var token = req.headers.authorization.split(' ')[1];
      if (!token)
        return res.status(401).json({
          auth: false,
          message: "Você precisa de um token válido para acessar esse endpoint.",
        });

      jwt.verify(token, process.env.SECRET_CLIENT, function (err, decoded) {
        if (err)
          return res
            .status(500)
            .json({
              auth: false,
              message: "Ocorreu uma falha na autenticação do token.",
            });
            
        // se tudo estiver ok, salva no request para uso posterior
        req._id = decoded._id;
        req.Email = decoded.Email;
        req.Name = decoded.Name;
        req.Claims = decoded.Claims;

        next();
      });
      
    }else{
      return res
          .status(500)
          .json({
            auth: false,
            message: "Você precisa informar um token para realizar essa requisição!.",
          });
    }
  },
};
