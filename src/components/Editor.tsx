import {ChangeEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constant";
import { getStringDate } from "../util/get-string-date.js";
import Button from "./Button.js";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import {DiaryData} from "../types";

type Props = {
    onSubmit: (input:Partial<DiaryData>)=>void;
    initData: DiaryData | undefined  ;
}
const Editor = (props:Props) => {

    const nav = useNavigate();

    useEffect(()=>{
        if(props.initData){
        setInput({
            ...props.initData,
            createdDate: props.initData.createdDate,
        })
    };
    }, [props.initData])

    const [input, setInput] = useState<Partial<DiaryData>>({
    createdDate: new Date(),
    emotionId: 3,
    content: ""
});



    type customEvent = {
        target :{
            name : string;
            value: number;
        }
    }

const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | customEvent) =>{
    let name = e.target.name;
    let value = e.target.value;
    let date: Date | number;

    if(name==="createdDate"){
        date = new Date(value);
        setInput({...input,
            [name] : date}
        );
    }

}

const onClickSubmitButton=()=>{
    props.onSubmit(input)
}

    return(
    <div className="Editor">
        <section className="date_section">
            <h4>오늘의 날짜</h4>
            <input name="createdDate" onChange={onChangeInput} value={input.createdDate ? getStringDate(input.createdDate): ''} type="date"/>
        </section>
        <section className="emotion_section">
            <h4>오늘의 감정</h4>
            <div className="emotion_list_wrapper">
                {emotionList.map((item)=>
                <EmotionItem 
                onClick={()=>
                    onChangeInput({
                    target:{
                        name: "emotionId",
                        value: item.emotionId
                    }
                })
            }
                key={item.emotionId} {...item} 
                isSelected={item.emotionId === input.emotionId}/>)}
            </div>
        </section>
        <section className="content_section">
            <h4>오늘의 일기</h4>
            <textarea 
            name="content"
            value={input.content}
            onChange={onChangeInput}
            placeholder="오늘은 어땠나요?"/>
        </section>
        <section className="button_section">
            <Button onClick={() => nav(-1)} text={"취소하기"}/>
            <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}/>
        </section>
    </div>
    );
};

export default Editor;