import { createBrowserHistory } from 'history';

export interface UrlParams {
    path: string;
    reload?: boolean;
    placeholders?: any;
}

class NavigationService {
    public static readonly ROOT_PATH: string = '';
    public static readonly COFFEE_FORM_PATH: string = `${NavigationService.ROOT_PATH}/create`;

    public getUrl(pathParams: UrlParams): string {
        let tempText = pathParams.path;

        if (pathParams.placeholders) {
            Object.keys(pathParams.placeholders).forEach((key: string) => {
                tempText = tempText.replace(`:${key}`, pathParams.placeholders[key]);
            });
        }

        return tempText;
    }

    public goToPath(pathParams: UrlParams): void {
        const convertedPath: string = this.getUrl(pathParams);

        history.push(convertedPath);
    }

    public goToBillboard(): void {
        this.goToPath({ path: NavigationService.ROOT_PATH });
    }

    public goToCoffeeForm = (): void => {
        this.goToPath({ path: NavigationService.COFFEE_FORM_PATH });
    }
}
export const history = createBrowserHistory();

const navigationService = new NavigationService();

export { navigationService, NavigationService };
