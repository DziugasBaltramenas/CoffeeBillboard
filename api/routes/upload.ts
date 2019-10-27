import { BaseController } from 'models/base-controller';
import { Request, Response } from 'models/common';
import { withErrorHandler } from 'interceptors/error-handler';

import { upload } from './middlewares/upload';

class UploadController extends BaseController {
    private BASE_PATH: string = '/upload';

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.post(this.BASE_PATH, upload.single('imageFile'), withErrorHandler(this.uploadImage));
    }

    private uploadImage(req: Request, res: Response<string>): Promise<Response> {
        return Promise.resolve(res.send(req.file.filename));
    }
}

export { UploadController };
