const soap = require('soap')
const pop = require('./geocode.js')

const max = 58099999
const min = 58000001


let count = 0;

function init() {
  if(count === 2) process.exit()
  const cepr = Math.floor(Math.random() * (max - min + 1)) + min
  const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  const args = {cep: cepr}
  
  soap.createClient(url, (err, client) => {
    client.consultaCEP(args, (err, result) => {
      let address = result.return
      if (typeof address === 'undefined') {
        console.log(address)
        init()
      } else {
        pop(address)
        count++
        console.log(count)
        init()
      }
    })
  })
}

init()