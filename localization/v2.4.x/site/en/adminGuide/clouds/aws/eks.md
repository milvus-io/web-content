---
id: eks.md
title: Deploy a Milvus Cluster on EKS
related_key: cluster
summary: Learn how to deploy a Milvus cluster on EKS
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">Deploy a Milvus Cluster on EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to deploy a Milvus cluster on <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>You have AWS CLI installed on your local PC or an Amazon EC2, which will serve as your endpoint to do the operations covered in this document. For an Amazon Linux 2 or Amazon Linux 2023, the AWS CLI tools are already installed. To install AWS CLi on your local PC. Refer to <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">How to install AWS CLI</a>.</li>
<li>You have installed Kubernetes and EKS tools installed on the preferred endpoint device, including:
<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>AWS IAM permissions have been granted properly. The IAM security principal you are using must have permission to use Amazon EKS IAM roles, service-related roles, AWS CloudFormation, VPCs, and other related resources. You can follow either of the following ways to grant your principal proper permissions.
<ul>
<li>(Not recommended) Simply set the association policy of the user/role that you used to AWS managed policy <code translate="no">AdministratorAccess</code>.</li>
<li>(Strongly recommended) To implement the principle of least privilege, do as follows:
<ul>
<li><p>To set up permission for <code translate="no">eksctl</code>, refer to <a href="https://eksctl.io/usage/minimum-iam-policies/">Minimum permission for <code translate="no">eksctl</code></a>.</p></li>
<li><p>To set up permission for creating/deleting AWS S3 buckets, refer to the following permission settings:</p>
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
<li><p>To set up permissions for creating/deleting IAM policies, refer to the following permission settings. Do replace <code translate="no">YOUR_ACCOUNT_ID</code> with your own.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">Set up AWS Resources<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>You can set up the required AWS resources, including an AWS S3 bucket and an EKS cluster, using either AWS Management Console, AWS CLI, or IaC tools, such as Terraform. In this document, the AWS CLI is preferred to demonstrate how to set up the AWS resources.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">Create an Amazon S3 Bucket</h3><ul>
<li><p>Create an AWS S3 bucket.</p>
<p>Read <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">Bucket Naming Rules</a> and observe the naming rules when naming your AWS S3 bucket.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=&quot;milvus-bucket-$(openssl rand -hex 12)&quot;

aws s3api create-bucket --bucket &quot;$milvus_bucket_name&quot; --region &#x27;us-east-2&#x27; --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=&#x27;us-east-2&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span></span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Create an IAM policy for reading and writing objects within the bucket created above. <strong>Do replace the bucket name with your own.</strong></p>
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
<li><p>Attach the policy to your AWS User.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Create an Amazon EKS Cluster</h3><ul>
<li><p>Prepare a cluster configuration file as follows and name it <code translate="no">eks_cluster.yaml</code>.</p>
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
<li><p>Run the following command to create an EKS cluster.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Get the kubeconfig file.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verify the EKS cluster.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl get nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">Create a StorageClass<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus uses <code translate="no">etcd</code> as meta storage and needs to rely on the <code translate="no">gp3</code> StorageClass to create and manage PVC.</p>
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
<p>Set the original gp2 StorageClass to non-default.</p>
<pre><code translate="no" class="language-shell">kubectl patch storageclass gp2 -p &#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">Install AWS LoadBalancer Controller</h3><ul>
<li><p>Add Helm chars repo.</p>
<pre><code translate="no" class="language-shell">helm repo add eks https://aws.github.io/eks-charts
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Install the AWS Load Balancer Controller.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=&#x27;milvus-eks-cluster&#x27; \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verify the installation</p>
<pre><code translate="no" class="language-shell">kubectl get deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">Deploy Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In this guide, we will use Milvus Helm Charts to deploy a Milvus cluster. You can find the charts <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">here</a>.</p>
<ul>
<li><p>Add Milvus Helm Chart repo.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Prepare the Milvus configuration file <code translate="no">milvus.yaml</code>, and replace <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> with your own.</p>
<p><div class="alert note"></p>
<ul>
<li>To configure HA for your Milvus, refer to <a href="https://milvus.io/tools/sizing/">this calculator</a> for more information. You can download the related configurations directly from the calculator, and you should remove MinIO-related configurations.</li>
<li>To implement multi-replica deployments of coordinators, set <code translate="no">xxCoordinator.activeStandby.enabled</code> to <code translate="no">true</code>.</li>
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
<li><p>Install Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Wait until all pods are <code translate="no">Running</code>.</p>
<pre><code translate="no" class="language-shell">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm does not support scheduling the order of service creation. It is normal that business pods to restart for one or two times before <code translate="no">etcd</code> and <code translate="no">pulsar</code> are up in the early stage.</p>
<p></div></p></li>
<li><p>Get Milvus service address.</p>
<pre><code translate="no" class="language-shell">kubectl get svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">Verify the installation<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>You can follow the simple guide below to verify the installation. For more details, refer to <a href="https://milvus.io/docs/v2.3.x/example_code.md">this example</a>.</p>
<ul>
<li><p>Download the example code.</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Change the <code translate="no">host</code> argument in the example code to the Milvus service address above.</p></li>
</ul>
<pre><code translate="no">```python
...
connections.connect(&quot;default&quot;, host=&quot;milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com&quot;, port=&quot;19530&quot;)
...
```
</code></pre>
<ul>
<li><p>Run the example code.</p>
<pre><code translate="no" class="language-shell">python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>The output should be similar to the following:</p>
<pre><code translate="no" class="language-shell">=== start connecting to Milvus     ===

Does collection hello_milvus exist in Milvus: False

=== Create collection `hello_milvus` ===


=== Start inserting entities       ===

Number of entities in Milvus: 3000

=== Start Creating index IVF_FLAT  ===


=== Start loading                  ===


=== Start searching based on vector similarity ===

hit: id: 2998, distance: 0.0, entity: {&#x27;random&#x27;: 0.9728033590489911}, random field: 0.9728033590489911
hit: id: 1262, distance: 0.08883658051490784, entity: {&#x27;random&#x27;: 0.2978858685751561}, random field: 0.2978858685751561
hit: id: 1265, distance: 0.09590047597885132, entity: {&#x27;random&#x27;: 0.3042039939240304}, random field: 0.3042039939240304
hit: id: 2999, distance: 0.0, entity: {&#x27;random&#x27;: 0.02316334456872482}, random field: 0.02316334456872482
hit: id: 1580, distance: 0.05628091096878052, entity: {&#x27;random&#x27;: 0.3855988746044062}, random field: 0.3855988746044062
hit: id: 2377, distance: 0.08096685260534286, entity: {&#x27;random&#x27;: 0.8745922204004368}, random field: 0.8745922204004368
search latency = 0.4693s

=== Start querying with `random &gt; 0.5` ===

query result:
-{&#x27;embeddings&#x27;: [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], &#x27;pk&#x27;: &#x27;0&#x27;, &#x27;random&#x27;: 0.6378742006852851}
search latency = 0.9407s
query pagination(limit=4):
        [{&#x27;random&#x27;: 0.6378742006852851, &#x27;pk&#x27;: &#x27;0&#x27;}, {&#x27;random&#x27;: 0.5763523024650556, &#x27;pk&#x27;: &#x27;100&#x27;}, {&#x27;random&#x27;: 0.9425935891639464, &#x27;pk&#x27;: &#x27;1000&#x27;}, {&#x27;random&#x27;: 0.7893211256191387, &#x27;pk&#x27;: &#x27;1001&#x27;}]
query pagination(offset=1, limit=3):
        [{&#x27;random&#x27;: 0.5763523024650556, &#x27;pk&#x27;: &#x27;100&#x27;}, {&#x27;random&#x27;: 0.9425935891639464, &#x27;pk&#x27;: &#x27;1000&#x27;}, {&#x27;random&#x27;: 0.7893211256191387, &#x27;pk&#x27;: &#x27;1001&#x27;}]

=== Start hybrid searching with `random &gt; 0.5` ===

hit: id: 2998, distance: 0.0, entity: {&#x27;random&#x27;: 0.9728033590489911}, random field: 0.9728033590489911
hit: id: 747, distance: 0.14606499671936035, entity: {&#x27;random&#x27;: 0.5648774800635661}, random field: 0.5648774800635661
hit: id: 2527, distance: 0.1530652642250061, entity: {&#x27;random&#x27;: 0.8928974315571507}, random field: 0.8928974315571507
hit: id: 2377, distance: 0.08096685260534286, entity: {&#x27;random&#x27;: 0.8745922204004368}, random field: 0.8745922204004368
hit: id: 2034, distance: 0.20354536175727844, entity: {&#x27;random&#x27;: 0.5526117606328499}, random field: 0.5526117606328499
hit: id: 958, distance: 0.21908017992973328, entity: {&#x27;random&#x27;: 0.6647383716417955}, random field: 0.6647383716417955
search latency = 0.4652s

=== Start deleting with expr `pk in [&quot;0&quot; , &quot;1&quot;]` ===

query before delete by expr=`pk in [&quot;0&quot; , &quot;1&quot;]` -&gt; result:
-{&#x27;random&#x27;: 0.6378742006852851, &#x27;embeddings&#x27;: [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], &#x27;pk&#x27;: &#x27;0&#x27;}
-{&#x27;random&#x27;: 0.43925103574669633, &#x27;embeddings&#x27;: [0.52323616, 0.8035404, 0.77824664, 0.80369574, 0.4914803, 0.8265614, 0.6145269, 0.80234545], &#x27;pk&#x27;: &#x27;1&#x27;}

query after delete by expr=`pk in [&quot;0&quot; , &quot;1&quot;]` -&gt; result: []


=== Drop collection `hello_milvus` ===
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Clean-up-works" class="common-anchor-header">Clean-up works<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>In case you need to restore the environment by uninstalling Milvus, destroying the EKS cluster, and deleting the AWS S3 buckets and related IAM policies.</p>
<ul>
<li><p>Uninstall Milvus.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Destroy the EKS cluster.</p>
<pre><code translate="no" class="language-shell">eksctl delete cluster --name milvus-eks-cluster --region us-east-2
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Delete the AWS S3 bucket and related IAM policies.</p>
<p><strong>You should replace the bucket name and policy ARN with your own.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm s3://milvus-bucket-039dd013c0712f085d60e21f --recursive

aws s3api delete-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-2

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;

aws iam delete-policy --policy-arn &#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>If you want to learn how to deploy Milvus on other clouds:</p>
<ul>
<li><a href="/docs/v2.4.x/gcp.md">Deploy Milvus Cluster on GCP with Kubernetes</a></li>
<li><a href="/docs/v2.4.x/azure.md">Deploy Milvus Cluster on Azure With Kubernetes</a></li>
</ul>
