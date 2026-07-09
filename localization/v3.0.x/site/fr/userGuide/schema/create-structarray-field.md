---
id: create-structarray-field.md
title: Créer un champ StructArray
summary: >-
  Créez un champ StructArray lorsqu'une entité doit contenir une liste ordonnée
  d'éléments structurés. Un champ StructArray est un champ de type tableau dont
  le type d'élément est Struct. Chaque élément Struct respecte le même schéma et
  peut contenir des sous-champs scalaires, des sous-champs vectoriels, ou les
  deux.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Créer un champ StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Créez un champ StructArray lorsqu'une entité doit contenir une liste ordonnée d'éléments structurés. Un champ StructArray est un champ Array dont le type d'élément est Struct. Chaque élément Struct suit le même schéma et peut contenir des sous-champs scalaires, des sous-champs vectoriels, ou les deux.</p>
<p>Cette page explique comment définir un schéma Struct, l’ajouter en tant que champ StructArray, choisir des sous-champs pour une recherche et un filtrage ultérieurs, et comprendre les règles de schéma applicables avant d’insérer ou d’indexer des données.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Avant de commencer<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Cette page utilise une collection nommée « <code translate="no">tech_articles</code> ». Chaque entité représente un article technique, et le champ « <code translate="no">chunks</code> » stocke des données au niveau des blocs sous forme d’éléments Struct.</p>
<table>
<thead>
<tr><th>Champ</th><th>Type</th><th>Objectif</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Clé primaire de l’article.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Titre de l'article.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Catégorie au niveau de l'article.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Champ vectoriel au niveau de l’article, utilisé ultérieurement dans les exemples de recherche hybride.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Champ StructArray qui stocke le texte au niveau des segments, les métadonnées et les représentations vectorielles.</td></tr>
</tbody>
</table>
<p>Le champ StructArray « <code translate="no">chunks</code> » contient les sous-champs suivants.</p>
<table>
<thead>
<tr><th>Sous-champ</th><th>Type</th><th>Objectif</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Texte du bloc.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nom de la section, tel que « <code translate="no">index</code> », « <code translate="no">search</code> » ou « <code translate="no">filter</code> ».</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Numéro de page ou position logique du bloc.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Score au niveau du bloc utilisé dans le filtrage scalaire et les exemples de plage.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Indique si le segment contient du code.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Sous-champ vectoriel pour la recherche dans EmbeddingList avec les métriques de type « <code translate="no">MAX_SIM*</code> ».</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Sous-champ vectoriel pour la recherche au niveau des éléments avec des métriques vectorielles classiques.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Un champ vectoriel ou un sous-champ vectoriel n’accepte qu’un seul index. Si vous avez besoin à la fois d’une recherche EmbeddingList et d’une recherche au niveau des éléments, définissez deux sous-champs vectoriels distincts. Dans cet exemple, « <code translate="no">chunks[emb_list_vector]</code> » est destiné à la recherche EmbeddingList, et « <code translate="no">chunks[emb]</code> » à la recherche au niveau des éléments.</p>
</div>
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
    </button></h2><p>Un champ StructArray stocke une valeur de tableau pour chaque sous-champ Struct. Lorsque vous définissez un schéma Struct, choisissez les types de sous-champs parmi les familles scalaires et vectorielles prises en charge.</p>
<table>
<thead>
<tr><th>Type physique des sous-champs Struct</th><th>Prise en charge</th><th>Remarques</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme suit : <code translate="no">DataType.VARCHAR</code> et définissez <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Pris en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.FLOAT_VECTOR</code> » et définissez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.FLOAT16_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BFLOAT16_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.INT8_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Prise en charge</td><td>Définissez le sous-champ comme « <code translate="no">DataType.BINARY_VECTOR</code> » et configurez « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Non pris en charge</td><td>Les sous-champs de vecteurs clairsemés ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Utilisez « <code translate="no">VARCHAR</code> » et non « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs JSON ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs de géométrie et les fonctions SIG ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs de type texte ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Non pris en charge</td><td>Les sous-champs « timestamptz » et les expressions spécifiques à l'heure ne sont pas pris en charge dans les champs StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code></td><td>Non pris en charge</td><td>Un champ StructArray ne peut pas contenir de tableaux imbriqués, de tableaux vectoriels imbriqués, de champs Struct imbriqués ou de champs Array-of-Struct imbriqués.</td></tr>
</tbody>
</table>
<p>Pour connaître la prise en charge spécifique à chaque version, le comportement des valeurs nullables et d’autres limites, consultez <a href="/docs/fr/structarray-limits.md">la section Limites de StructArray</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Créer une collection avec un champ StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour créer un champ StructArray, définissez d’abord le schéma Struct utilisé par chaque élément. Ajoutez ensuite un champ Array et définissez son type d’élément sur Struct.</p>
<ol>
<li><p>Créez le schéma de la collection.</p></li>
<li><p>Ajoutez des champs au niveau de la collection, tels que la clé primaire et les champs au niveau de l’article.</p></li>
<li><p>Créez un schéma Struct pour les éléments stockés dans le champ StructArray.</p></li>
<li><p>Ajoutez des sous-champs scalaires et vectoriels au schéma Struct.</p></li>
<li><p>Ajoutez un champ « Array » avec l'<code translate="no">element_type=DataType.STRUCT</code>.</p></li>
<li><p>Définissez la valeur « <code translate="no">struct_schema</code> » sur le schéma Struct.</p></li>
<li><p>Définissez l'<code translate="no">max_capacity</code> pour limiter le nombre d'éléments Struct que chaque entité peut stocker dans le champ.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Comprendre les chemins d’accès aux champs StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez créé un champ StructArray, faites référence à ses sous-champs à l’aide de la syntaxe de chemin d’accès « <code translate="no">structArray[subfield]</code> ». Utilisez cette syntaxe lorsque vous créez des index, effectuez des recherches dans des sous-champs vectoriels, générez des sous-champs de sortie ou créez des filtres scalaires.</p>
<table>
<thead>
<tr><th>Chemin</th><th>Signification</th><th>Utilisation courante</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>Le sous-champ « <code translate="no">text</code> » à l’intérieur de chaque élément Struct.</td><td>Champ de sortie ou filtrage scalaire.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>L'étiquette de section pour chaque bloc.</td><td>Filtrage scalaire.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>Le score de qualité au niveau du bloc.</td><td>Filtrage scalaire ou indice scalaire.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>Le sous-champ vectoriel utilisé comme liste d’intégration.</td><td>Recherche dans EmbeddingList avec l'<code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>Le sous-champ vectoriel utilisé indépendamment par chaque élément Struct.</td><td>Recherche vectorielle au niveau des éléments.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Rendre un champ StructArray non nul<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x prend en charge les champs StructArray pouvant prendre la valeur null. Un champ StructArray pouvant prendre la valeur null permet à une entité de stocker des valeurs « <code translate="no">null</code> » pour l’ensemble du champ StructArray.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Avertissement
Les champs StructArray pouvant prendre la valeur null ne sont disponibles que dans Milvus v3.0.x. Pour un champ StructArray pouvant prendre la valeur null, une entité peut fournir une valeur StructArray valide ou définir l’ensemble du champ sur la valeur « <code translate="no">null</code> ». Lors de l’insertion d’une valeur StructArray valide, tous les sous-champs doivent être soit nuls, soit avoir des valeurs valides. L’insertion d’une entité dont certains sous-champs sont définis sur null et d’autres sur des valeurs valides entraîne une erreur. Pour plus de détails, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Ajouter un champ StructArray à une collection existante<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x prend en charge l’ajout d’un champ StructArray à une collection existante. Le champ StructArray ajouté doit être nullable, car les entités qui existent déjà dans la collection ne possèdent pas de valeurs pour ce nouveau champ.</p>
<p>Pour ajouter un champ StructArray à une collection existante, définissez d’abord le schéma Struct. Appelez ensuite la méthode ` <code translate="no">add_collection_struct_field()</code> ` et définissez ` <code translate="no">nullable=True</code>`.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Une fois le champ StructArray ajouté, les entités existantes renvoient la valeur « <code translate="no">null</code> » pour le nouveau champ, pour l’ensemble de ses sous-champs.</p>
<p>Une fois qu’un champ StructArray a été créé, vous ne pouvez plus ajouter de nouveaux sous-champs à ce champ StructArray existant. Si vous avez besoin d’attributs d’élément supplémentaires ultérieurement, appelez ` <code translate="no">drop_collection_field()</code> ` pour supprimer le champ StructArray, puis ajoutez un nouveau champ StructArray avec le schéma Struct mis à jour.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">Règles de schéma<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Règle</th><th>Explication</th></tr>
</thead>
<tbody>
<tr><td>Struct est utilisé comme type d’élément Array.</td><td>Créez un champ StructArray en tant que champ de type Array à l’aide de la méthode <code translate="no">element_type=STRUCT</code>. Ne créez pas de champ Struct en tant que champ de collection de niveau supérieur.</td></tr>
<tr><td>Tous les éléments partagent un même schéma.</td><td>Chaque élément Struct du même champ StructArray respecte le schéma Struct défini pour ce champ.</td></tr>
<tr><td><code translate="no">max_capacity</code> est obligatoire.</td><td>Il limite le nombre d’éléments Struct que chaque entité peut stocker dans le champ StructArray.</td></tr>
<tr><td>Seuls les types de sous-champs pris en charge sont autorisés.</td><td>Utilisez les types de sous-champs scalaires et vectoriels pris en charge par StructArray. Ne définissez pas de sous-champs JSON, Geometry, Text, Timestamptz, SparseFloatVector, ni de sous-champs Struct / Array imbriqués.</td></tr>
<tr><td>Les sous-champs vectoriels nécessitent des index avant toute recherche.</td><td>Créez des index sur des chemins tels que <code translate="no">chunks[emb_list_vector]</code> ou <code translate="no">chunks[emb]</code> avant d’effectuer une recherche vectorielle.</td></tr>
<tr><td>Un sous-champ vectoriel dispose d’un seul index.</td><td>Si vous avez besoin à la fois d’une recherche EmbeddingList et d’une recherche au niveau des éléments, créez deux sous-champs vectoriels distincts.</td></tr>
<tr><td>Les sous-champs StructArray existants sont fixes.</td><td>Une fois un champ StructArray créé, vous ne pouvez plus y ajouter de sous-champs.</td></tr>
<tr><td>Les fonctions ne sont pas prises en charge à l’intérieur de Struct.</td><td>Ne définissez pas de fonctions pour les champs ou les sous-champs à l’intérieur d’un champ StructArray.</td></tr>
<tr><td>Les sous-champs scalaires doivent répondre aux besoins de filtrage.</td><td>N'ajoutez des champs tels que <code translate="no">section</code>, <code translate="no">quality_score</code> ou <code translate="no">has_code</code> que si vous avez besoin de les filtrer, de les regrouper ou de les afficher ultérieurement.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Erreurs courantes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Créer <code translate="no">DataType.STRUCT</code> en tant que champ de collection de niveau supérieur au lieu de l’utiliser comme type d’élément d’un champ Array.</p></li>
<li><p>Oublier de définir « <code translate="no">max_capacity</code> » sur le champ StructArray.</p></li>
<li><p>Définir des types de sous-champs non pris en charge, tels que JSON, Geometry, Text, Timestamptz, SparseFloatVector, Array imbriqué, Struct imbriqué ou Array-of-Struct.</p></li>
<li><p>Utilisation de « <code translate="no">String</code> » comme type de sous-champ. Utilisez « <code translate="no">VARCHAR</code> » et définissez « <code translate="no">max_length</code> ».</p></li>
<li><p>Utilisation d’un seul sous-champ vectoriel à la fois pour la recherche dans EmbeddingList et la recherche au niveau des éléments.</p></li>
<li><p>Ajouter uniquement des sous-champs vectoriels et omettre les sous-champs scalaires nécessaires au filtrage, tels que <code translate="no">section</code>, <code translate="no">quality_score</code> ou <code translate="no">has_code</code>.</p></li>
<li><p>Considérer les sous-champs vectoriels comme des entrées de prédicats scalaires de type <code translate="no">$[...]</code>. Utiliser les sous-champs vectoriels pour la recherche vectorielle, et les sous-champs scalaires pour les prédicats scalaires.</p></li>
<li><p>Partir du principe que de nouveaux sous-champs peuvent être ajoutés à un champ StructArray existant après la création de ce dernier.</p></li>
<li><p>Utilisation de <code translate="no">chunks.emb</code> ou <code translate="no">chunks.emb_list_vector</code> au lieu de la syntaxe de chemin requise <code translate="no">chunks[emb]</code> ou <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Considérer que le comportement des StructArray pouvant prendre la valeur null est disponible dans toutes les versions cibles.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Étapes suivantes<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Pour insérer des données imbriquées dans le champ StructArray, consultez la section <a href="/docs/fr/insert-data-into-structarray-fields.md">Insérer des données dans les champs StructArray</a>.</p></li>
<li><p>Pour créer des index vectoriels et scalaires, consultez la section « <a href="/docs/fr/index-structarray-fields.md">Indexer des champs StructArray</a> ».</p></li>
<li><p>Pour effectuer une recherche dans les sous-champs vectoriels de StructArray, consultez la section « Recherche vectorielle de base avec StructArray ».</p></li>
<li><p>Pour connaître les types de données pris en charge, le comportement des valeurs nullables et les limitations spécifiques à chaque version, consultez la section « <a href="/docs/fr/structarray-limits.md">Limites de StructArray</a> ».</p></li>
</ol>
