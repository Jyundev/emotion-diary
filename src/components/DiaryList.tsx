import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button.js";
import DiaryItem from "./DiaryItem.js";
import "./DiaryList.css";
import {DiaryData} from "../types";

type Props = DiaryData[];

const DiaryList = (props: Props) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState<'oldest' | 'newest'>('newest');

    const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value as "oldest" | "newest")
    };
    const getSortedData = () => {
        return props.slice().sort((a:DiaryData, b:DiaryData) => {
            if (sortType === "oldest") {
                return a.createdDate.getTime() - b.createdDate.getTime();
            } else {
                return b.createdDate.getTime() - a.createdDate.getTime();
            }
        });
    }
    
    const sortedData = getSortedData();
    
    return (
    <div className="DiaryList">
    <div className="menu_bar">
        <select onChange={onChangeSortType}>
            <option value={"latest"}>최신순</option>
            <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={()=>nav("/new")} text={"새일기 쓰기"}/>
    </div>
    <div className="list_wrapper">
        {sortedData.map((item) => <DiaryItem key={item.id} {...item} />)}
    </div>
    </div>);
};

export default DiaryList;