---
id: knowhere.md
summary: 밀버스의 노웨어에 대해 알아보세요.
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus의 핵심 벡터 실행 엔진인 Knowhere에 대해 소개합니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere는 Milvus의 핵심 벡터 실행 엔진으로, <a href="https://github.com/facebookresearch/faiss">Faiss</a>, <a href="https://github.com/nmslib/hnswlib">Hnswlib</a>, <a href="https://github.com/spotify/annoy">Annoy</a> 등 여러 벡터 유사성 검색 라이브러리를 통합하고 있습니다. 또한 Knowhere는 이기종 컴퓨팅을 지원하도록 설계되었습니다. 인덱스 구축과 검색 요청을 실행할 하드웨어(CPU 또는 GPU)를 제어합니다. 이것이 바로 작업을 실행할 위치를 파악한다는 의미에서 Knowhere라는 이름이 붙여진 이유입니다. 향후 릴리즈에서는 DPU와 TPU를 포함한 더 많은 유형의 하드웨어가 지원될 예정입니다.</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Milvus 아키텍처의 Knowhere<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>아래 그림은 Milvus 아키텍처에서 Knowhere의 위치를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>가장 아래쪽 계층은 시스템 하드웨어입니다. 그 위에는 타사 인덱스 라이브러리가 있습니다. 최상위 계층에서 Knowhere는 CGO를 통해 인덱스 노드 및 쿼리 노드와 상호 작용하며, 이를 통해 Go 패키지는 C 코드를 호출할 수 있습니다.</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhere의 장점<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 Faiss에 비해 Knowhere의 장점입니다.</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">비트셋뷰 지원</h4><p>Milvus는 &quot;소프트 삭제&quot;를 실현하기 위해 비트셋 메커니즘을 도입했습니다. 소프트 삭제된 벡터는 데이터베이스에 여전히 존재하지만 벡터 유사성 검색이나 쿼리 중에 계산되지 않습니다.</p>
<p>비트셋의 각 비트는 인덱싱된 벡터에 해당합니다. 벡터가 비트셋에서 "1"로 표시되어 있으면 이 벡터는 소프트 삭제된 벡터이며 벡터 검색 중에 포함되지 않는다는 의미입니다. bitset 매개변수는 CPU 및 GPU 인덱스를 포함하여 Knowhere에 노출된 모든 Faiss 인덱스 쿼리 API에 적용됩니다.</p>
<p>비트셋 메커니즘에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/bitset.md">비트셋을</a> 참조하세요.</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">바이너리 벡터 인덱싱을 위한 여러 유사성 메트릭 지원</h4><p>Knowhere는 <a href="/docs/ko/v2.4.x/metric.md#Hamming-distance">해밍</a>, <a href="/docs/ko/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>, <a href="/docs/ko/v2.4.x/metric.md#Tanimoto-distance">타니모토</a>, <a href="/docs/ko/v2.4.x/metric.md#Superstructure">상부 구조</a> 및 하부 <a href="/docs/ko/v2.4.x/metric.md#Substructure">구조를</a> 지원합니다. Jaccard와 Tanimoto는 두 샘플 세트 간의 유사도를 측정하는 데 사용할 수 있으며, 상부구조와 하부구조는 화학 구조의 유사도를 측정하는 데 사용할 수 있습니다.</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">AVX512 명령어 세트 지원</h4><p>Knowhere는 이미 Faiss에서 지원하는 명령어 세트인 <a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>, <a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a>, <a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a> 외에도 <a href="https://en.wikipedia.org/wiki/AVX-512">AVX512를</a> 지원하여 <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">인덱스 구축 및 쿼리 성능을</a> AVX2에 비해 <a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">20~30% 향상시킬</a> 수 있습니다.</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">자동 SIMD 명령어 선택</h4><p>Knowhere는 모든 CPU 프로세서(온프레미스 및 클라우드 플랫폼 모두)에서 적합한 SIMD 명령어(예: SIMD SSE, AVX, AVX2, AVX512)를 자동으로 호출할 수 있도록 지원하므로 사용자가 컴파일 중에 SIMD 플래그(예: "-msse4")를 수동으로 지정할 필요가 없습니다.</p>
<p>Knowhere는 Faiss의 코드베이스를 리팩토링하여 구축되었습니다. SIMD 가속에 의존하는 일반적인 함수(예: 유사성 컴퓨팅)는 제외됩니다. 그런 다음 각 기능에 대해 네 가지 버전(즉, SSE, AVX, AVX2, AVX512)을 구현하고 각각 별도의 소스 파일에 넣습니다. 그런 다음 소스 파일은 해당 SIMD 플래그를 사용하여 개별적으로 추가로 컴파일됩니다. 따라서 런타임에 Knowhere는 현재 CPU 플래그를 기반으로 가장 적합한 SIMD 명령어를 자동으로 선택한 다음 후킹을 사용하여 올바른 함수 포인터를 연결할 수 있습니다.</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">기타 성능 최적화</h4><p>Knowhere의 성능 최적화에 대한 자세한 내용은 <a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: 특수 목적의 벡터 데이터 관리 시스템에서</a> 확인하세요.</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhere 코드 구조<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 연산은 주로 벡터 및 스칼라 연산을 포함합니다. Knowhere는 벡터 인덱싱에 대한 연산만 처리합니다.</p>
<p>인덱스는 원본 벡터 데이터와는 독립적인 데이터 구조입니다. 일반적으로 인덱싱에는 인덱스 생성, 데이터 학습, 데이터 삽입, 인덱스 구축의 네 단계가 필요합니다. 일부 AI 애플리케이션에서는 데이터 세트 학습이 벡터 검색과 분리되어 있습니다. 데이터 세트의 데이터를 먼저 학습시킨 다음 유사도 검색을 위해 Milvus와 같은 벡터 데이터베이스에 삽입합니다. 예를 들어, 오픈 데이터 세트 sift1M과 sift1B는 학습용 데이터와 테스트용 데이터를 구분합니다.</p>
<p>하지만 Knowhere에서는 학습용 데이터와 검색용 데이터가 동일합니다. Knowhere는 <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">세그먼트의</a> 모든 데이터를 학습시킨 다음 학습된 모든 데이터를 삽입하고 인덱스를 구축합니다.</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>베이스 클래스</h4><p><code translate="no">DataObj</code> 는 Knowhere의 모든 데이터 구조의 베이스 클래스입니다. <code translate="no">Size()</code> 는 <code translate="no">DataObj</code> 에서 유일한 가상 메서드입니다. Index 클래스는 <code translate="no">DataObj</code> 에서 &quot;size_&quot;라는 필드를 상속합니다. Index 클래스에는 <code translate="no">Serialize()</code> 와 <code translate="no">Load()</code> 라는 두 개의 가상 메서드도 있습니다. <code translate="no">Index</code> 에서 파생된 <code translate="no">VecIndex</code> 클래스는 모든 벡터 인덱스의 가상 베이스 클래스입니다. <code translate="no">VecIndex</code> 는 <code translate="no">Train()</code>, <code translate="no">Query()</code>, <code translate="no">GetStatistics()</code>, <code translate="no">ClearStatistics()</code> 등의 메서드를 제공합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>베이스 클래스</span> </span></p>
<p>위 그림의 오른쪽에 몇 가지 다른 인덱스 유형이 나열되어 있습니다.</p>
<ul>
<li><p>파이스 인덱스에는 부동 소수점 벡터의 모든 인덱스에 대한 <code translate="no">FaissBaseIndex</code> 와 이진 벡터의 모든 인덱스에 대한 <code translate="no">FaissBaseBinaryIndex</code> 의 두 가지 베이스 클래스가 있습니다.</p></li>
<li><p><code translate="no">GPUIndex</code> 는 모든 Faiss GPU 인덱스의 베이스 클래스입니다.</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> 는 모든 자체 개발 인덱스의 베이스 클래스입니다. 인덱스 파일에는 벡터 ID만 저장되므로 128차원 벡터의 파일 크기를 2배로 줄일 수 있습니다.</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>무차별 대입 검색</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>엄밀히 말하면 <code translate="no">IDMAP</code> 은 인덱스가 아니라 무차별 대입 검색에 사용됩니다. 벡터가 데이터베이스에 삽입되면 데이터 학습이나 인덱스 구축이 필요하지 않습니다. 검색은 삽입된 벡터 데이터에 대해 직접 수행됩니다.</p>
<p>그러나 코드 일관성을 위해 <code translate="no">IDMAP</code> 역시 모든 가상 인터페이스가 포함된 <code translate="no">VecIndex</code> 클래스를 상속합니다. <code translate="no">IDMAP</code> 의 사용법은 다른 인덱스와 동일합니다.</p>
<h4 id="IVF-indices" class="common-anchor-header">IVF 인덱스</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>IVF(반전 파일) 인덱스는 가장 자주 사용됩니다. <code translate="no">IVF</code> 클래스는 <code translate="no">VecIndex</code> 및 <code translate="no">FaissBaseIndex</code> 에서 파생되고 <code translate="no">IVFSQ</code> 및 <code translate="no">IVFPQ</code> 로 확장됩니다. <code translate="no">GPUIVF</code> 는 <code translate="no">GPUIndex</code> 및 <code translate="no">IVF</code> 에서 파생됩니다. 그리고 <code translate="no">GPUIVF</code> 은 <code translate="no">GPUIVFSQ</code> 과 <code translate="no">GPUIVFPQ</code> 으로 더 확장됩니다.</p>
<p><code translate="no">IVFSQHybrid</code> 는 자체 개발한 하이브리드 인덱스입니다. CPU에서 버킷을 검색하는 동안 GPU에서 거친 양자화기가 실행됩니다. 이러한 유형의 인덱스는 GPU의 연산 능력을 활용하여 CPU와 GPU 간의 메모리 복사 발생을 줄일 수 있습니다. <code translate="no">IVFSQHybrid</code> 은 <code translate="no">GPUIVFSQ</code> 과 동일한 리콜률을 가지지만 더 나은 성능을 제공합니다.</p>
<p>바이너리 인덱스의 베이스 클래스 구조는 상대적으로 더 간단합니다. <code translate="no">BinaryIDMAP</code> 와 <code translate="no">BinaryIVF</code> 는 <code translate="no">FaissBaseBinaryIndex</code> 와 <code translate="no">VecIndex</code> 에서 파생됩니다.</p>
<h4 id="Third-party-indices" class="common-anchor-header">서드파티 인덱스</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>서드파티 인덱스</span> </span></p>
<p>현재 Faiss를 제외한 두 가지 유형의 타사 인덱스만 지원됩니다: 트리 기반 인덱스 <code translate="no">Annoy</code> 와 그래프 기반 인덱스 <code translate="no">HNSW</code>. 이 두 가지 일반적이고 자주 사용되는 타사 인덱스는 모두 <code translate="no">VecIndex</code> 에서 파생됩니다.</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">Knowhere에 인덱스 추가하기<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere에 새 인덱스를 추가하려면 먼저 기존 인덱스를 참조할 수 있습니다:</p>
<ul>
<li><p>정량화 기반 인덱스를 추가하려면 <code translate="no">IVF_FLAT</code> 을 참조하세요.</p></li>
<li><p>그래프 기반 인덱스를 추가하려면 <code translate="no">HNSW</code> 을 참조하세요.</p></li>
<li><p>트리 기반 인덱스를 추가하려면 <code translate="no">Annoy</code> 을 참조하세요.</p></li>
</ul>
<p>기존 인덱스를 참조한 후 아래 단계에 따라 Knowhere에 새 인덱스를 추가할 수 있습니다.</p>
<ol>
<li><p><code translate="no">IndexEnum</code> 에 새 인덱스의 이름을 추가합니다. 데이터 유형은 문자열입니다.</p></li>
<li><p><code translate="no">ConfAdapter.cpp</code> 파일에서 새 인덱스에 데이터 유효성 검사를 추가합니다. 유효성 검사는 주로 데이터 학습 및 쿼리를 위한 매개 변수의 유효성을 검사하기 위한 것입니다.</p></li>
<li><p>새 인덱스에 대한 새 파일을 만듭니다. 새 인덱스의 베이스 클래스에는 <code translate="no">VecIndex</code> 과 필요한 가상 인터페이스 <code translate="no">VecIndex</code> 가 포함되어야 합니다.</p></li>
<li><p><code translate="no">VecIndexFactory::CreateVecIndex()</code> 에 새 인덱스에 대한 인덱스 구축 로직을 추가합니다.</p></li>
<li><p><code translate="no">unittest</code> 디렉토리에 단위 테스트를 추가합니다.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 Knowhere가 어떻게 작동하는지 배운 후에는 다음과 같이 하세요:</p>
<ul>
<li><p><a href="/docs/ko/v2.4.x/index.md">Milvus에서 지원하는 다양한 인덱스 유형에</a> 대해 알아보세요.</p></li>
<li><p><a href="/docs/ko/v2.4.x/bitset.md">비트셋 메커니즘에</a> 대해 알아보세요.</p></li>
<li><p>Milvus에서 <a href="/docs/ko/v2.4.x/data_processing.md">데이터가 처리되는 방식을</a> 이해합니다.</p></li>
</ul>
