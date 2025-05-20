---
id: eks.md
title: EKS에 Milvus 클러스터 배포하기
related_key: cluster
summary: EKS에 Milvus 클러스터를 배포하는 방법 알아보기
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">EKS에 Milvus 클러스터 배포하기<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS에</a> Milvus 클러스터를 배포하는 방법에 대해 설명합니다.</p>
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
<li>이 문서에서 다루는 작업을 수행할 엔드포인트 역할을 하는 로컬 PC 또는 Amazon EC2에 AWS CLI가 설치되어 있어야 합니다. Amazon Linux 2 또는 Amazon Linux 2023의 경우, AWS CLI 도구가 이미 설치되어 있습니다. 로컬 PC에 AWS CLi를 설치하려면 다음과 같이 하세요. <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">AWS CLI 설치 방법을</a> 참조하세요.</li>
<li>선호하는 엔드포인트 장치에 Kubernetes 및 EKS 도구를 설치했습니다:<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>AWS IAM 권한이 올바르게 부여되었습니다. 사용 중인 IAM 보안 주체는 Amazon EKS IAM 역할, 서비스 관련 역할, AWS CloudFormation, VPC 및 기타 관련 리소스를 사용할 수 있는 권한을 가지고 있어야 합니다. 다음 방법 중 하나를 사용하여 보안 담당자에게 적절한 권한을 부여할 수 있습니다.<ul>
<li>(권장하지 않음) 사용 중인 사용자/역할의 연결 정책을 AWS 관리 정책에 설정하기만 하면 됩니다 <code translate="no">AdministratorAccess</code>.</li>
<li>(적극 권장) 최소 권한 원칙을 구현하려면 다음과 같이 하세요:<ul>
<li><p><code translate="no">eksctl</code> 에 대한 권한을 설정하려면 <a href="https://eksctl.io/usage/minimum-iam-policies/"> <code translate="no">eksctl</code> 에 대한 최소 권한을</a> 참조하세요.</p></li>
<li><p>AWS S3 버킷을 생성/삭제하기 위한 권한을 설정하려면 다음 권한 설정을 참조하세요:</p>
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
<li><p>IAM 정책을 생성/삭제하기 위한 권한을 설정하려면 다음 권한 설정을 참조하세요. <code translate="no">YOUR_ACCOUNT_ID</code> 을 자신의 것으로 바꾸세요.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">AWS 리소스 설정<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>AWS 관리 콘솔, AWS CLI 또는 Terraform과 같은 IaC 도구를 사용하여 AWS S3 버킷 및 EKS 클러스터를 포함한 필수 AWS 리소스를 설정할 수 있습니다. 이 문서에서는 AWS 리소스를 설정하는 방법을 설명하기 위해 AWS CLI를 선호합니다.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">Amazon S3 버킷 만들기</h3><ul>
<li><p>AWS S3 버킷을 생성합니다.</p>
<p><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">버킷 이름</a> 지정 <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">규칙을</a> 읽고 AWS S3 버킷의 이름을 지정할 때 이름 지정 규칙을 준수하세요.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=<span class="hljs-string">&quot;milvus-bucket-<span class="hljs-subst">$(openssl rand -hex 12)</span>&quot;</span>

aws s3api create-bucket --bucket <span class="hljs-string">&quot;<span class="hljs-variable">$milvus_bucket_name</span>&quot;</span> --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=<span class="hljs-string">&#x27;us-east-2&#x27;</span>


<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>위에서 생성한 버킷 내에서 오브젝트 읽기 및 쓰기를 위한 IAM 정책을 생성합니다. <strong>버킷 이름을 자신의 이름으로 바꾸세요.</strong></p>
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
<span class="hljs-comment">#     &quot;Policy&quot;: {</span>
<span class="hljs-comment">#         &quot;PolicyName&quot;: &quot;MilvusS3ReadWrite&quot;,</span>
<span class="hljs-comment">#         &quot;PolicyId&quot;: &quot;AN5QQVVPM1BVTFlBNkdZT&quot;,</span>
<span class="hljs-comment">#         &quot;Arn&quot;: &quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;,</span>
<span class="hljs-comment">#         &quot;Path&quot;: &quot;/&quot;,</span>
<span class="hljs-comment">#         &quot;DefaultVersionId&quot;: &quot;v1&quot;,</span>
<span class="hljs-comment">#         &quot;AttachmentCount&quot;: 0,</span>
<span class="hljs-comment">#         &quot;PermissionsBoundaryUsageCount&quot;: 0,</span>
<span class="hljs-comment">#         &quot;IsAttachable&quot;: true,</span>
<span class="hljs-comment">#         &quot;CreateDate&quot;: &quot;2023-11-16T06:00:01+00:00&quot;,</span>
<span class="hljs-comment">#        &quot;UpdateDate&quot;: &quot;2023-11-16T06:00:01+00:00&quot;</span>
<span class="hljs-comment">#     }</span>
<span class="hljs-comment"># }    </span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>정책을 AWS 사용자에 첨부합니다.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Amazon EKS 클러스터 생성</h3><ul>
<li><p>다음과 같이 클러스터 구성 파일을 준비하고 이름을 <code translate="no">eks_cluster.yaml</code> 으로 지정합니다.</p>
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
<li><p>다음 명령어를 실행하여 EKS 클러스터를 생성합니다.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>kubeconfig 파일을 가져옵니다.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>EKS 클러스터를 확인합니다.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl <span class="hljs-keyword">get</span> nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">스토리지 클래스 생성<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 <code translate="no">etcd</code> 를 메타 스토리지로 사용하며, <code translate="no">gp3</code> StorageClass를 사용하여 PVC를 생성하고 관리해야 합니다.</p>
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
<p>원래 gp2 StorageClass를 기본값이 아닌 것으로 설정합니다.</p>
<pre><code translate="no" class="language-shell">kubectl patch storage<span class="hljs-keyword">class</span> <span class="hljs-title class_">gp2</span> -p <span class="hljs-string">&#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">AWS 로드밸런서 컨트롤러를 설치한다.</h3><ul>
<li><p>헬름 문자 리포지토리를 추가한다.</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> eks https:<span class="hljs-comment">//aws.github.io/eks-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>AWS 로드밸런서 컨트롤러를 설치한다.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --<span class="hljs-built_in">set</span> clusterName=<span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.create=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>설치 확인</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">밀버스 배포<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 밀버스 헬름 차트를 사용하여 밀버스 클러스터를 배포한다. 차트는 <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">여기에서</a> 찾을 수 있습니다.</p>
<ul>
<li><p>Milvus 헬름 차트 리포지토리를 추가한다.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvus 구성 파일 <code translate="no">milvus.yaml</code> 을 준비하고 <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> 을 사용자 구성 파일로 바꿉니다.</p>
<p><div class="alert note"></p>
<ul>
<li>Milvus에 대한 HA를 구성하려면 <a href="https://milvus.io/tools/sizing/">이 계산기를</a> 참조하여 자세한 정보를 확인하세요. 관련 구성은 계산기에서 직접 다운로드할 수 있으며, MinIO 관련 구성은 제거해야 합니다.</li>
<li>코디네이터의 멀티 레플리카 배포를 구현하려면 <code translate="no">xxCoordinator.activeStandby.enabled</code> 을 <code translate="no">true</code> 으로 설정합니다.</li>
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
<li><p>Milvus를 설치합니다.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>모든 파드가 <code translate="no">Running</code> 이 될 때까지 기다린다.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>헬름은 서비스 생성 순서를 예약하는 기능을 지원하지 않는다. 초기 단계에서 <code translate="no">etcd</code> 와 <code translate="no">pulsar</code> 가 가동되기 전에 비즈니스 파드를 한두 번 재시작하는 것이 일반적이다.</p>
<p></div></p></li>
<li><p>밀버스 서비스 주소를 가져온다.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">설치 확인<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>아래의 간단한 가이드에 따라 설치를 확인할 수 있습니다. 자세한 내용은 <a href="https://milvus.io/docs/v2.3.x/example_code.md">이 예제를</a> 참조하세요.</p>
<ul>
<li><p>예제 코드를 다운로드합니다.</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>예제 코드의 <code translate="no">host</code> 인수를 위의 Milvus 서비스 주소로 변경합니다.</p></li>
</ul>
<pre><code translate="no">```python
...
connections.connect(&quot;default&quot;, host=&quot;milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com&quot;, port=&quot;19530&quot;)
...
```
</code></pre>
<ul>
<li><p>예제 코드를 실행합니다.</p>
<pre><code translate="no" class="language-shell">python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>출력은 다음과 유사해야 합니다:</p>
<pre><code translate="no" class="language-shell">=== start connecting to Milvus     ===

Does collection hello_milvus exist <span class="hljs-keyword">in</span> Milvus: False

=== Create collection `hello_milvus` ===


=== Start inserting entities       ===

Number of entities <span class="hljs-keyword">in</span> Milvus: 3000

=== Start Creating index IVF_FLAT  ===


=== Start loading                  ===


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
<h2 id="Clean-up-works" class="common-anchor-header">정리 작업<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus를 제거하고, EKS 클러스터를 삭제하고, AWS S3 버킷 및 관련 IAM 정책을 삭제하여 환경을 복원해야 하는 경우.</p>
<ul>
<li><p>Milvus를 제거합니다.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>EKS 클러스터를 삭제합니다.</p>
<pre><code translate="no" class="language-shell">eksctl <span class="hljs-keyword">delete</span> cluster --name milvus-eks-cluster --region us-east-<span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>AWS S3 버킷 및 관련 IAM 정책을 삭제합니다.</p>
<p><strong>버킷 이름과 정책 ARN을 사용자 이름으로 바꿔야 합니다.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm <span class="hljs-attr">s3</span>:<span class="hljs-comment">//milvus-bucket-039dd013c0712f085d60e21f --recursive</span>

aws s3api <span class="hljs-keyword">delete</span>-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-<span class="hljs-number">2</span>

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;</span>

aws iam <span class="hljs-keyword">delete</span>-policy --policy-arn <span class="hljs-string">&#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>다른 클라우드에 Milvus를 배포하는 방법을 배우려면 다음과 같이 하세요:</p>
<ul>
<li><a href="/docs/ko/v2.4.x/gcp.md">Kubernetes를 사용하여 GCP에 Milvus 클러스터 배포하기</a></li>
<li><a href="/docs/ko/v2.4.x/azure.md">Kubernetes를 사용하여 Azure에 Milvus 클러스터 배포하기</a></li>
</ul>
