$(window).bind('load', function () {

	$('#myForm').bind('submit', function () {
		MyForm.submit();
		return false;
	});

	$(window).bind('resize', function () {
		if ($('#resultContainer').css('height').replace('px','')>200) {$('#resultContainer').css('top', window.innerHeight*0.66+20+'px');}
		else {$('#resultContainer').css('top', '400px');}
	});

	$(window).trigger('resize');

	var MyForm = {};

	MyForm.validate = function () {
		var result = {isValid:true, errorFields:[]};
		var fio=$('#myForm>[name=fio]').val().match(/^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/g);
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
		//alert(result.isValid + '   ' + result.errorFields[0] + '   ' + result.errorFields[1] + '   ' + result.errorFields[2]);
		return result;
	}

	MyForm.getData = function () {
		result = {'fio':'', 'email':'', 'phone':0};
		result['fio']=$('#myForm>[name=fio]').val();
		result['email']=$('#myForm>[name=email]').val();
		result['phone']=$('#myForm>[name=phone]').val();
		//alert(result['fio'] + '   ' + result['email'] + '   ' + result['phone']);
		return result;
	}

	MyForm.setData = function (data) {
		$('#myForm>[name=fio]').val(data['fio']);
		$('#myForm>[name=email]').val(data['email']);
		$('#myForm>[name=phone]').val(data['phone']);
	}

	MyForm.submit = function () {
		if (MyForm.validate().isValid) {
			$.ajax({
	  			url: "success.json",
	  			dataType: "jsonp",
	  			jsonpCallback: "getstatus",
	  			success: function(data){
	    			alert(data.message);
	  			}
			});
		}
	}
});