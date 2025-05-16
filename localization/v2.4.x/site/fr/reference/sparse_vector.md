---
id: sparse_vector.md
summary: Apprenez à utiliser les vecteurs épars dans Milvus.
title: Vecteur épars
---
<h1 id="Sparse-Vector" class="common-anchor-header">Vecteur clairsemé<button data-href="#Sparse-Vector" class="anchor-icon" translate="no">
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
    </button></h1><p>Les vecteurs épars représentent des mots ou des phrases à l'aide d'encastrements vectoriels où la plupart des éléments sont nuls, un seul élément non nul indiquant la présence d'un mot spécifique. Les modèles de vecteurs épars, tels que <a href="https://arxiv.org/abs/2109.10086">SPLADEv2</a>, sont plus performants que les modèles denses en ce qui concerne la recherche de connaissances hors domaine, la connaissance des mots clés et l'interprétabilité. Ils sont particulièrement utiles dans la recherche d'informations, le traitement du langage naturel et les systèmes de recommandation, où la combinaison de vecteurs épars pour le rappel et d'un grand modèle pour le classement peut améliorer de manière significative les résultats de la recherche.</p>
<p>Dans Milvus, l'utilisation des vecteurs épars suit un processus similaire à celui des vecteurs denses. Elle implique la création d'une collection avec une colonne de vecteurs épars, l'insertion de données, la création d'un index et l'exécution de recherches de similarité et de requêtes scalaires.</p>
<p>Dans ce didacticiel, vous apprendrez à :</p>
<ul>
<li>Préparer des encastrements de vecteurs épars ;</li>
<li>Créer une collection avec un champ de vecteurs épars ;</li>
<li>Insérer des entités avec des encastrements de vecteurs épars ;</li>
<li>Indexer la collection et effectuer une recherche ANN sur les vecteurs épars.</li>
</ul>
<p>Pour voir les vecteurs épars en action, reportez-vous à <a href="https://github.com/milvus-io/pymilvus/blob/master/examples/milvus_client/sparse.py">hello_sparse.py.</a></p>
<div class="admonition note">
    <p><b>Remarques</b></p>
        Actuellement, la prise en charge des vecteurs épars est une fonctionnalité bêta dans la version 2.4.0, et il est prévu de la généraliser dans la version 3.0.0.</div>
<h2 id="Prepare-sparse-vector-embeddings" class="common-anchor-header">Préparer les intégrations de vecteurs épars<button data-href="#Prepare-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour utiliser des vecteurs épars dans Milvus, préparez des intégrations de vecteurs dans l'un des formats pris en charge :</p>
<ul>
<li><p><strong>Sparse Matrices</strong>: Utilisez la famille de classes <a href="https://docs.scipy.org/doc/scipy/reference/sparse.html#module-scipy.sparse">scipy.sparse</a> pour représenter vos intégrations de vecteurs épars. Cette méthode est efficace pour traiter des données à grande échelle et à haute dimension.</p></li>
<li><p><strong>Liste de dictionnaires</strong>: Représentez chaque encastrement clairsemé sous la forme d'un dictionnaire, structuré comme <code translate="no">{dimension_index: value, ...}</code>, où chaque paire clé-valeur représente l'indice de dimension et sa valeur correspondante.</p>
<p>Exemple :</p>
<pre><code translate="no" class="language-python">{2: 0.33, 98: 0.72, ...}
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Liste de tables itératives de tuples</strong>: Semblable à la liste de dictionnaires, mais en utilisant un itérable de tuples, <code translate="no">[(dimension_index, value)]</code>, pour spécifier uniquement les dimensions non nulles et leurs valeurs.</p>
<p>Exemple :</p>
<pre><code translate="no" class="language-python">[(2, 0.33), (98, 0.72), ...]
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>L'exemple suivant prépare des encastrements épars en générant une matrice éparse aléatoire pour 10 000 entités, chacune ayant 10 000 dimensions et une densité d'éparpillement de 0,005.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare entities with sparse vector representation</span>
<span class="hljs-keyword">import</span> numpy <span class="hljs-keyword">as</span> np
<span class="hljs-keyword">import</span> random

rng = np.random.default_rng()

num_entities, dim = <span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>

<span class="hljs-comment"># Generate random sparse rows with an average of 25 non-zero elements per row</span>
entities = [
    {
        <span class="hljs-string">&quot;scalar_field&quot;</span>: rng.random(),
        <span class="hljs-comment"># To represent a single sparse vector row, you can use:</span>
        <span class="hljs-comment"># - Any of the scipy.sparse sparse matrices class family with shape[0] == 1</span>
        <span class="hljs-comment"># - Dict[int, float]</span>
        <span class="hljs-comment"># - Iterable[Tuple[int, float]]</span>
        <span class="hljs-string">&quot;sparse_vector&quot;</span>: {
            d: rng.random() <span class="hljs-keyword">for</span> d <span class="hljs-keyword">in</span> random.sample(<span class="hljs-built_in">range</span>(dim), random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">30</span>))
        },
    }
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_entities)
]

<span class="hljs-comment"># print the first entity to check the representation</span>
<span class="hljs-built_in">print</span>(entities[<span class="hljs-number">0</span>])

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &#x27;scalar_field&#x27;: 0.520821523849214,</span>
<span class="hljs-comment">#     &#x27;sparse_vector&#x27;: {</span>
<span class="hljs-comment">#         5263: 0.2639375518635271,</span>
<span class="hljs-comment">#         3573: 0.34701499565746674,</span>
<span class="hljs-comment">#         9637: 0.30856525997853057,</span>
<span class="hljs-comment">#         4399: 0.19771651149001523,</span>
<span class="hljs-comment">#         6959: 0.31025067641541815,</span>
<span class="hljs-comment">#         1729: 0.8265339135915016,</span>
<span class="hljs-comment">#         1220: 0.15303302147479103,</span>
<span class="hljs-comment">#         7335: 0.9436728846033107,</span>
<span class="hljs-comment">#         6167: 0.19929870545596562,</span>
<span class="hljs-comment">#         5891: 0.8214617920371853,</span>
<span class="hljs-comment">#         2245: 0.7852255053773395,</span>
<span class="hljs-comment">#         2886: 0.8787982039149889,</span>
<span class="hljs-comment">#         8966: 0.9000606703940665,</span>
<span class="hljs-comment">#         4910: 0.3001170013981104,</span>
<span class="hljs-comment">#         17: 0.00875671667413136,</span>
<span class="hljs-comment">#         3279: 0.7003425473001098,</span>
<span class="hljs-comment">#         2622: 0.7571360018373428,</span>
<span class="hljs-comment">#         4962: 0.3901879090102064,</span>
<span class="hljs-comment">#         4698: 0.22589525720196246,</span>
<span class="hljs-comment">#         3290: 0.5510228492587324,</span>
<span class="hljs-comment">#         6185: 0.4508413201390492</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>Remarques</b></p>
<p>Les dimensions du vecteur doivent être de type Python <code translate="no">int</code> ou <code translate="no">numpy.integer</code>, et les valeurs doivent être de type Python <code translate="no">float</code> ou <code translate="no">numpy.floating</code>.</p>
</div>
<p>Pour générer des embeddings, vous pouvez également utiliser le paquetage <code translate="no">model</code> intégré à la bibliothèque PyMilvus, qui offre une gamme de fonctions d'embedding. Pour plus d'informations, reportez-vous à <a href="/docs/fr/v2.4.x/embeddings.md">Embeddings</a>.</p>
<h2 id="Create-a-collection-with-a-sparse-vector-field" class="common-anchor-header">Création d'une collection avec un champ de vecteurs épars<button data-href="#Create-a-collection-with-a-sparse-vector-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour créer une collection avec un champ de vecteurs épars, définissez le <strong>type de données</strong> du champ de vecteurs épars sur <strong>DataType.SPARSE_FLOAT_VECTOR</strong>. Contrairement aux vecteurs denses, il n'est pas nécessaire de spécifier une dimension pour les vecteurs épars.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># Create a MilvusClient instance</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a collection with a sparse vector field</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">True</span>,
    enable_dynamic_fields=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;scalar_field&quot;</span>, datatype=DataType.DOUBLE)
<span class="hljs-comment"># For sparse vector, no need to specify dimension</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR) <span class="hljs-comment"># set `datatype` to `SPARSE_FLOAT_VECTOR`</span>

client.create_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, schema=schema)
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les paramètres courants des collections, reportez-vous à la <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">fonction create_collection() .</a></p>
<h2 id="Insert-entities-with-sparse-vector-embeddings" class="common-anchor-header">Insérer des entités avec des encastrements de vecteurs peu denses<button data-href="#Insert-entities-with-sparse-vector-embeddings" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour insérer des entités avec des encastrements de vecteurs peu denses, il suffit de passer la liste des entités à la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> la liste des entités.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Insert entities</span>
client.insert(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, data=entities)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-the-collection" class="common-anchor-header">Indexer la collection<button data-href="#Index-the-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Avant d'effectuer des recherches de similarité, créez un index pour la collection. Pour plus d'informations sur les types d'index et les paramètres, reportez-vous aux méthodes <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md">add_index()</a> et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/create_index.md">create_index()</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Index the collection</span>

<span class="hljs-comment"># Prepare index params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># the type of index to be created. set to `SPARSE_INVERTED_INDEX` or `SPARSE_WAND`.</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># the metric type to be used for the index. Currently, only `IP` (Inner Product) is supported.</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}, <span class="hljs-comment"># the ratio of small vector values to be dropped during indexing.</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, index_params=index_params)
<button class="copy-code-btn"></button></code></pre>
<p>Pour la construction d'un index sur des vecteurs peu denses, tenez compte de ce qui suit :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Options possibles pour les vecteurs épars :</p>
<ul>
<li><p><code translate="no">SPARSE_INVERTED_INDEX</code>: Un index inversé qui associe chaque dimension à ses vecteurs non nuls, ce qui facilite l'accès direct aux données pertinentes lors des recherches. Idéal pour les ensembles de données contenant des données éparses mais à haute dimension.</p></li>
<li><p><code translate="no">SPARSE_WAND</code>: Utilise l'algorithme Weak-AND (WAND) pour contourner rapidement les candidats improbables, en concentrant l'évaluation sur ceux qui ont un potentiel de classement plus élevé. Traite les dimensions comme des termes et les vecteurs comme des documents, ce qui accélère les recherches dans les grands ensembles de données éparses.</p></li>
</ul></li>
<li><p><code translate="no">metric_type</code>: Seule la métrique de distance <code translate="no">IP</code> (produit intérieur) est prise en charge pour les vecteurs peu denses.</p></li>
<li><p><code translate="no">params.drop_ratio_build</code>: Paramètre d'index utilisé spécifiquement pour les vecteurs peu denses. Il contrôle la proportion de petites valeurs vectorielles qui sont exclues au cours du processus d'indexation. Ce paramètre permet d'affiner le compromis entre efficacité et précision en ignorant les petites valeurs lors de la construction de l'index. Par exemple, si <code translate="no">drop_ratio_build = 0.3</code>, lors de la construction de l'index, toutes les valeurs de tous les vecteurs épars sont rassemblées et triées. Les 30 % les plus petites de ces valeurs ne sont pas incluses dans l'index, ce qui réduit la charge de travail informatique pendant la recherche.</p></li>
</ul>
<p>Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/index.md">Index en mémoire</a>.</p>
<h2 id="Perform-ANN-search" class="common-anchor-header">Effectuer une recherche ANN<button data-href="#Perform-ANN-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois la collection indexée et chargée en mémoire, utilisez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> pour extraire les documents pertinents en fonction de la requête.</p>
<pre><code translate="no" class="language-python"># Load the collection into memory
client.load_collection(collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>)

# Perform ANN search on sparse vectors

# <span class="hljs-keyword">for</span> demo purpose we search <span class="hljs-keyword">for</span> the last inserted vector
query_vector = entities[<span class="hljs-number">-1</span>][<span class="hljs-string">&quot;sparse_vector&quot;</span>]

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}, # the ratio of small vector values to be dropped during search.
}

search_res = client.search(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    data=[query_vector],
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;scalar_field&quot;</span>],
    search_params=search_params,
)

<span class="hljs-keyword">for</span> hits in search_res:
    <span class="hljs-keyword">for</span> hit in hits:
        <span class="hljs-built_in">print</span>(f<span class="hljs-string">&quot;hit: {hit}&quot;</span>)
        
# Output:
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">7.220192909240723</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272710786&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.46767865218233806</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">1.2287548780441284</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272708317&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.7315987515699472</span>}}
# hit: {<span class="hljs-string">&#x27;id&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;distance&#x27;</span>: <span class="hljs-number">0.9848432540893555</span>, <span class="hljs-string">&#x27;entity&#x27;</span>: {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702005&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9871869181562156</span>}}
<button class="copy-code-btn"></button></code></pre>
<p>Lors de la configuration des paramètres de recherche, tenez compte des points suivants :</p>
<ul>
<li><code translate="no">params.drop_ratio_search</code>: Le paramètre de recherche utilisé spécifiquement pour les vecteurs épars. Cette option permet d'affiner le processus de recherche en spécifiant le ratio des plus petites valeurs du vecteur de la requête à ignorer. Elle permet d'équilibrer la précision de la recherche et les performances. Plus la valeur définie pour <code translate="no">drop_ratio_search</code> est petite, moins ces petites valeurs contribuent au résultat final. En ignorant certaines petites valeurs, les performances de la recherche peuvent être améliorées avec un impact minimal sur la précision.</li>
</ul>
<h2 id="Perform-scalar-queries" class="common-anchor-header">Effectuer des requêtes scalaires<button data-href="#Perform-scalar-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre la recherche ANN, Milvus prend également en charge les requêtes scalaires sur les vecteurs peu denses. Ces requêtes vous permettent d'extraire des documents en fonction d'une valeur scalaire associée au vecteur clairsemé. Pour plus d'informations sur les paramètres, reportez-vous à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/query.md">query()</a>.</p>
<p>Filtrer les entités dont le <strong>champ scalaire</strong> est supérieur à 3 :</p>
<pre><code translate="no" class="language-python"># Perform a query by specifying filter expr
filter_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>,
    filter=<span class="hljs-string">&quot;scalar_field &gt; 0.999&quot;</span>,
)

<span class="hljs-built_in">print</span>(filter_query_res[:<span class="hljs-number">2</span>])

# Output:
# [{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272701862&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9994093623822689</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">173</span>: <span class="hljs-number">0.35266244411468506</span>, <span class="hljs-number">400</span>: <span class="hljs-number">0.49995484948158264</span>, <span class="hljs-number">480</span>: <span class="hljs-number">0.8757831454277039</span>, <span class="hljs-number">661</span>: <span class="hljs-number">0.9931875467300415</span>, <span class="hljs-number">1040</span>: <span class="hljs-number">0.0965644046664238</span>, <span class="hljs-number">1728</span>: <span class="hljs-number">0.7478245496749878</span>, <span class="hljs-number">2365</span>: <span class="hljs-number">0.4351981580257416</span>, <span class="hljs-number">2923</span>: <span class="hljs-number">0.5505295395851135</span>, <span class="hljs-number">3181</span>: <span class="hljs-number">0.7396837472915649</span>, <span class="hljs-number">3848</span>: <span class="hljs-number">0.4428485333919525</span>, <span class="hljs-number">4701</span>: <span class="hljs-number">0.39119353890419006</span>, <span class="hljs-number">5199</span>: <span class="hljs-number">0.790219783782959</span>, <span class="hljs-number">5798</span>: <span class="hljs-number">0.9623121619224548</span>, <span class="hljs-number">6213</span>: <span class="hljs-number">0.453134149312973</span>, <span class="hljs-number">6341</span>: <span class="hljs-number">0.745091438293457</span>, <span class="hljs-number">6775</span>: <span class="hljs-number">0.27766478061676025</span>, <span class="hljs-number">6875</span>: <span class="hljs-number">0.017947908490896225</span>, <span class="hljs-number">8093</span>: <span class="hljs-number">0.11834774166345596</span>, <span class="hljs-number">8617</span>: <span class="hljs-number">0.2289179265499115</span>, <span class="hljs-number">8991</span>: <span class="hljs-number">0.36600416898727417</span>, <span class="hljs-number">9346</span>: <span class="hljs-number">0.5502803921699524</span>}}, {<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;448458373272702421&#x27;</span>, <span class="hljs-string">&#x27;scalar_field&#x27;</span>: <span class="hljs-number">0.9990218525410719</span>, <span class="hljs-string">&#x27;sparse_vector&#x27;</span>: {<span class="hljs-number">448</span>: <span class="hljs-number">0.587817907333374</span>, <span class="hljs-number">1866</span>: <span class="hljs-number">0.0994109958410263</span>, <span class="hljs-number">2438</span>: <span class="hljs-number">0.8672442436218262</span>, <span class="hljs-number">2533</span>: <span class="hljs-number">0.8063794374465942</span>, <span class="hljs-number">2595</span>: <span class="hljs-number">0.02122959867119789</span>, <span class="hljs-number">2828</span>: <span class="hljs-number">0.33827054500579834</span>, <span class="hljs-number">2871</span>: <span class="hljs-number">0.1984412521123886</span>, <span class="hljs-number">2938</span>: <span class="hljs-number">0.09674275666475296</span>, <span class="hljs-number">3154</span>: <span class="hljs-number">0.21552987396717072</span>, <span class="hljs-number">3662</span>: <span class="hljs-number">0.5236313343048096</span>, <span class="hljs-number">3711</span>: <span class="hljs-number">0.6463911533355713</span>, <span class="hljs-number">4029</span>: <span class="hljs-number">0.4041993021965027</span>, <span class="hljs-number">7143</span>: <span class="hljs-number">0.7370485663414001</span>, <span class="hljs-number">7589</span>: <span class="hljs-number">0.37588241696357727</span>, <span class="hljs-number">7776</span>: <span class="hljs-number">0.436136394739151</span>, <span class="hljs-number">7962</span>: <span class="hljs-number">0.06377989053726196</span>, <span class="hljs-number">8385</span>: <span class="hljs-number">0.5808192491531372</span>, <span class="hljs-number">8592</span>: <span class="hljs-number">0.8865005970001221</span>, <span class="hljs-number">8648</span>: <span class="hljs-number">0.05727503448724747</span>, <span class="hljs-number">9071</span>: <span class="hljs-number">0.9450633525848389</span>, <span class="hljs-number">9161</span>: <span class="hljs-number">0.146037295460701</span>, <span class="hljs-number">9358</span>: <span class="hljs-number">0.1903032660484314</span>, <span class="hljs-number">9679</span>: <span class="hljs-number">0.3146636486053467</span>, <span class="hljs-number">9974</span>: <span class="hljs-number">0.8561339378356934</span>, <span class="hljs-number">9991</span>: <span class="hljs-number">0.15841573476791382</span>}}]
<button class="copy-code-btn"></button></code></pre>
<p>Filtre les entités par clé primaire :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># primary keys of entities that satisfy the filter</span>
pks = [ret[<span class="hljs-string">&quot;pk&quot;</span>] <span class="hljs-keyword">for</span> ret <span class="hljs-keyword">in</span> filter_query_res]

<span class="hljs-comment"># Perform a query by primary key</span>
pk_query_res = client.query(
    collection_name=<span class="hljs-string">&quot;test_sparse_vector&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">f&quot;pk == &#x27;<span class="hljs-subst">{pks[<span class="hljs-number">0</span>]}</span>&#x27;&quot;</span>
)

<span class="hljs-built_in">print</span>(pk_query_res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [{&#x27;scalar_field&#x27;: 0.9994093623822689, &#x27;sparse_vector&#x27;: {173: 0.35266244411468506, 400: 0.49995484948158264, 480: 0.8757831454277039, 661: 0.9931875467300415, 1040: 0.0965644046664238, 1728: 0.7478245496749878, 2365: 0.4351981580257416, 2923: 0.5505295395851135, 3181: 0.7396837472915649, 3848: 0.4428485333919525, 4701: 0.39119353890419006, 5199: 0.790219783782959, 5798: 0.9623121619224548, 6213: 0.453134149312973, 6341: 0.745091438293457, 6775: 0.27766478061676025, 6875: 0.017947908490896225, 8093: 0.11834774166345596, 8617: 0.2289179265499115, 8991: 0.36600416898727417, 9346: 0.5502803921699524}, &#x27;pk&#x27;: &#x27;448458373272701862&#x27;}]</span>
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
    </button></h2><p>Lors de l'utilisation de vecteurs épars dans Milvus, il convient de tenir compte des limites suivantes :</p>
<ul>
<li><p>Actuellement, seule la métrique de distance <strong>IP</strong> est prise en charge pour les vecteurs épars.</p></li>
<li><p>Pour les champs de vecteur clairsemés, seuls les types d'index <strong>SPARSE_INVERTED_INDEX</strong> et <strong>SPARSE_WAND</strong> sont pris en charge.</p></li>
<li><p>Actuellement, la <a href="https://milvus.io/docs/single-vector-search.md#Range-search">recherche par plage</a>, la <a href="https://milvus.io/docs/single-vector-search.md#Grouping-search">recherche par groupement</a> et l'<a href="https://milvus.io/docs/with-iterators.md#Search-with-iterator">itérateur de recherche</a> ne sont pas pris en charge pour les vecteurs peu denses.</p></li>
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
<li><p><strong>Quelle est la métrique de distance prise en charge pour les vecteurs épars ?</strong></p>
<p>Les vecteurs épars ne prennent en charge que la métrique de distance du produit intérieur (IP) en raison de la dimensionnalité élevée des vecteurs épars, qui rend la distance L2 et la distance cosinus irréalisables.</p></li>
<li><p><strong>Pouvez-vous expliquer la différence entre SPARSE_INVERTED_INDEX et SPARSE_WAND, et comment choisir entre les deux ?</strong></p>
<p><strong>SPARSE_INVERTED_INDEX</strong> est un index inversé traditionnel, tandis que <strong>SPARSE_WAND</strong> utilise l'algorithme <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> pour réduire le nombre d'évaluations de la distance IP complète pendant la recherche. <strong>SPARSE_WAND</strong> est généralement plus rapide, mais ses performances peuvent diminuer avec l'augmentation de la densité des vecteurs. Pour choisir entre les deux, effectuez des expériences et des analyses comparatives en fonction de votre jeu de données et de votre cas d'utilisation spécifiques.</p></li>
<li><p><strong>Comment dois-je choisir les paramètres drop_ratio_build et drop_ratio_search ?</strong></p>
<p>Le choix des paramètres <strong>drop_ratio_build</strong> et <strong>drop_ratio_search</strong> dépend des caractéristiques de vos données et de vos exigences en matière de latence, de débit et de précision de la recherche.</p></li>
<li><p><strong>Quels types de données sont pris en charge pour les encastrements épars ?</strong></p>
<p>La partie dimension doit être un entier non signé de 32 bits et la partie valeur peut être un nombre flottant non négatif de 32 bits.</p></li>
<li><p><strong>La dimension d'un sparse embedding peut-elle être n'importe quelle valeur discrète dans l'espace uint32 ?</strong></p>
<p>Oui, à une exception près. La dimension d'un encastrement clairsemé peut être n'importe quelle valeur dans l'intervalle <code translate="no">[0, maximum of uint32)</code>. Cela signifie que vous ne pouvez pas utiliser la valeur maximale de uint32.</p></li>
<li><p><strong>Les recherches sur les segments croissants sont-elles effectuées à l'aide d'un index ou par force brute ?</strong></p>
<p>Les recherches sur les segments croissants sont effectuées à l'aide d'un index du même type que l'index du segment scellé. Pour les nouveaux segments croissants avant que l'index ne soit construit, une recherche par force brute est utilisée.</p></li>
<li><p><strong>Est-il possible d'avoir à la fois des vecteurs épars et denses dans une même collection ?</strong></p>
<p>Oui, grâce à la prise en charge de plusieurs types de vecteurs, vous pouvez créer des collections avec des colonnes de vecteurs denses et peu denses et effectuer des recherches hybrides sur ces collections.</p></li>
<li><p><strong>Quelles sont les conditions requises pour l'insertion ou la recherche d'embeddings peu denses ?</strong></p>
<p>Les intégrations éparses doivent avoir au moins une valeur non nulle et les indices des vecteurs doivent être non négatifs.</p></li>
</ul>
