---
id: integration_with_mindsdb.md
summary: >-
  Questo tutorial mostra come integrare Milvus con MindsDB, consentendo di
  sfruttare le capacità di intelligenza artificiale di MindsDB con le
  funzionalità del database vettoriale di Milvus attraverso operazioni simili a
  SQL per la gestione e l'interrogazione delle incorporazioni vettoriali.
title: Integrare Milvus con MindsDB
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Integrare Milvus con MindsDB<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a> è uno strumento potente per integrare le applicazioni di intelligenza artificiale con diverse fonti di dati aziendali. Funziona come un motore di interrogazione federato che mette ordine nella dispersione dei dati, rispondendo meticolosamente alle interrogazioni su dati strutturati e non strutturati. Che i dati siano sparsi in applicazioni SaaS, database o data warehouse, MindsDB è in grado di collegarli e interrogarli tutti utilizzando SQL standard. È dotato di sistemi RAG autonomi all'avanguardia attraverso le Knowledge Bases, supporta centinaia di fonti di dati e offre opzioni di distribuzione flessibili, dallo sviluppo locale agli ambienti cloud.</p>
<p>Questo tutorial mostra come integrare Milvus con MindsDB, consentendo di sfruttare le capacità di intelligenza artificiale di MindsDB con le funzionalità del database vettoriale di Milvus attraverso operazioni simili a SQL per la gestione e l'interrogazione di embeddings vettoriali.</p>
<div class="alert note">
<p>Questo tutorial fa riferimento principalmente alla documentazione ufficiale di <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus Handler</a>. Se trovate parti non aggiornate in questo tutorial, potete seguire prioritariamente la documentazione ufficiale e creare un problema per noi.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">Installare MindsDB<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di iniziare, installate MindsDB in locale tramite <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> o <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop</a>.</p>
<p>Prima di procedere, assicuratevi di avere una solida conoscenza dei concetti e delle operazioni fondamentali di MindsDB e Milvus.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">Introduzione agli argomenti<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Gli argomenti necessari per stabilire una connessione sono:</p>
<ul>
<li><code translate="no">uri</code>: uri per il database Milvus, che può essere impostato sul file ".db" locale o sul servizio docker o cloud</li>
<li><code translate="no">token</code>token per supportare docker o il servizio cloud, in base all'opzione uri.</li>
</ul>
<p>Gli argomenti opzionali per stabilire una connessione sono:</p>
<p>Questi sono utilizzati per le query di <code translate="no">SELECT</code>:</p>
<ul>
<li><code translate="no">search_default_limit</code>: limite predefinito da passare nelle istruzioni select (default=100)</li>
<li><code translate="no">search_metric_type</code>: tipo di metrica utilizzata per le ricerche (default=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>: se ignorare o meno i segmenti in crescita durante le ricerche di similarità (default=False)</li>
<li><code translate="no">search_params</code>: specifico per <code translate="no">search_metric_type</code> (default={&quot;nprobe&quot;: 10})</li>
</ul>
<p>Sono utilizzati per le query di <code translate="no">CREATE</code>:</p>
<ul>
<li><code translate="no">create_auto_id</code>: se generare automaticamente l'id quando si inseriscono record senza ID (default=False)</li>
<li><code translate="no">create_id_max_len</code>: lunghezza massima del campo id quando si crea una tabella (default=64)</li>
<li><code translate="no">create_embedding_dim</code>: dimensione di incorporamento per la creazione della tabella (default=8)</li>
<li><code translate="no">create_dynamic_field</code>: se le tabelle create hanno o meno campi dinamici (default=True)</li>
<li><code translate="no">create_content_max_len</code>: lunghezza massima della colonna di contenuto (predefinito=200)</li>
<li><code translate="no">create_content_default_value</code>: valore predefinito della colonna di contenuto (default='')</li>
<li><code translate="no">create_schema_description</code>: descrizione degli schemi creati (default='')</li>
<li><code translate="no">create_alias</code>: alias degli schemi creati (default='default')</li>
<li><code translate="no">create_index_params</code>: parametri dell'indice creato sulla colonna embeddings (default={})</li>
<li><code translate="no">create_index_metric_type</code>: metrica usata per creare l'indice (default='L2')</li>
<li><code translate="no">create_index_type</code>: il tipo di indice (predefinito='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">Utilizzo<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di continuare, assicurarsi che la versione di <code translate="no">pymilvus</code> sia uguale a questa <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">versione appuntata</a>. Se si riscontrano problemi di compatibilità tra le versioni, è possibile ripristinare la versione di pymilvus o personalizzarla in questo <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">file di requisiti</a>.</p>
<h3 id="Creating-connection" class="common-anchor-header">Creazione della connessione</h3><p>Per utilizzare questo gestore e connettersi a un server Milvus in MindsDB, si può usare la seguente sintassi:</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>Se si ha bisogno di un database vettoriale locale solo per dati su piccola scala o per la prototipazione, l'impostazione dell'uri come file locale, ad esempio<code translate="no">./milvus.db</code>, è il metodo più conveniente, in quanto utilizza automaticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> per memorizzare tutti i dati in questo file.</li>
<li>Per i dati su larga scala e il traffico in produzione, è possibile configurare un server Milvus su <a href="https://milvus.io/docs/install-overview.md">Docker o Kubernetes</a>. In questa configurazione, utilizzare l'indirizzo e la porta del server come <code translate="no">uri</code>, ad esempio<code translate="no">http://localhost:19530</code>. Se si abilita la funzione di autenticazione su Milvus, impostare <code translate="no">token</code> come <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code>, altrimenti non è necessario impostare il token.</li>
<li>È anche possibile utilizzare Milvus completamente gestito su <a href="https://zilliz.com/cloud">Zilliz Cloud</a>. È sufficiente impostare <code translate="no">uri</code> e <code translate="no">token</code> con l'<a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">endpoint pubblico e la chiave API</a> della propria istanza Zilliz Cloud.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">Interruzione della connessione</h3><p>Per interrompere la connessione, utilizzare questo comando</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">Creare tabelle</h3><p>Per inserire dati da una tabella preesistente, utilizzare il comando <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">Eliminazione di collezioni</h3><p>L'eliminazione di una collezione non è supportata</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">Interrogazione e selezione</h3><p>Per interrogare il database usando un vettore di ricerca, si può usare <code translate="no">search_vector</code> nella clausola <code translate="no">WHERE</code>.</p>
<p>Avvertenze:</p>
<ul>
<li>Se si omette <code translate="no">LIMIT</code>, viene utilizzato <code translate="no">search_default_limit</code>, poiché Milvus lo richiede.</li>
<li>La colonna dei metadati non è supportata, ma se la collezione ha lo schema dinamico abilitato, è possibile eseguire le query come di consueto, vedere l'esempio seguente</li>
<li>I campi dinamici non possono essere visualizzati, ma possono essere interrogati.</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p>Se si omette la clausola <code translate="no">search_vector</code>, questa diventa una ricerca di base e vengono restituite le voci <code translate="no">LIMIT</code> o <code translate="no">search_default_limit</code> della collezione.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>È possibile utilizzare la clausola <code translate="no">WHERE</code> sui campi dinamici come nel normale SQL.</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">Eliminazione di record</h3><p>È possibile cancellare le voci utilizzando <code translate="no">DELETE</code> proprio come in SQL.</p>
<p>Avvertenze:</p>
<ul>
<li>Milvus supporta solo l'eliminazione di entità con chiavi primarie chiaramente specificate.</li>
<li>Si può usare solo l'operatore <code translate="no">IN</code> </li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">Inserimento di record</h3><p>È possibile inserire anche singole righe come in questo caso:</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">Aggiornamento</h3><p>L'aggiornamento dei record non è supportato dall'API Milvus. Si può provare a usare una combinazione di <code translate="no">DELETE</code> e <code translate="no">INSERT</code></p>
<hr>
<p>Per ulteriori dettagli ed esempi, consultare la <a href="https://docs.mindsdb.com/what-is-mindsdb">documentazione ufficiale</a> di <a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB</a>.</p>
