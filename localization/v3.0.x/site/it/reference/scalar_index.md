---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Gli indici scalari accelerano il filtraggio sui campi non vettoriali. Questa
  guida spiega come Milvus seleziona gli indici scalari, quali tipi di indice è
  possibile specificare e quali tipi di dati supporta ciascun indice.
title: Indice scalare
---
<h1 id="Scalar-Index" class="common-anchor-header">Indice scalare<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Gli indici scalari accelerano il filtraggio su campi non vettoriali, quali categorie, prezzi, timestamp e posizioni. Quando un'espressione di filtro restringe una ricerca, un indice scalare consente a Milvus di individuare le entità corrispondenti senza dover eseguire la scansione del campo.</p>
<p>Se non si è sicuri di quale indice scegliere, utilizzare <code translate="no">AUTOINDEX</code>. Specificare manualmente un tipo di indice solo quando è necessario un comportamento particolare.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Scelta di un indice scalare<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>La tabella seguente elenca l’indice selezionato di default da Milvus quando si utilizza <code translate="no">AUTOINDEX</code>, insieme ai tipi di indice che è possibile specificare manualmente per ciascun tipo di dati.</p>
<table>
<thead>
<tr><th>Tipo di dati</th><th>Impostazione predefinita di AUTOINDEX</th><th>Tipi di indice manuali</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> con un cast a scalare o array tipizzato</td><td><code translate="no">HYBRID</code></td><td>Dipende da <code translate="no">json_cast_type</code>; vedere <a href="#JSON-field-indexing">l'indicizzazione dei campi JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> con <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> tramite <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Non supportato</td><td>Nessuno</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> è una strategia interna, non un tipo che è possibile specificare direttamente. Vedere <a href="#How-AUTOINDEX-selects">Come funziona la selezione AUTOINDEX</a>.</p>
<p>Si applicano le seguenti restrizioni:</p>
<ul>
<li><strong>Chiavi primarie:</strong> l'<code translate="no">BITMAP</code> non è disponibile sui campi della chiave primaria.</li>
<li><strong>Array:</strong> gli array ricorsivi e quelli con elementi nullabili non supportano l'indicizzazione scalare, inclusa l'<code translate="no">AUTOINDEX</code>. Gli array ordinari supportano elementi booleani, interi, in virgola mobile e VARCHAR.</li>
<li><strong>Array di strutture:</strong> indicizzare i sottocampi scalari singolarmente. Il loro supporto può differire da quello degli array ordinari; ad esempio, un sottocampo di struttura booleano non supporta l’ <code translate="no">STL_SORT</code> esplicito.</li>
<li><strong>TEXT:</strong> Gli indici scalari creati dall’utente, compreso l’ <code translate="no">AUTOINDEX</code>, non sono disponibili. L’analisi del testo e la ricerca BM25 utilizzano meccanismi separati.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Tipi di indice<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Tipo di indice</th><th>A cosa serve</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Filtri generici di uguaglianza, appartenenza e intervallo.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Campi con pochi valori distinti; filtraggio bit a bit compatto.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Ricerca di valori ordinati e filtraggio per intervallo.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Uguaglianza di stringhe e corrispondenza di prefissi.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE ed espressioni regolari sulle stringhe tramite restrizione dei candidati.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Corrispondenza esatta di prefissi, suffissi e sottostringhe infisse.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Filtraggio spaziale sui campi GEOMETRY.</td></tr>
</tbody>
</table>
<p>Per esempi di creazione, parametri di indice e query supportate, fare riferimento a <a href="/docs/it/bitmap.md">BITMAP</a>, <a href="/docs/it/inverted.md">INVERTED</a>, <a href="/docs/it/ngram.md">NGRAM</a>, <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/trie.md">TRIE</a>, <a href="/docs/it/fmindex.md">FMINDEX</a> e <a href="/docs/it/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Come funziona la selezione con AUTOINDEX<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Con l’opzione “ <code translate="no">AUTOINDEX</code> ”, Milvus seleziona un indice in base al tipo di campo, alla configurazione del server e, per alcuni campi, al numero di valori distinti (cardinalità). Le selezioni predefinite sono elencate nella sezione <a href="#Choosing-a-scalar-index">“Scelta di un indice scalare</a>”.</p>
<p>Per la maggior parte dei campi, <code translate="no">AUTOINDEX</code> utilizza una strategia interna denominata « <code translate="no">HYBRID</code> » che sceglie un indice in base alla cardinalità:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> quando una build contiene meno di 100 valori distinti.</li>
<li><strong><code translate="no">STL_SORT</code></strong> quando una build contiene 100 o più valori distinti.</li>
</ul>
<p>Gli indici array utilizzano una politica di compatibilità separata: il loro ramo ad alta cardinalità utilizza <code translate="no">STL_SORT</code> quando il cluster lo supporta, altrimenti <code translate="no">INVERTED</code>. Vedere <a href="#Version-compatibility">"Compatibilità tra versioni</a>".</p>
<p><code translate="no">HYBRID</code> È solo interna: non è possibile specificarla direttamente. Una selezione interna può anche utilizzare un indice non disponibile come scelta esplicita per quel campo, come l’indicizzazione bitmap per i valori in virgola mobile.</p>
<blockquote>
<p>Queste selezioni sono predefinite. Gli amministratori possono modificarle tramite <code translate="no">scalarAutoIndex.params.build</code>. L’impostazione <code translate="no">scalarAutoIndex.enable</code> è predefinita su <code translate="no">false</code>, che consente comunque l’uso esplicito di <code translate="no">AUTOINDEX</code> e la selezione quando il tipo di indice è omesso; impostandola su <code translate="no">true</code> si applica la selezione automatica anche alle richieste manuali altrimenti valide.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Indicizzazione dei campi JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Per indicizzare i valori JSON, specificare <code translate="no">json_cast_type</code> per indicare il tipo di valori da indicizzare. Questo parametro è obbligatorio sia per l’indicizzazione automatica che per quella manuale. Utilizzare <code translate="no">json_path</code> per identificare il percorso; se omesso, Milvus utilizza il nome del campo fornito nella richiesta.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>Impostazione predefinita di AUTOINDEX</th><th>Tipi di indicizzazione manuale</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>Il cast <code translate="no">JSON</code> seleziona l'indicizzazione JSON completa anziché un indice di percorso scalare tipizzato e modifica l'impostazione predefinita di <code translate="no">AUTOINDEX</code> da <code translate="no">HYBRID</code> a <code translate="no">INVERTED</code>.</p>
<p>Il cast opzionale ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` converte i valori stringa per un cast ` <code translate="no">DOUBLE</code> `. Non può essere utilizzato con altri tipi di cast. Né ` <code translate="no">TRIE</code> ` né ` <code translate="no">FMINDEX</code> ` supportano i campi JSON.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Predicati supportati<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tabelle seguenti mostrano quali predicati ciascun indice può aiutare a valutare. <strong>Il supporto dell’indice non garantisce che Milvus utilizzi l’indice per ogni query.</strong> Milvus può eseguire la scansione dei dati dei campi quando l’indice non è adatto a una particolare espressione o a un particolare modello.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Confronto e appartenenza<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>L’uguaglianza e l’appartenenza includono <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code> e <code translate="no">not in</code>. I confronti di intervallo includono <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code> ed espressioni come <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Tipo di indice</th><th>Tipi di dati dei campi</th><th>Predicati supportati dall’indice</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Uguaglianza e appartenenza</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Interi, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Uguaglianza, appartenenza e intervalli</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Uguaglianza e appartenenza</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Numeri interi, <code translate="no">VARCHAR</code></td><td>Uguaglianza, appartenenza e intervalli</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Numeri interi, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Uguaglianza, appartenenza e intervalli</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Uguaglianza, appartenenza e intervalli; la valutazione degli intervalli può interessare più stringhe indicizzate</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Solo pattern di stringhe; nessuna ricerca diretta di uguaglianza, appartenenza o intervallo</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Solo pattern di stringhe; nessuna ricerca diretta di uguaglianza, appartenenza o intervallo</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Predicati spaziali, elencati di seguito</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Tipi scalari supportati</td><td>Dipende dall’indice selezionato. Le selezioni interne di tipo “ <code translate="no">HYBRID</code> ” utilizzano le funzionalità del proprio indice bitmap, ordinato o invertito.</td></tr>
</tbody>
</table>
<p>Gli intervalli VARCHAR confrontano i valori delle stringhe anziché interpretarli come numeri. La tabella descrive solo i confronti con valori letterali; ciò non implica che le espressioni aritmetiche o i confronti tra due campi beneficino della stessa accelerazione dell’indice.</p>
<h3 id="String-patterns" class="common-anchor-header">Modelli di stringa<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Questa tabella si applica ai campi VARCHAR. Per i percorsi di stringhe JSON, utilizzare un indice e un cast <code translate="no">VARCHAR</code> supportati dalla tabella di indicizzazione JSON; si applica il comportamento delle stringhe corrispondente.</p>
<ul>
<li><strong>Sì:</strong> l’indice restituisce corrispondenze esatte.</li>
<li><strong>Verifica dei valori indicizzati:</strong> Milvus valuta il modello rispetto alle stringhe memorizzate nell’indice, il che può richiedere la consultazione di molte stringhe distinte.</li>
<li><strong>Candidati:</strong> l’indice restringe il campo delle possibili corrispondenze, quindi Milvus verifica i valori originali.</li>
<li><strong>Scansione:</strong> l’indice non soddisfa il predicato; Milvus utilizza un altro percorso idoneo o esegue la scansione del campo.</li>
</ul>
<table>
<thead>
<tr><th>Tipo di indice</th><th>Prefisso <code translate="no">like &quot;abc%&quot;</code></th><th>Suffisso <code translate="no">like &quot;%abc&quot;</code></th><th>Sottostringa <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE generico <code translate="no">like &quot;a%b_c&quot;</code></th><th>Espressione regolare <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Sì</td><td>Scansione</td><td>Scansione</td><td>Sì</td><td>Scansione</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Verifica i valori indicizzati</td><td>Verifica dei valori indicizzati</td><td>Verifica dei valori indicizzati</td><td>Verifica i valori indicizzati</td><td>Verifica dei valori indicizzati</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Sì</td><td>Verifica i valori indicizzati</td><td>Verifica i valori indicizzati</td><td>Verifica i valori indicizzati</td><td>Verifica i valori indicizzati</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Sì</td><td>Verifica i valori indicizzati</td><td>Verifica i valori indicizzati</td><td>Verifica i valori indicizzati</td><td>Verifica dei valori indicizzati</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Candidati</td><td>Candidati</td><td>Candidati; corrispondenza esatta per un letterale all'interno dell'intervallo di lunghezza del gramma configurato</td><td>Candidati</td><td>Candidati</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Sì</td><td>Sì</td><td>Sì</td><td>Candidati</td><td>Candidati</td></tr>
</tbody>
</table>
<p>Queste voci descrivono l'operatore dopo la pianificazione della query. Milvus può semplificare un pattern LIKE letterale in un'uguaglianza e una semplice espressione regolare ancorata in un'uguaglianza, una corrispondenza di prefisso o di suffisso; ad esempio, <code translate="no">name =~ &quot;^abc$&quot;</code> diventa un test di uguaglianza e segue la tabella delle uguaglianze.</p>
<p><code translate="no">INVERTED</code> tratta le semplici forme di suffisso e sottostringa come scansioni, anche se i pattern LIKE più complessi possono utilizzare l’indice. <code translate="no">NGRAM</code> richiede un testo letterale lungo almeno <code translate="no">min_gram</code> caratteri; il LIKE generale richiede che ogni frammento letterale non vuoto soddisfi tale minimo, e l’accelerazione delle espressioni regolari dipende dall’estrazione di letterali adeguati. In caso contrario, Milvus esegue una scansione dei dati. Anche <code translate="no">FMINDEX</code> può optare per una scansione quando un pattern fornisce un filtraggio poco utile o è troppo oneroso da risolvere tramite l’indice.</p>
<p>Si tratta di predicati con valori stringa. Le funzioni basate sui token, come <code translate="no">TEXT_MATCH</code> e <code translate="no">PHRASE_MATCH</code>, utilizzano l’indicizzazione per corrispondenza testuale configurata tramite le proprietà dei campi; la scelta di un indice scalare <code translate="no">INVERTED</code> non abilita tali funzioni.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Predicati su array, JSON e spaziali<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Tipo di indice</th><th>Tipo di dati o conversione</th><th>Predicati che possono utilizzare l’indice</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, oppure una selezione idonea da <code translate="no">AUTOINDEX</code> </td><td>Array ordinari con tipi di elementi supportati</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Corrisponde agli elementi indipendentemente dalla loro posizione. Si applicano comunque le restrizioni relative all’indice e al tipo.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Array ordinari di valori booleani, interi o VARCHAR</td><td><code translate="no">==</code> dell’intero array e <code translate="no">!=</code></td><td>È possibile utilizzare candidati di indice seguiti da verifiche degli array originali. Gli array in virgola mobile ricorrono alla scansione; gli indici bitmap non supportano questo percorso candidato.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> o una selezione idonea di <code translate="no">AUTOINDEX</code> </td><td>Percorsi JSON convertiti in <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code></td><td>Confronto e appartenenza appropriati al tipo di conversione</td><td>Il percorso indicizzato e la conversione devono corrispondere alla query. I pattern di stringa seguono la tabella precedente.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Percorsi JSON convertiti in <code translate="no">VARCHAR</code></td><td>modelli LIKE e regex</td><td>Utilizza le stesse regole di ammissibilità dei pattern degli indici VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> o una selezione ammissibile di <code translate="no">AUTOINDEX</code> </td><td>Percorsi JSON convertiti in <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Richiede tipi di elementi compatibili. Gli operandi di tipo misto o con array annidati possono ricorrere alla scansione.</td></tr>
<tr><td><code translate="no">INVERTED</code> con conversione <code translate="no">JSON</code></td><td>Indice JSON completo</td><td>Confronto e appartenenza su percorsi scalari supportati; pattern di stringa supportati; contenimento JSON su percorsi di array supportati</td><td>I percorsi stringa seguono il comportamento INVERTITO. Il contenimento degli array richiede tipi di elementi compatibili.</td></tr>
<tr><td>Indici di percorso JSON e indici JSON completi</td><td>Percorsi JSON indicizzati</td><td><code translate="no">exists</code></td><td>Verifica se il percorso esiste, il che è diverso dal verificare il suo valore o se l’intero campo è nullo.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Utilizza i bounding box per individuare i candidati, quindi verifica la relazione spaziale esatta. <code translate="no">ST_ISVALID</code> non utilizza RTREE.</td></tr>
</tbody>
</table>
<p>Il supporto del contenimento degli array non implica la ricerca nell’indice di un elemento in una posizione specifica, come nel caso di <code translate="no">values[0]</code>, né della lunghezza dell’array. L’uguaglianza dell’intero array deve inoltre verificare l’ordine e la lunghezza, cosa che l’appartenenza di un singolo elemento non può stabilire da sola.</p>
<p><code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> utilizzano informazioni di validità e non richiedono un particolare tipo di indice scalare. È possibile combinare predicati con <code translate="no">and</code>, <code translate="no">or</code> e <code translate="no">not</code>; ciascuna parte può utilizzare il proprio percorso di esecuzione ammissibile.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilità tra versioni<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>La maggior parte degli indici scalari — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> e <code translate="no">NGRAM</code> su campi scalari ordinari — non presenta requisiti di versione. I requisiti riportati di seguito si applicano solo alle combinazioni più recenti: indici su campi array, indici JSON-path e <code translate="no">FMINDEX</code>.</p>
<p>Questi requisiti utilizzano i numeri di versione del motore di indicizzazione scalare, un contatore interno delle funzionalità distinto dai numeri di versione del software Milvus.</p>
<table>
<thead>
<tr><th>Funzionalità</th><th>Requisito</th></tr>
</thead>
<tbody>
<tr><td>Esplicito <code translate="no">FMINDEX</code></td><td>Versione 5 o successiva del motore di indicizzazione scalare</td></tr>
<tr><td><code translate="no">STL_SORT</code> o esplicito su array ordinari</td><td>Motore di indicizzazione scalare versione 3 o successiva, con supporto per l'ordinamento degli array abilitato</td></tr>
<tr><td><code translate="no">HYBRID</code> selezione dell'<code translate="no">STL_SORT</code> per gli array ordinari</td><td>Motore di indicizzazione scalare versione 5 o successiva, con supporto per l'ordinamento degli array abilitato</td></tr>
<tr><td><code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> o <code translate="no">HYBRID</code> su percorsi scalari JSON</td><td>Motore di indicizzazione scalare versione 4 o successive</td></tr>
<tr><td><code translate="no">STL_SORT</code> oppure <code translate="no">HYBRID</code> sui percorsi di array JSON tipizzati</td><td>Motore di indicizzazione scalare versione 3 o successiva, con supporto per l'ordinamento degli array abilitato</td></tr>
</tbody>
</table>
<p>Se un requisito di compatibilità con gli array o JSON non viene soddisfatto, le richieste automatiche interessate possono ricorrere a <code translate="no">INVERTED</code>, mentre le richieste esplicite per combinazioni non supportate falliscono. Per <code translate="no">HYBRID</code> su array ordinari, il ramo ad alta cardinalità continua a utilizzare <code translate="no">INVERTED</code> fino a quando non è disponibile l'indicizzazione ordinata.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Considerazioni sulle prestazioni<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Le prestazioni degli indici dipendono dalla distribuzione dei dati e dai filtri utilizzati dall’applicazione. La cardinalità, la lunghezza delle stringhe, la lunghezza degli array e il numero di entità corrispondenti possono influire sull’utilizzo della memoria e sulla latenza delle query. Confrontare gli indici utilizzando dati ed espressioni di filtro rappresentativi e misurare congiuntamente l’utilizzo della memoria, il tempo di creazione e la latenza delle query.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Stima dei requisiti di memoria<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Le formule seguenti forniscono un'idea approssimativa della memoria necessaria per un indice scalare dopo il caricamento, con la mappatura della memoria disabilitata. Le formule <code translate="no">STL_SORT</code> presuppongono campi scalari ordinari senza valori nulli.</p>
<ul>
<li><code translate="no">N</code>: numero di entità.</li>
<li><code translate="no">D</code>: numero di valori distinti.</li>
<li><code translate="no">l</code>: lunghezza media delle stringhe distinte, in <strong>byte</strong>.</li>
<li><code translate="no">S</code>: dimensione dell’indice creato prima della compressione in memoria, in <strong>byte</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Tipo di indice</th><th>Stima approssimativa della memoria in byte</th><th>Intuizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> su <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, oppure <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Circa 12 byte per entità.</td></tr>
<tr><td><code translate="no">STL_SORT</code> su <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> o <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Circa 20 byte per entità per valori più grandi.</td></tr>
<tr><td><code translate="no">STL_SORT</code> su <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Le stringhe ripetute condividono lo spazio di archiviazione, quindi un numero minore di stringhe distinte comporta solitamente un minor consumo di memoria.</td></tr>
<tr><td><code translate="no">BITMAP</code>, utilizzando bitmap dense</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Ogni valore distinto richiede all’incirca un bit per entità, più una bitmap per tenere traccia delle entità valide.</td></tr>
<tr><td><code translate="no">INVERTED</code> oppure <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Partire da una dimensione approssimativa pari a quella dell’indice creato.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Prevedere circa il doppio della dimensione dell’indice creato.</td></tr>
</tbody>
</table>
<p>Dividere il risultato per <code translate="no">1024 * 1024</code> per convertire i byte in <strong>MiB</strong>. Ad esempio, un indice <code translate="no">STL_SORT</code> su un milione di valori <code translate="no">INT64</code> non nulli richiede circa <strong>19 MiB</strong> per le sue strutture dati principali. Per i campi VARCHAR in cui ogni stringa è unica, la stima si semplifica in <code translate="no">(l + 24) * N</code>; un milione di stringhe uniche con una media di 32 byte dà circa <strong>53 MiB</strong>.</p>
<p>La formula BITMAP descrive l’archiviazione bitmap densa; l’abilitazione della cache di offset opzionale aggiunge circa <code translate="no">8 * N</code> byte su un sistema a 64 bit. Per <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> e <code translate="no">FMINDEX</code>, creare un indice su dati rappresentativi per ottenere <code translate="no">S</code> — la dimensione dei dati grezzi non sostituisce la dimensione dell’indice creato. Per <code translate="no">AUTOINDEX</code>, utilizzare la formula relativa all’indice effettivamente selezionato, applicare le stime per segmento, quindi sommarle tra i segmenti caricati e le repliche.</p>
<p>Si tratta di cifre approssimative di pianificazione, non di limiti di memoria. Esse omettono la memoria temporanea utilizzata durante la creazione, il caricamento e le query, e sono più sensibili ai valori distinti e alla distribuzione dei dati per gli indici stringa e bitmap rispetto a quelli numerici <code translate="no">STL_SORT</code>. Non è garantita alcuna percentuale fissa di accuratezza. Il memory mapping, i formati di indice meno recenti, gli array e i campi JSON richiedono misurazioni separate. Prima di dimensionare un’implementazione, verificare l’utilizzo effettivo della memoria con dati e query rappresentativi e lasciare un margine per i picchi di utilizzo.</p>
<h2 id="Whats-next" class="common-anchor-header">Prossimi passi<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Per esempi di creazione e configurazione degli indici, fare riferimento a <a href="/docs/it/bitmap.md">BITMAP</a>, <a href="/docs/it/inverted.md">INVERTED</a>, <a href="/docs/it/ngram.md">NGRAM</a>, <a href="/docs/it/stl-sort.md">STL_SORT</a>, <a href="/docs/it/trie.md">TRIE</a>, <a href="/docs/it/fmindex.md">FMINDEX</a> e <a href="/docs/it/rtree.md">RTREE</a>.</li>
<li>Per le definizioni dei campi e gli schemi delle raccolte, consultare la sezione " <a href="/docs/it/schema.md">Schema Explained</a>".</li>
</ul>
