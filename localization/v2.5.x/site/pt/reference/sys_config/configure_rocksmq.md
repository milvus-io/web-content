---
id: configure_rocksmq.md
related_key: configure
group: system_configuration.md
summary: Saiba como configurar o rocksmq para o Milvus.
---
<h1 id="rocksmq-related-Configurations" class="common-anchor-header">Configurações relacionadas com rocksmq<button data-href="#rocksmq-related-Configurations" class="anchor-icon" translate="no">
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
    </button></h1><p>Se quiser ativar o kafka, tem de comentar as configurações do pulsar</p>
<p>kafka:</p>
<p>brokerList: localhost:9092</p>
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
<h2 id="rocksmqpath" class="common-anchor-header"><code translate="no">rocksmq.path</code><button data-href="#rocksmqpath" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.path">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <li>Prefixo da chave para onde o Milvus armazena os dados no RocksMQ.</li>      
        <li>Atenção: Alterar este parâmetro depois de usar o Milvus por um período de tempo afetará o acesso a dados antigos.</li>      
        <li>Recomenda-se alterar este parâmetro antes de iniciar o Milvus pela primeira vez.</li>      
        <li>Defina um prefixo de chave raiz fácil de identificar para o Milvus se o serviço etcd já existir.</li>      </td>
      <td>/var/lib/milvus/rdb_data</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqlrucacheratio" class="common-anchor-header"><code translate="no">rocksmq.lrucacheratio</code><button data-href="#rocksmqlrucacheratio" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.lrucacheratio">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Rácio de memória cache rocksdb      </td>
      <td>0.06</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqrocksmqPageSize" class="common-anchor-header"><code translate="no">rocksmq.rocksmqPageSize</code><button data-href="#rocksmqrocksmqPageSize" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.rocksmqPageSize">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de mensagens em cada página no RocksMQ. As mensagens no RocksMQ são verificadas e apagadas (quando expiradas) em lote com base nestes parâmetros. Unidade: Byte.      </td>
      <td>67108864</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqretentionTimeInMinutes" class="common-anchor-header"><code translate="no">rocksmq.retentionTimeInMinutes</code><button data-href="#rocksmqretentionTimeInMinutes" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.retentionTimeInMinutes">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tempo máximo de retenção das mensagens solicitadas no RocksMQ. As mensagens acked no RocksMQ são retidas pelo período de tempo especificado e depois apagadas. Unidade: Minuto.      </td>
      <td>4320</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqretentionSizeInMB" class="common-anchor-header"><code translate="no">rocksmq.retentionSizeInMB</code><button data-href="#rocksmqretentionSizeInMB" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.retentionSizeInMB">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor padrão</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        O tamanho máximo de retenção das mensagens solicitadas de cada tópico no RocksMQ. As mensagens com permissão em cada tópico são apagadas se seu tamanho exceder esse parâmetro. Unidade: MB.      </td>
      <td>8192</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqcompactionInterval" class="common-anchor-header"><code translate="no">rocksmq.compactionInterval</code><button data-href="#rocksmqcompactionInterval" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.compactionInterval">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        Intervalo de tempo para acionar a compactação rocksdb para remover dados eliminados. Unidade: Segundo      </td>
      <td>86400</td>
    </tr>
  </tbody>
</table>
<h2 id="rocksmqcompressionTypes" class="common-anchor-header"><code translate="no">rocksmq.compressionTypes</code><button data-href="#rocksmqcompressionTypes" class="anchor-icon" translate="no">
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
    </button></h2><table id="rocksmq.compressionTypes">
  <thead>
    <tr>
      <th class="width80">Descrição</th>
      <th class="width20">Valor por defeito</th> 
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>        tipo de compressão de compactação, apenas suporta a utilização de 0,7. 0 significa não comprimir, 7 usará zstd. O comprimento dos tipos significa o número de níveis de rocksdb.      </td>
      <td>0,0,7,7,7</td>
    </tr>
  </tbody>
</table>
