---
id: integration_with_mindsdb.md
summary: >-
  이 튜토리얼에서는 Milvus와 MindsDB를 통합하는 방법을 보여드리며, 벡터 임베딩을 관리하고 쿼리하기 위한 SQL과 유사한 작업을
  통해 Milvus의 벡터 데이터베이스 기능과 함께 MindsDB의 AI 기능을 활용할 수 있도록 합니다.
title: Milvus와 MindsDB 통합
---
<h1 id="Integrate-Milvus-with-MindsDB" class="common-anchor-header">Milvus와 MindsDB 통합<button data-href="#Integrate-Milvus-with-MindsDB" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB는</a> AI 애플리케이션과 다양한 엔터프라이즈 데이터 소스를 통합하기 위한 강력한 도구입니다. 이는 정형 데이터와 비정형 데이터 모두에 대한 쿼리에 꼼꼼하게 답변하면서 데이터 확산에 질서를 부여하는 연합 쿼리 엔진의 역할을 합니다. 데이터가 SaaS 애플리케이션, 데이터베이스, 데이터 웨어하우스 등 어디에 흩어져 있든, MindsDB는 표준 SQL을 사용해 모든 데이터를 연결하고 쿼리할 수 있습니다. 지식 베이스를 통한 최첨단 자율 RAG 시스템이 특징이며, 수백 개의 데이터 소스를 지원하고, 로컬 개발부터 클라우드 환경까지 유연한 배포 옵션을 제공합니다.</p>
<p>이 튜토리얼에서는 Milvus와 MindsDB를 통합하는 방법을 보여줌으로써, 벡터 임베딩을 관리하고 쿼리하기 위한 SQL과 유사한 작업을 통해 Milvus의 벡터 데이터베이스 기능과 함께 MindsDB의 AI 기능을 활용할 수 있도록 합니다.</p>
<div class="alert note">
<p>이 튜토리얼은 주로 <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">MindsDB Milvus 핸들러의</a> 공식 문서를 참조합니다. 이 튜토리얼에서 오래된 부분을 발견하면 공식 문서를 우선적으로 따르고 이슈를 생성해 주세요.</p>
</div>
<h2 id="Install-MindsDB" class="common-anchor-header">MindsDB 설치<button data-href="#Install-MindsDB" class="anchor-icon" translate="no">
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
    </button></h2><p>시작하기 전에 <a href="https://docs.mindsdb.com/setup/self-hosted/docker">Docker</a> 또는 <a href="https://docs.mindsdb.com/setup/self-hosted/docker-desktop">Docker Desktop을</a> 통해 로컬에 MindsDB를 설치합니다.</p>
<p>계속 진행하기 전에 MindsDB와 Milvus의 기본 개념과 작동 방식을 확실히 이해했는지 확인하세요.</p>
<h2 id="Arguments-Introduction" class="common-anchor-header">인수 소개<button data-href="#Arguments-Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>연결을 설정하는 데 필요한 인수는 다음과 같습니다:</p>
<ul>
<li><code translate="no">uri</code>밀버스 데이터베이스의 경우, 로컬 ".db" 파일 또는 도커 또는 클라우드 서비스로 설정할 수 있는 uri</li>
<li><code translate="no">token</code>: uri 옵션에 따라 도커 또는 클라우드 서비스를 지원하는 토큰입니다.</li>
</ul>
<p>연결을 설정하기 위한 선택적 인수는 다음과 같습니다:</p>
<p><code translate="no">SELECT</code> 쿼리에 사용됩니다:</p>
<ul>
<li><code translate="no">search_default_limit</code>선택 문에서 전달할 기본 제한(기본값=100)</li>
<li><code translate="no">search_metric_type</code>: 검색에 사용되는 메트릭 유형(기본값=&quot;L2&quot;)</li>
<li><code translate="no">search_ignore_growing</code>유사성 검색 중 증가하는 세그먼트를 무시할지 여부(기본값=False)</li>
<li><code translate="no">search_params</code> <code translate="no">search_metric_type</code> (기본값={&quot;nprobe&quot;: 10})</li>
</ul>
<p><code translate="no">CREATE</code> 쿼리에 사용됩니다:</p>
<ul>
<li><code translate="no">create_auto_id</code>ID가 없는 레코드를 삽입할 때 ID 자동 생성 여부(기본값=False)</li>
<li><code translate="no">create_id_max_len</code>테이블 생성 시 ID 필드의 최대 길이(기본값=64)</li>
<li><code translate="no">create_embedding_dim</code>테이블 생성 시 임베딩 차원(기본값=8)</li>
<li><code translate="no">create_dynamic_field</code>생성된 테이블에 동적 필드 포함 여부(기본값=True)</li>
<li><code translate="no">create_content_max_len</code>콘텐츠 열의 최대 길이(기본값=200)</li>
<li><code translate="no">create_content_default_value</code>콘텐츠 열의 기본값(기본값='')</li>
<li><code translate="no">create_schema_description</code>생성된 스키마에 대한 설명(기본값='')</li>
<li><code translate="no">create_alias</code>: 생성된 스키마의 별칭(기본값='default')</li>
<li><code translate="no">create_index_params</code>: 임베딩 열에 생성된 인덱스의 매개변수 (기본값={})</li>
<li><code translate="no">create_index_metric_type</code>인덱스 생성에 사용된 메트릭(기본값='L2')</li>
<li><code translate="no">create_index_type</code>index: 인덱스 유형(기본값='AUTOINDEX')</li>
</ul>
<h2 id="Usage" class="common-anchor-header">사용법<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>계속하기 전에 <code translate="no">pymilvus</code> 버전이 이 <a href="https://github.com/mindsdb/mindsdb/blob/main/mindsdb/integrations/handlers/milvus_handler/requirements.txt">고정된 버전과</a> 동일한지 확인하세요. 버전 호환성에 문제가 있는 경우 pymilvus 버전을 롤백하거나 이 <a href="https://github.com/mindsdb/mindsdb/tree/main/mindsdb/integrations/handlers/milvus_handler">요구 사항 파일에서</a> 사용자 정의할 수 있습니다.</p>
<h3 id="Creating-connection" class="common-anchor-header">연결 만들기</h3><p>이 핸들러를 사용하여 MindsDB의 Milvus 서버에 연결하려면 다음 구문을 사용할 수 있습니다:</p>
<pre><code translate="no" class="language-sql">CREATE DATABASE milvus_datasource
<span class="hljs-type">WITH</span>
  <span class="hljs-variable">ENGINE</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;milvus&#x27;</span>,
  PARAMETERS = {
    <span class="hljs-string">&quot;uri&quot;</span>: <span class="hljs-string">&quot;./milvus_local.db&quot;</span>,
    <span class="hljs-string">&quot;token&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-string">&quot;create_embedding_dim&quot;</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">&quot;create_auto_id&quot;</span>: <span class="hljs-literal">true</span>
};
<button class="copy-code-btn"></button></code></pre>
<blockquote>
<ul>
<li>소규모 데이터 또는 프로토타이핑을 위해 로컬 벡터 데이터베이스만 필요한 경우, URL을 로컬 파일(예:<code translate="no">./milvus.db</code>)로 설정하는 것이 가장 편리한 방법이며, 이 파일에 모든 데이터를 저장하기 위해 <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite를</a> 자동으로 활용하기 때문입니다.</li>
<li>프로덕션 환경에서 대규모 데이터와 트래픽을 처리하려면 <a href="https://milvus.io/docs/install-overview.md">Docker 또는 Kubernetes에</a> Milvus 서버를 설정할 수 있습니다. 이 설정에서는 서버 주소와 포트를 <code translate="no">uri</code>(예:<code translate="no">http://localhost:19530</code>)로 사용하세요. Milvus에서 인증 기능을 활성화하는 경우 <code translate="no">token</code> 을 <code translate="no">&quot;&lt;your_username&gt;:&lt;your_password&gt;&quot;</code> 으로 설정하고, 그렇지 않으면 토큰을 설정할 필요가 없습니다.</li>
<li><a href="https://zilliz.com/cloud">질리즈 클라우드에서</a> 완전 관리형 Milvus를 사용할 수도 있습니다. <code translate="no">uri</code> 및 <code translate="no">token</code> 을 질리즈 클라우드 인스턴스의 <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#cluster-details">퍼블릭 엔드포인트와 API 키로</a> 설정하기만 하면 됩니다.</li>
</ul>
</blockquote>
<h3 id="Dropping-connection" class="common-anchor-header">연결 끊기</h3><p>연결을 삭제하려면 다음 명령을 사용합니다.</p>
<pre><code translate="no" class="language-sql">DROP DATABASE milvus_datasource;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Creating-tables" class="common-anchor-header">테이블 생성</h3><p>기존 테이블에서 데이터를 삽입하려면 다음을 사용합니다. <code translate="no">CREATE</code></p>
<pre><code translate="no" class="language-sql">CREATE TABLE milvus_datasource.test
(SELECT * FROM sqlitedb.test);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Dropping-collections" class="common-anchor-header">컬렉션 삭제</h3><p>컬렉션 삭제는 지원되지 않습니다.</p>
<h3 id="Querying-and-selecting" class="common-anchor-header">쿼리 및 선택</h3><p>검색 벡터를 사용하여 데이터베이스를 쿼리하려면 <code translate="no">WHERE</code> 절에 <code translate="no">search_vector</code> 을 사용할 수 있습니다.</p>
<p>주의:</p>
<ul>
<li><code translate="no">LIMIT</code> 을 생략하는 경우 Milvus에서 요구하므로 <code translate="no">search_default_limit</code> 이 사용됩니다.</li>
<li>메타데이터 열은 지원되지 않지만, 컬렉션에 동적 스키마가 활성화된 경우 아래 예시를 참고하여 일반 쿼리처럼 쿼리할 수 있습니다.</li>
<li>동적 필드는 표시할 수 없지만 쿼리는 가능합니다.</li>
</ul>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<span class="hljs-variable constant_">WHERE</span> search_vector = <span class="hljs-string">&#x27;[3.0, 1.0, 2.0, 4.5]&#x27;</span>
<span class="hljs-variable constant_">LIMIT</span> <span class="hljs-number">10</span>;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">search_vector</code> 를 생략하면 기본 검색이 되며 <code translate="no">LIMIT</code> 또는 <code translate="no">search_default_limit</code> 컬렉션의 항목 수가 반환됩니다.</p>
<pre><code translate="no" class="language-sql"><span class="hljs-variable constant_">SELECT</span> * <span class="hljs-keyword">from</span> milvus_datasource.<span class="hljs-property">test</span>
<button class="copy-code-btn"></button></code></pre>
<p>일반 SQL처럼 동적 필드에 <code translate="no">WHERE</code> 절을 사용할 수 있습니다.</p>
<pre><code translate="no" class="language-sql">SELECT * FROM milvus_datasource.createtest
<span class="hljs-type">WHERE</span> <span class="hljs-variable">category</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;science&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Deleting-records" class="common-anchor-header">레코드 삭제하기</h3><p>SQL에서와 마찬가지로 <code translate="no">DELETE</code> 을 사용하여 항목을 삭제할 수 있습니다.</p>
<p>주의:</p>
<ul>
<li>Milvus는 명확하게 지정된 기본 키가 있는 엔티티 삭제만 지원합니다.</li>
<li><code translate="no">IN</code> 연산자만 사용할 수 있습니다.</li>
</ul>
<pre><code translate="no" class="language-sql">DELETE FROM milvus_datasource.test
WHERE <span class="hljs-built_in">id</span> IN (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Inserting-records" class="common-anchor-header">레코드 삽입</h3><p>다음과 같이 개별 행을 삽입할 수도 있습니다:</p>
<pre><code translate="no" class="language-sql">INSERT INTO milvus_test.testable (<span class="hljs-built_in">id</span>,content,metadata,embeddings)
VALUES (<span class="hljs-string">&quot;id3&quot;</span>, <span class="hljs-string">&#x27;this is a test&#x27;</span>, <span class="hljs-string">&#x27;{&quot;test&quot;: &quot;test&quot;}&#x27;</span>, <span class="hljs-string">&#x27;[1.0, 8.0, 9.0]&#x27;</span>);
<button class="copy-code-btn"></button></code></pre>
<h3 id="Updating" class="common-anchor-header">업데이트</h3><p>Milvus API에서는 레코드 업데이트가 지원되지 않습니다. <code translate="no">DELETE</code> 와 <code translate="no">INSERT</code></p>
<hr>
<p>자세한 내용 및 예제는 <a href="https://docs.mindsdb.com/what-is-mindsdb">MindsDB 공식 문서를</a> 참조하세요.</p>
