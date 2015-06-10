/**
 *  Growl Alert for Bootstrap 3 & jQuery (http://prografos.net/growlalert)
 *  Copyright 2015 Juan M. Negrete (http://prografos.net)
 *  based on, but incompatible with, bootstrap-growl (https://github.com/ifightcrime/bootstrap-growl)
 *  Licensed under MIT (https://github.com/jmnf/growlAlert/blob/master/LICENSE.md)
*/
(function() {
	var $;

	$ = jQuery;

	$.growlAlert = function (message, options) {
		var $body, $container, $row, $column, $alert, $close, $times;
		$body = $("body");
		options = $.extend({ }, $.growlAlert.default_options, options);

		$alert = $("<div>").attr({
			"class": "alert",
			"role": "alert"
		});

		if ( options.type ) {
			$alert.addClass("alert-" + options.type);
		}

		if ( options.allow_dismiss ) {
			$times = $("<span>").attr("aria-hidden", "true").append("&times;");
			$close = $("<button>").attr({
				"type": "button",
				"class": "close",
				"data-dismiss": "alert",
				"aria-label": "Close"
			});
			$close.append($times);
			$alert.addClass("alert-dismissible").append($close);
		}

		$alert.append(message).css("display", "none");

		$column = $("<div>").attr("class", options.column_class).append($alert);

		$row = $("<div>").attr("class", "row").append($column);

		if ( $("#gaFluidContainer").length ) {
			$container = $("#gaFluidContainer");
		} else {
			$container = $("<div>").attr({
				"id": "gaFluidContainer",
				"class": "container-fluid"
			});
			$body.append($container);
		}

		$container.css({
			"position": "fixed",
			"top": "0",
			"padding-top": options.top_offset,
			"width": "100%",
			"height": "100%",
			"z-index": "9999"
		}).append($row);

		$alert.fadeIn();

		if ( options.delay > 0 ) {
			$alert.delay(options.delay).fadeOut(function () {
				return $(this).alert("close");
			});
		}

		return $alert;
	};

	$.growlAlert.default_options = {
		type: "info",
		delay: "3000",
		top_offset: 20,
		allow_dismiss: true,
		column_class: "col-sm-8 col-sm-offset-4 col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-8"
	};
}).call(this);
