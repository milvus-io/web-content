---
id: operational_faq.md
summary: Trova le risposte alle domande più frequenti sulle operazioni a Milvus.
title: FAQ operative
---
<h1 id="Operational-FAQ" class="common-anchor-header">FAQ operative<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-is-a-QueryNode-delegator-and-what-are-its-responsibilities" class="common-anchor-header">Che cos'è un delegatore di QueryNode e quali sono le sue responsabilità?</h4><p>Quando una collezione viene caricata, un QueryNode si iscrive ai canali DML per i messaggi di inserimento e cancellazione provenienti dalla coda dei messaggi. Il QueryNode che sottoscrive questi canali, noto come delegatore, è responsabile di:</p>
<ul>
<li>Gestire i segmenti crescenti che richiedono memoria aggiuntiva a causa degli inserimenti in corso.</li>
<li>Ricevere i messaggi di cancellazione e passarli ad altri QueryNode che detengono i segmenti in questione.</li>
</ul>
<h4 id="How-to-identify-delegator-nodes-for-a-collection" class="common-anchor-header">Come identificare i nodi delegatori di una collezione?</h4><p>Utilizzando Birdwatcher.</p>
<p>Installare Birdwatcher seguendo <a href="https://milvus.io/docs/birdwatcher_install_guides.md#Install-Birdwatcher">questa</a> procedura, quindi eseguire il seguente comando:</p>
<pre><code translate="no" class="language-shell">./birdwatcher
<span class="hljs-meta prompt_"># </span><span class="language-bash">Find delegator nodes <span class="hljs-keyword">for</span> your collection</span>
Milvus(my-release) &gt; show segment-loaded-grpc --collection &lt;your-collectionID&gt;

ServerID 2
Channel by-dev-rootcoord-dml_2, collection: 430123456789, version 1
Leader view for channel: by-dev-rootcoord-dml_2
Growing segments count: 1, ids: [430123456789_4]
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Map server ID to pod IP</span>
Milvus(my-release) &gt; show session

Node(s) querynode
        ID: 1        Version: 2.4.0        Address: 10.0.0.4:19530
        ID: 2        Version: 2.4.0        Address: 10.0.0.5:19530
        ID: 3        Version: 2.4.0        Address: 10.0.0.6:19530
<button class="copy-code-btn"></button></code></pre>
<h4 id="What-parameters-can-be-adjusted-if-query-node-memory-usage-is-unbalanced" class="common-anchor-header">Quali parametri possono essere regolati se l'uso della memoria del nodo di query è sbilanciato?</h4><p>A volte la memoria dei nodi di query varia perché alcuni agiscono come delegatori utilizzando più RAM. Se la memoria di un delegatore è elevata, regolare queryCoord.delegatorMemoryOverloadFactor per scaricare i segmenti sigillati su altri nodi e ridurre l'uso della RAM.</p>
<ul>
<li>Il valore predefinito è 0,1.</li>
<li>Aumentando questo valore (ad esempio, a 0,3 o più), il sistema scaricherà più segmenti sigillati dal delegatore sovraccarico ad altri QueryNode, contribuendo a bilanciare l'uso della memoria. Si può anche provare ad aumentare il valore fino a 1, il che significa che nessun segmento sigillato verrà caricato nei nodi delegatori.</li>
</ul>
<p>Se non si vuole riavviare il cluster, si può modificare la configurazione di milvus con birdwatcher:</p>
<pre><code translate="no">.<span class="hljs-operator">/</span>birdwatcher
Offline <span class="hljs-operator">&gt;</span> <span class="hljs-keyword">connect</span> <span class="hljs-comment">--etcd &lt;your-etcd-ip&gt;:2379 --auto</span>

# Change delegatorMemoryOverloadFactor <span class="hljs-keyword">to</span> <span class="hljs-number">0.3</span> <span class="hljs-keyword">without</span> restart, <span class="hljs-keyword">default</span> <span class="hljs-keyword">value</span> <span class="hljs-keyword">is</span> <span class="hljs-number">0.1</span>
<span class="hljs-keyword">set</span> config<span class="hljs-operator">-</span>etcd <span class="hljs-comment">--key queryCoord.delegatorMemoryOverloadFactor --value 0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="How-to-set-shardnum-for-a-collection" class="common-anchor-header">Come impostare shard_num per una collezione?</h4><p>Come best practice, per una raccolta con vettori di dimensione 768, si raccomanda di utilizzare almeno 1 shard per ~100 milioni di vettori. Per i casi di scrittura intensiva, utilizzare 4 shard per ~100 milioni di vettori.</p>
<p>Ad esempio, se avete 100 milioni di vettori, usate 1-4 shard. Se avete 500 milioni di vettori, usate 5-10 frammenti.</p>
<h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Cosa succede se non si riesce a estrarre l'immagine Docker di Milvus da Docker Hub?</h4><p>Se non si riesce a estrarre l'immagine di Milvus Docker da Docker Hub, provare ad aggiungere altri mirror del registro.</p>
<p>Gli utenti della Cina continentale possono aggiungere l'URL "https://registry.docker-cn.com" all'array registry-mirrors in <strong>/etc.docker/daemon.json</strong>.</p>
<pre><code translate="no"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;registry-mirrors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Docker è l'unico modo per installare ed eseguire Milvus?</h4><p>Docker è un modo efficiente per distribuire Milvus, ma non l'unico. È anche possibile distribuire Milvus dal codice sorgente. Ciò richiede Ubuntu (18.04 o superiore) o CentOS (7 o superiore). Per ulteriori informazioni, vedere <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">Creazione di Milvus dal codice sorgente</a>.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">Quali sono i principali fattori che influenzano il richiamo?</h4><p>Il richiamo è influenzato principalmente dal tipo di indice e dai parametri di ricerca.</p>
<p>Per gli indici FLAT, Milvus esegue una scansione esaustiva all'interno di una collezione, con un ritorno del 100%.</p>
<p>Per gli indici IVF, il parametro nprobe determina la portata della ricerca all'interno della collezione. L'aumento di nprobe aumenta la proporzione di vettori cercati e il richiamo, ma diminuisce le prestazioni della query.</p>
<p>Per gli indici HNSW, il parametro ef determina l'ampiezza della ricerca nel grafo. L'aumento di ef aumenta il numero di punti cercati nel grafo e il richiamo, ma diminuisce le prestazioni della query.</p>
<p>Per ulteriori informazioni, vedere <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">Indicizzazione vettoriale</a>.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">Perché le mie modifiche ai file di configurazione non hanno avuto effetto?</h4><p>Milvus non supporta la modifica dei file di configurazione durante l'esecuzione. È necessario riavviare Milvus Docker perché le modifiche ai file di configurazione abbiano effetto.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Come faccio a sapere se Milvus è stato avviato correttamente?</h4><p>Se Milvus viene avviato utilizzando Docker Compose, eseguite <code translate="no">docker ps</code> per osservare quanti contenitori Docker sono in esecuzione e verificare se i servizi di Milvus sono stati avviati correttamente.</p>
<p>Per Milvus standalone, si dovrebbe essere in grado di osservare almeno tre contenitori Docker in esecuzione, uno dei quali è il servizio Milvus e gli altri due sono il servizio di gestione e archiviazione etcd. Per ulteriori informazioni, vedere <a href="/docs/it/install_standalone-docker.md">Installazione di Milvus standalone</a>.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">Perché l'ora dei file di log è diversa da quella del sistema?</h4><p>La differenza di orario è solitamente dovuta al fatto che la macchina host non utilizza il tempo universale coordinato (UTC).</p>
<p>I file di log all'interno dell'immagine Docker utilizzano UTC per impostazione predefinita. Se la macchina host non utilizza UTC, questo problema potrebbe verificarsi.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">Come faccio a sapere se la mia CPU supporta Milvus?</h4><p>Le operazioni di calcolo di Milvus dipendono dal supporto della CPU per il set di istruzioni SIMD (Single Instruction, Multiple Data). Il supporto del set di istruzioni SIMD da parte della CPU è fondamentale per la creazione di indici e la ricerca di similarità vettoriale in Milvus. Assicuratevi che la vostra CPU supporti almeno uno dei seguenti set di istruzioni SIMD:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>Eseguite il comando lscpu per verificare se la vostra CPU supporta i set di istruzioni SIMD di cui sopra:</p>
<pre><code translate="no"><span class="hljs-variable">$ </span>lscpu |<span class="hljs-params"> grep -e sse4_2 -e avx -e avx2 -e avx512
</span><button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Perché Milvus restituisce <code translate="no">illegal instruction</code> all'avvio?</h4><p>Milvus richiede che la CPU supporti un set di istruzioni SIMD: SSE4.2, AVX, AVX2 o AVX512. La CPU deve supportare almeno uno di questi set per garantire il normale funzionamento di Milvus. Un errore <code translate="no">illegal instruction</code> restituito all'avvio indica che la CPU non supporta nessuno dei quattro set di istruzioni di cui sopra.</p>
<p>Vedere il <a href="/docs/it/prerequisite-docker.md">supporto della CPU per il set di istruzioni SIMD</a>.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Posso installare Milvus su Windows?</h4><p>Sì. È possibile installare Milvus su Windows compilando dal codice sorgente o da un pacchetto binario.</p>
<p>Vedere <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Eseguire Milvus su Windows</a> per sapere come installare Milvus su Windows.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Ho ricevuto un errore durante l'installazione di pymilvus su Windows. Cosa devo fare?</h4><p>Provate a utilizzare il seguente comando per aggiornare pymilvus alla versione più recente.</p>
<pre><code translate="no" class="language-shell">pip install --upgrade pymilvus
<button class="copy-code-btn"></button></code></pre>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">Posso installare Milvus quando sono disconnesso da Internet?</h4><p>Sì. È possibile installare Milvus in un ambiente offline. Per ulteriori informazioni, vedere <a href="/docs/it/install_offline-helm.md">Installazione di Milvus offline</a>.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Dove posso trovare i log generati da Milvus?</h4><p>Il log di Milvus viene stampato su stout (standard output) e stderr (standard error) per impostazione predefinita, tuttavia consigliamo vivamente di reindirizzare il log su un volume persistente in produzione. Per farlo, aggiornare <code translate="no">log.file.rootPath</code> in <strong>milvus.yaml</strong>. E se si distribuisce Milvus con il grafico <code translate="no">milvus-helm</code>, è necessario abilitare prima la persistenza dei log tramite <code translate="no">--set log.persistence.enabled=true</code>.</p>
<p>Se non si è modificata la configurazione, anche l'uso di kubectl logs <pod-name> o docker logs CONTAINER può aiutare a trovare il log.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">Posso creare un indice per un segmento prima di inserirvi i dati?</h4><p>Sì, è possibile. Ma si consiglia di inserire i dati in lotti, ciascuno dei quali non deve superare i 256 MB, prima di indicizzare ogni segmento.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">Posso condividere un'istanza etcd tra più istanze Milvus?</h4><p>Sì, è possibile condividere un'istanza etcd tra più istanze Milvus. Per farlo, è necessario modificare <code translate="no">etcd.rootPath</code> in un valore separato per ogni istanza Milvus nei file di configurazione di ciascuna di esse prima di avviarle.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">È possibile condividere un'istanza Pulsar tra più istanze Milvus?</h4><p>Sì, è possibile condividere un'istanza Pulsar tra più istanze Milvus. Per farlo, è possibile</p>
<ul>
<li>Se la multi-tenancy è abilitata sulla vostra istanza Pulsar, considerate la possibilità di allocare un tenant o uno spazio dei nomi separato per ogni istanza Milvus. Per fare ciò, è necessario modificare <code translate="no">pulsar.tenant</code> o <code translate="no">pulsar.namespace</code> nei file di configurazione delle istanze Milvus con un valore unico per ciascuna di esse prima di avviarle.</li>
<li>Se non si intende abilitare la multi-tenancy sulla propria istanza Pulsar, si consiglia di modificare <code translate="no">msgChannel.chanNamePrefix.cluster</code> nei file di configurazione delle istanze Milvus con un valore unico per ciascuna di esse prima di avviarle.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">È possibile condividere un'istanza MinIO tra più istanze Milvus?</h4><p>Sì, è possibile condividere un'istanza MinIO tra più istanze Milvus. A tal fine, è necessario modificare <code translate="no">minio.rootPath</code> in un valore unico per ogni istanza Milvus nei file di configurazione di ciascuna di esse prima di avviarle.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header">Come si gestisce il messaggio di errore <code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>?</h4><p>Il messaggio di errore <code translate="no">Illegal uri [example.db]</code> indica che si sta cercando di connettersi a Milvus Lite utilizzando una versione precedente di PyMilvus che non supporta questo tipo di connessione. Per risolvere questo problema, aggiornate la vostra installazione di PyMilvus almeno alla versione 2.4.2, che include il supporto per la connessione a Milvus Lite.</p>
<p>È possibile aggiornare PyMilvus utilizzando il seguente comando:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">Perché ottengo meno risultati rispetto a <code translate="no">limit</code> che ho impostato nella mia ricerca/query?</h4><p>Ci sono diversi motivi per cui si potrebbero ricevere meno risultati rispetto a <code translate="no">limit</code> specificato:</p>
<ul>
<li><p><strong>Dati limitati</strong>: La collezione potrebbe non avere abbastanza entità per soddisfare il limite richiesto. Se il numero totale di entità nella raccolta è inferiore al limite, si riceveranno naturalmente meno risultati.</p></li>
<li><p><strong>Chiavi primarie duplicate</strong>: Milvus dà priorità a entità specifiche quando incontra chiavi primarie duplicate durante una ricerca. Questo comportamento varia in base al tipo di ricerca:</p></li>
<li><p><strong>Query (corrispondenza esatta)</strong>: Milvus seleziona l'entità più recente con la PK corrispondente. Ricerca RNA: Milvus seleziona l'entità con il punteggio di somiglianza più alto, anche se le entità condividono la stessa PK. Questa priorità può portare a un numero di risultati unici inferiore al limite se la collezione ha molte chiavi primarie duplicate.</p></li>
<li><p><strong>Corrispondenze insufficienti</strong>: Le espressioni di filtraggio della ricerca potrebbero essere troppo rigide, con il risultato di un numero inferiore di entità che soddisfano la soglia di somiglianza. Se le condizioni impostate per la ricerca sono troppo restrittive, non ci sono abbastanza entità che corrispondono, il che porta a un numero di risultati inferiore a quello previsto.</p></li>
</ul>
<h4 id="MilvusClientmilvusdemodb-gives-an-error-ModuleNotFoundError-No-module-named-milvuslite-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">MilvusClient(&quot;milvus_demo.db&quot;) gives an error: ModuleNotFoundError: No module named 'milvus_lite'</code>. Quali sono le cause e come si può risolvere?</h4><p>Questo errore si verifica quando si tenta di utilizzare Milvus Lite su una piattaforma Windows. Milvus Lite è stato progettato principalmente per ambienti Linux e potrebbe non avere un supporto nativo per Windows.</p>
<p>La soluzione è utilizzare un ambiente Linux:</p>
<ul>
<li>Utilizzare un sistema operativo o una macchina virtuale basata su Linux per eseguire Milvus Lite.</li>
<li>Questo approccio garantirà la compatibilità con le dipendenze e le funzionalità della libreria.</li>
</ul>
<h4 id="What-are-the-length-exceeds-max-length-errors-in-Milvus-and-how-can-they-be-understood-and-addressed" class="common-anchor-header">Cosa sono gli errori di "lunghezza superiore alla lunghezza massima" in Milvus e come si possono capire e risolvere?</h4><p>Gli errori "Length exceeds max length" in Milvus si verificano quando la dimensione di un elemento di dati supera la dimensione massima consentita per una collezione o un campo. Ecco alcuni esempi e spiegazioni:</p>
<ul>
<li><p>Errore di campo JSON: <code translate="no">&lt;MilvusException: (code=1100, message=the length (398324) of json field (metadata) exceeds max length (65536): expected=valid length json string, actual=length exceeds max length: invalid parameter)&gt;</code></p></li>
<li><p>Errore di lunghezza della stringa: <code translate="no">&lt;ParamError: (code=1, message=invalid input, length of string exceeds max length. length: 74238, max length: 60535)&gt;</code></p></li>
<li><p>Errore campo VarChar: <code translate="no">&lt;MilvusException: (code=1100, message=the length (60540) of 0th VarChar paragraph exceeds max length (0)%!(EXTRA int64=60535): invalid parameter)&gt;</code></p></li>
</ul>
<p>Per comprendere e risolvere questi errori:</p>
<ul>
<li>Capire che <code translate="no">len(str)</code> in Python rappresenta il numero di caratteri, non la dimensione in byte.</li>
<li>Per i tipi di dati basati su stringhe come VARCHAR e JSON, utilizzare <code translate="no">len(bytes(str, encoding='utf-8'))</code> per determinare la dimensione effettiva in byte, che è quella utilizzata da Milvus per "max-length".</li>
</ul>
<p>Esempio in Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Python Example: result of len() str cannot be used as &quot;max-length&quot; in Milvus </span>
<span class="hljs-meta">&gt;&gt;&gt; </span>s = <span class="hljs-string">&quot;你好，世界！&quot;</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(s) <span class="hljs-comment"># Number of characters of s.</span>
<span class="hljs-number">6</span>
<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-built_in">len</span>(<span class="hljs-built_in">bytes</span>(s, <span class="hljs-string">&quot;utf-8&quot;</span>)) <span class="hljs-comment"># Size in bytes of s, max-length in Milvus.</span>
<span class="hljs-number">18</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345-What-causes-this-and-how-can-it-be-solved" class="common-anchor-header"><code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code>. Quali sono le cause e come si può risolvere questo problema?</h4><p>Questo errore indica che si sta cercando di connettersi a Milvus Lite utilizzando una versione precedente di pymilvus che non lo supporta. Per risolverlo, aggiornate la vostra installazione di pymilvus almeno alla versione 2.4.2. Questa versione supporta la connessione a Milvus Lite. Per aggiornare, utilizzare il seguente comando:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Still-have-questions" class="common-anchor-header">Avete ancora domande?</h4><p>È possibile:</p>
<ul>
<li>Controllare <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> su GitHub. Sentitevi liberi di fare domande, condividere idee e aiutare gli altri.</li>
<li>Unitevi al nostro <a href="https://discuss.milvus.io/">Forum Milvus</a> o al <a href="https://discord.com/invite/8uyFbECzPX">canale Discord</a> per trovare supporto e partecipare alla nostra comunità open-source.</li>
</ul>
