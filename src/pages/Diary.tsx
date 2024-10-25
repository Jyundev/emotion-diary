import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { getStringDate } from "../util/get-string-date";

const Diary = () => {
    usePageTitle("일기장");
    const params = useParams(); // useParam
    const nav = useNavigate();
    const currentDiaryItem =params.id?useDiary(params.id):null;

    if(!currentDiaryItem){
        return<div>데이터 로딩 중...</div>
    }

    const {createdDate, emotionId, content}  = currentDiaryItem;
    const title = getStringDate(new Date(createdDate))

    return <div>
        <Header title={`${title} 기록`}
        leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로가기"}/>}
        rightChild={<Button onClick={()=>nav(`/edit/${params.id}`)}
        text={"수정하기"}/>}
        />
        <Viewer emotionId={emotionId} content={content}/>
        </div>
}

export default Diary;