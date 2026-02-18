---
id: switch_milvus_cluster_mq_type-operator.md
summary: Saiba como mudar o tipo de fila de mensagens para um cluster Milvus.
title: Trocar o tipo de MQ para o Cluster Milvus
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">Trocar o tipo de MQ para o Cluster Milvus<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico descreve como alternar o tipo de fila de mensagens (MQ) para uma implantação de cluster Milvus existente. O Milvus suporta a troca de MQ online entre Pulsar, Kafka e Woodpecker sem tempo de inatividade.</p>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Uma instância de cluster Milvus em execução instalada via <a href="/docs/pt/v2.6.x/install_cluster-milvusoperator.md">Milvus Operator</a> ou <a href="/docs/pt/v2.6.x/install_cluster-helm.md">Helm</a>.</li>
<li>A instância do Milvus foi atualizada para a versão mais recente que suporta este recurso Switch MQ.</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">Mudar de Pulsar/Kafka para Woodpecker (MinIO)<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>Siga estes passos para mudar o tipo de MQ de Pulsar ou Kafka para Woodpecker com armazenamento MinIO.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Etapa 1: verificar se a instância do Milvus está em execução<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de mudar, certifique-se de que a instância do cluster Milvus está a funcionar corretamente. É possível verificar isso criando uma coleção de teste, inserindo dados e executando uma consulta.</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">Etapa 2: (Opcional) Verificar a configuração do Woodpecker<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>A configuração padrão do Milvus já define o tipo de armazenamento do Woodpecker como MinIO, portanto, nenhuma configuração adicional é necessária na maioria dos casos.</p>
<p>No entanto, se você tiver personalizado anteriormente a configuração do Woodpecker, deverá garantir que <code translate="no">woodpecker.storage.type</code> esteja definido como <code translate="no">minio</code>. Atualize a configuração do Milvus <strong>sem</strong> alterar o valor de <code translate="no">mqType</code>:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Para o <strong>Helm</strong>, consulte <a href="/docs/pt/v2.6.x/configure-helm.md">Configurar o Milvus com Helm Charts</a> para obter instruções sobre como atualizar a configuração.</li>
<li>Para o <strong>Milvus Operator</strong>, consulte <a href="/docs/pt/v2.6.x/configure_operator.md">Configurar o Milvus com o Milvus Operator</a> para obter instruções sobre como atualizar a configuração.</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Etapa 3: Executar a troca de MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte comando para acionar a mudança para o Woodpecker:</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Substitua <code translate="no">&lt;mixcoord_addr&gt;</code> pelo endereço real do seu serviço MixCoord.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Etapa 4: verificar se a troca foi concluída<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>O processo de troca é concluído automaticamente. Monitore os logs do Milvus em busca das seguintes mensagens-chave para confirmar que a troca foi concluída:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Nas mensagens de registo acima, <code translate="no">&lt;MQ1&gt;</code> é o tipo de MQ de origem (por exemplo, <code translate="no">pulsar</code> ou <code translate="no">kafka</code>) e <code translate="no">&lt;MQ2&gt;</code> é o tipo de MQ de destino (<code translate="no">woodpecker</code>).</p>
<ul>
<li>A primeira mensagem indica que a troca de WAL da origem para o destino foi concluída.</li>
<li>A segunda mensagem indica que todos os canais físicos foram trocados.</li>
<li>A terceira mensagem indica que a configuração do <code translate="no">mq.type</code> foi actualizada no etcd.</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">Alternar do Woodpecker (MinIO) para o Pulsar ou o Kafka<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>Siga estas etapas para alternar o tipo de MQ do Woodpecker de volta para o Pulsar ou Kafka.</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">Etapa 1: verificar se a instância do Milvus está em execução<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de mudar, verifique se a instância do cluster do Milvus está funcionando corretamente.</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">Etapa 2: configurar o MQ de destino<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>Antes de acionar a troca, é necessário garantir que o serviço MQ de destino (Pulsar ou Kafka) esteja disponível e que sua configuração de acesso seja renderizada na configuração do Milvus.</p>
<div class="alert note">
<p>Os passos exactos desta secção dependem da utilização de um serviço MQ interno (agrupado) ou externo.</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">Opção A: Pulsar/Kafka interno (empacotado com o Helm)</h4><p>Se você estiver usando o Pulsar ou o Kafka empacotado implantado pelo Helm, atualize sua versão do Helm para habilitar o serviço MQ de destino e desabilitar o Woodpecker. O sinalizador <code translate="no">streaming.enabled=true</code> é necessário para habilitar o nó de streaming, que é um pré-requisito para o recurso Alternar MQ. Por exemplo, para mudar para o Pulsar:</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Após a atualização, verifique se a configuração de acesso ao MQ de destino foi renderizada na configuração do Milvus. Por exemplo, para Pulsar:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">Opção B: Pulsar/Kafka interno (gerido pelo Milvus Operator)</h4><p>Se você estiver usando o Milvus Operator, atualize o recurso personalizado do Milvus para incluir a configuração de acesso ao MQ de destino. Consulte <a href="/docs/pt/v2.6.x/configure_operator.md">Configurar o Milvus com o Milvus Operator</a> para obter detalhes sobre como atualizar a configuração do Milvus.</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">Opção C: Pulsar/Kafka externo</h4><p>Se estiver a usar um serviço Pulsar ou Kafka externo, não é necessário alterar o <code translate="no">mqType</code>. Basta adicionar a configuração de acesso ao MQ externo ao seu <code translate="no">values.yaml</code> e reiniciar a instância do Milvus para renderizar a configuração.</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">Etapa 3: Executar a troca de MQ<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>Execute o seguinte comando para ativar a mudança para Pulsar (substitua <code translate="no">pulsar</code> por <code translate="no">kafka</code> se estiver a mudar para Kafka):</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Substitua <code translate="no">&lt;mixcoord_addr&gt;</code> pelo endereço real do seu serviço MixCoord.</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">Etapa 4: verificar se a troca foi concluída<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>O processo de troca é concluído automaticamente. Monitore os logs do Milvus em busca das seguintes mensagens-chave para confirmar que a troca foi concluída:</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Nas mensagens de registo acima, <code translate="no">&lt;MQ1&gt;</code> é o tipo de MQ de origem (<code translate="no">woodpecker</code>), e <code translate="no">&lt;MQ2&gt;</code> é o tipo de MQ de destino (por exemplo, <code translate="no">pulsar</code> ou <code translate="no">kafka</code>).</p>
<ul>
<li>A primeira mensagem indica que a troca de WAL da origem para o destino foi concluída.</li>
<li>A segunda mensagem indica que todos os canais físicos foram trocados.</li>
<li>A terceira mensagem indica que a configuração do <code translate="no">mq.type</code> foi atualizada no etcd.</li>
</ul>
</div>
