---
id: consistency.md
summary: Узнайте о четырех уровнях согласованности в Milvus.
title: Последовательность
---
<h1 id="Consistency-Level​" class="common-anchor-header">Уровень согласованности<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>Будучи распределенной векторной базой данных, Milvus предлагает несколько уровней согласованности, чтобы гарантировать, что каждый узел или реплика могут получить доступ к одним и тем же данным во время операций чтения и записи. В настоящее время поддерживаются такие уровни согласованности, как <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> и <strong>Session</strong>, при этом по умолчанию используется уровень согласованности <strong>Bounded</strong>.</p>
<h2 id="Overview​" class="common-anchor-header">Обзор<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus - это система, которая разделяет хранение и вычисления. В этой системе <strong>DataNodes</strong> отвечают за сохранение данных и в конечном итоге хранят их в распределенном объектном хранилище, таком как MinIO/S3. <strong>QueryNodes</strong> решают вычислительные задачи, такие как поиск. Эти задачи включают в себя обработку как <strong>пакетных</strong>, так и <strong>потоковых данных</strong>. Проще говоря, под пакетными данными можно понимать данные, которые уже были сохранены в объектном хранилище, а под потоковыми данными - данные, которые еще не были сохранены в объектном хранилище. Из-за сетевых задержек узлы QueryNodes часто не могут хранить самые последние потоковые данные. Без дополнительных мер предосторожности выполнение поиска непосредственно на потоковых данных может привести к потере многих незафиксированных точек данных, что повлияет на точность результатов поиска.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Пакетные данные и потоковые данные</span> </span></p>
<p>Как показано на рисунке выше, после получения запроса на поиск узлы QueryNodes могут одновременно получать как потоковые, так и пакетные данные. Однако из-за сетевой задержки потоковые данные, полученные узлами QueryNodes, могут быть неполными.</p>
<p>Чтобы решить эту проблему, Milvus проставляет временные метки для каждой записи в очереди данных и постоянно вставляет метки синхронизации в очередь данных. При получении временной метки синхронизации (syncTs) QueryNodes устанавливает ее в качестве ServiceTime, что означает, что QueryNodes могут видеть все данные до этого Service Time. Основываясь на ServiceTime, Milvus может предоставлять гарантийные временные метки (GuaranteeTs) для удовлетворения различных требований пользователей к согласованности и доступности. Пользователи могут сообщить узлам QueryNodes о необходимости включить в область поиска данные до определенного момента времени, указав GuaranteeTs в своих поисковых запросах.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>ServiceTime и GuaranteeTs</span> </span></p>
<p>Как показано на рисунке выше, если GuaranteeTs меньше ServiceTime, это означает, что все данные до указанного момента времени были полностью записаны на диск, что позволяет узлам QueryNodes немедленно выполнить операцию поиска. Когда GuaranteeTs больше ServiceTime, узлы QueryNodes должны ждать, пока ServiceTime превысит GuaranteeTs, прежде чем они смогут выполнить операцию Search.</p>
<p>Пользователям необходимо найти компромисс между точностью запроса и его задержкой. Если пользователи предъявляют высокие требования к согласованности и не чувствительны к задержкам запросов, они могут установить GuaranteeTs на максимально возможное значение; если пользователи хотят получать результаты поиска быстро и более терпимы к точности запросов, то GuaranteeTs можно установить на меньшее значение.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>Иллюстрация уровней согласованности</span> </span></p>
<p>Milvus предоставляет четыре типа уровней согласованности с различными GuaranteeTs.</p>
<ul>
<li><p><strong>Сильная</strong></p>
<p>В качестве GuaranteeTs используется последняя временная метка, и узлы запросов должны ждать, пока ServiceTime не достигнет GuaranteeTs, прежде чем выполнять запросы на поиск.</p></li>
<li><p><strong>Eventual</strong></p>
<p>GuaranteeTs устанавливается на очень маленькое значение, например 1, чтобы избежать проверок согласованности, и узлы QueryNodes могут немедленно выполнять запросы поиска по всем пакетным данным.</p></li>
<li><p><strong>Ограниченный</strong>(по умолчанию)</p>
<p>GuranteeTs устанавливается в момент времени, более ранний, чем последняя временная метка, чтобы заставить QueryNodes выполнять поиск с допуском к определенной потере данных.</p></li>
<li><p><strong>Сессия</strong></p>
<p>В качестве GuaranteeTs используется последняя временная точка, в которую клиент вставляет данные, чтобы узлы QueryNodes могли выполнять поиск по всем данным, вставленным клиентом.</p></li>
</ul>
<p>Milvus использует Bounded Staleness в качестве уровня согласованности по умолчанию. Если GuaranteeTs не указан, в качестве GuaranteeTs используется последнее ServiceTime.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">Установка уровня согласованности<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете установить различные уровни согласованности при создании коллекции, а также при выполнении поиска и запросов.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">Установка уровня согласованности при создании коллекции</h3><p>При создании коллекции можно установить уровень согласованности для поиска и запросов внутри коллекции. Следующий пример кода устанавливает уровень согласованности на <strong>Bounded</strong>.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​ <span class="hljs-comment"># Defaults to Bounded if not specified​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .collectionSchema(schema)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isClusteringKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​
​
<span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Возможные значения параметра <code translate="no">consistency_level</code>: <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> и <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">Установка уровня согласованности в поиске</h3><p>Вы всегда можете изменить уровень согласованности для конкретного поиска. Следующий пример кода устанавливает уровень согласованности обратно на Bounded. Изменение применяется только к текущему поисковому запросу.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    data=[query_vector],​
    limit=<span class="hljs-number">3</span>,​
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .data(Collections.singletonList(queryVector))​
        .topK(<span class="hljs-number">3</span>)​
        .searchParams(params)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_collection&quot;,​
    &quot;data&quot;: [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    &quot;limit&quot;: 3,​
    &quot;consistencyLevel&quot;: &quot;Bounded&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Этот параметр также доступен в гибридных поисках и поисковом итераторе. Возможные значения параметра <code translate="no">consistency_level</code>: <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> и <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">Установка уровня согласованности в запросе</h3><p>Вы всегда можете изменить уровень согласованности для конкретного поиска. Следующий пример кода устанавливает уровень согласованности на <strong>Eventually</strong>. Настройка применяется только к текущему запросу.</p>
<div class="multipleCode">
   <a href="#python">python</a> <a href="#java">java</a></div>
<pre><code translate="no" class="language-python">res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>，​
    <span class="hljs-comment"># highlight-start​</span>
    consistency_level=<span class="hljs-string">&quot;Eventually&quot;</span>,​
    <span class="hljs-comment"># highlight-next​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .consistencyLevel(ConsistencyLevel.EVENTUALLY)​
        .build();​
        ​
 <span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​

<button class="copy-code-btn"></button></code></pre>
<p>Этот параметр также доступен в итераторе запроса. Возможные значения параметра <code translate="no">consistency_level</code>: <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code> и <code translate="no">Session</code>.</p>
