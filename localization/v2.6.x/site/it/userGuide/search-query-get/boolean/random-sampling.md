---
id: random-sampling.md
title: Campionamento casualeCompatible with Milvus 2.6.x
summary: >-
  Quando si lavora con insiemi di dati su larga scala, spesso non è necessario
  elaborare tutti i dati per ottenere approfondimenti o testare la logica di
  filtraggio. Il campionamento casuale offre una soluzione che consente di
  lavorare con un sottoinsieme statisticamente rappresentativo dei dati,
  riducendo in modo significativo i tempi di interrogazione e il consumo di
  risorse.
beta: Milvus 2.6.x
---
<h1 id="Random-Sampling" class="common-anchor-header">Campionamento casuale<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-Sampling" class="anchor-icon" translate="no">
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
    </button></h1><p>Quando si lavora con insiemi di dati su larga scala, spesso non è necessario elaborare tutti i dati per ottenere approfondimenti o testare la logica di filtraggio. Il campionamento casuale offre una soluzione che consente di lavorare con un sottoinsieme statisticamente rappresentativo dei dati, riducendo significativamente i tempi di interrogazione e il consumo di risorse.</p>
<p>Il campionamento casuale opera a livello di segmento, garantendo prestazioni efficienti e mantenendo la casualità del campione nella distribuzione dei dati della raccolta.</p>
<p><strong>Casi d'uso principali:</strong></p>
<ul>
<li><p><strong>Esplorazione dei dati</strong>: Anteprima rapida della struttura e del contenuto della raccolta con un consumo minimo di risorse.</p></li>
<li><p><strong>Test di sviluppo</strong>: Test di logiche di filtraggio complesse su campioni di dati gestibili prima della distribuzione completa.</p></li>
<li><p><strong>Ottimizzazione delle risorse</strong>: Riduzione dei costi di calcolo per le query esplorative e le analisi statistiche.</p></li>
</ul>
<h2 id="Syntax" class="common-anchor-header">Sintassi<button data-href="#Syntax" class="anchor-icon" translate="no">
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
    </button></h2><div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(sampling_factor)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Parametri:</strong></p>
<ul>
<li><code translate="no">sampling_factor</code>: Un fattore di campionamento nell'intervallo (0, 1), esclusi i limiti. Ad esempio, <code translate="no">RANDOM_SAMPLE(0.001)</code> seleziona circa lo 0,1% dei risultati.</li>
</ul>
<p><strong>Regole importanti:</strong></p>
<ul>
<li><p>L'espressione non fa distinzione tra maiuscole e minuscole (<code translate="no">RANDOM_SAMPLE</code> o <code translate="no">random_sample</code>).</p></li>
<li><p>Il fattore di campionamento deve essere compreso nell'intervallo (0, 1), esclusi i limiti.</p></li>
</ul>
<h2 id="Combine-with-other-filters" class="common-anchor-header">Combinazione con altri filtri<button data-href="#Combine-with-other-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>L'operatore di campionamento casuale deve essere combinato con altre espressioni di filtraggio utilizzando la logica <code translate="no">AND</code>. Quando si combinano i filtri, Milvus applica prima le altre condizioni e poi esegue il campionamento casuale sull'insieme dei risultati.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct: Filter first, then sample</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; AND RANDOM_SAMPLE(0.001)&#x27;</span>
<span class="hljs-comment"># Processing: Find all red items → Sample 0.1% of those red items</span>

<span class="hljs-comment"># Incorrect: OR doesn&#x27;t make logical sense</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;color == &quot;red&quot; OR RANDOM_SAMPLE(0.001)&#x27;</span>  <span class="hljs-comment"># ❌ Invalid logic</span>
<span class="hljs-comment"># This would mean: &quot;Either red items OR sample everything&quot; - which is meaningless</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Example-1-Data-exploration" class="common-anchor-header">Esempio 1: Esplorazione dei dati</h3><p>Anteprima rapida della struttura della collezione:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Sample approximately 1% of the entire collection</span>
result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;product_name&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sampled <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> products from collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Combined-filtering-with-random-sampling" class="common-anchor-header">Esempio 2: Filtraggio combinato con campionamento casuale</h3><p>Testate la logica di filtraggio su un sottoinsieme gestibile:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># First filter by category and price, then sample 0.5% of results</span>
filter_expression = <span class="hljs-string">&#x27;category == &quot;electronics&quot; AND price &gt; 100 AND RANDOM_SAMPLE(0.005)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;product_name&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span> electronics products in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Quick-analytics" class="common-anchor-header">Esempio 3: Analisi rapida</h3><p>Eseguire analisi statistiche rapide sui dati filtrati:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get insights from ~0.1% of premium customer data</span>
filter_expression = <span class="hljs-string">&#x27;customer_tier == &quot;premium&quot; AND region == &#x27;</span>North America<span class="hljs-string">&#x27; AND RANDOM_SAMPLE(0.001)&#x27;</span>

result = client.query(
    collection_name=<span class="hljs-string">&quot;customer_profiles&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=filter_expression,</span>
    output_fields=[<span class="hljs-string">&quot;purchase_amount&quot;</span>, <span class="hljs-string">&quot;satisfaction_score&quot;</span>, <span class="hljs-string">&quot;last_purchase_date&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-comment"># Analyze sample for quick insights</span>
<span class="hljs-keyword">if</span> result:
    average_purchase = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;purchase_amount&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)
    average_satisfaction = <span class="hljs-built_in">sum</span>(r[<span class="hljs-string">&quot;satisfaction_score&quot;</span>] <span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> result) / <span class="hljs-built_in">len</span>(result)
    
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sample size: <span class="hljs-subst">{<span class="hljs-built_in">len</span>(result)}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average purchase amount: $<span class="hljs-subst">{average_purchase:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Average satisfaction score: <span class="hljs-subst">{average_satisfaction:<span class="hljs-number">.2</span>f}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Combined-with-vector-search" class="common-anchor-header">Esempio 4: Combinazione con la ricerca vettoriale</h3><p>Utilizzare il campionamento casuale in scenari di ricerca filtrata:</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Search for similar products within a sampled subset</span>
search_results = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># query vector</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;books&quot; AND RANDOM_SAMPLE(0.01)&#x27;</span>,</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {}},
    output_fields=[<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Found <span class="hljs-subst">{<span class="hljs-built_in">len</span>(search_results[<span class="hljs-number">0</span>])}</span> similar books in sample&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><ul>
<li><p><strong>Iniziare in piccolo</strong>: iniziare con fattori di campionamento più piccoli (0,001-0,01) per l'esplorazione iniziale.</p></li>
<li><p><strong>Flusso di lavoro di sviluppo</strong>: Utilizzare il campionamento durante lo sviluppo e rimuoverlo per le query di produzione.</p></li>
<li><p><strong>Validità statistica</strong>: Campioni più grandi forniscono rappresentazioni statistiche più accurate</p></li>
<li><p><strong>Test delle prestazioni</strong>: Monitorare le prestazioni delle query e regolare i fattori di campionamento secondo necessità.</p></li>
</ul>
