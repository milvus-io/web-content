---
id: performance_faq.md
summary: >-
  Réponses aux questions fréquemment posées sur les performances de recherche,
  l'amélioration des performances et d'autres problèmes liés aux performances.
title: FAQ sur les performances
---
<h1 id="Performance-FAQ" class="common-anchor-header">FAQ sur les performances<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Comment définir <code translate="no">nlist</code> et <code translate="no">nprobe</code> pour les index FIV ?</h4><p>La définition de <code translate="no">nlist</code> dépend du scénario. En règle générale, la valeur recommandée pour <code translate="no">nlist</code> est <code translate="no">4 × sqrt(n)</code>, où <code translate="no">n</code> est le nombre total d'entités dans un segment.</p>
<p>La taille de chaque segment est déterminée par le paramètre <code translate="no">datacoord.segment.maxSize</code>, qui est fixé par défaut à 512 Mo. Le nombre total d'entités dans un segment n peut être estimé en divisant <code translate="no">datacoord.segment.maxSize</code> par la taille de chaque entité.</p>
<p>Le réglage de <code translate="no">nprobe</code> est spécifique à l'ensemble de données et au scénario, et implique un compromis entre la précision et les performances de la requête. Nous recommandons de trouver la valeur idéale par le biais d'expériences répétées.</p>
<p>Les graphiques suivants sont les résultats d'un test effectué sur l'ensemble de données sift50m et l'index IVF_SQ8, qui compare les performances de rappel et de requête de différentes paires <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>Test de précision</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>Test de performance</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Pourquoi les requêtes prennent-elles parfois plus de temps sur les petits ensembles de données ?</h4><p>Les opérations d'interrogation sont effectuées sur des segments. Les index réduisent le temps nécessaire à l'interrogation d'un segment. Si un segment n'a pas été indexé, Milvus a recours à une recherche brute sur les données brutes, ce qui augmente considérablement le temps d'interrogation.</p>
<p>Par conséquent, l'interrogation d'un petit ensemble de données (collection) prend généralement plus de temps parce qu'il n'a pas été indexé. En effet, la taille de ses segments n'a pas atteint le seuil de construction d'index fixé par <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Appelez <code translate="no">create_index()</code> pour forcer Milvus à indexer les segments qui ont atteint le seuil mais qui n'ont pas encore été indexés automatiquement, ce qui améliore considérablement les performances de la requête.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Quels sont les facteurs qui influencent l'utilisation de l'unité centrale ?</h4><p>L'utilisation de l'UC augmente lorsque Milvus construit des index ou exécute des requêtes. En général, la construction d'index est gourmande en CPU, sauf lors de l'utilisation d'Annoy, qui s'exécute sur un seul thread.</p>
<p>Lors de l'exécution des requêtes, l'utilisation de l'unité centrale est affectée par <code translate="no">nq</code> et <code translate="no">nprobe</code>. Lorsque <code translate="no">nq</code> et <code translate="no">nprobe</code> sont petits, la concurrence est faible et l'utilisation de l'unité centrale reste basse.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">L'insertion de données et la recherche simultanées ont-elles un impact sur les performances des requêtes ?</h4><p>Les opérations d'insertion ne sont pas très gourmandes en ressources humaines. Toutefois, comme les nouveaux segments peuvent ne pas avoir atteint le seuil de construction de l'index, Milvus a recours à la recherche par force brute, ce qui a un impact significatif sur les performances de la requête.</p>
<p>Le paramètre <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> détermine le seuil de construction d'index pour un segment et est défini par défaut à 1024 lignes. Voir <a href="/docs/fr/v2.4.x/system_configuration.md">Configuration du système</a> pour plus d'informations.</p>
<h4 id="Is-storage-space-released-right-after-data-deletion-in-Milvus" class="common-anchor-header">L'espace de stockage est-il libéré immédiatement après la suppression des données dans Milvus ?</h4><p>Non, l'espace de stockage n'est pas immédiatement libéré lorsque vous supprimez des données dans Milvus. Bien que la suppression de données marque les entités comme "logiquement supprimées", l'espace réel peut ne pas être libéré instantanément. Voici pourquoi :</p>
<ul>
<li><strong>Compactage</strong>: Milvus compacte automatiquement les données en arrière-plan. Ce processus fusionne des segments de données plus petits en segments plus grands et supprime les données supprimées logiquement (entités marquées pour la suppression) ou les données qui ont dépassé leur durée de vie (TTL). Cependant, le compactage crée de nouveaux segments tout en marquant les anciens comme "abandonnés".</li>
<li><strong>Collecte des déchets</strong>: Un processus distinct appelé Garbage Collection (GC) supprime périodiquement ces segments "abandonnés", libérant ainsi l'espace de stockage qu'ils occupaient. Cela garantit une utilisation efficace de l'espace de stockage, mais peut entraîner un léger délai entre la suppression et la récupération de l'espace.</li>
</ul>
<h4 id="Can-I-see-inserted-deleted-or-upserted-data-immediately-after-the-operation-without-waiting-for-a-flush" class="common-anchor-header">Puis-je voir les données insérées, supprimées ou réinsérées immédiatement après l'opération, sans attendre la vidange ?</h4><p>Oui, dans Milvus, la visibilité des données n'est pas directement liée aux opérations de vidage en raison de son architecture de désagrégation du stockage et du calcul. Vous pouvez gérer la lisibilité des données à l'aide des niveaux de cohérence.</p>
<p>Lors de la sélection d'un niveau de cohérence, tenez compte des compromis entre la cohérence et les performances. Pour les opérations nécessitant une visibilité immédiate, utilisez un niveau de cohérence "fort". Pour des écritures plus rapides, donnez la priorité à une cohérence plus faible (les données peuvent ne pas être immédiatement visibles). Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/consistency.md">Cohérence</a>.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">L'indexation d'un champ VARCHAR peut-elle améliorer la vitesse de suppression ?</h4><p>L'indexation d'un champ VARCHAR peut accélérer les opérations de suppression par expression, mais uniquement sous certaines conditions :</p>
<ul>
<li><strong>Index INVERTED</strong>: Cet index est utile pour les expressions <code translate="no">IN</code> ou <code translate="no">==</code> sur les champs VARCHAR à clé non primaire.</li>
<li><strong>Index Trie</strong>: Cet index est utile pour les requêtes de préfixe (par exemple, <code translate="no">LIKE prefix%</code>) sur des champs VARCHAR non primaires.</li>
</ul>
<p>Toutefois, l'indexation d'un champ VARCHAR n'accélère pas le processus :</p>
<ul>
<li><strong>Suppression par ID</strong>: lorsque le champ VARCHAR est la clé primaire.</li>
<li><strong>Les expressions non liées</strong>: Lorsque le champ VARCHAR ne fait pas partie de l'expression de suppression.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Vous avez encore des questions ?</h4><p>Vous pouvez le faire :</p>
<ul>
<li>Consulter <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> sur GitHub. N'hésitez pas à poser des questions, à partager des idées et à aider les autres.</li>
<li>Rejoignez notre <a href="https://discord.com/invite/8uyFbECzPX">serveur Discord</a> pour trouver de l'aide et vous engager avec notre communauté open-source.</li>
</ul>
