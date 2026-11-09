---
id: filtering-templating.md
title: Modèles de filtres
summary: >-
  Dans Milvus, les expressions de filtrage complexes comportant de nombreux
  éléments, en particulier celles contenant des caractères non ASCII tels que
  les caractères CJK, peuvent avoir un impact significatif sur les performances
  des requêtes. Pour remédier à cela, Milvus introduit un mécanisme de modèles
  d’expressions de filtrage conçu pour améliorer l’efficacité en réduisant le
  temps consacré à l’analyse syntaxique des expressions complexes. Cette page
  explique comment utiliser les modèles d’expressions de filtrage dans les
  opérations de recherche, de requête et de suppression.
---
<h1 id="Filter-Templating" class="common-anchor-header">Modèles de filtres<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, les expressions de filtrage complexes comportant de nombreux éléments, en particulier celles contenant des caractères non ASCII tels que les caractères CJK, peuvent considérablement affecter les performances des requêtes. Pour remédier à cela, Milvus introduit un mécanisme de modèles d’expressions de filtrage conçu pour améliorer l’efficacité en réduisant le temps consacré à l’analyse syntaxique des expressions complexes. Cette page explique comment utiliser les modèles d’expressions de filtrage dans les opérations de recherche, de requête et de suppression.</p>
<div class="alert note">
<p>Le littéral situé à gauche d’une expression de filtrage peut être soit le nom d’un champ de collection, tel que <code translate="no">age</code>, <code translate="no">city</code>, etc., utilisé dans les exemples ci-dessous, soit le nom d’un sous-champ StructArray à un index d’élément spécifique, comme dans <code translate="no">filter = 'struct[0][subfield] &gt; {var}'</code>.</p>
<p>Pour plus de détails sur le filtrage scalaire dans un champ StructArray, reportez-vous à la section <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Les modèles d’expressions de filtrage vous permettent de créer des expressions de filtrage avec des espaces réservés qui sont remplacés dynamiquement par des valeurs lors de l’exécution de la requête. Grâce à ces modèles, vous évitez d’intégrer directement de grands tableaux ou des expressions complexes dans le filtre, ce qui réduit le temps d’analyse et améliore les performances de la requête.</p>
<p>Supposons que vous ayez une expression de filtrage impliquant deux champs, <code translate="no">age</code> et <code translate="no">city</code>, et que vous souhaitiez trouver toutes les personnes âgées de plus de 25 ans et résidant soit à « 北京 » (Pékin), soit à « 上海 » (Shanghai). Au lieu d’intégrer directement les valeurs dans l’expression de filtrage, vous pouvez utiliser un modèle :</p>
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
<p>Ici, <code translate="no">{age}</code> et <code translate="no">{city}</code> sont des espaces réservés qui seront remplacés par les valeurs réelles de <code translate="no">filter_params</code> lors de l’exécution de la requête.</p>
<p>L’utilisation de modèles d’expressions de filtrage dans Milvus présente plusieurs avantages clés :</p>
<ul>
<li><p><strong>Réduction du temps d’analyse</strong>: en remplaçant les expressions de filtrage volumineuses ou complexes par des espaces réservés, le système passe moins de temps à analyser et à traiter le filtre.</p></li>
<li><p><strong>Amélioration des performances des requêtes</strong>: grâce à la réduction de la charge liée à l’analyse, les performances des requêtes s’améliorent, ce qui se traduit par un QPS plus élevé et des temps de réponse plus courts.</p></li>
<li><p><strong>Évolutivité</strong>: à mesure que vos ensembles de données s’étoffent et que les expressions de filtrage gagnent en complexité, les modèles garantissent que les performances restent efficaces et évolutives.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Opérations de recherche<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les opérations de recherche dans Milvus, l’expression ` <code translate="no">filter</code> ` est utilisée pour définir la condition de filtrage, et le paramètre ` <code translate="no">filter_params</code> ` sert à spécifier les valeurs des espaces réservés. Le dictionnaire ` <code translate="no">filter_params</code> ` contient les valeurs dynamiques que Milvus utilisera pour remplacer les espaces réservés dans l’expression de filtrage.</p>
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
<p>Dans cet exemple, Milvus remplacera dynamiquement <code translate="no">{age}</code> par <code translate="no">25</code> et <code translate="no">{city}</code> par <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> lors de l’exécution de la recherche.</p>
<h2 id="Query-Operations" class="common-anchor-header">Opérations de requête<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Le même mécanisme de modèles peut être appliqué aux opérations de requête dans Milvus. Dans la fonction <code translate="no">query</code>, vous définissez l’expression de filtrage et utilisez <code translate="no">filter_params</code> pour spécifier les valeurs à substituer.</p>
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
<p>Grâce à l’utilisation de ` <code translate="no">filter_params</code>`, Milvus gère efficacement l’insertion dynamique de valeurs, ce qui améliore la vitesse d’exécution des requêtes.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Opérations de suppression<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez également utiliser les modèles d’expression de filtrage dans les opérations de suppression. Comme pour la recherche et les requêtes, l’expression <code translate="no">filter</code> définit les conditions, et l’ <code translate="no">filter_params</code> fournit les valeurs dynamiques pour les espaces réservés.</p>
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
<p>Cette approche améliore les performances des opérations de suppression, en particulier lorsqu’il s’agit de conditions de filtrage complexes.</p>
<h2 id="Regex-filter-templates" class="common-anchor-header">Modèles de filtres Regex<button data-href="#Regex-filter-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser les modèles d’expressions de filtrage avec des filtres Regex. Cela s’avère utile lorsque le motif Regex est fourni au moment de la requête.</p>
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
<p>Vous pouvez également utiliser des paramètres de modèle avec <code translate="no">!~</code>:</p>
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
<p>La valeur du modèle doit être une chaîne de caractères contenant un motif d'expression régulière RE2 valide. Milvus valide le motif avant d'exécuter le filtre.</p>
<p>Les modèles de filtre transmettent le motif d’expression régulière en tant que valeur au lieu de l’intégrer dans l’expression du filtre. Cela réduit la charge liée à l’analyse syntaxique de l’expression et évite de modifier accidentellement la structure du filtre lorsque le motif contient des guillemets ou des opérateurs.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>L'utilisation de modèles d'expressions de filtrage est un outil essentiel pour optimiser les performances des requêtes dans Milvus. En utilisant des espaces réservés et le dictionnaire ` <code translate="no">filter_params</code> `, vous pouvez réduire considérablement le temps consacré à l'analyse syntaxique d'expressions de filtrage complexes. Cela se traduit par une exécution plus rapide des requêtes et de meilleures performances globales.</p>
