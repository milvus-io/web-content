---
id: index-with-gpu.md
order: 3
summary: >-
  Ce guide explique comment construire un index avec la prise en charge du GPU
  dans Milvus pour améliorer les performances de recherche.
title: Index avec GPU
---
<h1 id="Index-with-GPU" class="common-anchor-header">Index avec GPU<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide décrit les étapes pour construire un index avec la prise en charge du GPU dans Milvus, ce qui peut améliorer de manière significative les performances de recherche dans les scénarios à haut débit et à fort rappel. Pour plus de détails sur les types d'index GPU pris en charge par Milvus, voir <a href="/docs/fr/v2.4.x/gpu_index.md">Index GPU</a>.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">Configurer les paramètres Milvus pour le contrôle de la mémoire GPU<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus utilise un pool de mémoire graphique global pour allouer la mémoire GPU.</p>
<p>Il prend en charge deux paramètres <code translate="no">initMemSize</code> et <code translate="no">maxMemSize</code> dans le <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">fichier de configuration de Milvus</a>. La taille du pool est initialement fixée à <code translate="no">initMemSize</code> et sera automatiquement étendue à <code translate="no">maxMemSize</code> si cette limite est dépassée.</p>
<p>La valeur par défaut de <code translate="no">initMemSize</code> est égale à la moitié de la mémoire GPU disponible au démarrage de Milvus, et la valeur par défaut de <code translate="no">maxMemSize</code> est égale à la totalité de la mémoire GPU disponible.</p>
<p>Jusqu'à Milvus 2.4.1 (y compris la version 2.4.1), Milvus utilisait un pool de mémoire GPU unifié. Pour les versions antérieures à 2.4.1 (y compris la version 2.4.1), il était recommandé de définir les deux valeurs à 0.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partir de la version 2.4.1 de Milvus, le pool de mémoire GPU n'est utilisé que pour les données GPU temporaires pendant les recherches. Par conséquent, il est recommandé de le définir à 2048 et 4096.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">Création d'un index<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Les exemples suivants montrent comment construire des index GPU de différents types.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">Préparer les paramètres de l'index</h3><p>Lors de la configuration des paramètres de l'index GPU, définissez <strong>index_type</strong>, <strong>metric_type</strong> et <strong>params</strong>:</p>
<ul>
<li><p><strong>index_type</strong><em>(chaîne</em>) : Le type d'index utilisé pour accélérer la recherche vectorielle. Les options valides sont <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong> et <strong>GPU_BRUTE_FORCE</strong>.</p></li>
<li><p><strong>metric_type</strong><em>(chaîne</em>) : Le type de métrique utilisé pour mesurer la similarité des vecteurs. Les options valides sont <strong>IP</strong> et <strong>L2</strong>.</p></li>
<li><p><strong>params</strong><em>(dict</em>) : Les paramètres de construction spécifiques à l'index. Les options valides pour ce paramètre dépendent du type d'index.</p></li>
</ul>
<p>Voici des exemples de configurations pour différents types d'index :</p>
<ul>
<li><p>Index<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Les options possibles pour <strong>params</strong> sont les suivantes</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>) : Affecte le rappel et le temps de construction en déterminant le degré du graphe avant l'élagage. Les valeurs recommandées sont <strong>32</strong> ou <strong>64</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>) : Affecte les performances de recherche et le rappel en déterminant le degré du graphe après l'élagage. En règle générale, il est égal à la moitié du <strong>degré intermédiaire du graphe</strong>. Une plus grande différence entre ces deux degrés se traduit par un temps de construction plus long. Sa valeur doit être inférieure à la valeur de <strong>intermediate_graph_degree</strong>.</p></li>
<li><p><strong>build_algo</strong><em>(chaîne</em>) : Sélectionne l'algorithme de génération de graphe avant l'élagage. Options possibles :</p>
<ul>
<li><p><strong>IVF_PQ</strong>: offre une meilleure qualité mais un temps de construction plus lent.</p></li>
<li><p><strong>NN_DESCENT</strong>: Permet une construction plus rapide avec un rappel potentiellement plus faible.</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>, <strong>"true"</strong> | <strong>"false")</strong>: Décide si le jeu de données original doit être mis en cache dans la mémoire du GPU. La valeur <strong>"true"</strong> permet d'améliorer le rappel en affinant les résultats de la recherche, tandis que la valeur <strong>"false"</strong> permet d'économiser la mémoire du GPU.</p></li>
</ul></li>
<li><p>Index<strong>GPU_IVF_FLAT</strong> ou <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Les options <strong>params</strong> sont identiques à celles utilisées dans <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> et <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>.</p></li>
<li><p>Index<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Aucune configuration <strong>paramétrique</strong> supplémentaire n'est requise.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">Construction de l'index</h3><p>Après avoir configuré les paramètres de l'index dans <strong>index_params</strong>, appelez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> pour construire l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">Recherche<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez construit votre index GPU, l'étape suivante consiste à préparer les paramètres de recherche avant d'effectuer une recherche.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">Préparer les paramètres de recherche</h3><p>Vous trouverez ci-dessous des exemples de configurations pour différents types d'index :</p>
<ul>
<li><p>Index<strong>GPU_BRUTE_FORCE</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>Aucune configuration <strong>supplémentaire</strong> n'est nécessaire.</p></li>
<li><p>Index<strong>GPU_CAGRA</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>Les principaux paramètres de recherche sont les suivants</p>
<ul>
<li><p><strong>itopk_size</strong>: Détermine la taille des résultats intermédiaires conservés pendant la recherche. Une valeur plus élevée peut améliorer le rappel au détriment des performances de la recherche. Elle doit être au moins égale à la valeur finale du top-k<strong>(limite</strong>) et est généralement une puissance de 2 (par exemple, 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: spécifie le nombre de points d'entrée dans le graphe CAGRA pendant la recherche. L'augmentation de cette valeur peut améliorer la mémorisation mais peut avoir un impact sur les performances de la recherche.</p></li>
<li><p><strong>min_iterations</strong> / <strong>max_iterations</strong>: Ces paramètres contrôlent le processus d'itération de la recherche. Par défaut, ils sont fixés à <strong>0</strong>, et le CAGRA détermine automatiquement le nombre d'itérations en fonction de <strong>itopk_size</strong> et de <strong>search_width</strong>. L'ajustement manuel de ces valeurs peut aider à équilibrer la performance et la précision.</p></li>
<li><p><strong>team_size</strong>: Spécifie le nombre de threads CUDA utilisés pour calculer la distance métrique sur le GPU. Les valeurs courantes sont une puissance de 2 jusqu'à 32 (par exemple, 2, 4, 8, 16, 32). Cette valeur a un impact mineur sur les performances de recherche. La valeur par défaut est <strong>0</strong>, Milvus sélectionnant automatiquement la <strong>taille de l'équipe</strong> en fonction de la dimension du vecteur.</p></li>
</ul></li>
<li><p>Index<strong>GPU_IVF_FLAT</strong> ou <strong>GPU_IVF_PQ</strong> </p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>Les paramètres de recherche pour ces deux types d'index sont similaires à ceux utilisés pour <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> et <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong>. Pour plus d'informations, reportez-vous à la section <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">Effectuer une recherche de similarité vectorielle</a>.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">Effectuer une recherche</h3><p>Utilisez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> pour effectuer une recherche de similarité vectorielle sur l'index GPU.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
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
    </button></h2><p>Lorsque vous utilisez des index GPU, vous devez tenir compte de certaines contraintes :</p>
<ul>
<li><p>Pour <strong>GPU_IVF_FLAT</strong>, la valeur maximale de la <strong>limite</strong> est de 1024.</p></li>
<li><p>Pour <strong>GPU_IVF_PQ</strong> et <strong>GPU_CAGRA</strong>, la valeur maximale de la <strong>limite</strong> est de 1024.</p></li>
<li><p>Bien qu'il n'y ait pas de <strong>limite</strong> fixée pour <strong>GPU_BRUTE_FORCE</strong>, il est recommandé de ne pas dépasser 4096 pour éviter les problèmes de performance.</p></li>
<li><p>Actuellement, les index GPU ne prennent pas en charge la distance COSINE. Si la distance COSINE est requise, les données doivent d'abord être normalisées, puis la distance du produit intérieur (IP) peut être utilisée comme substitut.</p></li>
<li><p>La protection OOM du chargement pour les index GPU n'est pas entièrement prise en charge, une trop grande quantité de données peut entraîner le blocage du QueryNode.</p></li>
<li><p>Les index GPU ne prennent pas en charge les fonctions de recherche telles que la <a href="https://milvus.io/docs/single-vector-search.md#Range-search">recherche par plage</a> et la <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">recherche par groupement</a>.</p></li>
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
<li><p><strong>Quand est-il approprié d'utiliser un index GPU ?</strong></p>
<p>Un index GPU est particulièrement utile dans les situations qui requièrent un débit élevé ou une forte mémorisation. Par exemple, lorsqu'il s'agit de lots importants, le débit de l'indexation GPU peut être jusqu'à 100 fois supérieur à celui de l'indexation CPU. Dans les scénarios avec des lots plus petits, les index GPU surpassent toujours de manière significative les index CPU en termes de performance. En outre, s'il est nécessaire d'insérer rapidement des données, l'intégration d'un GPU peut accélérer considérablement le processus de construction des index.</p></li>
<li><p><strong>Dans quels scénarios les index GPU tels que CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT et GPU_BRUTE_FORCE sont-ils les plus adaptés ?</strong></p>
<p>Les index CAGRA sont idéaux pour les scénarios qui exigent des performances accrues, mais au prix d'une plus grande consommation de mémoire. Pour les environnements où la conservation de la mémoire est une priorité, l'index <strong>GPU_IVF_PQ</strong> peut aider à minimiser les besoins en stockage, bien qu'il s'accompagne d'une plus grande perte de précision. L'index <strong>GPU_IVF_FLAT</strong> est une option équilibrée, offrant un compromis entre les performances et l'utilisation de la mémoire. Enfin, l'index <strong>GPU_BRUTE_FORCE</strong> est conçu pour des opérations de recherche exhaustive, garantissant un taux de rappel de 1 en effectuant des recherches transversales.</p></li>
</ul>
