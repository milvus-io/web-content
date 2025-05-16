---
id: manage-collections.md
title: Collection expliquée
summary: >-
  Sur Milvus, vous pouvez créer plusieurs collections pour gérer vos données et
  insérer vos données en tant qu'entités dans les collections. La collection et
  l'entité sont similaires aux tables et aux enregistrements dans les bases de
  données relationnelles. Cette page vous aide à vous familiariser avec les
  collections et les concepts connexes.
---
<h1 id="Collection-Explained" class="common-anchor-header">Collection expliquée<button data-href="#Collection-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Sur Milvus, vous pouvez créer plusieurs collections pour gérer vos données et insérer vos données en tant qu'entités dans les collections. La collection et l'entité sont similaires aux tables et aux enregistrements dans les bases de données relationnelles. Cette page vous permet d'en savoir plus sur les collections et les concepts connexes.</p>
<h2 id="Collection" class="common-anchor-header">Collection<button data-href="#Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Une collection est un tableau bidimensionnel avec des colonnes fixes et des lignes variables. Chaque colonne représente un champ et chaque ligne une entité.</p>
<p>Le graphique suivant illustre une collection comportant huit colonnes et six entités.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/collection-explained.png" alt="Collection Explained" class="doc-image" id="collection-explained" />
   </span> <span class="img-wrapper"> <span>La collection expliquée</span> </span></p>
<h2 id="Schema-and-Fields" class="common-anchor-header">Schéma et champs<button data-href="#Schema-and-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Lorsqu'on décrit un objet, on mentionne généralement ses attributs, tels que la taille, le poids et la position. Vous pouvez utiliser ces attributs comme champs dans une collection. Chaque champ possède diverses propriétés contraignantes, telles que le type de données et la dimensionnalité d'un champ vectoriel. Vous pouvez former un schéma de collection en créant les champs et en définissant leur ordre. Pour connaître les types de données applicables, reportez-vous à la section <a href="/docs/fr/schema.md">Schéma expliqué</a>.</p>
<p>Vous devez inclure tous les champs définis par le schéma dans les entités à insérer. Pour rendre certains d'entre eux facultatifs, envisagez d'activer le champ dynamique. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/enable-dynamic-field.md">Champ dynamique</a>.</p>
<ul>
<li><p><strong>Rendre les champs nullables ou définir des valeurs par défaut</strong></p>
<p>Pour plus d'informations sur la manière de rendre un champ nullable ou de définir la valeur par défaut, voir <a href="/docs/fr/nullable-and-default.md">Nullable &amp; Default</a>.</p></li>
<li><p><strong>Activation d'un champ dynamique</strong></p>
<p>Pour plus d'informations sur l'activation et l'utilisation d'un champ dynamique, voir <a href="/docs/fr/enable-dynamic-field.md">Champ dynamique</a>.</p></li>
</ul>
<h2 id="Primary-key-and-AutoId" class="common-anchor-header">Clé primaire et AutoId<button data-href="#Primary-key-and-AutoId" class="anchor-icon" translate="no">
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
    </button></h2><p>À l'instar du champ primaire d'une base de données relationnelle, une collection dispose d'un champ primaire permettant de distinguer une entité des autres. Chaque valeur du champ primaire est globalement unique et correspond à une entité spécifique.</p>
<p>Comme le montre le tableau ci-dessus, le champ nommé <strong>id</strong> sert de champ primaire, et le premier ID <strong>0</strong> correspond à une entité intitulée <em>Le taux de mortalité du coronavirus n'est pas important</em>. Aucune autre entité n'aura le champ primaire 0.</p>
<p>Un champ primaire n'accepte que des nombres entiers ou des chaînes de caractères. Lorsque vous insérez des entités, vous devez inclure les valeurs des champs primaires par défaut. Toutefois, si vous avez activé l'option <strong>AutoId</strong> lors de la création de la collection, Milvus génère ces valeurs lors de l'insertion des données. Dans ce cas, excluez les valeurs des champs primaires des entités à insérer.</p>
<p>Pour plus d'informations, voir <a href="/docs/fr/primary-field.md">Champ primaire et AutoId</a>.</p>
<h2 id="Index" class="common-anchor-header">Index<button data-href="#Index" class="anchor-icon" translate="no">
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
    </button></h2><p>La création d'index sur des champs spécifiques améliore l'efficacité de la recherche. Il est conseillé de créer des index pour tous les champs sur lesquels votre service s'appuie, parmi lesquels les index sur les champs vectoriels sont obligatoires.</p>
<h2 id="Entity" class="common-anchor-header">Entité<button data-href="#Entity" class="anchor-icon" translate="no">
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
    </button></h2><p>Les entités sont des enregistrements de données qui partagent le même ensemble de champs dans une collection. Les valeurs de tous les champs d'une même ligne constituent une entité.</p>
<p>Vous pouvez insérer autant d'entités que nécessaire dans une collection. Toutefois, lorsque le nombre d'entités augmente, la taille de la mémoire nécessaire augmente également, ce qui affecte les performances de la recherche.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/schema.md">Schéma expliqué</a>.</p>
<h2 id="Load-and-Release" class="common-anchor-header">Chargement et validation<button data-href="#Load-and-Release" class="anchor-icon" translate="no">
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
    </button></h2><p>Le chargement d'une collection est la condition préalable à l'exécution de recherches de similarité et de requêtes dans les collections. Lorsque vous chargez une collection, Milvus charge tous les fichiers d'index et les données brutes de chaque champ dans la mémoire pour une réponse rapide aux recherches et aux requêtes.</p>
<p>Les recherches et les requêtes sont des opérations gourmandes en mémoire. Pour réduire les coûts, il est conseillé de libérer les collections qui ne sont pas utilisées.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/load-and-release.md">Charger et libérer</a>.</p>
<h2 id="Search-and-Query" class="common-anchor-header">Recherche et interrogation<button data-href="#Search-and-Query" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez créé les index et chargé la collection, vous pouvez lancer une recherche de similarité en introduisant un ou plusieurs vecteurs de requête. Par exemple, lorsqu'il reçoit la représentation vectorielle de votre requête dans une demande de recherche, Milvus utilise le type de métrique spécifié pour mesurer la similarité entre le vecteur de la requête et ceux de la collection cible avant de renvoyer ceux qui sont sémantiquement similaires à la requête.</p>
<p>Vous pouvez également inclure le filtrage des métadonnées dans les recherches et les requêtes afin d'améliorer la pertinence des résultats. Notez que les conditions de filtrage des métadonnées sont obligatoires dans les requêtes, mais facultatives dans les recherches.</p>
<p>Pour plus de détails sur les types de métriques applicables, voir <a href="/docs/fr/metric.md">Types de métriques</a>.</p>
<p>Pour plus d'informations sur les recherches et les requêtes, reportez-vous aux articles du chapitre Recherche et repositionnement, parmi lesquels figurent les fonctionnalités de base :</p>
<ul>
<li><p><a href="/docs/fr/single-vector-search.md">Recherche ANN de base</a></p></li>
<li><p><a href="/docs/fr/filtered-search.md">Recherche filtrée</a></p></li>
<li><p><a href="/docs/fr/range-search.md">Recherche par plage</a></p></li>
<li><p><a href="/docs/fr/grouping-search.md">Recherche par regroupement</a></p></li>
<li><p><a href="/docs/fr/multi-vector-search.md">Recherche hybride</a></p></li>
<li><p><a href="/docs/fr/with-iterators.md">Itérateur de recherche</a></p></li>
<li><p><a href="/docs/fr/get-and-scalar-query.md">Requête</a></p></li>
<li><p><a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a></p></li>
<li><p><a href="/docs/fr/keyword-match.md">Correspondance de texte</a></p></li>
</ul>
<p>En outre, Milvus fournit également des améliorations destinées à accroître les performances et l'efficacité de la recherche. Elles sont désactivées par défaut et vous pouvez les activer et les utiliser en fonction de vos besoins. Ces améliorations sont les suivantes</p>
<ul>
<li><p><a href="/docs/fr/use-partition-key.md">Utiliser la clé de partition</a></p></li>
<li><p><a href="/docs/fr/mmap.md">Utiliser mmap</a></p></li>
<li><p><a href="/docs/fr/clustering-compaction.md">Compaction du clustering</a></p></li>
</ul>
<h2 id="Partition" class="common-anchor-header">Partition<button data-href="#Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>Les partitions sont des sous-ensembles d'une collection, qui partagent le même ensemble de champs avec la collection mère, et qui contiennent chacune un sous-ensemble d'entités.</p>
<p>En répartissant les entités dans différentes partitions, vous pouvez créer des groupes d'entités. Vous pouvez effectuer des recherches et des requêtes dans des partitions spécifiques pour que Milvus ignore les entités dans d'autres partitions et améliore l'efficacité de la recherche.</p>
<p>Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/manage-partitions.md">Gérer les partitions</a>.</p>
<h2 id="Shard" class="common-anchor-header">Fardeau<button data-href="#Shard" class="anchor-icon" translate="no">
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
    </button></h2><p>Les tessons sont des tranches horizontales d'une collection. Chaque shard correspond à un canal d'entrée de données. Chaque collection possède un shard par défaut. Vous pouvez définir le nombre approprié d'unités lors de la création d'une collection en fonction du débit attendu et du volume des données à insérer dans la collection.</p>
<p>Pour plus d'informations sur la définition du nombre de shards, reportez-vous à la section <a href="/docs/fr/create-collection.md">Créer une collection</a>.</p>
<h2 id="Alias" class="common-anchor-header">Alias<button data-href="#Alias" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez créer des alias pour vos collections. Une collection peut avoir plusieurs alias, mais les collections ne peuvent pas partager un alias. Lorsqu'il reçoit une demande concernant une collection, Milvus localise la collection en fonction du nom fourni. Si la collection correspondant au nom fourni n'existe pas, Milvus continue à localiser le nom fourni en tant qu'alias. Vous pouvez utiliser des alias de collection pour adapter votre code à différents scénarios.</p>
<p>Pour plus de détails, voir <a href="/docs/fr/manage-aliases.md">Gérer les alias</a>.</p>
<h2 id="Function" class="common-anchor-header">Fonction<button data-href="#Function" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez définir des fonctions pour que Milvus dérive des champs lors de la création de la collection. Par exemple, la fonction de recherche en texte intégral utilise la fonction définie par l'utilisateur pour dériver un champ vectoriel clair à partir d'un champ varchar spécifique. Pour plus d'informations sur la recherche en texte intégral, voir <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a>.</p>
<h2 id="Consistency-Level" class="common-anchor-header">Niveau de cohérence<button data-href="#Consistency-Level" class="anchor-icon" translate="no">
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
    </button></h2><p>Les systèmes de bases de données distribuées utilisent généralement le niveau de cohérence pour définir la similitude des données entre les nœuds de données et les répliques. Vous pouvez définir des niveaux de cohérence distincts lorsque vous créez une collection ou que vous effectuez des recherches de similarité au sein de la collection. Les niveaux de cohérence applicables sont <strong>Strong</strong>, <strong>Bounded Staleness</strong>, <strong>Session</strong> et <strong>Eventually</strong>.</p>
<p>Pour plus d'informations sur ces niveaux de cohérence, reportez-vous à la section <a href="/docs/fr/tune_consistency.md">Niveau de cohérence</a>.</p>
