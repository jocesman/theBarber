import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;
    if (token === "secret-token") next();
    else res.status(400).json({ message: "Token invalido" });
};

export default auth;