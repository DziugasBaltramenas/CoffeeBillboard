import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { TextField, InputAdornment } from '@material-ui/core';

import { NumberFormatCustom } from './number-format-custom';

const NumberField: React.FC<FieldRenderProps<any, any>> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

    return (
        <TextField
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value}
            InputProps={{
                inputComponent: NumberFormatCustom as any,
                startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
        />
    );
};

export { NumberField };
