---
id: rtree.md
title: INDICECompatible with Milvus 2.6.4+
summary: >-
  L'indice RTREE è una struttura di dati ad albero che accelera le
  interrogazioni sui campi GEOMETRIA in Milvus. Se la vostra collezione
  memorizza oggetti geometrici come punti, linee o poligoni in formato
  Well-known text (WKT) e volete accelerare il filtraggio spaziale, RTREE è la
  scelta ideale.
beta: Milvus 2.6.4+
---
<h1 id="RTREE" class="common-anchor-header">INDICE<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#RTREE" class="anchor-icon" translate="no">
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
    </button></h1><p>L'indice <code translate="no">RTREE</code> è una struttura di dati ad albero che accelera le interrogazioni sui campi <code translate="no">GEOMETRY</code> in Milvus. Se la vostra collezione memorizza oggetti geometrici come punti, linee o poligoni in formato <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-known text (WKT)</a> e volete accelerare il filtraggio spaziale, <code translate="no">RTREE</code> è la scelta ideale.</p>
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
    </button></h2><p>Milvus utilizza un indice <code translate="no">RTREE</code> per organizzare e filtrare in modo efficiente i dati geometrici, seguendo un processo in due fasi:</p>
<h3 id="Phase-1-Build-the-index" class="common-anchor-header">Fase 1: costruzione dell'indice<button data-href="#Phase-1-Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Creare i nodi foglia:</strong> Per ogni oggetto geometrico, calcolare il suo <a href="https://en.wikipedia.org/wiki/Minimum_bounding_rectangle">Minimum Bounding Rectangle</a> (MBR), cioè il rettangolo più piccolo che contiene completamente l'oggetto, e memorizzarlo come nodo foglia.</p></li>
<li><p><strong>Raggruppare in riquadri più grandi:</strong> Raggruppare i nodi foglia vicini e avvolgere ogni gruppo con un nuovo MBR, formando nodi interni. Ad esempio, il gruppo <strong>B</strong> contiene <strong>D</strong> ed <strong>E</strong>; il gruppo <strong>C</strong> contiene <strong>F</strong> e <strong>G</strong>.</p></li>
<li><p><strong>Aggiungere il nodo radice:</strong> Aggiungere un nodo radice il cui MBR copre tutti i gruppi interni, ottenendo una struttura ad albero bilanciata in altezza.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/how-retree-works.png" alt="How Retree Works" class="doc-image" id="how-retree-works" />
   </span> <span class="img-wrapper"> <span>Come funziona Retree</span> </span></p>
<h3 id="Phase-2-Accelerate-queries" class="common-anchor-header">Fase 2: accelerazione delle query<button data-href="#Phase-2-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Formare l'MBR della query:</strong> calcolare l'MBR per la geometria della query.</p></li>
<li><p><strong>Potare i rami:</strong> A partire dalla radice, confrontare l'MBR della query con ogni nodo interno. Saltare i rami il cui MBR non si interseca con l'MBR della query.</p></li>
<li><p><strong>Raccogliere i candidati:</strong> Scendere nei rami che si intersecano per raccogliere i nodi foglia candidati.</p></li>
<li><p><strong>Corrispondenza esatta:</strong> Per ogni candidato, eseguire un predicato spaziale esatto per determinare le corrispondenze reali.</p></li>
</ol>
<h2 id="Create-an-RTREE-index" class="common-anchor-header">Creare un indice RTREE<button data-href="#Create-an-RTREE-index" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile creare un indice <code translate="no">RTREE</code> su un campo <code translate="no">GEOMETRY</code> definito nello schema della raccolta.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Assume you have defined a GEOMETRY field named &quot;geo&quot; in your collection schema</span>

<span class="hljs-comment"># Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Add RTREE index on the &quot;geo&quot; field</span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;geo&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;RTREE&quot;</span>,      <span class="hljs-comment"># Spatial index for GEOMETRY</span></span>
<span class="highlighted-comment-line">    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span>,  <span class="hljs-comment"># Optional, name your index</span></span>
<span class="highlighted-comment-line">    params={}                <span class="hljs-comment"># No extra params needed</span></span>
<span class="highlighted-comment-line">)</span>

<span class="hljs-comment"># Create the index on the collection</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-RTREE" class="common-anchor-header">Interrogazione con RTREE<button data-href="#Query-with-RTREE" class="anchor-icon" translate="no">
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
    </button></h2><p>Si filtra con gli operatori geometrici nell'espressione <code translate="no">filter</code>. Quando esiste un indice <code translate="no">RTREE</code> sul campo <code translate="no">GEOMETRY</code> di destinazione, Milvus lo utilizza per selezionare automaticamente i candidati. Senza l'indice, il filtro ricade in una scansione completa.</p>
<p>Per un elenco completo degli operatori specifici per la geometria, consultare <a href="/docs/it/geometry-operators.md">Operatori geometrici</a>.</p>
<h3 id="Example-1-Filter-only" class="common-anchor-header">Esempio 1: Solo filtro<button data-href="#Example-1-Filter-only" class="anchor-icon" translate="no">
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
    </button></h3><p>Trova tutti gli oggetti geometrici all'interno di un determinato poligono:</p>
<pre><code translate="no" class="language-python">filter_expr = <span class="hljs-string">&quot;ST_CONTAINS(geo, &#x27;POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))&#x27;)&quot;</span>

res = client.query(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
    limit=<span class="hljs-number">10</span>
)
<span class="hljs-built_in">print</span>(res)   <span class="hljs-comment"># Expected: a list of rows where geo is entirely inside the polygon</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Vector-search-+-spatial-filter" class="common-anchor-header">Esempio 2: Ricerca vettoriale + filtro spaziale<button data-href="#Example-2-Vector-search-+-spatial-filter" class="anchor-icon" translate="no">
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
    </button></h3><p>Trova i vettori più vicini che intersecano una linea:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Assume you&#x27;ve also created an index on &quot;vec&quot; and loaded the collection.</span>
query_vec = [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]]
filter_expr = <span class="hljs-string">&quot;ST_INTERSECTS(geo, &#x27;LINESTRING (1 1, 2 2)&#x27;)&quot;</span>

hits = client.search(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,
    data=query_vec,
    limit=<span class="hljs-number">5</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-built_in">print</span>(hits)  <span class="hljs-comment"># Expected: top-k by vector similarity among rows whose geo intersects the line</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per ulteriori informazioni su come utilizzare un campo <code translate="no">GEOMETRY</code>, consultare <a href="/docs/it/geometry-field.md">Campo geometrico</a>.</p>
<h2 id="Drop-an-index" class="common-anchor-header">Eliminare un indice<button data-href="#Drop-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Usare il metodo <code translate="no">drop_index()</code> per rimuovere un indice esistente da una collezione.</p>
<div class="alert note">
<ul>
<li><p>Nella <strong>versione 2.6.3</strong> o precedente, è necessario rilasciare la collezione prima di eliminare un indice.</p></li>
<li><p>Dalla <strong>versione 2.6.4</strong> o successiva, è possibile eliminare direttamente un indice quando non è più necessario, senza dover prima rilasciare l'insieme.</p></li>
</ul>
</div>
<pre><code translate="no" class="language-python">client.drop_index(
    collection_name=<span class="hljs-string">&quot;geo_demo&quot;</span>,   <span class="hljs-comment"># Name of the collection</span>
    index_name=<span class="hljs-string">&quot;rtree_geo&quot;</span> <span class="hljs-comment"># Name of the index to drop</span>
)
<button class="copy-code-btn"></button></code></pre>
