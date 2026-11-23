---
id: vllm-ranker.md
title: vLLM RankerCompatible with Milvus 2.6.x
summary: >-
  Le vLLM Ranker s'appuie sur le cadre d'inférence vLLM pour améliorer la
  pertinence des résultats de recherche grâce à un reclassement sémantique. Il
  s'agit d'une approche avancée du classement des résultats de recherche qui va
  au-delà de la similitude vectorielle traditionnelle.
beta: Milvus 2.6.x
---
<h1 id="vLLM-Ranker" class="common-anchor-header">vLLM Ranker<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#vLLM-Ranker" class="anchor-icon" translate="no">
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
    </button></h1><p>Le vLLM Ranker s'appuie sur le framework d'inférence <a href="https://docs.vllm.ai/en/latest/index.html">vLLM</a> pour améliorer la pertinence des résultats de recherche grâce à un reclassement sémantique. Il s'agit d'une approche avancée du classement des résultats de recherche qui va au-delà de la similitude vectorielle traditionnelle.</p>
<p>Le vLLM Ranker est particulièrement utile pour les applications où la précision et le contexte sont essentiels, telles que :</p>
<ul>
<li><p>La recherche dans la documentation technique nécessitant une compréhension approfondie des concepts</p></li>
<li><p>Les bases de données de recherche où les relations sémantiques priment sur la correspondance des mots-clés</p></li>
<li><p>Les systèmes d’assistance client qui doivent associer les problèmes des utilisateurs à des solutions pertinentes</p></li>
<li><p>La recherche dans le commerce en ligne, qui doit comprendre les caractéristiques des produits et l’intention de l’utilisateur</p></li>
</ul>
<h2 id="Prerequisites" class="common-anchor-header">Prérequis<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant de mettre en œuvre vLLM Ranker dans Milvus, assurez-vous de disposer des éléments suivants :</p>
<ul>
<li><p>Une collection Milvus comportant un champ « <code translate="no">VARCHAR</code> » contenant le texte à reclassifier</p></li>
<li><p>Un service vLLM opérationnel doté de capacités de reclassement. Pour obtenir des instructions détaillées sur la configuration d’un service vLLM, consultez la <a href="https://docs.vllm.ai/en/latest/getting_started/installation.html">documentation officielle de vLLM</a>. Pour vérifier la disponibilité du service vLLM :</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Replace YOUR_VLLM_ENDPOINT_URL with the actual URL (e.g., http://&lt;service-ip&gt;:&lt;port&gt;/v1/rerank)</span>
<span class="hljs-comment"># Replace &#x27;BAAI/bge-reranker-base&#x27; if you deployed a different model</span>

curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;YOUR_VLLM_ENDPOINT_URL&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
  &quot;model&quot;: &quot;BAAI/bge-reranker-base&quot;,
  &quot;query&quot;: &quot;What is the capital of France?&quot;,
  &quot;documents&quot;: [
    &quot;The capital of Brazil is Brasilia.&quot;,
    &quot;The capital of France is Paris.&quot;,
    &quot;Horses and cows are both animals&quot;
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une réponse réussie doit renvoyer les documents classés par score de pertinence, à l’instar de la réponse de l’API de reclassement d’OpenAI.</p>
<p>Consultez la <a href="https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#re-rank-api">documentation du serveur vLLM compatible OpenAI</a> pour plus d’arguments et d’options de serveur.</p></li>
</ul>
<h2 id="Create-a-vLLM-ranker-function" class="common-anchor-header">Créer une fonction de classement vLLM<button data-href="#Create-a-vLLM-ranker-function" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser vLLM Ranker dans votre application Milvus, créez un objet Function qui spécifie le fonctionnement du reclassement. Cette fonction sera transmise aux opérations de recherche Milvus afin d’améliorer le classement des résultats.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, Function, FunctionType

<span class="hljs-comment"># Connect to your Milvus server</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>  <span class="hljs-comment"># Replace with your Milvus server URI</span>
)

<span class="hljs-comment"># Create a vLLM Ranker function</span>
vllm_ranker = Function(
    name=<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>,    <span class="hljs-comment"># Choose a descriptive name</span>
    input_field_names=[<span class="hljs-string">&quot;document&quot;</span>],  <span class="hljs-comment"># Field containing text to rerank</span>
    function_type=FunctionType.RERANK,  <span class="hljs-comment"># Must be RERANK</span>
    params={
        <span class="hljs-string">&quot;reranker&quot;</span>: <span class="hljs-string">&quot;model&quot;</span>,        <span class="hljs-comment"># Specifies model-based reranking</span>
        <span class="hljs-string">&quot;provider&quot;</span>: <span class="hljs-string">&quot;vllm&quot;</span>,         <span class="hljs-comment"># Specifies vLLM service</span>
        <span class="hljs-string">&quot;queries&quot;</span>: [<span class="hljs-string">&quot;renewable energy developments&quot;</span>],  <span class="hljs-comment"># Query text</span>
        <span class="hljs-string">&quot;endpoint&quot;</span>: <span class="hljs-string">&quot;http://localhost:8080&quot;</span>,  <span class="hljs-comment"># vLLM service address</span>
        <span class="hljs-string">&quot;max_client_batch_size&quot;</span>: <span class="hljs-number">32</span>,              <span class="hljs-comment"># Optional: batch size</span>
        <span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>: <span class="hljs-number">256</span>,  <span class="hljs-comment"># Optional: Use last 256 tokens</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.common.clientenum.FunctionType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build());

CreateCollectionReq.<span class="hljs-type">Function</span> <span class="hljs-variable">ranker</span> <span class="hljs-operator">=</span> CreateCollectionReq.Function.builder()
                       .functionType(FunctionType.RERANK)
                       .name(<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>)
                       .inputFieldNames(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
                       .param(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>)
                       .param(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;vllm&quot;</span>)
                       .param(<span class="hljs-string">&quot;queries&quot;</span>, <span class="hljs-string">&quot;[\&quot;renewable energy developments\&quot;]&quot;</span>)
                       .param(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>)
                       .param(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-string">&quot;32&quot;</span>)
                       .param(<span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>, <span class="hljs-string">&quot;256&quot;</span>)
                       .build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

ranker := entity.NewFunction().
    WithName(<span class="hljs-string">&quot;vllm_semantic_ranker&quot;</span>).
    WithType(entity.FunctionTypeRerank).
    WithInputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithParam(<span class="hljs-string">&quot;reranker&quot;</span>, <span class="hljs-string">&quot;model&quot;</span>).
    WithParam(<span class="hljs-string">&quot;provider&quot;</span>, <span class="hljs-string">&quot;vllm&quot;</span>).
    WithParam(<span class="hljs-string">&quot;queries&quot;</span>, []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;renewable energy developments&quot;</span>}).
    WithParam(<span class="hljs-string">&quot;endpoint&quot;</span>, <span class="hljs-string">&quot;http://localhost:8080&quot;</span>).
    WithParam(<span class="hljs-string">&quot;max_client_batch_size&quot;</span>, <span class="hljs-number">32</span>).
    WithParam(<span class="hljs-string">&quot;truncate_prompt_tokens&quot;</span>, <span class="hljs-number">256</span>)

schema := entity.NewSchema().
    WithName(<span class="hljs-string">&quot;your_collection&quot;</span>).
    WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;document&quot;</span>).WithDataType(entity.FieldTypeVarChar).WithMaxLength(<span class="hljs-number">65535</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;dense_vector&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">768</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;your_collection&quot;</span>, schema))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection&quot;,
    &quot;schema&quot;: {
        &quot;autoID&quot;: false,
        &quot;enableDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;document&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 65535
                }
            },
            {
                &quot;fieldName&quot;: &quot;dense_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: 768
                }
            }
        ]
    }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="vLLM-ranker-specific-parameters" class="common-anchor-header">Paramètres spécifiques au classement vLLM<button data-href="#vLLM-ranker-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h3><p>Les paramètres suivants sont spécifiques au classificateur vLLM :</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Obligatoire ?</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur / Exemple</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reranker</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Doit être défini sur « <code translate="no">"model"</code> » pour activer le reclassement des modèles.</p></td>
     <td><p><code translate="no">"model"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">provider</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Fournisseur de services de modèle à utiliser pour le reclassement.</p></td>
     <td><p><code translate="no">"vllm"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queries</code></p></td>
     <td><p>Oui</p></td>
     <td><p>Liste des chaînes de requête utilisées par le modèle de reclassement pour calculer les scores de pertinence. Le nombre de chaînes de requête doit correspondre exactement au nombre de requêtes de votre opération de recherche (même lorsque vous utilisez des vecteurs de requête à la place du texte), sinon une erreur sera signalée.</p></td>
     <td><p><em>["requête de recherche"]</em></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">endpoint</code></p></td>
     <td><p>Oui</p></td>
     <td><p>L'adresse de votre service vLLM.</p></td>
     <td><p><code translate="no">"http://localhost:8080"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">max_client_batch_size</code></p></td>
     <td><p>Non</p></td>
     <td><p>Étant donné que les services de modèle ne traitent pas nécessairement toutes les données en une seule fois, ce paramètre définit la taille du lot pour accéder au service de modèle via plusieurs requêtes.</p></td>
     <td><p><code translate="no">32</code> (par défaut)</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">truncate_prompt_tokens</code></p></td>
     <td><p>Non</p></td>
     <td><p>Si la valeur est définie sur un entier <em>k</em>, seuls les <em>k</em> derniers tokens de la requête seront utilisés (c'est-à-dire une troncature à gauche). La valeur par défaut est None (c'est-à-dire aucune troncature).</p></td>
     <td><p><code translate="no">256</code></p></td>
   </tr>
</table>
<div class="alert note">
<p>Pour les paramètres généraux communs à tous les classements de modèles (par exemple, <code translate="no">provider</code>, <code translate="no">queries</code>), consultez la section <a href="/docs/fr/model-ranker-overview.md#Create-a-model-ranker">Créer un classement de modèles</a>.</p>
</div>
<h2 id="Apply-to-standard-vector-search" class="common-anchor-header">Appliquer à une recherche vectorielle standard<button data-href="#Apply-to-standard-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour appliquer vLLM Ranker à une recherche vectorielle standard :</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Execute search with vLLM reranking</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection&quot;</span>,
    data=[your_query_vector],  <span class="hljs-comment"># Replace with your query vector</span>
    anns_field=<span class="hljs-string">&quot;dense_vector&quot;</span>,                   <span class="hljs-comment"># Vector field to search</span>
    limit=<span class="hljs-number">5</span>,                                     <span class="hljs-comment"># Number of results to return</span>
    output_fields=[<span class="hljs-string">&quot;document&quot;</span>],                  <span class="hljs-comment"># Include text field for reranking</span>
<span class="highlighted-wrapper-line">    ranker=vllm_ranker,                         <span class="hljs-comment"># Apply vLLM reranking</span></span>
    consistency_level=<span class="hljs-string">&quot;Bounded&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddedText;

<span class="hljs-type">SearchReq</span> <span class="hljs-variable">searchReq</span> <span class="hljs-operator">=</span> SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection&quot;</span>)
        .data(Arrays.asList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;AI Research Progress&quot;</span>), <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddedText</span>(<span class="hljs-string">&quot;What is AI&quot;</span>)))
        .annsField(<span class="hljs-string">&quot;vector_field&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;document&quot;</span>))
        .functionScore(FunctionScore.builder()
                .addFunction(ranker)
                .build())
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(searchReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// nodejs</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">functionScore := entity.NewFunctionScore().AddFunction(ranker)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    <span class="hljs-string">&quot;your_collection&quot;</span>, <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">5</span>,           <span class="hljs-comment">// limit</span>
    []entity.Vector{entity.FloatVector(yourQueryVector)},
).WithANNSField(<span class="hljs-string">&quot;dense_vector&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;document&quot;</span>).
    WithFunctionScore(functionScore).
    WithConsistencyLevel(entity.ClBounded))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

fmt.Println(resultSets)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># The ranker configuration is passed with the search request</span>
<span class="hljs-built_in">export</span> rankerFunction=<span class="hljs-string">&#x27;{
    &quot;name&quot;: &quot;vllm_semantic_ranker&quot;,
    &quot;type&quot;: &quot;Rerank&quot;,
    &quot;inputFieldNames&quot;: [
        &quot;document&quot;
    ],
    &quot;outputFieldNames&quot;: [],
    &quot;params&quot;: {
        &quot;reranker&quot;: &quot;model&quot;,
        &quot;provider&quot;: &quot;vllm&quot;,
        &quot;queries&quot;: [
            &quot;renewable energy developments&quot;
        ],
        &quot;endpoint&quot;: &quot;http://localhost:8080&quot;,
        &quot;max_client_batch_size&quot;: 32,
        &quot;truncate_prompt_tokens&quot;: 256
    }
}&#x27;</span>

<span class="hljs-comment"># A query vector matching the collection dimension</span>
<span class="hljs-built_in">export</span> QUERY_VECTOR=$(jq -n <span class="hljs-string">&#x27;[range(768) | 0.01]&#x27;</span>)

request=$(jq -n \
--argjson vec <span class="hljs-string">&quot;<span class="hljs-variable">$QUERY_VECTOR</span>&quot;</span> \
--argjson fn <span class="hljs-string">&quot;<span class="hljs-variable">$rankerFunction</span>&quot;</span> \
<span class="hljs-string">&#x27;{
    collectionName: &quot;your_collection&quot;,
    data: [$vec],
    annsField: &quot;dense_vector&quot;,
    limit: 5,
    outputFields: [&quot;document&quot;],
    consistencyLevel: &quot;Bounded&quot;,
    functionScore: {functions: [$fn]}
}&#x27;</span>)

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;<span class="hljs-variable">$request</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
