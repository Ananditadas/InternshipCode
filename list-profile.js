 var accessibility = 1;
   function initApp_profile() 
   {
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user) 
			{
				// User is signed in.
                $('#user-img').attr("src","../assets/images/user1.png");
				uid = user.uid;
				emailVerified = user.emailVerified;
				if(emailVerified || !emailVerified)
				{
					accessibility = 0;
					var name;  
					firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) 
					{
						patient = snapshot.val();
						name = snapshot.val().first_name;
						patient_name = snapshot.val().first_name +" "+snapshot.val().last_name;
						patient_mobile = snapshot.val().mobile_number;
						patient_email = snapshot.val().email;
                         pat_noti=snapshot.val().new_notification;
					}).then(function()
					{					  
						  //document.getElementById('login').hidden = true;
					  name = name.trim();
					  displayNotificationImage(uid);
					  //var output= "<a id='header-user-profile'><h2> Hello "+name+"!</h2></a>";
					  //$("#header-user-name").html(output);
					  //document.getElementById('header-user-name').hidden = false;
					  
					 });
				}
				else
				{
					accessibility = 2;
                    $('#user-img').attr("src","../assets/images/user1.png");
				}
				//$('#login').hide();
			}
			else
			{
				accessibility = 1;
				//$('#login').show();
                $('#user-img').attr("src","../assets/images/user.png");
                console.log('listspaNOTloggedin');
			}
		});
		
		document.getElementById('login-sign-in').addEventListener('click', handleSignIn, false);
		document.getElementById('user-log-out').addEventListener('click', handleSignOut, false);
		document.getElementById('login-password-reset').addEventListener('click', sendPasswordReset, false);
		//$('#loading-icon').hide();
	}
	
	function createModal(txt)
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
	}	
	
	function getAvail()
	{
        //?id=7DoEqNXKWpMRJv2V0OUa1F9EUsl1
		docAvail = doctor.availibility;
			//console.log("getAvail");
			var avIds = new Array();
			for(var i in docAvail)
			{
				for(var j in docAvail[i][3])
				{
					if(selected_location == docAvail[i][3][j])
					{
						avIds.push(i);
					}
				}
			}
			cdays=[];//REINITIALIZE ARRAY CONTAINING DAYS TO HIGHLIGHT
			var x="The doctor is available at "+selected_location+" on:<br/>";
            //var x="<table align=center class='locations-table' border='0'><tr><td align='center' width='100%'>The doctor is available on:</td></tr><tr><td align='center' width='100%'>";
			for(var i in avIds)
			{
				
				for(var j in docAvail[avIds[i]][0])
				{
					x+= docAvail[avIds[i]][0][j];
                    cdays.push(docAvail[avIds[i]][0][j]);
					if(j <= docAvail[avIds[i]][0].length-3)
						x+=", ";
					if(j == docAvail[avIds[i]][0].length-2)
						x+=' & ';
				}
                //x="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+x+"<br/>"
				x +=" from <br/>"+formatAMPM(docAvail[avIds[i]][1])+" to "+formatAMPM(docAvail[avIds[i]][2])+" <br/>";
			}
            $("#doc-availibility").html(x);
    
		}
    
    function formatAMPM(hours)
    {
        /*var hours = date.getHours();
        var minutes = date.getMinutes();*/
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        //minutes = ('0'+minutes).slice(-2);
        var strTime = hours + ':00 ' + ampm;
        return strTime;
    }
    
	function getDoctorInfo(id)
	{
		return firebase.database().ref('users/'+id+'/').once('value').then(function(snapshot) {
			doctor = snapshot.val();			
		}).then(function(){
           
			var title="";
			if(doctor.title==1)
				title ="Dr. ";
			$('#doc-name').html("<div class='name'>"+title+doctor.first_name+" "+doctor.last_name+"</div>");
			$('#doc-dp').html("<img src='"+doctor.profile_picture+"' >");
			
			if(doctor.user_total==0)
			{
				var rating = "N/A";
				$('#doc-rating').hide();
			}
			else
				var rating = doctor.user_score/doctor.user_total;
				
			$('#doc-rating').html(rating);
			$('#doc-rating').css('background-image', 'url("../assets/images/green-star.png")');
			
			var x;
			if(doctor.profession == 'nurse')
				x = "Nurse";
			else if(doctor.profession == 'physio')
				x = "Physiotherapist";
			else if(doctor.profession == 'mental')
				x = "Mental Wellness";
			else if(doctor.profession == 'vet')
				x = "Veterinary Physician";
			else if(doctor.profession == 'diet')
				x = "Dietitian";
			else if(doctor.profession == 'yoga')
				x = "Yoga Instructor";
			else if(doctor.profession == 'dental')
				x = "Dentist";
			else if(doctor.profession == 'spa')
				x = "Beauty Therapist";
			else if(doctor.profession == 'sex')
				x = "Sexiologist";
			else if(doctor.profession == 'deaddict')
				x = "Addiction Counsellor";
			else if(doctor.profession == 'speech')
				x = "Speech Therapist";
			else if(doctor.profession == 'general')
				x = "General Physician";
			else if(doctor.profession == 'accu')
				x = "Accupressure Therapist";
			
			$('#doc-prof').html(x);
			if(doctor.experience != null)
			$('#doc-exp').html(doctor.experience+" years experience");
			
			var about_txt=doctor.about_me.trim();
			if(about_txt.length != 0)
			{
			var about="<br/><div class='service-entry'>";
			about += about_txt;
			$('#doc-about-cell').html(about+"</div>");
			
			}
			else
			{
			
			$('#doc-about-cell-print').hide();
			}
			
			if(doctor.specializations[0].length>0)
			{
				var spec="<div class='sub-headers'>Specializations:</div><div class='service-entry'>";
				for(var i in doctor.specializations)
				{
					spec += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.specializations[i]+"";
				}
				$('#doc-spec').html(spec+"</div>");
			}
			
			if(doctor.awards[0].length>0)
			{
				var award="<br/><div class='sub-headers'>Awards:</div><div class='service-entry'>";
				for(var i in doctor.awards)
				{
					award += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.awards[i]+"";
				}
				$('#doc-award').html(award+"</div>");
			}
			
			if(doctor.memberships[0].length>0)
			{
				var mem="<br/><div class='sub-headers'>Memberships:</div><div class='service-entry'>";
				for(var i in doctor.memberships)
				{
					mem += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.memberships[i]+"";
				}
				$('#doc-membership').html(mem+"</div>");
			}
			
			if(doctor.registrations[0].length>0)
			{
				var reg="<br/><div class='sub-headers'>Registrations:</div><div class='service-entry'>";
				for(var i in doctor.registrations)
				{
					reg += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.registrations[i]+"";
				}
				$('#doc-registration').html(reg+"</div>");
			}	
				
			
			
			var x="";
			for(var i in doctor.degrees)
			{
				x += doctor.degrees[i];
				if(i < doctor.degrees.length-1)
					x+=", ";
			}
			$('#doc-degree').html(x);
			
			
			
			if(doctor.medical_institutions[0].length>0)
			{
				var x="<br/><table width='100%'><tr><td class='sub-headers' colspan='4'>Work Experience:</td>";
				for(var i in doctor.medical_institutions)
				{
					x += "<tr><td class='service-entry'><img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.positions[i]+" at "+doctor.medical_institutions[i]+" for "+doctor.years[i]+" years</td></tr>";
				}
				$('#doc-work-cell').html(x+"</table><br/>");
			}
			
			if(doctor.degrees[0].length>0)
			{
				var x="<br/><table width='100%'><tr><td class='sub-headers' colspan='4'>Education:</td>";
				for(var i in doctor.degrees)
				{
					x += "<tr><td class='service-entry'><img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.degrees[i]+" - "+doctor.institutions[i]+"</td></tr>";
				}
				$('#doc-edu-cell').html(x+"</table><br/>");
			}
			
			var x="<br/><table width='100%' border='0'><tr><td class='sub-headers' colspan='2'>Services Offered:</td>";
			x+="<tr><td width='50%'></td><td width='50%'></td>";
			for(var i in doctor.services)
			{
				if(i%2==0)
				{
					x+="</tr><tr>"
				}
				x += "<td width='50%' class='service-entry'><img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.services[i]+" (Rs. "+doctor.rates[i]+"/-)</td>";
			}
			$('#doc-services-cell').html(x+"</table><br/>");
			
			if(doctor.appointment_type!=2 && doctor.appointment_type!=3 &&doctor.appointment_type!=6)
			{
				 var x="<table><tr><td width='100%'><table width=100% ><tr><td width='100%' align='left'>Select location:</td></tr> ";
				 x+="<tr></tr>"
                 x+="<tr><td width='100%' id='doc-loc-cell' align='left'>";
                 x+="<select id='loc'>";
                    
                 for(var i in doctor.locations)
				{
				    x+="<option value ='"+doctor.locations[i]+"'>"+doctor.locations[i]+"</option>";
				}
				 x+="</select>";
					 //x+="</td><td class='service-entry'>";
                 selected_location=doctor.locations[0];
                 getAvail();
            }
            $('#doc-availibility-cell').html(x+"</td></tr></table>");	
					 
			for(var j in doctor.services_types)
			{
				if(doctor.services_types[j]==2)
				{
					var chat_rate = doctor.rates[j];
				}
			}
			
			if(doctor.appointment_type==2 || doctor.appointment_type==3 || doctor.appointment_type==6)
			{
				var x = "<table><tr><td width='100%' id='book-online-button' align='center'><a onclick='onlineModal()'><img src='../assets/images/chat.png' height='30vw' class='book-button' width='90vw'></a></td></tr></table>";
				$('#doc-book-button').html(x);			
			}
			else if(doctor.appointment_type==1)
			{
				var x = "<table><tr><td width='100%' id='book-visit-button'  align='center'><a onclick='createVisitApp()'><img src='../assets/images/book.png' class='book-button' height='30vw' width='90vw'></a></td></tr></table>";
				$('#doc-book-button').html(x);			
			}
			else
			{
				var x = "<table><tr><td width='50%' id='book-visit-button'  align='center'><a onclick='createVisitApp()'><img src='../assets/images/book.png' class='book-button' height='30vw' width='90vw'></a></td>";
				x+="<td width='50%' id='book-online-button'  align='center'><a onclick='onlineModal()'><img src='../assets/images/chat.png' class='book-button' height='30vw' width='90vw'></a></td></tr></table>";
				$('#doc-book-button').html(x);			
			}
			$('#loading-icon').hide();
		});
		//$('#loading-icon').hide();
	}
	function getDoctorInfo_spa(id)
	{
		return firebase.database().ref('users/'+id+'/').once('value').then(function(snapshot) {
			doctor = snapshot.val();
		}).then(function(){
			var title="";
			if(doctor.title==1)
				title ="Dr. ";
			$('#doc-name').html("<div class='name'>"+title+doctor.first_name+" "+doctor.last_name+"</div>");
			$('#doc-dp').html("<img src='"+doctor.profile_picture+"'>");
			
			if(doctor.user_total==0)
			{
				var rating = "N/A";
				$('#doc-rating').hide();
			}
			else
				var rating = doctor.user_score/doctor.user_total;
				
			$('#doc-rating').html(rating);
			$('#doc-rating').css('background-image', 'url("../assets/images/green-star.png")');
			
			var x;
			if(doctor.profession == 'nurse')
				x = "Nurse";
			else if(doctor.profession == 'physio')
				x = "Physiotherapist";
			else if(doctor.profession == 'mental')
				x = "Mental Wellness";
			else if(doctor.profession == 'vet')
				x = "Veterinary Physician";
			else if(doctor.profession == 'diet')
				x = "Dietitian";
			else if(doctor.profession == 'yoga')
				x = "Yoga Instructor";
			else if(doctor.profession == 'dental')
				x = "Dentist";
			else if(doctor.profession == 'spa')
				x = "Beauty Therapist";
			else if(doctor.profession == 'sex')
				x = "Sexiologist";
			else if(doctor.profession == 'deaddict')
				x = "Addiction Counsellor";
			else if(doctor.profession == 'speech')
				x = "Speech Therapist";
			else if(doctor.profession == 'general')
				x = "General Physician";
			else if(doctor.profession == 'accu')
				x = "Accupressure Therapist";
			
			$('#doc-prof').html(x);
			if(doctor.experience != null)
			$('#doc-exp').html(doctor.experience+" year(s) experience");
			
			var about_txt=doctor.about_me.trim();
			if(about_txt.length != 0)
			{
			var about="<br/><div class='service-entry'>";
			about += about_txt;
			$('#doc-about-cell').html(about+"</div>");
			$('#doc-about-cell-print').show();
			}
			else
			{
			
			$('#doc-about-cell-print').hide();
			}
			
			if(doctor.specializations[0].length>0)
			{
				var spec="<div class='sub-headers'>Specializations:</div><div class='service-entry'>";
				for(var i in doctor.specializations)
				{
					spec += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.specializations[i]+"";
				}
				$('#doc-spec').html(spec+"</div>");
			}
			
			if(doctor.awards[0].length>0)
			{
				var award="<br/><div class='sub-headers'>Awards:</div><div class='service-entry'>";
				for(var i in doctor.awards)
				{
					award += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.awards[i]+"";
				}
				$('#doc-award').html(award+"</div>");
			}
			
			if(doctor.memberships[0].length>0)
			{
				var mem="<br/><div class='sub-headers'>Memberships:</div><div class='service-entry'>";
				for(var i in doctor.memberships)
				{
					mem += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.memberships[i]+"";
				}
				$('#doc-membership').html(mem+"</div>");
			}
			
			if(doctor.registrations[0].length>0)
			{
				var reg="<br/><div class='sub-headers'>Registrations:</div><div class='service-entry'>";
				for(var i in doctor.registrations)
				{
					reg += "<img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.registrations[i]+"";
				}
				$('#doc-registration').html(reg+"</div>");
			}	
				
			
			
			var x="";
			for(var i in doctor.degrees)
			{
				x += doctor.degrees[i];
				if(i < doctor.degrees.length-1)
					x+=", ";
			}
			$('#doc-degree').html(x);
			
			
			
			if(doctor.medical_institutions[0].length>0)
			{
				var x="<br/><table width='100%'><tr><td class='sub-headers' colspan='4'>Work Experience:</td>";
				for(var i in doctor.medical_institutions)
				{
					x += "<tr><td class='service-entry'><img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.positions[i]+" at "+doctor.medical_institutions[i]+" for "+doctor.years[i]+" year(s)</td></tr>";
				}
				$('#doc-work-cell').html(x+"</table><br/>");
			}
			
			if(doctor.degrees[0].length>0)
			{
				var x="<table width='100%'><tr><td class='sub-headers' colspan='4'>Education:</td>";
				for(var i in doctor.degrees)
				{
					x += "<tr><td class='service-entry'><img src='../assets/images/green-circle-check-mark.jpg' height='12vw' width='12vw'/>&nbsp;"+doctor.degrees[i]+" - "+doctor.institutions[i]+"</td></tr>";
				}
				$('#doc-edu-cell').html(x+"</table>");
			}
			
			if(doctor.appointment_type!=2 && doctor.appointment_type!=3 &&doctor.appointment_type!=6)
			{
				//var x="<br/><table width='100%' border='1'><tr><td class='sub-headers ' colspan='4'>Availibility (Location, Day & Time):</td></tr>";
				 var x="<table width=100% ><tr><td width='100%' align='left'>Select location:</td></tr> ";
				x+="<tr></tr>"
                    x+="<tr><td width='100%' id='doc-loc-cell' align='left'>";
                    x+="<select id='loc'>";
                    
                    		for(var i in doctor.locations)
					{
					x+="<option value ='"+doctor.locations[i]+"'>"+doctor.locations[i]+"</option>";
					}
					 x+="</select>";
					 //x+="</td><td class='service-entry'>";
                     selected_location=doctor.locations[0];
                     getAvail();
					 }
					 $('#doc-availibility-cell').html(x+"</td></tr></table>");	
			$('#doc-profile-table-3').show();
            for(var j in doctor.services_types)
			{
				if(doctor.services_types[j]==2)
				{
					var chat_rate = doctor.rates[j];
				}
			}

            var x = "<table id='icon-table'><tr><td width='100%' align='center' colspan='5' id='view-rates-text'>Click to view rates</td></tr><tr>";
            if (jQuery.inArray("3",doctor.services_types)!=-1)
                    x += "<td align='center'width='20%'><a class='spa-icons' onclick='generateServiceDivMobile_profile(3)'><img src='../assets/images/hair.png' ></a></td>";
            if (jQuery.inArray("1",doctor.services_types)!=-1)
                    x += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile_profile(1)'><img src='../assets/images/body.png' ></a></td>";
            if (jQuery.inArray("2",doctor.services_types)!=-1)
                    x += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile_profile(2)'><img src='../assets/images/wax.png' ></a></td>";
            if (jQuery.inArray("4",doctor.services_types)!=-1)
                    x += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile_profile(4)'><img src='../assets/images/face.png' ></a></td>";
            if (jQuery.inArray("5",doctor.services_types)!=-1)
                    x += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile_profile(5)'><img src='../assets/images/bridal.png' s></a></td>";
            x +="</tr></table>";
            $('#doc-book-button').html(x);
            
			$('#loading-icon').hide();
		});
		//$('#loading-icon').hide();
	}
	function payChatSession()
	{
		paymentModal();
		
	}
	
	function createChatSession(x)
	{
		//console.log(x,doctor);
		var d = new Date();
		var n = d.getTime();
		var sesRef = firebase.database().ref('text-chat-sessions/');
		sesID = sesRef.push({ 
            'doc_noti': false,
            'pat_noti': false,
			'doctor_id': doctor.user,
			'doctor_name': doctor.first_name+" "+doctor.last_name,
			'doctor_contact': doctor.mobile_number,
			'doctor_email': doctor.email,
            'doctor_image' : doctor.profile_picture,
			'patient_id': uid,
			'patient_name': patient_name,
			'patient_contact': patient_mobile,
			'patient_email': patient_email,
			'status': "REQUESTED",
			'rate': x,
			'timestamp': n
		});
						
			sesID = sesID.key;
						
			var updates = {};
			var docApp = doctor.chat_appointments;
			if (docApp == null)
				docApp = [];
        
			var patApp = patient.chat_appointments;
			if (patApp==null)
				patApp = [];
				
			docApp.push(sesID);
			patApp.push(sesID);
			
            pat_noti=setchat(pat_noti);
            doc_noti=setchat(doc_noti);
        
			updates['/users/' +doctor.user+'/chat_appointments'] = docApp;
			updates['/users/' +doctor.user+'/new_notification'] = doc_noti;
			updates['/users/' +uid+'/chat_appointments'] = patApp;
			updates['/users/' +uid+'/new_notification'] = pat_noti;
			updates['/text-chat-sessions/'+sesID+'/id'] = sesID;
			if(doctor.locations != null)
			{
				for(var i=0; i<doctor.locations.length; i++)
				{
					updates['/locations/'+doctor.locations[i]+'/'+doctor.user+'/chat_appointments'] = docApp;
				}
			}
			updates['/professions/'+ doctor.profession+'/' +doctor.user+'/chat_appointments'] = docApp;
			firebase.database().ref().update(updates).then(function(){
				
				/*var doc_msg = "You have received an online consultancy request from "+patient_name+". Please check your dashboard to accept. Visit your dashboard to accept the request: https://tx.gl/r/1Kpy/#AdvdTrack#";*/
				var pat_msg = "Your appointment for online consultancy with "+doctor.first_name+" "+doctor.last_name+" has been sent. Click on the link to pay online to begin your session: https://tx.gl/r/2dVi/#AdvdTrack# Call 7605837667 for assistance.";
				
				//doc_msg = encodeURI(doc_msg);
				pat_msg = encodeURI(pat_msg);
				/*$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': doctor.mobile_number,
						'sender': 'CAREST',
						'message': doc_msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
					 	
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
				});*/

				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': patient_mobile,
						'sender': 'CAREST',
						'message': pat_msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
                        console.log(data);
					 	console.log("success: "+jqXHR);
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
				});
		
			//successModal(sesID);
			
			}).then(function(){
                setTimeout(function(){window.location='my-appointments.html?=chat';},3000);
            });
        
			//window.location='my-appointments.html?=chat';	
	}
	
	function setchat(sent_notification)
    {
        //console.log("setchat",count++,sent_notification);
        var notifications=new Array();
        
        if(sent_notification==true || sent_notification==false || sent_notification==undefined)
        {    
            notifications[0]="false";
            notifications[1]="true"
        }
        else
        {    
            notifications=sent_notification.trim().split("%n");
        
            if(notifications[1]!="true")
                notifications[1]="true";
        }
        
        sent_notification=notifications[0]+"%n"+notifications[1];//update to db
        return sent_notification ;
    }
    
	function successModal(xyz)
	{
		$('#success-appID').html(xyz);
		var modal = document.getElementById('successModal');
		var span = document.getElementsByClassName("close")[3];
		
				
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			window.location ='dashboard.html';
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				window.location ='dashboard.html';
			}
		}
	}
	
	$('#doc-availibility-cell').change(function(){
		selected_location = $('#loc').val();
		console.log(selected_location);    
        getAvail();
		
	});
	function errorModal(txt)
	{
		var modal = document.getElementById('errorModal');
		var span = document.getElementsByClassName("close")[4];
		
		$('#error-modal-body').html(txt)
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				
			}
		}
	}	
	
	function onlineModal()
	{
		if (accessibility==0)
		{
			var modal = document.getElementById('onlineModal');
			var span = document.getElementsByClassName("close")[2];
			DID = doctor.user;
			doctor_name = doctor.first_name + " "+ doctor.last_name;
			firebase.database().ref('users/'+DID+'/new_notification').on('value', function(snapshot) 
		      {
                doc_noti = snapshot.val();
                console.log("doc",doc_noti);
            });
			doctor_email = doctor.email;
			doctor_mobile = doctor.mobile_number;		
			$('#text-chat-service').html("");
			//$('#text-chat-rate').html("");
			//$('#video-chat-service').html("");
			//$('#video-chat-rate').html("");
							
			for (var i in doctor.services)
			{
				if(doctor.services_types[i]==2)
				{
					$('#text-chat-service').html(doctor.services[i]);
					//$('#text-chat-rate').html(doctor.rates[i]);
					$('#text-chat-link').attr("onclick","createChatSession("+doctor.rates[i]+")");
					//window.PUM.setData(doctor.rates[i], doctor.user+uid,"Text Chat Service");
				}
				else if(doctor.services_types[i]==3)
				{
					//$('#video-chat-service').html(doctor.services[i]);
					//$('#video-chat-rate').html(doctor.rates[i]);
					
				}
			}
				
			modal.style.display = "block";
			span.onclick = function() {
				modal.style.display = "none";
			}
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
		}
		else if(accessibility == 1)
		{
			errorModal("<br><br><h4>You must login into your Careist account before booking an appointment.</h4><br><br><div><a id='error-login'>Click here to login </a><div/><br><br>");
            var btn2 = document.getElementById("error-login");
            var modal2 = document.getElementById('errorModal');
            var modal=document.getElementById('myModal');
            btn2.onclick = function() {
		      modal.style.display = "block";
              modal2.style.display = "none";
	        }
            
			//errorModal("You must login into your Careist account before booking an appointment.");
		}
		else if(accessibility == 2)
		{
			errorModal("You must verify your email address before booking an appointment.");
		}
	}
	
	function createVisitApp()
	{
        window.location ='book-appointment.html?d='+doctor.user+'&s=99';
	}
    
    function createVisitApp_spa()
	{
        window.location ='book-appointment-spa.html?d='+doctor.user+'&s=99';
	}
    