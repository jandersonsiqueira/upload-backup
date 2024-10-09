# Script de Backup de Pastas com Limpeza de Pastas Antigas

Este script em Node.js copia o conteúdo de uma pasta de origem para uma pasta de destino, organizando o backup com base na data atual. O script também mantém as duas pastas de backup mais recentes, removendo as mais antigas automaticamente.

## Funcionalidades

- **Copia** o conteúdo de uma pasta de origem para uma nova pasta de destino com a data atual como nome.
- **Remove** automaticamente pastas de backup antigas, mantendo apenas as duas mais recentes.
- **Suporte a subpastas**, copiando recursivamente todos os arquivos e diretórios.
- **Log detalhado** das operações de cópia e remoção de pastas.

## Requisitos

- **Node.js** (versão 12 ou superior)
- **Permissões de leitura e escrita** nas pastas de origem e destino.

## Instalação

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instalar dependências**:

   O script não possui dependências externas, portanto não há necessidade de instalar pacotes adicionais.

## Utilização

1. **Editar as variáveis de caminho**:

   No final do script, edite os caminhos das variáveis `pastaOrigem` e `pastaDestino` conforme necessário:

   ```javascript
   const pastaOrigem = 'c:/origem/';
   const pastaDestino = 'c:/destino/';
   ```

2. **Executar o script**:

   Para executar o script, rode o seguinte comando no terminal:

   ```bash
   node script.js
   ```

3. **Resultado esperado**:

   - O script criará uma nova pasta de backup em `pastaDestino` com o nome no formato `dd-mm-aaaa` (data do dia da execução).
   - Arquivos e subpastas serão copiados da `pastaOrigem` para a nova pasta de backup.
   - Se houver mais de dois backups existentes na `pastaDestino`, as pastas mais antigas serão excluídas.

## Estrutura do Script

```bash
.
├── main
│   └── script.js      # Arquivo principal do script de backup
```

### Funções principais

1. **obterDataFormatada**: Retorna a data atual no formato `dd-mm-aaaa`.
2. **limparPastasAntigas**: Remove pastas antigas na pasta de destino, mantendo apenas as duas mais recentes.
3. **copiarPasta**: Copia recursivamente todos os arquivos e pastas da pasta de origem para a pasta de destino.

## Exemplo de Execução

Se o script for executado em 09 de outubro de 2024, será criada uma nova pasta `09-10-2024` dentro da pasta de destino. Todo o conteúdo da pasta de origem será copiado para essa pasta, e quaisquer backups mais antigos serão removidos, deixando apenas os dois mais recentes.

## Autor

**Janderson Siqueira**

Última Atualização: 15-09-2023

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para mais detalhes.

---

### Observações

- Certifique-se de que as pastas de origem e destino existam e que você tenha as permissões necessárias.
- Este script foi criado para ser usado em ambientes Windows, mas pode ser adaptado para outras plataformas, ajustando os caminhos dos arquivos.
