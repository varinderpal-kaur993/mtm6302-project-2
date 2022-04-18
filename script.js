const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    const apiKey = "ABE94PxvKF6U4Kswg5zxhFiEZgb2jElmI7sS9YIG";
    const dateInput = document.getElementById("datepicker");
    const title = document.querySelector("#title");
    const mediaSection = document.querySelector("#media-section");
    const information = document.querySelector("#description");
    const calendar = document.getElementsByClassName("cal")[0];
    const currentDate =new Date().toISOString().slice(0, 10);
    const imageSection =`<div id="hdimg">
     <div class="image-div">
     <img id="image_of_the_day" src="" alt="image-by-nasa">
     </div>
    </div>`

    const videoSection=`<div class="video-div"> <iframe id="videoLink" src="" frameborder="0"></iframe></div>`
    
    var dateData = '';
    var disData ;
       

    dateInput.addEventListener('change',(e)=>{
        e.preventDefault();
        //  nasarequested();
        dateData = dateInput.value;
        console.log('dateData--------------------------->',e)
    })
    // dateInput.addEventListener('click',(e)=>{
    //     console.log('wwwwwwwwwwwww--------------------------->',e)
    // })
    // calendar.addEventListener('click',(e)=>{
    //     console.log('sssssssssss--------------------------->',e)

    // })

    function diplaydata(data){

        title.innerHTML=data.title;



        date.innerHTML=data.date;
        dateInput.max=currentDate;
        dateInput.min="1995-06-16";

        if(data.media_type=="video"){
        mediaSection.innerHTML=videoSection;
        document.getElementById("videoLink").src=data.url;

        }else{
        mediaSection.innerHTML=imageSection;
        document.getElementById("hdimg").href=data.hdurl;
        document.getElementById("image_of_the_day").src=data.url;
        document.getElementById('modal-image').src=data.url;
        }
        information.innerHTML=data.explanation
    }

    function dis(){
        let newDate = "&date="+dateData+"&";
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa',newDate)
        try{
        fetch(baseUrl+apiKey+newDate)
        .then(response=> response.json())
        .then(json=>{
        console.log(json);
        if(json){
            disData = json;
            document.getElementsByClassName('main')[0].style.opacity=1;
            diplaydata(json);
        }else{
            document.getElementsByClassName('main')[0].style.opacity=0;
        }
        })
        }catch(error){
        console.log(error)
        }
    }

    function add(){
        let favDiv = document.getElementsByClassName('adddata')[0];
        let favContent = `<div class="add" id="${disData.date}">
                            <div class="fav_pic" style="float:left"><img class="imgSet" src=${disData.url}></div>
                            <div class="addCon" style="float:left">
                                <h2 id="fav_title">${disData.title}</h2>
                                <h5 id="fav_date">${disData.date}</h5>
                                <div class="button3">
                                    <button type="button" onclick='del(this)' class="btn btn-danger ${disData.date}">
                                        <h4>Delete</h4>
                                    </button>
                                </div>
                            </div>                     
                        </div>`;
        favDiv.innerHTML += favContent;
        localStorage.setItem('fav',favDiv.innerHTML);
    }

        function del(e){
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqq',e.parentNode.parentNode.parentNode)
        let delContent = e.parentNode.parentNode.parentNode;
        document.getElementsByClassName('adddata')[0].removeChild(delContent)
        localStorage.setItem('fav',document.getElementsByClassName('adddata')[0].innerHTML);
    }

        window.addEventListener('load', 
    function() { 
        document.getElementsByClassName('adddata')[0].innerHTML = localStorage.getItem('fav');
    }, false);