---
id: cli_commands.md
summary: 명령을 사용하여 Milvus와 상호 작용합니다.
title: Milvus_CLI 명령 참조
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Milvus_CLI 명령 참조<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CLI(명령줄 인터페이스)는 데이터베이스 연결, 데이터 작업, 데이터 가져오기 및 내보내기를 지원하는 명령줄 도구입니다.</p>
<p>이 항목에서는 지원되는 모든 명령어와 해당 옵션을 소개합니다. 참조를 위해 몇 가지 예도 포함되어 있습니다.</p>
<h2 id="Command-Groups" class="common-anchor-header">명령 그룹<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CLI 명령은 다음과 같은 그룹으로 구성되어 있습니다:</p>
<ul>
<li><code translate="no">create</code>: 컬렉션, 데이터베이스, 파티션, 사용자, 역할 또는 인덱스 생성</li>
<li><code translate="no">delete</code>: 컬렉션, 데이터베이스, 파티션, 별칭, 사용자, 역할 또는 인덱스 삭제</li>
<li><code translate="no">list</code>: 컬렉션, 데이터베이스, 파티션, 사용자, 역할, 부여 또는 인덱스 나열</li>
<li><code translate="no">show</code>: 연결, 데이터베이스, 컬렉션, 로딩_진행률 또는 인덱스_진행률 표시</li>
<li><code translate="no">grant</code>: 역할 또는 권한 부여</li>
<li><code translate="no">revoke</code>: 역할 또는 권한 취소</li>
<li><code translate="no">load</code>: 로드 컬렉션 또는 파티션</li>
<li><code translate="no">release</code>: 컬렉션 또는 파티션 해제</li>
<li><code translate="no">use</code>: 데이터베이스 사용</li>
<li><code translate="no">rename</code>: 컬렉션 이름 바꾸기</li>
<li><code translate="no">insert</code>: 엔티티(파일 또는 행) 삽입</li>
</ul>
<h2 id="clear" class="common-anchor-header">clear<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>화면을 지웁니다.</p>
<p><h3 id="clear">구문</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">connect<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에 연결합니다.</p>
<p><h3 id="connect">구문</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(선택 사항) URL 이름입니다. 기본값은 "http://127.0.0.1:19530"입니다.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-토큰</td><td style="text-align:left">(선택 사항) zilliz 클라우드 아피키 또는 <code translate="no">username:password</code>. 기본값은 없음입니다.</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(선택 사항) TLS 모드를 설정합니다: 0(암호화 안 함), 1(단방향 암호화), 2(양방향 암호화 아직 지원 안 함). 기본값은 0입니다.</td></tr>
<tr><td style="text-align:left">-cert</td><td style="text-align:left">-cert</td><td style="text-align:left">(선택 사항) 클라이언트 인증서 파일의 경로입니다. 단방향 암호화로 작업하기</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="connect">예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">데이터베이스 만들기<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 데이터베이스 만들기</p>
<p><h3 id="create-database">구문</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[필수] 밀버스 단위의 데이터베이스 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예제에서는 밀버스에서 <code translate="no">testdb</code> 데이터베이스를 만듭니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">데이터베이스 사용<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 데이터베이스 사용</p>
<p><h3 id="use-database">구문</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[필수] 밀버스 단위의 데이터베이스 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예에서는 밀버스에서 <code translate="no">testdb</code> 데이터베이스를 사용합니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">데이터베이스 목록<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 데이터베이스 나열</p>
<p><h3 id="list-database">구문</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예제는 밀버스로 데이터베이스를 나열합니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">데이터베이스 삭제<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 데이터베이스 삭제</p>
<p><h3 id="delete-database">구문</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[필수] 밀버스 단위의 데이터베이스 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예제는 밀버스에서 <code translate="no">testdb</code> 데이터베이스를 삭제합니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">사용자 만들기<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 사용자 만들기</p>
<p><h3 id="create-user">구문</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-password</td><td style="text-align:left">밀버스 단위의 사용자 비밀번호입니다. 기본값은 "없음"입니다.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-username</td><td style="text-align:left">밀버스 단위의 사용자 이름입니다. 기본값은 "없음"입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예에서는 밀버스에서 <code translate="no">zilliz</code> 사용자 및 <code translate="no">zilliz</code> 비밀번호를 만듭니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">역할 만들기<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 역할 만들기</p>
<p><h3 id="create-role">구문</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-역할 이름</td><td style="text-align:left">밀버스 역할의 역할 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><h4 id="Example-1" class="common-anchor-header">예제 1</h4><p>다음 예에서는 밀버스에서 <code translate="no">role1</code> 역할을 만듭니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">별칭 만들기<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 고유한 별칭을 지정합니다.</p>
<div class="alert note">컬렉션에는 여러 개의 별칭을 가질 수 있습니다. 그러나 별칭은 최대 하나의 컬렉션에 해당합니다.</div>
<p><h3 id="create-alias">구문</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-별칭 이름</td><td style="text-align:left">별칭입니다.</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(선택 사항) 별칭을 지정된 컬렉션으로 전송하려면 플래그를 지정합니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">예제</h3></p>
<p><h4>예제 1</h4></p>
<p>다음 예에서는 <code translate="no">car</code> 컬렉션에 대한 <code translate="no">carAlias1</code> 및 <code translate="no">carAlias2</code> 별칭을 만듭니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>예 2</h4></p>
<div class="alert note">예 2는 예 1을 기반으로 합니다.</div>
<p>다음 예는 <code translate="no">car</code> 컬렉션에서 <code translate="no">car2</code> 컬렉션으로 <code translate="no">carAlias1</code> 별칭을 전송하는 예제입니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">컬렉션 만들기<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 만듭니다.</p>
<p><h3 id="create-collection">구문</h3></p>
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">대화형 예</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name: color
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: color field
Nullable [False]: False
Default value (type: INT64) [Not set]: 0

Do you want to add embedding function? [y/N]: n
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">create partition<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션을 만듭니다.</p>
<p><h3 id="creat-partition">구문</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">파티션 이름입니다.</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-description</td><td style="text-align:left">(선택 사항) 파티션에 대한 설명입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">create index<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>필드에 대한 인덱스를 만듭니다.</p>
<div class="alert note"> 현재 컬렉션은 최대 하나의 인덱스만 지원합니다.</div>
<p><h3 id="creat-index">구문</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">대화형 예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">delete user<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자를 삭제합니다.</p>
<h3 id="Syntax" class="common-anchor-header">구문</h3><pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-사용자 이름</td><td style="text-align:left">사용자 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">예제</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">삭제 역할<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 역할 삭제</p>
<p><h3 id="delete-role">구문</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-역할 이름</td><td style="text-align:left">밀버스 역할의 역할 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><p>다음 예에서는 밀버스에서 <code translate="no">role1</code> 역할을 삭제합니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">별칭 삭제<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>별칭을 삭제합니다.</p>
<p><h3 id="delete-alias">구문</h3></p>
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-별칭 이름</td><td style="text-align:left">별칭입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">컬렉션 삭제<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 삭제합니다.</p>
<p><h3 id="delete-collection">구문</h3></p>
<pre><code translate="no" class="language-shell">delete collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">삭제할 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">delete entities<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티를 삭제합니다.</p>
<p><h3 id="delete-entities">구문</h3></p>
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">삭제할 엔터티가 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(선택 사항) 삭제할 파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">예제</h3></p>
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">삭제 파티션<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션을 삭제합니다.</p>
<p><h3 id="delete-partition">구문</h3></p>
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">삭제할 파티션이 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">삭제할 파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">삭제 인덱스<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스와 해당 인덱스 파일을 삭제합니다.</p>
<div class="alert note"> 현재 컬렉션은 최대 하나의 인덱스만 지원합니다.</div>
<p><h3 id="delete-index">구문</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-인덱스 이름</td><td style="text-align:left">인덱스 이름의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 >예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">부여 역할<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자에게 역할 부여</p>
<p><h3 id="grant-user">구문</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-역할 이름</td><td style="text-align:left">밀버스 역할의 역할 이름입니다.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-사용자 이름</td><td style="text-align:left">밀버스 사용자의 사용자 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 >예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">부여 권한<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>역할에 권한을 할당합니다.</p>
<p><h3 id="assign-privilege">구문</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">대화형 예</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">역할 해지<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자에게 할당된 역할을 해지합니다.</p>
<p><h3 id="grant-user">구문</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-역할 이름</td><td style="text-align:left">밀버스 역할의 역할 이름입니다.</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-사용자 이름</td><td style="text-align:left">밀버스 사용자의 사용자 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 >예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">revoke privilege<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>역할에 이미 할당된 권한을 취소합니다.</p>
<p><h3 id="revoke-privilege">구문</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">대화형 예</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">컬렉션 표시<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 자세한 정보를 표시합니다.</p>
<p><h3 id="show-collection">구문</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3>예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">show partition<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>파티션의 자세한 정보를 표시합니다.</p>
<p><h3 id="show-partition">구문</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">파티션이 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3>예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">show index<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스의 상세 정보를 표시합니다.</p>
<p><h3 id="show-index">구문</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-인덱스 이름</td><td style="text-align:left">인덱스의 이름입니다.</td></tr>
</tbody>
</table>
<p>| --help | N/A | 명령 사용에 대한 도움말을 표시합니다. |</p>
<p><h3 >예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">exit<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>명령줄 창을 닫습니다.</p>
<p><h3 id="exit">구문</h3></p>
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">help<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>명령 사용에 대한 도움말을 표시합니다.</p>
<p><h3 id="help">구문</h3></p>
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">명령</h3></p>
<table>
<thead>
<tr><th style="text-align:left">명령</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">clear</td><td style="text-align:left">화면을 지웁니다.</td></tr>
<tr><td style="text-align:left">연결</td><td style="text-align:left">밀버스에 연결합니다.</td></tr>
<tr><td style="text-align:left">create</td><td style="text-align:left">컬렉션, 데이터베이스, 파티션, 사용자, 역할 및 인덱스를 생성합니다.</td></tr>
<tr><td style="text-align:left">부여</td><td style="text-align:left">역할, 권한을 부여합니다.</td></tr>
<tr><td style="text-align:left">revoke</td><td style="text-align:left">역할, 권한을 취소합니다.</td></tr>
<tr><td style="text-align:left">삭제</td><td style="text-align:left">컬렉션, 데이터베이스, 파티션, 별칭, 사용자, 역할 또는 인덱스를 삭제합니다.</td></tr>
<tr><td style="text-align:left">exit</td><td style="text-align:left">명령줄 창을 닫습니다.</td></tr>
<tr><td style="text-align:left">도움말</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
<tr><td style="text-align:left">insert</td><td style="text-align:left">데이터를 파티션으로 가져옵니다.</td></tr>
<tr><td style="text-align:left">목록</td><td style="text-align:left">컬렉션, 데이터베이스, 파티션, 사용자, 역할, 권한 또는 인덱스를 나열합니다.</td></tr>
<tr><td style="text-align:left">load</td><td style="text-align:left">컬렉션 또는 파티션을 로드합니다.</td></tr>
<tr><td style="text-align:left">쿼리</td><td style="text-align:left">입력한 모든 조건과 일치하는 쿼리 결과를 표시합니다.</td></tr>
<tr><td style="text-align:left">release</td><td style="text-align:left">컬렉션 또는 파티션을 해제합니다.</td></tr>
<tr><td style="text-align:left">검색</td><td style="text-align:left">벡터 유사도 검색 또는 하이브리드 검색을 수행합니다.</td></tr>
<tr><td style="text-align:left">show</td><td style="text-align:left">연결, 데이터베이스, 컬렉션, 로딩 진행률 또는 인덱스 진행률을 표시합니다.</td></tr>
<tr><td style="text-align:left">이름 바꾸기</td><td style="text-align:left">컬렉션 이름 바꾸기</td></tr>
<tr><td style="text-align:left">사용</td><td style="text-align:left">데이터베이스 사용</td></tr>
<tr><td style="text-align:left">버전</td><td style="text-align:left">Milvus_CLI의 버전을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="insert" class="common-anchor-header">삽입<button data-href="#insert" class="anchor-icon" translate="no">
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
    </button></h2><p>로컬 또는 원격 데이터를 파티션으로 가져옵니다.</p>
<p><h3 id="insert">구문</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">데이터가 삽입되는 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(선택 사항) 데이터를 삽입할 파티션의 이름입니다. 이 파티션 옵션을 전달하지 않으면 "_기본" 파티션을 선택하게 됩니다.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-타임아웃</td><td style="text-align:left">(선택 사항) RPC를 허용할 시간(초)(선택 사항)입니다. 시간 제한을 설정하지 않으면 클라이언트는 서버가 응답하거나 오류가 발생할 때까지 계속 대기합니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<p><h3 id="insert">예제 1</h3>
다음 예는 로컬 CSV 파일을 가져옵니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;examples/import_csv/vectors.csv&#x27;

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">예 2</h3>
다음 예는 원격 CSV 파일을 가져옵니다.</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="insert-row" class="common-anchor-header">insert row<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션에 데이터 행을 삽입합니다.</p>
<p><h3 id="insert-row">구문</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">대화형 예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">사용자 목록<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 사용자를 나열합니다.</p>
<h3 id="Syntax" class="common-anchor-header">구문</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><p>| 옵션 | 전체 이름 | 설명 | --help | n/a | 명령 사용에 대한 도움말을 표시합니다. |</p>
<h2 id="List-roles" class="common-anchor-header">역할 나열<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 역할 나열</p>
<p><h3 id="list-role">구문</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">보조금 목록<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>밀버스에서 보조금을 나열합니다.</p>
<h3 id="Options" class="common-anchor-header">옵션</h3><table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-역할 이름</td><td style="text-align:left">밀버스 역할의 역할 이름입니다.</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-objectName</td><td style="text-align:left">밀버스 오브젝트의 오브젝트 이름입니다.</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-objectType</td><td style="text-align:left">전역, 컬렉션 또는 사용자.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">예제</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">목록 컬렉션<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 컬렉션을 나열합니다.</p>
<p><h3 id="list-collections">구문<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">옵션<h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">인덱스 목록<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 모든 인덱스를 나열합니다.</p>
<div class="alert note"> 현재 컬렉션은 최대 하나의 인덱스만 지원합니다. </div>
<p><h3 id="list-indexes">구문</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">파티션 목록<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션의 모든 파티션을 나열합니다.</p>
<p><h3 id="list-partitions">구문</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">load<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 또는 파티션을 하드 드라이브 공간에서 RAM으로 로드합니다.</p>
<p><h3 id="load">구문</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">파티션이 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(선택 사항/복수) 파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">쿼리<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>입력한 모든 조건과 일치하는 쿼리 결과를 표시합니다.</p>
<p><h3 id="query">구문</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">대화형 예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">release<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 또는 파티션을 RAM에서 해제합니다.</p>
<p><h3 id="release">구문</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">파티션이 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(선택 사항/복수) 파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">검색<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터 유사도 검색 또는 하이브리드 검색을 수행합니다.</p>
<p><h3 id="search">구문</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">대화형 예제</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field&#x27;s of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe&#x27;s value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to search (split by &quot;,&quot; if multiple) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connection" class="common-anchor-header">연결 목록<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>연결을 나열합니다.</p>
<p><h3 id="show-connection">구문</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">show index_progress<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>엔티티 인덱싱 진행률을 표시합니다.</p>
<p><h3 id="show-index-progress">구문</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">엔티티가 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-index</td><td style="text-align:left">(선택 사항) 인덱스의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">show loading_progress<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 로딩 진행률을 표시합니다.</p>
<p><h3 id="show-loading-progress">구문</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-컬렉션 이름</td><td style="text-align:left">엔티티가 속한 컬렉션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-partition</td><td style="text-align:left">(선택 사항/복수) 로딩 파티션의 이름입니다.</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">version<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus_CLI의 버전을 표시합니다.</p>
<p><h3 id="version">구문</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">옵션</h3></p>
<table>
<thead>
<tr><th style="text-align:left">옵션</th><th style="text-align:left">전체 이름</th><th style="text-align:left">설명</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">명령 사용에 대한 도움말을 표시합니다.</td></tr>
</tbody>
</table>
<div class="alert note"> 다음 예제와 같이 셸에서 Milvus_CLI의 버전을 확인할 수도 있습니다. 이 경우 <code translate="no">milvus_cli --version</code> 이 명령으로 작동합니다.</div>
<p><h3 id="version">예제</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
