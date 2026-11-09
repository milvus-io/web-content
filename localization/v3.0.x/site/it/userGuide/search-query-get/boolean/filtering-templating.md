---
id: filtering-templating.md
title: Modelli di filtro
summary: >-
  In Milvus, le espressioni di filtro complesse con numerosi elementi, in
  particolare quelle che includono caratteri non ASCII come i caratteri CJK,
  possono influire in modo significativo sulle prestazioni delle query. Per
  ovviare a questo problema, Milvus introduce un meccanismo di templatizzazione
  delle espressioni di filtro progettato per migliorare l'efficienza riducendo
  il tempo impiegato per l'analisi sintattica delle espressioni complesse.
  Questa pagina illustra come utilizzare la templatizzazione delle espressioni
  di filtro nelle operazioni di ricerca, query ed eliminazione.
---
<h1 id="Filter-Templating" class="common-anchor-header">Modelli di filtro<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>In Milvus, le espressioni di filtro complesse con numerosi elementi, in particolare quelle che includono caratteri non ASCII come i caratteri CJK, possono influire in modo significativo sulle prestazioni delle query. Per ovviare a questo problema, Milvus introduce un meccanismo di modelli per le espressioni di filtro progettato per migliorare l'efficienza riducendo il tempo impiegato per l'analisi delle espressioni complesse. Questa pagina illustra l'utilizzo dei modelli per le espressioni di filtro nelle operazioni di ricerca, query ed eliminazione.</p>
<div class="alert note">
<p>Il letterale sul lato sinistro di un'espressione di filtro può essere sia il nome di un campo di una collezione, come <code translate="no">age</code>, <code translate="no">city</code>, ecc., utilizzato negli esempi riportati di seguito, sia il nome di un sottocampo di StructArray a un indice specifico dell'elemento, come in <code translate="no">filter = 'struct[0][subfield] &gt; {var}'</code>.</p>
<p>Per ulteriori dettagli sul filtraggio scalare in un campo StructArray, consultare <a href="/docs/it/struct-array-operators.md">Operatori StructArray</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Panoramica<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>I modelli di espressioni di filtro consentono di creare espressioni di filtro con segnaposto che vengono sostituiti dinamicamente con valori durante l’esecuzione della query. Utilizzando i modelli, si evita di incorporare array di grandi dimensioni o espressioni complesse direttamente nel filtro, riducendo il tempo di analisi e migliorando le prestazioni della query.</p>
<p>Supponiamo di avere un’espressione di filtro che coinvolge due campi, <code translate="no">age</code> e <code translate="no">city</code>, e di voler trovare tutte le persone di età superiore ai 25 anni che vivono a “北京” (Pechino) o a “上海” (Shanghai). Anziché incorporare direttamente i valori nell’espressione di filtro, è possibile utilizzare un modello:</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filterTemplates := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;age&quot;</span>:  <span class="hljs-number">25</span>,
    <span class="hljs-string">&quot;city&quot;</span>: []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>},
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> filter = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>

filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo caso, <code translate="no">{age}</code> e <code translate="no">{city}</code> sono segnaposto che verranno sostituiti con i valori effettivi presenti in <code translate="no">filter_params</code> al momento dell’esecuzione della query.</p>
<p>L'utilizzo dei modelli di espressioni di filtro in Milvus offre diversi vantaggi chiave:</p>
<ul>
<li><p><strong>Tempo di analisi ridotto</strong>: sostituendo espressioni di filtro grandi o complesse con segnaposto, il sistema impiega meno tempo nell’analisi e nell’elaborazione del filtro.</p></li>
<li><p><strong>Migliori prestazioni delle query</strong>: grazie alla riduzione del carico di analisi, le prestazioni delle query migliorano, con un conseguente aumento del QPS e tempi di risposta più rapidi.</p></li>
<li><p><strong>Scalabilità</strong>: man mano che i set di dati crescono e le espressioni di filtro diventano più complesse, l’uso dei modelli garantisce che le prestazioni rimangano efficienti e scalabili.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Operazioni di ricerca<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Per le operazioni di ricerca in Milvus, l’espressione ` <code translate="no">filter</code> ` viene utilizzata per definire la condizione di filtraggio, mentre il parametro ` <code translate="no">filter_params</code> ` serve a specificare i valori per i segnaposto. Il dizionario ` <code translate="no">filter_params</code> ` contiene i valori dinamici che Milvus utilizzerà per sostituire i segnaposto nell’espressione di filtro.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>})))
        .filter(expr)
        .topK(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">10</span>,             <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>})},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}).
    WithOutputFields(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]]))
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>})
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates))
                         .<span class="hljs-built_in">AddFloatVector</span>({<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>});

milvus::SearchResponse searchResponse;
client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>]],
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span> })],
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    MetricType = MetricType.Cosine,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Expression = expr,
        OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
            [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;data&quot;: [[0.1, 0.2]],
      &quot;annsField&quot;: &quot;vector&quot;,
      &quot;limit&quot;: 10,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]},
      &quot;outputFields&quot;: [&quot;age&quot;, &quot;city&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>In questo esempio, durante l’esecuzione della ricerca Milvus sostituirà dinamicamente <code translate="no">{age}</code> con <code translate="no">25</code> e <code translate="no">{city}</code> con <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code>.</p>
<h2 id="Query-Operations" class="common-anchor-header">Operazioni di query<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Lo stesso meccanismo di template può essere applicato alle operazioni di query in Milvus. Nella funzione <code translate="no">query</code>, si definisce l’espressione di filtro e si utilizza <code translate="no">filter_params</code> per specificare i valori da sostituire.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}).
    WithOutputFields(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> queryRequest = milvus::<span class="hljs-built_in">QueryRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>})
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::QueryResponse queryResponse;
client-&gt;<span class="hljs-built_in">Query</span>(queryRequest, queryResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
            [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]},
      &quot;outputFields&quot;: [&quot;age&quot;, &quot;city&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Utilizzando ` <code translate="no">filter_params</code>`, Milvus gestisce in modo efficiente l’inserimento dinamico dei valori, migliorando la velocità di esecuzione delle query.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Operazioni di eliminazione<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile utilizzare i modelli di espressione di filtro anche nelle operazioni di eliminazione. Analogamente alla ricerca e alle query, l’espressione <code translate="no">filter</code> definisce le condizioni, mentre l’ <code translate="no">filter_params</code> fornisce i valori dinamici per i segnaposto.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.DeleteReq;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>);
filterTemplateValues.put(<span class="hljs-string">&quot;city&quot;</span>, Arrays.asList(<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>));

<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">deleteReq</span> <span class="hljs-operator">=</span> DeleteReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .filterTemplateValues(filterTemplateValues)
        .build();

client.delete(deleteReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>

result, err := client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithExpr(expr).
    WithTemplateParam(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>).
    WithTemplateParam(<span class="hljs-string">&quot;city&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>}))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;age&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">25</span>)),
    (<span class="hljs-string">&quot;city&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">StringArray</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-string">&quot;北京&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;上海&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()])),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">delete</span>(
        DeleteRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>},
    {<span class="hljs-string">&quot;city&quot;</span>, nlohmann::json::<span class="hljs-built_in">array</span>({<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>})}
};

<span class="hljs-keyword">auto</span> deleteRequest = milvus::<span class="hljs-built_in">DeleteRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::DeleteResponse deleteResponse;
client-&gt;<span class="hljs-built_in">Delete</span>(deleteRequest, deleteResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">city</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>] };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
    [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
};

<span class="hljs-keyword">await</span> client.DeleteAsync(<span class="hljs-keyword">new</span> DeleteReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    FilterTemplates =
    {
        [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25</span>,
        [<span class="hljs-string">&quot;city&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span> }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/delete&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;age &gt; {age} AND city IN {city}&quot;,
      &quot;exprParams&quot;: {&quot;age&quot;: 25, &quot;city&quot;: [&quot;北京&quot;, &quot;上海&quot;]}
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Questo approccio migliora le prestazioni delle operazioni di eliminazione, specialmente quando si ha a che fare con condizioni di filtro complesse.</p>
<h2 id="Regex-filter-templates" class="common-anchor-header">Modelli di filtro Regex<button data-href="#Regex-filter-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>È possibile utilizzare i modelli di espressione di filtro con i filtri regex. Ciò è utile quando il pattern regex viene fornito al momento della richiesta.</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>
filter_params = {<span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>],
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>);

<span class="hljs-type">QueryReq</span> <span class="hljs-variable">queryReq</span> <span class="hljs-operator">=</span> QueryReq.builder()
        .collectionName(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;message&quot;</span>))
        .filterTemplateValues(filterTemplateValues)
        .build();

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">queryResp</span> <span class="hljs-operator">=</span> client.query(queryReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

expr := <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption(<span class="hljs-string">&quot;hello_milvus&quot;</span>).
    WithFilter(expr).
    WithTemplateParam(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;message&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;pattern&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;E[0-9]{4}&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())),
]);

<span class="hljs-keyword">let</span> <span class="hljs-variable">res</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
            .<span class="hljs-title function_ invoke__">filter</span>(expr)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;message&quot;</span>])
            .<span class="hljs-title function_ invoke__">filter_templates</span>(filter_templates)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>}
};

<span class="hljs-keyword">auto</span> queryRequest = milvus::<span class="hljs-built_in">QueryRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
                         .<span class="hljs-built_in">WithFilter</span>(expr)
                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;message&quot;</span>})
                         .<span class="hljs-built_in">WithFilterTemplates</span>(std::<span class="hljs-built_in">move</span>(filterTemplates));

milvus::QueryResponse queryResponse;
client-&gt;<span class="hljs-built_in">Query</span>(queryRequest, queryResponse);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">pattern</span>: <span class="hljs-string">&quot;E[0-9]{4}&quot;</span> };

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;message&quot;</span>],
    exprValues
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

<span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;message =~ {pattern}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>
};

QueryResp res = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    Expression = expr,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;message&quot;</span> },
        FilterTemplates =
        {
            [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;E[0-9]{4}&quot;</span>
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;message =~ {pattern}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;pattern&quot;: &quot;E[0-9]{4}&quot;}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
      &quot;collectionName&quot;: &quot;hello_milvus&quot;,
      &quot;filter&quot;: &quot;message =~ {pattern}&quot;,
      &quot;exprParams&quot;: {&quot;pattern&quot;: &quot;E[0-9]{4}&quot;},
      &quot;outputFields&quot;: [&quot;message&quot;]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>È inoltre possibile utilizzare i parametri dei modelli con ` <code translate="no">!~</code>`:</p>
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
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filter_params = {<span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span>}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
Map&lt;String, Object&gt; filterTemplateValues = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
filterTemplateValues.put(<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;^DEBUG&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filterTemplates := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]any{
    <span class="hljs-string">&quot;pattern&quot;</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span>,
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">let</span> <span class="hljs-variable">expr</span> = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">let</span> <span class="hljs-variable">filter_templates</span>: HashMap&lt;<span class="hljs-type">String</span>, FilterTemplateValue&gt; = HashMap::<span class="hljs-title function_ invoke__">from</span>([
    (<span class="hljs-string">&quot;pattern&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), FilterTemplateValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;^DEBUG&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>())),
]);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::string expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
std::unordered_map&lt;std::string, nlohmann::json&gt; filterTemplates = {
    {<span class="hljs-string">&quot;pattern&quot;</span>, <span class="hljs-string">&quot;^DEBUG&quot;</span>}
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">const</span> exprValues = { <span class="hljs-attr">pattern</span>: <span class="hljs-string">&quot;^DEBUG&quot;</span> };
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-built_in">string</span> expr = <span class="hljs-string">&quot;message !~ {pattern}&quot;</span>;
<span class="hljs-keyword">var</span> filterParams = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>&gt;
{
    [<span class="hljs-string">&quot;pattern&quot;</span>] = <span class="hljs-string">&quot;^DEBUG&quot;</span>
};
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
filter=<span class="hljs-string">&quot;message !~ {pattern}&quot;</span>
filter_params=<span class="hljs-string">&#x27;{&quot;pattern&quot;: &quot;^DEBUG&quot;}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Il valore del template deve essere una stringa contenente un pattern RE2 valido. Milvus convalida il pattern prima di eseguire il filtro.</p>
<p>I modelli di filtro passano il pattern regex come valore invece di concatenarlo nell’espressione del filtro. Ciò riduce il sovraccarico di analisi dell’espressione ed evita di modificare accidentalmente la struttura del filtro quando il pattern contiene virgolette o operatori.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>L’uso dei modelli nelle espressioni di filtro è uno strumento essenziale per ottimizzare le prestazioni delle query in Milvus. Utilizzando i segnaposto e il dizionario ` <code translate="no">filter_params</code> `, è possibile ridurre significativamente il tempo impiegato per l’analisi sintattica di espressioni di filtro complesse. Ciò porta a un’esecuzione più veloce delle query e a migliori prestazioni complessive.</p>
