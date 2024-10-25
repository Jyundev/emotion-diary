import "./Header.css";
import {ButtonProps} from "../types";

type Props = {title: string, leftChild: ButtonProps, rightChild: ButtonProps};
const Header=(props: Props)=>{
    return (
         <header className="Header">
        <div className="header_left">{props.leftChild}</div>
        <div className="header_center">{props.title}</div>
        <div className="header_right">{props.rightChild}</div>
    </header>);
};

export default Header;