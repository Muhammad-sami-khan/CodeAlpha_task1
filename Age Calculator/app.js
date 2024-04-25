// it will change the type of my input field from text to date and date to text 
window.onload = function(){
    let TypeOfInputField =  document.querySelector('.birth-date input');
    TypeOfInputField.addEventListener('focus', function(){
        this.type= "date";
        this.style.fontSize = "1rem";
        this.style.padding = " 0 50px 0 5px";
        this.style.backgroundColor = "#cdcbd4";
    });
  
    TypeOfInputField.addEventListener('blur', function(){
        this.type = "text";
        this.style.padding = "";
    });
}

let form = document.querySelector("#new-age-form");
let Result = document.querySelectorAll('result input');
form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    
    // get the birthdate of the user input field
    let BirthDay = new Date(document.querySelector('.birth-date #birthday').value);
   
    //get today
    let today = new Date();
   //now get the years, months, and dates from today date
   let currentYear = today.getFullYear();  //it will take the current year
   let currentMonth = today.getMonth();   //it will take the current month
   let currentDate = today.getDate();      // it will take the current date
    console.log("current date is: "+currentYear, currentMonth, currentDate);
    //now get the years, months, and dates, from the birthday which the user will be input
    let birthdayYear = BirthDay.getFullYear();
    let birthdayMonth = BirthDay.getMonth();
    let birthdayDate = BirthDay.getDate();
   
    let totalYears = currentYear-birthdayYear;
    let totalMonths = currentMonth-birthdayMonth;
    let totalDays = currentDate- birthdayDate;
    if (totalMonths<0 || (totalMonths === 0 && totalDays<0)) {
        totalYears --;
        totalMonths +=12;
    }
    if (totalDays<0) {
        totalMonths--;
       totalDays+= new Date(today.getFullYear(),today.getMonth(),0).getDate();
    }
    console.log(`my total age is: ${totalYears} years, ${totalMonths} months, ${totalDays} days`);
    document.getElementById('years').value = totalYears;
    document.getElementById('months').value = totalMonths;
    document.getElementById('days').value  = totalDays;


    let msg = document.querySelector('.msg');
    let Message = document.createElement('h4');
    Message.classList.add('msg');
    Message.innerHTML = `</br> your age is: </br> ${totalYears} Years ${totalMonths} Months ${totalDays} Days`;
    msg.appendChild(Message);
    console.log("message successfully added!");

});




