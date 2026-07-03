---
id: mq_rocksmq.md
title: RocksMQ
---
<h1 id="Use-RocksMQ-as-the-Milvus-Message-Queue" class="common-anchor-header">Utilizar o RocksMQ como fila de mensagens do Milvus<button data-href="#Use-RocksMQ-as-the-Milvus-Message-Queue" class="anchor-icon" translate="no">
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
    </button></h1><p>O RocksMQ é uma fila de mensagens incorporada (WAL) incluída no Milvus, disponível <strong>apenas</strong> para <strong>o Milvus Standalone</strong>. Era a fila de mensagens padrão do Milvus Standalone nas versões anteriores; no Milvus 3.x, o Milvus Standalone utiliza <a href="/docs/pt/woodpecker.md">o Woodpecker</a> incorporado por predefinição.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Compatibilidade de versões<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
<li><strong>Apenas Standalone</strong> — o RocksMQ <strong>não</strong> é suportado no Milvus Distributed (cluster). Consulte a <a href="/docs/pt/mqtype-overview.md#Supported-message-queues">matriz de suporte à fila de mensagens</a>.</li>
<li>O RocksMQ é fornecido com o Milvus, pelo que não é necessário instalar uma versão separada.</li>
<li>Era a fila de mensagens autónoma predefinida nas versões anteriores do Milvus e foi substituída pelo Woodpecker incorporado no Milvus 3.x.</li>
</ul>
<h2 id="Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="common-anchor-header">Implementar o Milvus Standalone com o RocksMQ utilizando o Docker<button data-href="#Deploy-Milvus-Standalone-with-RocksMQ-using-Docker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install" class="common-anchor-header">Instalação<button data-href="#Install" class="anchor-icon" translate="no">
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
    </button></h3><p>Siga as instruções <a href="/docs/pt/install_standalone-docker.md">em «Executar o Milvus no Docker</a>». No Milvus 3.x, o padrão para a versão autónoma é o Woodpecker; por isso, altere explicitamente o tipo de fila de mensagens para RocksMQ. O script de inicialização cria um novo ficheiro « <code translate="no">user.yaml</code> » na <strong>primeira</strong> execução ( <code translate="no">start</code>); por isso, defina o tipo <strong>após</strong> essa primeira inicialização e, em seguida, execute « <code translate="no">restart</code> » para aplicar a alteração (o comando « <code translate="no">restart</code> » preserva o ficheiro « <code translate="no">user.yaml</code> »):</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-rocksmq &amp;&amp; <span class="hljs-built_in">cd</span> milvus-rocksmq
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># 1. First start — boots the container and writes a default user.yaml</span>
bash standalone_embed.sh start

<span class="hljs-comment"># 2. Set the message queue to RocksMQ</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: rocksmq
EOF

<span class="hljs-comment"># 3. Restart to apply the change</span>
bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
A alteração de <code translate="no">mq.type</code> desta forma destina-se a uma instância <b>totalmente nova</b> (sem coleções ainda). Para alterar a fila de mensagens de uma instância que já contém dados, siga o <a href="/docs/pt/switch-rocksmq-woodpecker.md">procedimento de mudança</a>.
</div>
<h3 id="Configure" class="common-anchor-header">Configurar<button data-href="#Configure" class="anchor-icon" translate="no">
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
    </button></h3><p>Para ajustar o RocksMQ, adicione uma secção « <code translate="no">rocksmq</code> » ao ficheiro « <code translate="no">user.yaml</code> » e reinicie o serviço:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">rocksmq</span>
<span class="hljs-attr">rocksmq:</span>
  <span class="hljs-attr">path:</span> <span class="hljs-string">/var/lib/milvus/rdb_data</span>   <span class="hljs-comment"># where messages are stored</span>
  <span class="hljs-attr">lrucacheratio:</span> <span class="hljs-number">0.06</span>              <span class="hljs-comment"># rocksdb cache memory ratio</span>
  <span class="hljs-attr">rocksmqPageSize:</span> <span class="hljs-number">67108864</span>        <span class="hljs-comment"># 64 MB, size of each message page</span>
  <span class="hljs-attr">retentionTimeInMinutes:</span> <span class="hljs-number">4320</span>     <span class="hljs-comment"># 3 days</span>
  <span class="hljs-attr">retentionSizeInMB:</span> <span class="hljs-number">8192</span>          <span class="hljs-comment"># 8 GB</span>
  <span class="hljs-attr">compactionInterval:</span> <span class="hljs-number">86400</span>        <span class="hljs-comment"># 1 day, trigger rocksdb compaction</span>
  <span class="hljs-attr">compressionTypes:</span> [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">bash standalone_embed.sh restart
<button class="copy-code-btn"></button></code></pre>
<h3 id="Uninstall" class="common-anchor-header">Desinstalar<button data-href="#Uninstall" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-bash">bash standalone_embed.sh stop
bash standalone_embed.sh delete
<button class="copy-code-btn"></button></code></pre>
<h2 id="Notes" class="common-anchor-header">Notas<button data-href="#Notes" class="anchor-icon" translate="no">
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
<li><strong>Atualização da versão 2.5.x para a 2.6.x:</strong> <strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0-beta, deve manter a sua escolha atual de fila de mensagens. A mudança entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.
Como a versão 2.6.x altera a predefinição da versão autónoma para o Woodpecker, defina <code translate="no">mq.type: rocksmq</code> no seu ficheiro <code translate="no">user.yaml</code> <strong>antes</strong> da atualização, caso pretenda manter o RocksMQ.</li>
<li>Para alterar a fila de mensagens de uma instância em execução, consulte <a href="/docs/pt/switch-rocksmq-woodpecker.md">«Mudar do RocksMQ para o Woodpecker</a>».</li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Próximos passos<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/pt/woodpecker.md">Woodpecker (fila de mensagens predefinida)</a></li>
<li><a href="/docs/pt/switch-rocksmq-woodpecker.md">Mudar do RocksMQ para o Woodpecker</a></li>
</ul>
