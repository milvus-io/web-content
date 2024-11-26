---
id: keyword-match.md
summary: >-
  A correspondência de palavras-chave no Milvus permite a recuperação precisa de
  documentos com base em termos específicos. Esta funcionalidade é utilizada
  principalmente para pesquisa filtrada para satisfazer condições específicas e
  pode incorporar filtragem escalar para refinar os resultados da consulta,
  permitindo pesquisas por semelhança dentro de vectores que satisfaçam
  critérios escalares.
title: Correspondência de palavras-chave
---
<h1 id="Keyword-Match​" class="common-anchor-header">Correspondência de palavras-chave<button data-href="#Keyword-Match​" class="anchor-icon" translate="no">
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
    </button></h1><p>A correspondência de palavras-chave no Milvus permite a recuperação precisa de documentos com base em termos específicos. Esta funcionalidade é utilizada principalmente para pesquisa filtrada para satisfazer condições específicas e pode incorporar filtragem escalar para refinar os resultados da consulta, permitindo pesquisas de semelhança dentro de vectores que satisfaçam critérios escalares.</p>
<div class="alert note">
<p>A correspondência de palavras-chave centra-se na procura de ocorrências exactas dos termos de consulta, sem pontuar a relevância dos documentos correspondentes. Se pretender obter os documentos mais relevantes com base no significado semântico e na importância dos termos de consulta, recomendamos que utilize a <a href="/docs/pt/full-text-search.md">Pesquisa de texto integral</a>.</p>
</div>
<h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus integra o <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> para alimentar o seu índice invertido subjacente e a pesquisa por palavras-chave. Para cada entrada de texto, Milvus indexa-o seguindo o procedimento.</p>
<ol>
<li><p><a href="/docs/pt/analyzer-overview.md">Analisador</a>: O analisador processa o texto de entrada, transformando-o em palavras individuais, ou tokens, e aplicando filtros conforme necessário. Isto permite ao Milvus construir um índice baseado nestes tokens.</p></li>
<li><p><a href="/docs/pt/index-scalar-fields.md">Indexação</a>: Após a análise do texto, o Milvus cria um índice invertido que mapeia cada token único para os documentos que o contêm.</p></li>
</ol>
<p>Quando um utilizador faz uma correspondência de palavras-chave, o índice invertido é utilizado para recuperar rapidamente todos os documentos que contêm as palavras-chave. Isto é muito mais rápido do que analisar cada documento individualmente.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/keyword-match.png" alt="Keyword Match" class="doc-image" id="keyword-match" />
   </span> <span class="img-wrapper"> <span>Correspondência de palavras-chave</span> </span></p>
<h2 id="Enable-keyword-match" class="common-anchor-header">Ativar a correspondência de palavras-chave<button data-href="#Enable-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de palavras-chave funciona no tipo de campo <code translate="no">VARCHAR</code>, que é essencialmente o tipo de dados de cadeia em Milvus. Para ativar a correspondência de palavras-chave, defina <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code> e, em seguida, configure opcionalmente um analisador para análise de texto ao definir o esquema da coleção.</p>
<h3 id="Set-enableanalyzer-and-enablematch​" class="common-anchor-header">Definir <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code></h3><p>Para ativar a correspondência de palavras-chave para um campo <code translate="no">VARCHAR</code> específico, defina os parâmetros <code translate="no">enable_analyzer</code> e <code translate="no">enable_match</code> para <code translate="no">True</code> ao definir o esquema do campo. Isto instrui o Milvus a tokenizar o texto e a criar um índice invertido para o campo especificado, permitindo correspondências de palavras-chave rápidas e eficientes.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
schema = MilvusClient.create_schema(auto_id=<span class="hljs-literal">True</span>, enable_dynamic_field=<span class="hljs-literal">False</span>)​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">1000</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to enable text analysis for this field​</span>
    enable_match=<span class="hljs-literal">True</span> <span class="hljs-comment"># Whether to enable text match​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Optional-Configure-an-analyzer​" class="common-anchor-header">Opcional: Configurar um analisador</h3><p>O desempenho e a precisão da correspondência de palavras-chave dependem do analisador selecionado. Diferentes analisadores são adaptados a várias línguas e estruturas de texto, por isso escolher o correto pode ter um impacto significativo nos resultados de pesquisa para o seu caso de utilização específico.</p>
<p>Por predefinição, o Milvus utiliza o analisador <code translate="no">standard</code>, que tokeniza o texto com base em espaços em branco e pontuação, remove tokens com mais de 40 caracteres e converte o texto para minúsculas. Não são necessários parâmetros adicionais para aplicar essa configuração padrão. Para obter mais informações, consulte <a href="/docs/pt/standard-analyzer.md">Padrão</a>.</p>
<p>Nos casos em que um analisador diferente é necessário, você pode configurá-lo usando o parâmetro <code translate="no">analyzer_params</code>. Por exemplo, para aplicar o analisador <code translate="no">english</code> para processar texto em inglês.</p>
<pre><code translate="no" class="language-python">analyzer_params={​
    <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;english&quot;</span>​
}​
​
schema.add_field(​
    field_name=<span class="hljs-string">&#x27;text&#x27;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">200</span>, ​
    enable_analyzer=<span class="hljs-literal">True</span>，​
    analyzer_params=analyzer_params,​
    enable_match=<span class="hljs-literal">True</span>, ​
)​

<button class="copy-code-btn"></button></code></pre>
<p>O Milvus também fornece vários outros analisadores adequados a diferentes idiomas e cenários. Para obter mais detalhes, consulte <a href="/docs/pt/analyzer-overview.md">Visão geral</a>.</p>
<h2 id="Use-keyword-match" class="common-anchor-header">Utilizar a correspondência de palavras-chave<button data-href="#Use-keyword-match" class="anchor-icon" translate="no">
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
    </button></h2><p>Depois de ativar a correspondência de palavras-chave para um campo VARCHAR no seu esquema de coleção, pode efetuar correspondências de palavras-chave utilizando a expressão <code translate="no">TEXT_MATCH</code>.</p>
<h3 id="TEXTMATCH-expression-syntax​" class="common-anchor-header">Sintaxe da expressão TEXT_MATCH</h3><p>A expressão <code translate="no">TEXT_MATCH</code> é utilizada para especificar o campo e as palavras-chave a pesquisar. A sua sintaxe é a seguinte.</p>
<pre><code translate="no" class="language-python">TEXT_MATCH(field_name, text)​

<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">field_name</code>: O nome do campo VARCHAR a ser pesquisado.</p></li>
<li><p><code translate="no">text</code>: As palavras-chave a pesquisar. Várias palavras-chave podem ser separadas por espaços ou outros delimitadores apropriados com base no idioma e no analisador configurado.</p></li>
</ul>
<p>Por padrão, <code translate="no">TEXT_MATCH</code> usa a lógica de correspondência <strong>OR</strong>, o que significa que ele retornará documentos que contêm qualquer uma das palavras-chave especificadas. Por exemplo, para pesquisar documentos que contenham as palavras-chave <code translate="no">machine</code> ou <code translate="no">deep</code> no campo <code translate="no">text</code>, use a seguinte expressão.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Também é possível combinar várias expressões <code translate="no">TEXT_MATCH</code> usando operadores lógicos para realizar a correspondência <strong>AND</strong>. Por exemplo, para pesquisar documentos que contenham <code translate="no">machine</code> e <code translate="no">deep</code> no campo <code translate="no">text</code>, use a seguinte expressão.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;machine&#x27;) and TEXT_MATCH(text, &#x27;deep&#x27;)&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Search-with-keyword-match​" class="common-anchor-header">Pesquisar com correspondência de palavras-chave</h3><p>A correspondência de palavras-chave pode ser utilizada em combinação com a pesquisa de semelhança de vectores para restringir o âmbito da pesquisa e melhorar o desempenho da mesma. Ao filtrar a coleção utilizando a correspondência de palavras-chave antes da pesquisa de semelhança de vectores, pode reduzir o número de documentos que precisam de ser pesquisados, resultando em tempos de consulta mais rápidos.</p>
<p>Neste exemplo, a expressão <code translate="no">filter</code> filtra os resultados da pesquisa para incluir apenas documentos que correspondam às palavras-chave especificadas <code translate="no">keyword1</code> ou <code translate="no">keyword2</code>. A pesquisa de similaridade de vetor é então executada neste subconjunto filtrado de documentos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with `keyword1` or `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1 keyword2&#x27;)&quot;</span>​
​
<span class="hljs-comment"># Assuming &#x27;embeddings&#x27; is the vector field and &#x27;text&#x27; is the VARCHAR field​</span>
result = MilvusClient.search(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>, <span class="hljs-comment"># Your collection name​</span>
    anns_field=<span class="hljs-string">&quot;embeddings&quot;</span>, <span class="hljs-comment"># Vector field name​</span>
    data=[query_vector], <span class="hljs-comment"># Query vector​</span>
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    limit=<span class="hljs-number">10</span>, <span class="hljs-comment"># Max. number of results to return​</span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>] <span class="hljs-comment"># Fields to return​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Query-with-keyword-match​" class="common-anchor-header">Consulta com correspondência de palavras-chave</h3><p>A correspondência de palavras-chave também pode ser utilizada para filtragem escalar em operações de consulta. Ao especificar uma expressão <code translate="no">TEXT_MATCH</code> no parâmetro <code translate="no">expr</code> do método <code translate="no">query()</code>, pode obter documentos que correspondem às palavras-chave indicadas.</p>
<p>O exemplo abaixo recupera documentos em que o campo <code translate="no">text</code> contém as palavras-chave <code translate="no">keyword1</code> e <code translate="no">keyword2</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match entities with both `keyword1` and `keyword2`​</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;TEXT_MATCH(text, &#x27;keyword1&#x27;) and TEXT_MATCH(text, &#x27;keyword2&#x27;)&quot;</span>​
​
result = MilvusClient.query(​
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, ​
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>]​
)​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Considerations" class="common-anchor-header">Considerações<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>A ativação da correspondência de palavras-chave para um campo desencadeia a criação de um índice invertido, que consome recursos de armazenamento. Considere o impacto no armazenamento ao decidir ativar esta funcionalidade, uma vez que varia com base no tamanho do texto, nos tokens únicos e no analisador utilizado.</p></li>
<li><p>Depois de definir um analisador no seu esquema, as suas definições tornam-se permanentes para essa coleção. Se decidir que um analisador diferente se adequa melhor às suas necessidades, pode considerar eliminar a coleção existente e criar uma nova com a configuração de analisador pretendida.</p></li>
</ul>
