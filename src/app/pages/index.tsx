import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavigationService } from 'app/service/navigation-service';

import { Billboard } from './public/billboard/billboard';

const Pages: React.FC = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route
                    path={NavigationService.ROOT_PATH}
                    component={Billboard}
                    exact={true}
                />
            </Switch>
        </React.Fragment>
    );
};

export { Pages };
