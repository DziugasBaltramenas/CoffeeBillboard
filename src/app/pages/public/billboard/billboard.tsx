import React from 'react';
import { Grid } from '@material-ui/core';

import { Card } from 'app/components/card/card';

interface OwnProps {}

type Props = OwnProps;

class Billboard extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <Grid container={true} spacing={6}>
                {[1,2,3,4,5,6,7,8.9].map((i) => (
                    <Grid item={true} xs={12} sm={4}>
                        <Card 
                            img={"asdfsadf"}
                            title="Café Latte"
                            price={2043}
                            onDelete={()=>{}}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }

}

export { Billboard };
