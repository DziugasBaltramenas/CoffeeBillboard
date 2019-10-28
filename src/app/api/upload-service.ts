import { restService } from './common/rest-service';

class UploadService {

    public readonly uploadImage = (image: File): Promise<string> => {
        const formData = new FormData();

        formData.append('imageFile', image);

        return restService.post(`/api/upload`, formData)
            .then(response => response.data);
    };
}

const uploadService = new UploadService();

export { UploadService, uploadService };
