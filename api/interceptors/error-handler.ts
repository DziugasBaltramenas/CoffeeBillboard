import { RouteHandler } from 'models/route-handler';

import { ErrorModel, RouteError } from './route-error';

interface DatabaseError {
    [errorName: string]: {
        [errorCode: number]: ErrorModel;
        default: ErrorModel;
    };
}

const databaseErrorData: DatabaseError = {
    EntityNotFound: {
        default: {
            status: 404,
            message: "Entity not found",
        },
    },
    QueryFailedError: {
        default: {
            status: 422,
            message: "Unproccesable entity",
        },
    },
};

export const withErrorHandler = <T= {}, P = {}>(fn: RouteHandler<T, P>) => {
    return (req, res, next) => {
        try {
            fn(req, res, next).catch(next);
        } catch (error) {
            next(error);
        }
    };
};

export const errorHandler = (error, req, res, next) => {
    console.log(error);

    if (error instanceof RouteError) {
        res.status(error.status).send({ message: error.message });

        return;
    }

    if (error.name) {
        handleDatabaseError(error, res);

        return;
    }

    if (process.env.NODE_ENV !== 'production' && (error.stack || error.message)) {
        res.status(500).send(error.stack || error.message);
    } else {
        res.status(500).send({
            message: "Internal server error",
        });
    }
};

const handleDatabaseError = (error, res) => {
    const errorData = databaseErrorData[error.name];

    if (errorData) {
        if (errorData[error.errno]) {
            res.status(errorData[error.errno].status).send({ message: errorData[error.errno].message });
        } else {
            res.status(errorData.default.status).send({ message: errorData.default.message });
        }
        return;
    }

    if (process.env.NODE_ENV !== 'production') {
        res.status(500).send(error);
    } else {
        res.status(500).send({ message: "Internal server error" });
    }
};
