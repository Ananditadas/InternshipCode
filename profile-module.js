var accessibility =1;
   function initApp() 
   {
      
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user) 
			{
				// User is signed in.
				$('#user-img').attr("src","../assets/images/user1.png");
				USER = user;
				uid = user.uid;
				emailVerified = user.emailVerified;
				var name;  
				if(emailVerified || !emailVerified)
				{
					accessibility = 0;
					firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) 
					{
						name = snapshot.val().first_name;
						user_type = snapshot.val().type;
						if(user_type=='P' && emailVerified == true)
							$('#email-verified').hide();
						if(user_type=='D' && emailVerified == true)
							$('#doc-email-verified').hide();
                        if(user_type=='P')
                            {
                                p_name = snapshot.val().first_name+" "+snapshot.val().last_name;
				                p_email = snapshot.val().email;
				                p_mobile = snapshot.val().mobile_number;
				
				                p_add1 = snapshot.val().address_1;
				                p_add2 = snapshot.val().address_2;
				                p_add3 = snapshot.val().address_3;
				                p_loc =  snapshot.val().location;
				                p_pincode = snapshot.val().pincode;
                            }
                        else
                            {
                                p_name = snapshot.val().first_name+" "+snapshot.val().last_name;
                                p_email = snapshot.val().email;
				                p_mobile = snapshot.val().mobile_number;
                                p_address = snapshot.val().address;
                                p_pincode = snapshot.val().pincode;
                                p_location = snapshot.val().locations;
                                p_about = snapshot.val().about_me;
                                p_prof = snapshot.val().profession;
                                p_spec = snapshot.val().specializations;
                                p_gen = snapshot.val().gender;
                                p_dp = snapshot.val().profile_picture;
                                p_award = snapshot.val().awards;
                                p_member = snapshot.val().memberships;
                                p_reg = snapshot.val().registrations;
                                p_deg = snapshot.val().degrees;
                                p_inst = snapshot.val().institutions;
                                p_med = snapshot.val().medical_institutions;
                                p_pos = snapshot.val().positions;
                                p_year = snapshot.val().years;
                                p_exp = snapshot.val().experience;
                                p_loc = snapshot.val().locations;
                                p_av = snapshot.val().availibility;
                                p_ser = snapshot.val().services;
                                p_rate = snapshot.val().rates;
                                p_tag = snapshot.val().tags;
                                p_score = snapshot.val().user_score;
                                p_total = snapshot.val().user_total;
                                p_app = snapshot.val().appointments;
                                p_chat = snapshot.val().chat_appointments; 
                            }
						
					}).then(function()
					{					  
					  name = name.trim();
					  var output= "<a id='header-user-profile'><h2> Hello "+name+"!</h2></a>";
					  displayContent();
					  displayNotificationImage(uid);
					  
					 //}).then(function(){
                        var x=getLocations();
                        console.log(x);
                        $("#location-new").html(x);
                    });
					}
					else
					{
						accessibility = 2;
					$('#user-img').attr("src","../assets/images/user1.png");
			
						//errorModal("You have not verified your email. Please verify your email to access this section.");
					}
				//$('#login').hide();
			}
			else
			{
				accessibility = 1;
				//$('#login').show();
				$('#user-img').attr("src","../assets/images/user.png");

				//errorModal("You are not logged in. Please log in to access this section.");
				//$('#login').show();
			}
			
		});
		
		document.getElementById('login-sign-in').addEventListener('click', handleSignIn, false);
		document.getElementById('user-log-out').addEventListener('click', handleSignOut, false);
		document.getElementById('login-password-reset').addEventListener('click', sendPasswordReset, false);
		//$('#loading-icon').hide();
	}

	function displayContent()
	{
    
		var count=0;
		if(user_type=='P')
		{
			$("#DoctorDashboard").hide();
			$("#PatientDashboard").show();
			/*firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) 
			{
				p_name = snapshot.val().first_name+" "+snapshot.val().last_name;
				p_email = snapshot.val().email;
				p_mobile = snapshot.val().mobile_number;
				
				p_add1 = snapshot.val().address_1;
				p_add2 = snapshot.val().address_2;
				p_add3 = snapshot.val().address_3;
				p_loc =  snapshot.val().location;
				p_pincode = snapshot.val().pincode;
				
				if(p_add1 == undefined)
                { 
                    $('#address-display-row').hide();
                    $('#address-form-row').show();
                }
                else
                {    
                    $('#address-line-1').attr('value', p_add1);
                    $('#address-line-2').attr('value', p_add2);
                    $('#address-line-3').attr('value', p_add3);
                    $('#pincode').attr('value', p_pincode);
                    $("#profile-address").html(p_add1+"<br/>"+p_add2+"<br/>"+p_add3+"<br/>Pincode: "+p_pincode);
                }
				
			}).then(function()
			{	*/				  
                if(p_add1 == undefined)
                { 
                    $('#address-display-row').hide();
                    $('#address-form-row').show();
                }
                else
                {    
                    $('#address-line-1').attr('value', p_add1);
                    $('#address-line-2').attr('value', p_add2);
                    $('#address-line-3').attr('value', p_add3);
                    $('#pincode').attr('value', p_pincode);
                    $("#profile-address").html(p_add1+"<br/>"+p_add2+"<br/>"+p_add3+"<br/>Pincode: "+p_pincode);
                }
                
				$("#profile-name").html(p_name);
				$("#profile-email").html(p_email);
				$("#profile-mobile").html(p_mobile);
				$("#mobile-new").val(p_mobile);
				count=3;
				$("#profile-address").html(p_add1+"<br/>"+p_add2+"<br/>"+p_add3+"<br/>Pincode: "+p_pincode);
				count++;				
				$("#profile-location").html(p_loc);
				
			// });
			
		}
		else if(user_type=='D')
		{
			$("#DoctorDashboard").show();
			$("#PatientDashboard").hide();
			/*firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) 
			{
				p_name = snapshot.val().first_name+" "+snapshot.val().last_name;
				p_email = snapshot.val().email;
				p_mobile = snapshot.val().mobile_number;
				p_address = snapshot.val().address;
				p_pincode = snapshot.val().pincode;
				p_location = snapshot.val().locations;
				p_about = snapshot.val().about_me;
				p_prof = snapshot.val().profession;
				p_spec = snapshot.val().specializations;
				p_gen = snapshot.val().gender;
				p_dp = snapshot.val().profile_picture;
				p_award = snapshot.val().awards;
				p_member = snapshot.val().memberships;
				p_reg = snapshot.val().registrations;
				p_deg = snapshot.val().degrees;
				p_inst = snapshot.val().institutions;
				p_med = snapshot.val().medical_institutions;
				p_pos = snapshot.val().positions;
				p_year = snapshot.val().years;
				p_exp = snapshot.val().experience;
				p_loc = snapshot.val().locations;
				p_av = snapshot.val().availibility;
				p_ser = snapshot.val().services;
				p_rate = snapshot.val().rates;
				p_tag = snapshot.val().tags;
				p_score = snapshot.val().user_score;
				p_total = snapshot.val().user_total;
				p_app = snapshot.val().appointments;
				p_chat = snapshot.val().chat_appointments;
				//getAppointments();
				//getChats();
				
				
				
				
			}).then(function()
			{	*/				  
				$("#doc-name").html(p_name);
				$("#doc-email").html(p_email);
				if(p_score != 0)
					$("#doc-score").html(p_score);
				else
					$("#doc-score").html("N/A");
					
				if(p_total != 0)
					$("#doc-total").html(p_total);
				else
					$("#doc-total").html("0");
				$("#doc-mobile").html(p_mobile);
				$("#doc-mobile-new").val(p_mobile);
				count=3;
				if(p_address== null)
				{
					$("#doc-address").html("N/A");
				}
				else
				{
					$("#doc-address").html(p_address+"<br/>"+p_pincode);
					
					$('#doc-address-line-1').attr('value', p_address);
					$('#doc-pincode').attr('value', p_pincode);
					count++;
				}
				if(p_location == null)
				{
					$("#doc-location").html("N/A");
				}
				else
				{
					var output="";
					count++;
					if(p_location[0]<0)
					{
						output += p_location[0]+" S<br/>";
					}
					else
					{
						output += p_location[0]+" N<br/>";
					}
					if(p_location[1]<0)
					{
						output += p_location[1]+" W";
					}
					else
					{
						output += p_location[1]+" E";
					}		
					$("#doc-location").html(output);
				}
				
				if(p_spec== null)
				{
					$("#doc-spec").html("N/A");
				}
				else
				{
					var x="";
					for(var i in p_spec)
					{
						if(i==(p_spec.length)-1)
							x += p_spec[i];
						else
							x += p_spec[i]+", ";
					}
					
					$("#doc-spec").html(x);
					
					$('#doc-spec-new').attr('value', p_spec);
				
					count++;
				}
				
				
				
				if(p_about== null)
				{
					$("#doc-about").html("N/A");
					
				}
				else
				{
					$("#doc-about").html(p_about);
					count++;
					$('#doc-about-new').attr('value', p_about);
				}
				
				
				$("#doc-gender").html(p_gen);
				
				if(p_exp== null)
				{
					$("#doc-exp").html("N/A");
				}
				else
				{
					$("#doc-exp").html(p_exp+" Year(s)");
					count++;
					$('#doc-exp-new').attr('value', p_exp);
				}
				
				var x;
				if(p_prof == 'nurse')
					x = "Nurse";
				else if(p_prof == 'physio')
					x = "Physiotherapist";
				else if(p_prof == 'mental')
					x = "Psychriatrist";
				else if(p_prof == 'vet')
					x = "Veterinary Physician";
				else if(p_prof == 'diet')
					x = "Dietitian";
				else if(p_prof == 'yoga')
					x = "Yoga Instructor";
				else if(p_prof == 'dental')
					x = "Dentist";
				else if(p_prof == 'spa')
					x = "Beauty Therapist";
				else if(p_prof == 'sex')
					x = "Sexiologist";
				else if(p_prof == 'deaddict')
					x = "Addiction Counsellor";
				$("#doc-profession").html(x);
				
				$("#doc-dp").html("<img src='"+p_dp+"' height='150vw' width='150vw' id='doc-dp-image'>");
				
				
				var x="";
				if(p_deg.length>0)
				{
					x +="<table width='100%' id='doc-edu' align='left'>";			
					x += "<tr><th>Degree</th><th>Institution</th></tr>";
					for(var i in p_deg)
					{
						x += "<tr><td>"+p_deg[i]+"</td><td>"+p_inst[i]+"</td></tr>";
					}
					$('#d1').attr('value', p_deg[0]);
					$('#d2').attr('value', p_deg[1]);
					$('#d3').attr('value', p_deg[2]);
					$('#d4').attr('value', p_deg[3]);
					$('#d5').attr('value', p_deg[4]);
					$('#i1').attr('value', p_inst[0]);
					$('#i2').attr('value', p_inst[1]);
					$('#i3').attr('value', p_inst[2]);
					$('#i4').attr('value', p_inst[3]);
					$('#i5').attr('value', p_inst[4]);
					count++;
				}
				else
				{
					x = "N/A";
				}
				$('#doc-edu').html(x);
				
				
				var x="";
				if(p_award != null)
				{
					count++;
					for(var i in p_award)
					{
						if(i==(p_award.length)-1)
							x += p_award[i];
						else
							x += p_award[i]+"<br/>";
					}
					$('#doc-award-new').attr('value', p_award);
					
				}
				else
				{
					x = "N/A";
				}
				$('#doc-award').html(x);
				
				
				
				var x="";
				if(p_reg != null)
				{
					count++;
					for(var i in p_reg)
					{
						if(i==(p_reg.length)-1)
							x += p_reg[i];
						else
							x += p_reg[i]+"<br/>";
					}
					$('#doc-reg-new').attr('value', p_reg);
				}
				else
				{
					x = "N/A";
				}
				$('#doc-reg').html(x);
				
				
				var x="";
				if(p_member != null)
				{
					for(var i in p_member)
					{
						if(i==(p_member.length)-1)
							x += p_member[i];
						else
							x += p_member[i]+"<br/>";
					}
					count++;
					$('#doc-member-new').attr('value', p_member);
				}
				else
				{
					x = "N/A";
				}
				$('#doc-member').html(x);
				
				
				var x="";
				if(p_med.length>0)
				{
					x +="<table width='100%' align='left'>";			
					x += "<tr><th>Medical Institution</th><th>Position</th><th>Years</th></tr>";
					for(var i in p_med)
					{
						x += "<tr><td>"+p_med[i]+"</td><td>"+p_pos[i]+"</td><td>"+p_year[i]+"</td></tr>";
					}
					x += "</table>";
					count++;
					$('#m1').attr('value', p_med[0]);
					$('#m2').attr('value', p_med[1]);
					$('#m3').attr('value', p_med[2]);
					$('#m4').attr('value', p_med[3]);
					$('#m5').attr('value', p_med[4]);
					$('#p1').attr('value', p_pos[0]);
					$('#p2').attr('value', p_pos[1]);
					$('#p3').attr('value', p_pos[2]);
					$('#p4').attr('value', p_pos[3]);
					$('#p5').attr('value', p_pos[4]);
					$('#y1').attr('value', p_year[0]);
					$('#y2').attr('value', p_year[1]);
					$('#y3').attr('value', p_year[2]);
					$('#y4').attr('value', p_year[3]);
					$('#y5').attr('value', p_year[4]);
				}
				else
				{
					x= "N/A";
				}
				$('#doc-work').html(x);
				
				
				
				var x="";
				x +="<table width='100%' align='left'>";			
				x += "<tr><th>Service</th><th>Rate</th></tr>";
				for(var i in p_ser)
				{
					x += "<tr><td>"+p_ser[i]+"</td><td>"+p_rate[i]+"</td></tr>";
				}
				$('#s1').attr('value', p_ser[0]);
				$('#s2').attr('value', p_ser[1]);
				$('#s3').attr('value', p_ser[2]);
				$('#s4').attr('value', p_ser[3]);
				$('#s5').attr('value', p_ser[4]);
				$('#s6').attr('value', p_ser[5]);
				$('#s7').attr('value', p_ser[6]);
				$('#s8').attr('value', p_ser[7]);
				$('#s9').attr('value', p_ser[8]);
				$('#s10').attr('value', p_ser[9]);
				$('#r1').attr('value', p_rate[0]);
				$('#r2').attr('value', p_rate[1]);
				$('#r3').attr('value', p_rate[2]);
				$('#r4').attr('value', p_rate[3]);
				$('#r5').attr('value', p_rate[4]);
				$('#r6').attr('value', p_rate[5]);
				$('#r7').attr('value', p_rate[6]);
				$('#r8').attr('value', p_rate[7]);
				$('#r9').attr('value', p_rate[8]);
				$('#r10').attr('value', p_rate[9]);
				
				$('#doc-rates').html(x+"</table>");
				if(p_ser.length>0)
					count++;
				
				 
				/*var elem = document.getElementById("docBar");
				var width = 10;
				var max_width = (count/15)*100;
				var id = setInterval(frame, 10);
				function frame()
				{
					if (width >= max_width)
					{
						clearInterval(id);
					}
					else
					{
						width++;
						elem.style.width = width + '%';
						document.getElementById("doclabel").innerHTML = width * 1  + '%';
					}
				}*/
			 //});
		}
        $('#loading-icon').hide();
        
	}
	function displayTab1()
	{
		$('#myprofiletab').show(); $('#myappointmentstab').hide(); $('#mymedicalhistorytab').hide();
		$("#tab1").css("background-color","#0fb180");
		$("#tab2").css("background-color","white");
		$("#tab3").css("background-color","white");
		$("#tab1").addClass("makeWhite");
		$("#tab1").removeClass("makeGreen");
		$("#tab2").addClass("makeGreen");
		$("#tab2").removeClass("makeWhite");
		$("#tab3").addClass("makeGreen");
		$("#tab3").removeClass("makeWhite");
	}
	
	function displayTab4()
	{
		$('#docprofiletab').show(); $('#docappointmentstab').hide(); $('#docscheduletab').hide();
		$("#tab4").css("background-color","#0fb180");
		$("#tab5").css("background-color","white");
		$("#tab6").css("background-color","white");
		$("#tab4").addClass("makeWhite");
		$("#tab4").removeClass("makeGreen");
		$("#tab5").addClass("makeGreen");
		$("#tab5").removeClass("makeWhite");
		$("#tab6").addClass("makeGreen");
		$("#tab6").removeClass("makeWhite");
	}
    
	$("#mobile-modify").click(function(event){
		event.preventDefault();
		$("#mobile-form-row").show();	
			$("#mobile-display-row").hide();
	});
	$("#address-modify").click(function(event){
		event.preventDefault();
		$("#address-form-row").show();	
			$("#address-display-row").hide();
	});
	$("#location-modify").click(function(event){
		event.preventDefault();
		$("#location-form-row").show();	
			$("#location-display-row").hide();
	});
	
	$("#location-update").click(function(event){
		event.preventDefault();
		var x = $("#location-new").val();
		var updates = {};
		updates['/users/' +uid+'/location'] = x;
		$("#profile-location").html(x);
		////createModal("Profile Updated!");
		$("#location-form-row").hide();
		$("#location-display-row").show();
		return firebase.database().ref().update(updates);					
	});
	
	$("#mobile-update").click(function(event){
		event.preventDefault();
		var x = $("#mobile-new").val();
		var re = /^\d{10}$/;
		if (re.test(x) == false)
		{
			createModal("Not a valid mobile number. Enter a 10 digit mobile number.");
		}
		else
		{
			var updates = {};
			updates['/users/' +uid+'/mobile_number'] = x;
			$("#profile-mobile").html(x);
			////createModal("Profile Updated!");
			$("#mobile-form-row").hide();
			$("#mobile-display-row").show();
			return firebase.database().ref().update(updates);
		}
					
	});
	$("#address-update").click(function(event){
		event.preventDefault();
		
		var x1 = $("#address-line-1").val();
		x1 = x1.trim();
		x1 = toTitleCase(x1);
		var x2 = $("#address-line-2").val();
		x2 = x2.trim();
		x2 = toTitleCase(x2);
		var x3 = $("#address-line-3").val();
		x3 = x3.trim();
		x3 = toTitleCase(x3);
		var pin = $("#pincode").val();
		pin = pin.trim();
		var re = /^\d{6}$/;
		if (x1.length<5 || x2.length<3 || x3.length<3)
		{
			createModal("Not a valid address. Enter the address in the given format.");
		}
		else if (re.test(pin) == false)
		{
			createModal("Not a valid pincode.");
		}
		else
		{
			var updates = {};
			updates['/users/' +uid+'/address_1'] = x1;
			updates['/users/' +uid+'/address_2'] = x2;
			updates['/users/' +uid+'/address_3'] = x3;
			updates['/users/' +uid+'/pincode'] = pin;
			$("#profile-address").html(x1+"<br/>"+x2+"<br/>"+x3+"<br/>Pincode: "+pin);
			//createModal("Profile Updated!");
			$("#address-form-row").hide();
			$("#address-display-row").show();
			return firebase.database().ref().update(updates);
		}
					
	});
	
	
	$("#doc-mobile-modify").click(function(event){
		event.preventDefault();
		$("#doc-mobile-form-row").show();	
			$("#doc-mobile-display-row").hide();
	});
	$("#doc-address-modify").click(function(event){
		event.preventDefault();
		$("#doc-address-form-row").show();	
			$("#doc-address-display-row").hide();
	});
	
	$("#doc-mobile-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-mobile-new").val();
		
		var re = /^\d{10}$/;
		if (re.test(x) == false)
		{
			createModal("Not a valid mobile number. Enter a 10 digit mobile number.");
		}
		else
		{
			var updates = {};
			updates['/users/' +uid+'/mobile_number'] = x;
			updates['/professions/'+p_prof+'/' +uid+'/mobile_number'] = x;
			for(var i in p_location)
			{
				updates['/locations/'+p_location[i]+'/' +uid+'/mobile_number'] = x;
			}
			$("#doc-mobile").html(x);
			//createModal("Profile Updated!");
			$("#doc-mobile-form-row").hide();
			$("#doc-mobile-display-row").show();
			return firebase.database().ref().update(updates);
		}
					
	});
	$("#doc-address-update").click(function(event){
		event.preventDefault();
		
		var x1 = $("#doc-address-line-1").val();
		x1 = x1.trim();
		x1 = toTitleCase(x1);
		/*var x2 = $("#doc-address-line-2").val();
		x2 = x2.trim();
		x2 = toTitleCase(x2);
		var x3 = $("#doc-address-line-3").val();
		x3 = x3.trim();
		x3 = toTitleCase(x3);*/
		var pin = $("#doc-pincode").val();
		pin = pin.trim();
		var re = /^\d{6}$/;
		if (x1.length<5)
		{
			createModal("Not a valid address. Enter the address in the given format.");
		}
		else if (re.test(pin) == false)
		{
			createModal("Not a valid pincode.");
		}
		else
		{
			var updates = {};
			updates['/users/' +uid+'/address'] = x1;
			updates['/users/' +uid+'/pincode'] = pin;
			updates['/professions/'+p_prof+'/' +uid+'/address'] = x1;
			updates['/professions/'+p_prof+'/' +uid+'/pincode'] = pin;
			for(var i in p_location)
			{
				updates['/locations/'+p_location[i]+'/' +uid+'/address'] = x1;
				updates['/locations/'+p_location[i]+'/' +uid+'/pincode'] = pin;
			}
			$("#doc-address").html(x1+"<br/>"+pin);
			//createModal("Profile Updated!");
			$("#doc-address-form-row").hide();
			return firebase.database().ref().update(updates);
		}
					
	});
	
	$("#doc-about-modify").click(function(event){
		event.preventDefault();
		$("#doc-about-form-row").show();
			$("#doc-about-display-row").hide();	
	});
	
	$("#doc-about-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-about-new").val();
		var updates = {};
		updates['/users/' +uid+'/about_me'] = x;
		updates['/professions/'+p_prof+'/' +uid+'/about_me'] = x;
		for(var i in p_location)
			{
				updates['/locations/'+p_location[i]+'/' +uid+'/about_me'] = x;
			}
		$("#doc-about").html(x);
		//createModal("Profile Updated!");
		$("#doc-about-form-row").hide();
		$("#doc-about-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	$("#doc-spec-modify").click(function(event){
		event.preventDefault();
		$("#doc-spec-form-row").show();	
			$("#doc-spec-display-row").hide();	
	});
	$("#doc-spec-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-spec-new").val();
		var y = x.split(",");
		for(var i in y)
		{
			y[i] = y[i].trim();
			y[i] = toTitleCase(y[i]);
		}
		var updates = {};
		updates['/users/' +uid+'/specializations'] = y;
		updates['/professions/'+p_prof+'/' +uid+'/specializations'] = y;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/specializations'] = y;
		}
		var x="";
		for(var i in y)
		{
			if(i==(y.length)-1)
				x += y[i];
			else
				x += y[i]+", ";
		}
		$("#doc-spec").html(x);
		//createModal("Profile Updated!");
		$("#doc-spec-form-row").hide();
			$("#doc-spec-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	
	$("#doc-dp-modify").click(function(event){
		event.preventDefault();
		$("#doc-dp-modify").hide();
		$("#doc-dp-form-row").show();			
	});
	var downloadURL;
	
	$("#doc-dp-form-row").change(function(event){
		event.preventDefault();
		$("#doc-dp-upload").show();			
	});
	
	
	$("#doc-dp-upload").click(function(event){
		event.preventDefault();
				if( document.getElementById("doc-dp-new").files.length > 0 )
				{
					var fileUploadControl = $('#doc-dp-new')[0];
					var file = fileUploadControl.files[0];
					var filename = file.name;
					var storageRef = firebase.storage().ref();
					var uploadTask = storageRef.child('profile_picture/'+uid +".jpg").put(file);
					uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
					  function(snapshot) {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Profile Pic Upload is ' + progress + '% done');
						switch (snapshot.state) {
						  case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						  case firebase.storage.TaskState.RUNNING: // or 'running'
							break;
						}
					  }, function(error) {
					  switch (error.code) {
						case 'storage/unauthorized':
						  // User doesn't have permission to access the object
						  break;

						case 'storage/canceled':
						  // User canceled the upload
						  break;
						case 'storage/unknown':
						  // Unknown error occurred, inspect error.serverResponse
						  break;
					  }
					}, function() {
					  // Upload completed successfully, now we can get the download URL
						downloadURL = uploadTask.snapshot.downloadURL;
						
						$('#doc-dp-form-row').hide();
						$("#doc-dp-update").show();
						$("#doc-dp-upload").hide();
					});		
				}
					
	});
	
	$("#doc-dp-update").click(function(event){
		event.preventDefault();
		var updates = {};
		updates['/users/' +uid+'/profile_picture'] = downloadURL;
		updates['/professions/'+p_prof+'/' +uid+'/profile_picture'] = downloadURL;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/profile_picture'] = downloadURL;
		}
		$("#doc-dp").html("<img src='"+downloadURL+"' height='180px' width='160px' id='doc-dp-image'>");
		//createModal("Profile Updated!");
		$("#doc-dp-form-row").hide();
		$("#doc-dp-update").hide();
		$("#doc-dp-modify").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	$("#doc-edu-modify").click(function(event){
		event.preventDefault();
		$("#doc-edu-form-row").show();	
			$("#doc-edu-display-row").hide();
	});
	
	$("#doc-edu-update").click(function(event){
		event.preventDefault();
		
		var d1 = $('#d1').val();
		var d2 = $('#d2').val();
		var d3 = $('#d3').val();
		var d4 = $('#d4').val();
		var d5 = $('#d5').val();
		var i1 = $('#i1').val();
		var i2 = $('#i2').val();
		var i3 = $('#i3').val();
		var i4 = $('#i4').val();
		var i5 = $('#i5').val();
		var degree = new Array();
		var institution = new Array();
		
		if (d2=="" || i2 =="")
		{
			degree[0] = d1;
			institution[0]= i1;
		}
		else if(d3==""|| i3=="")
		{
			degree[0] =d1;
			institution[0]=i1;
			degree[1] =d2;
			institution[1]=i2;
		}
		else if(d4==""|| i4=="")
		{
			degree[0] =d1;
			institution[0]=i1;
			degree[1] =d2;
			institution[1]=i2;
			degree[2] =d3;
			institution[2]=i3;
		}
		else if(d5==""|| i5=="")
		{
			degree[0] =d1;
			institution[0]=i1;
			degree[1] =d2;
			institution[1]=i2;
			degree[2] =d3;
			institution[2]=i3;
			degree[3] =d4;
			institution[3]=i4;
		}
		else
		{
			degree[0] =d1;
			institution[0]=i1;
			degree[1] =d2;
			institution[1]=i2;
			degree[2] =d3;
			institution[2]=i3;
			degree[3] =d4;
			institution[3]=i4;
			degree[4] =d5;
			institution[4]=i5;
		}
		
		
		
		
		var updates = {};
		updates['/users/' +uid+'/degrees'] = degree;
		updates['/users/' +uid+'/institutions'] = institution;
		updates['/professions/'+p_prof+'/' +uid+'/degrees'] = degree;
		updates['/professions/'+p_prof+'/' +uid+'/institutions'] = institution;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/degress'] = degree;
			updates['/locations/'+p_location[i]+'/' +uid+'/institutions'] = institution;
		}
		
		var x="";
		if(degree.length>0)
		{
			x +="<table width='100%' align='left'>";			
			x += "<tr><th>Degree</th><th>Institution</th></tr>";
			for(var i in p_deg)
			{
				x += "<tr><td>"+degree[i]+"</td><td>"+institution[i]+"</td></tr>";
			}
			x += "</table>"
		}
		else
		{
			x = "N/A";
		}
		$('#doc-edu').html(x);
		
		//createModal("Profile Updated!");
		$("#doc-edu-form-row").hide();
		$("#doc-edu-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	
	$("#doc-reg-modify").click(function(event){
		event.preventDefault();
		$("#doc-reg-form-row").show();	
			$("#doc-reg-display-row").hide();
	});
	$("#doc-reg-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-reg-new").val();
		var y = x.split(",");
		for(var i in y)
		{
			y[i] = y[i].trim();
		}
		var updates = {};
		updates['/users/' +uid+'/registrations'] = y;
		updates['/professions/'+p_prof+'/' +uid+'/registrations'] = y;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/registrations'] = y;
		}
		var x="";
		for(var i in y)
		{
			if(i==(y.length)-1)
				x += y[i];
			else
				x += y[i]+"<br/>";
		}
		$("#doc-reg").html(x);
		//createModal("Profile Updated!");
		$("#doc-reg-form-row").hide();
		$("#doc-reg-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	
	$("#doc-member-modify").click(function(event){
		event.preventDefault();
		$("#doc-member-form-row").show();	
			$("#doc-member-display-row").hide();
	});
	$("#doc-member-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-member-new").val();
		var y = x.split(",");
		for(var i in y)
		{
			y[i] = y[i].trim();
		}
		var updates = {};
		updates['/users/' +uid+'/memberships'] = y;
		updates['/professions/'+p_prof+'/' +uid+'/memberships'] = y;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/memberships'] = y;
		}
		var x="";
		for(var i in y)
		{
			if(i==(y.length)-1)
				x += y[i];
			else
				x += y[i]+"<br/>";
		}
		$("#doc-member").html(x);
		//createModal("Profile Updated!");
		$("#doc-member-form-row").hide();
		$("#doc-member-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	
	
	$("#doc-award-modify").click(function(event){
		event.preventDefault();
		$("#doc-award-form-row").show();
			$("#doc-award-display-row").hide();	
	});
	
	
	$("#doc-award-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-award-new").val();
		var y = x.split(",");
		for(var i in y)
		{
			y[i] = y[i].trim();
		}
		var updates = {};
		updates['/users/' +uid+'/awards'] = y;
		updates['/professions/'+p_prof+'/' +uid+'/awards'] = y;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/awards'] = y;
		}
		var x="";
		for(var i in y)
		{
			if(i==(y.length)-1)
				x += y[i];
			else
				x += y[i]+"<br/>";
		}
		$("#doc-award").html(x);
		//createModal("Profile Updated!");
		$("#doc-award-form-row").hide();
		$("#doc-award-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	
	$("#doc-work-modify").click(function(event){
		event.preventDefault();
		$("#doc-work-form-row").show();	
			$("#doc-work-display-row").hide();	
	});
	
	$("#doc-work-update").click(function(event){
		event.preventDefault();
		
		var m1 = $('#m1').val();
		var m2 = $('#m2').val();
		var m3 = $('#m3').val();
		var m4 = $('#m4').val();
		var m5 = $('#m5').val();
		var p1 = $('#p1').val();
		var p2 = $('#p2').val();
		var p3 = $('#p3').val();
		var p4 = $('#p4').val();
		var p5 = $('#p5').val();
		var y1 = $('#y1').val();
		var y2 = $('#y2').val();
		var y3 = $('#y3').val();
		var y4 = $('#y4').val();
		var y5 = $('#y5').val();
		
		var medical_institution = new Array();
		var position = new Array();
		var year = new Array();
		
		if (m2=="" || p2 =="")
		{
			medical_institution[0] = m1;
			position[0]= p1;
			year[0]=y1;
		}
		else if(m3==""|| p3=="")
		{
			medical_institution[0] =m1;
			position[0]=p1;
			medical_institution[1] =m2;
			position[1]=p2;
			year[0]=y1;
			year[1]=y2;
		}
		else if(m4==""|| p4=="")
		{
			medical_institution[0] =m1;
			position[0]=p1;
			medical_institution[1] =m2;
			position[1]=p2;
			medical_institution[2] =m3;
			position[2]=p3;
			year[0]=y1;
			year[1]=y2;
			year[2]=y3;
		}
		else if(m5==""|| p5=="")
		{
			medical_institution[0] =m1;
			position[0]=p1;
			medical_institution[1] =m2;
			position[1]=p2;
			medical_institution[2] =m3;
			position[2]=p3;
			medical_institution[3] =m4;
			position[3]=p4;
			year[0]=y1;
			year[1]=y2;
			year[2]=y3;
			year[3]=y4;
		}
		else
		{
			medical_institution[0] =m1;
			position[0]=p1;
			medical_institution[1] =m2;
			position[1]=p2;
			medical_institution[2] =m3;
			position[2]=p3;
			medical_institution[3] =m4;
			position[3]=p4;
			medical_institution[4] =m5;
			position[4]=p5;
			year[0]=y1;
			year[1]=y2;
			year[2]=y3;
			year[3]=y4;
			year[4]=y5;
		}
		
		
		var updates = {};
		updates['/users/' +uid+'/years'] = year;
		updates['/professions/'+p_prof+'/' +uid+'/years'] = year;
		updates['/users/' +uid+'/positions'] = position;
		updates['/professions/'+p_prof+'/' +uid+'/positions'] = position;
		updates['/users/' +uid+'/medical_institutions'] = medical_institution;
		updates['/professions/'+p_prof+'/' +uid+'/medical_institutions'] = medical_institution;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/years'] = year;
			updates['/locations/'+p_location[i]+'/' +uid+'/positions'] = position;
			updates['/locations/'+p_location[i]+'/' +uid+'/medical_institutions'] = medical_institution;
		}
		var x="";
		if(medical_institution.length>0)
		{
			x +="<table width='100%' align='left'>";			
			x += "<tr><th>Medical Institution</th><th>Position</th><th>Years</th></tr>";
			for(var i in medical_institution)
			{
				x += "<tr><td>"+medical_institution[i]+"</td><td>"+position[i]+"</td><td>"+year[i]+"</td></tr>";
			}
			x += "</table>"
		}
		else
		{
			x= "N/A";
		}
		$('#doc-work').html(x);
		
		//createModal("Profile Updated!");
		$("#doc-work-form-row").hide();
		$("#doc-work-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	
	
	$("#doc-exp-modify").click(function(event){
		event.preventDefault();
		$("#doc-exp-form-row").show();	
			$("#doc-exp-display-row").hide();
	});
	
	$("#doc-exp-update").click(function(event){
		event.preventDefault();
		var x = $("#doc-exp-new").val();
		var updates = {};
		updates['/users/' +uid+'/experience'] = x;
		updates['/professions/'+p_prof+'/' +uid+'/experience'] = x;
		for(var i in p_location)
		{
			updates['/locations/'+p_location[i]+'/' +uid+'/experience'] = x;
		}
		$("#doc-exp").html(x+" year(s)");
		//createModal("Profile Updated!");
		$("#doc-exp-form-row").hide();
		$("#doc-exp-display-row").show();
		return firebase.database().ref().update(updates);
					
	});
	