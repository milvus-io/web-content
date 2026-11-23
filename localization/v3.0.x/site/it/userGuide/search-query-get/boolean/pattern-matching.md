---
id: pattern-matching.md
title: Corrispondenza dei modelli
summary: >-
  Abbinare i valori delle stringhe a modelli con caratteri jolly LIKE o
  espressioni regolari RE2 nei filtri scalari.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Corrispondenza dei modelli<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Utilizzare <code translate="no">LIKE</code> per la corrispondenza con caratteri jolly e <code translate="no">=~</code> o <code translate="no">!~</code> per le espressioni regolari <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Questi filtri scalari individuano strutture di stringhe quali codici di errore, prefissi, domini e-mail o percorsi URL nelle ricerche <code translate="no">query</code>, <code translate="no">search</code> e ibride.</p>
<div class="alert note">
<p>Questi filtri individuano valori di stringa. Non modificano i token dell’analizzatore né abilitano le funzioni basate sui token <code translate="no">TEXT_MATCH</code> e <code translate="no">PHRASE_MATCH</code>. Per tali meccanismi, consultare <a href="/docs/it/regex-filter.md">Filtri dell’analizzatore Regex</a> e <a href="/docs/it/keyword-match.md">Corrispondenza di testo</a>.</p>
</div>
<p>Le espressioni di corrispondenza dei pattern vengono scritte nel parametro <code translate="no">filter</code>. Ad esempio, la seguente query individua i messaggi di log che contengono un codice di errore come <code translate="no">E1001</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .filter(<span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>)</span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

res, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;log_events&quot;</span>).
<span class="highlighted-wrapper-line">    WithFilter(<span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>).</span>
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-comment">// handle error</span>
}
fmt.Println(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client.<span class="hljs-title function_ invoke__">query</span>(
    QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
<span class="highlighted-wrapper-line">        .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>)</span>
        .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>])
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> res.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;log_events&quot;</span>)
                   .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;message&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;severity&quot;</span>);

milvus::QueryResponse response;
status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>);

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span> });

  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;log_events&#x27;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;severity&#x27;</span>],
  });
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
}

<span class="hljs-title function_">main</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(error);
  process.<span class="hljs-property">exitCode</span> = <span class="hljs-number">1</span>;
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;log_events&quot;</span>,
    Expression = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;log_events&quot;,
    &quot;filter&quot;: &quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;message&quot;, &quot;severity&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Gli esempi rimanenti mostrano l’espressione assegnata a ` <code translate="no">filter</code>`.</p>
<div class="alert note">
<p>L'operando a sinistra può essere un campo di una collezione, come <code translate="no">message</code>, oppure un sottocampo di StructArray a un indice specifico, come <code translate="no">struct[0][subfield] =~ &quot;E[0-9]{4}&quot;</code>. Vedere <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
</div>
<h2 id="Supported-field-types" class="common-anchor-header">Tipi di campo supportati<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza dei pattern è disponibile per i valori stringa.</p>
<table>
<thead>
<tr><th>Destinazione</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sì</td><td>Sì</td><td>Destinazione tipica per la corrispondenza di pattern nei campi stringa.</td></tr>
<tr><td><code translate="no">JSON</code> percorso con un valore stringa</td><td>Sì</td><td>Sì</td><td>Le corrispondenze positive richiedono valori stringa. Per le impostazioni relative al percorso dell'indice e alla conversione, consultare <a href="/docs/it/json-indexing.md#Understand-cast-types">Indicizzazione JSON</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sì</td><td>Sì</td><td>Corrisponde a un elemento specifico in base all'indice, ad esempio <code translate="no">tags[0]</code>. La corrispondenza del pattern <strong>non</strong> esegue la scansione di tutti gli elementi; si applica solo all'elemento all'indice specificato.</td></tr>
<tr><td>Destinazioni numeriche, booleane, vettoriali, <code translate="no">TEXT</code> o altre destinazioni non stringa</td><td>No</td><td>No</td><td>I pattern richiedono valori stringa.</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Scegliere LIKE o regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilizzare " <code translate="no">==</code> " per l'uguaglianza esatta delle stringhe; in caso contrario, scegliere un operatore dalla tabella seguente:</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operatore consigliato</th><th>Esempio</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td>Uguaglianza esatta delle stringhe</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Corrispondenza esatta della stringa <code translate="no">active</code>.</td></tr>
<tr><td>Corrispondenza semplice del prefisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corrisponde alle stringhe che iniziano con <code translate="no">Prod</code>.</td></tr>
<tr><td>Corrispondenza semplice del suffisso</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corrisponde alle stringhe che terminano con <code translate="no">.json</code>.</td></tr>
<tr><td>Corrispondenza semplice "contiene"</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Trova i valori che contengono <code translate="no">vector database</code> in qualsiasi punto della stringa.</td></tr>
<tr><td>Corrispondenza di un codice strutturato o di un modello a lunghezza fissa</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Trova stringhe che, distinguendo tra maiuscole e minuscole, contengano <code translate="no">E</code> seguito da quattro cifre, come ad esempio <code translate="no">E1001</code>.</td></tr>
<tr><td>Corrispondenza di pattern senza distinzione tra maiuscole e minuscole</td><td><code translate="no">=~</code> con <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Trova <code translate="no">error</code>, <code translate="no">ERROR</code> o altre varianti con maiuscole e minuscole.</td></tr>
<tr><td>Escludi i valori che corrispondono a un modello regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Esclude le stringhe che iniziano con <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<h2 id="Use-LIKE" class="common-anchor-header">Utilizza LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>L'operatore <code translate="no">LIKE</code> serve per semplici corrispondenze con caratteri jolly su valori di stringa. Supporta solo i seguenti caratteri jolly:</p>
<table>
<thead>
<tr><th>Carattere jolly</th><th>Descrizione</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Corrisponde a zero o più caratteri.</td></tr>
<tr><td><code translate="no">_</code></td><td>Corrisponde esattamente a un carattere.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Modelli LIKE comuni<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizza la posizione di <code translate="no">%</code> e <code translate="no">_</code> per controllare dove appare il testo fisso nella stringa corrispondente.</p>
<table>
<thead>
<tr><th>Requisiti</th><th>Modello</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Inizia con un prefisso</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina con un suffisso</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contiene una sottostringa</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Corrisponde a un carattere in una posizione fissa</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamento di corrispondenza LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare <code translate="no">LIKE</code> per le corrispondenze di prefisso, suffisso, contenuto e singolo carattere in posizione fissa. <code translate="no">LIKE</code> non supporta classi di caratteri come <code translate="no">[0-9]</code>, alternanze come <code translate="no">error|failed</code>, conteggi di ripetizioni come <code translate="no">{4}</code>, ancore come <code translate="no">^</code> o <code translate="no">$</code>, né flag di ignoranza maiuscole/minuscole come <code translate="no">(?i)</code>. Per tali pattern, utilizzare le espressioni regolari.</p>
<h3 id="Escaping-wildcards-in-a-LIKE-pattern" class="common-anchor-header">Escape dei caratteri jolly in un modello LIKE<button data-href="#Escaping-wildcards-in-a-LIKE-pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Per trovare corrispondenze letterali con <code translate="no">%</code>, <code translate="no">_</code> o <code translate="no">\</code>, è necessario sfuggire il carattere con una barra rovesciata (<code translate="no">\</code>):</p>
<ul>
<li><code translate="no">name LIKE r&quot;\%&quot;</code> corrisponde al valore letterale <code translate="no">%</code>.</li>
<li><code translate="no">name LIKE r&quot;\_%&quot;</code> corrisponde ai valori che iniziano con il carattere letterale <code translate="no">_</code>.</li>
<li><code translate="no">name LIKE r&quot;\\%&quot;</code> corrisponde ai valori che iniziano con una barra rovesciata letterale.</li>
</ul>
<p>I letterali di stringa grezzi, scritti come <code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>, mantengono le barre rovesciate tali e quali nelle espressioni dei filtri di Milvus. Sono consigliati per <code translate="no">LIKE</code> e per i pattern regex che contengono barre rovesciate. Senza una stringa grezza, i normali letterali di stringa elaborano comunque le sequenze di escape prima che il pattern venga valutato, quindi potrebbero essere necessarie più barre rovesciate.</p>
<h2 id="Use-regex" class="common-anchor-header">Utilizzare le espressioni regolari<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Le espressioni regolari supportano classi di caratteri, ripetizioni, alternanze, ancore e corrispondenze che non distinguono tra maiuscole e minuscole. L'operando a destra di <code translate="no">=~</code> o <code translate="no">!~</code> deve essere un letterale stringa:</p>
<table>
<thead>
<tr><th>Operatore</th><th>Significato</th><th>Esempio</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corrisponde ai valori che soddisfano il modello regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Esclude i valori che soddisfano il modello regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Using-raw-string-literals" class="common-anchor-header">Utilizzo di stringhe letterali non elaborate<button data-href="#Using-raw-string-literals" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilizzare stringhe letterali non codificate (<code translate="no">r&quot;...&quot;</code> o <code translate="no">r'...'</code>) per passare le barre rovesciate (\) tali e quali a RE2, evitando l'escape aggiuntivo nelle normali stringhe di filtro:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">r&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`filename =~ r&quot;\.json$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;filename =~ r&quot;\.json$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(filename =~ r&quot;\.json$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;filename =~ r&quot;\\.json$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;filename =~ r\&quot;\\.json$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;filename =~ r&quot;\.json$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo corrisponde a stringhe che terminano con <code translate="no">.json</code>, come ad esempio <code translate="no">report.json</code>.</p>
<p>Senza una stringa raw nell’espressione del filtro Milvus, i normali letterali di stringa elaborano le sequenze di escape prima che il pattern regex venga valutato. I caratteri letterali sottoposti a escape potrebbero quindi richiedere ulteriori barre rovesciate nella stringa del linguaggio host.</p>
<h3 id="Common-regex-patterns" class="common-anchor-header">Modelli di espressioni regolari comuni<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Gli esempi seguenti utilizzano la sintassi RE2 comune nelle espressioni dei filtri di Milvus. Per la sintassi completa delle espressioni regolari, consultare il riferimento <a href="https://github.com/google/re2/wiki/syntax">alla sintassi RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Modello</th><th>Esempio di filtro</th></tr>
</thead>
<tbody>
<tr><td>Contiene testo letterale</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Inizia con un prefisso</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina con un suffisso</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Corrisponde a una sequenza di cifre</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Corrisponde a un numero fisso di cifre</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Corrisponde a un dominio e-mail</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corrisponde senza distinzione tra maiuscole e minuscole</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corrisponde alla stringa completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Per trovare una delle diverse parole, usa l'alternanza con <code translate="no">|</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;error|failed|timeout&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;error|failed|timeout&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;error|failed|timeout&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;error|failed|timeout\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Quando si effettuano corrispondenze letterali con i metacaratteri delle espressioni regolari, è necessario eseguire l'escape all'interno del pattern. Ad esempio, per trovare un punto letterale (<code translate="no">\.</code> nell'espressione regolare), scrivere <code translate="no">\\.</code> in una stringa sorgente Python, Java, Go o Node.js:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`email =~ &quot;@gmail\\.com$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;email =~ &quot;@gmail\.com$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(email =~ &quot;@gmail\\.com$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;email =~ \&quot;@gmail\\.com$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Milvus rifiuta i pattern regex non validi e la sintassi non supportata da <a href="https://github.com/google/re2/wiki/syntax">RE2</a>.</p>
</div>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamento di corrispondenza<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Corrispondenza di sottostringhe</strong></p>
<p>La corrispondenza delle espressioni regolari di Milvus utilizza la semantica delle sottostringhe. Il pattern non deve necessariamente corrispondere all’intero valore del campo. Ad esempio, il seguente filtro trova corrispondenze sia per <code translate="no">E1001</code> che per <code translate="no">failed with E1001 after retry</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message =~ &quot;E[0-9]{4}&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message =~ &quot;E[0-9]{4}&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message =~ &quot;E[0-9]{4}&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message =~ \&quot;E[0-9]{4}\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Per trovare corrispondenze con l’intero valore del campo, utilizzare gli ancoraggi <code translate="no">^</code> e <code translate="no">$</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
filter := <span class="hljs-string">`code =~ &quot;^E[0-9]{4}$&quot;`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;code =~ &quot;^E[0-9]{4}$&quot;&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(code =~ &quot;^E[0-9]{4}$&quot;)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;code =~ \&quot;^E[0-9]{4}$\&quot;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
filter=<span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campi VARCHAR nullabili</strong></p>
<p>I filtri regex non individuano i valori nulli. Ciò vale sia per <code translate="no">=~</code> che per <code translate="no">!~</code>. Se si desidera escludere un pattern regex ma mantenere i valori nulli, aggiungere esplicitamente <code translate="no">OR field IS NULL</code>:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">`message !~ &quot;^DEBUG&quot; OR message IS NULL`</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">r#&quot;message !~ &quot;^DEBUG&quot; OR message IS NULL&quot;#</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">R&quot;(message !~ &quot;^DEBUG&quot; OR message IS NULL)&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;message !~ \&quot;^DEBUG\&quot; OR message IS NULL&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">filter=<span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Percorsi JSON</strong></p>
<p>Per i percorsi JSON, i filtri regex si comportano in modo diverso quando il percorso è assente, nullo o si risolve in un valore non stringa:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Include valori mancanti/null/non stringa?</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>No</td><td>Corrisponde solo ai valori stringa che soddisfano il modello regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sì</td><td>Restituisce le entità in cui il percorso è mancante, nullo, non di tipo stringa o una stringa che non corrisponde al modello regex.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Accelerare la corrispondenza dei pattern con gli indici<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>La corrispondenza dei pattern funziona anche senza un indice scalare. Per le opzioni di accelerazione e le relative condizioni di idoneità, consultare <a href="/docs/it/scalar_index.md#String-pattern-indexes">Selezione degli indici per pattern di stringa</a>. Per gli indici di percorso JSON, verificare i <a href="/docs/it/json-indexing.md#Index-requirements">prerequisiti specifici per JSON</a>.</p>
<div class="alert note">
<p>La pianificazione della query può semplificare un'espressione LIKE senza caratteri jolly in un'uguaglianza, oppure un'espressione regolare semplice con ancoraggio in un'uguaglianza, una corrispondenza di prefisso o di suffisso. Ad esempio, <code translate="no">name =~ &quot;^abc$&quot;</code> diventa un test di uguaglianza e segue il supporto per la ricerca di uguaglianza. Verificare il supporto dell'indice per l'operazione dopo questa semplificazione, non solo per l'operatore scritto nell'espressione originale.</p>
</div>
