class ErrorResponse extends Error {
    constructor(message, statusCode, errArray = [], hint) {
        super(message);
        this.statusCode = statusCode;
        this.errArray = errArray;
        this.hint = hint;
    }
}

export default ErrorResponse;