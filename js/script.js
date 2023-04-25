const tamanhoDoRanger = document.querySelector(".pass-length input")
const inputSenha = document.querySelector(".input-box input")
const copia = document.querySelector(".input-box span")
const option = document.querySelectorAll(".option input")
const passIndicator = document.querySelector(".pass-indicator")
const btn = document.querySelector(".generate-btn")

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&*#@"
}

function gerarSenha(){
   
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = tamanhoDoRanger.value

        option.forEach(opt =>{
            if(opt.checked){
                if(opt.id !== "duplicate" && opt.id !== "spaces"){
                    staticPassword += characters[opt.id];
                }else if(opt.id === "spaces"){
                    staticPassword += `  ${staticPassword}  `;
                }else{
                    excludeDuplicate = true;
                }
            }
        })
        // console.log(staticPassword);

        for(let i = 0; i < passLength; i++){
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            // console.log(randomChar);
            if(excludeDuplicate){
                !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
            }else{
                randomPassword += randomChar;
            }
        }
        inputSenha.value = randomPassword

}

const updatedPassIdicator = () =>{
    passIndicator.id = tamanhoDoRanger.value <= 8 ? "weak" : tamanhoDoRanger.value <= 16 ? "medium" : "strong";
}

const updateSlider = () =>{
    document.querySelector(".pass-length span").innerText = tamanhoDoRanger.value;
    gerarSenha()
    updatedPassIdicator()
}
updateSlider()

btn.addEventListener("click",gerarSenha)
tamanhoDoRanger.addEventListener("input",updateSlider)
copia.addEventListener("click", ()=>{
    console.log("Ola Deus");
    navigator.clipboard.writeText(inputSenha.value);
    copia.innerText = "check"
    copia.style.color = "green"
    setTimeout(()=>{
        copia.innerText = "copy_all"
        copia.style.color = "#707070"
    },1000)
})
