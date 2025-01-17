---
id: troubleshooting.md
summary: Milvus에서 발생할 수 있는 일반적인 문제와 이를 극복하는 방법에 대해 알아보세요.
title: 문제 해결
---
<h1 id="Troubleshooting" class="common-anchor-header">문제 해결<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지에는 Milvus를 실행할 때 발생할 수 있는 일반적인 문제와 가능한 문제 해결 팁이 나열되어 있습니다. 이 페이지의 문제는 다음 범주로 분류됩니다:</p>
<ul>
<li><a href="#boot_issues">부팅 문제</a></li>
<li><a href="#runtime_issues">런타임 문제</a></li>
<li><a href="#api_issues">API 문제</a></li>
<li><a href="#etcd_crash_issues">etcd 충돌 문제</a></li>
</ul>
<h2 id="Boot-issues" class="common-anchor-header">부팅 문제<button data-href="#Boot-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>부팅 오류는 일반적으로 치명적입니다. 다음 명령을 실행하여 오류 세부 정보를 확인하세요:</p>
<pre><code translate="no">$ docker logs &lt;your milvus container <span class="hljs-built_in">id</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Runtime-issues" class="common-anchor-header">런타임 문제<button data-href="#Runtime-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>런타임 중에 발생하는 오류는 서비스 중단을 초래할 수 있습니다. 이 문제를 해결하려면 계속 진행하기 전에 서버와 클라이언트 간의 호환성을 확인하세요.</p>
<h2 id="API-issues" class="common-anchor-header">API 문제<button data-href="#API-issues" class="anchor-icon" translate="no">
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
    </button></h2><p>이러한 문제는 Milvus 서버와 클라이언트 간의 API 메서드 호출 중에 발생합니다. 클라이언트에 동기식 또는 비동기식으로 반환됩니다.</p>
<h2 id="etcd-crash-issues" class="common-anchor-header">etcd 크래시 문제<button data-href="#etcd-crash-issues" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-etcd-pod-pending" class="common-anchor-header">1. etcd 포드 보류 중</h3><p>etcd 클러스터는 기본적으로 pvc를 사용합니다. 쿠버네티스 클러스터에 대해 스토리지클래스를 미리 구성해야 한다.</p>
<h3 id="2-etcd-pod-crash" class="common-anchor-header">2. etcd 파드 크래시</h3><p>etcd 파드가 <code translate="no">Error: bad member ID arg (strconv.ParseUint: parsing &quot;&quot;: invalid syntax), expecting ID in Hex</code> 에서 충돌하는 경우, 이 파드에 로그인하여 <code translate="no">/bitnami/etcd/data/member_id</code> 파일을 삭제할 수 있습니다.</p>
<h3 id="3-Multiple-pods-keep-crashing-while-etcd-0-is-still-running" class="common-anchor-header">3. <code translate="no">etcd-0</code> 가 계속 실행되는 동안 여러 파드가 계속 충돌하는 경우</h3><p><code translate="no">etcd-0</code> 이 계속 실행되는 동안 여러 파드가 계속 충돌하는 경우 다음 코드를 실행할 수 있습니다.</p>
<pre><code translate="no">kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># delete the pvc for etcd-1 and etcd-2</span>
kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="4-All-pods-crash" class="common-anchor-header">4. 모든 파드가 크래시됨</h3><p>모든 파드가 충돌하는 경우, <code translate="no">/bitnami/etcd/data/member/snap/db</code> 파일을 복사해 보세요. <code translate="no">https://github.com/etcd-io/bbolt</code> 을 사용하여 데이터베이스 데이터를 수정합니다.</p>
<p>모든 Milvus 메타데이터는 <code translate="no">key</code> 버킷에 보관됩니다. 이 버킷의 데이터를 백업하고 다음 명령을 실행합니다. <code translate="no">by-dev/meta/session</code> 파일의 접두사 데이터는 백업할 필요가 없다는 점에 유의하세요.</p>
<pre><code translate="no">kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">0</span>
<span class="hljs-comment"># delete the pvc for etcd-0, etcd-1, etcd-2</span>
kubectl kubectl scale sts &lt;etcd-sts&gt; --replicas=<span class="hljs-number">1</span>
<span class="hljs-comment"># restore the backup data</span>
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p>문제 해결에 도움이 필요하시면 언제든지 문의해 주세요:</p>
<ul>
<li><a href="https://discord.com/invite/8uyFbECzPX">Discord 서버에</a> 참여하여 Milvus 팀의 지원을 요청하세요.</li>
<li>문제에 대한 세부 정보가 포함된<a href="https://github.com/milvus-io/milvus/issues/new/choose">이슈를</a> GitHub에 제출하세요.</li>
</ul>
