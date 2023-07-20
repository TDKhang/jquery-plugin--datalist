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
## inputExtendClass
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    inputExtendClass: ['input-class-1', 'input-class-2']
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
## itemExtendClass
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    itemExtendClass: ['item-class-1', 'item-class-2']
});
```
## itemRemoveIcon
**Type**: String

**Default**: '&#10006;'

**Example**:
```js
$('#data-list').dataList({
    itemRemoveIcon: '<i class="far fa-times"></i>'
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
## optionExtendClass
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    optionExtendClass: ['option-class-1', 'option-class-2']
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
## wrapExtendClass
**Type**: Array

**Default**: []

**Example**:
```js
$('#data-list').dataList({
    wrapExtendClass: ['wrap-class-1', 'wrap-class-2']
});
```
