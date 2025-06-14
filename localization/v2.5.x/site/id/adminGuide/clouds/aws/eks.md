---
id: eks.md
title: Menerapkan Cluster Milvus di EKS
related_key: cluster
summary: Pelajari cara menggunakan cluster Milvus di EKS
---

<h1 id="Deploy-a-Milvus-Cluster-on-EKS" class="common-anchor-header">Menerapkan Cluster Milvus di EKS<button data-href="#Deploy-a-Milvus-Cluster-on-EKS" class="anchor-icon" translate="no">
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
    </button></h1><p>Topik ini menjelaskan cara menerapkan cluster Milvus di <a href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html">Amazon EKS</a>.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prasyarat<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Anda telah menginstal AWS CLI di PC lokal atau Amazon EC2, yang akan berfungsi sebagai titik akhir untuk melakukan operasi yang tercakup dalam dokumen ini. Untuk Amazon Linux 2 atau Amazon Linux 2023, alat AWS CLI sudah terinstal. Untuk menginstal AWS CLi di PC lokal Anda. Lihat <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">Cara menginstal AWS CLI</a>.</li>
<li>Anda telah menginstal alat Kubernetes dan EKS yang diinstal di perangkat titik akhir yang diinginkan, termasuk:<ul>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html"><code translate="no">kubectl</code></a></li>
<li><a href="https://helm.sh/docs/intro/install/"><code translate="no">helm</code></a></li>
<li><a href="https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html"><code translate="no">eksctl</code></a></li>
</ul></li>
<li>Izin AWS IAM telah diberikan dengan benar. Prinsipal keamanan IAM yang Anda gunakan harus memiliki izin untuk menggunakan peran Amazon EKS IAM, peran terkait layanan, AWS CloudFormation, VPC, dan sumber daya terkait lainnya. Anda dapat mengikuti salah satu cara berikut untuk memberikan izin yang tepat kepada prinsipal Anda.<ul>
<li>(Tidak disarankan) Cukup tetapkan kebijakan asosiasi pengguna/peran yang Anda gunakan ke kebijakan terkelola AWS <code translate="no">AdministratorAccess</code>.</li>
<li>(Sangat disarankan) Untuk menerapkan prinsip hak istimewa paling sedikit, lakukan hal berikut:<ul>
<li><p>Untuk mengatur izin untuk <code translate="no">eksctl</code>, lihat <a href="https://eksctl.io/usage/minimum-iam-policies/">Izin minimum untuk <code translate="no">eksctl</code></a>.</p></li>
<li><p>Untuk mengatur izin untuk membuat/menghapus bucket AWS S3, lihat pengaturan izin berikut:</p>
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
<li><p>Untuk menyiapkan izin membuat/menghapus kebijakan IAM, lihat pengaturan izin berikut. Ganti <code translate="no">YOUR_ACCOUNT_ID</code> dengan milik Anda sendiri.</p>
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
<h2 id="Set-up-AWS-Resources" class="common-anchor-header">Menyiapkan Sumber Daya AWS<button data-href="#Set-up-AWS-Resources" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat menyiapkan sumber daya AWS yang diperlukan, termasuk bucket AWS S3 dan cluster EKS, menggunakan AWS Management Console, AWS CLI, atau alat bantu IaC, seperti Terraform. Dalam dokumen ini, AWS CLI lebih dipilih untuk mendemonstrasikan cara menyiapkan sumber daya AWS.</p>
<h3 id="Create-an-Amazon-S3-Bucket" class="common-anchor-header">Membuat Bucket Amazon S3</h3><ul>
<li><p>Buat bucket AWS S3.</p>
<p>Baca <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html">Aturan Penamaan Bucket</a> dan amati aturan penamaan saat menamai bucket AWS S3 Anda.</p>
<pre><code translate="no" class="language-shell">milvus_bucket_name=<span class="hljs-string">&quot;milvus-bucket-<span class="hljs-subst">$(openssl rand -hex 12)</span>&quot;</span>

aws s3api create-bucket --bucket <span class="hljs-string">&quot;<span class="hljs-variable">$milvus_bucket_name</span>&quot;</span> --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --acl private --object-ownership ObjectWriter --create-bucket-configuration LocationConstraint=<span class="hljs-string">&#x27;us-east-2&#x27;</span>

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># &quot;Location&quot;: &quot;http://milvus-bucket-039dd013c0712f085d60e21f.s3.amazonaws.com/&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>

<li><p>Buat kebijakan IAM untuk membaca dan menulis objek di dalam bucket yang telah dibuat di atas. <strong>Ganti nama bucket dengan nama Anda sendiri.</strong></p>
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

<li><p>Lampirkan kebijakan tersebut ke Pengguna AWS Anda.</p>
<pre><code translate="no" class="language-shell">aws iam attach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::&lt;your-iam-account-id&gt;:policy/MilvusS3ReadWrite&quot;</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h3 id="Create-an-Amazon-EKS-Cluster" class="common-anchor-header">Membuat Cluster Amazon EKS</h3><ul>
<li><p>Siapkan file konfigurasi cluster sebagai berikut dan beri nama <code translate="no">eks_cluster.yaml</code>.</p>
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
<li><p>Jalankan perintah berikut untuk membuat cluster EKS.</p>
<pre><code translate="no" class="language-bash">eksctl create cluster -f eks_cluster.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Dapatkan file kubeconfig.</p>
<pre><code translate="no" class="language-bash">aws eks update-kubeconfig --region <span class="hljs-string">&#x27;us-east-2&#x27;</span> --name <span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifikasi cluster EKS.</p>
<pre><code translate="no" class="language-bash">kubectl cluster-info

kubectl <span class="hljs-keyword">get</span> nodes -A -o wide
<button class="copy-code-btn"></button></code></pre></li>

</ul>
<h2 id="Create-a-StorageClass" class="common-anchor-header">Membuat StorageClass<button data-href="#Create-a-StorageClass" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus menggunakan <code translate="no">etcd</code> sebagai meta storage dan perlu mengandalkan <code translate="no">gp3</code> StorageClass untuk membuat dan mengelola PVC.</p>
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
<p>Atur StorageClass gp2 asli ke non-default.</p>
<pre><code translate="no" class="language-shell">kubectl patch storage<span class="hljs-keyword">class</span> <span class="hljs-title class_">gp2</span> -p <span class="hljs-string">&#x27;{&quot;metadata&quot;: {&quot;annotations&quot;:{&quot;storageclass.kubernetes.io/is-default-class&quot;:&quot;false&quot;}}}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-AWS-LoadBalancer-Controller" class="common-anchor-header">Instal Pengontrol LoadBalancer AWS</h3><ul>
<li><p>Tambahkan repo karakter Helm.</p>
<pre><code translate="no" class="language-shell">helm repo <span class="hljs-keyword">add</span> eks https:<span class="hljs-comment">//aws.github.io/eks-charts</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Instal Pengontrol Penyeimbang Beban AWS.</p>
<pre><code translate="no" class="language-shell">helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --<span class="hljs-built_in">set</span> clusterName=<span class="hljs-string">&#x27;milvus-eks-cluster&#x27;</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.create=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> serviceAccount.name=aws-load-balancer-controller 
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Verifikasi penginstalan</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> deployment -n kube-system aws-load-balancer-controller
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Deploy-Milvus" class="common-anchor-header">Menerapkan Milvus<button data-href="#Deploy-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Dalam panduan ini, kita akan menggunakan Milvus Helm Charts untuk menerapkan cluster Milvus. Anda dapat menemukan bagan tersebut <a href="https://github.com/zilliztech/milvus-helm/tree/master/charts/milvus">di sini</a>.</p>
<ul>
<li><p>Tambahkan repo Milvus Helm Chart.</p>
<pre><code translate="no" class="language-bash">helm repo <span class="hljs-keyword">add</span> milvus https:<span class="hljs-comment">//zilliztech.github.io/milvus-helm/</span>
helm repo update
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Siapkan berkas konfigurasi Milvus <code translate="no">milvus.yaml</code>, dan ganti <code translate="no">&lt;bucket-name&gt; &lt;s3-access-key&gt; &lt;s3-secret-key&gt;</code> dengan milik Anda.</p>
<p><div class="alert note"></p>
<ul>
<li>Untuk mengonfigurasi HA untuk Milvus Anda, lihat <a href="https://milvus.io/tools/sizing/">kalkulator ini</a> untuk informasi lebih lanjut. Anda dapat mengunduh konfigurasi terkait langsung dari kalkulator, dan Anda harus menghapus konfigurasi yang terkait dengan MinIO.</li>
<li>Untuk mengimplementasikan penyebaran multi-replika koordinator, setel <code translate="no">xxCoordinator.activeStandby.enabled</code> ke <code translate="no">true</code>.</li>
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

<li><p>Instal Milvus.</p>
<pre><code translate="no" class="language-shell">helm install milvus-demo milvus/milvus -n milvus -f milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Tunggu sampai semua pod <code translate="no">Running</code>.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> pods -n milvus
<button class="copy-code-btn"></button></code></pre>
<p><div class="alert note"></p>
<p>Helm tidak mendukung penjadwalan urutan pembuatan layanan. Adalah normal jika pod bisnis memulai ulang selama satu atau dua kali sebelum <code translate="no">etcd</code> dan <code translate="no">pulsar</code> aktif pada tahap awal.</p>
<p></div></p></li>
<li><p>Dapatkan alamat layanan Milvus.</p>
<pre><code translate="no" class="language-shell">kubectl <span class="hljs-keyword">get</span> svc -n milvus
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Verify-the-installation" class="common-anchor-header">Verifikasi instalasi<button data-href="#Verify-the-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Anda dapat mengikuti panduan sederhana di bawah ini untuk memverifikasi instalasi. Untuk lebih jelasnya, lihat <a href="https://milvus.io/docs/v2.3.x/example_code.md">contoh berikut</a>.</p>
<ul>
<li><p>Unduh kode contoh.</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/pymilvus/master/examples/hello_milvus.py</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Ubah argumen <code translate="no">host</code> pada kode contoh ke alamat layanan Milvus di atas.</p></li>
</ul>
<pre><code translate="no">```python
...
connections.connect(&quot;default&quot;, host=&quot;milvus-service-06b515b1ce9ad10.elb.us-east-2.amazonaws.com&quot;, port=&quot;19530&quot;)
...
```
</code></pre>
<ul>
<li><p>Jalankan kode contoh tersebut.</p>
<pre><code translate="no" class="language-shell">python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p>Hasilnya akan serupa dengan yang berikut ini:</p>
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
<h2 id="Clean-up-works" class="common-anchor-header">Pekerjaan pembersihan<button data-href="#Clean-up-works" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda perlu memulihkan lingkungan dengan mencopot pemasangan Milvus, menghancurkan cluster EKS, dan menghapus bucket AWS S3 dan kebijakan IAM terkait.</p>
<ul>
<li><p>Copot pemasangan Milvus.</p>
<pre><code translate="no" class="language-shell">helm uninstall milvus-demo -n milvus
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Hancurkan cluster EKS.</p>
<pre><code translate="no" class="language-shell">eksctl <span class="hljs-keyword">delete</span> cluster --name milvus-eks-cluster --region us-east-<span class="hljs-number">2</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Hapus bucket AWS S3 dan kebijakan IAM terkait.</p>
<p><strong>Anda harus mengganti nama bucket dan ARN kebijakan dengan nama Anda sendiri.</strong></p>
<pre><code translate="no" class="language-shell">aws s3 rm <span class="hljs-attr">s3</span>:<span class="hljs-comment">//milvus-bucket-039dd013c0712f085d60e21f --recursive</span>

aws s3api <span class="hljs-keyword">delete</span>-bucket --bucket milvus-bucket-039dd013c0712f085d60e21f --region us-east-<span class="hljs-number">2</span>

aws iam detach-user-policy --user-name &lt;your-user-name&gt; --policy-arn <span class="hljs-string">&quot;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&quot;</span>

aws iam <span class="hljs-keyword">delete</span>-policy --policy-arn <span class="hljs-string">&#x27;arn:aws:iam::12345678901:policy/MilvusS3ReadWrite&#x27;</span>
<button class="copy-code-btn"></button></code></pre></li>

</ul>
<h2 id="Whats-next" class="common-anchor-header">Apa selanjutnya<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>Jika Anda ingin mempelajari cara menerapkan Milvus di cloud lain:</p>
<ul>
<li><a href="/docs/id/v2.5.x/gcp.md">Menerapkan Milvus Cluster di GCP dengan Kubernetes</a></li>
<li><a href="/docs/id/v2.5.x/azure.md">Menerapkan Milvus Cluster di Azure dengan Kubernetes</a></li>
</ul>
