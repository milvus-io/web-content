---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Confronta i tipi di indici scalari, verifica la compatibilità dei campi e
  comprendi il funzionamento della selezione automatica degli indici.
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
    </button></h1><p>Gli indici scalari possono accelerare <a href="/docs/it/boolean.md">il filtraggio</a> sui campi non vettoriali. Utilizza questa panoramica per scegliere un indice, verificare la compatibilità dei campi e comprendere il funzionamento della selezione automatica.</p>
<p>Si consiglia di indicizzare i campi utilizzati in filtri frequenti o lenti. Per ogni campo incluso nella richiesta di creazione dell’indice, scegliere una delle due opzioni seguenti:</p>
<ul>
<li><strong>Specificare un tipo di indice:</strong> sceglierne uno compatibile con il tipo di dati del campo e con i filtri utilizzati.</li>
<li><strong>Utilizza l'opzione " <code translate="no">AUTOINDEX</code>":</strong> imposta " <code translate="no">index_type</code> " su " <code translate="no">AUTOINDEX</code> " per consentire a Milvus di scegliere un tipo. Vedi <a href="#AUTOINDEX-behavior">il comportamento di AUTOINDEX</a>.</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Aprire una guida all’indice per i filtri, i parametri e i passaggi di creazione supportati:</p>
<table>
<thead>
<tr><th>Tipo di indice</th><th>Utilizzare per</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/it/inverted.md">INVERTITO</a></td><td>Filtri di uguaglianza, appartenenza e intervallo.</td></tr>
<tr><td><a href="/docs/it/bitmap.md">BITMAP</a></td><td>Campi con pochi valori distinti, come i codici di stato.</td></tr>
<tr><td><a href="/docs/it/stl-sort.md">STL_SORT</a></td><td>Ricerca di valori e filtri di intervallo.</td></tr>
<tr><td><a href="/docs/it/trie.md">TRIE</a></td><td>Ricerca esatta di stringhe e corrispondenza dei prefissi su campi di tip <code translate="no">VARCHAR</code>.</td></tr>
<tr><td><a href="/docs/it/ngram.md">NGRAM</a></td><td>Filtri LIKE e filtri regex ammissibili.</td></tr>
<tr><td><a href="/docs/it/rtree.md">RTREE</a></td><td>Filtri spaziali sui campi di tipo " <code translate="no">GEOMETRY</code> ".</td></tr>
</tbody>
</table>
<p>Prima di creare un indice, controllare la tabella di compatibilità dei campi riportata di seguito e il supporto dei filtri dell’indice selezionato.</p>
<p><details id="Filter-execution">
<summary><strong>Come i filtri utilizzano gli indici</strong></summary></p>
<p>Un indice serve solo per le espressioni idonee; gli altri filtri possono eseguire la scansione dei dati. Le operazioni aritmetiche e i confronti tra campi non ereditano l’accelerazione della ricerca letterale. Per le combinazioni logiche e i test NULL, consultare <a href="/docs/it/basic-operators.md">Operatori di base</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipi di campo supportati<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Individuare il tipo di dati del campo per visualizzare gli indici espliciti supportati. Nelle righe di array, " <code translate="no">ARRAY&lt;T&gt;</code> " indica " <code translate="no">ARRAY</code> " con " <code translate="no">element_type=T</code>":</p>
<table>
<thead>
<tr><th>Tipo di campo</th><th>Tipi di indici espliciti</th><th>Condizioni</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>I campi booleani scalari non supportano <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> non è disponibile sui campi chiave primaria.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>L'<code translate="no">BITMAP</code> o esplicito non è disponibile.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> non è disponibile sui campi della chiave primaria. Vedere <a href="#String-pattern-indexes">la selezione dell'indice tramite filtro</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Vedere <a href="/docs/it/timestamptz-field.md">il campo TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Vedere <a href="/docs/it/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Vedere <a href="/docs/it/array_data_type.md#Array-index-support">Supporto per gli indici su array</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Vedi " <a href="/docs/it/array_data_type.md#Array-index-support">Supporto degli indici degli array</a>".</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Vedi <a href="/docs/it/array_data_type.md#Array-index-support">Supporto per gli indici degli array</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Vedere <a href="/docs/it/array_data_type.md#Array-index-support">Supporto degli indici degli array</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Dipende dal percorso indicizzato e dal tipo di conversione.</td><td>Verificare <a href="/docs/it/json-indexing.md#Understand-cast-types">la compatibilità e i requisiti del percorso JSON</a>.</td></tr>
<tr><td>Sottocampi non vettoriali di StructArray</td><td>Dipende dal tipo di dati del sottocampo.</td><td>Indicizzare i sottocampi separatamente; i sottocampi di tipo " <code translate="no">BOOL</code> " non possono utilizzare l'<code translate="no">STL_SORT</code> esplicito. Vedere <a href="/docs/it/index-structarray-fields.md#Create-scalar-indexes">le regole relative ai sottocampi</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Nessuno</td><td>Gli indici scalari creati dall’utente, inclusi quelli di tipo ` <code translate="no">AUTOINDEX</code>`, non sono disponibili.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Gli indici scalari, compresi quelli di tipo ` <code translate="no">AUTOINDEX</code>`, non supportano i campi `ARRAY` ricorsivi né gli array con elementi nullabili. Vedere <a href="/docs/it/array_data_type.md#Array-index-support">Supporto degli indici array</a> per i filtri su array ordinari e <a href="/docs/it/index-structarray-fields.md#Create-scalar-indexes">Indicizzazione dei campi StructArray</a> per le regole relative ai sottocampi.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Scegliere un indice per i filtri VARCHAR</strong></summary></p>
<p>Per un campo di tipo ` <code translate="no">VARCHAR</code> `, confrontare gli indici compatibili in base ai filtri:</p>
<table>
<thead>
<tr><th>Esigenza di filtraggio</th><th>Linee guida e condizioni relative agli indici</th></tr>
</thead>
<tbody>
<tr><td>Ricerche esatte di stringhe e prefissi</td><td><a href="/docs/it/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/it/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> o <a href="/docs/it/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Pochi valori di stringa distinti</td><td><a href="/docs/it/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; i pattern vengono valutati rispetto ai valori indicizzati.</td></tr>
<tr><td>LIKE o regex con letterali fissi adeguati</td><td><a href="/docs/it/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> su campi di tipo " <code translate="no">VARCHAR</code> " o percorsi di stringhe JSON, soggetti a condizioni relative alla lunghezza dei gram e alla verifica.</td></tr>
<tr><td>Espressioni regolari senza letterali fissi utilizzabili</td><td>La query può eseguire la scansione dei dati o valutare molti valori indicizzati; verificare le condizioni dell’indice selezionato.</td></tr>
</tbody>
</table>
<p>Gli intervalli su <code translate="no">VARCHAR</code> utilizzano l’ordinamento delle stringhe, anche quando le stringhe contengono numeri. L’utilizzo dell’indice dipende dalla pianificazione della query, dai letterali estraibili, dalla cardinalità e dalla distribuzione dei dati. Per le regole di pianificazione, consultare la sezione <a href="/docs/it/pattern-matching.md#Accelerate-pattern-matching-with-indexes">“Corrispondenza dei pattern</a> ”. Per i percorsi stringa JSON, verificare i requisiti relativi al percorso e al cast nella sezione <a href="/docs/it/json-indexing.md">“Indicizzazione JSON</a>”.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Comportamento di AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Impostare " <code translate="no">index_type</code> " su " <code translate="no">AUTOINDEX</code> " nella definizione dell'indice di ciascun campo selezionato. Milvus sceglie un tipo in base al tipo di dati e, ove applicabile, al numero di valori distinti in ciascuna creazione dell'indice:</p>
<table>
<thead>
<tr><th>Tipo di campo</th><th>Selezione predefinita</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> per meno di 100 valori distinti; altrimenti <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> con <code translate="no">element_type</code> impostato su <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, oppure <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> per meno di 100 elementi distinti; altrimenti <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> percorsi convertiti in <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> o <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> per impostazione predefinita nella versione 3.0. La <a href="/docs/it/json-indexing.md#Index-requirements">configurazione JSON opzionale</a> abilita la strategia bitmap scalare/ordinata sopra descritta.</td></tr>
<tr><td><code translate="no">JSON</code> percorsi convertiti in <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> o <code translate="no">ARRAY_VARCHAR</code></td><td>Utilizzare <code translate="no">INVERTED</code> esplicito; la mappatura predefinita della versione 3.0.6 rifiuta la selezione automatica per queste conversioni.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Non supportato.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Per un campo scalare supportato, una definizione di indice che omette <code translate="no">index_type</code> richiede comunque la selezione automatica. I campi non inclusi nella richiesta non vengono indicizzati.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Dettagli sulla selezione</strong></summary></p>
<ul>
<li><strong>Layout interni:</strong> ` <code translate="no">AUTOINDEX</code> ` può selezionare layout non disponibili come scelte esplicite, come l’indicizzazione bitmap per ` <code translate="no">FLOAT</code> ` e ` <code translate="no">DOUBLE</code>`. La strategia basata sulla cardinalità è denominata internamente ` <code translate="no">HYBRID</code> `; non è possibile specificarla direttamente. L’indice selezionato determina quali filtri possono utilizzarlo.</li>
<li><strong>Soglia di cardinalità:</strong> <a id="Cardinality-threshold"></a>Impostare <code translate="no">bitmap_cardinality_limit</code> (intervallo: 1–1000) per sovrascrivere la soglia predefinita. I valori inferiori a tale soglia utilizzano il bitmap; a partire da tale soglia, si applica il layout ad alta cardinalità del tipo di dati. Le creazioni esplicite <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> e <code translate="no">BITMAP</code> aggirano la selezione basata sulla cardinalità e ignorano questa soglia.</li>
<li><strong>Sostituzioni da parte dell’amministratore:</strong> modificare le mappature dei tipi tramite <code translate="no">scalarAutoIndex.params.build</code>. L’opzione <code translate="no">scalarAutoIndex.enable=false</code> (impostazione predefinita) consente comunque l’uso esplicito di <code translate="no">AUTOINDEX</code>; l’opzione <code translate="no">true</code> applica inoltre la selezione automatica alle richieste manuali valide.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Scegli una guida per la tua prossima attività:</p>
<ul>
<li><strong>Creare un indice:</strong> utilizzare la <a href="#Index-types">guida agli indici</a> per i parametri e gli esempi di creazione.</li>
<li><strong>Pianifica le risorse:</strong> consulta le linee guida sulla memoria per <a href="/docs/it/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/it/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/it/inverted.md#Memory-considerations">INVERTED</a> o <a href="/docs/it/ngram.md#Memory-considerations">NGRAM</a>. Confronta l’utilizzo della memoria, i tempi di compilazione e la latenza delle query con dati e filtri rappresentativi.</li>
<li><strong>Configura la ricerca testuale:</strong> <a href="/docs/it/keyword-match.md">Text Match</a> e <a href="/docs/it/full-text-search.md">Full Text Search</a> trattano l’analisi testuale, BM25, <code translate="no">TEXT_MATCH</code> e <code translate="no">PHRASE_MATCH</code>. Un indice scalare <code translate="no">INVERTED</code> non abilita questi meccanismi.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Eliminazione degli indici scalari nelle versioni precedenti di Milvus</strong></summary></p>
<p>In Milvus v2.6.3 o versioni precedenti, è necessario rilasciare la collezione prima di eliminare un indice scalare. A partire dalla v2.6.4, è possibile eliminarlo senza rilasciare la collezione.</p>
<p></details></p>
