import { Request, Response, NextFunction } from "express"


const auth = (req: Request, res: Response, next:NextFunction) => {
  const { token } = req.headers;

  if (token === 'Autenticado') next();
  else res.status(400).send('No puede seguir');
  
};

export default auth;