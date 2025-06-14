---
id: eks.md
title: Развертывание кластера Milvus на EKS
related_key: cluster
summary: "Узнайте, как развернуть кластер Milvus на EKS."
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
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;Version&quot;</span>: <span class="hljs-string">&quot;2012-10-17&quot;</span>,
  <span class="hljs-string">&quot;Statement&quot;</span>: [
    {
      <span class="hljs-string">&quot;Sid&quot;</span>: <span class="hljs-string">&quot;S3BucketManagement&quot;</span>,
      <span class="hljs-string">&quot;Effect&quot;</span>: <span class="hljs-string">&quot;Allow&quot;</span>,
      <span class="hljs-string">&quot;Action&quot;</span>: [
        <span class="hljs-string">&quot;s3:CreateBucket&quot;</span>,
        <span class="hljs-string">&quot;s3:PutBucketAcl&quot;</span>,
        <span class="hljs-string">&quot;s3:PutBucketOwnershipControls&quot;</span>,
        <span class="hljs-string">&quot;s3:DeleteBucket&quot;</span>
      ],
      <span class="hljs-string">&quot;Resource&quot;</span>: [
        <span class="hljs-string">&quot;arn:aws:s3:::milvus-bucket-*&quot;</span>
      ]
    }
  ]
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Чтобы настроить разрешения на создание/удаление политик IAM, обратитесь к следующим настройкам разрешений. Замените <code translate="no">YOUR_ACCOUNT_ID</code> на свой собственный.</p>
<pre><code translate="no" class="language-json">{
  <span class="hljs-string">&quot;Version&quot;</span>: <span class="hljs-string">&quot;2012-10-17&quot;</span>,
  <span class="hljs-string">&quot;Statement&quot;</span>: [
    {
      <span class="hljs-string">&quot;Sid&quot;</span>: <span class="hljs-string">&quot;IAMPolicyManagement&quot;</span>,
      <span class="hljs-string">&quot;Effect&quot;</span>: <span class="hljs-string">&quot;Allow&quot;</span>,
      <span class="hljs-string">&quot;Action&quot;</span>: [
        <span class="hljs-string">&quot;iam:CreatePolicy&quot;</span>,
        <span class="hljs-string">&quot;iam:DeletePolicy&quot;</span>
      ],
      <span class="hljs-string">&quot;Resource&quot;</span>: <span class="hljs-string">&quot;arn:aws:iam::YOUR_ACCOUNT_ID:policy/MilvusS3ReadWrite&quot;</span>
    }
  ]
}    
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
<pre><code translate="no" class="language-shell">milvus_bucket_name=<span class="hljs-string">&quot;milvus-bucket-<span class="hljs-subst">$(openssl rand -hex 12)</span>&quot;</span>

aws s3api create-bucket --bucket <span class="hljs-string">&quot;<span class="hljs-variable">$milvus_bucket_name</span>&quot;</span> --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --acl private --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=<span class="hljs-string">&#x27;us-east-2&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>

<li><p>Создайте политику IAM для чтения и записи объектов в созданном выше ведре. <strong>Замените имя ведра на свое собственное.</strong></p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">echo</span> <span class="hljs-string">&#x27;{
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
}&#x27;</span> &gt; milvus-s3-policy.json

aws iam create-policy --policy-name MilvusS3ReadWrite --policy-document file://milvus-s3-policy.json

<span class="hljs-comment"># Get the ARN from the command output as follows:</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment"># &quot;Policy&quot;: {</span>
<span class="hljs-comment"># &quot;PolicyName&quot;: &quot;MilvusS3ReadWrite&quot;,</span>
<span class="hljs-comment"># &quot;PolicyId&quot;: &quot;AN5QQVVPM1BVTFlBNkdZT&quot;,</span>
<span class="hljs-comment"># &quot;Arn&quot;: &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;,</span>
<span class="hljs-comment"># &quot;Path&quot;: &quot;/&quot;,</span>
<span class="hljs-comment"># &quot;DefaultVersionId&quot;: &quot;v1&quot;,</span>
<span class="hljs-comment"># &quot;AttachmentCount&quot;: 0,</span>
<span class="hljs-comment"># &quot;PermissionsBoundaryUsageCount&quot;: 0,</span>
<span class="hljs-comment"># &quot;IsAttachable&quot;: true,</span>
<span class="hljs-comment"># &quot;CreateDate&quot;: &quot;2023-11-16T06:00:01+00:00&quot;,</span>
<span class="hljs-comment"># &quot;UpdateDate&quot;: &quot;2023-11-16T06:00:01+00:00&quot;</span>
<span class="hljs-comment"># }</span>
<span class="hljs-comment"># } </span>
<button class="copy-code-btn"></button></code></pre></li>

<li><p>Прикрепите политику к своему пользователю AWS.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Создание кластера Amazon EKS</h3><ul>
<li><p>Подготовьте файл конфигурации кластера следующим образом и назовите его <code translate="no">eks_cluster.yaml</code>.</p>
<pre><code translate="no" class="language-yaml">apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
name: <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
region: <span class="hljs-string">&#x27;us-east-2&#x27;</span>
version: <span class="hljs-string">&quot;1.27&quot;</span>

iam:
withOIDC: <span class="hljs-literal">true</span>

serviceAccounts:

- metadata:
  name: aws-load-balancer-controller
  namespace: kube-system
  wellKnownPolicies:
  awsLoadBalancerController: <span class="hljs-literal">true</span>

managedNodeGroups:

- name: milvus-node-group
  labels: { role: milvus }
  instanceType: m6i.4xlarge
  desiredCapacity: 3
  privateNetworking: <span class="hljs-literal">true</span>

addons:

- name: vpc-cni
  version: latest
  attachPolicyARNs:
  - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
- name: coredns
  version: latest
- name: kube-proxy
  version: latest
- name: aws-ebs-csi-driver
version: latest
wellKnownPolicies:
ebsCSIController: <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Выполните следующую команду для создания кластера EKS.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Получите файл kubeconfig.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте кластер EKS.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl <span class="hljs-keyword">get</span> nodes -A -o wide
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
<pre><code translate="no" class="language-yaml">cat &lt;&lt;EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-gp3-sc
  annotations:
    storageclass.kubernetes.io/<span class="hljs-keyword">is</span>-default-<span class="hljs-keyword">class</span>: <span class="hljs-string">&quot;true&quot;</span>
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  <span class="hljs-built_in">type</span>: gp3
EOF
<button class="copy-code-btn"></button></code></pre>
<p>Установите оригинальный класс хранения gp2 StorageClass в значение не по умолчанию.</p>
<pre><code translate="no" class="language-shell">kubectl patch storage<span class="hljs-keyword">class</span> <span class="hljs-title class_">gp2</span> -p <span class="hljs-string">&#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">Установите контроллер AWS LoadBalancer</h3><ul>
<li><p>Добавьте репо Helm chars.</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> eks https:<span class="hljs-comment">//aws.github.io/eks-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Установите контроллер балансировщика нагрузки AWS.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --<span class="hljs-built_in">set</span> clusterName=<span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.create=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Проверьте установку</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> deployment -n kube-system aws-load-balancer-controller
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
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Подготовьте файл конфигурации Milvus <code translate="no">milvus.yaml</code>, а также замените <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> на свой собственный.</p>
<p><div class="alert note"></p>
<ul>
<li>Чтобы настроить HA для вашего Milvus, обратитесь к <a href="https://milvus.io/tools/sizing/">этому калькулятору</a> для получения дополнительной информации. Вы можете загрузить соответствующие конфигурации прямо из калькулятора, и вам следует удалить конфигурации, связанные с MinIO.</li>
<li>Чтобы реализовать многократное развертывание координаторов, установите <code translate="no">xxCoordinator.activeStandby.enabled</code> на <code translate="no">true</code>.</li>
</ul>
<p></div></p>
<pre><code translate="no" class="language-yaml">cluster:
  enabled: <span class="hljs-literal">true</span>

service:
<span class="hljs-built_in">type</span>: LoadBalancer
port: 19530
annotations:
service.beta.kubernetes.io/aws-load-balancer-type: external
service.beta.kubernetes.io/aws-load-balancer-name: milvus-service
service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip

minio:
enabled: <span class="hljs-literal">false</span>

externalS3:
enabled: <span class="hljs-literal">true</span>
host: <span class="hljs-string">&quot;s3.us-east-2.amazonaws.com&quot;</span>
port: <span class="hljs-string">&quot;443&quot;</span>
useSSL: <span class="hljs-literal">true</span>
bucketName: <span class="hljs-string">&quot;&lt;bucket-name&gt;&quot;</span>
useIAM: <span class="hljs-literal">false</span>
cloudProvider: <span class="hljs-string">&quot;aws&quot;</span>
iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
accessKey: <span class="hljs-string">&quot;&lt;s3-access-key&gt;&quot;</span>
secretKey: <span class="hljs-string">&quot;&lt;s3-secret-key&gt;&quot;</span>
region: <span class="hljs-string">&quot;us-east-2&quot;</span>

<span class="hljs-comment"># HA Configurations</span>
rootCoordinator:
replicas: 2
activeStandby:
enabled: <span class="hljs-literal">true</span>
resources:
limits:
cpu: 1
memory: 2Gi

indexCoordinator:
replicas: 2
activeStandby:
enabled: <span class="hljs-literal">true</span>
resources:
limits:
cpu: <span class="hljs-string">&quot;0.5&quot;</span>
memory: 0.5Gi

queryCoordinator:
replicas: 2
activeStandby:
enabled: <span class="hljs-literal">true</span>
resources:
limits:
cpu: <span class="hljs-string">&quot;0.5&quot;</span>
memory: 0.5Gi

dataCoordinator:
replicas: 2
activeStandby:
enabled: <span class="hljs-literal">true</span>
resources:
limits:
cpu: <span class="hljs-string">&quot;0.5&quot;</span>
memory: 0.5Gi

proxy:
replicas: 2
resources:
limits:
cpu: 1
memory: 2Gi  
<button class="copy-code-btn"></button></code></pre></li>

<li><p>Установите Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Подождите, пока все стручки не будут <code translate="no">Running</code>.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm не поддерживает планирование порядка создания сервисов. Вполне нормально, что бизнес-подсистемы перезапускаются один или два раза, прежде чем <code translate="no">etcd</code> и <code translate="no">pulsar</code> будут запущены на ранней стадии.</p>
<p></div></p></li>
<li><p>Получите адрес службы Milvus.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> svc -n milvus
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
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py</span>
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

Does collection hello_milvus exist <span class="hljs-keyword">in</span> Milvus: False

=== Create collection `hello_milvus` ===

=== Start inserting entities ===

Number of entities <span class="hljs-keyword">in</span> Milvus: 3000

=== Start Creating index IVF_FLAT ===

=== Start loading ===

=== Start searching based on vector similarity ===

hit: <span class="hljs-built_in">id</span>: 2998, distance: 0.0, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.9728033590489911}, random field: 0.9728033590489911
hit: <span class="hljs-built_in">id</span>: 1262, distance: 0.08883658051490784, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.2978858685751561}, random field: 0.2978858685751561
hit: <span class="hljs-built_in">id</span>: 1265, distance: 0.09590047597885132, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.3042039939240304}, random field: 0.3042039939240304
hit: <span class="hljs-built_in">id</span>: 2999, distance: 0.0, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.02316334456872482}, random field: 0.02316334456872482
hit: <span class="hljs-built_in">id</span>: 1580, distance: 0.05628091096878052, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.3855988746044062}, random field: 0.3855988746044062
hit: <span class="hljs-built_in">id</span>: 2377, distance: 0.08096685260534286, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.8745922204004368}, random field: 0.8745922204004368
search latency = 0.4693s

=== Start querying with `random &gt; 0.5` ===

query result:
-{<span class="hljs-string">&#x27;embeddings&#x27;</span>: [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;random&#x27;</span>: 0.6378742006852851}
search latency = 0.9407s
query pagination(<span class="hljs-built_in">limit</span>=4):
[{<span class="hljs-string">&#x27;random&#x27;</span>: 0.6378742006852851, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;0&#x27;</span>}, {<span class="hljs-string">&#x27;random&#x27;</span>: 0.5763523024650556, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;100&#x27;</span>}, {<span class="hljs-string">&#x27;random&#x27;</span>: 0.9425935891639464, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;1000&#x27;</span>}, {<span class="hljs-string">&#x27;random&#x27;</span>: 0.7893211256191387, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;1001&#x27;</span>}]
query pagination(offset=1, <span class="hljs-built_in">limit</span>=3):
[{<span class="hljs-string">&#x27;random&#x27;</span>: 0.5763523024650556, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;100&#x27;</span>}, {<span class="hljs-string">&#x27;random&#x27;</span>: 0.9425935891639464, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;1000&#x27;</span>}, {<span class="hljs-string">&#x27;random&#x27;</span>: 0.7893211256191387, <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;1001&#x27;</span>}]

=== Start hybrid searching with `random &gt; 0.5` ===

hit: <span class="hljs-built_in">id</span>: 2998, distance: 0.0, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.9728033590489911}, random field: 0.9728033590489911
hit: <span class="hljs-built_in">id</span>: 747, distance: 0.14606499671936035, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.5648774800635661}, random field: 0.5648774800635661
hit: <span class="hljs-built_in">id</span>: 2527, distance: 0.1530652642250061, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.8928974315571507}, random field: 0.8928974315571507
hit: <span class="hljs-built_in">id</span>: 2377, distance: 0.08096685260534286, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.8745922204004368}, random field: 0.8745922204004368
hit: <span class="hljs-built_in">id</span>: 2034, distance: 0.20354536175727844, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.5526117606328499}, random field: 0.5526117606328499
hit: <span class="hljs-built_in">id</span>: 958, distance: 0.21908017992973328, entity: {<span class="hljs-string">&#x27;random&#x27;</span>: 0.6647383716417955}, random field: 0.6647383716417955
search latency = 0.4652s

=== Start deleting with <span class="hljs-built_in">expr</span> `pk <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;0&quot;</span> , <span class="hljs-string">&quot;1&quot;</span>]` ===

query before delete by <span class="hljs-built_in">expr</span>=`pk <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;0&quot;</span> , <span class="hljs-string">&quot;1&quot;</span>]` -&gt; result:
-{<span class="hljs-string">&#x27;random&#x27;</span>: 0.6378742006852851, <span class="hljs-string">&#x27;embeddings&#x27;</span>: [0.20963514, 0.39746657, 0.12019053, 0.6947492, 0.9535575, 0.5454552, 0.82360446, 0.21096309], <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;0&#x27;</span>}
-{<span class="hljs-string">&#x27;random&#x27;</span>: 0.43925103574669633, <span class="hljs-string">&#x27;embeddings&#x27;</span>: [0.52323616, 0.8035404, 0.77824664, 0.80369574, 0.4914803, 0.8265614, 0.6145269, 0.80234545], <span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-string">&#x27;1&#x27;</span>}

query after delete by <span class="hljs-built_in">expr</span>=`pk <span class="hljs-keyword">in</span> [<span class="hljs-string">&quot;0&quot;</span> , <span class="hljs-string">&quot;1&quot;</span>]` -&gt; result: []

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
<pre><code translate="no" class="language-shell">eksctl <span class="hljs-keyword">delete</span> cluster --name milvus-eks-cluster --region us-east-<span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Удалите ведро AWS S3 и связанные с ним политики IAM.</p>
<p><strong>Замените имя ведра и ARN политики на свои собственные.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm <span class="hljs-attr">s3</span>:<span class="hljs-comment">//milvus-bucket-039dd013c0712f085d60e21f --recursive</span>

aws s3api <span class="hljs-keyword">delete</span>-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-<span class="hljs-number">2</span>

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;</span>

aws iam <span class="hljs-keyword">delete</span>-policy --policy-arn <span class="hljs-string">&#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;</span>
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
<li><a href="/docs/ru/v2.5.x/gcp.md">Развертывание кластера Milvus на GCP с помощью Kubernetes</a></li>
<li><a href="/docs/ru/v2.5.x/azure.md">Развертывание кластера Milvus в Azure с помощью Kubernetes</a></li>
</ul>
