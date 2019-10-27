import React from 'react';
import { Card as MuiCard, CardContent, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { currencyUtils } from 'app/utils/currency-utils';
import { useConfirmation } from 'app/context/confirmation-context';

import styles from './card.module.scss';

interface OwnProps {
    img: string;
    title: string;
    price: number;
    onDelete: () => void;
}

type Props = OwnProps;

const Card: React.FC<Props> = ({img, title, price, onDelete}) => {
    const confirm = useConfirmation();

    const handleDelete = React.useCallback(() => {
        confirm({
            title: "Are you sure you want to remove this coffee?",
            description: `This action cannot be undone and you will be unable to recover any data`,
            onSubmit: onDelete
          })
    }, [])

    return (
        <MuiCard className={styles.card}>
            <IconButton aria-label="delete" onClick={handleDelete} className={styles.deleteIcon}>
                <DeleteIcon />
            </IconButton>
            <CardContent>     
                <img 
                    alt="A cup of coffee"
                    className={styles.image}
                    src="https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg?cs=srgb&dl=aroma-aromatic-art-434213.jpg"/> 
                <Typography variant="h4">{title}</Typography>  
                <Typography variant="overline">{currencyUtils.toEur(price)}</Typography>  
            </CardContent>
        </MuiCard>
    );
};

export { Card };