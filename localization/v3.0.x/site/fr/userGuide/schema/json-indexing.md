---
id: json-indexing.md
title: Indexation JSON
summary: >-
  Les champs JSON offrent un moyen flexible de stocker des métadonnées
  structurées dans Milvus. Sans indexation, les requêtes portant sur des champs
  JSON nécessitent un balayage complet de la collection, ce qui ralentit le
  système à mesure que votre ensemble de données s'étoffe. L'indexation JSON
  crée des index sur des chemins spécifiques au sein de vos données JSON, ce qui
  permet d'accélérer l'exécution des requêtes de comparaison d'égalité, de plage
  et d'autres requêtes de filtrage portant sur ces chemins.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Indexation JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Les champs JSON offrent un moyen flexible de stocker des métadonnées structurées dans Milvus. Sans indexation, les requêtes sur les champs JSON nécessitent un balayage complet de la collection, ce qui ralentit les opérations à mesure que votre ensemble de données s'étoffe. L'indexation JSON crée un index sur un chemin spécifique au sein de vos données JSON afin que les requêtes d'égalité, de plage et autres requêtes de filtrage sur ce chemin s'exécutent rapidement.</p>
<p>L'indexation JSON est idéale pour :</p>
<ul>
<li><p>Les schémas structurés avec des clés cohérentes et connues</p></li>
<li><p>Les requêtes d’égalité, d’ <code translate="no">IN</code>, de plage et de correspondance de texte sur des chemins JSON spécifiques</p></li>
<li><p>Les scénarios dans lesquels vous avez besoin d’un contrôle précis sur les clés à indexer</p></li>
</ul>
<p>Pour les documents JSON complexes présentant des modèles de requêtes variés, envisagez <a href="/docs/fr/json-shredding.md">le « JSON Shredding</a> » comme alternative.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Présentation des types d’index<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus propose quatre types d’index pour les chemins JSON. Chacun est adapté à un modèle de requête différent.</p>
<p>Avant de choisir un type d’index, identifiez le <strong>type de conversion (cast)</strong> du chemin JSON. Le type de conversion détermine la manière dont Milvus interprète la valeur à ce chemin et les types d’index disponibles.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Comprendre les types de conversion<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> Il s'agit du type de données utilisé pour interpréter et indexer la valeur située à l'adresse <code translate="no">json_path</code>. Il diffère du type de schéma du champ : le champ reste un champ de type « <code translate="no">JSON</code> », mais chaque chemin indexé est traité comme un type spécifique (scalaire, tableau ou objet JSON).</p>
<p>Choisissez le type de conversion qui correspond aux valeurs stockées à ce chemin. Pour vérifier si un type de conversion est compatible avec un type d’index spécifique, consultez <a href="/docs/fr/json-indexing.md#compatibility-reference">la référence de compatibilité</a>.</p>
<table>
<thead>
<tr><th>Type de conversion</th><th>À utiliser lorsque la valeur du chemin est…</th><th>Exemple de valeur</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Une valeur booléenne</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Une valeur numérique</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Une valeur de type chaîne</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Un tableau de valeurs booléennes</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Un tableau de valeurs numériques</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Un tableau de chaînes de caractères</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un objet JSON entier ou un sous-objet. L'indexation d'objets JSON entiers est obsolète à partir de Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Si les valeurs situées au même chemin ont des types incompatibles, seules les valeurs correspondant au type de conversion sont indexées. Par exemple, si <code translate="no">metadata[&quot;price&quot;]</code> contient à la fois <code translate="no">99.99</code> et <code translate="no">&quot;99.99&quot;</code>, un index de type <code translate="no">DOUBLE</code> inclut la valeur numérique et ignore la valeur de type chaîne de caractères. Pour convertir des valeurs de type chaîne de caractères lors de l’indexation, utilisez <code translate="no">json_cast_function</code>; voir <a href="/docs/fr/json-indexing.md#example-5-convert-data-type-at-index-time">Exemple 5 : Conversion du type de données au moment de l’indexation</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Choisissez un type d’index<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Après avoir choisi un type de conversion, sélectionnez le type d’index en fonction de votre modèle de requête.</p>
<table>
<thead>
<tr><th>Modèle de requête</th><th>Type d’index recommandé</th><th>Exigences relatives au type de conversion</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td>Filtres mixtes d’égalité et de plage sur des valeurs scalaires</td><td><code translate="no">AUTOINDEX</code></td><td>Utilisez <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code>.</td><td>Laissez Milvus choisir la structure interne de l'index en fonction de la cardinalité des valeurs.</td></tr>
<tr><td>Filtres sur les valeurs contenues dans des tableaux JSON</td><td><code translate="no">INVERTED</code></td><td>Utilisez <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code>.</td><td>Obligatoire pour tous les types de conversion de tableaux.</td></tr>
<tr><td>Indexation d’objets entiers ou de sous-objets (obsolète)</td><td><code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code> (à des fins de compatibilité uniquement)</td><td>Utilisez <code translate="no">JSON</code>.</td><td>Prise en charge à des fins de compatibilité. Pour les nouvelles charges de travail, créez des index spécifiques au chemin d’accès ou envisagez <a href="/docs/fr/json-shredding.md">le « JSON Shredding</a> ».</td></tr>
<tr><td>Filtres de plage sur des nombres ou des chaînes triables</td><td><code translate="no">STL_SORT</code> ou <code translate="no">AUTOINDEX</code></td><td>Utilisez <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code>.</td><td>Utilisez <code translate="no">STL_SORT</code> pour forcer une disposition triée ; utilisez <code translate="no">AUTOINDEX</code> lorsque vous souhaitez une sélection automatique.</td></tr>
<tr><td>Filtres d’égalité ou d’ <code translate="no">IN</code> sur des valeurs à faible cardinalité</td><td><code translate="no">BITMAP</code> ou <code translate="no">AUTOINDEX</code></td><td>Utilisez <code translate="no">BOOL</code> ou <code translate="no">VARCHAR</code>.</td><td>Utilisez <code translate="no">BITMAP</code> pour forcer une disposition de type bitmap. Pour les valeurs numériques, utilisez <code translate="no">AUTOINDEX</code> ou <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>En cas de doute, commencez par <code translate="no">AUTOINDEX</code> pour les chemins scalaires. Utilisez explicitement <code translate="no">INVERTED</code> pour les types de conversion de tableaux et les requêtes de correspondance de texte. L’indexation JSON d’objets entiers avec <code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code> reste prise en charge, mais elle est dépréciée à partir de Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> dépend de l’ <code translate="no">json_cast_type</code> que vous spécifiez. Dans Milvus 3.0, <code translate="no">AUTOINDEX</code> ne se résout plus systématiquement en <code translate="no">INVERTED</code> pour les index de chemins JSON.</p>
<table>
<thead>
<tr><th>Composition de type</th><th><code translate="no">AUTOINDEX</code> comportement</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Choisis entre <code translate="no">BITMAP</code> et <code translate="no">STL_SORT</code> en fonction de la cardinalité de la valeur.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Non pris en charge. Utilisez explicitement « <code translate="no">INVERTED</code> » comme type d’index.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Utilise ` <code translate="no">INVERTED</code> ` pour l'indexation d'objets entiers ou de sous-objets. Ce mode est obsolète à partir de Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Pour les types de conversion scalaire (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> et <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> est le point de départ recommandé lorsque vous souhaitez que Milvus choisisse la structure d’index interne. Lors de la création de l’index, Milvus mesure la <strong>cardinalité</strong> des valeurs au chemin JSON. La cardinalité correspond au nombre de valeurs distinctes à ce chemin.</p>
<p>En fonction de cette cardinalité, Milvus choisit l’une des deux structures internes suivantes :</p>
<ul>
<li><p><strong>Faible cardinalité</strong>: les valeurs se répètent souvent, comme <code translate="no">metadata[&quot;in_stock&quot;]</code> avec <code translate="no">true</code> et <code translate="no">false</code>, ou <code translate="no">metadata[&quot;status&quot;]</code> avec un petit ensemble de chaînes de statut. Milvus construit en interne un index de type « <code translate="no">BITMAP</code> » pour des filtres d’égalité et d’ <code translate="no">IN</code> s rapides.</p></li>
<li><p><strong>Cardinalité élevée</strong>: la plupart des valeurs sont distinctes, telles que <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> ou <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus crée en interne un index <code translate="no">STL_SORT</code> pour accélérer les filtres de plage tels que <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> et <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>Le seuil par défaut pour « <code translate="no">BITMAP</code> » par rapport à «<code translate="no">STL_SORT</code> » est de <strong>100 valeurs distinctes</strong>. Vous pouvez ajuster ce seuil à l’aide de ` <code translate="no">bitmap_cardinality_limit</code>` ; voir « <a href="/docs/fr/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">Comment ajuster le seuil BITMAP-vs-STL_SORT d’AUTOINDEX ?</a> ».</p>
<div class="alert note">
<p><strong>Changement de comportement dans Milvus 3.0</strong>. Dans les versions antérieures, l’ <code translate="no">AUTOINDEX</code> sur des chemins JSON créait toujours un index <code translate="no">INVERTED</code>. À partir de Milvus 3.0, <code translate="no">AUTOINDEX</code> choisit entre <code translate="no">BITMAP</code> et <code translate="no">STL_SORT</code> pour les types de conversion scalaires. Pour <code translate="no">JSON</code>, <code translate="no">AUTOINDEX</code> utilise toujours <code translate="no">INVERTED</code>, bien que l’indexation JSON d’objets entiers soit dépréciée. Pour les types de conversion de tableaux et les requêtes de correspondance de texte, spécifiez explicitement <code translate="no">INVERTED</code>.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> est la solution la plus adaptée lorsque vous avez besoin de requêtes de correspondance de texte ou d’indexation de tableaux. Elle reste également disponible pour l’indexation JSON d’objets entiers, bien que celle-ci soit obsolète.</p>
<p>Spécifiez explicitement <code translate="no">INVERTED</code> lorsque :</p>
<ul>
<li><p>Vous devez indexer des valeurs à l’intérieur de tableaux JSON.</p></li>
<li><p>Vous gérez un index existant sur un objet JSON entier ou un sous-objet et souhaitez rendre explicite le comportement « <code translate="no">INVERTED</code> ».</p></li>
<li><p>Vous souhaitez disposer d’un type d’index unique prenant en charge les requêtes d’égalité, d’ <code translate="no">IN</code>, de plage, de correspondance de texte et de tableau. La prise en charge de l’objet entier reste disponible à des fins de compatibilité, au prix d’une taille d’index plus importante.</p></li>
</ul>
<p>Pour les index existants sur des objets JSON entiers (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), vous pouvez continuer à utiliser soit <code translate="no">INVERTED</code>, soit <code translate="no">AUTOINDEX</code>. <code translate="no">AUTOINDEX</code> utilise <code translate="no">INVERTED</code> pour ce type de conversion. L’indexation JSON d’objets entiers n’est plus recommandée pour les nouvelles charges de travail.</p>
<p>Pour plus de détails, consultez la section <a href="/docs/fr/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> stocke les valeurs d’un chemin JSON dans un ordre trié. Il est optimisé pour les filtres de plage sur des valeurs numériques ou des chaînes de caractères triables.</p>
<p><code translate="no">STL_SORT</code> Ne prend en charge que les types de conversion <code translate="no">DOUBLE</code> et <code translate="no">VARCHAR</code>. À utiliser lorsque :</p>
<ul>
<li><p>Vos filtres comparent des valeurs de type ` <code translate="no">&gt;</code>`, ` <code translate="no">&lt;</code>`, ` <code translate="no">&gt;=</code>` ou ` <code translate="no">&lt;=</code>`.</p></li>
<li><p>Les valeurs indexées présentent une cardinalité élevée, comme les prix, les horodatages, les identifiants ou les codes triables.</p></li>
<li><p>Vous souhaitez forcer une mise en page triée au lieu de laisser <code translate="no">AUTOINDEX</code> choisir.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> Ne prend pas en charge les types de conversion <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code> ou <code translate="no">JSON</code>. Utilisez <code translate="no">INVERTED</code> pour les tableaux. Les index d’objets entiers existants peuvent continuer à utiliser <code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code>, mais l’indexation JSON d’objets entiers est obsolète.</p>
<p>Pour plus de détails, reportez-vous à <a href="/docs/fr/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> crée un bitmap compact pour chaque valeur distincte d’un chemin JSON. Il est optimisé pour les filtres d’égalité et de type « <code translate="no">IN</code> » sur les valeurs qui se répètent souvent.</p>
<p><code translate="no">BITMAP</code> Ne prend en charge que les types de conversion <code translate="no">BOOL</code> et <code translate="no">VARCHAR</code>. À utiliser lorsque :</p>
<ul>
<li><p>Vos filtres utilisent des types de conversion « <code translate="no">==</code> » ou « <code translate="no">IN</code> ».</p></li>
<li><p>Les valeurs indexées ont une faible cardinalité, comme les valeurs booléennes, les valeurs d’état ou un petit ensemble de catégories.</p></li>
<li><p>Vous souhaitez forcer une disposition en bitmap plutôt que de laisser <code translate="no">AUTOINDEX</code> choisir.</p></li>
</ul>
<p><code translate="no">BITMAP</code> ne prend pas en charge les types de conversion <code translate="no">DOUBLE</code>, <code translate="no">ARRAY_*</code> ou <code translate="no">JSON</code>. Pour les valeurs numériques, utilisez plutôt <code translate="no">AUTOINDEX</code>, <code translate="no">STL_SORT</code> ou <code translate="no">INVERTED</code>.</p>
<p>Pour plus de détails, reportez-vous à la section <a href="/docs/fr/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Référence de compatibilité<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez le tableau suivant comme référence rapide pour les combinaisons d'<code translate="no">(cast type, index type)</code> s prises en charge.</p>
<table>
<thead>
<tr><th>Type de conversion</th><th>Description</th><th>Exemple de valeur</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Valeurs booléennes (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Oui</td><td>Oui</td><td>Non</td><td>Oui</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Valeurs numériques (entiers ou flottants).</td><td><code translate="no">99.99</code></td><td>Oui</td><td>Oui</td><td>Oui</td><td>Non</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Valeurs de type chaîne.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Oui</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Tableau de valeurs booléennes.</td><td><code translate="no">[true, false]</code></td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Tableau de nombres.</td><td><code translate="no">[1.2, 3.14]</code></td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Tableau de chaînes de caractères.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>Non</td><td>Oui</td><td>Non</td><td>Non</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Un objet JSON complet ou un sous-objet avec inférence de type et aplatissement automatiques. Obsolète à partir de Milvus 3.0.0.</td><td>tout objet imbriqué</td><td>Oui (obsolète)</td><td>Oui (obsolète)</td><td>Non</td><td>Non</td></tr>
</tbody>
</table>
<p>Pour les cellules marquées « <code translate="no">No</code> », Milvus rejette la requête au moment de la création de l’index. Pour les types de conversion de tableaux, utilisez explicitement « <code translate="no">INVERTED</code> » (la fonction «<code translate="no">AUTOINDEX</code> » ne prend pas en charge les tableaux).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Créer un index JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette section explique comment indexer différentes formes de données JSON. Tous les exemples utilisent la structure d'exemple ci-dessous et partent du principe que vous disposez déjà d'une collection comprenant un champ de type « <code translate="no">JSON</code> » nommé « <code translate="no">metadata</code> ».</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Exemple de structure JSON<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Configuration de base<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Les exemples ci-dessous partent du principe que vous disposez d’un <code translate="no">MilvusClient</code> nommé <code translate="no">client</code> connecté à votre déploiement Milvus, ainsi que d’une collection comprenant déjà un champ <code translate="no">JSON</code> nommé <code translate="no">metadata</code>. Si vous devez les configurer à partir de zéro, développez le bloc ci-dessous.</p>
<p><details></p>
<p><summary>Se connecter et créer une collection d’exemple</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Préparez un objet `index-params` pour collecter les définitions d’index ajoutées dans les exemples ci-dessous :</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Chaque exemple ci-dessous présente un appel ` <code translate="no">index_params.add_index(...)</code> `. Choisissez ceux qui correspondent à vos données et appelez-les sur le même objet ` <code translate="no">index_params</code> `. Appliquez ensuite l’ensemble dans un seul appel ` <code translate="no">client.create_index(...)</code> ` à la fin. Pour plus de détails, consultez la section « <a href="/docs/fr/json-indexing.md#apply-the-index">Appliquer l’index</a> ».</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Exemple 1 : indexer une clé de niveau supérieur avec AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexez le champ « <code translate="no">category</code> » pour permettre un filtrage rapide par catégorie de produit. Avec « <code translate="no">AUTOINDEX</code> », Milvus choisit « <code translate="no">BITMAP</code> » ou « <code translate="no">STL_SORT</code> » en fonction du nombre de catégories distinctes présentes dans vos données.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Exemple 2 : indexer une clé imbriquée<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexez le champ « <code translate="no">email</code> », fortement imbriqué, pour permettre la recherche des contacts des fournisseurs. Le paramètre « <code translate="no">json_path</code> » accepte toute profondeur de notation entre crochets.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Exemple 3 : requêtes sur des plages avec STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque vous savez que vos requêtes sur un chemin seront principalement constituées de comparaisons de plages (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), sélectionnez directement l’option « <code translate="no">STL_SORT</code> ». Cela permet de contourner la mesure de cardinalité et de créer immédiatement la structure triée.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Après l’indexation, les requêtes par plage telles que <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> utilisent la recherche binaire au lieu d’un balayage complet.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Exemple 4 : requêtes d’égalité avec BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour les clés à faible cardinalité, telles que les codes d’état, les valeurs booléennes ou les chaînes de type énumération, choisissez directement <code translate="no">BITMAP</code>. Les requêtes d’égalité et de type « <code translate="no">IN</code> » deviennent des opérations bitmap.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> Cette option convient également parfaitement aux champs tels qu’une colonne de type « <code translate="no">status</code> » ne comportant qu’une poignée de valeurs de chaîne distinctes.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Exemple 5 : Conversion du type de données lors de la création de l’index<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque des données numériques sont stockées par erreur sous forme de chaînes de caractères, utilisez « <code translate="no">STRING_TO_DOUBLE</code> » pour convertir la valeur en nombre lors de la création de l’index.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Si la conversion échoue pour une ligne (par exemple, une chaîne non numérique telle que « <code translate="no">&quot;invalid&quot;</code> »), cette ligne est ignorée lors de l’indexation.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Exemple 6 : Indexation d’objets JSON entiers<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>À partir de Milvus 3.0.0, l’indexation d’objets JSON entiers (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), également appelée indexation JSON plate, est dépréciée. Les index existants et les nouvelles demandes de création d’index restent pris en charge à des fins de compatibilité, mais ce mode n’est plus recommandé pour les nouvelles charges de travail. Créez des index de chemin JSON pour les chemins de requête connus. Pour les documents JSON complexes ou évolutifs présentant des modèles de requêtes variés, envisagez <a href="/docs/fr/json-shredding.md">le « JSON Shredding</a> ». Le « JSON Shredding » n’accélère pas les valeurs contenues dans les tableaux ; utilisez des index de chemin JSON avec des types de conversion de tableau pour ces requêtes.</p>
</div>
<p>Pour les charges de travail existantes compatibles, le paramètre « <code translate="no">json_cast_type=&quot;JSON&quot;</code> » indexe la structure complète au chemin donné. Milvus aplatit les objets imbriqués en chemins et déduit automatiquement le type de chaque valeur. Toutes les clés situées sous ce chemin deviennent consultables.</p>
<p><code translate="no">AUTOINDEX</code> utilise de manière transparente l’ <code translate="no">INVERTED</code> pour le type de conversion « <code translate="no">JSON</code> », car l’aplatissement et la déduction de type sont des fonctionnalités de l’index inversé.</p>
<p>Indexer l’objet « <code translate="no">metadata</code> » dans son intégralité :</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Ou indexez un sous-objet, tel que toutes les informations d’ <code translate="no">supplier</code>:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>L'indexation d'objets entiers augmente la taille de l'index. Pour les nouvelles charges de travail comportant des documents profondément imbriqués et des modèles de requêtes variés, utilisez des index spécifiques à un chemin d'accès ou envisagez <a href="/docs/fr/json-shredding.md">le « JSON Shredding</a> ».</p>
<h3 id="Apply-the-index" class="common-anchor-header">Appliquer l’index<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Après avoir ajouté tous vos paramètres d’index, appliquez-les à votre collection :</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Les constructions d’index s’exécutent de manière asynchrone. Utilisez <code translate="no">client.describe_index(...)</code> pour vérifier l’état de construction d’un index spécifique. Le champ « <code translate="no">state</code> » affiche « <code translate="no">Finished</code> » une fois la construction terminée, tandis que « <code translate="no">total_rows</code> », « <code translate="no">indexed_rows</code> » et « <code translate="no">pending_index_rows</code> » indiquent la progression au fur et à mesure.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Exemple de réponse :</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Dès que <code translate="no">state</code> renvoie <code translate="no">Finished</code>, les requêtes portant sur le chemin indexé utilisent automatiquement le nouvel index.</p>
<p>Pour les entrées de type « <code translate="no">AUTOINDEX</code> », le champ « <code translate="no">index_type</code> » de cette réponse est indiqué comme suit : « <code translate="no">AUTOINDEX</code> ». Milvus n’indique pas actuellement quelle structure sous-jacente (<code translate="no">BITMAP</code> ou <code translate="no">STL_SORT</code>) a été choisie lors de la compilation. Considérez ce choix comme une optimisation interne : les requêtes d’égalité, de type « <code translate="no">IN</code> » et de plage portant sur le chemin fonctionneront quelle que soit la structure sélectionnée.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Comment choisir entre AUTOINDEX et un type d’index explicite ?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Commencez par <code translate="no">AUTOINDEX</code>. Il sélectionne la structure adaptée en fonction de la cardinalité de vos données et couvre la plupart des requêtes d’égalité, <code translate="no">IN</code>, et de plage sur les chemins JSON. Optez pour un type explicite lorsque :</p>
<ul>
<li><p>Vous connaissez votre modèle de requête (par exemple, utilisez toujours « <code translate="no">STL_SORT</code> » pour les requêtes de plage et « <code translate="no">BITMAP</code> » pour les requêtes d’égalité sur des valeurs à faible cardinalité) et souhaitez éviter la mesure de la cardinalité.</p></li>
<li><p>Vous avez besoin de requêtes de correspondance de texte ou de sous-chaîne. Utilisez <code translate="no">INVERTED</code>.</p></li>
<li><p>Vous indexez des types de conversion de tableau. Utilisez explicitement ` <code translate="no">INVERTED</code> `.</p></li>
<li><p>Vous gérez un index JSON d’objet entier existant. Les expressions <code translate="no">INVERTED</code> et <code translate="no">AUTOINDEX</code> restent prises en charge à des fins de compatibilité, mais l’indexation JSON d’objet entier est dépréciée à partir de Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">Que se passe-t-il si l’expression de filtrage d’une requête utilise un type différent du type de conversion indexé ?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Si votre expression de filtrage utilise un type différent de celui de l’ <code translate="no">json_cast_type</code> de l’index, Milvus n’utilise pas l’index et peut recourir à un balayage par force brute plus lent si les données le permettent. Pour des performances optimales, veillez à toujours aligner votre expression de filtrage sur le type de conversion de l’index. Par exemple, si un index numérique est créé avec ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`, seules les conditions de filtrage numériques exploiteront l’index.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">Que se passe-t-il si une clé JSON présente des types de données incohérents entre différentes entités ?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Des types incohérents peuvent entraîner <strong>une indexation partielle</strong>. Par exemple, si <code translate="no">metadata[&quot;price&quot;]</code> est stocké à la fois sous forme de nombre (<code translate="no">99.99</code>) et de chaîne de caractères (<code translate="no">&quot;99.99&quot;</code>) et que vous créez un index avec <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, seules les valeurs numériques seront indexées. Les entrées sous forme de chaîne de caractères seront ignorées et n’apparaîtront pas dans les résultats du filtrage. Utilisez ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` pour convertir les chaînes de caractères en nombres au moment de l’indexation, ou modifiez les données sources afin que toutes les entrées soient du même type.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Puis-je créer plusieurs index sur la même clé JSON ?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Non. Milvus autorise au maximum un index par paire « <code translate="no">(field, json_path)</code> », quel que soit le type de conversion ou le type d’index. Vous ne pouvez pas créer à la fois un index « <code translate="no">INVERTED</code> » et un index « <code translate="no">BITMAP</code> » sur le même chemin, ni deux index sur le même chemin avec des types de conversion différents. Vous pouvez toutefois créer un index sur l’objet JSON entier et un index distinct sur une clé imbriquée au sein de cet objet, car il s’agit de chemins différents.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Comment régler le seuil BITMAP/STL_SORT d’AUTOINDEX ?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Par défaut, <code translate="no">AUTOINDEX</code> choisit « <code translate="no">BITMAP</code> » lorsque les valeurs indexées comportent <strong>100 valeurs distinctes ou moins</strong>, et « <code translate="no">STL_SORT</code> » dans le cas contraire. Vous pouvez remplacer ce seuil en ajoutant « <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> » à vos paramètres d’index (plage : 1-1 000) :</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>La plupart des utilisateurs n’ont pas besoin de régler ce paramètre. Augmentez-le si vous disposez d’un champ de cardinalité modérée que vous préférez voir traité en bitmap ; diminuez-le pour que <code translate="no">AUTOINDEX</code> soit remplacé plus rapidement par <code translate="no">STL_SORT</code>. Ce paramètre est ignoré lorsque vous spécifiez explicitement <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> ou <code translate="no">BITMAP</code>.</p>
