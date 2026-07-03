---
id: data-infra-integration-overview.md
title: Infraestrutura e integração de dados
summary: >-
  Visão geral da infraestrutura de terceiros com a qual o Milvus se integra —
  metadados, armazenamento de objetos e filas de mensagens.
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">Infraestrutura e integração de dados<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>O Milvus baseia-se numa infraestrutura de dados aberta para as suas dependências principais. Este capítulo aborda os componentes que pode integrar e configurar:</p>
<ul>
<li><strong><a href="/docs/pt/etcd.md">Metadados</a></strong> — O Milvus armazena metadados (esquemas de coleções, estado dos nós, pontos de verificação de consumo) no etcd.</li>
<li><strong><a href="/docs/pt/object-storage.md">Armazenamento de objetos</a></strong> — O Milvus armazena ficheiros de índice e registos binários no MinIO, AWS S3 ou noutro armazenamento de objetos na nuvem compatível com S3.</li>
<li><strong><a href="/docs/pt/mqtype-overview.md">Fila de mensagens</a></strong> — O Milvus utiliza um registo de gravação antecipada (WAL): Woodpecker (padrão), Pulsar, Kafka ou RocksMQ.</li>
</ul>
<p>Por predefinição, uma nova implementação do Milvus 3.x funciona com <strong>o Woodpecker</strong> como fila de mensagens, <strong>o etcd</strong> para metadados e <strong>o MinIO</strong> para armazenamento de objetos — não é necessária qualquer infraestrutura de mensagens adicional.</p>
