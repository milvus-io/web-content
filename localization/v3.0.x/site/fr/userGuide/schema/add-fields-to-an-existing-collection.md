---
id: add-fields-to-an-existing-collection.md
title: Modifier le schéma d'une collection
summary: >-
  Modifier un schéma de collection existant en ajoutant ou en supprimant des
  champs définis par l'utilisateur ou des fonctions, ainsi que les champs
  vectoriels générés par celles-ci.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">Modifier le schéma d'une collection<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Lorsqu’une collection passe de la phase de développement à la phase de production, son schéma évolue souvent. Vous pouvez ajouter des champs scalaires tels que « <code translate="no">source_uri</code> » ou « <code translate="no">review_status</code> » pour le filtrage et la logique d’application, ajouter un nouveau champ vectoriel pour les représentations générées par votre application, ajouter une fonction BM25 et son champ vectoriel creux généré pour la recherche lexicale sur le texte existant, ou supprimer des champs et des fonctions qui ne sont plus utilisés. La fonction « Modifier le schéma de la collection » vous permet d’effectuer sur place les modifications prises en charge des champs et des fonctions, au lieu de recréer la collection.</p>
<div class="alert note">
<p>Ce guide traite des modifications de schéma pour les champs définis par l’utilisateur et pour les fonctions avec leurs champs vectoriels générés dans les collections gérées. Pour ajouter un champ à une collection externe, reportez-vous à la <a href="/docs/fr/alter-external-collection-schema.md">section Modifier le schéma d’une collection externe</a>. Pour les modifications de propriétés de champ, telles que la modification de l’ <code translate="no">max_length</code> sur un champ <code translate="no">VARCHAR</code> ou de l’ <code translate="no">max_capacity</code> sur un champ <code translate="no">ARRAY</code>, reportez-vous à la <a href="/docs/fr/alter-collection-field.md">section Modifier un champ de collection</a>. Pour le comportement dynamique des champs, reportez-vous aux sections « <a href="/docs/fr/enable-dynamic-field.md">Champ dynamique</a> » et « <a href="/docs/fr/modify-collection.md">Modifier une collection</a> ».</p>
</div>
<h2 id="Limits" class="common-anchor-header">Limites<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Ajouter des champs définis par l’utilisateur</strong></p>
<ul>
<li><p>Les champs définis par l’utilisateur ajoutés doivent pouvoir prendre la valeur null. Définissez l’ <code translate="no">nullable=True</code> lors de l’appel de <code translate="no">add_collection_field()</code>. Pour les entités existantes, le champ ajouté est de type <code translate="no">NULL</code>, sauf si vous ajoutez un champ scalaire avec un <code translate="no">default_value</code>.</p></li>
<li><p>L’ajout de champs scalaires définis par l’utilisateur est pris en charge dans Milvus 2.6.x et versions ultérieures. L’ajout de champs vectoriels définis par l’utilisateur est pris en charge dans Milvus 2.6.18 et versions ultérieures.</p></li>
<li><p>L'ajout de champs StructArray est pris en charge à partir de Milvus 3.0.0. Les champs StructArray ajoutés doivent être de type « nullable ».</p></li>
<li><p>Les noms de champs doivent être uniques parmi les champs de la collection.</p></li>
</ul>
<p><strong>Ajouter une fonction et son champ vectoriel généré</strong></p>
<ul>
<li><p>Chaque mise à jour de schéma ne peut ajouter qu’une seule fonction et un seul champ vectoriel généré.</p></li>
<li><p>La fonction prise en charge détermine le type du champ vectoriel généré : « <code translate="no">BM25</code> » génère un champ « <code translate="no">SPARSE_FLOAT_VECTOR</code> », et « <code translate="no">MINHASH</code> » génère un champ « <code translate="no">BINARY_VECTOR</code> ».</p></li>
<li><p>Le champ vectoriel généré doit être un nouveau champ. Il ne peut pas pointer vers un champ qui existe déjà dans le schéma de la collection.</p></li>
<li><p>Le champ vectoriel généré ne peut pas être de type « nullable ».</p></li>
<li><p>Les champs d’entrée utilisés par la fonction doivent déjà exister dans la collection.</p></li>
<li><p>Lors de l’ajout d’une fonction BM25 ou MinHash à une collection existante, l’entrée de la fonction doit être un champ de type « <code translate="no">VARCHAR</code> ». Une entrée de type « <code translate="no">TEXT</code> » n’est pas prise en charge dans ce workflow, car Milvus ne peut pas remplir a posteriori la sortie générée pour les entités existantes à partir de ce type d’entrée.</p></li>
</ul>
<p><strong>Supprimer des champs définis par l’utilisateur</strong></p>
<ul>
<li><p>Vous ne pouvez pas supprimer le champ de clé primaire, le champ de clé de partition, le champ de clé de clustering ni le dernier champ vectoriel d’une collection.</p></li>
<li><p>Vous pouvez supprimer un champ « <code translate="no">ARRAY&lt;STRUCT&gt;</code> » dans son intégralité, mais vous ne pouvez pas supprimer un sous-champ individuel au sein d’un champ « <code translate="no">ARRAY&lt;STRUCT&gt;</code> ».</p></li>
<li><p>Vous ne pouvez pas supprimer directement un champ utilisé comme champ d’entrée d’une fonction ou généré en tant que champ de sortie d’une fonction. Pour supprimer un champ de sortie d’une fonction, supprimez la fonction qui le génère.</p></li>
</ul>
<p><strong>Supprimer une fonction et son champ vectoriel généré</strong></p>
<ul>
<li><p>Dans ce workflow de modification de schéma, la suppression d’une fonction entraîne la suppression de la fonction, de son champ vectoriel généré et de l’index associé. Les champs d’entrée de la fonction restent dans le schéma de la collection.</p></li>
<li><p>La suppression d’une fonction est refusée si la suppression de son champ vectoriel généré laisse la collection sans aucun champ vectoriel.</p></li>
</ul>
<div class="alert note">
<p>Pour les modifications de schéma ne relevant pas des opérations d’ajout et de suppression prises en charge, recréez ou migrez la collection.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">Ajouter des champs et des fonctions à une collection existante<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Choisissez le workflow en fonction du type d’élément que vous ajoutez : un champ défini par l’utilisateur ou une fonction générant un champ vectoriel :</p>
<ul>
<li><p><a href="#add-user-defined-scalar-fields--milvus-26x">Ajoutez des champs scalaires définis par l’utilisateur</a> lorsque vous avez besoin de nouvelles métadonnées pour le filtrage, le résultat d’une requête ou la logique d’application.</p></li>
<li><p><a href="#add-structarray-fields--milvus-300">Ajoutez des champs StructArray</a> lorsque vous avez besoin d’un champ de type tableau dont les éléments partagent le même schéma Struct.</p></li>
<li><p><a href="#add-user-defined-vector-fields--milvus-2618">Ajoutez des champs vectoriels définis par l’utilisateur</a> lorsque votre application génère des représentations et écrit des valeurs vectorielles dans Milvus.</p></li>
<li><p><a href="#add-a-function-and-its-generated-vector-field--milvus-30x">Ajoutez une fonction et le champ vectoriel qu’elle génère</a> lorsque Milvus doit générer des valeurs vectorielles à partir de champs existants, tels que des vecteurs creux BM25 ou des signatures MinHash issues de texte.</p></li>
</ul>
<p>Dans tous les cas, le nom du nouveau champ ne doit pas déjà exister dans la collection, et le nombre total de champs ne peut pas dépasser la limite de Milvus en matière de nombre de champs. Pour plus de détails, consultez la section « <a href="/docs/fr/limitations.md#number-of-resources-in-a-collection">Limites de Milvus</a> ».</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">Ajouter des champs scalaires définis par l’utilisateur<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez la commande « <code translate="no">add_collection_field()</code> » pour ajouter un champ scalaire défini par l’utilisateur à une collection existante.</p>
<p>Cette opération diffère du stockage de clés arbitraires dans le champ dynamique : une fois la mise à jour du schéma disponible, le nouveau champ scalaire fait partie intégrante du schéma de la collection. Vous pouvez y insérer ou y mettre à jour des valeurs, créer des index le cas échéant, l’utiliser dans des requêtes et des filtres de recherche, et le renvoyer dans le résultat d’une requête ou d’une recherche.</p>
<p>Comme les entités existantes ont été insérées avant la création du nouveau champ, tout champ scalaire défini par l’utilisateur ajouté doit être de type « nullable » :</p>
<ul>
<li><p>Si vous ajoutez un champ scalaire avec ` <code translate="no">nullable=True</code> ` et sans ` <code translate="no">default_value</code>`, les entités existantes renvoient ` <code translate="no">NULL</code> ` pour le nouveau champ.</p></li>
<li><p>Si vous ajoutez un champ scalaire avec ` <code translate="no">nullable=True</code> ` et ` <code translate="no">default_value</code>`, les entités existantes renvoient la valeur par défaut au lieu de ` <code translate="no">NULL</code>`.</p></li>
</ul>
<p>Les expressions de filtrage scalaires ne correspondent pas aux valeurs scalaires de type « <code translate="no">NULL</code> ». Pour plus de détails, reportez-vous à la section <a href="/docs/fr/nullable-and-default.md">Champs pouvant prendre la valeur null</a>.</p>
<p><strong>Exemple : Ajouter un champ scalaire pouvant prendre la valeur null</strong></p>
<p>L'exemple suivant ajoute un champ scalaire pouvant prendre la valeur null <code translate="no">source</code> à une collection existante nommée <code translate="no">product_catalog</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ ajouté, les entités qui existaient déjà dans la collection renvoient « <code translate="no">NULL</code> » pour « <code translate="no">source</code> ». Les nouvelles entités peuvent définir « <code translate="no">source</code> » lors de l’insertion ou de la mise à jour.</p>
<p><strong>Exemple : ajouter un champ scalaire avec une valeur par défaut</strong></p>
<p>Si les entités existantes doivent renvoyer une valeur concrète au lieu de <code translate="no">NULL</code>, spécifiez <code translate="no">default_value</code> lors de l’ajout d’un champ scalaire. L’exemple suivant ajoute un champ <code translate="no">review_status</code> et utilise <code translate="no">&quot;unreviewed&quot;</code> comme valeur par défaut.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ ajouté, les entités qui existaient déjà dans la collection renvoient <code translate="no">&quot;unreviewed&quot;</code> pour <code translate="no">review_status</code>. Les nouvelles entités peuvent définir une valeur différente ou utiliser la valeur par défaut lorsqu’aucune valeur n’est fournie.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">Ajouter des champs StructArray<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">add_collection_struct_field()</code> pour ajouter un champ StructArray qui accepte des tableaux d’éléments Struct. Pour ajouter un champ StructArray, procédez comme suit :</p>
<ol>
<li><p>Créez un schéma Struct contenant les sous-champs nécessaires des types de données pris en charge. Pour connaître les types de données applicables, consultez la section « <a href="/docs/fr/structarray-limits.md#Supported-subfield-data-types">Limites de StructArray</a> ».</p></li>
<li><p>Faites référence au schéma Struct créé ci-dessus et définissez la capacité maximale du champ dans « <code translate="no">add_collection_struct_field()</code> ».</p></li>
<li><p>Définissez ` <code translate="no">nullable=True</code> ` dans la requête.</p></li>
</ol>
<p><strong>Exemple : ajouter un champ StructArray pouvant prendre la valeur null</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ StructArray ajouté, les entités déjà présentes dans la collection renvoient la valeur « <code translate="no">NULL</code> » pour l’ <code translate="no">chunks</code>, quel que soit le champ concerné. Lorsque vous insérez une nouvelle entité, assurez-vous que tous les sous-champs sont soit définis sur « <code translate="no">NULL</code> », soit contiennent des valeurs valides. L’insertion d’une entité dont certains sous-champs sont définis sur « <code translate="no">NULL</code> » et d’autres sur des valeurs valides entraîne des erreurs.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">Ajouter des champs vectoriels définis par l’utilisateur<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">add_collection_field()</code> pour ajouter un champ vectoriel défini par l’utilisateur lorsque votre application génère des représentations et écrit des valeurs vectorielles dans Milvus.</p>
<p>Chaque champ vectoriel défini par l’utilisateur ajouté doit être nullable. Les entités existantes disposent d’une valeur par défaut ( <code translate="no">NULL</code> ) pour le nouveau champ vectoriel jusqu’à ce que vous écriviez des valeurs vectorielles via un workflow d’upsert ou de backfill. Les nouvelles entités peuvent inclure le champ vectoriel lors de l’insertion. La recherche vectorielle ignore les entités dont la valeur vectorielle est « <code translate="no">NULL</code> ». Pour plus de détails, reportez-vous à <a href="/docs/fr/nullable-and-default.md">la section Champs nullables</a>.</p>
<p><strong>Exemple : ajouter un champ vectoriel pouvant prendre la valeur null</strong></p>
<p>L’exemple suivant ajoute un champ vectoriel dense pouvant prendre la valeur null, nommé <code translate="no">embedding_v2</code>, à une collection existante. Définissez <code translate="no">dim</code> sur la dimensionnalité des représentations générées par votre application.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ ajouté, créez un index sur le nouveau champ vectoriel avant d’effectuer une recherche dessus :</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Les entités existantes ont la valeur « <code translate="no">NULL</code> » pour « <code translate="no">embedding_v2</code> » et sont ignorées lorsque vous effectuez une recherche sur ce champ. Pour rendre les entités existantes consultables via « <code translate="no">embedding_v2</code> », écrivez des valeurs vectorielles non NULL via un workflow d’upsert ou de backfill. Les nouvelles entités peuvent inclure « <code translate="no">embedding_v2</code> » lors de l’insertion.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Ajouter une fonction et son champ vectoriel généré<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez ce workflow lorsque Milvus doit générer un nouveau champ vectoriel à partir de données déjà stockées dans une collection existante. L’opération ajoute trois éléments de schéma associés :</p>
<ul>
<li><p>Une définition de fonction qui lit à partir d’un ou plusieurs champs d’entrée existants.</p></li>
<li><p>Un nouveau champ vectoriel qui stocke la sortie de la fonction.</p></li>
<li><p>Une définition d’index liée au nouveau champ vectoriel.</p></li>
</ul>
<p>Par exemple, une fonction BM25 lit un champ existant « <code translate="no">VARCHAR</code> » et génère un champ « <code translate="no">SPARSE_FLOAT_VECTOR</code> » destiné à la recherche lexicale. Une fonction MinHash génère un champ « <code translate="no">BINARY_VECTOR</code> » destiné à la détection des quasi-duplicatas. Ce workflow n’ajoute ni ne remplace le champ d’entrée de la fonction.</p>
<div class="alert note">
<p>Cette fonctionnalité nécessite Storage V3. Pour obtenir des instructions d’activation et connaître les considérations de compatibilité, consultez la section <a href="/docs/fr/storage-v3.md">Storage V3</a>.</p>
</div>
<p>L’ajout d’une fonction et de son champ vectoriel généré à une collection existante nécessite également la compaction de la version du schéma et la compaction de la version de stockage. Milvus rejette la requête si l’un de ces paramètres est désactivé. Ces prérequis supplémentaires s’appliquent uniquement lors de la modification d’une collection existante ; la définition de la fonction dans le schéma initial de la collection n’utilise pas ce workflow de remplissage des données existantes.</p>
<p>La fonction prise en charge détermine le type de champ vectoriel généré :</p>
<table>
<thead>
<tr><th>Fonction</th><th>Type de champ vectoriel généré</th><th>Champ d’entrée type</th><th>Cas d’utilisation typique</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>Un champ « <code translate="no">VARCHAR</code> » avec l'analyseur activé</td><td>Recherche lexicale et pertinence des mots-clés</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td>Un champ « <code translate="no">VARCHAR</code> »</td><td>Détection des quasi-duplicatas</td></tr>
</tbody>
</table>
<p>Pour plus de détails sur le fonctionnement de chaque fonction, reportez-vous aux sections « <a href="/docs/fr/bm25-function.md">Fonction BM25</a> » et « <a href="/docs/fr/minhash-function.md">Fonction MinHash</a> ».</p>
<p>Le champ vectoriel généré ne doit pas exister déjà dans la collection et ne peut pas être de type « nullable ». Le champ d’entrée de la fonction doit déjà exister.</p>
<p><strong>Exemple : ajouter une fonction BM25 et son champ vectoriel clairsemé généré</strong></p>
<p>L’exemple suivant ajoute une fonction BM25 nommée « <code translate="no">text_bm25</code> » et son champ vectoriel clairsemé généré, nommé « <code translate="no">text_sparse</code> », à une collection existante. La collection doit déjà comporter un champ « <code translate="no">VARCHAR</code> » nommé « <code translate="no">text</code> » avec l’analyseur activé.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>L’objet « <code translate="no">index_params</code> » doit contenir exactement une définition d’index pour le nouveau champ de sortie de la fonction. Milvus ajoute la fonction, son champ vectoriel généré et la définition d’index liée au cours de la même modification de schéma. N’appelez pas « <code translate="no">create_index()</code> » séparément après « <code translate="no">add_function_field()</code> ».</p>
<p>D’un point de vue conceptuel, cette opération ajoute les définitions suivantes de la fonction, du champ de sortie généré et de l’index lié :</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>Une fois la requête réussie, ` <code translate="no">describe_collection()</code> ` renvoie à la fois la nouvelle fonction ` <code translate="no">text_bm25</code> ` et son champ vectoriel généré ` <code translate="no">text_sparse</code> ` dans le schéma de la collection. Milvus génère la sortie de la fonction pour les nouvelles entités au fur et à mesure de leur écriture. Pour les entités existantes, Milvus remplit le champ vectoriel généré de manière asynchrone via une compaction en arrière-plan. La visibilité du schéma confirme que la mise à jour du schéma a réussi, mais n’indique pas que le remplissage a été effectué pour chaque entité existante. Pour le workflow complet de recherche BM25, reportez-vous à <a href="/docs/fr/full-text-search.md">la section</a> « <a href="/docs/fr/full-text-search.md">Recherche en texte intégral</a> ».</p>
<p>Milvus prend également en charge les fonctions MinHash et les champs vectoriels binaires qu’elles génèrent pour la détection des quasi-duplicatas. Une fonction MinHash utilise l’ <code translate="no">FunctionType.MINHASH</code> e et écrit dans un nouveau champ de sortie « <code translate="no">BINARY_VECTOR</code> ». Pour plus de détails sur la configuration, reportez-vous à <a href="/docs/fr/minhash-function.md">la section</a> « <a href="/docs/fr/minhash-function.md">Fonction MinHash</a> ».</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">Supprimer des champs et des fonctions d’une collection existante<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez supprimer directement les champs définis par l’utilisateur lorsqu’ils ne font plus partie de votre modèle de collection. Pour supprimer une fonction et le champ vectoriel qu’elle génère, supprimez la fonction ; Milvus supprime alors le champ généré et son index au cours de la même modification de schéma.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">Supprimer des champs définis par l’utilisateur<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez la commande « <code translate="no">drop_collection_field()</code> » pour supprimer un champ scalaire, vectoriel ou StructArray défini par l’utilisateur qui ne fait plus partie de votre modèle de collection.</p>
<p>La suppression d’un champ modifie d’abord le schéma de la collection et la visibilité du champ :</p>
<ul>
<li><p>Une fois l’opération « <code translate="no">drop_collection_field()</code> » réussie, le schéma de la collection est mis à jour : la commande « <code translate="no">describe_collection()</code> » ne renvoie plus le champ supprimé, et les requêtes ou recherches ne peuvent plus renvoyer ce champ dans « <code translate="no">output_fields</code> » ni l’utiliser dans des expressions.</p></li>
<li><p>Les index créés sur le champ supprimé sont nettoyés dans le cadre de la mise à jour du schéma.</p></li>
</ul>
<p>Le nettoyage du stockage est géré séparément du nettoyage du schéma. Pour plus de détails, consultez la section « <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">Quand l’espace de stockage est-il libéré après la suppression d’un champ ?</a> ».</p>
<p><strong>Exemple : suppression d’un champ scalaire défini par l’utilisateur</strong></p>
<p>L'exemple suivant part du principe que « <code translate="no">experiment_tag</code> » est un champ scalaire défini par l'utilisateur dans « <code translate="no">product_catalog</code> », et le supprime de la collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir supprimé un champ, vous pouvez appeler la méthode ` <code translate="no">describe_collection()</code> ` pour vérifier que le champ ne fait plus partie du schéma.</p>
<p><strong>Exemple : Supprimer un champ StructArray</strong></p>
<p>L'exemple suivant part du principe que ` <code translate="no">chunks</code> ` est un champ `StructArray` dans ` <code translate="no">my_collection</code>` et le supprime de la collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Exemple : suppression d’un champ vectoriel défini par l’utilisateur</strong></p>
<p>Vous pouvez supprimer un champ vectoriel à l’aide de la même méthode <code translate="no">drop_collection_field()</code>, mais la collection doit toujours contenir au moins un champ vectoriel après la suppression. Cela s’avère utile pour les collections qui contiennent temporairement plusieurs représentations vectorielles et qui s’uniformisent par la suite sur l’une d’entre elles.</p>
<p>L’exemple suivant part du principe que ` <code translate="no">image_vector</code> ` est un champ vectoriel défini par l’utilisateur dans ` <code translate="no">hybrid_catalog</code>`, et que la collection conserve encore un autre champ vectoriel, tel que ` <code translate="no">text_vector</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si <code translate="no">image_vector</code> est le dernier champ vectoriel de la collection, l’opération de suppression est rejetée.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">Supprimer une fonction et son champ vectoriel généré<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez cette opération lorsque vous n’avez plus besoin d’une fonction ou de son champ vectoriel généré, par exemple une fonction BM25 et son champ vectoriel creux généré.</p>
<p>Appelez <code translate="no">drop_function_field()</code> en indiquant le nom de la fonction. Milvus supprime la fonction, le champ vectoriel qu’elle génère et l’index associé, tout en conservant les champs d’entrée de la fonction.</p>
<p><strong>Exemple : suppression d’une fonction BM25 et de son champ vectoriel creux généré</strong></p>
<p>L’exemple suivant part du principe que ` <code translate="no">text_bm25</code> ` est une fonction BM25 dans ` <code translate="no">product_catalog</code> ` et génère un champ de sortie vectoriel creux nommé ` <code translate="no">text_sparse</code>`.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>Une fois l’opération réussie, <code translate="no">describe_collection()</code> ne renvoie plus la fonction supprimée ni son champ vectoriel généré. Les champs d’entrée de la fonction restent dans le schéma.</p>
<p>Si la suppression du champ de sortie de la fonction devait laisser la collection sans aucun champ vectoriel, l’opération est rejetée.</p>
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">Quelle méthode dois-je utiliser pour ajouter un champ ou une fonction ?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilisez <code translate="no">add_collection_field()</code> pour ajouter un champ scalaire ou vectoriel défini par l’utilisateur.</p>
<p>Utilisez ` <code translate="no">add_collection_struct_field()</code> ` pour ajouter un champ `StructArray` lorsque vous avez besoin d’un champ de type tableau dont les éléments partagent le même schéma `Struct`.</p>
<p>Utilisez ` <code translate="no">add_function_field()</code> ` pour ajouter une fonction, son champ vectoriel généré et la définition d’index liée au cours de la même modification de schéma.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">Pourquoi les champs définis par l’utilisateur ajoutés doivent-ils être nullables ?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>Les entités existantes ont été insérées avant la création du nouveau champ ; elles ne disposent donc pas de valeurs pour ce champ. En définissant ` <code translate="no">nullable=True</code> `, Milvus représente la valeur manquante comme ` <code translate="no">NULL</code> ` jusqu’à ce que votre application écrive une valeur ou, pour les champs scalaires, jusqu’à ce qu’une valeur par défaut s’applique.</p>
<p>Cette règle s’applique aux champs scalaires définis par l’utilisateur et aux champs vectoriels définis par l’utilisateur ajoutés avec l’ <code translate="no">add_collection_field()</code>, ainsi qu’aux champs StructArray ajoutés avec l’ <code translate="no">add_collection_struct_field()</code>. Elle ne s’applique pas au champ vectoriel généré par une fonction, qui ne peut pas être nul.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">Que deviennent les entités existantes après l’ajout d’un champ défini par l’utilisateur ?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour un champ scalaire défini par l’utilisateur, les entités existantes renvoient <code translate="no">NULL</code>, sauf si vous définissez un <code translate="no">default_value</code>. Si vous définissez un <code translate="no">default_value</code>, les entités existantes renvoient cette valeur par défaut.</p>
<p>Pour un champ vectoriel défini par l’utilisateur, les entités existantes ont la valeur « <code translate="no">NULL</code> » pour le nouveau champ vectoriel. La recherche vectorielle sur le champ ajouté ignore les entités dont la valeur vectorielle est « <code translate="no">NULL</code> ». Pour rendre les entités existantes consultables via le nouveau champ vectoriel, écrivez des valeurs vectorielles non nulles via un « upsert » ou un workflow de remplissage. Les nouvelles entités peuvent inclure le nouveau champ vectoriel lors de l’insertion.</p>
<p>Pour un champ StructArray, les entités existantes renvoient des valeurs « <code translate="no">NULL</code> » pour le nouveau champ StructArray dans tous ses sous-champs. Les nouvelles entités doivent fournir soit la valeur « <code translate="no">NULL</code> » pour tous les sous-champs, soit des valeurs valides pour tous les sous-champs.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">Puis-je ajouter la recherche lexicale BM25 à une collection existante ?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Oui. Si la collection dispose déjà d’un champ « <code translate="no">VARCHAR</code> » avec l’analyseur activé, vous pouvez ajouter une fonction BM25 et son champ vectoriel clairsemé généré pour la recherche lexicale. Dans ce workflow, Milvus ajoute la fonction, le nouveau champ de sortie « <code translate="no">SPARSE_FLOAT_VECTOR</code> » et la définition d’index lié au sein d’une même modification de schéma. Vous ne pouvez pas utiliser un champ « <code translate="no">TEXT</code> » existant comme entrée BM25 dans ce workflow de modification de schéma. Pour utiliser une entrée « <code translate="no">TEXT</code> », définissez le champ et la fonction BM25 lors de la création de la collection.</p>
<p>Lorsque vous appelez ` <code translate="no">add_function_field()</code>`, fournissez un objet ` <code translate="no">index_params</code> ` contenant un index ` <code translate="no">SPARSE_INVERTED_INDEX</code> ` avec ` <code translate="no">metric_type=&quot;BM25&quot;</code> ` pour le nouveau champ de sortie. Milvus lie la définition de l’index au champ généré dans le cadre de la même modification de schéma.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">Comment supprimer une fonction et son champ vectoriel généré ?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Appelez la méthode <code translate="no">drop_function_field()</code> en lui passant le nom de la fonction. Dans ce workflow de modification de schéma, Milvus supprime simultanément la fonction, son champ vectoriel généré et l’index associé, tout en conservant les champs d’entrée de la fonction.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">Dois-je attendre après avoir modifié le schéma d’une collection ?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>En général, aucun délai d’attente manuel n’est nécessaire. Si votre opération suivante dépend du schéma mis à jour, vous pouvez d’abord appeler ` <code translate="no">describe_collection()</code> ` pour vérifier le schéma actuellement renvoyé par Milvus.</p>
<p>Dans un déploiement distribué, il peut y avoir un court délai de propagation pendant que les composants Milvus actualisent les métadonnées de la collection. Si une opération effectuée immédiatement après la modification du schéma échoue en raison d’une erreur liée au schéma, actualisez le schéma et réessayez l’opération.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">Quand l’espace de stockage est-il libéré après la suppression d’un champ ?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>La suppression d’un champ le retire du schéma actuel et de la visibilité normale des requêtes/recherches, mais les données historiques de ce champ ne sont pas immédiatement supprimées physiquement du stockage d’objets.</p>
<p>L’espace de stockage peut être libéré ultérieurement lors de la compaction. La compaction est un processus en arrière-plan qui réorganise les fichiers de données existants en de nouveaux fichiers plus compacts. Une fois un champ supprimé, les fichiers nouvellement compactés respectent le schéma actuel et omettent le champ supprimé. Milvus ne garantit pas une réduction immédiate ou dans un délai fixe de l’espace de stockage après la suppression d’un champ.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">Que se passe-t-il si j’ajoute un champ scalaire portant le même nom qu’une clé de champ dynamique ?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Si les champs dynamiques sont activés, vous pouvez ajouter un champ scalaire portant le même nom qu’une clé de champ dynamique existante. Le nouveau champ scalaire masque la clé de champ dynamique dans le résultat normal de la requête, mais les données dynamiques d’origine sont conservées dans <code translate="no">$meta</code>.</p>
<p>Par exemple, si des entités existantes stockent une clé dynamique nommée <code translate="no">source</code> et que vous ajoutez par la suite un champ scalaire nommé <code translate="no">source</code>, le résultat normal de la requête <code translate="no">source</code> fait référence au champ scalaire. Pour accéder à la valeur dynamique d’origine, utilisez la syntaxe de chemin <code translate="no">$meta</code>, par exemple <code translate="no">$meta[&quot;source&quot;]</code>.</p>
