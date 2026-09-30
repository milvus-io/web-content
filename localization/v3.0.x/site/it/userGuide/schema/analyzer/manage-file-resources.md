---
id: manage-file-resources.md
title: Gestire le risorse di file
summary: >-
  Registra e gestisce i file di dizionario esterni che gli analizzatori di testo
  Milvus possono caricare in fase di esecuzione.
---
<h1 id="Manage-File-Resources" class="common-anchor-header">Gestire le risorse di file<button data-href="#Manage-File-Resources" class="anchor-icon" translate="no">
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
    </button></h1><p>Una <strong>risorsa file</strong> è un riferimento registrato dal server a un file dizionario esterno che gli analizzatori di testo consumano in fase di esecuzione. In Milvus 3.0, quattro componenti dell'analizzatore possono caricare i loro dizionari da una risorsa file invece che da un array in linea:</p>
<table>
   <tr>
     <th><p><strong>Componente dell'analizzatore</strong></p></th>
     <th><p><strong>Parametro che accetta una risorsa file</strong></p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/it/jieba-tokenizer.md">Tokenizzatore Jieba</a></p></td>
     <td><p><code translate="no">extra_dict_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/stop-filter.md">Filtro di arresto</a></p></td>
     <td><p><code translate="no">stop_words_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/decompounder-filter.md">Filtro decompattatore</a></p></td>
     <td><p><code translate="no">word_list_file</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/it/synonym-filter.md">Filtro sinonimo</a></p></td>
     <td><p><code translate="no">synonyms_file</code></p></td>
   </tr>
</table>
<p>Le risorse file risolvono due problemi pratici con gli array di dizionari in linea:</p>
<ul>
<li><p>I dizionari reali sono grandi. Un vocabolario cinese Jieba può essere composto da decine di migliaia di righe; le tabelle dei sinonimi sono in genere migliaia di regole. L'inserimento nella configurazione dell'analizzatore non è pratico.</p></li>
<li><p>Lo stesso dizionario è solitamente condiviso tra le varie collezioni. Registrarlo una sola volta, e poi referenziarlo per nome, mantiene gli schemi piccoli e rende l'aggiornamento del dizionario un'unica operazione.</p></li>
</ul>
<h2 id="File-resource-types" class="common-anchor-header">Tipi di risorse file<button data-href="#File-resource-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta due tipi di risorse file con diverse responsabilità di gestione:</p>
<table>
   <tr>
     <th><p><strong>Tipo</strong></p></th>
     <th><p><strong>Dove risiede il file</strong></p></th>
     <th><p><strong>Chi gestisce il file</strong></p></th>
     <th><p><strong>In forma</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>Remoto</strong></p></td>
     <td><p>Nel negozio di oggetti (MinIO / S3 / GCS / Azure) che il cluster Milvus è già configurato per utilizzare</p></td>
     <td><p>Milvus, attraverso le API client <code translate="no">add_file_resource</code> / <code translate="no">remove_file_resource</code> / <code translate="no">list_file_resources</code> </p></td>
     <td><p>Consigliato per la maggior parte delle implementazioni.</p></td>
   </tr>
   <tr>
     <td><p><strong>Locale</strong></p></td>
     <td><p>Nello stesso percorso assoluto sul filesystem locale di ogni componente Milvus (DataNode, QueryNode, StreamingNode).</p></td>
     <td><p>L'utente può montare il file da solo, ad esempio tramite un volume Kubernetes.</p></td>
     <td><p>Scenari open-source / self-hosted in cui si preferisce gestire i file del dizionario al di fuori di Milvus.</p></td>
   </tr>
</table>
<p>Il resto di questa pagina illustra entrambi i tipi, a partire dal tipo remoto più comune.</p>
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
<li><p>Per le risorse di file <strong>remote</strong>, la distribuzione Milvus deve essere configurata con un archivio di oggetti. La maggior parte delle distribuzioni lo sono già: controllate la sezione <code translate="no">minio:</code> del vostro <code translate="no">milvus.yaml</code> (o i valori equivalenti della tabella di Helm). Notate i valori <code translate="no">bucketName</code> e <code translate="no">rootPath</code>; vi serviranno quando registrerete le risorse di file.</p></li>
<li><p>Per le risorse di file <strong>locali</strong>, dovete essere in grado di collocare i file in ogni pod/contenitore Milvus nello stesso percorso assoluto. Il modo in cui farlo dipende dalla distribuzione (montaggio bind, volume supportato da ConfigMap, contenitore init, ecc.)</p></li>
</ul>
<h2 id="Register-a-remote-file-resource" class="common-anchor-header">Registrare una risorsa file remota<button data-href="#Register-a-remote-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>La registrazione di una risorsa file remota è un flusso di lavoro in tre fasi: si <strong>carica</strong> il file nell'archivio oggetti, lo si <strong>registra</strong> con Milvus con un nome scelto, quindi lo <strong>si referenzia</strong> da qualsiasi analizzatore che ne abbia bisogno.</p>
<h3 id="Step-1-Upload-the-dictionary-file-to-object-storage" class="common-anchor-header">Passo 1. Caricare il file del dizionario nell'archivio oggetti<button data-href="#Step-1-Upload-the-dictionary-file-to-object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare i propri strumenti (<code translate="no">mc</code>, <code translate="no">aws s3 cp</code>, <code translate="no">boto3</code> o qualsiasi client compatibile con S3) per inserire il file nel bucket che Milvus è configurato per utilizzare.</p>
<p>Ad esempio, se <code translate="no">milvus.yaml</code> contiene:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">minio:</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">milvus-bucket</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">file</span>
<button class="copy-code-btn"></button></code></pre>
<p>Caricando un file chiamato <code translate="no">chinese_terms.txt</code> con <code translate="no">rootPath</code> come prefisso, l'oggetto viene collocato in <code translate="no">s3://milvus-bucket/file/chinese_terms.txt</code>.</p>
<p>L'argomento <code translate="no">path</code> da passare a <code translate="no">add_file_resource</code> nel passaggio 2 è la <strong>chiave completa dell'oggetto, compreso il prefisso rootPath</strong> - per l'esempio precedente, <code translate="no">path=&quot;file/chinese_terms.txt&quot;</code>. Un percorso senza il prefisso (per esempio, solo <code translate="no">&quot;chinese_terms.txt&quot;</code>) viene rifiutato con l'errore <code translate="no">file resource path not exist</code>.</p>
<h3 id="Step-2-Register-the-file-with-addfileresource" class="common-anchor-header">Passo 2. Registrare il file con <code translate="no">add_file_resource</code><button data-href="#Step-2-Register-the-file-with-addfileresource" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

client.add_file_resource(
    name=<span class="hljs-string">&quot;chinese_terms&quot;</span>,                <span class="hljs-comment"># short, unique name you&#x27;ll reference later</span>
    path=<span class="hljs-string">&quot;file/chinese_terms.txt&quot;</span>,       <span class="hljs-comment"># full S3 object key, including the rootPath prefix</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">add_file_resource</code> convalida in modo sincrono: la chiamata ritorna solo dopo che Milvus ha confermato l'esistenza dell'oggetto <code translate="no">path</code> nell'archivio oggetti configurato. Se l'oggetto manca, la chiamata solleva <code translate="no">MilvusException(code=65535, &quot;file resource path not exist&quot;)</code> - caricare prima il file e poi riprovare.</p>
<p>La chiamata è idempotente. Chiamando due volte <code translate="no">add_file_resource</code> con gli stessi <code translate="no">name</code> e <code translate="no">path</code> non si creano duplicati.</p>
<h3 id="Step-3-Reference-the-file-resource-from-an-analyzer" class="common-anchor-header">Passo 3. Riferimento alla risorsa file da un analizzatore<button data-href="#Step-3-Reference-the-file-resource-from-an-analyzer" class="anchor-icon" translate="no">
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
    </button></h3><p>Ogni volta che un parametro dell'analizzatore accetta un riferimento a un file (<code translate="no">extra_dict_file</code>, <code translate="no">stop_words_file</code>, <code translate="no">word_list_file</code>, <code translate="no">synonyms_file</code>), utilizzare la forma remota canonica:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
    <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms&quot;</span>,    <span class="hljs-comment"># must match the name in add_file_resource</span>
    <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;chinese_terms.txt&quot;</span>,    <span class="hljs-comment"># filename only — Milvus uses this to identify the file inside the resource</span>
}
<button class="copy-code-btn"></button></code></pre>
<p>Tutti e quattro i parametri dell'analizzatore usano la stessa forma; solo la chiave dell'analizzatore circostante differisce. Per esempi concreti per analizzatore, vedere Jieba tokenizer, Stop filter, Decompounder filter e Synonym filter.</p>
<p>I nomi dei parametri sono <code translate="no">resource_name</code> e <code translate="no">file_name</code> - non <code translate="no">name</code> e <code translate="no">file</code>. L'uso di <code translate="no">name</code> / <code translate="no">file</code> (o <code translate="no">&quot;type&quot;: &quot;resource&quot;</code> al posto di <code translate="no">&quot;type&quot;: &quot;remote&quot;</code>) solleva <code translate="no">MilvusException</code> al momento della creazione dell'analizzatore con un messaggio simile a <code translate="no">resource name of remote file ... must be set</code>.</p>
<h2 id="List-file-resources" class="common-anchor-header">Elenco delle risorse del file<button data-href="#List-file-resources" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">resources = client.list_file_resources()
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> resources:
    <span class="hljs-built_in">print</span>(r.name, r.path)
<span class="hljs-comment"># chinese_terms file/chinese_terms.txt</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">list_file_resources()</code> restituisce un elenco di oggetti <code translate="no">FileResourceInfo</code>, ciascuno con gli attributi <code translate="no">.name</code> e <code translate="no">.path</code>. Il cluster vuoto restituisce <code translate="no">[]</code>. Non esiste <code translate="no">get</code> per risorsa; <code translate="no">list_file_resources</code> è l'unica API di lettura.</p>
<h2 id="Remove-a-file-resource" class="common-anchor-header">Rimuovere una risorsa file<button data-href="#Remove-a-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-python">client.remove_file_resource(name=<span class="hljs-string">&quot;chinese_terms&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">remove_file_resource</code> è idempotente: chiamarlo per un nome che non esiste restituisce <code translate="no">None</code> senza rilanciare.</p>
<p>Prima di rimuovere una risorsa file, eliminare o modificare tutte le collezioni le cui configurazioni dell'analizzatore fanno riferimento ad essa. Mantenere una risorsa file finché nessuna collezione dipende da essa evita il rischio che le ricerche dell'analizzatore falliscano dopo che la risorsa è stata rimossa.</p>
<h2 id="Use-a-local-file-resource" class="common-anchor-header">Utilizzare una risorsa file locale<button data-href="#Use-a-local-file-resource" class="anchor-icon" translate="no">
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
    </button></h2><p>Una risorsa file <strong>locale</strong> punta direttamente a un percorso sul filesystem locale di ogni componente Milvus. Non c'è nessuna chiamata a <code translate="no">add_file_resource</code> - Milvus non tiene traccia delle risorse locali. Si posiziona il file nello stesso percorso assoluto su ogni pod o contenitore pertinente, quindi si fa riferimento al percorso:</p>
<pre><code translate="no" class="language-python">{
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;local&quot;</span>,
    <span class="hljs-string">&quot;path&quot;</span>: <span class="hljs-string">&quot;/var/lib/milvus/dicts/chinese_terms.txt&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<p>Le risorse di file locali sono valide solo nelle distribuzioni in cui si controllano i filesystem dei DataNode, dei QueryNode e degli StreamingNode - tipicamente Milvus auto-ospitato su bare-metal o su un cluster Kubernetes dove è possibile aggiungere un volume di mount. Il file deve esistere esattamente nello stesso percorso assoluto su ogni componente, altrimenti alcuni nodi non riescono a caricare l'analizzatore.</p>
<p>Il file viene aperto alla prima creazione dell'analizzatore. Se il percorso non esiste a quel punto, la creazione dell'analizzatore fallisce con <code translate="no">MilvusException(code=2000, &quot;IOError: No such file or directory&quot;)</code>.</p>
<h2 id="Considerations" class="common-anchor-header">Considerazioni<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p><strong>La disponibilità dell'intero cluster non è istantanea.</strong> Dopo il ritorno di <code translate="no">add_file_resource</code>, Milvus sincronizza il file con tutti i componenti che ne hanno bisogno. Durante questa breve finestra, una raccolta che fa riferimento alla risorsa potrebbe non essere creata sui nodi che non hanno ancora effettuato la sincronizzazione. La soluzione tipica consiste nel riprovare la chiamata di creazione dopo alcuni secondi.</p></li>
<li><p><strong>Rimuovere solo quando nessuna collezione dipende dalla risorsa.</strong> Eliminare o modificare qualsiasi raccolta la cui configurazione dell'analizzatore faccia riferimento alla risorsa prima di chiamare <code translate="no">remove_file_resource</code>, per evitare che le ricerche dell'analizzatore non trovino il file.</p></li>
<li><p><strong>Solo metadati.</strong> <code translate="no">list_file_resources()</code> restituisce <code translate="no">name</code> e <code translate="no">path</code>, senza dimensioni, checksum, tempo di caricamento o altri metadati. Tenere traccia delle versioni dei dizionari con una propria convenzione di denominazione, se necessario.</p></li>
</ul>
