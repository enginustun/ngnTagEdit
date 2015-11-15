/*ngnAnimator*/
(function ($) {
    /**/
    var methods = {
        bounce: function (timeOut, minScale, maxScale, easing) {
            var animSpeed = timeOut || 500, minS = minScale || 1, maxS = maxScale || 10, eas = easing || 'swing';
            return this.each(function () {
                var $this = $(this);
                $this.stop(null, false, false).animate({ scale: maxS }, animSpeed, eas, function () {
                    $this.stop(null, false, false).animate({ scale: minS }, animSpeed, eas);
                });
            });
        },

        appended: function (timeOut, easing) {
            var animSpeed = timeOut || 500, eas = easing || 'swing';
            return this.each(function () {
                var $this = $(this);
                $this.stop(null, false, false).animate({ scale: 0.7, opacity: 0 }, 0, function () {
                    $this.stop(null, false, false).animate({ scale: 1, opacity: 1 }, animSpeed, eas);
                });
            });
        },

        removed: function (callbacks, timeOut, easing) {
            var animSpeed = timeOut || 500, eas = easing || 'swing';
            return this.each(function () {
                var $this = $(this);
                $this.stop(null, false, false).animate({ scale: 0.7, opacity: 0 }, animSpeed, eas, function () {
                    $this.remove();
                    if (callbacks) {
                        if (callbacks.done) {
                            callbacks.done.call(null, arguments);
                        }
                    }
                });
            });
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------------------------------*/

    /**/
    var functions = {

    }
    /*-----------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------------------------------*/
    $.fn.ngnAnimator = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error("Method " + method + " does not exist");
        }
    };
})(jQuery);
//----------------------------------------------------------------


/*ngnTagEdit*/
(function ($) {
    /**/
    var methods = {
        init: function (options) {
            var defaults = {

            }
            return this.each(function () {
                options = $.extend(true, defaults, options);
                var self = this,
                    listContainer = $(self).parents('.wsi-tags-container'),
                    list = $('.wsi-tags', listContainer);

                $(listContainer).on('click', function (e) {
                    if (!$(e.target).hasClass('wsi-tag') && !$(e.target).hasClass('wsi-tag-name') && !$(e.target).hasClass('wsi-tag-remove')) {
                        $(self).focus();
                    }
                });

                $(document).off('click', '.wsi-tag-remove').on('click', '.wsi-tag-remove', function () {
                    $(this).parent().ngnAnimator('removed');
                });

                $(document).off('click', '.wsi-tag').on('click', '.wsi-tag', function (e) {
                    if (!$(e.target).hasClass('wsi-tag-remove')) {
                        $('.wsi-tag-name', this).attr('contenteditable', true);
                        $(this).removeClass('label label-warning');
                        $('.wsi-tag-name', this).focus();
                        $('.wsi-tag-remove', this).hide();
                    }
                });

                $(document).off('blur', '.wsi-tag-name').on('blur', '.wsi-tag-name', function () {
                    var thisVal = $(this).text();
                    if (thisVal.length > 0) {
                        $(this).removeAttr('contenteditable');
                        $(this).parent().addClass('label label-warning');
                        $(this).next().show();
                    }
                    else {
                        $(this).parent().remove();
                    }

                });

                $(document).off('keydown', '.wsi-tag-name').on('keydown', '.wsi-tag-name', function (e) {
                    if (e.which == 13) {
                        $(this).blur();
                    }
                });

                $(self).off('keyup').on('keyup', function (e) {
                    var tagName = $(this).val();
                    if (e.which == 13) {
                        if (tagName.length > 0) {
                            var newTag = '';
                            newTag += '<span class="label label-warning wsi-tag">';
                            newTag += '<span class="wsi-tag-name">';
                            newTag += tagName;
                            newTag += '</span> <span class="glyphicon glyphicon-remove wsi-tag-remove"></span></span> ';
                            $(list).append(newTag);
                            $('.wsi-tag:last').ngnAnimator('appended');
                            $(this).val('');
                        }
                    }
                });
            });
        },

        setTags: function (tags) {
            var self = this,
                listContainer = $(self).parents('.wsi-tags-container'),
                list = $('.wsi-tags', listContainer);
                $(list).html('');
            for (var i = 0; i < tags.length; i++) {
                var newTag = '';
                newTag += '<span class="label label-warning wsi-tag">';
                newTag += '<span class="wsi-tag-name">';
                newTag += tags[i];
                newTag += '</span> <span class="glyphicon glyphicon-remove wsi-tag-remove"></span></span> ';
                $(list).append(newTag);
            }
        },

        getTags: function () {
            var self = this,
               listContainer = $(self).parents('.wsi-tags-container'),
               list = $('.wsi-tags', listContainer),
                   tagList = [];
            $('.wsi-tag-name', list).each(function () {
                tagList.push($(this).text());
            });
            return tagList;
        },

        clearTags: function () {
            var self = this,
               listContainer = $(self).parents('.wsi-tags-container'),
               list = $('.wsi-tags', listContainer);
            $(list).html('');
        }
    }
    /*-----------------------------------------------------------------------------------------------------------------------*/
    /*-----------------------------------------------------------------------------------------------------------------------*/
    $.fn.ngnTagEdit = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist");
        }
    };
})(jQuery);
//----------------------------------------------------------------