(function($) {
	$.fn.slider = function(opts) {

		return this.each(function() {
			var $this = $(this),
				options = $.extend({}, $.fn.slider.defaults, opts),
				imgList = $this.children(':eq(0)').children(),
				dotList = $this.children(':eq(1)').children(),
				timeout = null,
				init = function() {
					imgList.css('z-index', '0').hide();
					imgList.eq(0).css('z-index', '1').show();
					dotList.removeClass('hover');
					dotList.eq(0).addClass('hover');
					_addEvent();
					_start(0);
				},
				_start = function(index) {
					var num = index;
					timeout = setInterval(function() {
						_slider(num % imgList.length);
						num++;
					}, options.last_time)
				},
				_slider = function(index) {
					var last_index = dotList.siblings('.hover').index();
					if (index != last_index) {
						dotList.removeClass('hover');
						dotList.eq(index).addClass('hover');
						imgList.eq(index).show().end().eq(last_index).fadeOut(options.fade_time, function() {
							imgList.eq(index).css('z-index', '1');
							imgList.eq(last_index).css('z-index', '0');
						});
					}
				},
				_addEvent = function() {
					dotList.on('click', function() {
					var $this=$(this);
						_stop();
						_slider($this.index());
						_start($this.index());
					})
				},
				_stop=function(){
						clearInterval(timeout);
				}
			init();
		})
	}

	$.fn.slider.defaults = {
		last_time: 3000,
		fade_time: 1000
	}

})($)