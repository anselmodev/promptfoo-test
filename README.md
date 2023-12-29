## Promptfoo - Testes de LLM

Este documento visa exemplificar instalação da bilbioteca e execução de testes.

Os seguintes exemplos estão disponíveis:

- Instalação e configuração da biblioteca.
- Execução de testes via Linha de Comando e Web View.
- Execução de testes usando Node Js e banco de dados para prompts salvos.
- Documentos e referências importantes.

#### Documentação Oficial:

[Promptfoo Docs](https://www.promptfoo.dev/docs/intro)

### Setup

- Instalação da lib promptfoo

  ```shell
   npm install -g promptfoo
  ```

- Para execução dos exemplos, defina a variável de ambiente para OpenAI (GPT) e Google Vertex (GEMINI).

  ```shell
  export OPENAI_API_KEY=<your key>
  ```

  [Promptfoo OpenAI Docs](https://www.promptfoo.dev/docs/providers/openai)

  <br />

## Testes via linha de comando

- Exemplo (gpt-agents-prompt):
  ```shell # entre no diretório
  cd gpt-agents-prompt

      # execute
      promptfoo eval
      ```

  _Será executado o exemplo comparando o GPT 4 e GPT 3.5 turbo com os resultados na saída do terminal e em um arquivo JSON na pasta `result-test`_

## Comandos

`promptfoo eval` - Carrega e avalia o diretório atual com suas configurações.

`promptfoo eval --no-cache` - Carrega e avalia o diretório atual sem usar o cache.

`promptfoo view` - Carrega a interface UI no diretório atual para executar os testes e exibir no browser.

<br />

## Usando o exemplo com Node JS

- Instalação da lib promptfoo

      ```shell
      npm install promptfoo
      ```

  [Detalhes de Uso do pacote para Node Js](https://www.promptfoo.dev/docs/usage/node-package/#usage)

- Importando a função de avaliação e executanto testes:

  ```javascript
  import promptfoo from "promptfoo";

  const prompts = ["Traduza a seguinte palavra para francês: {{word}}"];
  const providers = ["openai:gpt-3.5-turbo-1106"];
  const tests = [
    {
      vars: {
        word: "Olá mundo!",
      },
      assert: [
        {
          type: "javascript",
          value: (output) => {
            const pass = output.includes("Bonjour");
            return {
              pass,
              score: pass ? 1.0 : 0.0,
              reason: pass
                ? 'Output contained substring "Bonjour"'
                : 'Output did not contain substring "Bonjour"',
            };
          },
        },
      ],
    },
  ];

  const results = await promptfoo.evaluate(prompts, providers, tests);
  ```

  A função avalia usando parâmetros que podem ser vistos em:
  [Node JS - Uso Geral](https://www.promptfoo.dev/docs/usage/node-package/#usage)

<br />

### Exemplo com prompts e variąveis salvos em banco de dados.

- Subir o contaner:

```shell
# entre no diretório
cd node-agents-test/src/db

#execute
docker compose -f docker-compose.yml up
```

- Executar teste de banco para gerar prompt e variáveis:

```shell
# entre no diretório
cd node-agents-test

#execute
npm run test:database
```

- Executar os testes de prompts:

```shell
npm run test:prompts
```

_O resultado dos testes serão armazenados na pasta `src/result-test`._

<br />

## Referências importantes

- Referências para estrutura principal do arquivo de configuração:

  https://www.promptfoo.dev/docs/configuration/reference

- Evitando repetições:

  *https://www.promptfoo.dev/docs/configuration/guide#avoiding-repetition*

- Certificando que a saída esteja no formato JSON e que as chaves existam:

  *https://www.promptfoo.dev/docs/guides/evaluate-json/#ensuring-that-outputs-are-valid-json*

- Prompt de referência e arquivos de teste usando globs e listas:

  *https://www.promptfoo.dev/docs/configuration/parameters#prompts-from-file*

- Assertions (Propriedades):

  *https://www.promptfoo.dev/docs/configuration/expected-outputs/#assertion-properties*

- Assertions (Tipos):

  *https://www.promptfoo.dev/docs/configuration/expected-outputs/#assertion-types*

- Provedores LLM:

  *https://www.promptfoo.dev/docs/providers*
