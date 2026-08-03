---
id: json-indexing.md
title: Indicizzazione JSON
summary: >-
  I campi JSON offrono un modo flessibile per memorizzare metadati strutturati
  in Milvus. Senza indicizzazione, le query sui campi JSON richiedono scansioni
  complete della raccolta, che diventano lente man mano che il set di dati
  cresce. L'indicizzazione JSON crea indici su percorsi specifici all'interno
  dei dati JSON, in modo che le query di uguaglianza, di intervallo e altre
  query di filtro su tali percorsi vengano eseguite rapidamente.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Indicizzazione JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>I campi JSON offrono un modo flessibile per memorizzare metadati strutturati in Milvus. Senza indicizzazione, le query sui campi JSON richiedono scansioni complete della raccolta, che diventano lente man mano che il set di dati cresce. L'indicizzazione JSON crea un indice su un percorso specifico all'interno dei dati JSON, in modo che le query di uguaglianza, intervallo e altri filtri su quel percorso vengano eseguite rapidamente.</p>
<p>L'indicizzazione JSON è ideale per:</p>
<ul>
<li><p>Schemi strutturati con chiavi note e coerenti</p></li>
<li><p>Query di uguaglianza, " <code translate="no">IN</code>", intervallo e corrispondenza testuale su percorsi JSON specifici</p></li>
<li><p>Scenari in cui è necessario un controllo preciso sulle chiavi da indicizzare</p></li>
</ul>
<p>Per documenti JSON complessi con modelli di query diversificati, si consiglia di considerare <a href="/docs/it/json-shredding.md">lo "shredding" JSON</a> come alternativa.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Panoramica dei tipi di indice<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre quattro tipi di indice per i percorsi JSON. Ciascuno è adatto a un diverso modello di query.</p>
<p>Prima di scegliere un tipo di indice, identificare il <strong>tipo di conversione (cast)</strong> per il percorso JSON. Il tipo di conversione determina come Milvus interpreta il valore in quel percorso e quali tipi di indice sono disponibili.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Comprendere i tipi di conversione<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> è il tipo di dati utilizzato per interpretare e indicizzare il valore presente all'indirizzo <code translate="no">json_path</code>. È diverso dal tipo di schema del campo: il campo rimane un campo di tipo " <code translate="no">JSON</code> ", ma ogni percorso indicizzato viene trattato come un tipo specifico di scalare, array o oggetto JSON.</p>
<p>Scegliere il tipo di conversione che corrisponde ai valori memorizzati nel percorso. Per verificare se un tipo di conversione è compatibile con un tipo di indice specifico, consultare <a href="/docs/it/json-indexing.md#compatibility-reference">il Riferimento alla compatibilità</a>.</p>
<table>
<thead>
<tr><th>Tipo di conversione</th><th>Da utilizzare quando il valore del percorso è…</th><th>Valore di esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Un valore booleano</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Un valore numerico</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Un valore stringa</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Un array di valori booleani</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Un array di valori numerici</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Un array di valori stringa</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un intero oggetto JSON o un sotto-oggetto. L'indicizzazione di interi oggetti JSON è deprecata a partire da Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Se i valori presenti nello stesso percorso hanno tipi incoerenti, vengono indicizzati solo i valori che corrispondono al tipo di conversione. Ad esempio, se <code translate="no">metadata[&quot;price&quot;]</code> contiene sia <code translate="no">99.99</code> che <code translate="no">&quot;99.99&quot;</code>, un indice del tipo di conversione <code translate="no">DOUBLE</code> include il valore numerico e ignora il valore stringa. Per convertire i valori stringa durante l'indicizzazione, utilizzare <code translate="no">json_cast_function</code>; vedere <a href="/docs/it/json-indexing.md#example-5-convert-data-type-at-index-time">Esempio 5: Convertire il tipo di dati al momento dell'indicizzazione</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Scegliere un tipo di indice<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver scelto un tipo di conversione, selezionare il tipo di indice in base al modello di query.</p>
<table>
<thead>
<tr><th>Modello di query</th><th>Tipo di indice consigliato</th><th>Requisiti relativi al tipo di conversione</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>Filtri misti di uguaglianza e intervallo su valori scalari</td><td><code translate="no">AUTOINDEX</code></td><td>Utilizzare <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code>.</td><td>Lascia che Milvus scelga il layout interno dell'indice in base alla cardinalità dei valori.</td></tr>
<tr><td>Filtri su valori all'interno di array JSON</td><td><code translate="no">INVERTED</code></td><td>Utilizzare <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code>.</td><td>Obbligatorio per tutti i tipi di array.</td></tr>
<tr><td>Indicizzazione dell’intero oggetto o di un sotto-oggetto (deprecata)</td><td><code translate="no">INVERTED</code> oppure <code translate="no">AUTOINDEX</code> (solo per motivi di compatibilità)</td><td>Utilizzare <code translate="no">JSON</code>.</td><td>Supportato per motivi di compatibilità. Per i nuovi carichi di lavoro, creare indici specifici per percorso o prendere in considerazione <a href="/docs/it/json-shredding.md">lo "shredding" JSON</a>.</td></tr>
<tr><td>Filtri di intervallo su numeri o stringhe ordinabili</td><td><code translate="no">STL_SORT</code> oppure <code translate="no">AUTOINDEX</code></td><td>Utilizzare <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code>.</td><td>Utilizzare <code translate="no">STL_SORT</code> per forzare un layout ordinato; utilizzare <code translate="no">AUTOINDEX</code> quando si desidera la selezione automatica.</td></tr>
<tr><td>Filtri di uguaglianza o di " <code translate="no">IN</code> " su valori a bassa cardinalità</td><td><code translate="no">BITMAP</code> oppure <code translate="no">AUTOINDEX</code></td><td>Utilizzare <code translate="no">BOOL</code> o <code translate="no">VARCHAR</code>.</td><td>Utilizzare <code translate="no">BITMAP</code> per forzare un layout bitmap. Per i valori numerici, utilizzare <code translate="no">AUTOINDEX</code> o <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>In caso di dubbio, iniziare con <code translate="no">AUTOINDEX</code> per i percorsi scalari. Utilizzare <code translate="no">INVERTED</code> in modo esplicito per i tipi di conversione ad array e le query di corrispondenza testuale. L'indicizzazione JSON dell'intero oggetto con <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code> rimane supportata, ma è deprecata a partire da Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> dipendono dall’ <code translate="no">json_cast_type</code> e specificato. In Milvus 3.0, <code translate="no">AUTOINDEX</code> non viene più sempre risolto in <code translate="no">INVERTED</code> per gli indici con percorsi JSON.</p>
<table>
<thead>
<tr><th>Tipo di conversione</th><th><code translate="no">AUTOINDEX</code> comportamento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Sceglie tra <code translate="no">BITMAP</code> e <code translate="no">STL_SORT</code> in base alla cardinalità del valore.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Non supportato. Utilizzare esplicitamente <code translate="no">INVERTED</code> come tipo di indice.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Utilizza <code translate="no">INVERTED</code> per l’indicizzazione di oggetti interi o sotto-oggetti. Questa modalità è deprecata a partire da Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Per i tipi di conversione scalare (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> e <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> è il punto di partenza consigliato quando si desidera che Milvus scelga il layout interno dell’indice. Durante la creazione dell’indice, Milvus misura la <strong>cardinalità</strong> dei valori nel percorso JSON. Per cardinalità si intende il numero di valori distinti presenti in quel percorso.</p>
<p>In base alla cardinalità, Milvus sceglie uno dei due layout interni:</p>
<ul>
<li><p><strong>Bassa cardinalità</strong>: i valori si ripetono spesso, come nel caso di <code translate="no">metadata[&quot;in_stock&quot;]</code> con <code translate="no">true</code> e <code translate="no">false</code>, oppure <code translate="no">metadata[&quot;status&quot;]</code> con un piccolo insieme di stringhe di stato. Milvus crea internamente un indice di tipo « <code translate="no">BITMAP</code> » per consentire filtri rapidi di uguaglianza e di tipo « <code translate="no">IN</code> ».</p></li>
<li><p><strong>Alta cardinalità</strong>: la maggior parte dei valori è distinta, come ad esempio <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> o <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus crea internamente un indice <code translate="no">STL_SORT</code> per filtri di intervallo veloci quali <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> e <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>La soglia predefinita per <code translate="no">BITMAP</code> rispetto a<code translate="no">STL_SORT</code> è di <strong>100 valori distinti</strong>. È possibile ottimizzare questa soglia tramite <code translate="no">bitmap_cardinality_limit</code>; consultare la sezione <a href="/docs/it/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">«Come si ottimizza la soglia BITMAP rispetto a STL_SORT di AUTOINDEX?</a>».</p>
<div class="alert note">
<p><strong>Modifica del comportamento in Milvus 3.0</strong>. Nelle versioni precedenti, l’ <code translate="no">AUTOINDEX</code> sui percorsi JSON creava sempre un indice <code translate="no">INVERTED</code>. A partire da Milvus 3.0, <code translate="no">AUTOINDEX</code> sceglie tra <code translate="no">BITMAP</code> e <code translate="no">STL_SORT</code> per i tipi di conversione scalare. Per <code translate="no">JSON</code>, <code translate="no">AUTOINDEX</code> continua a utilizzare <code translate="no">INVERTED</code>, sebbene l’indicizzazione JSON dell’intero oggetto sia deprecata. Per i tipi di conversione array e le query di corrispondenza testuale, specificare esplicitamente <code translate="no">INVERTED</code>.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> è la scelta più indicata quando sono necessarie query di corrispondenza testuale o l'indicizzazione di array. Rimane disponibile anche per l'indicizzazione JSON dell'intero oggetto, ormai deprecata.</p>
<p>Specificare esplicitamente <code translate="no">INVERTED</code> quando:</p>
<ul>
<li><p>È necessario indicizzare valori all’interno di array JSON.</p></li>
<li><p>Si gestisce un indice esistente su un intero oggetto JSON o su un sotto-oggetto e si desidera rendere esplicito il comportamento " <code translate="no">INVERTED</code> ".</p></li>
<li><p>Si desidera un unico tipo di indice che gestisca query di uguaglianza, " <code translate="no">IN</code>", di intervallo, di corrispondenza testuale e su array. Il supporto per l’intero oggetto rimane disponibile per motivi di compatibilità, a costo di una dimensione dell’indice maggiore.</p></li>
</ul>
<p>Per gli indici esistenti su interi oggetti JSON (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), è possibile continuare a utilizzare <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code>. <code translate="no">AUTOINDEX</code> utilizza <code translate="no">INVERTED</code> per questo tipo di conversione. L'indicizzazione JSON dell'intero oggetto non è più consigliata per i nuovi carichi di lavoro.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> memorizza i valori provenienti da un percorso JSON in ordine di ordinamento. È ottimizzato per i filtri di intervallo su valori numerici o su valori stringa ordinabili.</p>
<p><code translate="no">STL_SORT</code> Supporta solo i tipi di conversione <code translate="no">DOUBLE</code> e <code translate="no">VARCHAR</code>. Utilizzarlo quando:</p>
<ul>
<li><p>I filtri confrontano valori con <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> o <code translate="no">&lt;=</code>.</p></li>
<li><p>I valori indicizzati hanno un’elevata cardinalità, come prezzi, timestamp, ID o codici ordinabili.</p></li>
<li><p>Si desidera imporre un layout ordinato invece di lasciare che <code translate="no">AUTOINDEX</code> scelga.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> Non supporta i tipi di conversione <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code> o <code translate="no">JSON</code>. Utilizzare <code translate="no">INVERTED</code> per gli array. Gli indici di oggetti interi esistenti possono continuare a utilizzare <code translate="no">INVERTED</code> o <code translate="no">AUTOINDEX</code>, ma l'indicizzazione JSON di oggetti interi è deprecata.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> crea una bitmap compatta per ogni valore distinto in un percorso JSON. È ottimizzata per i filtri di uguaglianza e di tipo " <code translate="no">IN</code> " su valori che si ripetono spesso.</p>
<p><code translate="no">BITMAP</code> Supporta solo i tipi di conversione <code translate="no">BOOL</code> e <code translate="no">VARCHAR</code>. Utilizzarlo quando:</p>
<ul>
<li><p>I filtri utilizzano <code translate="no">==</code> o <code translate="no">IN</code>.</p></li>
<li><p>I valori indicizzati hanno una cardinalità bassa, come i valori booleani, i valori di stato o un piccolo insieme di categorie.</p></li>
<li><p>Si desidera forzare un layout bitmap invece di lasciare che <code translate="no">AUTOINDEX</code> lo scelga.</p></li>
</ul>
<p><code translate="no">BITMAP</code> non supporta i tipi di conversione <code translate="no">DOUBLE</code>, <code translate="no">ARRAY_*</code> o <code translate="no">JSON</code>. Per i valori numerici, utilizzare invece <code translate="no">AUTOINDEX</code>, <code translate="no">STL_SORT</code> o <code translate="no">INVERTED</code>.</p>
<p>Per ulteriori dettagli, consultare <a href="/docs/it/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Riferimento alla compatibilità<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare la seguente matrice come riferimento rapido per le combinazioni di tipi di cast supportate <code translate="no">(cast type, index type)</code>.</p>
<table>
<thead>
<tr><th>Tipo di conversione</th><th>Descrizione</th><th>Valore di esempio</th><th>AUTOINDEX</th><th>INVERTITO</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Valori booleani (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Sì</td><td>Sì</td><td>No</td><td>Sì</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Valori numerici (interi o in virgola mobile).</td><td><code translate="no">99.99</code></td><td>Sì</td><td>Sì</td><td>Sì</td><td>No</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Valori stringa.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Sì</td><td>Sì</td><td>Sì</td><td>Sì</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Array di valori booleani.</td><td><code translate="no">[true, false]</code></td><td>No</td><td>Sì</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Array di numeri.</td><td><code translate="no">[1.2, 3.14]</code></td><td>No</td><td>Sì</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Array di stringhe.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>No</td><td>Sì</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un intero oggetto JSON o sotto-oggetto con inferenza automatica del tipo e appiattimento. Deprecato a partire da Milvus 3.0.0.</td><td>qualsiasi oggetto annidato</td><td>Sì (obsoleto)</td><td>Sì (deprecato)</td><td>No</td><td>No</td></tr>
</tbody>
</table>
<p>Per le celle contrassegnate c <code translate="no">No</code>, Milvus rifiuta la richiesta al momento della creazione dell'indice. Per i tipi di conversione in array, utilizzare esplicitamente <code translate="no">INVERTED</code> (<code translate="no">AUTOINDEX</code> non copre gli array).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Creazione di un indice JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Questa sezione illustra come indicizzare dati JSON di diverse forme. Tutti gli esempi utilizzano la struttura di esempio riportata di seguito e presuppongono che si disponga già di una collezione che includa un campo <code translate="no">JSON</code> denominato <code translate="no">metadata</code>.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Struttura JSON di esempio<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Configurazione di base<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Gli esempi riportati di seguito presuppongono che si disponga di un <code translate="no">MilvusClient</code> denominato <code translate="no">client</code> collegato alla propria distribuzione Milvus e di una collezione che includa già un campo <code translate="no">JSON</code> denominato <code translate="no">metadata</code>. Se è necessario configurarli da zero, espandere il blocco riportato di seguito.</p>
<p><details></p>
<p><summary>Connettiti e crea una raccolta di esempio</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Preparare un oggetto `index-params` per raccogliere le definizioni di indice aggiunte negli esempi riportati di seguito:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Ciascun esempio che segue mostra una chiamata ` <code translate="no">index_params.add_index(...)</code> `. Scegli quelli che corrispondono ai tuoi dati ed esegui le chiamate sullo stesso oggetto ` <code translate="no">index_params</code> `. Infine, applica il tutto in un'unica chiamata ` <code translate="no">client.create_index(...)</code> `. Per i dettagli, consulta la sezione <a href="/docs/it/json-indexing.md#apply-the-index">Applicare l'indice</a>.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Esempio 1: indicizzare una chiave di primo livello con AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Indice il campo <code translate="no">category</code> per un filtraggio veloce per categoria di prodotto. Con <code translate="no">AUTOINDEX</code>, Milvus sceglie <code translate="no">BITMAP</code> o <code translate="no">STL_SORT</code> in base al numero di categorie distinte presenti nei dati.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Esempio 2: indicizzazione di una chiave annidata<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Indicizzare il campo ` <code translate="no">email</code> `, profondamente annidato, per la ricerca dei contatti dei fornitori. Il parametro ` <code translate="no">json_path</code> ` accetta notazioni tra parentesi di qualsiasi profondità.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Esempio 3: Query su intervalli con STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando si sa che le query su un percorso saranno dominate da confronti di intervallo (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), scegliere direttamente l'opzion <code translate="no">STL_SORT</code>. Ciò consente di bypassare la misurazione della cardinalità e di creare immediatamente il layout ordinato.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Dopo l’indicizzazione, le query di intervallo come <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> utilizzano la ricerca binaria anziché una scansione completa.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Esempio 4: Query di uguaglianza con BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Per le chiavi a bassa cardinalità, come i codici di stato, i valori booleani o le stringhe di tipo enum, scegli direttamente <code translate="no">BITMAP</code>. Le query di uguaglianza e di tipo <code translate="no">IN</code> diventano operazioni bitmap.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> È inoltre particolarmente adatto a campi come una colonna " <code translate="no">status</code> " con pochi valori stringa distinti.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Esempio 5: Conversione del tipo di dati in fase di indicizzazione<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando i dati numerici vengono erroneamente memorizzati come stringhe, utilizzare ` <code translate="no">STRING_TO_DOUBLE</code> ` per convertire il valore in un numero durante la creazione dell’indice.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Se la conversione fallisce per una riga (ad esempio, una stringa non numerica come <code translate="no">&quot;invalid&quot;</code>), quella riga viene saltata durante l'indicizzazione.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Esempio 6: Indicizzazione di interi oggetti JSON<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>A partire da Milvus 3.0.0, l’indicizzazione di interi oggetti JSON (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), nota anche come indicizzazione JSON flat, è deprecata. Gli indici esistenti e le nuove richieste di creazione di indici rimangono supportati per motivi di compatibilità, ma questa modalità non è più raccomandata per i nuovi carichi di lavoro. Creare indici JSON path per percorsi di query noti. Per documenti JSON complessi o in evoluzione con modelli di query estesi, prendere in considerazione <a href="/docs/it/json-shredding.md">lo "shredding" JSON</a>. Lo shredding JSON non accelera i valori all’interno degli array; per tali query, utilizzare indici di percorso JSON con tipi di conversione array.</p>
</div>
<p>Per i carichi di lavoro esistenti compatibili, l’impostazione di “ <code translate="no">json_cast_type=&quot;JSON&quot;</code> ” indicizza l’intera struttura al percorso specificato. Milvus appiattisce gli oggetti annidati in percorsi e deduce automaticamente il tipo di ciascun valore. Tutte le chiavi presenti nel percorso diventano ricercabili.</p>
<p><code translate="no">AUTOINDEX</code> Utilizza in modo trasparente l’ <code translate="no">INVERTED</code> per il tipo di conversione « <code translate="no">JSON</code> », poiché l’appiattimento e l’inferenza del tipo sono funzionalità dell’indice invertito.</p>
<p>Indicizzare l’intero oggetto ` <code translate="no">metadata</code> `:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Oppure indicizzare un sotto-oggetto, come tutte le informazioni di <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>L'indicizzazione di oggetti interi aumenta le dimensioni dell'indice. Per i nuovi carichi di lavoro con documenti profondamente annidati e modelli di query diversificati, utilizzare indici specifici per percorso o prendere in considerazione <a href="/docs/it/json-shredding.md">lo "shredding" JSON</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Applicare l’indice<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Dopo aver aggiunto tutti i parametri dell’indice, applicarli alla propria collezione:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>La creazione degli indici avviene in modo asincrono. Utilizzare <code translate="no">client.describe_index(...)</code> per verificare lo stato di creazione di un indice specifico. Il campo " <code translate="no">state</code> " (Stato dell'indice) mostra " <code translate="no">Finished</code> " una volta completata la creazione, mentre " <code translate="no">total_rows</code>", " <code translate="no">indexed_rows</code>" e " <code translate="no">pending_index_rows</code> " mostrano lo stato di avanzamento durante il processo.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Risposta di esempio:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Non appena <code translate="no">state</code> segnala <code translate="no">Finished</code>, le query eseguite sul percorso indicizzato utilizzano automaticamente il nuovo indice.</p>
<p>Per le voci <code translate="no">AUTOINDEX</code>, il campo <code translate="no">index_type</code> in questa risposta viene riportato come <code translate="no">AUTOINDEX</code>. Milvus attualmente non rivela quale layout sottostante (<code translate="no">BITMAP</code> o <code translate="no">STL_SORT</code>) sia stato scelto in fase di compilazione. Considerate la scelta come un'ottimizzazione interna: le query di uguaglianza, <code translate="no">IN</code> e di intervallo sul percorso funzioneranno indipendentemente dal layout selezionato.</p>
<h2 id="FAQ" class="common-anchor-header">Domande frequenti<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Come si fa a scegliere tra AUTOINDEX e un tipo di indice esplicito?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Iniziate con <code translate="no">AUTOINDEX</code>. Questo tipo seleziona il layout corretto in base alla cardinalità dei vostri dati e copre la maggior parte delle query di uguaglianza, <code translate="no">IN</code> e di intervallo sui percorsi JSON. Scegliete un tipo esplicito quando:</p>
<ul>
<li><p>Conoscete il vostro modello di query (ad esempio, utilizzate sempre <code translate="no">STL_SORT</code> per le query di intervallo e <code translate="no">BITMAP</code> per le query di uguaglianza su valori a bassa cardinalità) e desiderate saltare la misurazione della cardinalità.</p></li>
<li><p>Hai bisogno di query di corrispondenza testuale o di sottostringa. Usa <code translate="no">INVERTED</code>.</p></li>
<li><p>Si stanno indicizzando tipi di array convertiti. Utilizzare esplicitamente <code translate="no">INVERTED</code>.</p></li>
<li><p>Stai gestendo un indice JSON a oggetto intero esistente. Sia <code translate="no">INVERTED</code> che <code translate="no">AUTOINDEX</code> rimangono supportati per motivi di compatibilità, ma l’indicizzazione JSON a oggetto intero è deprecata a partire da Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Cosa succede se l’espressione di filtro di una query utilizza un tipo diverso dal tipo di conversione indicizzato?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Se l’espressione di filtro utilizza un tipo diverso da quello specificato in ` <code translate="no">json_cast_type</code>` dell’indice, Milvus non utilizza l’indice e potrebbe ricorrere a una scansione brute-force più lenta, se i dati lo consentono. Per ottenere le migliori prestazioni, allineare sempre l’espressione di filtro al tipo di conversione dell’indice. Ad esempio, se viene creato un indice numerico con ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`, solo le condizioni di filtro numeriche sfrutteranno l’indice.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Cosa succede se una chiave JSON presenta tipi di dati incoerenti tra entità diverse?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>I tipi incoerenti possono portare a <strong>un'indicizzazione parziale</strong>. Ad esempio, se <code translate="no">metadata[&quot;price&quot;]</code> è memorizzato sia come numero (<code translate="no">99.99</code>) che come stringa (<code translate="no">&quot;99.99&quot;</code>) e si crea un indice con <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, verranno indicizzati solo i valori numerici. Le voci in forma di stringa vengono ignorate e non appariranno nei risultati del filtro. Utilizza ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` per convertire le stringhe in numeri al momento dell’indicizzazione, oppure correggi i dati di origine in modo che tutte le voci abbiano lo stesso tipo.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">È possibile creare più indici sulla stessa chiave JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Milvus consente al massimo un indice per ogni coppia <code translate="no">(field, json_path)</code>, indipendentemente dal tipo di conversione o dal tipo di indice. Non è possibile creare sia un indice <code translate="no">INVERTED</code> che un indice <code translate="no">BITMAP</code> sullo stesso percorso, né due indici sullo stesso percorso con tipi di conversione diversi. È tuttavia possibile creare un indice sull’intero oggetto JSON e un indice separato su una chiave annidata all’interno di quell’oggetto, poiché si tratta di percorsi diversi.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Come si ottimizza la soglia BITMAP-vs-STL_SORT di AUTOINDEX?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Per impostazione predefinita, <code translate="no">AUTOINDEX</code> sceglie <code translate="no">BITMAP</code> quando i valori indicizzati hanno <strong>100 o meno valori distinti</strong> e <code translate="no">STL_SORT</code> in caso contrario. È possibile sovrascrivere questa soglia aggiungendo <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> ai parametri dell’indice (intervallo: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>La maggior parte degli utenti non ha bisogno di ottimizzare questa impostazione. Aumentala se hai un campo a cardinalità moderata che preferisci venga gestito in modalità bitmap; riducila per far sì che <code translate="no">AUTOINDEX</code> venga sostituito prima da <code translate="no">STL_SORT</code>. L’impostazione viene ignorata quando si specificano esplicitamente <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> o <code translate="no">BITMAP</code>.</p>
