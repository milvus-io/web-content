---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: Milvus의 시스템 구성에 대해 알아보세요.
title: ''
---
<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvus 시스템 구성 체크리스트<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus의 시스템 구성에 대한 일반적인 섹션을 소개합니다.</p>
<p>Milvus는 시스템을 구성하는 상당한 수의 파라미터를 관리합니다. 각 구성에는 직접 사용할 수 있는 기본값이 있습니다. 이러한 매개변수를 유연하게 수정하여 Milvus가 애플리케이션에 더 나은 서비스를 제공할 수 있도록 할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/configure-docker.md">Milvus 구성을</a> 참조하세요.</p>
<div class="alert note">
현재 릴리스에서는 모든 매개변수는 Milvus를 시작할 때 구성한 후에만 적용됩니다.</div>
<h2 id="Sections" class="common-anchor-header">섹션<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>유지 관리의 편의를 위해 Milvus는 구성 요소, 종속성 및 일반적인 사용법에 따라 구성을 %s 섹션으로 분류합니다.</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>Milvus 메타데이터 및 서비스 검색을 저장하는 데 사용되는 etcd의 관련 구성입니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_etcd.md">etcd 관련 구성을</a> 참조하세요.</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_metastore.md">메타스토어 관련 구성을</a> 참조하세요.</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>Milvus 메타데이터를 저장하는 데 사용되는 tikv 관련 구성.</p>
<p>메타스토어에 대해 TiKV를 사용하도록 설정한 경우에도 서비스 검색을 위해 etcd가 있어야 한다는 점에 유의하세요.</p>
<p>TiKV는 메타데이터 크기가 더 나은 수평적 확장성을 필요로 할 때 좋은 옵션입니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_tikv.md">tikv 관련 구성을</a> 참조하세요.</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_localstorage.md">로컬 스토리지 관련 구성을</a> 참조하세요.</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>MinIO/S3/GCS 또는 기타 서비스의 관련 설정은 Milvus의 데이터 지속성을 담당하는 S3 API를 지원합니다.</p>
<p>다음 설명에서는 간결성을 위해 스토리지 서비스를 MinIO/S3로 지칭합니다.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_minio.md">미니오 관련 구성을</a> 참조하세요.</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus는 락스엠큐(RockDB 기반), 낫스엠큐(임베디드 낫스 서버), 펄사, 카프카의 네 가지 MQ를 지원합니다.</p>
<p>mq.type 필드를 설정하여 mq를 변경할 수 있습니다.</p>
<p>mq.type 필드를 기본값으로 설정하지 않은 경우, 이 파일에 여러 개의 mq를 구성하는 경우 우선순위를 활성화하는 것에 대한 참고 사항이 있습니다.</p>
<ol>
<li><p>독립형(로컬) 모드: rocksmq(기본값) &gt; natsmq &gt; Pulsar &gt; Kafka.</p></li>
<li><p>클러스터 모드:  Pulsar(기본값) &gt; Kafka(클러스터 모드에서 rocksmq 및 natsmq는 지원되지 않음)</p></li>
</ol>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_mq.md">mq 관련 구성을</a> 참조하세요.</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>최근 돌연변이 작업의 Milvus 로그, 출력 스트리밍 로그를 관리하고 로그 게시-구독 서비스를 제공하는 데 사용되는 pulsar의 관련 구성입니다.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_pulsar.md">펄서 관련 구성을</a> 참조하세요.</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>kafka를 활성화하려면 다음과 같이 pulsar 구성에 주석 처리해야 합니다.</p>
<p>kafka:</p>
<p>브로커리스트:</p>
<p>sasl사용자 이름:</p>
<p>saslPassword:</p>
<p>saslMechanisms:</p>
<p>보안 프로토콜:</p>
<p>ssl:</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert:  # path to client's public key (PEM) used for authentication

tlsKey:  # path to client's private key (PEM) used for authentication

tlsCaCert:  # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword:  # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>
<p>readTimeout: 10</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_rocksmq.md">rocksmq 관련 구성을</a> 참조하세요.</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmq 구성.</p>
<p>자세한 내용: https://docs.nats.io/running-a-nats-service/configuration</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_natsmq.md">natsmq 관련 구성을</a> 참조하세요.</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>DDL(데이터 정의 언어) 및 DCL(데이터 제어 언어) 요청을 처리하는 데 사용되는 rootCoord 관련 구성</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_rootcoord.md">rootCoord 관련 구성을</a> 참조하세요.</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>클라이언트 요청의 유효성을 검사하고 반환되는 결과를 줄이는 데 사용되는 프록시 관련 구성입니다.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_proxy.md">프록시 관련 구성을</a> 참조하세요.</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>쿼리 노드의 토폴로지 및 로드 밸런싱을 관리하고 성장하는 세그먼트에서 봉인된 세그먼트로 핸드오프하는 데 사용되는 queryCoord의 관련 구성입니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_querycoord.md">queryCoord 관련 구성을</a> 참조하세요.</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>벡터 데이터와 스칼라 데이터 간의 하이브리드 검색을 실행하는 데 사용되는 쿼리 노드 관련 구성.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_querynode.md">쿼리 노드 관련 구성을</a> 참조하세요.</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_indexcoord.md">indexCoord 관련 구성을</a> 참조하세요.</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_indexnode.md">indexNode 관련 구성을</a> 참조하세요.</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_datacoord.md">데이터코드 관련 구성을</a> 참조하세요.</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_datanode.md">데이터 노드 관련 구성을</a> 참조하세요.</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>이 항목에서는 Milvus의 메시지 채널 관련 설정을 소개합니다.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 메시지 <a href="/docs/ko/v2.4.x/configure_msgchannel.md">채널 관련 설정을</a> 참조하세요.</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>시스템 로그 출력을 구성합니다.</p>
<p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_log.md">로그 관련 설정을</a> 참조하세요.</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_grpc.md">grpc 관련 구성을</a> 참조하세요.</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>프록시 tls 사용을 구성합니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_tls.md">tls 관련 구성을</a> 참조하세요.</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_common.md">공통 관련 구성을</a> 참조하세요.</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, Milvus 할당량 및 제한을 구성합니다.</p>
<p>기본적으로 활성화됩니다:</p>
<ol>
<li><p>TT 보호;</p></li>
<li><p>메모리 보호.</p></li>
<li><p>디스크 할당량 보호.</p></li>
</ol>
<p>활성화할 수 있습니다:</p>
<ol>
<li><p>DML 처리량 제한;</p></li>
<li><p>DDL, DQL qps/rps 제한;</p></li>
<li><p>DQL 대기열 길이/대기 시간 보호;</p></li>
<li><p>DQL 결과 속도 보호;</p></li>
</ol>
<p>필요한 경우 수동으로 RW 요청을 강제로 거부할 수도 있습니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_quotaandlimits.md">쿼터 및 제한 관련 구성을</a> 참조하세요.</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>이 섹션의 각 파라미터에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_trace.md">추적 관련 구성을</a> 참조하세요.</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#GPU 인덱싱을 사용할 때 Milvus는 잦은 메모리 할당 및 할당을 피하기 위해 메모리 풀을 사용합니다.</p>
<p>#여기에서 메모리 풀이 차지하는 메모리 크기를 설정할 수 있으며 단위는 MB입니다.</p>
<p>#실제 메모리 수요가 maxMemSize로 설정한 값을 초과하면 Milvus가 충돌할 가능성이 있다는 점에 유의하세요.</p>
<p>#initMemSize와 MaxMemSize가 모두 0으로 설정된 경우,</p>
<p>#밀버스는 사용 가능한 GPU 메모리의 절반을 자동으로 초기화합니다,</p>
<p>#maxMemSize는 사용 가능한 GPU 메모리 전체를 초기화합니다.</p>
<p>이 섹션의 각 매개변수에 대한 자세한 설명은 <a href="/docs/ko/v2.4.x/configure_gpu.md">GPU 관련 구성을</a> 참조하세요.</p>
