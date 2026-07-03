---
id: choose-an-embeddinglist-search-strategy.md
title: EmbeddingList 검색 전략 선택
summary: >-
  EmbeddingList 검색 전략은 Milvus가 EmbeddingList 검색을 위한 근사 후보 인덱스를 어떻게 구축할지 결정합니다.
  기본 전략은 tokenann입니다. 임베딩 목록이 크거나, TokenANN의 계산 비용이 너무 높거나, 학습된/압축된 행 수준 표현이 더
  적합할 경우 muvera 또는 lemur로 전환할 수 있습니다. emb_list_rerank가 활성화된 경우, 최종 결과는 여전히
  MaxSim 재순위 지정 과정을 통해 산출됩니다.
---
<h1 id="Choose-an-EmbeddingList-Search-Strategy" class="common-anchor-header">EmbeddingList 검색 전략 선택<button data-href="#Choose-an-EmbeddingList-Search-Strategy" class="anchor-icon" translate="no">
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
    </button></h1><p>EmbeddingList 검색 전략은 Milvus가 EmbeddingList 검색을 위한 근사 후보 인덱스를 어떻게 구축할지 결정합니다. 기본 전략은 ' <code translate="no">tokenann</code>'입니다. 임베딩 리스트가 크거나, TokenANN의 계산 비용이 너무 높거나, 학습된/압축된 행 수준 표현이 더 적합할 경우 ' <code translate="no">muvera</code> ' 또는 ' <code translate="no">lemur</code> '로 전환할 수 있습니다. <code translate="no">emb_list_rerank</code> 가 활성화된 경우, 최종 결과는 여전히 MaxSim 재순위를 통해 산출됩니다.</p>
<h2 id="Why-Search-Strategies-Exist" class="common-anchor-header">검색 전략이 존재하는 이유<button data-href="#Why-Search-Strategies-Exist" class="anchor-icon" translate="no">
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
    </button></h2><p>임베딩 목록(EmbeddingList)은 텍스트 문서의 토큰 임베딩, 시각적 문서의 패치 임베딩, 또는 비디오의 클립 임베딩과 같이 여러 벡터를 포함하는 행을 위해 설계되었습니다. MaxSim은 하나의 쿼리 벡터와 하나의 행 벡터를 비교하는 대신, 쿼리 임베딩 목록과 문서 임베딩 목록을 비교하여 가장 잘 일치하는 결과를 집계합니다.</p>
<p>이는 더 뛰어난 표현력을 제공하지만, 대규모 환경에서는 정확한 MaxSim 계산에 많은 비용이 듭니다. 무차별 대입 방식의 MaxSim 검색은 쿼리 벡터를 모든 후보 행의 모든 벡터와 비교해야 합니다. 이는 일반적으로 실제 운영 환경의 검색에는 너무 느립니다.</p>
<table>
<thead>
<tr><th>### 문제점 - 각 행에는 여러 개의 벡터가 포함될 수 있습니다. - 모든 행에 대해 정확한 MaxSim을 수행하는 것은 계산 비용이 큽니다. - 인덱스 크기와 검색 지연 시간이 급격히 증가할 수 있습니다.</th><th>### 전략 - 1단계 검색에 근사치를 사용합니다. - 요청된 topK보다 더 많은 후보를 검색합니다. - 정확한 MaxSim을 사용하여 후보의 순위를 재조정합니다.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<p>이러한 의미에서 ‘ <code translate="no">emb_list_strategy</code> ’은 주로 인덱스 구축 및 후보 검색 전략입니다. 이 전략은 인덱스를 구축할 때 구성되며, 1단계 ANN 후보 집합이 어떻게 생성되는지를 결정합니다. 이후 ‘ <code translate="no">retrieval_ann_ratio</code> ’ 및 ‘ <code translate="no">emb_list_rerank</code> ’과 같은 검색 시점 매개변수는 검색되는 후보의 수와 MaxSim 재순위가 적용되는지 여부를 제어합니다.</p>
<hr>
<h2 id="Available-Strategies" class="common-anchor-header">사용 가능한 전략<button data-href="#Available-Strategies" class="anchor-icon" translate="no">
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
<tr><th>전략</th><th>후보 검색 단위</th><th>해결 대상</th><th>최적 적합</th><th>주요 상충 관계</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td>각 행 내의 개별 벡터</td><td>원본 벡터를 유지하며 압축 손실을 방지합니다.</td><td>품질 우선 검색, 짧거나 중간 길이의 임베딩 목록, 판별력이 높은 임베딩.</td><td>더 큰 인덱스와 더 높은 후보 검색 비용.</td></tr>
<tr><td><code translate="no">muvera</code></td><td>행당 하나의 인코딩된 벡터</td><td>훈련 과정 없이 임베딩 목록을 고정 차원의 FDE 표현으로 압축합니다.</td><td>문서 길이가 길거나, 판별력이 높은 임베딩인 경우, TokenANN이 너무 무거운 경우.</td><td>무작위 투영은 근사 손실을 초래하며, FDE 차원은 지연 시간에 영향을 미칩니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td>행당 하나의 학습된 벡터</td><td>임베딩 목록을 고정 차원의 행 벡터로 변환하는 코퍼스별 압축 방식을 학습합니다.</td><td>분별력이 낮은 임베딩, 다중 모달 또는 시각적 문서 검색, 대규모 임베딩 목록.</td><td>훈련이 필요하며, 코퍼스 분포와 문서 길이 편향에 민감할 수 있습니다.</td></tr>
</tbody>
</table>
<h2 id="TokenANN" class="common-anchor-header">TokenANN<button data-href="#TokenANN" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">tokenann</code> 임베딩 목록의 모든 벡터를 색인화합니다. 검색 시 각 쿼리 벡터는 ANN 검색을 수행하고, 일치하는 벡터는 해당 행으로 다시 집계되며, 결과로 나온 행 후보들은 MaxSim을 통해 재순위가 매겨집니다.</p>
<div class="alert note">
<p><strong>품질이 최우선인 경우 TokenANN을 사용하십시오.</strong> 1단계 인덱스에서 모든 벡터를 사용할 수 있도록 유지하기 때문에<strong>,</strong> 이는 원래의 MaxSim 계산에 가장 근접한 근사치입니다.</p>
</div>
<ul>
<li><p><strong>적합한 경우:</strong> 짧은 텍스트 청크, 벡터 수가 적거나 중간 정도인 행, 토큰 수준에서 의미적 구분이 뚜렷한 경우, 품질에 민감한 기준선.</p></li>
<li><p><strong>적합하지 않은 경우:</strong> 매우 긴 문서, 수천 개의 패치 벡터가 포함된 시각적 페이지, 엄격한 메모리 또는 지연 시간 제약이 있는 경우.</p></li>
<li><p><strong>요소 수준 동작:</strong> TokenANN은 개별 벡터에서 후보를 검색한 후 이를 다시 행 단위로 집계할 수 있습니다. MaxSim 점수 산정 후의 최종 EmbeddingList 검색 결과는 여전히 행 수준입니다.</p></li>
</ul>
<h2 id="MUVERA" class="common-anchor-header">MUVERA<button data-href="#MUVERA" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">muvera</code> 는 무작위 투영을 사용하여 각 임베딩 리스트를 고정 차원의 벡터로 인코딩합니다. 이를 통해 1단계 검색이 표준 행 수준 벡터 검색으로 전환됩니다. 이후 후보들은 MaxSim을 통해 재순위가 매겨집니다.</p>
<div class="alert note">
<p><strong>TokenANN이 너무 무겁지만 별도의 훈련 단계는 원치 않을 때 MUVERA를 사용하십시오.</strong> 이는 품질과 비용 사이의 실용적인 절충안입니다.</p>
</div>
<ul>
<li><p><strong>적합한 경우:</strong> 긴 텍스트 문서, 판별력이 높은 임베딩 공간, TokenANN보다 작은 인덱스 크기가 필요한 워크로드.</p></li>
<li><p><strong>적합하지 않은 경우:</strong> 판별력이 낮은 임베딩 공간이나, FDE 표현의 차원이 너무 커져 지연 시간 예산에 부합하지 않는 경우.</p></li>
<li><p><strong>중요한 매개변수:</strong><code translate="no">muvera_num_projections</code>, <code translate="no">muvera_num_repeats</code>, <code translate="no">muvera_seed</code>.</p></li>
</ul>
<h2 id="LEMUR" class="common-anchor-header">LEMUR<button data-href="#LEMUR" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">lemur</code> 는 각 임베딩 목록을 고정 차원의 표현으로 압축하도록 모델을 학습시킵니다. 1단계 ANN 검색은 학습된 행 수준 벡터에 대해 수행되며, 후보들은 MaxSim을 사용하여 재순위가 매겨집니다.</p>
<div class="alert note">
<p><strong>학습된 압축이 훈련 비용을 상쇄할 만큼 가치가 있을 때 LEMUR를 사용하십시오.</strong> 이 방법은 판별력이 낮은 임베딩 공간과 다중 모달 검색에 효과적일 수 있지만, 문서 길이 분포에 민감할 수 있으므로 대상 코퍼스를 기준으로 검증해야 합니다.</p>
</div>
<ul>
<li><p><strong>적합한 용도:</strong> 시각적 문서 검색, 다중 모달 패치 임베딩, 판별력이 낮은 임베딩 공간, TokenANN을 적용하기 어려운 대규모 임베딩 목록.</p></li>
<li><p><strong>적합하지 않은 경우:</strong> 자주 변경되는 코퍼스, 문서 길이가 극도로 편중된 고분화 임베딩, 훈련 비용이 용납될 수 없는 워크로드.</p></li>
<li><p><strong>주요 매개변수:</strong><code translate="no">lemur_hidden_dim</code>, <code translate="no">lemur_num_train_samples</code>, <code translate="no">lemur_num_epochs</code>, <code translate="no">lemur_batch_size</code>, <code translate="no">lemur_learning_rate</code>, <code translate="no">lemur_seed</code>, <code translate="no">lemur_num_layers</code>.</p></li>
</ul>
<hr>
<h2 id="Default-Behavior-and-Configuration" class="common-anchor-header">기본 동작 및 구성<button data-href="#Default-Behavior-and-Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Knowhere의 기본 EmbeddingList 전략은 <code translate="no">tokenann</code> 입니다. <code translate="no">emb_list_strategy</code> 를 지정하지 않으면 Knowhere는 TokenANN을 사용합니다. 검색 시 기본값으로는 <code translate="no">retrieval_ann_ratio=3.0</code> 및 <code translate="no">emb_list_rerank=true</code> 이 포함됩니다.</p>
<h2 id="Configuration-Items-by-Strategy" class="common-anchor-header">전략별 구성 항목<button data-href="#Configuration-Items-by-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 전략별 구성 항목이 나열되어 있습니다. Milvus에서는 일반적으로 인덱스를 생성할 때 <code translate="no">params</code> 맵을 통해 빌드 시 구성 항목을 전달합니다. 서버 측 기본값이 필요한 경우, Milvus 구성 파일의 <code translate="no">knowhere</code> 섹션에서 정의해야 합니다.</p>
<table>
<thead>
<tr><th>전략</th><th>구성 항목</th><th>단계</th><th>기본값</th><th>변경 시점</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">tokenann</code></td><td><code translate="no">emb_list_strategy=&quot;tokenann&quot;</code></td><td>인덱스 구축</td><td><code translate="no">tokenann</code></td><td>기본 요소 벡터 인덱싱 동작을 원하거나 DiskANN을 사용할 때 명시적으로 사용합니다.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">emb_list_strategy=&quot;muvera&quot;</code></td><td>인덱스 구축</td><td><code translate="no">tokenann</code></td><td>훈련 없이 행 단위로 인코딩된 검색을 원할 때 사용합니다.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_projections</code></td><td>인덱스 구축</td><td><code translate="no">4</code></td><td>SimHash 투영 횟수를 제어합니다. 값이 높을수록 더 많은 버킷이 생성되어 인코딩 품질이 향상될 수 있지만, 인코딩 차원은 증가합니다.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_num_repeats</code></td><td>인덱스 구축</td><td><code translate="no">7</code></td><td>독립적인 FDE 인코딩이 몇 개나 연결될지 제어합니다. 값이 높을수록 견고성은 향상될 수 있지만, 인덱스/검색 비용이 증가합니다.</td></tr>
<tr><td><code translate="no">muvera</code></td><td><code translate="no">muvera_seed</code></td><td>인덱스 구축</td><td><code translate="no">42</code></td><td>특히 테스트 및 벤치마크 비교 시 재현 가능한 무작위 투영을 위해 설정합니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">emb_list_strategy=&quot;lemur&quot;</code></td><td>인덱스 구축</td><td><code translate="no">tokenann</code></td><td>학습된 행 수준 압축이 고정 무작위 투영보다 더 나은 성능을 보일 것으로 예상될 때 사용합니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_hidden_dim</code></td><td>인덱스 구축</td><td><code translate="no">256</code></td><td>압축된 표현의 크기를 제어합니다. 용량을 늘리려면 값을 높이고, 메모리 사용량을 줄이고 검색 속도를 높이려면 값을 낮춥니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_train_samples</code></td><td>인덱스 구축</td><td><code translate="no">20000</code></td><td>코퍼스가 다양하고 학습된 압축이 과소 적합(underfit)될 때는 이 값을 늘리고, 소규모 테스트나 더 빠른 생성 시에만 이 값을 줄이십시오.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_epochs</code></td><td>인덱스 구축</td><td><code translate="no">50</code></td><td>훈련이 수렴되지 않은 경우 값을 늘리고, 구축 시간이 주요 제약 조건일 때는 값을 줄이십시오.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_batch_size</code></td><td>인덱스 구축</td><td><code translate="no">512</code></td><td>훈련 처리량과 메모리 사용량을 고려하여 조정하십시오.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_learning_rate</code></td><td>인덱스 구축</td><td><code translate="no">0.001</code></td><td>훈련이 불안정하거나 수렴 속도가 너무 느릴 때 조정합니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_seed</code></td><td>인덱스 구축</td><td><code translate="no">42</code></td><td>재현 가능한 훈련 실행을 위해 설정합니다.</td></tr>
<tr><td><code translate="no">lemur</code></td><td><code translate="no">lemur_num_layers</code></td><td>인덱스 구축</td><td><code translate="no">2</code></td><td>코퍼스에 더 표현력이 풍부한 특징 추출기가 필요하고 추가 훈련 비용을 감당할 수 있는 경우에만 이 값을 늘리십시오.</td></tr>
<tr><td>모든 전략</td><td><code translate="no">retrieval_ann_ratio</code></td><td>검색</td><td><code translate="no">3.0</code></td><td>1단계 후보를 더 많이 검색하여 재현율을 높이려면 값을 늘리고, 지연 시간을 줄이려면 값을 줄이십시오.</td></tr>
<tr><td>모든 전략</td><td><code translate="no">emb_list_rerank</code></td><td>검색</td><td><code translate="no">true</code></td><td>MaxSim 재순위를 위해 활성화된 상태로 유지하십시오. 1단계 ANN의 품질을 직접 측정하는 통제된 실험에서만 비활성화하십시오.</td></tr>
</tbody>
</table>
<h2 id="Configure-the-Strategy-in-Milvus" class="common-anchor-header">Milvus에서 전략 구성<button data-href="#Configure-the-Strategy-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 이 전략은 StructArray 벡터 하위 필드와 같은 EmbeddingList 필드에 인덱스를 생성할 때 인덱스 매개변수로 전달됩니다.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
        <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;muvera&quot;</span>,
        <span class="hljs-string">&quot;muvera_num_projections&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;muvera_num_repeats&quot;</span>: <span class="hljs-number">7</span>,
        <span class="hljs-string">&quot;muvera_seed&quot;</span>: <span class="hljs-number">42</span>,
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>LEMUR의 경우, 동일한 ` <code translate="no">params</code> ` 맵에 LEMUR 훈련 매개변수를 지정하십시오.</p>
<pre><code translate="no" class="language-python">params={
    <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
    <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">96</span>,
    <span class="hljs-string">&quot;emb_list_strategy&quot;</span>: <span class="hljs-string">&quot;lemur&quot;</span>,
    <span class="hljs-string">&quot;lemur_hidden_dim&quot;</span>: <span class="hljs-number">256</span>,
    <span class="hljs-string">&quot;lemur_num_train_samples&quot;</span>: <span class="hljs-number">20000</span>,
    <span class="hljs-string">&quot;lemur_num_epochs&quot;</span>: <span class="hljs-number">50</span>,
    <span class="hljs-string">&quot;lemur_batch_size&quot;</span>: <span class="hljs-number">512</span>,
    <span class="hljs-string">&quot;lemur_learning_rate&quot;</span>: <span class="hljs-number">0.001</span>,
    <span class="hljs-string">&quot;lemur_seed&quot;</span>: <span class="hljs-number">42</span>,
    <span class="hljs-string">&quot;lemur_num_layers&quot;</span>: <span class="hljs-number">2</span>,
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Server-side-Defaults-in-Milvus" class="common-anchor-header">Milvus에서 서버 측 기본값 구성<button data-href="#Configure-Server-side-Defaults-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 ` <code translate="no">milvus.yaml</code>`에서 인덱스 매개변수를 가져올 수도 있습니다. 관련 섹션은 <code translate="no">knowhere</code> 입니다. 매개변수는 ` <code translate="no">knowhere.&lt;INDEX_TYPE&gt;.&lt;stage&gt;.&lt;parameter&gt;</code>` 형식을 사용하여 인덱스 유형 및 단계별로 구성됩니다. 사용자가 지정한 인덱스 매개변수는 이러한 기본값보다 우선합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">HNSW:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">emb_list_strategy:</span> <span class="hljs-string">muvera</span>
      <span class="hljs-attr">muvera_num_projections:</span> <span class="hljs-number">4</span>
      <span class="hljs-attr">muvera_num_repeats:</span> <span class="hljs-number">7</span>
      <span class="hljs-attr">muvera_seed:</span> <span class="hljs-number">42</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">retrieval_ann_ratio:</span> <span class="hljs-number">3.0</span>
      <span class="hljs-attr">emb_list_rerank:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>전략 선택 시 인덱스별 매개변수를 우선적으로 사용하십시오.</strong> Milvus 구성 파일의 기본값은 해당 유형 및 스테이지의 인덱스에 광범위하게 적용됩니다. 서로 다른 컬렉션이나 필드에 서로 다른 EmbeddingList 전략이 필요한 경우 <code translate="no">create_index</code> 의 매개변수를 사용하십시오.</p>
</div>
<h2 id="Configure-Candidate-Retrieval-at-Search-Time" class="common-anchor-header">검색 시 후보 검색 구성<button data-href="#Configure-Candidate-Retrieval-at-Search-Time" class="anchor-icon" translate="no">
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
    </button></h2><p>이 전략은 인덱스가 어떻게 구축될지를 결정합니다. 검색 시에는 <code translate="no">retrieval_ann_ratio</code> 를 사용하여 MaxSim 재순위 지정 전에 검색되는 1단계 후보의 수를 제어할 수 있습니다. 값이 높을수록 일반적으로 리콜은 향상되지만 지연 시간은 증가합니다.</p>
<pre><code translate="no" class="language-python">results = client.search(
    collection_name=collection_name,
    data=[query_embedding_list],
    anns_field=<span class="hljs-string">&quot;clips[clip_embedding]&quot;</span>,
    search_params={
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">64</span>,
            <span class="hljs-string">&quot;retrieval_ann_ratio&quot;</span>: <span class="hljs-number">3.0</span>,
            <span class="hljs-string">&quot;emb_list_rerank&quot;</span>: <span class="hljs-literal">True</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
)
<button class="copy-code-btn"></button></code></pre>
<table>
<thead>
<tr><th>매개변수</th><th>단계</th><th>기본값</th><th>의미</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">emb_list_strategy</code></td><td>인덱스 구축</td><td><code translate="no">tokenann</code></td><td>EmbeddingList 후보 항목이 인덱싱되고 검색되는 방식을 선택합니다.</td></tr>
<tr><td><code translate="no">retrieval_ann_ratio</code></td><td>검색</td><td><code translate="no">3.0</code></td><td>첫 번째 ANN 라운드의 후보 확장 계수.</td></tr>
<tr><td><code translate="no">emb_list_rerank</code></td><td>검색</td><td><code translate="no">true</code></td><td>MaxSim을 사용하여 검색된 후보를 재순위화할지 여부.</td></tr>
</tbody>
</table>
<div class="alert note">
<p><strong>호환성 참고 사항:</strong> MUVERA 및 LEMUR는 현재 Knowhere에서 fp32 데이터를 지원합니다. DiskANN은 TokenANN 전략에서만 EmbeddingList를 지원합니다. fp32가 아닌 벡터 유형이나 DiskANN을 사용하는 경우, 기본값을 변경하기 전에 전략 지원 여부를 확인하십시오.</p>
</div>
<hr>
<h2 id="How-to-Choose-a-Strategy" class="common-anchor-header">전략 선택 방법<button data-href="#How-to-Choose-a-Strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>보편적으로 가장 좋은 전략은 없습니다. 임베딩 리스트 길이, 임베딩 공간의 판별력, 지연 시간 예산, 인덱스 크기, 그리고 훈련 단계를 수행할 여력이 있는지 여부를 고려하여 선택하십시오.</p>
<table>
<thead>
<tr><th>질문</th><th>신호</th><th>권장 시작점</th></tr>
</thead>
<tbody>
<tr><td>고품질의 베이스라인이 필요합니까?</td><td>비용을 최적화하기 전에 최상의 실용적 근사치를 측정하고자 하는 경우입니다.</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>벡터 개수가 적은 행인가요, 아니면 중간 정도인가요?</td><td>각 행에 토큰, 패치 또는 클립 벡터의 수가 적습니까?</td><td><code translate="no">tokenann</code></td></tr>
<tr><td>TokenANN이 너무 크거나 너무 느린가요?</td><td>인덱스 크기나 1단계 검색 지연 시간이 병목 현상입니다.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>훈련 없이 압축을 원하십니까?</td><td>더 간단한 운영 모델과 재현 가능한 인코딩이 필요합니다.</td><td><code translate="no">muvera</code></td></tr>
<tr><td>임베딩 공간의 판별력이 낮은가요?</td><td>토큰 수준 ANN 후보들은 노이즈가 많고, 랜덤 프로젝션은 신호를 충분히 보존하지 못합니다.</td><td><code translate="no">lemur</code></td></tr>
<tr><td>워크로드가 시각적인가요, 아니면 다중 모달인가요?</td><td>행에는 많은 패치 벡터가 포함되어 있으며, TokenANN은 계산 비용이 너무 높습니다.</td><td><code translate="no">lemur</code> 또는 <code translate="no">muvera</code></td></tr>
<tr><td>문서 길이에 큰 편차가 있습니까?</td><td>일부 행에는 다른 행보다 훨씬 더 많은 벡터가 포함되어 있습니다.</td><td><code translate="no">muvera</code> 부터 시작하고, <code translate="no">lemur</code> 를 신중하게 검증하십시오.</td></tr>
</tbody>
</table>
<h2 id="Suggested-Evaluation-Workflow" class="common-anchor-header">권장 평가 워크플로우<button data-href="#Suggested-Evaluation-Workflow" class="anchor-icon" translate="no">
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
<li><p>데이터셋 크기가 허용하는 경우, 품질 기준선으로 <code translate="no">tokenann</code> 부터 시작하십시오.</p></li>
<li><p><code translate="no">muvera</code> 로 동일한 쿼리를 실행하고 리콜, nDCG, 지연 시간 및 인덱스 크기를 비교하십시오.</p></li>
<li><p>임베딩 목록이 방대하거나, 임베딩 공간에 노이즈가 많거나, 워크로드가 시각적 또는 다중 모달인 경우 <code translate="no">lemur</code> 를 사용해 보십시오.</p></li>
<li><p>빌드 시간 매개변수를 너무 많이 변경하기 전에 <code translate="no">retrieval_ann_ratio</code> 를 조정해 보십시오. 리콜이 낮으면 값을 높이고, 지연 시간이 너무 길면 값을 낮추십시오.</p></li>
<li><p>항상 대표적인 쿼리와 문서 길이 분포를 기준으로 검증하십시오. 짧은 텍스트에서 효과가 있는 전략이 시각적 문서나 롱테일 코퍼스에서는 효과가 없을 수 있습니다.</p></li>
</ol>
<table>
<thead>
<tr><th>### 품질 우선: ` <code translate="no">tokenann</code>`부터 시작하십시오. 이를 MaxSim 근사 품질의 기준선으로 사용하십시오.</th><th>### 균형형: 훈련 파이프라인을 추가하지 않고 비용을 낮춰야 할 때는 <code translate="no">muvera</code> 을 시도해 보세요.</th><th>### 압축: 학습된 행 단위 압축이 고정 무작위 투영보다 우수한 성능을 보일 것으로 예상될 때 <code translate="no">lemur</code> 를 사용해 보세요.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<hr>
<h2 id="References-Used-for-This-Draft" class="common-anchor-header">이 초안에 사용된 참고 문헌<button data-href="#References-Used-for-This-Draft" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><code translate="no">emb_list_strategy</code>, <code translate="no">retrieval_ann_ratio</code> 및 <code translate="no">emb_list_rerank</code> 에 대한 Milvus 테스트 결과.</p></li>
<li><p><code translate="no">knowhere</code> 섹션에 있는 서버 측 인덱스 기본값에 대한 Milvus 구성 파일 처리 방법.</p></li>
<li><p>기본값 및 지원되는 전략 이름에 대한 Knowhere 매개변수 정의.</p></li>
<li><p>fp32 전용 MUVERA/LEMUR 및 DiskANN TokenANN 전용 지원에 대한 Knowhere 호환성 확인.</p></li>
<li><p>MaxSim 후보 검색을 위한 TokenANN, MUVERA 및 LEMUR 비교 내부 평가 노트.</p></li>
</ul>
<div class="alert note">
<p><strong>게시 참고 사항:</strong> 외부에 게시하기 전에, 대상 Milvus 릴리스에서 공식적으로 지원되는 매개변수가 무엇인지, 그리고 해당 제품이 모든 저수준 Knowhere 매개변수를 공개할지 아니면 문서화된 일부 하위 집합만 공개할지 확인하십시오.</p>
</div>
