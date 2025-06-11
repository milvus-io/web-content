---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  L'index IVF_SQ8 est un algorithme d'indexation basé sur la quantification,
  conçu pour relever les défis de la recherche de similarités à grande échelle.
  Ce type d'index permet d'effectuer des recherches plus rapides avec une
  empreinte mémoire beaucoup plus faible que les méthodes de recherche
  exhaustive.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p>L'index <strong>IVF_SQ8</strong> est un algorithme d'indexation <strong>basé sur la quantification,</strong> conçu pour relever les défis de la recherche de similarités à grande échelle. Ce type d'index permet d'effectuer des recherches plus rapides avec une empreinte mémoire beaucoup plus faible que les méthodes de recherche exhaustive.</p>
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
    </button></h2><p>L'index IVF_SQ8 repose sur deux éléments clés :</p>
<ul>
<li><p><strong>Fichier inversé (IVF)</strong>: Il organise les données en grappes, ce qui permet à l'algorithme de recherche de se concentrer uniquement sur les sous-ensembles de vecteurs les plus pertinents.</p></li>
<li><p><strong>Quantification scalaire (SQ8</strong>) : Compresse les vecteurs sous une forme plus compacte, ce qui réduit considérablement l'utilisation de la mémoire tout en conservant une précision suffisante pour des calculs de similarité rapides.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>Le FVI est comparable à la création d'un index dans un livre. Au lieu de parcourir chaque page (ou, dans notre cas, chaque vecteur), vous recherchez des mots-clés spécifiques (clusters) dans l'index pour trouver rapidement les pages (vecteurs) pertinentes. Dans notre scénario, les vecteurs sont regroupés en grappes et l'algorithme recherche dans quelques grappes proches du vecteur de la requête.</p>
<p>Voici comment cela fonctionne :</p>
<ol>
<li><p><strong>Regroupement :</strong> Votre ensemble de données vectorielles est divisé en un nombre déterminé de grappes, à l'aide d'un algorithme de regroupement tel que les k-moyennes. Chaque grappe possède un centroïde (vecteur représentatif de la grappe).</p></li>
<li><p><strong>Affectation :</strong> Chaque vecteur est affecté à la grappe dont le centroïde est le plus proche.</p></li>
<li><p><strong>Index inversé :</strong> Un index est créé, mettant en correspondance chaque centroïde de grappe avec la liste des vecteurs assignés à cette grappe.</p></li>
<li><p><strong>Recherche :</strong> Lorsque vous recherchez les voisins les plus proches, l'algorithme de recherche compare le vecteur de votre requête aux centroïdes des clusters et sélectionne le(s) cluster(s) le(s) plus prometteur(s). La recherche est alors limitée aux vecteurs contenus dans les grappes sélectionnées.</p></li>
</ol>
<p>Pour en savoir plus sur les détails techniques, reportez-vous à <a href="/docs/fr/ivf-flat.md">IVF_FLAT</a>.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>La quantification scalaire (SQ) est une technique utilisée pour réduire la taille des vecteurs à haute dimension en remplaçant leurs valeurs par des représentations plus petites et plus compactes. La variante <strong>SQ8</strong> utilise des entiers de 8 bits au lieu des nombres à virgule flottante typiques de 32 bits pour stocker chaque valeur dimensionnelle d'un vecteur. Cela permet de réduire considérablement la quantité de mémoire nécessaire pour stocker les données.</p>
<p>Voici comment fonctionne la variante SQ8 :</p>
<ol>
<li><p><strong>Identification de la plage :</strong> Il faut d'abord identifier les valeurs minimales et maximales du vecteur. Cette plage définit les limites de la quantification.</p></li>
<li><p><strong>Normalisation :</strong> Normaliser les valeurs du vecteur dans une fourchette comprise entre 0 et 1 à l'aide de la formule :</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>Cela permet de s'assurer que toutes les valeurs sont réparties proportionnellement dans une plage normalisée, ce qui les prépare à la compression.</p></li>
<li><p><strong>Compression 8 bits :</strong> Multiplier la valeur normalisée par 255 (la valeur maximale pour un entier de 8 bits) et arrondir le résultat à l'entier le plus proche. Cela permet de compresser chaque valeur en une représentation de 8 bits.</p></li>
</ol>
<p>Supposons que vous ayez une valeur dimensionnelle de 1,2, avec une valeur minimale de -1,7 et une valeur maximale de 2,3. La figure suivante montre comment SQ8 est appliqué pour convertir une valeur float32 en un entier int8.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>Ivf Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>L'index IVF_SQ8 combine IVF et SQ8 pour effectuer efficacement des recherches de similarité :</p>
<ol>
<li><p><strong>IVF réduit l'étendue de la recherche</strong>: L'ensemble de données est divisé en grappes, et lorsqu'une requête est émise, IVF compare d'abord la requête aux centroïdes de la grappe, en sélectionnant les grappes les plus pertinentes.</p></li>
<li><p><strong>SQ8 accélère les calculs de distance</strong>: Au sein des grappes sélectionnées, SQ8 compresse les vecteurs en entiers de 8 bits, ce qui réduit l'utilisation de la mémoire et accélère les calculs de distance.</p></li>
</ol>
<p>En utilisant IVF pour cibler la recherche et SQ8 pour accélérer les calculs, IVF_SQ8 permet d'obtenir à la fois des temps de recherche rapides et une efficacité de la mémoire.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">IVF_SQ8</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et des paramètres supplémentaires pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, la valeur est <code translate="no">IVF_SQ8</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><code translate="no">nlist</code>: Nombre de clusters à créer à l'aide de l'algorithme k-means lors de la construction de l'index.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">IVF_SQ8</code>, reportez-vous à <a href="/docs/fr/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">Paramètres de construction de l'index</a>.</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l'index.</p>
<ul>
<li><code translate="no">nprobe</code>: Nombre de clusters pour la recherche de candidats.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">IVF_SQ8</code>, reportez-vous à <a href="/docs/fr/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">Paramètres de recherche spécifiques à l'index</a>.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">création d'un index</a>.</p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">recherche sur l'index</a>.</p>
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
