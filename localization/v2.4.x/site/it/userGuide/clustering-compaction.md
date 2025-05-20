---
id: clustering-compaction.md
title: Compattazione dei cluster
related_key: 'clustering, compaction'
summary: >-
  La compattazione del clustering è progettata per migliorare le prestazioni di
  ricerca e ridurre i costi di collezioni di grandi dimensioni. Questa guida vi
  aiuterà a capire la compattazione del clustering e come questa funzione può
  migliorare le prestazioni di ricerca.
---
<h1 id="Clustering-Compaction" class="common-anchor-header">Compattazione dei cluster<button data-href="#Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h1><p>La compattazione del clustering è progettata per migliorare le prestazioni di ricerca e ridurre i costi di collezioni di grandi dimensioni. Questa guida vi aiuterà a capire la compattazione del clustering e come questa funzione può migliorare le prestazioni di ricerca.</p>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus memorizza le entità in arrivo in segmenti all'interno di una raccolta e chiude un segmento quando è pieno. In tal caso, viene creato un nuovo segmento per accogliere altre entità. Di conseguenza, le entità sono distribuite arbitrariamente tra i segmenti. Questa distribuzione richiede che Milvus cerchi in più segmenti per trovare i vicini più vicini a un determinato vettore di query.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction.png" alt="Without clustering Compaction" class="doc-image" id="without-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Senza clustering Compattazione</span> </span></p>
<p>Se Milvus può distribuire le entità tra i segmenti in base ai valori di un campo specifico, l'ambito di ricerca può essere limitato all'interno di un segmento, migliorando così le prestazioni di ricerca.</p>
<p>La<strong>compattazione dei cluster</strong> è una funzione di Milvus che ridistribuisce le entità tra i segmenti di una raccolta in base ai valori di un campo scalare. Per attivare questa funzione, è necessario selezionare un campo scalare come <strong>chiave di raggruppamento</strong>. Questo permette a Milvus di ridistribuire le entità in un segmento quando i valori della chiave di clustering rientrano in un intervallo specifico. Quando si attiva una compattazione del clustering, Milvus genera/aggiorna un indice globale chiamato <strong>PartitionStats</strong>, che registra la relazione di mappatura tra i segmenti e i valori delle chiavi di clustering.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/clustering-compaction-2.png" alt="With Clustering Compaction" class="doc-image" id="with-clustering-compaction" />
   </span> <span class="img-wrapper"> <span>Con la compattazione del clustering</span> </span></p>
<p>Utilizzando <strong>PartitionStats</strong> come riferimento, Milvus può sfrondare i dati irrilevanti quando riceve una richiesta di ricerca/query che contiene un valore di chiave di clustering e restringe l'ambito di ricerca all'interno dei segmenti che corrispondono al valore, migliorando così le prestazioni della ricerca. Per maggiori dettagli sul miglioramento delle prestazioni, consultare i test di benchmark.</p>
<h2 id="Use-Clustering-Compaction" class="common-anchor-header">Utilizzare la compattazione del clustering<button data-href="#Use-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>La funzione Clustering Compaction di Milvus è altamente configurabile. Si può scegliere di attivarla manualmente o di impostarla in modo che venga attivata automaticamente da Milvus a intervalli. Per abilitare la compattazione del clustering, procedere come segue:</p>
<h3 id="Global-Configuration" class="common-anchor-header">Configurazione globale</h3><p>È necessario modificare il file di configurazione di Milvus come indicato di seguito.</p>
<pre><code translate="no" class="language-yaml">dataCoord:
  compaction:
    clustering:
      <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span> 
      autoEnable: <span class="hljs-literal">false</span> 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      <span class="hljs-built_in">timeout</span>: 7200
     
queryNode:
  enableSegmentPrune: <span class="hljs-literal">true</span> 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: <span class="hljs-literal">true</span> 
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">dataCoord.compaction.clustering</code></p>
<table>
<thead>
<tr><th>Configurazione Voce</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enable</code></td><td>Specifica se abilitare la compattazione del clustering.<br>Impostare questo valore su <code translate="no">true</code> se è necessario abilitare questa funzione per ogni raccolta che ha una chiave di clustering.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">autoEnable</code></td><td>Specifica se abilitare la compattazione automatica.<br>L'impostazione di <code translate="no">true</code> indica che Milvus compatta le raccolte che hanno una chiave di raggruppamento agli intervalli specificati.</td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">triggerInterval</code></td><td>Specifica l'intervallo in millisecondi in cui Milvus avvia la compattazione del cluster.<br>Questo parametro è valido solo quando <code translate="no">autoEnable</code> è impostato su <code translate="no">true</code>.</td><td>-</td></tr>
<tr><td><code translate="no">minInterval</code></td><td>Specifica l'intervallo minimo in secondi.<br>Questo parametro è valido solo quando <code translate="no">autoEnable</code> è impostato su <code translate="no">true</code>.<br>L'impostazione di un numero intero superiore a triggerInterval consente di evitare compattazioni ripetute in un breve periodo.</td><td>-</td></tr>
<tr><td><code translate="no">maxInterval</code></td><td>Specifica l'intervallo massimo in secondi.<br>Questo parametro è valido solo quando <code translate="no">autoEnable</code> è impostato su <code translate="no">true</code>.<br>Quando Milvus rileva che una raccolta non è stata compattata con il cluster per un periodo superiore a questo valore, forza una compattazione con il cluster.</td><td>-</td></tr>
<tr><td><code translate="no">newDataSizeThreshold</code></td><td>Specifica la soglia superiore per attivare la compattazione del clustering.<br>Questo parametro è valido solo quando <code translate="no">autoEnable</code> è impostato su <code translate="no">true</code>.<br>Quando Milvus rileva che il volume dei dati in una raccolta supera questo valore, avvia un processo di compattazione del clustering.</td><td>-</td></tr>
<tr><td><code translate="no">timeout</code></td><td>Specifica la durata del timeout per la compattazione del clustering.<br>Una compattazione di clustering fallisce se il tempo di esecuzione supera questo valore.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">queryNode</code></p>
<table>
<thead>
<tr><th>Voce di configurazione</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">enableSegmentPrune</code></td><td>Specifica se Milvus deve eliminare i dati facendo riferimento a PartitionStats quando riceve richieste di ricerca/query.<br>L'impostazione di <code translate="no">true</code> consente a Milvus di eliminare i dati irrilevanti dai segmenti durante una richiesta di ricerca/query.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">dataNode.clusteringCompaction</code></p>
<table>
<thead>
<tr><th>Voce di configurazione</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">memoryBufferRatio</code></td><td>Specifica il rapporto del buffer di memoria per le attività di compattazione del cluster. <br>Milvus elimina i dati quando la dimensione dei dati supera la dimensione del buffer allocato calcolata con questo rapporto.</td><td>-</td></tr>
<tr><td><code translate="no">workPoolSize</code></td><td>Specifica la dimensione del pool di lavoratori per un'attività di compattazione del cluster.</td><td>-</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">common</code></p>
<table>
<thead>
<tr><th>Configurazione Voce</th><th>Descrizione</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">usePartitionKeyAsClusteringKey</code></td><td>Specifica se utilizzare la chiave di partizione nelle raccolte come chiave di clustering.<br>L'impostazione di <code translate="no">true</code> indica che la chiave di partizione viene utilizzata come chiave di clustering.<br>È sempre possibile annullare questa impostazione in una raccolta impostando esplicitamente una chiave di clustering.</td><td><code translate="no">false</code></td></tr>
</tbody>
</table>
</li>
</ul>
<p>Per applicare le modifiche di cui sopra al vostro cluster Milvus, seguite i passaggi in <a href="/docs/it/v2.4.x/configure-helm.md">Configurazione di Milvus con Helm</a> e <a href="/docs/it/v2.4.x/configure_operator.md">Configurazione di Milvus con Milvus Operators</a>.</p>
<h3 id="Collection-Configuration" class="common-anchor-header">Configurazione della raccolta</h3><p>Per la compattazione del cluster in una raccolta specifica, è necessario selezionare un campo scalare della raccolta come chiave di clustering.</p>
<pre><code translate="no" class="language-python">default_fields = [
    FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;key&quot;</span>, dtype=DataType.INT64, is_clustering_key=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;var&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>, is_primary=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description=<span class="hljs-string">&quot;test clustering-key collection&quot;</span>
)

coll1 = Collection(name=<span class="hljs-string">&quot;clustering_test&quot;</span>, schema=default_schema)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>È possibile utilizzare i campi scalari dei seguenti tipi di dati come chiave di clustering: <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code>, <code translate="no">Double</code>, e <code translate="no">VarChar</code>.</p>
</div>
<h2 id="Trigger-Clustering-Compaction" class="common-anchor-header">Attivare la compattazione del clustering<button data-href="#Trigger-Clustering-Compaction" class="anchor-icon" translate="no">
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
    </button></h2><p>Se è stata attivata la compattazione automatica del clustering, Milvus attiva automaticamente la compattazione all'intervallo specificato. In alternativa, è possibile attivare manualmente la compattazione come segue:</p>
<pre><code translate="no" class="language-python">coll1.compact(is_clustering=<span class="hljs-literal">True</span>)
coll1.get_compaction_state(is_clustering=<span class="hljs-literal">True</span>)
coll1.wait_for_compaction_completed(is_clustering=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Benchmark-Test" class="common-anchor-header">Test di benchmark</h3><p>Il volume dei dati e i modelli di query determinano il miglioramento delle prestazioni della compattazione del clustering. Un test di benchmark interno dimostra che la compattazione del clustering produce un miglioramento fino a 25 volte delle query al secondo (QPS).</p>
<p>Il test di benchmark è stato eseguito su una raccolta contenente entità di un dataset LAION da 20 milioni e 768 dimensioni, con il campo chiave designato come chiave di clustering. Dopo l'attivazione della compattazione del clustering nella raccolta, vengono inviate ricerche simultanee finché l'utilizzo della CPU non raggiunge un livello elevato.</p>
<table>
  <thead>
    <tr>
      <th rowspan="2">Filtro di ricerca</th>
      <th rowspan="2">Rapporto di eliminazione</th>
      <th colspan="5">Latenza (ms)</th>
      <th rowspan="2">QPS (richieste/s)</th>
    </tr>
    <tr>
      <th>Media</th>
      <th>Min</th>
      <th>Massimo</th>
      <th>Mediana</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nessuno</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>chiave &gt; 200 e chiave &lt; 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>chiave &gt; 200 e chiave &lt; 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>chiave &gt; 200 e chiave &lt; 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>chiave == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>
<p>Man mano che l'intervallo di ricerca si restringe nei filtri di ricerca, il rapporto di eliminazione aumenta. Ciò significa che un maggior numero di entità viene saltato durante il processo di ricerca. Confrontando le statistiche della prima e dell'ultima riga, si può notare che le ricerche senza compattazione del clustering richiedono la scansione dell'intera collezione. D'altra parte, le ricerche con la compattazione del clustering utilizzando una chiave specifica possono ottenere un miglioramento fino a 25 volte.</p>
<h2 id="Best-practices" class="common-anchor-header">Le migliori pratiche<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
    </button></h2><p>Ecco alcuni suggerimenti per utilizzare la compattazione del clustering in modo efficiente:</p>
<ul>
<li><p>Abilitare questa funzione per le raccolte con grandi volumi di dati. Le prestazioni di ricerca migliorano con volumi di dati più grandi in una raccolta. È una buona scelta abilitare questa funzione per le raccolte con oltre 1 milione di entità.</p></li>
<li><p>Scegliere una chiave di raggruppamento appropriata: come chiave di raggruppamento si possono usare campi scalari comunemente usati come condizioni di filtraggio. Per una raccolta che contiene dati di più tenant, è possibile utilizzare come chiave di clustering il campo che distingue un tenant dall'altro.</p></li>
<li><p>Usare la chiave di partizione come chiave di clustering. È possibile impostare <code translate="no">common.usePartitionKeyAsClusteringKey</code> su true se si desidera attivare questa funzione per tutte le raccolte nell'istanza Milvus o se si riscontrano ancora problemi di prestazioni in una raccolta di grandi dimensioni con una chiave di partizione. In questo modo, si avrà una chiave di clustering e una chiave di partizione quando si sceglie un campo scalare in una raccolta come chiave di partizione.</p>
<p>Questa impostazione non impedisce di scegliere un altro campo scalare come chiave di clustering. La chiave di raggruppamento esplicitamente designata ha sempre la precedenza.</p></li>
</ul>
