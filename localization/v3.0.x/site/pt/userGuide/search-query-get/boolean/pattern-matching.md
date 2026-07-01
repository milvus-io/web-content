---
id: pattern-matching.md
title: Correspondência de padrões
summary: >-
  O Milvus suporta a correspondência de padrões de cadeias de caracteres com
  padrões curinga LIKE e expressões regulares RE2. Utilize filtros de padrões
  para corresponder prefixos, sufixos, subcadeias, códigos estruturados,
  domínios de e-mail, percursos de URL e outros padrões de cadeias de caracteres
  em campos VARCHAR, percursos de cadeias de caracteres JSON ou elementos ARRAY.
---
<h1 id="Pattern-Matching" class="common-anchor-header">Correspondência de padrões<button data-href="#Pattern-Matching" class="anchor-icon" translate="no">
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
    </button></h1><p>Em aplicações de pesquisa agênica, a pesquisa vetorial e a correspondência de padrões do tipo grep complementam-se frequentemente. A pesquisa vetorial recupera entidades semanticamente relevantes, enquanto a correspondência de padrões restringe esses resultados com base em estruturas exatas de cadeias de caracteres, tais como códigos de erro, prefixos de registos, domínios de e-mail, percursos de URL ou identificadores.</p>
<p>No Milvus, é possível expressar estas restrições de padrão em filtros escalares com « <code translate="no">LIKE</code> » para correspondência simples com caracteres curinga e « <code translate="no">=~</code> » ou « <code translate="no">!~</code> » para expressões regulares <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. É possível combinar estes filtros com « <code translate="no">query</code> », « <code translate="no">search</code> » ou a pesquisa híbrida.</p>
<p>As expressões de correspondência de padrões são escritas no parâmetro <code translate="no">filter</code>. Por exemplo, a consulta seguinte corresponde a mensagens de registo que contenham um código de erro como <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Os exemplos nesta página centram-se na expressão atribuída a <code translate="no">filter</code>. Pode utilizar a mesma sintaxe de expressão de filtro em operações do Milvus que aceitem um filtro escalar, tais como <code translate="no">query</code>, <code translate="no">search</code> e a pesquisa híbrida.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campo suportados<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de padrões está disponível para valores de cadeia de caracteres.</p>
<table>
<thead>
<tr><th>Alvo</th><th><code translate="no">LIKE</code></th><th>Regex <code translate="no">=~</code> / <code translate="no">!~</code></th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sim</td><td>Sim</td><td>Alvo típico para a correspondência de padrões em campos de cadeia de caracteres.</td></tr>
<tr><td><code translate="no">JSON</code> caminho com tipo de conversão « <code translate="no">VARCHAR</code> »</td><td>Sim</td><td>Sim</td><td>O valor do caminho JSON deve ser uma cadeia de caracteres para que haja correspondências positivas. Se criar um índice no caminho JSON para aceleração, defina ` <code translate="no">json_cast_type=&quot;varchar&quot;</code>`.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sim</td><td>Sim</td><td>Corresponde a um elemento específico por índice, como <code translate="no">tags[0]</code>. A correspondência de padrões <strong>não</strong> analisa todos os elementos; aplica-se apenas ao elemento no índice especificado.</td></tr>
<tr><td>Alvos numéricos, booleanos, vetoriais, <code translate="no">TEXT</code> ou outros alvos não «<code translate="no">VARCHAR</code> »</td><td>Não</td><td>Não</td><td>A correspondência de padrões está disponível apenas para valores do tipo « <code translate="no">VARCHAR</code> », percursos JSON que se resolvem em cadeias de caracteres ou elementos indexados do tipo « <code translate="no">ARRAY&lt;VARCHAR&gt;</code> ».</td></tr>
</tbody>
</table>
<h2 id="Choose-LIKE-or-regex" class="common-anchor-header">Escolha LIKE ou regex<button data-href="#Choose-LIKE-or-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha o operador mais simples que expresse o padrão de que necessita.</p>
<p>Se precisar de uma correspondência exata de cadeia de caracteres, recomendamos que utilize « <code translate="no">==</code> » em vez da correspondência de padrões. Utilize « <code translate="no">LIKE</code> » ou «regex» apenas quando o filtro precisar de corresponder a um padrão.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operador recomendado</th><th>Exemplo</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>Igualdade exata da cadeia de caracteres</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Correspondência exata da cadeia de caracteres « <code translate="no">active</code> ».</td></tr>
<tr><td>Correspondência simples de prefixo</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corresponde a cadeias que começam por <code translate="no">Prod</code>.</td></tr>
<tr><td>Correspondência simples de sufixo</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corresponde a cadeias que terminam com <code translate="no">.json</code>.</td></tr>
<tr><td>Correspondência simples por «contém»</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Corresponde a valores que contenham <code translate="no">vector database</code> em qualquer parte da cadeia de caracteres.</td></tr>
<tr><td>Correspondência com um código estruturado ou padrão de comprimento fixo</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Corresponde a cadeias de caracteres que contenham, distinguindo maiúsculas de minúsculas, « <code translate="no">E</code> » seguido de quatro dígitos, como « <code translate="no">E1001</code> ».</td></tr>
<tr><td>Correspondência de padrões sem distinção entre maiúsculas e minúsculas</td><td><code translate="no">=~</code> com <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Corresponde a <code translate="no">error</code>, <code translate="no">ERROR</code> ou outras variantes de maiúsculas e minúsculas.</td></tr>
<tr><td>Excluir valores que correspondam a um padrão de expressão regular</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Exclui cadeias de caracteres que comecem por <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Utilize <code translate="no">LIKE</code> para correspondências simples com caracteres curinga. Utilize expressões regulares quando o padrão necessitar de classes de caracteres, repetições, alternativas como <code translate="no">error|failed</code>, âncoras ou correspondências sem distinção entre maiúsculas e minúsculas.</p>
<h2 id="Use-LIKE" class="common-anchor-header">Utilizar LIKE<button data-href="#Use-LIKE" class="anchor-icon" translate="no">
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
    </button></h2><p>O operador <code translate="no">LIKE</code> destina-se à correspondência simples com caracteres curinga em valores de cadeia de caracteres. Suporta apenas os seguintes caracteres curinga:</p>
<table>
<thead>
<tr><th>Caractere curinga</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Corresponde a zero ou mais caracteres.</td></tr>
<tr><td><code translate="no">_</code></td><td>Corresponde a exatamente um carácter.</td></tr>
</tbody>
</table>
<h3 id="Common-LIKE-patterns" class="common-anchor-header">Padrões LIKE comuns<button data-href="#Common-LIKE-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize a posição de <code translate="no">%</code> e <code translate="no">_</code> para controlar onde o texto fixo aparece na cadeia correspondente.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Padrão</th><th>Exemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Começa com um prefixo</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina com um sufixo</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contém uma subcadeia</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
<tr><td>Corresponde a um carácter numa posição fixa</td><td><code translate="no">AB_%</code></td><td><code translate="no">filter = 'code LIKE &quot;AB_%&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="LIKE-matching-behavior" class="common-anchor-header">Comportamento de correspondência LIKE<button data-href="#LIKE-matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p>Utilize « <code translate="no">LIKE</code> » para correspondências de prefixo, sufixo, «contém» e de um único carácter numa posição fixa. « <code translate="no">LIKE</code> » não suporta classes de caracteres como « <code translate="no">[0-9]</code> », alternâncias como « <code translate="no">error|failed</code> », contagens de repetições como « <code translate="no">{4}</code> », âncoras como « <code translate="no">^</code> » ou « <code translate="no">$</code> », nem sinalizadores de insensibilidade a maiúsculas e minúsculas como « <code translate="no">(?i)</code> ». Utilize expressões regulares (regex) para esses padrões.</p>
<p>Utilize <code translate="no">==</code> para igualdade exata de cadeias de caracteres completas. Utilize <code translate="no">LIKE</code> apenas quando o filtro necessitar de correspondência com caracteres curinga.</p>
<h2 id="Use-regex" class="common-anchor-header">Utilize expressões regulares<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize filtros de expressões regulares quando o padrão exigir funcionalidades de expressões regulares, tais como classes de caracteres, repetição, alternância, âncoras ou correspondência sem distinção entre maiúsculas e minúsculas. O Milvus aplica uma expressão regular <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a um valor de cadeia de caracteres.</p>
<p>O lado direito de <code translate="no">=~</code> ou <code translate="no">!~</code> deve ser um literal de cadeia de caracteres.</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corresponde a valores que satisfazem o padrão de expressão regular.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Exclui valores que satisfazem o padrão de expressão regular.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Padrões comuns de expressões regulares<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Os exemplos seguintes utilizam a sintaxe RE2 comum nas expressões de filtro do Milvus. Para obter a sintaxe completa de expressões regulares, consulte a referência <a href="https://github.com/google/re2/wiki/syntax">de sintaxe RE2</a>.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Padrão</th><th>Exemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Contém texto literal</td><td><code translate="no">error</code></td><td><code translate="no">filter = 'message =~ &quot;error&quot;'</code></td></tr>
<tr><td>Começa com um prefixo</td><td><code translate="no">^ERR</code></td><td><code translate="no">filter = 'code =~ &quot;^ERR&quot;'</code></td></tr>
<tr><td>Termina com um sufixo</td><td><code translate="no">\.json$</code></td><td><code translate="no">filter = 'filename =~ &quot;\\.json$&quot;'</code></td></tr>
<tr><td>Corresponde a uma sequência de dígitos</td><td><code translate="no">[0-9]+</code></td><td><code translate="no">filter = 'message =~ &quot;[0-9]+&quot;'</code></td></tr>
<tr><td>Corresponde a um número fixo de dígitos</td><td><code translate="no">[0-9]{4}</code></td><td><code translate="no">filter = 'code =~ &quot;[0-9]{4}&quot;'</code></td></tr>
<tr><td>Corresponde a um domínio de e-mail</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corresponde sem distinção entre maiúsculas e minúsculas</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Corresponde à cadeia completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Para corresponder a uma de várias palavras, utilize a alternância com <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao corresponder metacaracteres de expressões regulares literalmente, utilize o escape no padrão de expressão regular. Por exemplo, para corresponder a um ponto literal (<code translate="no">\.</code> na expressão regular), escreva <code translate="no">\\.</code> numa cadeia de filtro Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: Os filtros de expressões regulares do Milvus seguem a sintaxe RE2. Se um padrão de expressão regular utilizar sintaxe que o RE2 não suporta ou for inválido por qualquer outro motivo, o Milvus rejeita a expressão do filtro. Para obter detalhes sobre metacaracteres de expressões regulares, sinalizadores e comportamento de correspondência, consulte a referência <a href="https://github.com/google/re2/wiki/syntax">de sintaxe RE2</a>.</p>
<h3 id="Matching-behavior" class="common-anchor-header">Comportamento de correspondência<button data-href="#Matching-behavior" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>Correspondência de subcadeias</strong></p>
<p>A correspondência de expressões regulares do Milvus utiliza a semântica de subcadeias. O padrão não precisa de corresponder ao valor completo do campo. Por exemplo, o filtro seguinte corresponde tanto a <code translate="no">E1001</code> como a <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para corresponder ao valor completo do campo, utilize as âncoras <code translate="no">^</code> e <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campos VARCHAR nulos</strong></p>
<p>Os filtros Regex não correspondem a valores nulos. Isto aplica-se tanto a « <code translate="no">=~</code> » como a « <code translate="no">!~</code> ». Se pretender excluir um padrão Regex mas manter os valores nulos, adicione explicitamente « <code translate="no">OR field IS NULL</code> »:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Caminhos JSON</strong></p>
<p>No caso dos caminhos JSON, os filtros de expressões regulares comportam-se de forma diferente quando o caminho está em falta, é nulo ou resulta num valor que não seja uma cadeia de caracteres:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Inclui valores ausentes/nulos/que não sejam cadeias de caracteres?</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Não</td><td>Corresponde apenas a valores de cadeia de caracteres que satisfaçam o padrão de expressão regular.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sim</td><td>Devolve entidades em que o caminho está em falta, é nulo, não é uma cadeia de caracteres ou é uma cadeia de caracteres que não corresponde ao padrão de expressão regular.</td></tr>
</tbody>
</table>
<h2 id="Accelerate-pattern-matching-with-indexes" class="common-anchor-header">Acelerar a correspondência de padrões com índices<button data-href="#Accelerate-pattern-matching-with-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus suporta vários tipos de índices em campos de cadeia de caracteres que podem ser utilizados em conjunto com filtros « <code translate="no">LIKE</code> » e de expressões regulares em campos « <code translate="no">VARCHAR</code> » ou caminhos de cadeia de caracteres JSON, tais como « <code translate="no">NGRAM</code> », « <code translate="no">STL_SORT</code> », « <code translate="no">INVERTED</code> » e « <code translate="no">BITMAP</code> ». A correspondência de padrões pode funcionar sem um índice, mas um índice pode melhorar o desempenho em conjuntos de dados de grande dimensão.</p>
<p>A eficácia do índice depende da expressão do padrão, da capacidade do Milvus para extrair subcadeias literais fixas, bem como da cardinalidade e da distribuição do campo de destino. Padrões do tipo prefixo, como <code translate="no">name LIKE &quot;Prod%&quot;</code>, podem beneficiar de estratégias de indexação diferentes das utilizadas para padrões do tipo infixo ou sufixo, como <code translate="no">description LIKE &quot;%vector%&quot;</code> ou <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilize a tabela seguinte como ponto de partida e, em seguida, faça um teste de desempenho com a sua própria carga de trabalho:</p>
<table>
<thead>
<tr><th>Padrão ou característica dos dados</th><th>Índice a considerar</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Contém subcadeias literais fixas, como <code translate="no">message =~ &quot;error.*timeout&quot;</code> ou <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>É útil quando o Milvus consegue extrair subcadeias literais significativas do padrão. Para mais detalhes, consulte <a href="/docs/pt/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtros de cadeias de caracteres do tipo prefixo, exato ou de igualdade, especialmente em campos com cardinalidade baixa a moderada</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code> ou <code translate="no">BITMAP</code></td><td>Podem ser mais eficazes quando o campo contém valores repetidos ou quando o filtro se aproxima de uma correspondência exata. Para mais detalhes, consulte <a href="/docs/pt/stl-sort.md">STL_SORT</a>, <a href="/docs/pt/inverted.md">INVERTED</a> e <a href="/docs/pt/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Padrões Regex sem literais fixos, ou padrões dominados por classes de caracteres, tokens curtos ou curingas</td><td>Faça testes de desempenho antes de confiar na aceleração por índice</td><td>Estes padrões podem proporcionar uma seletividade de índice limitada e podem recorrer a varreduras mais abrangentes.</td></tr>
</tbody>
</table>
