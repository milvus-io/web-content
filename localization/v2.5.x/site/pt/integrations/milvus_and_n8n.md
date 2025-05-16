---
id: milvus_and_n8n.md
summary: >-
  O n8n é uma poderosa plataforma de automatização de fluxos de trabalho de
  código aberto que permite ligar várias aplicações, serviços e APIs para criar
  fluxos de trabalho automatizados sem codificação. Com a sua interface visual
  baseada em nós, a n8n permite aos utilizadores criar processos de
  automatização complexos ligando simplesmente nós que representam diferentes
  serviços ou acções. É auto-hospedável, altamente extensível e suporta licenças
  empresariais e de código justo.
title: Começar a utilizar o Milvus e o n8n
---
<h1 id="Getting-Started-with-Milvus-and-n8n" class="common-anchor-header">Introdução ao Milvus e à n8n<button data-href="#Getting-Started-with-Milvus-and-n8n" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><h2 id="Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="common-anchor-header">Introdução ao n8n e ao nó do Milvus Vetor Store<button data-href="#Introduction-to-n8n-and-the-Milvus-Vector-Store-Node" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p><a href="https://n8n.io/">A n8n</a> é uma poderosa plataforma de automatização de fluxos de trabalho de código aberto que lhe permite ligar várias aplicações, serviços e APIs para criar fluxos de trabalho automatizados sem codificação. Com a sua interface visual baseada em nós, o n8n permite aos utilizadores criar processos de automatização complexos ligando simplesmente nós que representam diferentes serviços ou acções. É auto-hospedável, altamente extensível e suporta licenças empresariais e de código justo.</p>
<p>O nó do <strong>Milvus Vetor Store</strong> na n8n integra <a href="https://milvus.io/">o Milvus</a> nos seus fluxos de trabalho de automatização. Isto permite-lhe efetuar pesquisa semântica, alimentar sistemas de geração aumentada de recuperação (RAG) e criar aplicações de IA inteligentes - tudo dentro do ecossistema n8n.</p>
<p>Esta documentação baseia-se principalmente na <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentação</a> oficial <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">do n8n Milvus Vetor Store</a>. Se encontrar algum conteúdo desatualizado ou inconsistente, dê prioridade à documentação oficial e sinta-se à vontade para nos colocar uma questão.</p>
<h2 id="Key-Features" class="common-anchor-header">Caraterísticas principais<button data-href="#Key-Features" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Com o nó Milvus Vetor Store na n8n, pode:</p>
<ul>
<li>Interagir com a sua base de dados Milvus como uma <a href="https://docs.n8n.io/glossary/#ai-vector-store">loja de vectores</a></li>
<li>Inserir documentos no Milvus</li>
<li>Obter documentos do Milvus</li>
<li>Recuperar documentos para os fornecer a um retriever ligado a uma <a href="https://docs.n8n.io/glossary/#ai-chain">cadeia</a></li>
<li>Ligar-se diretamente a um <a href="https://docs.n8n.io/glossary/#ai-agent">agente</a> como uma <a href="https://docs.n8n.io/glossary/#ai-tool">ferramenta</a></li>
<li>Filtrar documentos com base em metadados</li>
</ul>
<h2 id="Node-Usage-Patterns" class="common-anchor-header">Padrões de utilização dos nós<button data-href="#Node-Usage-Patterns" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>É possível utilizar o nó Milvus Vetor Store na n8n de acordo com os seguintes padrões.</p>
<h3 id="Use-as-a-regular-node-to-insert-and-retrieve-documents" class="common-anchor-header">Utilizar como um nó normal para inserir e recuperar documentos</h3><p>É possível utilizar o Milvus Vetor Store como um nó normal para inserir ou obter documentos. Este padrão coloca o Milvus Vetor Store no fluxo de ligação regular sem utilizar um agente.</p>
<p>Consulte este <a href="https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/">modelo de exemplo</a> para saber como criar um sistema que armazena documentos no Milvus e os recupera para suportar respostas citadas e baseadas em chat.</p>
<h3 id="Connect-directly-to-an-AI-agent-as-a-tool" class="common-anchor-header">Ligar diretamente a um agente de IA como uma ferramenta</h3><p>Pode ligar o nó do Milvus Vetor Store diretamente ao conetor de ferramentas de um <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/">agente de IA</a> para utilizar um armazenamento de vectores como um recurso ao responder a consultas.</p>
<p>Neste caso, a ligação seria a seguinte: Agente de IA (conetor de ferramentas) -&gt; nó do Milvus Vetor Store. Veja este <a href="https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/">modelo de exemplo</a> em que os dados são incorporados e indexados no Milvus e o agente de IA utiliza o armazenamento de vectores como uma ferramenta de conhecimento para responder a perguntas.</p>
<h3 id="Use-a-retriever-to-fetch-documents" class="common-anchor-header">Utilizar um recuperador para ir buscar documentos</h3><p>Pode utilizar o nó <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/">Vetor Store Retriever</a> com o nó Milvus Vetor Store para ir buscar documentos ao nó Milvus Vetor Store. Isto é frequentemente utilizado com o nó <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/">Cadeia de perguntas e respostas</a> para obter documentos do armazenamento de vectores que correspondem à entrada de chat fornecida.</p>
<p>Um fluxo de ligação de nó típico tem o seguinte aspeto: Cadeia de perguntas e respostas (conetor Retriever) -&gt; Vetor Store Retriever (conetor Vetor Store) -&gt; Milvus Vetor Store.</p>
<p>Consulte este <a href="https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/">exemplo de fluxo de trabalho</a> para ver como ingerir dados externos no Milvus e criar um sistema de perguntas e respostas semântico baseado em chat.</p>
<h3 id="Use-the-Vector-Store-Question-Answer-Tool-to-answer-questions" class="common-anchor-header">Utilizar a ferramenta de resposta a perguntas do Vetor Store para responder a perguntas</h3><p>Outro padrão utiliza o <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/">Vetor Store Question Answer Tool</a> para resumir os resultados e responder a perguntas do nó do Milvus Vetor Store. Em vez de conectar o Milvus Vetor Store diretamente como uma ferramenta, esse padrão usa uma ferramenta projetada especificamente para resumir os dados no armazenamento de vetores.</p>
<p>O fluxo de ligações seria o seguinte: Agente de IA (conetor de ferramentas) -&gt; Ferramenta de resposta a perguntas do repositório de vectores (conetor do repositório de vectores) -&gt; Repositório de vectores Milvus.</p>
<h2 id="Node-Operation-Modes" class="common-anchor-header">Modos de funcionamento do nó<button data-href="#Node-Operation-Modes" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>O nó do Milvus Vetor Store suporta vários modos de funcionamento, cada um adaptado a diferentes casos de utilização do fluxo de trabalho. A compreensão destes modos ajuda a conceber fluxos de trabalho mais eficazes.</p>
<p>A seguir, apresentamos uma visão geral de alto nível dos modos de funcionamento e opções disponíveis. Para obter uma lista completa dos parâmetros de entrada e das opções de configuração de cada modo, consulte a <a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">documentação oficial</a>.</p>
<hr>
<h3 id="Operation-Modes-Overview" class="common-anchor-header">Descrição geral dos modos de funcionamento</h3><p>O nó do Milvus Vetor Store suporta quatro modos distintos:</p>
<ul>
<li><strong>Obter muitos</strong>: Recupera vários documentos com base na semelhança semântica com um prompt.</li>
<li><strong>Inserir documentos</strong>: Inserir novos documentos na sua coleção Milvus.</li>
<li><strong>Recuperar documentos (como armazenamento vetorial para cadeia/ferramenta)</strong>: Utilizar o nó como um retriever num sistema baseado em cadeias.</li>
<li><strong>Recuperar Documentos (Como Ferramenta para Agente AI)</strong>: Utilizar o nó como um recurso de ferramenta para um agente de IA durante tarefas de resposta a perguntas.</li>
</ul>
<h3 id="Additional-Node-Options" class="common-anchor-header">Opções adicionais do nó</h3><ul>
<li><strong>Filtro de metadados</strong> (apenas no modo Obter muitos): Filtrar resultados com base em chaves de metadados personalizadas. Vários campos aplicam uma condição AND.</li>
<li><strong>Limpar coleção</strong> (apenas no modo Inserir documentos): Remova os documentos existentes da coleção antes de inserir novos documentos.</li>
</ul>
<h3 id="Related-Resources" class="common-anchor-header">Recursos relacionados</h3><ul>
<li><a href="https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/">Documentação de integração do n8n Milvus</a></li>
<li><a href="https://js.langchain.com/docs/integrations/vectorstores/milvus/">Documentação do LangChain Milvus</a></li>
<li><a href="https://docs.n8n.io/advanced-ai/">Documentação sobre IA avançada do n8n</a></li>
</ul>
