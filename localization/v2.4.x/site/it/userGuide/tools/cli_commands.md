---
id: cli_commands.md
summary: Interagire con Milvus utilizzando i comandi.
title: Riferimento comandi Milvus_CLI
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Riferimento comandi Milvus_CLI<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>L'interfaccia a riga di comando (CLI) di Milvus è uno strumento a riga di comando che supporta la connessione al database, le operazioni sui dati e l'importazione e l'esportazione dei dati.</p>
<p>Questo argomento introduce tutti i comandi supportati e le opzioni corrispondenti. Sono inclusi anche alcuni esempi di riferimento.</p>
<h2 id="clear" class="common-anchor-header">Cancella<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>Cancella lo schermo.</p>
<p><h3 id="clear">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">connetti<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>Connette a Milvus.</p>
<p><h3 id="connect">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(Opzionale) Il nome dell'uri. Il valore predefinito è &quot;http://127.0.0.1:19530&quot;.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-token</td><td style="text-align:left">(Facoltativo) L'apikey del cloud zilliz o <code translate="no">username:password</code>. Il valore predefinito è Nessuno.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//127.0.0.1:19530 </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">crea Database<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea database in Milvus</p>
<p><h3 id="create-database">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente crea il database <code translate="no">testdb</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">usa database<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Usa database in Milvus</p>
<p><h3 id="use-database">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente utilizza il database <code translate="no">testdb</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">elenca database<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenco dei database in Milvus</p>
<p><h3 id="list-database">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">list databases 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente elenca i database di Milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">Elimina database<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Cancellare un database in Milvus</p>
<p><h3 id="delete-database">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> database -<span class="hljs-title function_">db</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-database</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente cancella il database <code translate="no">testdb</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">crea utente<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un utente in Milvus</p>
<p><h3 id="create-user">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-password</td><td style="text-align:left">La password dell'utente in milvus. L'impostazione predefinita è &quot;Nessuno&quot;.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nome utente</td><td style="text-align:left">Il nome utente in milvus. L'impostazione predefinita è &quot;Nessuno&quot;.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente crea l'utente <code translate="no">zilliz</code> e la password <code translate="no">zilliz</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">crea alias<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Specifica alias univoci per una raccolta.</p>
<div class="alert note">Una collezione può avere più alias. Tuttavia, un alias corrisponde al massimo a una collezione.</div>
<p><h3 id="create-alias">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A] 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-nome alias</td><td style="text-align:left">L'alias.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(Facoltativo) Flag per trasferire l'alias a una raccolta specificata.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">Esempi</h3></p>
<p><h4>Esempio 1</h4></p>
<p>L'esempio seguente crea gli alias <code translate="no">carAlias1</code> e <code translate="no">carAlias2</code> per la collezione <code translate="no">car</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>Esempio 2</h4></p>
<div class="alert note">L'esempio 2 si basa sull'esempio 1.</div>
<p>L'esempio seguente trasferisce l'alias <code translate="no">carAlias1</code> dalla raccolta <code translate="no">car</code> alla raccolta <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">crea collezione<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea una raccolta.</p>
<p><h3 id="create-collection">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzioni</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">-schema-campo</td><td style="text-align:left">(Multiplo) Lo schema del campo nel formato <code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code>.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-schema-campo primario</td><td style="text-align:left">Il nome del campo chiave primaria.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-schema-auto-id</td><td style="text-align:left">(Opzionale) Flag per generare automaticamente gli ID.</td></tr>
<tr><td style="text-align:left">-desc</td><td style="text-align:left">-schema-descrizione</td><td style="text-align:left">(Facoltativo) La descrizione della raccolta.</td></tr>
<tr><td style="text-align:left">-livello</td><td style="text-align:left">-livello di coerenza</td><td style="text-align:left">(Facoltativo) Livello di coerenza: Limitato, Sessione, Forte, Eventuale .</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-è-dinamico</td><td style="text-align:left">(Opzionale) Lo schema della collezione supporta o meno i campi dinamici.</td></tr>
<tr><td style="text-align:left">-s</td><td style="text-align:left">-shards-num</td><td style="text-align:left">(Opzionale) Numero di frammenti</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">Esempio</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">## For array field: --schema-field support &lt;fieldName&gt;:&lt;dataType&gt;:&lt;maxCapacity&gt;:&lt;elementDataType&gt;(:&lt;maxLength&gt;if Varchar)</span>

milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:ARRAY:<span class="hljs-number">64</span>:VARCHAR:<span class="hljs-number">128</span> -p <span class="hljs-built_in">id</span> -A -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">crea partizione<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea una partizione.</p>
<p><h3 id="creat-partition">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">Il nome della partizione.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-descrizione</td><td style="text-align:left">(Opzionale) La descrizione della partizione.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">crea indice<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea un indice per un campo.</p>
<div class="alert note"> Attualmente, una collezione supporta un massimo di un indice.</div>
<p><h3 id="creat-index">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">Esempio</h3></p>
<p>Per creare un indice per un campo e richiedere l'immissione dei dati richiesti:</p>
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
<h2 id="delete-user" class="common-anchor-header">elimina utente<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina un utente</p>
<h3 id="Syntax" class="common-anchor-header">Sintassi</h3><pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> user -<span class="hljs-title function_">u</span> (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-Nome utente</td><td style="text-align:left">Il nome utente.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">Esempio</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> user -u zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">elimina alias<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina un alias.</p>
<p><h3 id="delete-alias">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> alias -<span class="hljs-title function_">a</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-nome alias</td><td style="text-align:left">L'alias.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
<tr><td style="text-align:left"></td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">elimina raccolta<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina una raccolta.</p>
<p><h3 id="delete-collection">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta da eliminare.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">elimina entità<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina le entità.</p>
<p><h3 id="delete-entities">Sintassi</h3></p>
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta a cui appartengono le entità da eliminare.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale) Il nome della partizione da eliminare.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">Esempio</h3></p>
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">elimina partizione<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina una partizione.</p>
<p><h3 id="delete-partition">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta a cui appartiene la partizione da eliminare.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">Il nome della partizione da eliminare.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">elimina indice<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina un indice e i file di indice corrispondenti.</p>
<div class="alert note"> Attualmente, una collezione supporta al massimo un indice.</div>
<p><h3 id="delete-index">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">in</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-index">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-nome indice</td><td style="text-align:left">Il nome dell'indice.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="delete-index">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car -<span class="hljs-keyword">in</span> indexName
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">mostra collezione<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra le informazioni dettagliate di una collezione.</p>
<p><h3 id="show-collection">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3>Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">mostra partizione<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra le informazioni dettagliate di una partizione.</p>
<p><h3 id="show-partition">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta a cui appartiene la partizione.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">Il nome della partizione.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3>Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">mostra indice<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra le informazioni dettagliate di un indice.</p>
<p><h3 id="show-index">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-Nome dell'indice</td><td style="text-align:left">Il nome dell'indice.</td></tr>
</tbody>
</table>
<p>| --help | n/a | Visualizza la guida all'uso del comando. |</p>
<p><h3 >Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">Esci<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>Chiude la finestra della riga di comando.</p>
<p><h3 id="exit">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">Aiuto<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>Visualizza la guida all'uso di un comando.</p>
<p><h3 id="help">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Comandi</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Comando</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">Cancella</td><td style="text-align:left">Cancella lo schermo.</td></tr>
<tr><td style="text-align:left">Connetti</td><td style="text-align:left">Si collega a Milvus.</td></tr>
<tr><td style="text-align:left">creare</td><td style="text-align:left">Crea una raccolta, un database, una partizione, un utente e un indice.</td></tr>
<tr><td style="text-align:left">Cancellare</td><td style="text-align:left">Elimina raccolta, database, partizione, alias, utente o indice.</td></tr>
<tr><td style="text-align:left">Esci</td><td style="text-align:left">Chiude la finestra della riga di comando.</td></tr>
<tr><td style="text-align:left">Aiuto</td><td style="text-align:left">Visualizza la guida all'uso di un comando.</td></tr>
<tr><td style="text-align:left">Inserisci</td><td style="text-align:left">Importa i dati in una partizione.</td></tr>
<tr><td style="text-align:left">elenca</td><td style="text-align:left">Elenca collezioni, database, partizioni, utenti o indici.</td></tr>
<tr><td style="text-align:left">caricare</td><td style="text-align:left">Carica una raccolta o una partizione.</td></tr>
<tr><td style="text-align:left">query</td><td style="text-align:left">Mostra i risultati delle query che corrispondono a tutti i criteri immessi.</td></tr>
<tr><td style="text-align:left">Rilascio</td><td style="text-align:left">Rilascia una raccolta o una partizione.</td></tr>
<tr><td style="text-align:left">Ricerca</td><td style="text-align:left">Esegue una ricerca di similarità vettoriale o una ricerca ibrida.</td></tr>
<tr><td style="text-align:left">Mostra</td><td style="text-align:left">Mostra la connessione, il database, la collezione, l'avanzamento del caricamento o l'avanzamento dell'indice.</td></tr>
<tr><td style="text-align:left">rinominare</td><td style="text-align:left">Rinomina la raccolta</td></tr>
<tr><td style="text-align:left">usa</td><td style="text-align:left">Usa il database</td></tr>
<tr><td style="text-align:left">versione</td><td style="text-align:left">Mostra la versione di Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="import" class="common-anchor-header">Importazione<button data-href="#import" class="anchor-icon" translate="no">
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
    </button></h2><p>Importa i dati locali o remoti in una partizione.</p>
<p><h3 id="import">Sintassi</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -<span class="hljs-title function_">c</span> (text)[-<span class="hljs-title function_">p</span> (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta in cui vengono inseriti i dati.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale) Il nome della partizione in cui vengono inseriti i dati. Se non si passa questa opzione di partizione, si sceglie la partizione "_default".</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="import">Esempio 1</h3>
L'esempio seguente importa un file CSV locale.</p>
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
<p><h3 id="import">Esempio 2</h3>
L'esempio seguente importa un file CSV remoto.</p>
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
<h2 id="list-users" class="common-anchor-header">elenca utenti<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenca tutti gli utenti.</p>
<h3 id="Syntax" class="common-anchor-header">Sintassi</h3><pre><code translate="no" class="language-shell">list <span class="hljs-built_in">users</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><p>| Opzione | Nome completo | Descrizione | | --help | n/a | Visualizza la guida all'uso del comando. |</p>
<h2 id="list-collections" class="common-anchor-header">elenca collezioni<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenca tutte le raccolte.</p>
<p><h3 id="list-collections">Sintassi<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">Opzioni<h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzioni</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">elenca indici<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenca tutti gli indici di una collezione.</p>
<div class="alert note"> Attualmente, una collezione supporta al massimo un indice. </div>
<p><h3 id="list-indexes">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">elenca partizioni<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenca tutte le partizioni di una raccolta.</p>
<p><h3 id="list-partitions">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">Carica<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>Carica una raccolta o una partizione dal disco rigido alla RAM.</p>
<p><h3 id="load">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta a cui appartiene la partizione.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale/Multiplo) Il nome della partizione.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">query<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra i risultati della query che corrispondono a tutti i criteri immessi.</p>
<p><h3 id="query">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="query">Esempio</h3>
<h4 id="query">Esempio 1</h4></p>
<p>Per eseguire una query e ricevere un prompt per l'immissione dei dati richiesti:</p>
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
<p><h4 id="query">Esempio 2</h4></p>
<p>Per eseguire un'interrogazione e ricevere l'input richiesto:</p>
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
<h2 id="release" class="common-anchor-header">rilasciare<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>Rilascia una raccolta o una partizione dalla RAM.</p>
<p><h3 id="release">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta a cui appartiene la partizione.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale/Multiplo) Il nome della partizione.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">ricerca<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>Esegue una ricerca di similarità vettoriale o una ricerca ibrida.</p>
<p><h3 id="search">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="search">Esempi</h3>
<h4 id="search">Esempio 1</h4></p>
<p>Per eseguire una ricerca su un file csv e richiedere i dati richiesti:</p>
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
<p><h4 id="search">Esempio 2</h4></p>
<p>Per eseguire una ricerca su una raccolta indicizzata e richiedere i dati richiesti:</p>
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
<p><h4 id="search">Esempio 3</h4></p>
<p>Per eseguire una ricerca su una raccolta non indicizzata e ricevere l'input richiesto:</p>
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
<h2 id="list-connection" class="common-anchor-header">elenco connessioni<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>Elencare le connessioni.</p>
<p><h3 id="show-connection">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">list connections 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
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
    </button></h2><p>Mostra l'avanzamento dell'indicizzazione delle entità.</p>
<p><h3 id="show-index-progress">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della collezione</td><td style="text-align:left">Il nome della collezione a cui appartengono le entità.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-indice</td><td style="text-align:left">(Opzionale) Il nome dell'indice.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">mostra avanzamento_caricamento<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>Visualizza l'avanzamento del caricamento di una raccolta.</p>
<p><h3 id="show-loading-progress">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della collezione</td><td style="text-align:left">Il nome della collezione a cui appartengono le entità.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale/Multiplo) Il nome della partizione di caricamento.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">versione<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Mostra la versione di Milvus_CLI.</p>
<p><h3 id="version">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<div class="alert note"> È anche possibile verificare la versione di Milvus_CLI in una shell, come mostrato nell'esempio seguente. In questo caso, <code translate="no">milvus_cli --version</code> funge da comando.</div>
<p><h3 id="version">Esempio</h3></p>
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
