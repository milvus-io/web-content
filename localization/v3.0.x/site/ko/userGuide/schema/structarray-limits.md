---
id: structarray-limits.md
title: StructArray 제한 사항
summary: >-
  StructArray 지원 기능은 스키마 정의, 삽입 페이로드, 인덱싱, 검색 모드 및 StructArray 전용 필터에 걸쳐 있습니다.
  프로덕션 환경에서 StructArray의 동작을 활용하기 전에 이 페이지를 제한 사항 참조 자료로 활용하시기 바랍니다.
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray 제한 사항<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray 지원은 스키마 정의, 삽입 페이로드, 인덱싱, 검색 모드 및 StructArray 전용 필터에 걸쳐 있습니다. 프로덕션 환경에서 StructArray 동작을 활용하기 전에 이 페이지를 제한 사항 참조 자료로 활용하십시오.</p>
<p>대부분의 StructArray 제한 사항은 StructArray 스키마 모델, 벡터 하위 필드에 대해 선택한 검색 모드, 컬렉션이 실행되는 Milvus 버전의 세 가지 중 하나에서 비롯됩니다.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">제한 사항 요약<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>영역</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>스키마 구조</td><td>Struct는 Array 필드의 요소 유형으로만 사용할 수 있습니다. Struct는 최상위 컬렉션 필드로 지원되지 않습니다.</td></tr>
<tr><td>하위 필드 스키마</td><td>동일한 StructArray 필드 내의 모든 Struct 요소는 하나의 미리 정의된 Struct 스키마를 공유합니다.</td></tr>
<tr><td>용량</td><td><code translate="no">max_capacity</code> 는 필수 항목이며, 하나의 엔티티가 StructArray 필드에 저장할 수 있는 Struct 요소의 수를 제한합니다.</td></tr>
<tr><td>하위 필드 변경</td><td>StructArray 필드가 생성된 후에는 해당 기존 StructArray 필드에 하위 필드를 추가할 수 없습니다.</td></tr>
<tr><td>하위 필드 경로인덱스, 검색 대상, 출력 필드 및 필터에는 xml-ph-0001@deepl.internal와 같은 xml-ph-0000@deepl.internal 경로를 사용하십시오.</td><td>인덱스, 검색 대상, 출력 필드 및 필터에는 <code translate="no">chunks[emb]</code> 와 같은 <code translate="no">structArray[subfield]</code> 경로를 사용하십시오. <code translate="no">chunks.emb</code> 는 사용하지 마십시오.</td></tr>
<tr><td>삽입 형상</td><td>StructArray 필드를 객체 배열로 삽입하십시오. 삽입 페이로드 내부에서는 경로 구문을 사용하지 마십시오.</td></tr>
<tr><td>벡터 인덱스</td><td>벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용합니다. EmbeddingList 검색과 요소 수준 검색에는 별도의 벡터 하위 필드를 사용하십시오.</td></tr>
<tr><td>함수</td><td>StructArray 필드 내부의 필드나 하위 필드에서는 필드 함수가 지원되지 않습니다.</td></tr>
<tr><td>Nullable 필드</td><td>Nullable StructArray 필드는 버전 제한이 있습니다. 지원되는 경우, null은 개별 Struct 요소가 아닌 전체 StructArray 필드에 적용됩니다.</td></tr>
<tr><td>동적 필드 추가</td><td>기존 컬렉션에 StructArray 필드를 추가하는 기능은 버전에 따라 지원 여부가 다르며, 추가되는 필드는 null 허용형이어야 합니다.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">스키마 제한<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>제한</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>Struct는 최상위 필드 유형이 아닙니다.</td><td>StructArray 필드를 <code translate="no">datatype=DataType.ARRAY</code> 로 생성하고, <code translate="no">element_type=DataType.STRUCT</code> 및 <code translate="no">struct_schema</code> 를 지정합니다.</td></tr>
<tr><td>모든 요소는 하나의 스키마를 공유합니다.</td><td>StructArray 필드의 모든 Struct 요소는 동일한 하위 필드 목록과 하위 필드 데이터 유형을 따릅니다.</td></tr>
<tr><td><code translate="no">max_capacity</code> 는 필수입니다.</td><td>하나의 엔티티에 포함된 Struct 요소의 수는 StructArray 필드에 대해 구성된 <code translate="no">max_capacity</code> 을 초과해서는 안 됩니다.</td></tr>
<tr><td>기존 하위 필드는 고정되어 있습니다.</td><td>기존 StructArray 필드에는 새로운 하위 필드를 추가할 수 없습니다. 하위 필드 스키마를 변경하려면 StructArray 필드를 삭제한 다음, 업데이트된 스키마로 다시 추가하십시오.</td></tr>
<tr><td>중첩된 StructArray는 지원되지 않습니다.</td><td>StructArray 필드에는 중첩된 <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> 또는 <code translate="no">ArrayOfStruct</code> 하위 필드를 포함할 수 없습니다.</td></tr>
<tr><td>StructArray 내부에서는 함수가 지원되지 않습니다.</td><td>StructArray 필드나 그 하위 필드에 대해 필드 함수를 정의하지 마십시오.</td></tr>
</tbody>
</table>
<p>스키마 생성 예제는 <a href="/docs/ko/create-structarray-field.md">StructArray 필드 생성을</a> 참조하십시오.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">지원되는 하위 필드 데이터 유형<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 하위 필드는 물리적 배열 스타일의 저장 공간에 매핑됩니다. 다음 표에는 지원되는 물리적 유형과 지원되지 않는 물리적 유형이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>Struct 하위 필드의 물리적 유형</th><th>지원</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td>서브필드를 ` <code translate="no">DataType.BOOL</code>` 형태로 정의하십시오.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td>서브필드를 <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> 또는 <code translate="no">DataType.INT64</code> 로 정의합니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td><code translate="no">DataType.FLOAT</code> 또는 <code translate="no">DataType.DOUBLE</code> 로 하위 필드를 정의합니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨서브필드를 xml-ph-0000@deepl.internal 또는 xml-ph-0001@deepl.internal로 정의합니다.</td><td>서브필드를 <code translate="no">DataType.VARCHAR</code> 로 정의하고 <code translate="no">max_length</code> 를 설정합니다.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.FLOAT_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.FLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.BFLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.INT8_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브필드를 <code translate="no">DataType.BINARY_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 스파스 벡터 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td><code translate="no">String</code> 대신 <code translate="no">VARCHAR</code> 을 사용하십시오.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 JSON 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 지오메트리 하위 필드 및 GIS 함수가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 텍스트 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 Timestamptz 하위 필드 및 시간 기반 표현식이 지원되지 않습니다.</td></tr>
<tr><td>중첩된 <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> 또는 <code translate="no">ArrayOfStruct</code></td><td>지원되지 않음</td><td>StructArray 필드는 중첩된 배열, 벡터 배열, Struct 또는 Array-of-Struct 하위 필드를 지원하지 않습니다.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Nullable 및 동적 스키마 제한<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Nullable StructArray의 동작 및 동적 StructArray 필드 추가는 버전에 따라 제한됩니다.</p>
<table>
<thead>
<tr><th>기능</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>Nullable StructArray 필드</td><td>Nullable StructArray 및 Nullable 벡터 배열을 지원하는 버전에서만 지원됩니다.</td></tr>
<tr><td>Python의 null 값</td><td>Python에서 null StructArray 값을 삽입하려면 ` <code translate="no">None</code> `를 사용하십시오. ` <code translate="no">Null</code> ` 또는 ` <code translate="no">null</code>`는 사용하지 마십시오.</td></tr>
<tr><td>Null 적용 범위</td><td>Null은 StructArray 필드 전체에 적용됩니다. 예를 들어, <code translate="no">chunks=None</code> 는 <code translate="no">chunks</code> 가 nullable인 경우에만 유효합니다.</td></tr>
<tr><td>부분적으로 null인 StructArray 값</td><td>StructArray 필드에 유효한 배열 값이 포함된 경우, 동일한 값 내에서 null인 하위 필드 배열과 유효한 하위 필드 배열을 혼합하여 사용해서는 안 됩니다.</td></tr>
<tr><td>StructArray 필드의 동적 추가</td><td>기존 컬렉션에 StructArray 필드를 추가하는 기능은 동적 StructArray 필드 지원이 포함된 버전에서만 지원됩니다.</td></tr>
<tr><td>동적 추가에 대한 null 허용 요구 사항</td><td>기존 컬렉션에 추가된 StructArray 필드는 기존 엔티티에 새 필드의 값이 없으므로 null 허용 가능해야 합니다.</td></tr>
<tr><td>동적 추가 후의 기존 엔티티</td><td>기존 엔티티는 추가된 StructArray 필드의 모든 하위 필드에 대해 ` <code translate="no">null</code> `를 반환합니다.</td></tr>
</tbody>
</table>
<p>Milvus v3.0.x에서는 nullable StructArray 필드, nullable 벡터 배열 및 동적 StructArray 필드 추가 기능을 사용할 수 있습니다.</p>
<p>nullable StructArray 필드를 사용한 삽입 예제는 <a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입을</a> 참조하십시오.</p>
<h2 id="Insert-limits" class="common-anchor-header">삽입 제한<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>제한</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>페이로드 형상</td><td>StructArray 필드를 <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 와 같은 Struct 객체 배열로 삽입합니다.</td></tr>
<tr><td>하위 필드 이름</td><td>각 Struct 객체 내부에서는 <code translate="no">chunks[text]</code> 와 같은 경로가 아닌, <code translate="no">text</code> 및 <code translate="no">emb</code> 와 같은 하위 필드 이름을 사용하십시오.</td></tr>
<tr><td>스키마 정렬</td><td>각 Struct 요소는 Struct 스키마와 일치해야 합니다.</td></tr>
<tr><td>용량</td><td>하나의 엔티티에 포함된 Struct 요소의 수는 <code translate="no">max_capacity</code> 를 초과해서는 안 됩니다.</td></tr>
<tr><td>벡터 차원</td><td>벡터 값은 해당 벡터 하위 필드에 대해 구성된 <code translate="no">dim</code> 와 일치해야 합니다.</td></tr>
<tr><td>검색 모드 중복</td><td>EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 벡터를 두 개의 별도 벡터 하위 필드에 작성하십시오.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">인덱스 및 메트릭 제한<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 벡터 하위 필드는 EmbeddingList 검색 또는 요소 수준 검색 중 하나를 위해 인덱싱될 수 있습니다. 각 벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용하므로, 동일한 벡터 하위 필드에서 두 메트릭 계열을 모두 사용할 수는 없습니다.</p>
<table>
<thead>
<tr><th>검색 모드</th><th>메트릭 계열</th><th>결과 수준</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code> 또는 이진 <code translate="no">MAX_SIM_*</code> 메트릭</td><td>엔티티 수준 결과.</td></tr>
<tr><td>요소 수준 검색</td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> 와 같은 일반 벡터 메트릭 또는 <code translate="no">JACCARD</code></td><td>일치한 요소의 오프셋을 포함할 수 있는 요소 수준 결과.</td></tr>
</tbody>
</table>
<p>두 모드가 모두 필요한 경우 별도의 벡터 하위 필드를 사용하십시오. 예를 들어, EmbeddingList 검색에는 <code translate="no">chunks[emb_list_vector]</code> 를, 요소 수준 검색에는 <code translate="no">chunks[emb]</code> 를 사용하십시오.</p>
<p>컬렉션 스키마를 설계할 때 StructArray 벡터 하위 필드는 벡터 하위 필드로 간주됩니다. 벡터 필드와 벡터 하위 필드의 총 개수가 대상 버전 및 서비스 계층의 제한 범위 내에 있도록 유지하십시오.</p>
<p>지원되는 인덱스 유형 및 메트릭 유형 행렬에 대해서는 <a href="/docs/ko/index-structarray-fields.md">‘StructArray 필드 색인’을</a> 참조하십시오.</p>
<h2 id="Search-limits" class="common-anchor-header">검색 제한<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>검색 동작</th><th>지원 및 제한 사항</th></tr>
</thead>
<tbody>
<tr><td>기본 EmbeddingList 검색</td><td><code translate="no">MAX_SIM*</code> 메트릭으로 인덱싱된 StructArray 벡터 하위 필드에서 지원됩니다. 엔티티 수준의 결과를 반환합니다.</td></tr>
<tr><td>기본 요소 수준 검색</td><td>일반 벡터 메트릭으로 인덱싱된 StructArray 벡터 하위 필드에서 지원됩니다. 일치하는 요소의 오프셋을 반환할 수 있습니다.</td></tr>
<tr><td>범위 검색</td><td>대상 버전의 검색 모드 및 인덱스/메트릭 지원 여부에 따라 지원됩니다. 요소 수준 StructArray 요청에 대한 하이브리드 범위 검색 동작 여부는 대상 버전을 확인하십시오.</td></tr>
<tr><td>그룹화 검색</td><td>요소 수준 그룹화 검색은 오프셋을 반환할 수 있습니다. 요소 수준 StructArray 요청에 대한 하이브리드 검색의 그룹화 동작은 버전에 따라 다릅니다.</td></tr>
<tr><td>하이브리드 검색</td><td>하이브리드 검색 요청은 대상 버전이 해당 검색 조합을 지원하는 경우에만 StructArray 벡터 하위 필드 요청을 포함할 수 있습니다. 각 요청은 여전히 인덱싱된 벡터 하위 필드의 메트릭 패밀리를 따릅니다.</td></tr>
<tr><td>오프셋 출력</td><td>오프셋은 요소 수준 검색 결과에 사용할 수 있습니다. EmbeddingList 검색은 엔티티 수준 결과를 반환하며, 요소 오프셋을 주요 결과 단위로 사용하지 않습니다.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">필터 및 연산자 제한<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 스칼라 필터링은 ` <code translate="no">element_filter</code> ` 및 ` <code translate="no">MATCH_*</code> ` 계열과 같은 StructArray 연산자에 의해 처리됩니다. 자세한 술어 지원 매트릭스는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자</a> 섹션에 설명되어 있습니다.</p>
<p>개요:</p>
<ul>
<li><p><code translate="no">$[subfield]</code> 는 StructArray 연산자 내부에서만 사용하십시오.</p></li>
<li><p>스칼라 술어에는 스칼라 하위 필드를 사용하십시오.</p></li>
<li><p>벡터 하위 필드를 <code translate="no">$[...]</code> 스칼라 술어 입력으로 사용하지 마십시오.</p></li>
<li><p>JSON 경로 구문, JSON 함수, 배열 컨테이너 함수, 텍스트 일치 함수, 기하학/GIS 함수 및 Timestamptz 표현식은 StructArray 요소 수준 조건식에서 지원되지 않습니다.</p></li>
<li><p>단순 부울 표현식 대신 <code translate="no">$[has_code] == true</code> 와 같은 명시적인 부울 비교를 사용하는 것이 좋습니다.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">관련 페이지<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>StructArray 필드를 생성하려면 <a href="/docs/ko/create-structarray-field.md">StructArray 필드 생성을</a> 참조하십시오.</p></li>
<li><p>데이터를 삽입하려면 <a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입을</a> 참조하십시오.</p></li>
<li><p>벡터 및 스칼라 인덱스를 생성하려면 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p></li>
<li><p>StructArray 필터 구문을 확인하려면 <a href="/docs/ko/struct-array-operators.md">‘StructArray 연산자’를</a> 참조하십시오.</p></li>
</ol>
