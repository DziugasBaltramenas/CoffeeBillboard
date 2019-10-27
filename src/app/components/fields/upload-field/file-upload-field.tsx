import React from 'react';
import { InputProps, } from '@material-ui/core/Input';
import { FieldRenderProps } from 'react-final-form';
import { TextField } from '@material-ui/core';

import styles from './file-upload-field.module.scss';

export type FileUploadInputProps = InputProps & {
    label?: string;
    required?: boolean;
};

type Props = FileUploadInputProps & FieldRenderProps<any, any>;

class FileUploadField extends React.PureComponent<Props> {
    private readonly inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    public render(): React.ReactNode {
        const {
            input,
            meta,
            disabled,
            label,
            fullWidth,
            required
        } = this.props;

        const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

        return (
            <React.Fragment>
                <TextField
                    value={input.value && input.value.name}
                    onClick={this.handleFileSelect}
                    helperText={showError ? meta.error || meta.submitError : undefined}
                    error={showError}
                    disabled={disabled}
                    label={label}
                    fullWidth={fullWidth}
                    required={required}
                />
                <input
                    className={styles.nativeFileInput}
                    type="file"
                    accept="image/*"
                    tabIndex={-1}
                    onChange={this.handleChange}
                    ref={this.inputRef}
                />
            </React.Fragment>
        );
    }

    private handleFileSelect = (): void => {
        const {
            disabled,
        } = this.props;

        if (disabled) {
            return;
        }

        this.inputRef.current.click();
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {
            input,
        } = this.props;

        const file: File = event.target.files[0];

        if (!file) {
            return;
        }

        input.onChange(file);

        input.onBlur();
    };
}

export { FileUploadField };
