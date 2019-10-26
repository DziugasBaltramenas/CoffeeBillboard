import React from 'react';

interface OwnProps {}

type Props = OwnProps;

class Billboard extends React.Component<Props> {
    public render(): React.ReactNode {
        return (
            <div>Billboard</div>
        );
    }

}

export { Billboard };
