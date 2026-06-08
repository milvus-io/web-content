---
id: struct-array-operators.md
title: Opérateurs StructArrayCompatible with Milvus 3.0.x
summary: >-
  Utilisez les filtres d'éléments et les opérateurs de famille de correspondance
  pour filtrer les sous-champs scalaires à l'intérieur des champs StructArray.
beta: Milvus 3.0.x
---
<h1 id="StructArray-Operators" class="common-anchor-header">Opérateurs StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#StructArray-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Le tableau de structures, ou StructArray, d'une entité stocke un ensemble ordonné d'éléments de structures. Chaque structure du tableau partage le même schéma prédéfini, qui comprend plusieurs vecteurs et champs scalaires. Lorsqu'un sous-champ scalaire d'une structure est indexé, vous pouvez utiliser des <strong>filtres d'éléments</strong> et des <strong>opérateurs de la famille match</strong> pour effectuer un filtrage scalaire.</p>
<p>Un filtre d'élément sélectionne les entités qui contiennent au moins une valeur dans un champ StructArray correspondant au prédicat spécifié. En revanche, les opérateurs de la famille match sont utilisés pour trouver des entités qui contiennent des nombres ou des proportions spécifiques de valeurs dans un champ StructArray correspondant au prédicat spécifié.</p>
<div class="alert note">
<p>Lorsque vous créez des prédicats sur <code translate="no">$[subField]</code>, assurez-vous que le sous-champ est indexé si vous travaillez avec des ensembles de données à grande échelle, car ces opérateurs nécessitent d'itérer à travers les éléments du tableau pour chaque entité candidate.</p>
</div>
<h2 id="Element-filter" class="common-anchor-header">Filtre d'élément<button data-href="#Element-filter" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilisez les filtres d'éléments lorsque vous devez vérifier si une entité contient les valeurs correspondant à un prédicat spécifique dans son champ StructArray.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Comme le montre l'expression du filtre d'éléments ci-dessus, le filtre d'éléments renvoie les entités qui contiennent au moins un morceau commençant par "Red" dans le sous-champ <code translate="no">text</code>. Le premier paramètre est le nom du champ StructArray, tandis que le second est le prédicat qui s'applique au sous-champ Struct.</p>
<p>Vous pouvez utiliser des opérateurs de comparaison, de plage et arithmétiques pour construire la condition, ainsi que des opérateurs logiques pour concaténer plusieurs conditions, comme indiqué dans <a href="/docs/fr/v2.6.x/basic-operators.md">Opérateurs de base</a>.</p>
<p>Toutefois, lorsque vous construisez une expression de filtre qui combine à la fois un prédicat de niveau entité et un filtre d'élément, vous devez toujours placer le filtre d'élément à la fin, comme le montre l'exemple suivant.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Match-family-operators" class="common-anchor-header">Opérateurs de famille de correspondance<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs de famille de correspondance fonctionnent également sur un champ StructArray. Au lieu de simplement vérifier si un élément existe, vous pouvez déterminer combien d'éléments (ou quelle proportion) doivent satisfaire un prédicat d'élément.</p>
<ul>
<li><p><a href="/docs/fr/v2.6.x/struct-array-operators.md#MATCHANY"><code translate="no">MATCH_ANY(identifier, predicate)</code></a>: renvoie les entités qui contiennent au moins un morceau commençant par " Red " dans le sous-champ <code translate="no">text</code>; sémantiquement, cela équivaut à <code translate="no">element_filter</code>.</p></li>
<li><p><a href="/docs/fr/v2.6.x/struct-array-operators.md#MATCHALL"><code translate="no">MATCH_ALL(identifier, predicate)</code></a>: renvoie les entités dont les sous-champs de texte de tous les morceaux commencent par "Red".</p></li>
<li><p><a href="/docs/fr/v2.6.x/struct-array-operators.md#MATCHLEAST"><code translate="no">MATCH_LEAST(identifier, predicate, k)</code></a><code translate="no">text</code>: renvoie les entités qui contiennent au moins <code translate="no">k</code> chunks qui commencent par "Red" dans le sous-champ .</p></li>
<li><p><a href="/docs/fr/v2.6.x/struct-array-operators.md#MATCHMOST"><code translate="no">MATCH_MOST(identifier, predicate, k)</code></a><code translate="no">text</code>: renvoie les entités qui contiennent au plus des morceaux <code translate="no">k</code> commençant par "Red" dans le sous-champ .</p></li>
<li><p><a href="/docs/fr/v2.6.x/struct-array-operators.md#MATCHEXACT"><code translate="no">MATCH_EXACT(identifier, predicate, k)</code></a>MATCH_ANY : renvoie les entités qui contiennent exactement <code translate="no">k</code> chunks qui commencent par "Red" dans le sous-champ <code translate="no">text</code>.</p></li>
</ul>
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
    </button></h3><p>Cet opérateur est considéré comme vrai si <strong>au moins un</strong> élément du tableau satisfait au prédicat, ce qui indique que l'équivalent structurel d'une <code translate="no">OR</code> logique s'applique à tous les éléments du tableau.</p>
<p>Les opérateurs MATCH_ANY et les filtres d'éléments sont sémantiquement identiques et vous pouvez les utiliser de manière interchangeable. Lorsque vous devez exprimer la logique <code translate="no">count(matches) &gt;= 1</code>, vous devez les utiliser.</p>
<p><strong>EXEMPLE :</strong></p>
<p>L'exemple suivant renvoie les entités dont n'importe quelle partie du document commence par "Rouge".</p>
<pre><code translate="no" class="language-python">MATCH_ANY(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Cet opérateur ne s'évalue comme vrai que si <strong>chaque</strong> élément du tableau satisfait au prédicat.</p>
<p>Lorsque vous devez exprimer la logique <code translate="no">count(matches) == total elements</code>, utilisez cet opérateur.</p>
<p><strong>EXEMPLE :</strong></p>
<pre><code translate="no" class="language-python">MATCH_ALL(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Cet opérateur est un filtre quantitatif qui renvoie une réponse positive si le nombre d'éléments satisfaisant au prédicat est <strong>supérieur ou égal à</strong> une constante spécifiée <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Lorsque vous devez exprimer la logique <code translate="no">count(matches) &gt;= k</code>, utilisez cet opérateur.</p>
<p><strong>EXEMPLE :</strong></p>
<pre><code translate="no" class="language-python">MATCH_LEAST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Cet opérateur est un filtre quantitatif qui renvoie un résultat positif si le nombre d'éléments répondant au prédicat est <strong>inférieur ou égal à</strong> une constante spécifiée <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p>Cet opérateur est particulièrement utile pour filtrer les entités qui ciblent trop un mot-clé spécifique (réduction du bruit).</p>
<p><strong>EXEMPLE :</strong></p>
<pre><code translate="no" class="language-python">MATCH_MOST(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><p>Cet opérateur est l'opérateur quantitatif le plus restrictif de la famille. Il renvoie un résultat positif si et seulement si le nombre d'éléments satisfaisant le prédicat est <strong>exactement</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">kk</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span></span></span></span> k.</p>
<p><strong>EXEMPLE :</strong></p>
<pre><code translate="no" class="language-python">MATCH_EXACT(chunks, $[text] LIKE <span class="hljs-string">&#x27;Red%&#x27;</span>, <span class="hljs-number">3</span>)
<button class="copy-code-btn"></button></code></pre>
