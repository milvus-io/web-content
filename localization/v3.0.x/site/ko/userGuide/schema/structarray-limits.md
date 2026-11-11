---
id: structarray-limits.md
title: StructArray 제한 사항
summary: >-
  StructArray 지원 기능은 스키마 정의, 삽입 페이로드, 인덱싱, 검색 모드 및 StructArray 전용 필터에 걸쳐 있습니다.
  프로덕션 환경에서 StructArray의 동작을 활용하기 전에 이 페이지를 제한 사항 참조 자료로 활용하십시오.
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
    </button></h2><p>주요 StructArray 제한 사항은 다음과 같습니다:</p>
<table>
<thead>
<tr><th>영역</th><th>제한 사항</th></tr>
</thead>
<tbody>
<tr><td>스키마 형태</td><td>Struct는 Array 필드의 요소 유형으로만 사용할 수 있습니다. Struct는 최상위 컬렉션 필드로 지원되지 않습니다.</td></tr>
<tr><td>하위 필드 스키마</td><td>동일한 StructArray 필드 내의 모든 Struct 요소는 하나의 미리 정의된 Struct 스키마를 공유합니다.</td></tr>
<tr><td>중첩된 하위 필드</td><td>Milvus 3.0.6부터 Struct는 한 단계의 중첩을 가진 스칼라 <code translate="no">ARRAY</code> 하위 필드를 포함할 수 있습니다. 중첩된 <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code> 및 JSON 하위 필드는 어떤 버전에서도 지원되지 않습니다.</td></tr>
<tr><td>용량</td><td><code translate="no">max_capacity</code> 는 필수 항목이며, 하나의 엔티티가 StructArray 필드에 저장할 수 있는 Struct 요소의 수를 제한합니다.</td></tr>
<tr><td>서브필드 변경</td><td>Milvus 3.0.6부터 기존 StructArray 필드에 null이 허용되는 하위 필드를 추가하거나 해당 필드에서 하위 필드를 제거할 수 있습니다. 이전 버전에서는 전체 StructArray 필드를 제거한 후 다시 추가해야 합니다.</td></tr>
<tr><td>서브필드 경로</td><td>인덱스, 검색 대상, 출력 필드 및 필터에는 <code translate="no">chunks[emb]</code> 와 같은 <code translate="no">structArray[subfield]</code> 경로를 사용하십시오. <code translate="no">chunks.emb</code> 는 사용하지 마십시오.</td></tr>
<tr><td>쉐이프 삽입</td><td>StructArray 필드를 객체 배열로 삽입하십시오. 삽입 페이로드 내부에서는 경로 구문을 사용하지 마십시오.</td></tr>
<tr><td>벡터 인덱스</td><td>벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용합니다. EmbeddingList 검색과 요소 수준 검색에는 별도의 벡터 하위 필드를 사용하십시오.</td></tr>
<tr><td>함수</td><td>StructArray 필드 내부의 필드나 하위 필드에서는 필드 함수가 지원되지 않습니다.</td></tr>
<tr><td>Null 허용 필드</td><td>Nullable StructArray 필드는 버전 제한이 적용됩니다. 행 수준의 null은 전체 StructArray 필드에 적용됩니다. Milvus 3.0.6부터 서브필드는 개별 Struct 요소에서 null 값을 추가로 허용할 수 있습니다: 스칼라 또는 벡터 서브필드의 경우 ` <code translate="no">nullable=True</code> `, 배열 서브필드의 경우 ` <code translate="no">element_nullable=True</code> `. Struct 요소 자체는 null일 수 없습니다.</td></tr>
<tr><td>동적 필드 추가</td><td>기존 컬렉션에 StructArray 필드를 추가하는 기능은 버전에 따라 지원 여부가 다르며, 추가되는 필드는 null 허용 가능해야 합니다.</td></tr>
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
    </button></h2><p>StructArray 스키마에는 다음과 같은 제한 사항이 있습니다:</p>
<table>
<thead>
<tr><th>제한 사항</th><th>상세 정보</th></tr>
</thead>
<tbody>
<tr><td>Struct는 최상위 필드 유형이 아닙니다.</td><td>StructArray 필드를 ` <code translate="no">datatype=DataType.ARRAY</code> `로 생성하고, ` <code translate="no">element_type=DataType.STRUCT</code> ` 및 ` <code translate="no">struct_schema</code>`을 지정하십시오.</td></tr>
<tr><td>모든 요소는 하나의 스키마를 공유합니다.</td><td>StructArray 필드의 모든 Struct 요소는 동일한 하위 필드 목록과 하위 필드 데이터 유형을 따릅니다.</td></tr>
<tr><td><code translate="no">max_capacity</code> 는 필수입니다.</td><td>하나의 엔티티에 포함된 Struct 요소의 수는 StructArray 필드에 대해 구성된 <code translate="no">max_capacity</code> 을 초과해서는 안 됩니다.</td></tr>
<tr><td>스칼라 <code translate="no">ARRAY</code> 하위 필드에는 하위 필드별 <code translate="no">max_capacity</code> 가 있습니다.</td><td>스칼라 <code translate="no">ARRAY</code> 하위 필드는 내부 배열에 대한 <code translate="no">max_capacity</code> 를 선언하며, Milvus는 내부 배열이 해당 하위 필드의 선언된 용량을 초과하는 Struct 요소를 거부합니다. 값은 하위 필드 간에 일치할 필요가 없습니다. 값은 0보다 커야 하며, <code translate="no">proxy.maxArrayCapacity</code>(기본값은 4096)을 초과해서는 안 됩니다.</td></tr>
<tr><td>Milvus 3.0.6 및 이후 버전에서는 서브필드를 확장할 수 있습니다.</td><td>요소가 null일 수 있는 하위 필드를 추가하거나, <code translate="no">chunks[lang]</code> 와 같이 경로를 지정하여 하위 필드를 삭제할 수 있습니다. StructArray 필드의 마지막 하위 필드, 컬렉션의 마지막 벡터 필드, 또는 함수(Function)에서 사용되는 하위 필드는 삭제할 수 없습니다. 이전 버전에서는 StructArray 필드를 삭제한 후 업데이트된 스키마로 다시 추가해야 합니다.</td></tr>
<tr><td>중첩된 Struct는 지원되지 않습니다.</td><td>Struct는 중첩된 <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code> 또는 JSON 하위 필드를 포함할 수 없습니다. Milvus 3.0.6부터 Struct는 한 단계의 중첩 수준을 가진 스칼라 <code translate="no">ARRAY</code> 하위 필드를 포함할 수 있습니다. <code translate="no">ARRAY</code> 하위 필드는 벡터를 포함할 수 없습니다.</td></tr>
<tr><td>StructArray 내부에서는 함수가 지원되지 않습니다.</td><td>StructArray 필드나 그 하위 필드에 대해 필드 함수를 정의하지 마십시오.</td></tr>
<tr><td>StructArray 필드에 대한 필드 속성은 제한됩니다.</td><td>Milvus 3.0.6부터 StructArray 필드 또는 하위 필드 경로에 대한 ` <code translate="no">alter_collection_field()</code> `는 ` <code translate="no">mmap.enabled</code>`, ` <code translate="no">field.description</code>` 및 ` <code translate="no">warmup</code>`만 허용합니다. ` <code translate="no">max_capacity</code> ` 및 ` <code translate="no">max_length</code>`와 같은 다른 속성은 거부됩니다.</td></tr>
<tr><td>서브필드에서는 텍스트 분석이 지원되지 않습니다.</td><td>Struct 하위 필드에 <code translate="no">enable_match</code> 또는 <code translate="no">enable_analyzer</code> 을 설정하면 거부됩니다. 텍스트 인덱스는 최상위 필드에 대해서만 생성됩니다.</td></tr>
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
    </button></h2><p>StructArray 하위 필드는 물리적 배열 형식의 저장 공간에 매핑됩니다. 다음 표에는 지원되는 물리적 유형과 지원되지 않는 물리적 유형이 나열되어 있습니다.</p>
<table>
<thead>
<tr><th>Struct 하위 필드의 물리적 유형</th><th>지원</th><th>비고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array&lt;Bool&gt;</code></td><td>지원됨</td><td>서브필드를 ` <code translate="no">DataType.BOOL</code>` 형태로 정의합니다.</td></tr>
<tr><td><code translate="no">Array&lt;Int8/Int16/Int32/Int64&gt;</code></td><td>지원됨</td><td>서브필드를 <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> 또는 <code translate="no">DataType.INT64</code> 로 정의합니다.</td></tr>
<tr><td><code translate="no">Array&lt;Float/Double&gt;</code></td><td>지원됨</td><td><code translate="no">DataType.FLOAT</code> 또는 <code translate="no">DataType.DOUBLE</code> 로 하위 필드를 정의합니다.</td></tr>
<tr><td><code translate="no">Array&lt;VarChar&gt;</code></td><td>지원됨서브필드를 xml-ph-0000@deepl.internal 또는 xml-ph-0001@deepl.internal로 정의합니다.</td><td><code translate="no">DataType.VARCHAR</code> 으로 하위 필드를 정의하고 <code translate="no">max_length</code> 을 설정합니다.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;FloatVector&gt;</code></td><td>지원됨</td><td>하위 필드를 <code translate="no">DataType.FLOAT_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Float16Vector&gt;</code></td><td>지원됨</td><td>하위 필드를 <code translate="no">DataType.FLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BFloat16Vector&gt;</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.BFLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;Int8Vector&gt;</code></td><td>지원됨</td><td>하위 필드를 <code translate="no">DataType.INT8_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;BinaryVector&gt;</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.BINARY_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector&lt;SparseFloatVector&gt;</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 스파스 벡터 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array&lt;String&gt;</code></td><td>지원되지 않음</td><td><code translate="no">String</code> 대신 <code translate="no">VARCHAR</code> 을 사용하십시오.</td></tr>
<tr><td><code translate="no">Array&lt;JSON&gt;</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 JSON 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array&lt;Geometry&gt;</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 지오메트리 하위 필드 및 GIS 함수가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array&lt;Text&gt;</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 텍스트 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array&lt;Timestamptz&gt;</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 Timestamptz 하위 필드 및 시간 기반 표현식이 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array&lt;Array&gt;</code></td><td>Milvus 3.0.6 이상에서 지원됨</td><td>서브필드를 <code translate="no">DataType.ARRAY</code> 로 정의하고, 스칼라 <code translate="no">element_type</code> 와 내부 배열을 위한 <code translate="no">max_capacity</code> 를 지정합니다. 그러면 각 Struct 요소는 하나의 내부 배열을 보유하게 됩니다. 서브필드에 <code translate="no">nullable=True</code> 를 설정하여 null 내부 배열을 허용하고, <code translate="no">element_nullable=True</code> 를 설정하여 내부에서 null 값을 허용하도록 합니다.</td></tr>
<tr><td><code translate="no">Array</code> <code translate="no">Array</code> 의 , 의 벡터, , 또는 <code translate="no">Array</code> <code translate="no">Array</code> <code translate="no">Struct</code> <code translate="no">ArrayOfStruct</code></td><td>지원되지 않음</td><td>Struct 내부의 배열 중첩은 한 단계로 제한되며, 내부 배열은 벡터를 포함할 수 없고, 중첩된 Struct 또는 Array-of-Struct 하위 필드는 지원되지 않습니다.</td></tr>
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
    </button></h2><p>다음 표는 아래의 가용성 설명에 따라 nullable StructArray의 동작 및 동적 StructArray 필드 추가에 대해 설명합니다:</p>
<table>
<thead>
<tr><th>기능</th><th>제한</th></tr>
</thead>
<tbody>
<tr><td>Nullable StructArray 필드</td><td>아래의 가용성 설명에 따라 StructArray 부모에 ` <code translate="no">nullable=True</code> `를 설정해야 하며, Struct 하위 필드를 개별적으로 nullable로 구성해서는 안 됩니다.</td></tr>
<tr><td>Python의 NULL 값</td><td>Python에서 null StructArray 값을 삽입하려면 ` <code translate="no">None</code> `를 사용하십시오. ` <code translate="no">Null</code> ` 또는 ` <code translate="no">null</code>`는 사용하지 마십시오.</td></tr>
<tr><td>NULL 범위</td><td>NULL은 StructArray 필드 전체에 적용됩니다. 예를 들어, <code translate="no">chunks=None</code> 은 <code translate="no">chunks</code> 이 nullable인 경우에만 유효합니다.</td></tr>
<tr><td>부분적으로 null인 StructArray 값</td><td>StructArray 필드에 유효한 배열 값이 포함된 경우, 동일한 값 내에서 null인 하위 필드 배열과 유효한 하위 필드 배열을 혼합하여 사용해서는 안 됩니다.</td></tr>
<tr><td>요소 수준의 null</td><td>Milvus 3.0.6 이상에서 지원됩니다. 스칼라, 벡터 또는 <code translate="no">ARRAY</code> 하위 필드는 개별 Struct 요소에서 null 값을 허용할 수 있습니다: 스칼라 또는 벡터 하위 필드의 경우 <code translate="no">nullable=True</code>, <code translate="no">ARRAY</code> 하위 필드의 경우 <code translate="no">element_nullable=True</code>. 행 수준 <code translate="no">nullable</code> 설정은 여전히 StructArray 부모에서 상속됩니다. 하위 필드에서 <code translate="no">nullable=True</code> 를 설정하면 행 수준 null이 아닌 요소 수준 null이 활성화됩니다.</td></tr>
<tr><td>Null Struct 요소</td><td><code translate="no">[null, {...}]</code> 와 같이 Struct 요소 자체는 null이 될 수 없습니다. 대신 해당 요소의 하위 필드 값을 null로 설정하십시오.</td></tr>
<tr><td>생략된 하위 필드</td><td>Milvus 3.0.6부터는 Struct 요소에서 요소 단위로 null이 허용되는 하위 필드를 생략할 수 있으며, Milvus는 해당 필드에 null을 저장합니다. 요소 단위로 null이 허용되지 않는 하위 필드는 모든 Struct 요소에 반드시 포함되어야 합니다. 이전 버전에서는 모든 Struct 요소가 모든 하위 필드를 제공해야 했습니다.</td></tr>
<tr><td>StructArray 필드의 동적 추가</td><td>아래의 적용 범위 설명에 따릅니다.</td></tr>
<tr><td>동적 추가에 대한 null 허용 요구 사항</td><td>기존 컬렉션에 추가되는 StructArray 필드는 기존 엔티티에 해당 새 필드의 값이 없으므로 nullable이어야 합니다.</td></tr>
<tr><td>동적 추가 후의 기존 엔티티</td><td>기존 엔티티는 추가된 StructArray 필드에 대해 ` <code translate="no">null</code> `를 반환합니다.</td></tr>
<tr><td>동적 추가 하위 필드</td><td>Milvus 3.0.6 이상에서 지원됩니다. 추가된 하위 필드는 ` <code translate="no">nullable=True</code>`로 생성되어야 하며, 추가된 ` <code translate="no">ARRAY</code> ` 하위 필드는 내부 배열 내의 null 값에 대해 ` <code translate="no">element_nullable=True</code> `를 추가로 반환합니다. 기존 엔티티는 각 Struct 요소의 새 하위 필드에 대해 null을 반환하며, StructArray 필드가 null인 엔티티는 계속 null 상태를 유지합니다.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 및 이후 릴리스는 독립형(Standalone) 및 분산(Distributed) 배포 환경 모두에서 null 허용 StructArray 필드, null 허용 벡터 배열, 동적 StructArray 필드 추가를 지원합니다. 이전 버전의 Milvus는 이러한 기능을 지원하지 않습니다.</p>
<p>Milvus 3.0.6 및 이후 릴리스는 추가로 요소 수준의 null 값, 스칼라 <code translate="no">ARRAY</code> 하위 필드, 기존 StructArray 필드의 하위 필드 추가 또는 제거를 지원합니다. 이러한 기능은 Storage V2가 필요하며 외부 컬렉션에서는 사용할 수 없습니다.</p>
<p>Zilliz Cloud에서는 Milvus 3.0.0 이상이 실행되는 온디맨드 클러스터에서 이러한 기능을 사용할 수 있습니다. 서빙 클러스터에서는 지원되지 않습니다.</p>
<p>null이 허용되는 StructArray 필드에 대한 삽입 예제는 <a href="/docs/ko/insert-data-into-structarray-fields.md">‘StructArray 필드에 데이터 삽입’을</a> 참조하십시오.</p>
<h2 id="Insert-limits" class="common-anchor-header">삽입 제한 사항<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 삽입 페이로드에는 다음과 같은 제한 사항이 있습니다:</p>
<table>
<thead>
<tr><th>제한 사항</th><th>상세 정보</th></tr>
</thead>
<tbody>
<tr><td>페이로드 형상</td><td>StructArray 필드는 <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code> 와 같이 Struct 객체의 배열 형태로 삽입해야 합니다.</td></tr>
<tr><td>서브필드 이름</td><td>각 Struct 객체 내부에서는 <code translate="no">chunks[text]</code> 와 같은 경로가 아닌, <code translate="no">text</code> 및 <code translate="no">emb</code> 와 같은 하위 필드 이름을 사용하십시오.</td></tr>
<tr><td>스키마 일치</td><td>각 Struct 요소는 Struct 스키마와 일치해야 합니다. Milvus 3.0.6부터 Struct 요소 내에서 null이 허용되는 하위 필드는 생략하거나 <code translate="no">null</code> 로 설정할 수 있습니다.</td></tr>
<tr><td>용량</td><td>하나의 엔티티에 포함된 Struct 요소의 수는 <code translate="no">max_capacity</code> 을 초과해서는 안 됩니다.</td></tr>
<tr><td>벡터 차원</td><td>벡터 값은 해당 벡터 하위 필드에 대해 구성된 <code translate="no">dim</code> 과 일치해야 합니다.</td></tr>
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
    </button></h2><p>StructArray 벡터 하위 필드는 EmbeddingList 검색 또는 요소 수준 검색 중 하나를 위해 인덱싱될 수 있습니다. 각 벡터 필드나 벡터 하위 필드는 하나의 인덱스만 허용하므로, 동일한 벡터 하위 필드에서 두 메트릭 패밀리를 모두 사용할 수는 없습니다. 검색 모드는 다음 메트릭 패밀리를 사용합니다:</p>
<table>
<thead>
<tr><th>검색 모드</th><th>메트릭 계열</th><th>결과 수준</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code> 또는 이진 <code translate="no">MAX_SIM_*</code> 메트릭</td><td>엔티티 수준 결과.</td></tr>
<tr><td>요소 수준 검색</td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code> 와 같은 일반 벡터 메트릭 또는 <code translate="no">JACCARD</code></td><td>일치하는 요소 오프셋을 포함할 수 있는 요소 수준 결과.</td></tr>
</tbody>
</table>
<p>두 모드가 모두 필요한 경우 별도의 벡터 하위 필드를 사용하십시오. 예를 들어, EmbeddingList 검색에는 <code translate="no">chunks[emb_list_vector]</code> 를, 요소 수준 검색에는 <code translate="no">chunks[emb]</code> 를 사용하십시오.</p>
<p>StructArray 벡터 하위 필드는 컬렉션 수준 제한 <code translate="no">proxy.maxVectorFieldNum</code>(기본값은 10)에 대한 벡터 필드로 계산됩니다. 벡터 하위 필드가 컬렉션의 유일한 벡터 필드인 StructArray 필드는 유효하며, 해당 필드를 삭제할 경우 컬렉션에 벡터 필드가 하나도 남지 않게 되는 상황에서는 삭제 요청이 거부됩니다. 벡터 필드 및 벡터 하위 필드의 총 개수가 대상 버전 및 서비스 계층의 제한 범위 내에 있도록 유지하십시오.</p>
<p>Milvus 3.0.6부터, 요소 null 허용 벡터 하위 필드는 일반 벡터 메트릭을 사용한 요소 수준 검색만 지원합니다. <code translate="no">MAX_SIM*</code> 메트릭, EmbeddingList 인덱스 및 EmbeddingList 검색은 요소 null 허용 벡터 하위 필드에서 거부되며, <code translate="no">AUTOINDEX</code> 는 해당 필드에 대해 <code translate="no">MAX_SIM*</code> 메트릭을 선택하지 않습니다. Null 벡터는 검색에 포함되지 않습니다. 스칼라 인덱스는 요소 null 허용 하위 필드나 스칼라 <code translate="no">ARRAY</code> 하위 필드에서는 지원되지 않습니다.</p>
<p>지원되는 인덱스 유형 및 메트릭 유형의 행렬에 대해서는 <a href="/docs/ko/index-structarray-fields.md">‘Index StructArray Fields’를</a> 참조하십시오.</p>
<h2 id="Search-limits" class="common-anchor-header">검색 제한 사항<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 검색 동작에는 다음과 같은 제한 사항이 있습니다.</p>
<table>
<thead>
<tr><th>검색 동작</th><th>지원 및 제한 사항</th></tr>
</thead>
<tbody>
<tr><td>기본 EmbeddingList 검색</td><td><code translate="no">MAX_SIM*</code> 메트릭으로 인덱싱된 StructArray 벡터 하위 필드에서 지원됩니다. 엔티티 수준의 결과를 반환합니다.</td></tr>
<tr><td>기본 요소 수준 검색</td><td>일반 벡터 메트릭으로 인덱싱된 StructArray 벡터 하위 필드에서 지원됩니다. 일치하는 요소의 오프셋을 반환할 수 있습니다.</td></tr>
<tr><td>범위 검색</td><td>대상 버전의 검색 모드 및 인덱스/메트릭 지원 여부에 따라 지원됩니다. 요소 수준 StructArray 요청에 대한 하이브리드 범위 검색 동작 여부는 대상 버전을 확인하십시오.</td></tr>
<tr><td>그룹화 검색</td><td>요소 수준 그룹화 검색은 오프셋을 반환할 수 있습니다. 요소 수준 StructArray 요청에 대한 하이브리드 검색의 그룹화 동작은 버전에 따라 달라집니다.</td></tr>
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
<li><p>행 수준 필터 표현식에서도 StructArray 경로를 직접 참조할 수 있습니다. 특정 요소 위치의 경우 ` <code translate="no">chunks[0][section]</code> `, 요소 개수의 경우 ` <code translate="no">array_length(chunks)</code> `, 여러 요소에 걸친 하위 필드 값의 경우 ` <code translate="no">array_contains(chunks[section], ...)</code> `, null이 허용되는 StructArray 필드의 경우 ` <code translate="no">chunks is null</code> `을 사용합니다.</p></li>
<li><p>스칼라 술어에는 스칼라 하위 필드를 사용하십시오.</p></li>
<li><p>벡터 하위 필드를 <code translate="no">$[...]</code> 스칼라 조건식 입력으로 사용하지 마십시오.</p></li>
</ul>
<ul>
<li>StructArray 요소 수준 술어에서는 JSON 경로 구문, JSON 함수, 텍스트 일치 함수, 기하/GIS 함수 및 Timestamptz 표현식이 지원되지 않습니다. Milvus 3.0.6부터 <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code> 및 <code translate="no">array_length</code> 는 <code translate="no">$[subfield]</code> 에서 스칼라 <code translate="no">ARRAY</code> 하위 필드에 대해 지원되며, <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> 는 모든 하위 필드 유형에 대해 지원됩니다.</li>
</ul>
<ul>
<li>Milvus 3.0.6부터, Struct 요소의 서브필드 값이 null인 경우 해당 요소의 술어는 false가 아닌 unknown으로 처리됩니다. <code translate="no">element_filter</code> 는 술어가 true인 요소만 유지하고, <code translate="no">MATCH_*</code> 는 unknown인 요소를 미스(miss)로 간주합니다. 자세한 내용은 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</li>
</ul>
<ul>
<li>단순한 부울 표현식보다는 ` <code translate="no">$[has_code] == true</code> `과 같은 명시적인 부울 비교를 사용하는 것이 좋습니다.</li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">가져오기 및 저장 제한<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>소스 파일 형식</td><td>JSON, JSONL, CSV 및 Parquet 파일은 StructArray 필드를 포함할 수 있습니다. NumPy 파일은 최상위 필드당 하나의 파일을 포함하며 StructArray 데이터를 제공할 수 없습니다. StructArray 필드가 있는 컬렉션의 경우 JSON, CSV 또는 Parquet 파일을 사용하십시오. 파일 형식에 대해서는 <a href="/docs/ko/prepare-source-data.md#StructArray-fields-in-source-files">소스 데이터 준비를</a> 참조하십시오.</td></tr>
<tr><td>저장 형식</td><td>요소가 null일 수 있는 하위 필드 및 스칼라 <code translate="no">ARRAY</code> 하위 필드는 Storage V2가 필요합니다. 이러한 하위 필드를 사용하는 컬렉션의 경우 Storage V1에 접근할 수 없습니다. 컬렉션 생성 및 데이터 삽입은 성공한 것처럼 보일 수 있지만, 플러시 단계에서 데이터 처리에 실패하게 되며, 이는 지원되지 않는 상태입니다. <code translate="no">common.storage.enableGrowingSourceFlush</code> 가 <code translate="no">true</code> 로 설정된 Storage V3는 요소 null 허용 하위 필드나 스칼라 <code translate="no">ARRAY</code> 하위 필드를 사용하는 요청을 거부합니다.</td></tr>
<tr><td>외부 컬렉션</td><td><code translate="no">ARRAY</code> 외부 컬렉션에서는 null이 허용되는 요소 하위 필드와 스칼라 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td>백업 및 스냅샷 가져오기</td><td>백업 복원과 같은 바이너리 로그(Binlog) 가져오기 및 스냅샷 소스 가져오기는 요소 null 허용 하위 필드 또는 스칼라 <code translate="no">ARRAY</code> 하위 필드가 있는 컬렉션의 경우 거부됩니다.</td></tr>
<tr><td>다운그레이드</td><td>요소 null 허용 하위 필드 또는 스칼라 <code translate="no">ARRAY</code> 하위 필드가 포함된 컬렉션은 Milvus 3.0.6 이전 릴리스에서는 실행할 수 없습니다. 이전 릴리스에서 write-ahead 로그를 재실행하면 시스템이 중단됩니다. Milvus 3.0.6 이상으로 다시 업그레이드하면 데이터가 복구됩니다.</td></tr>
</tbody>
</table>
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
<li><p>StructArray 필드를 생성하려면 <a href="/docs/ko/create-structarray-field.md">'StructArray 필드 생성'을</a> 참조하십시오.</p></li>
<li><p>데이터를 삽입하려면 <a href="/docs/ko/insert-data-into-structarray-fields.md">‘StructArray 필드에 데이터 삽입’을</a> 참조하십시오.</p></li>
<li><p>벡터 및 스칼라 인덱스를 생성하려면 <a href="/docs/ko/index-structarray-fields.md">'StructArray 필드 인덱싱'을</a> 참조하십시오.</p></li>
<li><p>StructArray 필터 구문을 확인하려면 <a href="/docs/ko/struct-array-operators.md">‘StructArray 연산자’를</a> 참조하십시오.</p></li>
</ol>
