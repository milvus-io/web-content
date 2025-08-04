---
id: tune_consistency.md
title: Nivel de consistencia
summary: >-
  Como base de datos vectorial distribuida, Milvus ofrece múltiples niveles de
  consistencia para asegurar que cada nodo o réplica pueda acceder a los mismos
  datos durante las operaciones de lectura y escritura. Actualmente, los niveles
  de consistencia soportados incluyen Strong, Bounded, Eventually y Session,
  siendo Bounded el nivel de consistencia utilizado por defecto.
---
<h1 id="Consistency-Level" class="common-anchor-header">Nivel de consistencia<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h1><p>Como base de datos vectorial distribuida, Milvus ofrece múltiples niveles de consistencia para asegurar que cada nodo o réplica pueda acceder a los mismos datos durante las operaciones de lectura y escritura. Actualmente, los niveles de consistencia soportados incluyen <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> y <strong>Session</strong>, siendo <strong>Bounded</strong> el nivel de consistencia utilizado por defecto.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus es un sistema que separa el almacenamiento y la computación. En este sistema, <strong>los DataNodes</strong> son responsables de la persistencia de los datos y, en última instancia, los almacenan en un almacenamiento de objetos distribuido como MinIO/S3. <strong>Los QueryNodes</strong> se encargan de tareas computacionales como la búsqueda. Estas tareas implican el procesamiento tanto de <strong>datos por lotes</strong> como de <strong>datos en flujo</strong>. En pocas palabras, los datos por lotes pueden entenderse como datos que ya se han almacenado en el almacenamiento de objetos, mientras que los datos de flujo se refieren a datos que aún no se han almacenado en el almacenamiento de objetos. Debido a la latencia de la red, los QueryNodes a menudo no contienen los datos de flujo más recientes. Sin salvaguardas adicionales, realizar una búsqueda directamente en los datos de flujo puede resultar en la pérdida de muchos puntos de datos no comprometidos, afectando a la precisión de los resultados de la búsqueda.</p>
<p>Milvus Commercial Edition es un sistema que separa el almacenamiento y el cálculo. En este sistema, los DataNodes son responsables de la persistencia de los datos y, en última instancia, los almacenan en un almacenamiento de objetos distribuido como MinIO/S3. Los QueryNodes se encargan de tareas computacionales como la búsqueda. Estas tareas implican el procesamiento tanto de datos por lotes como de datos en flujo. En pocas palabras, los datos por lotes pueden entenderse como datos que ya se han almacenado en el almacenamiento de objetos, mientras que los datos de flujo se refieren a datos que aún no se han almacenado en el almacenamiento de objetos. Debido a la latencia de la red, los QueryNodes a menudo no contienen los datos de flujo más recientes. Sin salvaguardas adicionales, realizar una búsqueda directamente en los datos de flujo puede provocar la pérdida de muchos puntos de datos no comprometidos, lo que afectaría a la precisión de los resultados de la búsqueda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/batch-data-and-streaming-data.png" alt="Batch Data And Streaming Data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Datos por lotes y datos en flujo</span> </span></p>
<p>Como se muestra en la figura anterior, los QueryNodes pueden recibir simultáneamente datos de flujo y datos por lotes tras recibir una solicitud de búsqueda. Sin embargo, debido a la latencia de la red, los datos de flujo obtenidos por los QueryNodes pueden estar incompletos.</p>
<p>Para solucionar este problema, Milvus marca el tiempo de cada registro en la cola de datos e inserta continuamente marcas de tiempo de sincronización en la cola de datos. Cada vez que se recibe una marca de tiempo de sincronización (syncTs), QueryNodes la establece como la Hora de Servicio, lo que significa que QueryNodes puede ver todos los datos anteriores a esa Hora de Servicio. Basándose en el ServiceTime, Milvus puede proporcionar marcas de tiempo de garantía (GuaranteeTs) para satisfacer los diferentes requisitos de los usuarios en cuanto a consistencia y disponibilidad. Los usuarios pueden informar a los nodos de consulta de la necesidad de incluir datos anteriores a un momento determinado en el ámbito de la búsqueda especificando las GuaranteeT en sus solicitudes de búsqueda.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/service-time-and-guarantee-time.png" alt="Service Time And Guarantee Time" class="doc-image" id="service-time-and-guarantee-time" />
   </span> <span class="img-wrapper"> <span>Tiempo de servicio y tiempo de garantía</span> </span></p>
<p>Como se muestra en la figura anterior, si GuaranteeTs es inferior a ServiceTime, significa que todos los datos anteriores al momento especificado se han escrito completamente en el disco, lo que permite a los QueryNodes realizar inmediatamente la operación de búsqueda. Cuando GuaranteeTs es mayor que ServiceTime, los QueryNodes deben esperar hasta que ServiceTime supere a GuaranteeTs antes de poder ejecutar la operación de búsqueda.</p>
<p>Los usuarios deben buscar un equilibrio entre la precisión y la latencia de la consulta. Si los usuarios tienen altos requisitos de consistencia y no son sensibles a la latencia de la consulta, pueden establecer GuaranteeTs a un valor tan grande como sea posible; si los usuarios desean recibir resultados de búsqueda rápidamente y son más tolerantes a la precisión de la consulta, entonces GuaranteeTs se puede establecer a un valor más pequeño.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/consistency-level-illustrated.png" alt="Consistency Level Illustrated" class="doc-image" id="consistency-level-illustrated" />
   </span> <span class="img-wrapper"> <span>Nivel de consistencia ilustrado</span> </span></p>
<p>Milvus proporciona cuatro tipos de niveles de consistencia con diferentes GuaranteeTs.</p>
<ul>
<li><p><strong>Fuerte</strong></p>
<p>La última marca de tiempo se utiliza como GuaranteeTs, y los QueryNodes tienen que esperar hasta que el ServiceTime cumpla con los GuaranteeTs antes de ejecutar las peticiones de búsqueda.</p></li>
<li><p><strong>Eventual</strong></p>
<p>El GuaranteeTs se establece en un valor extremadamente pequeño, como 1, para evitar comprobaciones de consistencia y que los QueryNodes puedan ejecutar inmediatamente peticiones de búsqueda sobre todos los datos del lote.</p></li>
<li><p><strong>Estancamiento limitado</strong></p>
<p>El GuranteeTs se establece en un punto de tiempo anterior a la última marca de tiempo para hacer que los QueryNodes realicen búsquedas con una tolerancia de cierta pérdida de datos.</p></li>
<li><p><strong>Sesión</strong></p>
<p>El último punto temporal en el que el cliente inserta datos se utiliza como el GuaranteeTs para que los QueryNodes puedan realizar búsquedas sobre todos los datos insertados por el cliente.</p></li>
</ul>
<p>Milvus utiliza Bounded Staleness como nivel de consistencia por defecto. Si no se especifica el GuaranteeTs, se utiliza el último ServiceTime como GuaranteeTs.</p>
<h2 id="Set-Consistency-Level" class="common-anchor-header">Establecer nivel de consistencia<button data-href="#Set-Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede establecer diferentes niveles de consistencia al crear una colección, así como al realizar búsquedas y consultas.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection" class="common-anchor-header">Establecer nivel de coherencia al crear una colección</h3><p>Al crear una colección, puede establecer el nivel de coherencia para las búsquedas y consultas dentro de la colección. El siguiente ejemplo de código establece el nivel de consistencia en <strong>Fuerte</strong>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
<span class="highlighted-wrapper-line">        .consistencyLevel(ConsistencyLevel.STRONG)</span>
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isClusteringKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>

<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Los valores posibles para el parámetro <code translate="no">consistency_level</code> son <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> y <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search" class="common-anchor-header">Establecer el nivel de consistencia en la búsqueda</h3><p>Siempre puede cambiar el nivel de consistencia para una búsqueda específica. El siguiente ejemplo de código vuelve a establecer el nivel de consistencia en <strong>Limitado</strong>. El cambio sólo se aplica a la solicitud de búsqueda actual.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .searchParams(params)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClBounded).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;limit&quot;: 3,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Este parámetro también está disponible en las búsquedas híbridas y en el iterador de búsqueda. Los valores posibles para el parámetro <code translate="no">consistency_level</code> son <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, y <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query" class="common-anchor-header">Establecer el nivel de consistencia en la consulta</h3><p>Siempre puede cambiar el nivel de consistencia para una búsqueda específica. El siguiente ejemplo de código establece el nivel de consistencia en <strong>Eventualmente</strong>. El ajuste sólo se aplica a la solicitud de consulta actual.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],
    limit=<span class="hljs-number">3</span>，
<span class="highlighted-comment-line">    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,</span>
<span class="highlighted-wrapper-line">)</span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))
        .limit(<span class="hljs-number">3</span>)
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)
        .build();
        
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;my_collection&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).
    WithLimit(<span class="hljs-number">3</span>).
    WithConsistencyLevel(entity.ClEventually))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;color like \&quot;red_%\&quot;&quot;,
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Este parámetro también está disponible en el iterador de consultas. Los valores posibles para el parámetro <code translate="no">consistency_level</code> son <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, y <code translate="no">Session</code>.</p>
