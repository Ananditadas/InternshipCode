
    var config = 
	{
		apiKey: "AIzaSyBXeK6IFvPS4TySnJbp5Ya1LUA7tlifGMY",
		authDomain: "careist-20c8a.firebaseapp.com",
		databaseURL: "https://careist-20c8a.firebaseio.com",
		storageBucket: "careist-20c8a.appspot.com",
	};

    var tries=3,otp_verified=true;
    function handleSignIn() 
    {
		console.log("handleSignIn");
		var email,password;
        email = document.getElementById('login-email').value;
        password = document.getElementById('login-password').value;
	
        if (email.length < 8) {
			$('#login-error-message').html('<br/>Please enter an email address.');
			return;
        }
        if (password.length < 8) {
			$('#login-error-message').html('<br/>Please enter a password.');
			return;
		}
		var checkError;     
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
        {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			checkError = true;
	
			if (errorCode === 'auth/wrong-password')
			{
				$('#login-error-message').html('<br/>Wrong password.');
			}
			else if (errorCode === "auth/user-not-found")
			{
				$('#login-error-message').html('<br/>Unregistered User. Please click on Register to Sign Up with your email address.');
			}
			else
			{
				$('#login-error-message').html(errorMessage);
			}
			console.log(error);
			  
		}).then(function()
		{
			if(!checkError)
			{
				var modal = document.getElementById('myModal');
				modal.style.display = "none";
			}
		});
        if(document.location.pathname.match(/[^\/]+$/)[0]=="book-appointment-spa.html")
        {
            nextpage1();
        }
        if(document.location.pathname.match(/[^\/]+$/)[0]=="book-appointment.html")
        {
            nextpage();
        }
        
        $('#content-body').show();
    }
      
    function handleSignOut() 
    {
		if (firebase.auth().currentUser)
		{
			firebase.auth().signOut().then(function()
			{
				if($('#profile-menu').is(":visible"))
				{
					$('#profile-menu').hide();
				}
				//createModal("Log Out Succesful!");
				//setTimeout(function(){ window.location = 'index.html' }, 1000);
                window.location = 'index.html';
                $('myModal').hide();
			});
        }
        console.log('signed out');
	}
	
    function handleSignUp() 
    {
		console.log("handleSignUp");
        $("#loading-icon-reg").show();
        $("#registertab").hide();
		var d = new Date();
		var time = d.getTime();
        var name=$('#register-fname').val().trim().split(/\s+/g);
        var fname="",lname="";
        for(i=0;i<name.length-1;i++)
            fname+=name[i]+" ";
        
        fname=fname.trim();
        lname=name[name.length-1];
		var email = document.getElementById('register-email').value;
		var password = document.getElementById('register-password').value;
		$('#login-email').val(email);
        $('#login-password').val(password);
		if($('#register-location').val() == 'OTHER THAN THOSE SPECIFIED')
		{
			
			var location ="Not Listed";
			var other_location = document.getElementById('register-other-location').value;
			if(other_location.length<4)
			{
				createModal('Please enter a valid location.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
		}
		else
		{
			var location = document.getElementById('register-location').value;
			var other_location ="N/A";
		}
		var mobile= document.getElementById('register-mobile').value;
		if(!document.getElementById('terms-conditions').checked)
		{
			createModal("You must agree to the term and conditions of the website to be an user of the website.");
                $("#loading-icon-reg").hide();
                $("#registertab").show();
			return;
		}
		else
		{
			if (email.length < 10) 
			{
				createModal('Please enter an email address.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
			if (password.length < 8) 
			{
				createModal('Please enter a password. Minimum length 8 characters.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
			if (fname.length < 3 || !(/^[A-Za-z\s]+$/.test(fname))) 
			{
				createModal('Please enter a valid name.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
			if (lname.length < 3 || !(/^[A-Za-z\s]+$/.test(lname))) 
			{
				createModal('Please enter a valid name.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
			
			/*if(add1.length<5 || add2.length<4 || add3.length<4)
			{
				createModal('Please enter a valid address.');
				return;
			}*/
			otpCheck();
			if(otp_verified ==false)
			{
				createModal('Please verify your mobile number before proceeding.');
                $("#loading-icon-reg").hide();
                $("#registertab").show();
				return;
			}
			fname = toTitleCase(fname);
			lname = toTitleCase(lname);
			validateEmail(email);
			
			//validatePincode(pin);
			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user)
			{
				var userId = user.uid;
				
				firebase.database().ref('users/' + userId).set({
				first_name: fname,
				last_name: lname,
				email: email,
				mobile_number: mobile,
				type: 'P',
				location: location,
				other_location: other_location
				//address_1: add1,
				//address_2: add2,
				//address_3: add3,
				//pincode: pin
			  });
                
                firebase.database().ref('admin/signups/' + userId).set({
                id:userId,
				first_name: fname,
				last_name: lname,
				email: email,
				mobile_number: mobile,
				type: 'P',
				location: location,
				other_location: other_location,
                timestamp:time
				//address_1: add1,
				//address_2: add2,
				//address_3: add3,
				//pincode: pin
			  });
					  
			

			}).catch(function(error) 
			{
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// [START_EXCLUDE]
				if (errorCode == 'auth/weak-password') 
				{
					createModal('The password is too weak.');
                    $("#loading-icon-reg").hide();
                    $("#registertab").show();
                    
				}
				else
				{
					createModal(errorMessage);
                    $("#loading-icon-reg").hide();
                    $("#registertab").show();
				}
				console.log(error);
				
				// [END_EXCLUDE]
			}).then (function()
			{
				firebase.auth().currentUser.sendEmailVerification().then(function()
				{
					//successModal();
					//setTimeout(function(){ history.go(-1); }, 3000);	
						//handleSignIn();
                    $('#myModal').hide();
				});
                //history.go(-1);
			});
            
		}
        
        if(document.location.pathname.match(/[^\/]+$/)[0]=="book-appointment-spa.html")
        {
            nextpage1();
        }
        if(document.location.pathname.match(/[^\/]+$/)[0]=="book-appointment.html")
        {
            nextpage();
        }
        
	}
	
	function sendPasswordReset() 
	{
		var email = document.getElementById('login-email').value;
		firebase.auth().sendPasswordResetEmail(email).then(function() 
		{
			createModal('Password Reset Email Sent!');
        }).catch(function(error) 
        {
			
			var errorCode = error.code;
			var errorMessage = error.message;
			
			if (errorCode == 'auth/invalid-email') 
			{
				createModal(errorMessage);
			}
			else if (errorCode == 'auth/user-not-found') 
			{
				createModal(errorMessage);
			}
			console.log(error);
		});
	}
   $('#google-sign-in').click(function (){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        //console.log(provider);
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(user);
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
        });
    });
    function openTab(evt, tabName)
	{
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++)
		{
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) 
		{
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.getElementById(tabName).style.display = "block";
		evt.currentTarget.className += " active";
	}
	
	function toTitleCase(str)
	{
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	
	function validateEmail(email) 
	{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var domain_list = [
  /* Default domains included */
  "aol.com", "att.net", "comcast.net", "facebook.com", "gmail.com", "gmx.com", "googlemail.com",
  "google.com", "hotmail.com", "hotmail.co.uk", "mac.com", "me.com", "mail.com", "msn.com",
  "live.com", "sbcglobal.net", "verizon.net", "yahoo.com", "yahoo.co.uk",

  /* Other global domains */
  "email.com", "fastmail.fm", "games.com" /* AOL */, "gmx.net", "hush.com", "hushmail.com", "icloud.com",
  "iname.com", "inbox.com", "lavabit.com", "love.com" /* AOL */, "outlook.com", "pobox.com", "protonmail.com",
  "rocketmail.com" /* Yahoo */, "safe-mail.net", "wow.com" /* AOL */, "ygm.com" /* AOL */,
  "ymail.com" /* Yahoo */, "zoho.com", "yandex.com",

  /* United States ISP domains */
  "bellsouth.net", "charter.net", "cox.net", "earthlink.net", "juno.com",

  /* British ISP domains */
  "btinternet.com", "virginmedia.com", "blueyonder.co.uk", "freeserve.co.uk", "live.co.uk",
  "ntlworld.com", "o2.co.uk", "orange.net", "sky.com", "talktalk.co.uk", "tiscali.co.uk",
  "virgin.net", "wanadoo.co.uk", "bt.com",

  /* Domains used in Asia */
  "sina.com", "qq.com", "naver.com", "hanmail.net", "daum.net", "nate.com", "yahoo.co.jp", "yahoo.co.kr", "yahoo.co.id", "yahoo.co.in", "yahoo.com.sg", "yahoo.com.ph",

  /* French ISP domains */
  "hotmail.fr", "live.fr", "laposte.net", "yahoo.fr", "wanadoo.fr", "orange.fr", "gmx.fr", "sfr.fr", "neuf.fr", "free.fr",

  /* German ISP domains */
  "gmx.de", "hotmail.de", "live.de", "online.de", "t-online.de" /* T-Mobile */, "web.de", "yahoo.de",

  /* Italian ISP domains */
  "libero.it", "virgilio.it", "hotmail.it", "aol.it", "tiscali.it", "alice.it", "live.it", "yahoo.it", "email.it", "tin.it", "poste.it", "teletu.it",

  /* Russian ISP domains */
  "mail.ru", "rambler.ru", "yandex.ru", "ya.ru", "list.ru",

  /* Belgian ISP domains */
  "hotmail.be", "live.be", "skynet.be", "voo.be", "tvcablenet.be", "telenet.be",

  /* Argentinian ISP domains */
  "hotmail.com.ar", "live.com.ar", "yahoo.com.ar", "fibertel.com.ar", "speedy.com.ar", "arnet.com.ar",

  /* Domains used in Mexico */
  "yahoo.com.mx", "live.com.mx", "hotmail.es", "hotmail.com.mx", "prodigy.net.mx",

  /* Domains used in Brazil */
  "yahoo.com.br", "hotmail.com.br", "outlook.com.br", "uol.com.br", "bol.com.br", "terra.com.br", "ig.com.br", "itelefonica.com.br", "r7.com", "zipmail.com.br", "globo.com", "globomail.com", "oi.com.br"
];
		if (re.test(email)==false || jQuery.inArray(email.split('@')[1],domain_list)==-1)
		{
			$('register-error-message').html("Not a valid e-mail address");
			return false;
        }
	}
	function validatePincode(pin)
	{
		var re = /^\d{6}$/;
		if (re.test(pin) == false)
		{
			$('register-error-message').html("Not a valid pincode");
			return false;
		}
	}
	function validateMobile(mobile)
	{
		var re = /^\d{10}$/;
		if (re.test(mobile) == false)
		{
			$('register-error-message').html("Not a valid mobile number. Enter a 10 digit mobile number.");
			return false;
		}
		return true;
        
	}
	
	
	/*function createModal(txt)
	{
		var modal = document.getElementById('newModal');
		var span = document.getElementsByClassName("close")[1];
		
		$('#new-modal-body').html("<br><br><h4>"+txt+"</h4><br><br>")
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
	}*/
	
	function getLocations()
	{
		return firebase.database().ref('locations').once('value').then(function(snapshot) {
			location_objects = snapshot.val();
			locations = Object.keys(location_objects);
			var output = "";
			for (var i in locations)
			{
				output += "<option value='"+locations[i]+"'>"+locations[i]+"</option>"
			}
			
		});
	}	
	
	$(document).on('click','#otp-button',function (){
        
		var mobile = document.getElementById('register-mobile').value;
        $("input[name=register-mobile]").each(function(i,number) {
            mobile= $(number).val();
        });
		console.log(mobile,validateMobile(mobile));
		if (!validateMobile(mobile)) 
		{
			createModal('Please enter a valid mobile number.');
			return;
		}
		else
		{			
			$("#otp-entry-row").show();
			
			var x = '012345678901234567890123456789';
			var parts = x.split('');
			for (var i = parts.length; i > 0;) 
			{
				var random = parseInt(Math.random() * i);
				var temp = parts[--i];
				parts[i] = parts[random];
				parts[random] = temp;
			}
			var x = parts.join('');
			otp = x.substr(1,6);
			$.ajax({
				url: "https://api.textlocal.in/send/",
				type: "POST",
				data: 
				{
					'username': "careist7@gmail.com",
					'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
					'numbers': mobile,
					'sender': 'CAREST',
					'message': "Your one time password (OTP) to verify your mobile number on Careist is "+otp,
					'test':'0'
				},
				contentType: "application/json; charset=utf-8",
				dataType:"jsonp",
				success: function(data, status, jqXHR){
					// success code
					
					$('#otp-button').hide();
					$('#register-mobile').attr('readonly','readonly');
				},
				error: function(jqXHR, status){
					// Error code
					console.log("error: "+jqXHR);
					createModal("OTP was not sent. Please retry.");
				}
			});
			
		}
	});
	
	function successModal()
	{
		var modal = document.getElementById('successModal');
		var span = document.getElementsByClassName("close")[2];
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			//window.location ='index.html';
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				//window.location ='index.html';
			}
		}
	}
	
	function shuffle(string) 
	{
		var parts = string.split('');
		for (var i = parts.length; i > 0;) 
		{
			var random = parseInt(Math.random() * i);
			var temp = parts[--i];
			parts[i] = parts[random];
			parts[random] = temp;
		}
		return parts.join('');
	}

	$('#otp-submit').click(function (){
		if($('#register-otp').val()==otp)
		{
			otp_verified = true;
			$('#otp-verified').show();
			$('#otp-button-cell').hide();
			$("#otp-entry-row").hide();
			$('#register-submit').removeAttr('inactive');
		}
		else
		{
			tries--;
			if(tries>0)
			{
				createModal("You have entered an incorrect OTP. Please try again. "+tries+" tries left.");
			}
			else
			{
				createModal("You have entered an incorrect OTP. Please try again. "+tries+" tries left. Please retry.");
				setTimeout(function(){ window.location = 'register.html' }, 3000);
				
			}
		}
	});
	
	function otpCheck(){
		if($('#register-otp').val()==otp)
		{
			otp_verified = true;
			$('#otp-verified').show();
			$('#otp-button-cell').hide();
			$("#otp-entry-row").hide();
			$('#register-submit').removeAttr('inactive');
		}
		else
		{
			tries--;
			if(tries>0)
			{
				createModal("You have entered an incorrect OTP. Please try again. "+tries+" tries left.");
			}
			else
			{
				createModal("You have entered an incorrect OTP. Please try again. "+tries+" tries left. Please retry.");
				//setTimeout(function(){ window.location = 'register.html' }, 3000);
				
			}
		}
	}
	/*document.getElementById('offers-link').onClick=function(){
		createModal("Coming Soon!");
	}*/
	function displayNotificationImage(x)
	{
        firebase.database().ref('users/'+x+'/new_notification').on('value', function(snapshot) 
		{
			var flag = snapshot.val();
			
            if(flag==true || flag==false)
            {
			     if(flag == true)
			     {        
				    $('#notification-image').show();
			     }
			     else
                 {
				    $('#notification-image').hide();
			     }
            }
            else
            {    
            var flag2=flag.trim().split("%n");
            
            if(flag2[0]=="true" || flag2[1]=="true")
                $('#notification-image').show();
            }
		});
	}
	
	$('#register-location').change(function(){
		
		if($('#register-location').val() == 'OTHER THAN THOSE SPECIFIED')
		{
			
			$('#other-location-row').show();
			createModal("If you do not select a specified location you will not be able to book a Visit Appointment, though you still be able to book Online Appointments.");
		}
		else
		{
			$('#other-location-row').hide();
			
		}
	});
	$('#header-user-name').click(function(event)
	{	
		event.preventDefault();
		
		$('#profile-button').toggle();
		
	});
	
	
	
	function register(){
   console.log("In function register");
   $("#sign-up_td").css('color','#0fb180');
   $("#sign-up_td").css('border-bottom','3px solid #0fb180');
   $("#login_td").css('color','inherit');
   $("#login_td").css('border-bottom','none');
   $("#login_table").hide();
   $("#registertab").show();
   }
   
   function login(){
   console.log("In function login");
   $("#login_td").css('color','#0fb180');
   $("#login_td").css('border-bottom','3px solid #0fb180');
   $("#sign-up_td").css('color','inherit');
   $("#sign-up_td").css('border-bottom','none');
   $("#registertab").hide();
   $("#login_table").show();
   }
 	
function sendEmailVerificationMail()
	{
		USER.sendEmailVerification().then(function(){
			createModal("Email Verification Sent");
		});
	}