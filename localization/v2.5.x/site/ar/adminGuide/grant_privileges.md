---
id: grant_privileges.md
title: منح امتياز أو مجموعة امتيازات للأدوار
summary: >-
  بمجرد إنشاء الدور، يمكنك منح امتيازات للدور. يقدم هذا الدليل كيفية منح
  امتيازات أو مجموعات امتيازات لدور ما.
---
<h1 id="Grant-Privilege-or-Privilege-Group-to-Roles" class="common-anchor-header">منح امتياز أو مجموعة امتيازات للأدوار<button data-href="#Grant-Privilege-or-Privilege-Group-to-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>بمجرد إنشاء الدور، يمكنك منح امتيازات للدور. يقدم هذا الدليل كيفية منح امتيازات أو مجموعات امتيازات إلى دور.</p>
<h2 id="Grant-a-privilege-or-a-privilege-group-to-a-role" class="common-anchor-header">منح امتياز أو مجموعة امتيازات لدور ما<button data-href="#Grant-a-privilege-or-a-privilege-group-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>يقدم الإصدار Milvus 2.5 إصدارًا جديدًا من واجهة برمجة التطبيقات (API) التي تبسط عملية المنح. لم تعد بحاجة إلى البحث عن نوع الكائن عند منح امتياز إلى دور. فيما يلي المعلمات والتفسيرات المقابلة.</p>
<ul>
<li><p><strong>اسم الدور:</strong> اسم الدور المستهدف الذي يجب منحه الامتياز (الأدوار) أو مجموعة (مجموعات) الامتيازات.</p></li>
<li><p><strong>المورد</strong>: المورد المستهدف للامتياز، والذي يمكن أن يكون مثيلًا أو قاعدة بيانات أو مجموعة محددة.</p></li>
</ul>
<p>يشرح الجدول التالي كيفية تحديد المورد في الأسلوب <code translate="no">client.grantV2()</code>.</p>
<table>
   <tr>
     <th><p><strong>المستوى</strong></p></th>
     <th><p><strong>المورد</strong></p></th>
     <th><p><strong>طريقة المنح</strong></p></th>
     <th><p><strong>ملاحظات</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>المجموعة</strong></p></td>
     <td><p>مجموعة محددة</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="col1", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>أدخل اسم المجموعة المستهدفة واسم قاعدة البيانات التي تنتمي إليها المجموعة المستهدفة.</p></td>
   </tr>
   <tr>
     <td><p>جميع المجموعات ضمن قاعدة بيانات محددة</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>أدخل اسم قاعدة البيانات المستهدفة وحرف البدل <code translate="no">*</code> كاسم المجموعة.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>قاعدة بيانات</strong></p></td>
     <td><p>قاعدة بيانات محددة</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>أدخل اسم قاعدة البيانات المستهدفة وحرف البدل <code translate="no">*</code> كاسم المجموعة.</p></td>
   </tr>
   <tr>
     <td><p>جميع قواعد البيانات ضمن المثيل الحالي</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>أدخل <code translate="no">*</code> كاسم قاعدة البيانات و <code translate="no">*</code> كاسم المجموعة.</p></td>
   </tr>
   <tr>
     <td><p><strong>المثيل</strong></p></td>
     <td><p>المثيل الحالي</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="ClusterAdmin", 
     collection_name="*", 
     db_name="*"
 )
</code></pre></td>
     <td><p>أدخل <code translate="no">*</code> كاسم قاعدة البيانات و <code translate="no">*</code> كاسم المجموعة.</p></td>
   </tr>
</table>
<ul>
<li><p><strong>الامتياز</strong>: الامتياز المحدد أو <a href="/docs/ar/privilege_group.md">مجموعة الامتيازات</a> التي تحتاج إلى منحها للدور. يوفر Milvus حاليًا 56 نوعًا من الامتيازات التي يمكنك منحها. يسرد الجدول أدناه الامتيازات في ملفوس.</p>
<p><div class="alert note"></p>
<p>عمود النوع في الجدول أدناه مستخدم لتسهيل البحث السريع عن الامتيازات ويستخدم لأغراض التصنيف فقط. عند منح الامتيازات، لا تحتاج إلى فهم الأنواع. تحتاج فقط إلى إدخال الامتيازات المقابلة.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>النوع</strong></p></th>
<th><p><strong>الامتياز</strong></p></th>
<th><p><strong>الوصف</strong></p></th>
<th><p><strong>وصف واجهة برمجة التطبيقات ذات الصلة من جانب العميل</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>امتيازات قاعدة البيانات</p></td>
<td><p>سرد قواعد البيانات</p></td>
<td><p>عرض كافة قواعد البيانات في المثيل الحالي</p></td>
<td><p><a href="/docs/ar/manage_databases.md">سرد قواعد البيانات</a></p></td>
</tr>
<tr>
<td><p>وصف قاعدة البيانات</p></td>
<td><p>عرض تفاصيل قاعدة البيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">وصف قاعدة البيانات</a></p></td>
</tr>
<tr>
<td><p>إنشاء قاعدة بيانات</p></td>
<td><p>إنشاء قاعدة بيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">إنشاء قاعدة بيانات</a></p></td>
</tr>
<tr>
<td><p>إسقاط قاعدة بيانات</p></td>
<td><p>إسقاط قاعدة بيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">إسقاط قاعدة بيانات</a></p></td>
</tr>
<tr>
<td><p>تغيير قاعدة البيانات</p></td>
<td><p>تعديل خصائص قاعدة البيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">تغيير قاعدة البيانات</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>امتيازات المجموعة</p></td>
<td><p>GetFlushState</p></td>
<td><p>التحقق من حالة عملية تدفق المجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>الحصول على حالة التحميل</p></td>
<td><p>التحقق من حالة تحميل المجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">الحصول على حالة التحميل</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>التحقق من تقدم التحميل لمجموعة ما</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>إظهار المجموعات</p></td>
<td><p>عرض كافة المجموعات مع امتيازات المجموعة</p></td>
<td><p><a href="/docs/ar/view-collections.md">إظهار المجموعات</a></p></td>
</tr>
<tr>
<td><p>سرد الأسماء المستعارة</p></td>
<td><p>عرض كافة الأسماء المستعارة للمجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>وصف المجموعة</p></td>
<td><p>عرض تفاصيل المجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">وصف المجموعة</a></p></td>
</tr>
<tr>
<td><p>وصف الأسماء المستعارة</p></td>
<td><p>عرض تفاصيل الاسم المستعار</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">وصف الاسم المستعار</a></p></td>
</tr>
<tr>
<td><p>الحصول على إحصائيات</p></td>
<td><p>الحصول على إحصائيات مجموعة (مثل: عدد الكيانات في مجموعة)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">الحصول على إحصائيات المجموعة</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة</p></td>
<td><p>إنشاء مجموعة</p></td>
<td><p><a href="/docs/ar/create-collection.md">إنشاء مجموعة</a></p></td>
</tr>
<tr>
<td><p>إسقاط مجموعة</p></td>
<td><p>إسقاط مجموعة</p></td>
<td><p><a href="/docs/ar/drop-collection.md">إسقاط مجموعة</a></p></td>
</tr>
<tr>
<td><p>تحميل</p></td>
<td><p>تحميل مجموعة</p></td>
<td><p><a href="/docs/ar/load-and-release.md">تحميل مجموعة/تحميل مجموعة/تحميل</a><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">تقدم</a><a href="/docs/ar/load-and-release.md">التحميل/تحميل حالة التحميل</a></p></td>
</tr>
<tr>
<td><p>تحرير</p></td>
<td><p>تحرير مجموعة</p></td>
<td><p><a href="/docs/ar/load-and-release.md">تحرير مجموعة</a></p></td>
</tr>
<tr>
<td><p>مسح</p></td>
<td><p>نقل جميع الكيانات في مجموعة إلى مقطع مغلق. أي كيان تم إدراجه بعد عملية التدفق سيتم تخزينه في مقطع جديد.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">مسح/جلب</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">حالة</a><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">المسح</a></p></td>
</tr>
<tr>
<td><p>الضغط</p></td>
<td><p>تشغيل الضغط يدويًا</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">ضغط</a></p></td>
</tr>
<tr>
<td><p>إعادة تسمية مجموعة</p></td>
<td><p>إعادة تسمية مجموعة</p></td>
<td><p><a href="/docs/ar/modify-collection.md">إعادة تسمية مجموعة</a></p></td>
</tr>
<tr>
<td><p>إنشاء اسم مستعار</p></td>
<td><p>إنشاء اسم مستعار لمجموعة</p></td>
<td><p><a href="/docs/ar/manage-aliases.md">إنشاء اسم مستعار</a></p></td>
</tr>
<tr>
<td><p>إسقاط اسم مستعار</p></td>
<td><p>إسقاط الاسم المستعار للمجموعة</p></td>
<td><p><a href="/docs/ar/manage-aliases.md">إسقاط اسم مستعار</a></p></td>
</tr>
<tr>
<td><p>مسح الكل</p></td>
<td><p>مسح كافة المجموعات في قاعدة البيانات</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">مسح الكل</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>امتيازات التقسيم</p></td>
<td><p>لديه قسم</p></td>
<td><p>التحقق من وجود قسم من عدمه</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">لديه قسم</a></p></td>
</tr>
<tr>
<td><p>إظهار الأقسام</p></td>
<td><p>عرض كافة الأقسام في المجموعة</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">إظهار الأقسام</a></p></td>
</tr>
<tr>
<td><p>إنشاء قسم</p></td>
<td><p>إنشاء قسم</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">إنشاء قسم</a></p></td>
</tr>
<tr>
<td><p>إسقاط قسم</p></td>
<td><p>إسقاط قسم</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">إسقاط قسم</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>امتيازات الفهرس</p></td>
<td><p>تفاصيل الفهرس</p></td>
<td><p>عرض تفاصيل الفهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">وصف الفهرس/إحضار الفهرس/إحضار الفهرس/إحضار تقدم إنشاء الفهرس</a></p></td>
</tr>
<tr>
<td><p>إنشاء فهرس</p></td>
<td><p>إنشاء فهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">إنشاء فهرس</a></p></td>
</tr>
<tr>
<td><p>إسقاط فهرس</p></td>
<td><p>إسقاط فهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">إسقاط فهرس</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>امتيازات إدارة الموارد</p></td>
<td><p>موازنة التحميل</p></td>
<td><p>تحقيق توازن التحميل</p></td>
<td><p><a href="/docs/ar/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة موارد</p></td>
<td><p>إنشاء مجموعة موارد</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">إنشاءResResourceGroup</a></p></td>
</tr>
<tr>
<td><p>إسقاط مجموعة موارد</p></td>
<td><p>إسقاط مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">إسقاط مجموعة موارد</a></p></td>
</tr>
<tr>
<td><p>تحديثResourceResourceGroups</p></td>
<td><p>تحديث مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">تحديثResResResourceGroups</a></p></td>
</tr>
<tr>
<td><p>وصف مجموعة الموارد</p></td>
<td><p>عرض تفاصيل مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">وصف مجموعة الموارد</a></p></td>
</tr>
<tr>
<td><p>سرد مجموعات الموارد</p></td>
<td><p>عرض كافة مجموعات الموارد الخاصة بالمثيل الحالي</p></td>
<td><p><a href="/docs/ar/resource_group.md">ListResResourceGroups</a></p></td>
</tr>
<tr>
<td><p>نقل العقدة</p></td>
<td><p>نقل العقد بين مجموعات الموارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">نقل العقدة</a></p></td>
</tr>
<tr>
<td><p>نقل النسخ المتماثلة</p></td>
<td><p>نقل النسخ المتماثلة بين مجموعات الموارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">نقل النسخ المتماثلة</a></p></td>
</tr>
<tr>
<td><p>النسخ الاحتياطي RBAC</p></td>
<td><p>إنشاء نسخة احتياطية لجميع العمليات المتعلقة ب RBAC في المثيل الحالي</p></td>
<td><p>BackupRBAC</p></td>
</tr>
<tr>
<td><p>استعادةRBAC</p></td>
<td><p>استعادة نسخة احتياطية لجميع العمليات المتعلقة بـ RBAC في المثيل الحالي</p></td>
<td><p>استعادةRBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>امتيازات الكيان</p></td>
<td><p>استعلام</p></td>
<td><p>إجراء استعلام</p></td>
<td><p><a href="/docs/ar/get-and-scalar-query.md">استعلام</a></p></td>
</tr>
<tr>
<td><p>بحث</p></td>
<td><p>إجراء بحث</p></td>
<td><p><a href="/docs/ar/single-vector-search.md">بحث</a></p></td>
</tr>
<tr>
<td><p>إدراج</p></td>
<td><p>إدراج كيانات</p></td>
<td><p><a href="/docs/ar/insert-update-delete.md">إدراج</a></p></td>
</tr>
<tr>
<td><p>حذف</p></td>
<td><p>حذف كيانات</p></td>
<td><p><a href="/docs/ar/delete-entities.md">حذف</a></p></td>
</tr>
<tr>
<td><p>إدراج كيانات</p></td>
<td><p>إدراج كيانات Upsert</p></td>
<td><p><a href="/docs/ar/upsert-entities.md">Upsert</a></p></td>
</tr>
<tr>
<td><p>استيراد</p></td>
<td><p>إدراج كيانات أو استيراد كيانات بالجملة</p></td>
<td><p><a href="/docs/ar/import-data.md">إدراج/استيراد مجمّع</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>امتيازات RBAC</p></td>
<td><p>إنشاء ملكية</p></td>
<td><p>إنشاء مستخدم أو دور</p></td>
<td><p><a href="/docs/ar/users_and_roles.md">إنشاء مستخدم/إنشاء دور</a></p></td>
</tr>
<tr>
<td><p>تحديث مستخدم</p></td>
<td><p>تحديث كلمة مرور المستخدم</p></td>
<td><p><a href="/docs/ar/users_and_roles.md">تحديثCredentialCredential</a></p></td>
</tr>
<tr>
<td><p>إسقاط الملكية</p></td>
<td><p>إسقاط كلمة مرور مستخدم أو دور</p></td>
<td><p><a href="/docs/ar/drop_users_roles.md">حذفالمعتمد/إسقاط دور</a></p></td>
</tr>
<tr>
<td><p>تحديدالملكية</p></td>
<td><p>عرض جميع المستخدمين الذين تم منحهم دوراً محدداً</p></td>
<td><p><a href="/docs/ar/grant_roles.md">تحديدالدور/اختيارالملكية</a></p></td>
</tr>
<tr>
<td><p>إدارةالملكية</p></td>
<td><p>إدارة مستخدم أو دور أو منح دور لمستخدم ما</p></td>
<td><p><a href="/docs/ar/privilege_group.md">تشغيلUserUserRole/تشغيل الامتياز/تشغيل الامتياز/تشغيل الامتياز V2</a></p></td>
</tr>
<tr>
<td><p>تحديدالمستخدم</p></td>
<td><p>عرض جميع الأدوار الممنوحة للمستخدم</p></td>
<td><p><a href="/docs/ar/grant_roles.md">تحديد مستخدم</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة امتيازات</p></td>
<td><p>إنشاء مجموعة امتيازات</p></td>
<td><p><a href="/docs/ar/privilege_group.md">إنشاء مجموعة امتيازات</a></p></td>
</tr>
<tr>
<td><p>إسقاط مجموعة امتيازات</p></td>
<td><p>إسقاط مجموعة امتيازات</p></td>
<td><p><a href="/docs/ar/privilege_group.md">إسقاط مجموعة امتيازات</a></p></td>
</tr>
<tr>
<td><p>سرد مجموعات الامتيازات</p></td>
<td><p>عرض كافة مجموعات الامتيازات في المثيل الحالي</p></td>
<td><p><a href="/docs/ar/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>تشغيل مجموعة امتيازات</p></td>
<td><p>إضافة امتيازات إلى مجموعة امتيازات أو إزالتها منها</p></td>
<td><p><a href="/docs/ar/privilege_group.md">تشغيل مجموعة امتيازات</a></p></td>
</tr>
</table></p></li>
</ul>
<p>يوضح المثال التالي كيفية منح الامتياز <code translate="no">PrivilegeSearch</code> على <code translate="no">collection_01</code> ضمن قاعدة البيانات <code translate="no">default</code> بالإضافة إلى مجموعة امتيازات باسم <code translate="no">privilege_group_1</code> للدور <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا جافا</a> <a href="#go">جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.grant_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.grantPrivilegeV2(GrantPrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;default&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.GrantV2(ctx, milvusclient.NewGrantV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;Search&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});
    
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;privilege_group_1&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">grantPrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;privilege_group_1&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/grant_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
<h2 id="Describe-a-role" class="common-anchor-header">وصف الدور<button data-href="#Describe-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال التالي كيفية عرض الامتيازات الممنوحة للدور <code translate="no">role_a</code> باستخدام الطريقة <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a> <a href="#java">Java Java</a> <a href="#go">Go</a> <a href="#javascript">NodeJS</a> <a href="#bash">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client.describe_role(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.response.DescribeRoleResp;
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.DescribeRoleReq

<span class="hljs-type">DescribeRoleReq</span> <span class="hljs-variable">describeRoleReq</span> <span class="hljs-operator">=</span> DescribeRoleReq.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .build();
<span class="hljs-type">DescribeRoleResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.describeRole(describeRoleReq);
List&lt;DescribeRoleResp.GrantInfo&gt; infos = resp.getGrantInfos();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>

role, err := client.DescribeRole(ctx, milvusclient.NewDescribeRoleOption(<span class="hljs-string">&quot;role_a&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeRole</span>({<span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/describe&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي مثال على الإخراج.</p>
<pre><code translate="no" class="language-python">{
     <span class="hljs-string">&quot;role&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
     <span class="hljs-string">&quot;privileges&quot;</span>: [
         {
             <span class="hljs-string">&quot;collection_name&quot;</span>: <span class="hljs-string">&quot;collection_01&quot;</span>,
             <span class="hljs-string">&quot;db_name&quot;</span>: <span class="hljs-string">&quot;default&quot;</span>,
             <span class="hljs-string">&quot;role_name&quot;</span>: <span class="hljs-string">&quot;role_a&quot;</span>,
             <span class="hljs-string">&quot;privilege&quot;</span>: <span class="hljs-string">&quot;Search&quot;</span>,
             <span class="hljs-string">&quot;grantor_name&quot;</span>: <span class="hljs-string">&quot;root&quot;</span>
         },
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     ]
}
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">إبطال امتياز أو مجموعة امتيازات من دور ما<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال التالي كيفية إبطال الامتياز <code translate="no">PrivilegeSearch</code> على <code translate="no">collection_01</code> ضمن قاعدة البيانات <code translate="no">default</code> بالإضافة إلى مجموعة الامتيازات <code translate="no">privilege_group_1</code> التي تم منحها للدور <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">بايثون</a> <a href="#java">جافا</a> <a href="#go">جو جو</a> <a href="#javascript">NodeJS</a> <a href="#bash">CURL</a></div>
<pre><code translate="no" class="language-python">client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;Search&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)
    
client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;privilege_group_1&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;collection_01&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;default&#x27;</span>,
)

client.revoke_privilege_v2(
    role_name=<span class="hljs-string">&quot;role_a&quot;</span>,
    privilege=<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>,
    collection_name=<span class="hljs-string">&#x27;*&#x27;</span>,
    db_name=<span class="hljs-string">&#x27;*&#x27;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;Search&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;privilege_group_1&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;collection_01&quot;</span>)
        .dbName(<span class="hljs-string">&quot;default&quot;</span>)
        .build());

client.revokePrivilegeV2(RevokePrivilegeReqV2.builder()
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)
        .privilege(<span class="hljs-string">&quot;ClusterReadOnly&quot;</span>)
        .collectionName(<span class="hljs-string">&quot;*&quot;</span>)
        .dbName(<span class="hljs-string">&quot;*&quot;</span>)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;Search&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
        WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;privilege_group_1&quot;</span>, <span class="hljs-string">&quot;collection_01&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;default&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

err = client.RevokePrivilegeV2(ctx, milvusclient.NewRevokePrivilegeV2Option(<span class="hljs-string">&quot;role_a&quot;</span>, <span class="hljs-string">&quot;ClusterReadOnly&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>).
    WithDbName(<span class="hljs-string">&quot;*&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;collection_01&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;Search&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;default&#x27;</span>
});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">revokePrivilegeV2</span>({
    <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-attr">privilege</span>: <span class="hljs-string">&#x27;ClusterReadOnly&#x27;</span>,
    <span class="hljs-attr">db_name</span>: <span class="hljs-string">&#x27;*&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;Search&quot;,
    &quot;collectionName&quot;: &quot;collection_01&quot;,
    &quot;dbName&quot;:&quot;default&quot;
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/revoke_privilege_v2&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
