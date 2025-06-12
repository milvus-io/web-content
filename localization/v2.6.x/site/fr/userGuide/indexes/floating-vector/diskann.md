---
id: diskann.md
title: DISKANN
summary: >-
  Dans les scénarios à grande échelle, où les ensembles de données peuvent
  comprendre des milliards, voire des trillions de vecteurs, les méthodes
  d'indexation en mémoire standard (par exemple, HNSW, IVF_FLAT) ne parviennent
  souvent pas à suivre le rythme en raison des limites de la mémoire. DISKANN
  propose une approche basée sur le disque qui relève ces défis en maintenant
  une précision et une vitesse de recherche élevées lorsque la taille de
  l'ensemble de données dépasse la RAM disponible.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans les scénarios à grande échelle, où les ensembles de données peuvent comprendre des milliards, voire des trillions de vecteurs, les méthodes d'indexation en mémoire standard (par exemple, <a href="/docs/fr/hnsw.md">HNSW</a>, <a href="/docs/fr/ivf-flat.md">IVF_FLAT</a>) ne parviennent souvent pas à suivre le rythme en raison des limites de la mémoire. <strong>DISKANN</strong> propose une approche basée sur le disque qui relève ces défis en maintenant une précision et une vitesse de recherche élevées lorsque la taille de l'ensemble de données dépasse la RAM disponible.</p>
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
    </button></h2><p><strong>DISKANN</strong> combine deux techniques clés pour une recherche vectorielle efficace :</p>
<ul>
<li><p><strong>Graphique de Vamana</strong> - Un index <strong>basé sur un disque</strong> et un <strong>graphique</strong> qui relie les points de données (ou vecteurs) pour une navigation efficace pendant la recherche.</p></li>
<li><p><strong>Quantification des produits (PQ</strong> ) - Une méthode de compression <strong>en mémoire</strong> qui réduit la taille des vecteurs, permettant des calculs rapides de la distance approximative entre les vecteurs.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">Construction de l'index</h3><h4 id="Vamana-graph" class="common-anchor-header">Graphe de Vamana</h4><p>Le graphe de Vamana est au cœur de la stratégie de DISKANN basée sur les disques. Il peut gérer de très grands ensembles de données car il n'a pas besoin de résider entièrement dans la mémoire pendant ou après sa construction.</p>
<p>La figure suivante montre comment un graphe de Vamana est construit.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>Connexions aléatoires initiales :</strong> Chaque point de données (vecteur) est représenté par un nœud dans le graphe. Ces nœuds sont initialement connectés de manière aléatoire, formant un réseau dense. Généralement, un nœud commence avec environ 500 arêtes (ou connexions) pour une large connectivité.</p></li>
<li><p><strong>Affinage pour plus d'efficacité :</strong> Le graphe aléatoire initial est soumis à un processus d'optimisation afin de le rendre plus efficace pour la recherche. Ce processus comprend deux étapes clés :</p>
<ul>
<li><p><strong>L'élagage des arêtes redondantes :</strong> L'algorithme élimine les connexions inutiles en se basant sur les distances entre les nœuds. Cette étape donne la priorité aux arêtes de meilleure qualité.</p>
<p>Le paramètre <code translate="no">max_degree</code> limite le nombre maximal d'arêtes par nœud. Une valeur plus élevée de <code translate="no">max_degree</code> se traduit par un graphe plus dense, ce qui permet de trouver des voisins plus pertinents (rappel plus élevé), mais augmente également l'utilisation de la mémoire et le temps de recherche.</p></li>
<li><p><strong>Ajout de raccourcis stratégiques :</strong> Vamana introduit des arêtes à longue portée, reliant des points de données très éloignés les uns des autres dans l'espace vectoriel. Ces raccourcis permettent aux recherches de sauter rapidement à travers le graphe, en contournant les nœuds intermédiaires et en accélérant considérablement la navigation.</p>
<p>Le paramètre <code translate="no">search_list_size</code> détermine l'ampleur du processus d'affinage du graphe. Une valeur plus élevée de <code translate="no">search_list_size</code> étend la recherche de voisins pendant la construction et peut améliorer la précision finale, mais augmente le temps de construction de l'index.</p></li>
</ul></li>
</ol>
<p>Pour en savoir plus sur le réglage des paramètres, reportez-vous à <a href="/docs/fr/diskann.md#diskann-params">DISKANN params</a>.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN utilise <strong>PQ</strong> pour compresser les vecteurs à haute dimension en représentations plus petites<strong>(codes PQ</strong>), qui sont stockées en mémoire pour des calculs rapides de distance approximative.</p>
<p>Le paramètre <code translate="no">pq_code_budget_gb_ratio</code> gère l'empreinte mémoire dédiée au stockage de ces codes PQ. Il représente un rapport entre la taille totale des vecteurs (en gigaoctets) et l'espace alloué au stockage des codes PQ. Vous pouvez calculer le budget réel des codes PQ (en gigaoctets) à l'aide de la formule suivante :</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>où :</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> est la taille totale des vecteurs (en gigaoctets).</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> est un ratio défini par l'utilisateur, représentant la fraction de la taille totale des données réservée aux codes PQ. Ce paramètre permet de trouver un compromis entre la précision de la recherche et les ressources mémoire. Pour plus d'informations sur le réglage des paramètres, reportez-vous à <a href="/docs/fr/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
</ul>
<p>Pour plus de détails techniques sur la méthode PQ sous-jacente, voir <a href="/docs/fr/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>.</p>
<h3 id="Search-process" class="common-anchor-header">Processus de recherche</h3><p>Une fois que l'index (le graphe de Vamana sur le disque et les codes PQ en mémoire) est construit, DISKANN effectue les recherches ANN comme suit :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>Requête et point d'entrée :</strong> Un vecteur de requête est fourni pour localiser les voisins les plus proches. DISKANN démarre à partir d'un point d'entrée sélectionné dans le graphe de Vamana, souvent un nœud proche du centroïde global de l'ensemble de données. Le centroïde global représente la moyenne de tous les vecteurs, ce qui permet de minimiser la distance à parcourir dans le graphe pour trouver les voisins souhaités.</p></li>
<li><p><strong>Exploration du voisinage :</strong> L'algorithme rassemble les voisins candidats potentiels (cercles en rouge dans la figure) à partir des bords du nœud actuel, en s'appuyant sur les codes PQ en mémoire pour approximer les distances entre ces candidats et le vecteur de la requête. Ces voisins potentiels sont les nœuds directement connectés au point d'entrée sélectionné par des arêtes dans le graphe de Vamana.</p></li>
<li><p><strong>Sélection des nœuds pour un calcul précis de la distance :</strong> À partir des résultats approximatifs, un sous-ensemble des voisins les plus prometteurs (cercles en vert sur la figure) est sélectionné pour des évaluations précises de la distance en utilisant leurs vecteurs originaux non compressés. Cette opération nécessite la lecture des données à partir du disque, ce qui peut prendre beaucoup de temps. DISKANN utilise deux paramètres pour contrôler cet équilibre délicat entre précision et rapidité :</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: Un ration qui contrôle l'étendue de la recherche, déterminant le nombre de voisins candidats sélectionnés en parallèle pour explorer leurs voisins. Une valeur plus élevée de <code translate="no">beam_width_ratio</code> entraîne une exploration plus large, ce qui peut conduire à une plus grande précision, mais aussi à une augmentation des coûts de calcul et des entrées/sorties sur disque. La largeur du faisceau, ou le nombre de nœuds sélectionnés, est déterminée à l'aide de la formule suivante : <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: La proportion de mémoire allouée à la mise en cache des données du disque fréquemment consultées. Cette mise en cache permet de minimiser les entrées/sorties sur disque et d'accélérer les recherches répétées, car les données sont déjà en mémoire.</p></li>
</ul>
<p>Pour en savoir plus sur le réglage des paramètres, reportez-vous à <a href="/docs/fr/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>.</p></li>
<li><p><strong>Exploration itérative :</strong> La recherche affine de manière itérative l'ensemble des candidats, en effectuant à plusieurs reprises des évaluations approximatives (à l'aide de PQ) suivies de vérifications précises (à l'aide des vecteurs originaux du disque) jusqu'à ce qu'un nombre suffisant de voisins soit trouvé.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Activer DISKANN dans Milvus<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Par défaut, <strong>DISKANN</strong> est désactivé dans Milvus afin de donner la priorité à la vitesse des index en mémoire pour les ensembles de données qui tiennent aisément dans la RAM. Toutefois, si vous travaillez avec des ensembles de données volumineux ou si vous souhaitez profiter de l'évolutivité de <strong>DISKANN</strong> et de l'optimisation SSD, vous pouvez facilement l'activer.</p>
<p>Voici comment activer DISKANN dans Milvus :</p>
<ol>
<li><p><strong>Mise à jour du fichier de configuration Milvus</strong></p>
<ol>
<li><p>Localisez votre fichier de configuration Milvus<strong>.</strong> (Reportez-vous à la documentation Milvus sur la configuration pour plus de détails sur la recherche de ce fichier).</p></li>
<li><p>Recherchez le paramètre <code translate="no">queryNode.enableDisk</code> et définissez sa valeur sur <code translate="no">true</code>:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>Optimiser le stockage pour DISKANN</strong></p></li>
</ol>
<p>Pour garantir les meilleures performances avec DISKANN, il est recommandé de stocker vos données Milvus sur un SSD NVMe rapide. Voici comment procéder pour les déploiements Milvus autonome et en cluster :</p>
<ul>
<li><p><strong>Milvus autonome</strong></p>
<ul>
<li><p>Monter le répertoire de données Milvus sur un SSD NVMe dans le conteneur Milvus. Vous pouvez le faire dans le fichier <code translate="no">docker-compose.yml</code> ou à l'aide d'autres outils de gestion de conteneurs.</p></li>
<li><p>Par exemple, si votre SSD NVMe est monté sur <code translate="no">/mnt/nvme</code>, vous devez mettre à jour la section <code translate="no">volumes</code>de votre <code translate="no">docker-compose.yml</code> comme suit :</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Cluster Milvus</strong></p>
<ul>
<li><p>Monter le répertoire de données Milvus sur un disque SSD NVMe dans les conteneurs QueryNode et IndexNode. Vous pouvez y parvenir par le biais de votre configuration d'orchestration de conteneurs.</p></li>
<li><p>En montant les données sur un SSD NVMe dans les deux types de nœuds, vous garantissez des vitesses de lecture et d'écriture rapides pour les opérations de recherche et d'indexation.</p></li>
</ul></li>
</ul>
<p>Une fois ces modifications effectuées, redémarrez votre instance Milvus pour que les paramètres prennent effet. Désormais, Milvus exploitera les capacités de DISKANN pour traiter des ensembles de données volumineux et fournir une recherche vectorielle efficace et évolutive.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">Configuration de DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>Les paramètres DISKANN peuvent être configurés à l'aide de deux méthodes principales :</p>
<ul>
<li><p><strong>Fichier de configuration Milvus :</strong> Ajustez les paramètres DISKANN via le fichier de configuration Milvus. Cette méthode convient pour définir les options de configuration générale de votre instance Milvus.</p></li>
<li><p><strong>SDK Milvus :</strong> Ajustez finement les paramètres DISKANN à l'aide du SDK Milvus pendant la création d'index ou les opérations de recherche. Cela permet un contrôle plus granulaire et des ajustements de paramètres dynamiques basés sur des cas d'utilisation spécifiques.</p></li>
</ul>
<div class="alert note">
<p>La configuration effectuée par le SDK remplace tous les paramètres définis dans le fichier de configuration, ce qui offre une flexibilité et un contrôle pour des applications et des ensembles de données spécifiques.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Fichier de configuration Milvus</h3><p>Voici un exemple de définition des paramètres DISKANN dans le fichier <code translate="no">milvus.yaml</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">Configuration du SDK</h3><p>Voici un exemple de définition des paramètres DISKANN à l'aide du SDK Milvus.</p>
<h4 id="Build" class="common-anchor-header">Construction</h4><p>Pour construire un index <code translate="no">IVF_FLAT</code> sur un champ de vecteurs dans Milvus, utilisez la méthode <code translate="no">add_index()</code>, en spécifiant les paramètres <code translate="no">index_type</code>, <code translate="no">metric_type</code> et d'autres paramètres pour l'index.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Une fois les paramètres de l'index configurés, vous pouvez créer l'index en utilisant directement la méthode <code translate="no">create_index()</code> ou en transmettant les paramètres de l'index dans la méthode <code translate="no">create_collection</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h4 id="Search" class="common-anchor-header">Recherche</h4><p>Une fois l'index construit et les entités insérées, vous pouvez effectuer des recherches de similarité sur l'index.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">Paramètres DISKANN<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>Le réglage fin des paramètres de DISKANN vous permet d'adapter son comportement à votre jeu de données spécifique et à votre charge de travail de recherche, en trouvant le bon équilibre entre la vitesse, la précision et l'utilisation de la mémoire.</p>
<h3 id="Index-building-params" class="common-anchor-header">Paramètres de construction d'index</h3><p>Ces paramètres influencent la façon dont l'index DISKANN est construit. Leur réglage peut affecter la taille de l'index, le temps de construction et la qualité de la recherche.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description de l'index</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Contrôle le nombre maximal de connexions (arêtes) que chaque point de données peut avoir dans le graphique Vamana.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, 512]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">56</code></p></td>
     <td><p>Des valeurs plus élevées créent des graphiques plus denses, ce qui peut augmenter la mémorisation (trouver des résultats plus pertinents), mais aussi l'utilisation de la mémoire et le temps de construction. 
 Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Détermine le nombre de voisins candidats pris en compte pour chaque point de données lors de la construction du graphique.</p></td>
     <td><p><strong>Type</strong>: Entier <strong>Plage</strong>: [1, <em>int_max</em>]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">100</code></p></td>
     <td><p>Des valeurs plus élevées conduisent à des graphes plus complets, améliorant potentiellement la qualité de la recherche mais augmentant également le temps de construction. 
 Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Contrôle la quantité de mémoire allouée à la mise en cache des parties du graphe fréquemment consultées lors de la construction de l'index.</p></td>
     <td><p><strong>Type</strong>: Flottant <strong>Plage</strong>: [0.0, 0.3)</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">0.10</code></p></td>
     <td><p>Une valeur élevée alloue plus de mémoire pour la mise en cache, ce qui réduit considérablement les entrées/sorties sur disque mais consomme plus de mémoire système. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Contrôle la taille des codes PQ (représentations compressées des points de données) par rapport à la taille des données non compressées.</p></td>
     <td><p><strong>Type</strong>: Flottant <strong>Plage</strong>: (0,0, 0,25)</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Un ratio plus élevé permet d'obtenir des résultats de recherche plus précis en allouant une plus grande proportion de la mémoire aux codes PQ, ce qui permet de stocker plus d'informations sur les vecteurs originaux. Un ratio plus faible réduit l'utilisation de la mémoire, mais sacrifie potentiellement la précision, car les codes PQ plus petits conservent moins d'informations. Cette approche convient aux scénarios dans lesquels les contraintes de mémoire sont importantes, et permet éventuellement d'indexer des ensembles de données plus importants.</p>
<p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : (0.0625, 0.25)</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">Paramètres de recherche spécifiques à l'index</h3><p>Ces paramètres influencent la manière dont DISKANN effectue les recherches. Leur réglage peut avoir un impact sur la vitesse de recherche, la latence et l'utilisation des ressources.</p>
<table>
   <tr>
     <th></th>
     <th><p>Paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>Contrôle le degré de parallélisme pendant la recherche en déterminant le nombre maximum de demandes d'E/S de disque parallèles par rapport au nombre de cœurs de CPU disponibles.</p></td>
     <td><p><strong>Type</strong>: Flottant <strong>Plage</strong>: [1, max(128 / nombre de CPU, 16)]</p>
<p><strong>Valeur par défaut</strong>: <code translate="no">4.0</code></p></td>
     <td><p>Des valeurs plus élevées augmentent le parallélisme, ce qui peut accélérer la recherche sur les systèmes dotés de CPU et de SSD puissants. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [1.0, 4.0].</p></td>
   </tr>
</table>
