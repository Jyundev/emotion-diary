export const getStringDate=(targetDate: Date )=>{

    let year: number|string = targetDate.getFullYear();
    let month: number|string  = targetDate.getMonth()+1;
    let date: number|string = targetDate.getDate();

    if(month<10){
        month = `0${month}`
    }
    if(date<10){
        date = `0${date}`
    }

    return  `${year}-${month}-${date}`;
};