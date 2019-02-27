const request = require('request')
const firebase = require('firebase/app')
require('firebase/database')

const Endereco = require('./endereco.js')
const Ocorrencia = require('./ocorrencia.js')
const infras = require('./infracoes.js')
const autores = require('./autores.js')
const cor = ['branco', 'branco', 'branco', 'pardo', 'pardo', 'preto', 'preto', 'amarelo', 'indígena']

const config = {
    apiKey: 'AIzaSyCAhXz7ULD5AiWSE7-qvq5Pu3vg0l89bEY',
    authDomain: 'parseapp-e8b30.firebaseapp.com',
    databaseURL: 'https://parseapp-e8b30.firebaseio.com',
    projectId: 'parseapp-e8b30',
    storageBucket: 'parseapp-e8b30.appspot.com',
    messagingSenderId: '246109443388'
}
firebase.initializeApp(config)
const dbRef = firebase.database().ref()
const ocorrenciasRef = dbRef.child('ocorrencias')

let endere

module.exports = function pop(address) {
    endere = address
    let { bairro, cep, cidade, end, uf } = endere
    let local = `${end}, ${cidade}`
    request({
        url: `http://dev.virtualearth.net/REST/v1/Locations?query=${local}&maxResults=1&key=AqGCNLEBOc6bE8VlPdnvd-ULuhYLc3PyJZIvuY6TQtvJ3ZR1jHnzWr-NBUwNuTeU`,
        headers: {
            'User-Agent': 'request'
        }
    }, callback)

}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        const info = JSON.parse(body)
        let [lat, lon] = info.resourceSets[0].resources[0].point.coordinates

        let rua = endere.end
        let bairro = endere.bairro
        let cidade = endere.cidade
        let estado = endere.uf
        let cep = endere.cep
        let endereco = new Endereco(lat, lon, rua, bairro, cidade, estado, cep)
        let oco = new Ocorrencia(endereco)
        oco.infracao = infras[Math.floor(Math.random() * infras.length)]

        request({
                url: 'https://randomuser.me/api/',
                headers: {
                    'User-Agent': 'request'
                }
            }, (er, res, bod) => {
                if (!er && res.statusCode == 200) {
                    const parsed = JSON.parse(bod)
                    let obj = parsed.results[0]
                    oco.autor = obj.name.first
                    oco.autor_sexo = obj.gender == 'female' ? 'feminio' : 'masculino'
                    oco.autor_idade = obj.dob.age
                    oco.autor_cor = cor[Math.floor(Math.random() * cor.length)]
                    oco.outros_autores =
                        autores[Math.floor(Math.random() * autores.length)] +
                        ' - ' +
                        autores[Math.floor(Math.random() * autores.length)]
                    let qtd_autores = oco.outros_autores.split('-')[0].trim() == '' ? 0 : 1
                    qtd_autores += oco.outros_autores.split('-')[1] == true ? (oco.outros_autores.split('-')[1].trim() == '' ? 0 : 1) : 0
                    oco.quantidade_autores = qtd_autores + 1
                    oco.vitima = obj.name.last
                    oco.vitima_sexo = obj.gender == 'female' ? 'maculino' : 'feminino'
                    oco.vitima_idade = obj.dob.age - 5
                    oco.vitima_cor = cor[Math.floor(Math.random() * cor.length)]
                    let vitimas = [' - ', ' e ' + obj.location.state]
                    oco.outras_vitimas = vitimas[Math.floor(Math.random() * vitimas.length)]
                    let qtd_vitimas = oco.outras_vitimas.split('-')[0].trim() == '' ? 0 : 1
                    qtd_vitimas += oco.outras_vitimas.split('-')[1] == true ? (oco.outras_vitimas.split('-')[1].trim() == '' ? 0 : 1) : 0
                    oco.quantidade_vitimas = qtd_vitimas + 1
                    oco.historico =
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
                    oco.autoridade = obj.login.username
                    oco.autoridade_identificacao = parsed.info.seed
                    oco.outras_autoridades = 'não há'
                    ocorrenciasRef.push(oco).then(snap => {
                        ocorrenciasRef.child(snap.key).update({ id_fb: snap.key })
                    })
                }
            }

        )
    }
}