---
id: consistency.md
summary: Découvrez les quatre niveaux de cohérence dans Milvus.
title: Cohérence
---
<h1 id="Consistency" class="common-anchor-header">Cohérence<button data-href="#Consistency" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente les quatre niveaux de cohérence dans Milvus et les scénarios les mieux adaptés. Le mécanisme permettant d'assurer la cohérence dans Milvus est également abordé dans cette rubrique.</p>
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
    </button></h2><p>La cohérence dans une base de données distribuée fait spécifiquement référence à la propriété qui garantit que chaque nœud ou réplique a la même vue des données lors de l'écriture ou de la lecture des données à un moment donné.</p>
<p>Milvus prend en charge quatre niveaux de cohérence : forte, staleness limité, session et éventuellement. Le niveau de cohérence par défaut dans Milvus est l'obsolescence limitée.  Vous pouvez facilement ajuster le niveau de cohérence lorsque vous effectuez une <a href="/docs/fr/v2.4.x/single-vector-search.md">recherche monovectorielle</a>, une <a href="/docs/fr/v2.4.x/multi-vector-search.md">recherche hybride</a> ou une <a href="/docs/fr/v2.4.x/get-and-scalar-query.md">requête</a> afin qu'il corresponde le mieux possible à votre application.</p>
<h2 id="Consistency-levels" class="common-anchor-header">Niveaux de cohérence<button data-href="#Consistency-levels" class="anchor-icon" translate="no">
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
    </button></h2><p>Comme le définit le théorème <a href="https://en.wikipedia.org/wiki/PACELC_theorem">PACELC</a>, une base de données distribuée doit faire un compromis entre la cohérence, la disponibilité et la latence. Une cohérence élevée implique une grande précision mais aussi une latence de recherche élevée, tandis qu'une cohérence faible entraîne une vitesse de recherche rapide mais une certaine perte de visibilité des données. Par conséquent, différents niveaux de cohérence conviennent à différents scénarios.</p>
<p>Ce qui suit explique les différences entre les quatre niveaux de cohérence pris en charge par Milvus et les scénarios auxquels ils sont adaptés.</p>
<h3 id="Strong" class="common-anchor-header">Fort</h3><p>Strong est le niveau de cohérence le plus élevé et le plus strict. Il garantit que les utilisateurs peuvent lire la dernière version des données.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Strong.png" alt="Strong consistency" class="doc-image" id="strong-consistency" />
   </span> <span class="img-wrapper"> <span>Cohérence forte</span> </span></p>
<p>Selon le théorème PACELC, si le niveau de cohérence est défini comme fort, la latence augmentera. Il est donc recommandé de choisir une cohérence forte lors des tests fonctionnels afin de garantir l'exactitude des résultats des tests. La cohérence forte est également la mieux adaptée aux applications qui exigent une cohérence stricte des données au détriment de la vitesse de recherche. Un exemple peut être un système financier en ligne traitant les paiements de commandes et la facturation.</p>
<h3 id="Bounded-staleness" class="common-anchor-header">Stabilité limitée (bounded staleness)</h3><p>L'obsolescence limitée, comme son nom l'indique, autorise l'incohérence des données pendant une certaine période. Toutefois, en règle générale, les données sont toujours globalement cohérentes en dehors de cette période.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Bounded.png" alt="Bounded staleness consistency" class="doc-image" id="bounded-staleness-consistency" />
   </span> <span class="img-wrapper"> <span>Cohérence de l'impasse limitée</span> </span></p>
<p>L'obsolescence limitée convient aux scénarios qui doivent contrôler la latence de la recherche et qui peuvent accepter une invisibilité sporadique des données. Par exemple, dans les systèmes de recommandation tels que les moteurs de recommandation vidéo, l'invisibilité des données a parfois un faible impact sur le taux de rappel global, mais peut considérablement améliorer les performances du système de recommandation.</p>
<h3 id="Session" class="common-anchor-header">Session</h3><p>La session garantit que toutes les données écrites peuvent être immédiatement perçues en lecture au cours de la même session. En d'autres termes, lorsque vous écrivez des données via un client, les données nouvellement insérées deviennent instantanément consultables.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Session.png" alt="Session consistency" class="doc-image" id="session-consistency" />
   </span> <span class="img-wrapper"> <span>Cohérence de la session</span> </span></p>
<p>Nous recommandons de choisir la session comme niveau de cohérence pour les scénarios dans lesquels la demande de cohérence des données dans la même session est élevée. Un exemple peut être la suppression des données d'une entrée de livre dans le système de la bibliothèque, et après confirmation de la suppression et rafraîchissement de la page (une session différente), le livre ne devrait plus être visible dans les résultats de la recherche.</p>
<h3 id="Eventually" class="common-anchor-header">Éventuellement</h3><p>Il n'y a pas d'ordre garanti pour les lectures et les écritures, et les répliques finissent par converger vers le même état si aucune autre opération d'écriture n'est effectuée. Dans le cas d'une cohérence &quot;éventuelle&quot;, les répliques commencent à travailler sur les requêtes de lecture avec les dernières valeurs mises à jour. Le niveau de cohérence "éventuellement" est le plus faible des quatre.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Consistency_Eventual.png" alt="Eventual consistency" class="doc-image" id="eventual-consistency" />
   </span> <span class="img-wrapper"> <span>Cohérence éventuelle</span> </span></p>
<p>Cependant, selon le théorème PACELC, la latence de recherche peut être considérablement réduite en sacrifiant la cohérence. C'est pourquoi le niveau de cohérence éventuelle est le mieux adapté aux scénarios qui n'exigent pas une grande cohérence des données, mais qui requièrent des performances de recherche ultra-rapides. Un exemple peut être la recherche d'avis et d'évaluations de produits Amazon avec le niveau "eventually consistent".</p>
<h2 id="Guarantee-timestamp" class="common-anchor-header">Garantie de l'horodatage<button data-href="#Guarantee-timestamp" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus réalise différents niveaux de cohérence en introduisant l'<a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">horodatage de garantie</a> (GuaranteeTs).</p>
<p>Un GuaranteeTs sert à informer les nœuds de requête qu'une recherche ou une requête ne sera pas exécutée tant que toutes les données antérieures au GuaranteeTs ne peuvent pas être vues par les nœuds de requête. Lorsque vous spécifiez le niveau de cohérence, celui-ci est associé à une valeur de garantie spécifique. Différentes valeurs de GuaranteeTs correspondent à différents niveaux de cohérence :</p>
<ul>
<li><p><strong>Fort</strong>: La valeur de GuaranteeTs est identique à l'horodatage le plus récent du système, et les nœuds d'interrogation attendent que toutes les données antérieures à l'horodatage le plus récent du système soient visibles avant de traiter la demande de recherche ou d'interrogation.</p></li>
<li><p><strong>Stabilité limitée</strong>: GuaranteeTs est relativement plus petit que l'horodatage le plus récent du système, et les nœuds d'interrogation effectuent des recherches sur une vue de données tolérable et moins mise à jour.</p></li>
<li><p><strong>Session</strong>: Le client utilise l'horodatage de la dernière opération d'écriture comme GuaranteeTs, de sorte que chaque client puisse au moins récupérer les données insérées par le même client.</p></li>
<li><p><strong>Éventuellement</strong>: GuaranteeTs est fixé à une valeur très faible afin d'ignorer le contrôle de cohérence. Les nœuds d'interrogation effectuent une recherche immédiate sur la vue de données existante.</p></li>
</ul>
<p>Voir <a href="https://github.com/milvus-io/milvus/blob/f3f46d3bb2dcae2de0bdb7bc0f7b20a72efceaab/docs/developer_guides/how-guarantee-ts-works.md">Comment fonctionne GuaranteeTs</a> pour plus d'informations sur le mécanisme garantissant différents niveaux de cohérence dans Milvus.</p>
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
<li>Apprendre à régler le niveau de cohérence lorsque<ul>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md">effectuer une recherche à vecteur unique</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">d'une recherche hybride</a></li>
<li><a href="/docs/fr/v2.4.x/get-and-scalar-query.md">effectuer une requête scalaire</a></li>
</ul></li>
</ul>
