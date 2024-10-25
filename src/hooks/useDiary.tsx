import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {DiaryStateContext, useDiaryState} from "../App.js";
import {DiaryData} from "../types";

const useDiary = (id: string) => {
    const state = useDiaryState();
    const [currentDiaryItem, setCurrentDiaryItem] = useState<DiaryData|undefined>(undefined);
    const nav = useNavigate();

    useEffect(()=>{
        const currentDiaryItem = state.find((item) => String(item.id) === id);
        if(!currentDiaryItem){
            window.alert("존제하지 않는 일기입니다");
            nav("/", {replace: true})
        }

        setCurrentDiaryItem(currentDiaryItem);

    },[id, state])

    return currentDiaryItem
}

export default useDiary