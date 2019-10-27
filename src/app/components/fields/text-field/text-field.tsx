import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { TextField as MuiTextField } from '@material-ui/core';

const TextField: React.FC<FieldRenderProps<any, any>> = ({
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
}) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

    return (
        <MuiTextField
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value}
        />
    );
};

export { TextField };
