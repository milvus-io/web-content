# {{page_title}}

{{page_excerpt}}

<div>
    {%- if page_method == 'get' %}
    <div style="display: inline-block; background: #0d8d67; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>GET</span>
    </div>
    {%- endif %}
    {%- if page_method == 'post' %}
    <div style="display: inline-block; background: #026aca; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>POST</span>
    </div>
    {%- endif %}
    {%- if page_method == 'put' %}
    <div style="display: inline-block; background: #604aa2; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>PUT</span>
    </div>
    {%- endif %}
    {%- if page_method == 'delete' %}
    <div style="display: inline-block; background: #b91926; font-size: 0.6em; border-radius: 10px; color: #ffffff; padding: 0.3em 1em;">
        <span>DELETE</span>
    </div>
    {%- endif %}
    <span style="font-weight: bold;">  {{server}}{{page_url}}</span>
</div>

## Example

{{ page_title | get_example }}

## Request

### Parameters

{% if query_params -%}

- Query parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in query_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- No query parameters required

{%- endif %}

{% if path_params -%}

- Path parameters

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    {%- for param in path_params %}
    | `{{param['name']}}`  | **{{param['schema']['type']}}** {%- if param['required'] -%}(required){%- endif -%}<br>{{param['description']}}{%- if param['default'] -%}<br>The value defaults to **{{param['default']}}**.{%- endif -%}{%- if param['minimum'] and param['maximum'] -%}<br>The value ranges from **{{param['minimum']}}** to **{{param['maximum']}}**.{%- endif -%}{%- if param['minimum'] and not param['maximum'] -%}<br>The minimum value is **{{param['minimum']}}**.{%- endif -%}{%- if param['maximum'] and not param['minimum'] -%}<br>The maximum value is **{{param['maximum']}}**.{%- endif -%} |
    {%- endfor %}

{%- else -%}

- No path parameters required

{%- endif %}

### Request Body

{%- if req_bodies -%}
{%- for req_body in req_bodies %}

```json
{{req_body | req_format }}
```

| Parameter        | Description                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
{%- for k, v in req_body['properties'].items() %}
{%- if v['type'] not in ['array', 'object'] %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}** {%- if k in req_body['required'] -%}(required){%- endif -%}<br>{{v['description']}}{%- if v['default'] -%}<br>The value defaults to **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br>The value ranges from **{{v['minimum']}}** to **{{v['maximum']}}**.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br>The minimum value is **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br>The maximum value is **{{v['maximum']}}**.{%- endif -%} |
{%- elif v['type'] == 'object' %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}** {%- if k in req_body['required'] -%}(required){%- endif -%}<br>{{v['description']}}{%- if v['default'] -%}<br>The value defaults to **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br>The value ranges from **{{v['minimum']}}** to **{{v['maximum']}}**.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br>The minimum value is **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br>The maximum value is **{{v['maximum']}}**.{%- endif -%} |
{%- for ko, vo in v['properties'].items() %}
| `{{k}}.{{ko}}`  | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br>{{vo['description']}}{%- if vo['default'] -%}<br>The value defaults to **{{vo['default']}}**.{%- endif -%}{%- if vo['minimum'] and vo['maximum'] -%}<br>The value ranges from **{{vo['minimum']}}** to **{{vo['maximum']}}**.{%- endif -%}{%- if vo['minimum'] and not vo['maximum'] -%}<br>The minimum value is **{{vo['minimum']}}**.{%- endif -%}{%- if vo['maximum'] and not vo['minimum'] -%}<br>The maximum value is **{{vo['maximum']}}**.{%- endif -%} |
{%- endfor %}
{%- elif v['type'] == 'array' %}
| `{{k}}`  | **{{v['type']}}{%if 'format' in v['items'] %} ({{v['items']['type']}} \[{{v['items']['format']}}\]){%- endif %}** {%- if k in req_body['required'] -%}(required){%- endif -%}<br>{{v['description']}}{%- if v['default'] -%}<br>The value defaults to **{{v['default']}}**.{%- endif -%}{%- if v['minimum'] and v['maximum'] -%}<br>The value ranges from **{{v['minimum']}}** to **{{v['maximum']}}**.{%- endif -%}{%- if v['minimum'] and not v['maximum'] -%}<br>The minimum value is **{{v['minimum']}}**.{%- endif -%}{%- if v['maximum'] and not v['minimum'] -%}<br>The maximum value is **{{v['maximum']}}**.{%- endif -%} |
{%- if v['items'] == 'object' %}
{%- for ka, va in v['items']['properties'].items() %}
| `{{k}}[].{{ka}}`  | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br>{{va['description']}}{%- if va['default'] -%}<br>The value defaults to **{{va['default']}}**.{%- endif -%}{%- if va['minimum'] and va['maximum'] -%}<br>The value ranges from **{{va['minimum']}}** to **{{va['maximum']}}**.{%- endif -%}{%- if va['minimum'] and not va['maximum'] -%}<br>The minimum value is **{{va['minimum']}}**.{%- endif -%}{%- if va['maximum'] and not va['minimum'] -%}<br>The maximum value is **{{va['maximum']}}**.{%- endif -%} |
{%- endfor %}
{%- endif %}
{%- endif %}
{%- endfor %}


{%- endfor %}
{%- else %}

No request body required

{%- endif %}

## Response

{{ res_des }}

### Response Bodies

- Response body if we process your request successfully

```json
{{res_body | res_format }}
```

- Response body if we failed to process your request

```json
{
    "code": integer,
    "message": string
}
```

### Properties

The properties in the returned response are listed in the following table.

| Property | Description                                                                                                                                 |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br>Indicates whether the request succeeds.<br><ul><li>`200`: The request succeeds.</li><li>Others: Some error occurs.</li></ul> |
{%- if 'properties' in res_body['properties']['data'] %}
| `data`    | **object**<br>A data object. |
{%- for k, v in res_body['properties']['data']['properties'].items() %}
{%- if v['type'] not in ['array', 'object'] or 'properties' not in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- elif v['type'] == 'array' and 'properties' in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- for ka, va in v['items']['properties'].items() %}
| `data.{{k}}[].{{ka}}`   | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br>{{va['description']}} |
{%- endfor %}
{%- elif v['type'] == 'object' %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- for ko, vo in v['properties'].items() %}
| `data.{{k}}.{{ko}}`   | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br>{{vo['description']}} |
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- elif 'items' in res_body['properties']['data'] %}
| `data`  | **array**<br>A data array of {{res_body['properties']['data']['items']['type']}}s. |
{%- if res_body['properties']['data']['items']['type'] == 'object' %}
{%- for k, v in res_body['properties']['data']['items']['properties'].items() %}
{%- if v['type'] not in ['array', 'object'] or 'properties' not in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- elif v['type'] == 'array' and 'properties' in v['items'] %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- for ka, va in v['items']['properties'].items() %}
| `data.{{k}}[].{{ka}}`   | **{{va['type']}}{%if 'format' in va %}({{va['format']}}){%- endif %}**<br>{{va['description']}} |
{%- endfor %}
{%- elif v['type'] == 'object' %}
| `data.{{k}}`   | **{{v['type']}}{%if 'format' in v %}({{v['format']}}){%- endif %}**<br>{{v['description']}} |
{%- for ko, vo in v['properties'].items() %}
| `data.{{k}}.{{ko}}`   | **{{vo['type']}}{%if 'format' in vo %}({{vo['format']}}){%- endif %}**<br>{{vo['description']}} |
{%- endfor %}
{%- endif %}
{%- endfor %}
{%- endif%}
{%- endif %}
| `message`  | **string**<br>Indicates the possible reason for the reported error. |

## Possible Errors

| Code | Error Message |
| ---- | ------------- |
{{ page_title | list_error }}
