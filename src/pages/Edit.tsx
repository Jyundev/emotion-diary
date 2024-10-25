import {useNavigate, useParams} from "react-router-dom";
import {useDiaryDispatch} from "../App.js";
import Button from "../components/Button.js";
import Editor from "../components/Editor.js";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary.js";
import usePageTitle from "../hooks/usePageTitle.js";
import {DiaryData} from "../types";

const Edit = () => {
    usePageTitle("일기 수정");
    // const {onDelete, onUpdate}  = useContext(DiaryDispatchContext);
    const dispatch = useDiaryDispatch();
    const params = useParams<{ id: string }>();
    const nav = useNavigate();

    const currentDiaryItem = params.id ? useDiary(params.id) : undefined;

    const onClickDelete = () => {
        const diaryId = Number(params.id);

        if (isNaN(diaryId)) {
            window.alert("잘못된 일기 ID입니다.");
            return;
        }

        if (window.confirm("일기를 정말 삭제할까요?")) {
            dispatch.onDelete(diaryId);
            nav("/", {replace: true})
        }
    };

    const onSubmit = (input: Partial<DiaryData>) => {
        const diaryId = Number(params.id);
        if (isNaN(diaryId) || !input) {
            window.alert("잘못된 일기 ID입니다.");
            return;
        }

        // 각 속성이 유효한지 체크
        const { createdDate, emotionId, content } = input;

        if (!createdDate || !emotionId || content === undefined) {
            window.alert("모든 필드를 입력해야 합니다.");
            return;
        }

        if (window.confirm("일기를 정말 수정할까요?")) {
            dispatch.onUpdate(diaryId, createdDate, emotionId, content);
            nav("/", { replace: true });
        }
    };

    return <div>
        <Header title={"일기 수정하기"}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"}/>}
                rightChild={<Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"}/>}
        />
        <Editor initData={currentDiaryItem} onSubmit={onSubmit}/>
    </div>
}

export default Edit;