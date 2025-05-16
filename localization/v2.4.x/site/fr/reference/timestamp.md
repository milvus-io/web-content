---
id: timestamp.md
title: Horodatage en Milvus
summary: >-
  Découvrez le concept d'horodatage et les quatre principaux paramètres liés à
  l'horodatage dans la base de données vectorielle Milvus.
---
<h1 id="Timestamp" class="common-anchor-header">Horodatage<button data-href="#Timestamp" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique explique le concept d'horodatage et présente les quatre principaux paramètres liés à l'horodatage dans la base de données vectorielles Milvus.</p>
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
    </button></h2><p>Milvus est une base de données vectorielle qui permet de rechercher et d'interroger des vecteurs convertis à partir de données non structurées. Lors de l'exécution d'une opération en langage de manipulation de données (DML), y compris l'<a href="https://milvus.io/docs/v2.1.x/data_processing.md">insertion et la suppression de données</a>, Milvus attribue des horodatages aux entités impliquées dans l'opération. Par conséquent, toutes les entités de Milvus possèdent un attribut d'horodatage. Et les lots d'entités dans la même opération DML partagent la même valeur d'horodatage.</p>
<h2 id="Timestamp-parameters" class="common-anchor-header">Paramètres d'horodatage<button data-href="#Timestamp-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Plusieurs paramètres liés à l'horodatage interviennent lorsque vous effectuez une recherche ou une requête de similarité vectorielle dans Milvus.</p>
<ul>
<li><p><code translate="no">Guarantee_timestamp</code></p></li>
<li><p><code translate="no">Service_timestamp</code></p></li>
<li><p><code translate="no">Graceful_time</code></p></li>
<li><p><code translate="no">Travel_timestamp</code></p></li>
</ul>
<h3 id="Guaranteetimestamp" class="common-anchor-header"><code translate="no">Guarantee_timestamp</code></h3><p><code translate="no">Guarantee_timestamp</code> est un type d'horodatage utilisé pour garantir que toutes les données mises à jour par des opérations DML avant <code translate="no">Guarantee_timestamp</code> sont visibles lors d'une recherche ou d'une requête de similarité vectorielle. Par exemple, si vous insérez un lot de données à 15 heures, un autre lot à 17 heures, et que la valeur de <code translate="no">Guarantee_timestamp</code> est fixée à 18 heures lors d'une recherche de similarité vectorielle. Cela signifie que les deux lots de données insérés respectivement à 15 heures et à 17 heures doivent être impliqués dans la recherche.</p>
<p>Si <code translate="no">Guarantee_timestamp</code> n'est pas configuré, Milvus prend automatiquement le moment où la demande de recherche est faite. Par conséquent, la recherche est effectuée sur une vue de données avec toutes les mises à jour de données par des opérations DML avant la recherche.</p>
<p>Pour vous éviter d'avoir à comprendre le <a href="https://github.com/milvus-io/milvus/blob/master/docs/design_docs/20211214-milvus_hybrid_ts.md">TSO</a> dans Milvus, en tant qu'utilisateur, vous n'avez pas à configurer directement le paramètre <code translate="no">Guarantee_timestamp</code>. Il suffit de choisir le <a href="https://milvus.io/docs/v2.1.x/consistency.md">niveau de cohérence</a> et Milvus gère automatiquement le paramètre <code translate="no">Guarantee_timestamp</code> pour vous. Chaque niveau de cohérence correspond à une certaine valeur de <code translate="no">Guarantee_timestamp</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Guarantee_Timestamp.png" alt="Guarantee_Timestamp" class="doc-image" id="guarantee_timestamp" />
   </span> <span class="img-wrapper"> <span>Guarantee_Timestamp</span>. </span></p>
<h4 id="Example" class="common-anchor-header">Exemple</h4><p>Comme le montre l'illustration ci-dessus, la valeur de <code translate="no">Guarantee_timestamp</code> est définie comme <code translate="no">2021-08-26T18:15:00</code> (pour des raisons de simplicité, l'horodatage dans cet exemple est représenté par le temps physique). Lorsque vous effectuez une recherche ou une requête, toutes les données antérieures à 2021-08-26T18:15:00 sont recherchées ou interrogées.</p>
<h3 id="Servicetimestamp" class="common-anchor-header"><code translate="no">Service_timestamp</code></h3><p><code translate="no">Service_timestamp</code> est un type d'horodatage généré et géré automatiquement par les nœuds de requête dans Milvus. Il est utilisé pour indiquer quelles opérations DML sont exécutées par les nœuds de requête.</p>
<p>Les données gérées par les nœuds de requête peuvent être classées en deux catégories :</p>
<ul>
<li><p>les données historiques (également appelées données par lots)</p></li>
<li><p>les données incrémentielles (également appelées données en continu).</p></li>
</ul>
<p>Dans Milvus, vous devez charger les données avant d'effectuer une recherche ou une requête. Par conséquent, les données par lots d'une collection sont chargées par le nœud de requête avant qu'une recherche ou une requête ne soit effectuée. Toutefois, les données en continu sont insérées dans Milvus ou supprimées à la volée, ce qui oblige le nœud de requête à conserver une chronologie des opérations DML et des requêtes de recherche ou d'interrogation. Par conséquent, les nœuds de requête utilisent <code translate="no">Service_timestamp</code> pour conserver cette chronologie. <code translate="no">Service_timestamp</code> peut être considéré comme le moment où certaines données sont visibles, car les nœuds de requête peuvent s'assurer que toutes les opérations DML antérieures à <code translate="no">Service_timestamp</code> sont terminées.</p>
<p>Lorsqu'il reçoit une demande de recherche ou d'interrogation, un nœud d'interrogation compare les valeurs de <code translate="no">Service_timestamp</code> et de <code translate="no">Guarantee_timestamp</code>. Il existe principalement deux scénarios.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Service_Timestamp.png" alt="Service_Timestamp" class="doc-image" id="service_timestamp" />
   </span> <span class="img-wrapper"> <span>Service_Timestamp</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scénario 1 : <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Comme le montre la figure 1, la valeur de <code translate="no">Guarantee_timestamp</code> est fixée à <code translate="no">2021-08-26T18:15:00</code>. Lorsque la valeur de <code translate="no">Service_timestamp</code> est augmentée à <code translate="no">2021-08-26T18:15:01</code>, cela signifie que toutes les opérations DML antérieures à ce point dans le temps sont exécutées et terminées par le nœud de requête, y compris les opérations DML antérieures à l'heure indiquée par <code translate="no">Guarantee_timestamp</code>. Par conséquent, la demande de recherche ou d'interrogation peut être exécutée immédiatement.</p>
<h4 id="Scenario-2-Servicetimestamp--Guaranteetimestamp" class="common-anchor-header">Scénario 2 : <code translate="no">Service_timestamp</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Comme le montre la figure 2, la valeur de <code translate="no">Guarantee_timestamp</code> est définie comme <code translate="no">2021-08-26T18:15:00</code>, et la valeur actuelle de <code translate="no">Service_timestamp</code> est seulement <code translate="no">2021-08-26T18:14:55</code>. Cela signifie que seules les opérations DML avant <code translate="no">2021-08-26T18:14:55</code> sont exécutées et terminées, laissant une partie des opérations DML après ce point temporel mais avant <code translate="no">Guarantee_timestamp</code> inachevées. Si la recherche ou la requête est exécutée à ce stade, certaines des données requises sont encore invisibles et indisponibles, ce qui affecte sérieusement la précision des résultats de la recherche ou de la requête. Par conséquent, le nœud d'interrogation doit reporter la demande de recherche ou d'interrogation jusqu'à ce que les opérations DML avant <code translate="no">guarantee_timestamp</code> soient terminées (c'est-à-dire lorsque <code translate="no">Service_timestamp</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h3 id="Gracefultime" class="common-anchor-header"><code translate="no">Graceful_time</code></h3><p>Techniquement parlant, <code translate="no">Graceful_time</code> n'est pas un horodatage, mais plutôt une période de temps (par exemple 100 ms). Toutefois, <code translate="no">Graceful_time</code> mérite d'être mentionné car il est étroitement lié à <code translate="no">Guarantee_timestamp</code> et <code translate="no">Service_timestamp</code>. <code translate="no">Graceful_time</code> est un paramètre configurable dans le fichier de configuration de Milvus. Il est utilisé pour indiquer la période de temps qui peut être tolérée avant que certaines données ne deviennent visibles. En bref, les opérations DML non terminées pendant <code translate="no">Graceful_time</code> peuvent être tolérées.</p>
<p>En cas de recherche ou de requête entrante, il peut y avoir deux scénarios.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Graceful_Time.png" alt="Graceful_Time" class="doc-image" id="graceful_time" />
   </span> <span class="img-wrapper"> <span>Graceful_Time</span>. </span></p>
<h4 id="Scenario-1-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scénario 1 : <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code></h4><p>Comme le montre la figure 1, la valeur de <code translate="no">Guarantee_timestamp</code> est fixée à <code translate="no">2021-08-26T18:15:01</code>, et celle de <code translate="no">Graceful_time</code> à <code translate="no">2s</code>. La valeur de <code translate="no">Service_timestamp</code> est augmentée à <code translate="no">2021-08-26T18:15:00</code>. Bien que la valeur de <code translate="no">Service_timestamp</code> soit toujours inférieure à celle de <code translate="no">Guarantee_timestamp</code> et que toutes les opérations DML avant <code translate="no">2021-08-26T18:15:01</code> ne soient pas terminées, une période de 2 secondes d'invisibilité des données est tolérée, comme l'indique la valeur de <code translate="no">Graceful_time</code>. Par conséquent, la recherche entrante ou la demande de requête peut être exécutée immédiatement.</p>
<h4 id="Scenario-2-Servicetimestamp--+--Gracefultime--Guaranteetimestamp" class="common-anchor-header">Scénario 2 : <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &lt; <code translate="no">Guarantee_timestamp</code></h4><p>Comme le montre la figure 2 , la valeur de <code translate="no">Guarantee_timestamp</code> est définie comme <code translate="no">2021-08-26T18:15:01</code>, et <code translate="no">Graceful_time</code> comme <code translate="no">2s</code>. La valeur actuelle de <code translate="no">Service_timestamp</code> n'est que <code translate="no">2021-08-26T18:14:54</code>, ce qui signifie que les opérations DML attendues ne sont pas encore terminées et que, même avec un délai de grâce de 2 secondes, l'invisibilité des données reste intolérable. Par conséquent, le nœud de requête doit reporter la recherche ou la requête jusqu'à ce que certaines requêtes DML soient terminées (c'est-à-dire lorsque <code translate="no">Service_timestamp</code> + <code translate="no">Graceful_time</code> &gt;= <code translate="no">Guarantee_timestamp</code>).</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Découvrez comment <a href="/docs/fr/v2.4.x/consistency.md">l'horodatage garanti permet une cohérence réglable dans Milvus.</a></li>
</ul>
