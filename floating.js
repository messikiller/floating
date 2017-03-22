;(function($, window, document,undefined) {
    var floator = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'background_color': '#6fb5f1',
            'sub_background_color': '#6fb5f1',
            'width': 40,
            'height': 40,
            'bottom': 50,
            'right': 50,
            'distance': 80,
            'duration': 200
        };
        this.options = $.extend({}, this.defaults, opt)
    };

    floator.prototype = {
        run: function(){
            this.createSubs();
        },
        createSubs: function() {
            var parent = this.$element;

            var parent_css = {
                'display': 'inline-block',
                'position': 'fixed',
                'bottom': this.options.bottom,
                'right': this.options.right,
            };

            var main_css = {
                'display': 'inline-block',
                'background-color': this.options.background_color,
                'width': this.options.width,
                'height': this.options.height,
                'border-radius': this.options.width / 2,
                'border': '1px solid '+this.options.background_color,
                'color': '#ffffff',
                'line-height': this.options.height + 'px',
                'text-align': 'center',
                'font-size': parseInt(0.75 * this.options.height),
                'cursor': 'pointer',
                'z-index': 99999
            };

            var sub_css = {
                'display': 'inline-block',
                'color': '#ffffff',
                'position': 'absolute',
                'right': 0,
                'bottom': 0,
                'background-color': this.options.sub_background_color,
                'border': '1px solid '+this.options.background_color,
                'width': this.options.width,
                'height': this.options.height,
                'border-radius': this.options.width / 2,
                'z-index': -1
            };

            parent.css(parent_css);

            var main     = $('<a></a>').addClass('floating-main').html('+').css(main_css);
            var sub_top  = $('<a></a>').addClass('floating-sub floating-sub-top').css(sub_css);
            var sub_home = $('<a></a>').addClass('floating-sub floating-sub-home').css(sub_css);
            var sub_back = $('<a></a>').addClass('floating-sub floating-sub-back').css(sub_css);

            main.appendTo(this.$element).after(sub_top).after(sub_back).after(sub_home);

            var _d = this.options.distance;
            var __d = 0.5 * Math.sqrt(2) * _d;

            var _duration = this.options.duration;

            var spread = function() {
                if (main.hasClass('spreaded')) {
                    return;
                }
                main.css({
                    'transform': 'rotate(45deg)',
                    '-ms-transform': 'rotate(45deg)',
                    '-moz-transform': 'rotate(45deg)',
                    '-webkit-transform': 'rotate(45deg)',
                    '-o-transform': 'rotate(45deg)',
                }).addClass('spreaded').addClass('animated tada');
                sub_top.animate({bottom: '+='+_d+'px'}, _duration).addClass('animated bounceIn');
                sub_back.animate({right: '+='+_d+'px'}, _duration).addClass('animated bounceIn');
                sub_home.animate({
                    right: '+='+ __d+'px',
                    bottom: '+='+ __d+'px'
                }, _duration).addClass('animated bounceIn');
            };

            var unspread = function(){
                if (! main.hasClass('spreaded')) {
                    return;
                }
                main.css({
                    'transform': 'rotate(0)',
                    '-ms-transform': 'rotate(0)',
                    '-moz-transform': 'rotate(0)',
                    '-webkit-transform': 'rotate(0)',
                    '-o-transform': 'rotate(0)',
                }).removeClass('spreaded').removeClass('animated tada');
                sub_top.animate({bottom: '-='+_d+'px'}, _duration).removeClass('animated bounceIn');
                sub_back.animate({right: '-='+_d+'px'}, _duration).removeClass('animated bounceIn');
                sub_home.animate({
                    right: '-='+ __d+'px',
                    bottom: '-='+ __d+'px'
                }, _duration).removeClass('animated bounceIn');
            };

            main.mouseenter(function(e){
                e.stopImmediatePropagation();
                spread();
            });

            $(document).click(function(e){
                unspread();
            });
        }
    };

    $.fn.floating = function(options) {
       var floators = new floator(this, options);

       return floators.run();
   };

})(jQuery, window, document);
