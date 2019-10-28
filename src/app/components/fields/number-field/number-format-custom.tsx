import React from 'react';
import NumberFormat from 'react-number-format';

interface NumberFormatCustomProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom: React.FC<NumberFormatCustomProps> = ({ inputRef, onChange, ...other }) => {
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={true}
        />
    );
};

export { NumberFormatCustom }
