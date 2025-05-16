---
id: aws_layer7.md
title: AWS에서 Milvus용 레이어 7 로드밸런서 설정하기
related_key: cluster
summary: AWS의 Layer-7 로드 밸런서 뒤에 Milvus 클러스터를 배포하는 방법을 알아보세요.
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">AWS에서 Milvus용 레이어 7 로드 밸런서 설정하기<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>레이어 4 로드 밸런서와 비교할 때, 레이어 7 로드 밸런서는 스마트한 로드 밸런싱 및 캐싱 기능을 제공하며 클라우드 네이티브 서비스에 적합한 선택입니다.</p>
<p>이 가이드에서는 이미 레이어 4 로드 밸런서 뒤에서 실행 중인 Milvus 클러스터를 위한 레이어 7 로드 밸런서 설정 방법을 안내합니다.</p>
<h3 id="Before-your-start" class="common-anchor-header">시작하기 전</h3><ul>
<li><a href="/docs/ko/v2.4.x/eks.md">AWS의 레이어 4 로드 밸런서 뒤에 Milvus 클러스터를 배포했습니다</a>.</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">Milvus 구성 조정</h3><p>이 가이드에서는 <a href="/docs/ko/v2.4.x/eks.md">AWS의 Layer-4 로드 밸런서 뒤에 Milvus 클러스터를</a> 이미 <a href="/docs/ko/v2.4.x/eks.md">배포했다고</a> 가정합니다.</p>
<p>이 Milvus 클러스터에 대해 레이어 7 로드 밸런서를 설정하기 전에 다음 명령을 실행하여 레이어 4 로드 밸런서를 제거하세요.</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">TLS 인증서 준비</h3><p>TLS가 작동하려면 인증서가 필요합니다. <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM을</a> 사용하여 인증서를 관리하고 있으므로 기존 인증서를 ACM으로 가져와야 합니다. <a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">인증서 가져오기를</a> 참조하세요. 다음은 예시입니다.</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">인그레스를 생성하여 레이어 7 로드 밸런서 생성하기</h3><p>다음과 같이 인그레스 파일을 준비하고 이름을 <code translate="no">ingress.yaml</code> 로 지정합니다. <strong>인증서 arn과 호스트를 자신의 인증서로 바꾸세요.</strong></p>
<pre><code translate="no" class="language-yaml">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: milvus
  name: milvus-demo
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/backend-protocol-version: GRPC
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: <span class="hljs-string">&#x27;[{&quot;HTTPS&quot;:443}]&#x27;</span>
    alb.ingress.kubernetes.io/certificate-arn: <span class="hljs-string">&quot;arn:aws:acm:region:account-id:certificate/certificate-id&quot;</span>

spec:
  ingressClassName: alb
  rules:
    - host: milvus-demo.milvus.io
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: milvus-demo
              port:
                number: 19530
<button class="copy-code-btn"></button></code></pre>
<p>그런 다음 파일을 EKS 클러스터에 적용하여 인그레스를 생성할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>이제 AWS가 레이어 7 로드 밸런서를 설정할 때까지 기다립니다. 다음을 실행하여 진행 상황을 확인할 수 있습니다.</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 비슷해야 합니다:</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p><strong>주소</strong> 필드에 주소가 표시되면 Layer-7 로드 밸런서를 사용할 준비가 된 것입니다.</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">Layer-7 로드 밸런서를 통한 연결 확인<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 PyMilvus를 사용하여 방금 만든 Layer-7 로드 밸런서 뒤에 있는 Milvus 서비스에 대한 연결을 확인합니다. 자세한 단계는 <a href="https://milvus.io/docs/v2.3.x/example_code.md">여기를 참조하세요</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    FieldSchema,
    CollectionSchema,
    DataType,
    Collection,
)

connections.connect(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com&quot;</span>, port=<span class="hljs-string">&quot;443&quot;</span>, secure=<span class="hljs-literal">True</span>, server_name=<span class="hljs-string">&quot;milvus-demo.milvus.io&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><strong>호스트와</strong> <strong>server_name은</strong> 사용자 <strong>이름으로</strong> 바꿔야 합니다.</li>
<li>도메인 네임을 앨범에 매핑하도록 DNS 레코드를 설정한 경우 <strong>호스트는</strong> 도메인 네임으로 바꾸고 <strong>server_name은</strong> 생략하세요.</li>
</ul>
</div>
