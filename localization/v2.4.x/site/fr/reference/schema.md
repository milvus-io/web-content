---
id: schema.md
summary: Apprenez à définir un schéma dans Milvus.
title: Gérer les schémas
---
<h1 id="Manage-Schema" class="common-anchor-header">Gérer les schémas<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Cette rubrique présente le schéma dans Milvus. Le schéma est utilisé pour définir les propriétés d'une collection et les champs qu'elle contient.</p>
<h2 id="Field-schema" class="common-anchor-header">Schéma de champ<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Un schéma de champ est la définition logique d'un champ. C'est la première chose à définir avant de définir un <a href="#Collection-schema">schéma de collection</a> et de <a href="/docs/fr/v2.4.x/manage-collections.md">gérer les collections</a>.</p>
<p>Milvus ne prend en charge qu'un seul champ de clé primaire dans une collection.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Propriétés du schéma de champ</h3><table class="properties">
    <thead>
    <tr>
        <th>Propriétés</th>
        <th>Description du champ</th>
        <th>Remarque</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Nom du champ à créer dans la collection</td>
        <td>Type de données : Chaîne.<br/>Obligatoire</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Type de données du champ</td>
        <td>Obligatoire</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Description du champ</td>
        <td>Type de données : Chaîne.<br/>Facultatif</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Indiquer si le champ doit être défini comme champ de clé primaire ou non.</td>
        <td>Type de données : Booléen (<code translate="no">true</code> ou <code translate="no">false</code>).<br/>Obligatoire pour le champ de clé primaire</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Obligatoire pour le champ de clé primaire)</td>
            <td>Permet d'activer ou de désactiver l'attribution automatique de l'ID (clé primaire).</td>
            <td><code translate="no">True</code> ou <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Obligatoire pour le champ VARCHAR)</td>
            <td>Longueur maximale en octets des chaînes autorisées à être insérées. Notez que les caractères multioctets (par exemple, les caractères Unicode) peuvent occuper plus d'un octet chacun. Veillez donc à ce que la longueur en octets des chaînes insérées ne dépasse pas la limite spécifiée.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimension du vecteur</td>
            <td>Type de données : Entier &isin; [1, 32768].<br/>Obligatoire pour un champ vectoriel dense. Omettre pour un champ <a href="https://milvus.io/docs/sparse_vector.md">vectoriel peu dense</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Indique s'il s'agit d'un champ de clés de partition.</td>
        <td>Type de données : Booléen (<code translate="no">true</code> ou <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Création d'un schéma de champ</h3><p>Pour réduire la complexité des insertions de données, Milvus vous permet de spécifier une valeur par défaut pour chaque champ scalaire lors de la création d'un schéma de champ, à l'exception du champ de clé primaire. Cela signifie que si vous laissez un champ vide lors de l'insertion de données, la valeur par défaut que vous avez spécifiée pour ce champ s'applique.</p>
<p>Créer un schéma de champ normal :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Créez un schéma de champ avec des valeurs de champ par défaut :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Types de données pris en charge</h3><p><code translate="no">DataType</code> définit le type de données qu'un champ contient. Différents champs prennent en charge différents types de données.</p>
<ul>
<li><p>Le champ clé primaire prend en charge :</p>
<ul>
<li>INT64 : numpy.int64</li>
<li>VARCHAR : VARCHAR</li>
</ul></li>
<li><p>Le champ scalaire prend en charge</p>
<ul>
<li>BOOL : booléen (<code translate="no">true</code> ou <code translate="no">false</code>)</li>
<li>INT8 : numpy.int8</li>
<li>INT16 : numpy.int16</li>
<li>INT32 : numpy.int32</li>
<li>INT64 : numpy.int64</li>
<li>FLOAT : numpy.float32</li>
<li>DOUBLE : numpy.double</li>
<li>VARCHAR : VARCHAR</li>
<li>JSON : <a href="/docs/fr/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array : <a href="/docs/fr/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>JSON est disponible en tant que type de données composite. Un champ JSON comprend des paires clé-valeur. Chaque clé est une chaîne de caractères et une valeur peut être un nombre, une chaîne de caractères, une valeur booléenne, un tableau ou une liste. Pour plus de détails, voir <a href="/docs/fr/v2.4.x/use-json-fields.md">JSON : un nouveau type de données</a>.</p></li>
<li><p>Prise en charge des champs vectoriels :</p>
<ul>
<li>BINARY_VECTOR : stocke les données binaires sous la forme d'une séquence de 0 et de 1. Il est utilisé pour la représentation compacte des caractéristiques dans le traitement des images et la recherche d'informations.</li>
<li>FLOAT_VECTOR : stocke les nombres à virgule flottante de 32 bits, couramment utilisés dans l'informatique scientifique et l'apprentissage automatique pour représenter les nombres réels.</li>
<li>FLOAT16_VECTOR : stocke des nombres à virgule flottante de 16 bits en demi-précision, utilisés dans l'apprentissage profond et les calculs GPU pour l'efficacité de la mémoire et de la bande passante.</li>
<li>BFLOAT16_VECTOR : Stocke les nombres à virgule flottante de 16 bits avec une précision réduite mais la même plage d'exposants que Float32, populaire dans l'apprentissage profond pour réduire les exigences de mémoire et de calcul sans avoir un impact significatif sur la précision.</li>
<li>SPARSE_FLOAT_VECTOR : stocke une liste d'éléments non nuls et leurs indices correspondants, utilisés pour représenter des vecteurs épars. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/sparse_vector.md">Vecteurs épars</a>.</li>
</ul>
<p>Milvus prend en charge plusieurs champs de vecteurs dans une collection. Pour plus d'informations, voir <a href="/docs/fr/v2.4.x/multi-vector-search.md">Recherche hybride</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Schéma de collection<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Un schéma de collection est la définition logique d'une collection. En général, vous devez définir le <a href="#Field-schema">schéma des champs</a> avant de définir un schéma de collection et de <a href="/docs/fr/v2.4.x/manage-collections.md">gérer les collections</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Propriétés du schéma de collection</h3><table class="properties">
    <thead>
    <tr>
        <th>Propriétés</th>
        <th>Description de la collection</th>
        <th>Remarque</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Champs de la collection à créer</td>
        <td>Obligatoire</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Description de la collection</td>
        <td>Type de données : Chaîne.<br/>Facultatif</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Nom d'un champ destiné à jouer le rôle de clé de partition.</td>
        <td>Type de données : Chaîne.<br/>Facultatif</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Activation ou non du schéma dynamique</td>
        <td>Type de données : Booléen (<code translate="no">true</code> ou <code translate="no">false</code>).<br/>Facultatif, valeur par défaut : <code translate="no">False</code>.<br/>Pour plus d'informations sur le schéma dynamique, reportez-vous à <a herf="enable-dynamic-field.md">Schéma dynamique</a> et aux guides de l'utilisateur pour la gestion des collections.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Créer un schéma de collection</h3><div class="alert note">
  Définissez les schémas de champ avant de définir un schéma de collection.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Créez une collection avec le schéma spécifié :</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Vous pouvez définir le numéro de dépôt avec <code translate="no">shards_num</code>.</li>
<li>Vous pouvez définir le serveur Milvus sur lequel vous souhaitez créer une collection en spécifiant l'alias dans <code translate="no">using</code>.</li>
<li>Vous pouvez activer la fonction de clé de partition sur un champ en définissant <code translate="no">is_partition_key</code> sur <code translate="no">True</code> sur le champ si vous devez mettre en œuvre une <a href="/docs/fr/v2.4.x/multi_tenancy.md">multi-location basée sur la clé de partition</a>.</li>
<li>Vous pouvez activer le schéma dynamique en remplaçant <code translate="no">enable_dynamic_field</code> par <code translate="no">True</code> dans le schéma de la collection si vous devez <a href="/docs/fr/v2.4.x/enable-dynamic-field.md">activer le champ dynamique</a>.</li>
</ul>
</div>
<p><br/>
Vous pouvez également créer une collection à l'aide de <code translate="no">Collection.construct_from_dataframe</code>, qui génère automatiquement un schéma de collection à partir de DataFrame et crée une collection.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> pandas <span class="hljs-keyword">as</span> pd
df = pd.DataFrame({
    <span class="hljs-string">&quot;id&quot;</span>: [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;age&quot;</span>: [random.randint(<span class="hljs-number">20</span>, <span class="hljs-number">40</span>) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;embedding&quot;</span>: [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    <span class="hljs-string">&quot;position&quot;</span>: <span class="hljs-string">&quot;test_pos&quot;</span>
})

collection, ins_res = Collection.construct_from_dataframe(
    <span class="hljs-string">&#x27;my_collection&#x27;</span>,
    df,
    primary_field=<span class="hljs-string">&#x27;id&#x27;</span>,
    auto_id=<span class="hljs-literal">False</span>
    )
<button class="copy-code-btn"></button></code></pre>
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
<li>Apprenez à préparer le schéma lors de la <a href="/docs/fr/v2.4.x/manage-collections.md">gestion des collections</a>.</li>
<li>En savoir plus sur le <a href="/docs/fr/v2.4.x/enable-dynamic-field.md">schéma dynamique</a>.</li>
<li>En savoir plus sur la clé de partition dans <a href="/docs/fr/v2.4.x/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
