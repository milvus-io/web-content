---
id: aws.md
title: نشر مجموعة Milvus العنقودية على EC2
related_key: cluster
summary: تعرّف على كيفية نشر مجموعة Milvus العنقودية على AWS EC2.
---

<h1 id="Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="common-anchor-header">(مهملة) نشر مجموعة Milvus على EC2<button data-href="#Deprecated-Deploy-a-Milvus-Cluster-on-EC2" class="anchor-icon" translate="no">
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
    </button></h1><p>يصف هذا الموضوع كيفية نشر مجموعة Milvus على <a href="https://docs.aws.amazon.com/ec2/">Amazon EC2</a> باستخدام Terraform و Ansible.</p>
<div class="alert note">
<p>هذا الموضوع قديم وستتم إزالته قريبًا. يُنصح بالرجوع إلى <a href="/docs/ar/v2.5.x/eks.md">نشر مجموعة Milvus العنقودية على EKS</a> بدلاً من ذلك.</p>
</div>
<h2 id="Provision-a-Milvus-cluster" class="common-anchor-header">توفير مجموعة Milvus العنقودية<button data-href="#Provision-a-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>يصف هذا القسم كيفية استخدام تيرافورم Terraform لتوفير مجموعة Milvus العنقودية.</p>
<p><a href="https://www.terraform.io/">تيرافورم</a> هي أداة برمجية للبنية التحتية كرمز (IaC). باستخدام تيرافورم، يمكنك توفير البنية التحتية باستخدام ملفات التكوين التوضيحية.</p>
<h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية</h3><ul>
<li><p>تثبيت <a href="https://www.terraform.io/downloads.html">تيرافورم</a> وتكوينه</p></li>
<li><p>تثبيت وتكوين <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">واجهة مستخدم AWS CLI</a></p></li>
</ul>
<h3 id="Prepare-configuration" class="common-anchor-header">إعداد التكوين</h3><p>يمكنك تنزيل ملفات تكوين القالب من <a href="https://drive.google.com/file/d/1jLQV0YkseOVj5X0exj17x9dWQjLCP7-1/view">Google Drive</a>.</p>
<ul>
<li><p><code translate="no">main.tf</code></p>
<p>يحتوي هذا الملف على التكوين الخاص بتوفير مجموعة Milvus.</p></li>
<li><p><code translate="no">variables.tf</code></p>
<p>يسمح هذا الملف بالتحرير السريع للمتغيرات المستخدمة لإعداد مجموعة Milvus أو تحديثها.</p></li>
<li><p><code translate="no">output.tf</code> و <code translate="no">inventory.tmpl</code></p>
<p>تخزن هذه الملفات البيانات الوصفية لمجموعة Milvus العنقودية. البيانات الوصفية المستخدمة في هذا الموضوع هي <code translate="no">public_ip</code> لكل مثيل عقدة، <code translate="no">private_ip</code> لكل مثيل عقدة، وجميع معرفات مثيلات EC2.</p></li>
</ul>
<h4 id="Prepare-variablestf" class="common-anchor-header">إعداد المتغيرات.tf</h4><p>يصف هذا القسم التكوين الذي يحتوي عليه ملف <code translate="no">variables.tf</code> الذي يحتوي على.</p>
<ul>
<li><p>عدد العقد</p>
<p>يعلن القالب التالي متغير <code translate="no">index_count</code> المستخدم لتعيين عدد عقد الفهرس.</p>
  <div class="alert note">يجب أن تكون قيمة <code translate="no">index_count</code> أكبر من أو تساوي واحدًا.</div>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_count&quot;</span> {
  description = <span class="hljs-string">&quot;Amount of index instances to run&quot;</span>
  <span class="hljs-keyword">type</span>        = number
  <span class="hljs-keyword">default</span>     = <span class="hljs-number">5</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>نوع المثيل لنوع العقدة</p>
<p>يعلن القالب التالي عن متغير <code translate="no">index_ec2_type</code> يستخدم لتعيين <a href="https://aws.amazon.com/ec2/instance-types/">نوع المثيل</a> لعقد الفهرس.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;index_ec2_type&quot;</span> {
  description = <span class="hljs-string">&quot;Which server type&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;c5.2xlarge&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>إذن الوصول</p>
<p>يعلن القالب التالي عن متغير <code translate="no">key_name</code> ومتغير <code translate="no">my_ip</code>. يمثل المتغير <code translate="no">key_name</code> مفتاح وصول AWS. يمثل المتغير <code translate="no">my_ip</code> نطاق عنوان IP لمجموعة الأمان.</p>
<pre><code translate="no" class="language-variables.tf">variable <span class="hljs-string">&quot;key_name&quot;</span> {
  description = <span class="hljs-string">&quot;Which aws key to use for access into instances, needs to be uploaded already&quot;</span>
  <span class="hljs-keyword">type</span>        = <span class="hljs-type">string</span>
  <span class="hljs-keyword">default</span>     = <span class="hljs-string">&quot;&quot;</span>
}

variable <span class="hljs-string">&quot;my_ip&quot;</span> {
description = <span class="hljs-string">&quot;my_ip for security group. used so that ansible and terraform can ssh in&quot;</span>
<span class="hljs-keyword">type</span> = <span class="hljs-type">string</span>
<span class="hljs-keyword">default</span> = <span class="hljs-string">&quot;x.x.x.x/32&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>

</ul>
<h4 id="Prepare-maintf" class="common-anchor-header">إعداد main.tf</h4><p>يصف هذا القسم التكوينات التي يحتوي عليها ملف <code translate="no">main.tf</code> الذي يحتوي على.</p>
<ul>
<li><p>موفر السحابة والمنطقة</p>
<p>يستخدم القالب التالي المنطقة <code translate="no">us-east-2</code>. راجع <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions">المناطق المتاحة</a> لمزيد من المعلومات.</p>
<pre><code translate="no" class="language-main.tf">provider <span class="hljs-string">&quot;aws&quot;</span> {
  profile = <span class="hljs-string">&quot;default&quot;</span>
  region  = <span class="hljs-string">&quot;us-east-2&quot;</span>
}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>مجموعة الأمان</p>
<p>يقوم القالب التالي بإعلان مجموعة أمان تسمح بنقل البيانات الواردة من نطاق عناوين CIDR الذي يمثله <code translate="no">my_ip</code> المعلن في <code translate="no">variables.tf</code>.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_security_group&quot;</span> <span class="hljs-string">&quot;cluster_sg&quot;</span> {
  name        = <span class="hljs-string">&quot;cluster_sg&quot;</span>
  description = <span class="hljs-string">&quot;Allows only me to access&quot;</span>
  vpc_id      = aws_vpc.<span class="hljs-property">cluster_vpc</span>.<span class="hljs-property">id</span>

ingress {
description = <span class="hljs-string">&quot;All ports from my IP&quot;</span>
from_port = <span class="hljs-number">0</span>
to_port = <span class="hljs-number">65535</span>
protocol = <span class="hljs-string">&quot;tcp&quot;</span>
cidr_blocks = [<span class="hljs-keyword">var</span>.<span class="hljs-property">my_ip</span>]
}

ingress {
description = <span class="hljs-string">&quot;Full subnet communication&quot;</span>
from_port = <span class="hljs-number">0</span>
to_port = <span class="hljs-number">65535</span>
protocol = <span class="hljs-string">&quot;all&quot;</span>
self = <span class="hljs-literal">true</span>
}

egress {
from_port = <span class="hljs-number">0</span>
to_port = <span class="hljs-number">0</span>
protocol = <span class="hljs-string">&quot;-1&quot;</span>
cidr_blocks = [<span class="hljs-string">&quot;0.0.0.0/0&quot;</span>]
ipv6_cidr_blocks = [<span class="hljs-string">&quot;::/0&quot;</span>]
}

tags = {
<span class="hljs-title class_">Name</span> = <span class="hljs-string">&quot;cluster_sg&quot;</span>
}
}
<button class="copy-code-btn"></button></code></pre></li>

<li><p>VPC</p>
<p>يحدد القالب التالي VPC مع كتلة 10.0.0.0.0/24 CIDR 10.0.0.0/24 على مجموعة Milvus.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_vpc&quot;</span> <span class="hljs-string">&quot;cluster_vpc&quot;</span> {
  cidr_block = <span class="hljs-string">&quot;10.0.0.0/24&quot;</span>
  tags = {
    Name = <span class="hljs-string">&quot;cluster_vpc&quot;</span>
  }
}

resource <span class="hljs-string">&quot;aws_internet_gateway&quot;</span> <span class="hljs-string">&quot;cluster_gateway&quot;</span> {
vpc_id = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>

tags = {
Name = <span class="hljs-string">&quot;cluster_gateway&quot;</span>
}
}
<button class="copy-code-btn"></button></code></pre></li>

<li><p>الشبكات الفرعية (اختياري)</p>
<p>يعلن القالب التالي شبكة فرعية يتم توجيه حركة المرور الخاصة بها إلى بوابة إنترنت. في هذه الحالة، يكون حجم كتلة CIDR للشبكة الفرعية هو نفس حجم كتلة CIDR للشبكة الفرعية في VPC.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_subnet&quot;</span> <span class="hljs-string">&quot;cluster_subnet&quot;</span> {
  vpc_id                  = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>
  cidr_block              = <span class="hljs-string">&quot;10.0.0.0/24&quot;</span>
  map_public_ip_on_launch = true

tags = {
Name = <span class="hljs-string">&quot;cluster_subnet&quot;</span>
}
}

resource <span class="hljs-string">&quot;aws_route_table&quot;</span> <span class="hljs-string">&quot;cluster_subnet_gateway_route&quot;</span> {
vpc_id = aws_vpc.cluster_vpc.<span class="hljs-built_in">id</span>

route {
cidr_block = <span class="hljs-string">&quot;0.0.0.0/0&quot;</span>
gateway_id = aws_internet_gateway.cluster_gateway.<span class="hljs-built_in">id</span>
}

tags = {
Name = <span class="hljs-string">&quot;cluster_subnet_gateway_route&quot;</span>
}
}

resource <span class="hljs-string">&quot;aws_route_table_association&quot;</span> <span class="hljs-string">&quot;cluster_subnet_add_gateway&quot;</span> {
subnet_id = aws_subnet.cluster_subnet.<span class="hljs-built_in">id</span>
route_table_id = aws_route_table.cluster_subnet_gateway_route.<span class="hljs-built_in">id</span>
}

<button class="copy-code-btn"></button></code></pre></li>

<li><p>مثيلات العقدة (العقد)</p>
<p>يعلن القالب التالي عن مثيل عقدة MinIO. يعلن ملف القالب <code translate="no">main.tf</code> عن عقد من 11 نوعاً من العقد. بالنسبة لبعض أنواع العقد، تحتاج إلى تعيين <code translate="no">root_block_device</code>. انظر <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#ebs-ephemeral-and-root-block-devices">EBS، وEBS، وأجهزة الكتل الجذرية سريعة الزوال، وأجهزة الكتل الجذرية</a> لمزيد من المعلومات.</p>
<pre><code translate="no" class="language-main.tf">resource <span class="hljs-string">&quot;aws_instance&quot;</span> <span class="hljs-string">&quot;minio_node&quot;</span> {
  count         = <span class="hljs-keyword">var</span>.<span class="hljs-type">minio_count</span>
  <span class="hljs-variable">ami</span>           <span class="hljs-operator">=</span> <span class="hljs-string">&quot;ami-0d8d212151031f51c&quot;</span>
  instance_type = <span class="hljs-keyword">var</span>.<span class="hljs-type">minio_ec2_type</span>
  <span class="hljs-variable">key_name</span>      <span class="hljs-operator">=</span> <span class="hljs-keyword">var</span>.<span class="hljs-type">key_name</span>
  <span class="hljs-variable">subnet_id</span>     <span class="hljs-operator">=</span> aws_subnet.cluster_subnet.<span class="hljs-type">id</span> 
  <span class="hljs-variable">vpc_security_group_ids</span> <span class="hljs-operator">=</span> [aws_security_group.cluster_sg.id]

root_block_device {
volume_type = <span class="hljs-string">&quot;gp2&quot;</span>
volume_size = <span class="hljs-number">1000</span>
}

tags = {
Name = <span class="hljs-string">&quot;minio-${count.index + 1}&quot;</span>
}
}
<button class="copy-code-btn"></button></code></pre></li>

</ul>
<h3 id="Apply-the-configuration" class="common-anchor-header">تطبيق التكوين</h3><ol>
<li><p>افتح محطة طرفية وانتقل إلى المجلد الذي يخزن <code translate="no">main.tf</code>.</p></li>
<li><p>لتهيئة التهيئة، قم بتشغيل <code translate="no">terraform init</code>.</p></li>
<li><p>لتطبيق التهيئة، قم بتشغيل <code translate="no">terraform apply</code> وأدخل <code translate="no">yes</code> عندما يُطلب منك ذلك.</p></li>
</ol>
<p>لقد قمت الآن بتزويد مجموعة Milvus مع تيرافورم.</p>
<h2 id="Start-the-Milvus-cluster" class="common-anchor-header">بدء تشغيل مجموعة ميلفوس<button data-href="#Start-the-Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p>يصف هذا القسم كيفية استخدام Ansible لبدء تشغيل مجموعة Milvus التي قمت بتزويدها.</p>
<p><a href="https://www.ansible.com/overview/how-ansible-works">Ansible</a> هي أداة لإدارة التكوين تُستخدم لأتمتة توفير السحابة وإدارة التكوين.</p>
<h3 id="Prerequisites" class="common-anchor-header">المتطلبات الأساسية</h3><ul>
<li><a href="https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html">وحدة تحكم أنسيبل</a> مثبتة.</li>
</ul>
<h3 id="Download-Ansible-Milvus-node-deployment-Playbook" class="common-anchor-header">تنزيل دليل تشغيل نشر عقدة Milvus Ansible Milvus</h3><p>قم باستنساخ مستودع Milvus من GitHub لتنزيل دليل تشغيل نشر عقدة Ansible Milvus.</p>
<pre><code translate="no">git <span class="hljs-built_in">clone</span> https://github.com/milvus-io/milvus.git
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configure-installation-files" class="common-anchor-header">تكوين ملفات التثبيت</h3><p>يتم استخدام الملفين <code translate="no">inventory.ini</code> و <code translate="no">ansible.cfg</code> للتحكم في متغيرات البيئة وطرق التحقق من تسجيل الدخول في كتاب تشغيل Ansible. في الملف <code translate="no">inventory.ini</code> ، يحدد القسم <code translate="no">dockernodes</code> جميع خوادم محركات دوكر. يحدد قسم <code translate="no">ansible.cfg</code> جميع خوادم منسقي ميلفوس. يحدد قسم <code translate="no">node</code> جميع خوادم عقد ميلفوس.</p>
<p>أدخل المسار المحلي لدليل التشغيل وقم بتكوين ملفات التثبيت.</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">cd</span> ./milvus/deployments/docker/cluster-distributed-deployment
<button class="copy-code-btn"></button></code></pre>
<h4 id="inventoryini" class="common-anchor-header"><code translate="no">inventory.ini</code></h4><p>قم بتكوين <code translate="no">inventory.ini</code> لتقسيم المضيفين في مجموعات وفقاً لأدوارهم في نظام ميلفوس.</p>
<p>أضف أسماء المضيفين، وحدد <code translate="no">docker</code> المجموعة و <code translate="no">vars</code>.</p>
<pre><code translate="no">[<span class="hljs-meta">dockernodes</span>] <span class="hljs-meta">#Add docker host names.</span>
dockernode01
dockernode02
dockernode03

[<span class="hljs-meta">admin</span>] <span class="hljs-meta">#Add Ansible controller name.</span>
ansible-controller

[<span class="hljs-meta">coords</span>] <span class="hljs-meta">#Add the host names of Milvus coordinators.</span>
; Take note the IP of <span class="hljs-keyword">this</span> host VM, <span class="hljs-keyword">and</span> replace <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.17</span> <span class="hljs-keyword">with</span> it.
dockernode01

[<span class="hljs-meta">nodes</span>] <span class="hljs-meta">#Add the host names of Milvus nodes.</span>
dockernode02

[<span class="hljs-meta">dependencies</span>] <span class="hljs-meta">#Add the host names of Milvus dependencies.</span>
; dependencies node will host etcd, minio, pulsar, these <span class="hljs-number">3</span> roles are the foundation of Milvus.
; Take note the IP of <span class="hljs-keyword">this</span> host VM, <span class="hljs-keyword">and</span> replace <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span> <span class="hljs-keyword">with</span> it.
dockernode03

[<span class="hljs-meta">docker:children</span>]
dockernodes
coords
nodes
dependencies

[<span class="hljs-meta">docker:vars</span>]
ansible_python_interpreter= /usr/bin/python3
StrictHostKeyChecking= no

; Setup variables to control what type of network to use <span class="hljs-keyword">when</span> creating containers.
dependencies_network= host
nodes_network= host

; Setup varibale to control what version of Milvus image to use.
image= milvusdb/milvus-dev:master<span class="hljs-number">-20220412</span><span class="hljs-number">-4781</span>db8a

; Setup <span class="hljs-keyword">static</span> IP addresses of the docker hosts <span class="hljs-keyword">as</span> variable <span class="hljs-keyword">for</span> container environment variable config.
; Before running the playbook, below <span class="hljs-number">4</span> IP addresses need to be replaced <span class="hljs-keyword">with</span> the IP of your host VM
; <span class="hljs-keyword">on</span> which the etcd, minio, pulsar, coordinators will be hosted.
etcd_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
minio_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
pulsar_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.19</span>
coords_ip= <span class="hljs-number">10.170</span><span class="hljs-number">.0</span><span class="hljs-number">.17</span>

; Setup container environment which later will be used <span class="hljs-keyword">in</span> container creation.
ETCD_ENDPOINTS= {{etcd_ip}}:<span class="hljs-number">2379</span>
MINIO_ADDRESS= {{minio_ip}}:<span class="hljs-number">9000</span>
PULSAR_ADDRESS= pulsar:<span class="hljs-comment">//{{pulsar_ip}}:6650</span>
QUERY_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">19531</span>
DATA_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">13333</span>
ROOT_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">53100</span>
INDEX_COORD_ADDRESS= {{coords_ip}}:<span class="hljs-number">31000</span>
<button class="copy-code-btn"></button></code></pre>

<h4 id="ansiblecfg" class="common-anchor-header"><code translate="no">ansible.cfg</code></h4><p><code translate="no">ansible.cfg</code> التحكم في عمل كتاب التشغيل، على سبيل المثال، مفتاح SSH، إلخ. لا تقم بإعداد عبارة المرور عبر مفتاح SSH على مضيفي docker. وإلا سيفشل اتصال Ansible SSH. نوصي بإعداد نفس اسم المستخدم ومفتاح SSH على المضيفين الثلاثة وإعداد حساب المستخدم الجديد لتنفيذ sudo بدون كلمة مرور. خلاف ذلك، ستتلقى أخطاءً تفيد بأن اسم المستخدم لا يتطابق مع كلمة المرور أو أنك لم تُمنح امتيازات مرتفعة عند تشغيل كتاب تشغيل Ansible playbook.</p>
<pre><code translate="no">[defaults]
host_key_checking = <span class="hljs-literal">False</span>
inventory = inventory.ini <span class="hljs-comment"># Specify the Inventory file</span>
private_key_file=~/.my_ssh_keys/gpc_sshkey <span class="hljs-comment"># Specify the SSH key that Ansible uses to access Docker host</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="deploy-dockeryml" class="common-anchor-header"><code translate="no">deploy-docker.yml</code></h4><p><code translate="no">deploy-docker.yml</code> يحدد المهام أثناء تثبيت Docker. راجع التعليقات البرمجية في الملف للحصول على التفاصيل.</p>
<pre><code translate="no" class="language-yaml">---
- name: setup pre-requisites <span class="hljs-comment"># Install prerequisite</span>
  hosts: all
  become: <span class="hljs-built_in">yes</span>
  become_user: root
  roles:
    - install-modules
    - configure-hosts-file

- name: install docker
become: <span class="hljs-built_in">yes</span>
become_user: root
hosts: dockernodes
roles: - docker-installation
<button class="copy-code-btn"></button></code></pre>
<h3 id="Test-Ansible-connectivity" class="common-anchor-header">اختبار الاتصال بـ Ansible</h3><p>اختبر الاتصال بـ Ansible.</p>
<pre><code translate="no" class="language-shell">$ ansible <span class="hljs-built_in">all</span> -m ping
<button class="copy-code-btn"></button></code></pre>
<p>أضف <code translate="no">-i</code> في الأمر لتحديد المسار إلى ملف المخزون إذا لم تحدده في <code translate="no">ansible.cfg</code> ، وإلا يستخدم Ansible <code translate="no">/etc/ansible/hosts</code>.</p>
<p>تعود المحطة الطرفية على النحو التالي:</p>
<pre><code translate="no">dockernode01 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
<span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
<span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
ansible-controller | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;ansible_facts&quot;</span>: {
        <span class="hljs-string">&quot;discovered_interpreter_python&quot;</span>: <span class="hljs-string">&quot;/usr/bin/python3&quot;</span>
    },
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
dockernode03 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
dockernode02 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">&quot;changed&quot;</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">&quot;ping&quot;</span>: <span class="hljs-string">&quot;pong&quot;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Playbook-Syntax" class="common-anchor-header">تحقق من بناء جملة دفتر التشغيل</h3><p>تحقق من بناء جملة دفتر التشغيل.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>عادةً ما ترجع المحطة الطرفية على النحو التالي:</p>
<pre><code translate="no">playbook: deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Install-Docker" class="common-anchor-header">تثبيت Docker</h3><p>قم بتثبيت Docker باستخدام Playbook.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-docker.yml
<button class="copy-code-btn"></button></code></pre>
<p>إذا تم تثبيت Docker بنجاح على المضيفين الثلاثة، ستُظهر المحطة الطرفية ما يلي:</p>
<pre><code translate="no">TASK [docker-installation : Install Docker-CE] *******************************************************************
ok: [dockernode01]
ok: [dockernode03]
ok: [dockernode02]

TASK [docker-installation : Install python3-docker] ******************************\*\*******************************
ok: [dockernode01]
ok: [dockernode02]
ok: [dockernode03]

TASK [docker-installation : Install docker-compose python3 library] **********************\*\***********************
changed: [dockernode01]
changed: [dockernode03]
changed: [dockernode02]

PLAY RECAP **************************************************\*\*\***************************************************
ansible-controller : ok=3 changed=0 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
dockernode01 : ok=10 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
dockernode02 : ok=10 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
dockernode03 : ok=10 changed=1 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
<button class="copy-code-btn"></button></code></pre>

<h3 id="Verify-the-installation" class="common-anchor-header">التحقق من التثبيت</h3><p>قم بتسجيل الدخول إلى المضيفين الثلاثة باستخدام مفتاح SSH، وتحقق من التثبيت على المضيفين.</p>
<ul>
<li>للمضيف الجذر:</li>
</ul>
<pre><code translate="no" class="language-shell">$ docker -v
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>للمضيفين غير الجذر:</li>
</ul>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker -v
<button class="copy-code-btn"></button></code></pre>
<p>عادة، تعود المحطة الطرفية على النحو التالي:</p>
<pre><code translate="no">Docker version 20.10.14, build a224086
<button class="copy-code-btn"></button></code></pre>
<p>تحقق من حالة تشغيل الحاويات.</p>
<pre><code translate="no" class="language-shell">$ docker ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Check-the-Syntax" class="common-anchor-header">تحقق من بناء الجملة</h3><p>تحقق من بناء الجملة <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml --syntax-check
<button class="copy-code-btn"></button></code></pre>
<p>عادة، تعود المحطة الطرفية على النحو التالي:</p>
<pre><code translate="no">playbook: deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Milvus-container" class="common-anchor-header">إنشاء حاوية ميلفوس</h3><p>يتم تعريف مهام إنشاء حاوية ميلفوس في <code translate="no">deploy-milvus.yml</code>.</p>
<pre><code translate="no" class="language-shell">$ ansible-playbook deploy-milvus.yml
<button class="copy-code-btn"></button></code></pre>
<p>تعود المحطة الطرفية على النحو التالي:</p>
<pre><code translate="no">PLAY [Create milvus-etcd, minio, pulsar] *****************************************************************

TASK [Gathering Facts] ********************************************\*\*\*\*********************************************
ok: [dockernode03]

TASK [etcd] **************************************************\*\*\***************************************************
changed: [dockernode03]

TASK [pulsar] **************************************************\***************************************************
changed: [dockernode03]

TASK [minio] **************************************************\*\***************************************************
changed: [dockernode03]

PLAY [Create milvus nodes] ******************************************\*\*\*\*******************************************

TASK [Gathering Facts] ********************************************\*\*\*\*********************************************
ok: [dockernode02]

TASK [querynode] ************************************************\*\*************************************************
changed: [dockernode02]

TASK [datanode] ************************************************\*\*\*************************************************
changed: [dockernode02]

TASK [indexnode] ************************************************\*\*************************************************
changed: [dockernode02]

PLAY [Create milvus coords] ******************************************\*\*\*******************************************

TASK [Gathering Facts] ********************************************\*\*\*\*********************************************
ok: [dockernode01]

TASK [rootcoord] ************************************************\*\*************************************************
changed: [dockernode01]

TASK [datacoord] ************************************************\*\*************************************************
changed: [dockernode01]

TASK [querycoord] ************************************************\*************************************************
changed: [dockernode01]

TASK [indexcoord] ************************************************\*************************************************
changed: [dockernode01]

TASK [proxy] **************************************************\*\***************************************************
changed: [dockernode01]

PLAY RECAP **************************************************\*\*\*\***************************************************
dockernode01 : ok=6 changed=5 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
dockernode02 : ok=4 changed=3 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
dockernode03 : ok=4 changed=3 unreachable=0 failed=0 skipped=0 rescued=0 ignored=0
<button class="copy-code-btn"></button></code></pre>

<p>الآن تم نشر Milvus على المضيفين الثلاثة.</p>
<h2 id="Stop-nodes" class="common-anchor-header">إيقاف العقد<button data-href="#Stop-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>يمكنك إيقاف جميع العقد بعد أن لم تعد بحاجة إلى مجموعة Milvus بعد الآن.</p>
<div class="alert note"> تأكد من توفر ثنائي <code translate="no">terraform</code> على موقعك <code translate="no">PATH</code>. </div>
<ol>
<li><p>قم بتشغيل <code translate="no">terraform destroy</code> وأدخل <code translate="no">yes</code> عندما يُطلب منك ذلك.</p></li>
<li><p>إذا نجحت، يتم إيقاف جميع مثيلات العقد.</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">ما التالي<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>إذا كنت ترغب في معرفة كيفية نشر Milvus على السحب الأخرى:</p>
<ul>
<li><a href="/docs/ar/v2.5.x/eks.md">نشر مجموعة ميلفوس العنقودية على EKS</a></li>
<li><a href="/docs/ar/v2.5.x/gcp.md">نشر مجموعة Milvus العنقودية على GCP باستخدام Kubernetes</a></li>
<li><a href="/docs/ar/v2.5.x/azure.md">دليل نشر Milvus على Microsoft Azure باستخدام Kubernetes</a></li>
</ul>
