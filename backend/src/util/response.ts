import { Response } from "express";

export const responseOK = (res: Response, data: any, message = "") => {
    return res.send({
        status: "success",
        data,
        message
    });
};

export const responseError = (res: Response, code = 400, message = "") => {
    return res
        .status(code)
        .send({
            status: "error",
            message
        });
};
