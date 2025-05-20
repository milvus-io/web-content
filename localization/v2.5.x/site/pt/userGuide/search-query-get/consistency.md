---
id: consistency.md
summary: Conheça os quatro níveis de consistência do Milvus.
title: Consistência
---
<h1 id="Consistency-Level​" class="common-anchor-header">Nível de consistência<button data-href="#Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h1><p>Como um banco de dados vetorial distribuído, Milvus oferece vários níveis de consistência para garantir que cada nó ou réplica possa acessar os mesmos dados durante as operações de leitura e escrita. Atualmente, os níveis de consistência suportados incluem <strong>Strong</strong>, <strong>Bounded</strong>, <strong>Eventually</strong> e <strong>Session</strong>, sendo que <strong>Bounded</strong> é o nível de consistência padrão utilizado.</p>
<h2 id="Overview​" class="common-anchor-header">Visão geral<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus é um sistema que separa o armazenamento e a computação. Neste sistema, <strong>os DataNodes</strong> são responsáveis pela persistência dos dados e, em última análise, armazenam-nos no armazenamento de objectos distribuído, como o MinIO/S3. <strong>Os QueryNodes</strong> tratam de tarefas computacionais como a Pesquisa. Estas tarefas envolvem o processamento de <strong>dados em lote</strong> e <strong>de dados em fluxo contínuo</strong>. Em termos simples, os dados em lote podem ser entendidos como dados que já foram armazenados no armazenamento de objectos, enquanto os dados de fluxo contínuo se referem a dados que ainda não foram armazenados no armazenamento de objectos. Devido à latência da rede, os QueryNodes muitas vezes não possuem os dados de streaming mais recentes. Sem salvaguardas adicionais, a execução da Pesquisa diretamente nos dados de fluxo contínuo pode resultar na perda de muitos pontos de dados não confirmados, afectando a precisão dos resultados da pesquisa.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/batch-data-and-streaming-data.png" alt="Batch data and streaming data" class="doc-image" id="batch-data-and-streaming-data" />
   </span> <span class="img-wrapper"> <span>Dados em lote e dados de fluxo contínuo</span> </span></p>
<p>Como mostra a figura acima, os QueryNodes podem receber simultaneamente dados de fluxo contínuo e dados em lote após receberem um pedido de Pesquisa. No entanto, devido à latência da rede, os dados em fluxo contínuo obtidos pelos QueryNodes podem estar incompletos.</p>
<p>Para resolver este problema, o Milvus marca o tempo de cada registo na fila de dados e insere continuamente marcas de tempo de sincronização na fila de dados. Sempre que um carimbo de data/hora de sincronização (syncTs) é recebido, os QueryNodes definem-no como ServiceTime, o que significa que os QueryNodes podem ver todos os dados anteriores a esse ServiceTime. Com base no ServiceTime, o Milvus pode fornecer carimbos de data/hora de garantia (GuaranteeTs) para satisfazer os diferentes requisitos dos utilizadores em termos de consistência e disponibilidade. Os utilizadores podem informar os QueryNodes da necessidade de incluir dados anteriores a um determinado momento no âmbito da pesquisa, especificando GuaranteeTs nos seus pedidos de pesquisa.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/service-time-and-guarantee-time.png" alt="ServiceTime and GuaranteeTs" class="doc-image" id="servicetime-and-guaranteets" />
   </span> <span class="img-wrapper"> <span>ServiceTime e GuaranteeTs</span> </span></p>
<p>Conforme mostrado na figura acima, se GuaranteeTs for menor que ServiceTime, significa que todos os dados anteriores ao ponto de tempo especificado foram totalmente gravados no disco, permitindo que os nós de consulta executem imediatamente a operação de pesquisa. Quando GuaranteeTs é superior a ServiceTime, os QueryNodes têm de esperar até que ServiceTime exceda GuaranteeTs para poderem executar a operação Search.</p>
<p>Os utilizadores precisam de fazer um compromisso entre a precisão da consulta e a latência da consulta. Se os utilizadores tiverem requisitos de consistência elevados e não forem sensíveis à latência da consulta, podem definir GuaranteeTs para um valor tão grande quanto possível; se os utilizadores pretenderem receber resultados de pesquisa rapidamente e forem mais tolerantes à precisão da consulta, então GuaranteeTs pode ser definido para um valor mais pequeno.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/consistency-level-illustrated.png" alt="Consistency Levels Illustrated" class="doc-image" id="consistency-levels-illustrated" />
   </span> <span class="img-wrapper"> <span>Níveis de consistência ilustrados</span> </span></p>
<p>O Milvus fornece quatro tipos de níveis de consistência com diferentes GuaranteeTs.</p>
<ul>
<li><p><strong>Forte</strong></p>
<p>O carimbo de data/hora mais recente é utilizado como GuaranteeTs e os QueryNodes têm de esperar até que o ServiceTime cumpra os GuaranteeTs antes de executarem os pedidos de pesquisa.</p></li>
<li><p><strong>Eventual</strong></p>
<p>O GuaranteeTs é definido para um valor extremamente pequeno, como 1, para evitar verificações de consistência, de modo a que os QueryNodes possam executar imediatamente pedidos de Pesquisa em todos os dados do lote.</p></li>
<li><p><strong>Limitado</strong>(predefinição)</p>
<p>O GuranteeTs é definido para um ponto de tempo anterior ao último carimbo de data/hora para que os QueryNodes executem pesquisas com uma tolerância de determinada perda de dados.</p></li>
<li><p><strong>Sessão</strong></p>
<p>O último ponto temporal em que o cliente insere dados é utilizado como GuaranteeTs para que os QueryNodes possam efetuar pesquisas em todos os dados inseridos pelo cliente.</p></li>
</ul>
<p>O Milvus utiliza o Bounded Staleness como nível de consistência predefinido. Se o GuaranteeTs não for especificado, o ServiceTime mais recente é utilizado como GuaranteeTs.</p>
<h2 id="Set-Consistency-Level​" class="common-anchor-header">Definir o nível de consistência<button data-href="#Set-Consistency-Level​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode definir diferentes níveis de consistência quando cria uma coleção, bem como quando efectua pesquisas e consultas.</p>
<h3 id="Set-Consistency-Level-upon-Creating-Collection​" class="common-anchor-header">Definir o nível de consistência ao criar uma coleção</h3><p>Ao criar uma coleção, pode definir o nível de consistência para as pesquisas e consultas dentro da coleção. O exemplo de código seguinte define o nível de consistência para <strong>Bounded</strong>.</p>
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
<p>Os valores possíveis para o parâmetro <code translate="no">consistency_level</code> são <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, e <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Search​" class="common-anchor-header">Definir o nível de consistência na pesquisa</h3><p>É sempre possível alterar o nível de consistência de uma pesquisa específica. O exemplo de código a seguir define o nível de consistência de volta para Limitado. A alteração se aplica apenas à solicitação de pesquisa atual.</p>
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
<p>Este parâmetro também está disponível em pesquisas híbridas e no iterador de pesquisa. Os valores possíveis para o parâmetro <code translate="no">consistency_level</code> são <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, e <code translate="no">Session</code>.</p>
<h3 id="Set-Consistency-Level-in-Query​" class="common-anchor-header">Definir o nível de consistência na consulta</h3><p>É sempre possível alterar o nível de consistência para uma pesquisa específica. O exemplo de código a seguir define o nível de consistência para <strong>Eventually</strong>. A definição aplica-se apenas ao pedido de consulta atual.</p>
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
<p>Este parâmetro também está disponível no iterador de consulta. Os valores possíveis para o parâmetro <code translate="no">consistency_level</code> são <code translate="no">Strong</code>, <code translate="no">Bounded</code>, <code translate="no">Eventually</code>, e <code translate="no">Session</code>.</p>
