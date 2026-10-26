---
id: eks.md
title: 在 EKS 上部署 Milvus 集群
related_key: cluster
summary: 了解如何在 EKS 上部署 Milvus 集群
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">在 EKS 上部署 Milvus 集群<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍了如何在<a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a> 上部署 Milvus 集群。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>您已在本地计算机或 Amazon EC2 上安装了 AWS CLI，该设备将作为执行本文所述操作的端点。对于 Amazon Linux 2 或 Amazon Linux 2023，AWS CLI 工具已预装。若要在本地计算机上安装 AWS CLI，请参阅<a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">《如何安装 AWS CLI》</a>。</li>
<li>您已在首选的端点设备上安装了 Kubernetes 和 EKS 工具，包括：
<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>已正确授予 AWS IAM 权限。您所使用的 IAM 安全主体必须具备使用 Amazon EKS IAM 角色、服务相关角色、AWS CloudFormation、VPC 及其他其他相关资源的权限。您可以通过以下任一方式为您的安全主体授予相应权限。
<ul>
<li>（不推荐）只需将您所使用的用户/角色的关联策略设置为 AWS 托管策略<code translate="no">AdministratorAccess</code> 。</li>
<li>(强烈建议) 为遵循最小权限原则，请按以下步骤操作：
<ul>
<li><p>要为<code translate="no">eksctl</code> 配置权限，请参阅《<a href="https://eksctl.io/usage/minimum-iam-policies/"> <code translate="no">eksctl</code> 的最低权限</a>》。</p></li>
<li><p>要配置创建/删除 AWS S3 存储桶的权限，请参考以下权限设置：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;S3BucketManagement&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;s3:CreateBucket&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;s3:PutBucketAcl&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;s3:PutBucketOwnershipControls&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;s3:DeleteBucket&quot;</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;arn:aws:s3:::milvus-bucket-*&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>要设置创建/删除 IAM 策略的权限，请参考以下权限设置。请将<code translate="no">YOUR_ACCOUNT_ID</code> 替换为您自己的。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2012-10-17&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Statement&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Sid&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;IAMPolicyManagement&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Effect&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Allow&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Action&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;iam:CreatePolicy&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;iam:DeletePolicy&quot;</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Resource&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;arn:aws:iam::YOUR_ACCOUNT_ID:policy/MilvusS3ReadWrite&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>    
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ul></li>
</ul>
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">配置 AWS 资源<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以通过 AWS 管理控制台、AWS CLI 或 Terraform 等 IaC 工具来配置所需的 AWS 资源，包括 AWS S3 存储桶和 EKS 集群。本文中，建议使用 AWS CLI 来演示如何配置 AWS 资源。</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">创建 Amazon S3 存储桶<button data-href="#Create-an-Amazon-S3-Bucket" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>创建一个 AWS S3 存储桶。</p>
<p>请阅读《<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">存储桶命名规则</a>》，并在为您的 AWS S3 存储桶命名时遵守相关规则。</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=&quot;milvus-bucket-$(openssl rand -hex 12)&quot;

aws s3api create-bucket --bucket &quot;$milvus_bucket_name&quot; --region &#x27;us-east-2&#x27; --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=&#x27;us-east-2&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span></span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>为上述创建的存储桶创建一个用于读取和写入对象的 IAM 策略。<strong>请将存储桶名称替换为您自己的。</strong></p>
<pre><code translate="no" class="language-shell">echo &#x27;{
  &quot;Version&quot;: &quot;2012-10-17&quot;,
  &quot;Statement&quot;: [
    {
      &quot;Effect&quot;: &quot;Allow&quot;,
      &quot;Action&quot;: [
        &quot;s3:GetObject&quot;,
        &quot;s3:PutObject&quot;,
        &quot;s3:ListBucket&quot;,
        &quot;s3:DeleteObject&quot;
      ],
      &quot;Resource&quot;: [
        &quot;arn:aws:s3:::&lt;bucket-name&gt;&quot;,
        &quot;arn:aws:s3:::&lt;bucket-name&gt;/*&quot;
      ]
    }
  ]
}&#x27; &gt; milvus-s3-policy.json

aws iam create-policy --policy-name MilvusS3ReadWrite --policy-document file://milvus-s3-policy.json
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Get the ARN from the <span class="hljs-built_in">command</span> output as follows:</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;Policy&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;PolicyName&quot;</span>: <span class="hljs-string">&quot;MilvusS3ReadWrite&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;PolicyId&quot;</span>: <span class="hljs-string">&quot;AN5QQVVPM1BVTFlBNkdZT&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;Arn&quot;</span>: <span class="hljs-string">&quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;Path&quot;</span>: <span class="hljs-string">&quot;/&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;DefaultVersionId&quot;</span>: <span class="hljs-string">&quot;v1&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;AttachmentCount&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;PermissionsBoundaryUsageCount&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;IsAttachable&quot;</span>: <span class="hljs-literal">true</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;CreateDate&quot;</span>: <span class="hljs-string">&quot;2023-11-16T06:00:01+00:00&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">       <span class="hljs-string">&quot;UpdateDate&quot;</span>: <span class="hljs-string">&quot;2023-11-16T06:00:01+00:00&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>    
<button class="copy-code-btn"></button></code></pre></li>
<li><p>将该策略关联到您的 AWS 用户。</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">创建 Amazon EKS 集群<button data-href="#Create-an-Amazon-EKS-Cluster" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>按以下内容准备一个集群配置文件，并将其命名为<code translate="no">eks_cluster.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">eksctl.io/v1alpha5</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">ClusterConfig</span>

<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
  <span class="hljs-attr">region:</span> <span class="hljs-string">&#x27;us-east-2&#x27;</span>
  <span class="hljs-attr">version:</span> <span class="hljs-string">&quot;1.27&quot;</span>

<span class="hljs-attr">iam:</span>
  <span class="hljs-attr">withOIDC:</span> <span class="hljs-literal">true</span>

  <span class="hljs-attr">serviceAccounts:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">metadata:</span>
      <span class="hljs-attr">name:</span> <span class="hljs-string">aws-load-balancer-controller</span>
      <span class="hljs-attr">namespace:</span> <span class="hljs-string">kube-system</span>
    <span class="hljs-attr">wellKnownPolicies:</span>
      <span class="hljs-attr">awsLoadBalancerController:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">managedNodeGroups:</span>
  <span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">milvus-node-group</span>
    <span class="hljs-attr">labels:</span> { <span class="hljs-attr">role:</span> <span class="hljs-string">milvus</span> }
    <span class="hljs-attr">instanceType:</span> <span class="hljs-string">m6i.4xlarge</span>
    <span class="hljs-attr">desiredCapacity:</span> <span class="hljs-number">3</span>
    <span class="hljs-attr">privateNetworking:</span> <span class="hljs-literal">true</span>
    
<span class="hljs-attr">addons:</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">vpc-cni</span>
  <span class="hljs-attr">version:</span> <span class="hljs-string">latest</span>
  <span class="hljs-attr">attachPolicyARNs:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">coredns</span>
  <span class="hljs-attr">version:</span> <span class="hljs-string">latest</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">kube-proxy</span>
  <span class="hljs-attr">version:</span> <span class="hljs-string">latest</span>
<span class="hljs-bullet">-</span> <span class="hljs-attr">name:</span> <span class="hljs-string">aws-ebs-csi-driver</span>
  <span class="hljs-attr">version:</span> <span class="hljs-string">latest</span>
  <span class="hljs-attr">wellKnownPolicies:</span>
    <span class="hljs-attr">ebsCSIController:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>运行以下命令以创建 EKS 集群。</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>获取 kubeconfig 文件。</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>验证 EKS 集群。</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl get nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">创建一个 StorageClass<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用<code translate="no">etcd</code> 作为元数据存储，并需要依赖<code translate="no">gp3</code> StorageClass 来创建和管理 PVC。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">cat</span> <span class="hljs-string">&lt;&lt;EOF</span> <span class="hljs-string">|</span> <span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-bullet">-</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">storage.k8s.io/v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">StorageClass</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">ebs-gp3-sc</span>
  <span class="hljs-attr">annotations:</span>
    <span class="hljs-attr">storageclass.kubernetes.io/is-default-class:</span> <span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attr">provisioner:</span> <span class="hljs-string">ebs.csi.aws.com</span>
<span class="hljs-attr">volumeBindingMode:</span> <span class="hljs-string">WaitForFirstConsumer</span>
<span class="hljs-attr">parameters:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">gp3</span>
<span class="hljs-string">EOF</span>
<button class="copy-code-btn"></button></code></pre>
<p>将原始的 gp2 存储类设置为非默认值。</p>
<pre><code translate="no" class="language-shell">kubectl patch storageclass gp2 -p &#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">安装 AWS LoadBalancer Controller<button data-href="#Install-AWS-LoadBalancer-Controller" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>添加 Helm 仓库。</p>
<pre><code translate="no" class="language-shell">helm repo add eks https://aws.github.io/eks-charts
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安装 AWS 负载均衡控制器。</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=&#x27;milvus-eks-cluster&#x27; \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>验证安装情况</p>
<pre><code translate="no" class="language-shell">kubectl get deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">部署 Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>在本指南中，我们将使用 Milvus Helm Charts 来部署一个 Milvus 集群。您<a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">可以在此处</a>找到这些 Charts。</p>
<ul>
<li><p>添加 Milvus Helm Charts 仓库。</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>准备 Milvus 配置文件<code translate="no">milvus.yaml</code> ，并将<code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> 替换为您自己的值。</p>
<p><div class="alert note"></p>
<ul>
<li>若要为您的 Milvus 配置高可用性（HA），请参考<a href="https://milvus.io/tools/sizing/">此计算器</a>获取更多信息。您可以直接从计算器下载相关配置，并应删除与 MinIO 相关的配置。</li>
<li>若要实现协调器的多副本部署，请将<code translate="no">xxCoordinator.activeStandby.enabled</code> 设置为<code translate="no">true</code> 。</li>
</ul>
<p></div></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">cluster:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>

<span class="hljs-attr">service:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">LoadBalancer</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">19530</span>
  <span class="hljs-attr">annotations:</span> 
    <span class="hljs-attr">service.beta.kubernetes.io/aws-load-balancer-type:</span> <span class="hljs-string">external</span>
    <span class="hljs-attr">service.beta.kubernetes.io/aws-load-balancer-name:</span> <span class="hljs-string">milvus-service</span>
    <span class="hljs-attr">service.beta.kubernetes.io/aws-load-balancer-scheme:</span> <span class="hljs-string">internet-facing</span>
    <span class="hljs-attr">service.beta.kubernetes.io/aws-load-balancer-nlb-target-type:</span> <span class="hljs-string">ip</span>

<span class="hljs-attr">minio:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">false</span>

<span class="hljs-attr">externalS3:</span>
  <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">host:</span> <span class="hljs-string">&quot;s3.us-east-2.amazonaws.com&quot;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-string">&quot;443&quot;</span>
  <span class="hljs-attr">useSSL:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">bucketName:</span> <span class="hljs-string">&quot;&lt;bucket-name&gt;&quot;</span>
  <span class="hljs-attr">useIAM:</span> <span class="hljs-literal">false</span>
  <span class="hljs-attr">cloudProvider:</span> <span class="hljs-string">&quot;aws&quot;</span>
  <span class="hljs-attr">iamEndpoint:</span> <span class="hljs-string">&quot;&quot;</span>
  <span class="hljs-attr">accessKey:</span> <span class="hljs-string">&quot;&lt;s3-access-key&gt;&quot;</span>
  <span class="hljs-attr">secretKey:</span> <span class="hljs-string">&quot;&lt;s3-secret-key&gt;&quot;</span>
  <span class="hljs-attr">region:</span> <span class="hljs-string">&quot;us-east-2&quot;</span>

<span class="hljs-comment"># HA Configurations</span>
<span class="hljs-attr">rootCoordinator:</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">resources:</span> 
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">2Gi</span>

<span class="hljs-attr">indexCoordinator:</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">resources:</span> 
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;0.5&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-number">0.</span><span class="hljs-string">5Gi</span>

<span class="hljs-attr">queryCoordinator:</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">resources:</span> 
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;0.5&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-number">0.</span><span class="hljs-string">5Gi</span>

<span class="hljs-attr">dataCoordinator:</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">activeStandby:</span>
    <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
  <span class="hljs-attr">resources:</span> 
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-string">&quot;0.5&quot;</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-number">0.</span><span class="hljs-string">5Gi</span>

<span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">replicas:</span> <span class="hljs-number">2</span>
  <span class="hljs-attr">resources:</span> 
    <span class="hljs-attr">limits:</span>
      <span class="hljs-attr">cpu:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">memory:</span> <span class="hljs-string">2Gi</span>  
<button class="copy-code-btn"></button></code></pre></li>
<li><p>安装 Milvus。</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>等待所有 Pod 状态变为 `<code translate="no">Running</code>`。</p>
<pre><code translate="no" class="language-shell">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm 不支持控制服务创建的顺序。在初期阶段，当<code translate="no">etcd</code> 和<code translate="no">pulsar</code> 尚未就绪时，业务 Pod 重启一两次是正常现象。</p>
<p></div></p></li>
<li><p>获取 Milvus 服务地址。</p>
<pre><code translate="no" class="language-shell">kubectl get svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">验证安装<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以按照下面的简单指南验证安装。更多详细信息，请参阅 pymilvus 存储库中的<a href="https://github.com/milvus-io/pymilvus/tree/master/examples">示例脚本</a>。</p>
<ul>
<li><p>下载示例代码。</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/milvus-io/pymilvus/master/examples/simple.py
<button class="copy-code-btn"></button></code></pre></li>
<li><p>将示例代码中的连接 URI 修改为上述 Milvus 服务地址。</p>
<pre><code translate="no" class="language-python">...
milvus_client = MilvusClient(<span class="hljs-string">&quot;http://milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com:19530&quot;</span>)
...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>运行示例代码。</p>
<pre><code translate="no" class="language-shell">python3 simple.py
<button class="copy-code-btn"></button></code></pre>
<p>该脚本会创建一个名为<code translate="no">hello_milvus</code> 的Collection，插入几行数据，执行若干查询和一次向量搜索，最后删除该Collection。如果脚本执行完成且未出现错误，则说明您的Milvus集群运行正常。</p></li>
</ul>
<h2 id="Clean-up-works" class="common-anchor-header">清理工作<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>若需恢复环境，请卸载 Milvus、销毁 EKS 集群，并删除 AWS S3 存储桶及相关 IAM 策略。</p>
<ul>
<li><p>卸载 Milvus。</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>销毁 EKS 集群。</p>
<pre><code translate="no" class="language-shell">eksctl delete cluster --name milvus-eks-cluster --region us-east-2
<button class="copy-code-btn"></button></code></pre></li>
<li><p>删除 AWS S3 存储桶及相关 IAM 策略。</p>
<p><strong>请将存储桶名称和策略 ARN 替换为您自己的。</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm s3://milvus-bucket-039dd013c0712f085d60e21f --recursive

aws s3api delete-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-2

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;

aws iam delete-policy --policy-arn &#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>如果您想了解如何在其他云平台上部署 Milvus：</p>
<ul>
<li><a href="/docs/zh/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 集群</a></li>
<li><a href="/docs/zh/azure.md">在 Azure 上使用 Kubernetes 部署 Milvus 集群</a></li>
</ul>
