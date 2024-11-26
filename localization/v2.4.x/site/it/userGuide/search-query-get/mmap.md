---
id: mmap.md
summary: MMap consente di avere più dati in un singolo nodo.
title: Memorizzazione dei dati abilitata da MMap
---
<h1 id="MMap-enabled-Data-Storage" class="common-anchor-header">Memorizzazione dei dati abilitata da MMap<button data-href="#MMap-enabled-Data-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, i file con mappatura di memoria consentono la mappatura diretta del contenuto dei file nella memoria. Questa caratteristica migliora l'efficienza della memoria, in particolare nelle situazioni in cui la memoria disponibile è scarsa ma il caricamento completo dei dati non è fattibile. Questo meccanismo di ottimizzazione può aumentare la capacità dei dati garantendo le prestazioni fino a un certo limite; tuttavia, quando la quantità di dati supera di troppo la memoria, le prestazioni delle ricerche e delle interrogazioni possono subire un grave degrado.</p>
<h2 id="Configure-memory-mapping" class="common-anchor-header">Configurare la mappatura della memoria<button data-href="#Configure-memory-mapping" class="anchor-icon" translate="no">
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
    </button></h2><p>A partire da Milvus 2.4, è possibile modificare il file di configurazione statica per configurare le impostazioni predefinite di mappatura della memoria per l'intero cluster prima della distribuzione. Inoltre, è possibile modificare dinamicamente i parametri per perfezionare le impostazioni di mappatura della memoria sia a livello di cluster che di indice. In futuro, gli aggiornamenti estenderanno le capacità di mappatura della memoria per includere le configurazioni a livello di campo.</p>
<h3 id="Before-cluster-deployment-global-configuration" class="common-anchor-header">Prima della distribuzione del cluster: configurazione globale</h3><p>Prima di distribuire un cluster, le impostazioni <strong>a livello di cluster</strong> applicano la mappatura della memoria all'intero cluster. Questo assicura che tutti i nuovi oggetti aderiscano automaticamente a queste configurazioni. È importante notare che la modifica di queste impostazioni richiede il riavvio del cluster per diventare effettiva.</p>
<p>Per regolare le impostazioni di mappatura della memoria del cluster, modificare il file <code translate="no">configs/milvus.yaml</code>. In questo file è possibile specificare se abilitare la mappatura della memoria per impostazione predefinita e determinare il percorso della directory per la memorizzazione dei file con mappatura della memoria. Se il percorso (<code translate="no">mmapDirPath</code>) viene lasciato non specificato, il sistema si imposta di memorizzare i file con mappatura della memoria in <code translate="no">{localStorage.path}/mmap</code>. Per ulteriori informazioni, consultare la sezione <a href="https://milvus.io/docs/configure_localstorage.md#localStoragepath">Configurazioni relative alla memoria locale</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    <span class="hljs-comment"># Set memory mapping property for whole cluster</span>
    mmapEnabled: false | true
    <span class="hljs-comment"># Set memory-mapped directory path, if you leave mmapDirPath unspecified, the memory-mapped files will be stored in {localStorage.path}/ mmap by default. </span>
    mmapDirPath: <span class="hljs-built_in">any</span>/valid/path 
....
<button class="copy-code-btn"></button></code></pre>
<p>Dopo <code translate="no">2.4.10</code>, la configurazione <code translate="no">queryNode.mmap.mmapEnabled</code> si divide in quattro campi separati e tutti i valori predefiniti sono <code translate="no">false</code>:</p>
<ul>
<li><code translate="no">queryNode.mmap.vectorField</code>, controlla se i dati del vettore sono mmap;</li>
<li><code translate="no">queryNode.mmap.vectorIndex</code>, controlla se l'indice del vettore è mmap;</li>
<li><code translate="no">queryNode.mmap.scalarField</code>, controlla se i dati scalari sono mmap;</li>
<li><code translate="no">queryNode.mmap.scalarIndex</code>, controlla se l'indice scalare è mmap;</li>
</ul>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># This parameter was set in configs/milvus.yaml</span>
...
queryNode:
  mmap:
    vectorField: false <span class="hljs-comment"># Enable mmap for loading vector data</span>
    vectorIndex: false <span class="hljs-comment"># Enable mmap for loading vector index</span>
    scalarField: false <span class="hljs-comment"># Enable mmap for loading scalar data</span>
    scalarIndex: false <span class="hljs-comment"># Enable mmap for loading scalar index</span>
....
<button class="copy-code-btn"></button></code></pre>
<p>Inoltre, solo l'indice vettoriale e l'mmap dei dati vettoriali possono essere attivati e disattivati per una collezione individualmente, ma non per altre.</p>
<p>Compatibilità: Se la configurazione originale <code translate="no">queryNode.mmap.mmapEnabled</code> è impostata su <code translate="no">true</code>, la nuova configurazione aggiunta sarà impostata su <code translate="no">true</code> in questo momento. Se <code translate="no">queryNode.mmap.mmapEnabled</code> è impostato su <code translate="no">false</code>, se la nuova configurazione è impostata su <code translate="no">true</code>, il valore finale sarà <code translate="no">true</code>.</p>
<h3 id="During-cluster-operation-dynamic-configuration" class="common-anchor-header">Durante il funzionamento del cluster: configurazione dinamica</h3><p>Durante l'esecuzione del cluster, è possibile regolare dinamicamente le impostazioni di mappatura della memoria a livello di collezione o di indice.</p>
<p>A <strong>livello di collezione</strong>, la mappatura della memoria viene applicata a tutti i dati grezzi non indicizzati di una collezione, escluse le chiavi primarie, i timestamp e gli ID riga. Questo approccio è particolarmente adatto alla gestione completa di grandi insiemi di dati.</p>
<p>Per modificare dinamicamente le impostazioni di mappatura della memoria all'interno di una raccolta, utilizzare il metodo <code translate="no">set_properties()</code>. In questo caso, è possibile alternare <code translate="no">mmap.enabled</code> tra <code translate="no">True</code> o <code translate="no">False</code>, a seconda delle necessità.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;test_collection&quot;</span>) <span class="hljs-comment"># Replace with your collection name</span>

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties({<span class="hljs-string">&#x27;mmap.enabled&#x27;</span>: <span class="hljs-literal">True</span>})
<button class="copy-code-btn"></button></code></pre>
<p>Dopo <code translate="no">2.4.10</code>, le impostazioni di mappatura della memoria all'interno di una raccolta, utilizzare il metodo <code translate="no">add_field</code>. Qui è possibile alternare <code translate="no">mmap_enabled</code> tra <code translate="no">True</code> o <code translate="no">False</code>, a seconda delle necessità.</p>
<pre><code translate="no" class="language-python">schema = MilvusClient.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">768</span>, mmap_enabled=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Per le impostazioni <strong>a livello di indice</strong>, la mappatura della memoria può essere applicata specificamente agli indici vettoriali senza influenzare gli altri tipi di dati. Questa funzione è preziosa per le collezioni che richiedono prestazioni ottimizzate per le ricerche vettoriali.</p>
<p>Per attivare o disattivare la mappatura della memoria per un indice all'interno di una collezione, richiamare il metodo <code translate="no">alter_index()</code>, specificando il nome dell'indice di destinazione in <code translate="no">index_name</code> e impostando <code translate="no">mmap.enabled</code> su <code translate="no">True</code> o <code translate="no">False</code>.</p>
<pre><code translate="no" class="language-python">collection.alter_index(
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Replace with your vector index name</span>
    extra_params={<span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>} <span class="hljs-comment"># Enable memory mapping for index</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-storage-path-in-different-deployments" class="common-anchor-header">Personalizzare il percorso di memorizzazione in diverse distribuzioni<button data-href="#Customize-storage-path-in-different-deployments" class="anchor-icon" translate="no">
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
    </button></h2><p>I file mappati in memoria si trovano per default nella directory <code translate="no">/mmap</code> all'interno di <code translate="no">localStorage.path</code>. Ecco come personalizzare questa impostazione nei vari metodi di distribuzione:</p>
<ul>
<li>Per Milvus installato con Helm Chart:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># new-values.yaml</span>
extraConfigFiles:
   user.yaml: |+
      queryNode:
         mmap:
           mmapEnabled: <span class="hljs-literal">true</span>
           mmapDirPath: any/valid/path
        
helm upgrade &lt;milvus-release&gt; --reuse-values -f new-values.yaml milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Per Milvus installato con Milvus Operator:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># patch.yaml</span>
spec:
  config:
    queryNode:
      mmap:
        mmapEnabled: <span class="hljs-literal">true</span>
        mmapDirPath: any/valid/path
      
 kubectl patch milvus &lt;milvus-name&gt; --patch-file patch.yaml
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Per Milvus installato con Docker:</li>
</ul>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># A new installation script is provided to enable mmap-related settings.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limiti<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>La mappatura della memoria non può essere abilitata per una raccolta caricata; assicurarsi che la raccolta sia stata rilasciata prima di abilitare la mappatura della memoria.</p></li>
<li><p>La mappatura della memoria non è supportata per gli indici di classe DiskANN o GPU.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">DOMANDE FREQUENTI<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>In quali scenari è consigliabile abilitare la mappatura della memoria? Quali sono gli svantaggi dopo aver abilitato questa funzione?</strong></p>
<p>La mappatura della memoria è consigliata quando la memoria è limitata o quando le prestazioni richieste sono moderate. L'abilitazione di questa funzione aumenta la capacità di caricamento dei dati. Ad esempio, con una configurazione di 2 CPU e 8 GB di memoria, l'abilitazione della mappatura della memoria può consentire il caricamento di un numero di dati fino a 4 volte superiore rispetto alla mancata abilitazione. L'impatto sulle prestazioni varia:</p>
<ul>
<li><p>Con una memoria sufficiente, le prestazioni previste sono simili a quelle dell'utilizzo della sola memoria.</p></li>
<li><p>Con una memoria insufficiente, le prestazioni previste possono peggiorare.</p></li>
</ul></li>
<li><p><strong>Qual è la relazione tra le configurazioni a livello di raccolta e a livello di indice?</strong></p>
<p>Il livello di raccolta e il livello di indice non sono relazioni inclusive; il livello di raccolta controlla se i dati originali sono abilitati o meno a mmap, mentre il livello di indice riguarda solo gli indici vettoriali.</p></li>
<li><p><strong>Esiste un tipo di indice consigliato per la mappatura della memoria?</strong></p>
<p>Sì, HNSW è consigliato per l'abilitazione di mmap. Abbiamo già testato gli indici delle serie HNSW, IVF_FLAT, IVF_PQ/SQ; le prestazioni degli indici della serie IVF sono diminuite notevolmente, mentre il calo delle prestazioni dovuto all'attivazione di mmap per gli indici HNSW rientra nelle aspettative.</p></li>
<li><p><strong>Che tipo di memoria locale è necessaria per la mappatura della memoria?</strong></p>
<p>Un disco di alta qualità migliora le prestazioni e le unità NVMe sono l'opzione preferita.</p></li>
<li><p><strong>I dati scalari possono essere mappati in memoria?</strong></p>
<p>La mappatura della memoria può essere applicata ai dati scalari, ma non agli indici costruiti su campi scalari.</p></li>
<li><p><strong>Come viene determinata la priorità delle configurazioni di mappatura della memoria tra i diversi livelli?</strong></p>
<p>In Milvus, quando le configurazioni di mappatura della memoria sono definite esplicitamente su più livelli, le configurazioni a livello di indice e di collezione hanno la priorità più alta, seguite dalle configurazioni a livello di cluster.</p></li>
<li><p><strong>Se si esegue l'aggiornamento da Milvus 2.3 e si è configurato il percorso della directory di mappatura della memoria, cosa succede?</strong></p>
<p>Se si esegue l'aggiornamento da Milvus 2.3 e si è configurato il percorso della directory di mappatura della memoria (<code translate="no">mmapDirPath</code>), la configurazione verrà mantenuta e l'impostazione predefinita per la mappatura della memoria abilitata (<code translate="no">mmapEnabled</code>) sarà <code translate="no">true</code>. È importante migrare i metadati per sincronizzare la configurazione dei file con mappatura della memoria esistenti. Per maggiori dettagli, consultare <a href="https://milvus.io/docs/upgrade_milvus_standalone-docker.md#Migrate-the-metadata">Migrazione dei metadati</a>.</p></li>
</ul>
