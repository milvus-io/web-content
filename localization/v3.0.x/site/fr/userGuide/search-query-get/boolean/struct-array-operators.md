---
id: struct-array-operators.md
title: Opérateurs StructArray
summary: >-
  Les opérateurs StructArray filtrent les entités en évaluant des prédicats sur
  des sous-champs scalaires au sein d'un champ StructArray. Utilisez cette page
  comme référence syntaxique pour l'opérateur `element_filter` et la famille
  d'opérateurs `MATCH_*`.
---
<h1 id="StructArray-Operators" class="common-anchor-header">Opérateurs StructArray<button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Les opérateurs StructArray filtrent les entités en évaluant des prédicats sur des sous-champs scalaires à l'intérieur d'un champ StructArray. Utilisez cette page comme référence syntaxique pour les opérateurs « <code translate="no">element_filter</code> » et la famille d'opérateurs « <code translate="no">MATCH_*</code> ».</p>
<p>Le filtrage StructArray comporte deux familles d’opérateurs :</p>
<table>
<thead>
<tr><th>Famille d’opérateurs</th><th>Objectif principal</th><th>Comportement du résultat</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Correspondance Éléments Struct qui satisfont un prédicat scalaire.</td><td>Dans une recherche au niveau des éléments, les résultats correspondants peuvent inclure des décalages d'éléments. Dans une requête au niveau des lignes ou une recherche filtrée, la structure des résultats dépend de l'API et des champs de sortie.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Sélectionne les entités en fonction du nombre d’éléments de structure satisfaisant un prédicat scalaire.</td><td>Filtrage au niveau des lignes. Ces opérateurs ne renvoient pas d’offset d’élément en eux-mêmes.</td></tr>
</tbody>
</table>
<p>Utilisez des sous-champs scalaires dans les opérateurs StructArray. Les sous-champs vectoriels sont utilisés par les chemins de recherche vectoriels et ne constituent pas des entrées de prédicat scalaire.</p>
<h2 id="When-to-use-which-operator" class="common-anchor-header">Quand utiliser quel opérateur<button data-href="#When-to-use-which-operator" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>Objectif</th><th>Utilisation</th></tr>
</thead>
<tbody>
<tr><td>Limiter la recherche vectorielle au niveau des éléments à ceux qui répondent à des conditions scalaires.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Répondre à plusieurs conditions scalaires au sein d’un même élément Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Renvoyer uniquement les entités pour lesquelles au moins un élément Struct satisfait un prédicat.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Ne renvoyer que les entités dont tous les éléments Struct satisfont un prédicat.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Ne renvoyer que les entités pour lesquelles au moins, au plus ou exactement <code translate="no">N</code> éléments Struct satisfont un prédicat.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code></td></tr>
</tbody>
</table>
<h2 id="Element-Filter" class="common-anchor-header">Filtre d'élément<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez « <code translate="no">element_filter(structArrayField, predicate)</code> » pour faire correspondre des éléments Struct dans un champ StructArray.</p>
<p>À l’intérieur du prédicat, utilisez « <code translate="no">$[subfield]</code> » pour faire référence à un sous-champ scalaire de l’élément Struct actuel.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque plusieurs conditions sont utilisées au sein du prédicat, toutes les références à « <code translate="no">$[subfield]</code> » s’appliquent au même élément de structure :</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; $[quality_score] &gt; <span class="hljs-number">0.9</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Lorsque vous combinez un prédicat au niveau de l’entité avec ` <code translate="no">element_filter</code>`, placez ` <code translate="no">element_filter</code> ` à la fin de l’expression :</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Correct</span>
category == <span class="hljs-string">&quot;index&quot;</span> &amp;&amp; element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>)

<span class="hljs-comment"># Incorrect</span>
element_filter(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>) &amp;&amp; category == <span class="hljs-string">&quot;index&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">element_filter</code> ne peut apparaître qu’une seule fois dans une expression de filtrage. N’imbriquez pas <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> à l’intérieur d’un autre <code translate="no">element_filter</code>.</p>
<h2 id="Match-Family-Operators" class="common-anchor-header">Opérateurs de famille de correspondance<button data-href="#Match-Family-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez les opérateurs « <code translate="no">MATCH_*</code> » lorsqu’une entité doit être sélectionnée en fonction du nombre d’éléments Struct satisfaisant un prédicat.</p>
<table>
<thead>
<tr><th>Opérateur</th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Au moins un élément Struct satisfait le prédicat.</td></tr>
<tr><td><code translate="no">MATCH_ALL(field, predicate)</code></td><td>Tous les éléments Struct satisfont au prédicat.</td></tr>
<tr><td><code translate="no">MATCH_LEAST(field, predicate, threshold=N)</code></td><td>Au moins <code translate="no">N</code> éléments Struct satisfont le prédicat.</td></tr>
<tr><td><code translate="no">MATCH_MOST(field, predicate, threshold=N)</code></td><td>Au plus <code translate="no">N</code> éléments de la structure satisfont le prédicat.</td></tr>
<tr><td><code translate="no">MATCH_EXACT(field, predicate, threshold=N)</code></td><td><code translate="no">N</code> éléments de Struct satisfont exactement le prédicat.</td></tr>
</tbody>
</table>
<p><code translate="no">MATCH_ANY</code> et « <code translate="no">element_filter</code> » permettent tous deux d’indiquer qu’au moins un élément Struct satisfait un prédicat. Utilisez « <code translate="no">MATCH_ANY</code> » lorsque vous avez uniquement besoin d’un filtrage au niveau des lignes. Utilisez « <code translate="no">element_filter</code> » lorsque vous avez besoin de contraintes au niveau des éléments, par exemple pour filtrer les éléments Struct participant à une recherche vectorielle au niveau des éléments.</p>
<h3 id="MATCHANY" class="common-anchor-header">MATCH_ANY<button data-href="#MATCHANY" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ANY</code> donne comme résultat « <code translate="no">true</code> » si au moins un élément de la StructArray satisfait le prédicat.</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[section] == <span class="hljs-string">&quot;index&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour un StructArray vide, <code translate="no">MATCH_ANY</code> renvoie <code translate="no">false</code>.</p>
<h3 id="MATCHALL" class="common-anchor-header">MATCH_ALL<button data-href="#MATCHALL" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_ALL</code> renvoie « <code translate="no">true</code> » si tous les éléments de StructArray satisfont au prédicat.</p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Pour un StructArray vide, <code translate="no">MATCH_ALL</code> renvoie <code translate="no">true</code>.</p>
<h3 id="MATCHLEAST" class="common-anchor-header">MATCH_LEAST<button data-href="#MATCHLEAST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> renvoie <code translate="no">true</code> si le nombre d’éléments satisfaisant le prédicat est supérieur ou égal à <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[quality_score] &gt; <span class="hljs-number">0.9</span>, threshold=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour <code translate="no">MATCH_LEAST</code>, <code translate="no">threshold</code> doit être un entier positif.</p>
<h3 id="MATCHMOST" class="common-anchor-header">MATCH_MOST<button data-href="#MATCHMOST" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_MOST</code> renvoie la valeur « <code translate="no">true</code> » si le nombre d’éléments satisfaisant le prédicat est inférieur ou égal à « <code translate="no">threshold</code> ».</p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[has_code] == true, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour <code translate="no">MATCH_MOST</code>, <code translate="no">threshold</code> peut être égal à zéro ou à un entier positif.</p>
<h3 id="MATCHEXACT" class="common-anchor-header">MATCH_EXACT<button data-href="#MATCHEXACT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> renvoie la valeur « <code translate="no">true</code> » si le nombre d’éléments satisfaisant le prédicat est exactement égal à « <code translate="no">threshold</code> ».</p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[section] == <span class="hljs-string">&quot;filter&quot;</span>, threshold=<span class="hljs-number">1</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Pour <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> peut être égal à zéro ou à un entier positif.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Prédicats pris en charge<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>La syntaxe <code translate="no">$[...]</code> représente la valeur scalaire de l’élément Struct actuel. La prise en charge des prédicats dépend du type de sous-champ scalaire.</p>
<table>
<thead>
<tr><th>Type de sous-champ</th><th>Prise en charge des prédicats au niveau de l’élément</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Prédicats scalaires tels que <code translate="no">$[has_code] == true</code> ou <code translate="no">!($[has_code] == true)</code>. Évitez les expressions booléennes nues telles que <code translate="no">$[has_code]</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>les comparaisons, les plages enchaînées, <code translate="no">in</code>, <code translate="no">not in</code>, les expressions arithmétiques avec <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> ou <code translate="no">%</code> suivies d’une comparaison, ainsi que les combinaisons logiques.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparaison, plage enchaînée, <code translate="no">in</code>, <code translate="no">not in</code>, expressions arithmétiques avec <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> ou <code translate="no">/</code> suivies d’une comparaison, et combinaisons logiques. L’opérateur <code translate="no">%</code> n’est pas pris en charge pour les sous-champs à virgule flottante.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Comparaison de chaînes, plage enchaînée, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> et combinaisons logiques.</td></tr>
<tr><td>Sous-champs vectoriels</td><td>Non pris en charge en tant qu’entrées de prédicats scalaires de type « <code translate="no">$[...]</code> ». Utilisez plutôt les sous-champs vectoriels via la recherche EmbeddingList ou la recherche vectorielle au niveau des éléments.</td></tr>
</tbody>
</table>
<p>Les opérateurs logiques tels que « <code translate="no">&amp;&amp;</code> », « <code translate="no">\|\|</code> » et « <code translate="no">!</code> » s’appliquent aux expressions de prédicat. Par exemple, écrivez « <code translate="no">!($[has_code] == true)</code> » au lieu de « <code translate="no">!$[has_code]</code> ».</p>
<h2 id="Unsupported-predicates" class="common-anchor-header">Prédicats non pris en charge<button data-href="#Unsupported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>Les prédicats de type « <code translate="no">$[...]</code> » au niveau des éléments ne prennent pas en charge :</p>
<ul>
<li><p>Les fonctions de correspondance de texte, telles que <code translate="no">text_match(field, &quot;...&quot;)</code> ou <code translate="no">phrase_match(field, &quot;...&quot;)</code>.</p></li>
<li><p>La syntaxe JSON Path, les opérations de type « <code translate="no">exists</code> » sur des chemins JSON, ou les fonctions JSON telles que « <code translate="no">json_contains</code> », « <code translate="no">json_contains_all</code> » ou « <code translate="no">json_contains_any</code> ».</p></li>
<li><p>Les fonctions de conteneurs de tableaux telles que <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_length</code>.</p></li>
<li><p><code translate="no">$[subfield] is null</code> ou <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Fonctions de géométrie / SIG.</p></li>
<li><p>Expressions de type timestamptz.</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Prédicats vectoriels au niveau des champs.</p></li>
<li><p>Appels de fonctions de filtrage génériques, sauf si la signature et le chemin d’exécution de la fonction spécifique prennent explicitement en charge les prédicats au niveau des éléments de StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Règles de syntaxe<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
<li><p><code translate="no">MATCH_*</code> Les noms d’opérateurs ne sont pas sensibles à la casse.</p></li>
<li><p>N’utilisez « <code translate="no">$[subfield]</code> » qu’à l’intérieur de prédicats de type « <code translate="no">element_filter</code> » ou « <code translate="no">MATCH_*</code> ».</p></li>
<li><p>N’utilisez pas <code translate="no">$[subfield]</code> comme chemin JSON, conteneur de tableau ou référence de champ vectoriel.</p></li>
<li><p>N’imbriquez pas <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> à l’intérieur d’un autre opérateur StructArray.</p></li>
<li><p>Utilisez des <code translate="no">threshold=N</code> nommés pour <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> et <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> sur un StructArray vide renvoie <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> Appliqué à un StructArray vide, il renvoie <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Voir aussi<button data-href="#See-also" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a></p></li>
<li><p><a href="/docs/fr/basic-vector-search-with-structarray.md">Recherche vectorielle de base avec StructArray</a></p></li>
<li><p><a href="/docs/fr/index-structarray-fields.md">Indexer les champs d'un StructArray</a></p></li>
<li><p><a href="/docs/fr/structarray-limits.md">Limites de StructArray</a></p></li>
</ul>
