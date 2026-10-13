---
id: membership-match.md
title: Correspondência de membrosCompatible with Milvus v3.0.2+
summary: >-
  Filtrar entidades em conjuntos de elementos de grande dimensão utilizando
  filtros Bloom compactos ou bitmaps Roaring exatos, com sintaxe, padrões de
  pedido do SDK, semântica de eliminação e limites operacionais.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Correspondência de membros<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Visão geral<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>A correspondência de pertença filtra entidades verificando se o valor de um campo escalar pertence a um conjunto fornecido pelo chamador. O cliente cria um blob binário compacto de filtro de pertença e passa-o como valor de um modelo de expressão.</p>
<p>Substitui as grandes listas de « <code translate="no">IN [...]</code> ». Um filtro « <code translate="no">IN</code> » serializa cada membro na solicitação, pelo que conjuntos de membros suficientemente grandes podem exceder o limite de receção do proxy gRPC. Com « <code translate="no">membership_match</code> », o proxy valida o blob e incorpora-o no plano de consulta sem reconstruir uma lista de membros.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." /> 
   <span>Fluxo de trabalho de correspondência de membros: o cliente cria um blob reutilizável, o proxy valida-o e os QueryNodes avaliam-no.</span>
  
 </span></p>
<p>O diagrama mostra a divisão de tarefas fixa. O cliente cria o blob uma vez e reutiliza-o em várias solicitações; o proxy valida os limites de envelope e tamanho e incorpora o blob no plano de consulta tal como está; e os QueryNodes avaliam o plano em relação aos dados brutos ou a um índice.</p>
<p>O operador dispõe de duas codificações com diferentes garantias de correção:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): Afiliação aproximada. São possíveis falsos positivos; não se esperam falsos negativos de um filtro válido. Utilização típica: filtros de público em grande volume ou de exclusão, em que falsos positivos ocasionais são aceitáveis.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): Pertença exata para valores inteiros. Utilização típica: ACLs, visibilidade de inquilinos, filtros de conformidade e operações de eliminação por conjunto de IDs.</li>
</ul>
<p>Não utilize a pertença <strong>de Bloom</strong> para decisões de autorização ou eliminações destrutivas. Um falso positivo pode expor uma entidade ou eliminar uma entidade que não se encontre no conjunto pretendido.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Lista de verificação operacional<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Confirme o tipo de campo de destino e crie o blob a partir desse mesmo domínio de valores.</li>
<li>Selecione o Bloom apenas quando os falsos positivos forem aceitáveis.</li>
<li>Selecione «Roaring» para operações de ACL, conformidade, isolamento de inquilinos e eliminação.</li>
<li>Crie blobs de grande dimensão uma única vez e reutilize-os; não os recrie em cada pedido.</li>
<li>Calcule o tamanho do blob em bytes serializados, e não na contagem de elementos.</li>
<li>Num cluster com versões mistas, conclua a atualização progressiva, começando pelos proxies, antes de ativar o « <code translate="no">membership_match</code> ».</li>
<li>Teste a expressão numa coleção que não seja de produção antes de ativar um fluxo de trabalho destrutivo.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Sintaxe da expressão<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>O segundo argumento é um marcador de posição do modelo. O SDK fornece o valor do marcador de posição como um blob de filtro « <code translate="no">bytes</code> » no formato protobuf, contendo o blob de filtro criado pelo cliente. Mantenha o « <code translate="no">type</code> » explícito nas expressões de produção, para que o contrato de correção pretendido fique visível no código e nos registos.</p>
<p>O argumento <code translate="no">type</code> é opcional. Cada blob contém um cabeçalho mágico autodescritivo — <code translate="no">MBF1</code> para Bloom e <code translate="no">MRB1</code> para Roaring — e o servidor deteta o cabeçalho quando <code translate="no">type</code> é omitido. Um <code translate="no">type</code> explícito que entre em conflito com o cabeçalho do blob é rejeitado como um erro de pedido, e cabeçalhos desconhecidos ou truncados resultam num estado de falha fechada.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Escolha a codificação<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize o Bloom quando um falso positivo for aceitável. O Bloom aceita campos de inteiros com sinal (<strong>INT8/16/32/64</strong>), campos <strong>VARCHAR</strong> e caminhos <strong>JSON</strong>. Um filtro Bloom não é uma lista de permissão exata.</p>
<p><code translate="no">fpr</code> (taxa de falsos positivos) é a probabilidade de um filtro Bloom reportar um valor como membro quando esse valor nunca foi inserido: <code translate="no">fpr=0.005</code> significa que, aproximadamente, um em cada 200 valores que não são membros é erroneamente reportado como presente. Uma fpr mais baixa produz um blob maior.</p>
<p>Utilize <strong>o Roaring</strong> quando todas as correspondências tiverem de ser exatas. <strong>O Roaring</strong> aceita apenas campos de inteiros com sinal; os membros são estendidos em sinal para <strong>INT64</strong> antes da serialização, pelo que um INT8 -1 e um INT64 -1 são o mesmo membro. Não o utilize para UUID ou outros campos de cadeia de caracteres.</p>
<table>
<thead>
<tr><th>Dimensão</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Precisão</td><td>Aproximada; são possíveis falsos positivos; sem falsos negativos</td><td>Exato; sem falsos positivos nem falsos negativos</td></tr>
<tr><td>Campos</td><td>INT8/16/32/64, VARCHAR, caminhos JSON</td><td>Apenas INT8/16/32/64 com sinal</td></tr>
<tr><td>Tamanho do blob</td><td>Número de membros e FPR; cerca de 11 bits por membro com FPR de 0,005; corpo em potência de dois</td><td>Distribuição de valores; conjuntos densos comprimem-se para tamanhos muito menores; valores aleatórios de 64 bits atingem o limite máximo de 262 144 do contentor</td></tr>
<tr><td>Eliminação</td><td>Rejeitado na fase de análise</td><td>Permitido</td></tr>
<tr><td>Utilização típica</td><td>Filtros de público e exclusão</td><td>ACL, conformidade, isolamento de inquilinos, eliminação por conjunto de IDs</td></tr>
</tbody>
</table>
<p>Os caminhos<strong>JSON</strong> são estritamente tipados, linha a linha: uma cadeia <strong>JSON</strong> é analisada como um valor <strong>VARCHAR</strong>, um inteiro <strong>JSON</strong> como um valor <strong>INT64</strong> e um duplo <strong>JSON</strong> nunca corresponde a um membro inteiro, ao contrário do <code translate="no">IN</code> exato, onde 5,0 é igual a 5. Se os seus programadores codificarem inteiros como float, normalize-os na gravação ou utilize um campo escalar tipado.</p>
<p>Para qualquer uma das codificações, crie o conjunto de membros a partir do mesmo domínio de valores que o campo de destino. Não construa um filtro Bloom a partir da string <code translate="no">&quot;10086&quot;</code> e aplique-o a um campo <code translate="no">INT64</code>. O cabeçalho do blob regista os domínios de valores inseridos, e um blob com domínio incorreto é rejeitado pelo proxy com um erro de parâmetro, em vez de corresponder silenciosamente a nada. Reutilize um blob já construído em várias solicitações, em vez de o reconstruir para cada consulta.</p>
<p>Para conjuntos com alguns milhares de elementos ou menos, o simples « <code translate="no">IN</code> » continua a ser a opção mais simples. O servidor não escolhe entre <strong>IN</strong>, <strong>Bloom</strong> e <strong>Roaring</strong>. A seleção da codificação é da responsabilidade do chamador.</p>
<p>Para escolher uma codificação:</p>
<ol>
<li>Determine se a carga de trabalho tolera falsos positivos. Se não tolerar, <strong>o Bloom</strong> nunca é uma opção.</li>
<li>Para uma pertença exata, utilize <strong>«Roaring»</strong> com um campo de inteiro assinado. Valores densos ou agrupados comprimem-se nos blobs mais pequenos.</li>
<li>Verifique os limites de tamanho. Valores aleatórios uniformes de 64 bits podem exceder o limite máximo de 262 144 do high-container ou os limites de tamanho. Se isso acontecer, utilize uma lista <strong>IN</strong> tradicional que se adapte aos limites da solicitação.</li>
<li>Para a adesão exata em campos não inteiros, utilize <strong>«IN</strong>». Não existe uma codificação de adesão exata para estes campos.</li>
</ol>
<p>A correspondência de pertença não está disponível através da API HTTP RESTful. Os parâmetros do modelo de expressão HTTP aceitam apenas valores booleanos, numéricos, de cadeia de caracteres e de matriz; não existe um tipo binário <code translate="no">bytes</code> para o blob. Utilize um SDK baseado em gRPC para passar blobs de pertença.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">Padrões de pedido do SDK<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>Os trechos de código seguintes centram-se na criação de blobs de pertença e na sua transmissão como parâmetros de modelos de filtro. Partem do princípio de que as coleções e os campos já existem e estão carregados, que os clientes do SDK estão ligados e que os vetores de consulta, as listas de membros e outras variáveis referenciadas estão definidos. A configuração da coleção e a estrutura completa da aplicação foram omitidas.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Eliminação com Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Utilize um blob <strong>Roaring</strong> exato ao eliminar entidades selecionadas por um conjunto externo de IDs inteiros. Verifique o conjunto de membros e o tipo de campo da coleção antes de emitir a eliminação. Não utilize Bloom: a pertença aproximada não é um predicado de eliminação seguro, e as formas Bloom são rejeitadas nas expressões de eliminação durante a análise.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#go">   Go</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>A semântica de eliminação segue uma correspondência exata de três valores:</p>
<table>
<thead>
<tr><th>Valor do campo</th><th>membership_match(…)</th><th>não membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>sem correspondência (NULL)</td><td>sem correspondência (NULL)</td></tr>
<tr><td>no conjunto de membros</td><td>correspondência</td><td>sem correspondência</td></tr>
<tr><td>fora do conjunto</td><td>sem correspondência</td><td>correspondência</td></tr>
</tbody>
</table>
<p>A tabela é interpretada linha a linha: um «Delete» com « <code translate="no">membership_match</code> » remove as entidades dentro do conjunto, um «Delete» com « <code translate="no">not membership_match</code> » remove as entidades fora do conjunto e as entidades com valor NULL sobrevivem em ambas as polaridades.</p>
<ul>
<li>As entidades com um valor de campo NULL nunca são eliminadas, independentemente da polaridade.</li>
<li>Um bitmap vazio não elimina nada. « <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> » elimina todas as entidades com um valor de campo diferente de NULL, o complemento exato, que pode ser um conjunto grande por definição.</li>
<li><code translate="no">not membership_match</code> é o complemento exato do conjunto de membros sobre as entidades não-NULL, não uma aproximação.</li>
</ul>
<p>Em segmentos selados carregados apenas por índice, sem dados escalares brutos, a avaliação utiliza uma pesquisa inversa limitada quando o índice o suporta. Quando nem os dados de campo brutos nem um índice qualificativo estão disponíveis, o pedido falha com « <code translate="no">FieldNotLoaded</code> » em vez de devolver entidades não filtradas.</p>
<h2 id="Operational-limits" class="common-anchor-header">Limites operacionais<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>Definição</th><th>Padrão</th><th>Configurável</th><th>O que limita</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>um corpo de blob</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>agregado por pedido</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>pedido completo</td></tr>
<tr><td>Limite máximo de contentores em uso</td><td>262 144</td><td>corrigido no código</td><td>por filtro</td></tr>
<tr><td>Estimativa de memória descodificada do Roaring</td><td>64 MiB</td><td>fixo no código</td><td>por filtro</td></tr>
<tr><td>Limite do formato MBF1</td><td>128 MiB</td><td>fixo no código</td><td>limite máximo do formato blob</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0,005</td><td>gerador de cliente</td><td>alvo de falsos positivos</td></tr>
</tbody>
</table>
<p>As definições « <code translate="no">proxy.*</code> » são configurações do servidor Milvus: são definidas pelo operador do cluster em <code translate="no">milvus.yaml</code>, na secção « <code translate="no">proxy</code> », e não podem ser ajustadas por pedido ou por expressão no momento da filtragem. As admissões <strong>«Roaring»</strong> e o limite do formato MBF1 estão fixados na implementação e não podem ser configurados em nenhum local. A linha « <code translate="no">fpr</code> » é o único controlo do lado do cliente: é selecionada quando o blob é criado, com um intervalo aceitável de 0,0001 a 0,05.</p>
<p>O corpo do blob admite, no máximo, cerca de 48,6 milhões de membros INT64 no fpr predefinido, com o cabeçalho de envelope fixo de 32 bytes permitido no topo. O orçamento para toda a solicitação abrange o tamanho serializado agregado dos planos que contêm membros, mais o tamanho decodificado estimado agregado dos filtros Roaring, sendo que as sub-solicitações HybridSearch e os filtros de pontuação o partilham. Os corpos dos blobs Bloom são potências de dois: uma contagem de membros que ultrapasse ligeiramente o limite de um nível duplica o tamanho do blob, e um fpr ligeiramente superior cabe frequentemente no nível imediatamente inferior. Quando o proxy rejeita um blob Bloom de tamanho excessivo, o erro sugere um « <code translate="no">fpr</code> » que se encaixa.</p>
<ul>
<li>Os resultados da expressão de pertença não são armazenados em cache entre pedidos.</li>
<li>Os clusters de versões mistas falham em modo fechado: os QueryNodes que executam código mais antigo rejeitam planos que contenham nós de plano de pertença. Atualize primeiro os proxies e, em seguida, conclua a atualização progressiva antes de ativar o operador.</li>
<li>Os registos do servidor ocultam os bytes do blob. O texto da expressão contém apenas o nome do modelo; a carga binária é transmitida fora da banda nos valores do modelo.</li>
</ul>
