---
id: eks.md
title: Развертывание кластера Milvus на EKS
related_key: cluster
summary: 'Узнайте, как развернуть кластер Milvus на EKS.'
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">Развертывание кластера Milvus на EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>В этой теме описывается развертывание кластера Milvus на <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Необходимые условия<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>У вас установлен AWS CLI на локальном компьютере или на Amazon EC2, который будет служить конечной точкой для выполнения операций, описанных в этом документе. Для Amazon Linux 2 или Amazon Linux 2023 инструменты AWS CLI уже установлены. Чтобы установить AWS CLi на локальный компьютер. См. раздел <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">Как установить AWS CLI</a>.</li>
<li>Вы установили Kubernetes и инструменты EKS на предпочтительное устройство конечной точки, в том числе:<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>Разрешения AWS IAM были предоставлены должным образом. У используемого вами принципала безопасности IAM должно быть разрешение на использование ролей Amazon EKS IAM, ролей, связанных с сервисами, AWS CloudFormation, VPC и других соответствующих ресурсов. Вы можете воспользоваться одним из следующих способов предоставления принципалу соответствующих разрешений.<ul>
<li>(Не рекомендуется) Просто установите политику ассоциации пользователя/роли, которую вы использовали, на управляемую политику AWS <code translate="no">AdministratorAccess</code>.</li>
<li>(Настоятельно рекомендуется) Чтобы реализовать принцип наименьших привилегий, сделайте следующее:<ul>
<li><p>Чтобы настроить разрешение для <code translate="no">eksctl</code>, обратитесь к разделу <a href="https://eksctl.io/usage/minimum-iam-policies/">Минимальное разрешение для <code translate="no">eksctl</code></a>.</p></li>
<li><p>Чтобы настроить разрешение на создание/удаление ведер AWS S3, обратитесь к следующим настройкам разрешения:</p>
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
<li><p>Чтобы настроить разрешения на создание/удаление политик IAM, обратитесь к следующим настройкам разрешений. Замените <code translate="no">YOUR_ACCOUNT_ID</code> на свой собственный.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">Настройка ресурсов AWS<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Вы можете настроить необходимые ресурсы AWS, включая ведро AWS S3 и кластер EKS, используя AWS Management Console, AWS CLI или инструменты IaC, такие как Terraform. В этом документе для демонстрации настройки ресурсов AWS предпочтительно использовать AWS CLI.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">Создание ведра Amazon S3</h3><ul>
<li><p>Создайте ведро AWS S3.</p>
<p>Ознакомьтесь с <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">правилами именования ведер</a> и соблюдайте правила именования при присвоении имени ведру AWS S3.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=&quot;milvus-bucket-$(openssl rand -hex 12)&quot;

aws s3api create-bucket --bucket &quot;$milvus_bucket_name&quot; --region &#x27;us-east-2&#x27; --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=&#x27;us-east-2&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span></span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Создайте политику IAM для чтения и записи объектов в созданном выше ведре. <strong>Замените имя ведра на свое собственное.</strong></p>
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
<li><p>Прикрепите политику к своему пользователю AWS.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Создание кластера Amazon EKS</h3><ul>
<li><p>Подготовьте файл конфигурации кластера следующим образом и назовите его <code translate="no">eks_cluster.yaml</code>.</p>
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
<li><p>Выполните следующую команду для создания кластера EKS.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Получите файл kubeconfig.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте кластер EKS.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl get nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">Создайте класс хранилища<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus использует <code translate="no">etcd</code> в качестве метахранилища и должен полагаться на <code translate="no">gp3</code> StorageClass для создания и управления PVC.</p>
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
<p>Установите оригинальный класс хранения gp2 StorageClass в значение не по умолчанию.</p>
<pre><code translate="no" class="language-shell">kubectl patch storageclass gp2 -p &#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">Установите контроллер AWS LoadBalancer</h3><ul>
<li><p>Добавьте репо Helm chars.</p>
<pre><code translate="no" class="language-shell">helm repo add eks https://aws.github.io/eks-charts
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Установите контроллер балансировщика нагрузки AWS.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=&#x27;milvus-eks-cluster&#x27; \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте установку</p>
<pre><code translate="no" class="language-shell">kubectl get deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">Развертывание Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>В этом руководстве мы будем использовать диаграммы Milvus Helm Charts для развертывания кластера Milvus. Графики можно найти <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">здесь</a>.</p>
<ul>
<li><p>Добавьте репо Milvus Helm Chart.</p>
<pre><code translate="no" class="language-bash">helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Подготовьте файл конфигурации Milvus <code translate="no">milvus.yaml</code>, а также замените <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> на свой собственный.</p>
<p><div class="alert note"></p>
<ul>
<li>Чтобы настроить HA для вашего Milvus, обратитесь к <a href="https://milvus.io/tools/sizing/">этому калькулятору</a> для получения дополнительной информации. Вы можете загрузить соответствующие конфигурации прямо из калькулятора, и вам следует удалить конфигурации, связанные с MinIO.</li>
<li>Чтобы реализовать многократное развертывание координаторов, установите <code translate="no">xxCoordinator.activeStandby.enabled</code> на <code translate="no">true</code>.</li>
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
<li><p>Установите Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Подождите, пока все стручки не будут <code translate="no">Running</code>.</p>
<pre><code translate="no" class="language-shell">kubectl get pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm не поддерживает планирование порядка создания сервисов. Вполне нормально, что бизнес-подсистемы перезапускаются один или два раза, прежде чем <code translate="no">etcd</code> и <code translate="no">pulsar</code> будут запущены на ранней стадии.</p>
<p></div></p></li>
<li><p>Получите адрес службы Milvus.</p>
<pre><code translate="no" class="language-shell">kubectl get svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">Проверка установки<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Для проверки установки вы можете следовать приведенному ниже простому руководству. Для получения более подробной информации обратитесь к <a href="https://milvus.io/docs/v2.3.x/example_code.md">этому примеру</a>.</p>
<ul>
<li><p>Загрузите код примера.</p>
<pre><code translate="no" class="language-shell">wget https://raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Измените аргумент <code translate="no">host</code> в коде примера на адрес службы Milvus, указанный выше.</p></li>
</ul>
<pre><code translate="no">```python
...
connections.connect(&quot;default&quot;, host=&quot;milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com&quot;, port=&quot;19530&quot;)
...
```
</code></pre>
<ul>
<li><p>Запустите код примера.</p>
<pre><code translate="no" class="language-shell">python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>Результат должен быть похож на следующий:</p>
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
<h2 id="Clean-up-works" class="common-anchor-header">Очистка работает<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вам необходимо восстановить среду, удалите Milvus, уничтожьте кластер EKS и удалите ведра AWS S3 и связанные с ними политики IAM.</p>
<ul>
<li><p>Удалите Milvus.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Уничтожьте кластер EKS.</p>
<pre><code translate="no" class="language-shell">eksctl delete cluster --name milvus-eks-cluster --region us-east-2
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Удалите ведро AWS S3 и связанные с ним политики IAM.</p>
<p><strong>Замените имя ведра и ARN политики на свои собственные.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm s3://milvus-bucket-039dd013c0712f085d60e21f --recursive

aws s3api delete-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-2

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;

aws iam delete-policy --policy-arn &#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Что дальше<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Если вы хотите узнать, как развернуть Milvus в других облаках:</p>
<ul>
<li><a href="/docs/ru/gcp.md">Развертывание кластера Milvus на GCP с помощью Kubernetes</a></li>
<li><a href="/docs/ru/azure.md">Развертывание кластера Milvus на Azure с помощью Kubernetes</a></li>
</ul>
