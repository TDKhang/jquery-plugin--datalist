# jquery-plugin--datalist
Datalist plugin for jquery

# Depend on
- jquery-3.7.0

# Preview
![Preview 001](./images/preview-001.png)

# Install
```html
<link rel="stylesheet" href="data_list.css">
<script src="data_list.js"></script>
```

# Basic use
```html
<div id="data-list"></div>

<script>
    $(function () {
        $('#data-list').dataList({
            data: [
                { 'value': 'apple', 'text': 'Apple' },
                { 'value': 'orange', 'text': 'Orange' },
            ],
        });
    });
</script>
```

# API document
## data
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    data: [
        { 'value': 'apple', 'text': 'Apple' },
        { 'value': 'orange', 'text': 'Orange' },
    ],
});
```
## itemContainerSelector
**Type**: String|null

**Default**: null

**Example**:
```js
$('#data-list').dataList({
    itemContainerSelector: '#container-id',
});

$('#data-list').dataList({
    itemContainerSelector: '.container-class',
});
```
## name
**Type**: String

**Default**: ''

**Example**:
```js
$('#data-list').dataList({
    name: 'id[]',
});
```
## placeholder
**Type**: String

**Default**: ''

**Example**:
```js
$('#data-list').dataList({
    placeholder: 'Choose one fruit',
});
```
## selectedValue
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    selectedValue: ['apple'],
});
```
