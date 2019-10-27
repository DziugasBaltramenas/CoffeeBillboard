import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

import { Card } from 'app/components/card/card';
import { fetchCoffees } from 'app/reducers/coffee/actions';
import { RootState } from 'app/reducers';
import { CoffeeState } from 'app/reducers/coffee/reducer';
import { CardPlaceholder } from 'app/components/card/placeholder';

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
        const {
            actions
        } = this.props;

        actions.fetchCoffees();
    }

    public render(): React.ReactNode {
        const {
            coffeeState
        } = this.props

        return (
            <Grid container={true} spacing={6}>
                {!coffeeState.coffees
                    ? new Array(5).fill(null).map((_, idx) => (
                        <Grid item={true} xs={12} sm={4} key={idx}>
                            <CardPlaceholder/>
                        </Grid>
                    ))
                    : coffeeState.coffees.map(coffee => (
                        <Grid item={true} xs={12} sm={4} key={coffee.id}>
                            <Card 
                                img={"asdfsadf"}
                                title={coffee.title}
                                price={coffee.price}
                                onDelete={()=>{}}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        );
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
