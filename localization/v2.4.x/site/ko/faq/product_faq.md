---
id: product_faq.md
summary: 세계에서 가장 진보된 벡터 데이터베이스에 대해 자주 묻는 질문에 대한 답변을 찾아보세요.
title: 제품 FAQ
---
<h1 id="Product-FAQ" class="common-anchor-header">제품 FAQ<button data-href="#Product-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-much-does-Milvus-cost" class="common-anchor-header">Milvus의 가격은 얼마인가요?</h4><p>Milvus는 100% 무료 오픈소스 프로젝트입니다.</p>
<p>제작 또는 배포 목적으로 Milvus를 사용할 때는 <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 라이선스 2.0을</a> 준수하시기 바랍니다.</p>
<p>Milvus의 개발사인 Zilliz는 자체 분산 인스턴스를 구축 및 유지 관리하고 싶지 않은 사용자를 위해 완전 관리형 클라우드 버전의 플랫폼도 제공합니다. <a href="https://zilliz.com/cloud">Zilliz Cloud는</a> 자동으로 데이터 안정성을 유지하며 사용자가 사용한 만큼만 비용을 지불할 수 있습니다.</p>
<h4 id="Does-Milvus-support-non-x86-architectures" class="common-anchor-header">Milvus는 비 x86 아키텍처를 지원하나요?</h4><p>Milvus는 x86이 아닌 플랫폼에서는 설치하거나 실행할 수 없습니다.</p>
<p>Milvus를 실행하려면 CPU가 다음 명령어 세트 중 하나를 지원해야 합니다: SSE4.2, AVX, AVX2, AVX512. 이들은 모두 x86 전용 SIMD 명령어 세트입니다.</p>
<h4 id="Where-does-Milvus-store-data" class="common-anchor-header">Milvus는 데이터를 어디에 저장하나요?</h4><p>Milvus는 삽입된 데이터와 메타데이터라는 두 가지 유형의 데이터를 처리합니다.</p>
<p>벡터 데이터, 스칼라 데이터, 컬렉션별 스키마 등 삽입된 데이터는 증분 로그 형태로 영구 저장소에 저장됩니다. Milvus는 <a href="https://min.io/">MinIO</a>, <a href="https://aws.amazon.com/s3/?nc1=h_ls">AWS S3</a>, <a href="https://cloud.google.com/storage?hl=en#object-storage-for-companies-of-all-sizes">구글 클라우드 스토리지</a> (GCS), 애저 <a href="https://azure.microsoft.com/en-us/products/storage/blobs">블롭 스토리지</a>, <a href="https://www.alibabacloud.com/product/object-storage-service">알리바바 클라우드 OSS</a>, <a href="https://www.tencentcloud.com/products/cos">텐센트 클라우드 오브젝트 스토리지</a> (COS) 등 여러 오브젝트 스토리지 백엔드를 지원합니다.</p>
<p>메타데이터는 Milvus 내에서 생성됩니다. 각 Milvus 모듈에는 etcd에 저장되는 자체 메타데이터가 있습니다.</p>
<h4 id="Why-is-there-no-vector-data-in-etcd" class="common-anchor-header">etcd에 벡터 데이터가 없는 이유는 무엇인가요?</h4><p>etcd는 Milvus 모듈 메타데이터를 저장하고, MinIO는 엔티티를 저장합니다.</p>
<h4 id="Does-Milvus-support-inserting-and-searching-data-simultaneously" class="common-anchor-header">Milvus는 데이터 삽입과 검색을 동시에 지원하나요?</h4><p>예. 삽입 작업과 쿼리 작업은 상호 독립적인 두 개의 개별 모듈에서 처리됩니다. 클라이언트 관점에서 삽입 작업은 삽입된 데이터가 메시지 큐에 들어가면 완료됩니다. 그러나 삽입된 데이터는 쿼리 노드에 로드될 때까지 검색할 수 없습니다. 세그먼트 크기가 인덱스 구축 임계값(기본값 512MB)에 도달하지 않으면 Milvus는 무차별 대입 검색을 사용하며 쿼리 성능이 저하될 수 있습니다.</p>
<h4 id="Can-vectors-with-duplicate-primary-keys-be-inserted-into-Milvus" class="common-anchor-header">기본 키가 중복된 벡터를 Milvus에 삽입할 수 있나요?</h4><p>예. Milvus는 벡터 기본 키가 중복되는지 여부를 확인하지 않습니다.</p>
<h4 id="When-vectors-with-duplicate-primary-keys-are-inserted-does-Milvus-treat-it-as-an-update-operation" class="common-anchor-header">기본 키가 중복된 벡터가 삽입되면 Milvus는 이를 업데이트 작업으로 처리하나요?</h4><p>아니요. Milvus는 현재 업데이트 작업을 지원하지 않으며 엔티티 기본 키가 중복되는지 확인하지 않습니다. 엔티티 기본 키가 고유한지 확인할 책임은 사용자에게 있으며, 그렇지 않은 경우 Milvus에 기본 키가 중복된 엔티티가 여러 개 포함될 수 있습니다.</p>
<p>이 경우 쿼리 시 어떤 데이터 사본이 반환될지는 알 수 없습니다. 이 제한은 향후 릴리스에서 수정될 예정입니다.</p>
<h4 id="What-is-the-maximum-length-of-self-defined-entity-primary-keys" class="common-anchor-header">자체 정의된 엔티티 기본 키의 최대 길이는 어떻게 되나요?</h4><p>엔티티 기본 키는 음수가 아닌 64비트 정수여야 합니다.</p>
<h4 id="What-is-the-maximum-amount-of-data-that-can-be-added-per-insert-operation" class="common-anchor-header">삽입 작업당 추가할 수 있는 최대 데이터 양은 얼마입니까?</h4><p>삽입 작업의 크기는 1,024MB를 초과하지 않아야 합니다. 이것은 gRPC에 의해 부과된 제한입니다.</p>
<h4 id="Does-collection-size-impact-query-performance-when-searching-in-a-specific-partition" class="common-anchor-header">특정 파티션에서 검색할 때 수집 크기가 쿼리 성능에 영향을 주나요?</h4><p>아니요. 검색할 파티션을 지정하면 Milvus는 지정된 파티션만 검색합니다.</p>
<h4 id="Does-Milvus-need-to-load-the-entire-collection-when-partitions-are-specified-for-a-search" class="common-anchor-header">검색을 위해 파티션을 지정할 때 Milvus는 전체 컬렉션을 로드해야 하나요?</h4><p>검색에 필요한 데이터에 따라 다릅니다. 검색 결과에 표시될 가능성이 있는 모든 파티션은 검색 전에 로드해야 합니다.</p>
<ul>
<li>예를 들어 특정 파티션만 검색하려는 경우 모든 파티션을 로드할 필요는 없습니다. <code translate="no">load_partition()</code> 을 호출하여 원하는 파티션을 로드한 <em>다음</em> <code translate="no">search()</code> 메서드 호출에서 파티션을 지정합니다.</li>
<li>모든 파티션을 검색하려면 <code translate="no">load_collection()</code> 을 호출하여 모든 파티션을 포함한 전체 컬렉션을 로드합니다.</li>
<li>검색하기 전에 컬렉션 또는 특정 파티션을 로드하지 못하면 Milvus는 오류를 반환합니다.</li>
</ul>
<h4 id="Can-indexes-be-created-after-inserting-vectors" class="common-anchor-header">벡터를 삽입한 후 인덱스를 생성할 수 있나요?</h4><p>예. 이전에 <code translate="no">create_index()</code> 에 의해 컬렉션에 대한 인덱스가 생성된 경우, Milvus는 이후에 삽입된 벡터에 대한 인덱스를 자동으로 생성합니다. 그러나 새로 삽입된 벡터가 전체 세그먼트를 채우고 새로 생성된 인덱스 파일이 이전 인덱스 파일과 분리될 때까지 Milvus는 인덱스를 생성하지 않습니다.</p>
<h4 id="How-are-the-FLAT-and-IVFFLAT-indexes-different" class="common-anchor-header">FLAT 인덱스와 IVF_FLAT 인덱스는 어떻게 다른가요?</h4><p>IVF_FLAT 인덱스는 벡터 공간을 목록 클러스터로 나눕니다. 기본 목록 값인 16,384에서 Milvus는 대상 벡터와 모든 16,384개 클러스터의 중심점 사이의 거리를 비교하여 가장 가까운 프로브 클러스터를 반환합니다. 그런 다음 Milvus는 대상 벡터와 선택한 클러스터의 벡터 사이의 거리를 비교하여 가장 가까운 벡터를 얻습니다. IVF_FLAT과 달리 FLAT은 대상 벡터와 다른 모든 벡터 사이의 거리를 직접 비교합니다.</p>
<p>벡터의 총 수가 대략 nlist와 같을 때 계산 요구 사항과 검색 성능 측면에서 IVF_FLAT과 FLAT 사이에는 거의 차이가 없습니다. 그러나 벡터의 수가 nlist를 두 배 이상 초과하면 IVF_FLAT이 성능 우위를 보이기 시작합니다.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.4.x/index.md">벡터 인덱스를</a> 참조하세요.</p>
<h4 id="How-does-Milvus-flush-data" class="common-anchor-header">Milvus는 데이터를 어떻게 플러시하나요?</h4><p>Milvus는 삽입된 데이터가 메시지 큐에 수집되면 성공을 반환합니다. 그러나 데이터는 아직 디스크에 플러시되지 않습니다. 그러면 Milvus의 데이터 노드는 메시지 큐에 있는 데이터를 증분 로그로서 영구 저장소에 기록합니다. <code translate="no">flush()</code> 이 호출되면 데이터 노드는 메시지 큐의 모든 데이터를 즉시 영구 저장소에 강제로 씁니다.</p>
<h4 id="What-is-normalization-Why-is-normalization-needed" class="common-anchor-header">정규화란 무엇인가요? 정규화가 필요한 이유는 무엇인가요?</h4><p>정규화는 벡터의 규범이 1이 되도록 벡터를 변환하는 과정을 말합니다. 벡터 유사성을 계산하기 위해 내적 곱을 사용하는 경우 벡터를 정규화해야 합니다. 정규화 후 내적 곱은 코사인 유사도와 같습니다.</p>
<p>자세한 내용은 <a href="https://en.wikipedia.org/wiki/Unit_vector">위키백과를</a> 참조하세요.</p>
<h4 id="Why-do-Euclidean-distance-L2-and-inner-product-IP-return-different-results" class="common-anchor-header">유클리드 거리(L2)와 내적 곱(IP)이 서로 다른 결과를 반환하는 이유는 무엇인가요?</h4><p>정규화된 벡터의 경우, 유클리드 거리(L2)는 수학적으로 내적 곱(IP)과 동일합니다. 이러한 유사성 메트릭이 서로 다른 결과를 반환하는 경우 벡터가 정규화되었는지 확인하세요.</p>
<h4 id="Is-there-a-limit-to-the-total-number-of-collections-and-partitions-in-Milvus" class="common-anchor-header">Milvus에서 컬렉션과 파티션의 총 개수에 제한이 있나요?</h4><p>예. Milvus 인스턴스에서 최대 65,535개의 컬렉션을 생성할 수 있습니다. 기존 컬렉션의 수를 계산할 때 Milvus는 샤드 및 파티션이 포함된 모든 컬렉션을 계산합니다.</p>
<p>예를 들어, 이미 100개의 컬렉션을 만들었고 그 중 60개 컬렉션에 2개의 샤드와 4개의 파티션이 있고 나머지 40개 컬렉션에 1개의 샤드와 12개의 파티션이 있다고 가정해 보겠습니다. 현재 컬렉션 수는 다음과 같이 계산할 수 있습니다:</p>
<pre><code translate="no">60 * 2 * 4 + 40 * 1 * 12 = 960
<button class="copy-code-btn"></button></code></pre>
<h4 id="Why-do-I-get-fewer-than-k-vectors-when-searching-for-topk-vectors" class="common-anchor-header"><code translate="no">topk</code> 벡터를 검색할 때 왜 k보다 적은 수의 벡터가 표시되나요?</h4><p>Milvus가 지원하는 인덱스 중 IVF_FLAT과 IVF_SQ8은 k-평균 클러스터링 방식을 구현합니다. 데이터 공간을 <code translate="no">nlist</code> 클러스터로 나누고 삽입된 벡터를 이 클러스터에 분산시킵니다. 그런 다음 Milvus는 <code translate="no">nprobe</code> 가장 가까운 클러스터를 선택하고 대상 벡터와 선택한 클러스터의 모든 벡터 사이의 거리를 비교하여 최종 결과를 반환합니다.</p>
<p><code translate="no">nlist</code> 과 <code translate="no">topk</code> 이 크고 nprobe 가 작은 경우 nprobe 클러스터의 벡터 수가 <code translate="no">k</code> 보다 적을 수 있습니다. 따라서 <code translate="no">topk</code> 가장 가까운 벡터를 검색하면 반환되는 벡터 수가 <code translate="no">k</code> 보다 적을 수 있습니다.</p>
<p>이를 방지하려면 <code translate="no">nprobe</code> 을 더 크게, <code translate="no">nlist</code> 과 <code translate="no">k</code> 을 더 작게 설정해 보세요.</p>
<p>자세한 내용은 <a href="/docs/ko/v2.4.x/index.md">벡터 색인을</a> 참조하세요.</p>
<h4 id="What-is-the-maximum-vector-dimension-supported-in-Milvus" class="common-anchor-header">Milvus에서 지원되는 최대 벡터 크기는 얼마인가요?</h4><p>Milvus는 기본적으로 최대 32,768개의 차원으로 벡터를 관리할 수 있습니다. <code translate="no">Proxy.maxDimension</code> 값을 늘려 더 큰 차원의 벡터를 허용할 수 있습니다.</p>
<h4 id="Does-Milvus-support-Apple-M1-CPU" class="common-anchor-header">Milvus는 Apple M1 CPU를 지원하나요?</h4><p>현재 Milvus 릴리스에서는 Apple M1 CPU를 직접 지원하지 않습니다. Milvus 2.3 이후에는 ARM64 아키텍처용 Docker 이미지를 제공합니다.</p>
<h4 id="What-data-types-does-Milvus-support-on-the-primary-key-field" class="common-anchor-header">Milvus는 기본 키 필드에서 어떤 데이터 유형을 지원하나요?</h4><p>현재 릴리스에서 Milvus는 INT64와 문자열을 모두 지원합니다.</p>
<h4 id="Is-Milvus-scalable" class="common-anchor-header">Milvus는 확장 가능한가요?</h4><p>예. Kubernetes의 헬름 차트를 통해 여러 노드가 있는 Milvus 클러스터를 배포할 수 있습니다. 자세한 지침은 <a href="/docs/ko/v2.4.x/scaleout.md">스케일 가이드를</a> 참조하세요.</p>
<h4 id="What-are-growing-segment-and-sealed-segment" class="common-anchor-header">성장 세그먼트와 봉인된 세그먼트는 무엇인가요?</h4><p>검색 요청이 오면 Milvus는 증분 데이터와 과거 데이터를 모두 검색합니다. 증분 데이터는 최근 업데이트이며, 증가하는 세그먼트에 저장되어 객체 스토리지에 유지될 임계값에 도달하기 전에 메모리에 버퍼링되어 보다 효율적인 인덱스가 구축되는 반면, 기록 데이터는 오래 전에 업데이트된 데이터입니다. 이 데이터는 오브젝트 스토리지에 보존된 봉인된 세그먼트에 있습니다. 증분 데이터와 기록 데이터가 함께 검색을 위한 전체 데이터 세트를 구성합니다. 이러한 설계 덕분에 Milvus에 수집된 모든 데이터를 즉시 검색할 수 있습니다. Milvus Distributed의 경우, 방금 수집된 레코드가 검색 결과에 표시되는 시점을 결정하는 더 복잡한 요소들이 있습니다. <a href="https://milvus.io/docs/consistency.md">일관성 수준에서</a> 이에 대한 자세한 뉘앙스를 알아보세요.</p>
<h4 id="Is-Milvus-available-for-concurrent-search" class="common-anchor-header">Milvus는 동시 검색이 가능한가요?</h4><p>네. 동일한 컬렉션에 대한 쿼리의 경우, Milvus는 증분 데이터와 기록 데이터를 동시에 검색합니다. 그러나 서로 다른 컬렉션에 대한 쿼리는 순차적으로 수행됩니다. 기록 데이터는 매우 방대한 데이터 세트가 될 수 있지만, 기록 데이터에 대한 검색은 상대적으로 더 많은 시간이 소요되며 기본적으로 연속적으로 수행됩니다.</p>
<h4 id="Why-does-the-data-in-MinIO-remain-after-the-corresponding-collection-is-dropped" class="common-anchor-header">해당 컬렉션이 삭제된 후에도 MinIO의 데이터가 남아있는 이유는 무엇인가요?</h4><p>MinIO의 데이터는 데이터 롤백의 편의를 위해 일정 기간 동안 유지되도록 설계되었습니다.</p>
<h4 id="Does-Milvus-support-message-engines-other-than-Pulsar" class="common-anchor-header">Milvus는 Pulsar 이외의 메시지 엔진을 지원하나요?</h4><p>네. Milvus 2.1.0에서는 Kafka가 지원됩니다.</p>
<h4 id="Whats-the-difference-between-a-search-and-a-query" class="common-anchor-header">검색과 쿼리의 차이점은 무엇인가요?</h4><p>Milvus에서 벡터 유사도 검색은 유사도 계산과 벡터 인덱스 가속을 기반으로 벡터를 검색합니다. 벡터 유사도 검색과 달리, 벡터 쿼리는 부울 표현식을 기반으로 스칼라 필터링을 통해 벡터를 검색합니다. 부울 표현식은 스칼라 필드 또는 기본 키 필드를 필터링하고 필터와 일치하는 모든 결과를 검색합니다. 쿼리에는 유사성 메트릭이나 벡터 인덱스가 포함되지 않습니다.</p>
<h4 id="Why-does-a-float-vector-value-have-a-precision-of-7-decimal-digits-in-Milvus" class="common-anchor-header">Milvus에서 실수 벡터 값의 정밀도가 소수점 이하 7자리인 이유는 무엇인가요?</h4><p>Milvus는 벡터를 Float32 배열로 저장하는 것을 지원합니다. Float32 값의 정밀도는 소수점 이하 7자리입니다. 1.3476964684980388 같은 Float64 값의 경우에도 Milvus는 1.347696으로 저장합니다. 따라서 Milvus에서 이러한 벡터를 검색하면 Float64 값의 정밀도가 손실됩니다.</p>
<h4 id="How-does-Milvus-handle-vector-data-types-and-precision" class="common-anchor-header">Milvus는 벡터 데이터 유형과 정밀도를 어떻게 처리하나요?</h4><p>Milvus는 Binary, Float32, Float16 및 BFloat16 벡터 유형을 지원합니다.</p>
<ul>
<li>바이너리 벡터: 이진 데이터는 이미지 처리와 정보 검색에 사용되는 0과 1의 시퀀스로 저장합니다.</li>
<li>Float32 벡터: 소수점 이하 7자리 정도의 정밀도를 가진 기본 저장소입니다. Float64 값도 Float32 정밀도로 저장되므로 검색 시 정밀도 손실이 발생할 수 있습니다.</li>
<li>Float16 및 BFloat16 벡터: 정밀도와 메모리 사용량이 감소합니다. Float16은 대역폭과 스토리지가 제한된 애플리케이션에 적합하며, BFloat16은 정확도에 큰 영향을 주지 않으면서 계산 요구 사항을 줄이기 위해 딥 러닝에서 일반적으로 사용되는 범위와 효율성의 균형을 맞추는 데 적합합니다.</li>
</ul>
<h4 id="Does-Milvus-support-specifying-default-values-for-scalar-or-vector-fields" class="common-anchor-header">Milvus는 스칼라 또는 벡터 필드에 대한 기본값 지정을 지원하나요?</h4><p>현재 Milvus 2.4.x는 스칼라 또는 벡터 필드에 대한 기본값 지정을 지원하지 않습니다. 이 기능은 향후 릴리스에 추가될 예정입니다.</p>
<h4 id="Still-have-questions" class="common-anchor-header">아직 질문이 있으신가요?</h4><p>언제든지 문의하세요:</p>
<ul>
<li>GitHub에서 <a href="https://github.com/milvus-io/milvus/issues">Milvus를</a> 확인하세요. 질문을 제기하고, 아이디어를 공유하고, 다른 사람들을 도울 수 있습니다.</li>
<li><a href="https://discord.com/invite/8uyFbECzPX">Discord 서버에</a> 가입하여 지원을 찾고 오픈 소스 커뮤니티에 참여하세요.</li>
</ul>
