---
id: use-async-milvus-client-with-asyncio.md
summary: >-
  O AsyncMilvusClient é um MilvusClient assíncrono que oferece uma API baseada
  em corrotinas para acesso não bloqueante ao Milvus via asyncio. Neste artigo,
  irá conhecer o processo de chamada das APIs que o AsyncMilvusClient fornece e
  os aspectos a que deve prestar atenção.
title: Sistema de resposta a perguntas
---
<h1 id="Tutorial-Use-AsyncMilvusClient-with-asyncio​" class="common-anchor-header">Tutorial: Usar AsyncMilvusClient com asyncio<button data-href="#Tutorial-Use-AsyncMilvusClient-with-asyncio​" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>O AsyncMilvusClient</strong> é um MilvusClient assíncrono que oferece uma API baseada em corrotinas para acesso não bloqueante ao Milvus via <a href="https://docs.python.org/3/library/asyncio.html">asyncio</a>. Neste artigo, ficará a conhecer o processo de chamada das APIs que o AsyncMilvusClient fornece e os aspectos a que deve prestar atenção.</p>
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
    </button></h2><p>Asyncio é uma biblioteca para escrever código concorrente usando a sintaxe <strong>async/await</strong> e serve como base para o cliente assíncrono de alto desempenho do Milvus, que se encaixará na sua biblioteca de código executada sobre o asyncio.</p>
<p>Os métodos que o AsyncMilvusClient fornece têm conjuntos de parâmetros e comportamentos idênticos aos do MilvusClient. A única diferença está na forma como são chamados. A tabela a seguir lista os métodos disponíveis no AsyncMilvusClient.</p>
<table data-block-token="AmGWdYXaCoByJcxxpgzcoYSjnNf"><thead><tr><th data-block-token="GZbYdgPAio7eBxxEbPlc1kJkn9e" colspan="3" rowspan="1"><p data-block-token="DU3WdeUs2owNHkxXd3HcHrb3npe">**<strong>Cliente</strong></p>
</th></tr></thead><tbody><tr><td data-block-token="ZjAddjzbuoCklzx3mmUc0Dnmn0d" colspan="1" rowspan="1"><p data-block-token="JeePdGlYxoQcIIx8ayfcAmkFnHh"><code translate="no">`close()`</code></p>
</td><td data-block-token="JkDHd7rfcoPAEuxisyBcKSrgnCf" colspan="1" rowspan="1"><p data-block-token="PII3dwAJdo0a40xGJVjcuL6anNf"></p>
</td><td data-block-token="SeINdpcGxoWVGQxzpync265fn6I" colspan="1" rowspan="1"><p data-block-token="AaltdQ77BoREKixVliCctZmJnJh"></p>
</td></tr><tr><td data-block-token="RrQxdSQlZonGBDxjGMPcOJ6bnBd" colspan="3" rowspan="1"><p data-block-token="FtZVdDFPLo13VYxJnRFcGIUmnkg">**<strong>Coleção e partição</strong></p>
</td></tr><tr><td data-block-token="XbaRdSsXzoR2G1xbGGYc1hH8n4b" colspan="1" rowspan="1"><p data-block-token="OLxLdEtSToewHlxf1KncPl6uncf"><code translate="no">`create_collection()`</code></p>
</td><td data-block-token="Z5OxdePrOo8VSkx53KMcz9w1nsg" colspan="1" rowspan="1"><p data-block-token="XFTRd8VEeo2i94x3BVvcoemGnOg"><code translate="no">`drop_collection()`</code></p>
</td><td data-block-token="Nw1kd6178oNWPNxxvMCcCvOhnpe" colspan="1" rowspan="1"><p data-block-token="WL22dPVKLoeAS0xQm2Iceksintc"><code translate="no">`create_partition()`</code></p>
</td></tr><tr><td data-block-token="MpDBdoG1Fow5JJxV5c5c7gtrnOc" colspan="1" rowspan="1"><p data-block-token="A3eUdKub8oXwp3xwwmncShhvnzg"><code translate="no">`drop_partition()`</code></p>
</td><td data-block-token="WlSOdmrtto3ig3xOnbacdjKznbv" colspan="1" rowspan="1"><p data-block-token="BkkEdI83eoflxkxMJ4qckUzIngb"></p>
</td><td data-block-token="I8FOddE1Ro1ghhxP3LacLS6hn9e" colspan="1" rowspan="1"><p data-block-token="SVpidqiI7o81PZx7yD9cPE36nre"></p>
</td></tr><tr><td data-block-token="TVWjdOxjBoc4EmxAzZxcRGmxnyt" colspan="3" rowspan="1"><p data-block-token="F3B1d3MIBoPuarxE0i8cJyMvn0d">**<strong>Índice</strong></p>
</td></tr><tr><td data-block-token="WsNvdM3pOoyiKnxiyEPcTYUvn8b" colspan="1" rowspan="1"><p data-block-token="Fcx4dfhJeoDu1JxZynvcrHokn6d"><code translate="no">`create_index()`</code></p>
</td><td data-block-token="SC0zdZ47GoBautxjbabcRbl1ncb" colspan="1" rowspan="1"><p data-block-token="CNfUdy6paojcNwxn7cMcKVljn3b"><code translate="no">`drop_index()`</code></p>
</td><td data-block-token="ZhGIdmHFRo0hyFx3Fjrc9op3n4e" colspan="1" rowspan="1"><p data-block-token="TfC1dMUo0oaNvKxHt1CcG6iSnJc"><code translate="no">`load_collection()`</code></p>
</td></tr><tr><td data-block-token="Uwa8dBg07ohd6mxjQOscCDZen5g" colspan="1" rowspan="1"><p data-block-token="E9FcdTOa1oJpIVxgAswcaWNInOh"><code translate="no">`release_collection()`</code></p>
</td><td data-block-token="X6thdNsAnoHwWbxERWqcdjUtnqh" colspan="1" rowspan="1"><p data-block-token="PtQ1dYjTLocFdrxrWNkclEnYnFi"><code translate="no">`load_partitions()`</code></p>
</td><td data-block-token="WeRkdxm1eodWWbx6eSpcvQUNn5b" colspan="1" rowspan="1"><p data-block-token="TyaLdoyHaosjAux4g0LcM6YUnAf"><code translate="no">`release_partitions()`</code></p>
</td></tr><tr><td data-block-token="VA6IdtVgWorBylxn0bLcGTJxnof" colspan="3" rowspan="1"><p data-block-token="NCuldtuz1ougMbx0g0LchQJynWd"><strong>**Vetor**</strong></p>
</td></tr><tr><td data-block-token="GSiLdOmmLoj25OxLJSPcviRGnag" colspan="1" rowspan="1"><p data-block-token="TFTIdKQG2oMv5oxeflGcczbInxd"><code translate="no">`insert()`</code></p>
</td><td data-block-token="PCEHdmmB0od4yexgNEVc4vQznOe" colspan="1" rowspan="1"><p data-block-token="Ms4Nd2zRkoT3arxON9ncJRI6nQf"><code translate="no">`upsert()`</code></p>
</td><td data-block-token="LJTOd8Xg1ot97HxAwQ1cJoi2nYe" colspan="1" rowspan="1"><p data-block-token="SMzddgkAJo0etNx5PxVcWQeSnNb"><code translate="no">`delete()`</code></p>
</td></tr><tr><td data-block-token="RM7Yd67daodZ2Zx1ZyccDwjZn1g" colspan="1" rowspan="1"><p data-block-token="MM6pddY3Lo3ntkxeZIOcKXlDn5d"><code translate="no">`search()`</code></p>
</td><td data-block-token="P9GLd0lyBoWjLyxOJ8ccXWnlnHe" colspan="1" rowspan="1"><p data-block-token="LOTPdBJ4wo2lAgxnqrXcSTOunmh"><code translate="no">`query()`</code></p>
</td><td data-block-token="Sl7jddi4OoxyV9xSGgJcQ7dBnpr" colspan="1" rowspan="1"><p data-block-token="XmSodCDkNoyF76x33EFctf80nyb"><code translate="no">`hybrid_search()`</code></p>
</td></tr><tr><td data-block-token="Yd4gdN5mooupZExoLOccNnvon5e" colspan="1" rowspan="1"><p data-block-token="L1KHdF5lHoppBpxNUmrcp2JWnO6"><code translate="no">`get()`</code></p>
</td><td data-block-token="AnTkddRRLo0lC8xDi1dcUMh6nhl" colspan="1" rowspan="1"><p data-block-token="XXNjdPdcFoDnd8xIyw0cdjLLn1f"></p>
</td><td data-block-token="HeWvd9Bqlo7kVyxIgmZcljXcnHb" colspan="1" rowspan="1"><p data-block-token="QBfhdolleoZF3rxoTzEcPhNanjd"></p>
</td></tr></tbody></table>
<p>Se ainda precisar da versão assíncrona de qualquer outro método MilvusClient, pode submeter um pedido de funcionalidade no repositório <a href="https://github.com/milvus-io/pymilvus">pymilvus</a>. Contribuições de código também são bem-vindas.</p>
<h2 id="Create-an-event-loop​" class="common-anchor-header">Criar um ciclo de eventos<button data-href="#Create-an-event-loop​" class="anchor-icon" translate="no">
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
    </button></h2><p>As aplicações que usam asyncio normalmente usam o loop de eventos como orquestrador para gerenciar tarefas assíncronas e operações de E/S. Neste tutorial, vamos obter um loop de eventos do asyncio e usá-lo como orquestrador.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio​
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np​
<span class="hljs-keyword">from</span> scipy.<span class="hljs-property">sparse</span> <span class="hljs-keyword">import</span> csr_matrix​
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">AsyncMilvusClient</span>, <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">AnnSearchRequest</span>​
​
loop = asyncio.<span class="hljs-title function_">get_event_loop</span>()​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-with-AsyncMilvusClient​" class="common-anchor-header">Conectar com AsyncMilvusClient<button data-href="#Connect-with-AsyncMilvusClient​" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo a seguir demonstra como conectar o Milvus de forma assíncrona.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Connect to Milvus server using AsyncMilvusClient​</span>
async_client = AsyncMilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-schema​" class="common-anchor-header">Criar esquema<button data-href="#Create-schema​" class="anchor-icon" translate="no">
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
    </button></h2><p>Atualmente, o <code translate="no">create_schema()</code> não está disponível no AsyncMilvusClient. Em vez disso, utilizaremos o MilvusClient para criar o esquema para a coleção.</p>
<pre><code translate="no" class="language-python">schema = async_client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    description=<span class="hljs-string">&quot;This is a sample schema&quot;</span>,​
)​
​
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(<span class="hljs-string">&quot;dense_vector&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​
schema.add_field(<span class="hljs-string">&quot;sparse_vector&quot;</span>, DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>O AsyncMilvusClient chama o método <code translate="no">create_schema()</code> de forma síncrona; por conseguinte, não é necessário orquestrar a chamada utilizando o ciclo de eventos.</p>
</div>
<h2 id="Create-collection​" class="common-anchor-header">Criar coleção<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Agora vamos utilizar o esquema para criar uma coleção. Note que é necessário colocar a palavra-chave <code translate="no">await</code> como prefixo em qualquer chamada aos métodos <code translate="no">AsyncMilvusClient</code> e colocar a chamada dentro de uma função <code translate="no">async</code> da seguinte forma.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_my_collection</span>(<span class="hljs-params">collection_name, schema</span>):​
    <span class="hljs-keyword">if</span> (client.has_collection(collection_name)):​
        <span class="hljs-keyword">await</span> async_client.drop_collection(collection_name)​
​
    <span class="hljs-keyword">await</span> async_client.create_collection(​
        collection_name=collection_name,​
        schema=schema​
    )​
​
    <span class="hljs-keyword">if</span> (client.has_collection(collection_name)):​
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Collection created successfully&quot;</span>)​
    <span class="hljs-keyword">else</span>:​
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Failed to create collection&quot;</span>)​
        ​
<span class="hljs-comment"># Call the above function asynchronously ​</span>
loop.run_until_complete(create_my_collection(<span class="hljs-string">&quot;my_collection&quot;</span>, schema))​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># Collection created successfully​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-index​" class="common-anchor-header">Criar índice<button data-href="#Create-index​" class="anchor-icon" translate="no">
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
    </button></h2><p>Também é necessário criar índices para todos os campos vectoriais e campos escalares opcionais. De acordo com o esquema definido acima, existem dois campos vectoriais na coleção, pelo que deve criar índices para eles da seguinte forma.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">create_indexes</span>(<span class="hljs-params">collection_name</span>):​
    index_params = client.prepare_index_params()​
​
    index_params.add_index(field_name=<span class="hljs-string">&quot;dense_vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)​
    index_params.add_index(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;IP&quot;</span>)​
    index_params.add_index(field_name=<span class="hljs-string">&quot;text&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>)​
​
    <span class="hljs-keyword">await</span> async_client.create_index(collection_name, index_params)​
​
<span class="hljs-comment"># Call the above function asynchronously ​</span>
loop.run_until_complete(create_indexes(<span class="hljs-string">&quot;my_collection&quot;</span>))​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Load-collection​" class="common-anchor-header">Carregar coleção<button data-href="#Load-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma coleção pode ser carregada depois de os campos necessários estarem indexados. O código seguinte demonstra como carregar a coleção de forma assíncrona.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">load_my_collection</span>(<span class="hljs-params">collection_name</span>):​
    <span class="hljs-keyword">await</span> async_client.load_collection(collection_name)​
    <span class="hljs-built_in">print</span>(client.get_load_state(collection_name))​
    ​
<span class="hljs-comment"># Call the above function asynchronously ​</span>
loop.run_until_complete(load_my_collection(<span class="hljs-string">&quot;my_collection&quot;</span>))​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {&#x27;state&#x27;: &lt;LoadState: Loaded&gt;}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">Inserir dados<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>Pode utilizar os modelos de incorporação disponíveis no pymilvus para gerar incorporação de vectores para os seus textos. Para obter detalhes, consulte <a href="https://milvus.io/docs/embeddings.md">Visão geral da incorporação</a>. Nesta secção, iremos inserir dados gerados aleatoriamente na coleção.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_sample_data</span>(<span class="hljs-params">collection_name</span>):​
    <span class="hljs-comment"># Randomly generated data will be used here​</span>
    rng = np.random.default_rng(<span class="hljs-number">42</span>)​
​
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_random_text</span>(<span class="hljs-params">length</span>):​
        seed = <span class="hljs-string">&quot;this is a seed paragraph to generate random text, which is used for testing purposes. Specifically, a random text is generated by randomly selecting words from this sentence.&quot;</span>​
        words = seed.split()​
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(rng.choice(words, length))​
    ​
    data = [{​
        <span class="hljs-string">&#x27;id&#x27;</span>: i, ​
        <span class="hljs-string">&#x27;dense_vector&#x27;</span>: rng.random(<span class="hljs-number">5</span>).tolist(), ​
        <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: csr_matrix(rng.random(<span class="hljs-number">5</span>)), ​
        <span class="hljs-string">&#x27;text&#x27;</span>: generate_random_text(<span class="hljs-number">10</span>)​
    } <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>)]​
​
    res = <span class="hljs-keyword">await</span> async_client.insert(collection_name, data)​
​
    <span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Call the above function asynchronously ​</span>
loop.run_until_complete(insert_sample_data(<span class="hljs-string">&quot;my_collection&quot;</span>))​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># {&#x27;insert_count&#x27;: 10000, &#x27;ids&#x27;: [0, 1, 2, 3, ..., 9999]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Query​" class="common-anchor-header">Consulta<button data-href="#Query​" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de a coleção ser carregada e preenchida com dados, pode efetuar pesquisas e consultas na mesma. Nesta secção, vai encontrar o número de entidades no campo <code translate="no">text</code> que começa com a palavra <code translate="no">random</code> na coleção denominada <code translate="no">my_collection</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">query_my_collection</span>(<span class="hljs-params">collection_name</span>):​
    <span class="hljs-comment"># Find the number of entities with the `text` fields starting with the word &quot;random&quot; in the `my_collection` collection.​</span>
​
    res = <span class="hljs-keyword">await</span> async_client.query(​
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
        <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;text like &quot;%random%&quot;&#x27;</span>,​
        output_fields=[<span class="hljs-string">&quot;count(*)&quot;</span>]​
    )​
​
    <span class="hljs-built_in">print</span>(res) ​
    ​
<span class="hljs-comment"># Call the above function asynchronously   ​</span>
loop.run_until_complete(query_my_collection(<span class="hljs-string">&quot;my_collection&quot;</span>))​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment">#​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;count(*)&#x27;: 6802}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Search​" class="common-anchor-header">Pesquisa<button data-href="#Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Nesta secção, irá efetuar pesquisas vectoriais nos campos vectoriais densos e esparsos da coleção de destino.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">conduct_vector_search</span>(<span class="hljs-params">collection_name, <span class="hljs-built_in">type</span>, field</span>):​
    <span class="hljs-comment"># Generate a set of three random query vectors​</span>
    query_vectors = []​
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span> == <span class="hljs-string">&quot;dense&quot;</span>:​
        query_vectors = [ rng.random(<span class="hljs-number">5</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ]​
    ​
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span> == <span class="hljs-string">&quot;sparse&quot;</span>:​
        query_vectors = [ csr_matrix(rng.random(<span class="hljs-number">5</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ]​
​
    <span class="hljs-built_in">print</span>(query_vectors)​
​
    res = <span class="hljs-keyword">await</span> async_client.search(​
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
        data=query_vectors,​
        anns_field=field,​
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>, field]​
    )​
​
    <span class="hljs-built_in">print</span>(res)​
    ​
<span class="hljs-comment"># To search against the dense vector field asynchronously ​</span>
loop.run_until_complete(conduct_vector_search(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;dense&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>))​
​
<span class="hljs-comment"># To search against the sparse vector field asynchronously ​</span>
loop.run_until_complete(conduct_vector_search(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>))​

<button class="copy-code-btn"></button></code></pre>
<p>A saída da pesquisa deve listar três conjuntos de resultados correspondentes aos vectores de consulta especificados.</p>
<h2 id="Hybrid-Search​" class="common-anchor-header">Pesquisa híbrida<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma pesquisa híbrida combina os resultados de várias pesquisas e reordena-os para obter uma melhor recuperação. Nesta secção, vai realizar uma pesquisa híbrida utilizando os campos de vectores densos e esparsos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">conduct_hybrid_search</span>(<span class="hljs-params">collection_name</span>):​
    req_dense = AnnSearchRequest(​
        data=[ rng.random(<span class="hljs-number">5</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ],​
        anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,​
        param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},​
        limit=<span class="hljs-number">10</span>​
    )​
​
    req_sparse = AnnSearchRequest(​
        data=[ csr_matrix(rng.random(<span class="hljs-number">5</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3</span>) ],​
        anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,​
        param={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},​
        limit=<span class="hljs-number">10</span>​
    )​
​
    reqs = [req_dense, req_sparse]​
​
    ranker = RRFRanker()​
​
    res = <span class="hljs-keyword">await</span> async_client.hybrid_search(​
        collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
        reqs=reqs,​
        ranker=ranker,​
        output_fields=[<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;dense_vector&quot;</span>, <span class="hljs-string">&quot;sparse_vector&quot;</span>]​
    )​
​
    <span class="hljs-built_in">print</span>(res)​
    ​
<span class="hljs-comment"># Call the above function asynchronously  ​</span>
loop.run_until_complete(conduct_hybrid_search(<span class="hljs-string">&quot;my_collection&quot;</span>))​

<button class="copy-code-btn"></button></code></pre>
<p></p>
