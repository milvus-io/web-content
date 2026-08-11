---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  L'index SPARSE_INVERTED_INDEX est un type d'index utilisé par Milvus pour
  stocker et rechercher efficacement des vecteurs creux. Ce type d'index
  s'appuie sur les principes de l'indexation inversée pour créer une structure
  de recherche hautement efficace pour les données creuses.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index « <code translate="no">SPARSE_INVERTED_INDEX</code> » est un type d'index utilisé par Milvus pour stocker et rechercher efficacement des vecteurs creux. Il construit une structure inversée à partir des dimensions non nulles des vecteurs creux. Vous pouvez utiliser cet index pour la recherche en texte intégral BM25 et pour la recherche d'embeddings creux basée sur le produit scalaire.</p>
<p>Pour plus d’informations sur les champs de vecteurs creux, les types de métriques et la recherche en texte intégral, consultez les sections <a href="/docs/fr/sparse_vector.md">Vecteurs creux</a>, <a href="/docs/fr/metric.md">Types de métriques</a> et <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Créer un index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour créer un index « <code translate="no">SPARSE_INVERTED_INDEX</code> » sur un champ de vecteurs clairsemés dans Milvus, utilisez la méthode « <code translate="no">add_index()</code> » et spécifiez les paramètres « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » et « index ».</p>
<p>Pour la recherche en texte intégral BM25, créez l’index sur le champ de vecteurs clairsemés généré par une fonction BM25. Définissez ` <code translate="no">metric_type</code> ` sur ` <code translate="no">BM25</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Pour la recherche par plongement clairsemé, créez l’index sur un champ de vecteurs clairsemés qui stocke des vecteurs clairsemés générés en externe. Définissez ` <code translate="no">metric_type</code> ` sur ` <code translate="no">IP</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans les configurations précédentes :</p>
<ul>
<li><p><code translate="no">index_type</code>: Type d’index à créer. Définissez cette valeur sur <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La métrique utilisée pour calculer la similarité entre les vecteurs clairsemés. Valeurs valides :</p>
<ul>
<li><p><code translate="no">BM25</code>: Utilise le score de pertinence BM25 pour la recherche en texte intégral.</p></li>
<li><p><code translate="no">IP</code> (Produit scalaire) : mesure la similarité des vecteurs creux à l’aide du produit scalaire.</p></li>
</ul>
<p>Pour plus de détails, reportez-vous aux sections « <a href="/docs/fr/metric.md">Types de métriques</a> » et « <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a> ».</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: L'algorithme utilisé pour la construction et l'interrogation de l'index. Valeurs valides :</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Traitement des requêtes « Document-at-a-Time » avec MaxScore. Il s’agit de la valeur par défaut pour <code translate="no">BM25</code>. Pour plus d’informations, consultez la section « <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">Évaluation des requêtes : stratégies et optimisations</a> ».</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Traitement des requêtes WAND « Document-at-a-Time ». Cet algorithme est adapté aux valeurs topK plus faibles ou aux requêtes plus courtes. Pour plus d’informations, consultez la section « <a href="https://dl.acm.org/doi/10.1145/956863.956944">Évaluation efficace des requêtes à l’aide d’un processus de recherche à deux niveaux</a> ».</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Traitement de requête « terme par terme » de base. Utilisez cette option comme référence ou lorsque vous avez besoin que le score s’adapte dynamiquement aux statistiques globales de la collection, telles que la longueur moyenne des documents.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: Traitement des requêtes MaxScore avec des métadonnées de score maximal au niveau des blocs. Pour plus d’informations, consultez la section « <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Récupération plus rapide des documents top-k à l’aide d’index Block-Max</a> ».</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: Traitement des requêtes WAND avec des métadonnées de score maximal au niveau des blocs. Pour plus d’informations, consultez « <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">Récupération plus rapide des k meilleurs documents à l’aide d’index Block-Max</a> ».</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: Un index inversé clairsemé basé sur des fenêtres d’identifiants de documents fixes, avec accélération SIMD pour la recherche. Il s’agit de la valeur par défaut pour ` <code translate="no">IP</code>`. Pour plus de détails, consultez <a href="https://arxiv.org/abs/2509.08395">l’article sur SINDI</a>.</p></li>
</ul>
<p>Si vous ne spécifiez pas <code translate="no">inverted_index_algo</code>, Milvus sélectionne l’algorithme par défaut en fonction de <code translate="no">metric_type</code>: <code translate="no">DAAT_MAXSCORE</code> pour <code translate="no">BM25</code>, et <code translate="no">SINDI</code> pour <code translate="no">IP</code>.</p>
<p>Pour en savoir plus sur les paramètres de création disponibles pour l’index <code translate="no">SPARSE_INVERTED_INDEX</code>, consultez la section <a href="/docs/fr/sparse-inverted-index.md#Index-building-params">Paramètres de création d’index</a>.</p></li>
</ul>
<p>Une fois les paramètres d’index configurés, vous pouvez créer l’index en utilisant directement la méthode ` <code translate="no">create_index()</code> ` ou en transmettant les paramètres d’index à la méthode ` <code translate="no">create_collection</code> `. Pour plus de détails, consultez la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Recherche dans l'index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois l’index créé et les entités insérées, vous pouvez effectuer des recherches de similarité sur l’index.</p>
<p>Pour la recherche en texte intégral BM25, utilisez du texte brut comme requête. Milvus convertit le texte de la requête en un vecteur clairsemé via la fonction BM25.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Pour la recherche par embedding clairsemé, utilisez un dictionnaire de vecteurs clairsemés comme vecteur de requête.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>Par défaut, Milvus utilise l’algorithme de recherche configuré pour l’index.</p>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l’index « <code translate="no">SPARSE_INVERTED_INDEX</code> », consultez la section <a href="/docs/fr/sparse-inverted-index.md#Index-specific-search-params">«Paramètres de recherche spécifiques à l’index</a>».</p>
<h2 id="Index-params" class="common-anchor-header">Paramètres d’index<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section présente une vue d’ensemble des paramètres utilisés pour créer un index et effectuer des recherches sur celui-ci.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de création d'index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/sparse-inverted-index.md#Build-index">la création d’un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>Algorithme utilisé pour la création et l'interrogation de l'index. Il détermine la manière dont l'index traite les requêtes.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>Valeur par défaut : <code translate="no">"DAAT_MAXSCORE"</code> pour <code translate="no">BM25</code>; <code translate="no">"SINDI"</code> pour <code translate="no">IP</code>.</p></td>
     <td><p>Utilisez <code translate="no">"DAAT_MAXSCORE"</code> pour les charges de travail de recherche en texte intégral BM25 présentant des valeurs k élevées ou des requêtes comportant de nombreux termes.</p><p>Utilisez <code translate="no">"DAAT_WAND"</code> pour les charges de travail BM25 avec de faibles valeurs de k ou des requêtes courtes.</p><p>Utilisez <code translate="no">"TAAT_NAIVE"</code> comme référence, ou lorsque vous avez besoin que le score s’adapte dynamiquement aux statistiques globales de la collection, telles que la longueur moyenne des documents.</p><p>Utilisez <code translate="no">"BLOCK_MAX_MAXSCORE"</code> ou <code translate="no">"BLOCK_MAX_WAND"</code> pour exploiter les métadonnées de score maximal au niveau des blocs afin d’optimiser les requêtes.</p><p>Utilisez ` <code translate="no">"SINDI"</code> ` pour la recherche par embedding clairsemé avec ` <code translate="no">IP</code>`.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>Contrôle la saturation de la fréquence des termes pour le calcul du score BM25. Ce paramètre s’applique uniquement lorsque <code translate="no">metric_type</code> est défini sur <code translate="no">BM25</code>.</p></td>
     <td><p>Plage recommandée : [1,2 ; 2,0]</p><p>Valeur par défaut : 1,2</p></td>
     <td><p>Augmentez cette valeur pour accorder plus d’importance à la fréquence des termes dans le classement des documents.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>Contrôle l'intensité de la normalisation de la longueur des documents pour le calcul du score BM25. Ce paramètre s'applique uniquement lorsque « <code translate="no">metric_type</code> » est défini sur « <code translate="no">BM25</code> ».</p></td>
     <td><p>Plage : [0, 1]</p><p>Valeur par défaut : 0,75</p></td>
     <td><p>Utilisez une valeur plus élevée pour appliquer une normalisation de la longueur plus forte. Utilisez une valeur plus faible pour réduire l’effet de la longueur du document sur le classement.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l’index<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/sparse-inverted-index.md#Search-on-index">d’une recherche sur l’index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Proportion des valeurs les plus faibles à ignorer lors de la recherche, ce qui permet de réduire le bruit.</p></td>
     <td><p>Plage : [0,0 ; 1,0) (par exemple, une valeur de 0,2 ignore les 20 % des valeurs les plus faibles)</p></td>
     <td><p>Ajustez ce paramètre en fonction de la densité et du niveau de bruit de vos vecteurs de requête.</p><p>Ce paramètre contrôle la proportion de valeurs de faible amplitude écartées lors de la recherche. Augmenter cette valeur (par exemple, à <code translate="no">0.2</code>) peut réduire le bruit et concentrer la recherche sur des composantes plus significatives, ce qui peut améliorer la précision et l'efficacité. Cependant, écarter davantage de valeurs peut également réduire le rappel en excluant des signaux potentiellement pertinents. Choisissez une valeur qui offre un bon équilibre entre rappel et précision pour votre charge de travail.</p></td>
   </tr>
</table>
