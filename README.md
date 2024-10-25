# 감정 일기장 : [emotion-diary](https://jyundev.github.io/emotion-diary/)

## 📝 프로젝트 개요 

감정 일기장은 사용자가 자신의 감정을 기록할 수 있는 간단한 웹 애플리케이션입니다. 사용자는 다양한 기분을 기록하고, 이를 달력 형식으로 쉽게 확인할 수 있습니다. 

## 🖥️ Stack

- 프론트엔드: React
- 데이터베이스: Web Storage (localStorage)
- 개발 도구: VSCode, Vite

## 📁 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┃ ┣ 📜emotion1.png
 ┃ ┣ 📜emotion2.png
 ┃ ┣ 📜emotion3.png
 ┃ ┣ 📜emotion4.png
 ┃ ┗ 📜emotion5.png
 ┣ 📂components
 ┃ ┣ 📜Button.css
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜DiaryItem.css
 ┃ ┣ 📜DiaryItem.tsx
 ┃ ┣ 📜DiaryList.css
 ┃ ┣ 📜DiaryList.tsx
 ┃ ┣ 📜Editor.css
 ┃ ┣ 📜Editor.tsx
 ┃ ┣ 📜EmotionItem.css
 ┃ ┣ 📜EmotionItem.tsx
 ┃ ┣ 📜Header.css
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Viewer.css
 ┃ ┗ 📜Viewer.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useDiary.tsx
 ┃ ┗ 📜usePageTitle.tsx
 ┣ 📂pages
 ┃ ┣ 📜Diary.tsx
 ┃ ┣ 📜Edit.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜New.tsx
 ┃ ┗ 📜Notfound.tsx
 ┣ 📂util
 ┃ ┣ 📜constant.js
 ┃ ┣ 📜get-emotion-image.js
 ┃ ┗ 📜get-string-date.tsx
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx

 ```

 ## 주요 페이지 
페이지는 크게 Diary, Edit, Home, New 페이지로 나뉜다.

 <div style="display: flex; justify-content: center;">
     <img src="https://jyundev.github.io/images/2024-10-19-emotion-diary/home.png" alt="Alt text" style="width: 30%; height: 40%; margin: 10px">
     <img src="https://jyundev.github.io/images/2024-10-19-emotion-diary/write.png" style="width: 30%; height: 40%; margin: 10px">
     <img src="https://jyundev.github.io/images/2024-10-19-emotion-diary/diary.png" style="width: 30%; height: 40%; margin: 10px">
</div>

- Home : 일기 리스트 렌더링
- Diary : 일기 상세 조회
- New : 새로운 일기 작성
- Edit : 기존 일기 수정
