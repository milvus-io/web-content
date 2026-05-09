---
id: synonym-filter.md
title: Sinónimo
summary: >-
  Utilize o filtro de sinónimos para reescrever tokens com um dicionário de
  sinónimos durante a análise de texto.
---
<h1 id="Synonym" class="common-anchor-header">Sinónimo<button data-href="#Synonym" class="anchor-icon" translate="no">
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
    </button></h1><p>O filtro <code translate="no">synonym</code> reescreve os tokens de acordo com um dicionário de sinónimos, para que os termos relacionados coincidam durante a pesquisa. Suporta dois modos de funcionamento e duas formas de fornecer o dicionário:</p>
<ul>
<li><p><strong>Modos de operação</strong> - o modo <code translate="no">expand</code> preserva o token original e emite sinónimos adicionais juntamente com ele; o modo de normalização (<code translate="no">expand: false</code>) reescreve os tokens para uma forma canónica.</p></li>
<li><p><strong>Fontes do dicionário</strong> - os dicionários pequenos podem ser incluídos na configuração do filtro através do array <code translate="no">synonyms</code>; os dicionários grandes devem ser armazenados como um <a href="/docs/pt/manage-file-resources.md">recurso de ficheiro</a> e referenciados através de <code translate="no">synonyms_file</code>.</p></li>
</ul>
<h2 id="Dictionary-format" class="common-anchor-header">Formato do dicionário<button data-href="#Dictionary-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Um dicionário de sinónimos é um documento de texto simples (ou matriz em linha) em que cada linha define uma regra. São suportadas duas formas de regras.</p>
<h3 id="Mapping-rule" class="common-anchor-header">Regra de mapeamento<button data-href="#Mapping-rule" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">fast, quick =&gt; speedy
<button class="copy-code-btn"></button></code></pre>
<p>Os tokens à esquerda (<code translate="no">fast</code>, <code translate="no">quick</code>) reescrevem para os tokens à direita (<code translate="no">speedy</code>). São permitidos vários alvos:</p>
<pre><code translate="no" class="language-plaintext">small, little =&gt; tiny, compact
<button class="copy-code-btn"></button></code></pre>
<p>Com <code translate="no">expand: true</code>, os tokens originais são mantidos ao lado dos alvos:</p>
<ul>
<li><p>Entrada <code translate="no">fast</code> com <code translate="no">expand: true</code> → <code translate="no">fast</code>, <code translate="no">speedy</code></p></li>
<li><p>Entrada <code translate="no">fast</code> com <code translate="no">expand: false</code> → <code translate="no">speedy</code></p></li>
</ul>
<h3 id="Equivalence-group" class="common-anchor-header">Grupo de equivalência<button data-href="#Equivalence-group" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-plaintext">happy, joyful, cheerful
<button class="copy-code-btn"></button></code></pre>
<p>Todos os símbolos listados são considerados equivalentes:</p>
<ul>
<li><p>Com <code translate="no">expand: true</code>, qualquer ocorrência de qualquer marcador do grupo emite todos os marcadores do grupo. Entrada <code translate="no">happy</code> → <code translate="no">happy</code>, <code translate="no">joyful</code>, <code translate="no">cheerful</code>.</p></li>
<li><p>Com <code translate="no">expand: false</code>, cada ocorrência é reescrita para o primeiro token do grupo. Entrada <code translate="no">joyful</code> → <code translate="no">happy</code>; a entrada <code translate="no">happy</code> já é o primeiro token e permanece inalterada.</p></li>
</ul>
<h2 id="Configuration" class="common-anchor-header">Configuração<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>O filtro <code translate="no">synonym</code> é um filtro personalizado. Especifique <code translate="no">&quot;type&quot;: &quot;synonym&quot;</code> juntamente com pelo menos um de <code translate="no">synonyms</code> (em linha) ou <code translate="no">synonyms_file</code> (externo), mais um sinalizador <code translate="no">expand</code>.</p>
<pre><code translate="no" class="language-python">analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
            <span class="hljs-string">&quot;synonyms&quot;</span>: [                       <span class="hljs-comment"># inline rules (optional)</span>
                <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
                <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
            ],
            <span class="hljs-string">&quot;synonyms_file&quot;</span>: {                  <span class="hljs-comment"># external rules (optional)</span>
                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
                <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
                <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
            },
            <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
        }
    ],
}
<button class="copy-code-btn"></button></code></pre>
<p>O filtro <code translate="no">synonym</code> aceita os seguintes parâmetros.</p>
<table>
   <tr>
     <th><p><strong>Parâmetro</strong></p></th>
     <th><p><strong>Descrição</strong></p></th>
     <th><p><strong>Predefinição</strong></p></th>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms</code></p></td>
     <td><p>Uma matriz em linha de cadeias de regras. Cada cadeia utiliza o formato de dicionário descrito acima. Adequado para pequenos dicionários (até algumas dezenas de regras).</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">synonyms_file</code></p></td>
     <td><p>Uma referência a um <a href="/docs/pt/manage-file-resources.md">recurso de ficheiro</a> que armazena regras de sinónimos, uma por linha. Utilizar para dicionários maiores. Veja <a href="/docs/pt/synonym-filter.md#External-dictionary-file">Arquivo de dicionário externo</a> abaixo.</p></td>
     <td><p>-</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">expand</code></p></td>
     <td><p>Um sinalizador booleano que controla como as regras se aplicam. true preserva o token original e emite sinónimos ao lado dele; false reescreve os tokens para a sua forma canónica (o lado direito de um mapeamento, ou o primeiro token de um grupo de equivalência).</p></td>
     <td><p>false</p></td>
   </tr>
</table>
<p>Pode especificar <code translate="no">synonyms</code>, <code translate="no">synonyms_file</code>, ou ambos. Quando ambos estão presentes, o filtro funde as duas fontes. O filtro opera em tokens produzidos pelo tokenizador; ele deve, portanto, ser combinado com um tokenizador, como o tokenizador <a href="/docs/pt/standard-tokenizer.md">padrão</a>.</p>
<h3 id="External-dictionary-file" class="common-anchor-header">Ficheiro de dicionário externo<button data-href="#External-dictionary-file" class="anchor-icon" translate="no">
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
    </button></h3><p>Para dicionários de tamanho de produção, registre o arquivo como um recurso de arquivo remoto e faça referência a ele em <code translate="no">synonyms_file</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Register the file once, then reference it from any analyzer that needs it.</span>
client.add_file_resource(
    name=<span class="hljs-string">&quot;en_synonyms&quot;</span>,
    path=<span class="hljs-string">&quot;file/synonyms.txt&quot;</span>,     <span class="hljs-comment"># full S3 object key, including rootPath</span>
)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms_file&quot;</span>: {
            <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;remote&quot;</span>,
            <span class="hljs-string">&quot;resource_name&quot;</span>: <span class="hljs-string">&quot;en_synonyms&quot;</span>,
            <span class="hljs-string">&quot;file_name&quot;</span>: <span class="hljs-string">&quot;synonyms.txt&quot;</span>,
        },
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}
<button class="copy-code-btn"></button></code></pre>
<p>Consulte Gerir recursos de ficheiros para o fluxo de trabalho completo (carregar, registar, listar, remover) e para o formulário alternativo <code translate="no">&quot;type&quot;: &quot;local&quot;</code>.</p>
<h2 id="Examples" class="common-anchor-header">Exemplos<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de aplicar o analisador a um esquema de coleção, verifique o seu comportamento com <code translate="no">run_analyzer</code>. Os exemplos a seguir usam a matriz em linha <code translate="no">synonyms</code> por brevidade; substitua por <code translate="no">synonyms_file</code> para dicionários maiores.</p>
<h3 id="expand-true--keep-the-original-add-synonyms" class="common-anchor-header"><code translate="no">expand: true</code> - manter o original, adicionar sinónimos<button data-href="#expand-true--keep-the-original-add-synonyms" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

analyzer_params = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">True</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;fast&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;joyful&#x27;, &#x27;cheerful&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>Tanto <code translate="no">fast</code> como <code translate="no">happy</code> são preservados; os seus sinónimos são emitidos em conjunto.</p>
<h3 id="expand-false--rewrite-to-canonical-form" class="common-anchor-header"><code translate="no">expand: false</code> - reescrever para a forma canónica<button data-href="#expand-false--rewrite-to-canonical-form" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-python">analyzer_params_norm = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [{
        <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;synonym&quot;</span>,
        <span class="hljs-string">&quot;synonyms&quot;</span>: [
            <span class="hljs-string">&quot;fast, quick =&gt; speedy&quot;</span>,
            <span class="hljs-string">&quot;happy, joyful, cheerful&quot;</span>,
        ],
        <span class="hljs-string">&quot;expand&quot;</span>: <span class="hljs-literal">False</span>,
    }],
}

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;a fast car&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;a&#x27;, &#x27;speedy&#x27;, &#x27;car&#x27;]]</span>

<span class="hljs-built_in">print</span>(client.run_analyzer([<span class="hljs-string">&quot;i am happy today&quot;</span>], analyzer_params_norm))
<span class="hljs-comment"># → [[&#x27;i&#x27;, &#x27;am&#x27;, &#x27;happy&#x27;, &#x27;today&#x27;]]</span>
<button class="copy-code-btn"></button></code></pre>
<p>A regra de mapeamento reescreve <code translate="no">fast</code> para <code translate="no">speedy</code>. O grupo de equivalência deixa <code translate="no">happy</code> inalterado porque é o primeiro token do grupo; uma entrada contendo <code translate="no">joyful</code> ou <code translate="no">cheerful</code> teria sido reescrita para <code translate="no">happy</code>.</p>
