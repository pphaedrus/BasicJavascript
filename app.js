

document.addEventListener('DOMContentLoaded',()=>{    
    const grid= document.querySelector(".grid");
    const person= document.createElement("div");
    const finish= document.createElement("div");
    let personLeftSpace=120;
    let personBottomSpace=100;
    let isGameOver=false;
    let carCounter=2;
    let carFixedBottomForNow=400;
    let runningCars=[];
    let timer=false;
    let isGoingLeft=false;
    let isGoingRight=false;
    let isGoingUp= false;
    let isGoingDown=false;
    let finishBottom=480;
    let finishLeft=76;

    class Car{
        constructor(newLeft,newBottom){
            this.left=newLeft;
            this.bottom= newBottom; 
            this.element= document.createElement('div');

            const tag= this.element;
            tag.style.left= this.left+"px";
            tag.style.bottom= this.bottom+"px";
            tag.classList.add('car');
            grid.appendChild(tag);

            console.log("kaç defa car class");

        }
    }

    function moveCars(){
        if(personBottomSpace>=90){
            runningCars.forEach(p=>{
               var leftie= p.left+4;
               if(leftie>=260){
                p.left=-60;
               }
               else{
                p.left+=4;
               }

               let element= p.element;
               element.style.left=p.left+"px";
               collisionCheck();
            })
        }
    }

    function createPerson(){
        grid.appendChild(person);
        person.classList.add('person');                
        person.style.left=personLeftSpace+"px"; //doğrudan js ile eleente css attributeları verebildik
        person.style.bottom=personBottomSpace+"px"; //doğrudan js ile eleente css attributeları verebildik
    }

    function createFinish(){
        grid.appendChild(finish);
        finish.classList.add('finishLine');
        finish.style.left=finishLeft+"px";
        finish.style.bottom=finishBottom+"px";
    }

    function createCars(newBottom){
        var carCount= Math.floor(Math.random()*carCounter)+1;
        for(var i=0;i<carCount;i++){
            var wide= 250/carCount;
            let newLeft= Math.random()*45+ i*wide;

            let newCar= new Car(newLeft,newBottom);
            runningCars.push(newCar);
            console.log(runningCars);
        }
    }

    function control(e){
        if(e.key=="ArrowLeft"){
            moveLeft();
        }
        else if(e.key=="ArrowRight"){
            moveRight();
        }
        else if(e.key=="ArrowUp"){
            moveUp();
            console.log("left"+person.style.left);
            console.log("bottom"+person.style.bottom);
        }
        if(e.key=="ArrowDown"){
            moveDown()
        }
    }

    function collisionCheck(){
        runningCars.forEach(p=>{
             if(personBottomSpace+30>p.bottom&&
                personBottomSpace<p.bottom+30&&
                p.left+60>personLeftSpace&&
                personLeftSpace+30>p.left
                ){
                    gameOver();
                }       
        });

    }


    function moveLeft(){
        isGoingLeft=true;
        personLeftSpace-=5;
        person.style.left=personLeftSpace+"px";
        win();
    }
    function moveRight(){
        isGoingRight=true;
        personLeftSpace+=5;
        person.style.left=personLeftSpace+"px";
        win();
    }
    function moveUp(){
        isGoingUp=true;
        personBottomSpace+=10;
        person.style.bottom=personBottomSpace+"px";
        win();
    }
    function moveDown(){
        isGoingDown=true;
        personBottomSpace-=5;
        person.style.bottom=personBottomSpace+"px";
    }

    function win(){
        if(personBottomSpace+30>finishBottom&&
            personLeftSpace+30>finishLeft&&
            finishLeft+100>personLeftSpace
            ){
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
        grid.style.color="white";
        grid.style.backgroundColor="green";
        grid.innerHTML="WIN"
        }
    }


    function move(){
        if(timer){
            personBottomSpace+=4;
            person.style.bottom= personBottomSpace+"px";
        }
    }

    function gameOver(){
        console.log("game over");
        isGameOver= true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML="YOU LOSE"
    }

    function start(){
        if(!isGameOver){
           createPerson();
           createFinish();
           createCars(carFixedBottomForNow);
           carFixedBottomForNow-=100;
           createCars(carFixedBottomForNow);
           carFixedBottomForNow-=50;
           createCars(carFixedBottomForNow);
           setInterval(moveCars,60);
           setInterval(move,30);     
           document.addEventListener('keyup',control);    
        }
    };
    
    start();

});



