---
id: structarray-limits.md
title: Limites do StructArray
summary: >-
  O suporte ao StructArray abrange a definição do esquema, os dados de inserção,
  a indexação, os modos de pesquisa e os filtros específicos do StructArray.
  Utilize esta página como referência sobre os limites antes de contar com o
  comportamento do StructArray em ambiente de produção.
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
    </button></h2><table>
<thead>
<tr><th>Área</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Formato do esquema</td><td>Um Struct só pode ser utilizado como tipo de elemento de um campo Array. O Struct não é suportado como campo de coleção de nível superior.</td></tr>
<tr><td>Esquema do subcampo</td><td>Todos os elementos Struct no mesmo campo StructArray partilham um esquema Struct predefinido.</td></tr>
<tr><td>A capacidade</td><td><code translate="no">max_capacity</code> é obrigatório e limita o número de elementos Struct que uma entidade pode armazenar no campo StructArray.</td></tr>
<tr><td>Alterações no subcampo</td><td>Após a criação de um campo StructArray, não é possível adicionar subcampos a esse campo StructArray já existente.</td></tr>
<tr><td>Caminho do subcampo</td><td>Utilize percursos do tipo « <code translate="no">structArray[subfield]</code> », como <code translate="no">chunks[emb]</code>, para índices, alvos de pesquisa, campos de saída e filtros. Não utilize <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Inserir forma</td><td>Inserir um campo StructArray como uma matriz de objetos. Não utilize sintaxe de caminho dentro de cargas de inserção.</td></tr>
<tr><td>Índices vetoriais</td><td>Um campo vetorial ou subcampo vetorial aceita apenas um índice. Utilize subcampos vetoriais separados para a pesquisa EmbeddingList e a pesquisa ao nível do elemento.</td></tr>
<tr><td>Funções</td><td>As funções de campo não são suportadas para campos ou subcampos dentro de um campo StructArray.</td></tr>
<tr><td>Campos nulos</td><td>Os campos StructArray nulos estão sujeitos a restrições de versão. Quando suportados, o valor nulo aplica-se a todo o campo StructArray, e não a um elemento Struct individual de forma independente.</td></tr>
<tr><td>Adicionar campo dinâmico</td><td>A adição de um campo StructArray a uma coleção existente depende da versão e requer que o campo adicionado seja nulo.</td></tr>
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
    </button></h2><table>
<thead>
<tr><th>Limite</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Struct não é um tipo de campo de nível superior.</td><td>Crie um campo StructArray como um <code translate="no">datatype=DataType.ARRAY</code>, com um <code translate="no">element_type=DataType.STRUCT</code> e e um <code translate="no">struct_schema</code>.</td></tr>
<tr><td>Todos os elementos partilham um único esquema.</td><td>Cada elemento Struct num campo StructArray segue a mesma lista de subcampos e os mesmos tipos de dados dos subcampos.</td></tr>
<tr><td><code translate="no">max_capacity</code> é obrigatório.</td><td>O número de elementos Struct numa entidade não deve exceder o valor de « <code translate="no">max_capacity</code> » configurado para o campo StructArray.</td></tr>
<tr><td>Os subcampos existentes são fixos.</td><td>Não é possível adicionar novos subcampos a um campo StructArray existente. Para alterar o esquema dos subcampos, elimine o campo StructArray e adicione-o novamente com o esquema atualizado.</td></tr>
<tr><td>Não são suportados StructArray aninhados.</td><td>Um campo StructArray não pode conter subcampos aninhados do tipo <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code>.</td></tr>
<tr><td>As funções não são suportadas no interior de StructArray.</td><td>Não defina funções de campo para campos StructArray nem para os seus subcampos.</td></tr>
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
    </button></h2><p>Os subcampos do StructArray correspondem a um armazenamento físico do tipo matriz. A tabela seguinte lista os tipos físicos suportados e não suportados.</p>
<table>
<thead>
<tr><th>Tipo físico do subcampo Struct</th><th>Suporte</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Suportado</td><td>Defina o subcampo como ` <code translate="no">DataType.BOOL</code>`.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> ou <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.FLOAT</code> ou <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Compatível</td><td>Defina o subcampo como <code translate="no">DataType.VARCHAR</code> e defina <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.FLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BFLOAT16_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.INT8_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Compatível</td><td>Defina o subcampo como « <code translate="no">DataType.BINARY_VECTOR</code> » e defina « <code translate="no">dim</code> ».</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Não suportado</td><td>Os subcampos de vetores esparsos não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Utilize « <code translate="no">VARCHAR</code> », e não « <code translate="no">String</code> ».</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos JSON não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos de geometria e as funções GIS não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos de texto não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Não suportado</td><td>Os subcampos «Timestamptz» e as expressões específicas de hora não são suportados nos campos StructArray.</td></tr>
<tr><td><code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> ou <code translate="no">ArrayOfStruct</code></td><td>Não suportado</td><td>Os campos StructArray não suportam subcampos aninhados do tipo array, vector-array, Struct ou Array-of-Struct.</td></tr>
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
    </button></h2><p>O comportamento do StructArray nulo e a adição dinâmica de campos StructArray estão sujeitos a restrições de versão.</p>
<table>
<thead>
<tr><th>Capacidade</th><th>Limite</th></tr>
</thead>
<tbody>
<tr><td>Campo StructArray nulo</td><td>Suportado apenas em versões que incluam suporte a StructArray nulo e a matrizes vetoriais nulas.</td></tr>
<tr><td>Valor nulo em Python</td><td>Utilize ` <code translate="no">None</code> ` para inserir um valor nulo de StructArray em Python. Não utilize ` <code translate="no">Null</code> ` nem ` <code translate="no">null</code>`.</td></tr>
<tr><td>Âmbito do valor nulo</td><td>O valor nulo aplica-se a todo o campo StructArray. Por exemplo, ` <code translate="no">chunks=None</code> ` só é válido quando ` <code translate="no">chunks</code> ` é nulo.</td></tr>
<tr><td>Valor StructArray parcialmente nulo</td><td>Quando um campo StructArray contém um valor de matriz válido, não misture matrizes de subcampos nulos com matrizes de subcampos válidos no mesmo valor.</td></tr>
<tr><td>Adicionar dinamicamente um campo StructArray</td><td>A adição de um campo StructArray a uma coleção existente só é suportada em versões que incluam suporte a campos StructArray dinâmicos.</td></tr>
<tr><td>Requisito de nulo para adição dinâmica</td><td>Um campo StructArray adicionado a uma coleção existente deve ser nulo, uma vez que as entidades existentes não têm qualquer valor para o novo campo.</td></tr>
<tr><td>Entidades existentes após a adição dinâmica</td><td>As entidades existentes devolvem « <code translate="no">null</code> » para o campo StructArray adicionado em todos os seus subcampos.</td></tr>
</tbody>
</table>
<p>No Milvus v3.0.x, estão disponíveis campos StructArray nulos, matrizes vetoriais nulas e a adição dinâmica de campos StructArray.</p>
<p>Para exemplos de inserção com campos StructArray nulos, consulte <a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados em campos StructArray</a>.</p>
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
    </button></h2><table>
<thead>
<tr><th>Limite</th><th>Detalhes</th></tr>
</thead>
<tbody>
<tr><td>Formato da carga útil</td><td>Inserir o campo StructArray como uma matriz de objetos Struct, tal como <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Nomes dos subcampos</td><td>Dentro de cada objeto Struct, utilize nomes de subcampos como <code translate="no">text</code> e <code translate="no">emb</code>, e não percursos como <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Alinhamento com o esquema</td><td>Cada elemento Struct deve corresponder ao esquema Struct.</td></tr>
<tr><td>Capacidade</td><td>O número de elementos Struct numa entidade não deve exceder <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Dimensões do vetor</td><td>Os valores do vetor devem corresponder ao <code translate="no">dim</code> configurado para os seus subcampos vetoriais.</td></tr>
<tr><td>Duplicação no modo de pesquisa</td><td>Se necessitar tanto da pesquisa EmbeddingList como da pesquisa ao nível do elemento, escreva os vetores em dois subcampos de vetor separados.</td></tr>
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
    </button></h2><p>Um subcampo vetorial StructArray pode ser indexado para pesquisa EmbeddingList ou para pesquisa ao nível do elemento. O mesmo subcampo vetorial não pode utilizar ambas as famílias de métricas, uma vez que cada campo vetorial ou subcampo vetorial aceita apenas um índice.</p>
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
<p>Os subcampos vetoriais do StructArray contam como subcampos vetoriais quando planear o esquema da sua coleção. Mantenha o número total de campos vetoriais e subcampos vetoriais dentro dos limites da sua versão de destino e nível de serviço.</p>
<p>Para conhecer a matriz de tipos de índice e de métricas suportados, consulte <a href="/docs/pt/index-structarray-fields.md">Campos StructArray de índice</a>.</p>
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
    </button></h2><table>
<thead>
<tr><th>Comportamento da pesquisa</th><th>Suporte e limites</th></tr>
</thead>
<tbody>
<tr><td>Pesquisa básica no EmbeddingList</td><td>Suportada em subcampos vetoriais do StructArray indexados com métric <code translate="no">MAX_SIM*</code>. Devolve resultados ao nível da entidade.</td></tr>
<tr><td>Pesquisa básica ao nível do elemento</td><td>Suportada em subcampos vetoriais de StructArray indexados com métricas vetoriais regulares. Pode devolver os deslocamentos dos elementos correspondentes.</td></tr>
<tr><td>Pesquisa por intervalo</td><td>Suportada de acordo com o modo de pesquisa e o suporte a índices/métricas da versão de destino. Para o comportamento do intervalo de pesquisa híbrido em pedidos StructArray ao nível do elemento, verifique a sua versão de destino.</td></tr>
<tr><td>Pesquisa por agrupamento</td><td>A pesquisa por agrupamento ao nível do elemento pode devolver deslocamentos. O comportamento de agrupamento da pesquisa híbrida para pedidos StructArray ao nível do elemento depende da versão.</td></tr>
<tr><td>Pesquisa híbrida</td><td>Uma solicitação de pesquisa híbrida só pode incluir solicitações de subcampos vetoriais StructArray se a versão de destino suportar essa combinação de pesquisa. Cada solicitação continua a seguir a família de métricas do subcampo vetorial indexado.</td></tr>
<tr><td>Saída de deslocamento</td><td>O deslocamento está disponível para resultados de pesquisa ao nível do elemento. A pesquisa EmbeddingList devolve resultados ao nível da entidade e não utiliza deslocamentos de elementos como unidade principal de resultados.</td></tr>
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
<li><p>Utilize o ` <code translate="no">$[subfield]</code> ` apenas no interior de operadores StructArray.</p></li>
<li><p>Utilize subcampos escalares para predicados escalares.</p></li>
<li><p>Não utilize subcampos vetoriais como entradas de predicados escalares do ` <code translate="no">$[...]</code> `.</p></li>
<li><p>A sintaxe JSON path, as funções JSON, as funções de contentores de matrizes, as funções de correspondência de texto, as funções de geometria/SIG e as expressões Timestamptz não são suportadas para predicados ao nível do elemento StructArray.</p></li>
<li><p>Dê preferência a comparações booleanas explícitas, como « <code translate="no">$[has_code] == true</code> », em vez de expressões booleanas simples.</p></li>
</ul>
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
<li><p>Para criar um campo StructArray, consulte <a href="/docs/pt/create-structarray-field.md">«Criar um campo StructArray</a>».</p></li>
<li><p>Para inserir dados, consulte <a href="/docs/pt/insert-data-into-structarray-fields.md">Inserir dados em campos StructArray</a>.</p></li>
<li><p>Para criar índices vetoriais e escalares, leia <a href="/docs/pt/index-structarray-fields.md">«Indexar campos StructArray</a>».</p></li>
<li><p>Para rever a sintaxe do filtro StructArray, leia <a href="/docs/pt/struct-array-operators.md">«Operadores StructArray</a>».</p></li>
</ol>
