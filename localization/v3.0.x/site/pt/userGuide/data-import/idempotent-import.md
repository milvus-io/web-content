---
id: idempotent-import.md
order: 2
title: Importação em massa idempotente
summary: >-
  Envie uma chave de idempotência para que uma importação em massa repetida seja
  associada à tarefa original, em vez de criar uma segunda tarefa.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Importação em massa idempotente<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>Um pedido de importação em massa pode ser bem-sucedido, mas a resposta pode perder-se: o tempo de espera da chamada esgota-se, a ligação é interrompida ou o seu orquestrador encerra a execução antes de guardar o <code translate="no">jobId</code> devolvido. Não é possível distinguir entre «não concluído» e «concluído, resposta perdida». Repetir a tentativa inicia uma segunda tarefa e cada linha é importada duas vezes; não repetir a tentativa pode resultar na perda da importação.</p>
<p>Uma chave de idempotência elimina essa escolha. Marque a solicitação com uma chave e uma nova tentativa com a mesma chave devolverá o ` <code translate="no">jobId</code> ` original, em vez de criar uma segunda tarefa.</p>
<p>A importação em massa idempotente requer o Milvus 3.0.2 ou posterior, ou 2.6.24 ou posterior na linha 2.6. Um servidor mais antigo ignora o cabeçalho e cada pedido, com ou sem nova tentativa, inicia uma nova tarefa.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Envio da chave<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>A chave é transmitida como o cabeçalho HTTP « <code translate="no">Idempotency-Key</code> », e não no corpo da solicitação.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> é <code translate="no">&quot;Idempotency-Key&quot;</code>; a cadeia de caracteres em bruto também funciona. O parâmetro <code translate="no">headers</code> e <code translate="no">IDEMPOTENCY_KEY_HEADER</code> requerem o pymilvus v3.0.3 ou posterior na linha 3.x, ou v2.6.18 ou posterior na linha 2.6. Numa versão mais antiga do pymilvus, a linha <code translate="no">import</code> acima falha com um erro « <code translate="no">ImportError</code> » na pesquisa de <code translate="no">IDEMPOTENCY_KEY_HEADER</code>, e passar <code translate="no">headers</code> para <code translate="no">bulk_import</code> tem um comportamento indefinido — a chamada pode dar erro, ou a importação pode ser submetida sem a chave.</p>
<p>Interroga <code translate="no">/v2/vectordb/jobs/import/describe</code> com o <code translate="no">jobId</code> devolvido, como habitualmente. Uma nova tentativa que chegue enquanto a original ainda está a ser registada aguarda por ela, pelo que uma nova tentativa nunca encontra um trabalho parcialmente registado.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Escolher uma chave<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>Uma chave por pedido lógico.</strong> Dê um nome à unidade de trabalho, como <code translate="no">orders-2026-09-07-batch-3</code>, ou gere um UUID e guarde-o com o item de trabalho antes de enviar o pedido. Inclua um número de tentativa caso seja necessário executar novamente o mesmo trabalho.</li>
<li><strong>Refaça a tentativa com a mesma chave.</strong> Criar uma nova chave numa nova tentativa é o que duplica os dados. As exceções estão listadas em <a href="#when-to-send-a-new-key">«Quando enviar uma nova chave</a>».</li>
<li><strong>Nunca reutilize uma chave para ficheiros diferentes.</strong> O Milvus não compara as duas solicitações. Receberá de volta o « <code translate="no">jobId</code> » original e os novos ficheiros não serão importados.</li>
<li><strong>Mantenha-a curta e imprimível.</strong> ASCII imprimível, no máximo 256 bytes por predefinição (<code translate="no">streaming.idempotency.maxKeyLength</code>). Qualquer outra coisa é rejeitada com o erro <code translate="no">1100</code>.</li>
<li><strong>Não inclua informações confidenciais.</strong> A chave é armazenada juntamente com os seus dados.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">Durante quanto tempo uma chave é memorizada<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>A chave está vinculada à coleção através do seu ID interno, pelo que renomear a coleção não interrompe uma nova tentativa, desde que esta se refira à coleção pelo seu novo nome. Eliminar e recriar a coleção com o mesmo nome interrompe-a, sendo que, nesse caso, a solução correta é iniciar uma nova tarefa.</p>
<p>O Milvus memoriza uma chave de importação durante cerca de um dia. Considere este valor como indicativo e não garantido: um tráfego intenso de DDL ou de importação encurta esse período, e um reinício do coordenador prolonga-o. Uma nova tentativa após a chave ter sido esquecida inicia uma nova tarefa.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">Quando enviar uma nova chave<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Dois casos, e apenas dois:</p>
<ul>
<li><strong>A tarefa original falhou ou foi abortada.</strong> O comando «describe» devolve « <code translate="no">state: Failed</code> » com um motivo. A repetição da tentativa com a mesma chave devolve o mesmo « <code translate="no">jobId</code> » enquanto a chave for lembrada. Corrija a causa e, em seguida, envie uma nova chave.</li>
<li><strong>A tarefa original foi eliminada.</strong> O Milvus mantém as tarefas concluídas durante <code translate="no">dataCoord.import.taskRetention</code> (48 horas por predefinição). Se esse prazo expirar enquanto a chave ainda estiver memorizada, a nova tentativa devolve o antigo <code translate="no">jobId</code>, e a função «describe» responde com o erro <code translate="no">import job does not exist</code> em vez de um estado da tarefa. Essa tarefa pode ter sido bem-sucedida. Confirme que os dados estão em falta antes de enviar uma nova chave.</li>
</ul>
<p>Uma nova tentativa que seja rejeitada, por exemplo, porque o limite de tarefas de importação está esgotado, não se enquadra nestes casos. Tente novamente mais tarde com a mesma chave.</p>
<h2 id="Configuration" class="common-anchor-header">Configuração<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Quatro parâmetros determinam o comportamento nesta página. Nenhum deles precisa de ser alterado para que a chave funcione.</p>
<table>
<thead>
<tr><th>Parâmetro</th><th>Padrão</th><th>O que faz</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>Durante quanto tempo uma chave de importação é memorizada. Não está presente no ficheiro predefinido « <code translate="no">milvus.yaml</code> »; adicione-o explicitamente para o alterar. O mesmo armazenamento também rejeita envios DDL duplicados, por isso não reduza este valor apenas para encurtar a janela de importação.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>Quantos registos de chaves e DDL o mesmo armazenamento retém antes de os mais antigos serem eliminados, independentemente da sua idade. É isto que permite que um tráfego intenso de DDL ou importação esqueça uma chave antes de <code translate="no">maxLifetime</code>. Não está presente no padrão <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 horas) desde a versão 2.6.24 e 3.0.2; <code translate="no">10800</code> antes</td><td>Durante quanto tempo uma tarefa de importação concluída permanece consultável. Mantenha este valor pelo menos o dobro de <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>O comprimento máximo da chave em bytes. Uma chave mais longa é rejeitada com o erro <code translate="no">1100</code>. <code translate="no">0</code> desativa o limite. Não está presente no <code translate="no">milvus.yaml</code> padrão.</td></tr>
</tbody>
</table>
<p>O ficheiro « <code translate="no">milvus.yaml</code> » fornecido antes das versões 2.6.24 e 3.0.2 define explicitamente « <code translate="no">taskRetention: 10800</code> », e uma atualização não substitui um valor no seu ficheiro. Se atualizou com esse ficheiro, aumente « <code translate="no">taskRetention</code> » para, pelo menos, o dobro de « <code translate="no">maxLifetime</code> ». O novo valor aplica-se apenas a tarefas que sejam concluídas após a alteração.</p>
