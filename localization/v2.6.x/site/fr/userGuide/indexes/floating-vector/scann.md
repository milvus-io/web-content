---
id: scann.md
title: SCANN
summary: >-
  Alimenté par la bibliothèque ScaNN de Google, l'index SCANN de Milvus est
  conçu pour relever les défis de la recherche de similarités vectorielles à
  grande échelle, en trouvant un équilibre entre vitesse et précision, même sur
  de grands ensembles de données qui poseraient traditionnellement des problèmes
  à la plupart des algorithmes de recherche.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Alimenté par la bibliothèque <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> de Google, l'index <code translate="no">SCANN</code> de Milvus est conçu pour relever les défis de la recherche de similarité vectorielle à l'échelle, en trouvant un équilibre entre vitesse et précision, même sur de grands ensembles de données qui poseraient traditionnellement des problèmes à la plupart des algorithmes de recherche.</p>
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
    </button></h2><p>ScaNN est conçu pour résoudre l'un des plus grands défis de la recherche vectorielle : trouver efficacement les vecteurs les plus pertinents dans des espaces à haute dimension, même lorsque les ensembles de données deviennent plus grands et plus complexes. Son architecture décompose le processus de recherche vectorielle en plusieurs étapes distinctes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>Scann</span> </span></p>
<ol>
<li><p><strong>Partitionnement</strong>: Divise l'ensemble de données en grappes. Cette méthode réduit l'espace de recherche en se concentrant uniquement sur les sous-ensembles de données pertinents au lieu d'analyser l'ensemble des données, ce qui permet de gagner du temps et d'économiser des ressources de traitement. ScaNN utilise souvent des algorithmes de regroupement, tels que les <a href="https://zilliz.com/blog/k-means-clustering">k-moyennes</a>, pour identifier les grappes, ce qui lui permet d'effectuer des recherches de similarité plus efficacement.</p></li>
<li><p><strong>Quantification</strong>: ScaNN applique un processus de quantification connu sous le nom de <a href="https://arxiv.org/abs/1908.10396">quantification vectorielle anisotrope</a> après le partitionnement. La quantification traditionnelle se concentre sur la minimisation de la distance globale entre les vecteurs originaux et compressés, ce qui n'est pas idéal pour des tâches telles que la <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">recherche du produit intérieur maximal (MIPS)</a>, où la similarité est déterminée par le produit intérieur des vecteurs plutôt que par la distance directe. La quantification anisotrope donne la priorité à la préservation des composantes parallèles entre les vecteurs, c'est-à-dire les parties les plus importantes pour le calcul de produits intérieurs précis. Cette approche permet à ScaNN de maintenir une précision MIPS élevée en alignant soigneusement les vecteurs compressés sur la requête, ce qui permet des recherches de similarité plus rapides et plus précises.</p></li>
<li><p><strong>Re-classement</strong>: La phase de reclassement est l'étape finale, au cours de laquelle ScaNN affine les résultats de la recherche obtenus lors des étapes de partitionnement et de quantification. Ce reclassement applique des calculs précis de produit intérieur aux meilleurs vecteurs candidats, ce qui garantit la précision des résultats finaux. Le reclassement est crucial dans les moteurs de recommandation à grande vitesse ou dans les applications de recherche d'images où le filtrage et le regroupement initiaux servent de couche grossière et où l'étape finale garantit que seuls les résultats les plus pertinents sont renvoyés à l'utilisateur.</p></li>
</ol>
<p>Les performances de <code translate="no">SCANN</code> sont contrôlées par deux paramètres clés qui vous permettent d'affiner l'équilibre entre vitesse et précision :</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: Contrôle si les données vectorielles originales sont stockées avec les représentations quantifiées. L'activation de ce paramètre améliore la précision lors du reclassement, mais augmente les besoins en stockage.</p></li>
<li><p><code translate="no">reorder_k</code>: Détermine le nombre de candidats affinés lors de la phase finale de reclassement. Des valeurs élevées améliorent la précision mais augmentent la latence de la recherche.</p></li>
</ul>
<p>Pour obtenir des conseils détaillés sur l'optimisation de ces paramètres en fonction de votre cas d'utilisation spécifique, reportez-vous à la section <a href="/docs/fr/scann.md#Index-params">Paramètres d'index</a>.</p>
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
    </button></h2><p>Pour construire un index <code translate="no">SCANN</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et d'autres paramètres pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d'index à construire. Dans cet exemple, définissez la valeur <code translate="no">SCANN</code>.</p></li>
<li><p><code translate="no">metric_type</code>: La méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/metric.md">Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la construction de l'index.</p>
<ul>
<li><code translate="no">with_raw_data</code>: Stockage ou non des données vectorielles d'origine avec la représentation quantifiée.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de construction disponibles pour l'index <code translate="no">SCANN</code>, reportez-vous à <a href="/docs/fr/scann.md#Index-building-params">Paramètres de construction de l'index</a>.</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
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
<li><code translate="no">reorder_k</code>: Nombre de candidats à affiner pendant la phase de reclassement.</li>
</ul>
<p>Pour en savoir plus sur les paramètres de recherche disponibles pour l'index <code translate="no">SCANN</code>, reportez-vous à <a href="/docs/fr/scann.md#Index-specific-search-params">Paramètres de recherche spécifiques à l'index</a>.</p></li>
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
    </button></h2><p>Cette section fournit une vue d'ensemble des paramètres utilisés pour construire un index et effectuer des recherches sur l'index.</p>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés sur <code translate="no">params</code> lors de la <a href="/docs/fr/scann.md#Build-index">création d'un index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Nombre d'unités de cluster</p></td>
     <td><p>[1, 65536]</p></td>
     <td><p>Une valeur élevée de <em>nlist</em> augmente l'efficacité de l'élagage et accélère généralement la recherche grossière, mais les partitions peuvent devenir trop petites, ce qui peut réduire le rappel ; une valeur plus faible de <em>nlist</em> analyse des grappes plus grandes, ce qui améliore le rappel mais ralentit la recherche.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>Stocker ou non les données vectorielles d'origine avec la représentation quantifiée. Lorsque cette option est activée, elle permet d'effectuer des calculs de similarité plus précis lors de la phase de reclassement en utilisant les vecteurs originaux au lieu des approximations quantifiées.</p></td>
     <td><p><strong>Type</strong>: Booléen</p><p><strong>Portée</strong>: <code translate="no">true</code>, <code translate="no">false</code></p><p><strong>Valeur par défaut</strong>: <code translate="no">true</code></p></td>
     <td><p>Définie sur <code translate="no">true</code> pour une <strong>plus grande précision de recherche</strong> et lorsque l'espace de stockage n'est pas une préoccupation majeure. Les données vectorielles originales permettent des calculs de similarité plus précis lors du reclassement.</p><p>La valeur <code translate="no">false</code> permet de <strong>réduire l'espace de stockage</strong> et l'utilisation de la mémoire, en particulier pour les grands ensembles de données. Toutefois, la précision de la recherche peut s'en trouver légèrement diminuée, car la phase de reclassement utilise des vecteurs quantifiés.</p><p><strong>Recommandé</strong>: Utilisez <code translate="no">true</code> pour les applications de production où la précision est essentielle.</p></td>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres qui peuvent être configurés dans <code translate="no">search_params.params</code> lors d'une <a href="/docs/fr/scann.md#Search-on-index">recherche sur l'index</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'ajustement</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>Contrôle le nombre de vecteurs candidats qui sont affinés pendant la phase de reclassement. Ce paramètre détermine le nombre de candidats les mieux classés lors des étapes initiales de partitionnement et de quantification qui sont réévalués à l'aide de calculs de similarité plus précis.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Une valeur plus élevée de <code translate="no">reorder_k</code> permet généralement d'<strong>améliorer la précision de la recherche</strong>, car davantage de candidats sont pris en compte lors de la phase finale d'affinage. Toutefois, cela <strong>augmente</strong> également <strong>le temps de recherche</strong> en raison des calculs supplémentaires.</p><p>Envisagez d'augmenter <code translate="no">reorder_k</code> lorsqu'il est essentiel d'obtenir un rappel élevé et que la vitesse de recherche n'est pas une préoccupation majeure. Un bon point de départ est 2-5x votre <code translate="no">limit</code> désiré (TopK résultats à retourner).</p><p>Envisagez de diminuer <code translate="no">reorder_k</code> pour privilégier les recherches plus rapides, en particulier dans les scénarios où une légère réduction de la précision est acceptable.</p><p>Dans la plupart des cas, nous vous recommandons de fixer une valeur comprise dans cette fourchette :<em>[limite</em>, <em>limite</em> * 5].</p></td>
   </tr>
</table>
