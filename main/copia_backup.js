const fs = require('fs');
const path = require('path');

function obterDataFormatada() {
  const hoje = new Date();
  const dia = hoje.getDate().toString().padStart(2, '0'); // Dia do mês (com zero à esquerda)
  const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Mês (0 a 11, acrescentamos 1 para obter o mês real)
  const ano = hoje.getFullYear().toString(); // Ano com 4 dígitos

  return `${dia}-${mes}-${ano}`;
}


// Nesse método tenho o parâmetro destino que vem da variável pastaDestino
function limparPastasAntigas(destino) {
    // Aqui estou o caminho da pasta de destino
    const destinoAbsoluto = path.resolve(destino);
  
    // Liste todas as pastas na pasta de destino
    const pastas = fs.readdirSync(destinoAbsoluto);
  
    // Mapeie as pastas para um objeto com a data como chave
    const pastasPorData = {};
    pastas.forEach((pasta) => {
      const pastaPath = path.join(destinoAbsoluto, pasta);
      if (fs.statSync(pastaPath).isDirectory()) {
        const pastaData = pasta.match(/\d{2}-\d{2}-\d{4}/); // Extrai a data da pasta
        if (pastaData) {
          pastasPorData[pastaData[0]] = pastaPath;
        }
      }
    });
  
    // Ordene as datas em ordem crescente (da mais antiga para a mais recente)
    const datas = Object.keys(pastasPorData).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
  
    // Mantenha apenas as duas datas mais recentes
    if (datas.length > 2) {
      const datasParaExcluir = datas.slice(0, datas.length - 2);
      datasParaExcluir.forEach((data) => {
        const pastaParaExcluir = pastasPorData[data];
        fs.rmdirSync(pastaParaExcluir, { recursive: true });
        console.log(`Pasta antiga '${pastaParaExcluir}' excluída.`);
      });
    }
  }

function copiarPasta(origem, destino) {

  // Limpe as pastas antigas
  limparPastasAntigas(destino);

  // Aqui estou mandando as pastas de origem e destino
  const origemAbsoluta = path.resolve(origem);
  const pastaDataAtual = path.join(destino, obterDataFormatada());

  // Verifique se a pasta de origem existe
  if (!fs.existsSync(origemAbsoluta)) {
    console.error(`A pasta de origem '${origemAbsoluta}' não existe.`);
    return;
  }

  // Crie a pasta de destino com a data atual como nome
  if (!fs.existsSync(pastaDataAtual)) {
    fs.mkdirSync(pastaDataAtual, { recursive: true });
  }

  // Liste o conteúdo da pasta de origem
  const itens = fs.readdirSync(origemAbsoluta);

  // Percorra cada item (arquivos e subpastas)
  for (const item of itens) {
    const itemOrigem = path.join(origemAbsoluta, item);
    const itemDestino = path.join(pastaDataAtual, item);

    // Verifique se o item é um diretório (subpasta)
    if (fs.statSync(itemOrigem).isDirectory()) {
      // Se for uma subpasta, chame a função recursivamente
      copiarPasta(itemOrigem, itemDestino);
    } else {
      // Se for um arquivo, copie-o
      fs.copyFileSync(itemOrigem, itemDestino);
      console.log(`Arquivo copiado de '${itemOrigem}' para '${itemDestino}'.`);
    }
  }
}

// Use com responsabilidade
const pastaOrigem = 'c:/origem/';
const pastaDestino = 'c:/destino/';

copiarPasta(pastaOrigem, pastaDestino);

/*
Autor: Janderson Siqueira
Última Atualização: 15-09-2023
*/