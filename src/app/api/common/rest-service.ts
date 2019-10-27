import axios, {
    AxiosError,
    AxiosInstance,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    CancelTokenSource,
} from 'axios';

export interface RestServiceConfig {
    cancelTokenSource: CancelTokenSource;
}

class RestService {
    public post: typeof RestService.prototype.save = this.save;

    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: '/',
        });

        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => Promise.resolve(response),
            (error: AxiosError) => {
                if (axios.isCancel(error)) {
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            },
        );
    }

    public getRawInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.get(url, config);
    }

    public save<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.post(url, data, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axiosInstance.delete(url, config);
    }

}

const restService: RestService = new RestService();

export { RestService, restService };
