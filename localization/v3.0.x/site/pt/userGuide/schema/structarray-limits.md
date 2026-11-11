---
id: structarray-limits.md
title: Limites do StructArray
summary: >-
  O suporte ao StructArray abrange a definição do esquema, os dados de inserção,
  a indexação, os modos de pesquisa e os filtros específicos do StructArray.
  Utilize esta página como referência sobre os limites antes de contar com o
  comportamento do StructArray em produção.
---
<h1 id="StructArray-Limits" class="common-anchor-header">Limites do StructArray<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>O suporte ao StructArray abrange a definição do esquema, a inserção de cargas úteis, a indexação, os modos de pesquisa e os filtros específicos do StructArray. Utilize esta página como referência de limites antes de confiar no comportamento do StructArray em produção.</p>
<p>A maioria dos limites do StructArray provém de uma de três fontes: o modelo de esquema do StructArray, o modo de pesquisa que escolher para os subcampos vetoriais e a versão do Milvus em que a sua coleção é executada.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Visão geral dos limites<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
    </button></h2><p>Os principais limites do StructArray são:</p>
<table>
<thead>
<tr><th>Área</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Formato do esquema</td><td>Uma Struct só pode ser utilizada como tipo de elemento de um campo Array. A Struct não é suportada como campo de coleção de nível superior.</td></tr>
<tr><td>Esquema do subcampo</td><td>Todos os elementos Struct no mesmo campo StructArray partilham um esquema Struct predefinido.</td></tr>
<tr><td>Subcampos aninhados</td><td>A partir do Milvus 3.0.6, uma Struct pode conter subcampos escalares <code translate="no">ARRAY</code> com um nível de aninhamento. Os subcampos aninhados <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code> e JSON não são suportados em nenhuma versão.</td></tr>
<tr><td>A capacidade</td><td><code translate="no">max_capacity</code> é obrigatória e limita o número de elementos «Struct» que uma entidade pode armazenar no campo «StructArray».</td></tr>
<tr><td>Alterações nos subcampos</td><td>A partir do Milvus 3.0.6, é possível adicionar um subcampo com elemento nulo a um campo StructArray existente ou remover um subcampo do mesmo. As versões anteriores exigem a remoção e a readição de todo o campo StructArray.</td></tr>
<tr><td>Caminho do subcampo</td><td>Utilize percursos do tipo « <code translate="no">structArray[subfield]</code> », como <code translate="no">chunks[emb]</code>, para índices, alvos de pesquisa, campos de saída e filtros. Não utilize <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Inserir forma</td><td>Inserir um campo StructArray como uma matriz de objetos. Não utilize sintaxe de caminho dentro de cargas de inserção.</td></tr>
<tr><td>Índices vetoriais</td><td>Um campo vetorial ou subcampo vetorial aceita apenas um índice. Utilize subcampos vetoriais separados para a pesquisa EmbeddingList e a pesquisa ao nível do elemento.</td></tr>
<tr><td>Funções</td><td>As funções de campo não são suportadas para campos ou subcampos dentro de um campo StructArray.</td></tr>
<tr><td>Campos nulos</td><td>Os campos StructArray nulos estão sujeitos a restrições de versão. O valor nulo ao nível da linha aplica-se a todo o campo StructArray. A partir do Milvus 3.0.6, um subcampo pode, adicionalmente, permitir um valor nulo num elemento Struct individual: <code translate="no">nullable=True</code> num subcampo escalar ou vetorial, <code translate="no">element_nullable=True</code> num subcampo de matriz. Um elemento Struct, por si só, não pode ser nulo.</td></tr>
<tr><td>Adicionar campo dinâmico</td><td>A adição de um campo StructArray a uma coleção existente está sujeita a restrições de versão e requer que o campo adicionado seja nulo.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Limites do esquema<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Os esquemas StructArray têm os seguintes limites:</p>
<table>
<thead>
<tr><th>Limite</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>O Struct não é um tipo de campo de nível superior.</td><td>Crie um campo StructArray como « <code translate="no">datatype=DataType.ARRAY</code> » com « <code translate="no">element_type=DataType.STRUCT</code> » e « <code translate="no">struct_schema</code> ».</td></tr>
<tr><td>Todos os elementos partilham um único esquema.</td><td>Cada elemento Struct num campo StructArray segue a mesma lista de subcampos e os mesmos tipos de dados dos subcampos.</td></tr>
<tr><td><code translate="no">max_capacity</code> é obrigatório.</td><td>O número de elementos Struct numa entidade não deve exceder o <code translate="no">max_capacity</code> configurado para o campo StructArray.</td></tr>
<tr><td>Os subcampos escalares de « <code translate="no">ARRAY</code> » têm « <code translate="no">max_capacity</code> » por subcampo.</td><td>Um subcampo escalar de « <code translate="no">ARRAY</code> » declara um « <code translate="no">max_capacity</code> » para a sua matriz interna, e o Milvus rejeita um elemento «Struct» cuja matriz interna exceda a capacidade declarada desse subcampo. Os valores não precisam de coincidir entre subcampos. O valor deve ser superior a 0 e não deve exceder « <code translate="no">proxy.maxArrayCapacity</code> », cujo valor predefinido é 4096.</td></tr>
<tr><td>Os subcampos podem sofrer alterações no Milvus 3.0.6 e versões posteriores.</td><td>Adicione um subcampo com elemento nulo ou elimine um subcampo pela sua trajetória, como <code translate="no">chunks[lang]</code>. Não é possível eliminar o último subcampo de um campo StructArray, o último campo vetorial da coleção ou um subcampo utilizado por uma Função. Em versões anteriores, elimine o campo StructArray e adicione-o novamente com o esquema atualizado.</td></tr>
<tr><td>Não são suportadas estruturas aninhadas.</td><td>Uma Struct não pode conter subcampos aninhados do tipo « <code translate="no">Struct</code> », « <code translate="no">ArrayOfStruct</code> » ou JSON. A partir do Milvus 3.0.6, uma Struct pode conter subcampos escalares do tipo « <code translate="no">ARRAY</code> » com um nível de aninhamento. Um subcampo « <code translate="no">ARRAY</code> » não pode conter vetores.</td></tr>
<tr><td>As funções não são suportadas no interior de um StructArray.</td><td>Não defina funções de campo para campos de StructArray nem para os seus subcampos.</td></tr>
<tr><td>As propriedades de campo estão limitadas nos campos StructArray.</td><td>A partir do Milvus 3.0.6, a função « <code translate="no">alter_collection_field()</code> » aplicada a um campo StructArray ou a um caminho de subcampo aceita apenas « <code translate="no">mmap.enabled</code> », « <code translate="no">field.description</code> » e « <code translate="no">warmup</code> ». Outras propriedades, tais como « <code translate="no">max_capacity</code> » e « <code translate="no">max_length</code> », são rejeitadas.</td></tr>
<tr><td>A análise de texto não é suportada em subcampos.</td><td>A definição de « <code translate="no">enable_match</code> » ou « <code translate="no">enable_analyzer</code> » num subcampo Struct é rejeitada. Os índices de texto são criados apenas para campos de nível superior.</td></tr>
</tbody>
</table>
<p>Para exemplos de criação de esquemas, consulte <a href="/docs/pt/create-structarray-field.md">Criar um campo StructArray</a>.</p>
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
    </button></h2><p>Os subcampos StructArray correspondem a um armazenamento físico do tipo matriz. A tabela seguinte lista os tipos físicos suportados e não suportados:</p>
<table>
<thead>
<tr><th>Tipo físico do subcampo Struct</th><th>Suporte</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>Suportado</td><td>Defina o subcampo como ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.VARCHAR</code> » e defina « <code translate="no">max_length</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>Não suportado</td><td>Os subcampos de vetores esparsos não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>Não suportado</td><td>Utilize « <code translate="no">VARCHAR</code> », e não « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>Não suportado</td><td>Os subcampos JSON não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>Não suportado</td><td>Os subcampos de geometria e as funções GIS não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>Não suportado</td><td>Os subcampos de texto não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>Não suportado</td><td>Os subcampos «timestamptz» e as expressões específicas de tempo não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Suportado no Milvus 3.0.6 e versões posteriores</td><td>Defina o subcampo como « <code translate="no">DataType.ARRAY</code> » com um escalar « <code translate="no">element_type</code> » e um « <code translate="no">max_capacity</code> » para a matriz interna. Cada elemento «Struct» contém, então, uma matriz interna. Defina « <code translate="no">nullable=True</code> » no subcampo para permitir uma matriz interna nula e « <code translate="no">element_nullable=True</code> » para permitir valores nulos no seu interior.</td></tr>
<tr><td><code translate="no">Array</code> de <code translate="no">Array</code> de <code translate="no">Array</code>, <code translate="no">Array</code> de vetores, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code></td><td>Não suportado</td><td>O aninhamento de matrizes dentro de uma Struct está limitado a um nível, a matriz interna não pode conter vetores e os subcampos aninhados de Struct ou Array-of-Struct não são suportados.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Limites de esquemas nulos e dinâmicos<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>A tabela seguinte descreve o comportamento de StructArray nulo e a adição dinâmica de campos StructArray, sujeito à declaração de disponibilidade abaixo:</p>
<table>
<thead>
<tr><th>Capacidade</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nulo</td><td>Sujeito à declaração de disponibilidade abaixo, defina « <code translate="no">nullable=True</code> » no StructArray pai; não configure os subcampos do Struct como nulos de forma independente.</td></tr>
<tr><td>Valor NULL em Python</td><td>Utilize ` <code translate="no">None</code> ` para inserir um valor nulo no `StructArray` em Python. Não utilize ` <code translate="no">Null</code> ` nem ` <code translate="no">null</code>`.</td></tr>
<tr><td>Âmbito do valor nulo</td><td>O valor NULL aplica-se a todo o campo StructArray. Por exemplo, <code translate="no">chunks=None</code> só é válido quando <code translate="no">chunks</code> é nulo.</td></tr>
<tr><td>Valor StructArray parcialmente nulo</td><td>Quando um campo StructArray contém um valor de matriz válido, não misture matrizes de subcampos nulos com matrizes de subcampos válidos no mesmo valor.</td></tr>
<tr><td>Nulo ao nível do elemento</td><td>Suportado no Milvus 3.0.6 e versões posteriores. Um subcampo escalar, vetorial ou « <code translate="no">ARRAY</code> » pode permitir um valor nulo em elementos individuais da Struct: « <code translate="no">nullable=True</code> » num subcampo escalar ou vetorial, « <code translate="no">element_nullable=True</code> » num subcampo « <code translate="no">ARRAY</code> ». A definição « <code translate="no">nullable</code> » ao nível da linha continua a provir do pai do StructArray; definir « <code translate="no">nullable=True</code> » num subcampo ativa o nulo ao nível do elemento, não o nulo ao nível da linha.</td></tr>
<tr><td>Elemento Struct nulo</td><td>Um elemento Struct, por si só, não pode ser nulo, como por exemplo <code translate="no">[null, {...}]</code>. Em vez disso, defina os valores dos subcampos do elemento como nulos.</td></tr>
<tr><td>Subcampos omitidos</td><td>A partir do Milvus 3.0.6, pode omitir um subcampo com elemento nulo de um elemento Struct, e o Milvus armazena «null» para esse subcampo. Um subcampo que não seja de elemento nulo deve estar presente em todos os elementos Struct. Nas versões anteriores, todos os elementos Struct tinham de fornecer todos os subcampos.</td></tr>
<tr><td>Adicionar dinamicamente um campo StructArray</td><td>Sujeito à declaração de disponibilidade abaixo.</td></tr>
<tr><td>Requisito de nulo para adição dinâmica</td><td>Um campo StructArray adicionado a uma coleção existente deve ser nulo, uma vez que as entidades existentes não têm valor para o novo campo.</td></tr>
<tr><td>Entidades existentes após a adição dinâmica</td><td>As entidades existentes devolvem « <code translate="no">null</code> » para o campo StructArray adicionado.</td></tr>
<tr><td>Subcampo de adição dinâmica</td><td>Suportado no Milvus 3.0.6 e versões posteriores. Um subcampo adicionado deve ser criado com a propriedade « <code translate="no">nullable=True</code> »; um subcampo « <code translate="no">ARRAY</code> » adicionado aceita adicionalmente a propriedade « <code translate="no">element_nullable=True</code> » para valores nulos no interior da matriz interna. As entidades existentes devolvem «null» para o novo subcampo em cada um dos seus elementos «Struct», e as entidades cujo campo «StructArray» seja «null» permanecem «null».</td></tr>
</tbody>
</table>
<p>O Milvus 3.0.0 e versões posteriores suportam campos StructArray nulos, matrizes vetoriais nulas e a adição dinâmica de campos StructArray tanto em implementações autónomas como distribuídas. As versões anteriores do Milvus não suportam estas funcionalidades.</p>
<p>O Milvus 3.0.6 e versões posteriores suportam adicionalmente valores nulos ao nível do elemento, subcampos « <code translate="no">ARRAY</code> » escalares e a adição ou remoção de subcampos de um campo «StructArray» existente. Estas funcionalidades requerem o Storage V2 e não estão disponíveis em coleções externas.</p>
<p>No Zilliz Cloud, estas funcionalidades estão disponíveis em clusters «On-Demand» que executam o Milvus 3.0.0 ou versões posteriores. Os clusters «Serving» não as suportam.</p>
<p>Para exemplos de inserção com campos StructArray que podem ser nulos, consulte <a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados em campos StructArray</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">Limites de inserção<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>As cargas de inserção do StructArray têm os seguintes limites:</p>
<table>
<thead>
<tr><th>Limite</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Formato da carga útil</td><td>Insira o campo StructArray como uma matriz de objetos Struct, tal como <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nomes dos subcampos</td><td>Dentro de cada objeto Struct, utilize nomes de subcampos como <code translate="no">text</code> e <code translate="no">emb</code>, e não percursos como <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Alinhamento com o esquema</td><td>Cada elemento Struct deve corresponder ao esquema Struct. A partir do Milvus 3.0.6, um subcampo de elemento nulo pode ser omitido ou definido como <code translate="no">null</code> num elemento Struct.</td></tr>
<tr><td>Capacidade</td><td>O número de elementos Struct numa entidade não deve exceder <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensões do vetor</td><td>Os valores dos vetores devem corresponder à « <code translate="no">dim</code> » configurada para os seus subcampos vetoriais.</td></tr>
<tr><td>Duplicação no modo de pesquisa</td><td>Se necessitar tanto da pesquisa na EmbeddingList como da pesquisa ao nível do elemento, escreva os vetores em dois subcampos de vetor separados.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Limites de índice e métrica<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Um subcampo vetorial StructArray pode ser indexado para a pesquisa EmbeddingList ou para a pesquisa ao nível do elemento. O mesmo subcampo vetorial não pode utilizar ambas as famílias de métricas, uma vez que cada campo vetorial ou subcampo vetorial aceita apenas um índice. Os modos de pesquisa utilizam as seguintes famílias de métricas:</p>
<table>
<thead>
<tr><th>Modo de pesquisa</th><th>Família de métricas</th><th>Nível de resultado</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa EmbeddingList</td><td><code translate="no">MAX_SIM</code>, métricas « <code translate="no">MAX_SIM_COSINE</code> », « <code translate="no">MAX_SIM_IP</code> », « <code translate="no">MAX_SIM_L2</code> » ou métricas binárias « <code translate="no">MAX_SIM_*</code> »</td><td>Resultados ao nível da entidade.</td></tr>
<tr><td>Pesquisa ao nível do elemento</td><td>Métricas vetoriais regulares, tais como <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> ou <code translate="no">JACCARD</code></td><td>Resultados ao nível do elemento que podem incluir o deslocamento do elemento correspondente.</td></tr>
</tbody>
</table>
<p>Utilize subcampos vetoriais separados quando ambos os modos forem necessários. Por exemplo, utilize <code translate="no">chunks[emb_list_vector]</code> para a pesquisa EmbeddingList e <code translate="no">chunks[emb]</code> para a pesquisa ao nível do elemento.</p>
<p>Os subcampos vetoriais StructArray contam como campos vetoriais para o limite ao nível da coleção <code translate="no">proxy.maxVectorFieldNum</code>, cujo valor predefinido é 10. Um campo StructArray cujos subcampos vetoriais sejam os únicos campos vetoriais da coleção é válido, e a remoção desse campo é rejeitada quando isso deixaria a coleção sem nenhum campo vetorial. Mantenha o número total de campos vetoriais e subcampos vetoriais dentro dos limites da sua versão de destino e nível de serviço.</p>
<p>A partir do Milvus 3.0.6, um subcampo vetorial com elementos nulos suporta apenas a pesquisa ao nível do elemento com métricas vetoriais regulares. As métricas <code translate="no">MAX_SIM*</code>, os índices EmbeddingList e a pesquisa EmbeddingList são rejeitados em subcampos vetoriais com elementos nulos, e o <code translate="no">AUTOINDEX</code> não seleciona uma métrica <code translate="no">MAX_SIM*</code> para os mesmos. Os vetores nulos não participam na pesquisa. Os índices escalares não são suportados em subcampos com elementos nulos nem em subcampos escalares do tipo « <code translate="no">ARRAY</code> ».</p>
<p>Para conhecer a matriz de tipos de índice e de métrica suportados, consulte <a href="/docs/pt/index-structarray-fields.md">Campos StructArray do Índice</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Limites de pesquisa<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>O comportamento de pesquisa do StructArray tem os seguintes limites:</p>
<table>
<thead>
<tr><th>Comportamento da pesquisa</th><th>Suporte e limites</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa básica na EmbeddingList</td><td>Suportada em subcampos vetoriais do StructArray indexados com métricas d <code translate="no">MAX_SIM*</code>. Devolve resultados ao nível da entidade.</td></tr>
<tr><td>Pesquisa básica ao nível do elemento</td><td>Suportada em subcampos vetoriais do StructArray indexados com métricas vetoriais regulares. Pode devolver os deslocamentos dos elementos correspondentes.</td></tr>
<tr><td>Pesquisa por intervalo</td><td>Suportada de acordo com o modo de pesquisa e o suporte a índices/métricas da versão de destino. Para o comportamento do intervalo de pesquisa híbrido em pedidos StructArray ao nível do elemento, verifique a sua versão de destino.</td></tr>
<tr><td>Pesquisa por agrupamento</td><td>A pesquisa agrupada ao nível do elemento pode devolver deslocamentos. O comportamento híbrido de agrupamento na pesquisa para pedidos StructArray ao nível do elemento depende da versão.</td></tr>
<tr><td>Pesquisa híbrida</td><td>Uma solicitação de pesquisa híbrida só pode incluir solicitações de subcampos vetoriais StructArray se a versão de destino suportar essa combinação de pesquisa. Cada solicitação continua a seguir a família de métricas do subcampo vetorial indexado.</td></tr>
<tr><td>Saída de deslocamento</td><td>O deslocamento está disponível para resultados de pesquisa ao nível do elemento. A pesquisa EmbeddingList devolve resultados ao nível da entidade e não utiliza deslocamentos de elementos como unidade principal de resultado.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Limites de filtros e operadores<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>A filtragem escalar do StructArray é tratada por operadores do StructArray, tais como « <code translate="no">element_filter</code> » e a família « <code translate="no">MATCH_*</code> ». A matriz detalhada de suporte a predicados encontra-se em <a href="/docs/pt/struct-array-operators.md">«Operadores do StructArray</a>».</p>
<p>A um nível geral:</p>
<ul>
<li><p>Utilize « <code translate="no">$[subfield]</code> » apenas no interior de operadores StructArray.</p></li>
<li><p>As expressões de filtragem ao nível da linha também podem referenciar diretamente percursos do StructArray: « <code translate="no">chunks[0][section]</code> » para a posição de um elemento, « <code translate="no">array_length(chunks)</code> » para a contagem de elementos, « <code translate="no">array_contains(chunks[section], ...)</code> » para valores de subcampos em todos os elementos e « <code translate="no">chunks is null</code> » num campo StructArray nulo.</p></li>
<li><p>Utilize subcampos escalares para predicados escalares.</p></li>
<li><p>Não utilize subcampos vetoriais como entradas de predicados escalares d <code translate="no">$[...]</code>.</p></li>
</ul>
<ul>
<li>A sintaxe JSON path, as funções JSON, as funções de correspondência de texto, as funções de geometria/SIG e as expressões Timestamptz não são suportadas para predicados ao nível do elemento StructArray. A partir do Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> e <code translate="no">array_length</code> são suportados em <code translate="no">$[subfield]</code> para subcampos escalares <code translate="no">ARRAY</code>, e <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> é suportado para todos os tipos de subcampos.</li>
</ul>
<ul>
<li>A partir do Milvus 3.0.6, um valor nulo num subcampo de um elemento Struct torna o predicado do elemento «desconhecido» em vez de «falso». <code translate="no">element_filter</code> mantém apenas os elementos cujo predicado seja «verdadeiro», e <code translate="no">MATCH_*</code> considera um elemento «desconhecido» como uma «falha». Para mais detalhes, consulte <a href="/docs/pt/struct-array-operators.md">Operadores StructArray</a>.</li>
</ul>
<ul>
<li>Dê preferência a comparações booleanas explícitas, como « <code translate="no">$[has_code] == true</code> », em vez de expressões booleanas simples.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Limites de importação e armazenamento<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><th>Limite</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Formatos de ficheiros de origem</td><td>Os ficheiros JSON, JSONL, CSV e Parquet podem conter campos StructArray. Os ficheiros NumPy contêm um ficheiro por campo de nível superior e não podem fornecer dados StructArray; utilize ficheiros JSON, CSV ou Parquet para coleções que tenham um campo StructArray. Para obter informações sobre as estruturas dos ficheiros, consulte <a href="/docs/pt/prepare-source-data.md#StructArray-fields-in-source-files">«Preparar dados de origem</a>».</td></tr>
<tr><td>Formato de armazenamento</td><td><code translate="no">ARRAY</code> Os subcampos com elementos nulos e os subcampos escalares « <code translate="no">ARRAY</code> » requerem o Storage V2. O Storage V1 não está disponível para coleções que utilizem estes subcampos: a criação da coleção e a inserção de dados podem parecer bem-sucedidas, mas os dados falham na fase de flush, o que não é um estado suportado. O Storage V3 com a opção « <code translate="no">common.storage.enableGrowingSourceFlush</code> » definida como « <code translate="no">true</code> » rejeita pedidos que utilizem subcampos de elementos nulos ou subcampos escalares « ».</td></tr>
<tr><td>Coleções externas</td><td>Os subcampos com elementos nulos e os subcampos escalares <code translate="no">ARRAY</code> não são suportados em coleções externas.</td></tr>
<tr><td>Importação de cópias de segurança e instantâneos</td><td>A importação de binlog, como a restauração de um backup, e a importação a partir de uma fonte de instantâneo são rejeitadas para coleções que tenham subcampos com elementos nulos ou subcampos escalares <code translate="no">ARRAY</code>.</td></tr>
<tr><td>Downgrade</td><td>As coleções que possuem subcampos com elementos nulos ou subcampos escalares <code translate="no">ARRAY</code> não podem ser executadas numa versão anterior à Milvus 3.0.6. A reprodução do registo de gravação antecipada (write-ahead log) na versão mais antiga provoca um erro grave. A atualização para a Milvus 3.0.6 ou posterior recupera os dados.</td></tr>
</tbody>
</table>
<h2 id="Related-pages" class="common-anchor-header">Páginas relacionadas<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>Para criar um campo StructArray, consulte <a href="/docs/pt/create-structarray-field.md">Criar um campo StructArray</a>.</p></li>
<li><p>Para inserir dados, consulte <a href="/docs/pt/insert-data-into-structarray-fields.md">«Inserir dados em campos StructArray</a>».</p></li>
<li><p>Para criar índices vetoriais e escalares, consulte <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para rever a sintaxe do filtro StructArray, leia <a href="/docs/pt/struct-array-operators.md">«Operadores StructArray</a>».</p></li>
</ol>
