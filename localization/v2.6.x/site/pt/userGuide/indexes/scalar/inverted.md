---
id: inverted.md
title: INVERTIDO
summary: >-
  O índice INVERTED em Milvus foi concebido para acelerar as consultas de filtro
  em campos escalares e campos JSON estruturados. Ao mapear termos para os
  documentos ou registos que os contêm, os índices invertidos melhoram
  consideravelmente o desempenho das consultas em comparação com as pesquisas de
  força bruta.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTIDO<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>O índice <code translate="no">INVERTED</code> em Milvus foi concebido para acelerar as consultas de filtro em campos escalares e campos JSON estruturados. Ao mapear termos para os documentos ou registos que os contêm, os índices invertidos melhoram consideravelmente o desempenho das consultas em comparação com as pesquisas de força bruta.</p>
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
    </button></h2><p>Com base no <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, o Milvus implementa a indexação invertida para acelerar as consultas de filtro, especialmente para dados textuais. Veja como funciona:</p>
<ol>
<li><p><strong>Tokenize os dados</strong>: O Milvus pega nos seus dados em bruto - neste exemplo, duas frases:</p>
<ul>
<li><p><strong>"Milvus é um banco de dados vetorial nativo da nuvem".</strong></p></li>
<li><p><strong>"Milvus é muito bom em desempenho".</strong></p></li>
</ul>
<p>e divide-as em palavras únicas (por exemplo, <em>Milvus</em>, <em>is</em>, <em>cloud-native</em>, <em>vetor</em>, <em>database</em>, <em>very</em>, <em>good</em>, <em>at</em>, <em>performance</em>).</p></li>
<li><p><strong>Criar o dicionário de termos</strong>: Essas palavras exclusivas são armazenadas em uma lista ordenada chamada <strong>Dicionário de termos</strong>. Este dicionário permite ao Milvus verificar rapidamente se uma palavra existe e localizar a sua posição no índice.</p></li>
<li><p><strong>Criar a Lista Invertida</strong>: Para cada palavra no Dicionário de Termos, o Milvus mantém uma <strong>Lista Invertida</strong> que mostra quais os documentos que contêm essa palavra. Por exemplo, <strong>"Milvus"</strong> aparece em ambas as frases, por isso a sua lista invertida aponta para ambos os IDs de documentos.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
   </span> <span class="img-wrapper"> <span>Invertida</span> </span></p>
<p>Como o dicionário está ordenado, a filtragem baseada em termos pode ser tratada de forma eficiente. Em vez de procurar em todos os documentos, o Milvus apenas procura o termo no dicionário e recupera a sua lista invertida - acelerando significativamente as pesquisas e filtros em grandes conjuntos de dados.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Indexar um campo escalar regular<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Para campos escalares como <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong> e <strong>ARRAY</strong>, a criação de um índice invertido é simples. Utilize o método <code translate="no">create_index()</code> com o parâmetro <code translate="no">index_type</code> definido como <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Indexar um campo JSON<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus estende as suas capacidades de indexação a campos JSON, permitindo-lhe filtrar eficientemente dados aninhados ou estruturados armazenados numa única coluna. Ao contrário dos campos escalares, ao indexar um campo JSON, é necessário fornecer dois parâmetros adicionais:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Especifica a chave aninhada a ser indexada.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Define o tipo de dados (por exemplo, <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, ou <code translate="no">&quot;bool&quot;</code>) para o qual o valor JSON extraído será convertido.</p></li>
</ul>
<p>Por exemplo, considere um campo JSON denominado <code translate="no">metadata</code> com a seguinte estrutura:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>Para criar índices invertidos em caminhos JSON específicos, pode utilizar a seguinte abordagem:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parâmetro</p></th>
     <th><p>Descrição</p></th>
     <th><p>Exemplo Valor</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Nome do campo JSON no seu esquema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Tipo de índice a criar; atualmente, apenas <code translate="no">INVERTED</code> é suportado para indexação de caminhos JSON.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Opcional) Um nome de índice personalizado. Especifique nomes diferentes se criar vários índices no mesmo campo JSON.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Especifica qual o caminho JSON a indexar. Você pode direcionar chaves aninhadas, posições de matriz ou ambos (por exemplo, <code translate="no">metadata["product_info"]["category"]</code> ou <code translate="no">metadata["tags"][0]</code>). Se o caminho estiver ausente ou o elemento da matriz não existir para uma linha específica, essa linha será simplesmente ignorada durante a indexação e nenhum erro será lançado.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Tipo de dados para o qual o Milvus converterá os valores JSON extraídos ao criar o índice. Valores válidos:</p>
<ul>
<li><p><code translate="no">"bool"</code> ou <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> ou <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> ou <code translate="no">"VARCHAR"</code></p>
<p><strong>Nota</strong>: Para valores inteiros, o Milvus utiliza internamente o double para o índice. Os números inteiros grandes acima de 2^53 perdem a precisão. Se a conversão falhar (devido a incompatibilidade de tipos), nenhum erro é lançado e o valor dessa linha não é indexado.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Considerações sobre a indexação JSON<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Lógica de filtragem</strong>:</p>
<ul>
<li><p>Se <strong>criar um índice de tipo duplo</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), apenas as condições de filtro de tipo numérico podem utilizar o índice. Se o filtro comparar um índice duplo com uma condição não numérica, o Milvus recorre à pesquisa de força bruta.</p></li>
<li><p>Se <strong>criar um índice do tipo varchar</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), apenas as condições de filtragem do tipo string podem utilizar o índice. Caso contrário, o Milvus volta à força bruta.</p></li>
<li><p>A indexação<strong>booleana</strong> comporta-se de forma semelhante à do tipo varchar.</p></li>
</ul></li>
<li><p><strong>Expressões de termos</strong>:</p>
<ul>
<li>Pode utilizar <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. No entanto, o índice funciona apenas para valores escalares armazenados sob esse caminho. Se <code translate="no">json[&quot;field&quot;]</code> for uma matriz, a consulta volta à força bruta (a indexação do tipo matriz ainda não é suportada).</li>
</ul></li>
<li><p><strong>Precisão numérica</strong>:</p>
<ul>
<li>Internamente, o Milvus indexa todos os campos numéricos como duplos. Se um valor numérico exceder <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2532^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, perde a precisão, e as consultas sobre esses valores fora do intervalo podem não corresponder exatamente.</li>
</ul></li>
<li><p><strong>Integridade dos dados</strong>:</p>
<ul>
<li>O Milvus não analisa ou transforma chaves JSON para além do casting especificado. Se os dados de origem forem inconsistentes (por exemplo, algumas linhas armazenam uma cadeia de caracteres para a chave <code translate="no">&quot;k&quot;</code> enquanto outras armazenam um número), algumas linhas não serão indexadas.</li>
</ul></li>
</ul>
