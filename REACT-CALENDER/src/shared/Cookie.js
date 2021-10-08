import date from "../redux/modules/date";

const getCookie = (name) => {
    let value = ";" + document.cookie;
    let parts = value.split(`; ${name}=`);
    if(parts.length === 2)
    {
        return parts.pop().split(";").shift();
    }
} //name으로 value를 가져오기

const setCookie = (name,value,exp =5) => {
    let date = new Date();
    date.setTime(date.getTime() + exp*24*60*1000)
    document.cookie=`${name}=${value}; expires=${date.toUTCString()}`
}
//exp에 기본값을 넣어줌


const deleteCookie = (name) => {
    let date = new Date("2020-10-11").toUTCString();
    console.log(date);
    document.cookie = name+"=; expires="+date;
}

export {getCookie, setCookie, deleteCookie};

//만료일
//자바스크립트에서 날짜 담당을 하는 객체 let date = new Date()
//내장함수를 사용하여 밀리초로 나타낼 수 있음
//문자로 나타낼 때는 date.toUTCstring();
//숫자로 나타낼 때는 date.getTime(); 숫자로 나타냄  밀리초순으로 
//date.setTime(date.getTime() +10000); 

//setCooke->getCookie->deleteCookie