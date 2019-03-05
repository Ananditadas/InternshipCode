    function succesfulRazorPayPayment(payment_id, amount, sessionID)
	{
		//console.log(payment_id);
		//console.log(sessionID);
		var doc_num, doc_name, pat_num, pat_name, num1,p_id;
		firebase.database().ref('text-chat-sessions/'+sessionID).once('value').then(function(snapshot) {
			pat_name = snapshot.val().patient_name;
			doc_num = snapshot.val().doctor_contact;
            doc_name = snapshot.val().doctor_name;
			pat_num = snapshot.val().patient_contact;
            p_id = snapshot.val().patient_id;
		});
		var updates = {};
		var action = 'Start';
		updates['text-chat-sessions/'+sessionID+'/status/'] = "STARTED";
		
		firebase.database().ref().update(updates).then(function(){
            
                var doc_msg = 'We have received payment for online consultancy from '+pat_name+'. Click on the link to begin your session: https://tx.gl/r/2dVi/#AdvdTrack# Call 7605837667 for assistance.';
				/*var msg = 'We have received payment for online consultancy from '+name+'. Please check your dashboard to proceed with the online consultancy. https://tx.gl/r/1Esl/#AdvdTrack#';*/
                var pat_msg = 'Thank you! We have received the payment for online consultancy. Click on the link to begin your session: https://tx.gl/r/2dVi/#AdvdTrack# Call 7605837667 for assistance.';
				pat_msg = encodeURI(pat_msg);
                doc_msg = encodeURI(doc_msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': doc_num,
						'sender': 'CAREST',
						'message': doc_msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
				});
            
                $.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': pat_num,
						'sender': 'CAREST',
						'message': pat_msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
				});
            //location.reload(true);
            loadAppointments(p_id);
		});
	}
    function displayNotificationImage(x)
	{
		firebase.database().ref('users/'+x+'/new_notification').on('value', function(snapshot) 
		{
			var flag = snapshot.val();
			
			if(flag == true)
			{
				$('#notification-image').show();
			}
			else if(flag == false)
			{
				$('#notification-image').hide();
			}
            else
            {    
            var flag2=flag.trim().split("%n");
            
            if(flag2[0]=="true" || flag2[1]=="true")
                $('#notification-image').show();
            }
		});
	}
    
    function loadAppointments(UID)
    {
        if(window.location.href.indexOf('mobile')==-1)
            loadAppointments_desk(UID);
        else
            loadAppointments_mob(UID);
    }
	function loadAppointments_mob(UID)
	{
		firebase.database().ref('/users/' + UID).once('value').then(function(snapshot) 
		{
			var output = "";
			p_chat = snapshot.val().chat_appointments;
            var u_type=snapshot.val().type;
            
            if(p_chat==undefined || p_chat.length == 0)
			{
                if(u_type=="D")
				$('#no-appointments-doc').show();
                else if(u_type=="P")
				$('#no-appointments-pat').show();
                
				$('#appointments-loading').hide();
            }
            else
            {    
            p_chat.reverse();
			var chat_flag=false;
			for(var i in p_chat)
			{
                var id_chat=p_chat[i];//p_total[i][0];
                
				firebase.database().ref('/text-chat-sessions/' + id_chat).once('value').then(function(snapshot) 
				{
                    var y=snapshot.val();
                    //console.log(y);
                    if(y != null)
                    {    
					chatObjects.push(snapshot.val());
					var x = "";
					//var y = snapshot.val();
					var z = new Date(y.timestamp);
					user_type = y.doctor_id == uid ? "D" : "P";	
					if(user_type=="P")
					{
						//Patient Chat
                        //console.log('here');
						if(y.doctor_title==1)
							var title = "Dr."
						else
							var title = "";
						var f = " "+y.id+" ";
                        //console.log(y);
						if(y.status=='PAID'|| y.status=='FINISHED' || y.status=='STARTED')
						{
                            chat_flag=true;
						x += "<tr><td align='center' id='"+y.id+"' class='chat-list-td'><br/>";
						x +="<table  id='chat-entry-table' width='100%' align='center' border='0'>";
                        if(y.doctor_image)
                            x +="<tr><td rowspan='3'><img class='doc-dp' src="+y.doctor_image+"></td>";    
                        else
                            x +="<tr><td rowspan='3'><img class='doc-dp' src='../assets/images/default-chat.jpg'/></td>";    
						x += "<td onclick='loadChatContent(&apos;"+y.id+"&apos;)' width='100%' align='center' class='b-pat' colspan='2'>"+title+" "+y.doctor_name;
                            if(y.pat_noti==true)
                                x+="<img src='../assets/images/bell1.png' id='img"+y.id+"' class='chat-noti'></td></td></tr>";
                            else
                                x += "</td></tr>";
						x += "<tr><td onclick='loadChatContent(&apos;"+y.id+"&apos;)' colspan='2' align='center'>Booked on &nbsp;<b>"+z.getDate()+"</b>&nbsp;"+givemonth(z.getMonth())+"&nbsp;"+z.getFullYear()+" at "+formatAMPMh(z.getHours(),z.getMinutes())+"</td></tr>";
                        //z.getHours()+":"+z.getMinutes()+" hrs</td></tr>";
                        if(y.status == 'STARTED')
						  x += "<tr><td colspan='2' align='center' class='ongoing'>Ongoing</td></tr>";
                        else if(y.status == 'FINISHED')
						  x += "<tr><td align='center' class='Finished' width='50%'>Finished</td><td align='center' class='restart'  width='50%' onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>Restart</td></tr>";
						x += "</table></td></tr>";	
						output += x;
						}
						$('#chat-listing').html(output);
                        /*if(chat_flag==false)
				            $('#no-appointments-pat').show();*/
					}
					else
					{
						//Doctor Chat
						var f = " "+y.id+" ";
                        
						if(y.status=='PAID'|| y.status=='FINISHED' || y.status=='STARTED')
						{
                            //console.log(y.id);
                            chat_flag=true;
						x += "<tr><td align='center' id='"+y.id+"' class='chat-list-td'>";
						x +="<table id='"+y.id+"' id='chat-entry-table' width='100%' align='center' border='0'>";
						x += "<tr><td colspan='2' onclick='loadChatContent(&apos;"+y.id+"&apos;)' width='100%' class='b-pat' align='center'>"+y.patient_name;
                            if(y.doc_noti==true)
                                x += "<img src='../assets/images/bell1.png' class='chat-noti' id='img"+y.id+"'></td></tr>";
                            else
                                x += "</td></tr>";
                        x += "<tr><td onclick='loadChatContent(&apos;"+y.id+"&apos;)' colspan='2' align='center'>Booked on &nbsp;<b>"+z.getDate()+"</b>&nbsp;"+givemonth(z.getMonth())+"&nbsp;"+z.getFullYear()+" at "+formatAMPMh(z.getHours(),z.getMinutes())+"</td></tr>";
                        if(y.status == 'STARTED')
						  x += "<tr><td colspan='2' align='center' class='ongoing'>Ongoing</td></tr>";    
                        if(y.status=='FINISHED')
							{
                              x += "<tr><td align='center' class='Finished' width='50%'>Finished</td><td align='center' class='restart'  width='50%' onclick='restart(&apos;"+y.id+"&apos;)'>Restart</td></tr>"; 
                                
							  $('#restart-chat').show(); 
							}     
						x += "</table></td></tr>";	
						
						output += x;
						}
						$('#chat-listing').html(output);
				        
                        /*if(chat_flag==false)
				            $('#no-appointments-doc').show();*/
					}
					
					$('#appointments-loading').hide();
					$('#part1').show();
					//$('#chat-block').show();
					$('#part2').hide();
                    }
				}).then(function(){
                    if(chat_flag==false)
                    {
                        if(u_type=="D")
				            $('#no-appointments-doc').show();
                        else
                            $('#no-appointments-pat').show();
                    }
                    else
                    {
                        $('#part1').show(); 
                        $('#no-appointments-doc').hide();
                        $('#no-appointments-pat').hide();
                    }
                });
			
			}
            
            }
			/*if(p_total.length == 0)
			{
				$('#appointments-table').html("<tr ><td width='100%' align='right'><br><br><br><br>No chats to display!<br><br><br><br><br></td></tr>");
				$('#appointments-loading').hide();
			}*/	
		});
	}
	function loadAppointments_desk(UID)
	{
        
		firebase.database().ref('/users/' + UID).once('value').then(function(snapshot) 
		{
			var output = "";
			p_chat = snapshot.val().chat_appointments;
            
            var u_type= snapshot.val().type;
            
            if( p_chat==undefined || p_chat.length == 0)
			{
                if(u_type=="D")
				$('#chat-display-row').html("<td width='100%' align='center'><br><br><img src='./assets/images/noappointmentsdoc.jpg' width='760vw' height='500vh'/><br><br><br></td>");
                else if(u_type=="P")
				$('#chat-display-row').html("<td width='100%' align='center'><br><br><img src='./assets/images/noappointmentspat.jpg' width='760vw' height='500vh'/><br><br><br></td>");
                
				$('#appointments-loading').hide();
			}
            else
            {    
            
            p_chat.reverse();
			/*var x = 0;
			for (var i in p_chat)
			{
				p_total[x+i] = [p_chat[i], "C",""];
			}
			p_total.sort(sortFunction);
			function sortFunction(a, b)
            {

				if (a[0] === b[0]) {
					return 0;
				}
				else {
					return (a[0] < b[0]) ? -1 : 1;
				}
			}
            */
                
			var chat_flag=false;
			for(var i in p_chat)
			{
                
                var id_chat=p_chat[i];//p_total[i][0];
                
				firebase.database().ref('/text-chat-sessions/' + id_chat).once('value').then(function(snapshot) 
				{
                    var y = snapshot.val();
                    if(y != null)
                    {    
					chatObjects.push(snapshot.val());
					var x = "";    
					var z = new Date(y.timestamp);
					user_type = y.doctor_id == uid ? "D" : "P";	
					if(user_type=="P")
					{
						//Patient Chat
						if(y.doctor_title==1)
							var title = "Dr."
						else
							var title = "";
						var f = " "+y.id+" ";
						if(y.status=='PAID'|| y.status=='FINISHED' || y.status=='STARTED')
						{
                            //console.log(y.doc_noti,y.pat_noti);
                            chat_flag=true;
						x += "<tr><td align='center' id='"+y.id+"'>";
						x += "<table  id='chat-entry-table' width='95%' align='center' border='0'>";
                          if(y.doctor_image)
                            x+="<tr><td rowspan='3' ><img  class='doc-dp' src='"+y.doctor_image+"' /></td>";
                        else
                            x+="<tr><td rowspan='3'><img  class='doc-dp' src='./assets/images/default-chat.jpg' /></td>";
                            
						x += "<td width='100%' colspan='2' align='center' onclick='loadChatContent_desk(&apos;"+y.id+"&apos;)'><div class='doctor-name'>"+title+" "+y.doctor_name;
                            //if(y.pat_noti==true)
                                //x+="<img src='./assets/images/bell1.png' height='20vw' width='20vw' id='img"+y.id+"' hidden></div></td></tr>";
                            /*else
                                x += "<td width='20%'></td></tr>";*/
                            if(y.pat_noti==true)
                                x+="<img src='./assets/images/bell1.png' height='20vw' width='20vw' id='img"+y.id+"'></div></td></tr>";
                            else
                                x+="<img src='./assets/images/bell1.png' height='20vw' width='20vw' id='img"+y.id+"' hidden></div></td></tr>";
                                
						x += "<tr><td class='date-time-header' colspan='2' align='center' onclick='loadChatContent_desk(&apos;"+y.id+"&apos;)'>Booked On <b>"+z.getDate()+"</b> "+givemonth(z.getMonth())+" "+z.getFullYear()+" &nbsp; at &nbsp;"+formatAMPM(z)+"</td></tr>";
                        if(y.status=="STARTED")
						  x += "<tr><td colspan='2' align='center' class='status-ongoing'>Ongoing</td></tr>";
                        else if(y.status=="FINISHED")
						  x += "<tr><td align='center' class='status-finished'>Finished</td><td class='restart' align='center' onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>Restart</td></tr>";
                            
						x += "</table></td></tr>";	
						output += x;
						}
						$('#chat-listing').html(output);
                        
					}
					else 
					{
						//Doctor Chat
						var f = " "+y.id+" ";
						if(y.status=='PAID'|| y.status=='FINISHED' || y.status=='STARTED')
						{
                            //console.log(y);
                            chat_flag=true;
						x += "<tr><td align='center' id='"+y.id+"'>";
						x += "<table id='"+y.id+"' id='chat-entry-table' width='100%' align='center' border='0'>";
						x += "<tr><td width='80%' colspan='2' align='center' onclick='loadChatContent_desk(&apos;"+y.id+"&apos;)'><div class='doctor-name' >"+y.patient_name;
                            //if(y.doc_noti==true)
                                //x += "<img src='./assets/images/bell1.png' height='20vw' width='20vw'id='img"+y.id+"' hidden></div></td></tr>";
                            /*else
                                x += "<td width='20%'></td></tr>";*/
                            if(y.doc_noti==true)
                                x += "<img src='./assets/images/bell1.png' height='20vw' width='20vw'id='img"+y.id+"'></div></td></tr>";
                            else
                                x += "<img src='./assets/images/bell1.png' height='20vw' width='20vw'id='img"+y.id+"' hidden></div></td></tr>";
                            
						x += "<tr><td class='date-time-header' colspan='2' align='center' onclick='loadChatContent_desk(&apos;"+y.id+"&apos;)'>Booked On <b>"+z.getDate()+"</b> "+givemonth(z.getMonth())+" "+z.getFullYear()+" &nbsp; at &nbsp;"+formatAMPM(z)+"</td></tr>";
						
                        if(y.status=="STARTED")
						  x += "<tr><td colspan='2' align='center' class='status-ongoing'>Ongoing</td></tr>";
                        else if(y.status=="FINISHED")
						  x += "<tr><td align='center' class='status-finished'>Finished</td><td  class='restart' align='center' onclick='restart(&apos;"+y.id+"&apos;)'>Restart</td></tr>";
						
						x += "</table></td></tr>";	
						
						output += x;
						}
						$('#chat-listing').html(output);
					}
					$('#appointments-loading').hide();
                    }
				}).then(function()
                {
                    if(chat_flag==false)
                        {
                            if(u_type=="D")
                                $('#no-chat').html("<td width='100%' align='center'><br><br><img src='./assets/images/noappointmentsdoc.jpg' width='760vw' height='500vh'/><br><br><br></td>");
                            else
                                $('#no-chat').html("<td width='100%' align='center'><br><br><img src='./assets/images/noappointmentspat.jpg' width='760vw' height='500vh'/><br><br><br></td>");
                            
                            $('#no-chat').show();
                            
                        }
                    else
                        {
                            $('#no-chat').hide();
                            $('#chat-display-row').show();
                        }
                        
                });
                
			
			}  
            }
		});
	}
    
    function formatAMPM(date)
    {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = ('0'+minutes).slice(-2);
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
	//$(document).on("click", "#chat-listing td", function(e) {
    function loadChatContent(data)
    {
        //var data = $(this).attr('id');
        //console.log('here',data);
        $("#img"+data).hide();
        resetChatNotification(data);
        var selected = $(this).hasClass("highlight");
        $("#chat-listing td").removeClass("highlight");
        if(!selected)
            $(this).addClass("highlight");
        if(data != null)
          	sesID = data;
        for(var i in chatObjects)
        	if(chatObjects[i].id==data)
        	{
        		patient_name = chatObjects[i].patient_name;
        		doctor_name = chatObjects[i].doctor_name;
        		session_status = chatObjects[i].status;
                patient_number= chatObjects[i].patient_contact;
                doctor_number= chatObjects[i].doctor_contact;
                doctor_dp=chatObjects[i].doctor_image;
        	}

        var x="";
		if(user_type=='P')
		{
            if(doctor_dp)
                {
                    $('#doc-dp-chat').html("<img class='doc-dp-in' src="+doctor_dp+">");
                    $('#doc-dp-chat').show();
                }
                
			$('#chat-header').html("Dr. "+doctor_name);
            //$('#patient-session').show();
            if(session_status== 'FINISHED')
			{
                $('.restart-button-pat').show();
            }
            else 
                $('.restart-button-pat').hide();
		}
		else if(user_type=='D')
		{
			$('#chat-header').html(patient_name);
			$('#session-control-links1').show();
            //$('#session-control-links2').show();
            if(session_status== 'FINISHED')
			{
                $('.restart-button').show();
                $('.end-button').hide();
				//$('#session-control-links2').hide();
				}
            else if(session_status== 'STARTED')
			{
                $('.restart-button').hide();
                $('.end-button').show();
				//$('#session-control-links2').show();
				}
            
		}
		
        firebase.database().ref('text-chat-sessions/'+sesID+'/status/').on('value',function(snapshot){
            console.log('Status :'+snapshot.val());
            if(snapshot.val()=="FINISHED" && uid==p_id)
                errorModal("Doctor has ended this chat session. Press restart to reactivate.");
        });
		
		var messagesRef = firebase.database().ref('text-chat-sessions/'+sesID+'/messages/');
		messagesRef.on('value', function(snapshot) 
		{
			var div =  document.getElementById('chat-body');
			messages = snapshot.val();
			if(snapshot.A.aa==null && user_type=="P")
			{	
				div.innerHTML = "<div id='chat-log-empty'>Please provide the relevant details to the doctor (e.g. your gender, age, problem, relevant medical history,current medication etc.)</div>";
			}
			else
			{
				var output = "";
				var x = snapshot.val();
				var sender_name;
				var prev_sender_name="X";
				
				for (var i in x)
				{
					if(x[i].sender==user_type)
					{
						sender_name = "You";
					}
					else
					{
						if(x[i].sender=='P')
							sender_name = patient_name;
						else
							sender_name = doctor_name;
					}
					if(sender_name == prev_sender_name)
					{
						if(x[i].sender=='P')
						{
							output += "<tr><td class='sender-text patient-text' align='right'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
						else
						{
							output += "<tr><td class='sender-text doctor-text'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
					}
					else
					{
						if(x[i].sender=='P')
						{
							output += "<tr><td class='sender-name patient-name'>"+sender_name+"</td></tr><tr><td class='sender-text patient-text' align='right'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
						else
						{
							output += "<tr><td class='sender-name doctor-name'>"+sender_name+"</td></tr><tr><td class='sender-text doctor-text'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
					}
					prev_sender_name = sender_name;
				}
				div.innerHTML = output;
				var objDiv = document.getElementById("chat-table-div");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		});
		
		document.getElementById('chat-block').hidden = false;
		$('#part1').hide();
		$('#part2').show();
		
    } 
    //$(document).on("click", "#chat-listing td", function(e) 
    function loadChatContent_desk(data)
    {
        //var data = $(this).attr('id');
        //console.log('here',data);
        var p_id;
        $("#img"+data).hide();
        var selected = $(this).hasClass("highlight");
        $("#chat-listing td").removeClass("highlight");
        if(!selected)
            $(this).addClass("highlight");
        
        if(data != null)
          	sesID = data;
        //console.log("click",sesID);
        for(var i in chatObjects)
        	if(chatObjects[i].id==data)
        	{
        		patient_name = chatObjects[i].patient_name;
        		doctor_name = chatObjects[i].doctor_name;
        		session_status = chatObjects[i].status;
				patient_number=chatObjects[i].patient_contact;
                p_id=chatObjects[i].patient_id;
                
				//console.log(chatObjects[i],uid);
                
                /*if(session_status == 'FINISHED')
                    {
                        $('#session-control-1').hide();
                        $('#session-control-2').hide();
                        $('#session-control-links1').hide();
                        $('#session-control-links2').hide();
                        $('#restart-chat').show();
                        $('#restart-row').show();
                    }
                else
                    {
                        $('#restart-chat').hide();
                        $('#restart-row').hide();
                    }
                
                if(session_status == 'PAID')
                    {
                        //console.log("paid");
                        $('#session-control-1').show();
                        $('#session-control-2').hide();
                        $('#session-control-links1').show();
                        $('#session-control-links2').hide();
                    }
                
                if(session_status == 'STARTED')
                    {
                        //console.log("started");
                        $('#session-control-1').hide();
                        $('#session-control-2').show();
                        $('#session-control-links1').hide();
                        $('#session-control-links2').show();
                    }*/
        	}

        var x="";
		if(user_type=='P')
		{
			$('#chat-header').html("<div class='name-of-chat'>Chat with Dr."+doctor_name+"</div>");
            $('#chat-header').show();
            /*$('#patient-session').show();
            $('#restart-chat').hide();
            $('#restart-row').hide();
            $('#session-control-1').hide();
            $('#session-control-2').hide();*/
		}
		else if(user_type=='D')
		{
			$('#chat-header').html("<div class='name-of-chat'>Chat with "+patient_name+"<button type='button' id='chat-end-button' onclick='endChatSession(&apos;"+sesID+"&apos;)'>End Session</button></div>");
            $('#chat-header').show();
            if(session_status=="FINISHED")
                $('#chat-end-button').hide();
            else
                $('#chat-end-button').show();
            /*$('#patient-session').hide();*/
		}
        
        firebase.database().ref('text-chat-sessions/'+sesID+'/status/').on('value',function(snapshot){
            console.log('Status :'+snapshot.val());
            if(snapshot.val()=="FINISHED" && uid==p_id)
                errorModal("Doctor has ended this chat session. Press restart to reactivate.");
        });
		
		var messagesRef = firebase.database().ref('text-chat-sessions/'+sesID+'/messages/');
		messagesRef.on('value', function(snapshot) 
		{
			var div =  document.getElementById('chat-body');
			messages = snapshot.val();
			if(snapshot.A.aa==null&& user_type=='P')
			{	
				div.innerHTML = "<div id='chat-log-empty'>Please provide the relevant details to the doctor (e.g. your gender, age, problem, relevant medical history,current medication etc.)</div>";
			}
			else
			{
				var output = "";
				var x = snapshot.val();
				var sender_name;
				var prev_sender_name="X";
				
				for (var i in x)
				{
					if(x[i].sender==user_type)
					{
						sender_name = "You";
					}
					else
					{
						if(x[i].sender=='P')
							sender_name = patient_name;
						else
							sender_name = doctor_name;
					}
					if(sender_name == prev_sender_name)
					{
						if(x[i].sender=='P')
						{
							output += "<tr><td width='50%' class='sender-text patient-text' align='right'><p class='msg' >"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
						else
						{
							output += "<tr><td width='50%' class='sender-text doctor-text' align='left'><p class='msg' >"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
					}
					else
					{
						if(x[i].sender=='P')
						{
							output += "<tr><td class='sender-name patient-name'>"+sender_name+"</td></tr><tr><td width='50%' class='sender-text patient-text' align='right'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
						else
						{
							output += "<tr><td class='sender-name doctor-name'>"+sender_name+"</td></tr><tr><td width='50%' class='sender-text doctor-text' align='left'><p class='msg'>"+x[i].text+"</p></td></tr><tr><td class='break-row'><br></td></tr>";
						}
					}
					prev_sender_name = sender_name;
				}
				div.innerHTML = output;
				var objDiv = document.getElementById("chat-table-div");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		});
		
		document.getElementById('chat-block').hidden = false;
        $('#default-msg').hide();
    }//);
    function sendMessage()
	{
		var text =$('#input-text').val();
		var sender = user_type;
		var d = new Date();
		var n = d.getTime();
		var obj = {sender:sender, text:text, timestamp:n};
		if(messages==null)
			messages=new Array();
		messages.push(obj);
		if(session_status == 'STARTED' && text!="")
		{
			var updates = {};
			updates['text-chat-sessions/'+sesID+'/messages/'] = messages;
            
            if(user_type=="P")
                {
                updates['text-chat-sessions/'+sesID+'/doc_noti/'] = true;
                updates['text-chat-sessions/'+sesID+'/pat_noti/'] = false;
                }
            else
                {
                updates['text-chat-sessions/'+sesID+'/doc_noti/'] = false;
                updates['text-chat-sessions/'+sesID+'/pat_noti/'] = true;
                }
            
			var form = document.getElementById("chat-form");
			form.reset();
			return firebase.database().ref().update(updates);
		}
		else if(session_status!='STARTED')
		{
			createModal("Chat Session has Ended. Please request a new appointment.")
		}
	}
	function resetChatNotification(id)
    {
        //console.log('reset',id);
        var updates = {};
        /*if(id != undefined)
            return;*/
        if (user_type=="P")
            updates['text-chat-sessions/'+id+'/pat_noti/'] = false;
        else
            updates['text-chat-sessions/'+id+'/doc_noti/'] = false;
        
        return firebase.database().ref().update(updates).then(function(){
            //console.log(id,'done');    
        });
    }
	$('#chat-form').submit(function(){
		event.preventDefault();
		sendMessage();
	});
	
	function startChatSession()
	{
		var updates = {};
		updates['text-chat-sessions/'+sesID+'/status/'] = "STARTED";
		session_status='STARTED';
		firebase.database().ref().update(updates);
		createModal("Your chat session has started.");
		firebase.database().ref().update(updates).then(function(){
				//$('#restart-chat').hide();
		location.reload(true);
		});
	}
	
	function endChatSession()
	{
        //console.log('endchat',sesID);
		var updates = {};
		updates['text-chat-sessions/'+sesID+'/status/'] = "FINISHED";
		session_status='FINISHED';
		createModal("Your chat session has finished");
		firebase.database().ref().update(updates).then(function(){
				//$('#restart-chat').hide();
		      //location.reload(true);
            var msg='Your online consultancy session with '+doctor_name+' has been ended by the specialist. Thank you! To consult again click: https://tx.gl/r/2dVI/#AdvdTrack# Call 7605867667 for assistance.';
            /*var msg = 'Your chat session for online consultancy with '+doctor_name+' has been ended by the doctor. Thank you!';*/
            var doc_msg='You have ended the chat session with '+patient_name+'. To restart consultancy click: https://tx.gl/r/2dVI/#AdvdTrack# Call 7605837667 for assistance.';
        
            msg = encodeURI(msg);
            doc_msg = encodeURI(doc_msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': patient_number,
						'sender': 'CAREST',
						'message': msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
                });
                $.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': doctor_number,
						'sender': 'CAREST',
						'message': doc_msg,
						'test':'0'
					},
					contentType: "application/json; charset=utf-8",
					dataType:"jsonp",
					success: function(data, status, jqXHR){
						// success code
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
					}
                });
            loadAppointments(uid);
        });
		//setTimeout(function(){ window.location = 'my-appointments.html?=chat' }, 3000);
        //location.reload();
	}
	function restart(x)
	{
        if(!sesID)
            sesID=x;
        //console.log('restart',sesID);
		var updates = {};
		updates['text-chat-sessions/'+sesID+'/status/'] = "STARTED";
		session_status='STARTED';
		/*firebase.database().ref().update(updates);
		createModal("Your chat session has started.");*/
        firebase.database().ref().update(updates).then(function(){
				$('.restart-button').hide();
            loadAppointments(uid);
		//location.reload(true);
		});
		//setTimeout(function(){ window.location = 'dashboard.html' }, 3000);
	}
	function showPaymentModal(x)
	{
		//var e = event || window.event;
        //console.log(x,sesID);
        if(sesID!=null || sesID!=undefined)
            x=sesID;
		appointmentID =x;// e.target.id;
		window.scrollTo(0,0);
		firebase.database().ref('text-chat-sessions/' + appointmentID).once('value').then(function(snapshot) 
		{
			var chat_object = snapshot.val();
			//console.log(chat_object);
			var options = {
			"key": "rzp_live_81uXRTHDPKnEoX",
			"amount": parseInt(chat_object.rate)*100,
			"name": "Careist",
			"description": "Payment for Online Chat with Dr. "+chat_object.doctor_name,
			"image": "../assets/images/logo.png",
			"handler": function (response){
				succesfulRazorPayPayment(response.razorpay_payment_id, parseInt(chat_object.rate)*100, appointmentID);
			},
			"prefill": {
				"name": chat_object.patient_name,
				"email": chat_object.patient_email,
				"contact": chat_object.patient_contact
			},
			"notes": {
				"address": ""
			},
			"theme": {
				"color": "#053d3a"
			}
		};
		var rzp1 = new Razorpay(options);

		//document.getElementById('rzp-button1').onclick = function(e){
			rzp1.open();
			//e.preventDefault();
			/*var modal = document.getElementById('paymentModal');
			modal.style.display = "none";*/
			
		//}
			
		/*var modal = document.getElementById('paymentModal');
		var span = document.getElementsByClassName("close")[3];		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}*/	
			
		});
		
	}	
    function givemonth(month)
	{
		var montharr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		return montharr[month];
	}
    function formatAMPMh(hours,minutes)
    {
        if(minutes-10<0)
            minutes="0"+minutes;
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var strTime = "<b>"+hours+":"+minutes+"&nbsp;</b>"+ampm;
        return strTime;
    }
    function errorModal(txt)
	{
		var modal = document.getElementById('errorModal');
		var span = document.getElementsByClassName("close")[4];
		
		$('#error-modal-body').html("<br><br><h4>"+txt+"</h4><br><br>")
		
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
	