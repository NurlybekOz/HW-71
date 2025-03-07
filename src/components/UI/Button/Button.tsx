import * as React from "react";

interface Props {
    text?: string;
    type?: 'submit' | 'button' | 'reset';
    onClickBtn: React.MouseEventHandler;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    width?: string;
}

const Button: React.FC<Props> = ({text='Ok', type='button', color = 'primary', width = '100%', onClickBtn}) => {
    return (
        <button
            type={type}
            style={{width: width}}
            className={`btn btn-${color} mt-3`}
            onClick={onClickBtn}
        >
            {text}
        </button>

    );
};

export default Button;