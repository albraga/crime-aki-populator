module.exports = class Endereco {
  constructor(lat, lon, rua, bairro, cidade, estado, cep) {
    this.lat = lat
    this.lon = lon
    this.rua = rua
    this.bairro = bairro
    this.cidade = cidade
    this.estado = estado
    this.cep = cep
  }
}
