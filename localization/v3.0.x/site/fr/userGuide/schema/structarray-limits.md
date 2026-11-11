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
    </button></h1><p>La prise en charge de StructArray couvre la définition du schéma, l'insertion de données, l'indexation, les modes de recherche et les filtres spécifiques à StructArray. Utilisez cette page comme référence concernant les limites avant de vous fier au comportement de StructArray en production.</p>
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
    </button></h2><p>Les principales limites de StructArray sont les suivantes :</p>
<table>
<thead>
<tr><th>Domaine</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Forme du schéma</td><td>Une structure (Struct) ne peut être utilisée que comme type d'élément d'un champ de tableau (Array). La structure n'est pas prise en charge en tant que champ de collection de niveau supérieur.</td></tr>
<tr><td>Schéma des sous-champs</td><td>Tous les éléments Struct d’un même champ StructArray partagent un schéma Struct prédéfini.</td></tr>
<tr><td>Sous-champs imbriqués</td><td>À partir de Milvus 3.0.6, une structure (Struct) peut contenir des sous-champs scalaires de type « <code translate="no">ARRAY</code> » avec un seul niveau d’imbrication. Les sous-champs imbriqués de type « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » et «JSON» ne sont pris en charge dans aucune version.</td></tr>
<tr><td>La capacité</td><td><code translate="no">max_capacity</code> est obligatoire et limite le nombre d’éléments Struct qu’une entité peut stocker dans le champ StructArray.</td></tr>
<tr><td>Modifications des sous-champs</td><td>À partir de Milvus 3.0.6, vous pouvez ajouter un sous-champ dont l’élément peut être nul à un champ StructArray existant ou en supprimer un sous-champ. Les versions antérieures nécessitent de supprimer puis de rajouter l’intégralité du champ StructArray.</td></tr>
<tr><td>Chemin d’accès aux sous-champs</td><td>Utilisez des chemins de type « <code translate="no">structArray[subfield]</code> », tels que <code translate="no">chunks[emb]</code>, pour les index, les cibles de recherche, les champs de sortie et les filtres. N’utilisez pas <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insertion de forme</td><td>Insérez un champ StructArray sous la forme d’un tableau d’objets. N’utilisez pas la syntaxe de chemin d’accès à l’intérieur des charges utiles d’insertion.</td></tr>
<tr><td>Index vectoriels</td><td>Un champ vecteur ou un sous-champ vecteur n’accepte qu’un seul index. Utilisez des sous-champs vecteurs distincts pour la recherche EmbeddingList et la recherche au niveau des éléments.</td></tr>
<tr><td>Fonctions</td><td>Les fonctions de champ ne sont pas prises en charge pour les champs ou sous-champs situés à l'intérieur d'un champ StructArray.</td></tr>
<tr><td>Champs pouvant prendre la valeur null</td><td>Les champs StructArray pouvant prendre la valeur null sont soumis à des restrictions de version. Une valeur null au niveau d’une ligne s’applique à l’ensemble du champ StructArray. À partir de Milvus 3.0.6, un sous-champ peut en outre autoriser une valeur null dans un élément Struct individuel : <code translate="no">nullable=True</code> sur un sous-champ scalaire ou vectoriel, <code translate="no">element_nullable=True</code> sur un sous-champ de type tableau. Un élément Struct ne peut pas lui-même être null.</td></tr>
<tr><td>Ajout dynamique d’un champ</td><td>L’ajout d’un champ StructArray à une collection existante dépend de la version et nécessite que le champ ajouté soit nullable.</td></tr>
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
    </button></h2><p>Les schémas StructArray présentent les limites suivantes :</p>
<table>
<thead>
<tr><th>Limite</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Struct n'est pas un type de champ de niveau supérieur.</td><td>Créez un champ StructArray en tant qu <code translate="no">datatype=DataType.ARRAY</code>, avec <code translate="no">element_type=DataType.STRUCT</code> et <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Tous les éléments partagent un même schéma.</td><td>Chaque élément Struct d’un champ StructArray respecte la même liste de sous-champs et les mêmes types de données de sous-champs.</td></tr>
<tr><td><code translate="no">max_capacity</code> est obligatoire.</td><td>Le nombre d’éléments Struct dans une entité ne doit pas dépasser l’ <code translate="no">max_capacity</code> configurée pour le champ StructArray.</td></tr>
<tr><td>Les sous-champs d’ <code translate="no">ARRAY</code> s scalaires ont une <code translate="no">max_capacity</code> propre à chaque sous-champ.</td><td>Un sous-champ d’ <code translate="no">ARRAY</code> s scalaires déclare une <code translate="no">max_capacity</code> pour son tableau interne, et Milvus rejette tout élément Struct dont le tableau interne dépasse la capacité déclarée de ce sous-champ. Les valeurs ne doivent pas nécessairement correspondre d’un sous-champ à l’autre. La valeur doit être supérieure à 0 et ne doit pas dépasser <code translate="no">proxy.maxArrayCapacity</code>, dont la valeur par défaut est 4096.</td></tr>
<tr><td>Les sous-champs peuvent évoluer dans Milvus 3.0.6 et versions ultérieures.</td><td>Ajoutez un sous-champ dont l’élément peut être nul, ou supprimez un sous-champ en indiquant son chemin d’accès, par exemple <code translate="no">chunks[lang]</code>. Vous ne pouvez pas supprimer le dernier sous-champ d’un champ StructArray, le dernier champ vectoriel de la collection, ni un sous-champ utilisé par une fonction. Dans les versions antérieures, supprimez le champ StructArray, puis ajoutez-le à nouveau avec le schéma mis à jour.</td></tr>
<tr><td>Les Struct imbriquées ne sont pas prises en charge.</td><td>Une structure (Struct) ne peut pas contenir de sous-champs imbriqués de type « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » ou JSON. À partir de Milvus 3.0.6, une structure (Struct) peut contenir des sous-champs scalaires de type « <code translate="no">ARRAY</code> » avec un seul niveau d’imbrication. Un sous-champ de type « <code translate="no">ARRAY</code> » ne peut pas contenir de vecteurs.</td></tr>
<tr><td>Les fonctions ne sont pas prises en charge à l’intérieur d’un StructArray.</td><td>Ne définissez pas de fonctions de champ pour les champs StructArray ni pour leurs sous-champs.</td></tr>
<tr><td>Les propriétés de champ sont limitées sur les champs StructArray.</td><td><code translate="no">alter_collection_field()</code> À partir de Milvus 3.0.6, l’ <code translate="no">warmup</code> sur un champ StructArray ou sur un chemin de sous-champ n’accepte que les propriétés <code translate="no">mmap.enabled</code>, <code translate="no">field.description</code> et . Les autres propriétés, telles que <code translate="no">max_capacity</code> et <code translate="no">max_length</code>, sont rejetées.</td></tr>
<tr><td>L’analyse de texte n’est pas prise en charge sur les sous-champs.</td><td>La définition de ` <code translate="no">enable_match</code> ` ou ` <code translate="no">enable_analyzer</code> ` sur un sous-champ de type `Struct` est rejetée. Les index de texte ne sont créés que pour les champs de niveau supérieur.</td></tr>
</tbody>
</table>
<p>Pour des exemples de création de schéma, consultez la section <a href="/docs/fr/create-structarray-field.md">Créer un champ StructArray</a>.</p>
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
    </button></h2><p>Les sous-champs StructArray sont mappés à un stockage physique de type tableau. Le tableau suivant répertorie les types physiques pris en charge et non pris en charge :</p>
<table>
<thead>
<tr><th>Type physique du sous-champ Struct</th><th>Prise en charge</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.VARCHAR</code> et définissez <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme <code translate="no">DataType.FLOAT_VECTOR</code> et définissez <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.FLOAT16_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BFLOAT16_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.INT8_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BINARY_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Non pris en charge</td><td>Les sous-champs de vecteurs clairsemés ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Non pris en charge</td><td>Utilisez « <code translate="no">VARCHAR</code> » et non « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Non pris en charge</td><td>Les sous-champs JSON ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Non pris en charge</td><td>Les sous-champs de géométrie et les fonctions SIG ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Non pris en charge</td><td>Les sous-champs de type texte ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Non pris en charge</td><td>Les sous-champs « timestamptz » et les expressions spécifiques à l'heure ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Pris en charge à partir de Milvus 3.0.6</td><td>Définissez le sous-champ comme suit : ` <code translate="no">DataType.ARRAY</code> `, avec un scalaire ` <code translate="no">element_type</code> ` et un ` <code translate="no">max_capacity</code> ` pour le tableau interne. Chaque élément `Struct` contient alors un tableau interne. Définissez ` <code translate="no">nullable=True</code> ` sur le sous-champ pour autoriser un tableau interne nul et ` <code translate="no">element_nullable=True</code> ` pour autoriser des valeurs nulles à l’intérieur de celui-ci.</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code>, , de vecteurs, , ou <code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>Non pris en charge</td><td>L'imbrication de tableaux à l'intérieur d'une structure est limitée à un seul niveau ; le tableau interne ne peut pas contenir de vecteurs, et les sous-champs imbriqués de type structure ou tableau de structures ne sont pas pris en charge.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Limites relatives aux schémas dynamiques et aux valeurs nulles<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Le tableau suivant décrit le comportement des StructArray pouvant contenir des valeurs nulles et l’ajout dynamique de champs dans les StructArray, sous réserve de la déclaration de disponibilité ci-dessous :</p>
<table>
<thead>
<tr><th>Fonctionnalité</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Champ StructArray pouvant prendre la valeur null</td><td>Sous réserve de la déclaration de disponibilité ci-dessous, définissez l'<code translate="no">nullable=True</code> e sur le StructArray parent ; ne configurez pas les sous-champs Struct comme pouvant prendre la valeur NULL de manière indépendante.</td></tr>
<tr><td>Valeur NULL en Python</td><td>Utilisez ` <code translate="no">None</code> ` pour insérer une valeur StructArray nulle en Python. N’utilisez pas ` <code translate="no">Null</code> ` ni ` <code translate="no">null</code>`.</td></tr>
<tr><td>Portée de la valeur NULL</td><td>La valeur NULL s'applique à l'ensemble du champ StructArray. Par exemple, <code translate="no">chunks=None</code> n'est valide que lorsque <code translate="no">chunks</code> est nullable.</td></tr>
<tr><td>Valeur StructArray partiellement nulle</td><td>Lorsqu’un champ StructArray contient une valeur de tableau valide, ne mélangez pas de tableaux de sous-champs nuls avec des tableaux de sous-champs valides au sein d’une même valeur.</td></tr>
<tr><td>Valeur nulle au niveau des éléments</td><td>Pris en charge à partir de Milvus 3.0.6. Un sous-champ scalaire, vectoriel ou de type « <code translate="no">ARRAY</code> » peut autoriser une valeur nulle dans des éléments Struct individuels : <code translate="no">nullable=True</code> sur un sous-champ scalaire ou vectoriel, <code translate="no">element_nullable=True</code> sur un sous-champ de type « <code translate="no">ARRAY</code> ». Le paramètre « <code translate="no">nullable</code> » au niveau de la ligne provient toujours du parent StructArray ; définir <code translate="no">nullable=True</code> sur un sous-champ active la valeur nulle au niveau de l’élément, et non au niveau de la ligne.</td></tr>
<tr><td>Élément Struct nul</td><td>Un élément Struct ne peut pas être nul en soi, comme par exemple <code translate="no">[null, {...}]</code>. Définissez plutôt les valeurs des sous-champs de l’élément sur null.</td></tr>
<tr><td>Sous-champs omis</td><td>À partir de Milvus 3.0.6, vous pouvez omettre un sous-champ pouvant prendre la valeur null au niveau de l’élément dans un élément Struct, et Milvus y stocke la valeur null. Un sous-champ ne pouvant pas prendre la valeur null au niveau de l’élément doit être présent dans chaque élément Struct. Dans les versions antérieures, chaque élément Struct devait fournir tous les sous-champs.</td></tr>
<tr><td>Ajout dynamique d’un champ StructArray</td><td>Sous réserve de la déclaration de disponibilité ci-dessous.</td></tr>
<tr><td>Exigence de nullabilité pour l’ajout dynamique</td><td>Un champ StructArray ajouté à une collection existante doit être pouvant prendre la valeur null, car les entités existantes ne possèdent aucune valeur pour ce nouveau champ.</td></tr>
<tr><td>Entités existantes après un ajout dynamique</td><td>Les entités existantes renvoient la valeur « <code translate="no">null</code> » pour le champ StructArray ajouté.</td></tr>
<tr><td>Sous-champ d’ajout dynamique</td><td>Prise en charge à partir de Milvus 3.0.6. Un sous-champ ajouté doit être créé avec la valeur « <code translate="no">nullable=True</code> » ; un sous-champ « <code translate="no">ARRAY</code> » ajouté prend en outre la valeur « <code translate="no">element_nullable=True</code> » pour les valeurs nulles à l’intérieur du tableau interne. Les entités existantes renvoient la valeur «null» pour le nouveau sous-champ dans chacun de leurs éléments Struct, et les entités dont le champ StructArray est nul restent nulles.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 et les versions ultérieures prennent en charge les champs StructArray pouvant être nuls, les tableaux vectoriels pouvant être nuls et l’ajout dynamique de champs StructArray dans les déploiements autonomes et distribués. Les versions antérieures de Milvus ne prennent pas en charge ces fonctionnalités.</p>
<p>Milvus 3.0.6 et les versions ultérieures prennent également en charge les valeurs null au niveau des éléments, les sous-champs scalaires d’ <code translate="no">ARRAY</code>, ainsi que l’ajout ou la suppression de sous-champs d’un champ StructArray existant. Ces fonctionnalités nécessitent Storage V2 et ne sont pas disponibles dans les collections externes.</p>
<p>Dans Zilliz Cloud, ces fonctionnalités sont disponibles sur les clusters à la demande exécutant Milvus 3.0.0 ou une version ultérieure. Les clusters de service ne les prennent pas en charge.</p>
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
    </button></h2><p>Les charges utiles d’insertion StructArray sont soumises aux limites suivantes :</p>
<table>
<thead>
<tr><th>Limite</th><th>Détails</th></tr>
</thead>
<tbody>
<tr><td>Forme de la charge utile</td><td>Insérez le champ StructArray sous la forme d'un tableau d'objets Struct, par exemple <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Noms des sous-champs</td><td>À l’intérieur de chaque objet Struct, utilisez des noms de sous-champs tels que <code translate="no">text</code> et <code translate="no">emb</code>, et non des chemins d’accès tels que <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Conformité au schéma</td><td>Chaque élément Struct doit respecter le schéma Struct. À partir de Milvus 3.0.6, un sous-champ pouvant être nul peut être omis ou défini sur <code translate="no">null</code> dans un élément Struct.</td></tr>
<tr><td>Capacité</td><td>Le nombre d’éléments Struct dans une entité ne doit pas dépasser <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensions des vecteurs</td><td>Les valeurs des vecteurs doivent respecter l’ <code translate="no">dim</code> configurée pour leurs sous-champs vectoriels.</td></tr>
<tr><td>Duplication en mode de recherche</td><td>Si vous avez besoin à la fois d’une recherche EmbeddingList et d’une recherche au niveau des éléments, enregistrez les vecteurs dans deux sous-champs vectoriels distincts.</td></tr>
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
    </button></h2><p>Un sous-champ vectoriel StructArray peut être indexé soit pour la recherche EmbeddingList, soit pour la recherche au niveau des éléments. Un même sous-champ vectoriel ne peut pas utiliser les deux familles de métriques, car chaque champ vectoriel ou sous-champ vectoriel n’accepte qu’un seul index. Les modes de recherche utilisent les familles de métriques suivantes :</p>
<table>
<thead>
<tr><th>Mode de recherche</th><th>Famille de métriques</th><th>Niveau de résultat</th></tr>
</thead>
<tbody>
<tr><td>Recherche EmbeddingList</td><td><code translate="no">MAX_SIM</code>, métriques « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » ou « binary <code translate="no">MAX_SIM_*</code> »</td><td>Résultats au niveau de l'entité.</td></tr>
<tr><td>Recherche au niveau des éléments</td><td>Mesures vectorielles classiques telles que <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> ou <code translate="no">JACCARD</code></td><td>Résultats au niveau des éléments pouvant inclure le décalage de l’élément correspondant.</td></tr>
</tbody>
</table>
<p>Utilisez des sous-champs vectoriels distincts lorsque les deux modes sont requis. Par exemple, utilisez <code translate="no">chunks[emb_list_vector]</code> pour la recherche EmbeddingList et <code translate="no">chunks[emb]</code> pour la recherche au niveau des éléments.</p>
<p>Les sous-champs vectoriels StructArray comptent comme des champs vectoriels dans la limite au niveau de la collection <code translate="no">proxy.maxVectorFieldNum</code>, dont la valeur par défaut est 10. Un champ StructArray dont les sous-champs vectoriels sont les seuls champs vectoriels de la collection est valide, et la suppression d’un tel champ est refusée si cela laisse la collection sans champ vectoriel. Veillez à ce que le nombre total de champs vectoriels et de sous-champs vectoriels reste dans les limites de votre version cible et de votre niveau de service.</p>
<p>À partir de Milvus 3.0.6, un sous-champ vectoriel dont les éléments peuvent être nuls ne prend en charge que la recherche au niveau des éléments avec des métriques vectorielles standard. Les métriques « <code translate="no">MAX_SIM*</code> », les index « EmbeddingList » et la recherche « EmbeddingList » sont rejetés sur les sous-champs vectoriels dont les éléments peuvent être nuls, et « <code translate="no">AUTOINDEX</code> » ne sélectionne pas de métrique « <code translate="no">MAX_SIM*</code> » pour ceux-ci. Les vecteurs nuls ne participent pas à la recherche. Les index scalaires ne sont pas pris en charge sur les sous-champs à éléments pouvant être nuls ni sur les sous-champs scalaires de type « <code translate="no">ARRAY</code> ».</p>
<p>Pour connaître la matrice des types d’index et de métriques pris en charge, consultez la section <a href="/docs/fr/index-structarray-fields.md">Champs StructArray d’index</a>.</p>
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
    </button></h2><p>Le comportement de recherche de StructArray présente les limites suivantes :</p>
<table>
<thead>
<tr><th>Comportement de recherche</th><th>Prise en charge et limites</th></tr>
</thead>
<tbody>
<tr><td>Recherche de base dans EmbeddingList</td><td>Prise en charge sur les sous-champs vectoriels de StructArray indexés à l'aide de métriques de type « <code translate="no">MAX_SIM*</code> ». Renvoie des résultats au niveau de l'entité.</td></tr>
<tr><td>Recherche de base au niveau des éléments</td><td>Prise en charge sur les sous-champs vectoriels StructArray indexés à l'aide de métriques vectorielles classiques. Peut renvoyer les décalages des éléments correspondants.</td></tr>
<tr><td>Recherche par plage</td><td>Prise en charge en fonction du mode de recherche et de la prise en charge des index/métriques de la version cible. Pour connaître le comportement de la recherche par plage dans le cadre des requêtes StructArray au niveau des éléments, vérifiez votre version cible.</td></tr>
<tr><td>Recherche par regroupement</td><td>La recherche groupée au niveau des éléments peut renvoyer des indices. Le comportement de la recherche hybride par groupe pour les requêtes StructArray au niveau des éléments dépend de la version.</td></tr>
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
<li><p>N’utilisez « <code translate="no">$[subfield]</code> » qu’au sein d’opérateurs StructArray.</p></li>
<li><p>Les expressions de filtrage au niveau des lignes peuvent également référencer directement des chemins StructArray : <code translate="no">chunks[0][section]</code> pour la position d’un élément, <code translate="no">array_length(chunks)</code> pour le nombre d’éléments, <code translate="no">array_contains(chunks[section], ...)</code> pour les valeurs des sous-champs sur l’ensemble des éléments, et <code translate="no">chunks is null</code> sur un champ StructArray pouvant être nul.</p></li>
<li><p>Utilisez des sous-champs scalaires pour les prédicats scalaires.</p></li>
<li><p>N’utilisez pas de sous-champs vectoriels comme entrées de prédicats scalaires d’ <code translate="no">$[...]</code>.</p></li>
</ul>
<ul>
<li>La syntaxe JSON Path, les fonctions JSON, les fonctions de correspondance de texte, les fonctions de géométrie/SIG et les expressions Timestamptz ne sont pas prises en charge pour les prédicats au niveau des éléments de StructArray. À partir de Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> et <code translate="no">array_length</code> sont pris en charge sur <code translate="no">$[subfield]</code> pour les sous-champs scalaires <code translate="no">ARRAY</code>, et <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> est pris en charge pour tous les types de sous-champs.</li>
</ul>
<ul>
<li>À partir de Milvus 3.0.6, une valeur nulle dans un sous-champ d’un élément Struct rend le prédicat de l’élément « inconnu » plutôt que « faux ». <code translate="no">element_filter</code> ne conserve que les éléments dont le prédicat est vrai, tandis que <code translate="no">MATCH_*</code> considère un élément « inconnu » comme une absence. Pour plus de détails, voir <a href="/docs/fr/struct-array-operators.md">Opérateurs StructArray</a>.</li>
</ul>
<ul>
<li>Privilégiez les comparaisons booléennes explicites telles que ` <code translate="no">$[has_code] == true</code> ` plutôt que les expressions booléennes nues.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Limites d’importation et de stockage<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Formats de fichiers source</td><td>Les fichiers JSON, JSONL, CSV et Parquet peuvent contenir des champs StructArray. Les fichiers NumPy contiennent un fichier par champ de niveau supérieur et ne peuvent pas fournir de données StructArray ; utilisez des fichiers JSON, CSV ou Parquet pour les collections comportant un champ StructArray. Pour les structures de fichiers, consultez la section <a href="/docs/fr/prepare-source-data.md#StructArray-fields-in-source-files">Préparer les données source</a>.</td></tr>
<tr><td>Format de stockage</td><td>Les sous-champs pouvant contenir des éléments nuls et les sous-champs scalaires de type « <code translate="no">ARRAY</code> » nécessitent le format de stockage V2. Le format de stockage V1 n’est pas accessible pour les collections utilisant ces sous-champs : la création de la collection et l’insertion des données peuvent sembler réussir, mais les données échouent lors de la validation, ce qui n’est pas un état pris en charge. Storage V3, avec l’option « <code translate="no">common.storage.enableGrowingSourceFlush</code> » définie sur « <code translate="no">true</code> », rejette les requêtes utilisant des sous-champs dont les éléments peuvent être nuls ou des sous-champs scalaires de type « <code translate="no">ARRAY</code> ».</td></tr>
<tr><td>Collections externes</td><td><code translate="no">ARRAY</code> Les sous-champs de type « element-nullable » et les sous-champs scalaires de type « » ne sont pas pris en charge dans les collections externes.</td></tr>
<tr><td>Importation de sauvegardes et d’instantanés</td><td><code translate="no">ARRAY</code> L’importation à partir d’un fichier binlog, telle que la restauration d’une sauvegarde, et l’importation à partir d’un instantané sont rejetées pour les collections comportant des sous-champs pouvant contenir des valeurs nulles ou des sous-champs scalaires de type « ».</td></tr>
<tr><td>Rétrogradation</td><td>Les collections comportant des sous-champs dont les éléments peuvent être nuls ou des sous-champs d'<code translate="no">ARRAY</code> s scalaires ne peuvent pas fonctionner sur une version antérieure à Milvus 3.0.6. La relecture du journal d'écriture anticipée (Binlog) sur une version plus ancienne provoque une erreur fatale. Une nouvelle mise à niveau vers Milvus 3.0.6 ou une version ultérieure permet de récupérer les données.</td></tr>
</tbody>
</table>
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
