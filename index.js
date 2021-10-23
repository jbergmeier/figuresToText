const express = require("express")
const figureLookup = require("./numberLookup.json")
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
/*
    TODO: Errorhandling API/Express
    TODO: English Text Implemenation
    TODO: Opt - Other Languages
    Todo: deployment
*/
var datetime = new Date();

app.get('/', (req, res) => {
    console.log("root page called")
    res.send("Root is not in use!. Current Date is: " + datetime.toISOString().slice(0,10))
})

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
        else if(figure <= 9999) {
            const figureArray = figure.toString().split('')
            let figureTextTemp = ''

            if(figureArray[0] == 1 && figureArray[1] == 1) {
                figureTextTemp = 'eintausendeinhundert'
            }
            else if(figureArray[0] == 1) {
                figureTextTemp = 'eintausend'
                figureTextTemp += figureLookup.find(a => a.number == figureArray[1]).german + "hundert"
            }
            else {
                figureTextTemp += figureLookup.find(a => a.number == figureArray[0]).german + "tausend"
                figureTextTemp += figureLookup.find(a => a.number == figureArray[1]).german + "hundert"
            }
            figureText = figureTextTemp + figureLookup.find(a => a.number == (figureArray[2].toString() + figureArray[3].toString())).german
        }
        else{
            throw new Error("Zahl ist größer als 9999")
        }

        console.log(`${Date()} - Requested: ${figure} - ${figureText}`)
        return figureText
    }
    catch(err){
        console.error(err.message)
        return err.message
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})