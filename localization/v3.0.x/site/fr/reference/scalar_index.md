---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Comparez les types d'index scalaires, vérifiez la compatibilité des champs et
  découvrez le fonctionnement de la sélection automatique des index.
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
    </button></h1><p>Les index scalaires permettent d'accélérer <a href="/docs/fr/boolean.md">le filtrage</a> sur les champs non vectoriels. Utilisez cette présentation pour choisir un index, vérifier la compatibilité des champs et comprendre le fonctionnement de la sélection automatique.</p>
<p>Envisagez d’indexer les champs utilisés dans des filtres fréquents ou lents. Pour chaque champ que vous incluez dans la requête de création d’index, choisissez l’une des deux options suivantes :</p>
<ul>
<li><strong>Spécifier un type d’index :</strong> choisissez-en un compatible avec le type de données du champ et vos filtres.</li>
<li><strong>Utilisez l’option « <code translate="no">AUTOINDEX</code> » :</strong> définissez « <code translate="no">index_type</code> » sur « <code translate="no">AUTOINDEX</code> » pour laisser Milvus choisir un type. Voir <a href="#AUTOINDEX-behavior">le comportement de l’option AUTOINDEX</a>.</li>
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Ouvrez le guide d’un index pour connaître les filtres, les paramètres et les étapes de création pris en charge :</p>
<table>
<thead>
<tr><th>Type d’index</th><th>Utilisation pour</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/fr/inverted.md">INVERTED</a></td><td>Filtres d'égalité, d'appartenance et de plage.</td></tr>
<tr><td><a href="/docs/fr/bitmap.md">BITMAP</a></td><td>Champs comportant peu de valeurs distinctes, tels que les codes d'état.</td></tr>
<tr><td><a href="/docs/fr/stl-sort.md">STL_SORT</a></td><td>Recherches de valeurs et filtres de plage.</td></tr>
<tr><td><a href="/docs/fr/trie.md">TRIE</a></td><td>Recherches exactes de chaînes de caractères et correspondance de préfixes sur des champs de type « <code translate="no">VARCHAR</code> ».</td></tr>
<tr><td><a href="/docs/fr/ngram.md">NGRAM</a></td><td>Filtres « LIKE » et expressions régulières éligibles.</td></tr>
<tr><td><a href="/docs/fr/rtree.md">RTREE</a></td><td>Filtres spatiaux sur les champs d'<code translate="no">GEOMETRY</code>.</td></tr>
</tbody>
</table>
<p>Vérifiez le tableau de compatibilité des champs ci-dessous ainsi que la prise en charge des filtres par l’index sélectionné avant de créer un index.</p>
<p><details id="Filter-execution">
<summary><strong>Comment les filtres utilisent les index</strong></summary></p>
<p>Un index ne sert qu’aux expressions éligibles ; les autres filtres peuvent analyser les données. Les opérations arithmétiques et les comparaisons entre champs ne bénéficient pas de l’accélération de la recherche littérale. Pour les combinaisons logiques et les tests NULL, voir <a href="/docs/fr/basic-operators.md">Opérateurs de base</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Types de champs pris en charge<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Identifiez le type de données de votre champ pour connaître les index explicites pris en charge. Dans les lignes de tableau, « <code translate="no">ARRAY&lt;T&gt;</code> » signifie « <code translate="no">ARRAY</code> » avec « <code translate="no">element_type=T</code> » :</p>
<table>
<thead>
<tr><th>Type de champ</th><th>Types d’index explicites</th><th>Conditions</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Les champs booléens scalaires ne prennent pas en charge <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> n'est pas disponible sur les champs de clé primaire.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>L'<code translate="no">BITMAP</code> explicite n'est pas disponible.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> n'est pas disponible sur les champs de clé primaire. Voir <a href="#String-pattern-indexes">la sélection d'index par filtre</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>Voir <a href="/docs/fr/timestamptz-field.md">Champ TIMESTAMPTZ</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>Voir <a href="/docs/fr/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Voir <a href="/docs/fr/array_data_type.md#Array-index-support">Prise en charge des index de tableaux</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Voir « <a href="/docs/fr/array_data_type.md#Array-index-support">Prise en charge des index de tableaux</a> ».</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>Voir <a href="/docs/fr/array_data_type.md#Array-index-support">la prise en charge des index de tableaux</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Voir <a href="/docs/fr/array_data_type.md#Array-index-support">Prise en charge des index de tableaux</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Cela dépend du chemin indexé et du type de conversion.</td><td>Vérifiez <a href="/docs/fr/json-indexing.md#Understand-cast-types">la compatibilité et les exigences relatives aux chemins JSON</a>.</td></tr>
<tr><td>Sous-champs non vectoriels de StructArray</td><td>Cela dépend du type de données du sous-champ.</td><td>Indexez les sous-champs séparément ; les sous-champs de type « <code translate="no">BOOL</code> » ne peuvent pas utiliser l'<code translate="no">STL_SORT</code> explicite. Voir <a href="/docs/fr/index-structarray-fields.md#Create-scalar-indexes">les règles relatives aux sous-champs</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Aucun</td><td>Les index scalaires créés par l’utilisateur, y compris les index « <code translate="no">AUTOINDEX</code> », ne sont pas disponibles.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Les index scalaires, y compris les index de type « <code translate="no">AUTOINDEX</code> », ne prennent pas en charge les champs ARRAY récursifs ni les tableaux comportant des éléments pouvant être nuls. Voir <a href="/docs/fr/array_data_type.md#Array-index-support">Prise en charge des index de tableaux</a> pour les filtres de tableaux ordinaires et <a href="/docs/fr/index-structarray-fields.md#Create-scalar-indexes">Indexation des champs StructArray</a> pour les règles relatives aux sous-champs.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Choisissez un index pour les filtres VARCHAR</strong></summary></p>
<p>Pour un champ de type « <code translate="no">VARCHAR</code> », comparez les index compatibles en fonction de vos filtres :</p>
<table>
<thead>
<tr><th>Besoin de filtrage</th><th>Guides et conditions d’indexation</th></tr>
</thead>
<tbody>
<tr><td>Recherches exactes de chaînes et de préfixes</td><td><a href="/docs/fr/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/fr/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a> ou <a href="/docs/fr/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Peu de valeurs de chaîne distinctes</td><td><a href="/docs/fr/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; les motifs sont évalués par rapport aux valeurs indexées.</td></tr>
<tr><td>LIKE ou expression régulière avec des littéraux fixes adaptés</td><td><a href="/docs/fr/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> sur des champs « <code translate="no">VARCHAR</code> » ou des chemins de chaînes JSON, sous réserve des conditions de longueur de gramme et de revérification.</td></tr>
<tr><td>Expression régulière sans littéraux fixes utilisables</td><td>La requête peut parcourir les données ou évaluer de nombreuses valeurs indexées ; vérifiez les conditions de l’index sélectionné.</td></tr>
</tbody>
</table>
<p>Les plages sur l’ <code translate="no">VARCHAR</code> utilisent le classement des chaînes de caractères, même lorsque celles-ci contiennent des nombres. L’utilisation de l’index dépend de la planification de la requête, des littéraux extractibles, de la cardinalité et de la distribution des données. Reportez-vous à la section <a href="/docs/fr/pattern-matching.md#Accelerate-pattern-matching-with-indexes">« Correspondance de motifs »</a> pour connaître les règles de planification. Pour les chemins de chaînes JSON, vérifiez les exigences relatives au chemin et à la conversion dans la section « <a href="/docs/fr/json-indexing.md">Indexation JSON</a> ».</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">Comportement de AUTOINDEX<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Définissez « <code translate="no">index_type</code> » sur « <code translate="no">AUTOINDEX</code> » dans la définition d’index de chaque champ sélectionné. Milvus choisit un type en fonction du type de données et, le cas échéant, du nombre de valeurs distinctes lors de chaque création d’index :</p>
<table>
<thead>
<tr><th>Type de champ</th><th>Sélection par défaut</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> pour moins de 100 valeurs distinctes ; sinon <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> avec <code translate="no">element_type</code> défini sur <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, ou <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> pour moins de 100 éléments distincts ; sinon <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> les chemins sont convertis en <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> par défaut dans la version 3.0. La <a href="/docs/fr/json-indexing.md#Index-requirements">configuration JSON « opt-in</a> » active la stratégie scalaire bitmap/triée ci-dessus.</td></tr>
<tr><td><code translate="no">JSON</code> les chemins sont convertis en <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code></td><td>Utilisez explicitement <code translate="no">INVERTED</code>; le mappage par défaut de la version 3.0.6 rejette la sélection automatique pour ces conversions.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Non pris en charge.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Pour un champ scalaire pris en charge, une définition d’index omettant <code translate="no">index_type</code> demande également une sélection automatique. Les champs non inclus dans la requête ne sont pas indexés.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Détails de la sélection</strong></summary></p>
<ul>
<li><strong>Dispositions internes :</strong> ` <code translate="no">AUTOINDEX</code> ` peut sélectionner des dispositions non disponibles en tant que choix explicites, telles que l’indexation bitmap pour ` <code translate="no">FLOAT</code> ` et ` <code translate="no">DOUBLE</code>`. La stratégie basée sur la cardinalité est appelée en interne « <code translate="no">HYBRID</code> » ; vous ne pouvez pas la spécifier directement. L’index sélectionné détermine quels filtres peuvent l’utiliser.</li>
<li><strong>Seuil de cardinalité :</strong> <a id="Cardinality-threshold"></a>Définissez <code translate="no">bitmap_cardinality_limit</code> (plage : 1–1 000) pour remplacer le seuil par défaut. Les valeurs inférieures à ce seuil utilisent le bitmap ; à partir de ce seuil, la structure à haute cardinalité du type de données s’applique. Les constructions explicites <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> et <code translate="no">BITMAP</code> contournent la sélection basée sur la cardinalité et ignorent ce seuil.</li>
<li><strong>Remplacements par l’administrateur :</strong> modifiez les mappages de types via <code translate="no">scalarAutoIndex.params.build</code>. <code translate="no">scalarAutoIndex.enable=false</code> (par défaut) autorise toujours les requêtes explicites de type <code translate="no">AUTOINDEX</code>; <code translate="no">true</code> applique également la sélection automatique aux requêtes manuelles valides.</li>
</ul>
<p></details></p>
<h2 id="Whats-next" class="common-anchor-header">Et ensuite ?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Choisissez un guide pour votre prochaine tâche :</p>
<ul>
<li><strong>Créer un index :</strong> utilisez le <a href="#Index-types">guide sur les index</a> pour connaître les paramètres et consulter des exemples de création.</li>
<li><strong>Planifier les ressources :</strong> consultez les recommandations sur la mémoire pour <a href="/docs/fr/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/fr/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/fr/inverted.md#Memory-considerations">INVERTED</a> ou <a href="/docs/fr/ngram.md#Memory-considerations">NGRAM</a>. Comparez l’utilisation de la mémoire, le temps de construction et la latence des requêtes à l’aide de données et de filtres représentatifs.</li>
<li><strong>Configurer la recherche textuelle :</strong> <a href="/docs/fr/keyword-match.md">Text Match</a> et <a href="/docs/fr/full-text-search.md">Full Text Search</a> couvrent l’analyse de texte, BM25, <code translate="no">TEXT_MATCH</code> et <code translate="no">PHRASE_MATCH</code>. Un index d’ <code translate="no">INVERTED</code> s scalaires ne prend pas en charge ces mécanismes.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Suppression d’index scalaires sur les anciennes versions de Milvus</strong></summary></p>
<p>Dans Milvus v2.6.3 ou antérieure, libérez la collection avant de supprimer un index scalaire. À partir de la version v2.6.4, vous pouvez le supprimer sans libérer la collection.</p>
<p></details></p>
