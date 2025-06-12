---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  L'index GPU_CAGRA est un index basé sur les graphes et optimisé pour les GPU.
  L'utilisation de GPU d'inférence pour exécuter la version GPU de Milvus peut
  être plus rentable que l'utilisation de GPU d'entraînement coûteux.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>GPU_CAGRA</strong> est un index basé sur les graphes et optimisé pour les GPU. L'utilisation de GPU d'inférence pour exécuter la version GPU de Milvus peut être plus rentable que l'utilisation de GPU d'entraînement coûteux.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">GPU_CAGRA</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, définissez la valeur <code translate="no">GPU_CAGRA</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Pour plus de détails, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index. Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">GPU_CAGRA</code>, reportez-vous à la section <a href="/docs/fr/gpu-cagra.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
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
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index. Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">GPU_CAGRA</code>, reportez-vous à <a href="/docs/fr/gpu-cagra.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/gpu-cagra.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description des paramètres</p></th>
     <th><p>Valeur par défaut</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>Affecte le rappel et le temps de construction en déterminant le degré du graphe avant l'élagage. Les valeurs recommandées sont <code translate="no">32</code> ou <code translate="no">64</code>.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>Affecte les performances de recherche et le rappel en déterminant le degré du graphe après l'élagage. Une plus grande différence entre ces deux degrés se traduit par un temps de construction plus long. Sa valeur doit être inférieure à celle de <code translate="no">intermediate_graph_degree</code>.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>Sélectionne l'algorithme de génération de graphe avant l'élagage. Valeurs possibles :</p>
<ul>
<li><p><code translate="no">IVF_PQ</code>: Offre une meilleure qualité mais un temps de construction plus lent.</p></li>
<li><p><code translate="no">NN_DESCENT</code>: Offre une construction plus rapide mais un rappel potentiellement plus faible.</p></li>
</ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Décide si le jeu de données original doit être mis en cache dans la mémoire du GPU. Valeurs possibles :</p>
<ul>
<li><p><code translate="no">"true"</code>: Met en cache l'ensemble de données original pour améliorer le rappel en affinant les résultats de la recherche.</p></li>
<li><p><code translate="no">"false"</code>: Ne met pas en cache le jeu de données original pour économiser la mémoire du GPU.</p></li>
</ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>Décide d'utiliser ou non le GPU pour la construction de l'index et le CPU pour la recherche. La définition de ce paramètre à <code translate="no">"true"</code> nécessite la présence du paramètre <code translate="no">ef</code> dans les requêtes de recherche.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/gpu-cagra.md#Search-on-index">recherche dans l'index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Valeur par défaut</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>Détermine la taille des résultats intermédiaires conservés pendant la recherche. Une valeur plus élevée peut améliorer la mémorisation au détriment des performances de la recherche. Elle doit être au moins égale à la valeur finale du top-k (limite) et est généralement une puissance de 2 (par exemple, 16, 32, 64, 128).</p></td>
     <td><p>Vide</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>Spécifie le nombre de points d'entrée dans le graphe CAGRA pendant la recherche. L'augmentation de cette valeur peut améliorer le rappel mais peut avoir un impact sur les performances de la recherche（e.g. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Vide</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>Contrôle le processus d'itération de la recherche. Par défaut, ces valeurs sont fixées à <code translate="no">0</code>, et le CAGRA détermine automatiquement le nombre d'itérations sur la base de <code translate="no">itopk_size</code> et <code translate="no">search_width</code>. L'ajustement manuel de ces valeurs peut aider à équilibrer les performances et la précision.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>Spécifie le nombre de threads CUDA utilisés pour calculer la distance métrique sur le GPU. Les valeurs courantes sont une puissance de 2 jusqu'à 32 (par exemple, 2, 4, 8, 16, 32). Cette valeur a un impact mineur sur les performances de la recherche. La valeur par défaut est <code translate="no">0</code>, Milvus sélectionnant automatiquement <code translate="no">team_size</code> en fonction de la dimension du vecteur.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Spécifie le compromis temps d'interrogation/précision. Une valeur plus élevée de <code translate="no">ef</code> entraîne une recherche plus précise mais plus lente. Ce paramètre est obligatoire si vous avez défini <code translate="no">adapt_for_cpu</code> sur <code translate="no">true</code> lors de la création de l'index.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
