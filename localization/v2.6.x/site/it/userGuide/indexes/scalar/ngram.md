---
id: ngram.md
title: NGRAMCompatible with Milvus v2.6.2+
summary: >-
  L'indice NGRAM di Milvus è costruito per accelerare le query LIKE su campi
  VARCHAR o su percorsi JSON specifici all'interno di campi JSON. Prima di
  costruire l'indice, Milvus divide il testo in brevi sottostringhe sovrapposte
  di lunghezza fissa n, note come n-grammi. Ad esempio, con n = 3, la parola
  "Milvus" viene suddivisa in 3 grafemi: "Mil", "ilv", "lvu" e "vus". Questi
  n-grammi vengono poi memorizzati in un indice invertito che mappa ogni grammo
  con gli ID dei documenti in cui compare. Al momento dell'interrogazione,
  questo indice permette a Milvus di restringere rapidamente la ricerca a un
  piccolo insieme di candidati, rendendo molto più veloce l'esecuzione della
  query.
beta: Milvus v2.6.2+
---
<h1 id="NGRAM" class="common-anchor-header">NGRAM<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v2.6.2+</span><button data-href="#NGRAM" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <code translate="no">NGRAM</code> di Milvus è costruito per accelerare le interrogazioni <code translate="no">LIKE</code> sui campi <code translate="no">VARCHAR</code> o su percorsi JSON specifici all'interno dei campi <code translate="no">JSON</code>. Prima di costruire l'indice, Milvus divide il testo in brevi sottostringhe sovrapposte di lunghezza fissa <em>n</em>, note come <em>n-grammi</em>. Ad esempio, con <em>n = 3</em>, la parola <em>"Milvus"</em> viene suddivisa in 3 grafemi: <em>"Mil",</em> <em>"ilv",</em> <em>"lvu"</em> e <em>"vus".</em> Questi n-grammi vengono poi memorizzati in un indice invertito che mappa ogni grammo con gli ID dei documenti in cui compare. Al momento dell'interrogazione, questo indice permette a Milvus di restringere rapidamente la ricerca a un piccolo insieme di candidati, rendendo molto più veloce l'esecuzione della query.</p>
<p>Si usa quando si ha bisogno di un filtro rapido con prefisso, suffisso, infisso o carattere jolly, come ad esempio:</p>
<ul>
<li><p><code translate="no">name LIKE &quot;data%&quot;</code></p></li>
<li><p><code translate="no">title LIKE &quot;%vector%&quot;</code></p></li>
<li><p><code translate="no">path LIKE &quot;%json&quot;</code></p></li>
</ul>
<div class="alert note">
<p>Per informazioni dettagliate sulla sintassi delle espressioni di filtro, consultare gli <a href="/docs/it/basic-operators.md#Range-operators">Operatori di base</a>.</p>
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
    </button></h2><p>Milvus implementa l'indice <code translate="no">NGRAM</code> in un processo a due fasi:</p>
<ol>
<li><p><strong>Costruire l'indice</strong>: Generare n-grammi per ogni documento e costruire un indice invertito durante l'ingest.</p></li>
<li><p><strong>Accelerazione delle query</strong>: Utilizzare l'indice per filtrare un piccolo insieme di candidati, quindi verificare le corrispondenze esatte.</p></li>
</ol>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: costruire l'indice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Durante l'ingestione dei dati, Milvus costruisce l'indice NGRAM eseguendo due fasi principali:</p>
<ol>
<li><p><strong>Decomposizione del testo in n-grammi</strong>: Milvus fa scorrere una finestra di <em>n</em> su ogni stringa del campo di destinazione ed estrae le sottostringhe sovrapposte, o <em>n-grammi</em>. La lunghezza di queste sottostringhe rientra in un intervallo configurabile, <code translate="no">[min_gram, max_gram]</code>.</p>
<ul>
<li><p><code translate="no">min_gram</code>: L'n-gramma più breve da generare. Questo definisce anche la lunghezza minima della sottostringa della query che può beneficiare dell'indice.</p></li>
<li><p><code translate="no">max_gram</code>: L'n-gramma più lungo da generare. Al momento dell'interrogazione, viene utilizzato anche come dimensione massima della finestra quando si dividono stringhe di query lunghe.</p></li>
</ul>
<p>Ad esempio, con <code translate="no">min_gram=2</code> e <code translate="no">max_gram=3</code>, la stringa <code translate="no">&quot;AI database&quot;</code> viene suddivisa come segue:</p>
<ul>
<li><strong>2-grammi:</strong> <code translate="no">AI</code>, <code translate="no">I_</code>, <code translate="no">_d</code>, <code translate="no">da</code>, <code translate="no">at</code>, ...</li>
<li><strong>3-grammi:</strong> <code translate="no">AI_</code>, <code translate="no">I_d</code>, <code translate="no">_da</code>, <code translate="no">dat</code>, <code translate="no">ata</code>, ...</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index.png" alt="Build Ngram Index" class="doc-image" id="build-ngram-index" />
   </span> <span class="img-wrapper"> <span>Costruire l'indice degli ngrammi</span> </span></p>
<blockquote>
<p><strong>Nota</strong></p>
<ul>
<li><p>Per un intervallo <code translate="no">[min_gram, max_gram]</code>, Milvus genera tutti gli n-grammi per ogni lunghezza compresa tra i due valori (inclusi).<br>
Esempio: con <code translate="no">[2,4]</code> e la parola <code translate="no">&quot;text&quot;</code>, Milvus genera:</p>
<ul>
<li><strong>2-grammi:</strong> <code translate="no">te</code>, <code translate="no">ex</code>, <code translate="no">xt</code></li>
<li><strong>3-grammi:</strong> <code translate="no">tex</code>, <code translate="no">ext</code></li>
<li><strong>4-grammi</strong>: <code translate="no">text</code></li>
</ul></li>
<li><p>La decomposizione degli N-grammi è basata sui caratteri ed è indipendente dalla lingua. Ad esempio, in cinese, <code translate="no">&quot;向量数据库&quot;</code> con <code translate="no">min_gram = 2</code> si scompone in: <code translate="no">&quot;向量&quot;</code>, <code translate="no">&quot;量数&quot;</code>, <code translate="no">&quot;数据&quot;</code>, <code translate="no">&quot;据库&quot;</code>.</p></li>
<li><p>Gli spazi e la punteggiatura sono trattati come caratteri durante la decomposizione.</p></li>
<li><p>La decomposizione conserva le maiuscole e le minuscole e la corrispondenza è sensibile alle maiuscole. Ad esempio, <code translate="no">&quot;Database&quot;</code> e <code translate="no">&quot;database&quot;</code> generano n-grammi diversi e richiedono una corrispondenza esatta tra i casi durante le interrogazioni.</p></li>
</ul>
</blockquote></li>
<li><p><strong>Creare un indice invertito</strong>: Viene creato un <strong>indice inverso</strong> che mappa ogni n-gramma generato in un elenco di ID di documenti che lo contengono.</p>
<p>Per esempio, se il 2-gramma <code translate="no">&quot;AI&quot;</code> compare in documenti con ID 1, 5, 6, 8 e 9, l'indice registra <code translate="no">{&quot;AI&quot;: [1, 5, 6, 8, 9]}</code>. Questo indice viene poi utilizzato al momento dell'interrogazione per restringere rapidamente l'ambito di ricerca.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/build-ngram-index-2.png" alt="Build Ngram Index 2" class="doc-image" id="build-ngram-index-2" />
   </span> <span class="img-wrapper"> <span>Costruire l'indice Ngram 2</span> </span></p>
<div class="alert note">
<p>Un intervallo <code translate="no">[min_gram, max_gram]</code> più ampio crea più grammi e liste di mappatura più grandi. Se la memoria è limitata, si può considerare la modalità mmap per elenchi di corrispondenza molto grandi. Per maggiori dettagli, consultare la sezione <a href="/docs/it/mmap.md">Uso di mmap</a>.</p>
</div>
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
    </button></h3><p>Quando viene eseguito un filtro <code translate="no">LIKE</code>, Milvus utilizza l'indice NGRAM per accelerare la query nelle fasi seguenti:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/accelerate-queries.png" alt="Accelerate Queries" class="doc-image" id="accelerate-queries" />
   </span> <span class="img-wrapper"> <span>Accelerazione delle query</span> </span></p>
<ol>
<li><p><strong>Estrazione del termine della query:</strong> La sottostringa contigua senza caratteri jolly viene estratta dall'espressione <code translate="no">LIKE</code> (ad esempio, <code translate="no">&quot;%database%&quot;</code> diventa <code translate="no">&quot;database&quot;</code>).</p></li>
<li><p><strong>Decomposizione del termine della query:</strong> Il termine di query viene scomposto in <em>n-grammi</em> in base alla sua lunghezza (<code translate="no">L</code>) e alle impostazioni di <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
<ul>
<li><p>Se <code translate="no">L &lt; min_gram</code>, l'indice non può essere usato e la query torna a una scansione completa.</p></li>
<li><p>Se <code translate="no">min_gram ≤ L ≤ max_gram</code>, l'intero termine della query viene trattato come un singolo n-gramma e non sono necessarie ulteriori scomposizioni.</p></li>
<li><p>Se <code translate="no">L &gt; max_gram</code>, il termine della query viene scomposto in grammi sovrapposti utilizzando una finestra di dimensioni pari a <code translate="no">max_gram</code>.</p></li>
</ul>
<p>Ad esempio, se <code translate="no">max_gram</code> è impostato su <code translate="no">3</code> e il termine di query è <code translate="no">&quot;database&quot;</code>, che ha una lunghezza di <strong>8</strong>, viene scomposto in sottostringhe di 3 grami come <code translate="no">&quot;dat&quot;</code>, <code translate="no">&quot;ata&quot;</code>, <code translate="no">&quot;tab&quot;</code>, e così via.</p></li>
<li><p><strong>Ricerca di ogni grammo e intersezione</strong>: Milvus cerca ogni grammo della query nell'indice invertito e poi interseca gli elenchi di ID documento risultanti per trovare un piccolo insieme di documenti candidati. Questi candidati contengono tutti i grammi della query.</p></li>
<li><p><strong>Verificare e restituire i risultati:</strong> Il filtro originale <code translate="no">LIKE</code> viene quindi applicato come verifica finale solo al piccolo insieme di candidati per trovare le corrispondenze esatte.</p></li>
</ol>
<h2 id="Create-an-NGRAM-index" class="common-anchor-header">Creare un indice NGRAM<button data-href="#Create-an-NGRAM-index" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un indice NGRAM su un campo <code translate="no">VARCHAR</code> o su un percorso specifico all'interno di un campo <code translate="no">JSON</code>.</p>
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
    </button></h3><p>Per un campo <code translate="no">VARCHAR</code>, è sufficiente specificare <code translate="no">field_name</code> e configurare <code translate="no">min_gram</code> e <code translate="no">max_gram</code>.</p>
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
    </button></h3><p>Per un campo <code translate="no">JSON</code>, oltre alle impostazioni del grammo, è necessario specificare anche:</p>
<ul>
<li><p><code translate="no">params.json_path</code> - il percorso JSON che punta al valore da indicizzare.</p></li>
<li><p><code translate="no">params.json_cast_type</code> - deve essere <code translate="no">&quot;varchar&quot;</code> (senza distinzione tra maiuscole e minuscole), perché l'indicizzazione NGRAM opera sulle stringhe.</p></li>
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
<li><p>Viene indicizzato solo il valore in <code translate="no">json_field[&quot;body&quot;]</code>.</p></li>
<li><p>Il valore viene trasformato in <code translate="no">VARCHAR</code> prima della tokenizzazione n-gram.</p></li>
<li><p>Milvus genera sottostringhe di lunghezza compresa tra 2 e 4 e le memorizza nell'indice invertito.</p></li>
</ul>
<p>Per ulteriori informazioni su come indicizzare un campo JSON, consultare <a href="/docs/it/use-json-fields.md">Campo JSON</a>.</p>
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
    </button></h2><p>Per applicare l'indice NGRAM:</p>
<ul>
<li><p>La query deve avere come obiettivo un campo <code translate="no">VARCHAR</code> (o un percorso JSON) che abbia un indice <code translate="no">NGRAM</code>.</p></li>
<li><p>La parte letterale del pattern <code translate="no">LIKE</code> deve essere lunga almeno <code translate="no">min_gram</code> caratteri<em>(ad esempio, se il termine di query più breve previsto è di 2 caratteri, impostare min_gram=2 durante la creazione dell'indice).</em></p></li>
</ul>
<p>Tipi di query supportati:</p>
<ul>
<li><p><strong>Corrispondenza di prefisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that starts with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza a suffisso</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that ends with the substring &quot;database&quot;</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza infix</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string that contains the substring &quot;database&quot; anywhere</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Corrispondenza con caratteri jolly</strong></p>
<p>Milvus supporta sia <code translate="no">%</code> (zero o più caratteri) che <code translate="no">_</code> (esattamente un carattere).</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match any string where &quot;st&quot; appears first, and &quot;um&quot; appears later in the text </span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;text LIKE &quot;%st%um%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Query di percorso JSON</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;json_field[&quot;body&quot;] LIKE &quot;%database%&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Per ulteriori informazioni sulla sintassi delle espressioni di filtro, consultare gli <a href="/docs/it/basic-operators.md">Operatori di base</a>.</p>
<h2 id="Usage-notes" class="common-anchor-header">Note d'uso<button data-href="#Usage-notes" class="anchor-icon" translate="no">
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
<li><p><strong>Tipi di campo</strong>: Supportato sui campi <code translate="no">VARCHAR</code> e <code translate="no">JSON</code>. Per JSON, fornire sia <code translate="no">params.json_path</code> che <code translate="no">params.json_cast_type=&quot;varchar&quot;</code>.</p></li>
<li><p><strong>Unicode</strong>: La decomposizione NGRAM è basata sui caratteri, è indipendente dalla lingua e include gli spazi bianchi e la punteggiatura.</p></li>
<li><p><strong>Trade-off spazio-tempo</strong>: intervalli di grammi più ampi <code translate="no">[min_gram, max_gram]</code> producono più grammi e indici più grandi. Se la memoria è limitata, considerare la modalità <code translate="no">mmap</code> per elenchi di posting di grandi dimensioni. Per ulteriori informazioni, fare riferimento a <a href="/docs/it/mmap.md">Utilizzare mmap</a>.</p></li>
<li><p><strong>Immutabilità</strong>: <code translate="no">min_gram</code> e <code translate="no">max_gram</code> non possono essere modificati sul posto; per modificarli, ricostruire l'indice.</p></li>
</ul>
<h2 id="Best-practices" class="common-anchor-header">Migliori pratiche<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Scegliere min_gram e max_gram in base al comportamento di ricerca.</strong></p>
<ul>
<li><p>Iniziare con <code translate="no">min_gram=2</code>, <code translate="no">max_gram=3</code>.</p></li>
<li><p>Impostate <code translate="no">min_gram</code> al letterale più breve che vi aspettate venga digitato dagli utenti.</p></li>
<li><p>Impostare <code translate="no">max_gram</code> vicino alla lunghezza tipica delle sottostringhe significative; <code translate="no">max_gram</code> più grande migliora il filtraggio ma aumenta lo spazio.</p></li>
</ul></li>
<li><p><strong>Evitare i grammi a bassa selettività</strong></p>
<p>Gli schemi altamente ripetitivi (ad esempio, <code translate="no">&quot;aaaaaa&quot;</code>) forniscono un filtraggio debole e possono produrre guadagni limitati.</p></li>
<li><p><strong>Normalizzare in modo coerente</strong></p>
<p>Applicare la stessa normalizzazione al testo ingerito e ai letterali della query (ad esempio, minuscoli, tagli) se il caso d'uso lo richiede.</p></li>
</ul>
