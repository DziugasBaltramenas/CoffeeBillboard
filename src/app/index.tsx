import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core';

import { history, NavigationService } from 'app/service/navigation-service';

import { initialize } from './store';
import { Billboard } from './pages/public/billboard/billboard';
import { theme } from './theme/theme';
import { ConfirmationServiceProvider } from './context/confirmation-context';

import styles from './app.module.scss';

const store = initialize(history);

interface OwnProps { }

type Props = OwnProps ;

class App extends React.PureComponent<Props> {
    public render(): React.ReactNode {
        return (

                <MuiThemeProvider theme={theme}>
                        <ConfirmationServiceProvider>
                            <div className={styles.app}>
                                <div className={styles.appWrapper}>
                                    <Provider store={store}>
                                        <Router history={history}>
                                            <Switch>
                                                <Route
                                                    path={NavigationService.ROOT_PATH}
                                                    component={Billboard}
                                                    exact={true}
                                                />
                                            </Switch>
                                        </Router>
                                    </Provider>
                                </div>
                            </div>
                        </ConfirmationServiceProvider>
                </MuiThemeProvider>
        );
    }
}

export { App };
