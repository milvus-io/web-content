---
id: json-operators.md
summary: >-
  Milvus prend en charge des opérateurs avancés pour l'interrogation et le
  filtrage des champs JSON, ce qui les rend parfaits pour la gestion de données
  complexes et structurées. Ces opérateurs permettent d'effectuer des requêtes
  très efficaces dans les documents JSON et d'extraire des entités en fonction
  d'éléments, de valeurs ou de conditions spécifiques dans les champs JSON.
  Cette section vous guidera dans l'utilisation des opérateurs spécifiques à
  JSON dans Milvus, en fournissant des exemples pratiques pour illustrer leur
  fonctionnalité.
title: Opérateurs JSON
---
<h1 id="JSON-Operators​" class="common-anchor-header">Opérateurs JSON<button data-href="#JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus prend en charge des opérateurs avancés pour l'interrogation et le filtrage des champs JSON, ce qui les rend parfaits pour la gestion de données complexes et structurées. Ces opérateurs permettent d'effectuer des requêtes très efficaces dans les documents JSON, ce qui permet d'extraire des entités en fonction d'éléments, de valeurs ou de conditions spécifiques dans les champs JSON. Cette section vous guidera dans l'utilisation des opérateurs spécifiques à JSON dans Milvus, en fournissant des exemples pratiques pour illustrer leur fonctionnalité.</p>
<div class="alert note">
<p>Les champs JSON ne peuvent pas traiter les structures complexes imbriquées et traitent toutes les structures imbriquées comme des chaînes simples. Par conséquent, lorsque vous travaillez avec des champs JSON, il est conseillé d'éviter une imbrication trop profonde et de veiller à ce que vos structures de données soient aussi plates que possible pour des performances optimales.</p>
</div>
<h2 id="Available-JSON-Operators​" class="common-anchor-header">Opérateurs JSON disponibles<button data-href="#Available-JSON-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus fournit plusieurs opérateurs JSON puissants qui permettent de filtrer et d'interroger les données JSON.</p>
<ul>
<li><p><a href="#JSON_CONTAINS"><code translate="no">JSON_CONTAINS(identifier, expr)</code></a>: Filtre les entités où l'expression JSON spécifiée se trouve dans le champ.</p></li>
<li><p><a href="#JSON_CONTAINS_ALL"><code translate="no">JSON_CONTAINS_ALL(identifier, expr)</code></a>: Assure que tous les éléments de l'expression JSON spécifiée sont présents dans le champ.</p></li>
<li><p><a href="#JSON_CONTAINS_ANY"><code translate="no">JSON_CONTAINS_ANY(identifier, expr)</code></a>: Filtre les entités dont au moins un membre de l'expression JSON est présent dans le champ.</p></li>
</ul>
<p>Explorons ces opérateurs à l'aide d'exemples pour voir comment ils peuvent être appliqués dans des scénarios réels.</p>
<h2 id="JSONCONTAINS​" class="common-anchor-header">JSON_CONTAINS<button data-href="#JSONCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">json_contains</code> vérifie si un élément ou un sous-réseau spécifique existe dans un champ JSON. Il est utile lorsque vous voulez vous assurer qu'un tableau ou un objet JSON contient une valeur particulière.</p>
<p><strong>Exemple</strong></p>
<p>Imaginez que vous ayez une collection de produits, chacun avec un champ <code translate="no">tags</code> qui contient un tableau JSON de chaînes de caractères, comme <code translate="no">[&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]</code>. Vous souhaitez filtrer les produits qui ont la balise <code translate="no">&quot;sale&quot;</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dans cet exemple, Milvus renvoie tous les produits dont le champ <code translate="no">tags</code> contient l'élément <code translate="no">&quot;sale&quot;</code>.</p>
<h2 id="JSONCONTAINSALL​" class="common-anchor-header">JSON_CONTAINS_ALL<button data-href="#JSONCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">json_contains_all</code> garantit que tous les éléments d'une expression JSON spécifiée sont présents dans le champ cible. Il est particulièrement utile lorsque vous devez faire correspondre plusieurs valeurs dans un tableau JSON.</p>
<p><strong>Exemple</strong></p>
<p>Si vous voulez trouver tous les produits qui ont les étiquettes <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, et <code translate="no">&quot;new&quot;</code>, vous pouvez utiliser l'opérateur <code translate="no">json_contains_all</code>.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>, <span class="hljs-string">&quot;discount&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cette requête renverra tous les produits dont le tableau <code translate="no">tags</code> contient les trois éléments spécifiés : <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, et <code translate="no">&quot;new&quot;</code>.</p>
<h2 id="JSONCOTAINSANY​" class="common-anchor-header">JSON_COTAINS_ANY<button data-href="#JSONCOTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">json_contains_any</code> filtre les entités dont au moins un membre de l'expression JSON existe dans le champ. Cet opérateur est utile lorsque vous souhaitez faire correspondre des entités sur la base de l'une des valeurs possibles.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous souhaitiez filtrer les produits qui ont au moins une des balises <code translate="no">&quot;electronics&quot;</code>, <code translate="no">&quot;sale&quot;</code>, ou <code translate="no">&quot;new&quot;</code>. Vous pouvez utiliser l'opérateur <code translate="no">json_contains_any</code> pour y parvenir.</p>
<pre><code translate="no" class="language-python"># JSON data: {<span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;electronics&quot;</span>, <span class="hljs-string">&quot;sale&quot;</span>, <span class="hljs-string">&quot;new&quot;</span>]}​
filter = <span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dans ce cas, Milvus renverra tous les produits qui ont au moins une des balises de la liste <code translate="no">[&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;]</code>. Même si un produit n'a qu'une seule de ces balises, il sera inclus dans le résultat.</p>
