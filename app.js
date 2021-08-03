const express = require("express")
const figureLookup = require("./numberLookup.json")
require('dotenv').config()

const fig = 14
const app = express()
const port = process.env.PORT

/*
    TODO: Errorhandling API/Express
    TODO: English Text Implemenation
    TODO: Opt - Other Languages
*/

app.get('/api/v3/de/:number', (req, res) => {
    const enteredNumber = req.params.number
    res.json({
        number: enteredNumber,
        germanText: convertFigToText(enteredNumber)
    })
})

const convertFigToText = (figure) => {
    let figureText = ''
    try {
        if(isNaN(figure)) {
            throw new Error("Given value is not a number!")
        }    
        
        if(figure <= 0) {
            throw new Error("Given value has to be a positive number")
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

        console.log(`The number you entered is ${figure} - ${figureText}`)
        return figureText
    }
    catch(err){
        console.error(err.message)
        return err.message
    }
}

convertFigToText(fig)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})