---
id: ivf-flat.md
title: IVF_FLAT
summary: >-
  L'index IVF_FLAT est un algorithme d'indexation qui peut améliorer les
  performances de recherche pour les vecteurs à virgule flottante.
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>IVF_FLAT</strong> est un algorithme d'indexation qui peut améliorer les performances de recherche pour les vecteurs à virgule flottante.</p>
<p>Ce type d'index est idéal pour les ensembles de données à grande échelle qui nécessitent des réponses rapides aux requêtes et une grande précision, en particulier lorsque le regroupement de votre ensemble de données peut réduire l'espace de recherche et que la mémoire disponible est suffisante pour stocker les données du regroupement.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Le terme <strong>IVF_FLAT</strong> signifie <strong>Inverted File Flat (fichier inversé plat</strong>), ce qui résume son approche à deux niveaux de l'indexation et de la recherche de vecteurs à virgule flottante :</p>
<ul>
<li><p><strong>Fichier inversé (IVF) :</strong> Fait référence au regroupement de l'espace vectoriel en régions gérables à l'aide d'un <a href="https://en.wikipedia.org/wiki/K-means_clustering">regroupement par k-moyennes</a>. Chaque groupe est représenté par un <strong>centroïde</strong>, qui sert de point de référence pour les vecteurs qu'il contient.</p></li>
<li><p><strong>Plat :</strong> indique qu'à l'intérieur de chaque grappe, les vecteurs sont stockés dans leur forme originale (structure plate), sans compression ni quantification, pour des calculs de distance précis.</p></li>
</ul>
<p>La figure suivante montre comment cela fonctionne :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow.png" alt="IVF FLAT Workflow" class="doc-image" id="ivf-flat-workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail IVF FLAT</span> </span></p>
<p>Cette méthode d'indexation accélère le processus de recherche, mais elle présente un inconvénient potentiel : le candidat trouvé comme étant le plus proche de l'encastrement de la requête peut ne pas être celui qui est exactement le plus proche. Cela peut se produire si l'encastrement le plus proche de l'encastrement de la requête réside dans un groupe différent de celui sélectionné sur la base du centroïde le plus proche (voir la visualisation ci-dessous).</p>
<p>Pour résoudre ce problème, <strong>IVF_FLAT</strong> fournit deux hyperparamètres que nous pouvons régler :</p>
<ul>
<li><p><code translate="no">nlist</code>: Spécifie le nombre de partitions à créer à l'aide de l'algorithme des k-moyennes.</p></li>
<li><p><code translate="no">nprobe</code>: Spécifie le nombre de partitions à prendre en compte lors de la recherche de candidats.</p></li>
</ul>
<p>Si nous fixons <code translate="no">nprobe</code> à 3 au lieu de 1, nous obtenons le résultat suivant :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/IVF-FLAT-workflow-2.png" alt="IVF FLAT Workflow 2" class="doc-image" id="ivf-flat-workflow-2" />
   </span> <span class="img-wrapper"> <span>FIV FLAT Workflow 2</span> </span></p>
<p>En augmentant la valeur de <code translate="no">nprobe</code>, vous pouvez inclure davantage de partitions dans la recherche, ce qui permet de s'assurer que l'intégration la plus proche de la requête n'est pas manquée, même si elle réside dans une partition différente. Cependant, cela se fait au prix d'une augmentation du temps de recherche, car davantage de candidats doivent être évalués. Pour plus d'informations sur le réglage des paramètres de l'index, voir <a href="/docs/fr/ivf-flat.md#Index-params">Paramètres de l'index</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Construire un index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour construire un index <code translate="no">IVF_FLAT</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, la valeur est <code translate="no">IVF_FLAT</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><code translate="no">nlist</code>: Nombre de grappes pour diviser l'ensemble de données.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">IVF_FLAT</code>, reportez-vous à <a href="/docs/fr/ivf-flat.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
</ul>
<p>Une fois les paramètres de l'index configurés, vous pouvez créer l'index en utilisant directement la méthode <code translate="no">create_index()</code> ou en passant les paramètres de l'index dans la méthode <code translate="no">create_collection</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Recherche sur l'index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois l'index construit et les entités insérées, vous pouvez effectuer des recherches de similarité sur l'index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index.</p>
<ul>
<li><code translate="no">nprobe</code>: Nombre de clusters à rechercher.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">IVF_FLAT</code>, reportez-vous à <a href="/docs/fr/ivf-flat.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">Paramètres de l'index<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section présente une vue d'ensemble des paramètres utilisés pour construire un index et effectuer des recherches sur l'index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/ivf-flat.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Le nombre de grappes à créer à l'aide de l'algorithme k-means pendant la construction de l'index. Chaque grappe, représentée par un centroïde, stocke une liste de vecteurs. L'augmentation de ce paramètre réduit le nombre de vecteurs dans chaque grappe, créant ainsi des partitions plus petites et plus ciblées.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p><p><strong>Valeur par défaut</strong>: <code translate="no">128</code></p></td>
     <td><p>Les valeurs plus élevées de <code translate="no">nlist</code> améliorent le rappel en créant des grappes plus fines, mais augmentent le temps de construction de l'index. Optimisez en fonction de la taille du jeu de données et des ressources disponibles. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cet intervalle : [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/ivf-flat.md#Search-on-index">recherche sur l'index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Nombre de grappes à rechercher pour les candidats. Des valeurs plus élevées permettent de rechercher davantage de grappes, ce qui améliore le rappel en élargissant la portée de la recherche, mais au prix d'une latence accrue de la requête.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>nlist</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>L'augmentation de cette valeur améliore le rappel mais peut ralentir la recherche. Réglez <code translate="no">nprobe</code> proportionnellement à <code translate="no">nlist</code> pour équilibrer la vitesse et la précision.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [1, nlist].</p></td>
   </tr>
</table>
