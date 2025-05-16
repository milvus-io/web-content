---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Saiba mais sobre a configuração do sistema Milvus.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Lista de verificação das configurações do sistema Milvus<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta as secções gerais das configurações do sistema no Milvus.</p>
<p>O Milvus mantém um número considerável de parâmetros que configuram o sistema. Cada configuração tem um valor padrão, que pode ser usado diretamente. Pode modificar estes parâmetros de forma flexível para que o Milvus possa servir melhor a sua aplicação. Ver <a href="/docs/pt/v2.4.x/configure-docker.md">Configurar o Milvus</a> para mais informações.</p>
<div class="alert note">
Na versão atual, todos os parâmetros só têm efeito depois de serem configurados no arranque do Milvus.</div>
<h2 id="Sections" class="common-anchor-header">Secções<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>Para conveniência da manutenção, o Milvus classifica as suas configurações em %s secções com base nos seus componentes, dependências e utilização geral.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Configuração relacionada com o etcd, utilizado para armazenar metadados e descoberta de serviços do Milvus.</p>
<p>Ver <a href="/docs/pt/v2.4.x/configure_etcd.md">Configurações relacionadas com o etcd</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>Ver <a href="/docs/pt/v2.4.x/configure_metastore.md">Configurações relacionadas com o metastore</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Configuração relacionada do tikv, usado para armazenar metadados do Milvus.</p>
<p>Note que quando o TiKV está ativado para o metastore, continua a ser necessário ter o etcd para a descoberta de serviços.</p>
<p>O TiKV é uma boa opção quando o tamanho dos metadados requer uma melhor escalabilidade horizontal.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_tikv.md">Configurações relacionadas com o tikv</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>Consulte <a href="/docs/pt/v2.4.x/configure_localstorage.md">Configurações relacionadas com o localStorage</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>A configuração relacionada do MinIO/S3/GCS ou de qualquer outro serviço suporta a API S3, que é responsável pela persistência de dados para o Milvus.</p>
<p>Para simplificar, referimo-nos ao serviço de armazenamento como MinIO/S3 na descrição que se segue.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_minio.md">as Configurações relacionadas com o MinIO</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>O Milvus suporta quatro MQ: rocksmq (baseado no RockDB), natsmq (servidor nats incorporado), Pulsar e Kafka.</p>
<p>Pode alterar o seu MQ definindo o campo mq.type.</p>
<p>Se não definir o campo mq.type como predefinido, existe uma nota sobre a ativação da prioridade se configurarmos vários mq neste ficheiro.</p>
<ol>
<li><p>modo autónomo (local): rocksmq (predefinição) &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>modo de cluster:  Pulsar(default) &gt; Kafka (rocksmq e natsmq não são suportados no modo cluster)</p></li>
</ol>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_mq.md">Configurações relacionadas com mq</a> para obter uma descrição detalhada de cada parâmetro nesta secção.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>Configuração relacionada com o pulsar, utilizada para gerir os registos Milvus de operações de mutação recentes, registo de streaming de saída e fornecer serviços de publicação-subscrição de registos.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_pulsar.md">Configurações relacionadas com o pulsar</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>Se quiser ativar o kafka, tem de comentar as configurações do pulsar</p>
<p>kafka:</p>
<p>brokerList:</p>
<p>saslUsername:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>securityProtocol:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>Ver <a href="/docs/pt/v2.4.x/configure_rocksmq.md">Configurações relacionadas com rocksmq</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>configuração natsmq.</p>
<p>mais detalhes: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>Ver <a href="/docs/pt/v2.4.x/configure_natsmq.md">Configurações relacionadas com natsmq</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>Configuração relacionada com o rootCoord, utilizada para tratar os pedidos de linguagem de definição de dados (DDL) e de linguagem de controlo de dados (DCL)</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_rootcoord.md">Configurações relacionadas com rootCoord</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>Configuração relacionada do proxy, utilizada para validar os pedidos dos clientes e reduzir os resultados devolvidos.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_proxy.md">as Configurações relacionadas com o proxy</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>Configuração relacionada de queryCoord, usada para gerenciar a topologia e o balanceamento de carga para os nós de consulta e a transferência de segmentos crescentes para segmentos selados.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_querycoord.md">Configurações relacionadas com queryCoord</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>Configuração relacionada de queryNode, usada para executar pesquisa híbrida entre dados vetoriais e escalares.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_querynode.md">Configurações relacionadas com queryNode</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>Consulte <a href="/docs/pt/v2.4.x/configure_indexcoord.md">Configurações relacionadas com indexCoord</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>Ver <a href="/docs/pt/v2.4.x/configure_indexnode.md">Configurações relacionadas com o indexNode</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>Ver <a href="/docs/pt/v2.4.x/configure_datacoord.md">Configurações relacionadas com o dataCoord</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>Consulte <a href="/docs/pt/v2.4.x/configure_datanode.md">Configurações relacionadas com dataNode</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>Este tópico apresenta as configurações do Milvus relacionadas com o canal de mensagens.</p>
<p>Ver <a href="/docs/pt/v2.4.x/configure_msgchannel.md">msgChannel-related Configurations</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>Configura a saída de log do sistema.</p>
<p>Ver <a href="/docs/pt/v2.4.x/configure_log.md">Configurações relacionadas com o log</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>Ver <a href="/docs/pt/v2.4.x/configure_grpc.md">Configurações relacionadas com o grpc</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>Configurar a ativação do proxy tls.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_tls.md">Configurações relacionadas com tls</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>Ver <a href="/docs/pt/v2.4.x/configure_common.md">Configurações relacionadas com common</a> para uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, configurações de quotas e limites do Milvus.</p>
<p>Por defeito, activamos:</p>
<ol>
<li><p>Proteção TT;</p></li>
<li><p>Proteção da memória.</p></li>
<li><p>Proteção da quota de disco.</p></li>
</ol>
<p>É possível ativar:</p>
<ol>
<li><p>Limitação da taxa de transferência DML;</p></li>
<li><p>Limitação DDL, DQL qps/rps;</p></li>
<li><p>Proteção do comprimento/latência da fila DQL;</p></li>
<li><p>Proteção da taxa de resultados DQL;</p></li>
</ol>
<p>Se necessário, também é possível forçar manualmente a recusa de pedidos RW.</p>
<p>Consulte <a href="/docs/pt/v2.4.x/configure_quotaandlimits.md">as Configurações relacionadas com quotaAndLimits</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>Consulte <a href="/docs/pt/v2.4.x/configure_trace.md">Configurações relacionadas com trace</a> para obter uma descrição detalhada de cada parâmetro desta secção.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#quando utilizar a indexação GPU, o Milvus utilizará um pool de memória para evitar a alocação e desalocação frequente de memória.</p>
<p>#aqui, você pode definir o tamanho da memória ocupada pelo pool de memória, com a unidade sendo MB.</p>
<p>#note que existe a possibilidade do Milvus falhar quando a demanda real de memória exceder o valor definido por maxMemSize.</p>
<p>#se initMemSize e MaxMemSize estão ambos a zero,</p>
<p>#milvus inicializará automaticamente metade da memória disponível da GPU,</p>
<p>#maxMemSize irá toda a memória disponível da GPU.</p>
<p>Veja <a href="/docs/pt/v2.4.x/configure_gpu.md">Configurações relacionadas com o gpu</a> para uma descrição detalhada de cada parâmetro nesta secção.</p>
