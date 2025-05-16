---
id: eks.md
title: Einrichten eines Milvus-Clusters auf EKS
related_key: cluster
summary: 'Erfahren Sie, wie man einen Milvus-Cluster auf EKS einsetzt'
---
<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">Bereitstellen eines Milvus-Clusters auf EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>Dieses Thema beschreibt, wie Sie einen Milvus-Cluster auf <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a> bereitstellen.</p>
<h2 id="Prerequisites" class="common-anchor-header">Voraussetzungen<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Sie haben AWS CLI auf Ihrem lokalen PC oder einer Amazon EC2 installiert, die Ihnen als Endpunkt für die in diesem Dokument beschriebenen Vorgänge dienen wird. Auf einem Amazon Linux 2 oder Amazon Linux 2023 sind die AWS CLI-Tools bereits installiert. So installieren Sie AWS CLi auf Ihrem lokalen PC. Siehe <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">AWS CLI installieren</a>.</li>
<li>Sie haben Kubernetes und die EKS-Tools auf dem bevorzugten Endgerät installiert, einschließlich:<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>Die AWS IAM-Berechtigungen wurden ordnungsgemäß erteilt. Der von Ihnen verwendete IAM-Sicherheitsprinzipal muss die Berechtigung haben, Amazon EKS IAM-Rollen, servicebezogene Rollen, AWS CloudFormation, VPCs und andere zugehörige Ressourcen zu verwenden. Sie können eine der folgenden Möglichkeiten nutzen, um Ihrem Principal die richtigen Berechtigungen zu erteilen.<ul>
<li>(Nicht empfohlen) Setzen Sie einfach die Zuordnungsrichtlinie des Benutzers/der Rolle, die Sie verwendet haben, auf die von AWS verwaltete Richtlinie <code translate="no">AdministratorAccess</code>.</li>
<li>(Dringend empfohlen) Gehen Sie wie folgt vor, um das Prinzip der geringsten Privilegien umzusetzen:<ul>
<li><p>Um die Berechtigung für <code translate="no">eksctl</code> einzurichten, siehe <a href="https://eksctl.io/usage/minimum-iam-policies/">Mindestberechtigung für <code translate="no">eksctl</code></a>.</p></li>
<li><p>Um die Berechtigung für das Erstellen/Löschen von AWS S3-Buckets einzurichten, beachten Sie die folgenden Berechtigungseinstellungen:</p>
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
<li><p>Um die Berechtigung zum Erstellen/Löschen von IAM-Richtlinien einzurichten, beachten Sie die folgenden Berechtigungseinstellungen. Ersetzen Sie <code translate="no">YOUR_ACCOUNT_ID</code> durch Ihre eigenen.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">AWS-Ressourcen einrichten<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die erforderlichen AWS-Ressourcen, einschließlich eines AWS S3-Buckets und eines EKS-Clusters, entweder mit der AWS Management Console, AWS CLI oder IaC-Tools wie Terraform einrichten. In diesem Dokument wird die AWS CLI bevorzugt, um zu zeigen, wie die AWS-Ressourcen eingerichtet werden.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">Erstellen eines Amazon S3-Buckets</h3><ul>
<li><p>Erstellen Sie einen AWS S3 Bucket.</p>
<p>Lesen Sie die <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">Bucket-Namensregeln</a> und beachten Sie die Namensregeln bei der Benennung Ihres AWS S3-Buckets.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=<span class="hljs-string">&quot;milvus-bucket-<span class="hljs-subst">$(openssl rand -hex 12)</span>&quot;</span>

aws s3api create-bucket --bucket <span class="hljs-string">&quot;<span class="hljs-variable">$milvus_bucket_name</span>&quot;</span> --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --acl private  --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=<span class="hljs-string">&#x27;us-east-2&#x27;</span>


<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Erstellen Sie eine IAM-Richtlinie für das Lesen und Schreiben von Objekten innerhalb des oben erstellten Buckets. <strong>Ersetzen Sie den Bucket-Namen durch Ihren eigenen.</strong></p>
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
<li><p>Verknüpfen Sie die Richtlinie mit Ihrem AWS-Benutzer.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Erstellen Sie einen Amazon EKS Cluster</h3><ul>
<li><p>Bereiten Sie eine Cluster-Konfigurationsdatei wie folgt vor und nennen Sie sie <code translate="no">eks_cluster.yaml</code>.</p>
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
<li><p>Führen Sie den folgenden Befehl aus, um einen EKS-Cluster zu erstellen.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Holen Sie sich die kubeconfig-Datei.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie den EKS-Cluster.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl <span class="hljs-keyword">get</span> nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">Erstellen Sie eine StorageClass<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus verwendet <code translate="no">etcd</code> als Metaspeicher und muss sich auf die StorageClass <code translate="no">gp3</code> verlassen, um PVC zu erstellen und zu verwalten.</p>
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
<p>Setzen Sie die ursprüngliche gp2 StorageClass auf non-default.</p>
<pre><code translate="no" class="language-shell">kubectl patch storage<span class="hljs-keyword">class</span> <span class="hljs-title class_">gp2</span> -p <span class="hljs-string">&#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">Installieren Sie den AWS LoadBalancer Controller</h3><ul>
<li><p>Fügen Sie Helm chars repo hinzu.</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> eks https:<span class="hljs-comment">//aws.github.io/eks-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Installieren Sie den AWS Load Balancer Controller.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --<span class="hljs-built_in">set</span> clusterName=<span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.create=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Überprüfen Sie die Installation</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">Milvus bereitstellen<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>In diesem Leitfaden werden wir Milvus Helm Charts verwenden, um einen Milvus-Cluster bereitzustellen. Sie finden die Charts <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">hier</a>.</p>
<ul>
<li><p>Fügen Sie das Milvus Helm Chart Repositorium hinzu.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Bereiten Sie die Milvus-Konfigurationsdatei <code translate="no">milvus.yaml</code> vor, und ersetzen Sie <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> durch Ihre eigene.</p>
<p><div class="alert note"></p>
<ul>
<li>Um HA für Ihren Milvus zu konfigurieren, lesen Sie <a href="https://milvus.io/tools/sizing/">diesen Rechner</a> für weitere Informationen. Sie können die entsprechenden Konfigurationen direkt aus dem Rechner herunterladen und sollten MinIO-bezogene Konfigurationen entfernen.</li>
<li>Um Multi-Replica-Einsätze von Koordinatoren zu implementieren, setzen Sie <code translate="no">xxCoordinator.activeStandby.enabled</code> auf <code translate="no">true</code>.</li>
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
<li><p>Installieren Sie Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Warten Sie, bis alle Pods <code translate="no">Running</code> sind.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm unterstützt nicht die Planung der Reihenfolge der Service-Erstellung. Es ist normal, dass Business-Pods ein oder zwei Mal neu gestartet werden, bevor <code translate="no">etcd</code> und <code translate="no">pulsar</code> in der Anfangsphase verfügbar sind.</p>
<p></div></p></li>
<li><p>Ermitteln Sie die Milvus-Dienstadresse.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">Überprüfen Sie die Installation<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Sie können die Installation anhand der folgenden einfachen Anleitung überprüfen. Weitere Details finden Sie in <a href="https://milvus.io/docs/v2.3.x/example_code.md">diesem Beispiel</a>.</p>
<ul>
<li><p>Laden Sie den Beispielcode herunter.</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ändern Sie das Argument <code translate="no">host</code> im Beispielcode in die obige Milvus-Dienstadresse.</p></li>
</ul>
<pre><code translate="no">```python
...
connections.connect(&quot;default&quot;, host=&quot;milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com&quot;, port=&quot;19530&quot;)
...
```
</code></pre>
<ul>
<li><p>Führen Sie den Beispielcode aus.</p>
<pre><code translate="no" class="language-shell">python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>Die Ausgabe sollte in etwa so aussehen wie die folgende:</p>
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
<h2 id="Clean-up-works" class="common-anchor-header">Aufräumen funktioniert<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Falls Sie die Umgebung wiederherstellen müssen, indem Sie Milvus deinstallieren, den EKS-Cluster zerstören und die AWS S3-Buckets sowie die zugehörigen IAM-Richtlinien löschen.</p>
<ul>
<li><p>Deinstallieren Sie Milvus.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Zerstören Sie den EKS-Cluster.</p>
<pre><code translate="no" class="language-shell">eksctl <span class="hljs-keyword">delete</span> cluster --name milvus-eks-cluster --region us-east-<span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Löschen Sie den AWS S3-Bucket und die zugehörigen IAM-Richtlinien.</p>
<p><strong>Sie sollten den Bucket-Namen und den Richtlinien-ARN durch Ihren eigenen ersetzen.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm <span class="hljs-attr">s3</span>:<span class="hljs-comment">//milvus-bucket-039dd013c0712f085d60e21f --recursive</span>

aws s3api <span class="hljs-keyword">delete</span>-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-<span class="hljs-number">2</span>

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;</span>

aws iam <span class="hljs-keyword">delete</span>-policy --policy-arn <span class="hljs-string">&#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Whats-next" class="common-anchor-header">Wie geht es weiter?<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Wenn Sie erfahren möchten, wie Sie Milvus in anderen Clouds einsetzen können:</p>
<ul>
<li><a href="/docs/de/v2.4.x/gcp.md">Bereitstellung von Milvus Cluster auf GCP mit Kubernetes</a></li>
<li><a href="/docs/de/v2.4.x/azure.md">Bereitstellen von Milvus Cluster auf Azure mit Kubernetes</a></li>
</ul>
