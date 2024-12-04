---
id: performance_faq.md
summary: '검색 성능, 성능 향상 및 기타 성능 관련 문제에 대해 자주 묻는 질문에 대한 답변을 찾아보세요.'
title: 성능 FAQ
---
<h1 id="Performance-FAQ" class="common-anchor-header">성능 FAQ<button data-href="#Performance-FAQ" class="anchor-icon" translate="no">
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
    </button></h1><h4 id="How-to-set-nlist-and-nprobe-for-IVF-indexes" class="common-anchor-header">IVF 인덱스에 <code translate="no">nlist</code> 및 <code translate="no">nprobe</code> 을 설정하는 방법은 무엇인가요?</h4><p><code translate="no">nlist</code> 설정은 시나리오에 따라 다릅니다. 일반적으로 <code translate="no">nlist</code> 의 권장 값은 <code translate="no">4 × sqrt(n)</code> 이며, 여기서 <code translate="no">n</code> 는 세그먼트의 총 엔티티 수입니다.</p>
<p>각 세그먼트의 크기는 <code translate="no">datacoord.segment.maxSize</code> 매개변수에 의해 결정되며, 기본적으로 512MB로 설정됩니다. 세그먼트 n의 총 엔티티 수는 <code translate="no">datacoord.segment.maxSize</code> 을 각 엔티티의 크기로 나누면 추정할 수 있습니다.</p>
<p><code translate="no">nprobe</code> 설정은 데이터 세트 및 시나리오에 따라 다르며 정확도와 쿼리 성능 간의 절충이 필요합니다. 반복적인 실험을 통해 이상적인 값을 찾는 것이 좋습니다.</p>
<p>다음 차트는 서로 다른 <code translate="no">nlist</code>/<code translate="no">nprobe</code> 쌍의 리콜 및 쿼리 성능을 비교하는 sift50m 데이터 세트와 IVF_SQ8 인덱스에서 실행한 테스트의 결과입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/accuracy_nlist_nprobe.png" alt="Accuracy test" class="doc-image" id="accuracy-test" />
   </span> <span class="img-wrapper"> <span>정확도 테스트</span> </span> <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/performance_nlist_nprobe.png" alt="Performance test" class="doc-image" id="performance-test" /><span>성능 테스트</span> </span></p>
<h4 id="Why-do-queries-sometimes-take-longer-on-smaller-datasets" class="common-anchor-header">작은 데이터 세트에서 쿼리 시간이 더 오래 걸리는 이유는 무엇인가요?</h4><p>쿼리 작업은 세그먼트에서 수행됩니다. 인덱스는 세그먼트를 쿼리하는 데 걸리는 시간을 줄여줍니다. 세그먼트가 인덱싱되지 않은 경우, Milvus는 원시 데이터에 대한 무차별 검색을 사용하므로 쿼리 시간이 크게 늘어납니다.</p>
<p>따라서 일반적으로 인덱스를 구축하지 않았기 때문에 작은 데이터 세트(컬렉션)에 대한 쿼리 시간이 더 오래 걸립니다. 이는 세그먼트의 크기가 <code translate="no">rootCoord.minSegmentSizeToEnableindex</code> 에서 설정한 인덱스 구축 임계값에 도달하지 않았기 때문입니다. <code translate="no">create_index()</code> 을 호출하여 임계값에 도달했지만 아직 자동으로 색인되지 않은 세그먼트를 강제로 색인하면 쿼리 성능이 크게 향상됩니다.</p>
<h4 id="What-factors-impact-CPU-usage" class="common-anchor-header">CPU 사용량에 영향을 미치는 요인은 무엇인가요?</h4><p>Milvus가 인덱스를 구축하거나 쿼리를 실행할 때 CPU 사용량이 증가합니다. 일반적으로 인덱스 구축은 단일 스레드에서 실행되는 Annoy를 사용하는 경우를 제외하고는 CPU 집약적입니다.</p>
<p>쿼리를 실행할 때 CPU 사용량은 <code translate="no">nq</code> 와 <code translate="no">nprobe</code> 에 의해 영향을 받습니다. <code translate="no">nq</code> 과 <code translate="no">nprobe</code> 이 작으면 동시성이 낮고 CPU 사용량이 낮게 유지됩니다.</p>
<h4 id="Does-simultaneously-inserting-data-and-searching-impact-query-performance" class="common-anchor-header">데이터 삽입과 검색을 동시에 수행하면 쿼리 성능에 영향을 주나요?</h4><p>삽입 작업은 CPU를 많이 사용하지 않습니다. 그러나 새 세그먼트가 인덱스 구축 임계값에 도달하지 않았을 수 있기 때문에 Milvus는 무차별 대입 검색을 사용하므로 쿼리 성능에 상당한 영향을 미칩니다.</p>
<p><code translate="no">rootcoord.minSegmentSizeToEnableIndex</code> 매개변수는 세그먼트의 인덱스 구축 임계값을 결정하며, 기본적으로 1024행으로 설정되어 있습니다. 자세한 내용은 <a href="/docs/ko/system_configuration.md">시스템 구성을</a> 참조하세요.</p>
<h4 id="Can-indexing-a-VARCHAR-field-improve-deletion-speed" class="common-anchor-header">VARCHAR 필드를 색인하면 삭제 속도가 향상될 수 있나요?</h4><p>예. VARCHAR 필드를 인덱싱하면 '표현식 기준 삭제' 작업 속도를 높일 수 있지만 특정 조건에서만 가능합니다:</p>
<ul>
<li><strong>반전 인덱스</strong>: 이 인덱스는 기본 키가 아닌 VARCHAR 필드에 대한 <code translate="no">IN</code> 또는 <code translate="no">==</code> 표현식에 도움이 됩니다.</li>
<li><strong>트라이 인덱스</strong>: 이 인덱스는 주 키가 아닌 VARCHAR 필드에 대한 접두사 쿼리(예: <code translate="no">LIKE prefix%</code>)에 도움이 됩니다.</li>
</ul>
<p>그러나 VARCHAR 필드를 색인해도 속도가 빨라지지는 않습니다:</p>
<ul>
<li><strong>ID로 삭제합니다</strong>: VARCHAR 필드가 기본 키인 경우.</li>
<li><strong>관련 없는 표현식</strong>: VARCHAR 필드가 삭제 표현식에 포함되지 않은 경우.</li>
</ul>
<h4 id="Still-have-questions" class="common-anchor-header">아직 질문이 있으신가요?</h4><p>그럴 수 있습니다:</p>
<ul>
<li>GitHub에서 <a href="https://github.com/milvus-io/milvus/issues">Milvus를</a> 확인하세요. 자유롭게 질문하고, 아이디어를 공유하고, 다른 사람들을 도와주세요.</li>
<li><a href="https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk">Slack 채널에</a> 가입하여 지원을 찾고 오픈 소스 커뮤니티에 참여하세요.</li>
</ul>
