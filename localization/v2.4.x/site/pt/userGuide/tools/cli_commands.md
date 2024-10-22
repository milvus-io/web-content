---
id: cli_commands.md
summary: Interagir com Milvus através de comandos.
title: Referência do Comando Milvus_CLI
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Referência do Comando Milvus_CLI<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus Command-Line Interface (CLI) é uma ferramenta de linha de comandos que suporta a ligação à base de dados, operações de dados e importação e exportação de dados.</p>
<p>Este tópico apresenta todos os comandos suportados e as opções correspondentes. Alguns exemplos também estão incluídos para sua referência.</p>
<h2 id="clear" class="common-anchor-header">limpar<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>Limpa o ecrã.</p>
<p><h3 id="clear">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">ligar<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>Liga-se ao Milvus.</p>
<p><h3 id="connect">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(Opcional) O nome do uri. A predefinição é &quot;http://127.0.0.1:19530&quot;.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-token</td><td style="text-align:left">(Opcional) O apikey do zilliz cloud ou <code translate="no">username:password</code>. A predefinição é None (Nenhum).</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//127.0.0.1:19530 </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">criar base de dados<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Criar base de dados no Milvus</p>
<p><h3 id="create-database">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Obrigatório] O nome da base de dados em milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Exemplos</h3><h4 id="Example-1" class="common-anchor-header">Exemplo 1</h4><p>O exemplo seguinte cria a base de dados <code translate="no">testdb</code> em milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">usar base de dados<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizar base de dados em Milvus</p>
<p><h3 id="use-database">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Obrigatório] O nome da base de dados em milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Exemplos</h3><h4 id="Example-1" class="common-anchor-header">Exemplo 1</h4><p>O exemplo seguinte utiliza a base de dados <code translate="no">testdb</code> em milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">listar bases de dados<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Listar bases de dados em Milvus</p>
<p><h3 id="list-database">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">list databases 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">Exemplos</h3><h4 id="Example-1" class="common-anchor-header">Exemplo 1</h4><p>O exemplo seguinte lista as bases de dados em milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">apagar base de dados<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Eliminar base de dados em Milvus</p>
<p><h3 id="delete-database">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> database -<span class="hljs-title function_">db</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Obrigatório] O nome da base de dados em milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Exemplos</h3><h4 id="Example-1" class="common-anchor-header">Exemplo 1</h4><p>O exemplo seguinte elimina a base de dados <code translate="no">testdb</code> em milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">criar utilizador<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Criar utilizador em Milvus</p>
<p><h3 id="create-user">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-senha</td><td style="text-align:left">A palavra-passe do utilizador em milvus. A predefinição é &quot;Nenhum&quot;.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nome de utilizador</td><td style="text-align:left">O nome de utilizador em milvus. A predefinição é &quot;None&quot;.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Exemplos</h3><h4 id="Example-1" class="common-anchor-header">Exemplo 1</h4><p>O exemplo seguinte cria o utilizador <code translate="no">zilliz</code> e a palavra-passe <code translate="no">zilliz</code> em milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">criar alias<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Especifica aliases únicos para uma coleção.</p>
<div class="alert note">Uma coleção pode ter vários aliases. No entanto, um alias corresponde a um máximo de uma coleção.</div>
<p><h3 id="create-alias">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A] 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-alias-nome</td><td style="text-align:left">O pseudónimo.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(Opcional) Sinalizador para transferir o alias para uma coleção especificada.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">Exemplos</h3></p>
<p><h4>Exemplo 1</h4></p>
<p>O exemplo a seguir cria os aliases <code translate="no">carAlias1</code> e <code translate="no">carAlias2</code> para a coleção <code translate="no">car</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>Exemplo 2</h4></p>
<div class="alert note">O Exemplo 2 é baseado no Exemplo 1.</div>
<p>O exemplo a seguir transfere o alias <code translate="no">carAlias1</code> da coleção <code translate="no">car</code> para a coleção <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">criar coleção<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Cria uma coleção.</p>
<p><h3 id="create-collection">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">-schema-campo</td><td style="text-align:left">(Múltiplo) O esquema do campo no formato <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code>.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-schema-primary-field</td><td style="text-align:left">O nome do campo de chave primária.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-schema-auto-id</td><td style="text-align:left">(Opcional) Sinalizador para gerar IDs automaticamente.</td></tr>
<tr><td style="text-align:left">-desc</td><td style="text-align:left">-schema-description</td><td style="text-align:left">(Opcional) A descrição da coleção.</td></tr>
<tr><td style="text-align:left">-level</td><td style="text-align:left">-consistency-level</td><td style="text-align:left">(Opcional) Nível de consistência: Bounded,Session,Strong, Eventual .</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-is-dynamic</td><td style="text-align:left">(Opcional) O esquema de coleção suporta ou não campos dinâmicos.</td></tr>
<tr><td style="text-align:left">-s</td><td style="text-align:left">-shards-num</td><td style="text-align:left">(Opcional) Número de fragmentos</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">Exemplo</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">## For array field: --schema-field support &lt;fieldName&gt;:&lt;dataType&gt;:&lt;maxCapacity&gt;:&lt;elementDataType&gt;(:&lt;maxLength&gt;if Varchar)</span>

milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:ARRAY:<span class="hljs-number">64</span>:VARCHAR:<span class="hljs-number">128</span> -p <span class="hljs-built_in">id</span> -A -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">criar partição<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Cria uma partição.</p>
<p><h3 id="creat-partition">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">O nome da partição.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-descrição</td><td style="text-align:left">(Opcional) A descrição da partição.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">criar índice<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Cria um índice para um campo.</p>
<div class="alert note"> Atualmente, uma coleção suporta um máximo de um índice.</div>
<p><h3 id="creat-index">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">Exemplo</h3></p>
<p>Para criar um índice para um campo e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2

The name of the field to create an index <span class="hljs-keyword">for</span> (vector): vector

Index name: vectorIndex

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index <span class="hljs-built_in">type</span> FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SPARSE_WAND, SCANN, STL_SORT, Trie, INVERTED, ) []: IVF_FLAT  

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index metric <span class="hljs-built_in">type</span> (L2, IP, HAMMING, TANIMOTO, COSINE, ) []: 

Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">delete user<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina um utilizador</p>
<h3 id="Syntax" class="common-anchor-header">Sintaxe</h3><pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> user -<span class="hljs-title function_">u</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nome de utilizador</td><td style="text-align:left">O nome de utilizador.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">Exemplo</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> user -u zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">delete alias<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina um alias.</p>
<p><h3 id="delete-alias">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> alias -<span class="hljs-title function_">a</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-alias-nome</td><td style="text-align:left">O pseudónimo.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
<tr><td style="text-align:left"></td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">delete collection<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina uma coleção.</p>
<p><h3 id="delete-collection">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a ser eliminada.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">delete entities<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina entidades.</p>
<p><h3 id="delete-entities">Sintaxe</h3></p>
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que pertencem as entidades a eliminar.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">(Opcional) O nome da partição a ser eliminada.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">Exemplo</h3></p>
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">delete partição<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina uma partição.</p>
<p><h3 id="delete-partition">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que pertence a partição a ser eliminada.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">O nome da partição a ser eliminada.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">delete index<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina um índice e os ficheiros de índice correspondentes.</p>
<div class="alert note"> Atualmente, uma coleção suporta um máximo de um índice.</div>
<p><h3 id="delete-index">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">in</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-index">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-nome-do-índice</td><td style="text-align:left">O nome do nome do índice.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-index">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car -<span class="hljs-keyword">in</span> indexName
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">mostrar coleção<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra as informações detalhadas de uma coleção.</p>
<p><h3 id="show-collection">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3>Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">mostrar partição<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra as informações detalhadas de uma partição.</p>
<p><h3 id="show-partition">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que a partição pertence.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">O nome da partição.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3>Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">mostrar índice<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra as informações detalhadas de um índice.</p>
<p><h3 id="show-index">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-nome do índice</td><td style="text-align:left">O nome do índice.</td></tr>
</tbody>
</table>
<p>| --help | n/a | Exibe ajuda para usar o comando. |</p>
<p><h3 >Exemplo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">exit<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>Fecha a janela da linha de comando.</p>
<p><h3 id="exit">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">help<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>Apresenta ajuda para a utilização de um comando.</p>
<p><h3 id="help">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Comandos</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Comando</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">Limpar</td><td style="text-align:left">Limpa o ecrã.</td></tr>
<tr><td style="text-align:left">ligar</td><td style="text-align:left">Liga-se ao Milvus.</td></tr>
<tr><td style="text-align:left">criar</td><td style="text-align:left">Cria uma coleção, uma base de dados, uma partição, um utilizador e um índice.</td></tr>
<tr><td style="text-align:left">apagar</td><td style="text-align:left">Elimina uma coleção, uma base de dados, uma partição, um alias, um utilizador ou um índice.</td></tr>
<tr><td style="text-align:left">sair</td><td style="text-align:left">Fecha a janela da linha de comando.</td></tr>
<tr><td style="text-align:left">ajuda</td><td style="text-align:left">Apresenta ajuda para a utilização de um comando.</td></tr>
<tr><td style="text-align:left">insert</td><td style="text-align:left">Importa dados para uma partição.</td></tr>
<tr><td style="text-align:left">listar</td><td style="text-align:left">Lista colecções, bases de dados, partições, utilizadores ou índices.</td></tr>
<tr><td style="text-align:left">carregar</td><td style="text-align:left">Carrega uma coleção ou partição.</td></tr>
<tr><td style="text-align:left">consulta</td><td style="text-align:left">Mostra os resultados da consulta que correspondem a todos os critérios introduzidos.</td></tr>
<tr><td style="text-align:left">liberar</td><td style="text-align:left">Libera uma coleção ou partição.</td></tr>
<tr><td style="text-align:left">pesquisa</td><td style="text-align:left">Executa uma pesquisa de similaridade de vetor ou uma pesquisa híbrida.</td></tr>
<tr><td style="text-align:left">mostrar</td><td style="text-align:left">Mostra conexão, banco de dados, coleção, loading_progress ou index_progress.</td></tr>
<tr><td style="text-align:left">renomear</td><td style="text-align:left">Renomeia a coleção</td></tr>
<tr><td style="text-align:left">usar</td><td style="text-align:left">Usa a base de dados</td></tr>
<tr><td style="text-align:left">versão</td><td style="text-align:left">Mostra a versão do Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="import" class="common-anchor-header">importar<button data-href="#import" class="anchor-icon" translate="no">
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
    </button></h2><p>Importa dados locais ou remotos para uma partição.</p>
<p><h3 id="import">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -<span class="hljs-title function_">c</span> (text)[-<span class="hljs-title function_">p</span> (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção em que os dados são inseridos.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">(Opcional) O nome da partição na qual os dados são inseridos. Não passar esta opção de partição indica a escolha da partição "_default".</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="import">Exemplo 1</h3>
O exemplo seguinte importa um ficheiro CSV local.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">import</span> -c car <span class="hljs-string">&#x27;examples/import_csv/vectors.csv&#x27;</span>

Reading csv file...  [<span class="hljs-comment">####################################]  100%</span>

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed <span class="hljs-number">50001</span> lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   <span class="hljs-number">50000</span>
Total collection entities:              <span class="hljs-number">150000</span>
Milvus timestamp:           <span class="hljs-number">428849214449254403</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Exemplo 2</h3>
O exemplo seguinte importa um ficheiro CSV remoto.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; import -c car <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;</span>

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">listar utilizadores<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Lista todos os utilizadores.</p>
<h3 id="Syntax" class="common-anchor-header">Sintaxe</h3><pre><code translate="no" class="language-shell">list <span class="hljs-built_in">users</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opções</h3><p>| Opção | Nome completo | Descrição | --help | n/a | Exibe ajuda para usar o comando. |</p>
<h2 id="list-collections" class="common-anchor-header">listar coleções<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Lista todas as coleções.</p>
<p><h3 id="list-collections">Sintaxe<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">Opções<h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">listar índices<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Lista todos os índices de uma coleção.</p>
<div class="alert note"> Atualmente, uma coleção suporta um máximo de um índice. </div>
<p><h3 id="list-indexes">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">listar partições<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Lista todas as partições de uma coleção.</p>
<p><h3 id="list-partitions">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">load<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>Carrega uma coleção ou partição do espaço do disco rígido para a RAM.</p>
<p><h3 id="load">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que a partição pertence.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">(Opcional/Múltiplo) O nome da partição.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">consulta<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra os resultados da consulta que correspondem a todos os critérios introduzidos.</p>
<p><h3 id="query">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="query">Exemplo</h3>
<h4 id="query">Exemplo 1</h4></p>
<p>Para efetuar uma consulta e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id <span class="hljs-keyword">in</span> [ <span class="hljs-number">428960801420883491</span>, <span class="hljs-number">428960801420883492</span>,
<span class="hljs-number">428960801420883493</span> ]

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="query">Exemplo 2</h4></p>
<p>Para efetuar uma consulta e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">428960801420883491</span>

Name of partitions that contain entities(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []:
default

A <span class="hljs-built_in">list</span> of fields to <span class="hljs-keyword">return</span>(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []: <span class="hljs-built_in">id</span>, color,
brand

timeout []:

Guarantee timestamp. This instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date. [<span class="hljs-number">0</span>]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-built_in">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s by default <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span>. [<span class="hljs-number">5</span>]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">libertação<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>Liberta uma coleção ou partição da RAM.</p>
<p><h3 id="release">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção à qual a partição pertence.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">(Opcional/Múltiplo) O nome da partição.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">pesquisa<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>Executa uma pesquisa de similaridade de vetor ou uma pesquisa híbrida.</p>
<p><h3 id="search">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<p><h3 id="search">Exemplos</h3>
<h4 id="search">Exemplo 1</h4></p>
<p>Para efetuar uma pesquisa num ficheiro csv e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file
<span class="hljs-keyword">out</span> headers): examples/import_csv/search_vectors.csv

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Exemplo 2</h4></p>
<p>Para efetuar uma pesquisa numa coleção indexada e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers):
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The specified number of <span class="hljs-built_in">decimal</span> places of returned distance [-1]: 5

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">Exemplo 3</h4></p>
<p>Para efetuar uma pesquisa numa coleção não indexada e ser solicitado a introduzir os dados necessários:</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, car2): car

The vectors of search data(the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: <span class="hljs-number">5</span>

The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">2</span>

The boolean expression used to <span class="hljs-built_in">filter</span> attribute []:

The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []:

timeout []:

Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]:

<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connection" class="common-anchor-header">listar ligações<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Listar ligações.</p>
<p><h3 id="show-connection">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">list connections 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">show index_progress<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra o progresso da indexação de entidades.</p>
<p><h3 id="show-index-progress">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que as entidades pertencem.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-index</td><td style="text-align:left">(Opcional) O nome do índice.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">show loading_progress<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Apresenta o progresso do carregamento de uma coleção.</p>
<p><h3 id="show-loading-progress">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-nome da coleção</td><td style="text-align:left">O nome da coleção a que as entidades pertencem.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partição</td><td style="text-align:left">(Opcional/Múltiplo) O nome da partição de carregamento.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta ajuda para utilizar o comando.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">version<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra a versão do Milvus_CLI.</p>
<p><h3 id="version">Sintaxe</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">Opções</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opção</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrição</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Apresenta a ajuda para a utilização do comando.</td></tr>
</tbody>
</table>
<div class="alert note"> Também é possível verificar a versão do Milvus_CLI num shell, como mostrado no exemplo a seguir. Neste caso, <code translate="no">milvus_cli --version</code> actua como um comando.</div>
<p><h3 id="version">Exemplo</h3></p>
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
