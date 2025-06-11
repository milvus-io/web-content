---
id: NLWeb_with_milvus.md
summary: >-
  Saiba como integrar o Microsoft NLWeb com o Milvus para criar poderosas
  interfaces de linguagem natural para sites. Este tutorial demonstra como tirar
  partido das capacidades da base de dados vetorial do Milvus para uma pesquisa
  semântica eficiente, armazenamento de incorporação e recuperação de contexto
  em aplicações NLWeb.
title: Utilizar o NLWeb com o Milvus
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">Utilizar o NLWeb com o Milvus<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">O NLWeb da Microsoft</a> é uma estrutura proposta que permite interfaces de linguagem natural para sítios Web, utilizando <a href="https://schema.org/">Schema.org</a>, formatos como RSS e o protocolo MCP emergente.</p>
<p><a href="https://milvus.io/">O Milvus</a> é suportado como um backend de base de dados vetorial no NLWeb para armazenamento incorporado e pesquisa eficiente de semelhanças vectoriais, permitindo uma poderosa recuperação de contexto para aplicações de processamento de linguagem natural.</p>
<blockquote>
<p>Esta documentação é baseada principalmente na documentação oficial de <a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">início rápido</a>. Se encontrar algum conteúdo desatualizado ou inconsistente, dê prioridade à documentação oficial e sinta-se à vontade para nos colocar uma questão.</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">Utilização<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>O NLWeb pode ser configurado para usar o Milvus como motor de recuperação. Segue-se um guia sobre como configurar e utilizar o NLWeb com o Milvus.</p>
<h3 id="Installation" class="common-anchor-header">Instalação</h3><p>Clone o repositório e configure o seu ambiente:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">Configurar o Milvus</h3><p>Para utilizar <strong>o Milvus</strong>, actualize a sua configuração.</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">Atualizar os ficheiros de configuração em <code translate="no">code/config</code></h4><p>Abra o arquivo <code translate="no">config_retrieval.yaml</code> e adicione a configuração do Milvus:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">Carregando dados</h3><p>Uma vez configurado, carregue o seu conteúdo utilizando feeds RSS.</p>
<p>A partir do diretório <code translate="no">code</code>:</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>Isto irá ingerir o conteúdo na sua coleção Milvus, armazenando tanto os dados de texto como os embeddings vectoriais.</p>
<h3 id="Running-the-Server" class="common-anchor-header">Executar o servidor</h3><p>Para iniciar o NLWeb, a partir do diretório <code translate="no">code</code>, execute:</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>Pode agora consultar o seu conteúdo através de linguagem natural utilizando a interface Web em http://localhost:8000/ ou diretamente através da API REST compatível com MCP.</p>
<h2 id="Further-Reading" class="common-anchor-header">Leitura adicional<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="https://milvus.io/docs">Documentação do Milvus</a></li>
<li><a href="https://github.com/microsoft/NLWeb">Fonte NLWeb</a></li>
<li>Vida de uma consulta de chat</li>
<li>Modificando o comportamento ao alterar os prompts</li>
<li>Modificar o fluxo de controlo</li>
<li>Modificar a interface do utilizador</li>
</ul>
