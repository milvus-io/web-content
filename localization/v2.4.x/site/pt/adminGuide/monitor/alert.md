---
id: alert.md
title: Criar um alerta
related_key: monitor and alert.
summary: Saiba como criar um alerta para os serviços Milvus no Grafana.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Criar um alerta para os serviços Milvus<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>Este tópico apresenta o mecanismo de alerta para os serviços Milvus e explica porquê, quando e como criar alertas no Milvus.</p>
<p>Ao criar alertas, o utilizador pode receber notificações quando o valor de uma métrica específica exceder o limite predefinido.</p>
<p>Por exemplo, cria um alerta e define 80 MB como o valor máximo para a utilização de memória pelos componentes do Milvus. Se a utilização efectiva exceder o número predefinido, receberá alertas que o lembrarão de que a utilização de memória pelo componente Milvus excedeu os 80 MB. Após o alerta, pode então ajustar a atribuição de recursos em conformidade e atempadamente para garantir a disponibilidade do serviço.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">Cenários para a criação de alertas<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Seguem-se alguns cenários comuns para os quais é necessário criar um alerta.</p>
<ul>
<li>A utilização da CPU ou da memória pelos componentes do Milvus é demasiado elevada.</li>
<li>Os pods de componentes do Milvus estão com pouco espaço em disco.</li>
<li>Os pods de componentes do Milvus estão a reiniciar com demasiada frequência.</li>
</ul>
<p>As métricas a seguir estão disponíveis para a configuração de alertas:</p>
<table>
<thead>
<tr><th>Métrica</th><th>Descrição</th><th>Unidade de medida</th></tr>
</thead>
<tbody>
<tr><td>Uso da CPU</td><td>Utilização da CPU pelos componentes do Milvus que é indicada pelo tempo de funcionamento da CPU.</td><td>Segundo</td></tr>
<tr><td>Memória</td><td>Recursos de memória consumidos pelos componentes do Milvus.</td><td>MB</td></tr>
<tr><td>Rotinas</td><td>Actividades de execução simultânea em linguagem GO.</td><td>/</td></tr>
<tr><td>Threads do SO</td><td>Threads, ou processos leves, num sistema operativo.</td><td>/</td></tr>
<tr><td>Fds abertos do processo</td><td>O número atual de descritores de ficheiros utilizados.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">Configurar alertas<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>Este guia dá o exemplo da criação de um alerta para a utilização de memória dos componentes Milvus. Para criar outros tipos de alertas, ajuste os seus comandos em conformidade. Se encontrar algum problema durante o processo, sinta-se à vontade para perguntar nas <a href="https://github.com/milvus-io/milvus/discussions">discussões do Github</a> ou iniciar um tópico no <a href="https://discord.com/invite/8uyFbECzPX">Discord</a>.</p>
<h3 id="Prerequisites" class="common-anchor-header">Pré-requisitos</h3><p>Este tutorial pressupõe que você tenha o Grafana instalado e configurado. Caso contrário, recomendamos a leitura do <a href="/docs/pt/v2.4.x/monitor.md">guia de monitoramento</a>.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. Adicionar uma nova consulta</h3><p>Para adicionar um alerta para o uso de memória dos componentes do Milvus, edite o painel Memory. Em seguida, adicione uma nova consulta com a métrica: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. Guardar o dashboard</h3><p>Guarde o dashboard e aguarde alguns minutos para ver o alerta.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>A consulta de alerta do Grafana não é compatível com variáveis de modelo. Portanto, você deve adicionar uma segunda consulta sem nenhuma variável de modelo nos rótulos. A segunda consulta é nomeada como "A" por padrão. Você pode renomeá-la clicando no menu suspenso.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Consulta_alerta</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. Adicionar notificações de alerta</h3><p>Para receber notificações de alerta, adicione um &quot;canal de notificação&quot;. Em seguida, especifique o canal no campo &quot;Enviar para&quot;.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>Alert_notification</span> </span></p>
<p>Se o alerta for criado e acionado com êxito, receberá a notificação como mostra a captura de ecrã abaixo.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>Mensagem_de_notificação</span> </span></p>
<p>Para eliminar um alerta, aceda ao painel "Alert" (Alerta) e clique no botão eliminar.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>Eliminar_alerta</span> </span></p>
<h2 id="Whats-next" class="common-anchor-header">O que se segue<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Se precisar de começar a monitorizar os serviços do Milvus:<ul>
<li>Ler o <a href="/docs/pt/v2.4.x/monitor.md">guia de monitorização</a></li>
<li>Saiba como <a href="/docs/pt/v2.4.x/visualize.md">visualizar as métricas de monitorização</a></li>
</ul></li>
<li>Se criou alertas para a utilização de memória pelos componentes do Milvus:<ul>
<li>Saiba como <a href="/docs/pt/v2.4.x/allocate.md#standalone">alocar recursos</a></li>
</ul></li>
<li>Se está à procura de informações sobre como escalar um cluster Milvus:<ul>
<li>Aprenda a <a href="/docs/pt/v2.4.x/scaleout.md">escalar um cluster Milvus</a></li>
</ul></li>
</ul>
