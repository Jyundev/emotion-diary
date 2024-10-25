import {getEmotionImg} from "../util/get-emotion-image";
import "./EmotionItem.css";

type Props = {
    emotionId: number;
    emotionName: string;
    isSelected: boolean;
    onClick: () => void
}
const EmotionItem = (props:Props) => {
    return (
        <div
            onClick={props.onClick}
            className={`EmotionItem ${props.isSelected ? `EmotionItem_on_${props.emotionId}` : ""}`}>
            <img className="emotion_img" src={getEmotionImg(props.emotionId)}/>
            <div className="emotion_name">{props.emotionName}</div>
        </div>
    );
}

export default EmotionItem;