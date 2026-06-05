---
id: pattern-matching.md
title: Correspondência de padrões
summary: >-
  O Milvus suporta a correspondência de padrões de cadeia de caracteres com
  padrões curinga LIKE e expressões regulares RE2. Use filtros de padrão para
  corresponder prefixos, sufixos, substrings, códigos estruturados, domínios de
  e-mail, caminhos de URL e outros padrões de string em campos VARCHAR, caminhos
  de string JSON ou elementos ARRAY.
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
    </button></h1><p>Nas aplicações de pesquisa agêntica, a pesquisa vetorial e a correspondência de padrões ao estilo grep complementam-se frequentemente. A busca vetorial recupera entidades que são semanticamente relevantes, enquanto que o pattern matching restringe esses resultados por estruturas de strings exatas, como códigos de erro, prefixos de log, domínios de e-mail, caminhos de URL ou identificadores.</p>
<p>No Milvus, é possível expressar essas restrições de padrão em filtros escalares com <code translate="no">LIKE</code> para correspondência simples de curinga e <code translate="no">=~</code> ou <code translate="no">!~</code> para expressões regulares <a href="https://github.com/google/re2/wiki/syntax">RE2</a>. Pode combinar estes filtros com <code translate="no">query</code>, <code translate="no">search</code>, ou pesquisa híbrida.</p>
<p>As expressões de correspondência de padrões são escritas no parâmetro <code translate="no">filter</code>. Por exemplo, a seguinte consulta corresponde a mensagens de registo que contêm um código de erro como <code translate="no">E1001</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

res = client.query(
    collection_name=<span class="hljs-string">&quot;log_events&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>,</span>
    output_fields=[<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-string">&quot;severity&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<p>Os exemplos nesta página centram-se na expressão atribuída a <code translate="no">filter</code>. Pode utilizar a mesma sintaxe de expressão de filtro em operações Milvus que aceitem um filtro escalar, como <code translate="no">query</code>, <code translate="no">search</code> e pesquisa híbrida.</p>
<h2 id="Supported-field-types" class="common-anchor-header">Tipos de campos suportados<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">VARCHAR</code> campo</td><td>Sim</td><td>Sim</td><td>Objetivo típico para correspondência de padrões em campos de cadeia.</td></tr>
<tr><td><code translate="no">JSON</code> caminho com <code translate="no">VARCHAR</code> tipo de conversão</td><td>Sim</td><td>Sim</td><td>O valor do caminho JSON tem de ser uma cadeia de caracteres para correspondências positivas. Se criar um índice no caminho JSON para aceleração, defina <code translate="no">json_cast_type=&quot;varchar&quot;</code>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code> elemento</td><td>Sim</td><td>Sim</td><td>Corresponde a um elemento específico por índice, como <code translate="no">tags[0]</code>. A correspondência de padrões <strong>não</strong> analisa todos os elementos; aplica-se apenas ao elemento no índice especificado.</td></tr>
<tr><td>Numérico, booleano, vetorial, <code translate="no">TEXT</code>, ou outros alvos não<code translate="no">VARCHAR</code> </td><td>Não</td><td>Não</td><td>A correspondência de padrões está disponível apenas para valores <code translate="no">VARCHAR</code>, caminhos JSON que resolvem cadeias de caracteres ou elementos <code translate="no">ARRAY&lt;VARCHAR&gt;</code> indexados.</td></tr>
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
<p>Se precisar de uma correspondência exacta de cadeia de caracteres, recomendamos que utilize <code translate="no">==</code> em vez de correspondência de padrões. Utilize <code translate="no">LIKE</code> ou regex apenas quando o filtro precisar de corresponder a um padrão.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Operador recomendado</th><th>Exemplo</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td>Igualdade exacta da cadeia de caracteres</td><td><code translate="no">==</code></td><td><code translate="no">status == &quot;active&quot;</code></td><td>Correspondência exacta da cadeia <code translate="no">active</code>.</td></tr>
<tr><td>Correspondência de prefixo simples</td><td><code translate="no">LIKE</code></td><td><code translate="no">name LIKE &quot;Prod%&quot;</code></td><td>Corresponde a cadeias de caracteres que começam com <code translate="no">Prod</code>.</td></tr>
<tr><td>Correspondência de sufixo simples</td><td><code translate="no">LIKE</code></td><td><code translate="no">filename LIKE &quot;%.json&quot;</code></td><td>Corresponde às cadeias de caracteres que terminam com <code translate="no">.json</code>.</td></tr>
<tr><td>Correspondência simples de contém</td><td><code translate="no">LIKE</code></td><td><code translate="no">description LIKE &quot;%vector database%&quot;</code></td><td>Corresponde aos valores que contêm <code translate="no">vector database</code> em qualquer parte da cadeia de caracteres.</td></tr>
<tr><td>Corresponde a um código estruturado ou padrão de comprimento fixo</td><td><code translate="no">=~</code></td><td><code translate="no">code =~ &quot;E[0-9]{4}&quot;</code></td><td>Corresponde a cadeias de caracteres que contêm <code translate="no">E</code> seguido de quatro dígitos, como <code translate="no">E1001</code>.</td></tr>
<tr><td>Correspondência de padrão sem distinção entre maiúsculas e minúsculas</td><td><code translate="no">=~</code> com <code translate="no">(?i)</code></td><td><code translate="no">message =~ &quot;(?i)error&quot;</code></td><td>Corresponde a <code translate="no">error</code>, <code translate="no">ERROR</code>, ou outras variantes de maiúsculas e minúsculas.</td></tr>
<tr><td>Excluir valores que correspondem a um padrão regex</td><td><code translate="no">!~</code></td><td><code translate="no">message !~ &quot;^DEBUG&quot;</code></td><td>Exclui cadeias de caracteres que começam com <code translate="no">DEBUG</code>.</td></tr>
</tbody>
</table>
<p>Use <code translate="no">LIKE</code> para correspondência simples de curinga. Use regex quando o padrão precisar de classes de caracteres, repetição, alternância, como <code translate="no">error|failed</code>, âncoras ou correspondência sem distinção entre maiúsculas e minúsculas.</p>
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
    </button></h2><p>O operador <code translate="no">LIKE</code> destina-se a uma correspondência simples de caracteres selvagens em valores de cadeia de caracteres. Suporta apenas os seguintes caracteres curinga:</p>
<table>
<thead>
<tr><th>Curinga</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">%</code></td><td>Corresponde a zero ou mais caracteres.</td></tr>
<tr><td><code translate="no">_</code></td><td>Corresponde exatamente a um carácter.</td></tr>
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
    </button></h3><p>Utilize a posição de <code translate="no">%</code> e <code translate="no">_</code> para controlar onde o texto fixo aparece na cadeia de caracteres correspondente.</p>
<table>
<thead>
<tr><th>Requisito</th><th>Padrão</th><th>Exemplo de filtro</th></tr>
</thead>
<tbody>
<tr><td>Começa com um prefixo</td><td><code translate="no">Prod%</code></td><td><code translate="no">filter = 'name LIKE &quot;Prod%&quot;'</code></td></tr>
<tr><td>Termina com um sufixo</td><td><code translate="no">%.json</code></td><td><code translate="no">filter = 'filename LIKE &quot;%.json&quot;'</code></td></tr>
<tr><td>Contém uma substring</td><td><code translate="no">%vector%</code></td><td><code translate="no">filter = 'description LIKE &quot;%vector%&quot;'</code></td></tr>
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
    </button></h3><p>Utilize <code translate="no">LIKE</code> para correspondências de prefixo, sufixo, contém e correspondência de um único caractere em posição fixa. <code translate="no">LIKE</code> não suporta classes de caracteres como <code translate="no">[0-9]</code>, alternância como <code translate="no">error|failed</code>, contagens de repetição como <code translate="no">{4}</code>, âncoras como <code translate="no">^</code> ou <code translate="no">$</code>, ou sinalizadores que não diferenciam maiúsculas de minúsculas como <code translate="no">(?i)</code>. Utilize regex para esses padrões.</p>
<p>Utilize <code translate="no">==</code> para uma igualdade exacta da cadeia completa. Use <code translate="no">LIKE</code> apenas quando o filtro precisar de correspondência curinga.</p>
<h2 id="Use-regex" class="common-anchor-header">Usar regex<button data-href="#Use-regex" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize filtros regex quando o padrão requer caraterísticas de expressão regular, como classes de caracteres, repetição, alternância, âncoras ou correspondência sem distinção entre maiúsculas e minúsculas. O Milvus aplica uma expressão regular <a href="https://github.com/google/re2/wiki/syntax">RE2</a> a um valor de cadeia de caracteres.</p>
<p>O lado direito de <code translate="no">=~</code> ou <code translate="no">!~</code> tem de ser um literal de cadeia de caracteres.</p>
<table>
<thead>
<tr><th>Operador</th><th>Significado</th><th>Exemplo</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">=~</code></td><td>Corresponde a valores que satisfazem o padrão regex.</td><td><code translate="no">filter = 'message =~ &quot;E[0-9]{4}&quot;'</code></td></tr>
<tr><td><code translate="no">!~</code></td><td>Exclui valores que satisfazem o padrão regex.</td><td><code translate="no">filter = 'message !~ &quot;^DEBUG&quot;'</code></td></tr>
</tbody>
</table>
<h3 id="Common-regex-patterns" class="common-anchor-header">Padrões regex comuns<button data-href="#Common-regex-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>Os exemplos seguintes utilizam a sintaxe RE2 comum nas expressões de filtro do Milvus. Para obter a sintaxe regex completa, consulte a referência de <a href="https://github.com/google/re2/wiki/syntax">sintaxe RE2</a>.</p>
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
<tr><td>Corresponde a um domínio de correio eletrónico</td><td><code translate="no">@example\.com$</code></td><td><code translate="no">filter = 'email =~ &quot;@example\\.com$&quot;'</code></td></tr>
<tr><td>Corresponde a maiúsculas e minúsculas</td><td><code translate="no">(?i)error</code></td><td><code translate="no">filter = 'message =~ &quot;(?i)error&quot;'</code></td></tr>
<tr><td>Faz corresponder a cadeia completa</td><td><code translate="no">^prod-[0-9]+$</code></td><td><code translate="no">filter = 'name =~ &quot;^prod-[0-9]+$&quot;'</code></td></tr>
</tbody>
</table>
<p>Para corresponder a uma de várias palavras, utilize a alternância com <code translate="no">|</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;error|failed|timeout&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao fazer corresponder metacaracteres regex literalmente, escape-os no padrão regex. Por exemplo, para corresponder a um ponto literal (<code translate="no">\.</code> em regex), escreva <code translate="no">\\.</code> numa cadeia de filtro Python:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;email =~ &quot;@gmail\\.com$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Nota: Os filtros regex Milvus seguem a sintaxe RE2. Se um padrão regex usar uma sintaxe que o RE2 não suporta ou for inválido de outra forma, o Milvus rejeita a expressão do filtro. Para detalhes sobre metacaracteres regex, flags e comportamento de correspondência, consulte a referência de <a href="https://github.com/google/re2/wiki/syntax">sintaxe RE2</a>.</p>
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
    </button></h3><p><strong>Correspondência de subcadeia</strong></p>
<p>A correspondência regex do Milvus usa a semântica de substring. O padrão não precisa de corresponder a todo o valor do campo. Por exemplo, o seguinte filtro corresponde tanto a <code translate="no">E1001</code> como a <code translate="no">failed with E1001 after retry</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message =~ &quot;E[0-9]{4}&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para corresponder a todo o valor do campo, utilize as âncoras <code translate="no">^</code> e <code translate="no">$</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Match only values that are exactly E followed by four digits</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;code =~ &quot;^E[0-9]{4}$&quot;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Campos VARCHAR nuláveis</strong></p>
<p>Os filtros Regex não correspondem a valores nulos. Isto aplica-se tanto a <code translate="no">=~</code> como a <code translate="no">!~</code>. Se pretender excluir um padrão regex mas manter os valores nulos, adicione explicitamente <code translate="no">OR field IS NULL</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&#x27;message !~ &quot;^DEBUG&quot; OR message IS NULL&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Caminhos JSON</strong></p>
<p>Para os caminhos JSON, os filtros regex comportam-se de forma diferente quando o caminho está em falta, é nulo ou é resolvido para um valor não-string:</p>
<table>
<thead>
<tr><th>Filtro</th><th>Inclui valores em falta/nulos/não-string?</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">json_field[&quot;path&quot;] =~ &quot;pattern&quot;</code></td><td>Não</td><td>Corresponde apenas a valores de cadeia de caracteres que satisfazem o padrão regex.</td></tr>
<tr><td><code translate="no">json_field[&quot;path&quot;] !~ &quot;pattern&quot;</code></td><td>Sim</td><td>Retorna entidades em que o caminho está ausente, nulo, não é uma cadeia de caracteres ou uma cadeia de caracteres que não corresponde ao padrão regex.</td></tr>
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
    </button></h2><p>Milvus suporta vários tipos de índices em campos de strings que podem ser usados em conjunto com <code translate="no">LIKE</code> e filtros regex em campos <code translate="no">VARCHAR</code> ou caminhos de strings JSON, como <code translate="no">NGRAM</code>, <code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, e <code translate="no">BITMAP</code>. A correspondência de padrões pode funcionar sem um índice, mas um índice pode melhorar o desempenho em grandes conjuntos de dados.</p>
<p>A eficácia do índice depende da expressão do padrão, se Milvus pode extrair substrings literais fixas e a cardinalidade e distribuição do campo de destino. Os padrões de estilo prefixo, como <code translate="no">name LIKE &quot;Prod%&quot;</code>, podem beneficiar de estratégias de índice diferentes dos padrões infixo ou sufixo, como <code translate="no">description LIKE &quot;%vector%&quot;</code> ou <code translate="no">filename LIKE &quot;%.json&quot;</code>.</p>
<p>Utilize a tabela seguinte como ponto de partida e, em seguida, faça uma avaliação comparativa com a sua própria carga de trabalho:</p>
<table>
<thead>
<tr><th>Padrão ou caraterística de dados</th><th>Índice a considerar</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td>Contém substrings literais fixos, como <code translate="no">message =~ &quot;error.*timeout&quot;</code> ou <code translate="no">message LIKE &quot;%database%&quot;</code></td><td><code translate="no">NGRAM</code></td><td>Ajuda quando o Milvus pode extrair substrings literais significativas do padrão. Para obter detalhes, consulte <a href="/docs/pt/ngram.md">NGRAM</a>.</td></tr>
<tr><td>Filtros de cadeia de caracteres prefixados, exactos ou do tipo igualdade, especialmente em campos com cardinalidade baixa a moderada</td><td><code translate="no">STL_SORT</code>, <code translate="no">INVERTED</code>, ou <code translate="no">BITMAP</code></td><td>Podem ser mais eficazes quando o campo tem valores repetidos ou quando o filtro está próximo da correspondência exacta. Para obter detalhes, consulte <a href="/docs/pt/stl-sort.md">STL_SORT</a>, <a href="/docs/pt/inverted.md">INVERTED</a> e <a href="/docs/pt/bitmap.md">BITMAP</a>.</td></tr>
<tr><td>Padrões Regex sem literais fixos, ou padrões dominados por classes de caracteres, tokens curtos ou curingas</td><td>Faça uma avaliação comparativa antes de confiar na aceleração de índices</td><td>Esses padrões podem fornecer seletividade de índice limitada e podem voltar para varreduras mais amplas.</td></tr>
</tbody>
</table>
