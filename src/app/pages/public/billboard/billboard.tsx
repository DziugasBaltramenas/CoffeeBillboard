import React from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import { Card } from 'app/components/card/card';
import { actions as reduxActions } from 'app/reducers/coffee/actions';
import { RootState } from 'app/reducers';
import { CoffeeState } from 'app/reducers/coffee/reducer';
import { CardPlaceholder } from 'app/components/card/placeholder';
import { coffeeService } from 'app/api/coffee-service';
import { navigationService } from 'app/service/navigation-service';

import styles from './billboard.module.scss';

interface OwnProps {}

interface DispatchProps {
    actions: {
        fetchCoffees: typeof reduxActions.fetchCoffees;
        removeCoffee: typeof reduxActions.removeCoffee;
    };
}

interface StateProps {
    coffeeState: CoffeeState;
}

type Props = OwnProps & DispatchProps & StateProps;

class BillboardComponent extends React.Component<Props> {

    public componentDidMount(): void {
        const {
            coffeeState,
        } = this.props;

        if (!coffeeState.coffees) {
            this.getCoffees();
        }
    }

    public render(): React.ReactNode {
        const {
            coffeeState,
        } = this.props;

        const isAllCoffeesLoaded = coffeeState.coffees && coffeeState.coffees.length >= coffeeState.total;

        return (
            <Grid container={true} spacing={3} className={styles.billboard}>
                <Grid item={true} xs={12}>
                    <Button
                        onClick={navigationService.goToCoffeeForm}
                        className={styles.addButton}
                        color="primary"
                        variant="contained"
                        arial-label="Add new coffee"
                    >
                        Add new
                    </Button>
                </Grid>
                {!coffeeState.coffees
                    ? new Array(5).fill(null).map((_, idx) => (
                        <Grid item={true} xs={12} sm={3} key={idx}>
                            <CardPlaceholder/>
                        </Grid>
                    ))
                    : coffeeState.coffees.map(coffee => (
                        <Grid item={true} xs={12} sm={3} key={coffee.id}>
                            <Card
                                id={coffee.id}
                                img={coffee.imageFileName}
                                title={coffee.title}
                                price={coffee.price}
                                onDelete={this.deleteCoffee}
                            />
                        </Grid>
                    ))
                }
                {!isAllCoffeesLoaded &&
                    <Grid item={true} xs={12}>
                        <Button
                            onClick={this.getCoffees}
                            fullWidth={true}
                            color="primary"
                            variant="contained"
                            disabled={coffeeState.isLoading}
                            arial-label="Load more coffees"
                        >
                            Load more
                            {coffeeState.isLoading && <CircularProgress className={styles.circleProgress} size={24}/>}
                        </Button>
                    </Grid>
                }
            </Grid>
        );
    }

    private getCoffees = (): void => {
        const {
            actions,
            coffeeState,
        } = this.props;

        actions.fetchCoffees({
            skip: coffeeState.coffees ? coffeeState.coffees.length : 0,
            take: 8,
        });
    };

    private deleteCoffee = (id: number): Promise<void> => {
        const {
            actions,
        } = this.props;

        return coffeeService.deleteCoffee(String(id))
            .then(() => {
                actions.removeCoffee(id);

                return Promise.resolve();
            });
    };
}

const mapStateToProps = (state: RootState): StateProps => ({
    coffeeState: state.coffee,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
    actions: {
        fetchCoffees: bindActionCreators(reduxActions.fetchCoffees, dispatch),
        removeCoffee: bindActionCreators(reduxActions.removeCoffee, dispatch),
    },
});

const Billboard = connect(mapStateToProps, mapDispatchToProps)(BillboardComponent);

export { Billboard };
