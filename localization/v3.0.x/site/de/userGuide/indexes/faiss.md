---
id: faiss.md
title: FAISSCompatible with Milvus 3.0.0+
summary: >-
  Verwenden Sie die FAISS-Index-Weiterleitung, um in Milvus 3.0 die von der
  FAISS-Index-Factory bereitgestellten Zeichenfolgen und die factoryspezifischen
  Suchparameter zu übergeben.
beta: Milvus 3.0.0+
---
<h1 id="FAISS" class="common-anchor-header">FAISS<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0+</span><button data-href="#FAISS" class="anchor-icon" translate="no">
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
    </button></h1><p>Der Index-Typ „ <code translate="no">FAISS</code> “ ist eine Pass-Through-Funktion für Experten, die ab Milvus 3.0.0 verfügbar ist. Damit können Sie eine <a href="https://github.com/facebookresearch/faiss/wiki/The-index-factory">Faiss-Index-Factory-Zeichenkette</a> angeben, anstatt einen festen Milvus-Index-Typ auszuwählen.</p>
<p>Verwenden Sie „ <code translate="no">FAISS</code> “, wenn Sie bereits über ein getestetes Faiss-Rezept verfügen und direkte Kontrolle über dessen Zusammensetzung benötigen. Bei gängigen Rezepten mit einem dedizierten Milvus-Indextyp sollten Sie den dedizierten Typ bevorzugen, da dieser über eine stabile, dokumentierte Parameterkonvention verfügt.</p>
<div class="alert note">
<p>Ein von Upstream-Faiss akzeptierter Factory-String wird von Milvus nicht automatisch unterstützt. Die Kompatibilität hängt vom Vektorfeldtyp, der Metrik, der Dimension, den in das Milvus-Image kompilierten Faiss-Modulen sowie davon ab, ob der resultierende Index die von Milvus benötigten Operationen unterstützt.</p>
</div>
<h2 id="Limits" class="common-anchor-header">Einschränkungen<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">FAISS</code> unterstützt die Felder „ <code translate="no">FLOAT_VECTOR</code> “ und „ <code translate="no">BINARY_VECTOR</code> “. Die Felder „ <code translate="no">FLOAT16_VECTOR</code> “, „ <code translate="no">BFLOAT16_VECTOR</code> “, „ <code translate="no">INT8_VECTOR</code> “ und „ <code translate="no">SPARSE_FLOAT_VECTOR</code> “ werden nicht unterstützt.</p></li>
<li><p>Der generische „ <code translate="no">FAISS</code> “-Adapter läuft auf der CPU. Es handelt sich nicht um einen Faiss-GPU-Indextyp.</p></li>
<li><p>Der Build-Parameter „ <code translate="no">faiss_index_name</code> “ ist erforderlich. Milvus übergibt dessen Wert an Faiss, ohne das Rezept in einen dedizierten Milvus-Indextyp zu konvertieren.</p></li>
<li><p>Build- und Suchparameter sind fabrikspezifisch. Ein von einer Fabrik unterstützter Parameter kann von einer anderen abgelehnt werden.</p></li>
<li><p>Für die skalare Filterung muss der zugrunde liegende Faiss-Index einen ID-Selektor unterstützen. Die Tests von Milvus 3.0.0 decken die gefilterte Suche mit den Float-Fabriken „ <code translate="no">Flat</code> “, „ <code translate="no">IVF64,Flat</code> “ und „ <code translate="no">HNSW16,Flat</code> “ ab. Gehen Sie nicht davon aus, dass jede Fabrik Filter unterstützt oder dass binäre „ <code translate="no">FAISS</code> “-Indizes die skalare Filterung unterstützen.</p></li>
<li><p>Such-Iteratoren werden nicht unterstützt.</p></li>
<li><p>Der Adapter bietet keine Raw-Vektor-Abfrage.</p></li>
<li><p>Die Unterstützung der Bereichssuche hängt von der Factory ab. „Float <code translate="no">Flat</code> “ ist in der aktuellen Version enthalten. Verwenden Sie die Bereichssuche nicht mit binären „ <code translate="no">FAISS</code> “-Indizes.</p></li>
<li><p>Eine Factory kann erfolgreich erstellt werden, aber dennoch einige Milvus-Suchoperationen ablehnen. Beispielsweise lehnt der eigenständige „ <code translate="no">PQ8x4</code> “ den von der skalargefilterten Suche verwendeten Selektor ab. Überprüfen Sie die ungefilterte Verwendung separat.</p></li>
<li><p>In Milvus 3.0.0 sollten Sie nach einem Neuladen des Index die „ <code translate="no">COSINE</code> “-Scores und die Schwellenwerte für die Bereichssuche überprüfen. Knowhere v3.0.6 stellt den Zustand der Kosinus-Normalisierung des „ <code translate="no">FAISS</code> “-Adapters während der Deserialisierung nicht wieder her.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">So funktioniert es<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/faiss-index-flow.png" alt="FAISS index passthrough workflow" class="doc-image" id="faiss-index-passthrough-workflow" /> 
   <span>FAISS-Index-Passthrough-Workflow</span>
  
 </span></p>
<p>Zum Erstellen des Indexes leitet Milvus „ <code translate="no">faiss_index_name</code> “, den Vektorfeldtyp, die Metrik und weitere Erstellungsparameter an den Knowhere-FAISS-Adapter weiter. Der Adapter ruft „ <code translate="no">faiss::index_factory()</code> “ für „ <code translate="no">FLOAT_VECTOR</code> “-Felder oder „ <code translate="no">faiss::index_binary_factory()</code> “ für „ <code translate="no">BINARY_VECTOR</code> “-Felder auf. Das resultierende Objekt ist ein nativer FAISS-Index, der über den normalen Milvus-Index-Lebenszyklus verwaltet wird.</p>
<p>Für die Suche wandelt der Adapter die übergebenen herstellerspezifischen Parameter in das entsprechende Faiss- <code translate="no">SearchParameters</code> -Objekt um. Bei unterstützten Float-Herstellern übergibt er zudem das Milvus-Filter-Bitset als Faiss-Selektor. Die Selektorunterstützung ist fabrikspezifisch, und die veröffentlichten Tests stellen keine skalare Filterung für „binary <code translate="no">FAISS</code> “-Indizes her. Aus diesem Grund kann ein Rezept in der eigenständigen Faiss-Version gültig sein, aber eine vom Milvus-Suchpfad geforderte Operation ablehnen.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus 3.0.0 oder höher</li>
<li>PyMilvus 3.0.0 oder höher</li>
<li>Vertrautheit mit der Syntax der Faiss-Index-Factory und den Trainingsanforderungen der ausgewählten Factory</li>
</ul>
<p>Anweisungen zur Installation finden Sie unter <a href="/docs/de/install-pymilvus.md">„PyMilvus installieren</a>“.</p>
<h2 id="Choose-a-factory-string" class="common-anchor-header">Wählen Sie einen Factory-String<button data-href="#Choose-a-factory-string" class="anchor-icon" translate="no">
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
    </button></h2><p>Ein Factory-String beschreibt einen Faiss-Index als Folge von Komponenten. Die folgenden Beispiele wurden mit der Release-Test-Version von Milvus 3.0.0 getestet. Diese Liste erhebt keinen Anspruch auf Vollständigkeit.</p>
<table>
<thead>
<tr><th>Factory-String</th><th>Feldtyp</th><th>In den Release-Tests getestete Metriken</th><th>Suchparameter</th><th>Anmerkungen</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>Keine</td><td>Exakte Suche.</td></tr>
<tr><td><code translate="no">IVF64,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">nprobe</code></td><td>IVF mit 64 invertierten Listen und unkomprimierten Vektoren.</td></tr>
<tr><td><code translate="no">HNSW16,Flat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td><td><code translate="no">efSearch</code></td><td>HNSW-Graph mit flacher Vektorspeicherung.</td></tr>
<tr><td><code translate="no">OPQ16,IVF64,PQ16x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Fabrikspezifisch</td><td>Kombiniert OPQ, IVF und PQ. Überprüfen Sie Trainingsgröße und Recall anhand Ihrer Daten.</td></tr>
<tr><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td><code translate="no">nprobe</code>, <code translate="no">k_factor</code></td><td>Verwendet nach der PQ-Kandidatenauswahl einen „Flat Refiner“.</td></tr>
<tr><td><code translate="no">PQ8x4</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">L2</code></td><td>Keine</td><td>Integriert Release-Tests. Die skalargefilterte Suche schlägt fehl, da der Index den Selektor ablehnt; überprüfen Sie die ungefilterte Verwendung separat.</td></tr>
<tr><td><code translate="no">BFlat</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HAMMING</code></td><td>Keine</td><td>Exakte Suche nach binären Vektoren.</td></tr>
</tbody>
</table>
<p>Die Einträge unter „ <code translate="no">COSINE</code> “ geben die Abdeckung der Build- und Such-Smoke-Tests an. Bei Milvus 3.0.0 wird nach einem Neuladen des Indexes weder die Korrektheit der Bewertung noch der Bereichssuche gewährleistet. Siehe <a href="#limits">„Einschränkungen</a>“.</p>
<h2 id="Build-and-search-a-float-index" class="common-anchor-header">Erstellen und Durchsuchen eines Float-Index<button data-href="#Build-and-search-a-float-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Das folgende Beispiel erstellt 3.000 128-dimensionale Vektoren. Dies liefert genügend Trainingsdaten für das im Beispiel verwendete „ <code translate="no">IVF64,Flat</code> “-Rezept. Erweitern Sie den Setup-Block und führen Sie ihn aus, bevor Sie den Index erstellen und durchsuchen.</p>
<p><details></p>
<p><summary>Vorbereiten der Float-Vektor-Sammlung</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_float_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">42</span>)
vectors = [[rng.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">128</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">32</span>)
schema.add_field(<span class="hljs-string">&quot;vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)

rows = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;reference&quot;</span> <span class="hljs-keyword">if</span> i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&quot;query&quot;</span>,
        <span class="hljs-string">&quot;vector&quot;</span>: vector,
    }
    <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)
]

client.insert(collection_name=collection_name, data=rows)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Erstellen Sie den Index<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Stellen Sie „ <code translate="no">index_type</code> “ auf „ <code translate="no">FAISS</code> “ ein und wählen Sie mit „ <code translate="no">faiss_index_name</code> “ das native Faiss-Factory-Rezept aus.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_ivf_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;IVF64,Flat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p>Die Factory-Zeichenkette „ <code translate="no">IVF64,Flat</code> “ erstellt einen IVF-Index mit 64 invertierten Listen und speichert in jeder Liste unkomprimierte Vektoren.</p>
<h3 id="Search-the-index" class="common-anchor-header">Durchsuchen Sie den Index<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Legen Sie fabrikspezifische Suchparameter innerhalb von ` <code translate="no">search_params.params</code>` fest. Bei einer IVF-Fabrik steuert ` <code translate="no">nprobe</code> `, wie viele invertierte Listen Faiss durchsucht.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {</span>
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>},</span>
<span class="highlighted-comment-line">}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;reference&quot;&#x27;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
    output_fields=[<span class="hljs-string">&quot;category&quot;</span>],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Die Abfrage verwendet ` <code translate="no">nprobe=8</code>`, sodass Faiss 8 der 64 invertierten Listen durchsucht. Der Filter beschränkt die Ergebnisse auf Entitäten, deren ` <code translate="no">category</code> `-Wert ` <code translate="no">reference</code>` ist.</p>
<h2 id="Build-and-search-a-binary-index" class="common-anchor-header">Erstellen und Durchsuchen eines Binärindexes<button data-href="#Build-and-search-a-binary-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Verwenden Sie für „ <code translate="no">BINARY_VECTOR</code> “-Felder eine binäre Factory-Zeichenkette wie „ <code translate="no">BFlat</code> “ und eine kompatible binäre Metrik. Erweitern Sie den Setup-Block und führen Sie ihn aus, bevor Sie den Index erstellen und durchsuchen.</p>
<p><details></p>
<p><summary>Bereiten Sie die Binary-Vector-Sammlung vor</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
collection_name = <span class="hljs-string">&quot;faiss_binary_example&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

rng = random.Random(<span class="hljs-number">7</span>)
vectors = [<span class="hljs-built_in">bytes</span>(rng.getrandbits(<span class="hljs-number">8</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">300</span>)]

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;binary_vector&quot;</span>, DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)

client.create_collection(collection_name=collection_name, schema=schema)
client.insert(
    collection_name=collection_name,
    data=[{<span class="hljs-string">&quot;id&quot;</span>: i, <span class="hljs-string">&quot;binary_vector&quot;</span>: vector} <span class="hljs-keyword">for</span> i, vector <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(vectors)],
)
client.flush(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h3 id="Build-the-index" class="common-anchor-header">Erstellen Sie den Index<button data-href="#Build-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Verwenden Sie für dieses Beispiel mit Binärvektoren „ <code translate="no">BFlat</code> “ als Factory-String und „ <code translate="no">HAMMING</code> “ als Metrik.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;faiss_binary_flat&quot;</span>,
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;FAISS&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,</span>
<span class="highlighted-comment-line">    params={<span class="hljs-string">&quot;faiss_index_name&quot;</span>: <span class="hljs-string">&quot;BFlat&quot;</span>},</span>
)

client.create_index(collection_name=collection_name, index_params=index_params)
client.load_collection(collection_name=collection_name)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-the-index" class="common-anchor-header">Durchsuchen Sie den Index<button data-href="#Search-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BFlat</code> verfügt über keinen familienspezifischen Suchparameter. Übergeben Sie beim Erstellen der Suchanfrage ein leeres „ <code translate="no">params</code> “-Mapping.</p>
<pre><code translate="no" class="language-python"><span class="highlighted-comment-line">search_params = {<span class="hljs-string">&quot;params&quot;</span>: {}}</span>

results = client.search(
    collection_name=collection_name,
    data=[vectors[<span class="hljs-number">0</span>]],
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,
<span class="highlighted-wrapper-line">    search_params=search_params,</span>
    limit=<span class="hljs-number">5</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<p>Jeder 128-dimensionale Binärvektor wird durch 16 Byte dargestellt. Weitere Informationen finden Sie unter <a href="/docs/de/binary-vector.md">„Binärvektor</a>“.</p>
<h2 id="Configure-build-and-search-parameters" class="common-anchor-header">Konfigurieren Sie Build- und Suchparameter<button data-href="#Configure-build-and-search-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Der Indextyp „ <code translate="no">FAISS</code> “ verfügt über einen erforderlichen Passthrough-Erstellungsparameter.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Speicherort</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">faiss_index_name</code></td><td><code translate="no">params</code> in <code translate="no">add_index()</code></td><td>Die Zeichenfolge der Faiss-Index-Factory. Zum Beispiel: „ <code translate="no">IVF64,Flat</code> “.</td></tr>
</tbody>
</table>
<p>Legen Sie fabrikspezifische Suchparameter innerhalb von „ <code translate="no">search_params.params</code> “ fest. Die folgende Tabelle enthält gängige Beispiele und erhebt keinen Anspruch auf Vollständigkeit.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Beispiel-Fabrik</th><th>Beschreibung</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td><code translate="no">IVF64,Flat</code></td><td>Anzahl der zu durchsuchenden invertierten Listen.</td></tr>
<tr><td><code translate="no">efSearch</code></td><td><code translate="no">HNSW16,Flat</code></td><td>Größe der HNSW-Suchkandidatenliste.</td></tr>
<tr><td><code translate="no">k_factor</code></td><td><code translate="no">IVF64,PQ8x4,RFlat</code></td><td>Anzahl der an den Refiner übergebenen Kandidaten im Verhältnis zum angeforderten Top-K.</td></tr>
</tbody>
</table>
<p>Milvus leitet nur vom Adapter erkannte zusätzliche Parameter weiter. Unbekannte Build-Schlüssel und Suchschlüssel, die von der jeweiligen Factory-Familie nicht unterstützt werden, werden abgelehnt. Milvus unterhält kein universelles Parameterschema für jede mögliche Factory. Lesen Sie die Faiss-Dokumentation für die ausgewählte Factory und überprüfen Sie anschließend den gesamten Build- und Suchablauf anhand der genauen Milvus-Version und des Images, die Sie bereitstellen möchten.</p>
<h2 id="Handle-errors-and-unsupported-operations" class="common-anchor-header">Behandlung von Fehlern und nicht unterstützten Operationen<button data-href="#Handle-errors-and-unsupported-operations" class="anchor-icon" translate="no">
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
<li><p>Wenn die Factory-Zeichenkette ungültig oder im Milvus-Build nicht verfügbar ist, schlägt der Indexaufbau fehl. Überprüfen Sie den Indexstatus und den Fehlergrund, bevor Sie die Sammlung laden.</p></li>
<li><p>Wenn ein Parameter den falschen Typ hat, schlägt die Suche fehl. Beispielsweise wird „ <code translate="no">nprobe=&quot;invalid&quot;</code> “ abgelehnt, da „ <code translate="no">nprobe</code> “ numerisch sein muss.</p></li>
<li><p>Wenn ein Parameter nicht auf die erstellte Factory zutrifft, lehnt der Adapter ihn als nicht unterstützt ab.</p></li>
<li><p>Wenn eine Factory den Milvus-Selektor nicht unterstützt, kann die gefilterte Suche fehlschlagen, selbst wenn dieselbe Factory in einem eigenständigen Faiss-System suchen kann.</p></li>
<li><p>Verwenden Sie „ <code translate="no">search_iterator()</code> “ nicht mit einem „ <code translate="no">FAISS</code> “-Index.</p></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Was kommt als Nächstes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Erfahren Sie in <a href="/docs/de/index-explained.md">„Index Explained“</a>, wie Milvus-Indizes aufgebaut sind.</li>
<li>Vergleichen Sie die speziellen Index-Typen <a href="/docs/de/ivf-flat.md">„IVF_FLAT</a> “ und <a href="/docs/de/hnsw.md">„HNSW</a> “.</li>
<li>Lesen Sie <a href="/docs/de/metric.md">den Abschnitt „Metriktypen“</a>, bevor Sie eine Metrik für die Factory auswählen.</li>
</ul>
