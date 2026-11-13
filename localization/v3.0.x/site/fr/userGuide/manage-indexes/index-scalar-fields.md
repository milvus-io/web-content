---
id: index-scalar-fields.md
order: 2
summary: >-
  Ce guide vous expliquera comment créer et configurer des index scalaires pour
  des champs tels que les entiers, les chaînes de caractères, etc.
title: Champs scalaires indexés
---
<h1 id="Index-Scalar-Fields" class="common-anchor-header">Champs scalaires indexés<button data-href="#Index-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, un index scalaire est utilisé pour accélérer le métafiltrage selon une valeur de champ non vectorielle spécifique, à l'instar d'un index de base de données traditionnel. Ce guide vous explique comment créer et configurer des index scalaires pour des champs tels que les entiers, les chaînes de caractères, etc.</p>
<div class="alert warning">
<p>Cette page est obsolète. Pour connaître la dernière implémentation, reportez-vous aux sections <a href="/docs/fr/bitmap.md">BITMAP</a>, <a href="/docs/fr/inverted.md">INVERTED</a>, <a href="/docs/fr/ngram.md">NGRAM</a>, <a href="/docs/fr/rtree.md">RTREE</a>, <a href="/docs/fr/stl-sort.md">STL_SORT</a>, <a href="/docs/fr/trie.md">TRIE</a> et <a href="/docs/fr/fmindex.md">FMINDEX</a>.</p>
</div>
<h2 id="Types-of-scalar-indexing" class="common-anchor-header">Types d’indexation scalaire<button data-href="#Types-of-scalar-indexing" class="anchor-icon" translate="no">
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
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Auto-indexing">Indexation automatique</a></strong>: Milvus détermine automatiquement le type d’index en fonction du type de données du champ scalaire. Cette option est adaptée lorsque vous n’avez pas besoin de contrôler le type d’index spécifique.</p></li>
<li><p><strong><a href="https://milvus.io/docs/index-scalar-fields.md#Custom-indexing">Indexation personnalisée</a></strong>: vous spécifiez le type d’index exact, tel qu’un index inversé ou <a href="/docs/fr/bitmap.md">un index bitmap</a>. Cela vous offre un meilleur contrôle sur le choix du type d’index.</p></li>
</ul>
<h2 id="Auto-indexing" class="common-anchor-header">Indexation automatique<button data-href="#Auto-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Pour utiliser l’indexation automatique, omettez le paramètre <strong>index_type</strong> dans <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>, afin que Milvus puisse déduire le type d’index en fonction du type du champ scalaire.</p>
</div>
<div class="language-java">
<p>Pour utiliser l’indexation automatique, omettez le paramètre <strong>indexType</strong> dans <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>, afin que Milvus puisse déduire le type d’index en fonction du type du champ scalaire.</p>
</div>
<div class="language-javascript">
<p>Pour utiliser l'indexation automatique, omettez le paramètre <strong>index_type</strong> dans <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>, afin que Milvus puisse déduire le type d’index en fonction du type du champ scalaire.</p>
</div>
<p>Pour connaître les correspondances entre les types de données scalaires et les algorithmes d’indexation par défaut, consultez la section « <a href="/docs/fr/scalar_index.md#Choosing-a-scalar-index">Choix d’un index scalaire</a> ».</p>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Auto indexing</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

index_params = MilvusClient.prepare_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-comment"># Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    index_name=<span class="hljs-string">&quot;default_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;default_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;&quot;</span>) <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;default_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment">// Type of index to be created. For auto indexing, leave it empty or omit this parameter.</span>
})
<button class="copy-code-btn"></button></code></pre>
<h2 id="Custom-indexing" class="common-anchor-header">Indexation personnalisée<button data-href="#Custom-indexing" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Pour utiliser l’indexation personnalisée, spécifiez un type d’index particulier à l’aide du paramètre <strong>index_type</strong> dans <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a>.</p>
</div>
<div class="language-java">
<p>Pour utiliser l'indexation personnalisée, spécifiez un type d'index particulier à l'aide du paramètre <strong>indexType</strong> dans <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md"><code translate="no">IndexParam</code></a>.</p>
</div>
<div class="language-javascript">
<p>Pour utiliser l'indexation personnalisée, spécifiez un type d'index particulier à l'aide du paramètre <strong>index_type</strong> dans <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<p>L'exemple ci-dessous crée un index inversé pour le champ scalaire <code translate="no">scalar_2</code>.</p>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params() <span class="hljs-comment">#  Prepare an IndexParams object</span>

index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_2&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
  collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
  index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForScalarField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;scalar_1&quot;</span>) <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    .indexName(<span class="hljs-string">&quot;inverted_index&quot;</span>) <span class="hljs-comment">// Name of the index to be created</span>
    .indexType(<span class="hljs-string">&quot;INVERTED&quot;</span>) <span class="hljs-comment">// Type of index to be created</span>
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForVectorField);

<span class="hljs-type">CreateIndexReq</span> <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>) <span class="hljs-comment">// Specify the collection name</span>
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_scalar_index&quot;</span>, <span class="hljs-comment">// Specify the collection name</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;scalar_1&quot;</span>, <span class="hljs-comment">// Name of the scalar field to be indexed</span>
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>, <span class="hljs-comment">// Name of the index to be created</span>
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span> <span class="hljs-comment">// Type of index to be created</span>
})
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p><strong>Méthodes et paramètres</strong></p>
<ul>
<li><p><strong>prepare_index_params()</strong></p>
<p>Prépare un objet <strong>IndexParams</strong>.</p></li>
<li><p><strong>add_index()</strong></p>
<p>Ajoute des configurations d'index à l'objet <strong>IndexParams</strong>.</p>
<ul>
<li><p><strong>field_name</strong> (<em>chaîne de caractères</em>)</p>
<p>Nom du champ scalaire à indexer.</p></li>
<li><p><strong>index_type</strong> (<em>chaîne de caractères</em>) :</p>
<p>Type de l'index scalaire à créer. Pour l'indexation implicite, laissez ce paramètre vide ou omettez-le.</p>
<p>Pour l’indexation personnalisée, les valeurs valides sont :</p>
<ul>
<li><p><strong>INVERTED</strong>: (Recommandé) Un index inversé se compose d’un dictionnaire de termes contenant tous les mots tokenisés triés par ordre alphabétique. Pour plus de détails, reportez-vous à <a href="/docs/fr/scalar_index.md">la section Index scalaire</a>.</p></li>
<li><p><strong>BITMAP</strong>: type d’index qui stocke une image bitmap de toutes les valeurs uniques d’un champ. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/bitmap.md">BITMAP</a> ».</p></li>
<li><p><strong>STL_SORT</strong>: trie les champs scalaires à l’aide de l’algorithme de tri de la bibliothèque de modèles standard. Prend en charge les champs numériques, VARCHAR et TIMESTAMPTZ. Pour plus de détails, reportez-vous à <a href="/docs/fr/stl-sort.md">la section STL_SORT</a>.</p></li>
<li><p><strong>TRIE</strong>: structure de données arborescente permettant des recherches et des récupérations rapides par préfixe. Prend en charge les champs VARCHAR. Pour plus de détails, voir <a href="/docs/fr/trie.md">TRIE</a>.</p></li>
<li><p><strong>NGRAM</strong>: un index qui accélère les filtres LIKE et les expressions régulières sur les champs VARCHAR. Pour plus de détails, reportez-vous à <a href="/docs/fr/ngram.md">NGRAM</a>.</p></li>
<li><p><strong>FMINDEX</strong>: un index de sous-chaînes exact au niveau de l'octet pour les champs VARCHAR. Pour plus de détails, voir <a href="/docs/fr/fmindex.md">FMINDEX</a>.</p></li>
<li><p><strong>RTREE</strong>: un index pour les champs GEOMETRY. Pour plus de détails, voir <a href="/docs/fr/rtree.md">RTREE</a>.</p></li>
</ul></li>
<li><p><strong>index_name</strong> (<em>chaîne de caractères</em>)</p>
<p>Nom de l’index scalaire à créer. Chaque champ scalaire prend en charge un seul index.</p></li>
</ul></li>
<li><p><strong>create_index()</strong></p>
<p>Crée l'index dans la collection spécifiée.</p>
<ul>
<li><p><strong>collection_name</strong> (<em>chaîne de caractères</em>)</p>
<p>Nom de la collection pour laquelle l'index est créé.</p></li>
<li><p><strong>index_params</strong></p>
<p>L'objet <strong>IndexParams</strong> contenant les paramètres de configuration de l'index.</p></li>
</ul></li>
</ul>
</div>
<div class="language-java">
<p><strong>Méthodes et paramètres</strong></p>
<ul>
<li><strong>IndexParam</strong>
Prépare un objet IndexParam.
<ul>
<li><strong>fieldName</strong> (<em>chaîne de caractères</em>)
Nom du champ scalaire à indexer.</li>
<li><strong>indexName</strong> (<em>chaîne de caractères</em>)
Nom de l’index scalaire à créer. Chaque champ scalaire prend en charge un seul index.</li>
<li><strong>indexType</strong> (<em>chaîne de caractères</em>)
Type de l’index scalaire à créer. Pour l’indexation implicite, laissez ce paramètre vide ou omettez-le.
Pour l’indexation personnalisée, les valeurs valides sont :
<ul>
<li><strong>INVERTED</strong>: (Recommandé) Un index inversé se compose d’un dictionnaire de termes contenant tous les mots tokenisés triés par ordre alphabétique. Pour plus de détails, reportez-vous à <a href="/docs/fr/scalar_index.md">la section</a> « <a href="/docs/fr/scalar_index.md">Index scalaire</a> ».</li>
<li><strong>BITMAP</strong>: type d’index qui stocke une image bitmap de toutes les valeurs uniques d’un champ. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/bitmap.md">BITMAP</a> ».</li>
<li><strong>STL_SORT</strong>: trie les champs scalaires à l'aide de l'algorithme de tri de la bibliothèque de modèles standard. Prend en charge les champs numériques, VARCHAR et TIMESTAMPTZ. Pour plus de détails, reportez-vous à <a href="/docs/fr/stl-sort.md">la section STL_SORT</a>.</li>
<li><strong>TRIE</strong>: structure de données arborescente permettant des recherches et des récupérations rapides par préfixe. Prend en charge les champs VARCHAR. Pour plus de détails, voir <a href="/docs/fr/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: un index qui accélère les filtres LIKE et les expressions régulières sur les champs VARCHAR. Pour plus de détails, reportez-vous à <a href="/docs/fr/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: un index de sous-chaînes exact au niveau de l'octet pour les champs VARCHAR. Pour plus de détails, reportez-vous à <a href="/docs/fr/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un index pour les champs GEOMETRY. Pour plus de détails, reportez-vous à <a href="/docs/fr/rtree.md">RTREE</a>.</li>
</ul></li>
</ul></li>
<li><strong>CreateIndexReq</strong>
Crée l’index dans la collection spécifiée.
<ul>
<li><strong>collectionName</strong> (<em>Chaîne de caractères</em>)
Nom de la collection pour laquelle l’index est créé.</li>
<li><strong>indexParams</strong> (<em>Liste<IndexParam></em>)
Une liste d’objets IndexParam contenant les configurations d’index.</li>
</ul></li>
</ul>
</div>
<div class="language-javascript">
<p><strong>Méthodes et paramètres</strong></p>
<ul>
<li><p><strong>createIndex</strong></p>
<p>Crée l'index dans la collection spécifiée.</p>
<ul>
<li><strong>collection_name</strong> (<em>chaîne de caractères</em>)
Nom de la collection pour laquelle l'index est créé.</li>
<li><strong>field_name</strong> (<em>chaîne de caractères</em>)
Nom du champ scalaire à indexer.</li>
<li><strong>index_name</strong> (<em>chaîne de caractères</em>)
Nom de l’index scalaire à créer. Chaque champ scalaire prend en charge un seul index.</li>
<li><strong>type_d'index</strong> (<em>chaîne de caractères</em>)
Type de l'index scalaire à créer. Pour l'indexation implicite, laissez ce paramètre vide ou omettez-le.
Pour l'indexation personnalisée, les valeurs valides sont :
<ul>
<li><strong>INVERTED</strong>: (Recommandé) Un index inversé se compose d’un dictionnaire de termes contenant tous les mots tokenisés triés par ordre alphabétique. Pour plus de détails, reportez-vous à <a href="/docs/fr/scalar_index.md">la section</a> « <a href="/docs/fr/scalar_index.md">Index scalaire</a> ».</li>
<li><strong>BITMAP</strong>: type d’index qui stocke une image bitmap de toutes les valeurs uniques d’un champ. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/bitmap.md">BITMAP</a> ».</li>
<li><strong>STL_SORT</strong>: trie les champs scalaires à l’aide de l’algorithme de tri de la bibliothèque de modèles standard. Prend en charge les champs numériques, VARCHAR et TIMESTAMPTZ. Pour plus de détails, reportez-vous à <a href="/docs/fr/stl-sort.md">la section STL_SORT</a>.</li>
<li><strong>TRIE</strong>: structure de données arborescente permettant des recherches et des récupérations rapides par préfixe. Prend en charge les champs VARCHAR. Pour plus de détails, voir <a href="/docs/fr/trie.md">TRIE</a>.</li>
<li><strong>NGRAM</strong>: un index qui accélère les filtres LIKE et les expressions régulières sur les champs VARCHAR. Pour plus de détails, reportez-vous à <a href="/docs/fr/ngram.md">NGRAM</a>.</li>
<li><strong>FMINDEX</strong>: un index de sous-chaînes exact au niveau de l'octet pour les champs VARCHAR. Pour plus de détails, reportez-vous à <a href="/docs/fr/fmindex.md">FMINDEX</a>.</li>
<li><strong>RTREE</strong>: un index pour les champs GEOMETRY. Pour plus de détails, reportez-vous à <a href="/docs/fr/rtree.md">RTREE</a>.</li>
</ul></li>
</ul></li>
</ul>
</div>
<h2 id="Verifying-the-result" class="common-anchor-header">Vérification du résultat<button data-href="#Verifying-the-result" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>Utilisez la <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/list_indexes.md"><code translate="no">list_indexes()</code></a> méthode suivante pour vérifier la création des index scalaires :</p>
</div>
<div class="language-java">
<p>Utilisez la méthode ` <code translate="no">listIndexes()</code> ` pour vérifier la création d'index scalaires :</p>
</div>
<div class="language-javascript">
<p>Utilisez la méthode ` <code translate="no">listIndexes()</code> ` pour vérifier la création d'index scalaires :</p>
</div>
<div class="multipleCode">
   <a href="#python">Python 
 </a> <a href="#java">   Java</a>
 <a href="#javascript">   Node.js</a>
</div>
<pre><code translate="no" class="language-python">client.list_indexes(
    collection_name=<span class="hljs-string">&quot;test_scalar_index&quot;</span>  <span class="hljs-comment"># Specify the collection name</span>
)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&#x27;default_index&#x27;,&#x27;inverted_index&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.List;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.ListIndexesReq;

<span class="hljs-type">ListIndexesReq</span> <span class="hljs-variable">listIndexesReq</span> <span class="hljs-operator">=</span> ListIndexesReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_scalar_index&quot;</span>)  <span class="hljs-comment">// Specify the collection name</span>
    .build();

List&lt;String&gt; indexNames = client.listIndexes(listIndexesReq);

System.out.println(indexNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listIndexes</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;test_scalar_index&#x27;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">indexes</span>)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;default_index&quot;,</span>
<span class="hljs-comment">//     &quot;inverted_index&quot;</span>
<span class="hljs-comment">// ]   </span>
<button class="copy-code-btn"></button></code></pre>
