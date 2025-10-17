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
    </button></h1><p>AISAQ est un index vectoriel sur disque qui étend <a href="/docs/fr/diskann.md">DISKANN</a> pour traiter des ensembles de données à l'échelle du milliard sans dépasser les limites de la RAM. Contrairement à DISKANN, qui conserve les vecteurs compressés en mémoire, AISAQ stocke toutes les données sur disque et propose deux modes pour équilibrer les performances et les coûts de stockage.</p>
<p>Utilisez AISAQ lorsque votre jeu de données vectorielles est trop volumineux pour tenir confortablement dans la RAM, ou lorsque vous devez optimiser les coûts d'infrastructure en échangeant certaines performances de requête contre une réduction des besoins en mémoire.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">Comment fonctionne AISAQ<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Le diagramme ci-dessus compare les dispositions de stockage de <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> et <strong>AISAQ-Scale</strong>, en montrant comment les données (vecteurs bruts, listes d'arêtes et codes PQ) sont réparties entre la RAM et le disque.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<h3 id="AISAQ-modes" class="common-anchor-header">Modes de l'AISAQ<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ propose deux stratégies de stockage sur disque. La principale différence réside dans la manière dont les données compressées par PQ sont stockées.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong> permet un stockage entièrement sur disque en déplaçant les données PQ de la mémoire vers le disque tout en maintenant un faible IOPS grâce à la colocalisation et à la redondance des données.</p>
<p>Dans ce mode :</p>
<ul>
<li><p>Le vecteur brut de chaque nœud, la liste des arêtes et les données PQ de ses voisins sont stockés ensemble sur le disque.</p></li>
<li><p>Cette disposition garantit que la visite d'un nœud (par exemple, le <em>vecteur 0</em>) ne nécessite toujours qu'une seule E/S sur disque.</p></li>
<li><p>Cependant, comme les données PQ sont stockées de manière redondante à proximité de plusieurs nœuds, la taille du fichier d'index augmente de manière significative, ce qui consomme davantage d'espace disque.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">L'échelle AISAQ</h4><p><strong>AISAQ-scale</strong> se concentre sur la <em>réduction de l'utilisation de l'espace disque</em> tout en conservant toutes les données sur le disque.</p>
<p>Dans ce mode, les données PQ sont stockées séparément sur le disque :</p>
<ul>
<li><p>Les données PQ sont stockées séparément sur le disque, sans redondance.</p></li>
<li><p>Cette conception minimise la taille de l'index mais entraîne davantage d'opérations d'E/S lors de la traversée du graphe.</p></li>
<li><p>Pour atténuer la surcharge d'IOPS, AISAQ introduit deux optimisations :</p>
<ul>
<li><p>Une stratégie de réarrangement qui trie les vecteurs PQ par priorité afin d'améliorer la localité des données.</p></li>
<li><p>Un cache PQ dans la DRAM (pq_cache_size) qui met en cache les données PQ fréquemment accédées.</p></li>
</ul></li>
</ul>
<p>Par conséquent, AISAQ-scale permet d'obtenir une meilleure efficacité de stockage mais des performances inférieures à celles de DISKANN ou d'AISAQ-Performance.</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">Paramètres spécifiques à AISAQ<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ hérite de nombreux paramètres de DISKANN. Pour éviter la redondance, seuls les paramètres spécifiques à AISAQ sont détaillés ci-dessous. Pour la description des paramètres partagés tels que <code translate="no">max_degree</code>, <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code> et <code translate="no">beam_width_ratio</code>, reportez-vous à <a href="/docs/fr/diskann.md#DISKANN-params">DISKANN</a>.</p>
<table>
   <tr>
     <th><p>Paramètre</p></th>
     <th><p>Paramètre Description</p></th>
     <th><p>Plage de valeurs</p></th>
     <th><p>Suggestion de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>Nombre de vecteurs PQ stockés en ligne par nœud. Détermine l'organisation du stockage (mode Performance vs. Mode Scale).</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage</strong>: [0, <em>max_degree</em>]</p><p><strong>Valeur par défaut</strong>: <code translate="no">-1</code></p></td>
     <td><p>Plus <code translate="no">inline_pq</code> est proche de <em>max_degree</em>, meilleures sont les performances, mais la taille du fichier d'index augmente considérablement.</p><p>Lorsque <code translate="no">inline_pq</code> se rapproche de 0, les performances diminuent et la taille de l'index devient similaire à celle de DISKANN.</p><p><strong>Remarque</strong>: ce système dépend fortement des performances du disque. Si les performances du disque sont médiocres, il n'est pas conseillé d'activer cette option, car la bande passante limitée du disque peut devenir un goulot d'étranglement et dégrader les performances globales.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>Active le tri des vecteurs PQ par priorité pour améliorer la localité des E/S.</p></td>
     <td><p><strong>Type</strong>: Booléen</p><p><strong>Plage de valeurs</strong>: [true, false]</p><p><strong>Valeur par défaut</strong>: <code translate="no">false</code></p></td>
     <td><p>Réduit les E/S des requêtes mais augmente le temps de construction de l'index.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>Taille du cache PQ en DRAM (octets).</p></td>
     <td><p><strong>Type</strong>: Entier</p><p><strong>Plage de valeurs</strong>: [0, 1&lt;&lt;30]</p><p><strong>Valeur par défaut</strong>: <code translate="no">0</code></p></td>
     <td><p>Un cache plus important améliore les performances des requêtes mais augmente l'utilisation de la DRAM.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">Points à prendre en considération<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>Les performances du disque sont importantes. AISAQ dépend fortement des IOPS des disques SSD ; un mauvais stockage peut réduire le QPS.</p></li>
<li><p>Le mode performance d'AISAQ ≈ DISKANN latence, mais peut nécessiter plusieurs fois plus d'espace disque.</p></li>
<li><p>Le mode AISAQ-scale convient à la recherche hors ligne ou aux charges de travail d'archivage de données où la QPS est moins critique.</p></li>
</ul>
