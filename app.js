const express = require("express")
const figureLookup = require("./numberLookup.json")

const fig = 120

const convertFigToText = (figure) => {
    let figureText = ''
    try {
        if(isNaN(figure)) {
            throw new Error("Given value is not a number!")
        }    
        
        if(figure <= 0) {
            throw new Error("Given value has to be a positive number")
        }

        if(figure <=12) {
            figureText = figureLowerThanTwelve(figure)            
        }
        else if (figure <= 99) {
            const lookupFigure = figureLookup.find(a => a.number == figure)
            figureText = lookupFigure.german
        }
        else if(figure <= 999) {
            let figureTextTemp = ''
            const figureArray = figure.toString().split('')
            if(figureArray[0] == 1) {
                figureTextTemp = 'einhundert'
            }
            else {
                figureTextTemp = figureLookup.find(a => a.number == figureArray[0]).german + "hundert"
            }
            figureText = figureTextTemp + figureLookup.find(a => a.number == (figureArray[1].toString() + figureArray[2].toString())).german
        }
        else{
            throw new Error("Zahl ist größer als 1000")
        }

        console.log(`The number you entered is ${figureText}!`)
        return figureText
    }
    catch(err){
        console.error(err.message)
    }
}

const figureLowerThanTwelve = (figure) => {
    switch(figure){
        case 1:
            return 'eins'
        case 2:
            return 'zwei'
        case 3:
            return 'drei'
        case 4:
            return 'vier'
        case 5:
            return 'fünf'
        case 6:
            return 'sechs'
        case 7:
            return 'sieben'
        case 8:
            return 'acht'
        case 9:
            return 'neun'
        case 10:
            return 'zehn'
        case 11:
            return 'elf'
        case 12:
            return 'zwölf'
    }
}

convertFigToText(fig)