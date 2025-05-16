---
id: multi-vector-search.md
order: 2
summary: >-
  Esta guía muestra cómo realizar una búsqueda híbrida en Milvus y comprender la
  reordenación de los resultados.
title: Búsqueda híbrida
---
<h1 id="Hybrid-Search" class="common-anchor-header">Búsqueda híbrida<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Desde Milvus 2.4, hemos introducido el soporte multivectorial y un marco de búsqueda híbrida, lo que significa que los usuarios pueden introducir varios campos vectoriales (hasta 10) en una única colección. Estos vectores en diferentes columnas representan diversas facetas de los datos, procedentes de diferentes modelos de incrustación o sometidos a distintos métodos de procesamiento. Los resultados de las búsquedas híbridas se integran mediante estrategias de reordenación, como la fusión recíproca de rangos (RRF) y la puntuación ponderada. Para obtener más información sobre las estrategias de reordenación, consulte <a href="/docs/es/v2.4.x/reranking.md">Reordenación</a>.</p>
<p>Esta función es especialmente útil en escenarios de búsqueda exhaustiva, como la identificación de la persona más similar en una biblioteca de vectores basada en varios atributos como imágenes, voz, huellas dactilares, etc.</p>
<p>En este tutorial, aprenderá a:</p>
<ul>
<li><p>Crear múltiples instancias de <code translate="no">AnnSearchRequest</code> para búsquedas de similitud en diferentes campos vectoriales;</p></li>
<li><p>Configurar una estrategia de renumeración para combinar y renumerar los resultados de búsqueda de múltiples instancias de <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Utilizar el método <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> para realizar una búsqueda híbrida.</p></li>
</ul>
<div class="alert note">
<p>Los fragmentos de código de esta página utilizan el <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">módulo PyMilvus ORM</a> para interactuar con Milvus. Pronto estarán disponibles fragmentos de código con el nuevo <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a>.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparativos<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de iniciar una búsqueda híbrida, asegúrese de que tiene una colección con múltiples campos vectoriales. Actualmente, Milvus introduce por defecto cuatro campos vectoriales por colección, que pueden ampliarse hasta un máximo de diez modificando la configuración <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>A continuación se muestra un ejemplo de creación de una colección llamada <code translate="no">test_collection</code> con dos campos vectoriales, <code translate="no">filmVector</code> y <code translate="no">posterVector</code>, e inserción de entidades aleatorias en ella.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Paso 1: Crear varias instancias de AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Una búsqueda híbrida utiliza la API <code translate="no">hybrid_search()</code> para realizar múltiples peticiones de búsqueda RNA en una sola llamada. Cada <code translate="no">AnnSearchRequest</code> representa una única petición de búsqueda en un campo vectorial específico.</p>
<p>El siguiente ejemplo crea dos instancias <code translate="no">AnnSearchRequest</code> para realizar búsquedas de similitud individuales en dos campos vectoriales.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Parámetros:</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(objeto</em>)</p>
<p>Una clase que representa una petición de búsqueda RNA. Cada búsqueda híbrida puede contener de 1 a 1.024 objetos <code translate="no">ANNSearchRequest</code> a la vez.</p></li>
<li><p><code translate="no">data</code> <em>(lista</em>)</p>
<p>El vector de consulta a buscar en un único <code translate="no">AnnSearchRequest</code>. Actualmente, este parámetro acepta una lista que contiene un único vector de consulta, por ejemplo, <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. En el futuro, este parámetro se ampliará para aceptar múltiples vectores de consulta.</p></li>
<li><p><code translate="no">anns_field</code> <em>(cadena</em>)</p>
<p>Nombre del campo vectorial que se utilizará en un único <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Un diccionario de parámetros de búsqueda para un único <code translate="no">AnnSearchRequest</code>. Estos parámetros de búsqueda son idénticos a los de una búsqueda de un solo vector. Para más información, consulte <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Parámetros de búsqueda</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Número máximo de resultados de búsqueda que se incluirán en un único <code translate="no">ANNSearchRequest</code>.</p>
<p>Este parámetro sólo afecta al número de resultados de búsqueda a devolver dentro de un <code translate="no">ANNSearchRequest</code> individual, y no decide los resultados finales a devolver para una llamada a <code translate="no">hybrid_search</code>. En una búsqueda híbrida, los resultados finales se determinan combinando y reordenando los resultados de varias instancias de <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Paso 2: Configurar una estrategia de reordenación<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez creadas las instancias <code translate="no">AnnSearchRequest</code>, configure una estrategia de reordenación para combinar y reordenar los resultados. Actualmente, existen dos opciones: <code translate="no">WeightedRanker</code> y <code translate="no">RRFRanker</code>. Para obtener más información sobre las estrategias de reordenación, consulte <a href="/docs/es/v2.4.x/reranking.md">Reordenación</a>.</p>
<ul>
<li><p>Utilizar puntuación ponderada</p>
<p><code translate="no">WeightedRanker</code> se utiliza para asignar importancia a los resultados de cada búsqueda de campo vectorial con pesos especificados. Si da prioridad a unos campos vectoriales sobre otros, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> puede reflejarlo en los resultados combinados de la búsqueda.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Al utilizar <code translate="no">WeightedRanker</code>, tenga en cuenta que</p>
<ul>
<li>Cada valor de peso oscila entre 0 (menos importante) y 1 (más importante), lo que influye en la puntuación agregada final.</li>
<li>El número total de valores de ponderación proporcionados en <code translate="no">WeightedRanker</code> debe ser igual al número de instancias de <code translate="no">AnnSearchRequest</code> que haya creado.</li>
</ul></li>
<li><p>Utilizar la fusión recíproca de rangos (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Paso 3: Realizar una búsqueda híbrida<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez definidas las instancias de <code translate="no">AnnSearchRequest</code> y la estrategia de reordenación, utilice el método <code translate="no">hybrid_search()</code> para realizar la búsqueda híbrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Parámetros:</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(lista</em>)</p>
<p>Una lista de peticiones de búsqueda, donde cada petición es un objeto <code translate="no">ANNSearchRequest</code>. Cada petición puede corresponder a un campo vectorial diferente y a un conjunto diferente de parámetros de búsqueda.</p></li>
<li><p><code translate="no">rerank</code> <em>(objeto</em>)</p>
<p>La estrategia de reordenación que se utilizará para la búsqueda híbrida. Valores posibles: <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> y <code translate="no">RRFRanker()</code>.</p>
<p>Para más información sobre las estrategias de reordenación, consulte <a href="/docs/es/v2.4.x/reranking.md">Reordenación</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>El número máximo de resultados finales a devolver en la búsqueda híbrida.</p></li>
</ul>
<p>La salida es similar a la siguiente:</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Límites<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Normalmente, cada colección tiene un límite por defecto de hasta 4 campos vectoriales. Sin embargo, tiene la opción de ajustar la configuración de <code translate="no">proxy.maxVectorFieldNum</code> para ampliar el número máximo de campos vectoriales de una colección, con un límite máximo de 10 campos vectoriales por colección. Consulte <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Configuraciones relacionadas con proxy</a> para obtener más información.</p></li>
<li><p>Los campos vectoriales parcialmente indexados o cargados en una colección provocarán un error.</p></li>
<li><p>Actualmente, cada <code translate="no">AnnSearchRequest</code> en una búsqueda híbrida sólo puede llevar un vector de consulta.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">PREGUNTAS FRECUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>¿En qué situaciones se recomienda la búsqueda híbrida?</strong></p>
<p>La búsqueda híbrida es ideal para situaciones complejas que exigen una gran precisión, especialmente cuando una entidad puede estar representada por vectores múltiples y diversos. Esto se aplica a los casos en que los mismos datos, como una frase, se procesan a través de diferentes modelos de incrustación o cuando la información multimodal (como imágenes, huellas dactilares y huellas de voz de un individuo) se convierte en varios formatos vectoriales. Al asignar pesos a estos vectores, su influencia combinada puede enriquecer significativamente la recuperación y mejorar la eficacia de los resultados de búsqueda.</p></li>
<li><p><strong>¿Cómo normaliza un clasificador ponderado las distancias entre distintos campos vectoriales?</strong></p>
<p>Un clasificador ponderado normaliza las distancias entre campos vectoriales utilizando pesos asignados a cada campo. Calcula la importancia de cada campo vectorial en función de su peso, dando prioridad a los que tienen pesos más altos. Se recomienda utilizar el mismo tipo de métrica en todas las solicitudes de búsqueda de RNA para garantizar la coherencia. Este método garantiza que los vectores considerados más significativos tengan una mayor influencia en la clasificación general.</p></li>
<li><p><strong>¿Es posible utilizar clasificadores alternativos como Cohere Ranker o BGE Ranker?</strong></p>
<p>Actualmente, sólo se admiten los clasificadores proporcionados. Se está planeando incluir otros clasificadores en futuras actualizaciones.</p></li>
<li><p><strong>¿Es posible realizar varias operaciones de búsqueda híbrida al mismo tiempo?</strong></p>
<p>Sí, se admite la ejecución simultánea de múltiples operaciones de búsqueda híbrida.</p></li>
<li><p><strong>¿Puedo utilizar el mismo campo vectorial en varios objetos AnnSearchRequest para realizar búsquedas híbridas?</strong></p>
<p>Técnicamente, es posible utilizar el mismo campo vectorial en múltiples objetos AnnSearchRequest para realizar búsquedas híbridas. No es necesario tener varios campos vectoriales para realizar una búsqueda híbrida.</p></li>
</ul>
