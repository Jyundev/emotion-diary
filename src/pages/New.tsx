import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {DiaryDispatchContext, useDiaryDispatch} from "../App.js";
import Button from "../components/Button.js";
import Editor from "../components/Editor.js";
import Header from "../components/Header";
import usePageTitle from "../hooks/usePageTitle.js";
import {DiaryData} from "../types";

const New = () => {
    usePageTitle("새 일기 작성");
    const nav = useNavigate();
    const dispatch = useDiaryDispatch();
    const onSubmit = (input:Partial<DiaryData>) =>{

        // 각 속성이 유효한지 체크
        const { createdDate, emotionId, content } = input;

        if (!createdDate || !emotionId || content === undefined) {
            window.alert("모든 필드를 입력해야 합니다.");
            return;
        }
        dispatch.onCreate(createdDate, emotionId, content)
        nav('/', {replace: true})
    }


    return (
    <div>
    <Header 
        title={"새 일기 쓰기"} 
        leftChild={<Button onClick={(()=>nav(-1))} text={"< 뒤로가기"}/>}/>
    <Editor onSubmit={onSubmit}/>
    </div>
    )
}

export default New;