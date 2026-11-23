---
id: configure_access_logs.md
title: Configurar registos de acesso
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurar registos de acesso<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>A funcionalidade de registos de acesso do Milvus permite aos administradores do servidor registar e analisar o comportamento de acesso dos utilizadores, ajudando a compreender aspetos como as taxas de sucesso das consultas e os motivos das falhas.</p>
<p>Este guia fornece instruções detalhadas sobre como configurar os registos de acesso no Milvus.</p>
<p>A configuração dos registos de acesso depende do método de instalação do Milvus:</p>
<ul>
<li><strong>Instalação com Helm</strong>: Configure em <code translate="no">values.yaml</code>. Para mais informações, consulte <a href="/docs/pt/configure-helm.md">«Configurar o Milvus com Helm Charts</a>».</li>
<li><strong>Instalação com o Docker</strong>: Configure em <code translate="no">milvus.yaml</code>. Para mais informações, consulte <a href="/docs/pt/configure-docker.md">«Configurar o Milvus com o Docker Compose</a>».</li>
<li><strong>Instalação com o Operator</strong>: Altere <code translate="no">spec.components</code> no ficheiro de configuração. Para mais informações, consulte <a href="/docs/pt/configure_operator.md">«Configurar o Milvus com o Milvus Operator</a>».</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">Opções de configuração<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>Escolha entre três opções de configuração consoante as suas necessidades:</p>
<ul>
<li><strong>Configuração base</strong>: Para fins gerais.</li>
<li><strong>Configuração para ficheiros de registo de acesso local</strong>: Para armazenar registos localmente.</li>
<li><strong>Configuração para carregar registos de acesso locais para o MinIO</strong>: Para armazenamento na nuvem e cópias de segurança.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuração básica<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>A configuração básica envolve ativar os registos de acesso e definir o nome do ficheiro de registo ou utilizar o stdout.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Indica se a funcionalidade de registo de acesso deve ser ativada. O valor predefinido é <strong>«false</strong>».</li>
<li><code translate="no">proxy.accessLog.filename</code>: O nome do ficheiro de registo de acesso. Se deixar este parâmetro em branco, os registos de acesso serão enviados para o stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuração para ficheiros de registo de acesso locais<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>Configure o armazenamento local para ficheiros de registo de acesso com parâmetros que incluem o caminho do ficheiro local, o tamanho do ficheiro e o intervalo de rotação:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Estes parâmetros são especificados quando ` <code translate="no">filename</code> ` não estiver vazio.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: O caminho local do ficheiro onde o ficheiro de registo de acesso é armazenado. O valor predefinido é <code translate="no">/tmp/milvus_access</code>.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: O tamanho máximo, em MB, permitido para um único ficheiro de registo de acesso. Se o tamanho do ficheiro de registo atingir este limite, será acionado um processo de rotação. Este processo sela o ficheiro de registo de acesso atual, cria um novo ficheiro de registo e limpa o conteúdo do ficheiro de registo original. O valor predefinido é <strong>64</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: O intervalo de tempo máximo, em segundos, permitido para a rotação de um único ficheiro de registo de acesso. Ao atingir o intervalo de tempo especificado, é acionado um processo de rotação, resultando na criação de um novo ficheiro de registo de acesso e no selamento do anterior. O valor predefinido é <strong>0</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: O número máximo de ficheiros de registo de acesso selados que podem ser mantidos. Se o número de ficheiros de registo de acesso selados exceder este limite, o mais antigo será eliminado. O valor predefinido é <strong>8</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuração para carregar ficheiros de registo de acesso locais para o MinIO<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>Ative e configure as definições para carregar ficheiros de registo de acesso locais para o MinIO:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-attr">maxSize:</span> <span class="hljs-number">500</span>
    <span class="hljs-attr">rotatedTime:</span> <span class="hljs-number">86400</span>
    <span class="hljs-attr">maxBackups:</span> <span class="hljs-number">7</span>
    <span class="hljs-attr">minioEnable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">remotePath:</span> <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    <span class="hljs-attr">remoteMaxTime:</span> <span class="hljs-number">0</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao configurar os parâmetros do MinIO, certifique-se de que definiu <code translate="no">maxSize</code> ou <code translate="no">rotatedTime</code>. Se não o fizer, o envio dos ficheiros de registo de acesso locais para o MinIO poderá falhar.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Indica se os ficheiros de registo de acesso locais devem ser carregados para o MinIO. O valor predefinido é <strong>«false</strong>».</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: O caminho do armazenamento de objetos para o envio dos ficheiros de registo de acesso. O valor predefinido é <code translate="no">access_log/</code>.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: O intervalo de tempo permitido para o envio dos ficheiros de registo de acesso. Se o tempo de envio de um ficheiro de registo exceder este intervalo, o ficheiro será eliminado. Definir o valor para 0 desativa esta funcionalidade. O valor predefinido é <strong>0</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">Configuração do formatador<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>O formato de registo predefinido utilizado para todos os métodos é o formato <code translate="no">base</code>, que não requer associações específicas a métodos. No entanto, se pretender personalizar a saída de registo para métodos específicos, pode definir um formato de registo personalizado e aplicá-lo aos métodos associados.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;access_log.txt&quot;</span>
    <span class="hljs-attr">localPath:</span> <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    <span class="hljs-attr">formatters:</span>
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      <span class="hljs-attr">base:</span> 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_name-$method_status-$error_code [traceID: $trace_id] [timeCost: $time_cost]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      <span class="hljs-attr">query:</span> 
        <span class="hljs-attr">format:</span> <span class="hljs-string">&quot;[$time_now] [ACCESS] &lt;$user_name: $user_addr&gt; $method_status-$method_name [traceID: $trace_id] [timeCost: $time_cost] [database: $database_name] [collection: $collection_name] [partitions: $partition_name] [expr: $method_expr]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        <span class="hljs-attr">methods:</span> [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: Define o formato de registo com métricas dinâmicas. Para mais informações, consulte <a href="#reference-supported-metrics">Métricas suportadas</a>.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: Lista as operações do Milvus que utilizam este formatador. Para obter os nomes dos métodos, consulte <strong>MilvusService</strong> nos <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">métodos do Milvus</a>.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">Referência: Métricas suportadas<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>Nome da métrica</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nome do método</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Estado do acesso: <strong>OK</strong> ou <strong>Falha</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expressão utilizada para operações de consulta, pesquisa ou eliminação</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID associado ao acesso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Endereço IP do utilizador</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nome do utilizador</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Tamanho dos dados da resposta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Código de erro específico do Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Mensagem de erro detalhada</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nome da base de dados Milvus de destino</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nome da coleção Milvus de destino</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nome ou nomes da(s) partição(ões) do Milvus de destino</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tempo necessário para concluir o acesso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Hora em que o registo de acesso é impresso (normalmente equivalente a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Hora em que o acesso tem início</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Hora em que o acesso termina</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versão do SDK do Milvus utilizada pelo utilizador</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>Tipo de erro: <strong>system_error</strong> ou <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>Campos de saída do pedido</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>Prefixo do cluster definido em <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>Nível de consistência da solicitação</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>Campo vetorial de uma solicitação de pesquisa ou de pesquisa híbrida</td></tr>
<tr><td><code translate="no">$nq</code></td><td>Número de vetores de consulta de uma solicitação de pesquisa ou de pesquisa híbrida</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>Parâmetros de pesquisa de uma solicitação de pesquisa ou de pesquisa híbrida</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>Parâmetros de consulta de uma solicitação de consulta</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>Tempo de pedido definido pelo cliente nos metadados gRPC</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>Comprimento de cada valor do modelo de expressão</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>Se uma solicitação de upsert é uma atualização parcial</td></tr>
</tbody>
</table>
