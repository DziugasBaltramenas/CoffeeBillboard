import React from 'react';
import { Card as MuiCard, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './card.module.scss';

const CardPlaceholder: React.FC = () => {
    return (
        <MuiCard className={styles.card}>
            <CardContent>
                <Skeleton variant="rect" className={styles.image} />
                <Skeleton height={15} width="100%" />
                <Skeleton height={15} width="40%" />
            </CardContent>
        </MuiCard>
    );
};

export { CardPlaceholder };
