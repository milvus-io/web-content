---
id: eks.md
title: نشر مجموعة Milvus على EKS
related_key: cluster
summary: تعرف على كيفية نشر مجموعة Milvus على EKS
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">نشر مجموعة Milvus على EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية نشر مجموعة Milvus على <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>يجب أن يكون AWS CLI مثبتًا على جهاز الكمبيوتر المحلي الخاص بك أو على Amazon EC2، والذي سيكون بمثابة نقطة النهاية الخاصة بك لتنفيذ العمليات التي يتناولها هذا المستند. بالنسبة لنظامي Amazon Linux 2 أو Amazon Linux 2023، تكون أدوات AWS CLI مثبتة بالفعل. لتثبيت AWS CLI على جهاز الكمبيوتر المحلي الخاص بك، راجع <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">كيفية تثبيت AWS CLI</a>.</li>
<li>يجب أن تكون قد قمت بتثبيت أدوات Kubernetes وEKS على جهاز نقطة النهاية المفضل، بما في ذلك:
<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>تم منح أذونات AWS IAM بشكل صحيح. يجب أن يتمتع الكيان الأمني IAM الذي تستخدمه بأذونات لاستخدام أدوار IAM الخاصة بـ Amazon EKS، والأدوار المتعلقة بالخدمات، وAWS CloudFormation، وشبكات VPC، والموارد الأخرى ذات الصلة. يمكنك اتباع أي من الطرق التالية لمنح الكيان الأمني الخاص بك الأذونات المناسبة.
<ul>
<li>(غير موصى به) ما عليك سوى تعيين سياسة الارتباط الخاصة بالمستخدم/الدور الذي استخدمته إلى السياسة المدارة من AWS <code translate="no">AdministratorAccess</code>.</li>
<li>(موصى به بشدة) لتطبيق مبدأ «أقل امتياز ممكن»، قم بما يلي:
<ul>
<li><p>لإعداد أذونات لـ <code translate="no">eksctl</code> ، راجع <a href="https://eksctl.io/usage/minimum-iam-policies/">«الأذونات الدنيا لـ <code translate="no">eksctl</code></a> ».</p></li>
<li><p>لإعداد أذونات إنشاء/حذف دلاء AWS S3، راجع إعدادات الأذونات التالية:</p>
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
<li><p>لإعداد أذونات إنشاء/حذف سياسات IAM، راجع إعدادات الأذونات التالية. استبدل <code translate="no">YOUR_ACCOUNT_ID</code> بـ الخاص بك.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">إعداد موارد AWS<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إعداد موارد AWS المطلوبة، بما في ذلك حاوية AWS S3 ومجموعة EKS، باستخدام إما AWS Management Console أو AWS CLI أو أدوات IaC، مثل Terraform. في هذا المستند، يُفضل استخدام AWS CLI لتوضيح كيفية إعداد موارد AWS.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">إنشاء دلو Amazon S3<button data-href="#Create-an-Amazon-S3-Bucket" class="anchor-icon" translate="no">
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
<li><p>قم بإنشاء دلو AWS S3.</p>
<p>اقرأ <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">قواعد تسمية سلة التخزين</a> واتبّعها عند تسمية سلة التخزين الخاصة بك في AWS S3.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=&quot;milvus-bucket-$(openssl rand -hex 12)&quot;

aws s3api create-bucket --bucket &quot;$milvus_bucket_name&quot; --region &#x27;us-east-2&#x27; --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=&#x27;us-east-2&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span></span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإنشاء سياسة IAM لقراءة وكتابة الكائنات داخل الحاوية التي تم إنشاؤها أعلاه. <strong>استبدل اسم الحاوية باسمك الخاص.</strong></p>
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
<li><p>اربط السياسة بمستخدم AWS الخاص بك.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">إنشاء مجموعة Amazon EKS<button data-href="#Create-an-Amazon-EKS-Cluster" class="anchor-icon" translate="no">
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
<li><p>قم بإعداد ملف تكوين المجموعة على النحو التالي وقم بتسميته <code translate="no">eks_cluster.yaml</code>.</p>
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
<li><p>قم بتشغيل الأمر التالي لإنشاء مجموعة EKS.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>احصل على ملف kubeconfig.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من مجموعة EKS.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl get nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">إنشاء فئة تخزين (StorageClass)<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>يستخدم Milvus <code translate="no">etcd</code> كمخزن للبيانات الوصفية ويحتاج إلى الاعتماد على فئة التخزين <code translate="no">gp3</code> لإنشاء وإدارة PVC.</p>
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
<p>اضبط فئة التخزين gp2 الأصلية على non-default.</p>
<pre><code translate="no" class="language-shell">kubectl patch storageclass gp2 -p &#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">تثبيت AWS LoadBalancer Controller<button data-href="#Install-AWS-LoadBalancer-Controller" class="anchor-icon" translate="no">
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
<li><p>أضف مستودع Helm chars.</p>
<pre><code translate="no" class="language-shell">helm repo add eks https://aws.github.io/eks-charts
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تثبيت AWS Load Balancer Controller.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=&#x27;milvus-eks-cluster&#x27; \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>تحقق من التثبيت</p>
<pre><code translate="no" class="language-shell">kubectl get deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">نشر Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>في هذا الدليل، سنستخدم مخططات Helm الخاصة بـ Milvus لنشر مجموعة Milvus. يمكنك العثور على المخططات <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">هنا</a>.</p>
<ul>
<li><p>أضف مستودع مخططات Helm الخاصة بـ Milvus.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإعداد ملف تكوين Milvus <code translate="no">milvus.yaml</code> ، واستبدل <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> ببياناتك الخاصة.</p>
<p><div class="alert note"></p>
<ul>
<li>لتكوين التوافر العالي (HA) لـ Milvus الخاص بك، راجع <a href="https://milvus.io/tools/sizing/">هذه الآلة الحاسبة</a> للحصول على مزيد من المعلومات. يمكنك تنزيل التكوينات ذات الصلة مباشرةً من الآلة الحاسبة، ويجب عليك إزالة التكوينات المتعلقة بـ MinIO.</li>
<li>لتنفيذ عمليات نشر متعددة النسخ من المنسقين، اضبط <code translate="no">xxCoordinator.activeStandby.enabled</code> على <code translate="no">true</code>.</li>
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
<li><p>قم بتثبيت Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>انتظر حتى تصبح جميع البودات في حالة " <code translate="no">Running</code>".</p>
<pre><code translate="no" class="language-shell">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>لا يدعم Helm جدولة ترتيب إنشاء الخدمات. ومن الطبيعي أن يتم إعادة تشغيل وحدات البود الخاصة بالأعمال مرة أو مرتين قبل أن تصبح كل من <code translate="no">etcd</code> و <code translate="no">pulsar</code> جاهزة في المرحلة المبكرة.</p>
<p></div></p></li>
<li><p>احصل على عنوان خدمة Milvus.</p>
<pre><code translate="no" class="language-shell">kubectl get svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">تحقق من التثبيت<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك اتباع الدليل البسيط أدناه للتحقق من التثبيت. لمزيد من التفاصيل، راجع <a href="https://github.com/milvus-io/pymilvus/tree/master/examples">البرامج النصية النموذجية</a> في مستودع pymilvus.</p>
<ul>
<li><p>قم بتنزيل الكود النموذجي.</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/milvus-io/pymilvus/master/examples/simple.py
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتغيير عنوان URI للاتصال في الكود النموذجي إلى عنوان خدمة Milvus المذكور أعلاه.</p>
<pre><code translate="no" class="language-python">...
milvus_client = MilvusClient(<span class="hljs-string">&quot;http://milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com:19530&quot;</span>)
...
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بتشغيل الكود النموذجي.</p>
<pre><code translate="no" class="language-shell">python3 simple.py
<button class="copy-code-btn"></button></code></pre>
<p>يقوم البرنامج النصي بإنشاء مجموعة باسم <code translate="no">hello_milvus</code> ، وإدراج بضعة صفوف، وتشغيل عدة استعلامات وبحث متجهي، ثم حذف المجموعة في النهاية. إذا اكتمل ذلك دون أخطاء، فهذا يعني أن مجموعة Milvus الخاصة بك تعمل كما هو متوقع.</p></li>
</ul>
<h2 id="Clean-up-works" class="common-anchor-header">أعمال التنظيف<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>في حالة احتياجك إلى استعادة البيئة عن طريق إلغاء تثبيت Milvus، وإزالة مجموعة EKS، وحذف سلال AWS S3 وسياسات IAM ذات الصلة.</p>
<ul>
<li><p>قم بإلغاء تثبيت Milvus.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>قم بإزالة مجموعة EKS.</p>
<pre><code translate="no" class="language-shell">eksctl delete cluster --name milvus-eks-cluster --region us-east-2
<button class="copy-code-btn"></button></code></pre></li>
<li><p>احذف حاوية AWS S3 وسياسات IAM ذات الصلة.</p>
<p><strong>يجب عليك استبدال اسم الحاوية ورقم تعريف السياسة (ARN) برقمك الخاص.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm s3://milvus-bucket-039dd013c0712f085d60e21f --recursive

aws s3api delete-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-2

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;

aws iam delete-policy --policy-arn &#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">الخطوة التالية<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت ترغب في معرفة كيفية نشر Milvus على سحابات أخرى:</p>
<ul>
<li><a href="/docs/ar/v2.6.x/gcp.md">نشر مجموعة Milvus على GCP باستخدام Kubernetes</a></li>
<li><a href="/docs/ar/v2.6.x/azure.md">نشر مجموعة Milvus على Azure باستخدام Kubernetes</a></li>
</ul>
