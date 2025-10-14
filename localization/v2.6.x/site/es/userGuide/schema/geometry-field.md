---
id: geometry-field.md
title: Campo GeometríaCompatible with Milvus 2.6.4+
summary: >-
  Cuando se crean aplicaciones como Sistemas de Información Geográfica (SIG),
  herramientas cartográficas o servicios basados en la localización, a menudo es
  necesario almacenar y consultar datos geométricos. El tipo de datos GEOMETRY
  de Milvus resuelve este problema proporcionando una forma nativa de almacenar
  y consultar datos geométricos flexibles.
beta: Milvus 2.6.4+
---
<h1 id="Geometry-Field" class="common-anchor-header">Campo Geometría<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Geometry-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Cuando se crean aplicaciones como Sistemas de Información Geográfica (SIG), herramientas cartográficas o servicios basados en la localización, a menudo es necesario almacenar y consultar datos geométricos. El tipo de datos <code translate="no">GEOMETRY</code> en Milvus resuelve este desafío proporcionando una forma nativa de almacenar y consultar datos geométricos flexibles.</p>
<p>Utilice un campo GEOMETRY cuando necesite combinar la similitud vectorial con restricciones espaciales, por ejemplo:</p>
<ul>
<li><p>Location-Base Service (LBS): "encontrar puntos de interés similares <strong>en</strong> esta manzana".</p></li>
<li><p>Búsqueda multimodal: "recuperar fotos similares <strong>en un radio de 1 km</strong> de este punto"</p></li>
<li><p>Mapas y logística: "activos <strong>dentro de</strong> una región" o "rutas <strong>que se cruzan</strong> en un camino"</p></li>
</ul>
<h2 id="What-is-a-GEOMETRY-field" class="common-anchor-header">¿Qué es un campo GEOMETRÍA?<button data-href="#What-is-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Un campo GEOMETRÍA es un tipo de datos definido por esquema (<code translate="no">DataType.GEOMETRY</code>) en Milvus que almacena datos geométricos. Cuando se trabaja con campos geométricos, se interactúa con los datos utilizando el formato <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">Well-Known Text (WKT)</a>, una representación legible por humanos que se utiliza tanto para insertar datos como para realizar consultas. Internamente, Milvus convierte WKT a <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry#Well-known_binary">Well-Known Binary (WKB)</a> para un almacenamiento y procesamiento eficientes, pero no es necesario manejar WKB directamente.</p>
<p>El tipo de datos <code translate="no">GEOMETRY</code> admite los siguientes objetos geométricos:</p>
<ul>
<li><p><strong>PUNTO</strong>: <code translate="no">POINT (x y)</code>; por ejemplo, <code translate="no">POINT (13.403683 52.520711)</code> donde <code translate="no">x</code> = longitud y <code translate="no">y</code> = latitud</p></li>
<li><p><strong>LINEA</strong>: <code translate="no">LINESTRING (x1 y1, x2 y2, …)</code>; por ejemplo, <code translate="no">LINESTRING (13.40 52.52, 13.41 52.51)</code></p></li>
<li><p><strong>POLÍGONO</strong>: <code translate="no">POLYGON ((x1 y1, x2 y2, x3 y3, x1 y1))</code>; por ejemplo, <code translate="no">POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOINT</strong>: <code translate="no">MULTIPOINT ((x1 y1), (x2 y2), …)</code>; por ejemplo <code translate="no">MULTIPOINT ((10 40), (40 30), (20 20), (30 10))</code></p></li>
<li><p><strong>MULTILINESTRING</strong>: <code translate="no">MULTILINESTRING ((x1 y1, …), (xk yk, …))</code>, por ejemplo <code translate="no">MULTILINESTRING ((10 10, 20 20, 10 40), (40 40, 30 30, 40 20, 30 10))</code></p></li>
<li><p><strong>MULTIPOLYGON</strong>: <code translate="no">MULTIPOLYGON (((outer ring ...)), ((outer ring ...)))</code>, por ejemplo, <code translate="no">MULTIPOLYGON (((30 20, 45 40, 10 40, 30 20)), ((15 5, 40 10, 10 20, 5 10, 15 5)))</code></p></li>
<li><p><strong>GEOMETRYCOLLECTION</strong>: <code translate="no">GEOMETRYCOLLECTION(POINT(x y), LINESTRING(x1 y1, x2 y2), ...)</code>, por ejemplo, <code translate="no">GEOMETRYCOLLECTION (POINT (40 10), LINESTRING (10 10, 20 20, 10 40), POLYGON ((40 40, 20 45, 45 30, 40 40)))</code></p></li>
</ul>
<h2 id="Basic-operations" class="common-anchor-header">Operaciones básicas<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>El flujo de trabajo para utilizar un campo <code translate="no">GEOMETRY</code> implica definirlo en el esquema de la colección, insertar datos geométricos y, a continuación, consultar los datos utilizando expresiones de filtro específicas.</p>
<h3 id="Step-1-Define-a-GEOMETRY-field" class="common-anchor-header">Paso 1: Definir un campo GEOMETRÍA<button data-href="#Step-1-Define-a-GEOMETRY-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Para utilizar un campo <code translate="no">GEOMETRY</code>, defínalo explícitamente en el esquema de la colección al crearla. El siguiente ejemplo muestra cómo crear una colección con un campo <code translate="no">geo</code> de tipo <code translate="no">DataType.GEOMETRY</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np

dim = <span class="hljs-number">8</span>
collection_name = <span class="hljs-string">&quot;geo_collection&quot;</span>
milvus_client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create schema with a GEOMETRY field</span>
schema = milvus_client.create_schema(enable_dynamic_field=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embeddings&quot;</span>, DataType.FLOAT_VECTOR, dim=dim)
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;geo&quot;</span>, DataType.GEOMETRY, nullable=<span class="hljs-literal">True</span>)</span>
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">128</span>)

milvus_client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>En este ejemplo, el campo <code translate="no">GEOMETRY</code> definido en el esquema de la colección permite valores nulos con <code translate="no">nullable=True</code>. Para obtener más información, consulte <a href="/docs/es/nullable-and-default.md">Nullable &amp; Default</a>.</p>
</div>
<h3 id="Step-2-Insert-data" class="common-anchor-header">Paso 2: Insertar datos<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Inserte entidades con datos geométricos en formato <a href="https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry">WKT</a>. He aquí un ejemplo con varios puntos geográficos:</p>
<pre><code translate="no" class="language-python">rng = np.random.default_rng(seed=<span class="hljs-number">19530</span>)
geo_points = [
    <span class="hljs-string">&#x27;POINT(13.399710 52.518010)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.403934 52.522877)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.405088 52.521124)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408223 52.516876)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.400092 52.521507)&#x27;</span>,
    <span class="hljs-string">&#x27;POINT(13.408529 52.519274)&#x27;</span>,
]

rows = [
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop A&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">0</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop B&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">1</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop C&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">2</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop D&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">3</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop E&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">4</span>]},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Shop F&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>: rng.random((<span class="hljs-number">1</span>, dim))[<span class="hljs-number">0</span>], <span class="hljs-string">&quot;geo&quot;</span>: geo_points[<span class="hljs-number">5</span>]},
]

insert_result = milvus_client.insert(collection_name, rows)
<span class="hljs-built_in">print</span>(insert_result)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">Paso 3: Operaciones de filtrado<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de poder realizar operaciones de filtrado en los campos de <code translate="no">GEOMETRY</code>, asegúrese de:</p>
<ul>
<li><p>Has creado un índice en cada campo vectorial.</p></li>
<li><p>La colección está cargada en memoria.</p></li>
</ul>
<p><details></p>
<p><summary>Mostrar código</summary></p>
<pre><code translate="no" class="language-python">index_params = milvus_client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;embeddings&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

milvus_client.create_index(collection_name, index_params)
milvus_client.load_collection(collection_name)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Una vez cumplidos estos requisitos, puedes utilizar expresiones con operadores geométricos dedicados para filtrar tu colección en función de los valores geométricos.</p>
<h4 id="Define-filter-expressions" class="common-anchor-header">Definir expresiones de filtrado</h4><p>Para filtrar en el campo <code translate="no">GEOMETRY</code>, utilice un operador específico de geometría con el siguiente formato de expresión: <code translate="no">&quot;{operator}(geo_field,'{wkt}')&quot;</code>, donde:</p>
<ul>
<li><p><code translate="no">{operator}</code> es un operador geométrico compatible (por ejemplo, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_INTERSECTS</code>). Para obtener una lista completa de los operadores disponibles, consulte <a href="https://zilliverse.feishu.cn/wiki/SOgiwzPxpisy8MkhtuecZqFbnaf">Operadores de geometría</a>.</p></li>
<li><p><code translate="no">geo_field</code> es el nombre del campo <code translate="no">GEOMETRY</code> definido en el esquema de su colección.</p></li>
<li><p><code translate="no">'{wkt}'</code> es la cadena WKT que representa el objeto geométrico sobre el que se está filtrando.</p></li>
</ul>
<div class="alert note">
<p>Algunos operadores, como <code translate="no">ST_DWITHIN</code>, pueden requerir parámetros adicionales. Para obtener detalles y ejemplos de uso de cada operador, consulte <a href="https://zilliverse.feishu.cn/wiki/SOgiwzPxpisy8MkhtuecZqFbnaf">Operadores de geometría</a>.</p>
</div>
<p>Los siguientes ejemplos muestran cómo utilizar distintos operadores específicos de geometría en una expresión de filtro:</p>
<h4 id="Example-1-Find-entities-within-a-rectangular-area" class="common-anchor-header">Ejemplo 1: Buscar entidades dentro de un área rectangular</h4><pre><code translate="no" class="language-python">top_left_lon, top_left_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
bottom_right_lon, bottom_right_lat = <span class="hljs-number">13.455868</span>, <span class="hljs-number">52.495862</span>
bounding_box_wkt = <span class="hljs-string">f&quot;POLYGON((<span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{top_left_lat}</span>, <span class="hljs-subst">{bottom_right_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{bottom_right_lat}</span>, <span class="hljs-subst">{top_left_lon}</span> <span class="hljs-subst">{top_left_lat}</span>))&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_within(geo, &#x27;<span class="hljs-subst">{bounding_box_wkt}</span>&#x27;)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Find-entities-within-1km-of-a-central-point" class="common-anchor-header">Ejemplo 2: Buscar entidades en un radio de 1 km de un punto central</h4><pre><code translate="no" class="language-python">center_point_lon, center_point_lat = <span class="hljs-number">13.403683</span>, <span class="hljs-number">52.520711</span>
radius_meters = <span class="hljs-number">1000.0</span>
central_point_wkt = <span class="hljs-string">f&quot;POINT(<span class="hljs-subst">{center_point_lon}</span> <span class="hljs-subst">{center_point_lat}</span>)&quot;</span>

query_results = milvus_client.query(
    collection_name,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_dwithin(geo, &#x27;<span class="hljs-subst">{central_point_wkt}</span>&#x27;, <span class="hljs-subst">{radius_meters}</span>)&quot;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>]
)
<span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> query_results:
    <span class="hljs-built_in">print</span>(ret)
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-3-Combine-vector-similarity-with-a-spatial-filter" class="common-anchor-header">Ejemplo 3: Combinar la similitud vectorial con un filtro espacial</h4><pre><code translate="no" class="language-python">vectors_to_search = rng.random((<span class="hljs-number">1</span>, dim))
result = milvus_client.search(
    collection_name,
    vectors_to_search,
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;name&quot;</span>, <span class="hljs-string">&quot;geo&quot;</span>],
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;st_within(geo, &#x27;<span class="hljs-subst">{bounding_box_wkt}</span>&#x27;)&quot;</span></span>
)
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> result:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;hit: <span class="hljs-subst">{hit}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-Accelerate-queries" class="common-anchor-header">A continuación: Acelerar las consultas<button data-href="#Next-Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Por defecto, las consultas en los campos <code translate="no">GEOMETRY</code> sin un índice realizarán un escaneo completo de todas las filas, lo que puede ser lento en grandes conjuntos de datos. Para acelerar las consultas geométricas, cree un índice <code translate="no">RTREE</code> en su campo GEOMETRÍA.</p>
<p>Para más información, consulte <a href="https://zilliverse.feishu.cn/wiki/RlY2wylVQiZswikT0G2cBHVznTf">RTREE</a>.</p>
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
    </button></h2><h3 id="If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="common-anchor-header">Si he activado la función de campo dinámico para mi colección, ¿puedo insertar datos geométricos en una clave de campo dinámico?<button data-href="#If-Ive-enabled-the-dynamic-field-feature-for-my-collection-can-I-insert-geometric-data-into-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>No, no se pueden insertar datos geométricos en un campo dinámico. Antes de insertar datos geométricos, asegúrese de que el campo <code translate="no">GEOMETRY</code> se ha definido explícitamente en el esquema de su colección.</p>
<h3 id="Does-the-GEOMETRY-field-support-the-mmap-feature" class="common-anchor-header">¿Es compatible el campo GEOMETRY con la función mmap?<button data-href="#Does-the-GEOMETRY-field-support-the-mmap-feature" class="anchor-icon" translate="no">
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
    </button></h3><p>Sí, el campo <code translate="no">GEOMETRY</code> es compatible con mmap. Para obtener más información, consulte <a href="https://zilliverse.feishu.cn/wiki/P3wrwSMNNihy8Vkf9p6cTsWYnTb">Utilización de mmap</a>.</p>
<h3 id="Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="common-anchor-header">¿Puedo definir el campo GEOMETRY como anulable o establecer un valor por defecto?<button data-href="#Can-I-define-the-GEOMETRY-field-as-nullable-or-set-a-default-value" class="anchor-icon" translate="no">
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
    </button></h3><p>Sí, el campo GEOMETRY admite el atributo <code translate="no">nullable</code> y un valor por defecto en formato WKT. Para más información, consulte <a href="/docs/es/nullable-and-default.md">Nullable &amp; Default</a>.</p>
