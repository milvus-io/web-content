---
id: sparse_vector.md
summary: 'Lernen Sie, wie man spärliche Vektoren in Milvus verwendet.'
title: Spärlicher Vektor
---
<h1 id="Sparse-Vector" class="common-anchor-header">Spärlicher Vektor<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Sparse Vectors stellen Wörter oder Phrasen mithilfe von Vektoreinbettungen dar, bei denen die meisten Elemente Null sind und nur ein Element, das nicht Null ist, das Vorhandensein eines bestimmten Wortes anzeigt. Modelle mit spärlichen Vektoren, wie <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, übertreffen dichte Modelle bei der Suche nach Wissen außerhalb der Domäne, der Kenntnis von Schlüsselwörtern und der Interpretierbarkeit. Sie sind besonders nützlich im Information Retrieval, in der natürlichen Sprachverarbeitung und in Empfehlungssystemen, wo die Kombination von spärlichen Vektoren für den Abruf mit einem großen Modell für das Ranking die Retrieval-Ergebnisse erheblich verbessern kann.</p>
<p>In Milvus folgt die Verwendung von spärlichen Vektoren einem ähnlichen Arbeitsablauf wie der von dichten Vektoren. Er umfasst das Erstellen einer Sammlung mit einer Spalte für spärliche Vektoren, das Einfügen von Daten, das Erstellen eines Indexes und das Durchführen von Ähnlichkeitssuchen und skalaren Abfragen.</p>
<p>In diesem Tutorial werden Sie lernen, wie man:</p>
<ul>
<li>Sparse-Vektor-Einbettungen vorbereiten;</li>
<li>eine Sammlung mit einem Sparse-Vektor-Feld erstellen;</li>
<li>Einfügen von Entitäten mit spärlichen Vektoreinbettungen;</li>
<li>Indizieren der Sammlung und Durchführen einer ANN-Suche auf spärlichen Vektoren.</li>
</ul>
<p>Um spärliche Vektoren in Aktion zu sehen, siehe <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py</a>.</p>
<div class="admonition note">
    <p><b>Hinweise</b></p>
        Derzeit ist die Unterstützung für spärliche Vektoren ein Beta-Feature in 2.4.0, mit Plänen, es in 3.0.0 allgemein verfügbar zu machen.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Sparse-Vektor-Einbettungen vorbereiten<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Um spärliche Vektoren in Milvus zu verwenden, bereiten Sie Vektoreinbettungen in einem der unterstützten Formate vor:</p>
<ul>
<li><p><strong>Sparse Matrices</strong>: Verwenden Sie die <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> Klassenfamilie, um Ihre sparse Einbettungen darzustellen. Diese Methode ist effizient für den Umgang mit großen, hochdimensionalen Daten.</p></li>
<li><p><strong>Liste von Wörterbüchern</strong>: Stellen Sie jede Sparse-Einbettung als Wörterbuch dar, strukturiert als <code translate="no">{dimension_index: value, ...}</code>, wobei jedes Schlüssel-Wert-Paar den Dimensionsindex und den entsprechenden Wert darstellt.</p>
<p>Beispiel:</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Liste von Iterablen von Tupeln</strong>: Ähnlich wie eine Liste von Wörterbüchern, aber Verwendung einer Iterable von Tupeln, <code translate="no">[(dimension_index, value)]</code>, um nur die Nicht-Null-Dimensionen und ihre Werte anzugeben.</p>
<p>Beispiel:</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>Das folgende Beispiel bereitet Sparse Embeddings vor, indem es eine zufällige Sparse-Matrix für 10.000 Entitäten mit jeweils 10.000 Dimensionen und einer Sparsity-Dichte von 0,005 erzeugt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>Hinweise</b></p>
<p>Die Vektordimensionen müssen vom Typ Python <code translate="no">int</code> oder <code translate="no">numpy.integer</code> sein, und die Werte müssen vom Typ Python <code translate="no">float</code> oder <code translate="no">numpy.floating</code> sein.</p>
</div>
<p>Zum Erzeugen von Einbettungen können Sie auch das in der PyMilvus-Bibliothek enthaltene Paket <code translate="no">model</code> verwenden, das eine Reihe von Einbettungsfunktionen bietet. Einzelheiten finden Sie unter <a href="/docs/de/v2.4.x/embeddings.md">Einbettungen</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Erstellen einer Sammlung mit einem spärlichen Vektorfeld<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Um eine Sammlung mit einem spärlichen Vektorfeld zu erstellen, setzen Sie den <strong>Datentyp</strong> des spärlichen Vektorfeldes auf <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. Im Gegensatz zu dichten Vektoren muss für Sparse-Vektoren keine Dimension angegeben werden.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Einzelheiten zu den üblichen Sammlungsparametern finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection() .</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Einfügen von Entitäten mit spärlichen Vektoreinbettungen<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Um Entitäten mit spärlichen Vektoreinbettungen einzufügen, übergeben Sie einfach die Liste der Entitäten an die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> Methode.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Indizieren der Sammlung<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Bevor Sie Ähnlichkeitssuchen durchführen, erstellen Sie einen Index für die Sammlung. Weitere Informationen über Index-Typen und -Parameter finden Sie unter <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> und <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Für die Indexerstellung auf spärlichen Vektoren ist folgendes zu beachten:</p>
<ul>
<li><p><code translate="no">index_type</code>: Der Typ des zu erstellenden Index. Mögliche Optionen für spärliche Vektoren:</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: Ein invertierter Index, der jede Dimension auf ihre Nicht-Null-Vektoren abbildet und so den direkten Zugriff auf relevante Daten bei der Suche erleichtert. Ideal für Datensätze mit spärlichen, aber hochdimensionalen Daten.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Verwendet den Weak-AND-Algorithmus (WAND), um unwahrscheinliche Kandidaten schnell zu umgehen und die Bewertung auf diejenigen mit höherem Rangpotenzial zu konzentrieren. Behandelt Dimensionen als Begriffe und Vektoren als Dokumente, um die Suche in großen, spärlichen Datensätzen zu beschleunigen.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Nur die <code translate="no">IP</code> (Inner Product) Distanzmetrik wird für spärliche Vektoren unterstützt.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: Der Index-Parameter, der speziell für spärliche Vektoren verwendet wird. Er steuert den Anteil der kleinen Vektorwerte, die während des Indizierungsprozesses ausgeschlossen werden. Dieser Parameter ermöglicht eine Feinabstimmung des Kompromisses zwischen Effizienz und Genauigkeit, indem kleine Werte bei der Indexerstellung außer Acht gelassen werden. Wenn beispielsweise <code translate="no">drop_ratio_build = 0.3</code> gewählt wird, werden während der Indexerstellung alle Werte aus allen spärlichen Vektoren gesammelt und sortiert. Die kleinsten 30 % dieser Werte werden nicht in den Index aufgenommen, wodurch die Rechenlast bei der Suche verringert wird.</p></li>
</ul>
<p>Weitere Informationen finden Sie unter <a href="/docs/de/v2.4.x/index.md">In-Memory-Index</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">ANN-Suche durchführen<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Nachdem die Sammlung indiziert und in den Speicher geladen wurde, verwenden Sie die <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> Methode, um die relevanten Dokumente auf der Grundlage der Abfrage abzurufen.</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>Beachten Sie bei der Konfiguration der Suchparameter die folgenden Punkte:</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: Der Suchparameter, der speziell für spärliche Vektoren verwendet wird. Diese Option ermöglicht eine Feinabstimmung des Suchprozesses, indem sie das Verhältnis der kleinsten Werte im Abfragevektor angibt, die ignoriert werden sollen. Sie hilft, ein Gleichgewicht zwischen Suchgenauigkeit und Leistung herzustellen. Je kleiner der Wert für <code translate="no">drop_ratio_search</code> eingestellt wird, desto weniger tragen diese kleinen Werte zur endgültigen Bewertung bei. Durch das Ignorieren einiger kleiner Werte kann die Suchleistung mit minimalen Auswirkungen auf die Genauigkeit verbessert werden.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Skalare Abfragen durchführen<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Zusätzlich zur ANN-Suche unterstützt Milvus auch skalare Abfragen auf spärlichen Vektoren. Mit diesen Abfragen können Sie Dokumente auf der Grundlage eines mit dem Sparse-Vektor verbundenen Skalarwerts abrufen. Weitere Informationen zu den Parametern finden Sie in <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Filtert Entitäten mit <strong>scalar_field</strong> größer als 3:</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>Filtert Entitäten nach dem Primärschlüssel:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Begrenzt<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Bei der Verwendung von Sparse Vectors in Milvus sind die folgenden Einschränkungen zu beachten:</p>
<ul>
<li><p>Derzeit wird nur die <strong>IP-Distanzmetrik</strong> für Sparse-Vektoren unterstützt.</p></li>
<li><p>Für spärliche Vektorfelder werden nur die Indexarten <strong>SPARSE_INVERTED_INDEX</strong> und <strong>SPARSE_WAND</strong> unterstützt.</p></li>
<li><p>Derzeit werden <a href="https://milvus.io/docs/single-vector-search.md#Range-search">Bereichssuche</a>, <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">Gruppierungssuche</a> und <a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">Such-Iterator</a> für spärliche Vektoren nicht unterstützt.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Welche Abstandsmetrik wird für spärliche Vektoren unterstützt?</strong></p>
<p>Sparse Vektoren unterstützen nur die Distanzmetrik Inneres Produkt (IP) aufgrund der hohen Dimensionalität von Sparse Vektoren, die L2-Distanz und Kosinusdistanz unpraktisch macht.</p></li>
<li><p><strong>Können Sie den Unterschied zwischen SPARSE_INVERTED_INDEX und SPARSE_WAND erklären, und wie wähle ich zwischen ihnen?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> ist ein herkömmlicher invertierter Index, während <strong>SPARSE_WAND</strong> den <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND-Algorithmus</a> verwendet, um die Anzahl der vollständigen IP-Abstandsauswertungen während der Suche zu reduzieren. <strong>SPARSE_WAND</strong> ist in der Regel schneller, aber seine Leistung kann mit zunehmender Vektordichte abnehmen. Um zwischen den beiden Algorithmen zu wählen, führen Sie Experimente und Benchmarks durch, die auf Ihrem spezifischen Datensatz und Anwendungsfall basieren.</p></li>
<li><p><strong>Wie sollte ich die Parameter drop_ratio_build und drop_ratio_search wählen?</strong></p>
<p>Die Wahl von <strong>drop_ratio_build</strong> und <strong>drop_ratio_search</strong> hängt von den Eigenschaften Ihrer Daten und Ihren Anforderungen an Suchlatenz/Durchsatz und Genauigkeit ab.</p></li>
<li><p><strong>Welche Datentypen werden für Sparse Embeddings unterstützt?</strong></p>
<p>Der Dimensionsteil muss eine vorzeichenlose 32-Bit-Ganzzahl sein, und der Werteteil kann eine nicht-negative 32-Bit-Gleitkommazahl sein.</p></li>
<li><p><strong>Kann die Dimension einer Sparse-Einbettung ein beliebiger diskreter Wert innerhalb des uint32-Raums sein?</strong></p>
<p>Ja, mit einer Ausnahme. Die Dimension einer spärlichen Einbettung kann ein beliebiger Wert im Bereich von <code translate="no">[0, maximum of uint32)</code> sein. Das bedeutet, dass Sie nicht den Maximalwert von uint32 verwenden können.</p></li>
<li><p><strong>Wird die Suche nach wachsenden Segmenten über einen Index oder mit roher Gewalt durchgeführt?</strong></p>
<p>Die Suche nach wachsenden Segmenten wird über einen Index desselben Typs wie der Index des versiegelten Segments durchgeführt. Für neue wachsende Segmente, bevor der Index aufgebaut ist, wird eine Brute-Force-Suche verwendet.</p></li>
<li><p><strong>Ist es möglich, sowohl spärliche als auch dichte Vektoren in einer einzigen Sammlung zu haben?</strong></p>
<p>Ja, mit der Unterstützung mehrerer Vektortypen können Sie Sammlungen mit sowohl spärlichen als auch dichten Vektorspalten erstellen und eine hybride Suche durchführen.</p></li>
<li><p><strong>Welche Voraussetzungen müssen erfüllt sein, damit Sparse Embeddings eingefügt oder durchsucht werden können?</strong></p>
<p>Sparse Embeddings müssen mindestens einen Wert ungleich Null haben, und Vektorindizes müssen nicht negativ sein.</p></li>
</ul>
