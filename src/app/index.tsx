import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core';

import { history } from 'app/service/navigation-service';

import { initialize } from './store';
import { theme } from './theme/theme';
import { ConfirmationServiceProvider } from './context/confirmation-context';
import { Pages } from './pages';

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
                                    <Pages/>
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
