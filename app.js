class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText=previousOperandText
        this.currentOperandText=currentOperandText
        this.clear()
    }
//      all clear
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined

    }
   // delete
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }
    // add numbers
    appendNumbers(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() + number.toString()

    }
        // choose operation 
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !=''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
    }

    compute(){
        let computaion
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current) ) return
        switch(this.operation){
            case '+':
                computaion=prev + current
                break
            case '*':
                computaion=prev * current
                break
            case '-':
                computaion=prev - current
                break
            case '÷':
                computaion=prev / current
                break
                default: return

        }
        this.currentOperand=computaion
        this.previousOperand=''
        this.operation=undefined
    }

    getDisplayNumber(number){
     const stringNumber=number.toString()
     const intengerDigits=parseFloat(stringNumber.split('.')[0])
     const decimalDigits=stringNumber.split('.')[1]
     let integerDisplay
     if(isNaN(intengerDigits)){
        integerDisplay=''
     }else{
        integerDisplay=intengerDigits.toLocaleString('en',{maximumFractionDigits:0})
     }

     if(decimalDigits!=null){
        return `${integerDisplay}.${decimalDigits}`
     }else{
        return integerDisplay
     }

    }

    updateDisplay(){
        this.currentOperandText.innerText=
      this.getDisplayNumber(this.currentOperand)  
        if(this.operation != null){
            this.previousOperandText.innerText=
            `${this.getDisplayNumber(this.previousOperand) } ${this.operation}`
        }else{
            this.previousOperandText.innerText=''
        }
    }
}



const numbersbtn=document.querySelectorAll('[data-number]')
const operationbtn=document.querySelectorAll('[data-operation]')
const equalbtn=document.querySelector('[data-equal]')
const deletebtn=document.querySelector('[data-delete]')
const AllClearebtn=document.querySelector('[data-all-clear]')
const previousOperandText=document.querySelector('[data-previous-operand]')
const currentOperandText=document.querySelector('[data-current-operand]')
const themeItem=document.querySelector('.switch')
const calculatorGrid=document.querySelector('.calculator-grid')

const calculator=new Calculator(previousOperandText,currentOperandText)

numbersbtn.forEach(function(button){
    button.addEventListener('click',()=>{
        calculator.appendNumbers(button.innerText)
        calculator.updateDisplay()
    })
})


operationbtn.forEach(function(button){
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalbtn.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

AllClearebtn.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deletebtn.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})


themeItem.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
   if(document.body.className.includes('dark')) {
    localStorage.setItem('theme','dark')
   }else{
    localStorage.setItem('theme','light');
   }

 
})

window.onload=function (){
  let locastorage=localStorage.getItem('theme')
   if(locastorage==='dark'){
    document.body.classList.add('dark')
   }
}
