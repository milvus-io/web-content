---
id: chunk_cache.md
title: Configurar a cache de pedaços
summary: ''
---
<h1 id="Configure-Chunk-Cache" class="common-anchor-header">Configurar o Chunk Cache<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h1><p>O mecanismo de cache de pedaços permite que o Milvus pré-carregue dados no cache no disco rígido local dos nós de consulta antes de serem necessários. Este mecanismo melhora significativamente o desempenho da recuperação de vectores, reduzindo o tempo necessário para carregar os dados do disco para a memória.</p>
<h2 id="Background" class="common-anchor-header">Contexto<button data-href="#Background" class="anchor-icon" translate="no">
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
    </button></h2><p>Antes de efetuar consultas para obter vectores, o Milvus tem de carregar os dados do armazenamento de objectos para a memória cache no disco rígido local dos nós de consulta. Este é um processo demorado. Antes de todos os dados estarem carregados, o Milvus pode responder a alguns pedidos de recuperação de vectores com atraso.</p>
<p>Para melhorar o desempenho da consulta, o Milvus fornece um mecanismo de cache de pedaços para pré-carregar dados do armazenamento de objectos para a cache no disco rígido local antes de serem necessários. Quando é recebido um pedido de consulta, o Segcore verifica primeiro se os dados estão na cache, em vez de no armazenamento de objectos. Se os dados estiverem no cache, o Segcore pode recuperá-los rapidamente do cache e retornar o resultado para o cliente.</p>
<h2 id="Configure-Chunk-Cache" class="common-anchor-header">Configurar o cache de pedaços<button data-href="#Configure-Chunk-Cache" class="anchor-icon" translate="no">
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
    </button></h2><p>Este guia fornece instruções sobre como configurar o mecanismo de cache de pedaços para uma instância do Milvus. A configuração varia de acordo com a maneira como você instala a instância do Milvus.</p>
<ul>
<li><p>Para instâncias do Milvus instaladas usando Helm Charts</p>
<p>Adicione a configuração ao ficheiro <code translate="no">values.yaml</code> na secção <code translate="no">config</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com Helm Charts</a>.</p></li>
<li><p>Para instâncias do Milvus instaladas usando o Docker Compose</p>
<p>Adicione a configuração ao ficheiro <code translate="no">milvus.yaml</code> que utilizou para iniciar a instância do Milvus. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure-docker.md">Configurar o Milvus com o Docker Compose</a>.</p></li>
<li><p>Para instâncias do Milvus instaladas com o Operator</p>
<p>Adicione a configuração à secção <code translate="no">spec.components</code> do recurso personalizado <code translate="no">Milvus</code>. Para obter detalhes, consulte <a href="/docs/pt/v2.4.x/configure_operator.md">Configurar o Milvus com o Operator</a>.</p></li>
</ul>
<h3 id="Configuration-options" class="common-anchor-header">Opções de configuração</h3><pre><code translate="no" class="language-yaml"><span class="hljs-attr">queryNode</span>:
    <span class="hljs-attr">cache</span>:
        <span class="hljs-attr">warmup</span>: <span class="hljs-keyword">async</span>
<button class="copy-code-btn"></button></code></pre>
<p>O parâmetro <code translate="no">warmup</code> determina se o Milvus pré-carrega dados do armazenamento de objectos para a cache no disco rígido local dos nós de consulta antes de serem necessários. A predefinição deste parâmetro é <code translate="no">disable</code>. As opções possíveis são as seguintes:</p>
<ul>
<li><code translate="no">async</code>: O Milvus pré-carrega os dados de forma assíncrona em segundo plano, o que não afecta o tempo necessário para carregar uma coleção. No entanto, os utilizadores podem sentir um atraso na obtenção de vectores durante um curto período de tempo após a conclusão do processo de carregamento.  Esta é a opção predefinida.</li>
<li><code translate="no">sync</code>: O Milvus pré-carrega os dados de forma síncrona, o que pode afetar o tempo necessário para carregar uma coleção. No entanto, os utilizadores podem efetuar consultas imediatamente após a conclusão do processo de carregamento sem qualquer atraso.</li>
<li><code translate="no">disable</code>: O Milvus não faz o pré-carregamento de dados na cache de memória.</li>
</ul>
<p>Note que as configurações de cache de pedaços também se aplicam quando novos dados são inseridos nas coleções ou quando os índices das coleções são reconstruídos.</p>
<h3 id="FAQ" class="common-anchor-header">PERGUNTAS FREQUENTES</h3><ul>
<li><p><strong>Como posso determinar se o mecanismo de cache de pedaços está a funcionar corretamente?</strong></p>
<p>Aconselha-se a verificar a latência de um pedido de pesquisa ou consulta depois de carregar uma coleção. Se a latência for significativamente maior do que o esperado (por exemplo, vários segundos), isso pode indicar que o mecanismo de cache de partes ainda está funcionando.</p>
<p>Se a latência da consulta permanecer alta por um longo tempo. Você pode verificar a taxa de transferência do armazenamento de objetos para garantir que o cache de bloco ainda esteja funcionando. Em casos normais, o cache de bloco em funcionamento gerará uma alta taxa de transferência no armazenamento de objetos. Como alternativa, você pode simplesmente tentar o cache de bloco no modo <code translate="no">sync</code>.</p></li>
</ul>
