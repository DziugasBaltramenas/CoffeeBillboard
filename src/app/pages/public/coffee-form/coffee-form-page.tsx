import React from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Form, FormRenderProps, Field } from 'react-final-form';

import { TextField } from 'app/components/fields/text-field/text-field';
import { FileUploadField } from 'app/components/fields/upload-field/file-upload-field';

import { CoffeeFormModel } from './coffee-form-model';
import { coffeeService } from 'app/api/coffee-service';
import { uploadService } from 'app/api/upload-service';

import styles from './coffee-form.module.scss';
import { NavigationService, navigationService } from 'app/service/navigation-service';

interface OwnProps {}

type Props = OwnProps;

const FORM_FIELDS = {
    title: 'title',
    price: 'price',
    image: 'image'
};

class CoffeeFormPage extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isSubmitted: false,
        };
    }

    public render(): React.ReactNode {
        return (
            <Paper className={styles.form}>
                <Form
                    onSubmit={this.handleSubmit}
                    render={this.renderForm}
                />
            </Paper>
        );
    }

    private handleSubmit = (
        values: CoffeeFormModel,
    ): Promise<void> => {
        return uploadService.uploadImage(values.image)
            .then(fileName => coffeeService.createCoffee({
                imageFileName: fileName,
                title: values.title,
                price: 200
            }))
            .then(coffee => {

                navigationService.goToBillboard();
            })
    };

    private renderForm = ({ handleSubmit, submitting }: FormRenderProps<CoffeeFormModel>): React.ReactNode => {
        return (
            <form onSubmit={handleSubmit} noValidate={true}>
                <Grid container={true} spacing={6}>
                    <Grid item={true} xs={12}>
                        <Field
                            fullWidth={true}
                            required={true}
                            name={FORM_FIELDS.title}
                            component={TextField}
                            label="Name"
                            disabled={submitting}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Field
                            fullWidth={true}
                            required={true}
                            name={FORM_FIELDS.price}
                            component={TextField}
                            label="Price"
                            disabled={submitting}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Field
                            fullWidth={true}
                            required={true}
                            name={FORM_FIELDS.image}
                            component={FileUploadField}
                            label="Image"
                            disabled={submitting}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button variant="outlined" color="primary" fullWidth={true} type="submit">
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export { CoffeeFormPage };
