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
<h2 id="Command-Groups" class="common-anchor-header">Gruppi di comandi<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>I comandi della Milvus CLI sono organizzati nei seguenti gruppi:</p>
<ul>
<li><code translate="no">create</code>: Creare una raccolta, un database, una partizione, un utente, un ruolo o un indice.</li>
<li><code translate="no">delete</code>: Eliminazione di raccolte, database, partizioni, alias, utenti, ruoli o indici.</li>
<li><code translate="no">list</code>: Elencare raccolte, database, partizioni, utenti, ruoli, sovvenzioni o indici.</li>
<li><code translate="no">show</code>: Mostrare la connessione, il database, la raccolta, l'avanzamento del caricamento o l'avanzamento dell'indice.</li>
<li><code translate="no">grant</code>: Concedere un ruolo o un privilegio</li>
<li><code translate="no">revoke</code>: Revocare un ruolo o un privilegio</li>
<li><code translate="no">load</code>: Caricare la raccolta o la partizione</li>
<li><code translate="no">release</code>: Rilasciare la raccolta o la partizione</li>
<li><code translate="no">use</code>: Utilizzare il database</li>
<li><code translate="no">rename</code>: Rinominare la raccolta</li>
<li><code translate="no">insert</code>: Inserire entità (file o riga)</li>
</ul>
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
    </button></h2><p>Cancella la schermata.</p>
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
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(Opzionale) Il nome dell'uri. Il valore predefinito è "http://127.0.0.1:19530".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-token</td><td style="text-align:left">(Facoltativo) L'apikey del cloud zilliz o <code translate="no">username:password</code>. Il valore predefinito è Nessuno.</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(Facoltativo) Imposta la modalità TLS: 0 (Nessuna crittografia), 1 (Crittografia unidirezionale), 2 (Crittografia bidirezionale non ancora supportata). L'impostazione predefinita è 0</td></tr>
<tr><td style="text-align:left">-cert</td><td style="text-align:left">-cert</td><td style="text-align:left">(Facoltativo) Percorso del file del certificato del client. Lavora con la crittografia unidirezionale</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="connect">Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">crea database<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Creare un database in Milvus</p>
<p><h3 id="create-database">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-nome_db</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
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
<tr><td style="text-align:left">-db</td><td style="text-align:left">-nome_db</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
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
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-nome_db</td><td style="text-align:left">[Il nome del database in milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente cancella il database <code translate="no">testdb</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
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
<tr><td style="text-align:left">-p</td><td style="text-align:left">-password</td><td style="text-align:left">La password dell'utente in milvus. L'impostazione predefinita è "Nessuno".</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nome utente</td><td style="text-align:left">Il nome utente in milvus. L'impostazione predefinita è "Nessuno".</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente crea l'utente <code translate="no">zilliz</code> e la password <code translate="no">zilliz</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">crea ruolo<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Crea ruolo in Milvus</p>
<p><h3 id="create-role">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-NomeRuolo</td><td style="text-align:left">Il nome del ruolo di milvus.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><h4 id="Example-1" class="common-anchor-header">Esempio 1</h4><p>L'esempio seguente crea il ruolo <code translate="no">role1</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
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
    </button></h2><p>Specifica gli alias univoci per una collezione.</p>
<div class="alert note">Una collezione può avere più alias. Tuttavia, un alias corrisponde al massimo a una collezione.</div>
<p><h3 id="create-alias">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>Esempio 2</h4></p>
<div class="alert note">L'esempio 2 si basa sull'esempio 1.</div>
<p>L'esempio seguente trasferisce l'alias <code translate="no">carAlias1</code> dalla raccolta <code translate="no">car</code> alla raccolta <code translate="no">car2</code>.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">crea raccolta<button data-href="#create-collection" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name: color
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: color field
Nullable [False]: False
Default value (type: INT64) [Not set]: 0

Do you want to add embedding function? [y/N]: n
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
<p><h3 id="creat-index">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
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
<h3 id="Syntax" class="common-anchor-header">Sintassi</h3><pre><code translate="no" class="language-shell">delete user -u (text)
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
<h3 id="Example" class="common-anchor-header">Esempio</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">cancella ruolo<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Elimina il ruolo in Milvus</p>
<p><h3 id="delete-role">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-NomeRuolo</td><td style="text-align:left">Il nome del ruolo di milvus.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><p>L'esempio seguente elimina il ruolo <code translate="no">role1</code> in milvus.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
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
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-nome alias</td><td style="text-align:left">L'alias.</td></tr>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
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
<pre><code translate="no" class="language-shell">delete collection -c (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
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
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
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
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
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
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
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
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Opzioni</h3></p>
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
<p><h3 >Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">concedere ruolo<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Assegna un ruolo all'utente</p>
<p><h3 id="grant-user">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-NomeRuolo</td><td style="text-align:left">Il nome del ruolo di milvus.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nomeutente</td><td style="text-align:left">Il nome utente di milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 >Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">assegna privilegio<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Assegna un privilegio a un ruolo.</p>
<p><h3 id="assign-privilege">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">revoca ruolo<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Revoca il ruolo assegnato a un utente.</p>
<p><h3 id="grant-user">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-NomeRuolo</td><td style="text-align:left">Il nome del ruolo di milvus.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-nomeutente</td><td style="text-align:left">Il nome utente di milvus.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 >Esempio</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">revoca privilegio<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>Revoca un privilegio già assegnato a un ruolo.</p>
<p><h3 id="revoke-privilege">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
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
<pre><code translate="no" class="language-shell">exit
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
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">Comandi</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Comando</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">Cancella</td><td style="text-align:left">Cancella lo schermo.</td></tr>
<tr><td style="text-align:left">Connetti</td><td style="text-align:left">Si collega a Milvus.</td></tr>
<tr><td style="text-align:left">creare</td><td style="text-align:left">Crea collezione, database, partizione, utente, ruolo e indice.</td></tr>
<tr><td style="text-align:left">concedere</td><td style="text-align:left">Concede un ruolo e un privilegio.</td></tr>
<tr><td style="text-align:left">revocare</td><td style="text-align:left">Revoca il ruolo e il privilegio.</td></tr>
<tr><td style="text-align:left">Cancellare</td><td style="text-align:left">Elimina raccolte, database, partizioni, alias, utenti, ruoli o indici.</td></tr>
<tr><td style="text-align:left">Esci</td><td style="text-align:left">Chiude la finestra della riga di comando.</td></tr>
<tr><td style="text-align:left">Aiuto</td><td style="text-align:left">Visualizza la guida all'uso di un comando.</td></tr>
<tr><td style="text-align:left">inserisci</td><td style="text-align:left">Importa i dati in una partizione.</td></tr>
<tr><td style="text-align:left">elenca</td><td style="text-align:left">Elenca collezioni, database, partizioni, utenti, ruoli, sovvenzioni o indici.</td></tr>
<tr><td style="text-align:left">caricare</td><td style="text-align:left">Carica una raccolta o una partizione.</td></tr>
<tr><td style="text-align:left">query</td><td style="text-align:left">Mostra i risultati delle query che corrispondono a tutti i criteri immessi.</td></tr>
<tr><td style="text-align:left">Rilascio</td><td style="text-align:left">Rilascia una raccolta o una partizione.</td></tr>
<tr><td style="text-align:left">Ricerca</td><td style="text-align:left">Esegue una ricerca di similarità vettoriale o una ricerca ibrida.</td></tr>
<tr><td style="text-align:left">mostra</td><td style="text-align:left">Mostra la connessione, il database, la collezione, l'avanzamento del caricamento o l'avanzamento dell'indice.</td></tr>
<tr><td style="text-align:left">rinominare</td><td style="text-align:left">Rinomina la raccolta</td></tr>
<tr><td style="text-align:left">usa</td><td style="text-align:left">Usa il database</td></tr>
<tr><td style="text-align:left">versione</td><td style="text-align:left">Mostra la versione di Milvus_CLI.</td></tr>
</tbody>
</table>
<h2 id="insert" class="common-anchor-header">Inserisci<button data-href="#insert" class="anchor-icon" translate="no">
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
    </button></h2><p>Importa dati locali o remoti in una partizione.</p>
<p><h3 id="insert">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">Opzioni</h3></p>
<table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Nome della raccolta</td><td style="text-align:left">Il nome della raccolta in cui vengono inseriti i dati.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partizione</td><td style="text-align:left">(Opzionale) Il nome della partizione in cui vengono inseriti i dati. Se non si passa questa opzione di partizione, si sceglie la partizione "_default".</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-timeout</td><td style="text-align:left">(Facoltativo) Un tempo opzionale in secondi da dedicare all'RPC. Se il timeout non viene impostato, il client continua ad aspettare finché il server non risponde o si verifica un errore.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<p><h3 id="insert">Esempio 1</h3>
L'esempio seguente importa un file CSV locale.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;examples/import_csv/vectors.csv&#x27;

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">Esempio 2</h3>
L'esempio seguente importa un file CSV remoto.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="insert-row" class="common-anchor-header">inserisci riga<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>Inserisce una riga di dati in una raccolta.</p>
<p><h3 id="insert-row">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
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
<h3 id="Syntax" class="common-anchor-header">Sintassi</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><p>| Opzione | Nome completo | Descrizione | | --help | n/a | Visualizza la guida all'uso del comando. |</p>
<h2 id="List-roles" class="common-anchor-header">Elenco dei ruoli<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenco dei ruoli in Milvus</p>
<p><h3 id="list-role">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzione</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-aiuto</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">Elenco delle sovvenzioni<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>Elenco delle sovvenzioni in Milvus</p>
<h3 id="Options" class="common-anchor-header">Opzioni</h3><table>
<thead>
<tr><th style="text-align:left">Opzioni</th><th style="text-align:left">Nome completo</th><th style="text-align:left">Descrizione</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-NomeRuolo</td><td style="text-align:left">Il nome del ruolo di milvus.</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-nomeoggetto</td><td style="text-align:left">Il nome dell'oggetto di milvus.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-Tipo di oggetto</td><td style="text-align:left">Globale, Collezione o Utente.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">Visualizza la guida all'uso del comando.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">Esempi</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
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
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
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
<p><h3 id="query">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">Rilascio<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>Rilascia un insieme o una partizione dalla RAM.</p>
<p><h3 id="release">Sintassi</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
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
<p><h3 id="search">Esempio interattivo</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field&#x27;s of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe&#x27;s value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to search (split by &quot;,&quot; if multiple) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]:
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
    </button></h2><p>Elenca le connessioni.</p>
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
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
