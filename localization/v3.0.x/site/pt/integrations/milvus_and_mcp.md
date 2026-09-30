---
id: milvus_and_mcp.md
summary: >-
  Este tutorial orienta-o na configuração de um servidor MCP para o Milvus,
  permitindo que as aplicações de IA efectuem pesquisas vectoriais, gerem
  colecções e recuperem dados utilizando comandos de linguagem natural - sem
  escrever consultas de bases de dados personalizadas.
title: 'MCP + Milvus: Ligar a IA às bases de dados vectoriais'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: Ligar a IA às bases de dados vectoriais<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Introdução<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>O <strong>Protocolo de contexto de modelo (MCP)</strong> é um protocolo aberto que permite que aplicativos de IA, como Claude e Cursor, interajam com fontes de dados e ferramentas externas sem problemas. Quer você esteja criando aplicativos de IA personalizados, integrando fluxos de trabalho de IA ou aprimorando interfaces de bate-papo, o MCP fornece uma maneira padronizada de conectar modelos de linguagem grandes (LLMs) com dados contextuais relevantes.</p>
<p>Este tutorial orienta você na <strong>configuração de um servidor MCP para o Milvus</strong>, permitindo que os aplicativos de IA executem pesquisas vetoriais, gerenciem coleções e recuperem dados usando <strong>comandos de linguagem natural - sem</strong>escrever consultas de banco de dados personalizadas.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de configurar o servidor MCP, verifique se você tem:</p>
<ul>
<li>Python 3.10 ou superior</li>
<li>Uma instância <a href="https://milvus.io/">do Milvus</a> em execução</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (recomendado para executar o servidor)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Como começar<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>A forma recomendada de usar este servidor MCP é executá-lo diretamente com uv sem instalação. É assim que o Claude Desktop e o Cursor são configurados para o utilizar nos exemplos abaixo.</p>
<p>Se você quiser clonar o repositório:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Então pode executar o servidor diretamente:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Aplicações suportadas<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Este servidor MCP pode ser utilizado com várias aplicações de IA que suportam o Protocolo de contexto de modelo, tais como:</p>
<ul>
<li><strong>Claude Desktop</strong>: A aplicação de ambiente de trabalho do Anthropic para o Claude</li>
<li><strong>Cursor</strong>: Editor de código alimentado por IA com suporte MCP em seu recurso Composer</li>
<li><strong>Outros clientes MCP personalizados</strong> Qualquer aplicação que implemente a especificação de cliente MCP</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Usando a MCP com o Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Instalar <a href="https://claude.ai/download">o Claude Desktop</a>.</li>
<li>Abra o arquivo de configuração do Claude:<ul>
<li>No macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Adicione a seguinte configuração:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Reinicie o Claude Desktop para aplicar as alterações.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Usando o MCP com o Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">O Cursor</a> também oferece suporte a ferramentas MCP por meio do recurso Agente no Composer. Pode adicionar o servidor Milvus MCP ao Cursor de duas formas:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Opção 1: Utilizar a IU de definições do Cursor<button data-href="#Option-1-Using-Cursor-Settings-UI" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Abra <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Clique em <code translate="no">+ Add New MCP Server</code>.</li>
<li>Preencher:<ul>
<li>Type (Tipo): <code translate="no">stdio</code></li>
<li>Nome: <code translate="no">milvus</code></li>
<li>Comando:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Dica: Use <code translate="no">127.0.0.1</code> em vez de <code translate="no">localhost</code> para evitar possíveis problemas de resolução de DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Opção 2: Usar a configuração específica do projeto (recomendado)<button data-href="#Option-2-Using-Project-specific-Configuration-Recommended" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Crie um ficheiro <code translate="no">.cursor/mcp.json</code> no <strong>diretório raiz do</strong> seu <strong>projeto</strong>:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Reinicie o Cursor para aplicar a configuração.</li>
</ol>
<p>Depois de adicionar o servidor, pode ser necessário pressionar o botão atualizar nas configurações do MCP para preencher a lista de ferramentas. O Agente de composição utilizará automaticamente as ferramentas Milvus quando for relevante para as suas consultas.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Verificação da integração<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Para garantir que o servidor MCP está corretamente configurado:</p>
<h3 id="For-Cursor" class="common-anchor-header">Para o Cursor<button data-href="#For-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>Aceda a <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Confirmar que <code translate="no">&quot;Milvus&quot;</code> aparece na lista dos servidores CIM.</li>
<li>Verificar se as ferramentas Milvus (por exemplo, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) estão listadas.</li>
<li>Se aparecerem erros, consulte a secção <strong>Resolução de problemas</strong> abaixo.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Ferramentas do servidor MCP para Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Este servidor MCP fornece várias ferramentas para <strong>pesquisar, consultar e gerir dados vectoriais em Milvus</strong>. Para obter mais detalhes, consulte a documentação <a href="https://github.com/zilliztech/mcp-server-milvus">do mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Ferramentas de pesquisa e consulta<button data-href="#🔍-Search-and-Query-Tools" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Pesquisa de documentos utilizando a pesquisa de texto completo.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Realizar pesquisa de similaridade de vetores em uma coleção.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Efetuar uma pesquisa híbrida que combine a similaridade vetorial e a filtragem de atributos.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Realizar pesquisa de similaridade vetorial com múltiplos vetores de consulta.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Consulta de colecções utilizando expressões de filtragem.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Contar entidades em uma coleção.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Gestão de colecções<button data-href="#📁-Collection-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Listar todas as colecções na base de dados.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Obter informação detalhada sobre uma coleção.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Obter estatísticas sobre uma coleção.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Criar uma nova coleção com o esquema especificado.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Carregar uma coleção na memória para pesquisa e consulta.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Libertar uma coleção da memória.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Obter informação sobre segmentos de consulta.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Obter o progresso do carregamento de uma coleção.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">📊 Operações de Dados<button data-href="#📊-Data-Operations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Inserir dados numa coleção.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Inserir dados em lotes para um melhor desempenho.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Inserir dados numa coleção (inserir ou atualizar se existir).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Eliminar entidades de uma coleção com base numa expressão de filtro.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Adicionar um campo dinâmico a uma coleção existente.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Gestão de índices<button data-href="#⚙️-Index-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Criar um índice sobre um campo vetorial.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Obter informações sobre índices em uma coleção.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Variáveis de ambiente<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI do servidor Milvus (pode ser definido em vez de <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Token de autenticação opcional.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Nome da base de dados (a predefinição é "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Desenvolvimento<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Para executar o servidor diretamente:</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Exemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Usando o Claude Desktop<button data-href="#Using-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Exemplo 1: Listagem de colecções</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>O Claude irá então usar o MCP para verificar esta informação na nossa base de dados Milvus.</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Exemplo 2: Pesquisa de documentos</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>O Claude utilizará as capacidades de pesquisa de texto integral do Milvus para encontrar documentos relevantes:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Utilizar o Cursor<button data-href="#Using-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Exemplo: Criar uma coleção</h4><p>No Compositor do Cursor, pode perguntar:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>O Cursor irá utilizar o servidor MCP para executar esta operação:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Resolução de problemas<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Problemas comuns<button data-href="#Common-Issues" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Connection-Errors" class="common-anchor-header">Erros de ligação</h4><p>Se você vir erros como "Falha ao conectar ao servidor Milvus":</p>
<ol>
<li>Verifique se a sua instância do Milvus está em execução: <code translate="no">docker ps</code> (se estiver a utilizar o Docker)</li>
<li>Verifique se o URI está correto na sua configuração</li>
<li>Certifique-se de que não existem regras de firewall a bloquear a ligação</li>
<li>Tente usar <code translate="no">127.0.0.1</code> em vez de <code translate="no">localhost</code> no URI</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Problemas de autenticação</h4><p>Se você vir erros de autenticação:</p>
<ol>
<li>Verifique se o seu <code translate="no">MILVUS_TOKEN</code> está correto</li>
<li>Verifique se a sua instância Milvus requer autenticação</li>
<li>Certifique-se de que tem as permissões corretas para as operações que está a tentar executar</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Ferramenta não encontrada</h4><p>Se as ferramentas MCP não aparecerem no Claude Desktop ou no Cursor:</p>
<ol>
<li>Reinicie a aplicação</li>
<li>Verifique se há erros nos logs do servidor</li>
<li>Verifique se o servidor MCP está sendo executado corretamente</li>
<li>Pressione o botão de atualização nas configurações do MCP (para o Cursor)</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Obter ajuda<button data-href="#Getting-Help" class="anchor-icon" translate="no">
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
    </button></h3><p>Se você continuar a ter problemas:</p>
<ol>
<li>Verifique os <a href="https://github.com/zilliztech/mcp-server-milvus/issues">Problemas do GitHub</a> para problemas semelhantes</li>
<li>Junte-se ao <a href="https://discord.gg/zilliz">Discord da Comunidade Zilliz</a> para obter suporte</li>
<li>Arquivar um novo problema com informações detalhadas sobre o seu problema</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Conclusão<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Ao seguir este tutorial, tem agora um <strong>servidor MCP</strong> em execução, permitindo a pesquisa vetorial alimentada por IA em Milvus. Quer esteja a utilizar o <strong>Claude Desktop</strong> ou <strong>o Cursor</strong>, pode agora consultar, gerir e pesquisar a sua base de dados Milvus utilizando <strong>comandos de linguagem natural - sem</strong>escrever código de base de dados!</p>
