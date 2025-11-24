---
id: json-shredding.md
title: Déchiquetage JSONCompatible with Milvus 2.6.2+
summary: >-
  Le déchiquetage JSON accélère les requêtes JSON en convertissant le stockage
  traditionnel basé sur les lignes en un stockage optimisé en colonnes. Tout en
  conservant la souplesse de JSON pour la modélisation des données, Milvus
  effectue en coulisses une optimisation en colonnes qui améliore
  considérablement l'accès et l'efficacité des requêtes.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Déchiquetage JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Le déchiquetage JSON accélère les requêtes JSON en convertissant le stockage traditionnel basé sur les lignes en un stockage optimisé en colonnes. Tout en conservant la flexibilité de JSON pour la modélisation des données, Milvus effectue une optimisation en colonne en coulisse qui améliore considérablement l'accès et l'efficacité des requêtes.</p>
<p>Le déchiquetage JSON est efficace pour la plupart des scénarios de requête JSON. Les avantages en termes de performances sont plus prononcés dans les cas suivants</p>
<ul>
<li><p><strong>Documents JSON plus volumineux et plus complexes</strong> - Gains de performance plus importants à mesure que la taille du document augmente</p></li>
<li><p><strong>Charges de travail lourdes en lecture</strong> - Filtrage, tri ou recherche fréquents sur les clés JSON</p></li>
<li><p><strong>Modèles de requêtes mixtes</strong> - Les requêtes portant sur différentes clés JSON bénéficient de l'approche de stockage hybride.</p></li>
</ul>
<h2 id="How-it-works" class="common-anchor-header">Comment cela fonctionne-t-il ?<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Le processus de déchiquetage JSON se déroule en trois phases distinctes afin d'optimiser les données pour une récupération rapide.</p>
<h3 id="Phase-1-Ingestion--key-classification" class="common-anchor-header">Phase 1 : Ingestion et classification des clés<button data-href="#Phase-1-Ingestion--key-classification" class="anchor-icon" translate="no">
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
    </button></h3><p>Au fur et à mesure que de nouveaux documents JSON sont écrits, Milvus les échantillonne et les analyse en continu afin d'établir des statistiques pour chaque clé JSON. Cette analyse comprend le taux d'occurrence de la clé et la stabilité du type (si son type de données est cohérent entre les documents).</p>
<p>Sur la base de ces statistiques, les clés JSON sont classées dans les catégories suivantes pour un stockage optimal.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Catégories de clés JSON</h4><table>
   <tr>
     <th><p>Type de clé</p></th>
     <th><p>Description des clés</p></th>
   </tr>
   <tr>
     <td><p>Clés typées</p></td>
     <td><p>Clés qui existent dans la plupart des documents et qui ont toujours le même type de données (par exemple, tous les entiers ou toutes les chaînes).</p></td>
   </tr>
   <tr>
     <td><p>Clés dynamiques</p></td>
     <td><p>Clés qui apparaissent fréquemment mais dont le type de données est mixte (par exemple, tantôt une chaîne de caractères, tantôt un nombre entier).</p></td>
   </tr>
   <tr>
     <td><p>Clés partagées</p></td>
     <td><p>Clés peu fréquentes ou imbriquées dont la fréquence est inférieure à un seuil configurable<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Exemple de classification</h4><p>Considérons l'échantillon de données JSON contenant les clés JSON suivantes :</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sur la base de ces données, les clés seraient classées comme suit :</p>
<ul>
<li><p><strong>Clés typées</strong>: <code translate="no">a</code> et <code translate="no">f</code> (toujours un nombre entier)</p></li>
<li><p>Clés<strong>dynamiques</strong>: <code translate="no">b</code> (chaîne mixte/nombre entier)</p></li>
<li><p>Clés<strong>partagées</strong>: <code translate="no">e</code> (clé peu fréquente)</p></li>
</ul>
<h3 id="Phase-2-Storage-optimization" class="common-anchor-header">Phase 2 : Optimisation du stockage<button data-href="#Phase-2-Storage-optimization" class="anchor-icon" translate="no">
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
    </button></h3><p>La classification de la <a href="/docs/fr/json-shredding.md#Phase-1-Ingestion--key-classification">phase 1</a> dicte la disposition du stockage. Milvus utilise un format en colonnes optimisé pour les requêtes.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" />
   </span> <span class="img-wrapper"> <span>Flux de déchiquetage Json</span> </span></p>
<ul>
<li><p><strong>Colonnes déchiquetées</strong>: Pour les <strong>clés</strong> <strong>typées</strong> et <strong>dynamiques</strong>, les données sont écrites dans des colonnes dédiées. Ce stockage en colonnes permet des analyses rapides et directes lors des requêtes, car Milvus peut lire uniquement les données requises pour une clé donnée sans traiter l'ensemble du document.</p></li>
<li><p><strong>Colonne partagée</strong>: Toutes les <strong>clés partagées</strong> sont stockées ensemble dans une seule colonne JSON binaire compacte. Un <strong>index inversé des</strong> clés partagées est construit sur cette colonne. Cet index est essentiel pour accélérer les requêtes sur les clés à faible fréquence en permettant à Milvus d'élaguer rapidement les données, en réduisant efficacement l'espace de recherche aux seules lignes qui contiennent la clé spécifiée.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Phase 3 : Exécution des requêtes<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>La phase finale exploite la disposition optimisée du stockage pour sélectionner intelligemment le chemin le plus rapide pour chaque prédicat de requête.</p>
<ul>
<li><p><strong>Chemin rapide</strong>: Les requêtes portant sur des clés typées/dynamiques (par exemple, <code translate="no">json['a'] &lt; 100</code>) accèdent directement aux colonnes dédiées.</p></li>
<li><p><strong>Chemin optimisé</strong>: Les requêtes sur des clés partagées (par exemple, <code translate="no">json['e'] = 'rare'</code>) utilisent un index inversé pour localiser rapidement les documents pertinents.</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Activer le déchiquetage JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour activer cette fonctionnalité, définissez <code translate="no">common.enabledJSONShredding</code> comme <code translate="no">true</code> dans votre fichier de configuration <code translate="no">milvus.yaml</code>. Les nouvelles données déclencheront automatiquement le processus de déchiquetage.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois activé, Milvus commencera à analyser et à restructurer vos données JSON dès leur ingestion, sans autre intervention manuelle.</p>
<h2 id="Parameter-tuning" class="common-anchor-header">Réglage des paramètres<button data-href="#Parameter-tuning" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour la plupart des utilisateurs, une fois le déchiquetage JSON activé, les paramètres par défaut des autres paramètres sont suffisants. Toutefois, vous pouvez affiner le comportement du déchiquetage JSON à l'aide de ces paramètres à l'adresse <code translate="no">milvus.yaml</code>.</p>
<table>
   <tr>
     <th><p>Paramètre Nom</p></th>
     <th><p>Description du paramètre</p></th>
     <th><p>Valeur par défaut</p></th>
     <th><p>Conseils de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Contrôle si les processus de construction et de chargement du déchiquetage JSON sont activés.</p></td>
     <td><p>faux</p></td>
     <td><p>Doit être défini sur <strong>true</strong> pour activer la fonctionnalité.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Contrôle si Milvus utilise des données déchiquetées pour l'accélération.</p></td>
     <td><p>true</p></td>
     <td><p>Défini sur <strong>false</strong> comme mesure de récupération en cas d'échec des requêtes, pour revenir au chemin de requête d'origine.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Détermine si Milvus utilise mmap lors du chargement des données déchiquetées.</p><p>Pour plus de détails, voir <a href="/docs/fr/mmap.md">Utiliser mmap</a>.</p></td>
     <td><p>true (vrai)</p></td>
     <td><p>Ce paramètre est généralement optimisé pour les performances. Ne l'ajustez que si vous avez des besoins ou des contraintes spécifiques en matière de gestion de la mémoire sur votre système.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Nombre maximal de clés JSON qui seront stockées dans les colonnes déchiquetées. </p><p>Si le nombre de clés apparaissant fréquemment dépasse cette limite, Milvus donnera la priorité aux clés les plus fréquentes pour le déchiquetage, et les clés restantes seront stockées dans la colonne partagée.</p></td>
     <td><p>1024</p></td>
     <td><p>Cette limite est suffisante pour la plupart des scénarios. Pour les JSON comportant des milliers de clés fréquentes, il peut être nécessaire d'augmenter cette limite, mais surveillez l'utilisation de l'espace de stockage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Le taux d'occurrence minimum qu'une clé JSON doit avoir pour être considérée comme déchiquetée dans une colonne déchiquetée.</p><p>Une clé est considérée comme apparaissant fréquemment si son ratio est supérieur à ce seuil.</p></td>
     <td><p>0.3</p></td>
     <td><p><strong>Augmenter</strong> (par exemple, à 0,5) si le nombre de clés répondant aux critères de destruction dépasse la limite de <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. Le seuil est alors plus strict, ce qui réduit le nombre de clés pouvant être déchiquetées.</p><p><strong>Diminuez le</strong> seuil (par exemple, à 0,1) si vous souhaitez détruire davantage de clés qui apparaissent moins fréquemment que le seuil par défaut de 30 %.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Critères de performance<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Nos tests démontrent des améliorations significatives des performances pour différents types de clés JSON et modèles de requêtes.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Environnement de test et méthodologie<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Matériel</strong>: cluster 1 core/8GB</p></li>
<li><p><strong>Jeu de données</strong>: 1 million de documents provenant de <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
<li><p><strong>Taille moyenne des documents</strong>: 478,89 octets</p></li>
<li><p><strong>Durée du test</strong>: 100 secondes pour mesurer le QPS et la latence</p></li>
</ul>
<h3 id="Results-typed-keys" class="common-anchor-header">Résultats : clés typées<button data-href="#Results-typed-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce test a mesuré les performances lors de l'interrogation d'une clé présente dans la plupart des documents.</p>
<table>
   <tr>
     <th><p>Expression de la requête</p></th>
     <th><p>Valeur de la clé Type</p></th>
     <th><p>QPS (sans déchiquetage)</p></th>
     <th><p>QPS (avec déchiquetage)</p></th>
     <th><p>Augmentation des performances</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Entier</p></td>
     <td><p>8.69</p></td>
     <td><p>287.50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Chaîne de caractères</p></td>
     <td><p>8.42</p></td>
     <td><p>126.1</p></td>
     <td><p>14.9x</p></td>
   </tr>
</table>
<h3 id="Results-shared-keys" class="common-anchor-header">Résultats : clés partagées<button data-href="#Results-shared-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce test s'est concentré sur l'interrogation de clés peu nombreuses et imbriquées appartenant à la catégorie "partagée".</p>
<table>
   <tr>
     <th><p>Expression de la requête</p></th>
     <th><p>Type de valeur de clé</p></th>
     <th><p>QPS (sans déchiquetage)</p></th>
     <th><p>QPS (avec déchiquetage)</p></th>
     <th><p>Amélioration des performances</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Entier imbriqué</p></td>
     <td><p>4.33</p></td>
     <td><p>385</p></td>
     <td><p>88.9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Chaîne imbriquée</p></td>
     <td><p>7.6</p></td>
     <td><p>352</p></td>
     <td><p>46.3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Informations clés<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p>Les<strong>requêtes clés partagées</strong> présentent les améliorations les plus spectaculaires (jusqu'à 89 fois plus rapides).</p></li>
<li><p>Les<strong>requêtes à clé typée</strong> offrent des gains de performance constants de 15 à 30 fois.</p></li>
<li><p><strong>Tous les types de requêtes</strong> bénéficient de JSON Shredding sans régression des performances.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ : COMMENT VÉRIFIER SI LE DÉCHIQUETAGE JSON EST EFFICACE ?<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>Comment puis-je vérifier que le déchiquetage JSON fonctionne correctement ?</strong></p>
<ol>
<li><p>Tout d'abord, vérifiez si les données ont été construites en utilisant la commande <code translate="no">show segment --format table</code> dans l'outil <a href="/docs/fr/birdwatcher_usage_guides.md">Birdwatcher</a>. Si c'est le cas, la sortie contiendra <code translate="no">shredding_data/</code> et <code translate="no">shared_key_index/</code> dans le champ <strong>Json Key Stats</strong>.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" />
   </span> <span class="img-wrapper"> <span>Sortie de Birdwatcher</span> </span></p></li>
<li><p>Ensuite, vérifiez que les données ont été chargées en exécutant <code translate="no">show loaded-json-stats</code> sur le nœud de requête. La sortie affichera des détails sur les données déchiquetées chargées pour chaque nœud de requête.</p></li>
</ol></li>
<li><p><strong>Que faire en cas d'erreur ?</strong></p>
<p>Si le processus de construction ou de chargement échoue, vous pouvez rapidement désactiver la fonctionnalité en configurant <code translate="no">common.enabledJSONShredding=false</code>. Pour effacer toutes les tâches restantes, utilisez la commande <code translate="no">remove stats-task &lt;task_id&gt;</code> dans <a href="/docs/fr/birdwatcher_usage_guides.md">Birdwatcher</a>. Si une requête échoue, paramétrez <code translate="no">common.usingjsonShreddingForQuery=false</code> pour revenir au chemin de requête original, en contournant les données déchiquetées.</p></li>
<li><p><strong>Comment choisir entre le déchiquetage et l'indexation JSON ?</strong></p>
<ul>
<li><p>Le<strong>déchiquetage JSON</strong> est idéal pour les clés qui apparaissent fréquemment dans vos documents, en particulier pour les structures JSON complexes. Il combine les avantages du stockage en colonnes et de l'indexation inversée, ce qui le rend bien adapté aux scénarios de lecture intensive dans lesquels vous interrogez de nombreuses clés différentes. Cependant, il n'est pas recommandé pour les très petits documents JSON, car le gain de performance est minime. Plus la proportion de la valeur de la clé par rapport à la taille totale du document JSON est faible, plus le déchiquetage permet d'optimiser les performances.</p></li>
<li><p>L'<strong>indexation JSON</strong> est plus adaptée à l'optimisation ciblée de requêtes spécifiques basées sur des clés et présente des frais généraux de stockage moins élevés. Il convient aux structures JSON les plus simples. Notez que le déchiquetage JSON ne couvre pas les requêtes sur les clés à l'intérieur des tableaux, vous avez donc besoin d'un index JSON pour accélérer ces requêtes.</p></li>
</ul>
<p>Pour plus de détails, reportez-vous à la section <a href="/docs/fr/json-field-overview.md#Next-Accelerate-JSON-queries">Vue d'ensemble des champs JSON</a>.</p></li>
</ul>
