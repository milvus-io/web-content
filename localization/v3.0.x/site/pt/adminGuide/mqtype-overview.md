---
id: mqtype-overview.md
title: Visão geral da fila de mensagens
summary: >-
  Visão geral das opções da fila de mensagens (mqType) suportadas pelo Milvus e
  qual delas deve ser utilizada em implementações autónomas ou distribuídas.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Visão geral da fila de mensagens<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus utiliza uma fila de mensagens (registo de gravação antecipada, WAL) para gerir registos de alterações recentes, registos de fluxos de saída e fornecer subscrições de registos. No Milvus 3.x, <strong>o Woodpecker</strong> é a fila de mensagens predefinida e não requer qualquer infraestrutura de mensagens separada. O Pulsar, o Kafka e o RocksMQ continuam a ser suportados para cenários específicos.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Filas de mensagens suportadas<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Fila de mensagens</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus Distribuído (cluster)</th><th>Padrão em</th><th>Notas</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/pt/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (incorporado)</td><td style="text-align:center">✔️ (integrado ou serviço)</td><td><strong>Milvus 3.x</strong> (ambos os modos)</td><td>Padrão e recomendado. WAL nativo da nuvem em armazenamento de objetos; não requer serviço externo.</td></tr>
<tr><td><a href="/docs/pt/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (predefinição do cluster)</td><td>Compatível, externo ou integrado.</td></tr>
<tr><td><a href="/docs/pt/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Compatível. Apenas Kafka 2.x ou 3.x.</td></tr>
<tr><td><a href="/docs/pt/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (predefinição da versão autónoma)</td><td>Suportado <strong>apenas</strong> para a versão <strong>autónoma</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Cada instância do Milvus utiliza exatamente uma fila de mensagens.</p></li>
<li><p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0-beta, deve manter a sua escolha atual de fila de mensagens. A alternância entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p></li>
<li><p>Para alterar a fila de mensagens de uma instância em execução, consulte «Alterar o tipo de MQ» (suportado a partir da v2.6.14).</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Escolher uma fila de mensagens<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>Novas implementações (Milvus 3.x):</strong> utilize <strong>o Woodpecker</strong> (padrão). Na versão autónoma, este é executado de forma incorporada; para a versão distribuída (cluster), o padrão recomendado é um <a href="/docs/pt/woodpecker.md#Deployment-modes">serviço</a> dedicado implementado com o Helm, sendo que a execução incorporada também é suportada.</li>
<li><strong>Utilizadores existentes do Pulsar ou do Kafka:</strong> o Pulsar e o Kafka continuam a ser totalmente suportados. Mantenha-os ou mude para o Woodpecker.</li>
<li><strong>RocksMQ:</strong> apenas na versão autónoma e substituído pelo Woodpecker incorporado no Milvus 3.x.</li>
</ul>
