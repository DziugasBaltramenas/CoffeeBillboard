import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavigationService } from 'app/service/navigation-service';

import { Billboard } from './public/billboard/billboard';
import { CoffeeFormPage } from './public/coffee-form/coffee-form-page';

const Pages: React.FC = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route
                    path={NavigationService.COFFEE_FORM_PATH}
                    component={CoffeeFormPage}
                />
                <Route component={Billboard}/>
            </Switch>
        </React.Fragment>
    );
};

export { Pages };
