import { useContext, useState } from "react";
import {DiaryStateContext, useDiaryState} from "../App.js";
import Button from "../components/Button.js";
import DiaryList from "../components/DiaryList.js";
import Header from "../components/Header";
import {DiaryData} from "../types";

// 이번달에 해당하는 데이터 반환 
const getMonthlyData = (pivotDate: Date, data: DiaryData[])=>{
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(),1,0,0,0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59).getTime();

    return data.filter((item:DiaryData)=> beginTime <= item.createdDate.getTime() && endTime >= item.createdDate.getTime())
}

const Home = () => {
    const data = useDiaryState();
    const [pivotDate, setPivotDate] = useState(new Date());
    const monthlyData = getMonthlyData(pivotDate, data);
    
    const onIncreseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1));
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1))
    }

    return (
    <div>
        <Header 
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`} 
        leftChild={<Button onClick ={onDecreaseMonth} text = {"<"}/>}
        rightChild={<Button onClick = {onIncreseMonth} text={">"}/>}
        />
        <DiaryList {...monthlyData}/>
    </div>
    );
};

export default Home;