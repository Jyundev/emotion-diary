import React, { useContext, useEffect, useReducer, useRef, useState} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import {DiaryData} from "./types";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 읽기를 상세히 조회하는 Diary 페이지 

type Action = {
  type: "CREATE",
  data: {
    id: number;
    createdDate: Date;
    emotionId: number,
    content: string;
  }
} | {
  type: "UPDATE",
  data:{
    id: number;
    createdDate: Date;
    emotionId: number;
    content: string;
  }
} | {
  type: "DELETE";
  id: number;
} |{
  type: "INIT";
  data: [];
}

function reducer(state: DiaryData[], action: Action){
  let nextState;
  switch(action.type){
    case "INIT": return action.data;
    case "CREATE": 
    nextState =  [action.data, ...state];
    break;
    case "UPDATE": 
    nextState =  state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
    break;
    case "DELETE": 
    nextState =  state.filter((item)=> String(item.id) !== String(action.id));
    break;
    default: return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState))
  return nextState;
}

export const DiaryStateContext = React.createContext<DiaryData[]|null>(null);
export const DiaryDispatchContext = React.createContext<{
  onCreate: (createdDate: Date, emotionId: number, content: string) => void;
  onUpdate: (id: number, createdDate: Date, emotionId: number, content: string) => void;
  onDelete: (id: number) => void;
}|null>(null);

// null 값 방지
export function useDiaryDispatch(){
  const dispatch = useContext(DiaryDispatchContext);
  if(!dispatch) throw new Error("DiaryDispatchContext에 문제가 있습니다 ");
  return dispatch;
}

export function useDiaryState(){
  const state = useContext(DiaryStateContext);
  if(!state) throw new Error("DiaryStateContext 문제가 있습니다 ");
  return state;
}


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary")
    if(!storedData){
      setIsLoading(false);
      return;
    }

    const parsedData: [] = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
    setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((element:DiaryData) => {
      if(element.id > maxId){
        maxId =element.id;
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type:"INIT",
      data: parsedData
    })
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate: Date, emotionId: number, content: string)=> {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,

      }
    })

  };

  // 기존 일기 수정
  const onUpdate = (id: number, createdDate: Date, emotionId: number, content: string) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id:number) => {
    dispatch({
      type: "DELETE",
      id
    });
  }

  if(isLoading){
    return <div>데이터 로딩 중입니다..</div>
  }

  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onUpdate,
        onDelete
      }}>
  <Routes> 
    <Route path="/" element={<Home/>} />
    <Route path="/new" element={<New />} />
    <Route path="/diary/:id" element={<Diary />}/>
    <Route path="/edit/:id" element={<Edit />} />
    {/* 지정한 주소가 아닌 경우 */}
    <Route path="*" element={<Notfound />}/>
  </Routes>
  </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
  </>
  );
}

export default App;
