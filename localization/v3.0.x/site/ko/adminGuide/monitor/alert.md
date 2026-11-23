---
id: alert.md
title: 알림 생성하기
related_key: monitor and alert.
summary: Grafana에서 Milvus 서비스에 대한 알림을 설정하는 방법을 알아보세요.
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">Milvus 서비스에 대한 알림 생성<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus 서비스의 알림 메커니즘을 소개하고, Milvus에서 알림을 생성해야 하는 이유, 시기 및 방법을 설명합니다.</p>
<p>알림을 생성하면 특정 메트릭의 값이 미리 정의한 임계값을 초과할 때 알림을 받을 수 있습니다.</p>
<p>예를 들어, 알림을 생성하고 Milvus 구성 요소의 메모리 사용량 최대값을 80MB로 설정한다고 가정해 보겠습니다. 실제 사용량이 미리 정의된 수치를 초과하면, Milvus 구성 요소의 메모리 사용량이 80MB를 초과했다는 알림을 받게 됩니다. 경고를 수신하면 서비스 가용성을 보장하기 위해 상황에 맞게 적시에 리소스 할당을 조정할 수 있습니다.</p>
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
<li>Milvus 구성 요소의 CPU 또는 메모리 사용량이 너무 높습니다.</li>
<li>Milvus 컴포넌트 포드의 디스크 공간이 부족합니다.</li>
<li>Milvus 구성 요소 포드가 너무 자주 재시작되고 있습니다.</li>
</ul>
<p>알림 구성에 사용할 수 있는 메트릭은 다음과 같습니다:</p>
<table>
<thead>
<tr><th>메트릭</th><th>설명</th><th>측정 단위</th></tr>
</thead>
<tbody>
<tr><td>CPU 사용량</td><td>CPU 실행 시간을 기준으로 표시되는 Milvus 구성 요소별 CPU 사용량입니다.</td><td>초</td></tr>
<tr><td>메모리</td><td>Milvus 구성 요소가 소비하는 메모리 리소스.</td><td>MB</td></tr>
<tr><td>고루틴</td><td>GO 언어에서 동시에 실행되는 활동.</td><td>/</td></tr>
<tr><td>OS 스레드</td><td>스레드, 즉 운영 체제 내의 경량 프로세스.</td><td>/</td></tr>
<tr><td>프로세스가 연 파일 설명자(FDs)</td><td>현재 사용 중인 파일 디스크립터의 수.</td><td>/</td></tr>
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
    </button></h2><p>이 가이드에서는 Milvus 구성 요소의 메모리 사용량에 대한 알림을 생성하는 예를 다룹니다. 다른 유형의 알림을 생성하려면 명령어를 적절히 수정해 주십시오. 진행 과정에서 문제가 발생하면 <a href="https://discuss.milvus.io/">Milvus 포럼에</a> 문의하거나 <a href="https://discord.com/invite/8uyFbECzPX">Discord에서</a> 토론을 시작해 주십시오.</p>
<h3 id="Prerequisites" class="common-anchor-header">필수 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><p>이 튜토리얼은 Grafana가 설치 및 구성되어 있다고 가정합니다. 그렇지 않은 경우, <a href="/docs/ko/monitor.md">모니터링 가이드를</a> 읽어보시기 바랍니다.</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1. 새 쿼리 추가<button data-href="#1-Add-a-new-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 구성 요소의 메모리 사용량에 대한 알림을 추가하려면 Memory 패널을 편집하십시오. 그런 다음 다음 메트릭을 사용하여 새 쿼리를 추가하십시오: <code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" /> 
   <span>Alert_metric</span>
  
 </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2. 대시보드 저장<button data-href="#2-Save-the-dashboard" class="anchor-icon" translate="no">
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
    </button></h3><p>대시보드를 저장한 후, 알림이 표시될 때까지 몇 분간 기다리십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" /> 
   <span>Alert_dashboard</span>
  
 </span></p>
<p>Grafana 알림 쿼리는 템플릿 변수를 지원하지 않습니다. 따라서 레이블에 템플릿 변수가 포함되지 않은 두 번째 쿼리를 추가해야 합니다. 두 번째 쿼리의 이름은 기본적으로 “A”로 지정됩니다. 드롭다운 메뉴를 클릭하여 이름을 변경할 수 있습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" /> 
   <span>알림_쿼리</span>
  
 </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3. 알림 설정<button data-href="#3-Add-alert-notifications" class="anchor-icon" translate="no">
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
    </button></h3><p>알림 알림을 수신하려면 연락처를 생성하십시오. Grafana에서 [ <strong>Alerts &amp; IRM</strong> ] &gt; <strong>[Alerting</strong> ] &gt; [ <strong>Notification configuration</strong>]으로 이동하여 [ <strong>Contact points</strong> ] 탭을 선택한 다음, <strong>[+ New contact point]를</strong> 클릭하십시오. 그런 다음 알림 규칙의 [ <strong>Configure notifications</strong> ] 섹션에서 연락처를 선택하거나 알림 정책을 통해 알림을 전달하도록 설정하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" /> 
   <span>Alert_notification</span>
  
 </span></p>
<p>알림이 성공적으로 생성되고 트리거되면 아래 스크린샷과 같이 알림을 받게 됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" /> 
   <span>알림_메시지</span>
  
 </span></p>
<p>경보를 삭제하려면 “경보” 패널로 이동하여 삭제 버튼을 클릭하십시오.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" /> 
   <span>알림_삭제</span>
  
 </span></p>
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
<li>Milvus 서비스 모니터링을 시작해야 하는 경우:
<ul>
<li><a href="/docs/ko/monitor.md">모니터링 가이드를</a> 읽어보세요</li>
<li><a href="/docs/ko/visualize.md">모니터링 메트릭 시각화</a> 방법 알아보기</li>
</ul></li>
<li>Milvus 구성 요소의 메모리 사용량에 대한 알림을 생성한 경우:
<ul>
<li><a href="/docs/ko/allocate.md#standalone">리소스 할당</a> 방법을 알아보세요</li>
</ul></li>
<li>Milvus 클러스터를 확장하는 방법에 대한 정보를 찾고 계신다면:
<ul>
<li><a href="/docs/ko/scaleout.md">Milvus 클러스터 확장 방법</a> 알아보기</li>
</ul></li>
</ul>
