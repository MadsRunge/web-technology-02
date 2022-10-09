/*<header>

    <div className="header">

        <h1>Fetch & Paint</h1>
        <img src="DALL·E%202022-09-28%2009.56.50%20-%20a%20crazy%20wizard%20painting%20creatively%20on%20a%20canvas.png"
             alt="Wizard from Dall-e" width="150px">
    </div>
</header>
 */



const canvas = document.querySelector(".myCanvas");
const sizeSlider = document.querySelector("#sizeSlider")
const colorButtons = document.querySelectorAll(".colors .option")
const toolButton = document.querySelectorAll(".tool")
const pen = canvas.getContext("2d");

window.addEventListener("load",function (){
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
} )
let painting =
    false,
    brushSize = 0,
    chosenColor = "#000",
    chosenTool = "brush";



function startPainting(){
    painting = true;
    pen.beginPath();
    pen.lineWidth = brushSize;
    pen.strokeStyle = chosenColor;
    pen.fillStyle = chosenColor;
}


function paint(mouse){
    if (!painting)
        return
    if ( chosenTool === "brush" || chosenTool === "Eraser" ){
        pen.strokeStyle = chosenTool === "eraser" ? "#000" : chosenColor
        pen.lineTo(mouse.offsetX,mouse.offsetY);
        pen.stroke();
    }

    toolButton.forEach(button => {
        button.addEventListener("click", function (){
            document.querySelector(".options", ".active").classList.remove("active");
            button.classList.add("active");
            chosenTool = button.id;
            console.log(chosenTool)

        })
    })


}


sizeSlider.addEventListener("change", function (){
    brushSize = sizeSlider.value

})

colorButtons.forEach(button => {
    button.addEventListener("click", function (){ // tilføjer en click event til alle knapper
        document.querySelector(".options .selected").classList.remove("selected");
        button.classList.add("selected");
        chosenColor = window.getComputedStyle(button).getPropertyValue("background-color");
    })
})

canvas.addEventListener("mousedown", startPainting)
canvas.addEventListener("mousemove", paint)
canvas.addEventListener("mouseup", function (){
    painting = false;
})


