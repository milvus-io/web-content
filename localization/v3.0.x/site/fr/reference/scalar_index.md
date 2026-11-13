---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Les index scalaires accélèrent le filtrage sur les champs non vectoriels. Ce
  document explique comment Milvus sélectionne les index scalaires, quels types
  d'index vous pouvez spécifier et les types de données pris en charge par
  chaque index.
title: Index scalaire
---
<h1 id="Scalar-Index" class="common-anchor-header">Index scalaire<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Les index scalaires accélèrent le filtrage sur les champs non vectoriels, tels que les catégories, les prix, les horodatages et les emplacements. Lorsqu’une expression de filtrage affine une recherche, un index scalaire permet à Milvus de localiser les entités correspondantes sans avoir à parcourir le champ.</p>
<p>Si vous ne savez pas quel index choisir, utilisez <code translate="no">AUTOINDEX</code>. Ne spécifiez manuellement un type d’index que si vous avez besoin d’un comportement particulier.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Choix d’un index scalaire<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant répertorie l’index sélectionné par défaut par Milvus lorsque vous utilisez <code translate="no">AUTOINDEX</code>, ainsi que les types d’index que vous pouvez spécifier manuellement pour chaque type de données.</p>
<table>
<thead>
<tr><th>Type de données</th><th>Valeur par défaut de AUTOINDEX</th><th>Types d’index manuels</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> avec un scalaire ou un tableau de type converti</td><td><code translate="no">HYBRID</code></td><td>Dépend de <code translate="no">json_cast_type</code>; voir <a href="#JSON-field-indexing">l’indexation des champs JSON</a>.</td></tr>
<tr><td><code translate="no">JSON</code> avec <code translate="no">json_cast_type=&quot;JSON&quot;</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> via <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Non pris en charge</td><td>Aucun</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> est une stratégie interne, et non un type que vous pouvez spécifier directement. Voir <a href="#How-AUTOINDEX-selects">Comment AUTOINDEX effectue la sélection</a>.</p>
<p>Les restrictions suivantes s’appliquent :</p>
<ul>
<li><strong>Clés primaires :</strong> l'<code translate="no">BITMAP</code> n'est pas disponible sur les champs de clé primaire.</li>
<li><strong>Tableaux :</strong> les tableaux récursifs et les tableaux contenant des éléments pouvant prendre la valeur NULL ne prennent pas en charge l’indexation scalaire, y compris l’ <code translate="no">AUTOINDEX</code>. Les tableaux ordinaires prennent en charge les éléments de type booléen, entier, à virgule flottante et VARCHAR.</li>
<li><strong>Tableaux de structures :</strong> indexez les sous-champs scalaires individuellement. Leur prise en charge peut différer de celle des tableaux ordinaires ; par exemple, un sous-champ de structure de type booléen ne prend pas en charge l’ <code translate="no">STL_SORT</code> explicite.</li>
<li><strong>TEXT :</strong> les index scalaires créés par l’utilisateur, y compris l’ <code translate="no">AUTOINDEX</code>, ne sont pas disponibles. L’analyse de texte et la recherche BM25 utilisent des mécanismes distincts.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Types d’index<button data-href="#Index-types" class="anchor-icon" translate="no">
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
<tr><th>Type d’index</th><th>Fonction</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Filtres d’égalité, d’appartenance et de plage à usage général.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Champs comportant peu de valeurs distinctes ; filtrage binaire compact.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Recherches de valeurs triées et filtrage par plage.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Égalité de chaînes de caractères et correspondance de préfixes.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Opérateurs LIKE et expressions régulières sur les chaînes de caractères par réduction du nombre de candidats.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Correspondance exacte de sous-chaînes en préfixe, suffixe et infixe.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Filtrage spatial sur les champs GEOMETRY.</td></tr>
</tbody>
</table>
<p>Pour des exemples de création, les paramètres d’index et les requêtes prises en charge, reportez-vous aux sections <a href="/docs/fr/bitmap.md">BITMAP</a>, <a href="/docs/fr/inverted.md">INVERTED</a>, <a href="/docs/fr/ngram.md">NGRAM</a>, <a href="/docs/fr/stl-sort.md">STL_SORT</a>, <a href="/docs/fr/trie.md">TRIE</a>, <a href="/docs/fr/fmindex.md">FMINDEX</a> et <a href="/docs/fr/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">Comment AUTOINDEX effectue sa sélection<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>Avec l’option « <code translate="no">AUTOINDEX</code> », Milvus sélectionne un index en fonction du type de champ, de la configuration du serveur et, pour certains champs, du nombre de valeurs distinctes (cardinalité). Les sélections par défaut sont répertoriées dans la section « <a href="#Choosing-a-scalar-index">Choix d’un index scalaire</a> ».</p>
<p>Pour la plupart des champs, l’option « <code translate="no">AUTOINDEX</code> » utilise une stratégie interne d’ <code translate="no">HYBRID</code> qui choisit un index en fonction de la cardinalité :</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> lorsqu’une compilation contient moins de 100 valeurs distinctes ;</li>
<li><strong><code translate="no">STL_SORT</code></strong> lorsqu’une build contient 100 valeurs distinctes ou plus.</li>
</ul>
<p>Les index de tableaux utilisent une politique de compatibilité distincte : leur branche à haute cardinalité utilise l’ <code translate="no">STL_SORT</code> lorsque le cluster le prend en charge, et l’ <code translate="no">INVERTED</code> dans le cas contraire. Voir « <a href="#Version-compatibility">Compatibilité des versions</a> ».</p>
<p><code translate="no">HYBRID</code> est une option interne uniquement — vous ne pouvez pas la spécifier directement. Une sélection interne peut également utiliser un index qui n’est pas disponible en tant que choix explicite pour ce champ, comme l’indexation bitmap pour les valeurs à virgule flottante.</p>
<blockquote>
<p>Ces sélections sont des valeurs par défaut. Les administrateurs peuvent les modifier via <code translate="no">scalarAutoIndex.params.build</code>. Le paramètre <code translate="no">scalarAutoIndex.enable</code> est défini par défaut sur <code translate="no">false</code>, ce qui autorise toujours l’ <code translate="no">AUTOINDEX</code> et la sélection explicites lorsque le type d’index est omis ; le définir sur <code translate="no">true</code> applique également la sélection automatique aux requêtes manuelles qui seraient par ailleurs valides.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">Indexation des champs JSON<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour indexer des valeurs JSON, spécifiez ` <code translate="no">json_cast_type</code> ` afin d’indiquer le type des valeurs à indexer. Ce paramètre est obligatoire tant pour l’indexation automatique que pour l’indexation manuelle. Utilisez ` <code translate="no">json_path</code> ` pour identifier le chemin ; s’il est omis, Milvus utilise le nom de champ fourni dans la requête.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>Valeur par défaut d’AUTOINDEX</th><th>Types d’indexation manuelle</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td><code translate="no">INVERTED</code></td><td><code translate="no">INVERTED</code></td></tr>
</tbody>
</table>
<p>Le cast <code translate="no">JSON</code> sélectionne l’indexation JSON complète plutôt qu’un index de type scalar-path, et modifie la valeur par défaut de <code translate="no">AUTOINDEX</code>, qui passe de <code translate="no">HYBRID</code> à <code translate="no">INVERTED</code>.</p>
<p>Le cast optionnel « <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> » convertit les valeurs de type chaîne de caractères pour un cast de type « <code translate="no">DOUBLE</code> ». Il ne peut pas être utilisé avec d’autres types de cast. Ni « <code translate="no">TRIE</code> » ni « <code translate="no">FMINDEX</code> » ne prennent en charge les champs JSON.</p>
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
    </button></h2><p>Les tableaux suivants indiquent les prédicats que chaque index permet d’évaluer. <strong>La prise en charge d’un index ne garantit pas que Milvus l’utilisera pour chaque requête.</strong> Milvus peut analyser les données des champs lorsque l’index n’est pas adapté à une expression ou à un motif particulier.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Comparaisons et appartenance<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>Les prédicats d’égalité et d’appartenance comprennent <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code> et <code translate="no">not in</code>. Les comparaisons de plages comprennent <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, ainsi que des expressions telles que <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Type d’index</th><th>Types de données des champs</th><th>Prédicats pris en charge par l’index</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Égalité et appartenance</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Entiers, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Égalité, appartenance et plages</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Égalité et appartenance</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Entiers, <code translate="no">VARCHAR</code></td><td>Égalité, appartenance et intervalles</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Nombres entiers, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Égalité, appartenance et plages</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Égalité, appartenance et intervalles ; l'évaluation d'un intervalle peut parcourir plusieurs chaînes indexées</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>Modèles de chaînes uniquement ; pas de recherche directe d’égalité, d’appartenance ou d’intervalle</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>Modèles de chaînes uniquement ; pas de recherche directe d'égalité, d'appartenance ou d'intervalle</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Prédicats spatiaux, énumérés ci-dessous</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Types scalaires pris en charge</td><td>Dépend de l’index sélectionné. Les sélections internes d’ <code translate="no">HYBRID</code> s utilisent les capacités de leur index bitmap, trié ou inversé.</td></tr>
</tbody>
</table>
<p>Les plages VARCHAR comparent les valeurs de chaînes de caractères plutôt que de les interpréter comme des nombres. Le tableau décrit uniquement les comparaisons par rapport à des valeurs littérales ; cela n’implique pas que les expressions arithmétiques ou les comparaisons entre deux champs bénéficient de la même accélération par l’index.</p>
<h3 id="String-patterns" class="common-anchor-header">Motifs de chaînes<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Ce tableau s'applique aux champs VARCHAR. Pour les chemins de chaîne JSON, utilisez un index et une conversion d'<code translate="no">VARCHAR</code> pris en charge par la table d' JSON ; le comportement de chaîne correspondant s'applique.</p>
<ul>
<li><strong>Oui :</strong> l’index renvoie les correspondances exactes.</li>
<li><strong>Vérification des valeurs indexées :</strong> Milvus évalue le motif par rapport aux chaînes stockées dans l’index, ce qui peut nécessiter de parcourir de nombreuses chaînes distinctes.</li>
<li><strong>Candidats :</strong> l’index réduit le nombre de correspondances possibles, puis Milvus vérifie les valeurs d’origine.</li>
<li><strong>Balayage :</strong> l’index ne répond pas au prédicat ; Milvus utilise un autre chemin éligible ou effectue un balayage du champ.</li>
</ul>
<table>
<thead>
<tr><th>Type d’index</th><th>Préfixe <code translate="no">like &quot;abc%&quot;</code></th><th>Suffixe <code translate="no">like &quot;%abc&quot;</code></th><th>Sous-chaîne <code translate="no">like &quot;%abc%&quot;</code></th><th>LIKE général <code translate="no">like &quot;a%b_c&quot;</code></th><th>Expression régulière <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Oui</td><td>Analyse</td><td>Analyse</td><td>Oui</td><td>Analyse</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Oui</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Oui</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td><td>Vérifier les valeurs indexées</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Candidats</td><td>Candidats</td><td>Candidats ; correspondance exacte avec un littéral compris dans la plage de longueur de gramme configurée</td><td>Candidats</td><td>Candidats</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Oui</td><td>Oui</td><td>Oui</td><td>Candidats</td><td>Candidats</td></tr>
</tbody>
</table>
<p>Ces entrées décrivent l’opérateur après la planification de la requête. Milvus peut simplifier un motif LIKE littéral en égalité, et une expression régulière ancrée simple en égalité, en correspondance de préfixe ou de suffixe ; par exemple, <code translate="no">name =~ &quot;^abc$&quot;</code> devient un test d’égalité et suit la table d’égalité.</p>
<p><code translate="no">INVERTED</code> Milvus traite les formes simples de suffixe et de sous-chaîne comme des balayages, même si des motifs LIKE plus complexes peuvent utiliser l’index. <code translate="no">NGRAM</code> nécessite un texte littéral d’au moins <code translate="no">min_gram</code> caractères ; le motif LIKE général exige que chaque fragment littéral non vide respecte ce minimum, et l’accélération par expression régulière dépend de l’extraction de littéraux appropriés. Sinon, Milvus effectue un balayage des données. <code translate="no">FMINDEX</code> peut également opter pour un balayage lorsqu’un motif n’offre qu’un filtrage peu utile ou que sa résolution via l’index est trop coûteuse.</p>
<p>Il s’agit de prédicats à valeur de chaîne. Les fonctions basées sur des tokens, telles que <code translate="no">TEXT_MATCH</code> et <code translate="no">PHRASE_MATCH</code>, utilisent un indexage par correspondance de texte configuré via les propriétés de champ ; le choix d’un index d’ <code translate="no">INVERTED</code> scalaire n’active pas ces fonctions.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Prédicats de type tableau, JSON et spatiaux<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Type d’index</th><th>Type de données ou conversion</th><th>Prédicats pouvant utiliser l’index</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, ou une sélection éligible de <code translate="no">AUTOINDEX</code> </td><td>Tableaux ordinaires dont les types d’éléments sont pris en charge</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Correspond aux éléments quelle que soit leur position. Les restrictions d’index et de type s’appliquent toujours.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Tableaux ordinaires de valeurs booléennes, entières ou de type VARCHAR</td><td><code translate="no">==</code> sur l’ensemble du tableau et <code translate="no">!=</code></td><td>Peut utiliser des candidats d’index suivis de vérifications des tableaux d’origine. Les tableaux à virgule flottante reviennent au balayage ; les index bitmap ne prennent pas en charge ce chemin de candidat.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code> ou une sélection éligible de type <code translate="no">AUTOINDEX</code> </td><td>Les chemins JSON convertis en <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code></td><td>Comparaisons et appartenance adaptées au type de conversion</td><td>Le chemin indexé et la conversion doivent correspondre à la requête. Les motifs de chaînes de caractères suivent le tableau ci-dessus.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Chemins JSON convertis en <code translate="no">VARCHAR</code></td><td>des motifs LIKE et regex</td><td>Utilise les mêmes règles d’éligibilité des motifs que les index VARCHAR NGRAM.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> ou une sélection éligible de type <code translate="no">AUTOINDEX</code> </td><td>Chemins JSON convertis en <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Nécessite des types d’éléments compatibles. Les opérandes de types mixtes ou de tableaux imbriqués peuvent recourir au balayage.</td></tr>
<tr><td><code translate="no">INVERTED</code> avec conversion <code translate="no">JSON</code></td><td>Index JSON complet</td><td>Comparaisons et appartenance sur les chemins scalaires pris en charge ; motifs de chaînes pris en charge ; inclusion JSON sur les chemins de tableaux pris en charge</td><td>Les chemins de chaînes de caractères suivent un comportement INVERSÉ. L'inclusion de tableaux nécessite des types d'éléments compatibles.</td></tr>
<tr><td>Index de chemins JSON et index JSON complets</td><td>Chemins JSON indexés</td><td><code translate="no">exists</code></td><td>Vérifie si le chemin existe, ce qui est différent de la vérification de sa valeur ou du fait que le champ entier soit nul.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Utilise des boîtes englobantes pour trouver des candidats, puis vérifie la relation spatiale exacte. <code translate="no">ST_ISVALID</code> n’utilise pas RTREE.</td></tr>
</tbody>
</table>
<p>La prise en charge de l’inclusion dans un tableau n’implique pas la recherche d’un élément à une position spécifique dans l’index, comme dans <code translate="no">values[0]</code>, ni la recherche de la longueur du tableau. L’égalité d’un tableau entier doit également vérifier l’ordre et la longueur, ce que l’appartenance d’un élément ne permet pas d’établir à elle seule.</p>
<p><code translate="no">IS NULL</code> et <code translate="no">IS NOT NULL</code> utilisent des informations de validité et ne nécessitent pas de type d’index scalaire particulier. Vous pouvez combiner des prédicats avec <code translate="no">and</code>, <code translate="no">or</code> et <code translate="no">not</code>; chaque partie peut utiliser son propre chemin d’exécution éligible.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilité entre versions<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>La plupart des index scalaires — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code> et <code translate="no">NGRAM</code> sur des champs scalaires ordinaires — n’ont aucune exigence de version. Les exigences ci-dessous s’appliquent uniquement aux combinaisons plus récentes : les index sur des champs de tableaux, les index JSON-path et <code translate="no">FMINDEX</code>.</p>
<p>Ces exigences utilisent les numéros de version du moteur d’indexation scalaire, un compteur de fonctionnalités interne distinct des numéros de version du logiciel Milvus.</p>
<table>
<thead>
<tr><th>Capacité</th><th>Exigence</th></tr>
</thead>
<tbody>
<tr><td>Explicite <code translate="no">FMINDEX</code></td><td>Moteur d’indexation scalaire version 5 ou plus récente</td></tr>
<tr><td><code translate="no">STL_SORT</code> s explicites sur des tableaux ordinaires</td><td>Moteur d'indexation scalaire version 3 ou plus récente, avec prise en charge du tri des tableaux activée</td></tr>
<tr><td><code translate="no">HYBRID</code> <code translate="no">STL_SORT</code> de sélection pour les tableaux ordinaires</td><td>Moteur d'indexation scalaire version 5 ou plus récente, avec prise en charge du tri des tableaux activée</td></tr>
<tr><td><code translate="no">BITMAP</code>, l'<code translate="no">STL_SORT</code> ou l'<code translate="no">HYBRID</code> sur les chemins scalaires JSON</td><td>Moteur d'indexation scalaire version 4 ou plus récente</td></tr>
<tr><td><code translate="no">STL_SORT</code> ou « <code translate="no">HYBRID</code> » sur les chemins de tableaux JSON typés</td><td>Moteur d’indexation scalaire version 3 ou plus récente, avec prise en charge du tri des tableaux activée</td></tr>
</tbody>
</table>
<p>Si une exigence de compatibilité avec les tableaux ou le JSON n’est pas satisfaite, les requêtes automatiques concernées peuvent se rabattre sur <code translate="no">INVERTED</code>, et les requêtes explicites pour des combinaisons non prises en charge échouent. Pour l’ <code translate="no">HYBRID</code> de tableaux ordinaires, la branche à haute cardinalité continue d’utiliser <code translate="no">INVERTED</code> jusqu’à ce que l’indexation triée soit disponible.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Considérations relatives aux performances<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Les performances des index dépendent de la distribution des données et des filtres utilisés par votre application. La cardinalité, la longueur des chaînes, la longueur des tableaux et le nombre d’entités correspondantes peuvent tous influer sur l’utilisation de la mémoire et la latence des requêtes. Comparez les index à l’aide de données et d’expressions de filtrage représentatives, puis mesurez conjointement l’utilisation de la mémoire, le temps de création et la latence des requêtes.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Estimation des besoins en mémoire<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>Les formules suivantes donnent une idée approximative de la mémoire requise par un index scalaire après le chargement, lorsque le mappage mémoire est désactivé. Les formules d’ <code translate="no">STL_SORT</code> s supposent des champs scalaires ordinaires sans valeurs nulles.</p>
<ul>
<li><code translate="no">N</code>: nombre d’entités.</li>
<li><code translate="no">D</code>: nombre de valeurs distinctes.</li>
<li><code translate="no">l</code>: longueur moyenne des chaînes distinctes, en <strong>octets</strong>.</li>
<li><code translate="no">S</code>: taille de l'index créé avant compression de stockage, en <strong>octets</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Type d’index</th><th>Estimation approximative de la mémoire en octets</th><th>Intuition</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> sur <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, ou <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>Environ 12 octets par entité.</td></tr>
<tr><td><code translate="no">STL_SORT</code> sur <code translate="no">INT64</code>, <code translate="no">DOUBLE</code> ou <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>Environ 20 octets par entité pour les valeurs plus importantes.</td></tr>
<tr><td><code translate="no">STL_SORT</code> sur <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Les chaînes répétées partagent le même espace de stockage ; ainsi, moins il y a de chaînes distinctes, moins la mémoire utilisée est importante.</td></tr>
<tr><td><code translate="no">BITMAP</code>, en utilisant des bitmaps denses</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Chaque valeur distincte nécessite environ un bit par entité, plus une image bitmap pour suivre les entités valides.</td></tr>
<tr><td><code translate="no">INVERTED</code> ou <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Commencez par une taille correspondant approximativement à celle de l’index construit.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Prévoyez environ le double de la taille de l’index créé.</td></tr>
</tbody>
</table>
<p>Divisez le résultat par <code translate="no">1024 * 1024</code> pour convertir les octets en <strong>MiB</strong>. Par exemple, un index « <code translate="no">STL_SORT</code> » sur un million de valeurs « <code translate="no">INT64</code> » non nulles nécessite environ <strong>19 MiB</strong> pour ses structures de données principales. Pour les champs VARCHAR où chaque chaîne est unique, l’estimation se simplifie en <code translate="no">(l + 24) * N</code>; un million de chaînes uniques d’une taille moyenne de 32 octets donne environ <strong>53 MiB</strong>.</p>
<p>La formule BITMAP décrit le stockage en bitmap dense ; l’activation du cache de décalage optionnel ajoute environ <code translate="no">8 * N</code> octets sur un système 64 bits. Pour les types <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code> et <code translate="no">FMINDEX</code>, créez un index sur des données représentatives afin d’obtenir <code translate="no">S</code> — la taille des données brutes ne remplace pas la taille de l’index créé. Pour <code translate="no">AUTOINDEX</code>, utilisez la formule correspondant à l’index effectivement sélectionné, appliquez les estimations par segment, puis additionnez-les pour l’ensemble des segments chargés et des répliques.</p>
<p>Il s’agit de chiffres de planification approximatifs, et non de limites de mémoire. Ils ne tiennent pas compte de la mémoire temporaire utilisée lors de la création, du chargement et des requêtes, et sont plus sensibles aux valeurs distinctes et à la distribution des données pour les index de chaînes de caractères et de bitmaps que pour les index numériques <code translate="no">STL_SORT</code>. Aucun pourcentage fixe de précision n’est garanti. Le mappage mémoire, les anciens formats d’index, les tableaux et les champs JSON nécessitent des mesures distinctes. Avant de dimensionner un déploiement, vérifiez l’utilisation réelle de la mémoire avec des données et des requêtes représentatives, et prévoyez une marge pour les pics d’utilisation.</p>
<h2 id="Whats-next" class="common-anchor-header">Prochaines étapes<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Pour des exemples de création et de configuration d’index, reportez-vous aux sections <a href="/docs/fr/bitmap.md">BITMAP</a>, <a href="/docs/fr/inverted.md">INVERTED</a>, <a href="/docs/fr/ngram.md">NGRAM</a>, <a href="/docs/fr/stl-sort.md">STL_SORT</a>, <a href="/docs/fr/trie.md">TRIE</a>, <a href="/docs/fr/fmindex.md">FMINDEX</a> et <a href="/docs/fr/rtree.md">RTREE</a>.</li>
<li>Pour les définitions de champs et les schémas de collection, reportez-vous à la section « <a href="/docs/fr/schema.md">Explication des schémas</a> ».</li>
</ul>
