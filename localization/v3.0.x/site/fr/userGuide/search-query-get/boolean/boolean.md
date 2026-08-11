---
id: boolean.md
title: Le filtrage expliqué
summary: >-
  Milvus offre de puissantes fonctionnalités de filtrage qui permettent
  d'interroger vos données avec précision. Les expressions de filtrage vous
  permettent de cibler des champs scalaires spécifiques et d'affiner les
  résultats de recherche à l'aide de différentes conditions. Ce guide explique
  comment utiliser les expressions de filtrage dans Milvus, à l'aide d'exemples
  axés sur les opérations de requête. Vous pouvez également appliquer ces
  filtres dans les requêtes de recherche et de suppression.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Le filtrage expliqué<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre de puissantes fonctionnalités de filtrage qui permettent d’interroger vos données avec précision. Les expressions de filtrage vous permettent de cibler des champs scalaires spécifiques et d’affiner les résultats de recherche à l’aide de différentes conditions. Ce guide explique comment utiliser les expressions de filtrage dans Milvus, à l’aide d’exemples axés sur les opérations de requête. Vous pouvez également appliquer ces filtres dans les requêtes de recherche et de suppression.</p>
<h2 id="Basic-operators" class="common-anchor-header">Opérateurs de base<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus prend en charge plusieurs opérateurs de base pour le filtrage des données :</p>
<ul>
<li><p><strong>Opérateurs de comparaison</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> et <code translate="no">&lt;=</code> permettent de filtrer en fonction de champs numériques ou textuels.</p></li>
<li><p><strong>Filtres de plage et de motif</strong>: <code translate="no">IN</code>, <code translate="no">LIKE</code>, <code translate="no">=~</code> et <code translate="no">!~</code> permettent de faire correspondre des valeurs, des motifs avec caractères génériques ou des expressions régulières. Pour plus de détails sur les motifs de chaîne, reportez-vous à la section « <a href="/docs/fr/pattern-matching.md">Correspondance de motifs</a> ».</p></li>
<li><p><strong>Opérateurs arithmétiques</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> et <code translate="no">**</code> sont utilisés pour les calculs impliquant des champs numériques.</p></li>
<li><p><strong>Opérateurs bit à bit</strong>: dans Milvus 3.0.0 et versions ultérieures, <code translate="no">&amp;</code>, <code translate="no">|</code> et <code translate="no">^</code> filtrent les champs entiers qui codent plusieurs indicateurs, tels que les bits d’autorisation ou d’état. Pour plus de détails, reportez-vous à la <a href="/docs/fr/basic-operators.md#Bitwise-operators">section Opérateurs de base</a>.</p></li>
<li><p><strong>Opérateurs logiques</strong>: les opérateurs <code translate="no">AND</code>, <code translate="no">OR</code> et <code translate="no">NOT</code> combinent plusieurs conditions pour former des expressions complexes.</p></li>
<li><p><strong>Opérateurs IS NULL et IS NOT NULL</strong>: les opérateurs <code translate="no">IS NULL</code> et <code translate="no">IS NOT NULL</code> permettent de filtrer les champs selon qu’ils contiennent ou non une valeur nulle (absence de données). Pour plus de détails, reportez-vous à la section <a href="/docs/fr/basic-operators.md#IS-NULL-and-IS-NOT-NULL-operators">Opérateurs de base</a>.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Exemple : filtrage par couleur<button data-href="#Example-Filtering-by-Color" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour rechercher les entités présentant des couleurs primaires (rouge, vert ou bleu) dans un champ scalaire <code translate="no">color</code>, utilisez l’expression de filtrage suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Permission-Bits" class="common-anchor-header">Exemple : filtrage par bits d’autorisation<button data-href="#Example-Filtering-by-Permission-Bits" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour rechercher les entités dont le champ « <code translate="no">permissions</code> » de type entier comporte le bit « <code translate="no">SHARE</code> » activé, utilisez l’opérateur AND bit à bit (<code translate="no">&amp;</code>) :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;(permissions &amp; 4) == 4&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-by-Regex-Pattern" class="common-anchor-header">Exemple : filtrage par motif Regex<button data-href="#Example-Filtering-by-Regex-Pattern" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour rechercher les entités dont le champ « <code translate="no">message</code> » contient un code d’erreur tel que « <code translate="no">E1001</code> », utilisez l’opérateur de correspondance d’expression régulière <code translate="no">=~</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les filtres d’expressions régulières utilisent la correspondance de sous-chaînes. Pour exiger que la valeur complète du champ corresponde au motif, ajoutez les ancres <code translate="no">^</code> et <code translate="no">$</code>. Pour plus de détails, reportez-vous à <a href="/docs/fr/pattern-matching.md">la section Correspondance de motifs</a>.</p>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Exemple : filtrage des champs JSON<button data-href="#Example-Filtering-JSON-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus permet de référencer des clés dans des champs JSON. Par exemple, si vous disposez d’un champ JSON <code translate="no">product</code> contenant les clés <code translate="no">price</code> et <code translate="no">model</code>, et que vous souhaitez rechercher des produits d’un modèle spécifique et dont le prix est inférieur à 1 850, utilisez l’expression de filtrage suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Exemple : filtrage des champs de type tableau<button data-href="#Example-Filtering-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Si vous disposez d’un champ de type tableau <code translate="no">history_temperatures</code> contenant les enregistrements des températures moyennes relevées par les observatoires depuis l’année 2000, et que vous souhaitez rechercher les observatoires où la température en 2009 (la 10e année enregistrée) dépasse 23 °C, utilisez l’expression suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d’informations sur ces opérateurs de base, consultez la section <a href="/docs/fr/basic-operators.md">Opérateurs de base</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Modèles d’expressions de filtrage<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors d’un filtrage utilisant des caractères CJK, le traitement peut s’avérer plus complexe en raison de la taille plus importante de leurs jeux de caractères et des différences d’encodage. Cela peut entraîner un ralentissement des performances, en particulier avec l’opérateur ` <code translate="no">IN</code> `.</p>
<p>Milvus introduit les modèles d’expressions de filtrage afin d’optimiser les performances lors de l’utilisation de caractères CJK. En séparant les valeurs dynamiques de l’expression de filtrage, le moteur de requête gère l’insertion des paramètres plus efficacement.</p>
<h3 id="Example" class="common-anchor-header">Exemple<button data-href="#Example" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour rechercher les personnes âgées de plus de 25 ans résidant soit à « 北京 » (Pékin), soit à « 上海 » (Shanghai), utilisez le modèle d’expression suivant :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour améliorer les performances, utilisez cette variante avec des paramètres :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Cette approche réduit la charge d’analyse et améliore la vitesse de requête. Pour plus d’informations, consultez la section <a href="/docs/fr/filtering-templating.md">Modèles de filtres</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux types de données<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fournit des opérateurs de filtrage avancés pour des types de données spécifiques, tels que les champs JSON, ARRAY et VARCHAR.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs JSON<button data-href="#JSON-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus propose des opérateurs avancés pour l'interrogation des champs JSON, permettant un filtrage précis au sein de structures JSON complexes :</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Vérifie si une expression JSON existe dans le champ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Vérifie que tous les éléments de l'expression JSON sont présents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filtre les entités pour lesquelles au moins un élément de l'expression JSON est présent.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les opérateurs JSON, consultez la section <a href="/docs/fr/json-operators.md">Opérateurs JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs ARRAY<button data-href="#ARRAY-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus fournit des opérateurs de filtrage avancés pour les champs de type tableau, tels que <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code> et <code translate="no">ARRAY_LENGTH</code>, qui permettent un contrôle précis des données de tableau :</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtre les entités contenant un élément spécifique.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtre les entités dans lesquelles tous les éléments d’une liste sont présents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtre les entités contenant n'importe quel élément de la liste.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtre en fonction de la longueur du tableau.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les opérateurs de tableau, voir <a href="/docs/fr/array-operators.md">Opérateurs ARRAY</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs VARCHAR<button data-href="#VARCHAR-field-specific-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus fournit des opérateurs spécialisés pour des recherches textuelles précises sur les champs VARCHAR :</p>
<h4 id="Pattern-matching-operators" class="common-anchor-header">Opérateurs de correspondance de motifs</h4><p>Les opérateurs « <code translate="no">LIKE</code> », « <code translate="no">=~</code> » et « <code translate="no">!~</code> » permettent de faire correspondre des motifs de chaînes de caractères sur les champs « <code translate="no">VARCHAR</code> », les chemins de chaînes JSON et certains éléments « <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ». Utilisez « <code translate="no">LIKE</code> » pour les motifs simples avec caractères génériques. Utilisez « <code translate="no">=~</code> » et « <code translate="no">!~</code> » pour les expressions régulières RE2.</p>
<p>Pour plus de détails, consultez la section « <a href="/docs/fr/pattern-matching.md">Correspondance de motifs</a> ».</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> opérateur</h4><p>L'opérateur « <code translate="no">TEXT_MATCH</code> » permet une récupération précise de documents en fonction de termes de requête spécifiques. Il est particulièrement utile pour les recherches filtrées qui combinent des filtres scalaires et des recherches par similarité vectorielle. Contrairement aux recherches sémantiques, «Text Match» se concentre sur les occurrences exactes des termes.</p>
<p>Milvus utilise Tantivy pour prendre en charge l’indexation inversée et la recherche textuelle basée sur des termes. Le processus comprend :</p>
<ol>
<li><p><strong>Analyseur</strong>: tokenise et traite le texte d'entrée.</p></li>
<li><p><strong>Indexation</strong>: crée un index inversé associant des tokens uniques à des documents.</p></li>
</ol>
<p>Pour plus de détails, consultez la section « <a href="/docs/fr/keyword-match.md">Text Match</a> ».</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> opérateur<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>L'opérateur <strong>PHRASE_MATCH</strong> permet de récupérer avec précision des documents en fonction de correspondances exactes de phrases, en tenant compte à la fois de l'ordre et de la proximité des termes de la requête.</p>
<p>Pour plus de détails, consultez la section « <a href="/docs/fr/phrase-match.md">Correspondance d'expressions</a> ».</p>
