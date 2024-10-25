import "./Button.css";
import {MouseEventHandler} from "react";

interface ButtonProps {
    text: string;
    type?: 'POSITIVE' | 'NEGATIVE' ;
    onClick:  MouseEventHandler<HTMLButtonElement>;
}

const Button = ({text, type, onClick}:ButtonProps) =>{
    return <button onClick={onClick} className={`Button Button_${type}`}>{text}</button>
}

export default Button;