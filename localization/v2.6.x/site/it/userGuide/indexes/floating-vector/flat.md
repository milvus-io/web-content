---
id: flat.md
title: FLAT
summary: >-
  L'indice FLAT è uno dei metodi più semplici e diretti per l'indicizzazione e
  la ricerca di vettori in virgola mobile. Si basa su un approccio a forza
  bruta, in cui ogni vettore interrogato viene confrontato direttamente con ogni
  vettore del set di dati, senza alcuna preelaborazione o strutturazione
  avanzata dei dati. Questo approccio garantisce l'accuratezza, offrendo un
  richiamo del 100%, poiché ogni potenziale corrispondenza viene valutata.
---
<h1 id="FLAT" class="common-anchor-header">FLAT<button data-href="#FLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <strong>FLAT</strong> è uno dei metodi più semplici e diretti per l'indicizzazione e la ricerca di vettori in virgola mobile. Si basa su un approccio a forza bruta, in cui ogni vettore interrogato viene confrontato direttamente con ogni vettore del set di dati, senza alcuna preelaborazione o strutturazione avanzata dei dati. Questo approccio garantisce l'accuratezza, offrendo un richiamo del 100%, poiché ogni potenziale corrispondenza viene valutata.</p>
<p>Tuttavia, questo metodo di ricerca esaustivo comporta degli svantaggi. L'indice FLAT è l'opzione di indicizzazione più lenta, poiché esegue una scansione completa del set di dati per ogni query. Di conseguenza, non è adatto ad ambienti con enormi insiemi di dati, dove le prestazioni sono un problema. Il vantaggio principale dell'indice FLAT è la sua semplicità e affidabilità, in quanto non richiede addestramento o complesse configurazioni di parametri.</p>
<h2 id="Build-index" class="common-anchor-header">Creazione dell'indice<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Per costruire un indice <code translate="no">FLAT</code> su un campo vettoriale in Milvus, utilizzare il metodo <code translate="no">add_index()</code>, specificando i parametri <code translate="no">index_type</code> e <code translate="no">metric_type</code> per l'indice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={} <span class="hljs-comment"># No additional parameters required for FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>In questa configurazione:</p>
<ul>
<li><p><code translate="no">index_type</code>: Il tipo di indice da costruire. In questo esempio, impostare il valore su <code translate="no">FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: Il metodo utilizzato per calcolare la distanza tra i vettori. I valori supportati sono <code translate="no">COSINE</code>, <code translate="no">L2</code> e <code translate="no">IP</code>. Per maggiori dettagli, consultare <a href="/docs/it/metric.md">Tipi di metriche</a>.</p></li>
<li><p><code translate="no">params</code>: Per l'indice FLAT non sono necessari parametri aggiuntivi.</p></li>
</ul>
<p>Una volta configurati i parametri dell'indice, è possibile creare l'indice utilizzando direttamente il metodo <code translate="no">create_index()</code> o passando i parametri dell'indice nel metodo <code translate="no">create_collection</code>. Per ulteriori informazioni, consultare la sezione <a href="/docs/it/create-collection.md">Creazione di una raccolta</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Ricerca nell'indice<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Una volta creato l'indice e inserite le entità, è possibile eseguire ricerche di similarità sull'indice.</p>
<pre><code translate="no" class="language-python">res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {}}  <span class="hljs-comment"># No additional parameters required for FLAT</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-params" class="common-anchor-header">Parametri dell'indice<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Per l'indice FLAT, non sono necessari parametri aggiuntivi né durante la creazione dell'indice né durante il processo di ricerca.</p>
