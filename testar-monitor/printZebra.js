 // script para popular a lista de impressoras pela API
 //variaveis de conexão com a api
 var apiServer = "http://localhost" //servidor api rodando localmente
     ,
     apiPort = "3112" //porta servidor rodando
     ,
     printersPath = "/printers" //çistando impressoras
     ,
     defaultPath = "/printers/default" //pegar impressora padrao
     ,
     printPath = "/print" //imprimir
     ,
     setPath = "/set" //definir impressora
     ,
     printersUrl = apiServer + ":" + apiPort + printersPath //lista impressoras
     ,
     defaultUrl = apiServer + ":" + apiPort + defaultPath //impressora padrão
     ,
     printUrl = apiServer + ":" + apiPort + printPath //imprimir
     ,
     setUrl = apiServer + ":" + apiPort + setPath //mudar impressora
     ,
     impressoraPadrao //armmazena impressora padrão 

 let selectDropdown = 'listarImpressoras' //mesmo que de cima porem para lugare chamando como getElementById

 //pegar impressora padrão e armazenar em impressoraPadrao
 //Caso a api não receba dado a impressão é realizada na impressora padrão

 function loadJson() {
     let dropdown = document.getElementById(selectDropdown)
     dropdown.length = 0

     let defaultOption = document.createElement('option')
     defaultOption.text = 'Selecionar impressora:'
     defaultOption.setAttribute('disabled', 'true')

     dropdown.add(defaultOption)
     dropdown.selectedIndex = 0

     const url = printersUrl

     const request = new XMLHttpRequest()
     request.open('GET', url, true)

     request.onload = function () {
         if (request.status === 200) {
             const data = JSON.parse(request.responseText)
             let option
             for (let i = 0; i < data.length; i++) {
                 option = document.createElement('option')
                 option.text = data[i].name
                 option.value = data[i].name
                 dropdown.add(option)
             }
         } else {
             // Reached the server, but it returned an error
         }
     }

     request.onerror = function () {
         console.error('An error occurred fetching the JSON from ' + url)
     };

     request.send()

 }




 console.log(impressoraPadrao)


 //script para gerar Json com impressora e código de barras
 function changePrinter() {
     var mudarPrinter = document.getElementById(selectDropdown).value;
     impressoraPadrao = mudarPrinter


     function changingPrinter() {
         if (mudarPrinter !== null && mudarPrinter !== undefined && mudarPrinter != "Selecionar impressora") {
             var data = {}
             data.printer = impressoraPadrao

             $.ajax({
                 type: 'POST',
                 data: JSON.stringify(data),
                 contentType: 'application/json',
                 url: setUrl,
                 success: function (data) {
                     console.log('success');
                     console.log(JSON.stringify(data));
                 }
             })
         }
     }

     changingPrinter()

     console.log("Impressora padrão: " + impressoraPadrao)
 }



 function sendPrinter() {
     var label = document.getElementById("barcode").value;
     var printer = impressoraPadrao


     var data = {}
     data.printer = printer
     data.label = label

     $.ajax({
         type: 'POST',
         data: JSON.stringify(data),
         contentType: 'application/json',
         url: printUrl,
         success: data => {
             console.log('success');
             console.log(JSON.stringify(data));
         }
     });




 }
