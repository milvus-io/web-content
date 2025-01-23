---
id: kafka-connect-milvus.md
summary: >-
  Apache Kafka는 Milvus 및 Zilliz Cloud와 통합되어 벡터 데이터를 스트리밍합니다. 의미론적 검색, 추천 시스템, AI
  기반 분석을 위한 실시간 파이프라인을 구축하기 위해 Kafka-Milvus 커넥터를 사용하는 방법을 알아보세요.
title: 실시간 벡터 데이터 수집을 위해 Apache Kafka®와 Milvus/Zilliz Cloud 연결하기
---
<h1 id="Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="common-anchor-header">실시간 벡터 데이터 수집을 위해 Apache Kafka®와 Milvus/Zilliz Cloud 연결하기<button data-href="#Connect-Apache-Kafka®-with-MilvusZilliz-Cloud-for-Real-Time-Vector-Data-Ingestion" class="anchor-icon" translate="no">
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
    </button></h1><p>이 빠른 시작 가이드에서는 벡터 데이터를 수집하기 위해 오픈 소스 kafka와 Zilliz Cloud를 설정하는 방법을 보여드립니다.</p>
<p>이 튜토리얼에서는 Apache Kafka®를 사용하여 Milvus 벡터 데이터베이스와 Zilliz Cloud(완전 관리형 Milvus)로 벡터 데이터를 스트리밍하고 수집하여 시맨틱 검색, 추천 시스템, AI 기반 분석과 같은 고급 실시간 애플리케이션을 구현하는 방법을 설명합니다.</p>
<p>Apache Kafka는 처리량이 많고 지연 시간이 짧은 파이프라인을 위해 설계된 분산 이벤트 스트리밍 플랫폼입니다. 데이터베이스, IoT 장치, 모바일 앱, 클라우드 서비스와 같은 소스에서 실시간 데이터 스트림을 수집, 저장, 처리하는 데 널리 사용됩니다. 대용량 데이터를 처리할 수 있는 Kafka의 능력은 Milvus나 Zilliz Cloud와 같은 벡터 데이터베이스의 중요한 데이터 소스입니다.</p>
<p>예를 들어, Kafka는 사용자 상호 작용, 센서 판독값과 같은 실시간 데이터 스트림을 머신 러닝 모델에서 임베딩과 함께 캡처하고 이러한 스트림을 Milvus 또는 Zilliz Cloud에 직접 게시할 수 있습니다. 벡터 데이터베이스에 저장된 데이터는 효율적으로 색인, 검색, 분석할 수 있습니다.</p>
<p>Kafka와 Milvus 및 Zilliz Cloud의 통합은 비정형 데이터 워크플로우를 위한 강력한 파이프라인을 원활하게 구축할 수 있는 방법을 제공합니다. 이 커넥터는 오픈 소스 Kafka 배포와 <a href="https://www.confluent.io/hub/zilliz/kafka-connect-milvus">Confluent</a> 및 <a href="https://docs.streamnative.io/hub/connector-kafka-connect-milvus-sink-v0.1">StreamNative와</a> 같은 호스팅 서비스 모두에서 작동합니다.</p>
<p>이 튜토리얼에서는 Zilliz Cloud를 데모로 사용합니다:</p>
<h2 id="Step-1-Download-the-kafka-connect-milvus-plugin" class="common-anchor-header">1단계: kafka-connect-milvus 플러그인 다운로드하기<button data-href="#Step-1-Download-the-kafka-connect-milvus-plugin" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 단계를 완료하여 kafka-connect-milvus 플러그인을 다운로드하세요.</p>
<ol>
<li><a href="https://github.com/zilliztech/kafka-connect-milvus/releases">여기에서</a> 최신 플러그인 zip 파일( <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> )을 다운로드하세요.</li>
</ol>
<h2 id="Step-2-Download-Kafka" class="common-anchor-header">2단계: Kafka 다운로드<button data-href="#Step-2-Download-Kafka" class="anchor-icon" translate="no">
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
<li><a href="https://kafka.apache.org/downloads">여기에서</a> 최신 kafka를 다운로드합니다.</li>
<li>다운로드한 파일의 압축을 풀고 kafka 디렉토리로 이동합니다.</li>
</ol>
<pre><code translate="no" class="language-shell">$ tar -xzf kafka_2.13-3.6.1.tgz
$ <span class="hljs-built_in">cd</span> kafka_2.13-3.6.1
<button class="copy-code-btn"></button></code></pre>
<h2 id="STEP-3-Start-the-Kafka-Environment" class="common-anchor-header">3단계: Kafka 환경 시작하기<button data-href="#STEP-3-Start-the-Kafka-Environment" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>참고: 로컬 환경에 Java 8 이상이 설치되어 있어야 합니다.</p>
</div>
<p>모든 서비스를 올바른 순서로 시작하려면 다음 명령을 실행하세요:</p>
<ol>
<li><p>ZooKeeper 서비스 시작</p>
<pre><code translate="no" class="language-shell">$ bin/zookeeper-server-start.sh config/zookeeper.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafka 브로커 서비스 시작</p>
<p>다른 터미널 세션을 열고 실행합니다:</p>
<pre><code translate="no" class="language-shell">$ bin/kafka-server-start.sh config/server.properties
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>모든 서비스가 성공적으로 시작되면 기본 Kafka 환경이 실행되고 사용할 준비가 된 것입니다.</p>
<ul>
<li>자세한 내용은 공식 빠른 시작 가이드 양식 Kafka를 확인하세요: https://kafka.apache.org/quickstart</li>
</ul>
<h2 id="Step-4-Configure-Kafka-and-Zilliz-Cloud" class="common-anchor-header">4단계: Kafka 및 Zilliz Cloud 구성하기<button data-href="#Step-4-Configure-Kafka-and-Zilliz-Cloud" class="anchor-icon" translate="no">
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
    </button></h2><p>Kafka와 Zilliz Cloud가 설치되어 있고 올바르게 구성되었는지 확인합니다.</p>
<ol>
<li><p>Kafka에 아직 토픽이 없는 경우, Kafka에서 토픽(예: <code translate="no">topic_0</code>)을 만드세요.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">bin</span>/kafka-topics.sh --create --topic topic_0 --bootstrap-server localhost:<span class="hljs-number">9092</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>질리즈 클라우드에 아직 컬렉션이 없는 경우, 벡터 필드가 있는 컬렉션을 생성합니다(이 예제에서는 벡터가 <code translate="no">dimension=8</code>). 질리즈 클라우드에서 다음 예제 스키마를 사용할 수 있습니다:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/collection_schema.png" width="100%"  alt=""/></p>
<p><div class="alert note"></p>
<p>참고: 양쪽의 스키마가 서로 일치하는지 확인하세요. 스키마에는 정확히 하나의 벡터 필드가 있습니다. 양쪽의 각 필드 이름은 정확히 동일합니다.</p>
<p></div></p></li>
</ol>
<h2 id="Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="common-anchor-header">5단계: Kafka 인스턴스에 kafka-connect-milvus 플러그인 로드하기<button data-href="#Step-5-Load-the-kafka-connect-milvus-plugin-to-Kafka-Instance" class="anchor-icon" translate="no">
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
<li><p>1단계에서 다운로드한 <code translate="no">zilliz-kafka-connect-milvus-xxx.zip</code> 파일의 압축을 풉니다.</p></li>
<li><p><code translate="no">zilliz-kafka-connect-milvus</code> 디렉터리를 Kafka 설치의 <code translate="no">libs</code> 디렉터리에 복사합니다.</p></li>
<li><p>Kafka 설치의 <code translate="no">config</code> 디렉터리에 있는 <code translate="no">connect-standalone.properties</code> 파일을 수정합니다.</p>
<pre><code translate="no" class="language-properties">key.converter.schemas.enable=<span class="hljs-literal">false</span>
value.converter.schemas.enable=<span class="hljs-literal">false</span>
plugin.path=libs/zilliz-kafka-connect-milvus-xxx
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafka 설치의 <code translate="no">config</code> 디렉터리에 <code translate="no">milvus-sink-connector.properties</code> 파일을 생성하고 구성합니다.</p>
<pre><code translate="no" class="language-properties">name=zilliz-kafka-connect-milvus
connector.<span class="hljs-keyword">class</span>=com.milvus.io.kafka.MilvusSinkConnector
<span class="hljs-keyword">public</span>.endpoint=https:<span class="hljs-comment">//&lt;public.endpoint&gt;:port</span>
token=*****************************************
collection.name=topic_0
topics=topic_0
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Step-6-Launch-the-connector" class="common-anchor-header">6단계: 커넥터 시작<button data-href="#Step-6-Launch-the-connector" class="anchor-icon" translate="no">
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
<li><p>이전 구성 파일로 커넥터를 시작하세요.</p>
<pre><code translate="no" class="language-shell">$ bin/connect-standalone.sh config/connect-standalone.properties config/milvus-sink-connector.properties
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Kafka에서 방금 만든 Kafka 토픽에 메시지를 생성해 보세요.</p>
<pre><code translate="no" class="language-shell">bin/kafka-<span class="hljs-variable language_">console</span>-producer.<span class="hljs-property">sh</span> --topic topic_0 --bootstrap-server <span class="hljs-attr">localhost</span>:<span class="hljs-number">9092</span>                        
&gt;{<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;The Reported Mortality Rate of Coronavirus Is Not Important&quot;</span>, <span class="hljs-string">&quot;title_vector&quot;</span>: [<span class="hljs-number">0.041732933</span>, <span class="hljs-number">0.013779674</span>, -<span class="hljs-number">0.027564144</span>, -<span class="hljs-number">0.013061441</span>, <span class="hljs-number">0.009748648</span>, <span class="hljs-number">0.00082446384</span>, -<span class="hljs-number">0.00071647146</span>, <span class="hljs-number">0.048612226</span>], <span class="hljs-string">&quot;link&quot;</span>: <span class="hljs-string">&quot;https://medium.com/swlh/the-reported-mortality-rate-of-coronavirus-is-not-important-369989c8d912&quot;</span>}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Zilliz Cloud의 컬렉션에 엔티티가 삽입되었는지 확인합니다. 삽입에 성공하면 Zilliz Cloud에서 다음과 같이 표시됩니다:</p>
<p><img translate="no" src="https://github.com/zilliztech/kafka-connect-milvus/raw/main/src/main/resources/images/insearted_entities.png" width="80%" /></p></li>
</ol>
<h3 id="Support" class="common-anchor-header">지원</h3><p>Kafka Connect Milvus 커넥터와 관련하여 도움이 필요하거나 궁금한 점이 있으면 언제든지 커넥터 관리자에게 문의하시기 바랍니다: <strong>이메일:</strong> <a href="mailto:support@zilliz.com">support@zilliz.com</a></p>
