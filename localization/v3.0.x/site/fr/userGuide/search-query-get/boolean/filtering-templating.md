---
id: filtering-templating.md
title: Modèles d'expressions de filtrage
summary: >-
  Dans Milvus, les expressions de filtrage complexes comportant de nombreux
  éléments, en particulier celles contenant des caractères non ASCII tels que
  les caractères CJK, peuvent avoir un impact significatif sur les performances
  des requêtes. Pour remédier à cela, Milvus introduit un mécanisme de modèles
  d’expressions de filtrage conçu pour améliorer l’efficacité en réduisant le
  temps consacré à l’analyse syntaxique des expressions complexes. Cette page
  explique comment utiliser les modèles d’expressions de filtrage dans les
  opérations de recherche, de requête et de suppression.
---
<h1 id="Filter-Templating" class="common-anchor-header">Modèles d'expressions de filtrage<button data-href="#Filter-Templating" class="anchor-icon" translate="no">
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
    </button></h1><p>Dans Milvus, les expressions de filtrage complexes comportant de nombreux éléments, en particulier celles contenant des caractères non ASCII tels que les caractères CJK, peuvent considérablement affecter les performances des requêtes. Pour remédier à cela, Milvus introduit un mécanisme de modèles d’expressions de filtrage conçu pour améliorer l’efficacité en réduisant le temps consacré à l’analyse syntaxique des expressions complexes. Cette page explique comment utiliser les modèles d’expressions de filtrage dans les opérations de recherche, de requête et de suppression.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Les modèles d’expressions de filtrage vous permettent de créer des expressions de filtrage comportant des espaces réservés, qui peuvent être remplacés dynamiquement par des valeurs lors de l’exécution de la requête. Grâce à ces modèles, vous évitez d’intégrer directement de grands tableaux ou des expressions complexes dans le filtre, ce qui réduit le temps d’analyse et améliore les performances des requêtes.</p>
<p>Supposons que vous disposiez d’une expression de filtrage impliquant deux champs, <code translate="no">age</code> et <code translate="no">city</code>, et que vous souhaitiez trouver toutes les personnes âgées de plus de 25 ans et résidant soit à « 北京 » (Pékin), soit à « 上海 » (Shanghai). Au lieu d’intégrer directement les valeurs dans l’expression de filtrage, vous pouvez utiliser un modèle :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>Ici, <code translate="no">{age}</code> et <code translate="no">{city}</code> sont des espaces réservés qui seront remplacés par les valeurs réelles de <code translate="no">filter_params</code> lors de l’exécution de la requête.</p>
<p>L’utilisation de modèles d’expressions de filtrage dans Milvus présente plusieurs avantages majeurs :</p>
<ul>
<li><p><strong>Réduction du temps d’analyse</strong>: en remplaçant les expressions de filtrage volumineuses ou complexes par des espaces réservés, le système consacre moins de temps à l’analyse et au traitement du filtre.</p></li>
<li><p><strong>Amélioration des performances des requêtes</strong>: grâce à la réduction de la charge liée à l’analyse, les performances des requêtes s’améliorent, ce qui se traduit par un QPS plus élevé et des temps de réponse plus courts.</p></li>
<li><p><strong>Évolutivité</strong>: à mesure que vos ensembles de données s’étoffent et que les expressions de filtrage gagnent en complexité, les modèles garantissent que les performances restent efficaces et évolutives.</p></li>
</ul>
<h2 id="Search-Operations" class="common-anchor-header">Opérations de recherche<button data-href="#Search-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour les opérations de recherche dans Milvus, l’expression <code translate="no">filter</code> est utilisée pour définir la condition de filtrage, et le paramètre <code translate="no">filter_params</code> sert à spécifier les valeurs des espaces réservés. Le dictionnaire <code translate="no">filter_params</code> contient les valeurs dynamiques que Milvus utilisera pour remplacer les espaces réservés dans l’expression de filtrage.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.search(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    vectors[:nq],
    <span class="hljs-built_in">filter</span>=expr,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;search_list&quot;</span>: <span class="hljs-number">100</span>}},
    filter_params=filter_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, Milvus remplacera dynamiquement <code translate="no">{age}</code> par <code translate="no">25</code> et <code translate="no">{city}</code> par <code translate="no">[&quot;北京&quot;, &quot;上海&quot;]</code> lors de l’exécution de la recherche.</p>
<h2 id="Query-Operations" class="common-anchor-header">Opérations de requête<button data-href="#Query-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Le même mécanisme de modèles peut être appliqué aux opérations de requête dans Milvus. Dans la fonction <code translate="no">query</code>, vous définissez l’expression de filtrage et utilisez <code translate="no">filter_params</code> pour spécifier les valeurs à substituer.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.query(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;city&quot;</span>],
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Grâce à l’utilisation de ` <code translate="no">filter_params</code>`, Milvus gère efficacement l’insertion dynamique de valeurs, ce qui améliore la vitesse d’exécution des requêtes.</p>
<h2 id="Delete-Operations" class="common-anchor-header">Opérations de suppression<button data-href="#Delete-Operations" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez également utiliser les modèles d’expression de filtrage dans les opérations de suppression. Comme pour la recherche et la requête, l’expression ` <code translate="no">filter</code> ` définit les conditions, tandis que ` <code translate="no">filter_params</code> ` fournit les valeurs dynamiques pour les espaces réservés.</p>
<pre><code translate="no" class="language-python">expr = <span class="hljs-string">&quot;age &gt; {age} AND city IN {city}&quot;</span>
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
res = client.delete(
    <span class="hljs-string">&quot;hello_milvus&quot;</span>,
    <span class="hljs-built_in">filter</span>=expr,
    filter_params=filter_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Cette approche améliore les performances des opérations de suppression, en particulier lorsque les conditions de filtrage sont complexes.</p>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Les modèles d’expressions de filtrage constituent un outil essentiel pour optimiser les performances des requêtes dans Milvus. En utilisant des espaces réservés et le dictionnaire <code translate="no">filter_params</code>, vous pouvez réduire considérablement le temps consacré à l’analyse syntaxique d’expressions de filtrage complexes. Cela se traduit par une exécution plus rapide des requêtes et de meilleures performances globales.</p>
