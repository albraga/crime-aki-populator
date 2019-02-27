module.exports = class Ocorrencia {
  constructor(endereco) {
    this.id = 0
    this.id_fb = ''
    this.data = new Date()
      .toISOString()
      .substr(0, 10)
      .split('-')
      .reverse()
      .join('.')
    this.lat = endereco.lat
    this.lon = endereco.lon
    this.rua = endereco.rua
    this.bairro = endereco.bairro
    this.cidade = endereco.cidade
    this.estado = endereco.estado
    this.cep = endereco.cep
    this.infracao = ''
    this.data_infracao = new Date()
      .toISOString()
      .substr(0, 10)
      .split('-')
      .reverse()
      .join('.')
    this.hora_infracao = new Date().toLocaleTimeString('pt-br', {
      hour: '2-digit',
      minute: '2-digit'
    })
    this.autor = ''
    this.autor_sexo = ''
    this.autor_idade = ''
    this.autor_cor = ''
    this.outros_autores = ''
    this.quantidade_autores = ''
    this.vitima = ''
    this.vitima_sexo = ''
    this.vitima_idade = ''
    this.vitima_cor = ''
    this.outras_vitimas = ''
    this.quantidade_vitimas = ''
    this.historico = ''
    this.autoridade = ''
    this.autoridade_identificacao = ''
    this.outras_autoridades = ''
  }

}
