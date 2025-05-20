---
id: disk_index.md
related_key: disk_index
summary: Meccanismo di indicizzazione dei dischi in Milvus.
title: Indice su disco
---
<h1 id="On-disk-Index" class="common-anchor-header">Indice su disco<button data-href="#On-disk-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Questo articolo presenta un algoritmo di indicizzazione su disco chiamato DiskANN. Basato sui grafi Vamana, DiskANN consente di effettuare ricerche efficienti all'interno di grandi insiemi di dati.</p>
<p>Per migliorare le prestazioni delle query, è possibile <a href="/docs/it/v2.4.x/index-vector-fields.md">specificare un tipo di indice</a> per ogni campo vettoriale.</p>
<div class="alert note"> 
Attualmente, un campo vettoriale supporta solo un tipo di indice. Milvus cancella automaticamente il vecchio indice quando si cambia tipo di indice.</div>
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
    </button></h2><p>Per utilizzare DiskANN, tenere presente che</p>
<ul>
<li>DiskANN è disattivato per impostazione predefinita. Se si preferisce un indice in-memory a uno su disco, si consiglia di disabilitare questa funzione per ottenere prestazioni migliori.<ul>
<li>Per disabilitarla, si può cambiare <code translate="no">queryNode.enableDisk</code> in <code translate="no">false</code> nel file di configurazione di milvus.</li>
<li>Per abilitarla di nuovo, si può impostare <code translate="no">queryNode.enableDisk</code> su <code translate="no">true</code>.</li>
</ul></li>
<li>L'istanza di Milvus funziona su Ubuntu 18.04.6 o su una versione successiva.</li>
<li>Il percorso dati di Milvus deve essere montato su un'unità SSD NVMe per ottenere prestazioni ottimali:<ul>
<li>Per un'istanza Milvus Standalone, il percorso dei dati deve essere <strong>/var/lib/milvus/data</strong> nel contenitore in cui viene eseguita l'istanza.</li>
<li>Per un'istanza Milvus Cluster, il percorso dei dati dovrebbe essere <strong>/var/lib/milvus/data</strong> nei container in cui girano i QueryNode e gli IndexNode.</li>
</ul></li>
</ul>
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
    </button></h2><p>Per utilizzare DiskANN, assicurarsi che</p>
<ul>
<li>Usare solo vettori float con almeno 1 dimensione nei dati.</li>
<li>Utilizzare solo la distanza euclidea (L2), il prodotto interno (IP) o COSINE per misurare la distanza tra i vettori.</li>
</ul>
<h2 id="Index-and-search-settings" class="common-anchor-header">Impostazioni dell'indice e della ricerca<button data-href="#Index-and-search-settings" class="anchor-icon" translate="no">
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
<li><p>Parametri di costruzione dell'indice</p>
<p>Quando si costruisce un indice DiskANN, utilizzare <code translate="no">DISKANN</code> come tipo di indice. Non sono necessari parametri di indice.</p></li>
<li><p>Parametri di ricerca</p>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">search_list</code></td><td>Dimensione dell'elenco dei candidati; una dimensione maggiore offre un tasso di richiamo più elevato con prestazioni inferiori.</td><td>[topk, int32_max]</td><td>16</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="DiskANN-related-Milvus-configurations" class="common-anchor-header">Configurazioni di Milvus relative a DiskANN<button data-href="#DiskANN-related-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>DiskANN è sintonizzabile. È possibile modificare i parametri relativi a DiskANN in <code translate="no">${MILVUS_ROOT_PATH}/configs/milvus.yaml</code> per migliorarne le prestazioni.</p>
<pre><code translate="no" class="language-YAML">...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>Parametro</th><th>Descrizione</th><th>Intervallo di valori</th><th>Valore predefinito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MaxDegree</code></td><td>Grado massimo del grafo Vamana. <br/> Un valore maggiore offre un tasso di richiamo più elevato, ma aumenta le dimensioni e il tempo di costruzione dell'indice.</td><td>[1, 512]</td><td>56</td></tr>
<tr><td><code translate="no">SearchListSize</code></td><td>Dimensione dell'elenco dei candidati. <br/> Un valore maggiore aumenta il tempo impiegato per costruire l'indice, ma offre un tasso di richiamo più elevato. <br/> Impostare un valore inferiore a <code translate="no">MaxDegree</code> a meno che non sia necessario ridurre il tempo di costruzione dell'indice.</td><td>[1, int32_max]</td><td>100</td></tr>
<tr><td><code translate="no">PQCodeBugetGBRatio</code></td><td>Limite di dimensione del codice PQ. <br/> Un valore maggiore offre un tasso di richiamo più elevato, ma aumenta l'utilizzo della memoria.</td><td>(0.0, 0.25]</td><td>0.125</td></tr>
<tr><td><code translate="no">SearchCacheBudgetGBRatio</code></td><td>Rapporto tra i numeri dei nodi in cache e i dati grezzi. <br/> Un valore maggiore migliora le prestazioni di costruzione dell'indice, ma aumenta l'uso della memoria.</td><td>[0.0, 0.3)</td><td>0.10</td></tr>
<tr><td><code translate="no">BeamWidthRatio</code></td><td>Rapporto tra il numero massimo di richieste IO per iterazione di ricerca e il numero di CPU.</td><td>[1, max(128/numero di CPU, 16)].</td><td>4.0</td></tr>
</tbody>
</table>
<h2 id="Troubleshooting" class="common-anchor-header">Risoluzione dei problemi<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
<li><p>Come risolvere l'errore <code translate="no">io_setup() failed; returned -11, errno=11:Resource temporarily unavailable</code>?</p>
<p>Il kernel Linux offre la funzione Asynchronous non-blocking I/O (AIO) che consente a un processo di avviare più operazioni di I/O simultaneamente senza dover attendere il completamento di nessuna di esse. Ciò contribuisce ad aumentare le prestazioni delle applicazioni che possono sovrapporre elaborazione e I/O.</p>
<p>Le prestazioni possono essere regolate utilizzando il file virtuale <code translate="no">/proc/sys/fs/aio-max-nr</code> nel file system proc. Il parametro <code translate="no">aio-max-nr</code> determina il numero massimo di richieste contemporanee consentite.</p>
<p>Il valore predefinito di <code translate="no">aio-max-nr</code> è <code translate="no">65535</code>, ma è possibile impostarlo su <code translate="no">10485760</code>.</p></li>
</ul>
