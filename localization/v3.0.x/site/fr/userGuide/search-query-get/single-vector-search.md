---
id: single-vector-search.md
title: Recherche vectorielle de base
summary: >-
  Effectuez des recherches ANN de base dans Milvus à l'aide de vecteurs de
  requête, de champs de sortie, de filtres, de plages et d'itérateurs.
---
<h1 id="Basic-Vector-Search" class="common-anchor-header">Recherche vectorielle de base<button data-href="#Basic-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>À partir d'un fichier d'index enregistrant l'ordre trié des représentations vectorielles, la recherche par voisins les plus proches approximatifs (ANN) identifie un sous-ensemble de représentations vectorielles en fonction du vecteur de requête contenu dans une demande de recherche reçue, compare ce vecteur à ceux du sous-ensemble et renvoie les résultats les plus similaires. Grâce à la recherche ANN, Milvus offre une expérience de recherche efficace. Cette page vous aide à apprendre comment effectuer des recherches ANN de base.</p>
<div class="alert note">
<p>Si vous ajoutez de nouveaux champs après la création de la collection, les recherches incluant ces champs renvoient les valeurs par défaut définies ou la valeur « <code translate="no">NULL</code> » pour les entités dont les valeurs n’ont pas été explicitement définies. Pour plus de détails, consultez la section <a href="/docs/fr/add-fields-to-an-existing-collection.md">Modifier le schéma de la collection</a>.</p>
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
    </button></h2><p>La recherche ANN et la recherche k-plus-proches-voisins (kNN) sont les méthodes couramment utilisées dans les recherches de similarité vectorielle. Dans une recherche kNN, vous devez comparer tous les vecteurs d’un espace vectoriel au vecteur de requête transmis dans la demande de recherche avant de déterminer les plus similaires, ce qui est chronophage et gourmand en ressources.</p>
<p>Contrairement aux recherches kNN, un algorithme de recherche ANN nécessite un fichier <strong>d’index</strong> qui enregistre l’ordre trié des représentations vectorielles. Lorsqu’une requête de recherche est reçue, vous pouvez utiliser le fichier d’index comme référence pour localiser rapidement un sous-groupe susceptible de contenir les représentations vectorielles les plus similaires au vecteur de requête. Vous pouvez ensuite utiliser le <strong>type de métrique</strong> spécifié pour mesurer la similarité entre le vecteur de requête et ceux du sous-groupe, trier les éléments du groupe en fonction de leur similarité avec le vecteur de requête, et déterminer les <strong>K</strong> éléments <strong>les plus pertinents</strong> du groupe.</p>
<p>Les recherches ANN s’appuient sur des index pré-construits ; le débit de recherche, l’utilisation de la mémoire et la précision de la recherche peuvent varier en fonction des types d’index que vous choisissez. Vous devez trouver un équilibre entre les performances de recherche et la précision.</p>
<p>Pour réduire la courbe d’apprentissage, Milvus propose <strong>la fonctionnalité AUTOINDEX</strong>. Grâce à <strong>AUTOINDEX</strong>, Milvus peut analyser la distribution des données au sein de votre collection lors de la création de l’index et définir les paramètres d’index les plus optimisés en fonction de cette analyse, afin de trouver un équilibre entre les performances de recherche et la précision.</p>
<p>Dans cette section, vous trouverez des informations détaillées sur les sujets suivants :</p>
<ul>
<li><p><a href="/docs/fr/single-vector-search.md#Single-Vector-Search">Recherche sur un seul vecteur</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Bulk-Vector-Search">Recherche vectorielle en masse</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#ANN-Search-in-Partition">Recherche ANN dans les partitions</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Use-Output-Fields">Utilisation des champs de sortie</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Use-Limit-and-Offset">Utilisation des paramètres « limit » et « offset »</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Use-Level">Utilisation du niveau</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Get-Recall-Rate">Obtenir le taux de rappel</a></p></li>
<li><p><a href="/docs/fr/single-vector-search.md#Enhancing-ANN-Search">Optimisation de la recherche ANN</a></p></li>
</ul>
<h2 id="Single-Vector-Search" class="common-anchor-header">Recherche à vecteur unique<button data-href="#Single-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans les recherches ANN, une recherche à vecteur unique désigne une recherche impliquant un seul vecteur de requête. En fonction de l’index pré-construit et du type de métrique inclus dans la requête de recherche, Milvus identifie les K vecteurs les plus similaires au vecteur de requête.</p>
<p>Dans cette section, vous apprendrez comment effectuer une recherche à vecteur unique. La requête de recherche contient un seul vecteur de requête et demande à Milvus d’utiliser le produit scalaire (IP) pour calculer la similarité entre le vecteur de requête et les vecteurs de la collection, puis de renvoyer les trois vecteurs les plus similaires.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

<span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());
    
<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
token := <span class="hljs-string">&quot;root:Milvus&quot;</span>

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus classe les résultats de recherche par ordre décroissant en fonction de leur score de similarité par rapport au vecteur de requête. Le score de similarité est également appelé « distance par rapport au vecteur de requête », et ses plages de valeurs varient en fonction des types de métriques utilisés.</p>
<p>Le tableau suivant répertorie les types de métriques applicables et les plages de distance correspondantes.</p>
<table>
   <tr>
     <th><p>Type de métrique</p></th>
     <th><p>Caractéristiques</p></th>
     <th><p>Plage de distance</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">L2</code></p></td>
     <td><p>Une valeur plus petite indique une similarité plus élevée.</p></td>
     <td><p>[0, ∞)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">IP</code></p></td>
     <td><p>Une valeur plus élevée indique une plus grande similarité.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">COSINE</code></p></td>
     <td><p>Une valeur plus grande indique une plus grande similitude.</p></td>
     <td><p>[-1, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">JACCARD</code></p></td>
     <td><p>Une valeur plus faible indique une plus grande similitude.</p></td>
     <td><p>[0, 1]</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">HAMMING</code></p></td>
     <td><p>Une valeur plus petite indique une similarité plus élevée.</p></td>
     <td><p>[0, dim(vecteur)]</p></td>
   </tr>
</table>
<h2 id="Bulk-Vector-Search" class="common-anchor-header">Recherche vectorielle en masse<button data-href="#Bulk-Vector-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>De la même manière, vous pouvez inclure plusieurs vecteurs de requête dans une requête de recherche. Milvus effectuera des recherches ANN pour les vecteurs de requête en parallèle et renverra deux ensembles de résultats.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Search with multiple vectors</span>
<span class="hljs-comment"># 7.1. Prepare query vectors</span>
query_vectors = [
    [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>],
    [<span class="hljs-number">0.0039737443</span>, <span class="hljs-number">0.003020432</span>, -<span class="hljs-number">0.0006188639</span>, <span class="hljs-number">0.03913546</span>, -<span class="hljs-number">0.00089768134</span>]
]

<span class="hljs-comment"># 7.2. Start search</span>
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=query_vectors,
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 730,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 333,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 232,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.BaseVector;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

List&lt;BaseVector&gt; queryVectors = Arrays.asList(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.041732933f</span>, <span class="hljs-number">0.013779674f</span>, -<span class="hljs-number">0.027564144f</span>, -<span class="hljs-number">0.013061441f</span>, <span class="hljs-number">0.009748648f</span>}),
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0039737443f</span>, <span class="hljs-number">0.003020432f</span>, -<span class="hljs-number">0.0006188639f</span>, <span class="hljs-number">0.03913546f</span>, -<span class="hljs-number">0.00089768134f</span>})
);
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(queryVectors)
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49548206, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.320147, id=3)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.107413776, id=6)</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5678123, id=6)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.32368967, id=2)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24108477, id=3)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVectors := []entity.Vector{
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}),
    entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>}),
}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    queryVectors,
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Search with multiple vectors</span>
<span class="hljs-keyword">const</span> query_vectors = [
    [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>], 
    [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]
]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">vectors</span>: query_vectors,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//     { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//     { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">//   ],</span>
<span class="hljs-comment">//   [</span>
<span class="hljs-comment">//     { score: 0.04431751370429993, id: &#x27;730&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04231833666563034, id: &#x27;333&#x27; },</span>
<span class="hljs-comment">//     { score: 0.04221535101532936, id: &#x27;232&#x27; },</span>
<span class="hljs-comment">//   ]</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#               &quot;id&quot;: 551</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#               &quot;id&quot;: 296</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#               &quot;id&quot;: 43</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#         ],</span>
<span class="hljs-comment">#         [</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04431751370429993,</span>
<span class="hljs-comment">#               &quot;id&quot;: 730</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04231833666563034,</span>
<span class="hljs-comment">#               &quot;id&quot;: 333</span>
<span class="hljs-comment">#           },</span>
<span class="hljs-comment">#           {</span>
<span class="hljs-comment">#               &quot;distance&quot;: 0.04221535101532936,</span>
<span class="hljs-comment">#               &quot;id&quot;: 232</span>
<span class="hljs-comment">#           }</span>
<span class="hljs-comment">#        ]</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Primary-Key-Search--Milvus-269+" class="common-anchor-header">Recherche par clé primaire<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search--Milvus-269+" class="anchor-icon" translate="no">
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
    </button></h2><p>Au lieu de définir des vecteurs de requête, vous pouvez utiliser des clés primaires si les vecteurs de requête existent déjà dans la collection cible.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// node.js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;ids&quot;: [551, 296, 43],
    &quot;limit&quot;: 3,
    &quot;searchParams&quot;: {
      &quot;metric_type&quot;: &quot;IP&quot;
    }
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="ANN-Search-in-Partition" class="common-anchor-header">Recherche ANN dans une partition<button data-href="#ANN-Search-in-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Supposons que vous ayez créé plusieurs partitions dans une collection et que vous puissiez restreindre la portée de la recherche à un nombre spécifique de partitions. Dans ce cas, vous pouvez inclure les noms des partitions cibles dans la requête de recherche afin de limiter la portée de la recherche aux partitions spécifiées. La réduction du nombre de partitions impliquées dans la recherche améliore les performances de celle-ci.</p>
<p>L'extrait de code suivant part du principe qu’il existe une partition nommée <strong>PartitionA</strong> dans votre collection.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]
res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
<span class="highlighted-wrapper-line">    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {}</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .partitionNames(Collections.singletonList(<span class="hljs-string">&quot;partitionA&quot;</span>))
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.6395302, id=13)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.5408028, id=12)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.49696884, id=17)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithPartitions(<span class="hljs-string">&quot;partitionA&quot;</span>).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>],</span>
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27; },</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; },</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; }</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;partitionNames&quot;: [&quot;partitionA&quot;],
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-Output-Fields" class="common-anchor-header">Utilisation des champs de sortie<button data-href="#Use-Output-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans un résultat de recherche, Milvus inclut par défaut les valeurs des champs principaux ainsi que les distances/scores de similarité des entités contenant les K meilleurs vecteurs d’embeddings. Vous pouvez inclure les noms des champs cibles, qu’il s’agisse de champs vectoriels ou scalaires, dans une requête de recherche en tant que champs de sortie afin que les résultats de recherche contiennent les valeurs provenant d’autres champs de ces entités.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}，
<span class="highlighted-wrapper-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>]</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 43,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;color&quot;</span>))
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=black_9955}, score=0.95944905, id=5)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=red_7319}, score=0.8689616, id=1)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={color=white_5015}, score=0.866088, id=7)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>).FieldData().GetScalars())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color&quot;</span>]</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 0.08821295201778412, id: &#x27;551&#x27;, entity: {&quot;color&quot;: &quot;orange_6781&quot;}},</span>
<span class="hljs-comment">//   { score: 0.0800950899720192, id: &#x27;296&#x27; entity: {&quot;color&quot;: &quot;red_4794&quot;}},</span>
<span class="hljs-comment">//   { score: 0.07794742286205292, id: &#x27;43&#x27; entity: {&quot;color&quot;: &quot;grey_8510&quot;}}</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;outputFields&quot;: [&quot;color&quot;]
}&#x27;</span>

<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;code&quot;: 0,</span>
<span class="hljs-comment">#     &quot;data&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.08821295201778412,</span>
<span class="hljs-comment">#             &quot;id&quot;: 551,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;orange_6781&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.0800950899720192,</span>
<span class="hljs-comment">#             &quot;id&quot;: 296,</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;red_4794&quot;</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.07794742286205292,</span>
<span class="hljs-comment">#             &quot;id&quot;: 43</span>
<span class="hljs-comment">#             &quot;color&quot;: &quot;grey_8510&quot;</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;topks&quot;:[3]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Sort-Search-Results-by-Scalar-Fields--Milvus-30x" class="common-anchor-header">Trier les résultats de recherche par champs scalaires<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Sort-Search-Results-by-Scalar-Fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h2><p>Par défaut, Milvus classe les résultats de recherche en fonction de leur score de similarité par rapport au vecteur de requête. Si vous souhaitez que les entités renvoyées soient classées selon l’ordre des champs scalaires, ajoutez <code translate="no">order_by_fields</code> à la requête de recherche.</p>
<p>Chaque élément de ` <code translate="no">order_by_fields</code> ` spécifie un champ scalaire et un sens de tri. Utilisez ` <code translate="no">&quot;asc&quot;</code> ` pour un ordre croissant ou ` <code translate="no">&quot;desc&quot;</code> ` pour un ordre décroissant. Si vous omettez ` <code translate="no">order</code>`, Milvus trie le champ par ordre croissant.</p>
<p>L'exemple suivant trie les résultats de recherche par <code translate="no">price</code>, du plus petit au plus grand. Incluez le champ de tri dans <code translate="no">output_fields</code> si vous souhaitez inspecter la valeur du champ dans la réponse.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">20</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
<span class="highlighted-comment-line">    order_by_fields=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>}</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez également trier selon plusieurs champs scalaires. Milvus applique les champs dans l’ordre que vous spécifiez. Dans l’exemple suivant, Milvus trie les résultats par « <code translate="no">price</code> » dans l’ordre croissant. Pour les entités ayant la même valeur « <code translate="no">price</code> », Milvus trie ensuite par « <code translate="no">rating</code> » dans l’ordre décroissant.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    data=query_vectors,
    anns_field=<span class="hljs-string">&quot;embedding&quot;</span>,
    limit=<span class="hljs-number">20</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;category&quot;</span>],
<span class="highlighted-comment-line">    order_by_fields=[</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;price&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;asc&quot;</span>},</span>
<span class="highlighted-comment-line">        {<span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;rating&quot;</span>, <span class="hljs-string">&quot;order&quot;</span>: <span class="hljs-string">&quot;desc&quot;</span>},</span>
<span class="highlighted-comment-line">    ],</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour les entités présentant les mêmes valeurs dans tous les champs de tri spécifiés, Milvus conserve l’ordre d’origine basé sur le score de similarité.</p>
<h2 id="Use-Limit-and-Offset" class="common-anchor-header">Utilisation de Limit et Offset<button data-href="#Use-Limit-and-Offset" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous remarquerez peut-être que le paramètre « <code translate="no">limit</code> » inclus dans les requêtes de recherche détermine le nombre d’entités à inclure dans les résultats de recherche. Ce paramètre spécifie le nombre maximal d’entités à renvoyer lors d’une seule recherche ; il est généralement appelé « <strong>top-K</strong> ».</p>
<p>Si vous souhaitez effectuer des requêtes paginées, vous pouvez utiliser une boucle pour envoyer plusieurs requêtes de recherche, en incluant les paramètres <strong>« Limit »</strong> et <strong>« Offset »</strong> dans chaque requête. Plus précisément, vous pouvez définir le paramètre <strong>« Limit »</strong> sur le nombre d’entités que vous souhaitez inclure dans les résultats de la requête en cours, et définir le <strong>paramètre « Offset »</strong> sur le nombre total d’entités qui ont déjà été renvoyées.</p>
<p>Le tableau ci-dessous présente comment définir les paramètres « <strong>Limit</strong> » et « <strong>Offset</strong> » pour les requêtes paginées lorsque 100 entités sont renvoyées à la fois.</p>
<table>
   <tr>
     <th><p>Requêtes</p></th>
     <th><p>Entités à renvoyer par requête</p></th>
     <th><p>Nombre total d’entités déjà renvoyées</p></th>
   </tr>
   <tr>
     <td><p><strong>1re</strong> requête</p></td>
     <td><p>100</p></td>
     <td><p>0</p></td>
   </tr>
   <tr>
     <td><p>La <strong>2e</strong> requête</p></td>
     <td><p>100</p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p>La <strong>3e</strong> requête</p></td>
     <td><p>100</p></td>
     <td><p>200</p></td>
   </tr>
   <tr>
     <td><p>La <strong>n-ième</strong> requête</p></td>
     <td><p>100</p></td>
     <td><p>100 × (n-1)</p></td>
   </tr>
</table>
<p>Notez que la somme de <code translate="no">limit</code> et <code translate="no">offset</code> lors d'une seule recherche ANN doit être inférieure à 16 384.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Single vector search</span>
query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># The number of results to return</span>
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;offset&quot;</span>: <span class="hljs-number">10</span> <span class="hljs-comment"># The records to skip</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp

<span class="hljs-type">FloatVec</span> <span class="hljs-variable">queryVector</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3580376395471989f</span>, -<span class="hljs-number">0.6023495712049978f</span>, <span class="hljs-number">0.18414012509913835f</span>, -<span class="hljs-number">0.26286205330961354f</span>, <span class="hljs-number">0.9029438446296592f</span>});
<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
        .data(Collections.singletonList(queryVector))
        .topK(<span class="hljs-number">3</span>)
        .offset(<span class="hljs-number">10</span>)
        .build();

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);

List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (List&lt;SearchResp.SearchResult&gt; results : searchResults) {
    System.out.println(<span class="hljs-string">&quot;TopK results:&quot;</span>);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// TopK results:</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.24120237, id=16)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=0.22559784, id=9)</span>
<span class="hljs-comment">// SearchResp.SearchResult(entity={}, score=-0.09906838, id=2)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.3580376395471989</span>, <span class="hljs-number">-0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, <span class="hljs-number">-0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithOffset(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs.FieldData().GetScalars())
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Single vector search</span>
<span class="hljs-keyword">var</span> query_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>],

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">data</span>: query_vector,
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// The number of results to return,</span>
<span class="highlighted-wrapper-line">    <span class="hljs-attr">offset</span>: <span class="hljs-number">10</span> <span class="hljs-comment">// The record to skip.</span></span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;quick_setup&quot;,
    &quot;data&quot;: [
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]
    ],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;limit&quot;: 3,
    &quot;offset&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Temporarily-set-a-timezone-for-a-search" class="common-anchor-header">Définir temporairement un fuseau horaire pour une recherche<button data-href="#Temporarily-set-a-timezone-for-a-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Si votre collection dispose d’un champ « <code translate="no">TIMESTAMPTZ</code> », vous pouvez temporairement remplacer le fuseau horaire par défaut de la base de données ou de la collection pour une opération unique en définissant le paramètre « <code translate="no">timezone</code> » dans l’appel de recherche. Cela contrôle la manière dont les valeurs « <code translate="no">TIMESTAMPTZ</code> » sont affichées et comparées pendant l’opération.</p>
<p>La valeur de <code translate="no">timezone</code> doit être un <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">identifiant de fuseau horaire IANA</a> valide (par exemple, <strong>Asia/Shanghai</strong>, <strong>America/Chicago</strong> ou <strong>UTC</strong>). Pour plus de détails sur l’utilisation du champ <code translate="no">TIMESTAMPTZ</code>, reportez-vous à <a href="/docs/fr/timestamptz-field.md">la section Champ TIMESTAMPTZ</a>.</p>
<p>L'exemple ci-dessous montre comment définir temporairement un fuseau horaire pour une opération de recherche :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
<span class="highlighted-wrapper-line">    timezone=<span class="hljs-string">&quot;America/Havana&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// js</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<span class="hljs-built_in">export</span> QUERY_VECTOR=<span class="hljs-string">&#x27;[0.1, 0.2, 0.3, 0.4]&#x27;</span>

curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;annsField&quot;: &quot;vector&quot;,
  &quot;data&quot;: [&#x27;</span><span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span><span class="hljs-string">&#x27;],
  &quot;limit&quot;: 3,
  &quot;searchParams&quot;: {
    &quot;metric_type&quot;: &quot;IP&quot;,
    &quot;timezone&quot;: &quot;America/Havana&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Enhancing-ANN-Search" class="common-anchor-header">Optimisation de la recherche ANN<button data-href="#Enhancing-ANN-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>AUTOINDEX simplifie considérablement la prise en main des recherches ANN. Cependant, les résultats de recherche peuvent ne pas toujours être corrects à mesure que le top-K augmente. En réduisant le champ de recherche, en améliorant la pertinence des résultats et en diversifiant ces derniers, Milvus propose les améliorations de recherche suivantes.</p>
<ul>
<li><p>Recherche filtrée</p>
<p>Vous pouvez inclure des conditions de filtrage dans une requête de recherche afin que Milvus effectue un filtrage des métadonnées avant de lancer les recherches ANN, réduisant ainsi le champ de recherche de l’ensemble de la collection aux seules entités correspondant aux conditions de filtrage spécifiées.</p>
<p>Pour en savoir plus sur le filtrage des métadonnées et les conditions de filtrage, consultez les rubriques « <a href="/docs/fr/filtered-search.md">Recherche filtrée</a> », « <a href="/docs/fr/boolean.md">Explication du filtrage</a> » et les rubriques associées.</p></li>
<li><p>Recherche par plage</p>
<p>Vous pouvez améliorer la pertinence des résultats de recherche en limitant la distance ou le score des entités renvoyées à une plage spécifique. Dans Milvus, une recherche par plage consiste à tracer deux cercles concentriques dont le centre est le vecteur d'embedding le plus similaire au vecteur de requête. La requête de recherche spécifie le rayon des deux cercles, et Milvus renvoie tous les vecteurs d'embedding qui se trouvent à l'intérieur du cercle extérieur mais pas à l'intérieur du cercle intérieur.</p>
<p>Pour en savoir plus sur la recherche par plage, consultez la section « <a href="/docs/fr/range-search.md">Recherche par plage</a> ».</p></li>
<li><p>Recherche par regroupement</p>
<p>Si les entités renvoyées présentent la même valeur dans un champ spécifique, les résultats de recherche peuvent ne pas refléter la distribution de toutes les représentations vectorielles dans l’espace vectoriel. Pour diversifier les résultats de recherche, envisagez d’utiliser la recherche par regroupement.</p>
<p>Pour en savoir plus sur la recherche par regroupement, consultez la section <a href="/docs/fr/grouping-search.md">Recherche par regroupement</a>,</p></li>
<li><p>Recherche hybride</p>
<p>Une collection peut inclure plusieurs champs vectoriels afin de stocker les représentations vectorielles générées à l’aide de différents modèles de représentation. Cela vous permet d’utiliser une recherche hybride pour reclasser les résultats de recherche issus de ces champs vectoriels, améliorant ainsi le taux de rappel.</p>
<p>Pour en savoir plus sur la recherche hybride, consultez la section « <a href="/docs/fr/multi-vector-search.md">Recherche hybride</a> ».</p></li>
<li><p>Itérateur de recherche</p>
<p>Une recherche ANN unique renvoie au maximum 16 384 entités. Envisagez d’utiliser des itérateurs de recherche si vous avez besoin de renvoyer davantage d’entités lors d’une seule recherche.</p>
<p>Pour plus de détails sur les itérateurs de recherche, consultez la section <a href="/docs/fr/with-iterators.md">Itérateur de recherche</a>.</p></li>
<li><p>Recherche en texte intégral</p>
<p>La recherche en texte intégral est une fonctionnalité qui permet de récupérer des documents contenant des termes ou des expressions spécifiques dans des ensembles de données textuelles, puis de classer les résultats en fonction de leur pertinence. Cette fonctionnalité pallie les limites de la recherche sémantique, qui peut passer à côté de termes précis, vous garantissant ainsi d’obtenir les résultats les plus précis et les plus pertinents d’un point de vue contextuel. De plus, elle simplifie les recherches vectorielles en acceptant la saisie de texte brut, convertissant automatiquement vos données textuelles en représentations vectorielles clairsemées sans qu’il soit nécessaire de générer manuellement ces représentations.</p>
<p>Pour plus de détails sur la recherche en texte intégral, consultez la section « <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a> ».</p></li>
<li><p>Correspondance de texte</p>
<p>La correspondance par mot-clé dans Milvus permet une récupération précise de documents en fonction de termes spécifiques. Cette fonctionnalité est principalement utilisée pour la recherche filtrée afin de répondre à des conditions spécifiques et peut intégrer un filtrage scalaire pour affiner les résultats de la requête, permettant ainsi des recherches par similarité au sein de vecteurs répondant à des critères scalaires.</p>
<p>Pour plus de détails sur la correspondance par mot-clé, consultez la section « <a href="/docs/fr/keyword-match.md">Correspondance par mot-clé</a> ».</p></li>
<li><p>Utilisation de la clé de partition</p>
<p>L'implication de plusieurs champs scalaires dans le filtrage des métadonnées et l'utilisation d'une condition de filtrage assez complexe peuvent nuire à l'efficacité de la recherche. Une fois que vous avez défini un champ scalaire comme clé de partition et que vous utilisez une condition de filtrage impliquant cette clé de partition dans la requête de recherche, cela permet de restreindre le champ de recherche aux partitions correspondant aux valeurs spécifiées de la clé de partition.</p>
<p>Pour plus de détails sur la clé de partition, reportez-vous à la section « <a href="/docs/fr/use-partition-key.md">Utilisation de la clé de partition</a> ».</p></li>
<li><p>Utilisation de mmap</p>
<p>Pour plus d'informations sur les paramètres mmap, consultez la section « <a href="/docs/fr/mmap.md">Utilisation</a> de <a href="/docs/fr/mmap.md">mmap</a> ».</p></li>
<li><p>Compactage par grappes</p>
<p>Pour plus d’informations sur les compactages par regroupement, consultez la section « <a href="/docs/fr/clustering-compaction.md">Compactage par regroupement</a> ».</p></li>
<li><p>Utilisation du reclassement</p>
<p>Pour plus d'informations sur l'utilisation des classificateurs afin d'améliorer la pertinence des résultats de recherche, consultez les sections « <a href="/docs/fr/decay-ranker-overview.md">Présentation du classificateur Decay</a> » et « <a href="/docs/fr/model-ranker-overview.md">Présentation du classificateur Model</a> ».</p></li>
</ul>
