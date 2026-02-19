---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  L'index GPU_IVF_PQ s'appuie sur le concept IVF_PQ en combinant le clustering
  de fichiers inversé avec la quantification de produit (PQ), qui décompose les
  vecteurs à haute dimension en sous-espaces plus petits et les quantifie pour
  des recherches de similarité efficaces. Conçu exclusivement pour les
  environnements GPU, GPU_IVF_PQ exploite le traitement parallèle pour accélérer
  les calculs et traiter efficacement les données vectorielles à grande échelle.
  Pour plus d'informations sur les concepts fondamentaux, consultez IVF_PQ.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>GPU_IVF_PQ</strong> s'appuie sur le concept <strong>IVF_PQ</strong> en combinant le clustering de fichiers inversé avec la quantification de produit (PQ), qui décompose les vecteurs à haute dimension en sous-espaces plus petits et les quantifie pour des recherches de similarité efficaces. Conçu exclusivement pour les environnements GPU, GPU_IVF_PQ exploite le traitement parallèle pour accélérer les calculs et traiter efficacement les données vectorielles à grande échelle. Pour plus d'informations sur les concepts fondamentaux, voir <a href="/docs/fr/ivf-pq.md">IVF_PQ</a>.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">GPU_IVF_PQ</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, définissez la valeur <code translate="no">GPU_IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><code translate="no">m</code>: Nombre de sous-vecteurs à diviser en vecteurs.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">GPU_IVF_PQ</code>, reportez-vous à <a href="/docs/fr/gpu-ivf-pq.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
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
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
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
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">GPU_IVF_PQ</code>, reportez-vous à <a href="/docs/fr/gpu-ivf-pq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/gpu-ivf-pq.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Le nombre de grappes à créer à l'aide de l'algorithme k-means pendant la construction de l'index.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">128</code></p></td>
     <td><p>Les valeurs plus élevées de <code translate="no">nlist</code> améliorent le rappel en créant des grappes plus fines, mais augmentent le temps de construction de l'index. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Le nombre de sous-vecteurs (utilisés pour la quantification) à diviser chaque vecteur à haute dimension pendant le processus de quantification.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p>
<p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">m</code> peut améliorer la précision, mais elle augmente également la complexité du calcul et l'utilisation de la mémoire. <code translate="no">m</code> doit être un diviseur de la dimension du vecteur<em>(D)</em> pour garantir une décomposition correcte. Une valeur couramment recommandée est <em>m = D/2</em>.</p>
<p>Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cet intervalle : [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Le nombre de bits utilisés pour représenter l'indice du centroïde de chaque sous-vecteur sous forme comprimée. Il détermine directement la taille de chaque livre de codes. Chaque livre de codes contiendra des centroïdes de <sup>2nbits</sup>. Par exemple, si <code translate="no">nbits</code> est fixé à 8, chaque sous-vecteur sera représenté par un indice de centroïde de 8 bits. Cela permet d'avoir<sup>28</sup> (256) centroïdes possibles dans le livre de codes pour ce sous-vecteur.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 24]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">nbits</code> permet d'obtenir des livres de codes plus importants, ce qui peut conduire à des représentations plus précises des vecteurs d'origine. Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cette fourchette : [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>Décide si le jeu de données original doit être mis en cache dans la mémoire du GPU. Valeurs possibles :</p>
<ul>
<li><p><code translate="no">"true"</code>: Met en cache l'ensemble de données d'origine pour améliorer la mémorisation en affinant les résultats de la recherche.</p></li>
<li><p><code translate="no">"false"</code>: Ne met pas en cache le jeu de données original pour économiser la mémoire du GPU.</p></li>
</ul></td>
     <td><p><strong>Type</strong>: Chaîne <strong>Plage</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">"false"</code></p></td>
     <td><p>La valeur <code translate="no">"true"</code> améliore la mémorisation en affinant les résultats de la recherche, mais utilise davantage de mémoire GPU. La valeur <code translate="no">"false"</code> permet d'économiser la mémoire du GPU.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/gpu-ivf-pq.md#Search-on-index">recherche sur l'index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>Le nombre de grappes à rechercher pour les candidats.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>nlist</em>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Des valeurs plus élevées permettent de rechercher davantage de grappes, ce qui améliore le rappel en élargissant la portée de la recherche, mais au prix d'une latence accrue de la requête. Définissez <code translate="no">nprobe</code> proportionnellement à <code translate="no">nlist</code> afin d'équilibrer la vitesse et la précision.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [1, nlist].</p></td>
   </tr>
</table>
