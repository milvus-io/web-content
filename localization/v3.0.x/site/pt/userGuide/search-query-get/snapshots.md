---
id: snapshots.md
title: InstantâneosCompatible with Milvus 3.0.x
summary: >-
  Utilize instantâneos para registar o estado da coleção num determinado
  momento, para efeitos de reversão, controlo de versões e testes.
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
    </button></h1><p>Um instantâneo é uma imagem de uma coleção do Milvus num determinado momento, ideal para reversões rápidas, controlo de versões e testes. Capta o estado da coleção num momento específico e armazena apenas metadados e ficheiros de manifesto, tais como o esquema, os índices e os ficheiros de dados vetoriais (binlogs), para um armazenamento e restauração eficientes.</p>
<p>Os instantâneos são imagens rápidas dos dados num momento específico, adequadas para reversões rápidas ou testes (<strong>de dias a semanas</strong>). Por outro lado, as cópias de segurança são cópias completas e independentes, armazenadas separadamente para recuperação de desastres a longo prazo (<strong>de semanas a anos</strong>) e para uma melhor proteção contra falhas totais de armazenamento.</p>
<p>Para criar cópias de segurança, consulte <a href="/docs/pt/milvus_backup_overview.md">«Milvus Backup</a>».</p>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Anatomia do instantâneo<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>O Milvus implementa uma arquitetura de instantâneos baseada em manifestos para a captura, armazenamento e restauração eficientes de dados num momento específico, sem duplicar os dados vetoriais reais. A arquitetura separa a gestão de metadados do armazenamento físico de dados, permitindo instantâneos leves que fazem referência a ficheiros de segmentos existentes no armazenamento de objetos.</p>
<p>Quando cria um instantâneo para uma coleção, o Milvus recolhe o seguinte:</p>
<ul>
<li><p><strong>Metadados do instantâneo</strong></p>
<p>Fornecem informações básicas para a criação do instantâneo, incluindo o nome e a descrição do instantâneo, o ID da coleção de destino e o momento em que o instantâneo é criado.</p></li>
<li><p><strong>Descrição da coleção</strong></p>
<p>Contém a descrição da coleção de destino, incluindo a definição do esquema, informações de partição e propriedades.</p></li>
<li><p><strong>Informações do índice</strong></p>
<p>Armazena os metadados do índice e os caminhos para os ficheiros de índice.</p></li>
<li><p><strong>Dados do segmento</strong></p>
<p>Captura os ficheiros de dados vetoriais (binlogs), os registos de eliminação (deltalogs) e os ficheiros de índice.</p></li>
</ul>
<p>Entre as informações acima referidas, o Milvus gera um ficheiro de manifesto Apache Avro para cada segmento e armazena os metadados do instantâneo, a descrição da coleção, as informações do índice e os caminhos para os ficheiros de manifesto num ficheiro JSON. O diagrama seguinte ilustra a estrutura da pasta do instantâneo.</p>
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
<p>A criação de um instantâneo demora normalmente milésimos de segundo, e a sua restauração demora entre segundos e minutos, dependendo do volume de dados.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Impactos e considerações relativos ao armazenamento<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Assim que o Milvus referenciar um segmento ou ficheiro de índice num instantâneo, não procede à recolha de lixo desses ficheiros, a menos que elimine o instantâneo. Os instantâneos consomem armazenamento proporcionalmente ao tamanho das coleções de destino, e os custos de armazenamento de objetos aplicam-se à retenção dos instantâneos. Em casos extremos, um único instantâneo pode até duplicar os seus custos de armazenamento de objetos. Recomenda-se que</p>
<ul>
<li>Remova regularmente os instantâneos antigos para poupar espaço de armazenamento.</li>
<li>Utilizar nomes e descrições descritivos para referência futura.</li>
<li>Verifique sempre os resultados da criação e restauração de instantâneos.</li>
<li>Acompanhar os carimbos de data e hora da criação dos instantâneos e a utilização de armazenamento para monitorização e resolução de problemas.</li>
<li>Armazene os IDs das tarefas de restauração para monitorização e resolução de problemas.</li>
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
<li>As coleções restauradas mantêm o mesmo esquema, número de fragmentos e contagem de partições.</li>
<li>Os dados históricos restaurados podem entrar em conflito com as políticas de TTL. Recomenda-se desativar o TTL ou ajustar as definições de TTL antes de criar instantâneos.</li>
<li>Para utilizar um instantâneo como fonte externa do « <code translate="no">milvus-table</code> », o instantâneo de origem deve provir de uma coleção normal do StorageV3 Milvus. Os instantâneos de coleções externas não são suportados como fontes do « <code translate="no">milvus-table</code> ».</li>
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
<li><a href="/docs/pt/manage-snapshots.md">Gerir instantâneos</a> — criar, listar, descrever, fixar, restaurar e eliminar instantâneos.</li>
<li><a href="/docs/pt/snapshot-use-cases.md">Casos de utilização de instantâneos</a> — padrões e fluxos de trabalho comuns.</li>
<li><a href="/docs/pt/milvus_backup_overview.md">Cópia de segurança do Milvus</a> — cópia de segurança e restauração a longo prazo entre clusters.</li>
</ul>
