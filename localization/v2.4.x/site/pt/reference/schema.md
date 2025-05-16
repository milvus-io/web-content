---
id: schema.md
summary: Saiba como definir um esquema no Milvus.
title: Gerir o esquema
---
<h1 id="Manage-Schema" class="common-anchor-header">Gerir o esquema<button data-href="#Manage-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico introduz o esquema no Milvus. O esquema é utilizado para definir as propriedades de uma coleção e os campos que a compõem.</p>
<h2 id="Field-schema" class="common-anchor-header">Esquema de campo<button data-href="#Field-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Um esquema de campo é a definição lógica de um campo. É a primeira coisa a definir antes de definir um <a href="#Collection-schema">esquema de coleção</a> e <a href="/docs/pt/v2.4.x/manage-collections.md">gerir colecções</a>.</p>
<p>O Milvus suporta apenas um campo de chave primária numa coleção.</p>
<h3 id="Field-schema-properties" class="common-anchor-header">Propriedades do esquema de campo</h3><table class="properties">
    <thead>
    <tr>
        <th>Propriedades</th>
        <th>Descrição do campo</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">name</code></td>
        <td>Nome do campo na coleção a criar</td>
        <td>Tipo de dados: String.<br/>Obrigatório</td>
    </tr>
    <tr>
        <td><code translate="no">dtype</code></td>
        <td>Tipo de dados do campo</td>
        <td>Obrigatório</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descrição do campo</td>
        <td>Tipo de dados: String.<br/>Facultativo</td>
    </tr>
    <tr>
        <td><code translate="no">is_primary</code></td>
        <td>Definir ou não o campo como campo de chave primária</td>
        <td>Tipo de dados: Booleano (<code translate="no">true</code> ou <code translate="no">false</code>).<br/>Obrigatório para o campo de chave primária</td>
    </tr>
        <tr>
            <td><code translate="no">auto_id</code> (Obrigatório para o campo de chave primária)</td>
            <td>Comutador para ativar ou desativar a atribuição automática de ID (chave primária).</td>
            <td><code translate="no">True</code> ou <code translate="no">False</code></td>
        </tr>
        <tr>
            <td><code translate="no">max_length</code> (Obrigatório para o campo VARCHAR)</td>
            <td>Comprimento máximo de bytes para cadeias que podem ser inseridas. Note que os caracteres multibyte (por exemplo, caracteres Unicode) podem ocupar mais do que um byte cada, por isso certifique-se de que o comprimento em bytes das cadeias inseridas não excede o limite especificado.</td>
            <td>[1, 65,535]</td>
        </tr>
    <tr>
        <td><code translate="no">dim</code></td>
        <td>Dimensão do vetor</td>
            <td>Tipo de dados: Integer &isin;[1, 32768].<br/>Obrigatório para um campo de vetor denso. Omitir para um campo <a href="https://milvus.io/docs/sparse_vector.md">vetorial esparso</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">is_partition_key</code></td>
        <td>Se este campo é um campo de chave de partição.</td>
        <td>Tipo de dados: Booleano (<code translate="no">true</code> ou <code translate="no">false</code>).</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-field-schema" class="common-anchor-header">Criar um esquema de campo</h3><p>Para reduzir a complexidade das inserções de dados, o Milvus permite-lhe especificar um valor por defeito para cada campo escalar durante a criação do esquema de campo, excluindo o campo da chave primária. Isto indica que se deixar um campo vazio ao inserir dados, aplica-se o valor por defeito especificado para este campo.</p>
<p>Criar um esquema de campos normal:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># The following creates a field and use it as the partition key</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Cria um esquema de campo com valores de campo predefinidos:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema

fields = [
  FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>),
  <span class="hljs-comment"># configure default value `25` for field `age`</span>
  FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, default_value=<span class="hljs-number">25</span>, description=<span class="hljs-string">&quot;age&quot;</span>),
  embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)
]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Supported-data-types" class="common-anchor-header">Tipos de dados suportados</h3><p><code translate="no">DataType</code> define o tipo de dados que um campo contém. Diferentes campos suportam diferentes tipos de dados.</p>
<ul>
<li><p>O campo de chave primária suporta:</p>
<ul>
<li>INT64: numpy.int64</li>
<li>VARCHAR: VARCHAR</li>
</ul></li>
<li><p>O campo Scalar suporta:</p>
<ul>
<li>BOOL: Booleano (<code translate="no">true</code> ou <code translate="no">false</code>)</li>
<li>INT8: numpy.int8</li>
<li>INT16: numpy.int16</li>
<li>INT32: numpy.int32</li>
<li>INT64: numpy.int64</li>
<li>FLOAT: numpy.float32</li>
<li>DOUBLE: numpy.double</li>
<li>VARCHAR: VARCHAR</li>
<li>JSON: <a href="/docs/pt/v2.4.x/use-json-fields.md">JSON</a></li>
<li>Array: <a href="/docs/pt/v2.4.x/array_data_type.md">Array</a></li>
</ul>
<p>JSON como um tipo de dados composto está disponível. Um campo JSON inclui pares chave-valor. Cada chave é uma cadeia de caracteres e um valor pode ser um número, cadeia de caracteres, valor booleano, matriz ou lista. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/use-json-fields.md">JSON: um novo tipo de dados</a>.</p></li>
<li><p>O campo Vetor suporta:</p>
<ul>
<li>BINARY_VECTOR: armazena dados binários como uma sequência de 0s e 1s, usados para representação compacta de recursos no processamento de imagens e na recuperação de informações.</li>
<li>FLOAT_VECTOR: Armazena números de ponto flutuante de 32 bits, normalmente utilizados na computação científica e na aprendizagem automática para representar números reais.</li>
<li>FLOAT16_VECTOR: Armazena números de vírgula flutuante de meia precisão de 16 bits, utilizados em aprendizagem profunda e cálculos de GPU para eficiência de memória e largura de banda.</li>
<li>BFLOAT16_VECTOR: Armazena números de vírgula flutuante de 16 bits com precisão reduzida, mas com o mesmo intervalo de expoentes que o Float32, popular na aprendizagem profunda para reduzir a memória e os requisitos computacionais sem afetar significativamente a precisão.</li>
<li>SPARSE_FLOAT_VECTOR: armazena uma lista de elementos não nulos e os respectivos índices, utilizados para representar vectores esparsos. Para mais informações, consulte <a href="/docs/pt/v2.4.x/sparse_vector.md">Vectores es</a>parsos.</li>
</ul>
<p>O Milvus suporta múltiplos campos vectoriais numa coleção. Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/multi-vector-search.md">Pesquisa híbrida</a>.</p></li>
</ul>
<h2 id="Collection-schema" class="common-anchor-header">Esquema de coleção<button data-href="#Collection-schema" class="anchor-icon" translate="no">
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
    </button></h2><p>Um esquema de coleção é a definição lógica de uma coleção. Normalmente, é necessário definir o <a href="#Field-schema">esquema de campo</a> antes de definir um esquema de coleção e <a href="/docs/pt/v2.4.x/manage-collections.md">gerir colecções</a>.</p>
<h3 id="Collection-schema-properties" class="common-anchor-header">Propriedades do esquema de coleção</h3><table class="properties">
    <thead>
    <tr>
        <th>Propriedades</th>
        <th>Descrição das propriedades</th>
        <th>Nota</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Campos da coleção a criar</td>
        <td>Obrigatório</td>
    </tr>
    <tr>
        <td><code translate="no">description</code></td>
        <td>Descrição da coleção</td>
        <td>Tipo de dados: String.<br/>Facultativo</td>
    </tr>
    <tr>
        <td><code translate="no">partition_key_field</code></td>
        <td>Nome de um campo concebido para atuar como chave de partição.</td>
        <td>Tipo de dados String.<br/>Facultativo</td>
    </tr>
    <tr>
        <td><code translate="no">enable_dynamic_field</code></td>
        <td>Ativar ou não o esquema dinâmico</td>
        <td>Tipo de dados: Boolean (<code translate="no">true</code> ou <code translate="no">false</code>).<br/>Opcional, a predefinição é <code translate="no">False</code>.<br/>Para mais informações sobre o esquema dinâmico, consulte <a herf="enable-dynamic-field.md">Esquema dinâmico</a> e os manuais do utilizador para gerir colecções.</td>
    </tr>
    </tbody>
</table>
<h3 id="Create-a-collection-schema" class="common-anchor-header">Criar um esquema de coleção</h3><div class="alert note">
  Defina os esquemas de campo antes de definir um esquema de coleção.</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> FieldSchema, CollectionSchema
id_field = FieldSchema(name=<span class="hljs-string">&quot;id&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;primary id&quot;</span>)
age_field = FieldSchema(name=<span class="hljs-string">&quot;age&quot;</span>, dtype=DataType.INT64, description=<span class="hljs-string">&quot;age&quot;</span>)
embedding_field = FieldSchema(name=<span class="hljs-string">&quot;embedding&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">128</span>, description=<span class="hljs-string">&quot;vector&quot;</span>)

<span class="hljs-comment"># Enable partition key on a field if you need to implement multi-tenancy based on the partition-key field</span>
position_field = FieldSchema(name=<span class="hljs-string">&quot;position&quot;</span>, dtype=DataType.VARCHAR, max_length=<span class="hljs-number">256</span>, is_partition_key=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Set enable_dynamic_field to True if you need to use dynamic fields. </span>
schema = CollectionSchema(fields=[id_field, age_field, embedding_field], auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">True</span>, description=<span class="hljs-string">&quot;desc of a collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Crie uma coleção com o esquema especificado:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">Collection</span>,connections
conn = connections.<span class="hljs-title function_">connect</span>(host=<span class="hljs-string">&quot;127.0.0.1&quot;</span>, port=<span class="hljs-number">19530</span>)
collection_name1 = <span class="hljs-string">&quot;tutorial_1&quot;</span>
collection1 = <span class="hljs-title class_">Collection</span>(name=collection_name1, schema=schema, using=<span class="hljs-string">&#x27;default&#x27;</span>, shards_num=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Pode definir o número do fragmento com <code translate="no">shards_num</code>.</li>
<li>Pode definir o servidor Milvus no qual pretende criar uma coleção, especificando o alias em <code translate="no">using</code>.</li>
<li>Pode ativar a funcionalidade de chave de partição num campo definindo <code translate="no">is_partition_key</code> para <code translate="no">True</code> no campo, se necessitar de implementar <a href="/docs/pt/v2.4.x/multi_tenancy.md">um multi-tenancy baseado em chaves de partição</a>.</li>
<li>Pode ativar o esquema dinâmico definindo <code translate="no">enable_dynamic_field</code> para <code translate="no">True</code> no esquema da coleção se precisar de <a href="/docs/pt/v2.4.x/enable-dynamic-field.md">ativar o campo dinâmico</a>.</li>
</ul>
</div>
<p><br/>
Também pode criar uma coleção com <code translate="no">Collection.construct_from_dataframe</code>, que gera automaticamente um esquema de coleção a partir de DataFrame e cria uma coleção.</p>
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
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Saiba como preparar o esquema ao <a href="/docs/pt/v2.4.x/manage-collections.md">gerir colecções</a>.</li>
<li>Saiba mais sobre o <a href="/docs/pt/v2.4.x/enable-dynamic-field.md">esquema dinâmico</a>.</li>
<li>Leia mais sobre partition-key em <a href="/docs/pt/v2.4.x/multi_tenancy.md">Multi-tenancy</a>.</li>
</ul>
