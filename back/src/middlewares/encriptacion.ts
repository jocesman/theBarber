import crypto from "crypto";

export const encriptar = (password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

export const desencriptar = (password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};