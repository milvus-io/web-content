---
id: array-operators.md
title: Opérateurs de tableaux
summary: >-
  Milvus propose des opérateurs puissants pour interroger les champs de
  tableaux, ce qui vous permet de filtrer et de récupérer des entités en
  fonction du contenu de ces tableaux.
---
<h1 id="ARRAY-Operators" class="common-anchor-header">Opérateurs de tableaux<button data-href="#ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fournit des opérateurs puissants pour interroger les champs de type tableau, vous permettant de filtrer et de récupérer des entités en fonction du contenu des tableaux.</p>
<div class="alert note">
<p>Tous les éléments d'un tableau doivent être du même type, et les structures imbriquées au sein des tableaux sont traitées comme de simples chaînes de caractères. Par conséquent, lorsque vous travaillez avec des champs de type ARRAY, il est conseillé d'éviter les imbrications trop profondes et de veiller à ce que vos structures de données soient aussi plates que possible pour des performances optimales.</p>
</div>
<h2 id="Available-ARRAY-Operators" class="common-anchor-header">Opérateurs ARRAY disponibles<button data-href="#Available-ARRAY-Operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs ARRAY permettent d'effectuer des requêtes très précises sur les champs de type tableau dans Milvus. Ces opérateurs sont les suivants :</p>
<ul>
<li><p><a href="/docs/fr/v2.6.x/array-operators.md#ARRAYCONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: vérifie si un élément spécifique existe dans un champ de type « ARRAY ».</p></li>
<li><p><a href="/docs/fr/v2.6.x/array-operators.md#ARRAYCONTAINSALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>: garantit que tous les éléments de la liste spécifiée sont présents dans le champ de type « ARRAY ».</p></li>
<li><p><a href="/docs/fr/v2.6.x/array-operators.md#ARRAYCONTAINSANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: vérifie si l'un des éléments de la liste spécifiée est présent dans le champ de type « ARRAY ».</p></li>
<li><p><a href="/docs/fr/v2.6.x/array-operators.md#ARRAYLENGTH"><code translate="no">ARRAY_LENGTH(identifier)</code></a>: renvoie le nombre d'éléments d'un champ de tableau et peut être combiné avec des opérateurs de comparaison à des fins de filtrage.</p></li>
</ul>
<h2 id="ARRAYCONTAINS" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur ` <code translate="no">ARRAY_CONTAINS</code> ` vérifie si un élément spécifique existe dans un champ de tableau. Il est utile lorsque vous souhaitez trouver les entités dans lesquelles un élément donné est présent dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous disposiez d’un champ de type tableau <code translate="no">history_temperatures</code>, qui contient les températures minimales enregistrées pour différentes années. Pour trouver toutes les entités pour lesquelles le tableau contient la valeur <code translate="no">23</code>, vous pouvez utiliser l’expression de filtrage suivante :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités pour lesquelles le tableau <code translate="no">history_temperatures</code> contient la valeur <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL" class="anchor-icon" translate="no">
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
    </button></h2><p>L’opérateur « <code translate="no">ARRAY_CONTAINS_ALL</code> » garantit que tous les éléments de la liste spécifiée sont présents dans le champ de type tableau. Cet opérateur est utile lorsque vous souhaitez faire correspondre des entités contenant plusieurs valeurs dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Si vous souhaitez rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient à la fois « <code translate="no">23</code> » et « <code translate="no">24</code> », vous pouvez utiliser :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient les deux valeurs spécifiées.</p>
<h2 id="ARRAYCONTAINSANY" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY" class="anchor-icon" translate="no">
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
    </button></h2><p>L’opérateur ` <code translate="no">ARRAY_CONTAINS_ANY</code> ` vérifie si l’un des éléments de la liste spécifiée est présent dans le champ de type tableau. Cela s’avère utile lorsque vous souhaitez faire correspondre des entités contenant au moins l’une des valeurs spécifiées dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Pour rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » contient soit « <code translate="no">23</code> », soit « <code translate="no">24</code> », vous pouvez utiliser :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau ` <code translate="no">history_temperatures</code> ` contient au moins l’une des valeurs suivantes : ` <code translate="no">23</code> ` ou ` <code translate="no">24</code>`.</p>
<h2 id="ARRAYLENGTH" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH" class="anchor-icon" translate="no">
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
    </button></h2><p>L'<code translate="no">ARRAY_LENGTH</code> renvoie la longueur (nombre d'éléments) d'un champ de type tableau. Elle accepte exactement un paramètre : l'identifiant du champ de type tableau.</p>
<p><strong>Exemple</strong></p>
<p>Pour rechercher toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » comporte moins de 10 éléments :</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau « <code translate="no">history_temperatures</code> » comporte moins de 10 éléments.</p>
