$(document).ready(function(){

	populate_options();
	populate_classrooms();

	$('#save_btn').on('click',function(){
		save_login();
		return false;
	});
	$('#reset_btn').on('click',function(){
		reset_classrooms();
		return false;
	});
	$('#reset_session_btn').on('click',function(){
		reset_session();
		return false;
	});
	$('#version').html(get_version());
});

function populate_classrooms(){
	var classrooms = Classes.get_all();
	var content = "";
	for(var a in classrooms){
		content += populate_classroom(classrooms[a]);
	}
	$("#tclassrooms").html(content);
	$(".notify_classroom").on('click',function(){
		var classroom_code = $(this).attr('value');
		var notify = $(this).prop('checked');
		save_notify_classroom(classroom_code, notify);
	});
	$("#alertstatus").hide();
}

function populate_classroom(classroom){
	var checked = classroom.notify ? "checked" : "";
	var color = classroom.color ? classroom.color : '555';
	var title = classroom.subject_code ? classroom.subject_code+' '+classroom.title : classroom.title;
	return '<div class="input-group not_classroom"><span class="input-group-addon" style="background-color:#'+color+';"> \
			<input class="notify_classroom" type="checkbox" id="'+classroom.code+'" value="'+classroom.code+'" '+checked+'> \
			</span><label for="'+classroom.code+'" class="form-control">'+title+" - "+classroom.get_acronym() + '</label></div>';
}

function populate_options(){
	var option;

	option = get_user();
	$('#username').val(option.username);
	$('#pwd').val(option.password);

	option = get_uni();
	$('#uni').val(option)
			.on('change', function(){
				save_uni($(this).val());
			});

	option = get_interval();
	$('#check_interval').val(option)
			.on('change', function(){
				save_interval($(this).val());
				reset_alarm();
			});

	option = get_critical();
	$('#critical').val(option)
			.on('change', function(){
				save_critical($(this).val());
			});

	option = get_notification();
	if (option) {
		$('#notification').attr('checked','checked');
	}
	$('#notification').on('click', function(){
		var ischecked = $('#notification').is(':checked');
		save_notification(ischecked);
	});

	option = get_check_mail();
	if (option) {
		$('#check_mail').attr('checked','checked');
	}
	$('#check_mail').on('click', function(){
		var ischecked = $('#check_mail').is(':checked');
		save_check_mail(ischecked);
	});

	option = get_show_agenda();
	if (option) {
		$('#show_agenda').attr('checked','checked');
	}
	$('#show_agenda').on('click', function(){
		var ischecked = $('#show_agenda').is(':checked');
		save_show_agenda(ischecked);
	});

	option = get_show_module_dates();
	if (option) {
		$('#show_module_dates').attr('checked','checked');
	}
	$('#show_module_dates').on('click', function(){
		var ischecked = $('#show_module_dates').is(':checked');
		save_show_module_dates(ischecked);
	});

	option = get_today();
	$('#today_tab').val(option)
			.on('change', function(){
				save_today($(this).val());
			});
}

function save_login(){
	save_user($("#username").val(), $("#pwd").val());
	check_messages(after_check_messages);

	$("#status").text(_("__SAVED_OPTIONS__"));
	$("#alertstatus").removeClass('alert-danger');
	$("#alertstatus").addClass('alert-success');
	$("#alertstatus").show();
}

function reset_classrooms() {
	var sure = confirm(_("__RESET_CONFIRM__"));
	if (sure) {
		console.log('Reset classes...');
		Classes.reset();
		populate_classrooms();
		save_login();
	}
}

function after_check_messages() {
	$("#alertstatus").hide();
	populate_classrooms();
}

function login_success() {
	$(".login").addClass('has-success');
	$(".login").removeClass('has-error');
}

function login_failed() {
	$("#status").html(_("__INCORRECT_USER__"));
	$("#alertstatus").addClass('alert-danger');
	$("#alertstatus").removeClass('alert-success');
	$("#alertstatus").show();
	$(".login").removeClass('has-success');
	$(".login").addClass('has-error');
}