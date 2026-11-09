---
id: json-shredding.md
title: Fragmentation JSONCompatible with Milvus 2.6.2+
summary: >-
  Le « JSON shredding » accélère les requêtes JSON en convertissant le stockage
  traditionnel par lignes en un stockage optimisé par colonnes. Tout en
  conservant la flexibilité du format JSON pour la modélisation des données,
  Milvus effectue en arrière-plan une optimisation par colonnes qui améliore
  considérablement l'efficacité de l'accès aux données et des requêtes.
beta: Milvus 2.6.2+
---
<h1 id="JSON-Shredding" class="common-anchor-header">Fragmentation JSON<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.2+</span><button data-href="#JSON-Shredding" class="anchor-icon" translate="no">
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
    </button></h1><p>Le « JSON shredding » accélère les requêtes JSON en convertissant le stockage traditionnel basé sur les lignes en un stockage en colonnes optimisé. Tout en conservant la flexibilité de JSON pour la modélisation des données, Milvus effectue en arrière-plan une optimisation en colonnes qui améliore considérablement l’efficacité de l’accès et des requêtes.</p>
<p>Le « JSON shredding » est efficace dans la plupart des scénarios de requêtes JSON. Les gains de performances sont d’autant plus marqués avec :</p>
<ul>
<li><p><strong>Documents JSON plus volumineux et plus complexes</strong>: les gains de performances augmentent à mesure que la taille des documents augmente</p></li>
<li><p><strong>Les charges de travail à forte intensité de lecture</strong>: filtrage, tri ou recherche fréquents sur des clés JSON</p></li>
<li><p><strong>Des modèles de requêtes mixtes</strong>: les requêtes portant sur différentes clés JSON tirent parti de l’approche de stockage hybride</p></li>
</ul>
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
    </button></h2><p>Le processus de fragmentation JSON se déroule en trois phases distinctes afin d’optimiser les données pour une récupération rapide.</p>
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
    </button></h3><p>Au fur et à mesure que de nouveaux documents JSON sont écrits, Milvus les échantillonne et les analyse en continu afin d’établir des statistiques pour chaque clé JSON. Cette analyse porte notamment sur le taux d’occurrence de la clé et la stabilité de son type (c’est-à-dire si son type de données est cohérent d’un document à l’autre).</p>
<p>Sur la base de ces statistiques, les clés JSON sont classées dans les catégories suivantes pour un stockage optimal.</p>
<h4 id="Categories-of-JSON-keys" class="common-anchor-header">Catégories de clés JSON</h4><table>
   <tr>
     <th><p>Type de clé</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p>Clés typées</p></td>
     <td><p>Clés présentes dans la plupart des documents et ayant toujours le même type de données (par exemple, toutes des entiers ou toutes des chaînes de caractères).</p></td>
   </tr>
   <tr>
     <td><p>Clés dynamiques</p></td>
     <td><p>Clés qui apparaissent fréquemment mais dont le type de données est variable (par exemple, tantôt une chaîne de caractères, tantôt un entier).</p></td>
   </tr>
   <tr>
     <td><p>Clés partagées</p></td>
     <td><p>Clés apparaissant rarement ou imbriquées, dont la fréquence est inférieure à un seuil configurable<strong>.</strong></p></td>
   </tr>
</table>
<h4 id="Example-classification" class="common-anchor-header">Exemple de classification</h4><p>Prenons l’exemple d’un échantillon de données JSON contenant les clés JSON suivantes :</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">10</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str1&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str2&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">}</span>  
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">30</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;str3&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">3</span><span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">40</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;f&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span><span class="hljs-punctuation">}</span>       <span class="hljs-comment">// b becomes mixed type</span>
<span class="hljs-punctuation">{</span><span class="hljs-attr">&quot;a&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">50</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;b&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span> <span class="hljs-attr">&quot;e&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;rare&quot;</span><span class="hljs-punctuation">}</span>  <span class="hljs-comment">// e appears infrequently</span>
<button class="copy-code-btn"></button></code></pre>
<p>Sur la base de ces données, les clés seraient classées comme suit :</p>
<ul>
<li><p><strong>Clés typées</strong>: <code translate="no">a</code> et <code translate="no">f</code> (toujours un entier)</p></li>
<li><p><strong>Clés dynamiques</strong>: <code translate="no">b</code> (mélange de chaînes de caractères et d’entiers)</p></li>
<li><p><strong>Clés partagées</strong>: <code translate="no">e</code> (clé apparaissant rarement)</p></li>
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
    </button></h3><p>La classification issue de <a href="/docs/fr/json-shredding.md#Phase-1-Ingestion--key-classification">la phase 1</a> détermine la structure de stockage. Milvus utilise un format en colonnes optimisé pour les requêtes.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/json-shredding-flow.png" alt="Json Shredding Flow" class="doc-image" id="json-shredding-flow" /> 
   <span>Flux de fragmentation JSON</span>
  
 </span></p>
<ul>
<li><p><strong>Colonnes fragmentées</strong>: pour <strong>les clés</strong> <strong>typées</strong> et <strong>dynamiques</strong>, les données sont écrites dans des colonnes dédiées. Ce stockage en colonnes permet des analyses rapides et directes lors des requêtes, car Milvus peut lire uniquement les données requises pour une clé donnée sans traiter l’intégralité du document.</p></li>
<li><p><strong>Colonne partagée</strong>: toutes <strong>les clés partagées</strong> sont stockées ensemble dans une seule colonne JSON binaire compacte. Un <strong>index inversé</strong> des clés partagées est construit sur cette colonne. Cet index est essentiel pour accélérer les requêtes sur les clés à faible fréquence en permettant à Milvus d’élaguer rapidement les données, ce qui réduit efficacement l’espace de recherche aux seules lignes contenant la clé spécifiée.</p></li>
</ul>
<h3 id="Phase-3-Query-execution" class="common-anchor-header">Phase 3 : Exécution de la requête<button data-href="#Phase-3-Query-execution" class="anchor-icon" translate="no">
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
    </button></h3><p>La phase finale tire parti de la structure de stockage optimisée pour sélectionner intelligemment le chemin le plus rapide pour chaque prédicat de requête.</p>
<ul>
<li><p><strong>Chemin rapide</strong>: les requêtes portant sur des clés typées/dynamiques (par exemple, <code translate="no">json['a'] &lt; 100</code>) accèdent directement à des colonnes dédiées</p></li>
<li><p><strong>Chemin optimisé</strong>: les requêtes portant sur des clés partagées (par exemple, <code translate="no">json['e'] = 'rare'</code>) utilisent un index inversé pour localiser rapidement les documents pertinents</p></li>
</ul>
<h2 id="Enable-JSON-shredding" class="common-anchor-header">Activer le découpage JSON<button data-href="#Enable-JSON-shredding" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour activer cette fonctionnalité, définissez ` <code translate="no">common.enabledJSONShredding</code> ` sur ` <code translate="no">true</code> ` dans votre fichier de configuration ` <code translate="no">milvus.yaml</code> `. Les nouvelles données déclencheront automatiquement le processus de découpage.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
  <span class="hljs-attr">enabledJSONShredding:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Indicates whether to enable JSON key stats build and load processes</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois cette fonctionnalité activée, Milvus commencera à analyser et à restructurer vos données JSON dès leur ingestion, sans aucune intervention manuelle supplémentaire.</p>
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
    </button></h2><p>Pour la plupart des utilisateurs, une fois le découpage JSON activé, les paramètres par défaut des autres paramètres sont suffisants. Vous pouvez toutefois affiner le comportement du découpage JSON à l’aide des paramètres suivants dans ` <code translate="no">milvus.yaml</code>`.</p>
<table>
   <tr>
     <th><p>Nom du paramètre</p></th>
     <th><p>Description</p></th>
     <th><p>Valeur par défaut</p></th>
     <th><p>Conseils de réglage</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">common.enabledJSONShredding</code></p></td>
     <td><p>Détermine si les processus de compilation et de chargement du « JSON shredding » sont activés.</p></td>
     <td><p>false</p></td>
     <td><p>Doit être défini sur « <strong>true</strong> » pour activer la fonctionnalité.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">common.usingjsonShreddingForQuery</code></p></td>
     <td><p>Détermine si Milvus utilise les données fragmentées à des fins d'accélération.</p></td>
     <td><p>true</p></td>
     <td><p>Définir sur <strong>« false »</strong> à titre de mesure de secours en cas d'échec des requêtes, afin de revenir au chemin de requête d'origine.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">queryNode.mmap.jsonShredding</code></p></td>
     <td><p>Détermine si Milvus utilise mmap lors du chargement des données fragmentées.</p><p>Pour plus de détails, consultez la section « <a href="/docs/fr/mmap.md">Utilisation de mmap</a> ».</p></td>
     <td><p>true</p></td>
     <td><p>Ce paramètre est généralement optimisé pour les performances. Ne le modifiez que si vous avez des besoins spécifiques en matière de gestion de la mémoire ou des contraintes sur votre système.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingMaxColumns</code></p></td>
     <td><p>Nombre maximal de clés JSON qui seront stockées dans les colonnes fragmentées. </p><p>Si le nombre de clés apparaissant fréquemment dépasse cette limite, Milvus donnera la priorité aux clés les plus fréquentes pour le fractionnement, et les clés restantes seront stockées dans la colonne partagée.</p></td>
     <td><p>1024</p></td>
     <td><p>Cette valeur est suffisante pour la plupart des cas de figure. Pour les fichiers JSON comportant des milliers de clés apparaissant fréquemment, vous devrez peut-être augmenter cette valeur, mais surveillez l’utilisation de l’espace de stockage.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">dataCoord.jsonShreddingRatioThreshold</code></p></td>
     <td><p>Le ratio d’occurrence minimum qu’une clé JSON doit présenter pour être prise en compte en vue d’un fractionnement dans une colonne fractionnée.</p><p>Une clé est considérée comme fréquente si son taux d’occurrence est supérieur à ce seuil.</p></td>
     <td><p>0,3</p></td>
     <td><p><strong>Augmentez</strong> cette valeur (par exemple, à 0,5) si le nombre de clés répondant aux critères de fragmentation dépasse la limite d’ <code translate="no">dataCoord.jsonShreddingMaxColumns</code>. Cela rend le seuil plus strict, réduisant ainsi le nombre de clés éligibles à la fragmentation.</p><p><strong>Diminuez-le</strong> (par exemple, à 0,1) si vous souhaitez fragmenter davantage de clés apparaissant moins fréquemment que le seuil par défaut de 30 %.</p></td>
   </tr>
</table>
<h2 id="Performance-benchmarks" class="common-anchor-header">Tests de performances<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>Nos tests démontrent des améliorations significatives des performances pour différents types de clés JSON et différents modèles de requêtes.</p>
<h3 id="Test-environment-and-methodology" class="common-anchor-header">Environnement et méthodologie de test<button data-href="#Test-environment-and-methodology" class="anchor-icon" translate="no">
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
<li><p><strong>Matériel</strong>: cluster à 1 cœur/8 Go</p></li>
<li><p><strong>Jeu de données</strong>: 1 million de documents issus de <a href="https://github.com/ClickHouse/JSONBench.git">JSONBench</a></p></li>
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
    </button></h3><p>Ce test a mesuré les performances lors de la recherche d'une clé présente dans la plupart des documents.</p>
<table>
   <tr>
     <th><p>Expression de requête</p></th>
     <th><p>Type de valeur de clé</p></th>
     <th><p>QPS (sans fragmentation)</p></th>
     <th><p>QPS (avec fragmentation)</p></th>
     <th><p>Gain de performances</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['time_us'] &gt; 0</code></p></td>
     <td><p>Entier</p></td>
     <td><p>8,69</p></td>
     <td><p>287,50</p></td>
     <td><p>33x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['kind'] == 'commit'</code></p></td>
     <td><p>Chaîne</p></td>
     <td><p>8,42</p></td>
     <td><p>126,1</p></td>
     <td><p>14,9x</p></td>
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
    </button></h3><p>Ce test portait sur l’interrogation de clés clairsemées et imbriquées appartenant à la catégorie « partagées ».</p>
<table>
   <tr>
     <th><p>Expression de requête</p></th>
     <th><p>Type de valeur de clé</p></th>
     <th><p>QPS (sans fragmentation)</p></th>
     <th><p>QPS (avec fragmentation)</p></th>
     <th><p>Gain de performances</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['seq'] &gt; 0</code></p></td>
     <td><p>Entier imbriqué</p></td>
     <td><p>4,33</p></td>
     <td><p>385</p></td>
     <td><p>88,9x</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">json['identity']['did'] == 'xxxxx'</code></p></td>
     <td><p>Chaîne imbriquée</p></td>
     <td><p>7,6</p></td>
     <td><p>352</p></td>
     <td><p>46,3x</p></td>
   </tr>
</table>
<h3 id="Key-insights" class="common-anchor-header">Principales conclusions<button data-href="#Key-insights" class="anchor-icon" translate="no">
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
<li><p><strong>Les requêtes à clé partagée</strong> affichent les améliorations les plus spectaculaires (jusqu’à 89 fois plus rapides)</p></li>
<li><p><strong>Les requêtes à clé typée</strong> offrent des gains de performances constants de 15 à 30 fois</p></li>
<li><p><strong>Tous les types de requêtes</strong> bénéficient du « JSON Shredding » sans perte de performances</p></li>
</ul>
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
    </button></h2><ul>
<li><p><strong>Comment vérifier si le « JSON Shredding » fonctionne correctement ?</strong></p>
<ol>
<li><p>Commencez par vérifier si les données ont bien été générées à l'aide de la commande « <code translate="no">show segment --format table</code> » dans l'outil <a href="/docs/fr/birdwatcher_usage_guides.md">Birdwatcher</a>. Si l'opération réussit, la sortie contiendra les valeurs « <code translate="no">shredding_data/</code> » et « <code translate="no">shared_key_index/</code> » dans le champ « <strong>Json Key Stats</strong> ».</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/birdwatcher-output.png" alt="Birdwatcher Output" class="doc-image" id="birdwatcher-output" /> 
   <span>Sortie de Birdwatcher</span>
  
 </span></p></li>
<li><p>Ensuite, vérifiez que les données ont bien été chargées en exécutant la commande « <code translate="no">show loaded-json-stats</code> » sur le nœud de requête. La sortie affichera des détails sur les données fragmentées chargées pour chaque nœud de requête.</p></li>
</ol></li>
<li><p><strong>Que faire en cas d’erreur ?</strong></p>
<p>Si le processus de création ou de chargement échoue, vous pouvez rapidement désactiver la fonctionnalité en définissant <code translate="no">common.enabledJSONShredding=false</code>. Pour effacer les tâches restantes, utilisez la commande <code translate="no">remove stats-task &lt;task_id&gt;</code> dans <a href="/docs/fr/birdwatcher_usage_guides.md">Birdwatcher</a>. Si une requête échoue, définissez <code translate="no">common.usingjsonShreddingForQuery=false</code> pour revenir au chemin de requête d’origine, en contournant les données fragmentées.</p></li>
</ul>
<ul>
<li><p><strong>Comment choisir entre le « shredding » JSON et l’indexation JSON ?</strong></p>
<ul>
<li><p><strong>Le fractionnement JSON</strong> est idéal pour les clés qui apparaissent fréquemment dans vos documents, en particulier pour les structures JSON complexes. Il combine les avantages du stockage en colonnes et de l’indexation inversée, ce qui le rend particulièrement adapté aux scénarios à forte intensité de lecture où vous interrogez de nombreuses clés différentes. Cependant, il n’est pas recommandé pour les très petits documents JSON, car le gain de performances est minime. Plus la proportion de la valeur de la clé par rapport à la taille totale du document JSON est faible, plus l’optimisation des performances grâce au fractionnement est importante.</p></li>
<li><p><strong>L’indexation JSON</strong> est plus adaptée à l’optimisation ciblée de requêtes spécifiques basées sur des clés et présente une surcharge de stockage moindre. Elle convient aux structures JSON plus simples. Notez que le « shredding » JSON ne couvre pas les requêtes portant sur des clés situées à l’intérieur de tableaux ; vous avez donc besoin d’un index JSON pour les accélérer.</p></li>
</ul>
<p>Pour plus de détails, consultez la section <a href="/docs/fr/json-field-overview.md#Next-Accelerate-JSON-queries">Présentation des champs JSON</a>.</p></li>
</ul>
