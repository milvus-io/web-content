---
id: boolean.md
summary: Milvus의 부울 표현식 규칙에 대해 알아보세요.
title: 스칼라 필터링 규칙
---
<h1 id="Scalar-Filtering-Rules" class="common-anchor-header">스칼라 필터링 규칙<button data-href="#Scalar-Filtering-Rules" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>술어 표현식은 부울 값을 출력합니다. Milvus는 술어로 검색하여 스칼라 필터링을 수행합니다. 술어 표현식은 평가될 때 TRUE 또는 FALSE를 반환합니다. 술어 표현식 사용에 대한 지침은 <a href="/api-reference/pymilvus/v2.4.x/About.md">Python SDK API 참조를 참조하세요</a>.</p>
<p><a href="https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form">EBNF</a> 문법 규칙은 부울 표현식 규칙을 설명합니다:</p>
<pre><code translate="no"><span class="hljs-title class_">Expr</span> = <span class="hljs-title class_">LogicalExpr</span> | <span class="hljs-variable constant_">NIL</span>
<span class="hljs-title class_">LogicalExpr</span> = <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-title class_">BinaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span> 
              | <span class="hljs-title class_">UnaryLogicalOp</span> <span class="hljs-title class_">LogicalExpr</span>
              | <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-title class_">LogicalExpr</span> <span class="hljs-string">&quot;)&quot;</span>
              | <span class="hljs-title class_">SingleExpr</span>;
<span class="hljs-title class_">BinaryLogicalOp</span> = <span class="hljs-string">&quot;&amp;&amp;&quot;</span> | <span class="hljs-string">&quot;and&quot;</span> | <span class="hljs-string">&quot;||&quot;</span> | <span class="hljs-string">&quot;or&quot;</span>;
<span class="hljs-title class_">UnaryLogicalOp</span> = <span class="hljs-string">&quot;not&quot;</span>;
<span class="hljs-title class_">SingleExpr</span> = <span class="hljs-title class_">TermExpr</span> | <span class="hljs-title class_">CompareExpr</span>;
<span class="hljs-title class_">TermExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;in&quot;</span> <span class="hljs-title class_">ConstantArray</span>;
<span class="hljs-title class_">Constant</span> = <span class="hljs-variable constant_">INTEGER</span> | <span class="hljs-variable constant_">FLOAT</span>
<span class="hljs-title class_">ConstantExpr</span> = <span class="hljs-title class_">Constant</span>
               | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">BinaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>
               | <span class="hljs-title class_">UnaryArithOp</span> <span class="hljs-title class_">ConstantExpr</span>;
                                                          
<span class="hljs-title class_">ConstantArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ConstantExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ConstantExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">UnaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span>
<span class="hljs-title class_">BinaryArithOp</span> = <span class="hljs-string">&quot;+&quot;</span> | <span class="hljs-string">&quot;-&quot;</span> | <span class="hljs-string">&quot;*&quot;</span> | <span class="hljs-string">&quot;/&quot;</span> | <span class="hljs-string">&quot;%&quot;</span> | <span class="hljs-string">&quot;**&quot;</span>;
<span class="hljs-title class_">CompareExpr</span> = <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-title class_">ConstantExpr</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOp</span> <span class="hljs-variable constant_">IDENTIFIER</span>
              | <span class="hljs-title class_">ConstantExpr</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-title class_">CmpOpRestricted</span> <span class="hljs-title class_">ConstantExpr</span>;
<span class="hljs-title class_">CmpOpRestricted</span> = <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span>;
<span class="hljs-title class_">CmpOp</span> = <span class="hljs-string">&quot;&gt;&quot;</span> | <span class="hljs-string">&quot;&gt;=&quot;</span> | <span class="hljs-string">&quot;&lt;&quot;</span> | <span class="hljs-string">&quot;&lt;=&quot;</span> | <span class="hljs-string">&quot;==&quot;</span>| <span class="hljs-string">&quot;!=&quot;</span>;
<span class="hljs-title class_">MatchOp</span> = <span class="hljs-string">&quot;like&quot;</span> | <span class="hljs-string">&quot;LIKE&quot;</span>;
<span class="hljs-title class_">JsonArrayOps</span> = <span class="hljs-title class_">JsonDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> | <span class="hljs-title class_">JsonArray</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">JsonArrayDefs</span> = <span class="hljs-string">&quot;json_contains&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_all&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;json_contains_any&quot;</span> | <span class="hljs-string">&quot;JSON_CONTAINS_ANY&quot;</span>;
<span class="hljs-title class_">JsonExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">JsonArray</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">JsonExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">JsonExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<span class="hljs-title class_">ArrayOps</span> = <span class="hljs-title class_">ArrayDefs</span> <span class="hljs-string">&quot;(&quot;</span> <span class="hljs-variable constant_">IDENTIFIER</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> | <span class="hljs-title class_">Array</span> <span class="hljs-string">&quot;)&quot;</span>;
<span class="hljs-title class_">ArrayDefs</span> = <span class="hljs-string">&quot;array_contains&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_all&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ALL&quot;</span> 
           | <span class="hljs-string">&quot;array_contains_any&quot;</span> | <span class="hljs-string">&quot;ARRAY_CONTAINS_ANY&quot;</span>
           | <span class="hljs-string">&quot;array_length&quot;</span>       | <span class="hljs-string">&quot;ARRAY_LENGTH&quot;</span>;
<span class="hljs-title class_">ArrayExpr</span> =  <span class="hljs-title class_">Constant</span> | <span class="hljs-title class_">ConstantArray</span> | <span class="hljs-variable constant_">STRING</span> | <span class="hljs-variable constant_">BOOLEAN</span>;
<span class="hljs-title class_">Array</span> = <span class="hljs-string">&quot;[&quot;</span> <span class="hljs-title class_">ArrayExpr</span> { <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-title class_">ArrayExpr</span> } <span class="hljs-string">&quot;]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<p>다음 표에는 위의 부울 표현식 규칙에 언급된 각 기호에 대한 설명이 나와 있습니다.</p>
<table>
<thead>
<tr><th>표기법</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>=</td><td>정의</td></tr>
<tr><td>,</td><td>연결.</td></tr>
<tr><td>;</td><td>종료.</td></tr>
<tr><td>|</td><td>교대.</td></tr>
<tr><td>{...}</td><td>반복.</td></tr>
<tr><td>(...)</td><td>그룹화.</td></tr>
<tr><td>NIL</td><td>Empty. 표현식은 빈 문자열일 수 있습니다.</td></tr>
<tr><td>INTEGER</td><td>1, 2, 3과 같은 정수입니다.</td></tr>
<tr><td>FLOAT</td><td>1.0, 2.0과 같은 실수입니다.</td></tr>
<tr><td>CONST</td><td>정수 또는 부동숫수입니다.</td></tr>
<tr><td>IDENTIFIER</td><td>식별자입니다. Milvus에서 식별자는 필드 이름을 나타냅니다.</td></tr>
<tr><td>LogicalOp</td><td>LogicalOp는 하나의 비교에서 둘 이상의 관계형 연산을 결합하는 것을 지원하는 논리 연산자입니다. LogicalOp의 반환 값은 TRUE(1) 또는 FALSE(0)입니다. LogicalOps에는 BinaryLogicalOps와 UnaryLogicalOps 등 두 가지 유형이 있습니다.</td></tr>
<tr><td>단항 논리 연산</td><td>단항 논리 연산자 &quot;not&quot;은 단항 논리 연산자를 나타냅니다.</td></tr>
<tr><td>BinaryLogicalOp</td><td>두 피연산자에 대해 연산을 수행하는 이진 논리 연산자입니다. 피연산자가 두 개 이상인 복잡한 표현식에서 평가 순서는 우선순위 규칙에 따라 달라집니다.</td></tr>
<tr><td>산술 연산</td><td>산술 연산자, 즉 산술 연산자는 피연산자에 대해 덧셈과 뺄셈과 같은 수학 연산을 수행합니다.</td></tr>
<tr><td>단항 연산</td><td>UnaryArithOp는 단일 피연산자에 대해 연산을 수행하는 산술 연산자입니다. 음의 UnaryArithOp는 양의 식을 음의 식으로 바꾸거나 그 반대의 경우도 마찬가지입니다.</td></tr>
<tr><td>BinaryArithOp</td><td>이진 연산자, 즉 BinaryArithOp는 두 피연산자에 대해 연산을 수행합니다. 피연산자가 두 개 이상인 복잡한 표현식에서 평가 순서는 우선순위 규칙에 따라 달라집니다.</td></tr>
<tr><td>CmpOp</td><td>CmpOp는 두 피연산자에 대해 연산을 수행하는 관계형 연산자입니다.</td></tr>
<tr><td>CmpOpRestricted</td><td>CmpOpRestricted는 &quot;보다 작음&quot; 및 &quot;같음&quot;으로 제한됩니다.</td></tr>
<tr><td>ConstantExpr</td><td>ConstantExpr은 Constant 또는 두 개의 ConstExpr에 대한 BinaryArithOp이거나 단일 ConstExpr에 대한 UnaryArithOp일 수 있습니다. 재귀적으로 정의됩니다.</td></tr>
<tr><td>ConstantArray</td><td>ConstantArray는 대괄호로 둘러싸여 있으며, ConstantExpr은 대괄호 안에 반복될 수 있습니다. ConstArray는 하나 이상의 ConstantExpr을 포함해야 합니다.</td></tr>
<tr><td>TermExpr</td><td>TermExpr은 식별자 값이 ConstantArray에 나타나는지 여부를 확인하는 데 사용됩니다. TermExpr은 &quot;in&quot;으로 표시됩니다.</td></tr>
<tr><td>CompareExpr</td><td>비교 표현식, 즉 비교 표현식은 두 개의 식별자에 대한 관계 연산, 하나의 식별자와 하나의 ConstantExpr에 대한 관계 연산, 또는 두 개의 ConstantExpr과 하나의 식별자에 대한 삼항 연산이 될 수 있습니다.</td></tr>
<tr><td>SingleExpr</td><td>단일 표현식, 즉 단일 표현식은 TermExpr 또는 CompareExpr일 수 있습니다.</td></tr>
<tr><td>LogicalExpr</td><td>LogicalExpr은 두 개의 LogicalExpr에 대한 BinaryLogicalOp이거나 단일 LogicalExpr에 대한 UnaryLogicalOp이거나 괄호 안에 그룹화된 LogicalExpr 또는 SingleExpr일 수 있습니다. LogicalExpr은 재귀적으로 정의됩니다.</td></tr>
<tr><td>Expr</td><td>식을 의미하는 약어인 Expr은 LogicalExpr 또는 NIL일 수 있습니다.</td></tr>
<tr><td>MatchOp</td><td>MatchOp, 즉 일치 연산자는 문자열을 문자열 상수 또는 문자열 접두사, 접미사 또는 접미사 상수와 비교합니다.</td></tr>
<tr><td>JsonArrayOp</td><td>JsonOp, 즉 JSON 연산자는 지정된 식별자에 지정된 요소가 포함되어 있는지 확인합니다.</td></tr>
<tr><td>ArrayOp</td><td>ArrayOp, 즉 배열 연산자는 지정된 식별자에 지정된 요소가 포함되어 있는지 여부를 확인합니다.</td></tr>
</tbody>
</table>
<h2 id="Operators" class="common-anchor-header">연산자<button data-href="#Operators" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Logical-operators" class="common-anchor-header">논리 연산자</h3><p>논리 연산자는 두 표현식 간의 비교를 수행합니다.</p>
<table>
<thead>
<tr><th>기호</th><th>연산자</th><th>예제</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>'and' &amp;&amp;</td><td>and</td><td>expr1 &amp;&amp; expr2</td><td>expr1과 expr2가 모두 참이면 참입니다.</td></tr>
<tr><td>'또는' ||</td><td>또는</td><td>expr1 || expr2</td><td>expr1 또는 expr2 중 하나만 참이면 참입니다.</td></tr>
</tbody>
</table>
<h3 id="Binary-arithmetic-operators" class="common-anchor-header">이진 산술 연산자</h3><p>이진 산술 연산자는 두 개의 피연산자를 포함하며 기본적인 산술 연산을 수행하고 해당 결과를 반환할 수 있습니다.</p>
<table>
<thead>
<tr><th>기호</th><th>연산자</th><th>예제</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>+</td><td>더하기</td><td>a + b</td><td>두 피연산자를 더합니다.</td></tr>
<tr><td>-</td><td>빼기</td><td>a - b</td><td>첫 번째 피연산자에서 두 번째 피연산자를 뺍니다.</td></tr>
<tr><td>*</td><td>곱셈</td><td>a * b</td><td>두 피연산자를 곱합니다.</td></tr>
<tr><td>/</td><td>나눗셈</td><td>a / b</td><td>첫 번째 피연산자를 두 번째 피연산자로 나눕니다.</td></tr>
<tr><td>**</td><td>파워</td><td>a ** b</td><td>첫 번째 피연산자를 두 번째 피연산자의 거듭제곱으로 올립니다.</td></tr>
<tr><td>%</td><td>모듈로</td><td>a % b</td><td>첫 번째 피연산자를 두 번째 피연산자로 나눈 후 나머지 부분을 산출합니다.</td></tr>
</tbody>
</table>
<h3 id="Relational-operators" class="common-anchor-header">관계형 연산자</h3><p>관계형 연산자는 기호를 사용하여 두 표현식 간의 같음, 같지 않음 또는 상대적 순서를 확인합니다.</p>
<table>
<thead>
<tr><th>기호</th><th>연산자</th><th>예제</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>&lt;</td><td>미만</td><td>a &lt; b</td><td>a가 b보다 작으면 참입니다.</td></tr>
<tr><td>&gt;</td><td>보다 큼</td><td>a &gt; b</td><td>a가 b보다 크면 참입니다.</td></tr>
<tr><td>==</td><td>같음</td><td>a == b</td><td>a가 b와 같으면 참입니다.</td></tr>
<tr><td>!=</td><td>같지 않음</td><td>a != b</td><td>a가 b와 같지 않으면 참입니다.</td></tr>
<tr><td>&lt;=</td><td>보다 작거나 같음</td><td>a &lt;= b</td><td>a가 b보다 작거나 같으면 참입니다.</td></tr>
<tr><td>&gt;=</td><td>보다 크거나 같음</td><td>a &gt;= b</td><td>a가 b보다 크거나 같으면 참입니다.</td></tr>
</tbody>
</table>
<h2 id="Operator-precedence-and-associativity" class="common-anchor-header">연산자 우선순위 및 연관성<button data-href="#Operator-precedence-and-associativity" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 연산자의 우선순위 및 연관성이 나열되어 있습니다. 연산자는 내림차순 우선순위에 따라 위에서 아래로 나열됩니다.</p>
<table>
<thead>
<tr><th>우선 순위</th><th>연산자</th><th>설명</th><th>연관성</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>+ -</td><td>UnaryArithOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>2</td><td>not</td><td>UnaryLogicOp</td><td>오른쪽에서 왼쪽</td></tr>
<tr><td>3</td><td>**</td><td>BinaryArithOp</td><td>왼쪽에서 오른쪽</td></tr>
<tr><td>4</td><td>* / %</td><td>BinaryArithOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>5</td><td>+ -</td><td>BinaryArithOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>6</td><td>&lt; &lt;= &gt; &gt;=</td><td>CmpOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>7</td><td>== !=</td><td>CmpOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>8</td><td>좋아요</td><td>MatchOp</td><td>왼쪽에서 오른쪽</td></tr>
<tr><td>9</td><td>json_contains JSON_CONTAINS</td><td>JsonArrayOp</td><td>왼쪽에서 오른쪽</td></tr>
<tr><td>9</td><td>array_contains ARRAY_CONTAINS</td><td>ArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>10</td><td>json_contains_all JSON_CONTAINS_ALL</td><td>JsonArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>10</td><td>array_contains_all ARRAY_CONTAINS_ALL</td><td>ArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>11</td><td>json_contains_any JSON_CONTAINS_ANY</td><td>JsonArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>11</td><td>array_contains_any ARRAY_CONTAINS_ANY</td><td>ArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>12</td><td>array_length ARRAY_LENGTH</td><td>ArrayOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>13</td><td>&amp;&amp; 및</td><td>BinaryLogicOp</td><td>왼쪽에서 오른쪽으로</td></tr>
<tr><td>14</td><td>|| 또는</td><td>BinaryLogicOp</td><td>왼쪽에서 오른쪽</td></tr>
</tbody>
</table>
<p>표현식은 일반적으로 왼쪽에서 오른쪽으로 평가됩니다. 복잡한 표현식은 한 번에 하나씩 평가됩니다. 표현식이 평가되는 순서는 사용된 연산자의 우선순위에 따라 결정됩니다.</p>
<p>표현식에 우선 순위가 같은 연산자가 두 개 이상 포함된 경우 왼쪽에 있는 연산자가 먼저 평가됩니다.</p>
<div class="alert note">
<p>예를 들어 10 / 2 * 5는 (10 / 2)로 평가되고 결과에 5가 곱해집니다.</p>
</div>
<p>우선 순위가 낮은 연산을 먼저 처리해야 하는 경우 괄호 안에 넣어야 합니다.</p>
<div class="alert note">
<p>예를 들어 30 / 2 + 8입니다. 이는 일반적으로 30을 2로 나눈 다음 결과에 8을 더한 것으로 평가됩니다. 2 + 8로 나누려면 30 / (2 + 8)로 작성해야 합니다.</p>
</div>
<p>괄호는 표현식 안에 중첩할 수 있습니다. 가장 안쪽 괄호 안의 표현식이 먼저 평가됩니다.</p>
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
    </button></h2><p>Milvus에서 사용 가능한 모든 부울 표현식 사용 예시는 다음과 같습니다(<code translate="no">int64</code> 는 INT64 타입의 데이터를 포함하는 스칼라 필드, <code translate="no">float</code> 는 부동 소수점 타입의 데이터를 포함하는 스칼라 필드, <code translate="no">VARCHAR</code> 는 VARCHAR 타입의 데이터를 포함하는 스칼라 필드를 나타냅니다):</p>
<ol>
<li>CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 &gt; 0&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;0 &lt; int64 &lt; 400&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-string">&quot;500 &lt;= int64 &lt; 1000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> &gt; <span class="hljs-string">&quot;str1&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>BinaryLogicalOp 및 괄호</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;(int64 &gt; 0 &amp;&amp; int64 &lt; 400) or (int64 &gt; 500 &amp;&amp; int64 &lt; 1000)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="3">
<li>TermExpr 및 단항 논리 연산자</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 not in [1, 2, 3]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> not <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;str1&quot;</span>, <span class="hljs-string">&quot;str2&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>TermExpr, BinaryLogicalOp 및 CmpOp(서로 다른 필드에서)</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 in [1, 2, 3] and float != 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="5">
<li>BinaryLogicalOp 및 CmpOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;int64 == 0 || int64 == 1 || int64 == 2&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="6">
<li>CmpOp 및 UnaryArithOp 또는 BinaryArithOp</li>
</ol>
<pre><code translate="no"><span class="hljs-string">&quot;200+300 &lt; int64 &lt;= 500+500&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="7">
<li>MatchOp</li>
</ol>
<pre><code translate="no"><span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;prefix%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%suffix&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;%middle%&quot;</span>
<span class="hljs-variable constant_">VARCHAR</span> like <span class="hljs-string">&quot;_suffix&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="8">
<li>JsonArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">JSON_CONTAINS(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS</code> (두 번째 인수) 문의 JSON 표현식이 목록인 경우 식별자(첫 번째 인수)는 목록의 목록이어야 합니다. 그렇지 않으면 문은 항상 False로 평가됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3]}</span>
json_contains(x, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
    
<span class="hljs-comment"># {&quot;x&quot;: [[1,2,3], [4,5,6], [7,8,9]]}</span>
json_contains(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains(x, [<span class="hljs-number">3</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ALL(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ALL</code> 문의 JSON 표현식은 항상 목록이어야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_all(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_all(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">JSON_CONTAINS_ANY(identifier, JsonExpr)</code></p>
<p><code translate="no">JSON_CONTAINS_ANY</code> 문의 JSON 표현식은 항상 목록이어야 합니다. 그렇지 않으면 <code translate="no">JSON_CONTAINS</code> 와 동일하게 작동합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># {&quot;x&quot;: [1,2,3,4,5,7,8]}</span>
json_contains_any(x, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
json_contains_any(x, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<ol start="9">
<li>ArrayOp</li>
</ol>
<ul>
<li><p><code translate="no">ARRAY_CONTAINS(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS</code> (두 번째 인수) 문의 배열 표현식이 목록인 경우 식별자(첫 번째 인수)는 목록의 목록이어야 합니다. 그렇지 않으면 문은 항상 False로 평가됩니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &#x27;int_array&#x27;: [1,2,3]</span>
array_contains(int_array, <span class="hljs-number">1</span>) <span class="hljs-comment"># ==&gt; true</span>
array_contains(int_array, <span class="hljs-string">&quot;a&quot;</span>) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ALL(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ALL</code> 문의 배열 표현식은 항상 목록이어야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_all(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_all(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; false 6 is not exists</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_CONTAINS_ANY(identifier, ArrayExpr)</code></p>
<p><code translate="no">ARRAY_CONTAINS_ANY</code> 문의 배열 표현식은 항상 목록이어야 합니다. 그렇지 않으면 <code translate="no">ARRAY_CONTAINS</code> 와 동일하게 작동합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_contains_any(int_array, [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">8</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>]) <span class="hljs-comment"># ==&gt; true</span>
array_contains_any(int_array, [<span class="hljs-number">6</span>,<span class="hljs-number">9</span>]) <span class="hljs-comment"># ==&gt; false</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><code translate="no">ARRAY_LENGTH(identifier)</code></p>
<p>배열의 요소 수를 확인합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># &quot;int_array&quot;: [1,2,3,4,5,7,8]</span>
array_length(int_array) <span class="hljs-comment"># ==&gt; 7</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
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
    </button></h2><p>이제 Milvus에서 비트셋이 어떻게 작동하는지 알았습니다:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/multi-vector-search.md">하이브리드 검색을</a> 수행하는 방법을 알아보세요.</li>
<li><a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">문자열을 사용하여</a> 검색 결과를 <a href="https://milvus.io/blog/2022-08-08-How-to-use-string-data-to-empower-your-similarity-search-applications.md">필터링하는</a> 방법을 알아보세요.</li>
<li><a href="/docs/ko/v2.4.x/enable-dynamic-field.md">부울 표현식을 작성할 때 동적 필드를 사용하는</a> 방법을 알아보세요.</li>
</ul>
