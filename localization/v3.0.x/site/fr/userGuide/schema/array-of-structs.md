---
id: array-of-structs.md
title: Tableau de structures
summary: >-
  Utilisez les champs StructArray pour stocker des éléments Struct ordonnés avec
  un schéma partagé de champs vectoriels et scalaires.
---
<h1 id="StructArray" class="common-anchor-header">Tableau de structures<button data-href="#StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>Un champ de type "tableau de structures" (Array of Structs), ou "tableau de structures" (StructArray), dans une entité stocke un ensemble ordonné d'éléments de structures. Chaque structure du tableau partage le même schéma prédéfini, comprenant plusieurs vecteurs et champs scalaires.</p>
<p>Voici un exemple d'entité d'une collection contenant un champ StructArray.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
    &#x27;id&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
    &#x27;title&#x27;<span class="hljs-punctuation">:</span> &#x27;Walden&#x27;<span class="hljs-punctuation">,</span>
    &#x27;title_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.1</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    &#x27;author&#x27;<span class="hljs-punctuation">:</span> &#x27;Henry David Thoreau&#x27;<span class="hljs-punctuation">,</span>
    &#x27;year_of_publication&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-number">1845</span><span class="hljs-punctuation">,</span>
<span class="highlighted-comment-line">    &#x27;chunks&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;When I wrote the following pages<span class="hljs-punctuation">,</span> or rather the bulk of them...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.3</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.5</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">{</span></span>
<span class="highlighted-comment-line">            &#x27;text&#x27;<span class="hljs-punctuation">:</span> &#x27;I would fain say something<span class="hljs-punctuation">,</span> not so much concerning the Chinese and...&#x27;<span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;text_vector&#x27;<span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.4</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.2</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.7</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.8</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span></span>
<span class="highlighted-comment-line">            &#x27;chapter&#x27;<span class="hljs-punctuation">:</span> &#x27;Economy&#x27;</span>
<span class="highlighted-comment-line">        <span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line">    <span class="hljs-punctuation">]</span></span>
<span class="highlighted-comment-line">    <span class="hljs-comment">// hightlight-end</span></span>
<span class="highlighted-comment-line"><span class="hljs-punctuation">}</span></span>
<span class="highlighted-comment-line"></span><button class="copy-code-btn"></button></code></pre>
<p>Dans l'exemple ci-dessus, le champ <code translate="no">chunks</code> est un champ StructArray, et chaque élément Struct contient ses propres champs, à savoir <code translate="no">text</code>, <code translate="no">text_vector</code>, et <code translate="no">chapter</code>.</p>
<h2 id="When-to-use" class="common-anchor-header">Quand utiliser<button data-href="#When-to-use" class="anchor-icon" translate="no">
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
    </button></h2><p>Les applications modernes d'intelligence artificielle, de la conduite autonome à la recherche multimodale, s'appuient de plus en plus sur des données imbriquées et hétérogènes. Les modèles de données plats traditionnels peinent à représenter des relations complexes telles que<strong>"un document avec de nombreux morceaux annotés</strong>" ou<strong>"une scène de conduite avec de multiples manœuvres observées</strong>". C'est là que le type de données StructArray de Milvus se distingue.</p>
<p>Pour déterminer rapidement si le champ StructArray convient à vos scénarios d'application, examinez les points suivants :</p>
<ul>
<li><p>Vos données se présentent sous la forme d'une structure hiérarchique, telle qu'un document comportant de nombreux éléments annotés.</p></li>
<li><p>Le résultat de la recherche devrait être le document, plutôt que les morceaux, comme dans l'exemple ci-dessus.</p></li>
<li><p>Les résultats de la recherche contiennent un grand nombre d'entités dupliquées et vous avez du mal à récupérer les résultats finaux en utilisant des techniques telles que le regroupement, la déduplication et le reclassement.</p></li>
</ul>
<p>Si vous répondez par l'affirmative aux questions ci-dessus, vous devriez utiliser StructArray.</p>
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
    </button></h2><ul>
<li><p><strong>Types de données</strong></p>
<p>Lorsque vous créez une collection, vous pouvez utiliser le type Struct comme type de données pour les éléments d'un champ Array. Toutefois, il n'est pas possible d'ajouter un StructArray à une collection existante et Milvus ne prend pas en charge l'utilisation du type Struct comme type de données pour un champ de collection.</p>
<p>Les structures d'un champ Tableau partagent le même schéma, qui doit être défini lors de la création du champ Tableau.</p>
<p>Un schéma de structure contient à la fois des vecteurs et des champs scalaires, comme indiqué ci-dessous :</p>
<p><Grid columnSize="2" widthRatios="50,50"></p>
<pre><code translate="no">  &lt;div&gt;

      Applicable vector fields:

      - `FLOAT_VECTOR`

      - `FLOAT16_VECTOR`

      - `BFLOAT16_VECTOR`

      - `INT8_VECTOR`

      - `BINARY_VECTOR`

  &lt;/div&gt;

  &lt;div&gt;

      Applicable scalar fields:

      - `VARCHAR`

      - `INT8/16/32/64`

      - `FLOAT`

      - `DOUBLE`

      - `BOOL`

  &lt;/div&gt;
</code></pre>
<p></Grid></p>
<p>Le nombre de champs vectoriels au niveau de la collection et dans les structures combinées ne doit pas être supérieur ou égal à 10.</p></li>
<li><p><strong>Valeurs nulles et par défaut</strong></p>
<p>Un champ StructArray n'est pas nullable et n'accepte pas de valeur par défaut.</p></li>
<li><p><strong>Fonction</strong></p>
<p>Vous ne pouvez pas utiliser de fonction pour dériver un champ vectoriel d'un champ scalaire dans une structure.</p></li>
<li><p><strong>Type d'index et type métrique</strong></p>
<p>Tous les champs vectoriels d'une collection doivent être indexés. Pour indexer un champ vectoriel dans un champ StructArray, Milvus utilise une liste d'intégration pour organiser les intégrations vectorielles dans chaque élément Struct et indexe la liste d'intégration dans son ensemble.</p>
<p>Vous pouvez utiliser <code translate="no">AUTOINDEX</code> ou <code translate="no">HNSW</code> comme type d'index et n'importe quel type de métrique répertorié ci-dessous pour construire des index pour les listes d'intégration dans un champ StructArray.</p>
<p><table>
<tr>
<th><p>Type d'index</p></th>
<th><p>Type de métrique</p></th>
<th><p>Remarques</p></th>
</tr>
<tr>
<td rowspan="3"><ul><li><p><code translate="no">AUTOINDEX</code></p></li><li><p><code translate="no">HNSW</code></p></li><li><p><code translate="no">IVF_FLAT</code></p></li><li><p><code translate="no">DISKANN</code></p></li></ul></td>
<td rowspan="3"><ul><li><p><code translate="no">MAX_SIM_COSINE</code></p></li><li><p><code translate="no">MAX_SIM_IP</code></p></li><li><p><code translate="no">MAX_SIM_L2</code></p></li></ul></td>
<td rowspan="3"><p>Pour les listes d'inclusion des types suivants :</p><ul><li><p><code translate="no">FLOAT_VECTOR</code></p></li><li><p><code translate="no">FLOAT16_VECTOR</code></p></li><li><p><code translate="no">BFLOAT16_VECTOR</code></p></li><li><p><code translate="no">INT8_VECTOR</code></p></li><li><p><code translate="no">BINARY_VECTOR</code></p></li></ul></td>
</tr>
</table></p>
<p>Pour plus de détails sur la manière dont Milvus calcule la similarité entre la requête et une liste d'intégration, voir <a href="/docs/fr/metric.md#Maximum-similarity">Similarité maximale</a>.</p>
<p>Les champs scalaires du champ StructArray prennent en charge les types d'index suivants :</p>
<ul>
<li><p><code translate="no">INVERTED</code></p>
<p>Cela s'applique généralement aux filtres de type chaîne ou catégorique, comme <code translate="no">structA[color]</code> ou <code translate="no">structA[str_val]</code>. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/inverted.md">INVERTED</a>.</p></li>
<li><p><code translate="no">STL_SORT</code></p>
<p>Cela s'applique généralement aux accélérations de type plage ou ordre sur les valeurs numériques, comme <code translate="no">strctA[num_val]</code>. Pour plus de détails, voir <a href="/docs/fr/stl-sort.md">STL_SORT</a>.</p></li>
</ul></li>
<li><p><strong>Données d'insertion</strong></p>
<p>Les structures ne prennent pas en charge les insertions en mode fusion. Cependant, vous pouvez toujours effectuer des insertions en mode override pour mettre à jour les données dans les Structs. Pour plus d'informations sur les différences entre l'insertion en mode fusion et en mode remplacement, reportez-vous à <a href="/docs/fr/upsert-entities.md#Overview">Upsert Entities</a>.</p></li>
<li><p><strong>Filtrage scalaire</strong></p>
<p>Vous pouvez utiliser les <strong>filtres d'éléments</strong> et les <strong>opérateurs de la famille match</strong> pour effectuer un filtrage scalaire sur un sous-champ scalaire d'un champ StructArray. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/array-of-structs.md#Scalar-filtering-in-a-StructArray-field">Filtrage scalaire dans un champ StructArray</a>.</p></li>
</ul>
<h2 id="Add-a-StructArray" class="common-anchor-header">Ajouter un champ StructArray<button data-href="#Add-a-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour ajouter un champ StructArray dans Milvus, vous devez définir un champ de type tableau lors de la création d'une collection et définir le type de données de ses éléments sur Struct. La procédure est la suivante :</p>
<ol>
<li><p>Définir le type de données d'un champ sur <code translate="no">DataType.ARRAY</code> lors de l'ajout du champ en tant que champ tableau dans le schéma de la collection.</p></li>
<li><p>Attribuez la valeur <code translate="no">DataType.STRUCT</code> à l'attribut <code translate="no">element_type</code> de la rubrique pour en faire un tableau Struct.</p></li>
<li><p>Créez un schéma Struct et incluez les champs requis. Faites ensuite référence au schéma Struct dans l'attribut <code translate="no">struct_schema</code> du champ.</p></li>
<li><p>Attribuez à l'attribut <code translate="no">max_capacity</code> du champ une valeur appropriée pour spécifier le nombre maximum de structures que chaque entité peut contenir dans ce champ.</p></li>
<li><p><strong>(Facultatif</strong>) Vous pouvez définir <code translate="no">mmap.enabled</code> pour n'importe quel champ de l'élément Struct afin d'équilibrer les données chaudes et froides de la structure.</p></li>
</ol>
<p>Voici comment définir un schéma de collection comprenant un champ StructArray :</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

<span class="hljs-comment"># add the primary field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># add some scalar fields to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;author&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;year_of_publication&quot;</span>, datatype=DataType.INT64)

<span class="hljs-comment"># add a vector field to the collection</span>
schema.add_field(field_name=<span class="hljs-string">&quot;title_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create a struct schema</span></span>
<span class="highlighted-comment-line">struct_schema = client.create_struct_field_schema()</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a scalar field to the struct</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)</span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># add a vector field to the struct with mmap enabled</span></span>
<span class="highlighted-comment-line">struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)</span>
<span class="highlighted-comment-line"></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># reference the struct schema in an Array field with its </span></span>
<span class="highlighted-comment-line"><span class="hljs-comment"># element type set to `DataType.STRUCT`</span></span>
<span class="highlighted-comment-line">schema.add_field(<span class="hljs-string">&quot;chunks&quot;</span>, datatype=DataType.ARRAY, element_type=DataType.STRUCT, </span>
<span class="highlighted-comment-line">                    struct_schema=struct_schema, max_capacity=<span class="hljs-number">1000</span>)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">collectionSchema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">true</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;author&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;year_of_publication&quot;</span>)
        .dataType(DataType.Int64)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());

Map&lt;String, String&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;mmap_enabled&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);
collectionSchema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;chunks&quot;</span>)
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(<span class="hljs-number">1000</span>)
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">65535</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;chapter&quot;</span>)
                .dataType(DataType.VarChar)
                .maxLength(<span class="hljs-number">512</span>)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName(<span class="hljs-string">&quot;text_vector&quot;</span>)
                .dataType(DataType.FloatVector)
                .dimension(VECTOR_DIM)
                .typeParams(params)
                .build())
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> milvusClient = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>);

<span class="hljs-keyword">const</span> schema = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">true</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;author&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,
    <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;year_of_publication&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">INT64</span>,
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,
    <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">ARRAY</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">element_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">STRUCT</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">fields</span>: [</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">65535</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;chapter&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VARCHAR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">      {</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text_vector&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FLOAT_VECTOR</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">mmap_enabled</span>: <span class="hljs-literal">true</span>,</span>
<span class="highlighted-comment-line">      },</span>
<span class="highlighted-comment-line">    ],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">max_capacity</span>: <span class="hljs-number">1000</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
SCHEMA=<span class="hljs-string">&#x27;{
  &quot;autoID&quot;: true,
  &quot;fields&quot;: [
    {
      &quot;fieldName&quot;: &quot;id&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;,
      &quot;isPrimary&quot;: true
    },
    {
      &quot;fieldName&quot;: &quot;title&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;author&quot;,
      &quot;dataType&quot;: &quot;VarChar&quot;,
      &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
    },
    {
      &quot;fieldName&quot;: &quot;year_of_publication&quot;,
      &quot;dataType&quot;: &quot;Int64&quot;
    },
    {
      &quot;fieldName&quot;: &quot;title_vector&quot;,
      &quot;dataType&quot;: &quot;FloatVector&quot;,
      &quot;elementTypeParams&quot;: { &quot;dim&quot;: &quot;5&quot; }
    }
  ],
  &quot;structArrayFields&quot;: [
    {
      &quot;name&quot;: &quot;chunks&quot;,
      &quot;description&quot;: &quot;Array of document chunks with text and vectors&quot;,
      &quot;elementTypeParams&quot;:{
         &quot;max_capacity&quot;: 1000
      },
      &quot;fields&quot;: [
        {
          &quot;fieldName&quot;: &quot;text&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;65535&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;chapter&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;elementTypeParams&quot;: { &quot;max_length&quot;: &quot;512&quot; }
        },
        {
          &quot;fieldName&quot;: &quot;text_vector&quot;,
          &quot;dataType&quot;: &quot;FloatVector&quot;,
          &quot;elementTypeParams&quot;: {
            &quot;dim&quot;: &quot;5&quot;,
            &quot;mmap_enabled&quot;: &quot;true&quot;
          }
        }
      ]
    }
  ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Les lignes surlignées dans l'exemple de code ci-dessus illustrent la manière d'inclure un StructArray dans un schéma de collection.</p>
<h2 id="Set-index-params" class="common-anchor-header">Paramètres d'indexation<button data-href="#Set-index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>L'indexation est obligatoire pour tous les champs vectoriels, y compris les champs vectoriels de la collection et ceux définis dans l'élément Struct.</p>
<p>Les paramètres d'index applicables varient selon le type d'index. Pour plus de détails sur les paramètres d'index applicables, reportez-vous à <a href="/docs/fr/index-explained.md">Index Explained</a> et à la documentation du type d'index sélectionné.</p>
<h3 id="Index-an-embedding-list" class="common-anchor-header">Indexer une liste d'inclusion<button data-href="#Index-an-embedding-list" class="anchor-icon" translate="no">
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
    </button></h3><p>Pour indexer une liste d'intégration, vous devez définir son type d'index sur <code translate="no">AUTOINDEX</code> ou sur l'un des types d'index applicables répertoriés ci-dessus, et utiliser un type de métrique répertorié pour Milvus afin de mesurer les similitudes entre les listes d'intégration.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># Create an index for the vector field in the collection</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
)

<span class="highlighted-comment-line"><span class="hljs-comment"># Create an index for the vector field in the element Struct</span></span>
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;title_vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.MAX_SIM_COSINE)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
});

<span class="hljs-keyword">const</span> indexParams = [
  {
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span>,
  },
<span class="highlighted-comment-line">  {</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,</span>
<span class="highlighted-comment-line">  },</span>
];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
INDEX_PARAMS=<span class="hljs-string">&#x27;[
  {
    &quot;fieldName&quot;: &quot;title_vector&quot;,
    &quot;indexName&quot;: &quot;title_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;L2&quot;
  },
  {
    &quot;fieldName&quot;: &quot;chunks[text_vector]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
    &quot;metricType&quot;: &quot;MAX_SIM_COSINE&quot;
  }
]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Index-a-scalar-struct-sub-field" class="common-anchor-header">Indexer un sous-champ d'une structure scalaire<button data-href="#Index-a-scalar-struct-sub-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Lorsque vous créez des index sur un sous-champ struct scalaire, Milvus construit en fait l'index au <strong>niveau de l'élément</strong>, et non de la ligne, pour accélérer le filtrage scalaire.</p>
<p>L'extrait de code suivant crée un index sur un sous-champ struct scalaire nommé <code translate="no">chunks[text]</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[text]&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;chunks[text]&quot;</span>)
        .indexType(IndexParam.IndexType.INVERTED)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;chunks[text]&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">INDEX_PARAMS += <span class="hljs-string">&#x27;{
    &quot;fieldName&quot;: &quot;chunks[text]&quot;,
    &quot;indexName&quot;: &quot;chunks_text_vector_index&quot;,
    &quot;indexType&quot;: &quot;INVERTED&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-a-collection" class="common-anchor-header">Créer une collection<button data-href="#Create-a-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que le schéma et l'index sont prêts, vous pouvez créer une collection qui inclut un champ StructArray.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(collectionSchema)
        .indexParams(indexParams)
        .build();
client.createCollection(requestCreate);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
  <span class="hljs-attr">fields</span>: schema,
  <span class="hljs-attr">indexes</span>: indexParams,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/collections/create&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;description\&quot;: \&quot;A collection for storing book information with struct array chunks\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$SCHEMA</span>,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$INDEX_PARAMS</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data" class="common-anchor-header">Insérer des données<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Après avoir créé la collection, vous pouvez insérer des données qui comprennent des tableaux de structures comme suit.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Sample data</span>
data = {
    <span class="hljs-string">&#x27;title&#x27;</span>: <span class="hljs-string">&#x27;Walden&#x27;</span>,
    <span class="hljs-string">&#x27;title_vector&#x27;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-string">&#x27;author&#x27;</span>: <span class="hljs-string">&#x27;Henry David Thoreau&#x27;</span>,
    <span class="hljs-string">&#x27;year_of_publication&#x27;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-string">&#x27;chunks&#x27;</span>: [
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;When I wrote the following pages, or rather the bulk of them...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>,
        },
        {
            <span class="hljs-string">&#x27;text&#x27;</span>: <span class="hljs-string">&#x27;I would fain say something, not so much concerning the Chinese and...&#x27;</span>,
            <span class="hljs-string">&#x27;text_vector&#x27;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
            <span class="hljs-string">&#x27;chapter&#x27;</span>: <span class="hljs-string">&#x27;Economy&#x27;</span>
        }
    ]
}

<span class="hljs-comment"># insert data</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[data]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonArray;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;title&quot;</span>, <span class="hljs-string">&quot;Walden&quot;</span>);
row.add(<span class="hljs-string">&quot;title_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>)));
row.addProperty(<span class="hljs-string">&quot;author&quot;</span>, <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>);
row.addProperty(<span class="hljs-string">&quot;year_of_publication&quot;</span>, <span class="hljs-number">1845</span>);

<span class="hljs-type">JsonArray</span> <span class="hljs-variable">structArr</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonArray</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>);
struct1.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>)));
struct1.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct1);
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">struct2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
struct2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>);
struct2.add(<span class="hljs-string">&quot;text_vector&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.7f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>)));
struct2.addProperty(<span class="hljs-string">&quot;chapter&quot;</span>, <span class="hljs-string">&quot;Economy&quot;</span>);
structArr.add(struct2);

row.add(<span class="hljs-string">&quot;chunks&quot;</span>, structArr);

<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">  {
    <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">&quot;Walden&quot;</span>,
    <span class="hljs-attr">title_vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>],
    <span class="hljs-attr">author</span>: <span class="hljs-string">&quot;Henry David Thoreau&quot;</span>,
    <span class="hljs-string">&quot;year-of-publication&quot;</span>: <span class="hljs-number">1845</span>,
    <span class="hljs-attr">chunks</span>: [
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
      {
        <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
        <span class="hljs-attr">text_vector</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>],
        <span class="hljs-attr">chapter</span>: <span class="hljs-string">&quot;Economy&quot;</span>,
      },
    ],
  },
];

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/insert&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {
        &quot;title&quot;: &quot;Walden&quot;,
        &quot;title_vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
        &quot;author&quot;: &quot;Henry David Thoreau&quot;,
        &quot;year_of_publication&quot;: 1845,
        &quot;chunks&quot;: [
          {
            &quot;text&quot;: &quot;When I wrote the following pages, or rather the bulk of them...&quot;,
            &quot;text_vector&quot;: [0.3, 0.2, 0.3, 0.2, 0.5],
            &quot;chapter&quot;: &quot;Economy&quot;
          },
          {
            &quot;text&quot;: &quot;I would fain say something, not so much concerning the Chinese and...&quot;,
            &quot;text_vector&quot;: [0.7, 0.4, 0.2, 0.7, 0.8],
            &quot;chapter&quot;: &quot;Economy&quot;
          }
        ]
      }
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>Besoin de plus de données ?</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>, <span class="hljs-type">Dict</span>, <span class="hljs-type">Any</span>

<span class="hljs-comment"># Real classic books (title, author, year)</span>
BOOKS = [
    (<span class="hljs-string">&quot;Pride and Prejudice&quot;</span>, <span class="hljs-string">&quot;Jane Austen&quot;</span>, <span class="hljs-number">1813</span>),
    (<span class="hljs-string">&quot;Moby Dick&quot;</span>, <span class="hljs-string">&quot;Herman Melville&quot;</span>, <span class="hljs-number">1851</span>),
    (<span class="hljs-string">&quot;Frankenstein&quot;</span>, <span class="hljs-string">&quot;Mary Shelley&quot;</span>, <span class="hljs-number">1818</span>),
    (<span class="hljs-string">&quot;The Picture of Dorian Gray&quot;</span>, <span class="hljs-string">&quot;Oscar Wilde&quot;</span>, <span class="hljs-number">1890</span>),
    (<span class="hljs-string">&quot;Dracula&quot;</span>, <span class="hljs-string">&quot;Bram Stoker&quot;</span>, <span class="hljs-number">1897</span>),
    (<span class="hljs-string">&quot;The Adventures of Sherlock Holmes&quot;</span>, <span class="hljs-string">&quot;Arthur Conan Doyle&quot;</span>, <span class="hljs-number">1892</span>),
    (<span class="hljs-string">&quot;Alice&#x27;s Adventures in Wonderland&quot;</span>, <span class="hljs-string">&quot;Lewis Carroll&quot;</span>, <span class="hljs-number">1865</span>),
    (<span class="hljs-string">&quot;The Time Machine&quot;</span>, <span class="hljs-string">&quot;H.G. Wells&quot;</span>, <span class="hljs-number">1895</span>),
    (<span class="hljs-string">&quot;The Scarlet Letter&quot;</span>, <span class="hljs-string">&quot;Nathaniel Hawthorne&quot;</span>, <span class="hljs-number">1850</span>),
    (<span class="hljs-string">&quot;Leaves of Grass&quot;</span>, <span class="hljs-string">&quot;Walt Whitman&quot;</span>, <span class="hljs-number">1855</span>),
    (<span class="hljs-string">&quot;The Brothers Karamazov&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1880</span>),
    (<span class="hljs-string">&quot;Crime and Punishment&quot;</span>, <span class="hljs-string">&quot;Fyodor Dostoevsky&quot;</span>, <span class="hljs-number">1866</span>),
    (<span class="hljs-string">&quot;Anna Karenina&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1877</span>),
    (<span class="hljs-string">&quot;War and Peace&quot;</span>, <span class="hljs-string">&quot;Leo Tolstoy&quot;</span>, <span class="hljs-number">1869</span>),
    (<span class="hljs-string">&quot;Great Expectations&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1861</span>),
    (<span class="hljs-string">&quot;Oliver Twist&quot;</span>, <span class="hljs-string">&quot;Charles Dickens&quot;</span>, <span class="hljs-number">1837</span>),
    (<span class="hljs-string">&quot;Wuthering Heights&quot;</span>, <span class="hljs-string">&quot;Emily Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;Jane Eyre&quot;</span>, <span class="hljs-string">&quot;Charlotte Brontë&quot;</span>, <span class="hljs-number">1847</span>),
    (<span class="hljs-string">&quot;The Call of the Wild&quot;</span>, <span class="hljs-string">&quot;Jack London&quot;</span>, <span class="hljs-number">1903</span>),
    (<span class="hljs-string">&quot;The Jungle Book&quot;</span>, <span class="hljs-string">&quot;Rudyard Kipling&quot;</span>, <span class="hljs-number">1894</span>),
]

<span class="hljs-comment"># Common chapter names for classics</span>
CHAPTERS = [
    <span class="hljs-string">&quot;Introduction&quot;</span>, <span class="hljs-string">&quot;Prologue&quot;</span>, <span class="hljs-string">&quot;Chapter I&quot;</span>, <span class="hljs-string">&quot;Chapter II&quot;</span>, <span class="hljs-string">&quot;Chapter III&quot;</span>,
    <span class="hljs-string">&quot;Chapter IV&quot;</span>, <span class="hljs-string">&quot;Chapter V&quot;</span>, <span class="hljs-string">&quot;Chapter VI&quot;</span>, <span class="hljs-string">&quot;Chapter VII&quot;</span>, <span class="hljs-string">&quot;Chapter VIII&quot;</span>,
    <span class="hljs-string">&quot;Chapter IX&quot;</span>, <span class="hljs-string">&quot;Chapter X&quot;</span>, <span class="hljs-string">&quot;Epilogue&quot;</span>, <span class="hljs-string">&quot;Conclusion&quot;</span>, <span class="hljs-string">&quot;Afterword&quot;</span>,
    <span class="hljs-string">&quot;Economy&quot;</span>, <span class="hljs-string">&quot;Where I Lived&quot;</span>, <span class="hljs-string">&quot;Reading&quot;</span>, <span class="hljs-string">&quot;Sounds&quot;</span>, <span class="hljs-string">&quot;Solitude&quot;</span>,
    <span class="hljs-string">&quot;Visitors&quot;</span>, <span class="hljs-string">&quot;The Bean-Field&quot;</span>, <span class="hljs-string">&quot;The Village&quot;</span>, <span class="hljs-string">&quot;The Ponds&quot;</span>, <span class="hljs-string">&quot;Baker Farm&quot;</span>
]

<span class="hljs-comment"># Placeholder text snippets (mimicking 19th-century prose)</span>
TEXT_SNIPPETS = [
    <span class="hljs-string">&quot;When I wrote the following pages, or rather the bulk of them...&quot;</span>,
    <span class="hljs-string">&quot;I would fain say something, not so much concerning the Chinese and...&quot;</span>,
    <span class="hljs-string">&quot;It is a truth universally acknowledged, that a single man in possession...&quot;</span>,
    <span class="hljs-string">&quot;Call me Ishmael. Some years ago—never mind how long precisely...&quot;</span>,
    <span class="hljs-string">&quot;It was the best of times, it was the worst of times...&quot;</span>,
    <span class="hljs-string">&quot;All happy families are alike; each unhappy family is unhappy in its own way.&quot;</span>,
    <span class="hljs-string">&quot;Whether I shall turn out to be the hero of my own life, or whether that station...&quot;</span>,
    <span class="hljs-string">&quot;You will rejoice to hear that no disaster has accompanied the commencement...&quot;</span>,
    <span class="hljs-string">&quot;The world is too much with us; late and soon, getting and spending...&quot;</span>,
    <span class="hljs-string">&quot;He was an old man who fished alone in a skiff in the Gulf Stream...&quot;</span>
]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">random_vector</span>() -&gt; <span class="hljs-type">List</span>[<span class="hljs-built_in">float</span>]:
    <span class="hljs-keyword">return</span> [<span class="hljs-built_in">round</span>(random.random(), <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>)]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_chunk</span>() -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;text&quot;</span>: random.choice(TEXT_SNIPPETS),
        <span class="hljs-string">&quot;text_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;chapter&quot;</span>: random.choice(CHAPTERS)
    }

<span class="hljs-keyword">def</span> <span class="hljs-title function_">generate_record</span>(<span class="hljs-params">record_id: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-type">Dict</span>[<span class="hljs-built_in">str</span>, <span class="hljs-type">Any</span>]:
    title, author, year = random.choice(BOOKS)
    num_chunks = random.randint(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)  <span class="hljs-comment"># 1 to 5 chunks per book</span>
    chunks = [generate_chunk() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_chunks)]
    <span class="hljs-keyword">return</span> {
        <span class="hljs-string">&quot;title&quot;</span>: title,
        <span class="hljs-string">&quot;title_vector&quot;</span>: random_vector(),
        <span class="hljs-string">&quot;author&quot;</span>: author,
        <span class="hljs-string">&quot;year_of_publication&quot;</span>: year,
        <span class="hljs-string">&quot;chunks&quot;</span>: chunks
    }

<span class="hljs-comment"># Generate 1000 records</span>
data = [generate_record(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>)]

<span class="hljs-comment"># Insert the generated data</span>
client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=data)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Vector-search-in-a-StructArray-field" class="common-anchor-header">Recherche vectorielle dans un champ StructArray<button data-href="#Vector-search-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez effectuer des recherches vectorielles sur les champs vectoriels d'une collection et dans un StructArray.</p>
<p>Plus précisément, vous devez concaténer le nom du champ StructArray et ceux des champs vectoriels cibles dans les éléments Struct en tant que valeur du paramètre <code translate="no">anns_field</code> dans une requête de recherche, et utiliser <code translate="no">EmbeddingList</code> pour organiser les vecteurs de requête de manière ordonnée.</p>
<div class="alert note">
<p>Milvus fournit <code translate="no">EmbeddingList</code> pour vous aider à organiser plus proprement les vecteurs de requête pour les recherches sur une liste d'incorporation dans un StructArray. Chaque site <code translate="no">EmbeddingList</code> contient au moins un vecteur d'intégration et attend en retour un certain nombre d'entités topK.</p>
<p>Cependant, <code translate="no">EmbeddingList</code> ne peut être utilisé que dans les requêtes <code translate="no">search()</code> sans paramètres de recherche d'intervalle ou de regroupement, et encore moins dans les requêtes <code translate="no">search_iterator()</code>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

<span class="hljs-comment"># each query embedding list triggers a single search</span>
embeddingList1 = EmbeddingList()
embeddingList1.add([<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>])

embeddingList2 = EmbeddingList()
embeddingList2.add([-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>])
embeddingList2.add([-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>])

<span class="hljs-comment"># a search with a single embedding list</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.EmbeddingList;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList1.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.9f</span>, <span class="hljs-number">0.4f</span>, -<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.2f</span>}));

<span class="hljs-type">EmbeddingList</span> <span class="hljs-variable">embeddingList2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">EmbeddingList</span>();
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.2f</span>, -<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.9f</span>}));
embeddingList2.add(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{-<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.8f</span>, <span class="hljs-number">0.2f</span>}));

Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Collections.singletonList(embeddingList1))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> embeddingList1 = [[<span class="hljs-number">0.2</span>, <span class="hljs-number">0.9</span>, <span class="hljs-number">0.4</span>, -<span class="hljs-number">0.3</span>, <span class="hljs-number">0.2</span>]];
<span class="hljs-keyword">const</span> embeddingList2 = [
  [-<span class="hljs-number">0.2</span>, -<span class="hljs-number">0.2</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.9</span>],
  [-<span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.2</span>],
];
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: embeddingList1,
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
embeddingList1=<span class="hljs-string">&#x27;[[0.2,0.9,0.4,-0.3,0.2]]&#x27;</span>
embeddingList2=<span class="hljs-string">&#x27;[[-0.2,-0.2,0.5,0.6,0.9],[-0.4,0.3,0.5,0.8,0.2]]&#x27;</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>La demande de recherche ci-dessus utilise <code translate="no">chunks[text_vector]</code> pour faire référence au champ <code translate="no">text_vector</code> dans les éléments Struct. Vous pouvez utiliser cette syntaxe pour définir les paramètres <code translate="no">anns_field</code> et <code translate="no">output_fields</code>.</p>
<p>Le résultat serait une liste des trois entités les plus similaires.</p>
<p><details></p>
<p><summary>Sortie</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#             &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#             &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#                 &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#                     {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#                 ]</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Vous pouvez également inclure plusieurs listes d'intégration dans le paramètre <code translate="no">data</code> afin de récupérer les résultats de la recherche pour chacune de ces listes d'intégration.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># a search with multiple embedding lists</span>
results = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[ embeddingList1, embeddingList2 ],
    anns_field=<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>},
    limit=<span class="hljs-number">3</span>,
    output_fields=[<span class="hljs-string">&quot;chunks[text]&quot;</span>]
)

<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Map&lt;String, Object&gt; params = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
params.put(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>);
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .annsField(<span class="hljs-string">&quot;chunks[text_vector]&quot;</span>)
        .data(Arrays.asList(embeddingList1, embeddingList2))
        .searchParams(params)
        .limit(<span class="hljs-number">3</span>)
        .outputFields(Collections.singletonList(<span class="hljs-string">&quot;chunks[text]&quot;</span>))
        .build());
        
List&lt;List&lt;SearchResp.SearchResult&gt;&gt; searchResults = searchResp.getSearchResults();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; searchResults.size(); i++) {
    System.out.println(<span class="hljs-string">&quot;Results of No.&quot;</span> + i + <span class="hljs-string">&quot; embedding list&quot;</span>);
    List&lt;SearchResp.SearchResult&gt; results = searchResults.get(i);
    <span class="hljs-keyword">for</span> (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// go</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results2 = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;books&quot;</span>,
  <span class="hljs-attr">data</span>: [embeddingList1, embeddingList2],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;chunks[text_vector]&quot;</span>,
  <span class="hljs-attr">search_params</span>: { <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span> },
  <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;chunks[text]&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/entities/search&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;data\&quot;: [<span class="hljs-variable">$embeddingList1</span>, <span class="hljs-variable">$embeddingList2</span>],
    \&quot;annsField\&quot;: \&quot;chunks[text_vector]\&quot;,
    \&quot;searchParams\&quot;: {\&quot;metric_type\&quot;: \&quot;MAX_SIM_COSINE\&quot;},
    \&quot;limit\&quot;: 3,
    \&quot;outputFields\&quot;: [\&quot;chunks[text]\&quot;]
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Le résultat sera une liste des trois entités les plus similaires pour chaque liste d'intégration.</p>
<p><details></p>
<p><summary>Résultats</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># [</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144945,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9675756096839905,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;All happy families are alike; each unhappy family is unhappy in its own way.&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144965,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9555778503417969,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;When I wrote the following pages, or rather the bulk of them...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144962,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 0.9469035863876343,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;The world is too much with us; late and soon, getting and spending...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ],</span>
<span class="hljs-comment">#   [</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144663,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9761409759521484,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It was the best of times, it was the worst of times...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Whether I shall turn out to be the hero of my own life, or whether that station...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;He was an old man who fished alone in a skiff in the Gulf Stream...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144692,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.974656581878662,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;},</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;Call me Ishmael. Some years ago—never mind how long precisely...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     },</span>
<span class="hljs-comment">#     {</span>
<span class="hljs-comment">#       &#x27;id&#x27;: 461417939772144662,</span>
<span class="hljs-comment">#       &#x27;distance&#x27;: 1.9406685829162598,</span>
<span class="hljs-comment">#       &#x27;entity&#x27;: {</span>
<span class="hljs-comment">#         &#x27;chunks&#x27;: [</span>
<span class="hljs-comment">#           {&#x27;text&#x27;: &#x27;It is a truth universally acknowledged, that a single man in possession...&#x27;}</span>
<span class="hljs-comment">#         ]</span>
<span class="hljs-comment">#       }</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment">#   ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Dans l'exemple de code ci-dessus, <code translate="no">embeddingList1</code> est une liste d'intégration d'un vecteur, tandis que <code translate="no">embeddingList2</code> contient deux vecteurs. Chacun déclenche une demande de recherche distincte et attend une liste des K entités les plus similaires.</p>
<h2 id="Scalar-filtering-in-a-StructArray-field" class="common-anchor-header">Filtrage scalaire dans un champ StructArray<button data-href="#Scalar-filtering-in-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser les <strong>filtres d'éléments</strong> et les <strong>opérateurs de la famille match</strong> pour effectuer un filtrage scalaire sur un sous-champ scalaire d'un StructArray. Pour plus de détails et d'exemples sur les deux types d'opérateurs ci-dessus, reportez-vous à la section <a href="/docs/fr/struct-array-operators.md">Opérateurs de tableaux de structures.</a></p>
<h3 id="Element-filters" class="common-anchor-header">Filtres d'éléments<button data-href="#Element-filters" class="anchor-icon" translate="no">
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
    </button></h3><p>Il s'agit d'un filtre au niveau de l'entité qui vérifie si au moins un élément du champ StructArray d'une entité satisfait au prédicat. Par exemple, le filtre d'éléments suivant renvoie les entités qui contiennent au moins un morceau commençant par "Red" dans le sous-champ <code translate="no">text</code>.</p>
<pre><code translate="no" class="language-python">element_filter(chunks, $[text] LIKE <span class="hljs-string">&quot;Red%&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez utiliser presque tous les opérateurs de comparaison, de plage et arithmétiques dans le prédicat, qui est évalué par élément, et les opérateurs logiques peuvent être utilisés pour combiner plusieurs conditions sur le même élément. Pour plus d'informations, reportez-vous à la section <a href="/docs/fr/basic-operators.md">Opérateurs de base</a>.</p>
<p>Si plusieurs expressions de filtrage scalaire sont présentes dans une recherche filtrée ou une requête, placez l'expression de filtrage de l'élément après toutes les expressions de filtrage au niveau de l'entité, comme indiqué ci-dessous.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># correct</span>
<span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span> &amp;&amp; element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>)

<span class="hljs-comment"># incorrect, resulting errors</span>
element_filter(chunks, $[x] &gt; <span class="hljs-number">1</span>) &amp;&amp; <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Match-family-operators" class="common-anchor-header">Opérateurs de la famille Match<button data-href="#Match-family-operators" class="anchor-icon" translate="no">
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
    </button></h3><p>Les opérateurs de la famille Match fonctionnent également sur un champ StructArray. Au lieu de simplement vérifier si un élément existe, vous pouvez déterminer combien d'éléments (ou quelle proportion) doivent satisfaire à un prédicat d'élément.</p>
<ul>
<li><p><code translate="no">MATCH_ANY(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>Ceci renvoie les entités qui contiennent au moins un morceau commençant par "Red" dans le sous-champ <code translate="no">text</code>; sémantiquement, ceci est équivalent à <code translate="no">element_filter</code>.</p></li>
<li><p><code translate="no">MATCH_ALL(chunks, $[text] LIKE &quot;Red%&quot;)</code></p>
<p>Cet élément renvoie les entités dont les sous-champs de texte de tous les morceaux commencent par "Red".</p></li>
<li><p><code translate="no">MATCH_LEAST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Ce champ renvoie aux entités qui contiennent au moins <code translate="no">k</code> chunks qui commencent par "Red" dans le sous-champ <code translate="no">text</code>.</p></li>
<li><p><code translate="no">MATCH_MOST(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Cet élément renvoie aux entités qui contiennent au plus des morceaux <code translate="no">k</code> commençant par "Red" dans le sous-champ <code translate="no">text</code>.</p></li>
<li><p><code translate="no">MATCH_EXACT(chunks, $[text] LIKE &quot;Red%&quot;, k)</code></p>
<p>Ceci renvoie aux entités qui contiennent exactement <code translate="no">k</code> chunks qui commencent par "Red" dans le sous-champ <code translate="no">text</code>.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Prochaines étapes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><p>Le développement d'un type de données StructArray natif représente une avancée majeure dans la capacité de Milvus à traiter des structures de données complexes. Pour mieux comprendre les cas d'utilisation et maximiser cette nouvelle fonctionnalité, nous vous encourageons à lire <a href="/docs/fr/best-practices-for-array-of-structs.md">Schema Design Using an Array of Structs (Conception de schémas à l'aide d'un tableau de structures)</a>.</p>
