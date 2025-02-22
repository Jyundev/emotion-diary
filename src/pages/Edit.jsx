import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
    usePageTitle("일기 수정");
    const {onDelete, onUpdate}  = useContext(DiaryDispatchContext);
    const params = useParams();
    const nav = useNavigate();
    const currentDiaryItem = useDiary(params.id);

    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제할까요?")){
            onDelete(params.id);
            nav("/", {replace: true})
        }
    };

    const onSubmit = (input) => {
        if(window.confirm("일기를 정말 수정할가요?")){
        onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
        nav("/", {replace: true})
        }
    };

return <div>
        <Header title={"일기 수정하기"}
        leftChild={<Button onClick={()=>nav(-1)}text={"< 뒤로가기"}/>}
        rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />}
        />
        <Editor initData = {currentDiaryItem} onSubmit={onSubmit}/>
    </div>
}

export default Edit;