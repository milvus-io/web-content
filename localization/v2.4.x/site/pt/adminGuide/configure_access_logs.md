---
id: configure_access_logs.md
title: Configurar registos de acesso
summary: ''
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">Configurar Logs de Acesso<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>A funcionalidade de registo de acesso no Milvus permite aos gestores de servidores registar e analisar o comportamento de acesso dos utilizadores, ajudando a compreender aspectos como as taxas de sucesso das consultas e as razões das falhas.</p>
<p>Este guia fornece instruções detalhadas sobre a configuração dos registos de acesso no Milvus.</p>
<p>A configuração dos registos de acesso depende do método de instalação do Milvus:</p>
<ul>
<li><strong>Instalação do Helm</strong>: Configurar em <code translate="no">values.yaml</code>. Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/configure-helm.md">Configurar o Milvus com gráficos do Helm</a>.</li>
<li><strong>Instalação do Docker</strong>: Configurar em <code translate="no">milvus.yaml</code>. Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/configure-docker.md">Configurar o Milvus com o Docker Compose</a>.</li>
<li><strong>Instalação do operador</strong>: Modificar <code translate="no">spec.components</code> no ficheiro de configuração. Para obter mais informações, consulte <a href="/docs/pt/v2.4.x/configure_operator.md">Configurar o Milvus com o Milvus Operator</a>.</li>
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
    </button></h2><p>Escolha entre três opções de configuração com base nas suas necessidades:</p>
<ul>
<li><strong>Configuração básica</strong>: Para fins gerais.</li>
<li><strong>Configuração para ficheiros de registo de acesso local</strong>: Para armazenar os registos localmente.</li>
<li><strong>Configuração para carregar os registos de acesso local para o MinIO</strong>: Para armazenamento e backup na nuvem.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">Configuração de base</h3><p>A configuração básica envolve a ativação dos registos de acesso e a definição do nome do ficheiro de registo ou a utilização de stdout.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is emtpy, logs will be printed to stdout.</span>
    filename: <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: Se deve ativar a funcionalidade de registo de acesso. A predefinição é <strong>falso</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: O nome do ficheiro de registo de acesso. Se deixar este parâmetro vazio, os registos de acesso serão impressos no stdout.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">Configuração para ficheiros de registo de acesso local</h3><p>Configurar o armazenamento local para ficheiros de registo de acesso com parâmetros que incluem o caminho do ficheiro local, o tamanho do ficheiro e o intervalo de rotação:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    enable: true
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span> <span class="hljs-comment"># Name of the access log file</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span> <span class="hljs-comment"># Local file path where the access log file is stored</span>
    maxSize: <span class="hljs-number">500</span> <span class="hljs-comment"># Max size for each single access log file. Unit: MB</span>
    rotatedTime: <span class="hljs-number">24</span> <span class="hljs-comment"># Time interval for log rotation. Unit: seconds</span>
    maxBackups: <span class="hljs-number">7</span> <span class="hljs-comment"># Max number of sealed access log files that can be retained</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Estes parâmetros são especificados quando <code translate="no">filename</code> não está vazio.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: O caminho do ficheiro local onde o ficheiro de registo de acesso é armazenado.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: O tamanho máximo em MB permitido para um único ficheiro de registo de acesso. Se o tamanho do ficheiro de registo atingir este limite, será desencadeado um processo de rotação. Este processo sela o ficheiro de registo de acesso atual, cria um novo ficheiro de registo e limpa o conteúdo do ficheiro de registo original.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: O intervalo de tempo máximo em segundos permitido para rodar um único ficheiro de registo de acesso. Ao atingir o intervalo de tempo especificado, é desencadeado um processo de rotação, resultando na criação de um novo ficheiro de registo de acesso e na selagem do anterior.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: O número máximo de ficheiros de registo de acesso selados que podem ser retidos. Se o número de ficheiros de registo de acesso selados exceder este limite, o mais antigo será apagado.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">Configuração para carregar ficheiros de registo de acesso local para o MinIO</h3><p>Ativar e configurar definições para carregar ficheiros de registo de acesso local para o MinIO:</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    maxSize: 500
    rotatedTime: 24 
    maxBackups: 7
    minioEnable: <span class="hljs-literal">true</span>
    remotePath: <span class="hljs-string">&quot;/milvus/logs/access_logs&quot;</span>
    remoteMaxTime: 0
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<p>Ao configurar os parâmetros do MinIO, certifique-se de que definiu <code translate="no">maxSize</code> ou <code translate="no">rotatedTime</code>. Se não o fizer, pode resultar em carregamentos mal sucedidos de ficheiros de registo de acesso local para o MinIO.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: Se deve carregar ficheiros de registo de acesso local para o MinIO. O padrão é <strong>falso</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: O caminho do armazenamento de objectos para carregar ficheiros de registo de acesso.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: O intervalo de tempo permitido para carregar ficheiros de registo de acesso. Se o tempo de carregamento de um ficheiro de registo exceder este intervalo, o ficheiro será eliminado. Definir o valor para 0 desactiva esta funcionalidade.</li>
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
    </button></h2><p>O formato de registo predefinido utilizado para todos os métodos é o formato <code translate="no">base</code>, que não requer associações de métodos específicas. No entanto, se pretender personalizar a saída de registo para métodos específicos, pode definir um formato de registo personalizado e aplicá-lo aos métodos associados.</p>
<pre><code translate="no" class="language-yaml">proxy:
  accessLog:
    <span class="hljs-built_in">enable</span>: <span class="hljs-literal">true</span>
    filename: <span class="hljs-string">&quot;access_log.txt&quot;</span>
    localPath: <span class="hljs-string">&quot;/var/logs/milvus&quot;</span>
    <span class="hljs-comment"># Define custom formatters for access logs with format and applicable methods</span>
    formatters:
      <span class="hljs-comment"># The `base` formatter applies to all methods by default</span>
      <span class="hljs-comment"># The `base` formatter does not require specific method association</span>
      base: 
        <span class="hljs-comment"># Format string; an empty string means no log output</span>
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_name</span>-<span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$error_code</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>]&quot;</span>
      <span class="hljs-comment"># Custom formatter for specific methods (e.g., Query, Search)</span>
      query: 
        format: <span class="hljs-string">&quot;[<span class="hljs-variable">$time_now</span>] [ACCESS] &lt;<span class="hljs-variable">$user_name</span>: <span class="hljs-variable">$user_addr</span>&gt; <span class="hljs-variable">$method_status</span>-<span class="hljs-variable">$method_name</span> [traceID: <span class="hljs-variable">$trace_id</span>] [timeCost: <span class="hljs-variable">$time_cost</span>] [database: <span class="hljs-variable">$database_name</span>] [collection: <span class="hljs-variable">$collection_name</span>] [partitions: <span class="hljs-variable">$partition_name</span>] [expr: <span class="hljs-variable">$method_expr</span>]&quot;</span>
        <span class="hljs-comment"># Specify the methods to which this custom formatter applies</span>
        methods: [<span class="hljs-string">&quot;Query&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.format</code>: Define o formato de registo com métricas dinâmicas. Para obter mais informações, consulte <a href="#reference-supported-metrics">Métricas suportadas</a>.</li>
<li><code translate="no">proxy.accessLog.&lt;formatter_name&gt;.methods</code>: Lista as operações do Milvus que utilizam este formatador. Para obter os nomes dos métodos, consulte <strong>MilvusService</strong> em <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Métodos Milvus</a>.</li>
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
<tr><th>Métrica Nome</th><th>Descrição</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>Nome do método</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>Estado do acesso: <strong>OK</strong> ou <strong>Falha</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>Expressão utilizada para operações de consulta, pesquisa ou eliminação</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>TraceID associado ao acesso</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>Endereço IP do utilizador</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>Nome do utilizador</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>Tamanho dos dados de resposta</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Código de erro específico do Milvus</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>Mensagem de erro pormenorizada</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>Nome da base de dados Milvus de destino</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>Nome da coleção Milvus de destino</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>Nome ou nomes da(s) partição(ões) Milvus de destino</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>Tempo necessário para completar o acesso</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>Hora em que o registo de acesso é impresso (geralmente equivalente a <code translate="no">$time_end</code>)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>Hora de início do acesso</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>Hora em que o acesso termina</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>Versão do Milvus SDK utilizada pelo utilizador</td></tr>
</tbody>
</table>
