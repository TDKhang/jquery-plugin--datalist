/*!
 * datalist JavaScript Library v1.0.0
 *
 * Date: 2023-07-19T16:53Z
 */
(function ($) {
    $.fn.dataList = function (options) {
        // Options
        var settings = $.extend({
            data: [
                // { 'value': 'example', 'text': 'example' },
            ],
            inputExtendClass: [],
            itemExtendClass: [],
            itemContainerSelector: null,
            name: '',
            optionExtendClass: [],
            placeholder: '',
            selectedValue: [],
            wrapExtendClass: [],
        }, options);

        // constant
        const wrapClass = 'data-list__wrap';
        const inputClass = 'data-list__input';
        const optionClass = 'data-list__options';
        const itemClass = 'data-list__item';

        // Validate params
        const validateParams = () => {
            // Validate data
            if (! Array.isArray(settings.data)) {
                throw new Error('"data" must be a array');
            }
            for (const option of settings.data) {
                if (
                    option === null
                    || typeof option !== 'object'
                    || ! option.hasOwnProperty('value')
                    || ! option.hasOwnProperty('text')
                ) {
                    throw new Error('"data element" must be an object that has 2 properties value and text');
                }
            }
            // Validate inputClass
            if (! Array.isArray(settings.inputExtendClass)) {
                throw new Error('"inputClass" must be a array');
            }
            for (const element in settings.inputExtendClass) {
                if (element.trim() === inputClass) {
                    throw new Error(`"inputClass" can not be ${inputClass}`);
                }
            }
            // Validate itemClass
            if (! Array.isArray(settings.itemExtendClass)) {
                throw new Error('"itemClass" must be a array');
            }
            for (const element in settings.itemExtendClass) {
                if (element.trim() === itemClass) {
                    throw new Error(`"itemClass" can not be ${itemClass}`);
                }
            }
            // Validate optionClass
            if (! Array.isArray(settings.optionExtendClass)) {
                throw new Error('"optionClass" must be a array');
            }
            for (const element in settings.optionExtendClass) {
                if (element.trim() === optionClass) {
                    throw new Error(`"optionClass" can not be ${optionClass}`);
                }
            }
            // Validate wrapClass
            if (! Array.isArray(settings.wrapExtendClass)) {
                throw new Error('"wrapClass" must be a array');
            }
            for (const element in settings.wrapExtendClass) {
                if (element.trim() === wrapClass) {
                    throw new Error(`"wrapClass" can not be ${wrapClass}`);
                }
            }
            // Validate selectedValue
            if (! Array.isArray(settings.selectedValue)) {
                throw new Error('"selectedValue" must be a array');
            }
        };

        // Get DOM
        var wrapDOM, inputDOM, optionDOM, optionLiDOM, itemDOM;
        const getDOM = () => {
            wrapDOM = this.find(`.${wrapClass}`);
            inputDOM = this.find(`.${inputClass}`);
            optionDOM = this.find(`.${optionClass}`);
            optionLiDOM = this.find(`.${optionClass} li`);
            itemDOM = this.find(`.${itemClass}`);
        };

        // Build html
        const buildHtml = () => {
            let wrapAllClass = wrapClass;
            if (settings.wrapExtendClass.length > 0) {
                wrapAllClass = wrapAllClass + ' ' + settings.wrapExtendClass.join(' ');
            }
            let inputAllClass = inputClass;
            if (settings.inputExtendClass.length > 0) {
                inputAllClass = inputAllClass + ' ' + settings.inputExtendClass.join(' ');
            }
            let optionAllClass = optionClass;
            if (settings.optionExtendClass.length > 0) {
                optionAllClass = optionAllClass + ' ' + settings.optionExtendClass.join(' ');
            }
            this.empty()
                .html(
                    `<div class="${wrapAllClass}">
                        <input type="text" class="${inputAllClass}" placeholder="${settings.placeholder}" autocomplete="off">
                        <ul class="${optionAllClass}"></ul>
                    </div>`
                );
            getDOM();
            if (settings.selectedValue.length > 0) {
                for (const option of settings.data) {
                    if (settings.selectedValue.includes(option.value)) {
                        buildItemHtml(option.value, option.text);
                    }
                }
            }
            getDOM();
        };

        // Build item html
        const buildItemHtml = (value, text) => {
            let itemAllClass = itemClass;
            if (settings.itemExtendClass.length > 0) {
                itemAllClass = itemAllClass + ' ' + settings.itemExtendClass.join(' ');
            }
            const item = `
                <span class="${itemAllClass}" data-value="${value}">
                    ${text}
                    <input type="text" name="${settings.name}" value="${value}" style="display: none;">
                    <span class="close" onclick="this.closest('.${itemClass}').remove()">&#10006;</span>
                </span>
            `;
            $(item).insertBefore(
                settings.itemContainerSelector === null ? wrapDOM : $(settings.itemContainerSelector)
            );
        };

        // Filter data
        const filterData = () => {
            let value = inputDOM.val().trim().toLowerCase();
            if (value === '') {
                return settings.data;
            }
            const data = [];
            for (const option of settings.data) {
                if (option.text.toLowerCase().includes(value)) {
                    data.push(option);
                }
            }
            return data;
        };

        // Build option html
        const buildOptionHtml = () => {
            optionDOM.empty();
            const data = filterData();
            let optionHtml = '';
            for (const option of data) {
                optionHtml += `<li data-value="${option.value}">${option.text}</li>`;
            }
            optionDOM.html(optionHtml);
            getDOM();
            optionLiDOM.off('click')
                .on('click', function () {
                    const value = $(this).data('value');
                    const text = $(this).text();
                    if ($(`.${itemClass}[data-value="${value}"]`).length > 0) {
                        return;
                    }
                    buildItemHtml(value, text);
                    inputDOM.val('');
                });
        };

        // Methods
        var methods = {
            init: function () {
                validateParams();
                buildHtml();

                //
                inputDOM.on('focus', function() {
                    buildOptionHtml();
                    optionDOM.css('display', 'block');
                })
                    .on('blur', function() {
                        setTimeout(() => {
                            optionDOM.css('display', 'none');
                        }, 100);
                    });

                inputDOM.on('keyup', function () {
                    buildOptionHtml();
                });
            }
        };

        // Init
        methods.init();

        return this;
    };
}(jQuery));