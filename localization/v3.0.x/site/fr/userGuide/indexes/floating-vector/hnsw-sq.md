---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ associe les graphes « Hierarchical Navigable Small World » (HNSW) à la
  quantification scalaire (SQ), créant ainsi une méthode avancée d'indexation
  vectorielle qui offre un compromis contrôlable entre taille et précision. Par
  rapport au HNSW standard, ce type d'index conserve une vitesse de traitement
  des requêtes élevée tout en entraînant une légère augmentation du temps de
  construction de l'index.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong> combine les graphes HNSW (Hierarchical Navigable Small World) et la quantification scalaire (SQ), créant ainsi une méthode avancée d'indexation vectorielle qui offre un compromis contrôlable entre taille et précision. Par rapport au <a href="/docs/fr/hnsw.md">HNSW</a> standard, ce type d'index conserve une vitesse de traitement des requêtes élevée tout en entraînant une légère augmentation du temps de construction de l'index.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_SQ combine deux techniques d’indexation : <strong>HNSW</strong> pour une navigation rapide basée sur des graphes et <strong>SQ</strong> pour une compression vectorielle efficace.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW construit un graphe multicouche où chaque nœud correspond à un vecteur du jeu de données. Dans ce graphe, les nœuds sont reliés en fonction de leur similarité, ce qui permet un parcours rapide à travers l’espace de données. La structure hiérarchique permet à l’algorithme de recherche de restreindre le nombre de voisins candidats, accélérant ainsi considérablement le processus de recherche dans les espaces de haute dimension.</p>
<p>Pour plus d’informations, consultez la section <a href="/docs/fr/hnsw.md">HNSW</a>.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ est une méthode de compression des vecteurs consistant à les représenter avec moins de bits. Par exemple :</p>
<ul>
<li><p><strong>SQ8</strong> utilise 8 bits, mappant les valeurs sur 256 niveaux. Pour plus d’informations, consultez <a href="/docs/fr/ivf-sq8.md#SQ8">IVF_SQ8</a>.</p></li>
<li><p><strong>SQ6</strong> utilise 6 bits pour représenter chaque valeur à virgule flottante, ce qui donne 64 niveaux discrets.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>Cette réduction de la précision diminue considérablement l'empreinte mémoire et accélère le calcul tout en conservant la structure essentielle des données.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les scénarios exigeant une vitesse de requête extrême et une utilisation minimale de la mémoire, Milvus introduit l’ <code translate="no">SQ4U</code>, une quantification scalaire uniforme sur 4 bits. Il s’agit d’une forme agressive de quantification scalaire qui compresse la valeur à virgule flottante de chaque dimension en un entier non signé <strong>de 4 bits</strong>.</p>
<p>Le « U » de SQ4U signifie « Uniforme ». Contrairement à la quantification scalaire non uniforme, qui calcule généralement les valeurs minimales et maximales indépendamment pour chaque dimension (quantification par dimension), SQ4U applique une stratégie <strong>de quantification uniforme globale</strong>:</p>
<ol>
<li><p><strong>Statistiques globales</strong>: le système calcule une <strong>seule</strong> valeur minimale <code translate="no">vmin</code> et une <strong>seule</strong> plage de valeurs <code translate="no">vdiff</code> qui s’appliquent à <strong>toutes les dimensions</strong> du vecteur (ou à l’ensemble du segment de vecteur).</p></li>
<li><p><strong>Mappage uniforme</strong>: la plage de valeurs globale est divisée en 16 intervalles égaux. Chaque valeur à virgule flottante du vecteur, quelle que soit la dimension à laquelle elle appartient, est mappée sur un entier de 4 bits (0–15) à l’aide de ces paramètres partagés.</p></li>
</ol>
<p><strong>Avantages en termes de performances :</strong></p>
<ul>
<li><p><strong>Taux de compression de 8 :</strong> réduit la taille de 8 fois par rapport à <code translate="no">FP32</code> et de 2 fois par rapport à <code translate="no">SQ8</code>, ce qui allège considérablement la pression sur la bande passante mémoire — souvent le goulot d’étranglement dans la recherche vectorielle.</p></li>
<li><p><strong>Optimisation SIMD :</strong> la structure compacte permet aux processeurs modernes (AVX2/AVX-512) de traiter davantage de dimensions par cycle. Surtout, l’utilisation de paramètres globaux élimine la nécessité de charger des valeurs d’échelle et de décalage variables lors du calcul de la distance, ce qui permet de maintenir le pipeline d’instructions pleinement saturé.</p></li>
<li><p><strong>Efficacité du cache :</strong> des vecteurs de plus petite taille permettent de stocker davantage de données dans le cache du processeur, ce qui réduit la latence liée aux accès mémoire.</p></li>
</ul>
<div class="alert note">
<p>Grâce au partage de ses paramètres globaux, SQ4U offre des performances optimales sur des données normalisées ou des ensembles de données présentant des distributions de valeurs homogènes entre les dimensions.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ combine les atouts de HNSW et de SQ pour permettre une recherche approximative du plus proche voisin efficace. Voici comment le processus fonctionne :</p>
<ol>
<li><p><strong>Compression des données :</strong> SQ compresse les vecteurs à l’aide de l’algorithme « <code translate="no">sq_type</code> » (par exemple, SQ6 ou SQ8), ce qui réduit l’utilisation de la mémoire. Cette compression peut diminuer la précision, mais elle permet au système de traiter des ensembles de données plus volumineux.</p></li>
<li><p><strong>Construction du graphe :</strong> les vecteurs compressés sont utilisés pour construire un graphe HNSW. Les données étant compressées, le graphe obtenu est plus petit et permet une recherche plus rapide.</p></li>
<li><p><strong>Récupération des candidats :</strong> lorsqu’un vecteur de requête est fourni, l’algorithme utilise les données compressées pour identifier rapidement un ensemble de voisins candidats à partir du graphe HNSW.</p></li>
<li><p><strong>(Facultatif) Affinement des résultats :</strong> les résultats initiaux peuvent être affinés pour une meilleure précision, en fonction des paramètres suivants :</p>
<ul>
<li><p><code translate="no">refine</code>: Détermine si cette étape d’affinage est activée. Lorsqu’elle est définie sur « <code translate="no">true</code> », le système recalcule les distances à l’aide de représentations de plus haute précision ou non compressées.</p></li>
<li><p><code translate="no">refine_type</code>: Spécifie le niveau de précision des données utilisées lors du raffinement (par exemple, SQ6, SQ8, BF16). Un choix de précision plus élevée, tel que « <code translate="no">FP32</code> », peut donner des résultats plus précis mais nécessite davantage de mémoire. Ce niveau doit dépasser la précision de l’ensemble de données compressé d’origine définie par « <code translate="no">sq_type</code> ».</p></li>
<li><p><code translate="no">refine_k</code>: Agit comme un facteur d’agrandissement. Par exemple, si votre « top <em>k »</em> est égal à 100 et que « <code translate="no">refine_k</code> » est égal à 2, le système reclassifie les 200 meilleurs candidats et renvoie les 100 meilleurs, améliorant ainsi la précision globale.</p></li>
</ul></li>
</ol>
<p>Pour obtenir la liste complète des paramètres et des valeurs valides, consultez la section « <a href="/docs/fr/hnsw-sq.md#Index-params">Paramètres d’index</a> ».</p>
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
    </button></h2><p>Pour créer un index « <code translate="no">HNSW_SQ</code> » sur un champ vectoriel dans Milvus, utilisez la méthode « <code translate="no">add_index()</code> » en spécifiant « <code translate="no">index_type</code> », « <code translate="no">metric_type</code> » et les paramètres supplémentaires pour l’index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d’index à créer. Dans cet exemple, définissez la valeur sur ` <code translate="no">HNSW_SQ</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont notamment <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/metric.md">la section Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la création de l’index. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/hnsw-sq.md#Index-building-params">Paramètres de création d’index</a> ».</p></li>
</ul>
<p>Une fois les paramètres d’index configurés, vous pouvez créer l’index en utilisant directement la méthode ` <code translate="no">create_index()</code> ` ou en transmettant les paramètres d’index à la méthode ` <code translate="no">create_collection</code> `. Pour plus de détails, consultez la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Search-on-index" class="common-anchor-header">Recherche dans l’index<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l’index. Pour plus de détails, consultez la section « <a href="/docs/fr/hnsw-sq.md#Index-specific-search-params">Paramètres de recherche spécifiques à l’index</a> ».</li>
</ul>
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
    </button></h2><p>Cette section présente une vue d'ensemble des paramètres utilisés pour créer un index et effectuer des recherches sur celui-ci.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de création d’index<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">la création d’un index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'optimisation</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>Nombre maximal de connexions (ou arêtes) que chaque nœud peut avoir dans le graphe, y compris les arêtes sortantes et entrantes.</p><p>Ce paramètre a une incidence directe sur la construction de l'index et sur la recherche.</p></td>
     <td><p><strong>Type</strong>: entier</p><p><strong>Plage</strong>: [2, 2048]</p><p><strong>Valeur par défaut</strong>: <code translate="no">30</code> (jusqu’à 30 arêtes sortantes et 30 arêtes entrantes par nœud)</p></td>
     <td><p>Un <code translate="no">M</code> plus élevé conduit généralement à <strong>une meilleure précision</strong>, mais <strong>augmente la consommation de mémoire</strong> et <strong>ralentit à la fois la construction de l’index et la recherche</strong>.</p><p>Envisagez d’augmenter la valeur de « <code translate="no">M</code> » pour les ensembles de données à haute dimensionnalité ou lorsqu’un rappel élevé est crucial.</p><p>Envisagez de réduire l’ <code translate="no">M</code> lorsque l’utilisation de la mémoire et la vitesse de recherche sont des priorités.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>Nombre de voisins candidats pris en compte pour la connexion lors de la construction de l’index.</p><p>Un plus grand nombre de candidats est évalué pour chaque nouvel élément, mais le nombre maximal de connexions effectivement établies reste limité par la valeur de ` <code translate="no">M</code>`.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">360</code></p></td>
     <td><p>Une valeur plus élevée de ` <code translate="no">efConstruction</code> ` se traduit généralement par un <strong>index plus précis</strong>, car davantage de connexions potentielles sont explorées. Cependant, cela entraîne également <strong>un temps d'indexation plus long et une utilisation accrue de la mémoire</strong> pendant la construction.</p><p>Envisagez d’augmenter la valeur de ` <code translate="no">efConstruction</code> ` pour améliorer la précision, en particulier dans les cas où le temps d’indexation est moins critique.</p><p>Envisagez de réduire l'<code translate="no">efConstruction</code> pour accélérer la construction de l'index lorsque les contraintes de ressources sont un facteur important.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>Spécifie la méthode de quantification scalaire utilisée pour compresser les vecteurs. Chaque option offre un compromis différent entre compression et précision :</p><ul><li><p><code translate="no">SQ4U</code>: Code les vecteurs à l’aide d’une quantification uniforme sur 4 bits. Ce mode offre la vitesse et la compression les plus élevées.</p></li><li><p><code translate="no">SQ6</code>: Encode les vecteurs à l’aide d’entiers de 6 bits.</p></li><li><p><code translate="no">SQ8</code>: Encode les vecteurs à l'aide d'entiers de 8 bits.</p></li><li><p><code translate="no">BF16</code>: Utilise le format Bfloat16.</p></li><li><p><code translate="no">FP16</code>: Utilise le format standard à virgule flottante 16 bits.</p></li></ul></td>
     <td><p><strong>Type</strong>: Chaîne de caractères</p><p><strong>Plage</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>Valeur par défaut</strong>: <code translate="no">SQ8</code></p></td>
     <td><p>Le choix de <code translate="no">sq_type</code> dépend des besoins spécifiques de l’application. <code translate="no">SQ4U</code> est choisi pour une vitesse et une efficacité mémoire maximales. <code translate="no">SQ6</code> ou <code translate="no">SQ8</code> peuvent convenir pour des performances équilibrées. En revanche, si la précision est primordiale, <code translate="no">BF16</code> ou <code translate="no">FP16</code> pourraient être préférés.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Un indicateur booléen qui détermine si une étape d’affinement est appliquée pendant la recherche. L’affinement consiste à reclasser les résultats initiaux en calculant les distances exactes entre le vecteur de requête et les candidats.</p></td>
     <td><p><strong>Type</strong>: Booléen</p><p><strong>Plage</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Définissez-le sur <code translate="no">true</code> si une grande précision est essentielle et que vous pouvez tolérer des temps de recherche légèrement plus longs. Utilisez <code translate="no">false</code> si la vitesse est une priorité et qu’un léger compromis en termes de précision est acceptable.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Détermine la précision des données utilisées pour le raffinement.</p><p>Cette précision doit être supérieure à celle des vecteurs compressés (telle que définie par <code translate="no">sq_type</code>), ce qui affecte à la fois la précision des vecteurs reclassés et leur empreinte mémoire.</p></td>
     <td><p><strong>Type</strong>: Chaîne de caractères</p><p><strong>Plage</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p>Utilisez <code translate="no">FP32</code> pour une précision maximale au prix d’une consommation de mémoire plus élevée, ou <code translate="no">SQ6</code>/<code translate="no">SQ8</code> pour une meilleure compression. <code translate="no">BF16</code> et <code translate="no">FP16</code> offrent une alternative équilibrée.</p></td>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/hnsw-sq.md#Search-on-index">d’une recherche sur l’index</a>. Les paramètres du serveur peuvent remplacer les valeurs par défaut des paramètres que vous omettez.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'optimisation</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>Contrôle l'étendue de la recherche lors de la récupération du plus proche voisin. Il détermine le nombre de nœuds visités et évalués en tant que plus proches voisins potentiels. </p><p>Ce paramètre n'affecte que le processus de recherche et s'applique exclusivement à la couche inférieure du graphe.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage</strong>: [1, <em>int_max</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">max(limit, 16)</code> pour une recherche kNN classique ; <code translate="no">512</code> pour une recherche par plage.</p><p>Pour la recherche kNN classique, la valeur explicite de ` <code translate="no">ef</code> ` doit être supérieure ou égale à ` <code translate="no">limit</code> ` (le nombre de voisins les plus proches à renvoyer).</p></td>
     <td><p>Une valeur <code translate="no">ef</code> plus élevée conduit généralement à <strong>une meilleure précision de recherche</strong>, car un plus grand nombre de voisins potentiels est pris en compte. Cependant, cela <strong>augmente</strong> également <strong>le temps de recherche</strong>.</p><p>Envisagez d’augmenter la valeur de ` <code translate="no">ef</code> ` lorsque l’obtention d’un rappel élevé est essentielle et que la vitesse de recherche est moins importante.</p><p>Envisagez de réduire l’ <code translate="no">ef</code> pour privilégier des recherches plus rapides, en particulier dans les cas où une légère perte de précision est acceptable.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Facteur d’amplification qui détermine le nombre de candidats supplémentaires examinés lors de la phase d’affinement, par rapport aux K premiers résultats demandés.</p></td>
     <td><p><strong>Type</strong>: nombre à virgule flottante</p><p><strong>Plage</strong>: [1, <em>float_max</em>)</p><p><strong>Valeur par défaut</strong>: 1</p></td>
     <td><p>Des valeurs plus élevées de « <code translate="no">refine_k</code> » peuvent améliorer le rappel et la précision, mais augmentent également la durée de la recherche et la consommation de ressources. Une valeur de 1 signifie que le processus d'affinage ne prend en compte que les K premiers résultats initiaux.</p></td>
   </tr>
</table>
