---
id: boolean.md
title: Il filtraggio spiegato
summary: >-
  Milvus offre potenti funzionalità di filtraggio che consentono di interrogare
  con precisione i dati. Le espressioni di filtro consentono di indirizzare
  campi scalari specifici e di affinare i risultati della ricerca con diverse
  condizioni. Questa guida spiega come utilizzare le espressioni di filtro in
  Milvus, con esempi incentrati sulle operazioni di interrogazione. È possibile
  applicare questi filtri anche nelle richieste di ricerca e cancellazione.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Il filtraggio spiegato<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre potenti funzionalità di filtraggio che consentono di interrogare con precisione i dati. Le espressioni di filtro consentono di indirizzare campi scalari specifici e di affinare i risultati della ricerca con diverse condizioni. Questa guida spiega come utilizzare le espressioni di filtro in Milvus, con esempi incentrati sulle operazioni di interrogazione. È possibile applicare questi filtri anche nelle richieste di ricerca e cancellazione.</p>
<h2 id="Basic-operators" class="common-anchor-header">Operatori di base<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supporta diversi operatori di base per filtrare i dati:</p>
<ul>
<li><p><strong>Operatori di confronto</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, e <code translate="no">&lt;=</code> permettono di filtrare in base a campi numerici o di testo.</p></li>
<li><p><strong>Filtri di intervallo</strong>: <code translate="no">IN</code> e <code translate="no">LIKE</code> aiutano a soddisfare intervalli o insiemi di valori specifici.</p></li>
<li><p><strong>Operatori aritmetici</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> e <code translate="no">**</code> sono utilizzati per i calcoli che coinvolgono i campi numerici.</p></li>
<li><p><strong>Operatori logici</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, e <code translate="no">NOT</code> combinano più condizioni in espressioni complesse.</p></li>
<li><p><strong>Operatori IS NULL e IS NOT NULL</strong>: Gli operatori <code translate="no">IS NULL</code> e <code translate="no">IS NOT NULL</code> sono usati per filtrare i campi in base al fatto che contengano o meno un valore nullo (assenza di dati). Per maggiori dettagli, consultare la sezione <a href="/docs/it/basic-operators.md#IS-NULL-and-IS-NOT-NULL-Operators">Operatori di base</a>.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Esempio: Filtro per colore</h3><p>Per trovare entità con colori primari (rosso, verde o blu) in un campo scalare <code translate="no">color</code>, utilizzare la seguente espressione di filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Esempio: Filtrare i campi JSON</h3><p>Milvus consente di fare riferimento a chiavi in campi JSON. Ad esempio, se si dispone di un campo JSON <code translate="no">product</code> con le chiavi <code translate="no">price</code> e <code translate="no">model</code>, e si desidera trovare prodotti con un modello specifico e un prezzo inferiore a 1.850, utilizzare questa espressione di filtro:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Esempio: Filtrare i campi array</h3><p>Se si dispone di un campo array <code translate="no">history_temperatures</code> contenente le registrazioni delle temperature medie riportate dagli osservatori a partire dall'anno 2000 e si desidera trovare gli osservatori in cui la temperatura del 2009 (la decima registrata) supera i 23°C, utilizzare questa espressione:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su questi operatori di base, consultare <a href="/docs/it/basic-operators.md">Operatori di base</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Modelli di espressioni di filtro<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Quando si effettua il filtraggio utilizzando i caratteri CJK, l'elaborazione può essere più complessa a causa dei set di caratteri più grandi e delle differenze di codifica. Ciò può comportare un rallentamento delle prestazioni, soprattutto con l'operatore <code translate="no">IN</code>.</p>
<p>Milvus introduce la templatura delle espressioni di filtro per ottimizzare le prestazioni quando si lavora con i caratteri CJK. Separando i valori dinamici dall'espressione del filtro, il motore di query gestisce in modo più efficiente l'inserimento dei parametri.</p>
<h3 id="Example" class="common-anchor-header">Esempio</h3><p>Per trovare persone di età superiore ai 25 anni che vivono a "北京" (Pechino) o "上海" (Shanghai), utilizzare la seguente espressione modello:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per migliorare le prestazioni, utilizzare questa variante con i parametri:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Questo approccio riduce l'overhead del parsing e migliora la velocità della query. Per ulteriori informazioni, vedere <a href="/docs/it/filtering-templating.md">Templatura dei filtri</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Operatori specifici per i tipi di dati<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offre operatori di filtraggio avanzati per tipi di dati specifici, come i campi JSON, ARRAY e VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Operatori specifici per i campi JSON</h3><p>Milvus offre operatori avanzati per l'interrogazione dei campi JSON, consentendo un filtraggio preciso all'interno di strutture JSON complesse:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Controlla se un'espressione JSON esiste nel campo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Verifica che tutti gli elementi dell'espressione JSON siano presenti.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filtra le entità in cui esiste almeno un elemento nell'espressione JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per maggiori dettagli sugli operatori JSON, consultare <a href="/docs/it/json-operators.md">Operatori JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Operatori specifici del campo ARRAY</h3><p>Milvus offre operatori di filtraggio avanzati per i campi array, come <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code> e <code translate="no">ARRAY_LENGTH</code>, che consentono un controllo a grana fine sui dati degli array:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtra le entità contenenti un elemento specifico.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtra le entità in cui sono presenti tutti gli elementi di un elenco.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtra le entità contenenti qualsiasi elemento dell'elenco.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtra in base alla lunghezza dell'array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per maggiori dettagli sugli operatori di array, vedere <a href="/docs/it/array-operators.md">Operatori ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Operatori specifici per i campi VARCHAR</h3><p>Milvus offre operatori specializzati per ricerche precise basate sul testo nei campi VARCHAR:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> operatore</h4><p>L'operatore <code translate="no">TEXT_MATCH</code> consente di recuperare documenti precisi in base a termini di interrogazione specifici. È particolarmente utile per le ricerche filtrate che combinano filtri scalari con ricerche di somiglianza vettoriale. A differenza delle ricerche semantiche, Text Match si concentra sulle occorrenze esatte dei termini.</p>
<p>Milvus utilizza Tantivy per supportare l'indicizzazione inversa e la ricerca testuale basata sui termini. Il processo prevede:</p>
<ol>
<li><p><strong>Analizzatore</strong>: Tokenizza ed elabora il testo in ingresso.</p></li>
<li><p><strong>Indicizzazione</strong>: Crea un indice invertito che mappa i token unici nei documenti.</p></li>
</ol>
<p>Per maggiori dettagli, fare riferimento a <a href="/docs/it/keyword-match.md">Corrispondenza di testo</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> operatore<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>L'operatore <strong>PHRASE_MATCH</strong> consente di recuperare con precisione i documenti in base alle corrispondenze esatte tra le frasi, considerando sia l'ordine che l'adiacenza dei termini della query.</p>
<p>Per maggiori dettagli, consultare <a href="/docs/it/phrase-match.md">Phrase Match</a>.</p>
