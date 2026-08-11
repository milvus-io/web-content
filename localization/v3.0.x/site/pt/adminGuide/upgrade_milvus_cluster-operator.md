---
id: upgrade_milvus_cluster-operator.md
label: Milvus Operator
order: 0
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Saiba como atualizar o cluster Milvus com o Milvus Operator.
title: Atualizar o cluster Milvus com o Milvus Operator
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_cluster-operator.md" class='active '>Milvus</a><a href="/docs/pt/upgrade_milvus_cluster-helm.md" class=''>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Milvus-Operator" class="common-anchor-header">Atualizar o cluster Milvus com o Milvus Operator<button data-href="#Upgrade-Milvus-Cluster-with-Milvus-Operator" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar um cluster Milvus 2.6.x para a versão v3.0-beta com o Milvus Operator.</p>
<div class="alert note">
<p>Este procedimento foi validado a partir do Milvus 2.6.20 para o Milvus v3.0-beta com o Milvus Operator 1.3.0, MixCoord, StreamingNode, Woodpecker, etcd no cluster e MinIO no cluster. Se utilizar outra versão de patch do Milvus 2.6.x, versão do Operator, topologia de componentes, fila de mensagens ou configuração de dependências, valide primeiro a atualização num ambiente que não seja de produção.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Pré-requisitos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>Um cluster Kubernetes com um cluster Milvus 2.6.x gerido pelo Milvus Operator</li>
<li><code translate="no">kubectl</code> acesso ao cluster</li>
<li>O manifesto completo do recurso personalizado (CR) do Milvus utilizado na implementação existente</li>
<li>O método de instalação e os manifestos utilizados para o Milvus Operator existente</li>
<li>Uma cópia de segurança atualizada dos metadados e dados persistentes do Milvus</li>
</ul>
<p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0-beta, deve manter a sua escolha atual de fila de mensagens. A alternância entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p>
<div class="alert warning">
<p>Aplique o CR completo do Milvus para esta atualização. Não utilize um patch de fusão apenas de imagem. O Operator pode preencher por predefinição campos de componentes omitidos com zero réplicas, o que pode reativar um componente que a implementação 2.6.x existente tenha desativado.</p>
<p>Este procedimento não valida um downgrade ou uma reversão, alterando a imagem do Milvus de volta para a versão 2.6.x. Depois de a v3.0-beta gravar dados, uma reversão apenas da imagem pode não conseguir ler o estado atualizado. Se a atualização falhar, interrompa as gravações e utilize um plano de recuperação que restaure os metadados anteriores à atualização e as cópias de segurança dos dados persistentes. Valide primeiro o plano de recuperação num ambiente que não seja de produção.</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">Processo de atualização<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-Milvus-CR" class="common-anchor-header">Passo 1: Faça uma cópia de segurança do CR atual do Milvus<button data-href="#Step-1-Back-up-the-current-Milvus-CR" class="anchor-icon" translate="no">
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
    </button></h3><p>Guarde o CR atual antes de alterar a implementação:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output yaml &gt; milvus-before-upgrade.yaml
<button class="copy-code-btn"></button></code></pre>
<p>Utilize o manifesto de origem da sua implementação existente como manifesto de atualização. Não aplique diretamente o ficheiro de cópia de segurança exportado sem primeiro remover os metadados geridos pelo servidor e os campos de estado.</p>
<h3 id="Step-2-Confirm-the-Milvus-Operator-version" class="common-anchor-header">Passo 2: Confirmar a versão do Milvus Operator<button data-href="#Step-2-Confirm-the-Milvus-Operator-version" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifique a imagem utilizada pelo Milvus Operator instalado:</p>
<pre><code translate="no" class="language-bash">kubectl get deployments --all-namespaces \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.namespace}{&quot;\t&quot;}{.metadata.name}{&quot;\t&quot;}{range .spec.template.spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span> \
  | grep milvus-operator
<button class="copy-code-btn"></button></code></pre>
<p>A atualização validada manteve o Milvus Operator na versão 1.3.0. Mantenha a versão do Operator que atualmente gere a sua implementação do Milvus 2.6.x, a menos que a sua política de suporte exija uma atualização separada do Operator. Não faça o downgrade de um Operator mais recente para a versão testada. Se precisar de alterar a versão do Operator, utilize o mesmo método de instalação do Helm ou do <code translate="no">kubectl</code> e o mesmo nome de versão e namespace que a instalação existente; em seguida, valide a alteração do Operator antes de atualizar o Milvus CR.</p>
<h3 id="Step-3-Update-the-Milvus-image" class="common-anchor-header">Passo 3: Atualizar a imagem do Milvus<button data-href="#Step-3-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>No manifesto completo do CR do Milvus, altere <code translate="no">spec.components.image</code> para a versão de destino. Mantenha o modo atual, a topologia dos componentes, a fila de mensagens, o etcd, o armazenamento e outras definições de dependências. O excerto seguinte mostra os campos a confirmar; não substitua o seu CR completo por este excerto.</p>
<p>Antes de aplicar o CR de destino, confirme que <code translate="no">indexNode.replicas</code> é <code translate="no">0</code>. A configuração validada do Milvus 2.6.20 já utilizava esta definição. Mantenha a definição explícita de zero réplicas no CR de destino.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">&lt;instance-name&gt;</span>
  <span class="hljs-attr">namespace:</span> <span class="hljs-string">&lt;namespace&gt;</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0-beta</span>
    <span class="hljs-attr">indexNode:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p>Aplique o manifesto CR completo:</p>
<pre><code translate="no" class="language-bash">kubectl apply --filename milvus.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-upgrade" class="common-anchor-header">Verifique a atualização<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>Verifique o estado do CR, o estado do Pod e as imagens dos contentores:</p>
<pre><code translate="no" class="language-bash">kubectl get milvus &lt;instance-name&gt; \
  --namespace &lt;namespace&gt; \
  --output jsonpath=<span class="hljs-string">&#x27;{.status.status}{&quot;\t&quot;}{.status.currentImage}{&quot;\n&quot;}&#x27;</span>

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se o CR do Milvus indica « <code translate="no">Healthy</code> », se todos os componentes do Milvus utilizam « <code translate="no">milvusdb/milvus:v3.0-beta</code> », se nenhum Pod do IndexNode está em execução e se as coleções existentes continuam a poder ser consultadas e pesquisadas. Conclua estas verificações antes de ativar qualquer funcionalidade específica da versão v3.0-beta.</p>
