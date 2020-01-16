import Link from 'next/link';

const Button = props => {
    function handleClick(e) {
        if (props.onClick) {
            e.preventDefault();
            props.onClick(e);
        }
    }
    return (
        <a onClick={handleClick}>
            {props.children}
            <style jsx>{`
                a {
                margin: 0;
                margin-top: 10px;
                padding: 10px 15px;
                display: inline-block;
                border: 1px solid whitesmoke;
                border-radius: 5px;
                background-color: #333;
                color: whitesmoke;
                text-decoration: none;
                }

                a:hover {
                    cursor: pointer;
                    color: #333;
                    background-color: whitesmoke;
                }
            `}</style>
        </a>
    )
};

export default Button;