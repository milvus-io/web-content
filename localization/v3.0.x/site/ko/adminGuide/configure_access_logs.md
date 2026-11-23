---
id: configure_access_logs.md
title: 액세스 로그 구성
---
<h1 id="Configure-Access-Logs" class="common-anchor-header">액세스 로그 구성<button data-href="#Configure-Access-Logs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus의 액세스 로그 기능을 통해 서버 관리자는 사용자 액세스 행동을 기록하고 분석하여 쿼리 성공률 및 실패 원인 등을 파악하는 데 도움을 받을 수 있습니다.</p>
<p>이 가이드에서는 Milvus에서 액세스 로그를 구성하는 방법에 대한 자세한 지침을 제공합니다.</p>
<p>액세스 로그 구성 방법은 Milvus의 설치 방식에 따라 다릅니다.</p>
<ul>
<li><strong>Helm 설치</strong>: <code translate="no">values.yaml</code> 에서 구성합니다. 자세한 내용은 <a href="/docs/ko/configure-helm.md">Helm 차트를 사용하여 Milvus 구성하기를</a> 참조하십시오.</li>
<li><strong>Docker 설치</strong>: <code translate="no">milvus.yaml</code> 에서 구성합니다. 자세한 내용은 <a href="/docs/ko/configure-docker.md">‘Docker Compose를 사용하여 Milvus 구성’을</a> 참조하십시오.</li>
<li><strong>Operator 설치</strong>: 구성 파일의 <code translate="no">spec.components</code> 을 수정하십시오. 자세한 내용은 <a href="/docs/ko/configure_operator.md">‘Milvus Operator를 사용하여 Milvus 구성’을</a> 참조하십시오.</li>
</ul>
<h2 id="Configuration-options" class="common-anchor-header">구성 옵션<button data-href="#Configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>필요에 따라 다음 세 가지 구성 옵션 중 하나를 선택하십시오:</p>
<ul>
<li><strong>기본 구성</strong>: 일반적인 용도로 사용합니다.</li>
<li><strong>로컬 액세스 로그 파일용 구성</strong>: 로그를 로컬에 저장할 때 사용합니다.</li>
<li><strong>로컬 액세스 로그를 MinIO에 업로드하기 위한 구성</strong>: 클라우드 스토리지 및 백업용입니다.</li>
</ul>
<h3 id="Base-config" class="common-anchor-header">기본 구성<button data-href="#Base-config" class="anchor-icon" translate="no">
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
    </button></h3><p>기본 구성에서는 액세스 로그를 활성화하고 로그 파일 이름을 지정하거나 stdout을 사용합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">accessLog:</span>
    <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
    <span class="hljs-comment"># If `filename` is empty, logs will be printed to stdout.</span>
    <span class="hljs-attr">filename:</span> <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-comment"># Additional formatter configurations...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">proxy.accessLog.enable</code>: 액세스 로그 기능을 활성화할지 여부입니다. 기본값은 <strong>false입니다</strong>.</li>
<li><code translate="no">proxy.accessLog.filename</code>: 액세스 로그 파일의 이름입니다. 이 매개변수를 비워두면 액세스 로그가 stdout으로 출력됩니다.</li>
</ul>
<h3 id="Config-for-local-access-log-files" class="common-anchor-header">로컬 액세스 로그 파일 구성<button data-href="#Config-for-local-access-log-files" class="anchor-icon" translate="no">
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
    </button></h3><p>로컬 파일 경로, 파일 크기, 회전 간격 등의 매개변수를 사용하여 액세스 로그 파일의 로컬 저장소를 구성합니다:</p>
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
<p><code translate="no">filename</code> 가 비어 있지 않을 때 이러한 매개변수가 지정됩니다.</p>
<ul>
<li><code translate="no">proxy.accessLog.localPath</code>: 액세스 로그 파일이 저장되는 로컬 파일 경로입니다. 기본값은 <code translate="no">/tmp/milvus_access</code> 입니다.</li>
<li><code translate="no">proxy.accessLog.maxSize</code>: 단일 액세스 로그 파일에 허용되는 최대 크기(MB 단위). 로그 파일 크기가 이 한도에 도달하면 회전 프로세스가 트리거됩니다. 이 프로세스는 현재 액세스 로그 파일을 봉인하고, 새 로그 파일을 생성하며, 원본 로그 파일의 내용을 지웁니다. 기본값은 <strong>64입니다</strong>.</li>
<li><code translate="no">proxy.accessLog.rotatedTime</code>: 단일 액세스 로그 파일을 회전시키는 데 허용되는 최대 시간 간격(초). 지정된 시간 간격에 도달하면 회전 프로세스가 트리거되어 새로운 액세스 로그 파일이 생성되고 이전 파일은 봉인됩니다. 기본값은 <strong>0입니다</strong>.</li>
<li><code translate="no">proxy.accessLog.maxBackups</code>: 보관할 수 있는 봉인된 액세스 로그 파일의 최대 개수입니다. 봉인된 액세스 로그 파일의 개수가 이 제한을 초과하면 가장 오래된 파일이 삭제됩니다. 기본값은 <strong>8입니다</strong>.</li>
</ul>
<h3 id="Config-for-uploading-local-access-log-files-to-MinIO" class="common-anchor-header">로컬 액세스 로그 파일을 MinIO에 업로드하기 위한 구성<button data-href="#Config-for-uploading-local-access-log-files-to-MinIO" class="anchor-icon" translate="no">
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
    </button></h3><p>로컬 액세스 로그 파일을 MinIO로 업로드하려면 다음 설정을 활성화하고 구성하십시오:</p>
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
<p>MinIO 매개변수를 구성할 때, <code translate="no">maxSize</code> 또는 <code translate="no">rotatedTime</code> 중 하나를 설정했는지 확인하십시오. 그렇지 않으면 로컬 액세스 로그 파일을 MinIO로 업로드하는 데 실패할 수 있습니다.</p>
<ul>
<li><code translate="no">proxy.accessLog.minioEnable</code>: 로컬 액세스 로그 파일을 MinIO로 업로드할지 여부입니다. 기본값은 <strong>false입니다</strong>.</li>
<li><code translate="no">proxy.accessLog.remotePath</code>: 액세스 로그 파일을 업로드할 오브젝트 스토리지의 경로입니다. 기본값은 <code translate="no">access_log/</code> 입니다.</li>
<li><code translate="no">proxy.accessLog.remoteMaxTime</code>: 액세스 로그 파일 업로드에 허용되는 시간 간격입니다. 로그 파일의 업로드 시간이 이 간격을 초과하면 파일이 삭제됩니다. 값을 0으로 설정하면 이 기능이 비활성화됩니다. 기본값은 <strong>0입니다</strong>.</li>
</ul>
<h2 id="Formatter-config" class="common-anchor-header">포맷터 구성<button data-href="#Formatter-config" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 메서드에 사용되는 기본 로그 형식은 <code translate="no">base</code> 형식이며, 이 형식은 특정 메서드와의 연결을 필요로 하지 않습니다. 그러나 특정 메서드에 대한 로그 출력을 사용자 정의하려면 사용자 정의 로그 형식을 정의하고 관련 메서드에 적용할 수 있습니다.</p>
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
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.format</code>: 동적 메트릭을 사용하는 로그 형식을 정의합니다. 자세한 내용은 <a href="#reference-supported-metrics">지원되는 메트릭을</a> 참조하십시오.</li>
<li><code translate="no">proxy.accessLog.formatters.&lt;formatter_name&gt;.methods</code>: 이 포맷터를 사용하는 Milvus 작업을 나열합니다. 메서드 이름을 확인하려면 <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">Milvus 메서드의</a> <strong>‘MilvusService’</strong> <a href="https://github.com/milvus-io/milvus-proto/blob/master/proto/milvus.proto">항목을</a> 참조하십시오.</li>
</ul>
<h2 id="Reference-Supported-metrics" class="common-anchor-header">참조: 지원되는 메트릭<button data-href="#Reference-Supported-metrics" class="anchor-icon" translate="no">
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
<tr><th>메트릭 이름</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">$method_name</code></td><td>메서드 이름</td></tr>
<tr><td><code translate="no">$method_status</code></td><td>액세스 상태: <strong>OK</strong> 또는 <strong>Fail</strong></td></tr>
<tr><td><code translate="no">$method_expr</code></td><td>쿼리, 검색 또는 삭제 작업에 사용되는 표현식</td></tr>
<tr><td><code translate="no">$trace_id</code></td><td>액세스와 연관된 TraceID</td></tr>
<tr><td><code translate="no">$user_addr</code></td><td>사용자의 IP 주소</td></tr>
<tr><td><code translate="no">$user_name</code></td><td>사용자 이름</td></tr>
<tr><td><code translate="no">$response_size</code></td><td>응답 데이터의 크기</td></tr>
<tr><td><code translate="no">$error_code</code></td><td>Milvus에 특정한 오류 코드</td></tr>
<tr><td><code translate="no">$error_msg</code></td><td>상세한 오류 메시지</td></tr>
<tr><td><code translate="no">$database_name</code></td><td>대상 Milvus 데이터베이스 이름</td></tr>
<tr><td><code translate="no">$collection_name</code></td><td>대상 Milvus 컬렉션 이름</td></tr>
<tr><td><code translate="no">$partition_name</code></td><td>대상 Milvus 파티션의 이름</td></tr>
<tr><td><code translate="no">$time_cost</code></td><td>액세스 완료까지 소요된 시간</td></tr>
<tr><td><code translate="no">$time_now</code></td><td>액세스 로그가 출력된 시간 (일반적으로 ` <code translate="no">$time_end</code>`와 동일함)</td></tr>
<tr><td><code translate="no">$time_start</code></td><td>액세스가 시작된 시간</td></tr>
<tr><td><code translate="no">$time_end</code></td><td>액세스가 종료된 시간</td></tr>
<tr><td><code translate="no">$sdk_version</code></td><td>사용자가 사용한 Milvus SDK 버전</td></tr>
<tr><td><code translate="no">$error_type</code></td><td>오류 유형: <strong>system_error</strong> 또는 <strong>input_error</strong></td></tr>
<tr><td><code translate="no">$output_fields</code></td><td>요청의 출력 필드</td></tr>
<tr><td><code translate="no">$cluster_prefix</code></td><td>설정된 클러스터 접두사 <code translate="no">msgChannel.chanNamePrefix.cluster</code></td></tr>
<tr><td><code translate="no">$consistency_level</code></td><td>요청의 일관성 수준</td></tr>
<tr><td><code translate="no">$anns_field</code></td><td>검색 또는 하이브리드 검색 요청의 벡터 필드</td></tr>
<tr><td><code translate="no">$nq</code></td><td>검색 또는 하이브리드 검색 요청의 쿼리 벡터 수</td></tr>
<tr><td><code translate="no">$search_params</code></td><td>검색 또는 하이브리드 검색 요청의 검색 매개변수</td></tr>
<tr><td><code translate="no">$query_params</code></td><td>쿼리 요청의 쿼리 매개변수</td></tr>
<tr><td><code translate="no">$client_request_time</code></td><td>클라이언트가 gRPC 메타데이터에 설정하는 요청 시간</td></tr>
<tr><td><code translate="no">$template_value_length</code></td><td>각 표현식 템플릿 값의 길이</td></tr>
<tr><td><code translate="no">$partial_update</code></td><td>업서트 요청이 부분 업데이트인지 여부</td></tr>
</tbody>
</table>
