/*!
 * datalist JavaScript Library v1.0.0
 *
 * Date: 2023-07-18T07:32Z
 */
(function ($) {
    $.fn.dataList = function (options) {
        // Options
        var settings = $.extend({
            data: [
                // { 'value': 'example', 'text': 'example' },
            ],
            itemContainerSelector: null,
            name: '',
            placeholder: '',
            selectedValue: [],
        }, options);

        // Validate params
        const validateParams = () => {
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
            if (! Array.isArray(settings.selectedValue)) {
                throw new Error('"selectedValue" must be a array');
            }
        };

        // constant
        const wrapClass = 'data-list__wrap';
        const inputClass = 'data-list__input';
        const optionClass = 'data-list__options';
        const itemClass = 'data-list__item';

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
            this.empty()
                .html(
                    `<div class="${wrapClass}">
                        <input type="text" class="${inputClass}" placeholder="${settings.placeholder}" autocomplete="off">
                        <ul class="${optionClass}"></ul>
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
            const item = `
                <span class="${itemClass}" data-value="${value}">
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