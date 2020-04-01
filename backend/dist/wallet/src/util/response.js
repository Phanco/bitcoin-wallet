"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseOK = (res, data, message = '') => {
    return res.send({
        status: 'success',
        data,
        message
    });
};
exports.responseError = (res, code = 400, message = '') => {
    return res.send({
        status: 'error',
        code,
        message
    });
};
//# sourceMappingURL=response.js.map