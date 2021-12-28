var students = [
    {
        "name":"jhon",
        "subject":"machine learning"
    },
    {
        "name":"jhony",
        "subject":"artificial learning"
    }
]


function getEnroll(student){
    setTimeout(function (){
        students.push(student)
        console.log("student data fetching after interval of time")
    },3000)
}

function studentEnroll(){
    setTimeout(function(){
        let str= "";
        students.forEach(function(student1){
            str += `<li>${student1.name}</li>`
        })
        document.getElementById("studentId").innerHTML = str
        console.log("student data fetched ")
    },1000)
}

let students = [{"name":"test1", "subject":"reactjs"}];
function getData(std){
    setInterval(function(){
        let string = "";
        console.log("Data fetch")
    })
}

let studentName = {name: "jhonny1", subject: "python"}

getEnroll();
studentEnroll()
