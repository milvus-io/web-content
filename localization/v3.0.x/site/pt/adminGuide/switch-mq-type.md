---
id: switch-mq-type.md
title: Alterar o tipo de MQ
summary: >-
  Alterar a fila de mensagens de uma implementação existente do Milvus, passando
  do Woodpecker para outra fila de mensagens, sem tempo de inatividade.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Alterar o tipo de MQ<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como alternar a fila de mensagens (MQ) de uma implementação existente do Milvus <strong>entre o Woodpecker e outra fila de mensagens</strong>, em linha e sem tempo de inatividade.</p>
<div class="alert warning">
<p>Esta funcionalidade está pendente de lançamento e está sujeita a alterações. Contacte o apoio técnico do Milvus se quiser experimentá-la ou se tiver alguma dúvida.</p>
</div>
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
<li><strong>A funcionalidade «Mudar MQ» está disponível no Milvus 3.0 e versões posteriores.</strong> Atualize a sua instância do Milvus para a versão 3.0 ou posterior antes de a utilizar — a funcionalidade não está disponível em versões anteriores.</li>
<li>A instância está a funcionar corretamente.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Âmbito<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>Este guia aborda apenas a alternância <strong>entre o Woodpecker e outra fila de mensagens</strong>. A alternância direta entre o Pulsar e o Kafka está fora do âmbito deste guia.</p>
<ul>
<li><a href="/docs/pt/switch-rocksmq-woodpecker.md">Alternar entre o RocksMQ e o Woodpecker</a> — Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/pt/switch-pulsar-woodpecker.md">Alternar entre o Pulsar e o Woodpecker</a> — cluster do Milvus (Helm / Milvus Operator)</li>
<li><a href="/docs/pt/switch-kafka-woodpecker.md">Mudança entre o Kafka e o Woodpecker</a> — cluster Milvus (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">Fluxo de trabalho geral<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Certifique-se de que a instância do Milvus está a funcionar corretamente.</li>
<li>Confirme o tipo de MQ de origem e o tipo de MQ de destino.</li>
<li>Aplique as definições de acesso do MQ de destino à configuração do Milvus <strong>sem</strong> alterar o valor de « <code translate="no">mqType</code> ».</li>
<li>Acionar a alternância chamando a API WAL alter no MixCoord.</li>
<li>Monitorize os registos para confirmar que a transição foi concluída.</li>
</ol>
<div class="alert note">
<p>Antes da transição, certifique-se de que o MQ de destino não contém tópicos com os mesmos nomes que os utilizados pela instância atual do Milvus. Isto é especialmente importante se o MQ de destino tiver sido utilizado por outra instância do Milvus, uma vez que nomes de tópicos em conflito podem levar a comportamentos inesperados.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Matriz de suporte<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>MQ de origem</th><th>MQ de destino</th><th>Implementação</th><th>Estado</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (local/MinIO)</td><td>Autónomo (Docker Compose)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Woodpecker (local/MinIO)</td><td>RocksMQ</td><td>Autónomo (Docker Compose)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Pulsar (integrado/externo)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (externo)</td><td>Cluster (Helm / Operator)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Kafka (integrado/externo)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (externo)</td><td>Cluster (Helm / Operator)</td><td><strong>Compatível</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local (ou vice-versa)</td><td>qualquer</td><td><strong>Não suportado</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Evite alternar repetidamente entre tipos de MQ. Se for necessário alternar, certifique-se de que limpa os dados relacionados antes de cada alternância — os dados residuais podem causar um comportamento inesperado.</p>
</div>
