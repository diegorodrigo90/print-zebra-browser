const printer = require('printer'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require("path"),
    fs = require("fs"),
    app = express()
var impressora = printer.getDefaultPrinterName()

//valida o acesso pela a api em dominio diferentes
app.use(cors()) //em teste aceita todas, futuramente limitar apenas o sisghemot para acesso

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.get('/printers/default', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([{
        printer: printer.getDefaultPrinterName()
    }]));
    //res.json("{ printer: " + printer.getDefaultPrinterName() + "}")
    console.log('Impressora padrão: ' + printer.getDefaultPrinterName())
})

app.get('/printers', (req, res) => {
    res.json(printer.getPrinters())
    console.log('Listando impressoras...')
})

app.post('/set', (req, res) => {
    var obj = {};
    //var impressora = req.body.printer;
    var printerJson = req.body.printer;
    impressora = printerJson
    console.log("Impressora selecionada: " + impressora);
    res.send(req.body)

})

app.post('/print', (req, res) => {
    var obj = {};
    //var impressora = req.body.printer;
    var etiqueta = req.body.label;
    etiqueta = etiqueta.replace("\\", "\n");
    console.log("Impressora selecionada: " + impressora);
    res.send(req.body)


    //template = "barcode";
    template = "nD1\nR\"barcode\"\nP0\n";

    function printZebra(barcode_text, printer_name) {
        printer.printDirect({
            data: template.replace("barcode", barcode_text),
            printer: printer_name,
            type: "RAW", //type: RAW, TEXT, PDF, JPEG, .. depends on platform
            success: function () {
                console.log("Imprimindo: " + barcode_text);
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    printZebra(etiqueta, impressora);

})

//inicia servidor
app.listen(3112, () => console.log('Executando Api...'))
