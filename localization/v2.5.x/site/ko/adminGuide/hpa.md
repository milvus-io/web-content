---
id: hpa.md
related_key: scale Milvus cluster with HPA
summary: Milvus 클러스터를 동적으로 확장하기 위해 수평 파드 자동 확장(HPA)을 구성하는 방법을 알아보세요.
title: Milvus용 수평 파드 자동 확장(HPA) 구성하기
---
<h1 id="Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="common-anchor-header">Milvus용 수평 파드 자동 확장(HPA) 구성하기<button data-href="#Configure-Horizontal-Pod-Autoscaling-HPA-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>수평 파드 오토스케일링(HPA)은 CPU 또는 메모리와 같은 리소스 사용률에 따라 배포의 파드 수를 자동으로 조정하는 쿠버네티스 기능이다. Milvus에서는 <code translate="no">proxy</code>, <code translate="no">queryNode</code>, <code translate="no">dataNode</code>, <code translate="no">indexNode</code> 과 같은 스테이트리스 컴포넌트에 HPA를 적용하여 워크로드 변경에 따라 클러스터를 동적으로 확장할 수 있습니다.</p>
<p>이 가이드에서는 Milvus 오퍼레이터를 사용하여 Milvus 구성 요소에 대한 HPA를 구성하는 방법을 설명합니다.</p>
<h2 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Milvus Operator와 함께 배포된 실행 중인 Milvus 클러스터.</li>
<li>Kubernetes 리소스 관리를 위해 <code translate="no">kubectl</code> 에 액세스.</li>
<li>Milvus 아키텍처 및 Kubernetes HPA에 익숙해야 합니다.</li>
</ul>
<h2 id="Configure-HPA-with-Milvus-Operator" class="common-anchor-header">Milvus Operator로 HPA 구성하기<button data-href="#Configure-HPA-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Operator가 관리하는 Milvus 클러스터에서 HPA를 활성화하려면 다음 단계를 따르세요:</p>
<ol>
<li><p><strong>레플리카를 -1로 설정한다</strong>:</p>
<p>Milvus CR(사용자 지정 리소스)에서 HPA로 확장하려는 구성 요소에 대해 <code translate="no">replicas</code> 필드를 <code translate="no">-1</code> 으로 설정합니다. 이렇게 하면 스케일링 제어가 운영자 대신 HPA에 위임됩니다. CR을 직접 편집하거나 다음 <code translate="no">kubectl patch</code> 명령을 사용하여 HPA 제어로 빠르게 전환할 수 있습니다:</p>
<pre><code translate="no" class="language-bash">kubectl patch milvus &lt;your-release-name&gt; --<span class="hljs-built_in">type</span>=<span class="hljs-string">&#x27;json&#x27;</span> -p=<span class="hljs-string">&#x27;[{&quot;op&quot;: &quot;replace&quot;, &quot;path&quot;: &quot;/spec/components/proxy/replicas&quot;, &quot;value&quot;: -1}]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">&lt;your-release-name&gt;</code> 을 Milvus 클러스터의 이름으로 바꿉니다.</p>
<p>변경 사항이 적용되었는지 확인하려면 실행합니다:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> milvus &lt;your-release-name&gt; -o jsonpath=<span class="hljs-string">&#x27;{.spec.components.proxy.replicas}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>예상 출력은 <code translate="no">-1</code> 으로 <code translate="no">proxy</code> 구성 요소가 이제 HPA 제어를 받는다는 것을 확인합니다.</p>
<p>또는 CR YAML에서 정의할 수도 있습니다:</p>
<pre><code translate="no" class="language-yaml">apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: &lt;your-release-name&gt;
spec:
  mode: cluster
  components:
    proxy:
      replicas: -1
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>HPA 리소스 정의에서 정의할</strong> 수 있습니다:</p>
<p>원하는 구성 요소의 배포를 대상으로 하는 HPA 리소스를 만듭니다. 아래는 <code translate="no">proxy</code> 구성 요소의 예입니다:</p>
<pre><code translate="no" class="language-yaml">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-release-milvus-proxy-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-release-milvus-proxy
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: cpu
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
    - <span class="hljs-built_in">type</span>: Resource
      resource:
        name: memory
        target:
          <span class="hljs-built_in">type</span>: Utilization
          averageUtilization: 60
  behavior:
    scaleUp:
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - <span class="hljs-built_in">type</span>: Pods
          value: 1
          periodSeconds: 60
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">metadata.name</code> 및 <code translate="no">spec.scaleTargetRef.name</code> 에서 <code translate="no">my-release</code> 를 실제 Milvus 클러스터 이름(예: <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 및 <code translate="no">&lt;your-release-name&gt;-milvus-proxy</code>)으로 바꿉니다.</p></li>
<li><p><strong>HPA 구성을 적용합니다</strong>:</p>
<p>다음 명령을 사용하여 HPA 리소스를 배포합니다:</p>
<pre><code translate="no" class="language-bash">kubectl apply -f hpa.yaml
<button class="copy-code-btn"></button></code></pre>
<p>HPA가 성공적으로 생성되었는지 확인하려면 실행합니다:</p>
<pre><code translate="no" class="language-bash">kubectl <span class="hljs-keyword">get</span> hpa
<button class="copy-code-btn"></button></code></pre>
<p>다음과 유사한 출력이 표시되어야 합니다:</p>
<pre><code translate="no">NAME                          REFERENCE                            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
my-release-milvus-proxy-hpa   Deployment/my-release-milvus-proxy   &lt;some&gt;/60%      2         10        2          &lt;time&gt;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">NAME</code> 및 <code translate="no">REFERENCE</code> 필드는 클러스터 이름(예: <code translate="no">&lt;your-release-name&gt;-milvus-proxy-hpa</code> 및 <code translate="no">Deployment/&lt;your-release-name&gt;-milvus-proxy</code>)을 반영합니다.</p></li>
</ol>
<ul>
<li><code translate="no">scaleTargetRef</code>: 확장할 배포를 지정합니다(예: <code translate="no">my-release-milvus-proxy</code>).</li>
<li><code translate="no">minReplicas</code> 및 <code translate="no">maxReplicas</code>: 스케일링 범위를 설정한다(이 예에서는 2~10개의 파드).</li>
<li><code translate="no">metrics</code>: 평균 사용량의 60%를 목표로 CPU 및 메모리 사용량을 기반으로 스케일링을 구성한다.</li>
</ul>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>HPA를 통해 Milvus는 다양한 워크로드에 효율적으로 적응할 수 있습니다. <code translate="no">kubectl patch</code> 명령을 사용하면 전체 CR을 수동으로 편집하지 않고도 컴포넌트를 HPA 제어로 빠르게 전환할 수 있습니다. 자세한 내용은 <a href="https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">쿠버네티스 HPA 설명서를</a> 참조하세요.</p>
