import React from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import { Card } from 'app/components/card/card';
import { fetchCoffees } from 'app/reducers/coffee/actions';
import { RootState } from 'app/reducers';
import { CoffeeState } from 'app/reducers/coffee/reducer';
import { CardPlaceholder } from 'app/components/card/placeholder';

import styles from './billboard.module.scss';

interface OwnProps {}

interface DispatchProps {
    actions: {
        fetchCoffees: typeof fetchCoffees;
    }
}

interface StateProps {
    coffeeState: CoffeeState
}

type Props = OwnProps & DispatchProps & StateProps;
  
class BillboardComponent extends React.Component<Props> {

    public componentDidMount(): void {
        this.getCoffees();
    }

    public render(): React.ReactNode {
        const {
            coffeeState
        } = this.props

        const isAllCoffeesLoaded = coffeeState.coffees && coffeeState.coffees.length >= coffeeState.total;

        return (
            <Grid container={true} spacing={3}>
                {!coffeeState.coffees
                    ? new Array(5).fill(null).map((_, idx) => (
                        <Grid item={true} xs={12} sm={3} key={idx}>
                            <CardPlaceholder/>
                        </Grid>
                    ))
                    : coffeeState.coffees.map(coffee => (
                        <Grid item={true} xs={12} sm={3} key={coffee.id}>
                            <Card 
                                img={"asdfsadf"}
                                title={coffee.title}
                                price={coffee.price}
                                onDelete={()=>{}}
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
                            variant="outlined"
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
            coffeeState
        } = this.props;

        actions.fetchCoffees({
            skip: coffeeState.coffees ? coffeeState.coffees.length : 0,
            take: 8,
        });
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    coffeeState: state.coffee
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => ({
    actions: {
        fetchCoffees: bindActionCreators(fetchCoffees,dispatch)
    }
})

const Billboard = connect(mapStateToProps, mapDispatchToProps)(BillboardComponent)

export { Billboard };
