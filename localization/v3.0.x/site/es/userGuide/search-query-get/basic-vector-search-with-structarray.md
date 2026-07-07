---
id: basic-vector-search-with-structarray.md
title: Búsqueda vectorial básica con StructArray
summary: >-
  Utiliza esta página para realizar búsquedas vectoriales en subcampos
  vectoriales dentro de un campo StructArray. StructArray admite dos modos
  básicos de búsqueda vectorial: la búsqueda en EmbeddingList, que evalúa una
  lista de incrustaciones almacenada en cada entidad, y la búsqueda a nivel de
  elemento, que busca en cada elemento de Struct de forma independiente.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">Búsqueda vectorial básica con StructArray<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza esta página para realizar búsquedas vectoriales en subcampos vectoriales dentro de un campo StructArray. StructArray admite dos modos básicos de búsqueda vectorial: la búsqueda en EmbeddingList, que evalúa una lista de incrustaciones almacenada en cada entidad, y la búsqueda a nivel de elemento, que busca en cada elemento de Struct de forma independiente.</p>
<p>Esta página utiliza la colección « <code translate="no">tech_articles</code> » de la sección <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>». La colección cuenta con un campo StructArray denominado « <code translate="no">chunks</code> ». Cada fragmento contiene texto, metadatos escalares, un subcampo vectorial denominado « <code translate="no">emb_list_vector</code> » con un índice para la búsqueda en EmbeddingList, y un subcampo vectorial denominado « <code translate="no">emb</code> » con un índice para la búsqueda a nivel de elemento.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Asegúrate de que el esquema de la colección, los datos y los índices ya estén preparados.</p>
<table>
<thead>
<tr><th>Requisitos</th><th>Dónde prepararlo</th></tr>
</thead>
<tbody>
<tr><td>Crea un campo StructArray, como <code translate="no">chunks</code>.</td><td><a href="/docs/es/create-structarray-field.md">Crear un campo StructArray</a></td></tr>
<tr><td>Inserta entidades cuyo campo « <code translate="no">chunks</code> » contenga objetos Struct.</td><td><a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos StructArray</a></td></tr>
<tr><td>Crea un índice « <code translate="no">MAX_SIM*</code> » en « <code translate="no">chunks[emb_list_vector]</code> » para la búsqueda en «EmbeddingList».</td><td><a href="/docs/es/index-structarray-fields.md">Indexar campos «StructArray»</a></td></tr>
<tr><td>Crear un índice vectorial-métrico normal en « <code translate="no">chunks[emb]</code> » para la búsqueda a nivel de elemento.</td><td><a href="/docs/es/index-structarray-fields.md">Indexar campos de StructArray</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Advertencia</p>
<p>Un campo vectorial o un subcampo vectorial solo admite un índice. Si necesitas tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, crea dos subcampos vectoriales independientes. En esta página, <code translate="no">chunks[emb_list_vector]</code> está indexado para la búsqueda en EmbeddingList, y <code translate="no">chunks[emb]</code> está indexado para la búsqueda a nivel de elemento.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">Elige un modo de búsqueda<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Aspecto</th><th>Búsqueda en EmbeddingList</th><th>Búsqueda a nivel de elemento</th></tr>
</thead>
<tbody>
<tr><td>Subcampo de destino</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Datos de consulta</td><td>Una lista de incrustaciones que contiene uno o más vectores.</td><td>Un vector normal.</td></tr>
<tr><td>Familia de métricas</td><td><code translate="no">MAX_SIM*</code>, como <code translate="no">MAX_SIM_COSINE</code>.</td><td>Métricas vectoriales habituales, como <code translate="no">COSINE</code>, <code translate="no">IP</code> o <code translate="no">L2</code>.</td></tr>
<tr><td>Qué representa un resultado</td><td>Una entidad coincidente cuyo subcampo vectorial StructArray es similar a la lista de incrustaciones de la consulta.</td><td>Un elemento Struct coincidente dentro del campo StructArray.</td></tr>
<tr><td>Granularidad de los resultados</td><td>Nivel de entidad.</td><td>Nivel de elemento Struct.</td></tr>
<tr><td>Desplazamiento</td><td>No aplicable.</td><td>Identifica la posición, contada a partir de cero, del elemento Struct coincidente cuando se devuelve.</td></tr>
<tr><td>Uso habitual</td><td>ColBERT, ColPali y otros patrones de recuperación de interacción tardía.</td><td>Recuperación a nivel de fragmento, de pasaje, de clip, de parche o de dato.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">Ejecutar una búsqueda con EmbeddingList<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza la búsqueda con EmbeddingList cuando la propia consulta contenga varios vectores y el subcampo del vector StructArray de destino esté indexado con una métrica de « <code translate="no">MAX_SIM*</code> ». El resultado es una coincidencia a nivel de entidad.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>En este modo de búsqueda, « <code translate="no">limit</code> » controla cuántas entidades se devuelven para cada consulta. El resultado puede incluir subcampos de StructArray, pero la coincidencia en sí representa la entidad principal con la que coincide, en lugar de un elemento Struct específico.</p>
<div class="alert note">
<p>Para obtener una guía completa al estilo de ColBERT o ColPali, consulta <a href="/docs/es/search-with-embedding-lists.md">«Búsqueda con listas de incrustación</a>». Esta página solo aborda el comportamiento básico de la búsqueda en StructArray.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">Realizar una búsqueda a nivel de elemento<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilice la búsqueda a nivel de elemento cuando cada elemento de Struct deba participar en la búsqueda vectorial de forma independiente. La consulta es un vector normal, y el subcampo del vector de destino debe estar indexado con una métrica vectorial normal.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>En la búsqueda a nivel de elemento, cada resultado representa un elemento Struct coincidente. El valor « <code translate="no">offset</code> » es la posición, contada a partir de cero, de ese elemento en el campo StructArray. La misma entidad puede aparecer más de una vez si hay más de un elemento Struct que coincide con la consulta. El valor « <code translate="no">limit</code> » se aplica a los resultados de los elementos, no a entidades principales únicas.</p>
<h2 id="Interpret-results" class="common-anchor-header">Interpretación de los resultados<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Elemento de resultado</th><th>Búsqueda en EmbeddingList</th><th>Búsqueda a nivel de elemento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>Clave primaria de la entidad coincidente.</td><td>Clave primaria de la entidad que contiene el elemento Struct coincidente.</td></tr>
<tr><td><code translate="no">distance</code> o puntuación</td><td>Puntuación o distancia entre la lista de incrustaciones de la consulta y la lista de incrustaciones almacenada.</td><td>Puntuación o distancia entre el vector de consulta y el vector del elemento Struct coincidente.</td></tr>
<tr><td><code translate="no">offset</code></td><td>No aplicable.</td><td>Posición, contada a partir de cero, del elemento Struct coincidente cuando se devuelve.</td></tr>
<tr><td>Claves primarias repetidas</td><td>No es de esperar en una sola consulta, ya que los resultados son a nivel de entidad.</td><td>Es posible, ya que pueden coincidir varios elementos Struct de la misma entidad.</td></tr>
<tr><td>Campos de salida solicitados de StructArray</td><td>Devueltos desde la entidad coincidente.</td><td>Se devuelven con la forma de coincidencia a nivel de elemento que admiten la API y el SDK de destino.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Errores comunes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Utilizar « <code translate="no">chunks.emb</code> » en lugar de la sintaxis de ruta de subcampo requerida « <code translate="no">chunks[emb]</code> ».</p></li>
<li><p>Utilizar una consulta EmbeddingList en un subcampo vectorial indexado con una métrica vectorial normal.</p></li>
<li><p>Utilizar una consulta vectorial normal en un subcampo vectorial indexado con una métrica de « <code translate="no">MAX_SIM*</code> ».</p></li>
<li><p>Esperar que la búsqueda a nivel de elemento <code translate="no">limit</code> devuelva ese número de entidades principales únicas. Devuelve coincidencias de elementos.</p></li>
<li><p>Esperar que la búsqueda de EmbeddingList devuelva un desplazamiento de elemento específico. Devuelve coincidencias a nivel de entidad.</p></li>
<li><p>Reutilizar un mismo subcampo vectorial para ambos modos de búsqueda. Utilice subcampos vectoriales independientes, ya que cada subcampo vectorial solo admite un índice.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos pasos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Para restringir la búsqueda a nivel de elemento mediante condiciones escalares, consulta <a href="/docs/es/filtered-search-with-structarray.md">«Búsqueda filtrada con StructArray</a>».</p></li>
<li><p>Para realizar búsquedas por puntuación o límites de distancia, consulta <a href="/docs/es/range-search-with-structarray.md">«Búsqueda por rango con StructArray</a>».</p></li>
<li><p>Para devolver como máximo un resultado por entidad principal tras una búsqueda a nivel de elemento, consulta <a href="/docs/es/grouping-search-with-structarray.md">«Búsqueda agrupada con StructArray</a>».</p></li>
<li><p>Para combinar la búsqueda con StructArray con otras búsquedas vectoriales, consulta <a href="/docs/es/hybrid-search-with-structarray.md">«Búsqueda híbrida con StructArray</a>».</p></li>
<li><p>Para consultar los tipos de datos, métricas, filtros y límites específicos de cada versión compatibles, consulta <a href="/docs/es/structarray-limits.md">«Límites de StructArray</a>».</p></li>
</ol>
