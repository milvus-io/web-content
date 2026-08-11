---
id: schema.md
title: Le schéma expliqué
summary: >-
  Un schéma définit la structure des données d'une collection. Avant de créer
  une collection, vous devez élaborer la conception de son schéma. Cette page
  vous aide à comprendre le schéma d'une collection et à concevoir vous-même un
  exemple de schéma.
---
<h1 id="Schema-Explained" class="common-anchor-header">Le schéma expliqué<button data-href="#Schema-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Un schéma définit la structure des données d'une collection. Avant de créer une collection, vous devez élaborer la conception de son schéma. Cette page vous aide à comprendre le schéma d'une collection et à concevoir vous-même un exemple de schéma.</p>
<h2 id="Overview" class="common-anchor-header">Présentation<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Sur Milvus, le schéma d’une collection correspond à une table dans une base de données relationnelle, qui définit la manière dont Milvus organise les données au sein de la collection.</p>
<p>Un schéma bien conçu est essentiel, car il permet d’abstraire le modèle de données et détermine si vous pouvez atteindre vos objectifs métier grâce à la recherche. De plus, comme chaque ligne de données insérée dans la collection doit respecter le schéma, cela contribue à maintenir la cohérence des données et leur qualité à long terme. D’un point de vue technique, un schéma bien défini permet un stockage bien organisé des données par colonnes et une structure d’index plus épurée, ce qui améliore les performances de recherche.</p>
<p>Un schéma de collection comporte une clé primaire, au moins un champ vectoriel et plusieurs champs scalaires. Le diagramme suivant illustre comment mapper un article à une liste de champs du schéma.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/schema-design-anatomy.png" alt="Schema Design Anatomy" class="doc-image" id="schema-design-anatomy" /> 
   <span>Anatomie de la conception d’un schéma</span>
  
 </span></p>
<p>La conception du modèle de données d’un système de recherche implique l’analyse des besoins métier et l’abstraction des informations en un modèle de données exprimé sous forme de schéma. Par exemple, la recherche d’un passage de texte doit être « indexée » en convertissant la chaîne de caractères littérale en vecteur via un « embedding » et en activant la recherche vectorielle. Au-delà de cette exigence essentielle, il peut s’avérer nécessaire de stocker d’autres propriétés telles que l’horodatage de publication et l’auteur. Ces métadonnées permettent d’affiner les recherches sémantiques par filtrage, en ne renvoyant que les textes publiés après une date spécifique ou par un auteur particulier. Vous pouvez également récupérer ces valeurs scalaires avec le texte principal pour afficher le résultat de la recherche dans l’application. Chacune doit se voir attribuer un identifiant unique, exprimé sous forme d’entier ou de chaîne de caractères, afin d’organiser ces extraits de texte. Ces éléments sont essentiels pour mettre en œuvre une logique de recherche sophistiquée.</p>
<p>Consultez le guide <a href="/docs/fr/schema-hands-on.md">pratique « Conception de schémas</a> » pour découvrir comment créer un schéma bien conçu.</p>
<h2 id="Create-Schema" class="common-anchor-header">Créer un schéma<button data-href="#Create-Schema" class="anchor-icon" translate="no">
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
    </button></h2><p>L'extrait de code suivant montre comment créer un schéma.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

schema = MilvusClient.create_schema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> schema = []
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>

schema := entity.NewSchema()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    &quot;fields&quot;: []
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Primary-Field" class="common-anchor-header">Ajouter un champ principal<button data-href="#Add-Primary-Field" class="anchor-icon" translate="no">
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
    </button></h2><p>Le champ principal d'une collection identifie de manière unique une entité. Il n'accepte que des valeurs <strong>de type Int64</strong> ou <strong>VARCHAR</strong>. Les extraits de code suivants montrent comment ajouter le champ principal.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    datatype=DataType.INT64,
<span class="highlighted-comment-line">    is_primary=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    auto_id=<span class="hljs-literal">False</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq; 

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
        .dataType(DataType.Int64)
<span class="highlighted-comment-line">        .isPrimaryKey(<span class="hljs-literal">true</span>)</span>
<span class="highlighted-comment-line">        .autoID(<span class="hljs-literal">false</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
<span class="highlighted-comment-line">    WithIsPrimaryKey(<span class="hljs-literal">true</span>).</span>
<span class="highlighted-comment-line">    WithIsAutoID(<span class="hljs-literal">false</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_id&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;,
    &quot;isPrimary&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        $primaryField
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Lors de l'ajout d'un champ, vous pouvez explicitement le désigner comme champ principal en définissant sa propriété ` <code translate="no">is_primary</code> ` sur ` <code translate="no">True</code>`. Par défaut, un champ principal accepte les valeurs <strong>de type `Int64`</strong>. Dans ce cas, la valeur du champ principal doit être un nombre entier, comme dans l'exemple suivant : ` <code translate="no">12345</code>`. Si vous choisissez d'utiliser des valeurs <strong>de type `VARCHAR`</strong> dans le champ principal, la valeur doit être une chaîne de caractères, comme dans l'exemple suivant : ` <code translate="no">my_entity_1234</code>`.</p>
<p>Vous pouvez également définir les propriétés <code translate="no">autoId</code> sur <code translate="no">True</code> afin que Milvus attribue automatiquement des valeurs aux champs primaires lors de l’insertion de données.</p>
<div class="alert note">
<p>Il est recommandé de recourir à « <code translate="no">autoId</code> » dans tous les cas, sauf si la définition manuelle des clés primaires présente un avantage.</p>
</div>
<p>Pour plus de détails, consultez les sections « <a href="/docs/fr/primary-field.md">Champ principal » et « AutoId</a> ».</p>
<h2 id="Add-Vector-Fields" class="common-anchor-header">Ajouter des champs vectoriels<button data-href="#Add-Vector-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Les champs vectoriels acceptent divers encodages vectoriels clairsemés et denses. Sur Milvus, vous pouvez ajouter quatre champs vectoriels à une collection. Les extraits de code suivants montrent comment ajouter un champ vectoriel.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">5</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
        .dataType(DataType.FloatVector)
<span class="highlighted-wrapper-line">        .dimension(<span class="hljs-number">5</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
<span class="highlighted-wrapper-line">    WithDim(<span class="hljs-number">5</span>),</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_vector&quot;,
    &quot;dataType&quot;: &quot;FloatVector&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;dim&quot;: 5
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le paramètre ` <code translate="no">dim</code> ` dans les extraits de code ci-dessus indique la dimensionnalité des représentations vectorielles à stocker dans le champ vectoriel. La valeur ` <code translate="no">FLOAT_VECTOR</code> ` indique que le champ vectoriel contient une liste de nombres à virgule flottante de 32 bits, généralement utilisés pour représenter des antilogarithmes. En outre, Milvus prend également en charge les types de représentations vectorielles suivants :</p>
<ul>
<li><p><code translate="no">FLOAT16_VECTOR</code></p>
<p>Un champ vectoriel de ce type contient une liste de nombres à virgule flottante de demi-précision sur 16 bits et s’applique généralement à des scénarios d’apprentissage profond ou de calcul sur GPU soumis à des contraintes de mémoire ou de bande passante.</p></li>
<li><p><code translate="no">BFLOAT16_VECTOR</code></p>
<p>Un champ vectoriel de ce type contient une liste de nombres à virgule flottante de 16 bits dont la précision est réduite, mais qui possèdent la même plage d’exposants que Float32. Ce type de données est couramment utilisé dans les scénarios d’apprentissage profond, car il réduit l’utilisation de la mémoire sans affecter significativement la précision.</p></li>
<li><p><code translate="no">INT8_VECTOR</code></p>
<p>Un champ vectoriel de ce type stocke des vecteurs composés d’entiers signés de 8 bits (int8), chaque composante étant comprise entre –128 et 127. Conçu pour les architectures d’apprentissage profond quantifiées — telles que ResNet et EfficientNet —, il réduit considérablement la taille du modèle et accélère la vitesse d’inférence, tout en n’entraînant qu’une perte de précision minime. <strong>Remarque</strong>: ce type de vecteur n’est pris en charge que pour les index HNSW.</p></li>
<li><p><code translate="no">BINARY_VECTOR</code></p>
<p>Un champ vectoriel de ce type contient une liste de 0 et de 1. Ces éléments servent de caractéristiques compactes pour représenter les données dans des scénarios de traitement d’images et de recherche d’informations.</p></li>
<li><p><code translate="no">SPARSE_FLOAT_VECTOR</code></p>
<p>Un champ vectoriel de ce type contient une liste de nombres non nuls et leurs numéros d’ordre pour représenter des plongements vectoriels clairsemés.</p></li>
</ul>
<h2 id="Add-Scalar-Fields" class="common-anchor-header">Ajouter des champs scalaires<button data-href="#Add-Scalar-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans la plupart des cas, vous pouvez utiliser des champs scalaires pour stocker les métadonnées des représentations vectorielles enregistrées dans Milvus, et effectuer des recherches ANN avec filtrage par métadonnées afin d’améliorer la pertinence des résultats de recherche. Milvus prend en charge plusieurs types de champs scalaires, notamment <strong>VARCHAR</strong>, <strong>Boolean</strong>, <strong>Int</strong>, <strong>Float</strong> et <strong>Double</strong>.</p>
<h3 id="Add-VARCHAR-Fields" class="common-anchor-header">Ajouter des champs VARCHAR<button data-href="#Add-VARCHAR-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Dans Milvus, vous pouvez utiliser des champs « <code translate="no">VARCHAR</code> » pour stocker des chaînes de caractères. Pour en savoir plus sur le champ « <code translate="no">VARCHAR</code> », consultez la section <a href="/docs/fr/string.md">Champ VARCHAR</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
    datatype=DataType.VARCHAR,
<span class="highlighted-wrapper-line">    max_length=<span class="hljs-number">512</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
<span class="highlighted-wrapper-line">        .maxLength(<span class="hljs-number">512</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span></span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithMaxLength(<span class="hljs-number">512</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> varCharField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_varchar&quot;,
    &quot;dataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Number-Fields" class="common-anchor-header">Ajouter des champs numériques<button data-href="#Add-Number-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Les types de nombres pris en charge par Milvus sont : <code translate="no">Int8</code>, <code translate="no">Int16</code>, <code translate="no">Int32</code>, <code translate="no">Int64</code>, <code translate="no">Float</code> et <code translate="no">Double</code>. Pour en savoir plus sur les champs numériques, consultez la section <a href="/docs/fr/number.md">Champ numérique</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_int64&quot;</span>,
    datatype=DataType.INT64,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_int64&quot;</span>)
        .dataType(DataType.Int64)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_int64&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_int64&quot;</span>).
    WithDataType(entity.FieldTypeInt64),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_int64&quot;,
    &quot;dataType&quot;: &quot;Int64&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Boolean-Fields" class="common-anchor-header">Ajouter des champs booléens<button data-href="#Add-Boolean-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus prend en charge les champs booléens. Les extraits de code suivants montrent comment ajouter un champ booléen.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_bool&quot;</span>,
    datatype=DataType.BOOL,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_bool&quot;</span>)
        .dataType(DataType.Bool)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_bool&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Boolean</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_bool&quot;</span>).
    WithDataType(entity.FieldTypeBool),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> boolField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_bool&quot;,
    &quot;dataType&quot;: &quot;Boolean&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Add-Composite-Fields" class="common-anchor-header">Ajouter des champs composites<button data-href="#Add-Composite-Fields" class="anchor-icon" translate="no">
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
    </button></h2><p>Dans Milvus, un champ composite est un champ qui peut être divisé en sous-champs plus petits, tels que les clés d'un champ JSON ou les indices d'un champ Array.</p>
<h3 id="Add-JSON-fields" class="common-anchor-header">Ajouter des champs JSON<button data-href="#Add-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Un champ JSON stocke généralement des données JSON semi-structurées. Pour en savoir plus sur les champs JSON, consultez la section <a href="/docs/fr/json-field">Champ JSON</a>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_json&quot;</span>,
    datatype=DataType.JSON,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_json&quot;</span>)
        .dataType(DataType.JSON)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_json&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_json&quot;</span>).
    WithDataType(entity.FieldTypeJSON),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> jsonField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_json&quot;,
    &quot;dataType&quot;: &quot;JSON&quot;
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Add-Array-Fields" class="common-anchor-header">Ajouter des champs de type « Array »<button data-href="#Add-Array-Fields" class="anchor-icon" translate="no">
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
    </button></h3><p>Un champ de type tableau stocke une liste d'éléments. Les types de données de tous les éléments d'un champ de type tableau doivent être identiques. Pour en savoir plus sur les champs de type tableau, consultez la section « <a href="/docs/fr/array_data_type.md">Champ de type tableau</a> ».</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;my_array&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=<span class="hljs-number">5</span>,
    max_length=<span class="hljs-number">512</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_array&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(<span class="hljs-number">5</span>)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">schema.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_array&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Array</span>,
    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">schema.WithField(entity.NewField().WithName(<span class="hljs-string">&quot;my_array&quot;</span>).
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxLength(<span class="hljs-number">512</span>).
    WithMaxCapacity(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> arrayField=<span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;my_array&quot;,
    &quot;dataType&quot;: &quot;Array&quot;,
    &quot;elementDataType&quot;: &quot;VarChar&quot;,
    &quot;elementTypeParams&quot;: {
        &quot;max_length&quot;: 512
    }
}&#x27;</span>

<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{
    \&quot;autoID\&quot;: false,
    \&quot;fields\&quot;: [
        <span class="hljs-variable">$primaryField</span>,
        <span class="hljs-variable">$vectorField</span>,
        <span class="hljs-variable">$varCharField</span>,
        <span class="hljs-variable">$int64Field</span>,
        <span class="hljs-variable">$boolField</span>,
        <span class="hljs-variable">$jsonField</span>,
        <span class="hljs-variable">$arrayField</span>
    ]
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
