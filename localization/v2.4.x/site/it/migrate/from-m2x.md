---
id: from-m2x.md
summary: >-
  Questa guida fornisce un processo completo, passo dopo passo, per la
  migrazione dei dati da Milvus 2.3.x a Milvus 2.3.x o superiore.
title: Da Milvus 2.3.x
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Da Milvus 2.3.x<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>Questa guida fornisce un processo completo, passo dopo passo, per la migrazione dei dati da Milvus 2.3.x a Milvus 2.3.x o superiore.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>Versioni software</strong>:<ul>
<li>Milvus di origine: 2.3.0+ (lo strumento utilizza l'iteratore per recuperare i dati della raccolta di origine, il che richiede che Milvus di origine sia la versione 2.3.0 o superiore).</li>
<li>Milvus di destinazione: 2.3.0+</li>
</ul></li>
<li><strong>Strumenti necessari</strong>:<ul>
<li>Strumento<a href="https://github.com/zilliztech/milvus-migration">Milvus-migrazione</a>. Per i dettagli sull'installazione, vedere <a href="/docs/it/v2.4.x/milvusdm_install.md">Installazione dello strumento di migrazione</a>.</li>
</ul></li>
<li><strong>Preparazione dei dati</strong>:<ul>
<li>Assicurarsi che la collezione Milvus di origine sia caricata e pronta per l'esportazione dei dati.</li>
<li>Se il Milvus di destinazione non contiene una raccolta corrispondente alla raccolta di origine, lo strumento <a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a> la creerà automaticamente. Si noti che dopo la migrazione, la raccolta di destinazione non sarà indicizzata; è necessario indicizzare manualmente la raccolta in seguito.</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration-file" class="common-anchor-header">Configurare il file di migrazione<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>Salvare il file di configurazione della migrazione di esempio come <code translate="no">migration.yaml</code> e modificare le configurazioni in base alle condizioni reali. Il file di configurazione può essere collocato in qualsiasi directory locale.</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>La tabella seguente descrive i parametri del file di configurazione di esempio. Per ulteriori informazioni, consultare <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration: Milvus2.x a Milvus2.x</a>.</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>Modalità operativa del lavoro di migrazione. Impostare su milvus2x quando si migra da Milvus 2.x.</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>Dimensione del buffer da leggere da Milvus 2.x in ogni batch.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>Specifica da dove viene letto il metafile. Impostato su config, indica che il metaconfig può essere ottenuto da questo file migration.yaml.</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>Versione di Milvus di origine. Impostare su 2.3.0 o superiore.</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>Nome della collezione di origine.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>Indirizzo del server Milvus di origine.</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>Nome utente del server Milvus di origine. Questo parametro è necessario se l'autenticazione utente è abilitata per il server Milvus. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/authenticate.md">Abilita autenticazione</a>.</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>Password del server Milvus di origine. Questo parametro è necessario se l'autenticazione dell'utente è abilitata per il vostro server Milvus. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/authenticate.md">Abilita autenticazione</a>.</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>Indirizzo del server Milvus di destinazione.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Nome utente del server Milvus di destinazione. Questo parametro è necessario se l'autenticazione utente è abilitata per il server Milvus. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/authenticate.md">Abilita autenticazione</a>.</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Password per il server Milvus di destinazione. Questo parametro è necessario se l'autenticazione dell'utente è abilitata per il server Milvus. Per ulteriori informazioni, consultare <a href="/docs/it/v2.4.x/authenticate.md">Abilita autenticazione</a>.</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">Avvio dell'attività di migrazione<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
    </button></h2><p>Per avviare l'attività di migrazione sono disponibili due opzioni: utilizzare la CLI o effettuare richieste API. Scegliete quella più adatta alle vostre esigenze.</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">Opzione 1: Utilizzo della CLI</h3><p>Avviare l'attività di migrazione con il seguente comando. Sostituire <code translate="no">{YourConfigFilePath}</code> con la directory locale in cui risiede il file di configurazione <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Monitorare i log per verificare l'avanzamento dei lavori. I log della migrazione dovrebbero includere voci come:</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">Opzione 2: Fare richieste API</h3><p>Si può anche usare l'API Restful per eseguire la migrazione. Avviare il server API con:</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>Una volta che il server è stato avviato con successo, posizionare il file <code translate="no">migration.yaml</code> nella cartella <code translate="no">configs/</code> del progetto e avviare la migrazione con:</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">Verificare il risultato<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>Al termine dell'attività di migrazione, utilizzare Attu per visualizzare il numero di entità migrate. Inoltre, è possibile creare indici e caricare collezioni in Attu. Per ulteriori informazioni, consultare <a href="https://github.com/zilliztech/attu">Attu</a> e <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a>.</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">Opzioni di configurazione aggiuntive<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Oltre alle configurazioni di base sopra menzionate, è possibile aggiungere ulteriori impostazioni in base alle proprie esigenze specifiche.</p>
<ul>
<li><p><strong>Migrazione selettiva dei campi</strong>: Se è necessario migrare solo campi specifici in una raccolta anziché tutti i campi, specificare i campi da migrare nella sezione <code translate="no">meta</code> del file <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Raccolta di destinazione personalizzata</strong>: Per personalizzare le proprietà della raccolta di destinazione, aggiungere le relative configurazioni nella sezione <code translate="no">meta</code> del file <code translate="no">migration.yaml</code>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Per informazioni dettagliate, consultare <a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migration: Milvus2.x a Milvus2.x</a>.</p>
