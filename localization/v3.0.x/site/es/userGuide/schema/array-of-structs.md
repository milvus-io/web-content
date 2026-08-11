---
id: array-of-structs.md
title: Descripción general de StructArray
summary: >-
  Utiliza StructArray cuando una entidad necesite almacenar una lista ordenada
  de elementos estructurados, como un documento con muchos fragmentos, una
  página con muchos elementos visuales o un vídeo con muchos clips. StructArray
  mantiene estos elementos dentro de la entidad principal, al tiempo que permite
  la búsqueda vectorial y el filtrado escalar en los campos de cada elemento.
---
<h1 id="StructArray-Overview" class="common-anchor-header">Descripción general de StructArray<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Utiliza StructArray cuando una entidad necesite almacenar una lista ordenada de elementos estructurados, como un documento con muchos fragmentos, una página con muchos elementos visuales o un vídeo con muchos clips. StructArray mantiene estos elementos dentro de la entidad principal, al tiempo que permite la búsqueda vectorial y el filtrado escalar en los campos de cada elemento.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">¿Qué es StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Un <strong>StructArray</strong>, también conocido como matriz de estructuras, almacena un conjunto ordenado de elementos Struct en cada entidad. Todos los elementos Struct de la matriz siguen el mismo esquema. Un elemento Struct puede contener subcampos escalares, subcampos vectoriales o ambos.</p>
<p>Por ejemplo, una colección puede almacenar un artículo como entidad y guardar sus fragmentos en un campo StructArray denominado « <code translate="no">chunks</code> ». Cada fragmento puede incluir texto, metadatos de sección, puntuaciones de calidad y una o más incrustaciones vectoriales.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Los dos subcampos vectoriales de este ejemplo representan el mismo fragmento desde dos perspectivas de búsqueda. « <code translate="no">chunks[emb_list_vector]</code> » está pensado para la búsqueda en «EmbeddingList» con métricas de « <code translate="no">MAX_SIM*</code> », mientras que « <code translate="no">chunks[emb]</code> » está pensado para la búsqueda a nivel de elemento con métricas vectoriales habituales, como « <code translate="no">COSINE</code> », « <code translate="no">IP</code> » o « <code translate="no">L2</code> ».</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">Cuándo utilizar StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza StructArray cuando la unidad natural que deseas devolver sea mayor que la unidad natural en la que deseas buscar o filtrar.</p>
<table>
<thead>
<tr><th>Caso de uso</th><th>Por qué resulta útil StructArray</th><th>Campo típico de StructArray</th></tr>
</thead>
<tbody>
<tr><td>Recuperación de documentos</td><td>Almacena un documento como una entidad mientras se realizan búsquedas en sus fragmentos.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Recuperación con interacción tardía</td><td>Almacena un documento o una página como una lista de incrustaciones y evalúala con <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> o <code translate="no">patches[emb]</code></td></tr>
<tr><td>Recuperación a nivel de elemento</td><td>Devuelve el fragmento, clip, parche u observación más relevante, incluyendo su desplazamiento en la matriz.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Filtrado estructurado</td><td>Filtra por subcampos escalares dentro de elementos Struct, como sección, puntuación, página o indicadores.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Reducción de resultados duplicados de elementos principales</td><td>Mantener los elementos hijos bajo la misma entidad principal en lugar de almacenar cada elemento hijo como una fila independiente.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Matriz de decisión<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Utiliza la siguiente matriz para elegir la ruta adecuada de StructArray.</p>
<table>
<thead>
<tr><th>Objetivo</th><th>Ruta recomendada</th><th>Granularidad del resultado</th><th>Empieza aquí</th></tr>
</thead>
<tbody>
<tr><td>Modelar un objeto padre con muchos hijos estructurados.</td><td>Crea un campo StructArray.</td><td>La entidad contiene elementos Struct ordenados.</td><td><a href="/docs/es/create-structarray-field.md">Crear un campo StructArray</a></td></tr>
<tr><td>Inserta registros principales con datos secundarios anidados.</td><td>Insertar entidades cuyo campo StructArray sea una lista de objetos Struct.</td><td>Inserción a nivel de entidad.</td><td><a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos «StructArray»</a></td></tr>
<tr><td>Ejecutar ColBERT, ColPali o la recuperación de interacción tardía a nivel de documento.</td><td>Utilizar la búsqueda EmbeddingList con un índice « <code translate="no">MAX_SIM*</code> ».</td><td>Nivel de entidad.</td><td><a href="/docs/es/search-with-embedding-lists.md">Buscar con listas de incrustación</a></td></tr>
<tr><td>Busca fragmentos, clips o parches individuales.</td><td>Utiliza la búsqueda a nivel de elemento con una métrica vectorial estándar.</td><td>Nivel de elemento de Struct, con desplazamiento cuando esté disponible.</td><td>Búsqueda vectorial básica con StructArray</td></tr>
<tr><td>Restringe la búsqueda vectorial a nivel de elemento a aquellos elementos que cumplan condiciones escalares.</td><td>Utiliza ` <code translate="no">element_filter</code>`.</td><td>Filtrado a nivel de elemento; la forma del resultado depende del tipo de búsqueda.</td><td>Búsqueda filtrada con StructArray</td></tr>
<tr><td>Selecciona entidades en función del número de elementos de Struct que cumplan una condición.</td><td>Utilice <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> o <code translate="no">MATCH_EXACT</code>.</td><td>Nivel de entidad.</td><td><a href="/docs/es/struct-array-operators.md">Operadores de StructArray</a></td></tr>
<tr><td>Utiliza límites de puntuación o distancia en los subcampos vectoriales de StructArray.</td><td>Utilice la búsqueda por rango a nivel de elemento.</td><td>Nivel de elemento de Struct.</td><td>Búsqueda por rango con StructArray</td></tr>
<tr><td>Devuelve como máximo un resultado por entidad principal tras una búsqueda a nivel de elemento.</td><td>Utiliza la búsqueda por agrupación mediante la clave primaria.</td><td>Nivel de entidad tras la agrupación.</td><td>Búsqueda agrupada con StructArray</td></tr>
<tr><td>Combina la búsqueda de elementos de StructArray con otro campo vectorial.</td><td>Utiliza una búsqueda híbrida con una solicitud AnnSearchRequest dirigida a un subcampo vectorial de StructArray.</td><td>Subbúsqueda a nivel de elemento, reordenación a nivel de entidad.</td><td>Búsqueda híbrida con StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Comprender los dos modelos de búsqueda<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### Búsqueda en EmbeddingList La búsqueda en EmbeddingList trata los vectores dentro de un subcampo vectorial de StructArray como una lista de incrustaciones para la entidad principal. La consulta también es una lista de incrustaciones. Milvus compara la lista de incrustaciones de la consulta con la lista de incrustaciones almacenada utilizando una métrica de « <code translate="no">MAX_SIM*</code> » y devuelve las entidades que coinciden. - Datos de la consulta: lista de incrustaciones. - Familia de métricas: « <code translate="no">MAX_SIM*</code> ». - Granularidad del resultado: nivel de entidad. - Ideal para: recuperación de interacción tardía a nivel de documento o de página.</th><th>### Búsqueda a nivel de elemento La búsqueda a nivel de elemento trata cada elemento de Struct como un candidato independiente para la búsqueda vectorial. Cada resultado representa un elemento coincidente dentro del campo StructArray, y los resultados desagrupados pueden mostrar la posición del elemento. - Datos de consulta: vector regular. - Familia de métricas: métricas de vector regular. - Granularidad de los resultados: nivel de elemento de Struct. - Ideal para: recuperación a nivel de fragmento, clip o parche.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Advertencia</p>
<p>Si tu colección necesita tanto la búsqueda en EmbeddingList como la búsqueda a nivel de elemento, utiliza dos subcampos vectoriales independientes. Un campo vectorial o un subcampo vectorial solo admite un índice, y los dos modos de búsqueda requieren familias de métricas diferentes.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Mapa de la documentación<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>La documentación de StructArray se divide en páginas de modelado y páginas de búsqueda. Utiliza las páginas de modelado para definir y preparar los datos. Utiliza las páginas de búsqueda para elegir el comportamiento adecuado de recuperación y filtrado.</p>
<table>
<thead>
<tr><th>Área</th><th>Página</th><th>Úsala para</th></tr>
</thead>
<tbody>
<tr><td>Modelado</td><td><a href="/docs/es/create-structarray-field.md">Crear un campo StructArray</a></td><td>Definir el esquema de la estructura y añadir un campo StructArray.</td></tr>
<tr><td>Modelado</td><td><a href="/docs/es/insert-data-into-structarray-fields.md">Insertar datos en campos StructArray</a></td><td>Prepara e inserta datos anidados en StructArray.</td></tr>
<tr><td>Modelado</td><td><a href="/docs/es/index-structarray-fields.md">Indexar campos de StructArray</a></td><td>Crear índices vectoriales y escalares en los subcampos de StructArray.</td></tr>
<tr><td>Referencia</td><td><a href="/docs/es/structarray-limits.md">Límites de StructArray</a></td><td>Comprueba los límites de esquema, tipo de datos, índice, búsqueda, filtro y versión.</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda vectorial básica con StructArray</td><td>Compara la búsqueda en EmbeddingList con la búsqueda vectorial a nivel de elemento.</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda por rango con StructArray</td><td>Utiliza restricciones de rango con los subcampos vectoriales de StructArray.</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda por agrupación con StructArray</td><td>Agrupa los resultados de la búsqueda a nivel de elemento por clave primaria.</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda híbrida con StructArray</td><td>Combina la búsqueda a nivel de elemento de StructArray con otras búsquedas vectoriales.</td></tr>
<tr><td>Búsqueda</td><td>Búsqueda filtrada con StructArray</td><td>Utiliza los filtros de StructArray en la búsqueda, la consulta y la búsqueda híbrida.</td></tr>
<tr><td>Búsqueda</td><td><a href="/docs/es/search-with-embedding-lists.md">Búsqueda con listas de incrustación</a></td><td>Crea sistemas de recuperación al estilo de ColBERT y ColPali con StructArray.</td></tr>
<tr><td>Filtro</td><td><a href="/docs/es/struct-array-operators.md">Operadores de StructArray</a></td><td>Sintaxis de referencia para los operadores « <code translate="no">element_filter</code> » y « <code translate="no">MATCH_*</code> ».</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Límites clave que hay que comprobar primero<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct se puede utilizar como tipo de elemento de un campo Array. No se utiliza como campo de colección de nivel superior.</p></li>
<li><p>Todos los elementos Struct de un mismo campo StructArray comparten un esquema predefinido.</p></li>
<li><p>Los subcampos de tipo «Vector» requieren índices. La búsqueda en «EmbeddingList» utiliza métricas de « <code translate="no">MAX_SIM*</code> », mientras que la búsqueda a nivel de elemento utiliza métricas vectoriales habituales.</p></li>
<li><p><code translate="no">element_filter</code> y « <code translate="no">MATCH_*</code> » son para subcampos escalares dentro de campos «StructArray». Utiliza « <code translate="no">$[subfield]</code> » únicamente dentro de estos operadores.</p></li>
<li><p>Algunas combinaciones de búsqueda dependen de la versión o son específicas de un modo. Consulta <a href="/docs/es/structarray-limits.md">los límites de StructArray</a> antes de utilizar la búsqueda por rango, la búsqueda por agrupación, la búsqueda híbrida, los campos nulos o los campos añadidos dinámicamente.</p></li>
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
<li><p>Para diseñar un esquema, consulta <a href="/docs/es/create-structarray-field.md">«Crear un campo StructArray</a>».</p></li>
<li><p>Para preparar los datos, consulta <a href="/docs/es/insert-data-into-structarray-fields.md">«Insertar datos en campos StructArray</a>».</p></li>
<li><p>Para elegir índices, consulta <a href="/docs/es/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para buscar en subcampos vectoriales de StructArray, empieza por «Búsqueda vectorial básica con StructArray».</p></li>
<li><p>Para filtrar subcampos escalares de StructArray, consulta <a href="/docs/es/struct-array-operators.md">«Operadores de StructArray</a> » y «Búsqueda filtrada con StructArray».</p></li>
</ol>
