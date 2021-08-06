const urlencode = require('urlencode')
const bling = require('../services/bling')

const AppError = require('../errors/AppError')

async function postDealInBling (deal) {
  try {
    const xml = urlencode(`<?xml version="1.0" encoding="UTF-8"?>
      <pedido>
        <cliente>
          <nome>${deal.person_name}</nome>
          <tipoPessoa>F</tipoPessoa>
          <cpf_cnpj>99999999999999</cpf_cnpj>
        </cliente>
        <volumes>
          <volume>
            <servico>${deal.org_name}</servico>
          </volume>
        </volumes>
        <itens>
          <item>
            <descricao>teste</descricao>
            <qtde>1</qtde>
            <vlr_unit>1</vlr_unit>
          </item>
        </itens>
        <parcelas>
          <parcela>
            <data>01/08/2022</data>
            <vlr>1</vlr>
          </parcela>
        </parcelas>
        <obs>Integrado pedido. Código: ${deal.id}</obs>
      </pedido>
    `)
    await bling.post(`pedidos/json?apikey=${process.env.API_TOKEN_BLING}&xml=${xml}&gerarnfe=false`)
    return true
  } catch (err) {
    throw new AppError('postDealInBling', err.message)
  }
}

module.exports = postDealInBling
