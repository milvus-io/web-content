---
id: struct-array-operators.md
title: Opérateurs StructArray
summary: >-
  Les opérateurs StructArray filtrent les entités en évaluant des prédicats sur
  des sous-champs scalaires au sein d'un champ StructArray. Utilisez cette page
  comme référence syntaxique pour l'opérateur `element_filter`, la famille
  d'opérateurs `MATCH_*` et les prédicats au niveau des lignes sur les chemins
  StructArray.
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
    </button></h1><p>Les opérateurs StructArray filtrent les entités en évaluant des prédicats sur des sous-champs scalaires à l'intérieur d'un champ StructArray. Utilisez cette page comme référence syntaxique pour l'<code translate="no">element_filter</code>, la famille d'opérateurs « <code translate="no">MATCH_*</code> » et les prédicats au niveau des lignes sur les chemins StructArray.</p>
<p>Le filtrage StructArray comprend deux familles d’opérateurs et un ensemble de prédicats de chemin au niveau des lignes :</p>
<table>
<thead>
<tr><th>Forme du filtre</th><th>Objectif principal</th><th>Comportement du résultat</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">element_filter</code></td><td>Recherche les éléments Struct qui satisfont un prédicat scalaire.</td><td>Dans une recherche au niveau des éléments, les résultats correspondants peuvent inclure des décalages d’éléments. Dans une requête au niveau des lignes ou une recherche filtrée, la structure des résultats dépend de l’API et des champs de sortie.</td></tr>
<tr><td><code translate="no">MATCH_*</code></td><td>Sélectionnez les entités en fonction du nombre d’éléments de structure satisfaisant un prédicat scalaire.</td><td>Filtrage au niveau des lignes. Ces opérateurs ne renvoient pas d'offset d'élément en eux-mêmes.</td></tr>
<tr><td>Prédicats de chemin au niveau des lignes</td><td>Vérifier la position d’un élément, compter les éléments Struct ou vérifier les valeurs de sous-champs sur plusieurs éléments sans prédicat de type « <code translate="no">$[...]</code> ».</td><td>Filtrage au niveau des lignes. Ces prédicats ne renvoient pas d’offset d’élément.</td></tr>
</tbody>
</table>
<p>Utilisez des sous-champs scalaires dans les opérateurs StructArray. Les sous-champs vectoriels sont utilisés par les chemins de recherche vectoriels et ne constituent pas des entrées de prédicats scalaires.</p>
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
    </button></h2><p>Choisissez un opérateur en fonction de votre objectif de filtrage :</p>
<table>
<thead>
<tr><th>Objectif</th><th>Utilisation</th></tr>
</thead>
<tbody>
<tr><td>Limiter la recherche vectorielle au niveau des éléments à ceux qui répondent à des conditions scalaires.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Faire correspondre plusieurs conditions scalaires au sein d’un même élément Struct.</td><td><code translate="no">element_filter</code></td></tr>
<tr><td>Ne renvoyer que les entités pour lesquelles au moins un élément Struct satisfait un prédicat.</td><td><code translate="no">MATCH_ANY</code></td></tr>
<tr><td>Ne renvoyer que les entités dont tous les éléments Struct satisfont un prédicat.</td><td><code translate="no">MATCH_ALL</code></td></tr>
<tr><td>Ne renvoyer que les entités pour lesquelles au moins, au plus ou exactement <code translate="no">N</code> éléments Struct satisfont un prédicat.</td><td><code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> ou <code translate="no">MATCH_EXACT</code></td></tr>
<tr><td>Vérifier l’élément Struct à une position spécifique, telle que le premier bloc.</td><td>Un chemin de position tel que <code translate="no">chunks[0][section]</code></td></tr>
<tr><td>Filtrer en fonction du nombre d’éléments Struct dans une entité.</td><td><code translate="no">array_length(chunks)</code></td></tr>
<tr><td>Vérifier si un élément de structure contient une valeur de sous-champ, sans combiner de conditions sur le même élément.</td><td><code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_contains_all</code> sur un chemin de sous-champ tel que <code translate="no">chunks[section]</code></td></tr>
</tbody>
</table>
<h2 id="Example-data" class="common-anchor-header">Exemples de données<button data-href="#Example-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Les exemples d’entités partielles suivants ne montrent que les champs « <code translate="no">chunks</code> » des <strong>entités A</strong> et <strong>B</strong>. Il ne s’agit pas de charges utiles d’insertion complètes.</p>
<p><strong>Entité A</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.74</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.72</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.83</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.87</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Entité B</strong>:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.95</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.97</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
        <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Element-Filter" class="common-anchor-header">Filtre d’éléments<button data-href="#Element-Filter" class="anchor-icon" translate="no">
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
<p>À l'intérieur du prédicat, utilisez « <code translate="no">$[subfield]</code> » pour faire référence à un sous-champ scalaire de l'élément Struct actuel.</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>Les entités A et B correspondent toutes deux : les sept éléments affichés ont tous la propriété « <code translate="no">section</code> » définie sur « <code translate="no">&quot;index&quot;</code> ».</p>
<p>Lorsque plusieurs conditions sont utilisées à l’intérieur du prédicat, toutes les références ` <code translate="no">$[subfield]</code> ` s’appliquent au même élément Struct :</p>
<pre><code translate="no" class="language-text">element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)
<button class="copy-code-btn"></button></code></pre>
<p>Seule l’entité B correspond : ses trois éléments satisfont aux deux conditions.</p>
<p>Lorsque vous combinez un prédicat au niveau de l’entité avec ` <code translate="no">element_filter</code>`, placez ` <code translate="no">element_filter</code> ` à la fin de l’expression :</p>
<pre><code translate="no" class="language-text"># Correct
category == &quot;index&quot; &amp;&amp; element_filter(chunks, $[quality_score] &gt; 0.9)

# Incorrect
element_filter(chunks, $[quality_score] &gt; 0.9) &amp;&amp; category == &quot;index&quot;
<button class="copy-code-btn"></button></code></pre>
<p>L’exemple « <code translate="no">category</code> » illustre l’ordre des expressions indépendamment des données d’exemple, qui ne définissent pas « <code translate="no">category</code> ».</p>
<p><code translate="no">element_filter</code> ne peut apparaître qu’une seule fois dans une expression de filtre. N’imbriquez pas <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> à l’intérieur d’un autre <code translate="no">element_filter</code>.</p>
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
    </button></h2><p>Utilisez les opérateurs « <code translate="no">MATCH_*</code> » lorsqu’une entité doit être sélectionnée en fonction du nombre d’éléments Struct satisfaisant un prédicat. Ces opérateurs ont les significations suivantes :</p>
<table>
<thead>
<tr><th>Opérateur</th><th>Signification</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY(field, predicate)</code></td><td>Au moins un élément Struct satisfait au prédicat.</td></tr>
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
    </button></h3><p><code translate="no">MATCH_ANY</code> donne comme résultat « <code translate="no">true</code> » si au moins un élément de StructArray satisfait le prédicat.</p>
<pre><code translate="no" class="language-text">MATCH_ANY(chunks, $[section] == &quot;index&quot;)
<button class="copy-code-btn"></button></code></pre>
<p>L’entité A et l’entité B correspondent toutes deux, car chacune possède au moins un élément dont la valeur de « <code translate="no">section</code> » est définie sur « <code translate="no">&quot;index&quot;</code> ».</p>
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
    </button></h3><p><code translate="no">MATCH_ALL</code> donne <code translate="no">true</code> si chaque élément du StructArray satisfait au prédicat.</p>
<pre><code translate="no" class="language-text">MATCH_ALL(chunks, $[has_code] == true)
<button class="copy-code-btn"></button></code></pre>
<p>Les entités A et B correspondent toutes deux, car chaque élément affiché a <code translate="no">has_code</code> défini sur <code translate="no">true</code>.</p>
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
    </button></h3><p><code translate="no">MATCH_LEAST</code> donne <code translate="no">true</code> si le nombre d’éléments satisfaisant le prédicat est supérieur ou égal à <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_LEAST(chunks, $[quality_score] &gt; 0.9, threshold=2)
<button class="copy-code-btn"></button></code></pre>
<p>Seule l’entité B correspond : l’entité A ne comporte aucun élément admissible, tandis que l’entité B en comporte trois.</p>
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
    </button></h3><p><code translate="no">MATCH_MOST</code> renvoie la valeur <code translate="no">true</code> si le nombre d’éléments satisfaisant le prédicat est inférieur ou égal à <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_MOST(chunks, $[has_code] == true, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Aucune des deux entités ne correspond : l’entité A comporte quatre éléments éligibles, et l’entité B en comporte trois.</p>
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
    </button></h3><p><code translate="no">MATCH_EXACT</code> renvoie la valeur <code translate="no">true</code> si le nombre d’éléments satisfaisant le prédicat est exactement égal à <code translate="no">threshold</code>.</p>
<pre><code translate="no" class="language-text">MATCH_EXACT(chunks, $[section] == &quot;filter&quot;, threshold=1)
<button class="copy-code-btn"></button></code></pre>
<p>Aucune des deux entités ne correspond, car aucune ne possède d’élément pour lequel <code translate="no">section</code> est défini sur <code translate="no">&quot;filter&quot;</code>.</p>
<p>Pour <code translate="no">MATCH_EXACT</code>, <code translate="no">threshold</code> peut être égal à zéro ou à un entier positif.</p>
<h2 id="Row-level-predicates-on-StructArray-paths" class="common-anchor-header">Prédicats au niveau des lignes sur les chemins StructArray<button data-href="#Row-level-predicates-on-StructArray-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Outre ` <code translate="no">element_filter</code> ` et ` <code translate="no">MATCH_*</code>`, une expression de filtrage classique peut faire référence directement à un champ de StructArray ou à l’un de ses sous-champs scalaires. Ces prédicats sont évalués au niveau de l’entité et ne renvoient pas de décalages d’éléments.</p>
<h3 id="Subfield-access" class="common-anchor-header">Accès aux sous-champs<button data-href="#Subfield-access" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Access-a-Struct-element-by-position" class="common-anchor-header">Accéder à un élément Struct par sa position</h4><p>Utilisez <code translate="no">structArrayField[index][subfield]</code> pour référencer un sous-champ scalaire de l’élément Struct à une position dont l’index commence à zéro. Indiquez d’abord la position, puis le nom du sous-champ. Le chemin inversé <code translate="no">chunks[quality_score][0] &gt; 0.8</code> n’est pas valide.</p>
<p>Par exemple, pour tester le score de qualité du premier élément :</p>
<pre><code translate="no" class="language-text">chunks[0][quality_score] &gt; 0.8
<button class="copy-code-btn"></button></code></pre>
<p>Seule l’entité B correspond à cette expression.</p>
<pre><code translate="no" class="language-text"># The first chunk belongs to the &quot;index&quot; section.
chunks[0][section] == &quot;index&quot;

# The second chunk has a high quality score.
chunks[1][quality_score] &gt; 0.9

# The first chunk is on page 1, 2, or 3.
chunks[0][page] in [1, 2, 3]

# Chained range on a positional path.
0.8 &lt; chunks[0][quality_score] &lt; 0.95
<button class="copy-code-btn"></button></code></pre>
<p>Pour l’entité A et l’entité B, le prédicat de la première section correspond aux deux entités, le prédicat de score de la deuxième section ne correspond qu’à l’entité B, et la plage de score stricte ne correspond à aucune des deux. Le prédicat « <code translate="no">page</code> » est un exemple générique ; les données d’exemple ne définissent pas « <code translate="no">page</code> ».</p>
<p>Les chemins positionnels prennent en charge les prédicats de comparaison, « <code translate="no">in</code> », « <code translate="no">not in</code> » et les prédicats de plage enchaînés sur des sous-champs scalaires. Une entité ne correspond pas lorsque son champ StructArray ne comporte aucun élément à cette position.</p>
<h3 id="ARRAY-operators" class="common-anchor-header">Opérateurs ARRAY<button data-href="#ARRAY-operators" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Count-Struct-elements" class="common-anchor-header">Compter les éléments Struct</h4><p>Utilisez <code translate="no">array_length(structArrayField)</code> pour filtrer en fonction du nombre d’éléments Struct dans une entité. <code translate="no">array_length</code> sur un chemin de sous-champ, tel que <code translate="no">array_length(chunks[section])</code>, renvoie le même nombre, car chaque sous-champ contient une valeur par élément Struct.</p>
<pre><code translate="no" class="language-text"># Articles with at least three chunks.
array_length(chunks) &gt;= 3

# Articles with exactly one chunk.
array_length(chunks) == 1
<button class="copy-code-btn"></button></code></pre>
<p>Les prédicats de comptage du champ parent correspondent aux deux entités pour <code translate="no">&gt;= 3</code> et à aucune pour <code translate="no">== 1</code>. Vous pouvez également compter les valeurs sur un chemin de sous-champ :</p>
<pre><code translate="no" class="language-text">ARRAY_LENGTH(chunks[quality_score]) == 3
<button class="copy-code-btn"></button></code></pre>
<p>Seule l’entité B correspond, car son sous-champ « <code translate="no">quality_score</code> » contient trois valeurs.</p>
<h4 id="Test-subfield-values-across-elements" class="common-anchor-header">Tester les valeurs des sous-champs sur plusieurs éléments</h4><p>Par exemple, vérifiez si un score de qualité est égal à « <code translate="no">0.74</code> » :</p>
<pre><code translate="no" class="language-text">ARRAY_CONTAINS(chunks[quality_score], 0.74)
<button class="copy-code-btn"></button></code></pre>
<p>Seule l’entité A correspond.</p>
<p>Utilisez <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_contains_all</code> sur un chemin de sous-champ scalaire pour tester les valeurs de ce sous-champ sur tous les éléments Struct de l’entité. Chaque chemin de sous-champ est évalué séparément ; ainsi, des conditions portant sur différents sous-champs peuvent être satisfaites par différents éléments Struct.</p>
<pre><code translate="no" class="language-text"># At least one chunk belongs to the &quot;index&quot; section.
array_contains(chunks[section], &quot;index&quot;)

# At least one chunk belongs to the &quot;index&quot; or the &quot;search&quot; section.
array_contains_any(chunks[section], [&quot;index&quot;, &quot;search&quot;])

# The chunks cover both the &quot;index&quot; and the &quot;search&quot; sections,
# not necessarily in the same chunk.
array_contains_all(chunks[section], [&quot;index&quot;, &quot;search&quot;])
<button class="copy-code-btn"></button></code></pre>
<p>Pour les données d’exemple, les expressions <code translate="no">array_contains</code> et <code translate="no">array_contains_any</code> correspondent aux deux entités. L’expression <code translate="no">array_contains_all</code> ne correspond à aucune des deux, car aucune entité ne comporte de section <code translate="no">&quot;search&quot;</code>. Ces exemples ne montrent pas de conditions satisfaites par des éléments différents sur des sous-champs différents.</p>
<p><code translate="no">array_contains(chunks[section], &quot;index&quot;)</code> sélectionne les mêmes entités que <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>. Utilisez <code translate="no">MATCH_*</code> ou <code translate="no">element_filter</code> lorsque plusieurs conditions doivent être remplies pour un même élément Struct, car les prédicats <code translate="no">$[...]</code> sont évalués élément par élément.</p>
<h3 id="Test-whether-a-nullable-StructArray-field-is-null" class="common-anchor-header">Vérifier si un champ StructArray pouvant prendre la valeur NULL est nul<button data-href="#Test-whether-a-nullable-StructArray-field-is-null" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">IS NULL</code> ou <code translate="no">IS NOT NULL</code> sur un champ StructArray pouvant être nul pour tester la valeur du champ dans son intégralité. La valeur NULL s’applique à l’ensemble du champ StructArray ; ces prédicats n’acceptent donc que le nom du champ, et non un chemin d’accès à un sous-champ.</p>
<pre><code translate="no" class="language-text"># Entities that have no chunks value.
chunks is null

# Entities that have a chunks value.
chunks is not null
<button class="copy-code-btn"></button></code></pre>
<p>Pour connaître les conditions d’applicabilité, consultez la section « <a href="/docs/fr/structarray-limits.md#Nullable-and-dynamic-schema-limits">Limites des schémas dynamiques et pouvant contenir des valeurs NULL</a> ». L’entité A et l’entité B possèdent toutes deux des valeurs StructArray non NULL.</p>
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
    </button></h2><p>La syntaxe « <code translate="no">$[...]</code> » représente la valeur scalaire de l’élément Struct actuel. La prise en charge des prédicats dépend du type du sous-champ scalaire :</p>
<table>
<thead>
<tr><th>Type de sous-champ</th><th>Prise en charge des prédicats au niveau de l’élément</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Prédicats scalaires tels que ` <code translate="no">$[has_code] == true</code> ` ou ` <code translate="no">!($[has_code] == true)</code>`. Évitez les expressions booléennes nues telles que ` <code translate="no">$[has_code]</code>`.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td>les comparaisons, les plages enchaînées, <code translate="no">in</code>, <code translate="no">not in</code>, les expressions arithmétiques avec <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code> ou <code translate="no">%</code> suivies d’une comparaison, ainsi que les combinaisons logiques.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td>Comparaison, plage enchaînée, <code translate="no">in</code>, <code translate="no">not in</code>, expressions arithmétiques avec <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code> ou <code translate="no">/</code> suivies d’une comparaison, et combinaisons logiques. L’opérateur <code translate="no">%</code> n’est pas pris en charge pour les sous-champs à virgule flottante.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Comparaison de chaînes, plage enchaînée, <code translate="no">in</code>, <code translate="no">not in</code>, <code translate="no">like</code>, <code translate="no">=~</code>, <code translate="no">!~</code> et combinaisons logiques.</td></tr>
<tr><td>Sous-champs vectoriels</td><td>Non pris en charge en tant qu’entrées de prédicats scalaires de type « <code translate="no">$[...]</code> ». Utilisez plutôt les sous-champs vectoriels via la recherche EmbeddingList ou la recherche vectorielle au niveau des éléments.</td></tr>
</tbody>
</table>
<p>Les opérateurs logiques tels que <code translate="no">&amp;&amp;</code>, <code translate="no">||</code> et <code translate="no">!</code> s’appliquent aux expressions de prédicat. Par exemple, écrivez <code translate="no">!($[has_code] == true)</code> au lieu de <code translate="no">!$[has_code]</code>.</p>
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
<li><p>La syntaxe JSON Path, l’ <code translate="no">exists</code> sur des chemins JSON, ou les fonctions JSON telles que <code translate="no">json_contains</code>, <code translate="no">json_contains_all</code> ou <code translate="no">json_contains_any</code>.</p></li>
<li><p>Les fonctions de conteneur de tableaux telles que <code translate="no">array_contains</code>, <code translate="no">array_contains_all</code>, <code translate="no">array_contains_any</code> ou <code translate="no">array_length</code> sur <code translate="no">$[subfield]</code>. Utilisez plutôt ces fonctions sur un chemin de sous-champ tel que <code translate="no">chunks[section]</code> dans un prédicat au niveau de la ligne.</p></li>
<li><p><code translate="no">$[subfield] is null</code> ou <code translate="no">$[subfield] is not null</code>.</p></li>
<li><p>Fonctions de géométrie / SIG.</p></li>
<li><p>Expressions de horodatage (timestamptz).</p></li>
<li><p><code translate="no">random_sample(...)</code>.</p></li>
<li><p>Prédicats vectoriels au niveau des champs.</p></li>
<li><p>Appels de fonctions de filtrage génériques, sauf si la signature et le chemin d’exécution de la fonction spécifique prennent explicitement en charge les prédicats au niveau des éléments de StructArray.</p></li>
</ul>
<h2 id="Syntax-rules" class="common-anchor-header">Règles syntaxiques<button data-href="#Syntax-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>Respectez les règles syntaxiques suivantes :</p>
<ul>
<li><p><code translate="no">MATCH_*</code> les noms d’opérateurs ne sont pas sensibles à la casse.</p></li>
<li><p>N'utilisez « <code translate="no">$[subfield]</code> » qu'à l'intérieur de prédicats de type « <code translate="no">element_filter</code> » ou « <code translate="no">MATCH_*</code> ». Par exemple, « <code translate="no">array_length($[section])</code> » est rejeté.</p></li>
<li><p>N’utilisez pas « <code translate="no">$[subfield]</code> » comme chemin JSON, conteneur de tableau ou référence de champ vectoriel.</p></li>
<li><p>N’imbriquez pas <code translate="no">element_filter</code> ou <code translate="no">MATCH_*</code> à l’intérieur d’un autre opérateur StructArray.</p></li>
<li><p>Utilisez des <code translate="no">threshold=N</code> nommés pour <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> et <code translate="no">MATCH_EXACT</code>.</p></li>
<li><p>Dans les chemins positionnels, indiquez la position de l'élément avant le nom du sous-champ : <code translate="no">chunks[0][section]</code>, et non <code translate="no">chunks[section][0]</code>.</p></li>
<li><p>Utilisez <code translate="no">IS NULL</code> et <code translate="no">IS NOT NULL</code> uniquement sur le champ StructArray dans son ensemble, par exemple <code translate="no">chunks is null</code>. Ne les utilisez pas sur un chemin de sous-champ tel que <code translate="no">chunks[section]</code> ni sur <code translate="no">$[subfield]</code>.</p></li>
<li><p><code translate="no">MATCH_ANY</code> Sur un StructArray vide, cela renvoie <code translate="no">false</code>.</p></li>
<li><p><code translate="no">MATCH_ALL</code> Appliqué à un StructArray vide, il renvoie <code translate="no">true</code>.</p></li>
</ul>
<h2 id="See-also" class="common-anchor-header">Voir également<button data-href="#See-also" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour des conseils connexes, voir :</p>
<ul>
<li><p><a href="/docs/fr/filtered-search-with-structarray.md">Recherche filtrée avec StructArray</a></p></li>
<li><p><a href="/docs/fr/basic-vector-search-with-structarray.md">Recherche vectorielle de base avec StructArray</a></p></li>
<li><p><a href="/docs/fr/index-structarray-fields.md">Indexation des champs d’un StructArray</a></p></li>
<li><p><a href="/docs/fr/structarray-limits.md">Limites de StructArray</a></p></li>
</ul>
