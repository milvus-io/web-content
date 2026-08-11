---
id: json-indexing.md
title: Indexação JSON
summary: >-
  Os campos JSON oferecem uma forma flexível de armazenar metadados estruturados
  no Milvus. Sem indexação, as consultas nos campos JSON exigem varreduras
  completas da coleção, o que se torna lento à medida que o conjunto de dados
  cresce. A indexação JSON cria índices em percursos específicos dentro dos
  dados JSON, para que as consultas de igualdade, intervalo e outros filtros
  nesses percursos sejam executadas rapidamente.
---
<h1 id="JSON-Indexing" class="common-anchor-header">Indexação JSON<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>Os campos JSON oferecem uma forma flexível de armazenar metadados estruturados no Milvus. Sem indexação, as consultas nos campos JSON exigem varreduras completas da coleção, o que se torna lento à medida que o conjunto de dados cresce. A indexação JSON cria um índice num caminho específico dentro dos seus dados JSON, para que as consultas de igualdade, intervalo e outros filtros nesse caminho sejam executadas rapidamente.</p>
<p>A indexação JSON é ideal para:</p>
<ul>
<li><p>Esquemas estruturados com chaves consistentes e conhecidas</p></li>
<li><p>Consultas de igualdade, « <code translate="no">IN</code> », intervalo e correspondência de texto em caminhos JSON específicos</p></li>
<li><p>Cenários em que é necessário um controlo preciso sobre quais as chaves que são indexadas</p></li>
</ul>
<p>Para documentos JSON complexos com padrões de consulta diversificados, considere <a href="/docs/pt/json-shredding.md">o JSON Shredding</a> como alternativa.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Visão geral dos tipos de índice<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus oferece quatro tipos de índice para percursos JSON. Cada um é adequado a um padrão de consulta diferente.</p>
<p>Antes de escolher um tipo de índice, identifique o <strong>tipo de conversão</strong> para o caminho JSON. O tipo de conversão determina como o Milvus interpreta o valor nesse caminho e quais os tipos de índice disponíveis.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Compreender os tipos de conversão<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> é o tipo de dados utilizado para interpretar e indexar o valor em <code translate="no">json_path</code>. É diferente do tipo de esquema do campo: o campo continua a ser um campo « <code translate="no">JSON</code> », mas cada caminho indexado é tratado como um tipo específico de escalar, matriz ou objeto JSON.</p>
<p>Escolha o tipo de conversão que corresponda aos valores armazenados nesse caminho. Para verificar se um tipo de conversão é compatível com um tipo de índice específico, consulte <a href="/docs/pt/json-indexing.md#compatibility-reference">a Referência de compatibilidade</a>.</p>
<table>
<thead>
<tr><th>Tipo de conversão</th><th>Utilize quando o valor do caminho for…</th><th>Valor de exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Um valor booleano</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Um valor numérico</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Um valor de cadeia de caracteres</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Uma matriz de valores booleanos</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Uma matriz de valores numéricos</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Um array de valores de cadeia de caracteres</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>Um objeto JSON completo ou um subobjeto. A indexação de objetos JSON completos foi descontinuada a partir do Milvus 3.0.0.</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>Se os valores no mesmo caminho tiverem tipos inconsistentes, apenas os valores que correspondam ao tipo de conversão são indexados. Por exemplo, se <code translate="no">metadata[&quot;price&quot;]</code> contiver tanto <code translate="no">99.99</code> como <code translate="no">&quot;99.99&quot;</code>, um índice do tipo de conversão <code translate="no">DOUBLE</code> inclui o valor numérico e ignora o valor de cadeia de caracteres. Para converter valores de cadeia de caracteres durante a indexação, utilize <code translate="no">json_cast_function</code>; consulte <a href="/docs/pt/json-indexing.md#example-5-convert-data-type-at-index-time">o Exemplo 5: Converter o tipo de dados no momento da indexação</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Escolha um tipo de índice<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de escolher um tipo de conversão, selecione o tipo de índice de acordo com o seu padrão de consulta.</p>
<table>
<thead>
<tr><th>Padrão de consulta</th><th>Tipo de índice recomendado</th><th>Requisito do tipo de conversão</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Filtros mistos de igualdade e intervalo em valores escalares</td><td><code translate="no">AUTOINDEX</code></td><td>Utilize <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code>.</td><td>Permite que o Milvus escolha o layout interno do índice com base na cardinalidade dos valores.</td></tr>
<tr><td>Filtros sobre valores dentro de matrizes JSON</td><td><code translate="no">INVERTED</code></td><td>Utilize <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code> ou <code translate="no">ARRAY_VARCHAR</code>.</td><td>Obrigatório para todos os tipos de conversão de matrizes.</td></tr>
<tr><td>Indexação de objetos completos ou subobjetos (obsoleta)</td><td><code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code> (apenas por compatibilidade)</td><td>Utilize <code translate="no">JSON</code>.</td><td>Suportado por motivos de compatibilidade. Para novas cargas de trabalho, crie índices específicos por caminho ou considere <a href="/docs/pt/json-shredding.md">o JSON Shredding</a>.</td></tr>
<tr><td>Filtros de intervalo em números ou cadeias de caracteres ordenáveis</td><td><code translate="no">STL_SORT</code> ou <code translate="no">AUTOINDEX</code></td><td>Utilize <code translate="no">DOUBLE</code> ou <code translate="no">VARCHAR</code>.</td><td>Utilize <code translate="no">STL_SORT</code> para forçar um layout ordenado; utilize <code translate="no">AUTOINDEX</code> quando pretender a seleção automática.</td></tr>
<tr><td>Filtros de igualdade ou « <code translate="no">IN</code> » em valores de baixa cardinalidade</td><td><code translate="no">BITMAP</code> ou <code translate="no">AUTOINDEX</code></td><td>Utilize <code translate="no">BOOL</code> ou <code translate="no">VARCHAR</code>.</td><td>Utilize « <code translate="no">BITMAP</code> » para forçar um layout de bitmap. Para valores numéricos, utilize « <code translate="no">AUTOINDEX</code> » ou « <code translate="no">STL_SORT</code> ».</td></tr>
</tbody>
</table>
<p>Em caso de dúvida, comece por <code translate="no">AUTOINDEX</code> para caminhos escalares. Utilize <code translate="no">INVERTED</code> explicitamente para tipos de conversão de matriz e consultas de correspondência de texto. A indexação JSON de objetos completos com <code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code> continua a ser suportada, mas está obsoleta a partir do Milvus 3.0.0.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> depende do ` <code translate="no">json_cast_type</code> ` que especificar. No Milvus 3.0, ` <code translate="no">AUTOINDEX</code> ` já não resulta sempre em ` <code translate="no">INVERTED</code> ` para índices de percurso JSON.</p>
<table>
<thead>
<tr><th>Comportamento do tipo de conversão</th><th><code translate="no">AUTOINDEX</code> comportamento</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Escolhe entre <code translate="no">BITMAP</code> e <code translate="no">STL_SORT</code> com base na cardinalidade do valor.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Não suportado. Utilize explicitamente « <code translate="no">INVERTED</code> » como tipo de índice.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Utiliza <code translate="no">INVERTED</code> para indexação de objetos completos ou subobjetos. Este modo está obsoleto a partir do Milvus 3.0.0.</td></tr>
</tbody>
</table>
<p>Para tipos de conversão escalar (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code> e <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> é o ponto de partida recomendado quando se pretende que o Milvus escolha o layout de índice interno. Durante a criação do índice, o Milvus mede a <strong>cardinalidade</strong> dos valores no caminho JSON. Cardinalidade significa o número de valores distintos nesse caminho.</p>
<p>Com base na cardinalidade, o Milvus escolhe um de dois layouts internos:</p>
<ul>
<li><p><strong>Baixa cardinalidade</strong>: os valores repetem-se frequentemente, como <code translate="no">metadata[&quot;in_stock&quot;]</code> com <code translate="no">true</code> e <code translate="no">false</code>, ou <code translate="no">metadata[&quot;status&quot;]</code> com um pequeno conjunto de cadeias de caracteres de estado. O Milvus cria internamente um índice do tipo « <code translate="no">BITMAP</code> » para filtros rápidos de igualdade e « <code translate="no">IN</code> ».</p></li>
<li><p><strong>Alta cardinalidade</strong>: a maioria dos valores é distinta, como <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code> ou <code translate="no">metadata[&quot;product_id&quot;]</code>. O Milvus cria internamente um índice <code translate="no">STL_SORT</code> para filtros de intervalo rápidos, tais como <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> e <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>O limiar predefinido para « <code translate="no">BITMAP</code> » versus «<code translate="no">STL_SORT</code> » é de <strong>100 valores distintos</strong>. Pode ajustar este limiar com « <code translate="no">bitmap_cardinality_limit</code> »; consulte <a href="/docs/pt/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">«Como ajustar o limiar BITMAP versus STL_SORT do AUTOINDEX?</a>».</p>
<div class="alert note">
<p><strong>Alteração de comportamento no Milvus 3.0</strong>. Nas versões anteriores, o comando « <code translate="no">AUTOINDEX</code> » em percursos JSON criava sempre um índice « <code translate="no">INVERTED</code> ». A partir do Milvus 3.0, o comando « <code translate="no">AUTOINDEX</code> » escolhe entre « <code translate="no">BITMAP</code> » e « <code translate="no">STL_SORT</code> » para tipos de conversão escalar. Para « <code translate="no">JSON</code> », o comando « <code translate="no">AUTOINDEX</code> » continua a utilizar « <code translate="no">INVERTED</code> », embora a indexação JSON de objetos completos esteja obsoleta. Para tipos de conversão de matriz e consultas de correspondência de texto, especifique explicitamente « <code translate="no">INVERTED</code> ».</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> é a melhor opção quando necessita de consultas de correspondência de texto ou indexação de matrizes. Continua também disponível para a indexação JSON de objetos inteiros, que está obsoleta.</p>
<p>Especifique explicitamente <code translate="no">INVERTED</code> quando:</p>
<ul>
<li><p>Precisa de indexar valores dentro de matrizes JSON.</p></li>
<li><p>Mantiver um índice existente num objeto JSON completo ou subobjeto e quiser tornar explícito o comportamento « <code translate="no">INVERTED</code> ».</p></li>
<li><p>Pretender um tipo de índice que lide com consultas de igualdade, ` <code translate="no">IN</code>`, intervalo, correspondência de texto e matrizes. O suporte a objetos completos continua disponível por motivos de compatibilidade, ao custo de um tamanho de índice maior.</p></li>
</ul>
<p>Para índices existentes em objetos JSON completos (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), pode continuar a utilizar <code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code>. O <code translate="no">AUTOINDEX</code> utiliza <code translate="no">INVERTED</code> para este tipo de conversão. A indexação JSON de objetos completos já não é recomendada para novas cargas de trabalho.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> armazena valores de um caminho JSON por ordem de classificação. Está otimizado para filtros de intervalo em valores numéricos ou valores de cadeia de caracteres classificáveis.</p>
<p><code translate="no">STL_SORT</code> suporta apenas os tipos de conversão <code translate="no">DOUBLE</code> e <code translate="no">VARCHAR</code>. Utilize-o quando:</p>
<ul>
<li><p>Os seus filtros compararem valores com <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code> ou <code translate="no">&lt;=</code>.</p></li>
<li><p>Os valores indexados tiverem alta cardinalidade, tais como preços, carimbos de data/hora, IDs ou códigos ordenáveis.</p></li>
<li><p>Quer forçar um layout ordenado em vez de deixar que o <code translate="no">AUTOINDEX</code> escolha.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> não suporta os tipos de conversão <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code> ou <code translate="no">JSON</code>. Utilize <code translate="no">INVERTED</code> para matrizes. Os índices de objeto completo existentes podem continuar a utilizar <code translate="no">INVERTED</code> ou <code translate="no">AUTOINDEX</code>, mas a indexação JSON de objeto completo está obsoleta.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> cria um bitmap compacto para cada valor distinto num caminho JSON. Está otimizado para filtros de igualdade e « <code translate="no">IN</code> » em valores que se repetem frequentemente.</p>
<p><code translate="no">BITMAP</code> Suporta apenas os tipos de conversão « <code translate="no">BOOL</code> » e « <code translate="no">VARCHAR</code> ». Utilize-o quando:</p>
<ul>
<li><p>Os seus filtros utilizarem « <code translate="no">==</code> » ou « <code translate="no">IN</code> ».</p></li>
<li><p>Os valores indexados tiverem baixa cardinalidade, como valores booleanos, valores de estado ou um pequeno conjunto de categorias.</p></li>
<li><p>Quer forçar um layout de bitmap em vez de deixar que o <code translate="no">AUTOINDEX</code> escolha.</p></li>
</ul>
<p><code translate="no">BITMAP</code> não suporta os tipos de conversão « <code translate="no">DOUBLE</code> », « <code translate="no">ARRAY_*</code> » ou « <code translate="no">JSON</code> ». Para valores numéricos, utilize « <code translate="no">AUTOINDEX</code> », « <code translate="no">STL_SORT</code> » ou « <code translate="no">INVERTED</code> » em vez disso.</p>
<p>Para mais detalhes, consulte <a href="/docs/pt/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Referência de compatibilidade<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize a matriz seguinte como referência rápida para as combinações de « <code translate="no">(cast type, index type)</code> » suportadas.</p>
<table>
<thead>
<tr><th>Tipo de conversão</th><th>Descrição</th><th>Valor de exemplo</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Valores booleanos (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Sim</td><td>Sim</td><td>Não</td><td>Sim</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Valores numéricos (inteiros ou decimais).</td><td><code translate="no">99.99</code></td><td>Sim</td><td>Sim</td><td>Sim</td><td>Não</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>Valores de cadeia de caracteres.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Sim</td><td>Sim</td><td>Sim</td><td>Sim</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Matriz de valores booleanos.</td><td><code translate="no">[true, false]</code></td><td>Não</td><td>Sim</td><td>Não</td><td>Não</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Matriz de números.</td><td><code translate="no">[1.2, 3.14]</code></td><td>Não</td><td>Sim</td><td>Não</td><td>Não</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Matriz de cadeias de caracteres.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>Não</td><td>Sim</td><td>Não</td><td>Não</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Um objeto JSON completo ou subobjeto com inferência automática de tipos e achatamento. Obsoleto a partir do Milvus 3.0.0.</td><td>qualquer objeto aninhado</td><td>Sim (obsoleto)</td><td>Sim (obsoleto)</td><td>Não</td><td>Não</td></tr>
</tbody>
</table>
<p>Para células marcadas com « <code translate="no">No</code> », o Milvus rejeita o pedido no momento da criação do índice. Para tipos de conversão de matriz, utilize explicitamente « <code translate="no">INVERTED</code> » (o «<code translate="no">AUTOINDEX</code> » não abrange matrizes).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Criar um índice JSON<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta secção explica como indexar diferentes formatos de dados JSON. Todos os exemplos utilizam a estrutura de exemplo abaixo e pressupõem que já dispõe de uma coleção que inclui um campo « <code translate="no">JSON</code> » denominado « <code translate="no">metadata</code> ».</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Estrutura JSON de exemplo<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Configuração básica<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>Os exemplos abaixo partem do princípio de que dispõe de um « <code translate="no">MilvusClient</code> » denominado « <code translate="no">client</code> » ligado à sua implementação do Milvus e de uma coleção que já inclui um campo « <code translate="no">JSON</code> » denominado « <code translate="no">metadata</code> ». Se precisar de configurar estes elementos a partir do zero, expanda o bloco abaixo.</p>
<p><details></p>
<p><summary>Ligar e criar uma coleção de exemplo</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Prepare um objeto `index-params` para recolher as definições de índice adicionadas nos exemplos abaixo:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Cada exemplo que se segue mostra uma chamada ` <code translate="no">index_params.add_index(...)</code> `. Escolha as que correspondem aos seus dados e chame-as no mesmo objeto ` <code translate="no">index_params</code> `. Em seguida, aplique tudo numa única chamada ` <code translate="no">client.create_index(...)</code> ` no final. Para mais detalhes, consulte <a href="/docs/pt/json-indexing.md#apply-the-index">Aplicar o índice</a>.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Exemplo 1: Indexar uma chave de nível superior com AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexe o campo <code translate="no">category</code> para uma filtragem rápida por categoria de produto. Com <code translate="no">AUTOINDEX</code>, o Milvus seleciona <code translate="no">BITMAP</code> ou <code translate="no">STL_SORT</code> com base no número de categorias distintas existentes nos seus dados.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Exemplo 2: Indexar uma chave aninhada<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Indexe o campo « <code translate="no">email</code> », profundamente aninhado, para pesquisas de contactos de fornecedores. O parâmetro « <code translate="no">json_path</code> » aceita qualquer profundidade de notação entre parênteses.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Exemplo 3: Consultas de intervalo com STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando souber que as suas consultas num caminho serão dominadas por comparações de intervalo (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), selecione diretamente « <code translate="no">STL_SORT</code> ». Isto contorna a medição de cardinalidade e cria imediatamente o layout ordenado.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Após a indexação, consultas de intervalo como <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> utilizam a pesquisa binária em vez de uma varredura completa.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Exemplo 4: Consultas de igualdade com BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>Para chaves de baixa cardinalidade, tais como códigos de estado, valores booleanos ou cadeias de caracteres do tipo enumeração, opte diretamente por <code translate="no">BITMAP</code>. As consultas de igualdade e do tipo <code translate="no">IN</code> tornam-se operações de bitmap.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> É também uma excelente opção para campos como uma coluna « <code translate="no">status</code> » com um número reduzido de valores de cadeia de caracteres distintos.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Exemplo 5: Converter o tipo de dados durante a criação do índice<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>Quando os dados numéricos forem armazenados por engano como cadeias de caracteres, utilize « <code translate="no">STRING_TO_DOUBLE</code> » para converter o valor num número durante a criação do índice.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Se a conversão falhar para uma linha (por exemplo, uma cadeia de caracteres não numérica como « <code translate="no">&quot;invalid&quot;</code> »), essa linha é ignorada durante a indexação.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Exemplo 6: Indexar objetos JSON completos<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert warning">
<p>A partir do Milvus 3.0.0, a indexação de objetos JSON completos (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), também conhecida como indexação JSON plana, foi descontinuada. Os índices existentes e os novos pedidos de criação de índices continuam a ser suportados por motivos de compatibilidade, mas este modo já não é recomendado para novas cargas de trabalho. Crie índices de caminho JSON para caminhos de consulta conhecidos. Para documentos JSON complexos ou em evolução com padrões de consulta abrangentes, considere <a href="/docs/pt/json-shredding.md">o «JSON Shredding</a>». O «JSON Shredding» não acelera valores dentro de matrizes; utilize índices de caminho JSON com tipos de conversão de matriz para essas consultas.</p>
</div>
<p>Para cargas de trabalho existentes compatíveis, definir « <code translate="no">json_cast_type=&quot;JSON&quot;</code> » indexa a estrutura completa no caminho indicado. O Milvus achata objetos aninhados em caminhos e infere automaticamente o tipo de cada valor. Todas as chaves sob o caminho tornam-se pesquisáveis.</p>
<p><code translate="no">AUTOINDEX</code> Utiliza de forma transparente o « <code translate="no">INVERTED</code> » para o tipo de conversão « <code translate="no">JSON</code> », uma vez que a transformação em plano e a inferência de tipos são capacidades do índice invertido.</p>
<p>Indexar todo o objeto ` <code translate="no">metadata</code> `:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Ou indexe um subobjeto, como todas as informações de « <code translate="no">supplier</code> »:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>A indexação de objetos completos aumenta o tamanho do índice. Para novas cargas de trabalho com documentos profundamente aninhados e padrões de consulta diversificados, utilize índices específicos de caminho ou considere <a href="/docs/pt/json-shredding.md">o JSON Shredding</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Aplicar o índice<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>Depois de adicionar todos os parâmetros do índice, aplique-os à sua coleção:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>A criação de índices decorre de forma assíncrona. Utilize o <code translate="no">client.describe_index(...)</code> para verificar o estado de criação de um índice específico. O campo « <code translate="no">state</code> » (Estado da criação) apresenta « <code translate="no">Finished</code> » assim que a criação estiver concluída, e « <code translate="no">total_rows</code> », « <code translate="no">indexed_rows</code> » e « <code translate="no">pending_index_rows</code> » mostram o progresso ao longo do processo.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Exemplo de resposta:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Assim que <code translate="no">state</code> indicar <code translate="no">Finished</code>, as consultas ao caminho indexado utilizam automaticamente o novo índice.</p>
<p>Para entradas do tipo « <code translate="no">AUTOINDEX</code> », o campo « <code translate="no">index_type</code> » nesta resposta é apresentado como « <code translate="no">AUTOINDEX</code> ». Atualmente, o Milvus não revela qual o layout subjacente (<code translate="no">BITMAP</code> ou <code translate="no">STL_SORT</code>) que foi escolhido no momento da compilação. Considere esta escolha como uma otimização interna: as consultas de igualdade, « <code translate="no">IN</code> » e de intervalo relativas ao caminho funcionarão independentemente do layout selecionado.</p>
<h2 id="FAQ" class="common-anchor-header">Perguntas frequentes<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">Como escolho entre o AUTOINDEX e um tipo de índice explícito?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Comece com <code translate="no">AUTOINDEX</code>. Este seleciona o layout adequado com base na cardinalidade dos seus dados e abrange a maioria das consultas de igualdade, <code translate="no">IN</code>, e de intervalo em percursos JSON. Escolha um tipo explícito quando:</p>
<ul>
<li><p>Conhecer o seu padrão de consulta (por exemplo, se as consultas de intervalo utilizarem sempre <code translate="no">STL_SORT</code> e as consultas de igualdade em valores de baixa cardinalidade utilizarem sempre <code translate="no">BITMAP</code>) e pretender ignorar a medição da cardinalidade.</p></li>
<li><p>Precisa de consultas de correspondência de texto ou de subcadeias. Utilize <code translate="no">INVERTED</code>.</p></li>
<li><p>Estiver a indexar tipos de conversão de matriz. Utilize explicitamente ` <code translate="no">INVERTED</code> `.</p></li>
<li><p>Está a manter um índice JSON de objeto completo já existente. Tanto <code translate="no">INVERTED</code> como <code translate="no">AUTOINDEX</code> continuam a ser suportados por motivos de compatibilidade, mas a indexação JSON de objeto completo está obsoleta a partir do Milvus 3.0.0.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">O que acontece se a expressão de filtro de uma consulta utilizar um tipo diferente do tipo de conversão indexado?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Se a sua expressão de filtro utilizar um tipo diferente do <code translate="no">json_cast_type</code> do índice, o Milvus não utiliza o índice e pode recorrer a uma pesquisa por força bruta mais lenta, se os dados o permitirem. Para obter o melhor desempenho, alinhe sempre a sua expressão de filtro com o tipo de conversão do índice. Por exemplo, se for criado um índice numérico com ` <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>`, apenas as condições de filtro numéricas irão tirar partido do índice.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">E se uma chave JSON tiver tipos de dados inconsistentes entre diferentes entidades?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Tipos inconsistentes podem levar a <strong>uma indexação parcial</strong>. Por exemplo, se <code translate="no">metadata[&quot;price&quot;]</code> for armazenado tanto como um número (<code translate="no">99.99</code>) como uma cadeia de caracteres (<code translate="no">&quot;99.99&quot;</code>) e criar um índice com <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, apenas os valores numéricos serão indexados. As entradas na forma de cadeia de caracteres são ignoradas e não aparecerão nos resultados do filtro. Utilize ` <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> ` para converter cadeias de caracteres em números no momento da indexação, ou corrija os dados de origem para que todas as entradas tenham o mesmo tipo.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Posso criar vários índices na mesma chave JSON?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Não. O Milvus permite, no máximo, um índice por par « <code translate="no">(field, json_path)</code> », independentemente do tipo de conversão ou do tipo de índice. Não é possível criar simultaneamente um índice « <code translate="no">INVERTED</code> » e um índice « <code translate="no">BITMAP</code> » no mesmo caminho, nem dois índices no mesmo caminho com tipos de conversão diferentes. No entanto, é possível criar um índice para todo o objeto JSON e um índice separado para uma chave aninhada dentro desse objeto, uma vez que se trata de caminhos diferentes.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">Como posso ajustar o limiar BITMAP vs. STL_SORT do AUTOINDEX?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>Por predefinição, o <code translate="no">AUTOINDEX</code> seleciona <code translate="no">BITMAP</code> quando os valores indexados têm <strong>100 ou menos valores distintos</strong> e <code translate="no">STL_SORT</code> nos restantes casos. Pode substituir este limiar adicionando <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> aos parâmetros do seu índice (intervalo: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>A maioria dos utilizadores não precisa de ajustar este valor. Aumente-o se tiver um campo de cardinalidade moderada que prefira que seja mapeado em bitmap; diminua-o para que <code translate="no">AUTOINDEX</code> passe mais rapidamente para <code translate="no">STL_SORT</code>. A configuração é ignorada quando especificar explicitamente <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code> ou <code translate="no">BITMAP</code>.</p>
