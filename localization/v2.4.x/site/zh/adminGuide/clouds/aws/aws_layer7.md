---
id: aws_layer7.md
title: 在 AWS 上为 Milvus 设置七层负载平衡器
related_key: cluster
summary: 了解如何在 AWS 上的第 7 层负载平衡器后面部署 Milvus 集群。
---
<h1 id="Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="common-anchor-header">在 AWS 上为 Milvus 设置第 7 层负载平衡器<button data-href="#Set-up-a-Layer-7-Load-Balancer-for-Milvus-on-AWS" class="anchor-icon" translate="no">
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
    </button></h1><p>与第四层负载平衡器相比，第七层负载平衡器具有智能负载平衡和缓存功能，是云原生服务的最佳选择。</p>
<p>本指南将指导您为已在第 4 层负载平衡器后面运行的 Milvus 集群设置第 7 层负载平衡器。</p>
<h3 id="Before-your-start" class="common-anchor-header">开始之前</h3><ul>
<li>您已<a href="/docs/zh/v2.4.x/eks.md">在 AWS 上的第 4 层负载平衡器后面部署了一个 Milvus 群集</a>。</li>
</ul>
<h3 id="Tweak-Milvus-configurations" class="common-anchor-header">调整 Milvus 配置</h3><p>本指南假定您已<a href="/docs/zh/v2.4.x/eks.md">在 AWS 的第 4 层负载平衡器后面部署了 Milvus 群集</a>。</p>
<p>在为该 Milvus 群集设置第 7 层负载平衡器之前，请运行以下命令移除第 4 层负载平衡器。</p>
<pre><code translate="no" class="language-bash">helm upgrade milvus-demo milvus/milvus -n milvus --<span class="hljs-built_in">set</span> service.<span class="hljs-built_in">type</span>=ClusterIP
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-TLS-certificates" class="common-anchor-header">准备 TLS 证书</h3><p>TLS 需要证书才能工作。我们使用<a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">ACM</a>管理证书，因此需要将现有证书导入 ACM。请参阅<a href="https://docs.aws.amazon.com/acm/latest/userguide/import-certificate-api-cli.html#import-certificate-api">导入证书</a>。下面是一个示例。</p>
<pre><code translate="no" class="language-bash"># If the <span class="hljs-keyword">import</span>-certificate command is successful, it returns the arn of the imported certificate.
aws acm <span class="hljs-keyword">import</span>-certificate --certificate fileb:<span class="hljs-comment">//Certificate.pem \</span>
      --certificate-chain fileb:<span class="hljs-comment">//CertificateChain.pem \</span>
      --private-key fileb:<span class="hljs-comment">//PrivateKey.pem  </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-an-Ingress-to-generate-a-Layer-7-Load-Balancer" class="common-anchor-header">创建入口以生成第 7 层负载平衡器</h3><p>按以下步骤准备输入文件，并将其命名为<code translate="no">ingress.yaml</code> 。<strong>将证书 arn 和 host 替换为您自己的。</strong></p>
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
<p>然后，将该文件应用于 EKS 群集，即可创建 Ingress。</p>
<pre><code translate="no" class="language-bash">kubectl apply -f ingress.yaml
<button class="copy-code-btn"></button></code></pre>
<p>现在，等待 AWS 设置第 7 层负载平衡器。您可以运行</p>
<pre><code translate="no" class="language-bash">kubectl -f ingress.yaml <span class="hljs-keyword">get</span> -w
<button class="copy-code-btn"></button></code></pre>
<p>输出结果应与下图类似：</p>
<pre><code translate="no" class="language-shell">NAME          CLASS   HOSTS                   ADDRESS                                                                PORTS   AGE
milvus-demo   alb     milvus-demo.milvus.io   k8s-milvus-milvusde-2f72215c02-778371620.us-east-2.elb.amazonaws.com   80      10m
<button class="copy-code-btn"></button></code></pre>
<p>一旦<strong>ADDRESS</strong>字段中显示地址，Layer-7 负载平衡器就可以使用了。</p>
<h2 id="Verify-the-connection-through-the-Layer-7-load-balancer" class="common-anchor-header">验证通过 Layer-7 负载平衡器的连接<button data-href="#Verify-the-connection-through-the-Layer-7-load-balancer" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南使用 PyMilvus 来验证与我们刚刚创建的 Layer-7 负载平衡器后面的 Milvus 服务的连接。有关详细步骤，请<a href="https://milvus.io/docs/v2.3.x/example_code.md">阅读此文</a>。</p>
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
<li><strong>host</strong>和<strong>server_name</strong>应替换为您自己的<strong>名称</strong>。</li>
<li>如果已设置 DNS 记录将域名映射到 alb，请将<strong>host</strong>替换为域名，省略<strong>server_name</strong>。</li>
</ul>
</div>
