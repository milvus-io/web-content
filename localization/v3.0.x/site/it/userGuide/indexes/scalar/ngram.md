---
id: ngram.md
title: NGRAM
summary: >-
  L'indice NGRAM di Milvus accelera le query LIKE e i filtri regex idonei sui
  campi VARCHAR o su percorsi JSON specifici all'interno dei campi JSON. Prima
  di creare l'indice, Milvus suddivide il testo in sottostringhe brevi e
  sovrapposte di lunghezza fissa n, note come n-gram. Al momento dell’esecuzione
  della query, Milvus utilizza questi n-gram per restringere il numero di entità
  candidate prima di verificare la condizione di filtro originale.
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice " <code translate="no">NGRAM</code> " in Milvus accelera le query " <code translate="no">LIKE</code> " e i filtri regex idonei sui campi " <code translate="no">VARCHAR</code> " o su percorsi JSON specifici all'interno dei campi " <code translate="no">JSON</code> ". Prima di creare l'indice, Milvus suddivide il testo in sottostringhe brevi e sovrapposte di lunghezza fissa <em>n</em>, note come <em>n-gram</em>. Ad esempio, con <em>n = 3</em>, la parola <em>“Milvus”</em> viene suddivisa in 3-grammi: <em>“Mil”</em>, <em>“ilv”</em>, <em>“lvu”</em> e <em>“vus”.</em> Questi n-grammi vengono quindi memorizzati in un indice invertito che associa ciascun gramma agli ID dei documenti in cui compare. Al momento della query, questo indice consente a Milvus di restringere rapidamente la ricerca a un piccolo insieme di candidati prima di verificare la condizione di filtro originale.</p>
<p>Utilizzarlo quando è necessario un filtraggio veloce per prefissi, suffissi, infissi, caratteri jolly o espressioni regolari ammissibili, come ad esempio:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
<li><p><code translate="no">message =~ &quot;error.*timeout&quot;</code></p></li>
<li><p><code translate="no">url =~ &quot;/api/v[0-9]+/users&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Per i dettagli sulla sintassi delle espressioni di filtro « <code translate="no">LIKE</code> » e delle espressioni regolari, consultare la sezione <a href="/docs/it/pattern-matching.md">«Pattern Matching</a>».</p>
</div>
<h2 id="How-it-works" class="common-anchor-header">Come funziona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implementa l’indice di “ <code translate="no">NGRAM</code> ” in un processo in due fasi:</p>
<ol>
<li><p><strong>Creazione dell’indice</strong>: generazione di n-gram per ciascun documento e creazione di un indice invertito durante l’acquisizione.</p></li>
<li><p><strong>Accelerazione delle query</strong>: utilizza l’indice per filtrare un piccolo insieme di candidati, quindi verifica le corrispondenze esatte.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: Creazione dell’indice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Durante l’acquisizione dei dati, Milvus crea l’indice NGRAM eseguendo due passaggi principali:</p>
<ol>
<li><p><strong>Scomposizione del testo in n-grammi</strong>: Milvus fa scorrere una finestra di <em>n</em> su ciascuna stringa nel campo di destinazione ed estrae le sottostringhe sovrapposte, ovvero <em>gli n-grammi</em>. La lunghezza di queste sottostringhe rientra in un intervallo configurabile, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: L’n-gram più breve da generare. Questo valore definisce anche la lunghezza minima della sottostringa di query che può trarre vantaggio dall’indice.</p></li>
<li><p><code translate="no">max_gram</code>: L’n-gram più lungo da generare. Al momento della query, viene utilizzato anche come dimensione massima della finestra durante la suddivisione di stringhe di query lunghe.</p></li>
</ul>
<p>Ad esempio, con <code translate="no">min_gram=2</code> e <code translate="no">max_gram=3</code>, la stringa <code translate="no">&quot;AI database&quot;</code> viene suddivisa come segue:</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" /> 
   <span>Creazione dell’indice N-gram</span>
  
 </span></p>
<pre><code translate="no">- **2-grams:** `AI`, `I_`, `_d`, `da`, `at`, ...

- **3-grams:** `AI_`, `I_d`, `_da`, `dat`, `ata`, ...

&lt;div class=&quot;alert note&quot;&gt;

- For a range `[min_gram, max_gram]`, Milvus generates all n-grams for every length between the two values (inclusive). For example, with `[2,4]` and the word `&quot;text&quot;`, Milvus generates:

- **2-grams:** `te`, `ex`, `xt`

- **3-grams:** `tex`, `ext`

- **4-grams:** `text`

- N-gram decomposition is character-based and language-agnostic. For example, in Chinese, `&quot;向量数据库&quot;` with `min_gram = 2` is decomposed into: `&quot;向量&quot;`, `&quot;量数&quot;`, `&quot;数据&quot;`, `&quot;据库&quot;`.

- Spaces and punctuation are treated as characters during decomposition.

- Decomposition preserves original case, and matching is case-sensitive. For example, `&quot;Database&quot;` and `&quot;database&quot;` will generate different n-grams and require exact case matching during queries.

&lt;/div&gt;
</code></pre>
<ol>
<li><p><strong>Creazione di un indice invertito</strong>: viene creato un <strong>indice invertito</strong> che associa ogni n-gram generato a un elenco degli ID dei documenti che lo contengono.</p>
<p>Ad esempio, se il 2-gram <code translate="no">&quot;AI&quot;</code> compare nei documenti con ID 1, 5, 6, 8 e 9, l’indice registra <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Questo indice viene poi utilizzato al momento della query per restringere rapidamente l’ambito della ricerca.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" /> 
   <span>Creazione dell’indice N-gram 2</span>
  
 </span></p>
<pre><code translate="no">&lt;div class=&quot;alert note&quot;&gt;

A wider `[min_gram, max_gram]` range creates more grams and larger mapping lists. If memory is tight, consider mmap mode for very large posting lists. For details, refer to [Use mmap](https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb).

&lt;/div&gt;
</code></pre>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: Accelerazione delle query<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando viene eseguito un filtro « <code translate="no">LIKE</code> » o un filtro regex idoneo, Milvus utilizza l’indice NGRAM per accelerare la query seguendo questi passaggi:</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" /> 
   <span>Accelerazione delle query</span>
  
 </span></p>
<ol>
<li><p><strong>Estrazione del termine di query:</strong> dalla stringa <code translate="no">LIKE</code> viene estratta la sottostringa contigua senza caratteri jolly (ad esempio, <code translate="no">&quot;%database%&quot;</code> diventa <code translate="no">&quot;database&quot;</code>). Per i filtri regex, Milvus estrae, quando possibile, sottostringhe letterali fisse dal pattern regex. Ad esempio, <code translate="no">message =~ &quot;error.*timeout&quot;</code> contiene i letterali <code translate="no">error</code> e <code translate="no">timeout</code>.</p></li>
<li><p><strong>Scomposizione del termine di ricerca:</strong> il termine di ricerca viene scomposto in <em>n-grammi</em> in base alla sua lunghezza (<code translate="no">L</code>) e alle impostazioni <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Se <code translate="no">L &lt; min_gram</code>, l’indice non può essere utilizzato e la query ricorre a una scansione completa.</p></li>
<li><p>Se <code translate="no">min_gram ≤ L ≤ max_gram</code>, l’intero termine di ricerca viene trattato come un unico n-gram e non è necessaria alcuna ulteriore scomposizione.</p></li>
<li><p>Se <code translate="no">L &gt; max_gram</code>, il termine della query viene suddiviso in grammi sovrapposti utilizzando una dimensione della finestra pari a <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Ad esempio, se l'<code translate="no">max_gram</code> è impostato su <code translate="no">3</code> e il termine di ricerca è <code translate="no">&quot;database&quot;</code>, che ha una lunghezza di <strong>8</strong>, viene scomposto in sottostringhe di 3-gram come <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code> e così via.</p></li>
<li><p><strong>Ricerca di ciascun gram e intersezione</strong>: Milvus cerca ciascuno dei gram della query nell’indice invertito e poi esegue l’intersezione degli elenchi di ID dei documenti risultanti per individuare un piccolo insieme di documenti candidati. Questi candidati contengono tutti i gram presenti nella query.</p></li>
<li><p><strong>Verifica e restituzione dei risultati:</strong> L’ <code translate="no">LIKE</code> e originale o il filtro regex viene quindi applicato come controllo finale solo sul piccolo insieme di candidati per individuare le corrispondenze esatte.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Creazione di un indice NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un indice NGRAM su un campo di tipo « <code translate="no">VARCHAR</code> » o su un percorso specifico all’interno di un campo di tipo « <code translate="no">JSON</code> ».</p>
<h3 id="Example-1-Create-on-a-VARCHAR-field" class="common-anchor-header">Esempio 1: Creazione su un campo VARCHAR<button data-href="#Example-1-Create-on-a-VARCHAR-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Per un campo <code translate="no">VARCHAR</code>, è sufficiente specificare l’ <code translate="no">field_name</code> e configurare <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a VARCHAR field named &quot;text&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on the &quot;text&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;text&quot;</span>,   <span class="hljs-comment"># Target VARCHAR field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,           <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span>,     <span class="hljs-comment"># Custom name for the index</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                   <span class="hljs-comment"># Minimum substring length (e.g., 2-gram: &quot;st&quot;)</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">3</span>                    <span class="hljs-comment"># Maximum substring length (e.g., 3-gram: &quot;sta&quot;)</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Questa configurazione genera 2-grammi e 3-grammi per ogni stringa in <code translate="no">text</code> e li memorizza nell'indice invertito.</p>
<h3 id="Example-2-Create-on-a-JSON-path" class="common-anchor-header">Esempio 2: Creazione su un percorso JSON<button data-href="#Example-2-Create-on-a-JSON-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Per un campo <code translate="no">JSON</code>, oltre alle impostazioni relative ai gram, è necessario specificare anche:</p>
<ul>
<li><p><code translate="no">params.json_path</code> – il percorso JSON che punta al valore che si desidera indicizzare.</p></li>
<li><p><code translate="no">params.json_cast_type</code> – deve essere <code translate="no">&quot;varchar&quot;</code> (senza distinzione tra maiuscole e minuscole), poiché l’indicizzazione NGRAM opera su stringhe.</p></li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you have defined a JSON field named &quot;json_field&quot; in your collection schema, with a JSON path named &quot;body&quot;</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add NGRAM index on a JSON field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;json_field&quot;</span>,              <span class="hljs-comment"># Target JSON field</span></span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;NGRAM&quot;</span>,                   <span class="hljs-comment"># Index type is NGRAM</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;json_ngram_index&quot;</span>,        <span class="hljs-comment"># Custom index name</span></span>
<span class="highlighted-comment-line">    min_gram=<span class="hljs-number">2</span>,                           <span class="hljs-comment"># Minimum n-gram length</span></span>
<span class="highlighted-comment-line">    max_gram=<span class="hljs-number">4</span>,                           <span class="hljs-comment"># Maximum n-gram length</span></span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;json_field[\&quot;body\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the value inside the JSON field</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>                  <span class="hljs-comment"># Required: cast the value to varchar</span></span>
<span class="highlighted-comment-line">    }</span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio:</p>
<ul>
<li><p>Viene indicizzato solo il valore presente in <code translate="no">json_field[&quot;body&quot;]</code>.</p></li>
<li><p>Il valore viene convertito in <code translate="no">VARCHAR</code> prima della tokenizzazione n-gram.</p></li>
<li><p>Milvus genera sottostringhe di lunghezza compresa tra 2 e 4 e le memorizza nell’indice invertito.</p></li>
</ul>
<p>Per ulteriori informazioni su come indicizzare un campo JSON, consultare <a href="/docs/it/json-indexing.md">Indicizzazione JSON</a>.</p>
<h2 id="Queries-accelerated-by-NGRAM" class="common-anchor-header">Query accelerate da NGRAM<button data-href="#Queries-accelerated-by-NGRAM" class="anchor-icon" translate="no">
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
    </button></h2><p>Affinché l’indice NGRAM venga applicato:</p>
<ul>
<li><p>La query deve avere come obiettivo un campo <code translate="no">VARCHAR</code> (o un percorso JSON) dotato di un indice <code translate="no">NGRAM</code>.</p></li>
<li><p>La parte letterale del pattern " <code translate="no">LIKE</code> " deve avere una lunghezza di almeno <code translate="no">min_gram</code> caratteri.
<em>(Ad esempio, se il termine di query più breve previsto è di 2 caratteri, impostare min_gram=2 durante la creazione dell’indice.)</em></p></li>
</ul>
<p>Tipi di query supportati:</p>
<ul>
<li><p><strong>Corrispondenza prefisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza del suffisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza infissa</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza con caratteri jolly</strong></p>
<p>Milvus supporta sia i caratteri jolly " <code translate="no">%</code> " (zero o più caratteri) che " <code translate="no">_</code> " (esattamente un carattere).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Query JSON Path</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtro Regex</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match log messages that contain &quot;error&quot; followed later by &quot;timeout&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Filtro Regex su un percorso JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] =~ &quot;error.*timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Per ulteriori informazioni sulla sintassi delle espressioni di filtro, consultare la sezione " <a href="/docs/it/pattern-matching.md">Corrispondenza dei pattern</a>".</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminazione di un indice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare il metodo ` <code translate="no">drop_index()</code> ` per rimuovere un indice esistente da una collezione.</p>
<div class="alert note">
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;Documents&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;ngram_index&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Usage-notes" class="common-anchor-header">Note sull'utilizzo<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipi di campo</strong>: supportato sui campi <code translate="no">VARCHAR</code> e <code translate="no">JSON</code>. Per JSON, fornire sia <code translate="no">params.json_path</code> che <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Accelerazione delle espressioni regolari</strong>: ` <code translate="no">NGRAM</code> ` accelera i filtri basati su espressioni regolari solo quando Milvus è in grado di estrarre sottostringhe letterali fisse dal pattern dell’espressione regolare. Pattern come ` <code translate="no">[a-z]+</code> ` potrebbero ricorrere alla scansione perché non contengono letterali fissi.</p></li>
<li><p><strong>Espressioni regolari che non distinguono tra maiuscole e minuscole</strong>: sono supportati i modelli di espressioni regolari con <code translate="no">(?i)</code>, ma potrebbero saltare l’ottimizzazione <code translate="no">NGRAM</code> poiché l’indice conserva il caso originale.</p></li>
<li><p><strong>Fase di verifica</strong>: per i filtri regex, l’ <code translate="no">NGRAM</code> e produce candidati e Milvus li verifica con il pattern regex RE2 completo, in modo che l’accelerazione dell’indice non modifichi i risultati della corrispondenza.</p></li>
<li><p><strong>Unicode</strong>: la scomposizione NGRAM è basata sui caratteri e indipendente dalla lingua e include spazi e segni di punteggiatura.</p></li>
<li><p><strong>Compromesso spazio-tempo</strong>: intervalli di gram più ampi <code translate="no">[min_gram, max_gram]</code> producono più gram e indici più grandi. Se la memoria è limitata, considerare la modalità <code translate="no">mmap</code> per elenchi di posting di grandi dimensioni. Per ulteriori informazioni, consultare <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Utilizzo</a> di <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">mmap</a>.</p></li>
<li><p><strong>Immutabilità</strong>: <code translate="no">min_gram</code> e <code translate="no">max_gram</code> non possono essere modificati in loco; per regolarli è necessario ricostruire l’indice.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Best practice<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Scegliere min_gram e max_gram in modo che corrispondano al comportamento di ricerca</strong></p>
<ul>
<li><p>Iniziare con <code translate="no">min_gram=2</code> e <code translate="no">max_gram=3</code>.</p></li>
<li><p>Impostare ` <code translate="no">min_gram</code> ` sul valore letterale più breve che ci si aspetta che gli utenti digitino.</p></li>
<li><p>Impostare ` <code translate="no">max_gram</code> ` in modo che si avvicini alla lunghezza tipica delle sottostringhe significative; un valore più alto di ` <code translate="no">max_gram</code> ` migliora il filtraggio ma aumenta lo spazio occupato.</p></li>
</ul></li>
<li><p><strong>Evitare i grammi a bassa selettività</strong></p>
<p>I pattern altamente ripetitivi (ad es., <code translate="no">&quot;aaaaaa&quot;</code>) offrono un filtraggio debole e possono produrre vantaggi limitati.</p></li>
<li><p><strong>Normalizza in modo coerente</strong></p>
<p>Applicare la stessa normalizzazione al testo acquisito e ai valori letterali delle query (ad es. conversione in minuscolo, troncamento) se il caso d'uso lo richiede.</p></li>
</ul>
