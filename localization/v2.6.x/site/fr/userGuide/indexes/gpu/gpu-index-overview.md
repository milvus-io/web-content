---
id: gpu-index-overview.md
title: Aperçu de l'index GPU
summary: >-
  La création d'un index avec prise en charge GPU dans Milvus peut améliorer de
  manière significative les performances de recherche dans les scénarios à haut
  débit et à fort taux de rappel.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">Aperçu de l'index GPU<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>La création d'un index avec prise en charge du GPU dans Milvus peut améliorer de manière significative les performances de recherche dans les scénarios à haut débit et à fort rappel.</p>
<p>La figure suivante compare le débit des requêtes (requêtes par seconde) en fonction des configurations d'index, des configurations matérielles, des ensembles de données vectorielles (Cohere et OpenAI) et de la taille des lots de recherche, montrant que <code translate="no">GPU_CAGRA</code> est toujours plus performant que les autres méthodes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>Performances de l'index Gpu</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Configuration du pool de mémoire GPU pour Milvus<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge un pool de mémoire GPU global et fournit deux paramètres de configuration, <code translate="no">initMemSize</code> et <code translate="no">maxMemSize</code>, dans le <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">fichier de configuration de Milvus</a>.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>La valeur par défaut <code translate="no">initMemSize</code> correspond généralement à la moitié de la mémoire du GPU au démarrage de Milvus, et la valeur par défaut <code translate="no">maxMemSize</code> correspond à la totalité de la mémoire du GPU. La taille du pool de mémoire GPU est initialement fixée à <code translate="no">initMemSize</code> et s'étend automatiquement à <code translate="no">maxMemSize</code> si nécessaire.</p>
<p>Lorsqu'un index compatible avec le GPU est spécifié, Milvus charge les données de la collection cible dans la mémoire du GPU avant les recherches, de sorte que <code translate="no">maxMemSize</code> doit être au moins égal à la taille des données.</p>
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
<li><p>Pour <code translate="no">GPU_IVF_FLAT</code>, la valeur maximale pour <code translate="no">limit</code> est de 1 024.</p></li>
<li><p>Pour <code translate="no">GPU_IVF_PQ</code> et <code translate="no">GPU_CAGRA</code>, la valeur maximale pour <code translate="no">limit</code> est de 1 024.</p></li>
<li><p><code translate="no">GPU_BRUTE_FORCE</code>Bien qu'il n'y ait pas de valeur définie pour <code translate="no">limit</code>, il est recommandé de ne pas dépasser 4 096 pour éviter les problèmes de performance.</p></li>
<li><p>Actuellement, les index GPU ne prennent pas en charge la distance <code translate="no">COSINE</code>. Si la distance <code translate="no">COSINE</code> est requise, les données doivent d'abord être normalisées, puis la distance du produit intérieur (IP) peut être utilisée comme substitut.</p></li>
<li><p>La protection OOM du chargement pour les index GPU n'est pas entièrement prise en charge, une trop grande quantité de données peut entraîner le blocage du QueryNode.</p></li>
<li><p>Les index GPU ne prennent pas en charge les fonctions de recherche telles que la <a href="/docs/fr/range-search.md">recherche par plage</a> et la <a href="/docs/fr/grouping-search.md">recherche par groupement</a>.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">Types d'index GPU pris en charge<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie les types d'index GPU pris en charge par Milvus.</p>
<table>
   <tr>
     <th><p>Type d'index</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Utilisation de la mémoire</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA est un index basé sur les graphes optimisé pour les GPU. L'utilisation de GPU de niveau inférence pour exécuter la version GPU de Milvus peut être plus rentable que l'utilisation de GPU de niveau formation coûteux.</p></td>
     <td><p>L'utilisation de la mémoire est environ 1,8 fois supérieure à celle des données vectorielles d'origine.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT est l'index IVF le plus basique, et les données encodées stockées dans chaque unité sont cohérentes avec les données originales. Lorsque vous effectuez des recherches, notez que vous pouvez définir le top-k (<code translate="no">limit</code>) jusqu'à 256 pour toute recherche sur une collection indexée par GPU_IVF_FLAT.</p></td>
     <td><p>Nécessite une mémoire égale à la taille des données d'origine.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ effectue un regroupement d'index IVF avant de quantifier le produit des vecteurs. Lorsque vous effectuez des recherches, notez que vous pouvez définir le top-k (<code translate="no">limit</code>) jusqu'à 8 192 pour toute recherche sur une collection indexée par GPU_IVF_FLAT.</p></td>
     <td><p>Utilise une empreinte mémoire plus petite, qui dépend des paramètres de compression.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/fr/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE est conçu pour les cas où un rappel extrêmement élevé est crucial, garantissant un rappel de 1 en comparant chaque requête avec tous les vecteurs de l'ensemble de données. Il ne nécessite que le type de métrique (<code translate="no">metric_type</code>) et le top-k (<code translate="no">limit</code>) comme paramètres de construction d'index et de recherche.</p></td>
     <td><p>Il nécessite une mémoire égale à la taille des données originales.</p></td>
   </tr>
</table>
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
    </button></h2><p>Milvus utilise un pool de mémoire graphique global pour allouer la mémoire du GPU. Il prend en charge deux paramètres <code translate="no">initMemSize</code> et <code translate="no">maxMemSize</code> dans le <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">fichier de configuration de Milvus</a>. La taille du pool est initialement fixée à <code translate="no">initMemSize</code> et sera automatiquement étendue à <code translate="no">maxMemSize</code> si cette limite est dépassée.</p>
<p>La valeur par défaut de <code translate="no">initMemSize</code> est égale à la moitié de la mémoire GPU disponible au démarrage de Milvus, et la valeur par défaut de <code translate="no">maxMemSize</code> est égale à la totalité de la mémoire GPU disponible.</p>
<p>Jusqu'à la version 2.4.1, Milvus utilise un pool de mémoire GPU unifié. Pour les versions antérieures à 2.4.1, il était recommandé de définir les deux valeurs à 0.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>A partir de Milvus 2.4.1, le pool de mémoire GPU n'est utilisé que pour les données GPU temporaires pendant les recherches. Par conséquent, il est recommandé de le définir à 2048 et 4096.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour savoir comment construire un index GPU, reportez-vous au guide spécifique à chaque type d'index.</p>
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
<p>Un index GPU est particulièrement utile dans les situations qui exigent un débit élevé ou un rappel important. Par exemple, lorsqu'il s'agit de lots importants, le débit de l'indexation GPU peut être jusqu'à 100 fois supérieur à celui de l'indexation CPU. Dans les scénarios avec des lots plus petits, les index GPU surpassent toujours de manière significative les index CPU en termes de performance. En outre, s'il est nécessaire d'insérer rapidement des données, l'intégration d'un GPU peut accélérer considérablement le processus de construction des index.</p></li>
<li><p><strong>Dans quels scénarios les index GPU tels que GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT et GPU_BRUTE_FORCE sont-ils les plus adaptés ?</strong></p>
<p><code translate="no">GPU_CAGRA</code> Les index GPU_CAGRA sont idéaux pour les scénarios qui exigent des performances accrues, mais au prix d'une plus grande consommation de mémoire. Pour les environnements où la conservation de la mémoire est une priorité, l'index <code translate="no">GPU_IVF_PQ</code> peut aider à minimiser les besoins en stockage, bien que cela s'accompagne d'une perte de précision plus importante. L'index <code translate="no">GPU_IVF_FLAT</code> constitue une option équilibrée, offrant un compromis entre les performances et l'utilisation de la mémoire. Enfin, l'index <code translate="no">GPU_BRUTE_FORCE</code> est conçu pour des opérations de recherche exhaustive, garantissant un taux de rappel de 1 en effectuant des recherches transversales.</p></li>
</ul>
