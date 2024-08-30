---
id: operational_faq.md
summary: Milvus 운영과 관련하여 자주 묻는 질문에 대한 답변을 찾아보세요.
title: 운영 FAQ
---
<h1 id="Operational-FAQ" class="common-anchor-header">운영 FAQ<button data-href="#Operational-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="What-if-I-failed-to-pull-the-Milvus-Docker-image-from-Docker-Hub" class="common-anchor-header">Docker Hub에서 Milvus Docker 이미지를 가져오는 데 실패하면 어떻게 하나요?</h4><p>Docker Hub에서 Milvus Docker 이미지를 가져오는 데 실패한 경우 다른 레지스트리 미러를 추가해 보세요.</p>
<p>중국 본토의 사용자는 <strong>/etc.docker/daemon.json의</strong> 레지스트리 미러 배열에 URL "https://registry.docker-cn.com"를 추가할 수 있습니다.</p>
<pre><code translate="no">{
  <span class="hljs-string">&quot;registry-mirrors&quot;</span>: [<span class="hljs-string">&quot;https://registry.docker-cn.com&quot;</span>]
}
<button class="copy-code-btn"></button></code></pre>
<h4 id="Is-Docker-the-only-way-to-install-and-run-Milvus" class="common-anchor-header">Milvus를 설치 및 실행하는 유일한 방법은 Docker인가요?</h4><p>Docker는 Milvus를 배포하는 효율적인 방법이지만 유일한 방법은 아닙니다. 소스 코드에서 Milvus를 배포할 수도 있습니다. 이를 위해서는 Ubuntu(18.04 이상) 또는 CentOS(7 이상)가 필요합니다. 자세한 내용은 <a href="https://github.com/milvus-io/milvus#build-milvus-from-source-code">소스 코드에서 Milvus 빌드하기를</a> 참조하세요.</p>
<h4 id="What-are-the-main-factors-affecting-recall" class="common-anchor-header">리콜에 영향을 미치는 주요 요인은 무엇인가요?</h4><p>리콜은 주로 인덱스 유형과 검색 매개변수에 의해 영향을 받습니다.</p>
<p>FLAT 인덱스의 경우, Milvus는 컬렉션 내에서 전수 스캔을 수행하며 100% 리턴합니다.</p>
<p>IVF 인덱스의 경우, nprobe 매개변수는 컬렉션 내에서 검색 범위를 결정합니다. nprobe를 늘리면 검색되는 벡터의 비율과 리콜이 증가하지만 쿼리 성능이 저하됩니다.</p>
<p>HNSW 인덱스의 경우, ef 매개변수는 그래프 검색의 폭을 결정합니다. ef를 높이면 그래프에서 검색되는 점의 수와 리콜이 증가하지만 쿼리 성능이 저하됩니다.</p>
<p>자세한 내용은 <a href="https://www.zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">벡터 인덱싱을</a> 참조하세요.</p>
<h4 id="Why-did-my-changes-to-the-configuration-files-not-take-effect" class="common-anchor-header">구성 파일에 대한 변경 사항이 적용되지 않는 이유는 무엇인가요?</h4><p>Milvus는 런타임 중에 구성 파일 수정을 지원하지 않습니다. 구성 파일 변경 사항을 적용하려면 Milvus Docker를 다시 시작해야 합니다.</p>
<h4 id="How-do-I-know-if-Milvus-has-started-successfully" class="common-anchor-header">Milvus가 성공적으로 시작되었는지 어떻게 알 수 있나요?</h4><p>Milvus가 Docker Compose를 사용하여 시작된 경우 <code translate="no">docker ps</code> 를 실행하여 실행 중인 Docker 컨테이너 수를 관찰하고 Milvus 서비스가 올바르게 시작되었는지 확인하세요.</p>
<p>Milvus 독립형의 경우, 실행 중인 Docker 컨테이너가 최소 3개(하나는 Milvus 서비스, 나머지 2개는 etcd 관리 및 스토리지 서비스)가 관찰되어야 합니다. 자세한 내용은 <a href="/docs/ko/install_standalone-docker.md">Milvus 독립형 설치하기를</a> 참조하세요.</p>
<h4 id="Why-is-the-time-in-the-log-files-different-from-the-system-time" class="common-anchor-header">로그 파일의 시간이 시스템 시간과 다른 이유는 무엇인가요?</h4><p>시간 차이는 일반적으로 호스트 시스템이 협정 세계시(UTC)를 사용하지 않기 때문입니다.</p>
<p>Docker 이미지 내의 로그 파일은 기본적으로 UTC를 사용합니다. 호스트 머신이 UTC를 사용하지 않는 경우 이 문제가 발생할 수 있습니다.</p>
<h4 id="How-do-I-know-if-my-CPU-supports-Milvus" class="common-anchor-header">내 CPU가 Milvus를 지원하는지 어떻게 알 수 있나요?</h4><p>Milvus의 컴퓨팅 작업은 CPU의 SIMD(단일 명령어, 다중 데이터) 확장 명령어 집합 지원 여부에 따라 달라집니다. Milvus 내에서 인덱스 구축과 벡터 유사성 검색을 위해서는 CPU의 SIMD 확장 명령어 세트 지원 여부가 중요합니다. 사용 중인 CPU가 다음 SIMD 명령어 세트 중 하나 이상을 지원하는지 확인하세요:</p>
<ul>
<li>SSE4.2</li>
<li>AVX</li>
<li>AVX2</li>
<li>AVX512</li>
</ul>
<p>lscpu 명령을 실행하여 CPU가 위에 언급된 SIMD 명령어 세트를 지원하는지 확인하세요:</p>
<pre><code translate="no">$ lscpu | grep -e sse4_2 -e avx -e avx2 -e avx512
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-does-Milvus-return-illegal-instruction-during-startup" class="common-anchor-header">Milvus가 시작 중에 <code translate="no">illegal instruction</code> 을 반환하는 이유는 무엇인가요?</h4><p>Milvus를 사용하려면 CPU가 SIMD 명령어 집합을 지원해야 합니다: SSE4.2, AVX, AVX2 또는 AVX512. CPU가 이 중 하나 이상을 지원해야 Milvus가 정상적으로 작동합니다. 시작 중에 <code translate="no">illegal instruction</code> 오류가 반환되면 CPU가 위의 네 가지 명령어 집합 중 어느 것도 지원하지 않는다는 뜻입니다.</p>
<p><a href="/docs/ko/prerequisite-docker.md">CPU의 SIMD 명령어 세트 지원을</a> 참조하세요.</p>
<h4 id="Can-I-install-Milvus-on-Windows" class="common-anchor-header">Windows에 Milvus를 설치할 수 있나요?</h4><p>예. 소스 코드 또는 바이너리 패키지에서 컴파일하여 Windows에 Milvus를 설치할 수 있습니다.</p>
<p>Windows에서 Milvus를 설치하는 방법을 알아보려면 <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">Windows에서</a> Milvus <a href="https://milvus.io/blog/2021-11-19-run-milvus-2.0-on-windows.md">실행하기를</a> 참조하세요.</p>
<h4 id="I-got-an-error-when-installing-pymilvus-on-Windows-What-shall-I-do" class="common-anchor-header">Windows에 pymilvus를 설치할 때 오류가 발생했습니다. 어떻게 해야 하나요?</h4><p>Windows에 PyMilvus를 설치하지 않는 것이 좋습니다. 그러나 Windows에 PyMilvus를 설치해야 하는데 오류가 발생하면 <a href="https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html">Conda</a> 환경에서 설치해 보세요. Conda 환경에서 PyMilvus를 설치하는 방법에 대한 자세한 내용은 <a href="/docs/ko/install-pymilvus.md">Milvus SDK 설치하기를</a> 참조하세요.</p>
<h4 id="Can-I-deploy-Milvus-when-disconnected-from-the-Internet" class="common-anchor-header">인터넷 연결이 끊긴 상태에서도 Milvus를 배포할 수 있나요?</h4><p>예. 오프라인 환경에서도 Milvus를 설치할 수 있습니다. 자세한 내용은 <a href="/docs/ko/install_offline-helm.md">Milvus 오프라인 설치를</a> 참조하세요.</p>
<h4 id="Where-can-I-find-the-logs-generated-by-Milvus" class="common-anchor-header">Milvus에서 생성된 로그는 어디에서 찾을 수 있나요?</h4><p>Milvus 로그는 기본적으로 stout(표준 출력) 및 stderr(표준 오류)로 인쇄되지만, 프로덕션 환경에서 로그를 영구 볼륨으로 리디렉션하는 것을 적극 권장합니다. 이렇게 하려면 <strong>milvus.yaml에서</strong> <code translate="no">log.file.rootPath</code> 을 업데이트하세요. 또한 <code translate="no">milvus-helm</code> 차트와 함께 Milvus를 배포하는 경우, <code translate="no">--set log.persistence.enabled=true</code> 을 통해 로그 지속성을 먼저 활성화해야 합니다.</p>
<p>구성을 변경하지 않은 경우, kubectl 로그 &lt;팟-네임&gt; 또는 docker 로그 CONTAINER를 사용하는 것도 로그를 찾는 데 도움이 될 수 있습니다.</p>
<h4 id="Can-I-create-index-for-a-segment-before-inserting-data-into-it" class="common-anchor-header">세그먼트에 데이터를 삽입하기 전에 세그먼트에 대한 인덱스를 생성할 수 있나요?</h4><p>예, 가능합니다. 하지만 각 세그먼트를 색인하기 전에 데이터를 일괄적으로 삽입하는 것이 좋으며, 각 데이터는 256MB를 넘지 않아야 합니다.</p>
<h4 id="Can-I-share-an-etcd-instance-among-multiple-Milvus-instances" class="common-anchor-header">여러 Milvus 인스턴스 간에 etcd 인스턴스를 공유할 수 있나요?</h4><p>예, 여러 Milvus 인스턴스 간에 etcd 인스턴스를 공유할 수 있습니다. 이렇게 하려면 시작하기 전에 각 Milvus 인스턴스의 구성 파일에서 <code translate="no">etcd.rootPath</code> 을 각 인스턴스마다 별도의 값으로 변경해야 합니다.</p>
<h4 id="Can-I-share-a-Pulsar-instance-among-multiple-Milvus-instances" class="common-anchor-header">여러 Milvus 인스턴스 간에 Pulsar 인스턴스를 공유할 수 있나요?</h4><p>예. 여러 Milvus 인스턴스 간에 Pulsar 인스턴스를 공유할 수 있습니다. 공유하려면 다음과 같이 하세요.</p>
<ul>
<li>Pulsar 인스턴스에서 멀티 테넌시가 활성화된 경우, 각 Milvus 인스턴스에 대해 별도의 테넌트 또는 네임스페이스를 할당하는 것을 고려하세요. 이렇게 하려면 시작하기 전에 Milvus 인스턴스의 구성 파일에서 <code translate="no">pulsar.tenant</code> 또는 <code translate="no">pulsar.namespace</code> 을 각각 고유한 값으로 변경해야 합니다.</li>
<li>Pulsar 인스턴스에서 멀티 테넌시를 활성화하지 않으려는 경우, 시작하기 전에 Milvus 인스턴스의 구성 파일에서 <code translate="no">msgChannel.chanNamePrefix.cluster</code> 을 각각 고유한 값으로 변경하는 것을 고려하세요.</li>
</ul>
<h4 id="Can-I-share-a-MinIO-instance-among-multiple-Milvus-instances" class="common-anchor-header">여러 Milvus 인스턴스 간에 MinIO 인스턴스를 공유할 수 있나요?</h4><p>예, 여러 Milvus 인스턴스 간에 MinIO 인스턴스를 공유할 수 있습니다. 이렇게 하려면 시작하기 전에 각 Milvus 인스턴스의 구성 파일에서 <code translate="no">minio.rootPath</code> 을 각 Milvus 인스턴스마다 고유한 값으로 변경해야 합니다.</p>
<h4 id="How-do-I-handle-the-error-message-pymilvusexceptionsConnectionConfigException-ConnectionConfigException-code1-messageIllegal-uri-exampledb-expected-form-httpsuserpwdexamplecom12345" class="common-anchor-header"><code translate="no">pymilvus.exceptions.ConnectionConfigException: &lt;ConnectionConfigException: (code=1, message=Illegal uri: [example.db], expected form 'https://user:pwd@example.com:12345')&gt;</code> 오류 메시지는 어떻게 처리하나요?</h4><p>오류 메시지 <code translate="no">Illegal uri [example.db]</code> 는 이 연결 유형을 지원하지 않는 이전 버전의 PyMilvus를 사용하여 Milvus Lite에 연결하려고 한다는 것을 나타냅니다. 이 문제를 해결하려면 PyMilvus 설치를 Milvus Lite 연결 지원이 포함된 버전 2.4.2 이상으로 업그레이드하세요.</p>
<p>다음 명령을 사용하여 PyMilvus를 업그레이드할 수 있습니다:</p>
<pre><code translate="no" class="language-shell">pip install pymilvus&gt;=2.4.2
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-am-I-getting-fewer-results-than-the-limit-I-set-in-my-searchquery" class="common-anchor-header">검색/쿼리에서 설정한 <code translate="no">limit</code> 보다 적은 수의 결과가 표시되는 이유는 무엇인가요?</h4><p>지정한 <code translate="no">limit</code> 보다 적은 수의 결과가 표시되는 데에는 몇 가지 이유가 있습니다:</p>
<ul>
<li><p><strong>제한된 데이터</strong>: 컬렉션에 요청한 제한을 충족할 만큼 충분한 엔티티가 없을 수 있습니다. 컬렉션의 총 엔티티 수가 한도보다 적으면 당연히 더 적은 수의 결과를 받게 됩니다.</p></li>
<li><p><strong>중복된 기본 키</strong>: Milvus는 검색 중에 중복된 기본 키를 발견하면 특정 엔티티에 우선순위를 둡니다. 이 동작은 검색 유형에 따라 달라집니다:</p></li>
<li><p><strong>쿼리(정확히 일치)</strong>: Milvus는 일치하는 PK가 있는 최신 엔티티를 선택합니다. ANN 검색: Milvus는 엔티티가 동일한 PK를 공유하더라도 유사성 점수가 가장 높은 엔티티를 선택합니다. 컬렉션에 중복된 기본 키가 많은 경우 이 우선 순위 지정으로 인해 제한보다 적은 수의 고유한 결과가 나올 수 있습니다.</p></li>
<li><p><strong>불충분한 일치</strong>: 검색 필터링 표현식이 너무 엄격하여 유사성 임계값을 충족하는 엔티티 수가 적을 수 있습니다. 검색에 설정된 조건이 너무 제한적이면 일치하는 엔티티가 충분하지 않아 예상보다 적은 수의 결과가 나옵니다.</p></li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">질문이 더 있으신가요?</h4><p>질문이 있으신가요?</p>
<ul>
<li>GitHub에서 <a href="https://github.com/milvus-io/milvus/issues">Milvus를</a> 확인하세요. 자유롭게 질문하고, 아이디어를 공유하고, 다른 사람들을 도와주세요.</li>
<li><a href="https://discuss.milvus.io/">Milvus 포럼</a> 또는 <a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack 채널에</a> 가입하여 지원을 찾고 오픈 소스 커뮤니티에 참여하세요.</li>
</ul>
