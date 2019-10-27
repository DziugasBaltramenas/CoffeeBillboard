import React from 'react';
import { ConfirmationOptions, ConfirmationModal } from 'app/components/modal/confirmation';

interface ConfirmationContextOptions extends ConfirmationOptions {
    onSubmit: () => void;
}

const ConfirmationServiceContext = React.createContext<
    (options: ConfirmationContextOptions) => void
>(null);

const useConfirmation = () => React.useContext(ConfirmationServiceContext);

const ConfirmationServiceProvider: React.FC = ({ children }) => {
    const [
        confirmationState,
        setConfirmationState
    ] = React.useState<ConfirmationContextOptions>(null);

    const openConfirmation = (options: ConfirmationContextOptions) => {
        setConfirmationState(options);
    };

    const handleClose = () => {
        setConfirmationState(null);
    };

    const handleSubmit = () => {
        confirmationState.onSubmit();
        setConfirmationState(null);
    };

    return (
        <React.Fragment>
            <ConfirmationServiceContext.Provider
                value={openConfirmation}
                children={children}
            />
            <ConfirmationModal
                open={!!confirmationState}
                onSubmit={handleSubmit}
                onClose={handleClose}
                title={confirmationState ? confirmationState.title : ''}
                description={confirmationState ? confirmationState.description : ''}
            />
        </React.Fragment>
    );
};

export { useConfirmation, ConfirmationServiceProvider}