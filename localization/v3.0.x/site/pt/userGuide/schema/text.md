---
id: text.md
title: Campo de textoCompatible with Milvus 3.0.x
summary: >-
  TEXT é um tipo de campo escalar destinado ao armazenamento de texto de
  documentos, passagens e outros conteúdos de texto extenso no Milvus.
beta: Milvus 3.0.x
---
<h1 id="Text-Field" class="common-anchor-header">Campo de texto<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Text-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>Nas aplicações de pesquisa com IA, a pesquisa vetorial ajuda a encontrar entidades semanticamente semelhantes, mas a aplicação muitas vezes também necessita do texto original subjacente a cada correspondência. Um LLM ou agente pode utilizar esse texto como contexto para ler, citar, resumir ou incluir o resultado num prompt.</p>
<p>O Milvus disponibiliza o tipo de campo escalar « <code translate="no">TEXT</code> » para armazenar texto-fonte extenso diretamente com as entidades. Os valores típicos incluem passagens, documentos longos, corpos de artigos, tickets e registos. Ao contrário do « <code translate="no">VARCHAR</code> », que requer um comprimento máximo fixo de bytes ( <code translate="no">max_length</code>), o « <code translate="no">TEXT</code> » não exige que se defina um comprimento máximo de bytes no esquema da coleção.</p>
<p>Para definir um campo « <code translate="no">TEXT</code> », defina « <code translate="no">datatype</code> » como « <code translate="no">DataType.TEXT</code> ».</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;content&quot;</span>,
<span class="highlighted-wrapper-line">    datatype=DataType.TEXT,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Depois de definido o campo, cada entidade pode incluir um valor de cadeia nesse campo. Os valores de « <code translate="no">TEXT</code> » são inseridos tal como noutros campos escalares e são devolvidos nos resultados de consultas ou pesquisas, listando o campo em « <code translate="no">output_fields</code> ».</p>
<div class="alert note">
<p><code translate="no">TEXT</code> Os campos suportam valores nulos. Para ativar esta funcionalidade, defina <code translate="no">nullable</code> como <code translate="no">True</code>. Para mais detalhes, consulte <a href="/docs/pt/nullable-and-default.md">«Campo nulo</a>».</p>
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
    </button></h2><ul>
<li>Um campo « <code translate="no">TEXT</code> » não pode ser um campo primário. Os campos primários suportam « <code translate="no">INT64</code> » e « <code translate="no">VARCHAR</code> ».</li>
<li>No Milvus 3.0.0, os campos « <code translate="no">TEXT</code> » não suportam « <code translate="no">PHRASE_MATCH</code> ».</li>
<li>No Milvus 3.0.0, os campos « <code translate="no">TEXT</code> » não suportam valores por predefinição.</li>
<li>No Milvus 3.0.0, os campos <code translate="no">TEXT</code> não são suportados em coleções externas.</li>
<li>No Milvus 3.0.0, os campos « <code translate="no">TEXT</code> » não suportam índices escalares.</li>
<li><code translate="no">TEXT</code> não se destina à filtragem regular de metadados. Se precisar de filtrar metadados de cadeias de caracteres curtas e o valor do campo se enquadrar no limite de comprimento de <code translate="no">VARCHAR</code>, utilize <code translate="no">VARCHAR</code>.</li>
</ul>
<h2 id="Choose-TEXT-or-VARCHAR" class="common-anchor-header">Escolha TEXT ou VARCHAR<button data-href="#Choose-TEXT-or-VARCHAR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TEXT</code> e <code translate="no">VARCHAR</code> armazenam ambos valores de cadeia de caracteres, mas atendem a necessidades diferentes das aplicações. Utilize <code translate="no">VARCHAR</code> para metadados curtos e delimitados que identificam, categorizam ou filtram entidades. Utilize <code translate="no">TEXT</code> para conteúdo de origem mais extenso que forneça a um LLM ou agente contexto suficiente para ler, citar, resumir ou criar um prompt.</p>
<table>
<thead>
<tr><th>Aspecto</th><th><code translate="no">VARCHAR</code></th><th><code translate="no">TEXT</code></th></tr>
</thead>
<tbody>
<tr><td>Ideal para</td><td>Metadados curtos utilizados para identificar, categorizar ou filtrar entidades, tais como <code translate="no">title</code>, <code translate="no">tag</code>, <code translate="no">category</code> ou <code translate="no">external_id</code>.</td><td>Conteúdo de origem mais extenso utilizado por fluxos de trabalho de LLM ou de agentes, como <code translate="no">content</code>, <code translate="no">passage</code>, <code translate="no">article_body</code> ou <code translate="no">log_message</code>.</td></tr>
<tr><td>Definição de comprimento</td><td>Requer <code translate="no">max_length</code>, que define o número máximo de bytes que o campo pode armazenar. O valor máximo é <code translate="no">65,535</code> bytes. Se um valor puder exceder este limite, utilize <code translate="no">TEXT</code>.</td><td>Não requer <code translate="no">max_length</code>, pelo que o esquema não necessita de um limite fixo de bytes para o valor de texto.</td></tr>
<tr><td>Comportamento de armazenamento</td><td>Armazena cada valor dentro do ` <code translate="no">max_length</code>` configurado para o campo.</td><td>Utiliza a seleção automática de armazenamento para valores de texto maiores. Para mais detalhes, consulte <a href="#how-milvus-stores-large-text-values">Como o Milvus armazena valores TEXT grandes</a>.</td></tr>
<tr><td>Suporte a campos primários</td><td>Pode ser utilizado como campo primário.</td><td>Não pode ser utilizado como campo primário.</td></tr>
<tr><td>Filtragem</td><td>Utilizar para metadados de cadeias curtas que precisam de aparecer em expressões de filtragem, tais como <code translate="no">category == &quot;news&quot;</code> ou <code translate="no">tag in [&quot;ai&quot;, &quot;database&quot;]</code>.</td><td>Não se destina à filtragem regular de metadados.</td></tr>
</tbody>
</table>
<p>Para obter detalhes sobre os campos « <code translate="no">VARCHAR</code> », consulte <a href="/docs/pt/string.md">o campo VarChar</a>.</p>
<h2 id="How-Milvus-stores-large-TEXT-values" class="common-anchor-header">Como o Milvus armazena valores TEXT de grande dimensão<button data-href="#How-Milvus-stores-large-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p><details></p>
<p><summary>Expanda para ver como funciona</summary></p>
<p>Quando insere uma entidade, a cadeia de caracteres que fornece para um campo « <code translate="no">TEXT</code> » é o valor « <code translate="no">TEXT</code> ». O Milvus compara o tamanho desse valor com <a href="/docs/pt/configure_datanode.md#dataNodetextinlineThreshold">«dataNode.text.inlineThreshold»</a>, que, por predefinição, é de <code translate="no">65,536</code> bytes, e, em seguida, escolhe um de dois caminhos de armazenamento internos.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/text-large-storage-flow.png" alt="Large text storage" class="doc-image" id="large-text-storage" /> 
   <span>Armazenamento de texto de grande dimensão</span>
  
 </span></p>
<ul>
<li><strong>Armazenamento em linha</strong>: Se um valor de ` <code translate="no">TEXT</code> ` for menor que ` <code translate="no">dataNode.text.inlineThreshold</code>`, o Milvus armazena o valor do texto original diretamente nos dados do campo ` <code translate="no">TEXT</code> `.</li>
<li><strong>Armazenamento LOB</strong>: Se um valor de « <code translate="no">TEXT</code> » for maior ou igual a « <code translate="no">dataNode.text.inlineThreshold</code> », o Milvus trata o valor como um objeto de grande dimensão e armazena o texto original separadamente num armazenamento de objetos, como o MinIO. Os dados do campo « <code translate="no">TEXT</code> » armazenam uma referência interna ao texto armazenado separadamente. Quando o campo « <code translate="no">TEXT</code> » é solicitado nos resultados de uma consulta ou pesquisa, o Milvus utiliza a referência para recuperar e devolver o texto original.</li>
</ul>
<p>Esta seleção de armazenamento é interna. A inserção, consulta e pesquisa no campo <code translate="no">TEXT</code> são efetuadas da mesma forma, independentemente do caminho de armazenamento utilizado pelo Milvus. Para ajustar o limiar ou o comportamento relacionado com o armazenamento, a compactação e a recolha de lixo, consulte <a href="/docs/pt/configure_datanode.md">as Configurações relacionadas com o dataNode</a> e <a href="/docs/pt/configure_datacoord.md">as Configurações relacionadas com o dataCoord</a>.</p>
<p>Se a sua implementação utilizar armazenamento de objetos, valores grandes de ` <code translate="no">TEXT</code> ` podem aparecer como objetos geridos pelo Milvus em percursos como <code translate="no">lobs/...</code>. Estes objetos são detalhes de implementação e não devem ser movidos, copiados ou eliminados manualmente. Após eliminar entidades, remover partições ou compactar dados, a utilização do armazenamento de objetos poderá diminuir apenas depois de a recolha de lixo do Milvus remover os dados de objetos de grande dimensão sem referências, após o seu período de segurança.</p>
<p></details></p>
<p>Uma utilização comum de <code translate="no">TEXT</code> é a Pesquisa de Texto Completo com o BM25. Neste padrão, o campo <code translate="no">TEXT</code> armazena o conteúdo original da fonte, e o BM25 analisa o texto e gera vetores esparsos para classificar correspondências baseadas em palavras-chave. Os resultados da pesquisa podem então devolver o valor <code translate="no">TEXT</code> correspondente como contexto para fluxos de trabalho de LLM ou de agentes. O exemplo seguinte mostra como utilizar um campo « <code translate="no">TEXT</code> » como campo de entrada para o BM25. Para saber mais sobre os conceitos e opções de consulta da Pesquisa de Texto Completo, consulte <a href="/docs/pt/full-text-search.md">Pesquisa de Texto Completo</a>.</p>
<h2 id="Step-1-Create-a-collection-with-a-TEXT-field" class="common-anchor-header">Passo 1: Criar uma coleção com um campo TEXT<button data-href="#Step-1-Create-a-collection-with-a-TEXT-field" class="anchor-icon" translate="no">
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
    </button></h2><p>O exemplo seguinte cria uma coleção com um campo « <code translate="no">TEXT</code> » para o conteúdo de origem e um campo de vetores esparsos para os vetores esparsos gerados pelo BM25. A função BM25 converte o texto tokenizado de « <code translate="no">content</code> » em vetores esparsos armazenados em « <code translate="no">sparse</code> ».</p>
<p>Para a pesquisa de texto completo com BM25, o campo de entrada « <code translate="no">TEXT</code> » deve estar definido como <code translate="no">enable_analyzer=True</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
COLLECTION_NAME = <span class="hljs-string">&quot;text_bm25_collection&quot;</span>

<span class="hljs-keyword">if</span> client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=<span class="hljs-literal">False</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="highlighted-comment-line">schema.add_field(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;content&quot;</span>,</span>
<span class="highlighted-comment-line">    datatype=DataType.TEXT,</span>
<span class="highlighted-comment-line">    enable_analyzer=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)

<span class="highlighted-comment-line">bm25_function = Function(</span>
<span class="highlighted-comment-line">    name=<span class="hljs-string">&quot;content_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">    input_field_names=[<span class="hljs-string">&quot;content&quot;</span>],</span>
<span class="highlighted-comment-line">    output_field_names=[<span class="hljs-string">&quot;sparse&quot;</span>],</span>
<span class="highlighted-comment-line">    function_type=FunctionType.BM25,</span>
<span class="highlighted-comment-line">)</span>
<span class="highlighted-comment-line">schema.add_function(bm25_function)</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-2-Create-a-sparse-vector-index" class="common-anchor-header">Passo 2: Criar um índice de vetores esparsos<button data-href="#Step-2-Create-a-sparse-vector-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Crie um índice no campo de vetores esparsos gerado pela função BM25. O tipo de métrica deve ser definido como <code translate="no">BM25</code>.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<span class="highlighted-comment-line">index_params.add_index(</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,</span>
<span class="highlighted-comment-line">    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,</span>
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">)</span>

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-3-Insert-TEXT-data" class="common-anchor-header">Passo 3: Inserir dados TEXT<button data-href="#Step-3-Insert-TEXT-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Insira o texto diretamente no campo « <code translate="no">TEXT</code> ». Não forneça valores para o campo « <code translate="no">sparse</code> ». O Milvus gera os vetores esparsos internamente, aplicando a função BM25 a « <code translate="no">content</code> ».</p>
<pre><code translate="no" class="language-python">data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.&quot;</span>,
    },
    {
        <span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>,
        <span class="hljs-string">&quot;content&quot;</span>: <span class="hljs-string">&quot;Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.&quot;</span>,
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-4-Perform-BM25-full-text-search" class="common-anchor-header">Passo 4: Efetuar a pesquisa de texto completo com BM25<button data-href="#Step-4-Perform-BM25-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o texto bruto da consulta como dados de pesquisa e pesquise no campo do vetor esparso. O Milvus converte o texto da consulta num vetor esparso, classifica as correspondências com o BM25 e devolve o campo « <code translate="no">TEXT</code> » solicitado em « <code translate="no">output_fields</code> ».</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=COLLECTION_NAME,
<span class="highlighted-comment-line">    data=[<span class="hljs-string">&quot;how does Milvus store source text for retrieval&quot;</span>],</span>
<span class="highlighted-comment-line">    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,</span>
<span class="highlighted-comment-line">    limit=<span class="hljs-number">2</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;content&quot;</span>],</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Step-5-Read-the-returned-TEXT-values" class="common-anchor-header">Passo 5: Ler os valores TEXT devolvidos<button data-href="#Step-5-Read-the-returned-TEXT-values" class="anchor-icon" translate="no">
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
    </button></h2><p>Cada resultado da pesquisa inclui a pontuação BM25 e o valor original de « <code translate="no">TEXT</code> ».</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> results[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, score: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;distance&#x27;</span>]}</span>&quot;</span>)
    <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;entity&quot;</span>][<span class="hljs-string">&quot;content&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Para mais informações sobre as funções BM25, os índices de vetores esparsos e a sintaxe de consulta para a pesquisa de texto completo, consulte <a href="/docs/pt/full-text-search.md">Pesquisa</a> de <a href="/docs/pt/full-text-search.md">Texto Completo</a>.</p>
