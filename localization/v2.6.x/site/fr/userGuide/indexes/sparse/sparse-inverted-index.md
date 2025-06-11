---
id: sparse-inverted-index.md
title: INDEX_INVERSÉ_SPARSE
summary: >-
  L'index SPARSE_INVERTED_INDEX est un type d'index utilisé par Milvus pour
  stocker et rechercher efficacement des vecteurs épars. Ce type d'index
  exploite les principes de l'indexation inversée pour créer une structure de
  recherche très efficace pour les données éparses. Pour plus d'informations,
  voir INVERTED.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">INDEX_INVERSÉ_SPARSE<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <code translate="no">SPARSE_INVERTED_INDEX</code> est un type d'index utilisé par Milvus pour stocker et rechercher efficacement des vecteurs épars. Ce type d'index exploite les principes de l'indexation inversée pour créer une structure de recherche très efficace pour les données éparses. Pour plus d'informations, voir <a href="/docs/fr/inverted.md">INVERTED</a>.</p>
<h2 id="Build-index" class="common-anchor-header">Création d'un index<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour construire un index <code translate="no">SPARSE_INVERTED_INDEX</code> sur un champ de vecteurs clairsemés dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et d'autres paramètres pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, définissez la valeur <code translate="no">SPARSE_INVERTED_INDEX</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La métrique utilisée pour calculer la similarité entre les vecteurs épars. Valeurs valides :</p>
<ul>
<li><p><code translate="no">IP</code> (Produit intérieur) : Mesure la similarité à l'aide du produit de points.</p></li>
<li><p><code translate="no">BM25</code>: Généralement utilisé pour la recherche en texte intégral, en se concentrant sur la similarité textuelle.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/metric.md">Types de métriques</a> et <a href="/docs/fr/full-text-search.md">recherche plein texte</a>.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: L'algorithme utilisé pour construire et interroger l'index. Valeurs valides :</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (par défaut) : Traitement optimisé des requêtes Document-at-a-Time (DAAT) à l'aide de l'algorithme MaxScore. MaxScore offre de meilleures performances pour les valeurs <em>k</em> élevées ou les requêtes comportant de nombreux termes en ignorant les termes et les documents susceptibles d'avoir un impact minimal. Il y parvient en répartissant les termes en groupes essentiels et non essentiels sur la base de leur score d'impact maximal, en se concentrant sur les termes qui peuvent contribuer aux résultats les plus importants.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Traitement optimisé des requêtes DAAT à l'aide de l'algorithme WAND. WAND évalue moins de documents en exploitant les scores d'impact maximum pour ignorer les documents non compétitifs, mais ses frais généraux par hit sont plus élevés. L'algorithme WAND est donc plus efficace pour les requêtes avec des valeurs <em>k</em> faibles ou pour les requêtes courtes, pour lesquelles il est plus facile de sauter des documents.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: Traitement des requêtes par terme de base à la fois (TAAT). Bien qu'il soit plus lent que <code translate="no">DAAT_MAXSCORE</code> et <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code> offre un avantage unique. Contrairement aux algorithmes DAAT, qui utilisent des scores d'impact maximum mis en cache et qui restent statiques quelles que soient les modifications apportées au paramètre de collecte global (avgdl), <code translate="no">TAAT_NAIVE</code> s'adapte dynamiquement à ces modifications.</p></li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">SPARSE_INVERTED_INDEX</code>, reportez-vous à <a href="/docs/fr/sparse-inverted-index.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
</ul>
<p>Une fois les paramètres de l'index configurés, vous pouvez créer l'index en utilisant directement la méthode <code translate="no">create_index()</code> ou en transmettant les paramètres de l'index dans la méthode <code translate="no">create_collection</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
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
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: Permet d'affiner les performances de la recherche en spécifiant la proportion de petites valeurs vectorielles à ignorer au cours du processus de recherche. Par exemple, avec <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code>, les 20 % de valeurs les plus petites du vecteur de la requête seront ignorées lors de la recherche.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">SPARSE_INVERTED_INDEX</code>, reportez-vous à <a href="/docs/fr/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">Paramètres de recherche spécifiques à l'index</a>.</p></li>
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
    </button></h2><p>Cette section présente une vue d'ensemble des paramètres utilisés pour construire un index et effectuer des recherches dans l'index.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/sparse-inverted-index.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>L'algorithme utilisé pour construire et interroger l'index. Il détermine la manière dont l'index traite les requêtes.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (par défaut), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>Utilisez <code translate="no">"DAAT_MAXSCORE"</code> pour les scénarios avec des valeurs k élevées ou les requêtes avec de nombreux termes, qui peuvent bénéficier de l'exclusion des documents non compétitifs. 
 Choisissez <code translate="no">"DAAT_WAND"</code> pour les requêtes avec des valeurs k faibles ou les requêtes courtes afin de tirer parti d'un saut plus efficace.</p>
<p>Utilisez <code translate="no">"TAAT_NAIVE"</code> si un ajustement dynamique aux changements de collection (par exemple, avgdl) est nécessaire.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/sparse-inverted-index.md#Search-on-index">recherche dans l'index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description des paramètres</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'accord</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>Proportion des plus petites valeurs à ignorer lors de la recherche, ce qui permet de réduire le bruit.</p></td>
     <td><p>Fraction comprise entre 0,0 et 1,0 (par exemple, 0,2 ignore les 20 % de valeurs les plus petites).</p></td>
     <td><p>Ajustez ce paramètre en fonction de la rareté et du niveau de bruit de vos vecteurs de requête. Par exemple, une valeur de 0,2 peut permettre de se concentrer sur les valeurs les plus significatives lors de la recherche, ce qui peut améliorer la précision.</p></td>
   </tr>
</table>
