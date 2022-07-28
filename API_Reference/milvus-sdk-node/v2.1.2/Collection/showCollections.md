# showCollections()
List all collections or get collection loading status.

## Invocation
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.showCollections(ShowCollectionsReq);
```

## Parameter
### ShowCollectionsReq
| Parameter       | Description         | type                | required |
| --------------- | ------------------- | ------------------- | -------- |
| collection_name | Name of the collections to check for their loading status     | String array        | false    |
| type            | ShowCollectionsType | ShowCollectionsType | false    |

### ShowCollectionsType
| value | Description | type   | required |
| ----- | ----------- | ------ | -------- |
| 0     | All         | number | true     |
| 1     | Loaded      | number | true     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.showCollections();
```

## Return
```javascript
// showCollections return
{
  status: { error_code: 'Success', reason: '' },
  data: [
    {
      name: 'my_collection',
      id: '434826867399720961',
      timestamp: '1658732862090',
      loadedPercentage: undefined
    }
  ]，
  created_timestamps: [ '434826867399720964' ],
  created_utc_timestamps: [ '1658732862090' ],
}
```
