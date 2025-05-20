---
id: gpu_index.md
related_key: gpu_index
summary: Mécanisme d'indexation du GPU dans Milvus.
title: Index GPU
---
<h1 id="GPU-Index" class="common-anchor-header">Index GPU<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge différents types d'index GPU pour accélérer les performances et l'efficacité de la recherche, en particulier dans les scénarios à haut débit et à rappel élevé. Cette rubrique présente une vue d'ensemble des types d'index GPU pris en charge par Milvus, leurs cas d'utilisation appropriés et leurs caractéristiques de performance. Pour plus d'informations sur la construction d'index avec le GPU, voir <a href="/docs/fr/v2.4.x/index-with-gpu.md">Index avec le GPU</a>.</p>
<p>Il est important de noter que l'utilisation d'un index GPU ne réduit pas nécessairement la latence par rapport à l'utilisation d'un index CPU. Si vous voulez maximiser le débit, vous devez avoir une pression de requête extrêmement élevée ou un grand nombre de vecteurs de requête.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>Performances</span> </span></p>
<p>La prise en charge GPU de Milvus est assurée par l'équipe Nvidia <a href="https://rapids.ai/">RAPIDS</a>. Les types d'index GPU actuellement pris en charge par Milvus sont les suivants.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA est un index basé sur les graphes optimisé pour les GPU. L'utilisation de GPU de niveau inférence pour exécuter la version GPU de Milvus peut être plus rentable que l'utilisation de GPU de niveau formation coûteux.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>Affecte le rappel et le temps de construction en déterminant le degré du graphe avant l'élagage. Les valeurs recommandées sont <code translate="no">32</code> ou <code translate="no">64</code>.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>Affecte les performances de recherche et le rappel en déterminant le degré du graphe après l'élagage. Une plus grande différence entre ces deux degrés se traduit par un temps de construction plus long. Sa valeur doit être inférieure à la valeur de <strong>intermediate_graph_degree</strong>.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>Sélectionne l'algorithme de génération de graphe avant l'élagage. Valeurs possibles :</br><code translate="no">IVF_PQ</code>: Offre une meilleure qualité mais un temps de construction plus lent.</br> <code translate="no">NN_DESCENT</code> Valeur possible : : Offre une construction plus rapide mais un rappel potentiellement plus faible.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Décide si le jeu de données original doit être mis en cache dans la mémoire du GPU. Valeurs possibles :</br><code translate="no">“true”</code>: Met en cache l'ensemble de données d'origine pour améliorer le rappel en affinant les résultats de la recherche.</br> <code translate="no">“false”</code> Valeurs possibles : : Ne met pas en cache le jeu de données original afin d'économiser la mémoire du GPU.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>Détermine la taille des résultats intermédiaires conservés pendant la recherche. Une valeur plus élevée peut améliorer le rappel au détriment des performances de la recherche. Elle doit être au moins égale à la valeur finale du top-k (limite) et est généralement une puissance de 2 (par exemple, 16, 32, 64, 128).</td><td>Vide</td></tr>
<tr><td><code translate="no">search_width</code></td><td>Spécifie le nombre de points d'entrée dans le graphe CAGRA pendant la recherche. L'augmentation de cette valeur peut améliorer le rappel mais peut avoir un impact sur les performances de la recherche（e.g. 1, 2, 4, 8, 16, 32).</td><td>Vide</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>Contrôle le processus d'itération de la recherche. Par défaut, ces valeurs sont fixées à <code translate="no">0</code>, et le CAGRA détermine automatiquement le nombre d'itérations sur la base de <code translate="no">itopk_size</code> et <code translate="no">search_width</code>. L'ajustement manuel de ces valeurs peut aider à équilibrer les performances et la précision.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>Spécifie le nombre de threads CUDA utilisés pour calculer la distance métrique sur le GPU. Les valeurs courantes sont une puissance de 2 jusqu'à 32 (par exemple, 2, 4, 8, 16, 32). Cette valeur a un impact mineur sur les performances de la recherche. La valeur par défaut est <code translate="no">0</code>, Milvus sélectionnant automatiquement le site <code translate="no">team_size</code> en fonction de la dimension du vecteur.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>Limites de la recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Fourchette</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p>Comme <a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>, GPU_IVF_FLAT divise également les données vectorielles en <code translate="no">nlist</code> unités de cluster, puis compare les distances entre le vecteur d'entrée cible et le centre de chaque cluster. En fonction du nombre de grappes que le système est configuré pour interroger (<code translate="no">nprobe</code>), les résultats de la recherche de similarité sont renvoyés sur la base de comparaisons entre l'entrée cible et les vecteurs dans la ou les grappes les plus similaires uniquement - ce qui réduit considérablement le temps de recherche.</p>
<p>En ajustant <code translate="no">nprobe</code>, un équilibre idéal entre la précision et la vitesse peut être trouvé pour un scénario donné. Les résultats du <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">test de performance IVF_FLAT</a> montrent que le temps d'interrogation augmente fortement à mesure que le nombre de vecteurs d'entrée cibles (<code translate="no">nq</code>) et le nombre de grappes à rechercher (<code translate="no">nprobe</code>) augmentent.</p>
<p>GPU_IVF_FLAT est l'index IVF le plus basique, et les données encodées stockées dans chaque unité sont cohérentes avec les données originales.</p>
<p>Lorsque vous effectuez des recherches, notez que vous pouvez définir le top-K jusqu'à 256 pour toute recherche sur une collection indexée par GPU_IVF_FLAT.</p>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de l'index</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Décide s'il faut mettre en cache le jeu de données original dans la mémoire du GPU. Valeurs possibles :</br><code translate="no">“true”</code>: Met en cache l'ensemble de données d'origine pour améliorer la mémorisation en affinant les résultats de la recherche.</br> <code translate="no">“false”</code> Valeurs possibles : : Ne met pas en cache le jeu de données original afin d'économiser la mémoire du GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limites de la recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Plage de valeurs</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (Quantification par produit) décompose uniformément l'espace vectoriel haute dimension original en produits cartésiens d'espaces vectoriels basse dimension <code translate="no">m</code>, puis quantifie les espaces vectoriels basse dimension décomposés. Au lieu de calculer les distances entre le vecteur cible et le centre de toutes les unités, la quantification par produit permet de calculer les distances entre le vecteur cible et le centre de regroupement de chaque espace de faible dimension, ce qui réduit considérablement la complexité temporelle et spatiale de l'algorithme.</p>
<p>IVF_PQ effectue le regroupement de l'index IVF avant de quantifier le produit des vecteurs. Son fichier d'index est encore plus petit que IVF_SQ8, mais il entraîne également une perte de précision lors de la recherche de vecteurs.</p>
<div class="alert note">
<p>Les paramètres de construction de l'index et les paramètres de recherche varient en fonction de la distribution Milvus. Sélectionnez d'abord votre distribution Milvus.</p>
<p>Lorsque vous effectuez des recherches, notez que vous pouvez définir le top-K jusqu'à 8192 pour toute recherche sur une collection indexée GPU_IVF_FLAT.</p>
</div>
<ul>
<li><p>Paramètres de construction de l'index</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>Nombre d'unités de cluster</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>Nombre de facteurs de quantification du produit,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[Nombre de bits dans lesquels chaque vecteur de faible dimension est stocké.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>Décide si le jeu de données original doit être mis en cache dans la mémoire du GPU. Valeurs possibles :</br><code translate="no">“true”</code>: Met en cache l'ensemble de données d'origine pour améliorer le rappel en affinant les résultats de la recherche.</br> <code translate="no">“false”</code> Valeurs possibles : : Ne met pas en cache le jeu de données original afin d'économiser la mémoire du GPU.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>Paramètres de recherche</p>
<ul>
<li><p>Recherche commune</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Description de la recherche</th><th>Plage de valeurs</th><th>Valeur par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>Nombre d'unités à interroger</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>Limites de la recherche</p>
<table>
<thead>
<tr><th>Paramètre</th><th>Plage de valeurs</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE est conçu pour les cas où un rappel extrêmement élevé est crucial, garantissant un rappel de 1 en comparant chaque requête avec tous les vecteurs de l'ensemble de données. Il ne nécessite que le type de métrique (<code translate="no">metric_type</code>) et le top-k (<code translate="no">limit</code>) comme paramètres de construction d'index et de recherche.</p>
<p>Pour GPU_BRUTE_FORCE, aucun paramètre supplémentaire de construction d'index ou de recherche n'est nécessaire.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Actuellement, Milvus charge tous les index dans la mémoire du GPU pour des opérations de recherche efficaces. La quantité de données pouvant être chargées dépend de la taille de la mémoire du GPU :</p>
<ul>
<li><strong>GPU_CAGRA</strong>: L'utilisation de la mémoire est environ 1,8 fois celle des données vectorielles d'origine.</li>
<li><strong>GPU_IVF_FLAT</strong> et <strong>GPU_BRUTE_FORCE</strong>: Nécessite une mémoire égale à la taille des données d'origine.</li>
<li><strong>GPU_IVF_PQ</strong>: Utilise une empreinte mémoire plus petite, qui dépend de la configuration des paramètres de compression.</li>
</ul>
