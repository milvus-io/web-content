---
id: upgrade_milvus_cluster-helm.md
label: Helm
order: 1
group: upgrade_milvus_cluster-operator.md
related_key: upgrade Milvus Cluster
summary: Saiba como atualizar o cluster Milvus com o Helm Chart.
title: Atualizar o cluster Milvus com o Helm Chart
---
<div class="tab-wrapper"><a href="/docs/pt/upgrade_milvus_cluster-operator.md" class=''>Milvus</a><a href="/docs/pt/upgrade_milvus_cluster-helm.md" class='active '>OperatorHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Helm-Chart" class="common-anchor-header">Atualizar o cluster Milvus com o Helm Chart<button data-href="#Upgrade-Milvus-Cluster-with-Helm-Chart" class="anchor-icon" translate="no">
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
    </button></h1><p>Este guia descreve como atualizar o seu cluster Milvus 2.6.x para a versão 3.0.0 utilizando o Helm.</p>
<div class="alert note">
<p>Este procedimento foi validado da versão Milvus 2.6.20 para a v3.0.0 com o Helm Chart do Milvus 5.0.22. Se utilizar outra versão de patch do Milvus 2.6.x ou outra versão do Helm Chart, valide primeiro a atualização num ambiente que não seja de produção.</p>
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
<li>Helm 3.14.0 ou posterior</li>
<li>Uma implementação existente do Milvus 2.6.x gerida pelo Helm</li>
<li>Os valores do Helm utilizados na implementação existente</li>
<li>Uma cópia de segurança atualizada dos metadados e dados persistentes do Milvus</li>
</ul>
<p><strong>Limitações da fila de mensagens</strong>: Ao atualizar para o Milvus v3.0.0, deve manter a sua escolha atual de fila de mensagens. A alternância entre diferentes sistemas de filas de mensagens durante a atualização não é suportada. O suporte à alteração de sistemas de filas de mensagens estará disponível em versões futuras.</p>
<div class="alert warning">
<p>Não altere nem faça o downgrade do Helm Chart como parte deste procedimento. Mantenha a versão do Chart já instalada para a sua versão do Helm. A linha de base testada manteve o Helm Chart 5.0.22 e alterou apenas a etiqueta da imagem do Milvus para <code translate="no">v3.0.0</code>.</p>
<p>Este procedimento não valida um downgrade ou uma reversão que implique alterar a imagem do Milvus de volta para a versão 2.6.x. Depois de a v3.0.0 gravar dados, uma reversão apenas da imagem pode não conseguir ler o estado atualizado. Se a atualização falhar, interrompa as gravações e utilize um plano de recuperação que restaure os metadados anteriores à atualização e as cópias de segurança dos dados persistentes. Valide primeiro o plano de recuperação num ambiente que não seja de produção.</p>
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
    </button></h2><p>A implementação validada do Milvus 2.6.20, criada com o Helm Chart 5.0.22, utilizou o MixCoord e o StreamingNode e não executou o IndexNode. Não é necessária uma etapa separada de migração do coordenador quando a sua implementação utiliza a mesma topologia.</p>
<h3 id="Step-1-Confirm-the-current-topology" class="common-anchor-header">Passo 1: Confirmar a topologia atual<button data-href="#Step-1-Confirm-the-current-topology" class="anchor-icon" translate="no">
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
    </button></h3><p>Guarde os valores completos da versão atual e verifique os Pods em execução:</p>
<pre><code translate="no" class="language-bash">helm get values &lt;release-name&gt; \
  --namespace &lt;namespace&gt; \
  --all &gt; milvus-values-before-upgrade.yaml

kubectl get pods --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Confirme que o cluster utiliza o MixCoord e o StreamingNode e que nenhum Pod do IndexNode está em execução. O comando de atualização apresentado mais adiante neste guia preserva os valores existentes do Helm. Se os seus valores atuais ativarem o IndexNode ou utilizarem outra topologia de componentes, não execute esta atualização apenas da imagem. Reproduza a topologia num ambiente que não seja de produção e obtenha primeiro um plano de migração aprovado pela equipa de engenharia.</p>
<h3 id="Step-2-Update-the-Helm-repository" class="common-anchor-header">Passo 2: Atualizar o repositório Helm<button data-href="#Step-2-Update-the-Helm-repository" class="anchor-icon" translate="no">
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
    </button></h3><p>Adicione ou atualize o repositório Helm do Milvus:</p>
<pre><code translate="no" class="language-bash">helm repo add zilliztech https://zilliztech.github.io/milvus-helm --force-update
helm repo update zilliztech
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
O repositório de gráficos Helm do Milvus em <code translate="no">https://milvus-io.github.io/milvus-helm/</code> foi arquivado. Utilize o novo repositório <code translate="no">https://zilliztech.github.io/milvus-helm/</code> para as versões 4.0.31 e posteriores dos gráficos.
</div>
<h3 id="Step-3-Upgrade-Milvus" class="common-anchor-header">Passo 3: Atualizar o Milvus<button data-href="#Step-3-Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>Verifique a versão do gráfico instalada para a sua versão do Helm:</p>
<pre><code translate="no" class="language-bash">helm list --namespace &lt;namespace&gt;
<button class="copy-code-btn"></button></code></pre>
<p>Na coluna « <code translate="no">CHART</code> », remova o prefixo « <code translate="no">milvus-</code> » do valor e utilize a versão restante como « <code translate="no">&lt;current-chart-version&gt;</code> ». Em seguida, execute o comando de atualização:</p>
<pre><code translate="no" class="language-bash">helm upgrade &lt;release-name&gt; zilliztech/milvus \
  --namespace &lt;namespace&gt; \
  --version &lt;current-chart-version&gt; \
  --<span class="hljs-built_in">set</span> image.all.tag=<span class="hljs-string">&quot;v3.0.0&quot;</span> \
  --reset-then-reuse-values \
  --<span class="hljs-built_in">wait</span> \
  --<span class="hljs-built_in">timeout</span> 30m
<button class="copy-code-btn"></button></code></pre>
<p>A opção « <code translate="no">--reset-then-reuse-values</code> » mantém os valores da versão anterior, aplicando simultaneamente a substituição explícita da imagem em relação aos valores predefinidos do Chart selecionado.</p>
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
    </button></h2><p>Verifique a revisão do Helm, o estado do Pod e as imagens de contentor:</p>
<pre><code translate="no" class="language-bash">helm <span class="hljs-built_in">history</span> &lt;release-name&gt; --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt;

kubectl get pods --namespace &lt;namespace&gt; \
  -o jsonpath=<span class="hljs-string">&#x27;{range .items[*]}{.metadata.name}{&quot;\t&quot;}{range .spec.containers[*]}{.image}{&quot; &quot;}{end}{&quot;\n&quot;}{end}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Verifique se todas as cargas de trabalho necessárias estão prontas, se todos os componentes do Milvus utilizam « <code translate="no">v3.0.0</code> » e se as suas coleções existentes continuam a poder ser consultadas e pesquisadas. Conclua estas verificações antes de ativar qualquer funcionalidade específica da versão 3.0.0.</p>
<div class="alert note">
<p>A atualização para o Milvus 3.0 não ativa o Storage V3. Depois de verificar a atualização, analise <a href="/docs/pt/storage-v3.md">o Storage V3</a> antes de ativar funcionalidades que dependam dele. Assim que o Milvus gravar dados no Storage V3, não será suportado o regresso a uma versão anterior do Milvus que não consiga ler o Storage V3.</p>
</div>
