$(function() {
	$( "#datepicker1" ).datepicker({
		dateFormat: 'yy-mm-dd',
		defaultDate: "+1w",
		changeMonth: true,
		onClose: function( selectedDate ) {
			$( "#datepicker2" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( "#datepicker2" ).datepicker({
		dateFormat: 'yy-mm-dd',
		defaultDate: "+1w",
		changeMonth: true,
		onClose: function( selectedDate ) {
			$( "#datepicker1" ).datepicker( "option", "maxDate", selectedDate );
		}
	});
});