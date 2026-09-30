---
id: snapshot-use-cases.md
title: Casos de utilização de instantâneosCompatible with Milvus 3.0.x
summary: 'Neste guia, irá encontrar casos de utilização comuns para instantâneos.'
beta: Milvus 3.0.x
---
<h1 id="Snapshot-Use-Cases" class="common-anchor-header">Casos de utilização de instantâneos<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshot-Use-Cases" class="anchor-icon" translate="no">
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
    </button></h1><p>Neste guia, encontrará casos de utilização comuns para instantâneos.</p>
<h2 id="Data-backup-and-restoration" class="common-anchor-header">Cópia de segurança e restauração de dados<button data-href="#Data-backup-and-restoration" class="anchor-icon" translate="no">
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
    </button></h2><p>Os instantâneos são imagens rápidas dos dados num momento específico, adequadas para reversões rápidas ou testes (de dias a semanas). Por outro lado, os cópias de segurança são cópias completas e independentes, armazenadas separadamente para recuperação de desastres a longo prazo (de semanas a anos) e para uma melhor proteção contra falhas totais do armazenamento.</p>
<p>A tabela seguinte compara instantâneos e cópias de segurança.</p>
<table>
   <tr>
     <th></th>
     <th><p>Cópia de segurança</p></th>
     <th><p>Instantâneo</p></th>
   </tr>
   <tr>
     <td><p>Criação do backup</p></td>
     <td><p>Copia todos os ficheiros de dados (demorado)</p></td>
     <td><p>Cria apenas metadados (em milissegundos)</p></td>
   </tr>
   <tr>
     <td><p>Restauração</p></td>
     <td><p>Importa dados e reconstrói índices</p></td>
     <td><p>Copia apenas os ficheiros de dados e índices existentes</p></td>
   </tr>
   <tr>
     <td><p>Desempenho</p></td>
     <td><p>Lento e com elevado consumo de recursos</p></td>
     <td><p>Rápido e leve (demora entre segundos e minutos)</p></td>
   </tr>
   <tr>
     <td><p>Impacto no sistema</p></td>
     <td><p>Elevado consumo de E/S e CPU</p></td>
     <td><p>Impacto mínimo</p></td>
   </tr>
</table>
<p>A criação de um instantâneo demora normalmente milésimos de segundo, e a sua restauração demora entre segundos e minutos, dependendo do volume de dados.</p>
<p>Para mais detalhes sobre os limites e restrições dos instantâneos, bem como o seu impacto no sistema, consulte <a href="/docs/pt/snapshots.md">Instantâneos</a>.</p>
<h2 id="Data-processing-with-external-collections" class="common-anchor-header">Processamento de dados com coleções externas<button data-href="#Data-processing-with-external-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>Os instantâneos podem fornecer fontes estáveis e pontuais para cargas de trabalho analíticas ou de validação. Para instantâneos do Milvus, utilize o formato de coleção externa « <code translate="no">milvus-table</code> » em vez de ler os ficheiros de instantâneo diretamente como entrada genérica do Spark. Um instantâneo do Milvus armazena metadados da coleção, manifestos de segmentos, registos de eliminação e estatísticas de chave primária; por isso, o Milvus necessita do JSON de metadados do instantâneo e do leitor « <code translate="no">milvus-table</code> » para preservar o esquema correto e a semântica de eliminação.</p>
<p>Este fluxo de trabalho cria uma coleção externa pesquisável a partir dos dados do instantâneo. Os dados da coluna principal continuam a ser referenciados a partir da fonte do instantâneo, e a atualização mapeia os manifestos do StorageV3 de origem para segmentos externos de destino.</p>
<h3 id="Step-1-Get-the-snapshot-metadata-path" class="common-anchor-header">Passo 1: Obter o caminho dos metadados do instantâneo<button data-href="#Step-1-Get-the-snapshot-metadata-path" class="anchor-icon" translate="no">
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
    </button></h3><p>Crie ou selecione um instantâneo a partir de uma coleção normal do Milvus e, em seguida, descreva-o para obter a sua localização no armazenamento de objetos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

snapshot_info = client.describe_snapshot(
    snapshot_name=<span class="hljs-string">&quot;analytics_snapshot_20260321&quot;</span>,
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    include_collection_info=<span class="hljs-literal">True</span>
)

external_source = <span class="hljs-string">f&quot;s3://bucket/<span class="hljs-subst">{snapshot_info.s3_location}</span>&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Create-and-refresh-a-milvus-table-external-collection" class="common-anchor-header">Passo 2: Criar e atualizar uma coleção externa « <code translate="no">milvus-table</code> »<button data-href="#Step-2-Create-and-refresh-a-milvus-table-external-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>Crie uma coleção externa cujo esquema corresponda à coleção de origem do instantâneo. Defina « <code translate="no">external_spec.format</code> » como « <code translate="no">&quot;milvus-table&quot;</code> » e defina « <code translate="no">external_field</code> » de cada campo de dados de destino como o nome do campo de origem correspondente.</p>
<pre><code translate="no" class="language-python">schema = client.create_schema(
    external_source=external_source,
    external_spec=<span class="hljs-string">&quot;&quot;&quot;{
        &quot;format&quot;: &quot;milvus-table&quot;,
        &quot;extfs&quot;: {
            &quot;cloud_provider&quot;: &quot;aws&quot;,
            &quot;region&quot;: &quot;us-west-2&quot;,
            &quot;access_key_id&quot;: &quot;YOUR_ACCESS_KEY&quot;,
            &quot;access_key_value&quot;: &quot;YOUR_SECRET_KEY&quot;
        }
    }&quot;&quot;&quot;</span>,
)

schema.add_field(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
    external_field=<span class="hljs-string">&quot;id&quot;</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">768</span>,
    external_field=<span class="hljs-string">&quot;embedding&quot;</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>,
    schema=schema,
)

job_id = client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;snapshot_external_collection&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Após a conclusão da atualização, pode criar índices, carregar a coleção externa e executar operações de pesquisa ou consulta na vista baseada no instantâneo.</p>
