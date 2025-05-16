---
id: alert.md
title: 알림 만들기
related_key: monitor and alert.
summary: Grafana에서 Milvus 서비스에 대한 알림을 만드는 방법을 알아보세요.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Milvus 서비스에 대한 알림 만들기<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus 서비스에 대한 알림 메커니즘을 소개하고 Milvus에서 알림을 생성하는 이유, 시기 및 방법에 대해 설명합니다.</p>
<p>알림을 만들면 특정 지표의 값이 미리 정의한 임계값을 초과할 때 알림을 받을 수 있습니다.</p>
<p>예를 들어, 알림을 생성하고 Milvus 컴포넌트의 메모리 사용량에 대한 최대값을 80MB로 설정합니다. 실제 사용량이 미리 정의한 수치를 초과하면 Milvus 구성 요소별 메모리 사용량이 80MB를 초과한다는 알림을 받게 됩니다. 알림을 받으면 그에 따라 리소스 할당을 적시에 조정하여 서비스 가용성을 보장할 수 있습니다.</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">알림 생성 시나리오<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>다음은 알림을 생성해야 하는 몇 가지 일반적인 시나리오입니다.</p>
<ul>
<li>Milvus 컴포넌트의 CPU 또는 메모리 사용량이 너무 높음.</li>
<li>Milvus 컴포넌트 파드의 디스크 공간이 부족합니다.</li>
<li>Milvus 컴포넌트 파드가 너무 자주 재시작됩니다.</li>
</ul>
<p>다음 메트릭은 알림 구성에 사용할 수 있습니다:</p>
<table>
<thead>
<tr><th>메트릭</th><th>설명</th><th>측정 단위</th></tr>
</thead>
<tbody>
<tr><td>CPU 사용량</td><td>CPU의 실행 시간으로 표시되는 Milvus 컴포넌트의 CPU 사용량입니다.</td><td>초</td></tr>
<tr><td>Memory</td><td>Milvus 컴포넌트가 소비하는 메모리 리소스입니다.</td><td>MB</td></tr>
<tr><td>고루틴</td><td>GO 언어로 동시에 실행되는 활동.</td><td>/</td></tr>
<tr><td>OS 스레드</td><td>운영 체제의 스레드 또는 경량 프로세스.</td><td>/</td></tr>
<tr><td>프로세스 열린 Fds</td><td>현재 사용된 파일 디스크립터의 개수입니다.</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">알림 설정<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>이 가이드에서는 Milvus 컴포넌트의 메모리 사용량에 대한 알림을 생성하는 예제를 사용합니다. 다른 유형의 경고를 생성하려면 그에 맞게 명령을 조정하세요. 이 과정에서 문제가 발생하면 언제든지 <a href="https://github.com/milvus-io/milvus/discussions">Github 토론에서</a> 질문하거나 <a href="https://discord.com/invite/8uyFbECzPX">Discord에서</a> 스레드를 시작하세요.</p>
<h3 id="Prerequisites" class="common-anchor-header">전제 조건</h3><p>이 튜토리얼은 Grafana가 설치 및 구성되었다고 가정합니다. 그렇지 않은 경우 <a href="/docs/ko/v2.4.x/monitor.md">모니터링 가이드를</a> 읽어보시기 바랍니다.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. 새 쿼리 추가하기</h3><p>Milvus 구성 요소의 메모리 사용량에 대한 알림을 추가하려면 메모리 패널을 편집합니다. 그런 다음 메트릭을 사용하여 새 쿼리를 추가합니다: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. 대시보드 저장</h3><p>대시보드를 저장하고 몇 분 동안 기다렸다가 알림을 확인합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>Alert_dashboard</span> </span></p>
<p>Grafana 알림 쿼리는 템플릿 변수를 지원하지 않습니다. 따라서 레이블에 템플릿 변수가 없는 두 번째 쿼리를 추가해야 합니다. 두 번째 쿼리의 이름은 기본적으로 "A"로 지정됩니다. 드롭다운을 클릭하여 이름을 바꿀 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>Alert_query</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. 알림 알림 추가하기</h3><p>알림 알림을 받으려면 &quot;알림 채널&quot;을 추가합니다. 그런 다음 '받는 사람' 필드에 채널을 지정합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>알림_알림</span> </span></p>
<p>알림이 성공적으로 생성되고 트리거되면 아래 스크린샷과 같이 알림을 받게 됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>알림_메시지</span> </span></p>
<p>알림을 삭제하려면 '알림' 패널로 이동하여 삭제 버튼을 클릭합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>삭제_알리미</span> </span></p>
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
    </button></h2><ul>
<li>Milvus에 대한 모니터링 서비스를 시작해야 하는 경우:<ul>
<li><a href="/docs/ko/v2.4.x/monitor.md">모니터링 가이드</a> 읽기</li>
<li><a href="/docs/ko/v2.4.x/visualize.md">모니터링 메트릭을 시각화하는</a> 방법 알아보기</li>
</ul></li>
<li>Milvus 컴포넌트의 메모리 사용량에 대한 알림을 생성한 경우:<ul>
<li><a href="/docs/ko/v2.4.x/allocate.md#standalone">리소스 할당</a> 방법 알아보기</li>
</ul></li>
<li>Milvus 클러스터를 확장하는 방법에 대한 정보를 찾고 계신 경우:<ul>
<li><a href="/docs/ko/v2.4.x/scaleout.md">Milvus 클러스터 확장하기</a> 알아보기</li>
</ul></li>
</ul>
