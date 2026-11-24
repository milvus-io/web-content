---
id: performance_faq.md
summary: >-
  Retrouvez les réponses aux questions fréquemment posées concernant les
  performances de recherche, les améliorations de performances et d'autres
  problèmes liés aux performances.
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">Comment définir les paramètres « <code translate="no">nlist</code> » et « <code translate="no">nprobe</code> » pour les index IVF ?</h4><p>La configuration de <code translate="no">nlist</code> dépend du scénario. En règle générale, la valeur recommandée pour <code translate="no">nlist</code> est <code translate="no">4 × sqrt(n)</code>, où <code translate="no">n</code> correspond au nombre total d’entités dans un segment.</p>
<p>La taille de chaque segment est déterminée par le paramètre ` <code translate="no">datacoord.segment.maxSize</code> `, qui est défini par défaut sur 1 024 Mo. Le nombre total d’entités dans un segment n peut être estimé en divisant ` <code translate="no">datacoord.segment.maxSize</code> ` par la taille de chaque entité.</p>
<p>Le réglage de <code translate="no">nprobe</code> dépend du jeu de données et du scénario, et implique un compromis entre précision et performances de requête. Nous recommandons de déterminer la valeur optimale par des essais répétés.</p>
<p>Les graphiques suivants présentent les résultats d’un test effectué sur le jeu de données sift50m et l’index IVF_SQ8, qui compare le rappel et les performances de requête de différentes paires <code translate="no">nlist</code>/<code translate="no">nprobe</code>.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v2.6.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" /> 
   <span>Test de précision</span>
 </span> <span class="img-wrapper"> 


  
   <img translate="no" src="/docs/v2.6.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /> 
 <span>   Test de performances</span>
  
 </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">Pourquoi les requêtes prennent-elles parfois plus de temps sur des ensembles de données plus petits ?</h4><p>Les opérations de requête s’effectuent sur des segments. Les index réduisent le temps nécessaire à l’interrogation d’un segment. Si un segment n’a pas été indexé, Milvus recourt à une recherche par force brute sur les données brutes, ce qui augmente considérablement le temps de requête.</p>
<p>Par conséquent, les requêtes sur un petit ensemble de données (collection) prennent généralement plus de temps, car aucun index n’a été créé. Cela s’explique par le fait que la taille de ses segments n’a pas atteint le seuil de création d’index défini par <code translate="no">rootCoord.minSegmentSizeToEnableindex</code>. Appelez <code translate="no">create_index()</code> pour forcer Milvus à indexer les segments qui ont atteint ce seuil mais qui n’ont pas encore été indexés automatiquement, ce qui améliore considérablement les performances des requêtes.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">Quels facteurs influencent l’utilisation du processeur ?</h4><p>L’utilisation du processeur augmente lorsque Milvus crée des index ou exécute des requêtes. En général, la création d’index est très gourmande en ressources processeur, sauf en cas d’utilisation d’Annoy, qui s’exécute sur un seul thread.</p>
<p>Lors de l’exécution de requêtes, l’utilisation du processeur dépend des paramètres <code translate="no">nq</code> et <code translate="no">nprobe</code>. Lorsque les valeurs de <code translate="no">nq</code> et <code translate="no">nprobe</code> sont faibles, la concurrence est faible et l’utilisation du processeur reste faible.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">L’insertion simultanée de données et la recherche ont-elles un impact sur les performances des requêtes ?</h4><p>Les opérations d’insertion ne sollicitent pas fortement le processeur. Cependant, comme les nouveaux segments n’ont peut-être pas encore atteint le seuil de création d’index, Milvus recourt à une recherche par force brute, ce qui affecte considérablement les performances des requêtes.</p>
<p>Le paramètre <code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> détermine le seuil de création d’index pour un segment ; il est défini par défaut sur 1 024 lignes. Voir <a href="/docs/fr/v2.6.x/system_configuration.md">Configuration du système</a> pour plus d’informations.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">L’indexation d’un champ VARCHAR peut-elle améliorer la vitesse de suppression ?</h4><p>L’indexation d’un champ VARCHAR peut accélérer les opérations « Delete By Expression », mais uniquement sous certaines conditions :</p>
<ul>
<li><strong>Index INVERTED</strong>: cet index facilite les expressions de type « <code translate="no">IN</code> » ou « <code translate="no">==</code> » sur des champs VARCHAR n’étant pas des clés primaires.</li>
<li><strong>Index Trie</strong>: cet index facilite les requêtes par préfixe (par exemple, « <code translate="no">LIKE prefix%</code> ») sur des champs VARCHAR n’appartenant pas à la clé primaire.</li>
</ul>
<p>Cependant, l’indexation d’un champ VARCHAR n’accélère pas :</p>
<ul>
<li><strong>La suppression par ID</strong>: lorsque le champ VARCHAR est la clé primaire.</li>
<li><strong>Expressions sans rapport</strong>: lorsque le champ VARCHAR ne fait pas partie de l’expression de suppression.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">Vous avez encore des questions ?</h4><p>Vous pouvez :</p>
<ul>
<li>Consulter <a href="https://github.com/milvus-io/milvus/issues">Milvus</a> sur GitHub. N'hésitez pas à poser des questions, à partager vos idées et à aider les autres.</li>
<li>Rejoignez notre <a href="https://discord.com/invite/8uyFbECzPX">canal Discord</a> pour obtenir de l'aide et échanger avec notre communauté open source.</li>
</ul>
