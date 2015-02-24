(function ($) {
    "use strict";

    var wysihtml5ParserRules = {
      tags: {
        strong: {},
        b: {},
        i: {},
        em: {},
        u: {},
        br: {},
        p: {},
        div: {},
        span: {},
        ul: {},
        ol: {},
        li: {},
        h1: {},
        h2: {},
        h3: {},
        a: {
            set_attributes: {
                target: "_blank",
                rel: "nofollow"
            },
            check_attributes: {
                href: "url" // important to avoid XSS
            }
        },
        img: {
            check_attributes: {
                width: "dimension",
                alt: "alt",
                src: "url", // if you compiled master manually then change this from 'url' to 'src'
                height: "dimension"
            },
            add_class: {
                align: "align_img"
            }
        },
      }
    };

    var Wysihtml = function (options) {
        this.init('wysihtml', options, Wysihtml.defaults);

        //extend wysihtml manually as $.extend not recursive
        this.options.wysihtml = $.extend({}, Wysihtml.defaults.wysihtml, options.wysihtml);
        this.editor = null;
    };

    $.fn.editableutils.inherit(Wysihtml, $.fn.editabletypes.abstractinput);

    $.extend(Wysihtml.prototype, {
        render: function () {
            this.editor = new wysihtml5.Editor(this.$tpl.filter(".editor")[0], {
                toolbar: this.$tpl.filter(".toolbar")[0],
                parserRules: wysihtml5ParserRules
            });
        },

        value2html: function(value, element) {
            $(element).html(value);
        },

        html2value: function(html) {
            return html;
        },

        value2input: function(value) {
            this.editor.setValue(value);
        },

        input2value: function() {
            return this.editor.getValue();
        },

        activate: function() {
            this.editor.focus();
        },

        isEmpty: function($element) {
            if($.trim($element.html()) === '') {
                return true;
            } else if($.trim($element.text()) !== '') {
                return false;
            } else {
                //e.g. '<img>', '<br>', '<p></p>'
                return !$element.height() || !$element.width();
            }
        }
    });

    Wysihtml.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<div class="toolbar">' +
            '<div class="btn-toolbar">' +
                '<div class="btn-group">' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="formatBlock" data-wysihtml5-command-blank-value="true">Normal</a>' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">Heading 1</a>' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2">Heading 2</a>' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h3">Heading 3</a>' +
                '</div>' +
                '<div class="btn-group">' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="bold"><strong>Bold</strong></a>' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="italic"><i>Italic</i></a>' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="underline"><u>Underline</u></a>' +
                '</div>' +
                '<div class="btn-group">' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="createLink"><i class="icon-share"></i></a>' +
                '</div>' +
                '<div class="btn-group">' +
                    '<a class="btn btn-small" unselectable="on" href="javascript:;" data-wysihtml5-command="insertImage"><i class="icon-picture"></i></a>' +
                '</div>' +
                '<div class="btn-group pull-right">' +
                    '<button type="submit" class="btn btn-small editable-cancel"><i class="icon-remove"></i></button>' +
                '</div>' +
                '<div class="btn-group pull-right">' +
                    '<button type="submit" class="btn btn-primary btn-small editable-submit"><i class="icon-ok icon-white"></i></button>' +
                '</div>' +
            '</div>' +
            '<div data-wysihtml5-dialog="createLink" class="form-inline" style="display:none;">' +
                '<input data-wysihtml5-dialog-field="href" placeholder="http://">' +
                '<a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-small">OK</a>' +
                '<a data-wysihtml5-dialog-action="cancel" class="btn btn-small">Cancel</a>' +
            '</div>' +
            '<div data-wysihtml5-dialog="insertImage" class="form-inline" style="display:none;">' +
                '<input data-wysihtml5-dialog-field="src" placeholder="http://">' +
                '<a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-small">OK</a>' +
                '<a data-wysihtml5-dialog-action="cancel" class="btn btn-small">Cancel</a>' +
            '</div>' +
        '</div>' +
        '<div class="editor"></div>',
        inputclass: 'editable-wysihtml',
        showbuttons: false,
        wysihtml: {
        }
    });

    $.fn.editabletypes.wysihtml = Wysihtml;
}(window.jQuery));
