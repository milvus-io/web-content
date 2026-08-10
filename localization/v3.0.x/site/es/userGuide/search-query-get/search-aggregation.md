---
id: search-aggregation.md
title: Agregación de búsquedasCompatible with Milvus 3.0.x
summary: >-
  Agrupar los resultados de la búsqueda vectorial en grupos, calcular las
  métricas de cada grupo, ordenar los grupos y devolver resultados
  representativos.
beta: Milvus 3.0.x
---
<h1 id="Search-Aggregation" class="common-anchor-header">Agregación de búsquedas<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>Cuando un comprador busca «zapatillas de running negras para el entrenamiento diario», la búsqueda por vecino más cercano aproximado (ANN) clasifica los productos según la similitud vectorial y devuelve una lista plana de los Top-K. Los resultados pueden ser relevantes, pero repetitivos: en el ejemplo siguiente, cuatro de los seis primeros resultados son productos de la marca A, mientras que la marca B y la marca C aparecen una vez cada una.</p>
<p>Una lista plana no puede proporcionar directamente un resumen organizado por categorías. Es posible que una aplicación necesite comparar marcas según el número de candidatos retenidos o el precio medio, examinar un pequeño número de productos representativos de cada marca u organizar los resultados en varios niveles de categorías.</p>
<p>La agregación de búsquedas organiza los candidatos ANN seleccionados en grupos en función de campos escalares seleccionados. En este ejemplo, cada marca se convierte en un grupo independiente. Milvus puede calcular estadísticas para cada grupo, ordenar los grupos y asociarles productos representativos. La aplicación consume esta respuesta «por grupos primero» a través de <code translate="no">result.agg_buckets</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-overview.png" alt="A flat running-shoe search result becomes a set of comparable brand buckets" class="doc-image" id="a-flat-running-shoe-search-result-becomes-a-set-of-comparable-brand-buckets" /> 
   <span>Un resultado plano de búsqueda de zapatillas de correr se convierte en un conjunto de grupos de marcas comparables</span>
  
 </span></p>
<p>La agregación de búsqueda no realiza una agregación exacta de toda la colección. La existencia de los grupos, los recuentos, las métricas, el orden y los resultados representativos dependen de los candidatos retenidos por la red neuronal artificial (ANN) y de las etapas de agrupación.</p>
<h2 id="How-it-works" class="common-anchor-header">Cómo funciona<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
  
   <img translate="no" src="/docs/v3.0.x/assets/search-aggregation-bucketing.png" alt="ANN candidates grouped by bucket keys and returned with counts, metrics, and representative hits" class="doc-image" id="ann-candidates-grouped-by-bucket-keys-and-returned-with-counts,-metrics,-and-representative-hits" /> 
   <span>Candidatos de la ANN agrupados por claves de grupo y devueltos con recuentos, métricas y resultados representativos</span>
  
 </span></p>
<ol>
<li><p><strong>Recuperación de candidatos.</strong> Milvus ejecuta una búsqueda ANN para encontrar las entidades más cercanas al vector de consulta. A continuación, la etapa de agrupación retiene un número limitado de candidatos para cada clave compuesta completa. Este presupuesto de candidatos por clave es el mayor <code translate="no">TopHits.size</code> en cualquier parte del árbol de agregación, o <code translate="no">1</code> cuando ningún nivel configura <code translate="no">top_hits</code>.</p></li>
<li><p><strong>Creación de cubos.</strong> <code translate="no">SearchAggregation.fields</code> define la clave del cubo. Cada combinación única de valores de campo crea una clave independiente. En la figura, <code translate="no">fields=[&quot;brand&quot;]</code> crea las claves de cubo <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> y <code translate="no">(Brand C)</code>. Los candidatos retenidos con la misma clave pertenecen al mismo cubo y contribuyen a su <code translate="no">count</code>. <code translate="no">SearchAggregation.size</code> limita el número de cubos que devuelve Milvus.</p></li>
<li><p><strong>Calcular y devolver los resultados.</strong> Cada bucket devuelto contiene su clave y el recuento de candidatos retenidos. Milvus también puede calcular métricas configuradas, ordenar los buckets, devolver entidades representativas y crear buckets secundarios. Cada <code translate="no">AggregationBucket</code> en <code translate="no">result.agg_buckets</code> expone <code translate="no">key</code>, <code translate="no">count</code>, <code translate="no">metrics</code>, <code translate="no">hits</code> y <code translate="no">sub_groups</code>. Cuando la agregación de búsqueda está habilitada, la lista habitual de resultados de búsqueda está vacía.</p></li>
</ol>
<p>En el diagrama, <code translate="no">TopHits.size=4</code> proporciona un presupuesto de candidatos por clave de cuatro, por lo que los cuatro candidatos retenidos de la Marca A generan <code translate="no">count: 4</code>. La ficha completa de la Marca A muestra solo dos de los cuatro resultados representativos devueltos para que la figura resulte más compacta.</p>
<p>Con « <code translate="no">sub_aggregation</code> », Milvus repite los pasos 2 y 3 dentro de cada grupo principal. Los cambios en la recuperación de la red neuronal artificial (ANN) o en el presupuesto de candidatos por clave pueden modificar el número de grupos, las métricas, el orden, los resultados y los resultados anidados.</p>
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
    </button></h2><p>Antes de utilizar la agregación de búsqueda, ten en cuenta los siguientes límites:</p>
<ul>
<li><p><strong>Agregaciones anidadas:</strong> una solicitud puede contener una « <code translate="no">SearchAggregation</code> » raíz y hasta tres niveles anidados de « <code translate="no">sub_aggregation</code> », con un máximo de cuatro niveles en total. En todos los niveles, se pueden utilizar como máximo 10 campos para crear claves de grupo.</p></li>
<li><p><strong>Campos utilizados para crear claves de bucket:</strong> « <code translate="no">SearchAggregation.fields</code> » admite campos booleanos, enteros, « <code translate="no">VARCHAR</code> » y « <code translate="no">TIMESTAMPTZ</code> ». No admite campos « <code translate="no">FLOAT</code> », « <code translate="no">DOUBLE</code> », « <code translate="no">ARRAY</code> », « <code translate="no">JSON</code> », « <code translate="no">GEOMETRY</code> », « <code translate="no">TEXT</code> », vectoriales ni dinámicos.</p></li>
<li><p><strong>Campos métricos:</strong> <code translate="no">count</code> admite <code translate="no">&quot;*&quot;</code> o cualquier campo que no sea de tipo<code translate="no">JSON</code> ni dinámico, y omite los valores de <code translate="no">NULL</code> cuando se especifica un campo. <code translate="no">sum</code> y <code translate="no">avg</code> admiten campos de tipo entero y de coma flotante. <code translate="no">min</code> y <code translate="no">max</code> admiten además campos de tipo cadena y <code translate="no">TIMESTAMPTZ</code>.</p></li>
<li><p><strong>Campos de ordenación de «Top Hits»:</strong> « <code translate="no">TopHits.sort</code> » admite campos comparables de tipo booleano, entero, de coma flotante, cadena y « <code translate="no">TIMESTAMPTZ</code> », además de « <code translate="no">_score</code> ». No admite « <code translate="no">ARRAY</code> », « <code translate="no">JSON</code> », « <code translate="no">GEOMETRY</code> », ni campos vectoriales o dinámicos.</p></li>
<li><p><strong>Presupuesto de candidatos:</strong> El mayor valor de « <code translate="no">TopHits.size</code> » en cualquier parte del árbol de agregación es también el número de candidatos retenidos por cada clave compuesta completa. Si ningún nivel configura « <code translate="no">top_hits</code> », Milvus retiene un candidato por clave. El « <code translate="no">count</code> » del bucket y las métricas se calculan a partir de estos candidatos retenidos, por lo que cambiar « <code translate="no">TopHits.size</code> » puede modificarlos.</p></li>
<li><p><strong>Campos de bucket nulos:</strong> un valor « <code translate="no">NULL</code> » forma su propia clave de bucket. Para excluir el bucket nulo, añade un filtro como « <code translate="no">brand is not null</code> » a la solicitud de búsqueda.</p></li>
<li><p><strong>Campos repetidos:</strong> un mismo campo no puede aparecer en más de una lista de « <code translate="no">SearchAggregation.fields</code> ». Por ejemplo, si la agregación raíz utiliza <code translate="no">fields=[&quot;category&quot;]</code>, una agregación anidada <code translate="no">sub_aggregation</code> no puede utilizar también <code translate="no">fields=[&quot;category&quot;]</code>.</p></li>
<li><p><strong>Combinaciones no admitidas:</strong> La agregación de búsqueda no se puede combinar con un ` <code translate="no">offset</code>` distinto de cero, iteradores de búsqueda, búsqueda híbrida, un resaltador o búsqueda por agrupación. Un valor de nivel superior de ` <code translate="no">offset</code> ` igual a ` <code translate="no">0</code> ` equivale a omitir el parámetro. En las solicitudes de búsqueda de REST v2, no se pueden especificar conjuntamente ` <code translate="no">searchAggregation</code> ` y ` <code translate="no">ids</code> `.</p></li>
<li><p><strong>Entradas devueltas:</strong> Por defecto, Milvus rechaza una solicitud de «Search Aggregation» cuando el número máximo calculado de entradas de resultado de la solicitud supera las 10 000. Este umbral se controla mediante <code translate="no">proxy.maxSearchAggregationResultEntries</code>. Establezca el valor de configuración en <code translate="no">0</code> o en un número negativo para desactivar esta comprobación.</p>
<p>Milvus calcula este máximo de la siguiente manera:</p>
<p><code translate="no">number of query vectors × product of the effective search_size at every aggregation level × largest TopHits.size at any level</code></p>
<p>Para este cálculo del lado del servidor, el valor efectivo de « <code translate="no">search_size</code> » en un nivel es el valor de « <code translate="no">search_size</code> » configurado explícitamente, o el valor de « <code translate="no">size</code> » de ese nivel cuando se omite « <code translate="no">search_size</code> ». La API de PyMilvus utilizada en esta guía no expone actualmente « <code translate="no">search_size</code> », por lo que las solicitudes de PyMilvus utilizan el valor de « <code translate="no">size</code> » de cada nivel para este cálculo. Utiliza <code translate="no">1</code> como último factor cuando ningún nivel configure <code translate="no">TopHits</code>. Por ejemplo, un vector de consulta, 10 buckets raíz, cinco buckets secundarios por cada bucket raíz y dos aciertos por cada bucket secundario dan como resultado un máximo calculado de:</p>
<p><code translate="no">1 × 10 × 5 × 2 = 100</code></p></li>
</ul>
<h2 id="Use-Search-Aggregation" class="common-anchor-header">Utilizar la agregación de búsqueda<button data-href="#Use-Search-Aggregation" class="anchor-icon" translate="no">
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
    </button></h2><p>Elige un ejemplo en función de lo que quieras conseguir:</p>
<table>
<thead>
<tr><th>Vaya a</th><th>Descripción</th><th>Configuración clave</th></tr>
</thead>
<tbody>
<tr><td><a href="#Compare-and-sort-buckets">Comparar y ordenar buckets</a></td><td>Calcula estadísticas por bucket para compararlos y, a continuación, ordena los buckets obtenidos por métricas, recuentos o claves.</td><td><code translate="no">fields</code>, <code translate="no">size</code>, <code translate="no">metrics</code>, <code translate="no">order</code></td></tr>
<tr><td><a href="#Show-representative-results-from-each-bucket">Mostrar resultados representativos de cada bucket</a></td><td>Devuelve un número limitado de entidades de cada bucket y ordena dichas entidades de forma independiente por campos escalares o puntuación vectorial.</td><td><code translate="no">top_hits</code>, <code translate="no">TopHits.size</code>, <code translate="no">TopHits.sort</code></td></tr>
<tr><td><a href="#Group-results-at-multiple-levels">Agrupar los resultados en varios niveles</a></td><td>Organiza los resultados en niveles de grupos principales y secundarios para analizar varias dimensiones de forma secuencial.</td><td><code translate="no">sub_aggregation</code></td></tr>
</tbody>
</table>
<p>Los ejemplos que se muestran a continuación utilizan una colección de productos con campos de marca, categoría, color, precio y valoración. Todos los nombres de marcas, nombres de productos, precios, valoraciones y resultados de búsqueda son datos de ejemplo sintéticos. Expande la siguiente sección para crear la colección y definir las variables de búsqueda compartidas.</p>
<p><details></p>
<p><summary>Configurar la colección de ejemplo</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient, SearchAggregation, TopHits

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

collection_name = <span class="hljs-string">&quot;product_search_aggregation&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(<span class="hljs-string">&quot;embedding&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(<span class="hljs-string">&quot;name&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">200</span>)
schema.add_field(<span class="hljs-string">&quot;brand&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;category&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">100</span>)
schema.add_field(<span class="hljs-string">&quot;color&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">50</span>)
schema.add_field(<span class="hljs-string">&quot;price&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;rating&quot;</span>, DataType.DOUBLE)
schema.add_field(<span class="hljs-string">&quot;in_stock&quot;</span>, DataType.BOOL)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_collection(
    collection_name=collection_name,
    schema=schema,
    index_params=index_params,
    <span class="hljs-comment"># Make preceding writes visible to searches from this client.</span>
    consistency_level=<span class="hljs-string">&quot;Session&quot;</span>,
)

client.insert(
    collection_name=collection_name,
    data=[
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.12</span>, <span class="hljs-number">0.42</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.66</span>, <span class="hljs-number">0.31</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">129.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.7</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.10</span>, <span class="hljs-number">0.39</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.61</span>, <span class="hljs-number">0.29</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Trail A2&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">139.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.6</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.14</span>, <span class="hljs-number">0.44</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.68</span>, <span class="hljs-number">0.33</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.16</span>, <span class="hljs-number">0.41</span>, <span class="hljs-number">0.22</span>, <span class="hljs-number">0.62</span>, <span class="hljs-number">0.30</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner C1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand C&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">119.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.4</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">False</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.48</span>, <span class="hljs-number">0.20</span>, <span class="hljs-number">0.59</span>, <span class="hljs-number">0.15</span>, <span class="hljs-number">0.71</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket A1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.5</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.45</span>, <span class="hljs-number">0.18</span>, <span class="hljs-number">0.55</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.69</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Jacket B1&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand B&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;jackets&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">89.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.3</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.09</span>, <span class="hljs-number">0.38</span>, <span class="hljs-number">0.17</span>, <span class="hljs-number">0.60</span>, <span class="hljs-number">0.27</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A3&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">159.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.8</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
        {
            <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.13</span>, <span class="hljs-number">0.43</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.65</span>, <span class="hljs-number">0.32</span>],
            <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;Runner A4&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;Brand A&quot;</span>,
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;running_shoes&quot;</span>,
            <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black&quot;</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.99</span>,
            <span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-number">4.9</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
        },
    ],
)

client.load_collection(collection_name)

query_vector = [<span class="hljs-number">0.11</span>, <span class="hljs-number">0.40</span>, <span class="hljs-number">0.19</span>, <span class="hljs-number">0.64</span>, <span class="hljs-number">0.30</span>]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {},
}
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>La configuración anterior configura <code translate="no">COSINE</code> tanto para el índice vectorial como para los parámetros de búsqueda. Por lo tanto, los ejemplos posteriores utilizan <code translate="no">{&quot;_score&quot;: &quot;desc&quot;}</code> para dar prioridad a una mayor similitud coseno. Para una métrica de distancia como <code translate="no">L2</code>, utilice <code translate="no">{&quot;_score&quot;: &quot;asc&quot;}</code>.</p>
<h3 id="Compare-and-sort-buckets" class="common-anchor-header">Comparar y ordenar grupos<button data-href="#Compare-and-sort-buckets" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilice este patrón cuando necesite comparar grupos de entidades recuperadas utilizando estadísticas calculadas y controlar el orden en el que se devuelven los grupos. En este ejemplo, Milvus agrupa los productos recuperados por <code translate="no">brand</code>, calcula métricas de precio para cada grupo de marcas y ordena los grupos por precio medio.</p>
<p>Si tu objetivo es únicamente mejorar la diversidad de los resultados devolviendo una o más entidades por cada valor de campo, utiliza en su lugar <a href="/docs/es/grouping-search.md">la «Búsqueda por agrupación</a> ».</p>
<p>La siguiente configuración crea hasta tres grupos de marcas, calcula métricas para cada grupo y ordena los grupos por precio medio:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Form one bucket for each distinct brand value.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return up to three buckets at this aggregation level.</span></span>
<span class="highlighted-comment-line">    size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Calculate named metrics for every selected bucket.</span></span>
<span class="highlighted-comment-line">    metrics={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;min_price&quot;</span>: {<span class="hljs-string">&quot;min&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    <span class="hljs-comment"># Sort buckets by average price, highest first.</span></span>
<span class="highlighted-comment-line">    order=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;avg_price&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># If average prices are equal, sort by bucket key in ascending order.</span></span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;_key&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Pasa el objeto al parámetro « <code translate="no">search_aggregation</code> » de « <code translate="no">MilvusClient.search()</code> »:</p>
<pre><code translate="no" class="language-python">result = client.search(
    collection_name=collection_name,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    search_params=search_params,
    output_fields=[
        <span class="hljs-string">&quot;name&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-string">&quot;price&quot;</span>,
        <span class="hljs-string">&quot;rating&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>,
    ],
<span class="highlighted-wrapper-line">    search_aggregation=aggregation,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Cuando se establece « <code translate="no">search_aggregation</code> », PyMilvus no devuelve resultados de entidades ordinarias en « <code translate="no">result[0]</code> ». Lee la respuesta de los grupos en « <code translate="no">result.agg_buckets[0]</code> » en su lugar. El parámetro « <code translate="no">output_fields</code> » controla qué campos escalares aparecen en cada asignación « <code translate="no">AggregationHit.fields</code> » devuelta; Milvus puede seguir utilizando campos de origen de métricas y de ordenación que no figuren en « <code translate="no">output_fields</code> ».</p>
<p><details></p>
<p><summary>Ver el ejemplo de salida del bucket</summary></p>
<p>La siguiente salida se ha capturado a partir de la solicitud anterior y se ha serializado como JSON para facilitar su lectura. PyMilvus devuelve objetos ` <code translate="no">AggregationBucket</code> ` en lugar de JSON. El valor ` <code translate="no">key</code> ` es siempre una lista ordenada de componentes de clave, incluso cuando ` <code translate="no">fields</code> ` contiene solo un campo. Esto conserva el orden de los campos para las claves compuestas.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">[</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand C&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;min_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">119.99</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Para el vector de consulta único de esta guía, lee los buckets de nivel superior devueltos en <code translate="no">result.agg_buckets[0]</code>. Cada bucket expone sus componentes de clave ordenados, el candidato retenido <code translate="no">count</code>, el valor calculado <code translate="no">metrics</code>, el valor representativo <code translate="no">hits</code> y los buckets anidados en <code translate="no">sub_groups</code>.</p>
<p>Lee la configuración de la siguiente manera:</p>
<table>
<thead>
<tr><th>Configuración</th><th>Qué controla</th><th>En este ejemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">fields</code></td><td>Cómo crea Milvus las claves de los buckets</td><td>Crea un depósito para cada valor distinto de « <code translate="no">brand</code> ».</td></tr>
<tr><td><code translate="no">size</code></td><td>Número máximo de buckets devueltos</td><td>Devuelve hasta tres buckets de marca.</td></tr>
<tr><td><code translate="no">metrics</code></td><td>Las estadísticas calculadas para cada bucket</td><td>Calcula el número de productos, el precio medio y el precio mínimo.</td></tr>
<tr><td><code translate="no">order</code></td><td>Cómo ordena Milvus los segmentos devueltos</td><td>Ordena por precio medio y, a continuación, utiliza la clave del grupo para desempatar.</td></tr>
</tbody>
</table>
<p>Milvus ignora <code translate="no">limit</code> cuando se establece <code translate="no">search_aggregation</code>. Utiliza el valor raíz <code translate="no">SearchAggregation.size</code> para controlar el número de grupos de nivel superior.</p>
<p>Con esta configuración, Milvus devuelve los buckets «Marca B», «Marca A» y «Marca C» en orden descendente según el <code translate="no">avg_price</code>. El criterio « <code translate="no">_key</code> » solo se aplica cuando los buckets tienen el mismo precio medio. Dado que esta configuración no define « <code translate="no">top_hits</code> », la lista « <code translate="no">hits</code> » de cada bucket está vacía y el presupuesto candidato por clave es « <code translate="no">1</code> ». Por lo tanto, los recuentos y métricas mostrados describen un candidato retenido por marca. Configura « <code translate="no">top_hits</code> » con un « <code translate="no">TopHits.size</code> » mayor cuando la agregación necesite una ventana de métricas por clave más amplia.</p>
<p><details></p>
<p><summary>Reglas de métricas y ordenación</summary></p>
<p>Cada entrada de <code translate="no">SearchAggregation.metrics</code> asigna un alias definido por el usuario a <code translate="no">{operation: source}</code>:</p>
<table>
<thead>
<tr><th>Fuente</th><th>Operaciones admitidas</th><th>Comportamiento</th></tr>
</thead>
<tbody>
<tr><td>Cualquier campo que no sea «<code translate="no">JSON</code> » ni dinámico</td><td><code translate="no">count</code></td><td>Cuenta los candidatos retenidos cuyo campo de origen no sea « <code translate="no">NULL</code> ».</td></tr>
<tr><td>Campo de tipo entero o de coma flotante</td><td><code translate="no">sum</code>, « <code translate="no">avg</code> », « <code translate="no">min</code> », <code translate="no">max</code></td><td>Realiza el cálculo sobre los valores retenidos no nulos.</td></tr>
<tr><td>Campo de cadena o « <code translate="no">TIMESTAMPTZ</code> »</td><td><code translate="no">min</code>, <code translate="no">max</code></td><td>Selecciona el valor retenido no nulo mínimo o máximo.</td></tr>
<tr><td><code translate="no">&quot;*&quot;</code></td><td><code translate="no">count</code></td><td>Cuenta cada candidato retenido en el bucket. El resultado coincide con <code translate="no">bucket.count</code>.</td></tr>
<tr><td><code translate="no">_score</code></td><td><code translate="no">sum</code>, <code translate="no">avg</code>, <code translate="no">min</code>, <code translate="no">max</code></td><td>Agrega los valores de similitud o distancia ANN de los candidatos retenidos.</td></tr>
</tbody>
</table>
<p><code translate="no">SearchAggregation.order</code> Acepta las siguientes claves:</p>
<table>
<thead>
<tr><th>Clave de orden</th><th>Significado</th></tr>
</thead>
<tbody>
<tr><td>Un alias de métrica</td><td>Ordena según un valor calculado en <code translate="no">metrics</code> al mismo nivel de agregación, como <code translate="no">avg_price</code>.</td></tr>
<tr><td><code translate="no">_count</code></td><td>Ordena según el número de candidatos retenidos en cada compartimento.</td></tr>
<tr><td><code translate="no">_key</code></td><td>Ordena por la clave del bucket en lugar de por un campo de la colección denominado « <code translate="no">_key</code> ».</td></tr>
</tbody>
</table>
<p>Cada entrada de « <code translate="no">order</code> » asigna una clave a « <code translate="no">&quot;asc&quot;</code> » o « <code translate="no">&quot;desc&quot;</code> ». Milvus evalúa varias entradas de la primera a la última. Si se omite « <code translate="no">order</code> », Milvus mantiene el orden de descubrimiento de los buckets del conjunto de candidatos retenidos.</p>
<p>Para ordenar los buckets según la calidad de la coincidencia de vectores, calcula primero una métrica a nivel de bucket a partir de <code translate="no">_score</code> y, a continuación, utiliza el alias de la métrica en <code translate="no">order</code>. No puedes utilizar <code translate="no">_score</code> directamente como clave de ordenación de buckets, ya que cada bucket puede contener varias puntuaciones de entidades. Por ejemplo, con <code translate="no">COSINE</code> o <code translate="no">IP</code>:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
    metrics={<span class="hljs-string">&quot;max_score&quot;</span>: {<span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-string">&quot;_score&quot;</span>}},
    order=[{<span class="hljs-string">&quot;max_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
)
<button class="copy-code-btn"></button></code></pre>
<p>Con <code translate="no">L2</code>, calcula el valor mínimo de <code translate="no">_score</code> y ordena el alias de la métrica en orden ascendente, de modo que los buckets con la distancia más baja aparezcan en primer lugar.</p>
<p></details></p>
<p><details></p>
<p><summary>Crear claves de compartimento compuestas</summary></p>
<p>Para crear una clave de bucket compuesta, introduzca varios nombres de campo en la misma lista:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
<span class="highlighted-comment-line">    <span class="hljs-comment"># Combine brand and color to form a composite bucket key.</span></span>
<span class="highlighted-comment-line">    fields=[<span class="hljs-string">&quot;brand&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],</span>
    size=<span class="hljs-number">6</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Esta configuración puede generar claves como <code translate="no">(Brand A, black)</code>, <code translate="no">(Brand A, blue)</code> y <code translate="no">(Brand B, white)</code>. Dos entidades comparten un compartimento solo cuando ambos valores coinciden. Milvus conserva el orden de la lista, por lo que <code translate="no">brand</code> es el primer componente de la clave y <code translate="no">color</code> es el segundo. Cuando se utiliza <code translate="no">_key</code> en <code translate="no">order</code>, Milvus compara los componentes de la clave compuesta en el mismo orden. Pasa varias cadenas en una lista plana; no se admiten listas anidadas.</p>
<p><code translate="no">size=6</code> es el número máximo de compartimentos compuestos devueltos en este nivel de agregación. Los datos de ejemplo contienen cinco combinaciones distintas de marca y color, por lo que se pueden devolver las cinco. En el <a href="#Limits">límite de entradas devueltas</a>, esta solicitud aporta <code translate="no">1 query vector × 6 buckets × 1 = 6</code> entradas de resultado configuradas.</p>
<p>Varios campos en una lista « <code translate="no">SearchAggregation.fields</code> » crean una clave de compartimento compuesto en ese nivel de agregación. Para crear una jerarquía de compartimentos padre-hijo, utiliza una <a href="#Group-results-at-multiple-levels">agregación anidada</a>.</p>
<p></details></p>
<p>Los ejemplos que siguen redefinen ` <code translate="no">aggregation</code>`. Pase el objeto actualizado al mismo parámetro ` <code translate="no">search_aggregation</code> ` y vuelva a ejecutar la llamada de búsqueda.</p>
<h3 id="Show-representative-results-from-each-bucket" class="common-anchor-header">Mostrar resultados representativos de cada grupo<button data-href="#Show-representative-results-from-each-bucket" class="anchor-icon" translate="no">
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
    </button></h3><p>Incluya entidades representativas cuando la aplicación necesite mostrar productos reales de cada cubo. En este ejemplo, Milvus devuelve hasta dos productos de cada cubo de marca, ordenados por valoración y, a continuación, por puntuación vectorial.</p>
<p>Configura <code translate="no">TopHits</code> de la siguiente manera:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;brand&quot;</span>],
    size=<span class="hljs-number">3</span>,
<span class="highlighted-comment-line">    <span class="hljs-comment"># Return and sort representative entities for each selected bucket.</span></span>
<span class="highlighted-comment-line">    top_hits=TopHits(</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Return up to two entities per bucket.</span></span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-comment"># Apply sort criteria in list order.</span></span>
<span class="highlighted-comment-line">        sort=[</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">            {<span class="hljs-string">&quot;_score&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">        ],</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ver un grupo con resultados representativos</summary></p>
<p>El siguiente grupo de la marca A se ha extraído de la solicitud anterior y se ha serializado como JSON para facilitar su lectura.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.99976646900177</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;black&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner A1&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">129.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.7</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9997048377990723</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand A&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;blue&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Trail A2&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">139.99</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.6</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<table>
<thead>
<tr><th>Parámetro</th><th>Propósito</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">top_hits</code></td><td>Opcional. Configura las entidades representativas para este nivel de agregación. Si se omite, « <code translate="no">bucket.hits</code> » queda vacío y el presupuesto candidato por clave se establece por defecto en uno.</td></tr>
<tr><td><code translate="no">TopHits.size</code></td><td>Devuelve hasta dos entidades representativas de cada grupo seleccionado y establece el presupuesto candidato por clave en dos para todo el árbol de agregación.</td></tr>
<tr><td><code translate="no">TopHits.sort</code></td><td>Ordena las entidades dentro de cada grupo según los criterios indicados.</td></tr>
</tbody>
</table>
<p>Configura « <code translate="no">top_hits</code> » cuando la aplicación necesite entidades representativas o cuando los recuentos y las métricas requieran una ventana de candidatos por clave más amplia. Un valor mayor de « <code translate="no">TopHits.size</code> » aumenta tanto el presupuesto de candidatos como el cálculo del número máximo de entradas devueltas en <a href="#Limits">«Limits</a>».</p>
<p><code translate="no">SearchAggregation.order</code> «sorts buckets», mientras que « <code translate="no">TopHits.sort</code> » ordena las entidades retenidas dentro de cada bucket. El orden de clasificación no cambia qué candidatos se han retenido para « <code translate="no">count</code> » y las métricas. « <code translate="no">TopHits.sort</code> » acepta nombres de campos escalares comparables compatibles y el campo integrado « <code translate="no">_score</code> », que representa la similitud o distancia ANN. Milvus evalúa las entradas de « <code translate="no">sort</code> » de la primera a la última. En este ejemplo, ordena los productos por <code translate="no">rating</code> de mayor a menor y utiliza <code translate="no">_score</code> solo cuando dos valoraciones son iguales. Dado que la configuración utiliza <code translate="no">COSINE</code>, el orden descendente <code translate="no">_score</code> coloca en primer lugar el producto más similar.</p>
<p>Los campos utilizados por <code translate="no">metrics</code> o <code translate="no">TopHits.sort</code> no tienen por qué aparecer en <code translate="no">output_fields</code>. Milvus recupera esos campos internamente, pero solo los campos enumerados explícitamente en <code translate="no">output_fields</code> se incluyen en la asignación <code translate="no">fields</code> de cada resultado devuelto. Las claves primarias y las puntuaciones vectoriales siguen estando disponibles a través de <code translate="no">AggregationHit.pk</code> y <code translate="no">AggregationHit.score</code>.</p>
<p>Cada resultado devuelto <code translate="no">AggregationHit</code> expone su clave primaria en <code translate="no">pk</code>, la puntuación vectorial en <code translate="no">score</code> y los campos de salida solicitados en <code translate="no">fields</code>.</p>
<h3 id="Group-results-at-multiple-levels" class="common-anchor-header">Agrupar resultados en varios niveles<button data-href="#Group-results-at-multiple-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>Utiliza la agregación anidada cuando necesites un nivel de buckets dentro de otro. En este ejemplo, Milvus crea primero los buckets de categoría y, a continuación, crea los buckets de marca dentro de cada categoría.</p>
<p>La agregación secundaria solo recibe las entidades asignadas a su grupo principal. <code translate="no">fields</code> controla la clave del grupo en cada nivel de agregación, mientras que <code translate="no">sub_aggregation</code> crea la jerarquía principal-secundaria.</p>
<p>La configuración siguiente crea un bucket de categoría con la clave <code translate="no">(running_shoes)</code>. Dentro de ese bucket principal, la agregación secundaria crea buckets de marca independientes con claves como <code translate="no">(Brand A)</code>, <code translate="no">(Brand B)</code> y <code translate="no">(Brand C)</code>.</p>
<pre><code translate="no" class="language-text">Parent bucket key:
(running_shoes)

Child bucket keys:
├── (Brand A)
├── (Brand B)
└── (Brand C)
<button class="copy-code-btn"></button></code></pre>
<p>Cada nivel puede utilizar varios campos de forma independiente. Por ejemplo, el uso de <code translate="no">fields=[&quot;brand&quot;, &quot;color&quot;]</code> en la agregación secundaria crearía claves secundarias compuestas como <code translate="no">(Brand A, black)</code>.</p>
<p>La siguiente configuración implementa esta jerarquía:</p>
<pre><code translate="no" class="language-python">aggregation = SearchAggregation(
    fields=[<span class="hljs-string">&quot;category&quot;</span>],
    size=<span class="hljs-number">2</span>,
    metrics={
        <span class="hljs-string">&quot;product_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},
        <span class="hljs-string">&quot;avg_price&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>},
    },
    order=[{<span class="hljs-string">&quot;product_count&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],
<span class="highlighted-comment-line">    <span class="hljs-comment"># For each category bucket, group only its entities by brand.</span></span>
<span class="highlighted-comment-line">    sub_aggregation=SearchAggregation(</span>
<span class="highlighted-comment-line">        fields=[<span class="hljs-string">&quot;brand&quot;</span>],</span>
<span class="highlighted-comment-line">        size=<span class="hljs-number">3</span>,</span>
<span class="highlighted-comment-line">        metrics={</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;brand_count&quot;</span>: {<span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-string">&quot;*&quot;</span>},</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;avg_rating&quot;</span>: {<span class="hljs-string">&quot;avg&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>},</span>
<span class="highlighted-comment-line">        },</span>
<span class="highlighted-comment-line">        order=[{<span class="hljs-string">&quot;avg_rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        top_hits=TopHits(</span>
<span class="highlighted-comment-line">            size=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">            sort=[{<span class="hljs-string">&quot;rating&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>}],</span>
<span class="highlighted-comment-line">        ),</span>
<span class="highlighted-comment-line">    ),</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Ver el resultado de un bucket anidado</summary></p>
<p>El siguiente extracto serializado muestra el bucket principal <code translate="no">running_shoes</code> y su bucket secundario «Brand B». Los buckets secundarios «Brand A» y «Brand C» se omiten por brevedad.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">104</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;avg_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">137.49</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;product_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;field_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">103</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;brand&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;metrics&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;avg_rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;brand_count&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;hits&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;pk&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.9994542598724365</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;fields&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Brand B&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;running_shoes&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;color&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;white&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Runner B1&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">159.99</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;rating&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4.8</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;sub_groups&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>El resultado mostrado representa la ruta del bucket <code translate="no">(running_shoes) → (Brand B)</code>, no una única clave compuesta de bucket <code translate="no">(running_shoes, Brand B)</code>.</p>
<p>Milvus selecciona primero hasta dos buckets de categoría, ordenados por <code translate="no">product_count</code>. A continuación, ejecuta <code translate="no">sub_aggregation</code> de forma independiente dentro de cada categoría seleccionada y devuelve hasta tres buckets de marca, ordenados por <code translate="no">avg_rating</code>.</p>
<p>En la salida anterior:</p>
<ul>
<li>El grupo raíz « <code translate="no">running_shoes</code> » contiene cuatro candidatos retenidos en sus claves compuestas secundarias. Sus « <code translate="no">metrics</code> » contienen los valores de nivel raíz « <code translate="no">avg_price</code> » y « <code translate="no">product_count</code> ».</li>
<li>La lista « <code translate="no">sub_groups</code> » del bucket raíz contiene los buckets de marca secundarios. El bucket «Brand B» que se muestra contiene un candidato retenido y sus propios valores « <code translate="no">avg_rating</code> » y « <code translate="no">brand_count</code> ».</li>
<li>La lista « <code translate="no">hits</code> » del bucket raíz está vacía porque la agregación raíz no configura « <code translate="no">top_hits</code> ». El bucket secundario de la marca B contiene un resultado representativo porque « <code translate="no">top_hits</code> » está configurado en « <code translate="no">sub_aggregation</code> ».</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">Preguntas frecuentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-accurate-are-bucket-counts-and-metrics" class="common-anchor-header">¿Qué grado de precisión tienen los recuentos y las métricas de los buckets?<button data-href="#How-accurate-are-bucket-counts-and-metrics" class="anchor-icon" translate="no">
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
    </button></h3><p>La agregación de búsqueda resume los candidatos de la red neuronal artificial (ANN) retenidos. No ejecuta una agregación de la colección completa.</p>
<p>La retención de candidatos tiene dos etapas de aproximación. La búsqueda ANN puede omitir entidades relevantes de la colección, y la etapa de agrupación retiene, como máximo, los candidatos más grandes <code translate="no">TopHits.size</code> para cada clave compuesta completa. Si ningún nivel configura <code translate="no">top_hits</code>, este límite por clave es uno.</p>
<p>Por ejemplo, supongamos que una colección contiene 5.000 productos de la marca A y que muchos de ellos son relevantes para la consulta vectorial. Si la agregación utiliza ` <code translate="no">TopHits(size=4)</code>`, el compartimento de la marca A puede retener como máximo cuatro candidatos para una clave compuesta completa. Su ` <code translate="no">count</code> ` y sus métricas describen esos candidatos retenidos, no todos los productos relevantes de la marca A ni las 5.000 entidades de la colección.</p>
<p>La aproximación cobra mayor importancia cuando « <code translate="no">order</code> » utiliza un alias de métrica. Los cambios en la recuperación de la búsqueda pueden modificar los valores de las métricas y, por lo tanto, alterar qué buckets se ajustan a « <code translate="no">SearchAggregation.size</code> ». La agregación anidada puede amplificar este efecto, ya que cada nivel secundario opera sobre las entidades disponibles en su bucket principal.</p>
<p>Si necesitas estadísticas exactas sobre cada entidad coincidente, utiliza un flujo de trabajo de agregación de consultas exactas en lugar de la agregación de búsqueda.</p>
<h3 id="How-does-Search-Aggregation-differ-from-Grouping-Search" class="common-anchor-header">¿En qué se diferencia la «Search Aggregation» de la «Grouping Search»?<button data-href="#How-does-Search-Aggregation-differ-from-Grouping-Search" class="anchor-icon" translate="no">
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
    </button></h3><p>Elige en función del formato de resultados principal de la aplicación:</p>
<table>
<thead>
<tr><th>Necesidad principal</th><th>Preferir</th><th>Respuesta a consumir</th></tr>
</thead>
<tbody>
<tr><td>Devuelve una lista de entidades clasificada de forma estándar con menos valores repetidos en un campo de agrupación</td><td><a href="/docs/es/grouping-search.md">Búsqueda por agrupación</a></td><td>Resultados de búsqueda planos para cada vector de consulta</td></tr>
<tr><td>Inspeccionar o comparar grupos como compartimentos, con claves, recuentos, métricas, ordenación, resultados representativos o compartimentos secundarios</td><td>Agregación de búsqueda</td><td><code translate="no">AggregationBucket</code> objetos en <code translate="no">result.agg_buckets</code></td></tr>
</tbody>
</table>
<p>Incluso cuando la agregación de búsqueda configura « <code translate="no">top_hits</code> », su respuesta principal sigue siendo un árbol de compartimentos. La búsqueda por agrupación sigue siendo útil cuando la aplicación ya procesa resultados de búsqueda ordinarios y busca principalmente diversidad en los resultados.</p>
<p>Las API son mutuamente excluyentes. PyMilvus genera un error « <code translate="no">ParamError</code> » cuando se combina « <code translate="no">search_aggregation</code> » con « <code translate="no">group_by_field</code> » o « <code translate="no">group_by_fields</code> » en la misma solicitud.</p>
