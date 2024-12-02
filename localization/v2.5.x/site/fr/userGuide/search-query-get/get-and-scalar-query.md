---
id: get-and-scalar-query.md
summary: >-
  Outre les recherches ANN, Milvus prend également en charge le filtrage des
  métadonnées par le biais de requêtes. Cette page explique comment utiliser
  Query, Get et QueryIterators pour filtrer les métadonnées.
title: Demande de renseignements
---
<h1 id="Query​" class="common-anchor-header">Requête<button data-href="#Query​" class="anchor-icon" translate="no">
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
    </button></h1><p>Outre les recherches ANN, Milvus prend également en charge le filtrage des métadonnées par le biais de requêtes. Cette page explique comment utiliser Query, Get et QueryIterators pour filtrer les métadonnées.</p>
<h2 id="Overview​" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>Une collection peut stocker différents types de champs scalaires. Milvus peut filtrer les entités en fonction d'un ou de plusieurs champs scalaires. Milvus propose trois types de requêtes : Query, Get et QueryIterator. Le tableau ci-dessous compare ces trois types de requêtes.</p>
<table data-block-token="DGeudDgTNo94IUxh4JpcSQuinMe"><thead><tr><th data-block-token="JomTdgqcwoeufXx8zBDcRGJwnXg" colspan="1" rowspan="1"><p data-block-token="QwjYdtBzUoPD7txs3IEc3xTWnIg"></p>
</th><th data-block-token="XjpqdFHvfo4iWOxpBYrcKshZnse" colspan="1" rowspan="1"><p data-block-token="IeTFdFRa4ogyd8x99i4c1fRAnWf">Obtenir</p>
</th><th data-block-token="FTqrdhAPXowYTFxQusCcHMConse" colspan="1" rowspan="1"><p data-block-token="HstgdVh8eoLS4yxt6FWcVObCnte">Requête</p>
</th><th data-block-token="GKPBdkPuSowroJxhQUXcjWzpnyf" colspan="1" rowspan="1"><p data-block-token="K5Ztdh0YfobsHqxIumLcNe6qnkh">QueryIterator</p>
</th></tr></thead><tbody><tr><td data-block-token="LgpCd46wWoj17kxyWWJc7re6nif" colspan="1" rowspan="1"><p data-block-token="X0yldaUHEoYWCBxVX2dcqVCon8c">Scénarios applicables</p>
</td><td data-block-token="Hg3kdotuJoHIEJxAt7ecZULbnhd" colspan="1" rowspan="1"><p data-block-token="U3xtdrQBqoemt6xtM27cXwoEnUc">Pour trouver les entités qui détiennent les clés primaires spécifiées.</p>
<p data-block-token="NEZkdIH0ponBzHxIX2fclJsNnQW"></p>
</td><td data-block-token="ItBjdFLS3o4dtVxelAqc5kycnx7" colspan="1" rowspan="1"><p data-block-token="RNdudJ6wNo4RexxBfSjct1kCnHb">Pour trouver toutes les entités ou un nombre spécifié d'entités qui répondent aux conditions de filtrage personnalisées.</p>
</td><td data-block-token="KWVzd15x5oJsO8xcEUechuM1n5d" colspan="1" rowspan="1"><p data-block-token="IEmzdCnYEoQeH5xnfafcPeITnkh">Pour trouver toutes les entités qui répondent aux conditions de filtrage personnalisées dans les requêtes paginées.</p>
</td></tr><tr><td data-block-token="McafdUcFUoyIlrxw147cL3BQnxf" colspan="1" rowspan="1"><p data-block-token="XajHdq8XToVoaAxsgXxcU1LInmh">Méthode de filtrage</p>
</td><td data-block-token="JNWQd10C8ohTKox2cYUcGdalnrv" colspan="1" rowspan="1"><p data-block-token="XxVhdDCmVogQmXx3zshcy13enQe">Par clés primaires</p>
</td><td data-block-token="PaMId2WSxoiTW8xJ6bAcPJbsntd" colspan="1" rowspan="1"><p data-block-token="Rl3GdtB08oiqFZxhm00cK9l4nh0">Par des expressions de filtrage.</p>
</td><td data-block-token="JktodwnRbo1H9vxZehkcMMf6nMg" colspan="1" rowspan="1"><p data-block-token="R7rrdcMuQo4xKcxm3rMc8jT6nS4">Par expressions de filtrage.</p>
</td></tr><tr><td data-block-token="XHXndNykJo9T24xWY0mcg7Lsn5c" colspan="1" rowspan="1"><p data-block-token="HZGEdb7asoynmWxmHgGcUEiSnSe">Paramètres obligatoires</p>
</td><td data-block-token="RnXDdSiWRoVMLsxKp7ycelbanrc" colspan="1" rowspan="1"><ul data-block-token="VTBwdCwDsoI99TxJDRtcu33YnH0"><li><p>Nom de la collection</p></li>
<li><p>Clés primaires</p></li></ul>
<p data-block-token="B11AdDUZXozgKtx99r5cVG6snOg"></p>
</td><td data-block-token="Xl9zdzNlUodUr1xtimTcMktln4e" colspan="1" rowspan="1"><ul data-block-token="TKZvdWyOuofnedxNWjdcw81Angf"><li><p>Nom de la collection</p></li>
<li><p>Expressions de filtrage</p></li></ul>
</td><td data-block-token="SqwLddWV7oi5mjxR4Xuc0BsGn6f" colspan="1" rowspan="1"><ul data-block-token="YHfLdqkKLo1MAjxAPpFc1NtvnVh"><li><p>Nom de la collection</p></li>
<li><p>Expressions de filtrage</p></li>
<li><p>Nombre d'entités à retourner par requête</p></li></ul>
</td></tr><tr><td data-block-token="M7LQdU83DoDar3xjRIBcYRktncb" colspan="1" rowspan="1"><p data-block-token="RegYdilQZojQ9Fxkk0McxoM9nld">Paramètres facultatifs</p>
</td><td data-block-token="LGpddK4o2oKYYuxBVdKcyZZanQf" colspan="1" rowspan="1"><ul data-block-token="C9AFdJXuro04F0xoRj4cx4UenXb"><li><p>Nom de la partition</p></li>
<li><p>Champs de sortie</p></li></ul>
</td><td data-block-token="GkCydoTh8o5eRBxfnGQc7niInhe" colspan="1" rowspan="1"><ul data-block-token="XD71d6CwJof3LKxtlR2c9ATZnWh"><li><p>Nom de la partition</p></li>
<li><p>Nombre d'entités à retourner</p></li>
<li><p>Champs de sortie</p></li></ul>
</td><td data-block-token="RPnPd40mqoFTRzxapogc2BmunOu" colspan="1" rowspan="1"><ul data-block-token="Lf8fdvZWiot1xhxg6X7cuecmn1c"><li><p>Nom de la partition</p></li>
<li><p>Nombre d'entités à retourner au total</p></li>
<li><p>Champs de sortie</p></li></ul>
</td></tr><tr><td data-block-token="H3ohd3dh5oJNWYx0uOHcQ3DDnmh" colspan="1" rowspan="1"><p data-block-token="VvYJd824VozDaGxi6azcsLQCnre">Renvoi</p>
</td><td data-block-token="HeoXdfD0Voa4U3xXRNFcaxHDnFe" colspan="1" rowspan="1"><p data-block-token="UU4GdhaPEo11xOxHmvJcbaaFnPb">Renvoie les entités qui détiennent les clés primaires spécifiées dans la collection ou la partition spécifiée.</p>
</td><td data-block-token="UtcOd7eiToNUsMxRR3hcwzCFnNe" colspan="1" rowspan="1"><p data-block-token="CWukdkCxfo5P9WxTLkecEETpnAe">Renvoie toutes les entités ou un nombre spécifié d'entités qui répondent aux conditions de filtrage personnalisées dans la collection ou la partition spécifiée.</p>
</td><td data-block-token="VNI6denKyobe8JxUNbRcEL96ncb" colspan="1" rowspan="1"><p data-block-token="GsmPdjuddoZACcxnLPicOyYdnac">Renvoie toutes les entités qui remplissent les conditions de filtrage personnalisées dans la collection ou la partition spécifiée par le biais de requêtes paginées.</p>
</td></tr></tbody></table>
<p>Pour plus d'informations sur le filtrage des métadonnées, reportez-vous à <a href="/docs/fr/boolean.md">Filtrage des métadonnées</a>.</p>
<h2 id="Use-Get​" class="common-anchor-header">Utiliser Obtenir<button data-href="#Use-Get​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous devez rechercher des entités à partir de leurs clés primaires, vous pouvez utiliser la méthode <strong>Get.</strong> Les exemples de code suivants supposent que votre collection comporte trois champs nommés <code translate="no">id</code>, <code translate="no">vector</code> et <code translate="no">color</code> et renvoient les entités avec les clés primaires <code translate="no">1</code>, <code translate="no">2</code> et <code translate="no">3</code>.</p>
<pre><code translate="no" class="language-json">[​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_8682&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7025&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_6781&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, -<span class="hljs-number">0.36981146090600725</span>, -<span class="hljs-number">0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_9298&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4452349528804562</span>, -<span class="hljs-number">0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_4794&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.985825131989184</span>, -<span class="hljs-number">0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, -<span class="hljs-number">0.1446277761879955</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_4222&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.8371977790571115</span>, -<span class="hljs-number">0.015764369584852833</span>, -<span class="hljs-number">0.31062937026679327</span>, -<span class="hljs-number">0.562666951622192</span>, -<span class="hljs-number">0.8984947637863987</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_9392&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.33445148015177995</span>, -<span class="hljs-number">0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_8510&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, -<span class="hljs-number">0.5890507376891594</span>, -<span class="hljs-number">0.8650502298996872</span>, -<span class="hljs-number">0.6140360785406336</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_9381&quot;</span>},​
        {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, -<span class="hljs-number">0.3737913482606834</span>, -<span class="hljs-number">0.06726932177492717</span>, -<span class="hljs-number">0.6980531615588608</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_4976&quot;</span>},​
]​

<button class="copy-code-btn"></button></code></pre>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.get(​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>],​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.GetResp​
<span class="hljs-keyword">import</span> java.util.*;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
        ​
<span class="hljs-type">GetReq</span> <span class="hljs-variable">getReq</span> <span class="hljs-operator">=</span> GetReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .ids(Arrays.asList(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>))​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .build();​
​
<span class="hljs-type">GetResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.get(getReq);​
​
List&lt;QueryResp.QueryResult&gt; results = getResp.getGetResults();​
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : results) {​
    System.out.println(result.getEntity());​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=pink_8682, vector=[0.35803765, -0.6023496, 0.18414013, -0.26286206, 0.90294385], id=0}​</span>
<span class="hljs-comment">// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}​</span>
<span class="hljs-comment">// {color=orange_6781, vector=[0.43742132, -0.55975026, 0.6457888, 0.7894059, 0.20785794], id=2}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">const</span> res = client.<span class="hljs-title function_">get</span>({​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    ids=[<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>],​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;id&quot;: [0, 1, 2],​
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;pink_8682&quot;,&quot;id&quot;:0,&quot;vector&quot;:[0.35803765,-0.6023496,0.18414013,-0.26286206,0.90294385]},{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;orange_6781&quot;,&quot;id&quot;:2,&quot;vector&quot;:[0.43742132,-0.55975026,0.6457888,0.7894059,0.20785794]}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Query​" class="common-anchor-header">Utiliser une requête<button data-href="#Use-Query​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous devez trouver des entités en fonction de conditions de filtrage personnalisées, utilisez la méthode Query. Les exemples de code suivants supposent qu'il existe trois champs nommés <code translate="no">id</code>, <code translate="no">vector</code>, et <code translate="no">color</code> et renvoient le nombre spécifié d'entités qui détiennent une valeur <code translate="no">color</code> commençant par <code translate="no">red</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryResp​
​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
List&lt;QueryResp.QueryResult&gt; results = getResp.getQueryResults();​
<span class="hljs-keyword">for</span> (QueryResp.QueryResult result : results) {​
    System.out.println(result.getEntity());​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// {color=red_7025, vector=[0.19886813, 0.060235605, 0.6976963, 0.26144746, 0.8387295], id=1}​</span>
<span class="hljs-comment">// {color=red_4794, vector=[0.44523495, -0.8757027, 0.82207793, 0.4640629, 0.3033748], id=4}​</span>
<span class="hljs-comment">// {color=red_9392, vector=[0.8371978, -0.015764369, -0.31062937, -0.56266695, -0.8984948], id=6}​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (​
    <span class="hljs-string">&quot;context&quot;</span>​
    <span class="hljs-string">&quot;fmt&quot;</span>​
    <span class="hljs-string">&quot;log&quot;</span>​
​
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2&quot;</span>​
)​
​
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ExampleClient_Query_basic</span><span class="hljs-params">()</span></span> {​
    ctx, cancel := context.WithCancel(context.Background())​
    <span class="hljs-keyword">defer</span> cancel()​
​
    milvusAddr := <span class="hljs-string">&quot;127.0.0.1:19530&quot;</span>​
    token := <span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
    cli, err := client.New(ctx, &amp;client.ClientConfig{​
        Address: milvusAddr,​
        APIKey:  token,​
    })​
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {​
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus server: &quot;</span>, err.Error())​
    }​
​
    <span class="hljs-keyword">defer</span> cli.Close(ctx)​
​
    resultSet, err := cli.Query(ctx, client.NewQueryOption(<span class="hljs-string">&quot;query_collection&quot;</span>).​
        WithFilter(<span class="hljs-string">`color like &quot;red%&quot;`</span>).​
        WithOutputFields(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>).​
        WithLimit(<span class="hljs-number">3</span>))​
​
    fmt.Println(resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>))​
}​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">const</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    <span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;quick_setup&quot;,​
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,​
    &quot;limit&quot;: 3,​
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]​
}&#x27;</span>​
<span class="hljs-comment">#{&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;color&quot;:&quot;red_7025&quot;,&quot;id&quot;:1,&quot;vector&quot;:[0.19886813,0.060235605,0.6976963,0.26144746,0.8387295]},{&quot;color&quot;:&quot;red_4794&quot;,&quot;id&quot;:4,&quot;vector&quot;:[0.44523495,-0.8757027,0.82207793,0.4640629,0.3033748]},{&quot;color&quot;:&quot;red_9392&quot;,&quot;id&quot;:6,&quot;vector&quot;:[0.8371978,-0.015764369,-0.31062937,-0.56266695,-0.8984948]}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-QueryIterator​" class="common-anchor-header">Utiliser QueryIterator<button data-href="#Use-QueryIterator​" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsque vous devez trouver des entités en fonction de conditions de filtrage personnalisées dans le cadre de requêtes paginées, créez un <strong>QueryIterator</strong> et utilisez sa méthode <strong>next()</strong> pour parcourir toutes les entités afin de trouver celles qui répondent aux conditions de filtrage. Les exemples de code suivants supposent qu'il existe trois champs nommés <code translate="no">id</code>, <code translate="no">vector</code>, et <code translate="no">color</code> et renvoient toutes les entités qui contiennent une valeur <code translate="no">color</code> en commençant par <code translate="no">red</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection​
​
connections.connect(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
collection = Collection(<span class="hljs-string">&quot;query_collection&quot;</span>)​
​
iterator = collection.query_iterator(​
    batch_size=<span class="hljs-number">10</span>,​
    expr=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]​
)​
​
results = []​
​
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:​
    result = iterator.<span class="hljs-built_in">next</span>()​
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:​
        iterator.close()​
        <span class="hljs-keyword">break</span>​
​
    <span class="hljs-built_in">print</span>(result)​
    results += result​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.orm.iterator.QueryIterator;​
<span class="hljs-keyword">import</span> io.milvus.response.QueryResultsWrapper;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryIteratorReq;​
​
​
<span class="hljs-type">QueryIteratorReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> QueryIteratorReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .expr(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .batchSize(<span class="hljs-number">50L</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
<span class="hljs-type">QueryIterator</span> <span class="hljs-variable">queryIterator</span> <span class="hljs-operator">=</span> client.queryIterator(req);​
​
<span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {​
    List&lt;QueryResultsWrapper.RowRecord&gt; res = queryIterator.next();​
    <span class="hljs-keyword">if</span> (res.isEmpty()) {​
        queryIterator.close();​
        <span class="hljs-keyword">break</span>;​
    }​
​
    <span class="hljs-keyword">for</span> (QueryResultsWrapper.RowRecord record : res) {​
        System.out.println(record);​
    }​
}​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">// [color:red_7025, id:1]​</span>
<span class="hljs-comment">// [color:red_4794, id:4]​</span>
<span class="hljs-comment">// [color:red_9392, id:6]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> iterator = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">queryIterator</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;query_collection&#x27;</span>,​
  <span class="hljs-attr">batchSize</span>: <span class="hljs-number">10</span>,​
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;color&#x27;</span>],​
});​
​
<span class="hljs-keyword">const</span> results = [];​
<span class="hljs-keyword">for</span> <span class="hljs-title function_">await</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> iterator) {​
  results.<span class="hljs-title function_">push</span>(...value);​
  page += <span class="hljs-number">1</span>;​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Currently not available</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Queries-in-Partitions​" class="common-anchor-header">Requêtes dans les partitions<button data-href="#Queries-in-Partitions​" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez également effectuer des requêtes dans une ou plusieurs partitions en incluant les noms des partitions dans la requête Get, Query ou QueryIterator. Les exemples de code suivants supposent qu'il existe une partition nommée <strong>PartitionA</strong> dans la collection.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.get(​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    partitionNames=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    ids=[<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>],​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>]​
)​
​
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    partitionNames=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    limit=<span class="hljs-number">3</span>​
)​
​
<span class="hljs-comment"># 使用 QueryIterator​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection​
​
connections.connect(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
collection = Collection(<span class="hljs-string">&quot;query_collection&quot;</span>)​
​
iterator = collection.query_iterator(​
    <span class="hljs-comment"># highlight-next-line​</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    batch_size=<span class="hljs-number">10</span>,​
    expr=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]​
)​
​
results = []​
​
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:​
    result = iterator.<span class="hljs-built_in">next</span>()​
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> result:​
        iterator.close()​
        <span class="hljs-keyword">break</span>​
​
    <span class="hljs-built_in">print</span>(result)​
    results += result​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GetReq</span> <span class="hljs-variable">getReq</span> <span class="hljs-operator">=</span> GetReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)​
        .ids(Arrays.asList(<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>))​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
        .build();​
​
<span class="hljs-type">GetResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.get(getReq);​
​
​
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .filter(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
        .limit(<span class="hljs-number">3</span>)​
        .build();​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">getResp</span> <span class="hljs-operator">=</span> client.query(queryReq);​
​
​
<span class="hljs-type">QueryIteratorReq</span> <span class="hljs-variable">req</span> <span class="hljs-operator">=</span> QueryIteratorReq.builder()​
        .collectionName(<span class="hljs-string">&quot;query_collection&quot;</span>)​
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))​
        .expr(<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>)​
        .batchSize(<span class="hljs-number">50L</span>)​
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
<span class="hljs-type">QueryIterator</span> <span class="hljs-variable">queryIterator</span> <span class="hljs-operator">=</span> client.queryIterator(req);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 使用 Get 方法​</span>
<span class="hljs-keyword">var</span> res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    filter=<span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    <span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)​
})​
​
<span class="hljs-comment">// 使用 Query 方法​</span>
res = client.<span class="hljs-title function_">query</span>({​
    collection_name=<span class="hljs-string">&quot;query_collection&quot;</span>,​
    <span class="hljs-comment">// highlight-next-line​</span>
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],​
    filter=<span class="hljs-string">&quot;color like \&quot;red%\&quot;&quot;</span>,​
    output_fields=[<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>],​
    <span class="hljs-title function_">limit</span>(<span class="hljs-number">3</span>)​
})​
​
<span class="hljs-comment">// 暂不支持使用 QueryIterator​</span>
<span class="hljs-keyword">const</span> iterator = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">queryIterator</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;query_collection&#x27;</span>,​
  <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&#x27;partitionA&#x27;</span>],​
  <span class="hljs-attr">batchSize</span>: <span class="hljs-number">10</span>,​
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot;&#x27;</span>,​
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>],​
});​
​
<span class="hljs-keyword">const</span> results = [];​
<span class="hljs-keyword">for</span> <span class="hljs-title function_">await</span> (<span class="hljs-keyword">const</span> value <span class="hljs-keyword">of</span> iterator) {​
  results.<span class="hljs-title function_">push</span>(...value);​
  page += <span class="hljs-number">1</span>;​
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
<span class="hljs-comment"># 使用 Get 方法​</span>
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;query_collection&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],​
    &quot;id&quot;: [0, 1, 2],​
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment"># 使用 Query 方法​</span>
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/get&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;query_collection&quot;,​
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],​
    &quot;filter&quot;: &quot;color like \&quot;red%\&quot;&quot;,​
    &quot;limit&quot;: 3,​
    &quot;outputFields&quot;: [&quot;vector&quot;, &quot;color&quot;],​
    &quot;id&quot;: [0, 1, 2]​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p></p>