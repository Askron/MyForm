$(window).bind('load', function () {

	$('#myForm').bind('submit', function () {
		MyForm.submit();
		return false;
	});

	$('#myForm>[name=phone]').bind('click', function () {
		if ($('#myForm>[name=phone]').val()=='') {
			$('#myForm>[name=phone]').val('+7(');
		}
	});

	$('#myForm>[name=phone]').bind('input', function () {
		if ($('#myForm>[name=phone]').val().match(/^\+7\(\d{3}$/g)!=null) {
			$('#myForm>[name=phone]').val($('#myForm>[name=phone]').val() + ')');
		}
		if ($('#myForm>[name=phone]').val().match(/^\+7\(\d{3}\)\d{3}$/g)!=null) {
			$('#myForm>[name=phone]').val($('#myForm>[name=phone]').val() + '-');
		}
		if ($('#myForm>[name=phone]').val().match(/^\+7\(\d{3}\)\d{3}-\d{2}$/g)!=null) {
			$('#myForm>[name=phone]').val($('#myForm>[name=phone]').val() + '-');
		}
	});

	$(window).bind('resize', function () {
		if ($('#resultContainer').css('height').replace('px','')>200) {$('#resultContainer').css('top', window.innerHeight*0.66+20+'px');}
		else {$('#resultContainer').css('top', '400px');}
	});

	$(window).trigger('resize');

	var request = function () {
		choose();
		$.ajax({
	  		url: $('#myForm').attr('action'),
	  		dataType: "jsonp",
	  		jsonpCallback: "getstatus",
	  		success: function(data){
	    		switch (data['status']) {
	   			case 'success':
	   				$('#resultContainer').addClass('success');
	   				$('#resultContainer').removeClass('error progress');
	   				$('#resultContainer').html('Success');
	   				break;
    			case 'error':
    				$('#resultContainer').addClass('error');
    				$('#resultContainer').removeClass('success progress');
    				$('#resultContainer').html(data['reason']);
    				break;
    			case 'progress':
    				$('#resultContainer').addClass('progress');
    				$('#resultContainer').removeClass('success error');
    				$('#resultContainer').html('Progress');
    				setTimeout(request, Number(data['timeout']));
    				break;
    			}
  			}
		});
	}

	var choose = function () {
		switch (prompt('Введите номер файла на который отправить запрос:\n1 - "success.json"\n2 - "error.json"\n3 - "progress.json"')) {
				case '1': $('#myForm').attr('action', 'success.json'); break;
				case '2': $('#myForm').attr('action', 'error.json'); break;
				case '3': $('#myForm').attr('action', 'progress.json'); break;
				case null: $('#myForm').attr('action', 'success.json'); break;
				default: alert('Некорректный номер файла.'); choose(); break;
			}
	}

	var MyForm = {};

	MyForm.validate = function () {
		var result = {isValid:true, errorFields:[]};
		var fio=$('#myForm>[name=fio]').val().match(/^[A-Za-zА-Яа-я]{2,} [A-Za-zА-Яа-я]{2,} [A-Za-zА-Яа-я]{2,}$/g);
		var email=$('#myForm>[name=email]').val().match(/^([a-z0-9]+[._-]?)*[a-z0-9]@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com)$/ig);
		var phone=$('#myForm>[name=phone]').val().match(/^\+?7\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/g);
		var phoneNumb=0;
		var phoneSum=0;
		if (phone!==null) {
			phoneNumb=$('#myForm>[name=phone]').val().replace(/\+/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/-/g,'').replace(/ /g,'');
			for (var i=0; i<phoneNumb.length; i++) {
				phoneSum+=Number(phoneNumb.charAt(i));
			}
		}
		if (fio!==null && email!==null && phoneSum>6 && phoneSum<30) {result.isValid=true; $('#submitButton').attr('disabled','true');} else {result.isValid=false;}
		if (fio===null) {result.errorFields.push('fio'); $('#myForm>[name=fio]').addClass('error');} else {$('#myForm>[name=fio]').removeClass('error');}
		if (email===null) {result.errorFields.push('email'); $('#myForm>[name=email]').addClass('error');} else {$('#myForm>[name=email]').removeClass('error');}
		if (phoneSum<6 || phoneSum>30) {result.errorFields.push('phone'); $('#myForm>[name=phone]').addClass('error');} else {$('#myForm>[name=phone]').removeClass('error');}
		return result;
	}

	MyForm.getData = function () {
		result = {'fio':'', 'email':'', 'phone':0};
		result['fio']=$('#myForm>[name=fio]').val();
		result['email']=$('#myForm>[name=email]').val();
		result['phone']=$('#myForm>[name=phone]').val();
		return result;
	}

	MyForm.setData = function (data) {
		$('#myForm>[name=fio]').val(data['fio']);
		$('#myForm>[name=email]').val(data['email']);
		$('#myForm>[name=phone]').val(data['phone']);
	}

	MyForm.submit = function () {
		if (MyForm.validate().isValid) {
			request();
		}
	}
});