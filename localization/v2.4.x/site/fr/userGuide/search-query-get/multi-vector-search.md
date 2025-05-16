---
id: multi-vector-search.md
order: 2
summary: >-
  Ce guide explique comment effectuer une recherche hybride dans Milvus et
  comprendre le classement des résultats.
title: Recherche hybride
---
<h1 id="Hybrid-Search" class="common-anchor-header">Recherche hybride<button data-href="#Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Depuis Milvus 2.4, nous avons introduit la prise en charge de plusieurs vecteurs et un cadre de recherche hybride, ce qui signifie que les utilisateurs peuvent introduire plusieurs champs de vecteurs (jusqu'à 10) dans une seule collection. Ces vecteurs dans différentes colonnes représentent diverses facettes des données, provenant de différents modèles d'intégration ou subissant des méthodes de traitement distinctes. Les résultats des recherches hybrides sont intégrés à l'aide de stratégies de reclassement, telles que la fusion des rangs réciproques (RRF) et la notation pondérée. Pour en savoir plus sur les stratégies de reclassement, reportez-vous à la section <a href="/docs/fr/v2.4.x/reranking.md">Reclassement</a>.</p>
<p>Cette fonctionnalité est particulièrement utile dans les scénarios de recherche exhaustive, tels que l'identification de la personne la plus similaire dans une bibliothèque de vecteurs sur la base de divers attributs tels que les images, la voix, les empreintes digitales, etc.</p>
<p>Dans ce tutoriel, vous apprendrez à :</p>
<ul>
<li><p>Créer plusieurs instances <code translate="no">AnnSearchRequest</code> pour les recherches de similarité sur différents champs vectoriels ;</p></li>
<li><p>Configurer une stratégie de reclassement pour combiner et reclasser les résultats de recherche provenant de plusieurs instances <code translate="no">AnnSearchRequest</code>;</p></li>
<li><p>Utiliser la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md"><code translate="no">hybrid_search()</code></a> pour effectuer une recherche hybride.</p></li>
</ul>
<div class="alert note">
<p>Les extraits de code de cette page utilisent le <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">module ORM PyMilvus</a> pour interagir avec Milvus. Des extraits de code avec le nouveau <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">SDK MilvusClient</a> seront bientôt disponibles.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Préparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant de lancer une recherche hybride, assurez-vous que vous disposez d'une collection comportant plusieurs champs vectoriels. Actuellement, Milvus introduit une valeur par défaut de quatre champs vectoriels par collection, qui peut être étendue à un maximum de dix en modifiant la configuration <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum">proxy.maxVectorFieldNum</a>.</p>
<p>Voici un exemple de création d'une collection nommée <code translate="no">test_collection</code> avec deux champs vectoriels, <code translate="no">filmVector</code> et <code translate="no">posterVector</code>, et d'insertion d'entités aléatoires dans cette collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, Collection, FieldSchema, CollectionSchema, DataType
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># Connect to Milvus</span>
connections.connect(
    host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, <span class="hljs-comment"># Replace with your Milvus server IP</span>
    port=<span class="hljs-string">&quot;19530&quot;</span>
)

<span class="hljs-comment"># Create schema</span>
fields = [
    FieldSchema(name=<span class="hljs-string">&quot;film_id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
    FieldSchema(name=<span class="hljs-string">&quot;filmVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>), <span class="hljs-comment"># Vector field for film vectors</span>
    FieldSchema(name=<span class="hljs-string">&quot;posterVector&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)] <span class="hljs-comment"># Vector field for poster vectors</span>

schema = CollectionSchema(fields=fields,enable_dynamic_field=<span class="hljs-literal">False</span>)

<span class="hljs-comment"># Create collection</span>
collection = Collection(name=<span class="hljs-string">&quot;test_collection&quot;</span>, schema=schema)

<span class="hljs-comment"># Create index for each vector field</span>
index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}

collection.create_index(<span class="hljs-string">&quot;filmVector&quot;</span>, index_params)
collection.create_index(<span class="hljs-string">&quot;posterVector&quot;</span>, index_params)

<span class="hljs-comment"># Generate random entities to insert</span>
entities = []

<span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    <span class="hljs-comment"># generate random values for each field in the schema</span>
    film_id = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>)
    film_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]
    poster_vector = [ random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ]

    <span class="hljs-comment"># create a dictionary for each entity</span>
    entity = {
        <span class="hljs-string">&quot;film_id&quot;</span>: film_id,
        <span class="hljs-string">&quot;filmVector&quot;</span>: film_vector,
        <span class="hljs-string">&quot;posterVector&quot;</span>: poster_vector
    }

    <span class="hljs-comment"># add the entity to the list</span>
    entities.append(entity)
    
collection.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-1-Create-Multiple-AnnSearchRequest-Instances" class="common-anchor-header">Étape 1 : Créer plusieurs instances AnnSearchRequest<button data-href="#Step-1-Create-Multiple-AnnSearchRequest-Instances" class="anchor-icon" translate="no">
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
    </button></h2><p>Une recherche hybride utilise l'API <code translate="no">hybrid_search()</code> pour effectuer plusieurs requêtes de recherche ANN en un seul appel. Chaque site <code translate="no">AnnSearchRequest</code> représente une demande de recherche unique sur un champ vectoriel spécifique.</p>
<p>L'exemple suivant crée deux instances <code translate="no">AnnSearchRequest</code> pour effectuer des recherches de similarité individuelles sur deux champs vectoriels.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest

<span class="hljs-comment"># Create ANN search request 1 for filmVector</span>
query_filmVector = [[<span class="hljs-number">0.8896863042430693</span>, <span class="hljs-number">0.370613100114602</span>, <span class="hljs-number">0.23779315077113428</span>, <span class="hljs-number">0.38227915951132996</span>, <span class="hljs-number">0.5997064603128835</span>]]

search_param_1 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_filmVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;filmVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_1 = AnnSearchRequest(**search_param_1)

<span class="hljs-comment"># Create ANN search request 2 for posterVector</span>
query_posterVector = [[<span class="hljs-number">0.02550758562349764</span>, <span class="hljs-number">0.006085637357292062</span>, <span class="hljs-number">0.5325251250159071</span>, <span class="hljs-number">0.7676432650114147</span>, <span class="hljs-number">0.5521074424751443</span>]]
search_param_2 = {
    <span class="hljs-string">&quot;data&quot;</span>: query_posterVector, <span class="hljs-comment"># Query vector</span>
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;posterVector&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># This parameter value must be identical to the one used in the collection schema</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Number of search results to return in this AnnSearchRequest</span>
}
request_2 = AnnSearchRequest(**search_param_2)

<span class="hljs-comment"># Store these two requests as a list in `reqs`</span>
reqs = [request_1, request_2]
<button class="copy-code-btn"></button></code></pre>
<p>Paramètres :</p>
<ul>
<li><p><code translate="no">AnnSearchRequest</code> <em>(objet</em>)</p>
<p>Une classe représentant une demande de recherche ANN. Chaque recherche hybride peut contenir de 1 à 1 024 objets <code translate="no">ANNSearchRequest</code> à la fois.</p></li>
<li><p><code translate="no">data</code> <em>(liste</em>)</p>
<p>Le vecteur de requête à rechercher dans une seule <code translate="no">AnnSearchRequest</code>. Actuellement, ce paramètre accepte une liste ne contenant qu'un seul vecteur de requête, par exemple <code translate="no">[[0.5791814851218929, 0.5792985702614121, 0.8480776460143558, 0.16098005945243, 0.2842979317256803]]</code>. À l'avenir, ce paramètre sera étendu pour accepter plusieurs vecteurs de requête.</p></li>
<li><p><code translate="no">anns_field</code> <em>(chaîne</em>)</p>
<p>Le nom du champ vectoriel à utiliser dans une seule <code translate="no">AnnSearchRequest</code>.</p></li>
<li><p><code translate="no">param</code> <em>(dict</em>)</p>
<p>Un dictionnaire de paramètres de recherche pour un seul <code translate="no">AnnSearchRequest</code>. Ces paramètres de recherche sont identiques à ceux d'une recherche sur un seul vecteur. Pour plus d'informations, voir <a href="https://milvus.io/docs/single-vector-search.md#Search-parameters">Paramètres de recherche</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Le nombre maximum de résultats de recherche à inclure dans une seule <code translate="no">ANNSearchRequest</code>.</p>
<p>Ce paramètre n'affecte que le nombre de résultats de recherche à renvoyer dans un appel individuel <code translate="no">ANNSearchRequest</code>, et ne détermine pas les résultats finaux à renvoyer pour un appel <code translate="no">hybrid_search</code>. Dans une recherche hybride, les résultats finaux sont déterminés en combinant et en reclassant les résultats de plusieurs instances <code translate="no">ANNSearchRequest</code>.</p></li>
</ul>
<h2 id="Step-2-Configure-a-Reranking-Strategy" class="common-anchor-header">Étape 2 : configuration d'une stratégie de reclassement<button data-href="#Step-2-Configure-a-Reranking-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir créé les instances <code translate="no">AnnSearchRequest</code>, configurez une stratégie de reclassement pour combiner et reclasser les résultats. Actuellement, il existe deux options : <code translate="no">WeightedRanker</code> et <code translate="no">RRFRanker</code>. Pour plus d'informations sur les stratégies de reranking, reportez-vous à la section <a href="/docs/fr/v2.4.x/reranking.md">Reranking</a>.</p>
<ul>
<li><p>Utiliser la notation pondérée</p>
<p>L'adresse <code translate="no">WeightedRanker</code> est utilisée pour attribuer une importance aux résultats de chaque recherche de champ vectoriel avec les poids spécifiés. Si vous donnez la priorité à certains champs vectoriels par rapport à d'autres, <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> peut en tenir compte dans les résultats combinés de la recherche.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> WeightedRanker
<span class="hljs-comment"># Use WeightedRanker to combine results with specified weights</span>
<span class="hljs-comment"># Assign weights of 0.8 to text search and 0.2 to image search</span>
rerank = WeightedRanker(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>)  
<button class="copy-code-btn"></button></code></pre>
<p>Lors de l'utilisation de <code translate="no">WeightedRanker</code>, il convient de noter que</p>
<ul>
<li>Chaque valeur de pondération va de 0 (la moins importante) à 1 (la plus importante), ce qui influence le résultat final agrégé.</li>
<li>Le nombre total de valeurs de pondération fournies dans <code translate="no">WeightedRanker</code> doit être égal au nombre d'instances <code translate="no">AnnSearchRequest</code> que vous avez créées.</li>
</ul></li>
<li><p>Utiliser la fusion réciproque des rangs (RFF)</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Alternatively, use RRFRanker for reciprocal rank fusion reranking</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> RRFRanker

rerank = RRFRanker()
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Perform-a-Hybrid-Search" class="common-anchor-header">Étape 3 : Effectuer une recherche hybride<button data-href="#Step-3-Perform-a-Hybrid-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois les instances <code translate="no">AnnSearchRequest</code> et la stratégie de reclassement définies, utilisez la méthode <code translate="no">hybrid_search()</code> pour effectuer la recherche hybride.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Before conducting hybrid search, load the collection into memory.</span>
collection.load()

res = collection.hybrid_search(
    reqs, <span class="hljs-comment"># List of AnnSearchRequests created in step 1</span>
    rerank, <span class="hljs-comment"># Reranking strategy specified in step 2</span>
    limit=<span class="hljs-number">2</span> <span class="hljs-comment"># Number of final search results to return</span>
)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<p>Paramètres :</p>
<ul>
<li><p><code translate="no">reqs</code> <em>(liste</em>)</p>
<p>Une liste de requêtes de recherche, chaque requête étant un objet <code translate="no">ANNSearchRequest</code>. Chaque requête peut correspondre à un champ vectoriel différent et à un ensemble différent de paramètres de recherche.</p></li>
<li><p><code translate="no">rerank</code> <em>(objet</em>)</p>
<p>La stratégie de reclassement à utiliser pour la recherche hybride. Valeurs possibles : <code translate="no">WeightedRanker(value1, value2, ..., valueN)</code> et <code translate="no">RRFRanker()</code>.</p>
<p>Pour plus d'informations sur les stratégies de reclassement, voir <a href="/docs/fr/v2.4.x/reranking.md">Reranking</a>.</p></li>
<li><p><code translate="no">limit</code> <em>(int</em>)</p>
<p>Nombre maximal de résultats finaux à renvoyer dans la recherche hybride.</p></li>
</ul>
<p>La sortie est similaire à ce qui suit :</p>
<pre><code translate="no" class="language-python">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>En règle générale, chaque collection dispose par défaut d'un maximum de 4 champs vectoriels. Cependant, vous avez la possibilité d'ajuster la configuration de <code translate="no">proxy.maxVectorFieldNum</code> pour augmenter le nombre maximum de champs vectoriels dans une collection, avec une limite maximale de 10 champs vectoriels par collection. Pour plus d'informations, reportez-vous à la section <a href="https://milvus.io/docs/configure_proxy.md#Proxy-related-Configurations">Configurations liées à l'indexation</a>.</p></li>
<li><p>Les champs vectoriels partiellement indexés ou chargés dans une collection entraîneront une erreur.</p></li>
<li><p>Actuellement, chaque site <code translate="no">AnnSearchRequest</code> dans une recherche hybride ne peut contenir qu'un seul vecteur de requête.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>Dans quel scénario la recherche hybride est-elle recommandée ?</strong></p>
<p>La recherche hybride est idéale pour les situations complexes exigeant une grande précision, en particulier lorsqu'une entité peut être représentée par plusieurs vecteurs différents. C'est le cas lorsque les mêmes données, comme une phrase, sont traitées par différents modèles d'intégration ou lorsque des informations multimodales (comme les images, les empreintes digitales et les empreintes vocales d'un individu) sont converties en différents formats vectoriels. En attribuant des poids à ces vecteurs, leur influence combinée peut considérablement enrichir le rappel et améliorer l'efficacité des résultats de recherche.</p></li>
<li><p><strong>Comment un classificateur pondéré normalise-t-il les distances entre différents champs vectoriels ?</strong></p>
<p>Un classificateur pondéré normalise les distances entre les champs vectoriels en attribuant des poids à chaque champ. Il calcule l'importance de chaque champ vectoriel en fonction de son poids, en donnant la priorité à ceux qui ont un poids plus élevé. Il est conseillé d'utiliser le même type de métrique pour toutes les requêtes de recherche ANN afin de garantir la cohérence. Cette méthode permet de s'assurer que les vecteurs jugés plus importants ont une plus grande influence sur le classement général.</p></li>
<li><p><strong>Est-il possible d'utiliser d'autres classeurs comme Cohere Ranker ou BGE Ranker ?</strong></p>
<p>Actuellement, seuls les classificateurs fournis sont pris en charge. Il est prévu d'inclure d'autres classificateurs dans les prochaines mises à jour.</p></li>
<li><p><strong>Est-il possible d'effectuer plusieurs opérations de recherche hybride en même temps ?</strong></p>
<p>Oui, l'exécution simultanée de plusieurs opérations de recherche hybride est possible.</p></li>
<li><p><strong>Puis-je utiliser le même champ vectoriel dans plusieurs objets AnnSearchRequest pour effectuer des recherches hybrides ?</strong></p>
<p>Techniquement, il est possible d'utiliser le même champ vectoriel dans plusieurs objets AnnSearchRequest pour effectuer des recherches hybrides. Il n'est pas nécessaire d'avoir plusieurs champs vectoriels pour une recherche hybride.</p></li>
</ul>
