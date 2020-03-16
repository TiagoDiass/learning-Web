//função que será usada pra criar elementos, assim aumentando nossa produtividade
function novoElemento(tagName, className){
    const element = document.createElement(tagName)
    element.className = className

    return element
}

//Metódo construtor
function Barreira(reversa = false){
    this.elemento = novoElemento('div', 'barreira')   
    
    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    //definir altura
    this.SetAltura = altura => corpo.style.height = `${altura}px`
}

//TESTE, APAGA DPS
/*const b = new Barreira(true)

b.SetAltura(200)
document.querySelector('[wm-flappy]').appendChild(b.elemento)*/

function ParDeBarreiras(altura, abertura, PosicaoX){
    this.elemento = novoElemento('div', 'par-de-barreiras')
    
    this.superior = new Barreira(true) // barreira reversa
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura-abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.SetAltura(alturaSuperior)
        this.inferior.SetAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = PosicaoX => this.elemento.style.left = `${PosicaoX}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()
    this.setX(PosicaoX)
}

const b = new ParDeBarreiras(700, 240, 400)
document.querySelector('[wm-flappy]').appendChild(b.elemento)