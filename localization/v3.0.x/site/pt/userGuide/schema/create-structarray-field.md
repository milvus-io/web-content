---
id: create-structarray-field.md
title: Criar um campo StructArray
summary: >-
  Crie um campo StructArray quando uma entidade precisar de conter uma lista
  ordenada de elementos estruturados. Um campo StructArray é um campo Array cujo
  tipo de elemento é Struct. Cada elemento Struct segue o mesmo esquema e pode
  conter subcampos escalares, subcampos vetoriais ou ambos.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">Criar um campo StructArray<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Crie um campo StructArray quando uma entidade precisar de conter uma lista ordenada de elementos estruturados. Um campo StructArray é um campo Array cujo tipo de elemento é Struct. Cada elemento Struct segue o mesmo esquema e pode conter subcampos escalares, subcampos vetoriais ou ambos.</p>
<p>Esta página mostra como definir um esquema Struct, adicioná-lo como um campo StructArray, selecionar subcampos para pesquisa e filtragem posteriores e compreender as regras do esquema aplicáveis antes de inserir ou indexar dados.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de começar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta página utiliza uma coleção denominada « <code translate="no">tech_articles</code> ». Cada entidade representa um artigo técnico, e o campo « <code translate="no">chunks</code> » armazena dados ao nível de fragmentos como elementos Struct.</p>
<table>
<thead>
<tr><th>Campo</th><th>Tipo</th><th>Finalidade</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>Chave primária do artigo.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>Título do artigo.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>Categoria ao nível do artigo.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Campo vetorial ao nível do artigo, utilizado posteriormente em exemplos de pesquisa híbrida.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>Campo StructArray que armazena texto ao nível do fragmento, metadados e incorporações.</td></tr>
</tbody>
</table>
<p>O campo StructArray « <code translate="no">chunks</code> » contém os seguintes subcampos.</p>
<table>
<thead>
<tr><th>Subcampo</th><th>Tipo</th><th>Finalidade</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>Texto do bloco.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td>Nome da secção, como « <code translate="no">index</code> », « <code translate="no">search</code> » ou « <code translate="no">filter</code> ».</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>Número da página ou posição lógica do fragmento.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>Pontuação ao nível do fragmento utilizada na filtragem escalar e nos exemplos de intervalo.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>Se o fragmento contém código.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subcampo vetorial para pesquisa na EmbeddingList com métricas de <code translate="no">MAX_SIM*</code>.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Subcampo vetorial para pesquisa ao nível do elemento com métricas vetoriais regulares.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Um campo vetorial ou subcampo vetorial aceita apenas um índice. Se precisar tanto da pesquisa EmbeddingList como da pesquisa ao nível do elemento, defina dois subcampos vetoriais separados. Neste exemplo, « <code translate="no">chunks[emb_list_vector]</code> » destina-se à pesquisa EmbeddingList e « <code translate="no">chunks[emb]</code> » destina-se à pesquisa ao nível do elemento.</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Tipos de dados de subcampos suportados<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>Um campo StructArray armazena um valor de matriz para cada subcampo Struct. Ao definir um esquema Struct, escolha os tipos de subcampo entre as famílias escalares e vetoriais suportadas.</p>
<table>
<thead>
<tr><th>Tipo físico do subcampo Struct</th><th>Suporte</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Suportado</td><td>Defina o subcampo como « <code translate="no">DataType.BOOL</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.VARCHAR</code> e defina <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Não suportado</td><td>Os subcampos de vetores esparsos não são suportados em campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Utilize « <code translate="no">VARCHAR</code> », e não « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos JSON não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos de geometria e as funções GIS não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos de texto não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos «Timestamptz» e as expressões específicas de tempo não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code></td><td>Não suportado</td><td>Um campo StructArray não pode conter matrizes aninhadas, matrizes vetoriais aninhadas, campos Struct aninhados ou campos Array-of-Struct aninhados.</td></tr>
</tbody>
</table>
<p>Para obter informações sobre suporte específico por versão, comportamento de valores nulos e outros limites, consulte <a href="/docs/pt/structarray-limits.md">Limites do StructArray</a>.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">Criar uma coleção com um campo StructArray<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para criar um campo StructArray, defina primeiro o esquema Struct utilizado por cada elemento. Em seguida, adicione um campo Array e defina o seu tipo de elemento como Struct.</p>
<ol>
<li><p>Crie o esquema da coleção.</p></li>
<li><p>Adicione campos ao nível da coleção, tais como a chave primária e campos ao nível do artigo.</p></li>
<li><p>Crie um esquema Struct para os elementos armazenados no campo StructArray.</p></li>
<li><p>Adicione subcampos escalares e vetoriais ao esquema Struct.</p></li>
<li><p>Adicione um campo «Array» com « <code translate="no">element_type=DataType.STRUCT</code> ».</p></li>
<li><p>Defina ` <code translate="no">struct_schema</code> ` para o esquema `Struct`.</p></li>
<li><p>Defina « <code translate="no">max_capacity</code> » para limitar o número de elementos «Struct» que cada entidade pode armazenar no campo.</p></li>
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
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">Compreender os caminhos dos campos StructArray<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de criar um campo StructArray, refira-se aos seus subcampos utilizando a sintaxe de caminho « <code translate="no">structArray[subfield]</code> ». Utilize esta sintaxe ao criar índices, pesquisar subcampos vetoriais, gerar subcampos de saída ou criar filtros escalares.</p>
<table>
<thead>
<tr><th>Caminho</th><th>Significado</th><th>Utilização comum</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>O subcampo « <code translate="no">text</code> » dentro de cada elemento Struct.</td><td>Campo de saída ou filtragem escalar.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>O rótulo da secção para cada bloco.</td><td>Filtragem escalar.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>A pontuação de qualidade ao nível do bloco.</td><td>Filtragem escalar ou índice escalar.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>O subcampo vetorial utilizado como lista de incorporação.</td><td>Pesquisa na EmbeddingList com « <code translate="no">MAX_SIM*</code> ».</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>O subcampo vetorial utilizado por cada elemento Struct de forma independente.</td><td>Pesquisa vetorial ao nível do elemento.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">Tornar um campo StructArray nulo<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus v3.0.x suporta campos StructArray nulos. Um campo StructArray nulo permite que uma entidade armazene valores do tipo « <code translate="no">null</code> » para todo o campo StructArray.</p>
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
<p>Aviso
Os campos StructArray nulos estão disponíveis apenas no Milvus v3.0.x. Para um campo StructArray nulo, uma entidade pode fornecer um valor StructArray válido ou definir todo o campo como ` <code translate="no">null</code>`. Ao inserir um valor StructArray válido, todos os subcampos devem estar nulos ou ter valores válidos. A inserção de uma entidade com alguns subcampos definidos como nulos e outros com valores válidos resulta num erro. Para mais detalhes, consulte <a href="/docs/pt/structarray-limits.md">Limites do StructArray</a>.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">Adicionar um campo StructArray a uma coleção existente<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus v3.0.x suporta a adição de um campo StructArray a uma coleção existente. O campo StructArray adicionado deve ser nulo, uma vez que as entidades que já existem na coleção não têm valores para o novo campo.</p>
<p>Para adicionar um campo StructArray a uma coleção existente, defina primeiro o esquema Struct. Em seguida, chame ` <code translate="no">add_collection_struct_field()</code> ` e defina ` <code translate="no">nullable=True</code>`.</p>
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
<p>Após a adição do campo StructArray, as entidades existentes devolvem ` <code translate="no">null</code> ` para o novo campo em todos os seus subcampos.</p>
<p>Depois de criado um campo StructArray, não é possível adicionar novos subcampos a esse campo StructArray existente. Se, posteriormente, necessitar de atributos de elemento adicionais, chame <code translate="no">drop_collection_field()</code> para eliminar o campo StructArray e, em seguida, adicione um novo campo StructArray com o esquema Struct atualizado.</p>
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
<h2 id="Schema-rules" class="common-anchor-header">Regras do esquema<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
<tr><th>Regra</th><th>Explicação</th></tr>
</thead>
<tbody>
<tr><td>O Struct é utilizado como tipo de elemento Array.</td><td>Crie um campo StructArray como um campo Array com ` <code translate="no">element_type=STRUCT</code>`. Não crie Struct como um campo de coleção de nível superior.</td></tr>
<tr><td>Todos os elementos partilham um único esquema.</td><td>Cada elemento Struct no mesmo campo StructArray segue o esquema Struct definido para esse campo.</td></tr>
<tr><td><code translate="no">max_capacity</code> é obrigatório.</td><td>Limita o número de elementos Struct que cada entidade pode armazenar no campo StructArray.</td></tr>
<tr><td>Apenas são permitidos os tipos de subcampos suportados.</td><td>Utilize tipos de subcampos escalares e vetoriais suportados pelo StructArray. Não defina subcampos JSON, Geometry, Text, Timestamptz, SparseFloatVector ou subcampos Struct / Array aninhados.</td></tr>
<tr><td>Os subcampos vetoriais necessitam de índices antes da pesquisa.</td><td>Crie índices em percursos como <code translate="no">chunks[emb_list_vector]</code> ou <code translate="no">chunks[emb]</code> antes de executar a pesquisa vetorial.</td></tr>
<tr><td>Um subcampo vetorial tem um índice.</td><td>Se precisar tanto da pesquisa EmbeddingList como da pesquisa ao nível do elemento, crie dois subcampos vetoriais separados.</td></tr>
<tr><td>Os subcampos StructArray existentes são fixos.</td><td>Após criar um campo StructArray, não espere poder adicionar mais subcampos a esse mesmo campo StructArray.</td></tr>
<tr><td>As funções não são suportadas dentro de Struct.</td><td>Não defina funções para campos ou subcampos dentro de um campo StructArray.</td></tr>
<tr><td>Os subcampos escalares devem corresponder às necessidades de filtragem.</td><td>Adicione campos como <code translate="no">section</code>, <code translate="no">quality_score</code> ou <code translate="no">has_code</code> apenas quando precisar de os filtrar, agrupar ou apresentar posteriormente.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Erros comuns<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Criar « <code translate="no">DataType.STRUCT</code> » como um campo de coleção de nível superior, em vez de o utilizar como o tipo de elemento de um campo «Array».</p></li>
<li><p>Esquecer-se de definir « <code translate="no">max_capacity</code> » no campo «StructArray».</p></li>
<li><p>Definir tipos de subcampos não suportados, tais como JSON, Geometry, Text, Timestamptz, SparseFloatVector, Array aninhado, Struct aninhado ou Array-of-Struct.</p></li>
<li><p>Utilizar « <code translate="no">String</code> » como tipo de subcampo. Utilize « <code translate="no">VARCHAR</code> » e defina « <code translate="no">max_length</code> ».</p></li>
<li><p>Utilizar um único subcampo vetorial tanto para a pesquisa na EmbeddingList como para a pesquisa ao nível dos elementos.</p></li>
<li><p>Adicionar apenas subcampos vetoriais e esquecer os subcampos escalares necessários para a filtragem, tais como <code translate="no">section</code>, <code translate="no">quality_score</code> ou <code translate="no">has_code</code>.</p></li>
<li><p>Tratar os subcampos vetoriais como entradas de predicados escalares <code translate="no">$[...]</code>. Utilizar subcampos vetoriais para a pesquisa vetorial e subcampos escalares para predicados escalares.</p></li>
<li><p>Partir do princípio de que é possível adicionar novos subcampos a um campo StructArray existente após a criação do campo.</p></li>
<li><p>Utilizar <code translate="no">chunks.emb</code> ou <code translate="no">chunks.emb_list_vector</code> em vez da sintaxe de caminho obrigatória <code translate="no">chunks[emb]</code> ou <code translate="no">chunks[emb_list_vector]</code>.</p></li>
<li><p>Tratar o comportamento do StructArray nulo como se estivesse disponível em todas as versões de destino.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Próximos passos<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Para inserir dados aninhados no campo StructArray, consulte <a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados em campos StructArray</a>.</p></li>
<li><p>Para criar índices vetoriais e escalares, consulte <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para pesquisar subcampos vetoriais do StructArray, consulte «Pesquisa vetorial básica com StructArray».</p></li>
<li><p>Para consultar os tipos de dados suportados, o comportamento nulo e as limitações específicas de cada versão, leia <a href="/docs/pt/structarray-limits.md">«Limites do StructArray</a>».</p></li>
</ol>
