---
id: snapshots.md
title: InstantâneosCompatible with Milvus 3.0.x
summary: >-
  Utilize instantâneos para capturar estados de coleção pontuais para reversão,
  criação de versões e testes.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Instantâneos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>Um snapshot é uma imagem pontual de uma coleção Milvus, ideal para rollbacks rápidos, versionamento e testes. Captura o estado da coleção num determinado momento e armazena apenas metadados e ficheiros de manifesto, tais como o esquema, índices e ficheiros de dados vectoriais (binlogs), para um armazenamento e restauro eficientes.</p>
<div class="alert note">
<p>Os instantâneos são imagens rápidas e pontuais dos dados, adequadas para reversões ou testes rápidos<strong>(dias a semanas</strong>). Ao mesmo tempo, as cópias de segurança são cópias independentes e completas, armazenadas separadamente para recuperação de desastres a longo prazo<strong>(semanas a anos</strong>) e para uma melhor proteção contra falhas totais de armazenamento.</p>
<p>Para criar cópias de segurança, consulte <a href="/docs/pt/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomia dos instantâneos<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus implementa uma arquitetura de instantâneos baseada em manifestos para uma captura, armazenamento e restauro eficientes de dados num determinado momento, sem duplicar os dados vectoriais reais. A arquitetura separa a gestão de metadados do armazenamento de dados físicos, permitindo instantâneos leves que fazem referência a ficheiros de segmentos existentes no armazenamento de objectos.</p>
<p>Quando cria um instantâneo para uma coleção, o Milvus recolhe o seguinte:</p>
<ul>
<li><p><strong>Metadados do snapshot</strong></p>
<p>Fornece informações básicas para a criação do instantâneo, incluindo o nome e a descrição do instantâneo, o ID da coleção de destino e o ponto de tempo no qual o instantâneo é criado.</p></li>
<li><p><strong>Descrição da coleção</strong></p>
<p>Contém a descrição da coleção de destino, incluindo a definição do esquema, informações de partição e propriedades.</p></li>
<li><p><strong>Informações do índice</strong></p>
<p>Armazena os metadados do índice e os caminhos para os ficheiros de índice.</p></li>
<li><p><strong>Dados do segmento</strong></p>
<p>Captura os ficheiros de dados vectoriais (binlogs), os registos de eliminação (deltalogs) e os ficheiros de índice.</p></li>
</ul>
<p>Entre as informações acima, Milvus gera um arquivo de manifesto Apache Avro para cada segmento e armazena os metadados do snapshot, a descrição da coleção, as informações de índice e os caminhos para os arquivos de manifesto em um arquivo JSON. O diagrama a seguir ilustra a estrutura de pastas do snapshot.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>A criação de um instantâneo geralmente leva milissegundos, e a restauração leva de segundos a minutos, dependendo do volume de dados.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impactos e considerações sobre o armazenamento<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Uma vez que o Milvus faz referência a um segmento ou arquivo de índice em um snapshot, ele não coleta esses arquivos no lixo, a menos que você solte o snapshot. Os instantâneos consomem armazenamento proporcional ao tamanho das coleções de destino, e os custos de armazenamento de objetos se aplicam à retenção de instantâneos. Em casos extremos, um único instantâneo pode até duplicar os custos de armazenamento de objectos. É aconselhável</p>
<ul>
<li>Remover regularmente instantâneos antigos para poupar armazenamento.</li>
<li>Utilizar nomes e descrições descritivos para referência futura.</li>
<li>Verificar sempre os resultados da criação e do restauro de instantâneos.</li>
<li>Acompanhar os carimbos de data/hora da criação de instantâneos, a utilização do armazenamento e os IDs das tarefas de restauro para monitorização e resolução de problemas.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Limites e restrições<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Os instantâneos tornam-se imutáveis após a criação.</li>
<li>Só é possível restaurar um instantâneo para uma nova coleção dentro do mesmo cluster que o original.</li>
<li>As colecções restauradas mantêm o mesmo esquema, número de shards e contagem de partições.</li>
<li>Os dados históricos restaurados podem entrar em conflito com as políticas TTL. Aconselha-se a desativar o TTL ou a ajustar as definições de TTL antes de criar instantâneos.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Leituras adicionais<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/pt/manage-snapshots.md">Gerir instantâneos</a> - criar, listar, restaurar e eliminar instantâneos.</li>
<li><a href="/docs/pt/snapshot-use-cases.md">Casos de utilização de instantâneos</a> - padrões e fluxos de trabalho comuns.</li>
<li><a href="/docs/pt/milvus_backup_overview.md">Milvus Backup</a> - backup e restauração de longo prazo em clusters.</li>
</ul>
