---
id: use_milvus_in_docsgpt.md
summary: >-
  Neste tutorial, vamos mostrar-lhe como utilizar o Milvus como base de dados de
  vectores backend para o DocsGPT.
title: Utilizar o Milvus no DocsGPT
---
<h1 id="Use-Milvus-in-DocsGPT" class="common-anchor-header">Utilizar o Milvus no DocsGPT<button data-href="#Use-Milvus-in-DocsGPT" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/arc53/DocsGPT">O DocsGPT</a> é uma solução avançada de código aberto que simplifica a procura de informações na documentação do projeto através da integração de poderosos modelos GPT. Permite que os programadores obtenham facilmente respostas precisas às suas perguntas sobre um projeto, eliminando as demoradas pesquisas manuais.</p>
<p>Neste tutorial, vamos mostrar-lhe como utilizar o Milvus como base de dados vetorial backend para o DocsGPT.</p>
<div class="alert note">
<p>Este tutorial tem como principal referência o guia de instalação oficial <a href="https://github.com/arc53/DocsGPT?tab=readme-ov-file#quickstart">do DocsGPT</a>. Se achar que este tutorial tem partes desactualizadas, pode dar prioridade ao seguimento do guia oficial e criar uma questão para nós.</p>
</div>
<h2 id="Requirements" class="common-anchor-header">Requisitos<button data-href="#Requirements" class="anchor-icon" translate="no">
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
    </button></h2><p>Certifique-se de que tem <a href="https://docs.docker.com/engine/install/">o Docker</a> instalado</p>
<h2 id="Clone-the-repository" class="common-anchor-header">Clonar o repositório<button data-href="#Clone-the-repository" class="anchor-icon" translate="no">
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
    </button></h2><p>Clone o repositório e navegue até ele:</p>
<pre><code translate="no" class="language-shell">$ git <span class="hljs-built_in">clone</span> https://github.com/arc53/DocsGPT.git
$ <span class="hljs-built_in">cd</span> DocsGPT
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-dependency" class="common-anchor-header">Adicionar dependência<button data-href="#Add-dependency" class="anchor-icon" translate="no">
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
    </button></h2><p>Acrescente a dependência <code translate="no">langchain-milvus</code> ao ficheiro <code translate="no">requirements.txt</code> na pasta <code translate="no">application</code>:</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">echo</span> <span class="hljs-string">&quot;\nlangchain-milvus==0.1.6&quot;</span> &gt;&gt; ./application/requirements.txt
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-environment-variables" class="common-anchor-header">Definir variáveis de ambiente<button data-href="#Set-environment-variables" class="anchor-icon" translate="no">
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
    </button></h2><p>Adicione <code translate="no">VECTOR_STORE=milvus</code>, <code translate="no">MILVUS_URI=...</code>, <code translate="no">MILVUS_TOKEN=...</code> às variáveis de ambiente para os serviços <code translate="no">backend</code> e <code translate="no">worker</code> no arquivo <code translate="no">docker-compose.yaml</code>, da seguinte forma:</p>
<pre><code translate="no" class="language-yaml">  backend:
    build: ./application
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-yaml">  worker:
    build: ./application
    <span class="hljs-built_in">command</span>: celery -A application.app.celery worker -l INFO -B
    environment:
      - VECTOR_STORE=milvus
      - MILVUS_URI=...
      - MILVUS_TOKEN=...
<button class="copy-code-btn"></button></code></pre>
<p>Para os serviços <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code>, pode utilizar o serviço <a href="https://zilliz.com/cloud">Zilliz Cloud</a>(recomendado) totalmente gerido ou o serviço Milvus iniciado manualmente.</p>
<ul>
<li><p>Para o serviço Zillz Cloud totalmente gerido: Recomendamos a utilização do serviço Zilliz Cloud. Pode registar-se para obter uma conta de avaliação gratuita no <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. Depois disso, receberá os endereços <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code>, que correspondem ao <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">Ponto de Extremidade Público e</a> à <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">chave API</a>.</p></li>
<li><p>Para o serviço Milvus iniciado manualmente: Se pretender configurar um serviço Milvus, pode seguir a <a href="https://milvus.io/docs/install_standalone-docker-compose.md">documentação oficial do Milvus</a> para configurar um servidor Milvus e, em seguida, obter <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> do servidor. Os endereços <code translate="no">MILVUS_URI</code> e <code translate="no">MILVUS_TOKEN</code> devem estar no formato <code translate="no">http://&lt;your_server_ip&gt;:19530</code> e <code translate="no">&lt;your_username&gt;:&lt;your_password&gt;</code>, respetivamente.</p></li>
</ul>
<h2 id="Start-the-services" class="common-anchor-header">Iniciar os serviços<button data-href="#Start-the-services" class="anchor-icon" translate="no">
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
    </button></h2><p>Executar: <code translate="no">./setup.sh</code></p>
<p>Em seguida, navegue para http://localhost:5173/.</p>
<p>Pode brincar com a interface do utilizador e fazer perguntas sobre os seus documentos.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/doscgpt_ui.png" alt="alt text" class="doc-image" id="alt-text" />
   </span> <span class="img-wrapper"> <span>texto alternativo</span> </span></p>
<p>Se pretender parar os serviços, execute:</p>
<pre><code translate="no" class="language-shell">$ docker compose down
<button class="copy-code-btn"></button></code></pre>
<p>Para obter mais detalhes e configurações mais avançadas, consulte a documentação oficial <a href="https://github.com/arc53/DocsGPT">do DocsGPT</a>.</p>
