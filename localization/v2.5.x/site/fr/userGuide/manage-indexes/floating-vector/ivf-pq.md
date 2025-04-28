---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  L'index IVF_PQ est un algorithme d'indexation basé sur la quantification pour
  la recherche approximative du plus proche voisin dans des espaces de haute
  dimension. Bien qu'il ne soit pas aussi rapide que certaines méthodes basées
  sur les graphes, IVF_PQ nécessite souvent beaucoup moins de mémoire, ce qui en
  fait un choix pratique pour les grands ensembles de données.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>IVF_PQ</strong> est un algorithme d'indexation <strong>basé sur la quantification</strong> pour la recherche approximative du plus proche voisin dans des espaces de haute dimension. Bien qu'il ne soit pas aussi rapide que certaines méthodes basées sur les graphes, <strong>IVF_PQ</strong> nécessite souvent beaucoup moins de mémoire, ce qui en fait un choix pratique pour les grands ensembles de données.</p>
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
    </button></h2><p><strong>IVF_PQ</strong> signifie <strong>Inverted File with Product Quantization (fichier inversé avec quantification de produit)</strong>. Il s'agit d'une approche hybride qui combine l'indexation et la compression pour une recherche vectorielle et une récupération efficaces. Elle s'appuie sur deux composants essentiels : le <strong>fichier inversé (IVF)</strong> et la <strong>quantification de produit (PQ)</strong>.</p>
<h3 id="IVF" class="common-anchor-header">FICHIER INVERSÉ</h3><p>L'IVF est comparable à la création d'un index dans un livre. Au lieu de parcourir chaque page (ou, dans notre cas, chaque vecteur), vous recherchez des mots-clés spécifiques (clusters) dans l'index pour trouver rapidement les pages (vecteurs) pertinentes. Dans notre scénario, les vecteurs sont regroupés en grappes et l'algorithme recherche dans quelques grappes proches du vecteur de la requête.</p>
<p>Voici comment cela fonctionne :</p>
<ol>
<li><p><strong>Regroupement :</strong> Votre ensemble de données vectorielles est divisé en un nombre déterminé de grappes, à l'aide d'un algorithme de regroupement tel que les k-moyennes. Chaque grappe possède un centroïde (vecteur représentatif de la grappe).</p></li>
<li><p><strong>Affectation :</strong> Chaque vecteur est affecté à la grappe dont le centroïde est le plus proche.</p></li>
<li><p><strong>Index inversé :</strong> Un index est créé, mettant en correspondance chaque centroïde de grappe avec la liste des vecteurs assignés à cette grappe.</p></li>
<li><p><strong>Recherche :</strong> Lorsque vous recherchez les voisins les plus proches, l'algorithme de recherche compare le vecteur de votre requête aux centroïdes des clusters et sélectionne le(s) cluster(s) le(s) plus prometteur(s). La recherche est alors limitée aux vecteurs contenus dans les grappes sélectionnées.</p></li>
</ol>
<p>Pour en savoir plus sur les détails techniques, reportez-vous à <a href="/docs/fr/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p>La<strong>quantification de produit (PQ)</strong> est une méthode de compression pour les vecteurs à haute dimension qui réduit considérablement les besoins de stockage tout en permettant des opérations de recherche de similarité rapides.</p>
<p>Le processus de quantification de produit comprend les étapes suivantes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>Décomposition des dimensions</strong>: L'algorithme commence par décomposer chaque vecteur à haute dimension en <code translate="no">m</code> sous-vecteurs de taille égale. Cette décomposition transforme l'espace original à D dimensions en <code translate="no">m</code> sous-espaces disjoints, où chaque sous-espace contient <em>D/m</em> dimensions. Le paramètre <code translate="no">m</code> contrôle la granularité de la décomposition et influence directement le taux de compression.</p></li>
<li><p><strong>Génération d'un codebook de sous-espace</strong>: Dans chaque sous-espace, l'algorithme applique le <a href="https://en.wikipedia.org/wiki/K-means_clustering">regroupement k-means</a> pour apprendre un ensemble de vecteurs représentatifs (centroïdes). Ces centroïdes forment collectivement un livre de codes pour ce sous-espace. Le nombre de centroïdes dans chaque codebook est déterminé par le paramètre <code translate="no">nbits</code>, où chaque codebook contient <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroïdes. Par exemple, si</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code>, chaque livre de codes contiendra 256 centroïdes. Chaque centroïde se voit attribuer un index unique de <code translate="no">nbits</code> bits.</p></li>
<li><p><strong>Quantification du</strong><strong>vecteur</strong>: Pour chaque sous-vecteur du vecteur original, PQ identifie le centroïde le plus proche dans le sous-espace correspondant à l'aide d'un type de métrique spécifique. Ce processus permet de faire correspondre chaque sous-vecteur à son vecteur représentatif le plus proche dans le livre de codes. Au lieu de stocker les coordonnées complètes du sous-vecteur, seul l'index du centroïde correspondant est conservé.</p></li>
<li><p><strong>Représentation comprimée</strong>: La représentation comprimée finale se compose de <code translate="no">m</code> indices, un pour chaque sous-espace, collectivement appelés <strong>codes PQ</strong>. Ce codage réduit le besoin de stockage de <em>D × 32</em> bits (en supposant des nombres à virgule flottante de 32 bits) à <em>m</em> × <em>nbits</em> bits, ce qui permet une compression substantielle tout en préservant la capacité d'approximation des distances vectorielles.</p></li>
</ol>
<p>Pour plus de détails sur le réglage et l'optimisation des paramètres, voir <a href="/docs/fr/ivf-pq.md#Index-params">Index params</a>.</p>
<div class="alert note">
<p>Considérons un vecteur avec <em>D = 128</em> dimensions utilisant des nombres à virgule flottante de 32 bits. Avec les paramètres PQ <em>m = 64</em> (sous-vecteurs) et <em>nbits = 8</em> (donc <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>= 256</em> centroïdes par sous-espace), nous pouvons comparer les besoins de stockage :</p>
<ul>
<li><p>Vecteur original : 128 dimensions × 32 bits = 4 096 bits</p></li>
<li><p>Vecteur compressé PQ : 64 sous-vecteurs × 8 bits = 512 bits</p></li>
</ul>
<p>Cela représente une réduction de 8 fois les besoins en stockage.</p>
</div>
<p><strong>Calcul de la distance avec PQ</strong></p>
<p>Lors d'une recherche de similarité avec un vecteur d'interrogation, PQ permet un calcul efficace de la distance grâce aux étapes suivantes :</p>
<ol>
<li><p><strong>Prétraitement de la requête</strong></p>
<ul>
<li><p>Le vecteur d'interrogation est décomposé en <code translate="no">m</code> sous-vecteurs, ce qui correspond à la structure de décomposition originale de PQ.</p></li>
<li><p>Pour chaque sous-vecteur d'interrogation et son livre de codes correspondant (contenant <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits centroïdes), les distances par rapport à tous les centroïdes sont calculées et stockées.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>Cela génère <code translate="no">m</code> tables de recherche, où chaque table contient <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits distances.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>Approximation de la distance</strong></p>
<p>Pour tout vecteur de base de données représenté par des codes PQ, sa distance approximative par rapport au vecteur d'interrogation est calculée comme suit :</p>
<ul>
<li><p>Pour chacun des sous-vecteurs <code translate="no">m</code>, récupérer la distance précalculée à partir de la table de recherche correspondante en utilisant l'indice de centroïde stocké.</p></li>
<li><p>Additionner ces distances <code translate="no">m</code> pour obtenir la distance approximative basée sur un type de métrique spécifique (par exemple, la distance euclidienne).</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p>L'indice <strong>IVF_PQ</strong> combine les forces de l'<strong>IVF</strong> et du <strong>PQ</strong> pour accélérer les recherches. Le processus se déroule en deux étapes :</p>
<ol>
<li><p><strong>Filtrage grossier avec IVF</strong>: IVF divise l'espace vectoriel en grappes, ce qui réduit l'étendue de la recherche. Au lieu d'évaluer l'ensemble des données, l'algorithme se concentre uniquement sur les grappes les plus proches du vecteur de la requête.</p></li>
<li><p><strong>Comparaison fine avec PQ</strong>: à l'intérieur des grappes sélectionnées, PQ utilise des représentations vectorielles compressées et quantifiées pour calculer rapidement des distances approximatives.</p></li>
</ol>
<p>Les performances de l'index <strong>IVF_PQ</strong> sont fortement influencées par les paramètres qui contrôlent les algorithmes IVF et PQ. Le réglage de ces paramètres est essentiel pour obtenir des résultats optimaux pour un ensemble de données et une application donnés. Des informations plus détaillées sur ces paramètres et sur la manière de les régler sont disponibles dans <a href="/docs/fr/ivf-pq.md#Index-params">Index params</a>.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">IVF_PQ</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, la valeur est <code translate="no">IVF_PQ</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><code translate="no">m</code>: Nombre de sous-vecteurs à diviser en vecteurs.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">IVF_PQ</code>, reportez-vous à <a href="/docs/fr/ivf-pq.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
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
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">IVF_PQ</code>, reportez-vous à <a href="/docs/fr/ivf-pq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/ivf-pq.md#Build-index">création d'un index</a>.</p>
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
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p><p><strong>Valeur par défaut</strong>: <code translate="no">128</code></p></td>
     <td><p>Les valeurs élevées de <code translate="no">nlist</code> améliorent le rappel en créant des grappes plus fines, mais augmentent le temps de construction de l'index. Optimisez en fonction de la taille du jeu de données et des ressources disponibles. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cet intervalle : [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>Le nombre de sous-vecteurs (utilisés pour la quantification) à diviser chaque vecteur à haute dimension pendant le processus de quantification.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 65536]</p><p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">m</code> peut améliorer la précision, mais elle augmente également la complexité du calcul et l'utilisation de la mémoire. <code translate="no">m</code> doit être un diviseur de la dimension du vecteur<em>(D)</em> pour garantir une décomposition correcte. Une valeur couramment recommandée est <em>m = D/2</em>.</p><p>Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cet intervalle : [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>Le nombre de bits utilisés pour représenter l'indice du centroïde de chaque sous-vecteur sous forme comprimée. Il détermine directement la taille de chaque livre de codes. Chaque livre de codes contiendra $2^{\textit{nbits}}$ centroïdes. Par exemple, si <code translate="no">nbits</code> est fixé à 8, chaque sous-vecteur sera représenté par un indice de centroïde de 8 bits. Cela permet d'avoir $2^8$ (256) centroïdes possibles dans le livre de codes pour ce sous-vecteur.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 64]</p><p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Une valeur plus élevée de <code translate="no">nbits</code> permet d'obtenir des livres de codes plus importants, ce qui peut conduire à des représentations plus précises des vecteurs d'origine. Cependant, cela signifie également qu'il faut utiliser plus de bits pour stocker chaque index, ce qui se traduit par une compression moindre. Dans la plupart des cas, nous vous recommandons de choisir une valeur comprise dans cette fourchette : [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques aux index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/ivf-pq.md#Search-on-index">recherche sur l'index</a>.</p>
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
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>nlist</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Des valeurs plus élevées permettent de rechercher davantage de grappes, ce qui améliore le rappel en élargissant la portée de la recherche, mais au prix d'une latence accrue de la requête. Réglez <code translate="no">nprobe</code> proportionnellement à <code translate="no">nlist</code> pour équilibrer la vitesse et la précision.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [1, nlist].</p></td>
   </tr>
</table>
