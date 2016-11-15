var beginTime;
var intervalId
function myClock() {
    var siteTime = new Date(); //создаём объект Date()
    var hour = siteTime.getHours(); //получаем часы
    var minute = siteTime.getMinutes(); //получаем минуты
    var second = siteTime.getSeconds(); //получаем секунды
    //В следующих трех строках проверяем, если число (часы, минуты, секунды) меньше 10,
    // то выводим 0 перед числом (для красоты)
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute  = "0" + minute;
    if (second < 10) second  = "0" + second;

    $("#time").html( hour + ":" + minute + ":" + second);

}
function DateToSTR(curDate, id) {
    var year = curDate.getFullYear();
   // console.log("Upload.js.erb has been executed");
    var month = curDate.getMonth()+1
    var date =curDate.getDate()
    var hour = curDate.getHours(); //получаем часы
    var minute = curDate.getMinutes(); //получаем минуты
    var second = curDate.getSeconds(); //получаем секунды
    //В следующих трех строках проверяем, если число (часы, минуты, секунды) меньше 10,
    // то выводим 0 перед числом (для красоты)
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute  = "0" + minute;
    if (second < 10) second  = "0" + second;


    $("#"+id).val( year + "-"+ month +"-"+ date+ " " +hour + ":" + minute + ":" + second );
}

function timer() {
    var siteTime = new Date(); //создаём объект Date()

    var timeDifference = (siteTime-beginTime)/1000;

    var minutes = timeDifference/60;
    var hours = minutes/60;
    minutes = (hours - Math.floor(hours)) * 60;
    hours = Math.floor(hours);
    seconds = Math.floor((minutes - Math.floor(minutes)) * 60); // подсчитываем кол-во оставшихся секунд в текущей минуте
    minutes = Math.floor(minutes); // округляем до целого кол-во оставшихся минут в текущем часе

    //В следующих трех строках проверяем, если число (часы, минуты, секунды) меньше 10,
    // то выводим 0 перед числом (для красоты)
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes  = "0" + minutes;
    if (seconds < 10) seconds  = "0" + seconds;

    $("#time").html( hours + ":" + minutes + ":" + seconds);

}

document.addEventListener("turbolinks:load", function() {

    $("#Start").on ("click",function(){
        $("#Start").toggle();
        $("#Stop").toggle();
        beginTime =new(Date);
        DateToSTR (beginTime, "start_date");
        intervalId = setInterval(timer, 1000);
    })
    $("#Stop").on ("click",function(){
        $("#Start").toggle();
        $("#Stop").toggle();
        clearInterval(intervalId);
        DateToSTR (new(Date), "end_date");
        $("#new_event").submit();


    })
    $("#ReportButton").on ("click",function(){
        console.log("click");
    })
})

