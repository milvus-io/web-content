---
id: ivf-rabitq-fastscan.md
title: IVF_RABITQ_FASTSCANCompatible with Milvus 3.0.x
summary: >-
  IVF_RABITQ_FASTSCAN combine l'IVF, la quantification binaire RaBitQ et le
  balayage par lots SIMD pour offrir une recherche vectorielle à haut débit et
  peu gourmande en mémoire.
beta: Milvus 3.0.x
---
<h1 id="IVFRABITQFASTSCAN" class="common-anchor-header">IVF_RABITQ_FASTSCAN<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#IVFRABITQFASTSCAN" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">IVF_RABITQ_FASTSCAN</code> combine le partitionnement IVF, la quantification binaire RaBitQ et le traitement par lots FastScan. Il stocke des codes RaBitQ à un bit pour les vecteurs de la base de données et traite ces codes par blocs de 32 vecteurs, adaptés au SIMD. Cela en fait un bon choix pour les charges de travail à haut débit et aux contraintes de mémoire importantes, pouvant accepter des résultats approximatifs.</p>
<p>Préférez l’ <code translate="no">IVF_RABITQ_FASTSCAN</code> à <a href="/docs/fr/ivf-rabitq.md">l’IVF_RABITQ</a> lorsque les recherches portent sur un grand nombre de candidats et que le débit est l’objectif principal. Le coût de configuration par requête de FastScan est amorti sur l’ensemble des blocs de code compressés ; cette méthode est donc généralement plus avantageuse pour les grands ensembles de données ou les longues listes IVF. Pour les petites collections ou les recherches portant sur un nombre restreint de candidats, utilisez plutôt <code translate="no">IVF_RABITQ</code>. Cette méthode prend également en charge la quantification configurable des requêtes, davantage de types de raffinement et les itérateurs.</p>
<h2 id="How-it-works" class="common-anchor-header">Fonctionnement<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">IVF_RABITQ_FASTSCAN</code> utilise les étapes suivantes :</p>
<ol>
<li><strong>Partitionnement IVF</strong>: l’IVF regroupe les vecteurs en grappes d’ <code translate="no">nlist</code> s et recherche les grappes les plus proches d’ <code translate="no">nprobe</code>.</li>
<li><strong>Codage RaBitQ</strong>: chaque résidu de vecteur est codé sous la forme d’un code RaBitQ à un bit par dimension.</li>
<li><strong>FastScan</strong>: l’index regroupe les codes pour un traitement par lots SIMD optimisé pour le cache. Il évalue 32 vecteurs de la base de données dans chaque lot.</li>
<li><strong>Affinement optionnel</strong>: lorsqu’il est activé, un affineur FP32 réévalue les candidats avant que Milvus ne renvoie les résultats finaux.</li>
</ol>
<p>L’index Faiss sous-jacent est disponible à l’adresse <code translate="no">IndexIVFRaBitQFastScan</code>. Knowhere l’enveloppe d’une transformation de rotation aléatoire et ajoute, en option, un raffineur FP32.</p>
<p>FastScan effectue des tâches de configuration par requête, telles que la construction et la quantification de tables de recherche liées à la requête, avant de parcourir les blocs de code compressés. Comparez les performances de <code translate="no">IVF_RABITQ</code> et de <code translate="no">IVF_RABITQ_FASTSCAN</code> avec vos données et vos paramètres de recherche.</p>
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
    </button></h2><p>Pour créer un index <code translate="no">IVF_RABITQ_FASTSCAN</code> sur un champ vectoriel dans Milvus, utilisez la méthode <code translate="no">add_index()</code> en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et les paramètres supplémentaires pour l’index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_RABITQ_FASTSCAN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
<span class="highlighted-wrapper-line">    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span></span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Enable refinement for higher recall</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;FP32&quot;</span> <span class="hljs-comment"># Refinement data format</span></span>
<span class="highlighted-comment-line">    } <span class="hljs-comment"># Index building params</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><p><code translate="no">index_type</code>: Le type d’index à créer. Dans cet exemple, définissez la valeur sur ` <code translate="no">IVF_RABITQ_FASTSCAN</code>`.</p></li>
<li><p><code translate="no">metric_type</code>: Méthode utilisée pour calculer la distance entre les vecteurs. Les valeurs prises en charge sont notamment <code translate="no">COSINE</code>, <code translate="no">L2</code> et <code translate="no">IP</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/metric.md">la section Types de métriques</a>.</p></li>
<li><p><code translate="no">params</code>: Options de configuration supplémentaires pour la création de l’index. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/ivf-rabitq-fastscan.md#Index-building-params">Paramètres de création d’index</a> ».</p></li>
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
<p>Définissez ` <code translate="no">nprobe</code> ` pour contrôler le nombre de clusters IVF à parcourir. Si l’index a été créé avec un raffinement, utilisez ` <code translate="no">refine_k</code> ` pour contrôler le pool de candidats transmis au raffineur FP32.</p>
<pre><code translate="no" class="language-python">client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your Milvus server address</span>

search_params = {
<span class="highlighted-comment-line">    <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">128</span>, <span class="hljs-comment"># Number of clusters to search</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment"># Refinement magnification factor</span></span>
<span class="highlighted-comment-line">    }</span>
}

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]], <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>, <span class="hljs-comment"># TopK results to return</span>
<span class="highlighted-wrapper-line">    search_params=search_params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cette configuration :</p>
<ul>
<li><code translate="no">params</code>: Options de configuration supplémentaires pour la recherche sur l’index. Pour plus de détails, reportez-vous à la section « <a href="/docs/fr/ivf-rabitq-fastscan.md#Index-specific-search-params">Paramètres de recherche spécifiques à l’index</a> ».</li>
</ul>
<div class="alert note">
<p>Contrairement à ` <code translate="no">IVF_RABITQ</code>`, ` <code translate="no">IVF_RABITQ_FASTSCAN</code> ` n’accepte pas le paramètre de recherche ` <code translate="no">rbq_bits_query</code> `. FastScan utilise toujours en interne une quantification des requêtes sur 8 bits ; omettez donc ` <code translate="no">rbq_bits_query</code> ` ou définissez-le sur ` <code translate="no">0</code>` ; les valeurs supérieures sont rejetées.</p>
</div>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">params</code> lors de <a href="/docs/fr/ivf-rabitq-fastscan.md#Build-index">la création d’un index</a>.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion d'optimisation</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>Nombre de clusters à créer à l'aide de l'algorithme k-means lors de la construction de l'index. Chaque cluster, représenté par un centroïde, stocke une liste de vecteurs. L'augmentation de ce paramètre réduit le nombre de vecteurs dans chaque cluster, créant ainsi des partitions plus petites et plus ciblées.</p></td>
     <td><p><strong>Type</strong>: Entier<br><strong>Plage</strong>: [1, 65536]<br><strong>Valeur par défaut</strong>: <code translate="no">128</code></p></td>
     <td><p>Des valeurs d'<code translate="no">nlist</code> s plus élevées améliorent le rappel en créant des clusters plus affinés, mais augmentent le temps de création de l'index. Optimisez ce paramètre en fonction de la taille de l'ensemble de données et des ressources disponibles. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>Active le processus d'affinement et stocke les données affinées. L'<code translate="no">IVF_RABITQ_FASTSCAN</code> ne prend en charge que l'affinement en FP32.</p></td>
     <td><p><strong>Type</strong>: booléen<br><strong>Plage</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]<br><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Définissez cette valeur sur <code translate="no">true</code> si un taux de rappel supérieur ou égal à 0,9 est requis. L'activation du raffinement améliore la précision, mais augmente les besoins en stockage et la durée de création de l'index.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>Définit la représentation des données utilisée pour le raffinement lorsque l'option « <code translate="no">refine</code> » est activée. Obligatoire uniquement lorsque l'option « <code translate="no">refine</code> » est définie sur « <code translate="no">true</code> ».</p></td>
     <td><p><strong>Type</strong>: Chaîne de caractères<br><strong>Plage</strong>: [<code translate="no">FP32</code>, <code translate="no">FLAT</code>]<br><strong>Valeur par défaut</strong>: Aucune</p></td>
     <td><p><code translate="no">IVF_RABITQ_FASTSCAN</code> Prend uniquement en charge le raffinement FP32, et <code translate="no">FLAT</code> est identique à <code translate="no">FP32</code>. La correspondance des valeurs n'est pas sensible à la casse.</p></td>
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
    </button></h3><p>Le tableau suivant répertorie les paramètres pouvant être configurés dans <code translate="no">search_params.params</code> lors <a href="/docs/fr/ivf-rabitq-fastscan.md#Search-on-index">d’une recherche sur l’index</a>.</p>
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
     <td><p>Nombre de clusters à analyser pour rechercher des candidats. Des valeurs plus élevées permettent d'analyser davantage de clusters, ce qui améliore le rappel en élargissant le champ de recherche, mais au prix d'une latence accrue des requêtes.</p></td>
     <td><p><strong>Type</strong>: Entier<br><strong>Plage</strong>: [1, <em>nlist</em>]<br><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>L'augmentation de cette valeur améliore le rappel mais peut ralentir la recherche. Définissez l'<code translate="no">nprobe</code> ement en fonction de l'<code translate="no">nlist</code> afin d'équilibrer vitesse et précision. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette plage : [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>Le processus de raffinement utilise une quantification de meilleure qualité pour sélectionner le nombre nécessaire de voisins les plus proches parmi un ensemble de candidats <code translate="no">refine_k</code> fois plus grand, choisi à l'aide de IVF_RABITQ_FASTSCAN. N'a aucun effet si le raffinement est désactivé.</p></td>
     <td><p><strong>Type</strong>: Float<br><strong>Plage</strong>: [1, <em>float_max</em>)<br><strong>Valeur par défaut</strong>: <code translate="no">1</code></p></td>
     <td><p>Des valeurs d’ <code translate="no">refine_k</code> s plus élevées réduisent le QPS mais augmentent le taux de rappel. Commencez par <code translate="no">1</code> et testez les valeurs <code translate="no">2</code>, <code translate="no">3</code>, <code translate="no">4</code> et <code translate="no">5</code> pour trouver le compromis optimal entre le QPS et le taux de rappel pour votre jeu de données.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rbq_bits_query</code></p></td>
     <td><p>Détermine si une quantification scalaire supplémentaire d’un vecteur de requête est appliquée. <strong>Non pris en charge sur <code translate="no">IVF_RABITQ_FASTSCAN</code></strong>: l’index utilise toujours une quantification de requête à 8 bits en interne. Omettez ce paramètre ou définissez-le sur <code translate="no">0</code>; les valeurs supérieures à <code translate="no">0</code> sont rejetées.</p></td>
     <td><p><strong>Type</strong>: Entier<br><strong>Plage</strong>: [0, 0]<br><strong>Valeur par défaut</strong>: <code translate="no">0</code></p></td>
     <td><p>Ne le définissez pas. Pour une quantification de requête configurable, utilisez plutôt <a href="/docs/fr/ivf-rabitq.md">IVF_RABITQ</a>.</p></td>
   </tr>
</table>
<h2 id="Limitations" class="common-anchor-header">Limitations<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li>FastScan utilise un encodage de base de données RaBitQ fixe à 1 bit et une quantification des requêtes à 8 bits. L'<code translate="no">rbq_bits_query</code> doit être omis ou défini sur <code translate="no">0</code>.</li>
<li>Seul le raffinement FP32 (équivalent à <code translate="no">FLAT</code>) est pris en charge.</li>
<li>Les itérateurs ne sont pas pris en charge.</li>
<li>Il s’agit d’un index CPU. Il ne fonctionne pas sur GPU.</li>
<li>Les performances réelles dépendent de la prise en charge SIMD du processeur, de la dimension vectorielle, de <code translate="no">nlist</code>, de <code translate="no">nprobe</code> et de la distribution des données. Effectuez des tests de performance avec votre charge de travail avant de le déployer en production.</li>
</ul>
<p>Pour la variante RaBitQ non FastScan et ses options de raffinement supplémentaires, voir <a href="/docs/fr/ivf-rabitq.md">IVF_RABITQ</a>.</p>
