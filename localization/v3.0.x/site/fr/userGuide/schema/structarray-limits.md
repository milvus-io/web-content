---
id: structarray-limits.md
title: Limites de StructArray
summary: >-
  La prise en charge de StructArray couvre la définition du schéma, l'insertion
  de données, l'indexation, les modes de recherche et les filtres spécifiques à
  StructArray. Utilisez cette page comme référence concernant les limites avant
  de vous fier au comportement de StructArray en production.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Limites de StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>La prise en charge de StructArray couvre la définition du schéma, l’insertion de charges utiles, l’indexation, les modes de recherche et les filtres spécifiques à StructArray. Utilisez cette page comme référence concernant les limites avant de vous fier au comportement de StructArray en production.</p>
<p>La plupart des limites de StructArray proviennent de l’une des trois sources suivantes : le modèle de schéma StructArray, le mode de recherche que vous choisissez pour les sous-champs vectoriels et la version de Milvus sur laquelle s’exécute votre collection.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Aperçu des limites<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Domaine</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Forme du schéma</td><td>Une structure (Struct) ne peut être utilisée que comme type d’élément d’un champ de type tableau (Array). La structure n’est pas prise en charge en tant que champ de collection de niveau supérieur.</td></tr>
<tr><td>Schéma des sous-champs</td><td>Tous les éléments Struct d’un même champ StructArray partagent un schéma Struct prédéfini.</td></tr>
<tr><td>La capacité</td><td><code translate="no">max_capacity</code> est obligatoire et limite le nombre d’éléments Struct qu’une entité peut stocker dans le champ StructArray.</td></tr>
<tr><td>Modifications des sous-champs</td><td>Une fois qu’un champ StructArray a été créé, vous ne pouvez plus y ajouter de sous-champs.</td></tr>
<tr><td>Chemin d’accès aux sous-champs</td><td>Utilisez des chemins de type « <code translate="no">structArray[subfield]</code> », tels que <code translate="no">chunks[emb]</code>, pour les index, les cibles de recherche, les champs de sortie et les filtres. N’utilisez pas <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insertion de forme</td><td>Insérez un champ StructArray sous la forme d’un tableau d’objets. N’utilisez pas la syntaxe de chemin d’accès à l’intérieur des charges utiles d’insertion.</td></tr>
<tr><td>Index vectoriels</td><td>Un champ vecteur ou un sous-champ vecteur n’accepte qu’un seul index. Utilisez des sous-champs vecteurs distincts pour la recherche EmbeddingList et la recherche au niveau des éléments.</td></tr>
<tr><td>Fonctions</td><td>Les fonctions de champ ne sont pas prises en charge pour les champs ou sous-champs situés à l’intérieur d’un champ StructArray.</td></tr>
<tr><td>Champs pouvant prendre la valeur null</td><td>Les champs StructArray pouvant prendre la valeur null dépendent de la version. Lorsqu’ils sont pris en charge, la valeur null s’applique à l’ensemble du champ StructArray, et non à un élément Struct individuel de manière indépendante.</td></tr>
<tr><td>Ajout dynamique d’un champ</td><td>L'ajout d'un champ StructArray à une collection existante dépend de la version et nécessite que le champ ajouté soit nullable.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Limites du schéma<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Limite</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Struct n'est pas un type de champ de niveau supérieur.</td><td>Créez un champ StructArray en tant qu <code translate="no">datatype=DataType.ARRAY</code>, avec <code translate="no">element_type=DataType.STRUCT</code> et <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Tous les éléments partagent un même schéma.</td><td>Chaque élément Struct d’un champ StructArray suit la même liste de sous-champs et les mêmes types de données de sous-champs.</td></tr>
<tr><td><code translate="no">max_capacity</code> est obligatoire.</td><td>Le nombre d’éléments Struct dans une entité ne doit pas dépasser l’ <code translate="no">max_capacity</code> configurée pour le champ StructArray.</td></tr>
<tr><td>Les sous-champs existants sont fixes.</td><td>Vous ne pouvez pas ajouter de nouveaux sous-champs à un champ StructArray existant. Pour modifier le schéma des sous-champs, supprimez le champ StructArray, puis ajoutez-le à nouveau avec le schéma mis à jour.</td></tr>
<tr><td>Les StructArray imbriqués ne sont pas pris en charge.</td><td>Un champ StructArray ne peut pas contenir de sous-champs <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code> imbriqués.</td></tr>
<tr><td>Les fonctions ne sont pas prises en charge à l’intérieur d’un StructArray.</td><td>Ne définissez pas de fonctions de champ pour les champs StructArray ou leurs sous-champs.</td></tr>
</tbody>
</table>
<p>Pour des exemples de création de schéma, voir <a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a>.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Types de données pris en charge pour les sous-champs<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Les sous-champs StructArray sont mappés à un stockage physique de type tableau. Le tableau suivant répertorie les types physiques pris en charge et non pris en charge.</p>
<table>
<thead>
<tr><th>Type physique du sous-champ Struct</th><th>Prise en charge</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.VARCHAR</code> et définissez <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Pris en charge</td><td>Définissez le sous-champ comme <code translate="no">DataType.FLOAT_VECTOR</code> et définissez <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.FLOAT16_VECTOR</code> » et définissez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BFLOAT16_VECTOR</code> » et définissez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.INT8_VECTOR</code> » et définissez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BINARY_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Non pris en charge</td><td>Les sous-champs de vecteurs clairsemés ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Utilisez « <code translate="no">VARCHAR</code> » et non « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs JSON ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs de géométrie et les fonctions SIG ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs de type texte ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs « timestamptz » et les expressions spécifiques à l'heure ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code></td><td>Non pris en charge</td><td>Les champs StructArray ne prennent pas en charge les sous-champs imbriqués de type tableau, tableau vectoriel, Struct ou tableau de Struct.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Limites relatives aux schémas nullables et dynamiques<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Le comportement des StructArray avec valeurs nulles et l’ajout dynamique de champs StructArray dépendent de la version.</p>
<table>
<thead>
<tr><th>Fonctionnalité</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Champ StructArray pouvant prendre la valeur null</td><td>Pris en charge uniquement dans les versions incluant la prise en charge des StructArray pouvant contenir des valeurs nulles et des tableaux vectoriels pouvant contenir des valeurs nulles.</td></tr>
<tr><td>Valeur nulle en Python</td><td>Utilisez ` <code translate="no">None</code> ` pour insérer une valeur StructArray nulle en Python. N'utilisez pas ` <code translate="no">Null</code> ` ni ` <code translate="no">null</code>`.</td></tr>
<tr><td>Portée de la valeur nulle</td><td>La valeur nulle s'applique à l'ensemble du champ StructArray. Par exemple, <code translate="no">chunks=None</code> n'est valide que si <code translate="no">chunks</code> est de type « nullable ».</td></tr>
<tr><td>Valeur StructArray partiellement nulle</td><td>Lorsqu’un champ StructArray contient une valeur de tableau valide, ne mélangez pas de sous-tableaux nuls avec des sous-tableaux valides au sein d’une même valeur.</td></tr>
<tr><td>Ajout dynamique d’un champ StructArray</td><td>L'ajout d'un champ StructArray à une collection existante n'est pris en charge que dans les versions qui incluent la prise en charge des champs StructArray dynamiques.</td></tr>
<tr><td>Exigence de nullabilité pour l’ajout dynamique</td><td>Un champ StructArray ajouté à une collection existante doit être nullable, car les entités existantes ne disposent d’aucune valeur pour ce nouveau champ.</td></tr>
<tr><td>Entités existantes après l’ajout dynamique</td><td>Les entités existantes renvoient la valeur « <code translate="no">null</code> » pour le champ StructArray ajouté, et ce pour tous ses sous-champs.</td></tr>
</tbody>
</table>
<p>Dans Milvus v3.0.x, les champs StructArray pouvant prendre la valeur null, les tableaux vectoriels pouvant prendre la valeur null et l’ajout dynamique de champs StructArray sont disponibles.</p>
<p>Pour des exemples d’insertion avec des champs StructArray pouvant prendre la valeur null, consultez la section « <a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans des champs StructArray</a> ».</p>
<h2 id="Insert-limits" class="common-anchor-header">Limites d’insertion<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Limite</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Forme de la charge utile</td><td>Insérez le champ StructArray sous la forme d’un tableau d’objets Struct, par exemple <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Noms des sous-champs</td><td>À l’intérieur de chaque objet Struct, utilisez des noms de sous-champs tels que <code translate="no">text</code> et <code translate="no">emb</code>, et non des chemins d’accès tels que <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Conformité au schéma</td><td>Chaque élément Struct doit respecter le schéma Struct.</td></tr>
<tr><td>Capacité</td><td>Le nombre d’éléments Struct dans une entité ne doit pas dépasser <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensions des vecteurs</td><td>Les valeurs vectorielles doivent correspondre à l’ <code translate="no">dim</code> configurée pour leurs sous-champs vectoriels.</td></tr>
<tr><td>Duplication en mode recherche</td><td>Si vous avez besoin à la fois de la recherche EmbeddingList et de la recherche au niveau des éléments, enregistrez les vecteurs dans deux sous-champs vectoriels distincts.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Limites d’index et de métriques<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Un sous-champ vectoriel StructArray peut être indexé soit pour la recherche EmbeddingList, soit pour la recherche au niveau des éléments. Un même sous-champ vectoriel ne peut pas utiliser les deux familles de métriques, car chaque champ vectoriel ou sous-champ vectoriel n'accepte qu'un seul index.</p>
<table>
<thead>
<tr><th>Mode de recherche</th><th>Famille de métriques</th><th>Niveau de résultat</th></tr>
</thead>
<tbody>
<tr><td>Recherche EmbeddingList</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code>, ou métriques binaires <code translate="no">MAX_SIM_*</code> </td><td>Résultats au niveau de l’entité.</td></tr>
<tr><td>Recherche au niveau des éléments</td><td>Mesures vectorielles classiques telles que <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> ou <code translate="no">JACCARD</code></td><td>Résultats au niveau des éléments pouvant inclure l’offset de l’élément correspondant.</td></tr>
</tbody>
</table>
<p>Utilisez des sous-champs vectoriels distincts lorsque les deux modes sont requis. Par exemple, utilisez <code translate="no">chunks[emb_list_vector]</code> pour la recherche EmbeddingList et <code translate="no">chunks[emb]</code> pour la recherche au niveau des éléments.</p>
<p>Les sous-champs vectoriels StructArray comptent comme des sous-champs vectoriels lors de la conception de votre schéma de collection. Veillez à ce que le nombre total de champs vectoriels et de sous-champs vectoriels reste dans les limites de votre version cible et de votre niveau de service.</p>
<p>Pour connaître la matrice des types d’index et des types de métriques pris en charge, consultez la section <a href="/docs/fr/index-structarray-fields.md">Champs StructArray d’index</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Limites de recherche<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Comportement de recherche</th><th>Prise en charge et limites</th></tr>
</thead>
<tbody>
<tr><td>Recherche EmbeddingList de base</td><td>Prise en charge sur les sous-champs vectoriels StructArray indexés à l'aide de métriques de type « <code translate="no">MAX_SIM*</code> ». Renvoie des résultats au niveau des entités.</td></tr>
<tr><td>Recherche de base au niveau des éléments</td><td>Prise en charge sur les sous-champs vectoriels de StructArray indexés à l'aide de métriques vectorielles standard. Peut renvoyer les décalages des éléments correspondants.</td></tr>
<tr><td>Recherche par plage</td><td>Prise en charge en fonction du mode de recherche et de la prise en charge des index/métriques de la version cible. Pour connaître le comportement de la recherche par plage hybride sur les requêtes StructArray au niveau des éléments, vérifiez votre version cible.</td></tr>
<tr><td>Recherche par regroupement</td><td>La recherche par regroupement au niveau des éléments peut renvoyer des indices de position. Le comportement de la recherche hybride par regroupement pour les requêtes StructArray au niveau des éléments dépend de la version.</td></tr>
<tr><td>Recherche hybride</td><td>Une requête de recherche hybride ne peut inclure des requêtes de sous-champs vectoriels StructArray que si la version cible prend en charge cette combinaison de recherche. Chaque requête suit toujours la famille de métriques du sous-champ vectoriel indexé.</td></tr>
<tr><td>Sortie de décalage</td><td>Les décalages sont disponibles pour les résultats de recherche au niveau des éléments. La recherche EmbeddingList renvoie des résultats au niveau des entités et n’utilise pas les décalages d’éléments comme unité de résultat principale.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Limites des filtres et des opérateurs<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Le filtrage scalaire de StructArray est géré par les opérateurs StructArray, tels que « <code translate="no">element_filter</code> » et la famille « <code translate="no">MATCH_*</code> ». La matrice détaillée de prise en charge des prédicats se trouve dans la section « <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a> ».</p>
<p>En résumé :</p>
<ul>
<li><p>Utilisez « <code translate="no">$[subfield]</code> » uniquement au sein d’opérateurs StructArray.</p></li>
<li><p>Utilisez des sous-champs scalaires pour les prédicats scalaires.</p></li>
<li><p>N’utilisez pas de sous-champs vectoriels comme entrées de prédicats scalaires de type « <code translate="no">$[...]</code> ».</p></li>
<li><p>La syntaxe JSON Path, les fonctions JSON, les fonctions de conteneurs de tableaux, les fonctions de correspondance de texte, les fonctions de géométrie/SIG et les expressions Timestamptz ne sont pas prises en charge pour les prédicats au niveau des éléments StructArray.</p></li>
<li><p>Privilégiez les comparaisons booléennes explicites telles que ` <code translate="no">$[has_code] == true</code> ` plutôt que les expressions booléennes nues.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Pages associées<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>Pour créer un champ StructArray, consultez la section <a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a>.</p></li>
<li><p>Pour insérer des données, consultez la section « <a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans des champs StructArray</a> ».</p></li>
<li><p>Pour créer des index vectoriels et scalaires, consultez la section « <a href="/docs/fr/index-structarray-fields.md">Indexer des champs StructArray</a> ».</p></li>
<li><p>Pour revoir la syntaxe des filtres StructArray, consultez la section « <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a> ».</p></li>
</ol>
