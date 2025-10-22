---
id: tiered-storage-overview.md
title: Présentation du stockage hiérarchiséCompatible with Milvus 2.6.4+
summary: >-
  Dans Milvus, le mode traditionnel de chargement complet exige que chaque
  QueryNode charge tous les champs de données et index d'un segment lors de
  l'initialisation, même les données auxquelles on n'accèdera peut-être jamais.
  Cela garantit une disponibilité immédiate des données, mais entraîne souvent
  un gaspillage de ressources, notamment une utilisation élevée de la mémoire,
  une forte activité du disque et une surcharge importante des E/S, en
  particulier lors du traitement d'ensembles de données à grande échelle.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">Présentation du stockage hiérarchisé<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, le mode traditionnel de <em>chargement complet</em> exige que chaque QueryNode charge tous les champs de données et index d'un <a href="/docs/fr/glossary.md#Segment">segment</a> lors de l'initialisation, même les données auxquelles on n'accèdera peut-être jamais. Cela garantit une disponibilité immédiate des données, mais entraîne souvent un gaspillage des ressources, notamment une utilisation élevée de la mémoire, une forte activité du disque et des frais généraux d'E/S importants, en particulier lors du traitement d'ensembles de données volumineux.</p>
<p>Le<em>stockage hiérarchisé</em> relève ce défi en découplant la mise en cache des données du chargement des segments. Au lieu de charger toutes les données en une seule fois, Milvus introduit une couche de mise en cache qui fait la distinction entre les données chaudes (mises en cache localement) et les données froides (stockées à distance). Le QueryNode ne charge plus que des <em>métadonnées</em> légères au départ et extrait ou expulse dynamiquement les données à la demande. Cela réduit considérablement le temps de chargement, optimise l'utilisation des ressources locales et permet aux QueryNodes de traiter des ensembles de données qui dépassent de loin leur mémoire physique ou la capacité de leur disque.</p>
<p>Envisagez d'activer le stockage hiérarchisé dans des scénarios tels que :</p>
<ul>
<li><p>Collections qui dépassent la mémoire disponible ou la capacité NVMe d'un seul QueryNode</p></li>
<li><p>Charges de travail analytiques ou par lots pour lesquelles un chargement plus rapide est plus important que la latence de la première requête.</p></li>
<li><p>Charges de travail mixtes qui peuvent tolérer des manques occasionnels de cache pour les données moins fréquemment consultées.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>Les<em>métadonnées</em> comprennent les schémas, les définitions d'index, les cartes de blocs, le nombre de lignes et les références à des objets distants. Ce type de données est de petite taille, toujours mis en cache et jamais expulsé.</p></li>
<li><p>Pour plus de détails sur les segments et les morceaux, voir <a href="/docs/fr/glossary.md#Segment">Segment</a>.</p></li>
</ul>
</div>
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
    </button></h2><p>Le stockage hiérarchisé modifie la façon dont QueryNode gère les données de segment. Au lieu de mettre en cache chaque champ et index au moment du chargement, QueryNode ne charge plus que les métadonnées et utilise une couche de mise en cache pour récupérer et expulser les données de manière dynamique.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">Mode de chargement complet et mode de stockage hiérarchisé<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Bien que les modes Full-load et Tiered Storage traitent les mêmes données, ils diffèrent quant au <em>moment</em> et à <em>la manière dont</em> QueryNode met en cache ces composants.</p>
<ul>
<li><p><strong>Mode pleine charge</strong>: Au moment du chargement, QueryNode met en cache les données de la collection complète, y compris les métadonnées, les données de champ et les index, à partir du stockage d'objets.</p></li>
<li><p><strong>Mode de stockage hiérarchisé</strong>: Au moment du chargement, QueryNode met en cache uniquement les métadonnées. Les données de champ sont extraites à la demande, à la granularité des morceaux. Les fichiers d'index restent distants jusqu'à ce que la première requête en ait besoin ; ensuite, l'index complet par segment est extrait et mis en cache.</p></li>
</ul>
<p>Le diagramme ci-dessous illustre ces différences.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>Mode pleine charge et mode de stockage hiérarchisé</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">Flux de travail de chargement d'un QueryNode<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans le cadre du stockage hiérarchisé, le flux de travail comporte les phases suivantes :</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/load-workflow.png" alt="Load Workflow" class="doc-image" id="load-workflow" />
   </span> <span class="img-wrapper"> <span>Flux de travail de chargement</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">Phase 1 : Chargement paresseux</h4><p>Lors de l'initialisation, Milvus effectue un chargement paresseux, mettant en cache uniquement les métadonnées au niveau du segment, telles que les définitions de schéma, les informations d'index et les mappages de morceaux.</p>
<p>Aucune donnée de champ ou fichier d'index n'est mis en cache à ce stade. Cela permet aux collections d'être interrogeables presque immédiatement après le démarrage, tout en conservant une consommation minimale de mémoire et de disque.</p>
<p>Comme les données des champs et les fichiers d'index restent stockés à distance jusqu'à ce qu'ils soient accédés pour la <em>première fois</em>, la <em>première requête</em> peut subir un temps de latence supplémentaire car les données requises doivent être récupérées à la demande. Pour atténuer cet effet pour les champs ou les index critiques, vous pouvez utiliser la stratégie <a href="/docs/fr/tiered-storage-overview.md#Phase-2-Warm-up">Warm Up</a> pour les précharger de manière proactive avant que le segment ne devienne interrogeable.</p>
<p><strong>Configuration</strong></p>
<p>Automatiquement appliqué lorsque le stockage hiérarchisé est activé. Aucun autre réglage manuel n'est nécessaire.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">Phase 2 : Réchauffement</h4><p>Pour réduire la latence de premier accès introduite par la <a href="/docs/fr/tiered-storage-overview.md#Phase-1-Lazy-load">charge paresseuse</a>, Milvus fournit un mécanisme *Warm Up.</p>
<p>Avant qu'un segment ne devienne interrogeable, Milvus peut récupérer et mettre en cache de manière proactive des champs ou des index spécifiques à partir du stockage d'objets, ce qui garantit que la première requête atteint directement les données mises en cache au lieu de déclencher un chargement à la demande.</p>
<p><strong>Configuration</strong></p>
<p>Les paramètres d'échauffement sont définis dans la section Tiered Storage de <strong>milvus.yaml</strong>. Vous pouvez activer ou désactiver le préchargement pour chaque champ ou type d'index et spécifier la stratégie préférée. Voir <a href="/docs/fr/warm-up.md">Warm Up</a> pour des exemples de configuration.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">Phase 3 : Chargement partiel</h4><p>Lorsque les requêtes ou les recherches commencent, le QueryNode effectue un <em>chargement partiel</em>, en récupérant uniquement les blocs de données ou les fichiers d'index requis à partir du stockage d'objets.</p>
<ul>
<li><p><strong>Champs</strong>: Chargement à la demande au <strong>niveau des blocs de données</strong>. Seuls les blocs de données correspondant aux conditions de la requête en cours sont récupérés, ce qui minimise l'utilisation des E/S et de la mémoire.</p></li>
<li><p><strong>Index</strong>: Chargés à la demande au <strong>niveau du segment</strong>. Les fichiers d'index doivent être récupérés en tant qu'unités complètes et ne peuvent pas être divisés en morceaux.</p></li>
</ul>
<p><strong>Configuration</strong></p>
<p>La charge partielle est automatiquement appliquée lorsque le stockage hiérarchisé est activé. Aucun réglage manuel n'est nécessaire. Pour minimiser le temps de latence pour les données critiques, combiner avec <a href="/docs/fr/warm-up.md">Warm Up</a>.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">Phase 4 : Eviction</h4><p>Pour maintenir une utilisation saine des ressources, Milvus libère automatiquement les données en cache inutilisées lorsque des seuils sont atteints.</p>
<p>L'éviction suit une politique de <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">moindre utilisation (LRU)</a>, garantissant que les données peu utilisées sont supprimées en premier, tandis que les données actives restent dans le cache.</p>
<p>L'éviction est régie par les éléments configurables suivants :</p>
<ul>
<li><p><strong>Filigranes</strong>: Définir des seuils de mémoire ou de disque qui déclenchent et arrêtent l'éviction.</p></li>
<li><p><strong>TTL</strong> du cache : supprime les données périmées du cache après une durée d'inactivité définie.</p></li>
<li><p><strong>Ratio de surengagement</strong>: Permet une sursouscription temporaire du cache avant le début de l'éviction agressive, ce qui permet d'absorber les pics de charge de travail à court terme.</p></li>
</ul>
<p><strong>Configuration</strong></p>
<p>Activez et réglez les paramètres d'éviction dans <strong>milvus.yaml</strong>. Voir <a href="/docs/fr/eviction.md">Eviction</a> pour une configuration détaillée.</p>
<h2 id="Getting-started" class="common-anchor-header">Pour commencer<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">Conditions préalables<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>QueryNodes avec des ressources mémoire et disque dédiées</p></li>
<li><p>Backend de stockage d'objets (S3, MinIO, etc.)</p></li>
</ul>
<div class="alert warning">
<p>Les ressources des QueryNodes ne doivent pas être partagées avec d'autres charges de travail. Les ressources partagées peuvent entraîner une mauvaise évaluation de la capacité disponible par le Tiered Storage, ce qui peut provoquer des pannes.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">Modèle de configuration de base<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Modifiez le fichier de configuration Milvus (<code translate="no">milvus.yaml</code>) pour configurer les paramètres du stockage hiérarchisé :</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
      
      <span class="hljs-comment"># Overcommit Ratios</span>
      <span class="hljs-attr">evictableMemoryCacheRatio:</span> <span class="hljs-number">0.3</span>
      <span class="hljs-attr">evictableDiskCacheRatio:</span> <span class="hljs-number">0.3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">Etapes suivantes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>Configurer Warm Up</strong> - Optimiser le préchargement pour vos modèles d'accès. Voir <a href="/docs/fr/warm-up.md">Warm Up</a>.</p></li>
<li><p><strong>Régler l'éviction</strong> - Définir des filigranes et des TTL appropriés pour vos contraintes de ressources. Voir <a href="/docs/fr/eviction.md">Eviction</a>.</p></li>
<li><p><strong>Surveiller les performances</strong> - Suivre les taux d'accès au cache, la fréquence d'éviction et les schémas de latence des requêtes.</p></li>
<li><p><strong>Itération de la configuration</strong> - Ajustez les paramètres en fonction des caractéristiques observées de la charge de travail.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">Puis-je modifier les paramètres du stockage hiérarchisé au moment de l'exécution ?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>Non. Tous les paramètres doivent être définis sur <code translate="no">milvus.yaml</code> avant de démarrer Milvus. Les modifications nécessitent un redémarrage pour être prises en compte.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">Le stockage hiérarchisé affecte-t-il la durabilité des données ?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>Non. La persistance des données est toujours gérée par le stockage d'objets à distance. Le stockage hiérarchisé gère uniquement la mise en cache sur les QueryNodes.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">Les requêtes seront-elles toujours plus rapides avec le Tiered Storage ?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Pas nécessairement. Le stockage hiérarchisé réduit le temps de chargement et l'utilisation des ressources, mais les requêtes qui touchent des données non mises en cache (froides) peuvent présenter une latence plus élevée. Pour les charges de travail sensibles à la latence, il est recommandé d'utiliser le mode pleine charge.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">Pourquoi un QueryNode manque-t-il toujours de ressources même si le stockage hiérarchisé est activé ?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>Il y a deux causes courantes :</p>
<ul>
<li><p>Le QueryNode a été configuré avec trop peu de ressources. Les filigranes sont relatifs aux ressources disponibles, de sorte que le sous-provisionnement amplifie les erreurs d'appréciation.</p></li>
<li><p>Les ressources du QueryNode sont partagées avec d'autres charges de travail, de sorte que le Tiered Storage ne peut pas évaluer correctement la capacité disponible réelle.</p></li>
</ul>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">Pourquoi certaines requêtes échouent-elles en cas de forte concurrence ?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>Si trop de requêtes atteignent les données chaudes en même temps, les limites de ressources des QueryNodes peuvent toujours être dépassées. Certains threads peuvent échouer en raison de délais de réservation des ressources. Il est possible de résoudre ce problème en réessayant une fois que la charge a diminué ou en allouant davantage de ressources.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">Pourquoi la latence des recherches et des requêtes augmente-t-elle après l'activation du stockage hiérarchisé ?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>Les causes possibles sont les suivantes</p>
<ul>
<li><p>Des requêtes fréquentes sur des données froides, qui doivent être extraites du stockage.</p></li>
<li><p>Un taux de surengagement trop élevé, entraînant une éviction fréquente.</p></li>
<li><p>Des filigranes trop proches les uns des autres, entraînant une éviction synchrone fréquente.</p></li>
</ul>
<h3 id="Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="common-anchor-header">Le stockage hiérarchisé peut-il gérer un nombre illimité de données en sur-engageant le cache ?<button data-href="#Can-Tiered-Storage-handle-unlimited-data-by-overcommitting-cache" class="anchor-icon" translate="no">
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
    </button></h3><p>Les ratios de sur-engagement permettent aux QueryNodes de travailler avec plus de segments que la mémoire physique ne le permet, mais des ratios trop élevés peuvent conduire à des évictions fréquentes, à des blocages de cache ou à des échecs de requête.</p>
