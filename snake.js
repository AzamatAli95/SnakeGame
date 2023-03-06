let vector;
let width = 17;
let height = 15;
let pause = true;
let headRotate;
let isFood=false;
let foodPos ;
let bonusFood;
let arrPos = [51,52,53,54,55,56];

let audio = new Audio();
audio.preload = 'auto';
audio.src = 'sound/apple.mp3';

function createCells(id, width, height)
{
    let offsetLeft = 0;
    let offsetTop = 0;
    let cell = document.createElement(id);
    let field = document.getElementById(id);
    let count = 1;
    for (let i = 0; i < height; i++)
    {
		
		
		
        for (let j = 0; j < width; j++)
        {
            let cell = document.createElement('div');
            cell.className = "cell"
            cell.style.left += offsetLeft + "px";
            cell.style.top += offsetTop + "px";
			
			
			if(count % 2 == 0){
			cell.style.backgroundColor = "#aafa51";	
			}
			else{cell.style.backgroundColor = "#96ff22";}
			
			
			
            //cell.innerHTML = count;
            field.appendChild(cell);
            offsetLeft = offsetLeft + 24;
            count++;
			
        }
        offsetTop = offsetTop + 24;
        offsetLeft = 0;
		
		

    }
	
	
}
function randEmptyCell(max)
{
    let rand = 1;
    do {
        rand = Math.floor(Math.random() * max);
    }
    while (arrPos.includes(rand) == true)
    return rand;
}

function addFood(n = 1)
{
    let food = document.createElement('div');
    food.className = "food";
    let cell = document.querySelectorAll('#field .cell');
	cell[n].appendChild(food);
}



function checkCollSelf()
{
    //
    for (let i = 0; i < arrPos.length - 1; i++)
    {
        if (arrPos[arrPos.length - 1] == arrPos[i])
        {
            alert(" Game Over!!!");
        }
    }
}

function clear()
{
    let cell = document.querySelectorAll('#field .cell');
    for (i = 0; i < arrPos.length; i++)
    {
        cell[arrPos[i]].innerHTML = "";
    }
}
createCells('field', width, height);
foodPos = randEmptyCell(width*height);
addFood(foodPos);


['keydown'].forEach(function(event)
{
    window.addEventListener(event, function(event)
    {
        switch (event.code)
        {
            case "ArrowDown":
                if (vector !== "up")
                {
                    vector = "down"
                };
                break;
            case "ArrowRight":
                if (vector !== "left")
                {
                    vector = "right"
                };
                break;
            case "ArrowUp":
                if (vector !== "down")
                {
                    vector = "up"
                }
                break;
            case "ArrowLeft":
                if (vector !== "right")
                {
                    vector = "left";
                    headRotate = "left";
                };
                break;
            case "Escape":
                pause == true ? pause = false : pause = true;
                break;
        }
    });
});
vector = "right";
window.setInterval(function()
{
    if (pause)
    {
        clear();
        for (let i = 0; i < arrPos.length; i++)
        {
            arrPos[i] = arrPos[i + 1];
        }
        if (vector == "down")
        {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] + width;
            if (arrPos[arrPos.length - 1] + 1 > (height * width))
            {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - width * (height - 1);
            }
        }
        if (vector == "right")
        {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] + 1;
            if (arrPos[arrPos.length - 1] % width == 0)
            {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] - width;
            }
        }
        if (vector == "left")
        {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - 1;
            if ((arrPos[arrPos.length - 1] + 1) % width == 0)
            {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] + width;
            }
        }
        if (vector == "up")
        {
            arrPos[arrPos.length - 1] = arrPos[arrPos.length - 2] - width;
            if (arrPos[arrPos.length - 2] < width)
            {
                arrPos[arrPos.length - 1] = arrPos[arrPos.length - 1] + (width * height);
            }
        }
        let cell = document.querySelectorAll('#field .cell');
        checkCollSelf();
		
		
		
    
        if (arrPos[arrPos.length - 1] == foodPos)
        {
			audio.play();
            addFood(foodPos = randEmptyCell(width*height));
			
		arrPos.unshift(arrPos[1]);
        }
		
		
        
    
		
		
		
		
		
        for (i = 0; i < arrPos.length; i++)
        {
            if (i == arrPos.length - 1)
            {
                cell[arrPos[i]].innerHTML = "<div class='snake " + headRotate + "'>00</div>";
            }
            else
            {
                cell[arrPos[i]].innerHTML = "<div class='snake'></div>";
            }
			
        }
    }
}, 200);


