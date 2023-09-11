document.getElementById("form").addEventListener("submit", e =>{
    e.preventDefault()
    const color = document.getElementById("color-selector").value.substring(1) 
    const colorScheme = document.getElementById("color-scheme").value
    const link = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}`
    
    fetch(link)
        .then(response => response.json())
        .then(scheme =>{
            let colors = []
            
            for(let color of scheme.colors){
                colors.push(color.hex.value)
            }

           renderScheme(colors)
           renderNames(colors)
        })
})

document.addEventListener("click", function (e) {
    document.execCommand("copy")   
});

function renderScheme(colors){
    let index = 0
    let count = 1
    
    for (let color of colors){
        
        document.getElementById(`color-${count}`).style.background= `linear-gradient( ${color} 93%, transparent 7%)`
        count++
        index++
    }
}

function renderNames(colors){
    let index = 0
    let count = 1
    
    for (let color of colors){
        document.getElementById(`color-${count}`).innerText = colors[index]
        count++
        index ++
    }
}
