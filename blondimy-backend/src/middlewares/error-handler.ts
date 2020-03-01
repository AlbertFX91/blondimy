
function generateError(res: any, status: number, message: string): object {
    res.status(status).json({
        "status": "error",
        "statusCode": status,
        "message": message
    });
    return res;
}


export default function errorHandler(err: any, req: any, res:any , next: any) {
    console.log("[ErrorHandler]");
    if (typeof (err) === 'string') {
        // custom application error
        // return res.status(400).json({ message: err });
        return generateError(res, 400, err);
    }

    if (err.name === 'ValidationError') {
        // Validation error error
        return generateError(res, 422, err.msg);
    }

    if (err.name === 'MongoError') {
        // mongoose error
        return generateError(res, 422, err.msg);
    }
422
    if (err.type === 'entity.parse.failed') {
        // Request data parsing error
        return generateError(res, 400, 'Invalid Request');
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return generateError(res, 401,  'Invalid Token');
    }

    console.log(err);

    // default to 500 server error
    return generateError(res, 500, "Internal server error");
}