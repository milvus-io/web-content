---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ est un index vectoriel sur disque qui étend DISKANN pour traiter des
  ensembles de données à l'échelle du milliard sans dépasser les limites de la
  RAM. Contrairement à DISKANN, qui conserve les vecteurs compressés en mémoire,
  AISAQ stocke toutes les données sur disque et propose deux modes pour
  équilibrer les performances et les coûts de stockage.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ est un index vectoriel sur disque qui étend <a href="/docs/fr/diskann.md">DISKANN</a> pour traiter des ensembles de données à l'échelle du milliard avec une empreinte DRAM minimale.</p>
<p>Contrairement à DISKANN, qui conserve les vecteurs compressés en mémoire, AISAQ est conçu avec une "architecture DRAM proche de zéro", ce qui signifie que toutes les structures de données sont conservées sur le disque SSD.</p>
<p>AISAQ permet d'exécuter des bases de données à très grande échelle en utilisant des serveurs standard, tout en offrant des modes de fonctionnement permettant d'équilibrer les performances et les coûts de stockage.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Comment fonctionne l'AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme ci-dessus compare les dispositions de stockage de <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> et <strong>AISAQ-Scale</strong>, en montrant comment les données (vecteurs bruts, listes de bords et codes PQ) sont réparties entre la RAM et le disque.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq Vs Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">Fondation : Récapitulatif de DISKANN<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans DISKANN, les vecteurs bruts et les listes de bords sont stockés sur le disque, tandis que les vecteurs compressés PQ sont conservés en mémoire (DRAM).</p>
<p>Lorsque DISKANN accède à un nœud (par exemple, le <em>vecteur 0</em>) :</p>
<ul>
<li><p>Il charge le vecteur brut<strong>(raw_vector_0</strong>) et sa liste de bords<strong>(edgelist_0</strong>) à partir du disque.</p></li>
<li><p>La liste des arêtes indique les voisins à visiter ensuite (nœuds 2, 3 et 5 dans cet exemple).</p></li>
<li><p>Le vecteur brut est utilisé pour calculer la distance exacte par rapport au vecteur de requête pour le classement.</p></li>
<li><p>Les données PQ en mémoire sont utilisées pour le filtrage de la distance approximative afin de guider la traversée suivante.</p></li>
</ul>
<p>Comme les données PQ sont déjà mises en cache dans la DRAM, chaque visite de nœud ne nécessite qu'une seule entrée/sortie de disque, ce qui permet d'obtenir une vitesse d'interrogation élevée avec une utilisation modérée de la mémoire.</p>
<p>Pour une explication détaillée de ces composants et paramètres, voir <a href="/docs/fr/diskann.md">DISKANN</a>.</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">Modes de fonctionnement de l'AISAQ<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ propose deux modes de fonctionnement pour répondre à deux cas d'utilisation distincts :</p>
<p>Mode performance : optimisé pour les applications qui nécessitent une faible latence et un débit élevé à grande échelle, telles que la recherche sémantique en ligne.</p>
<p>Mode échelle : optimisé pour les applications avec des contraintes de latence plus souples, telles que RAG et la recherche sémantique hors ligne, tout en permettant une expansion rentable des ensembles de données à une échelle ultra-élevée.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">Mode AISAQ-performance</h4><p>Le mode<strong>AISAQ-performance</strong> permet d'obtenir une "empreinte DRAM quasi nulle" en déplaçant les données PQ de la mémoire vers le disque tout en maintenant un faible taux d'IOPS grâce à la colocalisation et à la redondance des données.</p>
<ul>
<li><p>Le vecteur brut de chaque nœud, la liste des arêtes et les données PQ de ses voisins sont stockés ensemble sur le disque.</p></li>
<li><p>Cette disposition garantit que la visite d'un nœud (par exemple, le vecteur 0) ne nécessite toujours qu'une seule E/S sur disque.</p></li>
<li><p>Comme les données PQ sont stockées de manière redondante à proximité de plusieurs nœuds, la taille du fichier d'index augmente de manière significative, ce qui consomme davantage d'espace disque.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">Mode AISAQ-scale</h4><p>Le<strong>mode AISAQ-scale</strong> se concentre sur la réduction de l'utilisation de l'espace disque tout en répondant aux exigences de performance des applications cibles.</p>
<p>Dans ce mode :</p>
<ul>
<li><p>Les données PQ sont stockées séparément sur le disque, sans redondance.</p></li>
<li><p>Cette conception minimise la taille de l'index mais entraîne davantage d'opérations d'E/S lors de la traversée du graphe.</p></li>
<li><p>Pour atténuer la surcharge d'IOPS, AISAQ introduit deux optimisations :</p>
<ul>
<li><p>Un algorithme de réarrangement qui trie les vecteurs PQ par priorité afin d'améliorer la localité des données.</p></li>
<li><p>Un cache PQ dans la DRAM (pq_read_page_cache_size) qui met en cache les données PQ fréquemment accédées.</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">Exemple de configuration<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">Paramètres de l'AISAQ<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ hérite de certains paramètres de DISKANN - <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, et <code translate="no">pq_code_budget_gb_ratio</code>.</p>
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
    </button></h3><p>Ces paramètres influencent la manière dont l'index AISAQ est construit. Leur réglage peut affecter la taille de l'index, le temps de construction et la qualité de la recherche.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description de la valeur</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Contrôle le nombre maximum de connexions (arêtes) que chaque point de données peut avoir dans le graphe Vamana.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [1, 512]</p><p><strong>Valeur par défaut</strong>: <code translate="no">56</code></p></td>
     <td><p>Des valeurs plus élevées créent des graphiques plus denses, ce qui peut augmenter la mémorisation (trouver des résultats plus pertinents), mais aussi l'utilisation de la mémoire et le temps de construction. Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>Lors de la construction de l'index, ce paramètre définit la taille du groupe de candidats utilisé lors de la recherche des voisins les plus proches pour chaque nœud. Pour chaque nœud ajouté au graphe, l'algorithme maintient une liste des meilleurs candidats trouvés jusqu'à présent. La recherche de voisins s'arrête lorsque cette liste ne peut plus être améliorée. À partir de cette liste finale de candidats, les nœuds de degré maximal les plus élevés sont sélectionnés pour former les arêtes finales.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [1, 512]</p><p><strong>Valeur par défaut</strong>: <code translate="no">100</code></p></td>
     <td><p>Une taille de liste de recherche plus importante augmente la probabilité de trouver les vrais voisins les plus proches pour chaque nœud, ce qui peut conduire à un graphe de meilleure qualité et à de meilleures performances de recherche (rappel). Cependant, cela se fait au prix d'un temps de construction de l'index beaucoup plus long. Cette valeur doit toujours être supérieure ou égale à max_degree.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Nombre de vecteurs PQ stockés en ligne par nœud d'index (lus lors de l'accès au nœud, pour réduire les entrées-sorties)</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [0, <em>max_degree</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">-1</code></p></td>
     <td><p>Des valeurs plus élevées de <code translate="no">inline_pq</code> améliorent les performances mais augmentent l'espace disque.</p><p>Définissez <code translate="no">inline_pq</code>=0 pour AISAQ en mode échelle.</p><p>Définissez <code translate="no">inline_pq</code>=-1 pour remplir automatiquement tout espace inutilisé dans l'index avec des vecteurs PQ afin d'optimiser davantage AISAQ en mode échelle.</p><p>Réglez <code translate="no">inline_pq</code><em>=max_degree</em> pour AISAQ en mode performance.</p><p><code translate="no">inline_pq</code> Les paramètres compris entre 0 et <em>max_degree</em> permettent d'ajuster l'équilibre entre les performances et la consommation d'espace disque.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Réorganiser la structure des données des vecteurs PQ pour améliorer la localité des données et réduire les accès au disque pendant la recherche (ignoré en mode performance).</p></td>
     <td><p><strong>Type</strong>: Booléen</p><p><strong>Portée</strong>: [true, false]</p><p><strong>Valeur par défaut</strong>: <code translate="no">true</code></p></td>
     <td><p>Lorsque vrai, réduit les entrées-sorties pendant la recherche avec une augmentation mineure de la mémoire et du temps de construction de l'index.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>Nombre de points d'entrée candidats pour optimiser la sélection du point d'entrée de la recherche.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [0, 1000]</p><p><strong>Valeur par défaut</strong>: <code translate="no">100</code></p></td>
     <td><p>Des valeurs élevées peuvent réduire le temps de recherche en démarrant la recherche à partir d'un point d'entrée plus proche.</p><p>Définir des valeurs plus élevées pour les segments de grande taille (par exemple, pour les vecteurs de 10M et plus, utiliser la valeur 1000).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>Contrôle la taille des codes PQ (représentations compressées des points de données) par rapport à la taille des données non compressées.</p></td>
     <td><p><strong>Type</strong>: Flottant</p><p><strong>Plage</strong>: (0,0, 0,25)</p><p><strong>Valeur par défaut</strong>: <code translate="no">0.125</code></p></td>
     <td><p>Un ratio plus élevé permet d'obtenir des résultats de recherche plus précis, en stockant effectivement plus d'informations sur les vecteurs d'origine, mais augmente la complexité de calcul pendant la recherche.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur comprise dans cette fourchette : (0,0417, 0,25).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>Contrôle la taille des codes PQ des vecteurs de haute précision stockés dans l'index (utilisés pour le reclassement), par rapport à la taille des données non compressées.</p></td>
     <td><p><strong>Type</strong>: Flottant</p><p><strong>Plage de valeurs</strong>: [0, 0.25]</p><p><strong>Valeur par défaut</strong>: <code translate="no">0.25</code></p></td>
     <td><p>Avec la valeur par défaut de 0,25, les vecteurs seront quantifiés à 25 % de leur taille d'origine (compression 4×), ce qui réduit l'empreinte disque avec un impact relativement minime sur la précision.</p><p>La valeur 0 permet de stocker les vecteurs de pleine précision dans l'index du disque en vue d'un reclassement. Une valeur plus élevée permet d'obtenir un taux de rappel plus élevé, mais augmente l'utilisation du disque.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Taille du cache des vecteurs PQ en DRAM (octets). Le cache des vecteurs PQ est chargé lors du chargement de l'index et utilisé lors de la recherche pour réduire les entrées-sorties (ignoré en mode performance).</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [0, 1073741824]</p><p><strong>Valeur par défaut</strong>: <code translate="no">0</code></p></td>
     <td><p>Un cache plus important améliore les performances des requêtes mais augmente l'utilisation de la DRAM.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>Contrôle la quantité de DRAM à utiliser pour la mise en cache des nœuds d'index fréquemment accédés</p><p>Ce cache est chargé lors du chargement de l'index et utilisé lors de la recherche pour réduire les entrées-sorties.</p></td>
     <td><p><strong>Type</strong>: Flottant</p><p><strong>Plage de valeurs</strong>: [0.0, 0.3)</p><p><strong>Valeur par défaut</strong>: <code translate="no">0</code></p></td>
     <td><p>Une valeur élevée alloue plus de mémoire pour la mise en cache, ce qui réduit les entrées-sorties sur le disque mais consomme plus de mémoire système. Une valeur plus faible utilise moins de mémoire pour la mise en cache, ce qui peut augmenter les besoins d'accès au disque.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">Paramètres de recherche d'index<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>Ces paramètres influencent la manière dont l'AISAQ effectue les recherches. Leur réglage peut avoir un impact sur la vitesse de recherche, la latence et l'utilisation des ressources.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>Au cours d'une opération de recherche, ce paramètre détermine la taille du groupe de candidats que l'algorithme maintient lorsqu'il parcourt le graphe. Une valeur plus élevée augmente les chances de trouver les vrais voisins les plus proches (rappel plus élevé), mais augmente également la latence de la recherche.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [topk, int32_max]</p><p><strong>Valeur par défaut</strong>: <code translate="no">16</code></p></td>
     <td><p>Pour un bon équilibre entre les performances et la précision, il est recommandé de fixer cette valeur à un niveau égal ou légèrement supérieur au nombre de résultats que vous souhaitez récupérer (top_k).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>Contrôle le degré de parallélisme pendant la recherche en déterminant le nombre maximal de demandes d'E/S parallèles sur disque pour lire les nœuds d'index.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [1, 16]</p><p><strong>Valeur par défaut</strong>: <code translate="no">8</code></p></td>
     <td><p>Des valeurs plus élevées augmentent le parallélisme, ce qui peut accélérer la recherche sur les systèmes dotés de CPU et de SSD puissants. Cependant, une valeur trop élevée peut entraîner une contention excessive des ressources.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur de 2.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>Contrôle le degré de parallélisme pendant la recherche en déterminant le nombre maximal de demandes d'E/S parallèles sur disque pour lire des groupes de vecteurs PQ voisins (ignoré en mode performance).</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [1, 4] doit être &lt;= <em>beamwidth</em></p><p><strong>Valeur par défaut</strong>: <code translate="no">1</code></p></td>
     <td><p>Des valeurs plus élevées augmentent le parallélisme, ce qui peut accélérer la recherche sur les systèmes dotés d'unités centrales et de disques SSD puissants. Toutefois, une valeur trop élevée peut entraîner une contention excessive des ressources, car chaque groupe de vecteurs PQ voisin peut contenir jusqu'à max_degree vectors.</p><p>Dans la plupart des cas, nous vous recommandons de définir une valeur de 1.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>Taille du cache de lecture PQ en DRAM par fil de recherche (octets). Elle met en cache les pages de données fréquemment consultées contenant des vecteurs PQ (ignorée en mode performance et applicable uniquement lorsque le réarrangement est vrai).</p><p>La mémoire cache de lecture PQ est réutilisée dans tous les segments AISAQ.</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [0, 33554432]</p><p><strong>Valeur par défaut</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>Un cache plus important améliore les performances des requêtes mais augmente l'utilisation de la DRAM.</p><p>Les valeurs recommandées sont de 2 Mio pour les petits segments (1 M de vecteurs), 5 Mio pour les segments moyens (50 M de vecteurs) et 10 Mio pour les grands segments (250 M de vecteurs).</p></td>
   </tr>
</table>
