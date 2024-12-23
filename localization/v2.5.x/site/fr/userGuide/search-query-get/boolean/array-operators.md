---
id: array-operators.md
summary: >-
  Milvus fournit des opérateurs puissants pour interroger les champs des
  tableaux, ce qui permet de filtrer et d'extraire des entités en fonction du
  contenu des tableaux. 
title: Opérateurs de tableau
---
<h1 id="ARRAY-Operators​" class="common-anchor-header">Opérateurs ARRAY<button data-href="#ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fournit des opérateurs puissants pour interroger les champs de tableau, ce qui vous permet de filtrer et d'extraire des entités en fonction du contenu des tableaux. </p>
<div class="alert note">
<p>Tous les éléments d'un tableau doivent être du même type et les structures imbriquées dans les tableaux sont traitées comme des chaînes simples. Par conséquent, lorsque vous travaillez avec des champs ARRAY, il est conseillé d'éviter une imbrication trop profonde et de veiller à ce que vos structures de données soient aussi plates que possible pour des performances optimales.</p>
</div>
<h2 id="Available-ARRAY-Operators​" class="common-anchor-header">Opérateurs ARRAY disponibles<button data-href="#Available-ARRAY-Operators​" class="anchor-icon" translate="no">
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
    </button></h2><p>Les opérateurs ARRAY permettent une interrogation fine des champs de type tableau dans Milvus. Ces opérateurs sont les suivants</p>
<ul>
<li><p><a href="#ARRAY_CONTAINS"><code translate="no">ARRAY_CONTAINS(identifier, expr)</code></a>: vérifie si un élément spécifique existe dans un champ de tableau.</p></li>
<li><p><a href="#ARRAY_CONTAINS_ALL"><code translate="no">ARRAY_CONTAINS_ALL(identifier, expr)</code></a>ARRAY : vérifie que tous les éléments de la liste spécifiée sont présents dans le champ du tableau.</p></li>
<li><p><a href="#ARRAY_CONTAINS_ANY"><code translate="no">ARRAY_CONTAINS_ANY(identifier, expr)</code></a>: vérifie si l'un des éléments de la liste spécifiée est présent dans le champ tableau.</p></li>
<li><p><a href="#ARRAY_LENGTH"><code translate="no">ARRAY_LENGTH(identifier, expr)</code></a>La fonction ARRAY_CONTAINS permet de filtrer les entités en fonction du nombre d'éléments présents dans un champ de type tableau.</p></li>
</ul>
<h2 id="ARRAYCONTAINS​" class="common-anchor-header">ARRAY_CONTAINS<button data-href="#ARRAYCONTAINS​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ARRAY_CONTAINS</code> vérifie si un élément spécifique existe dans un champ de tableau. Il est utile lorsque vous souhaitez trouver des entités dans lesquelles un élément donné est présent dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Supposons que vous disposiez d'un champ de tableau <code translate="no">history_temperatures</code>, qui contient les températures les plus basses enregistrées pour différentes années. Pour trouver toutes les entités dont le tableau contient la valeur <code translate="no">23</code>, vous pouvez utiliser l'expression de filtre suivante.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS(history_temperatures, 23)&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cette expression renverra toutes les entités dont le tableau <code translate="no">history_temperatures</code> contient la valeur <code translate="no">23</code>.</p>
<h2 id="ARRAYCONTAINSALL​" class="common-anchor-header">ARRAY_CONTAINS_ALL<button data-href="#ARRAYCONTAINSALL​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ARRAY_CONTAINS_ALL</code> garantit que tous les éléments de la liste spécifiée sont présents dans le champ du tableau. Cet opérateur est utile lorsque vous souhaitez faire correspondre des entités qui contiennent plusieurs valeurs dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Si vous souhaitez trouver toutes les entités dont le tableau <code translate="no">history_temperatures</code> contient à la fois <code translate="no">23</code> et <code translate="no">24</code>, vous pouvez utiliser.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Vous obtiendrez toutes les entités dont le tableau <code translate="no">history_temperatures</code> contient les deux valeurs spécifiées.</p>
<h2 id="ARRAYCONTAINSANY​" class="common-anchor-header">ARRAY_CONTAINS_ANY<button data-href="#ARRAYCONTAINSANY​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ARRAY_CONTAINS_ANY</code> vérifie si l'un des éléments de la liste spécifiée est présent dans le champ du tableau. Cet opérateur est utile lorsque vous souhaitez faire correspondre des entités qui contiennent au moins une des valeurs spécifiées dans le tableau.</p>
<p><strong>Exemple</strong></p>
<p>Pour trouver toutes les entités dont le tableau <code translate="no">history_temperatures</code> contient soit <code translate="no">23</code>, soit <code translate="no">24</code>, vous pouvez utiliser.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Ceci renverra toutes les entités dont le tableau <code translate="no">history_temperatures</code> contient au moins l'une des valeurs <code translate="no">23</code> ou <code translate="no">24</code>.</p>
<h2 id="ARRAYLENGTH​" class="common-anchor-header">ARRAY_LENGTH<button data-href="#ARRAYLENGTH​" class="anchor-icon" translate="no">
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
    </button></h2><p>L'opérateur <code translate="no">ARRAY_LENGTH</code> vous permet de filtrer les entités en fonction du nombre d'éléments d'un champ de tableau. Cet opérateur est utile lorsque vous devez trouver des entités dont les tableaux sont d'une certaine longueur.</p>
<p><strong>Exemple</strong></p>
<p>Si vous souhaitez trouver toutes les entités dont le tableau <code translate="no">history_temperatures</code> comporte moins de 10 éléments, vous pouvez utiliser l'opérateur.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;ARRAY_LENGTH(history_temperatures) &lt; 10&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Cela renverra toutes les entités dont le tableau <code translate="no">history_temperatures</code> comporte moins de 10 éléments.</p>
