$(function() {
    // Regular Expressions
    const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const regPassword= {
        length: /(?=.{8,})/,
        lower: /(?=.*[a-z])/,
        upper: /(?=.*[A-Z])/,
        number: /(?=.*[0-9])/,
        special: /(?=.*[!@#$%^&*])/
    };

    // Message Error Input
    const errorMessage = {
        user: {
            required: 'ユーザーネームを入力してください'
        },
        email: {
            required: 'ユーザーネームを入力してください',
            invalid: 'メールアドレスを正しく入力してください'
        },
        password: {
            required: 'ユーザーネームを入力してください',
            invalid: 'パスワードの条件を満たしていません'
        },
        rePassword: {
            required: 'ユーザーネームを入力してください',
            invalid: 'パスワードが一致しません'
        }
    }
    
    // Validate form register
    const validator = $("#u-form-register").validate({
        onfocusout: false,
		onkeyup: function(elm){
            if(!$("#u-form-register").valid()){
                const submitBtn = $('#u-form-register [type="submit"]');
                if (submitBtn.hasClass("active")) {
                    submitBtn.removeClass("active");
                }
                submitBtn.prop("disabled", true);
            }
            else{
                const submitBtn = $('#u-form-register [type="submit"]');
                submitBtn.addClass('active');
                submitBtn.prop("disabled", false);
            }
        },
        onChange: function(elm){
            console.log(111);
        },
        rules: {
            "user":{
                required: true,
            },
            "email":{
                required: true,
				validateEmail: true
            },
            "password":{
                required: true,
                validatePassword: true,
				minlength: 8
            },
            "rePassword":{
                equalTo: "#password",
				minlength: 8
            }
        },
        messages: {
		    "user": {
				required: "ユーザーネームを入力してください",
            },
            "email":{
                required: "メールアドレスを正しく入力してください",
            },
			"password": {
				required: "パスワードの条件を満たしていません",
			},
			"re-password": {
				equalTo: "パスワードが一致しません",
			}
		}
    });
    $.validator.addMethod("validatePassword", function (value, element) {
        if(this.optional(element)) return this.optional(element);
        for(const key in regPassword ){
            if(!regPassword[key].test(value))
                return false;
        }
        return true;
    }, errorMessage.password.invalid);

    $.validator.addMethod("validateEmail", function (value, element) {
        return this.optional(element) || regEmail.test(value);
    }, errorMessage.email.invalid);

    

    // SHOW PASSWORD 
    $('.u-password').on('click', function(event){
        event.preventDefault();
        toggleShowPassword($('#password').get(0));
    });
    $('.u-re-password').on('click', function(event){
        event.preventDefault();
        toggleShowPassword($('#re-password').get(0));
    });

    // SUBMIT FORM
    $("#u-form-register").on("submit", function (event) { 
        // event.preventDefault(); 
    }); 

    function toggleShowPassword(elm){
        if(elm.type == "password"){
            elm.type="text";
        }
        else
            elm.type="password";
    }
});
// validateForm();