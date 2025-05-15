---
id: upsert-entities.md
title: Upsert-Entitäten
summary: >-
  Die Upsert-Operation kombiniert die Aktionen des Aktualisierens und Einfügens
  von Daten. Milvus bestimmt, ob eine Aktualisierung oder eine Einfügeoperation
  durchgeführt werden soll, indem es prüft, ob der Primärschlüssel existiert. In
  diesem Abschnitt wird das Upsert einer Entität und das spezifische Verhalten
  der Upsert-Operation in verschiedenen Szenarien vorgestellt.
---
<h1 id="Upsert-Entities" class="common-anchor-header">Upsert-Entitäten<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>Die Upsert-Operation kombiniert die Aktionen des Aktualisierens und Einfügens von Daten. Milvus entscheidet, ob eine Aktualisierung oder eine Einfügung durchgeführt werden soll, indem es prüft, ob der Primärschlüssel existiert. In diesem Abschnitt wird erläutert, wie eine Entität eingefügt werden kann und wie sich die Upsert-Operation in verschiedenen Szenarien verhält.</p>
<h2 id="Overview" class="common-anchor-header">Übersicht<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie eine Entität in einer Sammlung aktualisieren müssen oder nicht sicher sind, ob Sie sie aktualisieren oder einfügen sollen, können Sie die Operation "Upsert" verwenden. Bei der Verwendung dieses Vorgangs muss unbedingt sichergestellt werden, dass die in der Upsert-Anforderung enthaltene Entität den Primärschlüssel enthält; andernfalls wird ein Fehler auftreten. Beim Empfang einer Upsert-Anfrage führt Milvus den folgenden Prozess aus:</p>
<ol>
<li><p>Prüfen Sie, ob das Primärfeld der Sammlung AutoId aktiviert hat.</p>
<ol>
<li><p>Ist dies der Fall, ersetzt Milvus den Primärschlüssel in der Entität durch einen automatisch generierten Primärschlüssel und fügt die Daten ein.</p></li>
<li><p>Wenn nicht, verwendet Milvus den Primärschlüssel der Entität, um die Daten einzufügen.</p></li>
</ol></li>
<li><p>Führen Sie einen Löschvorgang auf der Grundlage des Primärschlüsselwerts der Entität durch, die in der Upsert-Anforderung enthalten ist.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/upsert-entities-workflow.png" alt="Upsert Entities Workflow" class="doc-image" id="upsert-entities-workflow" />
   </span> <span class="img-wrapper"> <span>Upsert Entitäten Workflow</span> </span></p>
<h2 id="Upsert-Entity-in-a-Collection" class="common-anchor-header">Upsert Entität in eine Sammlung<button data-href="#Upsert-Entity-in-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Abschnitt werden Sie Entitäten in eine Sammlung einfügen, die mit der Schnelleinrichtung erstellt wurde. Eine auf diese Weise erstellte Sammlung hat nur zwei Felder, <strong>id</strong> und <strong>vector</strong>. Außerdem ist in dieser Collection das dynamische Feld aktiviert, so dass die Entities im Beispielcode ein Feld namens <strong>color</strong> enthalten, das nicht im Schema definiert ist.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">6</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&#x27;quick_setup&#x27;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 0, \&quot;vector\&quot;: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \&quot;color\&quot;: \&quot;black_9898\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 1, \&quot;vector\&quot;: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \&quot;color\&quot;: \&quot;red_7319\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 2, \&quot;vector\&quot;: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \&quot;color\&quot;: \&quot;white_6465\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 3, \&quot;vector\&quot;: [0.14594326235891586, -0.3775407299900644, -0.3765479013078812, 0.20612075380355122, 0.4902678929632145], \&quot;color\&quot;: \&quot;orange_7580\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 4, \&quot;vector\&quot;: [0.4548498669607359, -0.887610217681605, 0.5655081329910452, 0.19220509387904117, 0.016513983433433577], \&quot;color\&quot;: \&quot;red_3314\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 5, \&quot;vector\&quot;: [0.11755001847051827, -0.7295149788999611, 0.2608115847524266, -0.1719167007897875, 0.7417611743754855], \&quot;color\&quot;: \&quot;black_9955\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 6, \&quot;vector\&quot;: [0.9363032158314308, 0.030699901477745373, 0.8365910312319647, 0.7823840208444011, 0.2625222076909237], \&quot;color\&quot;: \&quot;yellow_2461\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 7, \&quot;vector\&quot;: [0.0754823906014721, -0.6390658668265143, 0.5610517334334937, -0.8986261118798251, 0.9372056764266794], \&quot;color\&quot;: \&quot;white_5015\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 8, \&quot;vector\&quot;: [-0.3038434006935904, 0.1279149203380523, 0.503958664270957, -0.2622661156746988, 0.7407627307791929], \&quot;color\&quot;: \&quot;purple_6414\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 9, \&quot;vector\&quot;: [-0.7125086947677588, -0.8050968321012257, -0.32608864121785786, 0.3255654958645424, 0.26227968923834233], \&quot;color\&quot;: \&quot;brown_7231\&quot;}&quot;</span>, JsonObject.class)
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=10)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.619954382375778</span>, <span class="hljs-number">0.4479436794798608</span>, -<span class="hljs-number">0.17493894838751745</span>, -<span class="hljs-number">0.4248030059917294</span>, -<span class="hljs-number">0.8648452746018911</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;black_9898&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4762662251462588</span>, -<span class="hljs-number">0.6942502138717026</span>, -<span class="hljs-number">0.4490002642657902</span>, -<span class="hljs-number">0.628696575798281</span>, <span class="hljs-number">0.9660395877041965</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_7319&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.8864122635045097</span>, <span class="hljs-number">0.9260170474445351</span>, <span class="hljs-number">0.801326976181461</span>, <span class="hljs-number">0.6383943392381306</span>, <span class="hljs-number">0.7563037341572827</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;white_6465&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.14594326235891586</span>, -<span class="hljs-number">0.3775407299900644</span>, -<span class="hljs-number">0.3765479013078812</span>, <span class="hljs-number">0.20612075380355122</span>, <span class="hljs-number">0.4902678929632145</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_7580&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4548498669607359</span>, -<span class="hljs-number">0.887610217681605</span>, <span class="hljs-number">0.5655081329910452</span>, <span class="hljs-number">0.19220509387904117</span>, <span class="hljs-number">0.016513983433433577</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_3314&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.11755001847051827</span>, -<span class="hljs-number">0.7295149788999611</span>, <span class="hljs-number">0.2608115847524266</span>, -<span class="hljs-number">0.1719167007897875</span>, <span class="hljs-number">0.7417611743754855</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;black_9955&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.9363032158314308</span>, <span class="hljs-number">0.030699901477745373</span>, <span class="hljs-number">0.8365910312319647</span>, <span class="hljs-number">0.7823840208444011</span>, <span class="hljs-number">0.2625222076909237</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_2461&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">7</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.0754823906014721</span>, -<span class="hljs-number">0.6390658668265143</span>, <span class="hljs-number">0.5610517334334937</span>, -<span class="hljs-number">0.8986261118798251</span>, <span class="hljs-number">0.9372056764266794</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;white_5015&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">8</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.3038434006935904</span>, <span class="hljs-number">0.1279149203380523</span>, <span class="hljs-number">0.503958664270957</span>, -<span class="hljs-number">0.2622661156746988</span>, <span class="hljs-number">0.7407627307791929</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_6414&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.7125086947677588</span>, -<span class="hljs-number">0.8050968321012257</span>, -<span class="hljs-number">0.32608864121785786</span>, <span class="hljs-number">0.3255654958645424</span>, <span class="hljs-number">0.26227968923834233</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;brown_7231&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

dynamicColumn := column.NewColumnString(<span class="hljs-string">&quot;color&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;purple_4976&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;quick_setup&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
        {<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, <span class="hljs-number">-0.36981146090600725</span>, <span class="hljs-number">-0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>},
        {<span class="hljs-number">0.4452349528804562</span>, <span class="hljs-number">-0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>},
        {<span class="hljs-number">0.985825131989184</span>, <span class="hljs-number">-0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, <span class="hljs-number">-0.1446277761879955</span>},
        {<span class="hljs-number">0.8371977790571115</span>, <span class="hljs-number">-0.015764369584852833</span>, <span class="hljs-number">-0.31062937026679327</span>, <span class="hljs-number">-0.562666951622192</span>, <span class="hljs-number">-0.8984947637863987</span>},
        {<span class="hljs-number">-0.33445148015177995</span>, <span class="hljs-number">-0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>},
        {<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, <span class="hljs-number">-0.5890507376891594</span>, <span class="hljs-number">-0.8650502298996872</span>, <span class="hljs-number">-0.6140360785406336</span>},
        {<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, <span class="hljs-number">-0.3737913482606834</span>, <span class="hljs-number">-0.06726932177492717</span>, <span class="hljs-number">-0.6980531615588608</span>},
    }).
    WithColumns(dynamicColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 0, &quot;vector&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], &quot;color&quot;: &quot;pink_8682&quot;},
        {&quot;id&quot;: 1, &quot;vector&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], &quot;color&quot;: &quot;red_7025&quot;},
        {&quot;id&quot;: 2, &quot;vector&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], &quot;color&quot;: &quot;orange_6781&quot;},
        {&quot;id&quot;: 3, &quot;vector&quot;: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], &quot;color&quot;: &quot;pink_9298&quot;},
        {&quot;id&quot;: 4, &quot;vector&quot;: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], &quot;color&quot;: &quot;red_4794&quot;},
        {&quot;id&quot;: 5, &quot;vector&quot;: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], &quot;color&quot;: &quot;yellow_4222&quot;},
        {&quot;id&quot;: 6, &quot;vector&quot;: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], &quot;color&quot;: &quot;red_9392&quot;},
        {&quot;id&quot;: 7, &quot;vector&quot;: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], &quot;color&quot;: &quot;grey_8510&quot;},
        {&quot;id&quot;: 8, &quot;vector&quot;: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], &quot;color&quot;: &quot;white_9381&quot;},
        {&quot;id&quot;: 9, &quot;vector&quot;: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], &quot;color&quot;: &quot;purple_4976&quot;}        
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 10,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#             3,</span>
<span class="hljs-comment">#             4,</span>
<span class="hljs-comment">#             5,</span>
<span class="hljs-comment">#             6,</span>
<span class="hljs-comment">#             7,</span>
<span class="hljs-comment">#             8,</span>
<span class="hljs-comment">#             9</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-Entities-in-a-Partition" class="common-anchor-header">Einfügen von Entitäten in eine Partition<button data-href="#Upsert-Entities-in-a-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können auch Entitäten in eine bestimmte Partition einfügen. Die folgenden Codeschnipsel gehen davon aus, dass Sie eine Partition namens <strong>PartitionA</strong> in Ihrer Sammlung haben.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#javascript">NodeJS</a> <a href="#go">Go</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">data=[
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">11</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">14</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">15</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">17</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">18</span>, <span class="hljs-string">&quot;vector&quot;</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">19</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-string">&quot;color&quot;</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = client.upsert(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=data,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment"># {&#x27;upsert_count&#x27;: 10}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.UpsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.UpsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = Arrays.asList(
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 10, \&quot;vector\&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \&quot;color\&quot;: \&quot;black_3651\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 11, \&quot;vector\&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \&quot;color\&quot;: \&quot;grey_2049\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 12, \&quot;vector\&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \&quot;color\&quot;: \&quot;blue_6168\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 13, \&quot;vector\&quot;: [0.3202914977909075, -0.7279137773695252, -0.04747830871620273, 0.8266053056909548, 0.8277957187455489], \&quot;color\&quot;: \&quot;blue_1672\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 14, \&quot;vector\&quot;: [0.2975811497890859, 0.2946936202691086, 0.5399463833894609, 0.8385334966677529, -0.4450543984655133], \&quot;color\&quot;: \&quot;pink_1601\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 15, \&quot;vector\&quot;: [-0.04697464305600074, -0.08509022265734134, 0.9067184632552001, -0.2281912685064822, -0.9747503428652762], \&quot;color\&quot;: \&quot;yellow_9925\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 16, \&quot;vector\&quot;: [-0.9363075919673911, -0.8153981031085669, 0.7943039120490902, -0.2093886809842529, 0.0771191335807897], \&quot;color\&quot;: \&quot;orange_9872\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 17, \&quot;vector\&quot;: [-0.050451522820639916, 0.18931572752321935, 0.7522886192190488, -0.9071793089474034, 0.6032647330692296], \&quot;color\&quot;: \&quot;red_6450\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 18, \&quot;vector\&quot;: [-0.9181544231141592, 0.6700755998126806, -0.014174674636136642, 0.6325780463623432, -0.49662222164032976], \&quot;color\&quot;: \&quot;purple_7392\&quot;}&quot;</span>, JsonObject.class),
        gson.fromJson(<span class="hljs-string">&quot;{\&quot;id\&quot;: 19, \&quot;vector\&quot;: [0.11426945899602536, 0.6089190684002581, -0.5842735738352236, 0.057050610092692855, -0.035163433018196244], \&quot;color\&quot;: \&quot;pink_4996\&quot;}&quot;</span>, JsonObject.class)
);

<span class="hljs-type">UpsertReq</span> <span class="hljs-variable">upsertReq</span> <span class="hljs-operator">=</span> UpsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
        .data(data)
        .build();

<span class="hljs-type">UpsertResp</span> <span class="hljs-variable">upsertResp</span> <span class="hljs-operator">=</span> client.upsert(upsertReq);
System.out.println(upsertResp);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">//</span>
<span class="hljs-comment">// UpsertResp(upsertCnt=10)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-comment">// 6. Upsert data in partitions</span>
data = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.06998888224297328</span>, <span class="hljs-number">0.8582816610326578</span>, -<span class="hljs-number">0.9657938677934292</span>, <span class="hljs-number">0.6527905683627726</span>, -<span class="hljs-number">0.8668460657158576</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;black_3651&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">11</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.6060703043917468</span>, -<span class="hljs-number">0.3765080534566074</span>, -<span class="hljs-number">0.7710758854987239</span>, <span class="hljs-number">0.36993888322346136</span>, <span class="hljs-number">0.5507513364206531</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;grey_2049&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9041813104515337</span>, -<span class="hljs-number">0.9610546012461163</span>, <span class="hljs-number">0.20033003106083358</span>, <span class="hljs-number">0.11842506351635174</span>, <span class="hljs-number">0.8327356724591011</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_6168&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3202914977909075</span>, -<span class="hljs-number">0.7279137773695252</span>, -<span class="hljs-number">0.04747830871620273</span>, <span class="hljs-number">0.8266053056909548</span>, <span class="hljs-number">0.8277957187455489</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;blue_1672&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">14</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2975811497890859</span>, <span class="hljs-number">0.2946936202691086</span>, <span class="hljs-number">0.5399463833894609</span>, <span class="hljs-number">0.8385334966677529</span>, -<span class="hljs-number">0.4450543984655133</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_1601&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.04697464305600074</span>, -<span class="hljs-number">0.08509022265734134</span>, <span class="hljs-number">0.9067184632552001</span>, -<span class="hljs-number">0.2281912685064822</span>, -<span class="hljs-number">0.9747503428652762</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;yellow_9925&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">16</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9363075919673911</span>, -<span class="hljs-number">0.8153981031085669</span>, <span class="hljs-number">0.7943039120490902</span>, -<span class="hljs-number">0.2093886809842529</span>, <span class="hljs-number">0.0771191335807897</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;orange_9872&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.050451522820639916</span>, <span class="hljs-number">0.18931572752321935</span>, <span class="hljs-number">0.7522886192190488</span>, -<span class="hljs-number">0.9071793089474034</span>, <span class="hljs-number">0.6032647330692296</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;red_6450&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">vector</span>: [-<span class="hljs-number">0.9181544231141592</span>, <span class="hljs-number">0.6700755998126806</span>, -<span class="hljs-number">0.014174674636136642</span>, <span class="hljs-number">0.6325780463623432</span>, -<span class="hljs-number">0.49662222164032976</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;purple_7392&quot;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">19</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.11426945899602536</span>, <span class="hljs-number">0.6089190684002581</span>, -<span class="hljs-number">0.5842735738352236</span>, <span class="hljs-number">0.057050610092692855</span>, -<span class="hljs-number">0.035163433018196244</span>], <span class="hljs-attr">color</span>: <span class="hljs-string">&quot;pink_4996&quot;</span>}
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">upsert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: data,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">upsert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 10</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">dynamicColumn = column.NewColumnString(<span class="hljs-string">&quot;color&quot;</span>, []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;pink_8682&quot;</span>, <span class="hljs-string">&quot;red_7025&quot;</span>, <span class="hljs-string">&quot;orange_6781&quot;</span>, <span class="hljs-string">&quot;pink_9298&quot;</span>, <span class="hljs-string">&quot;red_4794&quot;</span>, <span class="hljs-string">&quot;yellow_4222&quot;</span>, <span class="hljs-string">&quot;red_9392&quot;</span>, <span class="hljs-string">&quot;grey_8510&quot;</span>, <span class="hljs-string">&quot;white_9381&quot;</span>, <span class="hljs-string">&quot;purple_4976&quot;</span>,
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;quick_setup&quot;</span>).
    WithPartition(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">12</span>, <span class="hljs-number">13</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>, <span class="hljs-number">16</span>, <span class="hljs-number">17</span>, <span class="hljs-number">18</span>, <span class="hljs-number">19</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>},
        {<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>},
        {<span class="hljs-number">0.43742130801983836</span>, <span class="hljs-number">-0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>},
        {<span class="hljs-number">0.3172005263489739</span>, <span class="hljs-number">0.9719044792798428</span>, <span class="hljs-number">-0.36981146090600725</span>, <span class="hljs-number">-0.4860894583077995</span>, <span class="hljs-number">0.95791889146345</span>},
        {<span class="hljs-number">0.4452349528804562</span>, <span class="hljs-number">-0.8757026943054742</span>, <span class="hljs-number">0.8220779437047674</span>, <span class="hljs-number">0.46406290649483184</span>, <span class="hljs-number">0.30337481143159106</span>},
        {<span class="hljs-number">0.985825131989184</span>, <span class="hljs-number">-0.8144651566660419</span>, <span class="hljs-number">0.6299267002202009</span>, <span class="hljs-number">0.1206906911183383</span>, <span class="hljs-number">-0.1446277761879955</span>},
        {<span class="hljs-number">0.8371977790571115</span>, <span class="hljs-number">-0.015764369584852833</span>, <span class="hljs-number">-0.31062937026679327</span>, <span class="hljs-number">-0.562666951622192</span>, <span class="hljs-number">-0.8984947637863987</span>},
        {<span class="hljs-number">-0.33445148015177995</span>, <span class="hljs-number">-0.2567135004164067</span>, <span class="hljs-number">0.8987539745369246</span>, <span class="hljs-number">0.9402995886420709</span>, <span class="hljs-number">0.5378064918413052</span>},
        {<span class="hljs-number">0.39524717779832685</span>, <span class="hljs-number">0.4000257286739164</span>, <span class="hljs-number">-0.5890507376891594</span>, <span class="hljs-number">-0.8650502298996872</span>, <span class="hljs-number">-0.6140360785406336</span>},
        {<span class="hljs-number">0.5718280481994695</span>, <span class="hljs-number">0.24070317428066512</span>, <span class="hljs-number">-0.3737913482606834</span>, <span class="hljs-number">-0.06726932177492717</span>, <span class="hljs-number">-0.6980531615588608</span>},
    }).
    WithColumns(dynamicColumn),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle err</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/upsert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;data&quot;: [
        {&quot;id&quot;: 10, &quot;vector&quot;: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], &quot;color&quot;: &quot;black_3651&quot;},
        {&quot;id&quot;: 11, &quot;vector&quot;: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], &quot;color&quot;: &quot;grey_2049&quot;},
        {&quot;id&quot;: 12, &quot;vector&quot;: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], &quot;color&quot;: &quot;blue_6168&quot;},
        {&quot;id&quot;: 13, &quot;vector&quot;: [0.3202914977909075, -0.7279137773695252, -0.04747830871620273, 0.8266053056909548, 0.8277957187455489], &quot;color&quot;: &quot;blue_1672&quot;},
        {&quot;id&quot;: 14, &quot;vector&quot;: [0.2975811497890859, 0.2946936202691086, 0.5399463833894609, 0.8385334966677529, -0.4450543984655133], &quot;color&quot;: &quot;pink_1601&quot;},
        {&quot;id&quot;: 15, &quot;vector&quot;: [-0.04697464305600074, -0.08509022265734134, 0.9067184632552001, -0.2281912685064822, -0.9747503428652762], &quot;color&quot;: &quot;yellow_9925&quot;},
        {&quot;id&quot;: 16, &quot;vector&quot;: [-0.9363075919673911, -0.8153981031085669, 0.7943039120490902, -0.2093886809842529, 0.0771191335807897], &quot;color&quot;: &quot;orange_9872&quot;},
        {&quot;id&quot;: 17, &quot;vector&quot;: [-0.050451522820639916, 0.18931572752321935, 0.7522886192190488, -0.9071793089474034, 0.6032647330692296], &quot;color&quot;: &quot;red_6450&quot;},
        {&quot;id&quot;: 18, &quot;vector&quot;: [-0.9181544231141592, 0.6700755998126806, -0.014174674636136642, 0.6325780463623432, -0.49662222164032976], &quot;color&quot;: &quot;purple_7392&quot;},
        {&quot;id&quot;: 19, &quot;vector&quot;: [0.11426945899602536, 0.6089190684002581, -0.5842735738352236, 0.057050610092692855, -0.035163433018196244], &quot;color&quot;: &quot;pink_4996&quot;}
    ],
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: {</span>
<span class="hljs-comment">#         &quot;upsertCount&quot;: 10,</span>
<span class="hljs-comment">#         &quot;upsertIds&quot;: [</span>
<span class="hljs-comment">#             0,</span>
<span class="hljs-comment">#             1,</span>
<span class="hljs-comment">#             2,</span>
<span class="hljs-comment">#             3,</span>
<span class="hljs-comment">#             4,</span>
<span class="hljs-comment">#             5,</span>
<span class="hljs-comment">#             6,</span>
<span class="hljs-comment">#             7,</span>
<span class="hljs-comment">#             8,</span>
<span class="hljs-comment">#             9</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
