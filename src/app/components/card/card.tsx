import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, IconButton, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { currencyUtils } from 'app/utils/currency-utils';
import { useConfirmation } from 'app/context/confirmation-context';

import styles from './card.module.scss';

interface OwnProps {
    id: number;
    img: string;
    title: string;
    price: number;
    onDelete: (id: number) => Promise<void>;
}

type Props = OwnProps;

const Card: React.FC<Props> = ({id, img, title, price, onDelete}) => {
    const [isLoading, setLoading] = useState(false);
    const confirm = useConfirmation();

    const handleDelete = React.useCallback(() => {
        confirm({
            title: "Are you sure you want to remove this coffee?",
            description: `This action cannot be undone and you will be unable to recover any data`,
            onSubmit: () => {
                setLoading(true);
                onDelete(id).then(() => setLoading(false))
            }
          })
    }, [id, onDelete, confirm]);

    return (
        <MuiCard className={styles.card}>
            <IconButton aria-label="delete" onClick={handleDelete} className={styles.deleteIcon}>
                <DeleteIcon />
            </IconButton>
            <CardContent>     
                <img 
                    alt="A cup of coffee"
                    className={styles.image}
                    src={`${process.env.PUBLIC_URL}/img/${img}`}
                />
                <Typography variant="h4">{title}</Typography>  
                <Typography variant="overline">{currencyUtils.toEur(price)}</Typography>  
            </CardContent>
            {isLoading &&
                 <React.Fragment>
                    <div className={styles.overlay}/>
                    <CircularProgress className={styles.circleProgress} size={48}/>
                </React.Fragment>
            }
        </MuiCard>
    );
};

export { Card };
