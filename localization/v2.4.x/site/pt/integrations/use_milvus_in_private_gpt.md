---
id: use_milvus_in_private_gpt.md
summary: >-
  Neste tutorial, vamos mostrar-lhe como utilizar o Milvus como base de dados de
  vectores backend para o PrivateGPT.
title: Utilizar o Milvus no PrivateGPT
---
<h1 id="Use-Milvus-in-PrivateGPT" class="common-anchor-header">Utilizar o Milvus no PrivateGPT<button data-href="#Use-Milvus-in-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://privategpt.dev/">O PrivateGPT</a> é um projeto de IA pronto para produção que permite aos utilizadores colocar questões sobre os seus documentos utilizando Large Language Models sem uma ligação à Internet, garantindo 100% de privacidade. O PrivateGPT oferece uma API dividida em blocos de alto e baixo nível. Também fornece um cliente Gradio UI e ferramentas úteis como scripts de download de modelos em massa e scripts de ingestão. Conceitualmente, o PrivateGPT envolve um pipeline RAG e expõe suas primitivas, estando pronto para uso e fornecendo uma implementação completa da API e do pipeline RAG.</p>
<p>Neste tutorial, mostraremos como utilizar o Milvus como base de dados de vectores backend para o PrivateGPT.</p>
<div class="alert note">
<p>Este tutorial tem como principal referência o guia de instalação oficial <a href="https://docs.privategpt.dev/installation/getting-started/installation">do PrivateGPT</a>. Se achar que este tutorial tem partes desactualizadas, pode dar prioridade a seguir o guia oficial e criar uma questão para nós.</p>
</div>
<h2 id="Base-requirements-to-run-PrivateGPT" class="common-anchor-header">Requisitos básicos para executar o PrivateGPT<button data-href="#Base-requirements-to-run-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Clone-the-PrivateGPT-Repository" class="common-anchor-header">1. Clonar o repositório do PrivateGPT</h3><p>Clone o repositório e navegue até ele:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/zylon-ai/private-gpt
$ <span class="hljs-built_in">cd</span> private-gpt
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Install-Poetry" class="common-anchor-header">2. Instalar o Poetry</h3><p>Instale <a href="https://python-poetry.org/docs/#installing-with-the-official-installer">o Poetry</a> para gerenciamento de dependências: Siga as instruções no site oficial do Poetry para instalá-lo.</p>
<h3 id="3-Optional-Install-make" class="common-anchor-header">3. (Opcional) Instalar o make</h3><p>Para executar vários scripts, é necessário instalar o make.</p>
<p>macOS (Usando Homebrew):</p>
<pre><code translate="no" class="language-shell">$ brew install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<p>Windows (Usando Chocolatey):</p>
<pre><code translate="no" class="language-shell">$ choco install <span class="hljs-built_in">make</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Install-Available-Modules" class="common-anchor-header">Instalar os módulos disponíveis<button data-href="#Install-Available-Modules" class="anchor-icon" translate="no">
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
    </button></h2><p>O PrivateGPT permite a personalização da configuração de alguns módulos, por exemplo, LLM, Embeddings, Vetor Stores, UI.</p>
<p>Neste tutorial, usaremos os seguintes módulos:</p>
<ul>
<li><strong>LLM</strong>: Ollama</li>
<li><strong>Embeddings</strong>: Ollama</li>
<li><strong>Vetor Stores</strong>: Milvus</li>
<li><strong>UI</strong>: Gradio</li>
</ul>
<p>Execute o seguinte comando para usar o poetry para instalar as dependências do módulo necessário:</p>
<pre><code translate="no" class="language-shell">$ poetry install --extras <span class="hljs-string">&quot;llms-ollama embeddings-ollama vector-stores-milvus ui&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Start-Ollama-service" class="common-anchor-header">Iniciar o serviço Ollama<button data-href="#Start-Ollama-service" class="anchor-icon" translate="no">
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
    </button></h2><p>Aceda a <a href="https://ollama.com/">ollama.ai</a> e siga as instruções para instalar o Ollama no seu computador.</p>
<p>Após a instalação, certifique-se de que a aplicação de ambiente de trabalho Ollama está fechada.</p>
<p>Agora, inicie o serviço Ollama (ele iniciará um servidor de inferência local, servindo tanto o LLM quanto o Embeddings):</p>
<pre><code translate="no" class="language-shell">$ ollama serve
<button class="copy-code-btn"></button></code></pre>
<p>Instale os modelos a utilizar, o <code translate="no">settings-ollama.yaml</code> predefinido está configurado para o utilizador <code translate="no">llama3.1</code> 8b LLM (~4GB) e <code translate="no">nomic-embed-text</code> Embeddings (~275MB)</p>
<p>Por defeito, o PrivateGPT extrai automaticamente os modelos conforme necessário. Este comportamento pode ser alterado modificando a propriedade <code translate="no">ollama.autopull_models</code>.</p>
<p>Em qualquer caso, se quiser extrair modelos manualmente, execute os seguintes comandos:</p>
<pre><code translate="no" class="language-shell">$ ollama pull llama3.1
$ ollama pull nomic-embed-text
<button class="copy-code-btn"></button></code></pre>
<p>Opcionalmente, pode mudar para os seus modelos favoritos no ficheiro <code translate="no">settings-ollama.yaml</code> e extraí-los manualmente.</p>
<h2 id="Change-Milvus-Settings" class="common-anchor-header">Alterar as definições do Milvus<button data-href="#Change-Milvus-Settings" class="anchor-icon" translate="no">
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
    </button></h2><p>No ficheiro <code translate="no">settings-ollama.yaml</code>, defina a vectorstore para milvus:</p>
<pre><code translate="no" class="language-yaml">vectorstore:
  database: milvus
<button class="copy-code-btn"></button></code></pre>
<p>Também é possível adicionar algumas configurações cumstom do Milvus para especificar suas configurações, como esta:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">milvus</span>:
  <span class="hljs-attr">uri</span>: <span class="hljs-attr">http</span>:<span class="hljs-comment">//localhost:19530</span>
  <span class="hljs-attr">collection_name</span>: my_collection
<button class="copy-code-btn"></button></code></pre>
<p>As opções de configuração disponíveis são:</p>
<table>
<thead>
<tr><th>Campo Opção</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>uri</td><td>A predefinição é definida para "local_data/private_gpt/milvus/milvus_local.db" como um ficheiro local; também pode configurar um servidor Milvus com melhor desempenho no docker ou k8s, por exemplo, http://localhost:19530, como o seu uri; Para utilizar <a href="https://zilliz.com/cloud">o Zilliz Cloud</a>, ajuste o uri e o token para o <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Public Endpoint e a chave API</a> no Zilliz Cloud.</td></tr>
<tr><td>token</td><td>Emparelhar com o servidor Milvus no docker ou k8s ou com a chave api da nuvem Zilliz.</td></tr>
<tr><td>nome_da_colecção</td><td>O nome da coleção, definido por defeito como "milvus_db".</td></tr>
<tr><td>sobrescrever</td><td>Substitui os dados na coleção se existirem, definido por padrão como True.</td></tr>
</tbody>
</table>
<h2 id="Start-PrivateGPT" class="common-anchor-header">Iniciar o PrivateGPT<button data-href="#Start-PrivateGPT" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando todas as definições estiverem concluídas, pode executar o PrivateGPT com uma IU do Gradio.</p>
<pre><code translate="no" class="language-shell">PGPT_PROFILES=ollama <span class="hljs-built_in">make</span> run
<button class="copy-code-btn"></button></code></pre>
<p>A interface do utilizador estará disponível em <code translate="no">http://0.0.0.0:8001</code>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.4.x/assets/private_gpt_ui.png" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Pode brincar com a IU e fazer perguntas sobre os seus documentos.</p>
<p>Para obter mais detalhes, consulte a documentação oficial <a href="https://docs.privategpt.dev/">do PrivateGPT</a>.</p>
