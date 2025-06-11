---
id: boolean.md
title: Explication du filtrage
summary: >-
  Milvus offre de puissantes capacités de filtrage qui permettent une
  interrogation précise de vos données. Les expressions de filtre vous
  permettent de cibler des champs scalaires spécifiques et d'affiner les
  résultats de la recherche avec différentes conditions. Ce guide explique
  comment utiliser les expressions de filtre dans Milvus, avec des exemples axés
  sur les opérations de requête. Vous pouvez également appliquer ces filtres
  dans les requêtes de recherche et de suppression.
---

<h1 id="Filtering-Explained" class="common-anchor-header">Explication du filtrage<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus offre de puissantes capacités de filtrage qui permettent une interrogation précise de vos données. Les expressions de filtre vous permettent de cibler des champs scalaires spécifiques et d'affiner les résultats de la recherche avec différentes conditions. Ce guide explique comment utiliser les expressions de filtre dans Milvus, avec des exemples axés sur les opérations de requête. Vous pouvez également appliquer ces filtres dans les requêtes de recherche et de suppression.</p>
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
    </button></h2><p>Milvus prend en charge plusieurs opérateurs de base pour filtrer les données :</p>
<ul>
<li><p><strong>Opérateurs de comparaison</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, et <code translate="no">&lt;=</code> permettent de filtrer sur la base de champs numériques ou textuels.</p></li>
<li><p><strong>Filtres de plage</strong>: <code translate="no">IN</code> et <code translate="no">LIKE</code> permettent de faire correspondre des plages ou des ensembles de valeurs spécifiques.</p></li>
<li><p><strong>Opérateurs arithmétiques</strong>: <code translate="no">+</code> Les opérateurs arithmétiques, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code> et <code translate="no">**</code> sont utilisés pour les calculs impliquant des champs numériques.</p></li>
<li><p><strong>Opérateurs logiques</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, et <code translate="no">NOT</code> combinent plusieurs conditions dans des expressions complexes.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Exemple : Filtrage par couleur</h3><p>Pour trouver des entités de couleur primaire (rouge, vert ou bleu) dans un champ scalaire <code translate="no">color</code>, utilisez l'expression de filtrage suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Exemple : Filtrage des champs JSON</h3><p>Milvus permet de référencer des clés dans des champs JSON. Par exemple, si vous avez un champ JSON <code translate="no">product</code> avec les clés <code translate="no">price</code> et <code translate="no">model</code>, et que vous voulez trouver des produits avec un modèle spécifique et un prix inférieur à 1 850, utilisez l'expression de filtre suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Exemple : Filtrage des champs de type tableau</h3><p>Si vous disposez d'un champ de tableau <code translate="no">history_temperatures</code> contenant les enregistrements des températures moyennes rapportées par les observatoires depuis l'année 2000, et que vous souhaitez trouver les observatoires dont la température en 2009 (la 10e enregistrée) dépasse 23°C, utilisez cette expression :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus d'informations sur ces opérateurs de base, reportez-vous à la section <a href="/docs/fr/v2.5.x/basic-operators.md">Opérateurs de base</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Modèles d'expression de filtrage<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>Lors d'un filtrage utilisant des caractères CJK, le traitement peut être plus complexe en raison des jeux de caractères plus importants et des différences d'encodage. Cela peut entraîner des performances plus lentes, en particulier avec l'opérateur <code translate="no">IN</code>.</p>
<p>Milvus introduit un modèle d'expression de filtre pour optimiser les performances lors de l'utilisation de caractères CJK. En séparant les valeurs dynamiques de l'expression de filtre, le moteur de requête traite l'insertion de paramètres plus efficacement.</p>
<h3 id="Example" class="common-anchor-header">Exemple</h3><p>Pour trouver les personnes de plus de 25 ans vivant à "北京" (Pékin) ou à "上海" (Shanghai), utilisez le modèle d'expression suivant :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour améliorer les performances, utilisez cette variante avec des paramètres :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Cette approche permet de réduire la charge d'analyse et d'améliorer la vitesse d'interrogation. Pour plus d'informations, voir la section <a href="/docs/fr/v2.5.x/filtering-templating.md">Modélisation des filtres</a>.</p>
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
<h3 id="JSON-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs JSON</h3><p>Milvus propose des opérateurs avancés pour l'interrogation des champs JSON, permettant un filtrage précis dans des structures JSON complexes :</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Vérifie si une expression JSON existe dans le champ.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Vérifie que tous les éléments de l'expression JSON sont présents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filtre les entités pour lesquelles il existe au moins un élément dans l'expression JSON.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les opérateurs JSON, voir <a href="/docs/fr/v2.5.x/json-operators.md">Opérateurs JSON</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs ARRAY</h3><p>Milvus propose des opérateurs de filtrage avancés pour les champs de type tableau, tels que <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, et <code translate="no">ARRAY_LENGTH</code>, qui permettent un contrôle fin des données de type tableau :</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filtre les entités contenant un élément spécifique.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filtre les entités où tous les éléments d'une liste sont présents.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filtre les entités contenant n'importe quel élément de la liste.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filtre en fonction de la longueur du tableau.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Pour plus de détails sur les opérateurs de tableau, voir <a href="/docs/fr/v2.5.x/array-operators.md">Opérateurs de</a> tableau.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">Opérateurs spécifiques aux champs VARCHAR</h3><p>Milvus fournit des opérateurs spécialisés pour les recherches textuelles précises sur les champs VARCHAR :</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> opérateur</h4><p>L'opérateur <code translate="no">TEXT_MATCH</code> permet une recherche précise de documents basée sur des termes d'interrogation spécifiques. Il est particulièrement utile pour les recherches filtrées qui combinent des filtres scalaires avec des recherches de similarité vectorielle. Contrairement aux recherches sémantiques, la correspondance textuelle se concentre sur les occurrences exactes des termes.</p>
<p>Milvus utilise Tantivy pour prendre en charge l'indexation inversée et la recherche textuelle basée sur les termes. Le processus implique</p>
<ol>
<li><p><strong>Analyseur</strong>: Tokenise et traite le texte d'entrée.</p></li>
<li><p><strong>Indexation</strong>: Création d'un index inversé mettant en correspondance des tokens uniques avec des documents.</p></li>
</ol>
<p>Pour plus de détails, reportez-vous à la section <a href="/docs/fr/v2.5.x/keyword-match.md">Correspondance de textes</a>.</p>
