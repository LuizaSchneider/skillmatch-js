# SkillMatch

Aplicação web que compara o perfil de um candidato com vagas de front-end júnior e calcula o percentual de compatibilidade com cada uma.

## O problema que resolve

Motor de análise que antes rodava só no console (mini-projeto) virou um produto de verdade: o RH ou o próprio candidato preenche um formulário no navegador, vê as vagas mais compatíveis com seu perfil, e recebe uma recomendação de quais habilidades estudar para aumentar suas chances.

## Como executar

Este projeto é HTML + CSS + JavaScript puro (sem frameworks, sem build, sem back-end). Como usa módulos ES (`import`/`export`) e `fetch`, **não funciona abrindo o arquivo direto no navegador** — precisa rodar por um servidor local:

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server** (se ainda não tiver).
3. Clique com o botão direito no `index.html` → **"Open with Live Server"**.
4. O navegador abre em `http://localhost:...` — pronto, é só usar.

## Como usar

1. Preencha nome, área de atuação e meses de experiência.
2. Selecione até 5 habilidades.
3. Clique em "Analisar Compatibilidade".
4. Veja os cards de vaga com percentual, classificação (Alta/Média/Baixa), habilidades encontradas/faltantes, a vaga mais compatível em destaque e uma recomendação de estudo.
5. Seu perfil fica salvo no navegador (localStorage) — se você recarregar a página, os dados preenchidos voltam automaticamente.

## Tecnologias e conceitos aplicados

- **JavaScript**: classes e herança (`Vaga` e `VagaFrontEnd extends Vaga`), métodos usando `this`, callback (`processarAnalise` recebe uma função como parâmetro), closure (`criarContadorDeAnalises`, que "lembra" quantas análises foram feitas na sessão), métodos de array (`map`, `filter`, `reduce`, `find`, `flatMap`), `async/await` com `fetch`.
- **Módulos ES**: código dividido em `motor.js` (regras/cálculo), `ui.js` (tela/DOM/eventos) e `dados.js` (fetch + localStorage), ligados por `import`/`export`.
- **DOM e eventos**: `addEventListener`, `createElement`, `classList`, `preventDefault`, validação de formulário com mensagem de erro acessível (`aria-live`).
- **HTML semântico e acessível**: landmarks (`header`, `main`, `footer`), um único `h1`, `label`/`for` em todos os campos, `alt` na logo, `title` e `meta description` no `<head>`.
- **CSS**: Flexbox, box model, responsividade mobile-first com media queries, tipografia com Google Fonts (Roboto Serif no título, Roboto Flex no restante).
- **Persistência e rede**: `fetch` do catálogo de vagas com tratamento dos 3 estados (carregando/vazio/erro) e `localStorage` para lembrar o perfil (com `JSON.stringify`/`JSON.parse` e tratamento do `null` na primeira visita).

## Debugging

Durante o desenvolvimento, usei o `debugger`/console do DevTools para investigar um bug real: a função `restaurarPerfilSalvo` estava declarada duas vezes no `ui.js` (uma cópia extra colada por engano). Isso causava um `SyntaxError` de identificador duplicado, que quebrava o módulo inteiro — por isso os cliques nos botões de habilidade paravam de funcionar (o CSS/`:hover` continuava normal, mas o JavaScript nunca chegava a rodar). O erro no Console apontou o arquivo e a duplicação, e a correção foi remover uma das duas declarações.

## Melhorias futuras

- Filtro/ordenação das vagas por modalidade ou salário.
- Tema claro/escuro persistido no localStorage.
- Deploy no GitHub Pages.

## Kanban

https://github.com/users/LuizaSchneider/projects/2
