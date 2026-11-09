---
id: grant_privileges.md
title: منح امتياز أو مجموعة امتيازات للأدوار
summary: >-
  بمجرد إنشاء دور ما، يمكنك منح امتيازات لهذا الدور. يشرح هذا الدليل كيفية منح
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
    </button></h1><p>بمجرد إنشاء دور، يمكنك منح امتيازات لهذا الدور. يشرح هذا الدليل كيفية منح امتيازات أو مجموعات امتيازات لدور ما.</p>
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
    </button></h2><p>يقدم Milvus 2.5 إصدارًا جديدًا من واجهة برمجة التطبيقات (API) التي تبسط عملية المنح. لم تعد بحاجة إلى البحث عن نوع الكائن عند منح امتياز لدور ما. فيما يلي المعلمات والتفسيرات المقابلة لها.</p>
<ul>
<li><p><strong>role_name:</strong> اسم الدور المستهدف الذي يجب منحه امتيازًا (امتيازات) أو مجموعة امتيازات (مجموعات امتيازات).</p></li>
<li><p><strong>Resource</strong>: المورد المستهدف للامتياز، والذي يمكن أن يكون مثيلًا معينًا أو قاعدة بيانات أو مجموعة.</p></li>
</ul>
<p>يوضح الجدول التالي كيفية تحديد المورد في طريقة <code translate="no">client.grantV2()</code>.</p>
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
     <td><p>جميع المجموعات الموجودة ضمن قاعدة بيانات محددة</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="CollectionAdmin",
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>أدخل اسم قاعدة البيانات المستهدفة ورمز البدل <code translate="no">*</code> كاسم للمجموعة.</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p><strong>قاعدة البيانات</strong></p></td>
     <td><p>قاعدة بيانات محددة</p></td>
     <td><pre><code translate="no" class="python language-python"> client.grant_privilege_v2(
     role_name="roleA", 
     privilege="DatabaseAdmin", 
     collection_name="*", 
     db_name="db1"
 )
</code></pre></td>
     <td><p>أدخل اسم قاعدة البيانات المستهدفة و <code translate="no">*</code> كرمز بديل لاسم المجموعة.</p></td>
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
<li><p><strong>الامتياز</strong>: الامتياز المحدد أو <a href="/docs/ar/privilege_group.md">مجموعة الامتيازات</a> التي تحتاج إلى منحها لدور ما. حاليًا، يوفر Milvus 56 نوعًا من الامتيازات التي يمكنك منحها. يسرد الجدول أدناه الامتيازات الموجودة في Milvus.</p>
<p><div class="alert note"></p>
<p>تم تضمين عمود «النوع» في الجدول أدناه لتسهيل البحث السريع عن الامتيازات، ويُستخدم لأغراض التصنيف فقط. عند منح الامتيازات، لا تحتاج إلى فهم الأنواع. ما عليك سوى إدخال الامتيازات المقابلة.</p>
<p></div></p>
<p><table>
<tr>
<th><p><strong>النوع</strong></p></th>
<th><p><strong>الامتياز</strong></p></th>
<th><p><strong>الوصف</strong></p></th>
<th><p><strong>وصف واجهة برمجة التطبيقات (API) ذات الصلة على جانب العميل</strong></p></th>
</tr>
<tr>
<td rowspan="5"><p>امتيازات قاعدة البيانات</p></td>
<td><p>ListDatabases</p></td>
<td><p>عرض جميع قواعد البيانات في المثيل الحالي</p></td>
<td><p><a href="/docs/ar/manage_databases.md">ListDatabases</a></p></td>
</tr>
<tr>
<td><p>DescribeDatabase</p></td>
<td><p>عرض تفاصيل قاعدة بيانات ما</p></td>
<td><p><a href="/docs/ar/manage_databases.md">وصف قاعدة البيانات</a></p></td>
</tr>
<tr>
<td><p>إنشاء قاعدة بيانات</p></td>
<td><p>إنشاء قاعدة بيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">إنشاء قاعدة بيانات</a></p></td>
</tr>
<tr>
<td><p>حذف قاعدة البيانات</p></td>
<td><p>إزالة قاعدة بيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">DropDatabase</a></p></td>
</tr>
<tr>
<td><p>تعديل قاعدة البيانات</p></td>
<td><p>تعديل خصائص قاعدة البيانات</p></td>
<td><p><a href="/docs/ar/manage_databases.md">AlterDatabase</a></p></td>
</tr>
<tr>
<td rowspan="18"><p>امتيازات المجموعة</p></td>
<td><p>GetFlushState</p></td>
<td><p>التحقق من حالة عملية مسح المجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">GetFlushState</a></p></td>
</tr>
<tr>
<td><p>GetLoadState</p></td>
<td><p>التحقق من حالة تحميل المجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">GetLoadState</a></p></td>
</tr>
<tr>
<td><p>GetLoadingProgress</p></td>
<td><p>التحقق من تقدم التحميل لمجموعة</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/loading_progress.md">GetLoadingProgress</a></p></td>
</tr>
<tr>
<td><p>ShowCollections</p></td>
<td><p>عرض جميع المجموعات التي تمتلك امتيازات المجموعة</p></td>
<td><p><a href="/docs/ar/view-collections.md">ShowCollections</a></p></td>
</tr>
<tr>
<td><p>ListAliases</p></td>
<td><p>عرض جميع الأسماء المستعارة لمجموعة ما</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/list_aliases.md">ListAliases</a></p></td>
</tr>
<tr>
<td><p>وصف المجموعة</p></td>
<td><p>عرض تفاصيل مجموعة ما</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_collection.md">وصف المجموعة</a></p></td>
</tr>
<tr>
<td><p>DescribeAlias</p></td>
<td><p>عرض تفاصيل الاسم المستعار</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/describe_alias.md">وصف الاسم المستعار</a></p></td>
</tr>
<tr>
<td><p>GetStatistics</p></td>
<td><p>الحصول على إحصائيات مجموعة (مثل: عدد الكيانات في المجموعة)</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Collections/get_collection_stats.md">الحصول على إحصائيات المجموعة</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة</p></td>
<td><p>إنشاء مجموعة</p></td>
<td><p><a href="/docs/ar/create-collection.md">إنشاء مجموعة</a></p></td>
</tr>
<tr>
<td><p>DropCollection</p></td>
<td><p>إزالة مجموعة</p></td>
<td><p><a href="/docs/ar/drop-collection.md">إزالة مجموعة</a></p></td>
</tr>
<tr>
<td><p>تحميل</p></td>
<td><p>تحميل مجموعة</p></td>
<td><p><a href="/docs/ar/load-and-release.md">تح</a><a href="https://milvus.io/api-reference/restful/v2.5.x/v2/Collection%20(v2)/Get%20Load%20State.md">ميل</a> المجموعة/الحصول على تقدم التحميل/الحصول على حالة التحميل</p></td>
</tr>
<tr>
<td><p>تحرير</p></td>
<td><p>تحرير مجموعة</p></td>
<td><p><a href="/docs/ar/load-and-release.md">ReleaseCollection</a></p></td>
</tr>
<tr>
<td><p>التفريغ</p></td>
<td><p>تثبيت جميع الكيانات الموجودة في المجموعة في مقطع مغلق. سيتم تخزين أي كيان يتم إدراجه بعد عملية التفريغ في مقطع جديد.</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/Collection/flush.md">التفريغ/الحصول على حالة التفريغ</a></p></td>
</tr>
<tr>
<td><p>التكثيف</p></td>
<td><p>تشغيل عملية الضغط يدويًا</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Management/compact.md">التكثيف</a></p></td>
</tr>
<tr>
<td><p>إعادة تسمية المجموعة</p></td>
<td><p>إعادة تسمية مجموعة</p></td>
<td><p><a href="/docs/ar/modify-collection.md">إعادة تسمية المجموعة</a></p></td>
</tr>
<tr>
<td><p>إنشاء اسم مستعار</p></td>
<td><p>إنشاء اسم مستعار لمجموعة</p></td>
<td><p><a href="/docs/ar/manage-aliases.md">إنشاء اسم مستعار</a></p></td>
</tr>
<tr>
<td><p>إزالة الاسم المستعار</p></td>
<td><p>إلغاء الاسم المستعار لمجموعة</p></td>
<td><p><a href="/docs/ar/manage-aliases.md">DropAlias</a></p></td>
</tr>
<tr>
<td><p>FlushAll</p></td>
<td><p>تفريغ جميع المجموعات في قاعدة البيانات</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/flush_all.md">FlushAll</a></p></td>
</tr>
<tr>
<td rowspan="4"><p>امتيازات التقسيم</p></td>
<td><p>HasPartition</p></td>
<td><p>التحقق من وجود قسم</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">HasPartition</a></p></td>
</tr>
<tr>
<td><p>ShowPartitions</p></td>
<td><p>عرض جميع الأقسام في مجموعة</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">ShowPartitions</a></p></td>
</tr>
<tr>
<td><p>إنشاء قسم</p></td>
<td><p>إنشاء قسم</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">إنشاء قسم</a></p></td>
</tr>
<tr>
<td><p>إزالة قسم</p></td>
<td><p>إزالة قسم</p></td>
<td><p><a href="/docs/ar/manage-partitions.md">إزالة القسم</a></p></td>
</tr>
<tr>
<td rowspan="3"><p>امتيازات الفهرس</p></td>
<td><p>تفاصيل الفهرس</p></td>
<td><p>عرض تفاصيل الفهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">DescribeIndex/GetIndexState/GetIndexBuildProgress</a></p></td>
</tr>
<tr>
<td><p>إنشاء فهرس</p></td>
<td><p>إنشاء فهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">إنشاء_فهرس</a></p></td>
</tr>
<tr>
<td><p>DropIndex</p></td>
<td><p>إزالة فهرس</p></td>
<td><p><a href="/docs/ar/index-vector-fields.md">DropIndex</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>امتيازات إدارة الموارد</p></td>
<td><p>توزيع الحمل</p></td>
<td><p>تحقيق توازن الحمل</p></td>
<td><p><a href="/docs/ar/resource_group.md">LoadBalance</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة موارد</p></td>
<td><p>إنشاء مجموعة موارد</p></td>
<td><p><a href="https://milvus.io/api-reference/pymilvus/v2.5.x/ORM/utility/create_resource_group.md">إنشاء مجموعة موارد</a></p></td>
</tr>
<tr>
<td><p>إزالة مجموعة الموارد</p></td>
<td><p>إزالة مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">DropResourceGroup</a></p></td>
</tr>
<tr>
<td><p>تحديث مجموعات الموارد</p></td>
<td><p>تحديث مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">تحديث مجموعات الموارد</a></p></td>
</tr>
<tr>
<td><p>وصف مجموعة الموارد</p></td>
<td><p>عرض تفاصيل مجموعة موارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">وصف مجموعة الموارد</a></p></td>
</tr>
<tr>
<td><p>ListResourceGroups</p></td>
<td><p>عرض جميع مجموعات الموارد للمثيل الحالي</p></td>
<td><p><a href="/docs/ar/resource_group.md">ListResourceGroups</a></p></td>
</tr>
<tr>
<td><p>TransferNode</p></td>
<td><p>نقل العقد بين مجموعات الموارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">نقل العقدة</a></p></td>
</tr>
<tr>
<td><p>TransferReplica</p></td>
<td><p>نقل النسخ المتماثلة بين مجموعات الموارد</p></td>
<td><p><a href="/docs/ar/resource_group.md">نقل النسخ المتماثلة</a></p></td>
</tr>
<tr>
<td><p>النسخ الاحتياطي لـ RBAC</p></td>
<td><p>إنشاء نسخة احتياطية لجميع العمليات المتعلقة بـ RBAC في المثيل الحالي</p></td>
<td><p>النسخ الاحتياطي لـ RBAC</p></td>
</tr>
<tr>
<td><p>استعادة RBAC</p></td>
<td><p>استعادة نسخة احتياطية لجميع العمليات المتعلقة بـ RBAC في المثيل الحالي</p></td>
<td><p>استعادة RBAC</p></td>
</tr>
<tr>
<td rowspan="6"><p>امتيازات الكيان</p></td>
<td><p>الاستعلام</p></td>
<td><p>إجراء استعلام</p></td>
<td><p><a href="/docs/ar/get-and-scalar-query.md">الاستعلام</a></p></td>
</tr>
<tr>
<td><p>البحث</p></td>
<td><p>إجراء بحث</p></td>
<td><p><a href="/docs/ar/single-vector-search.md">البحث</a></p></td>
</tr>
<tr>
<td><p>إدراج</p></td>
<td><p>إدراج كيانات</p></td>
<td><p><a href="/docs/ar/insert-update-delete.md">إدراج</a></p></td>
</tr>
<tr>
<td><p>حذف</p></td>
<td><p>حذف الكيانات</p></td>
<td><p><a href="/docs/ar/delete-entities.md">حذف</a></p></td>
</tr>
<tr>
<td><p>تحديث أو إدراج</p></td>
<td><p>تحديث أو إدراج الكيانات</p></td>
<td><p><a href="/docs/ar/upsert-entities.md">التحديث أو الإدراج</a></p></td>
</tr>
<tr>
<td><p>استيراد</p></td>
<td><p>إدراج أو استيراد الكيانات بشكل مجمّع</p></td>
<td><p><a href="/docs/ar/import-data.md">الإدراج/الاستيراد بالجملة</a></p></td>
</tr>
<tr>
<td rowspan="10"><p>امتيازات RBAC</p></td>
<td><p>إنشاء الملكية</p></td>
<td><p>إنشاء مستخدم أو دور</p></td>
<td><p><a href="/docs/ar/users_and_roles.md">CreateUser/CreateRole</a></p></td>
</tr>
<tr>
<td><p>تحديث المستخدم</p></td>
<td><p>تحديث كلمة مرور مستخدم</p></td>
<td><p><a href="/docs/ar/users_and_roles.md">تحديث بيانات الاعتماد</a></p></td>
</tr>
<tr>
<td><p>إلغاء الملكية</p></td>
<td><p>إلغاء كلمة مرور مستخدم أو دور</p></td>
<td><p><a href="/docs/ar/drop_users_roles.md">حذف بيانات الاعتماد/إلغاء الدور</a></p></td>
</tr>
<tr>
<td><p>SelectOwnership</p></td>
<td><p>عرض جميع المستخدمين الذين تم منحهم دورًا معينًا</p></td>
<td><p><a href="/docs/ar/grant_roles.md">تحديد الدور/تحديد التفويض</a></p></td>
</tr>
<tr>
<td><p>ManageOwnership</p></td>
<td><p>إدارة مستخدم أو دور أو منح دور لمستخدم</p></td>
<td><p><a href="/docs/ar/privilege_group.md">تشغيل دور المستخدم/تشغيل الامتياز/تشغيل الامتياز V2</a></p></td>
</tr>
<tr>
<td><p>SelectUser</p></td>
<td><p>عرض جميع الأدوار الممنوحة لمستخدم</p></td>
<td><p><a href="/docs/ar/grant_roles.md">تحديد المستخدم</a></p></td>
</tr>
<tr>
<td><p>إنشاء مجموعة امتيازات</p></td>
<td><p>إنشاء مجموعة امتيازات</p></td>
<td><p><a href="/docs/ar/privilege_group.md">إنشاء مجموعة امتيازات</a></p></td>
</tr>
<tr>
<td><p>DropPrivilegeGroup</p></td>
<td><p>إلغاء مجموعة امتيازات</p></td>
<td><p><a href="/docs/ar/privilege_group.md">DropPrivilegeGroup</a></p></td>
</tr>
<tr>
<td><p>ListPrivilegeGroups</p></td>
<td><p>عرض جميع مجموعات الامتيازات في المثيل الحالي</p></td>
<td><p><a href="/docs/ar/privilege_group.md">ListPrivilegeGroups</a></p></td>
</tr>
<tr>
<td><p>تشغيل مجموعة الامتيازات</p></td>
<td><p>إضافة امتيازات إلى مجموعة امتيازات أو إزالتها منها</p></td>
<td><p><a href="/docs/ar/privilege_group.md">OperatePrivilegeGroup</a></p></td>
</tr>
</table></p></li>
</ul>
<p>يوضح المثال التالي كيفية منح الامتياز " <code translate="no">PrivilegeSearch</code> " على <code translate="no">collection_01</code> ضمن قاعدة البيانات <code translate="no">default</code> ، بالإضافة إلى مجموعة امتيازات باسم " <code translate="no">privilege_group_1</code> " للدور " <code translate="no">role_a</code>".</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
    </button></h2><p>يوضح المثال التالي كيفية عرض الامتيازات الممنوحة للدور <code translate="no">role_a</code> باستخدام طريقة <code translate="no">describe_role</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>فيما يلي مثال على الناتج.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
     <span class="hljs-attr">&quot;role&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
     <span class="hljs-attr">&quot;privileges&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
         <span class="hljs-punctuation">{</span>
             <span class="hljs-attr">&quot;collection_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;collection_01&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;db_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;default&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;role_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;role_a&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;privilege&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Search&quot;</span><span class="hljs-punctuation">,</span>
             <span class="hljs-attr">&quot;grantor_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;root&quot;</span>
         <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
         <span class="hljs-string">&quot;privilege_group_1&quot;</span>
     <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Revoke-a-privilege-or-a-privilege-group-from-a-role" class="common-anchor-header">إلغاء امتياز أو مجموعة امتيازات من دور<button data-href="#Revoke-a-privilege-or-a-privilege-group-from-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>يوضح المثال التالي كيفية إلغاء الامتياز <code translate="no">PrivilegeSearch</code> على <code translate="no">collection_01</code> ضمن قاعدة البيانات <code translate="no">default</code> وكذلك مجموعة الامتيازات <code translate="no">privilege_group_1</code> التي تم منحها للدور <code translate="no">role_a</code>.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
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
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;roleName&quot;: &quot;role_a&quot;,
    &quot;privilege&quot;: &quot;ClusterReadOnly&quot;,
    &quot;collectionName&quot;: &quot;*&quot;,
    &quot;dbName&quot;:&quot;*&quot;
}&#x27;</span>

<button class="copy-code-btn"></button></code></pre>
