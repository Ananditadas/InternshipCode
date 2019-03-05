    var listObjects=[];
    function displayContentMob()
	{
        var out="";
        if(p_chat==undefined || p_chat==null )
            {
                if(user_type=='P')
                    out = "<tr><td align='center'><img src='../assets/images/noappointmentspat.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                else
                    out = "<tr><td align='center'><img src='../assets/images/noappointmentsdoc.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                $('#appointments-table-2').html(out);
            }
        else
            getChatsMob();
        if(p_app==undefined || p_app==null )
            {
                if(user_type=='P')
                    out = "<tr><td align='center'><img src='../assets/images/noappointmentspat.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                else
                    out = "<tr><td align='center'><img src='../assets/images/noappointmentsdoc.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                $('#appointments-table-1').html(out);
            }
        else
             getAppointmentsMob();
                
        if(page_type=="chat")
            {   
                 $('#chatappointmentstab').show();
                 $('#appointmentstab').hide();
                  highlight_chat_tab();
            }
            
        $('#loading-icon').hide();
        $('#Dashboard').show();
	}
    function getChatsMob()
	{
        var x="";
			for(var i=p_chat.length-1;i>=0;i--)
			{
				if(p_chat[i]!="head")
				{
				firebase.database().ref('text-chat-sessions/'+p_chat[i]).once('value').then(function(snapshot) {
					
					chatObject=snapshot.val();
					
				}).then(function()
                {
                    if(chatObject.id != undefined)
                        {
                            if(user_type=='D')
                                x=displayDCAppointmentsMob(x,chatObject);
                            else
                                x=displayPCAppointmentsMob(x,chatObject);
                            $('#appointments-table-2').html(x);
                        }
                });
				}
			
			}
		
	}
    function getAppointmentsMob()
	{
         var x="";
		 for(var i=p_app.length-1;i>=0;i--)
		 {     
			if(p_app[i]!="head")
			{
				firebase.database().ref('appointments/'+p_app[i]).once('value').then(function(snapshot) {
                    appointmentObject=snapshot.val();
					
				}).then(function()
                {
					//console.log(appointmentObject);
					listObjects.push(appointmentObject);
                    if(appointmentObject.id != undefined)
                        {
                            if(user_type=='D')
                            {
								x=displayDAppointmentsMob(x,appointmentObject);
								//myMap(appointmentObject.latitude,appointmentObject.longitude,'modalmap-'+appointmentObject.id);
                            }
							else
                                x=displayPAppointmentsMob(x,appointmentObject);
                            $('#appointments-table-1').html(x);
							
                        }
                    //console.log("here",listObjects);
                }).then(function(){
                    if(user_type=='D')
				    {
					var y=appointmentObject;
					if(y.latitude!=null || y.longitude!=null || y.latitude!=22.580729536394898 || y.longitude!=88.35977554321289 || y.latitude!=0 || y.longitude!=0 )
						showMaps(listObjects);	
                    }
                });
			}
			
		 }
		 
	}
    function displayPAppointmentsMob(x,y)
	{
            if(y==null || y==undefined)
                return ;
			var z = new Date(y.timestamp);
			x += "<tr><td width='100%' align='center'><table class='apps-table'>";
            if(y.spa_appointment == true)
				x+="<tr><td align='center' width='100%' class='b-pat'>"+y.doctor_name+"</td></tr><tr><td align='center' width='100%' class='sub-fonts'>Appointment date and time</td></tr><tr><td  width='100%' class='app-date' align='center'>"+changeDateFormat(y.date)+"&nbsp;&nbsp;<b>"+formatAMPMh(y.time)+" - "+formatAMPMh(parseInt(y.time)+2)+"</b> slot</td></tr>"
			else
				x+="<tr><td align='center' width='100%' class='b-pat'>"+y.doctor_name+"</td></tr><tr><td align='center' width='100%' class='sub-fonts''>Appointment date and time:</td></tr><tr><td width='100%' class='app-date' align='center'>"+changeDateFormat(y.date)+"&nbsp;&nbsp;<b>"+formatAMPMh(y.time)+" - "+formatAMPMh(parseInt(y.time)+2)+" </b>slot</td></tr>"
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			x+="<tr><td class='sub-fonts' align='center'>Address</td></tr>";
			x+="<tr><td class='app-details' align='center'>"+getAddress(y.address)+"</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			x+="<tr><td class='sub-fonts' align='center'>Locality</td></tr>";
			x+="<tr><td class='app-details' align='center'>"+y.location+"</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
            if(y.spa_appointment == true)
                {
                    var ser_id = y.service_id;
                    var ser_name = y.service_name;
                    var ser_rate = y.service_rate;
                    var ser="";
                    var ser_tot=0;
                    var ser_num=0;
                    var ser_per_head=y.service_per_head;
                    
                    if(ser_per_head !=undefined)
                        for(i in ser_id)
                            {
                                ser_num++;
                                ser_tot+=parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]]);
                                ser+="<option class='option_spa'>"+ser_name[ser_id[i]]+" Rs. "+parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]])+"/- (Rs."+ser_rate[ser_id[i]]+" x "+ser_per_head[ser_id[i]]+")</option>";
                            }
                    else
                        for(i in ser_id)
                            {
                                ser_num++;
                                ser_tot+=parseInt(ser_rate[ser_id[i]]);
                                ser+="<option >"+ser_name[ser_id[i]]+" (Rs. "+ser_rate[ser_id[i]]+"/-)</option>";
                            }
                    //console.log(ser,ser_tot,ser_id);
                    //ser="<option >"+ser_num+" service(s) (Rs. "+ser_tot+"/-)</option>"+ser;
                    //console.log(ser);
                    x +="<tr><td colspan='3' align='center'><table align='center'><tr><td width='25%' class='sub-fonts' >Services:</td><td width='75%' class='sub-fonts'><select class='sersel'>"+ser+"</select></td></tr><tr><td colspan='3'class='app-details' align='center'>Amount payable:Rs."+ser_tot+"/-</td></tr></table></td></tr>";
					
                }
            else
                {
					x +="<tr><td colspan='3' align='center'><table align='center'><tr><td width='100%' class='sub-fonts' align='center'>Service: Home Visit</td></tr><tr><td width='100%'class='app-details' align='center'> Amount payable:Rs. "+y.service_rate+"/-</td></tr></table></td></tr>";
                }
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			
            
			x+="<tr><td align='center'>Booked on &nbsp;"+z.getDate()+"&nbsp;"+givemonth(z.getMonth())+"&nbsp;"+z.getFullYear()+"</td></tr>";
			//console.log(z.getDate());
			
			if(y.status == "REQUESTED" )
			{
                x += "<tr><td colspan='3 'align='center'><button id='"+y.id+"' class='change-status-link-c' onclick='cancelAppointment(&apos;"+y.id+"&apos;)'>CANCEL</button></td></tr>"; 
            }
			else if(y.status == "ACCEPTED" )
			{
                x += "<tr><td colspan='3' align='center' width='100%'><button type='button' onclick='getContact()' class='help'>Contact-support</button></td></tr>";
            }
			else if(y.status == "CANCELLED" )
			{
                x+="<tr><td align='center' class="+y.status+" >"+reFormat(y.status)+"</td></tr>";
            }
				x += "<tr><td><br/></td></tr></table>";
			
            x+="</td></tr><tr><td><br/></td></tr>";
			
            return x;
    }
    function displayPCAppointmentsMob(x,y)
    {
            if(y==null || y == undefined)
                return;
			var z = new Date(y.timestamp);
			x+="<tr><td width='100%' align='center'><table width='100%' class='apps-table'>";
			x += "<tr><td width='100%' class='b-pat' align='center'>Doctor "+y.doctor_name+"</td></tr><tr><td width='100%' class='sub-fonts' align='center'>Booked On</td></tr><tr><td align='center' width='100%'><b>"+z.getDate()+"</b>&nbsp;"+givemonth(z.getMonth())+"&nbsp;<b>"+z.getFullYear()+"</b>&nbsp;</td></tr>";
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>"
            x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online</td></tr><tr><td align='center' width='100%'>Amount payable Rs. "+y.rate+"/- </td></tr>"
            x +="<tr><td colspan='2'><hr class='table-hr'></td></tr>"
            
			//x+="<tr><td align='center'>Status</td>";
			//x+="<td class="+y.status+">"+y.status+"</td></tr>";
			if(y.status == "STARTED" || y.status == "PAID")
			{
				x += "<tr><td  colspan='3' align='center'><button type='button' onclick='window.location=&apos;my-chats.html&apos;;'>CHAT</button></td></tr></table>";
				}
			else if(y.status =='ACCEPTED' || y.status == "AWAITING PAYMENT" || y.status == "REQUESTED")
			{
				x += "<tr><td colspan='3' align='center'><button type='button' id='"+y.id+"' onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>PAY</button></td></tr></table>";
				}
            else if( y.status == "FINISHED" )
			{
                //console.log('finished');
				x += "<tr><td colspan='3' align='center'><button type='button' id='"+y.id+"' onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>RESTART</button></td></tr></table>";
				}
			/*else if(y.status == "REQUESTED" )
			{
				x += "<tr><td  colspan='3' align='center'><button type='button' id='"+y.id+"' onclick='cancelChat(&apos;"+y.id+"&apos;)'>CANCEL</button></td></tr></table>";
				}*/
			else
				x += "</table>";
            x+="</td></tr>";
            //console.log(y);
            return x;
		
	}
	function displayDAppointmentsMob(x,y)
	{
            if(y==null || y==undefined )
                return;
			var z = new Date(y.timestamp);
            //console.log(p_app[i],y.id,y.patient_name);
			x += "<tr><td width='100%' align='center'><table width='100%' class='apps-table'><tr><td></td></tr>";
			x+="<tr><td class='b-pat'  colspan='3'  width='100%' align='center'>"+y.patient_name+"</td></tr>";
	
			/*x+="<td align='center'class='b-book' width='40%'>Booked on</br>"+z.getDate()+"/"+(z.getMonth()+1)+"/"+z.getFullYear()+"&nbsp; at &nbsp;"+formatAMPM(z)+"</td><td align='center' class='b-app' width='30%'>Appointment on</br>"+y.date +" &nbsp; at &nbsp;"+formatAMPMh(y.time)+" </td></tr>";*/
			x+="<tr><td align='center' width='100%'  colspan='3'  class='sub-fonts'>Appointment Date and Time</td></tr>";
			x+="<tr><td width='100%' colspan='3' class='app-date' align='center'>"+changeDateFormat(y.date)+"&nbsp;&nbsp;<b>"+formatAMPMh(y.time)+" - "+formatAMPMh(parseInt(y.time)+2)+" </b>slot</td></tr>";
           
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			x+="<tr><td class='sub-fonts' align='center'>Address</td></tr>";
			x+="<tr><td  colspan='3' class='app-details' align='center'>"+y.address+"</td></tr>";
			x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			x+="<tr><td class='sub-fonts' align='center'>Locality</td></tr>";
			x+="<tr><td class='app-details' align='center'>"+y.location+"</td></tr>";
			x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			
            if(y.spa_appointment == true)
                {
                    //console.log(y.id);
                    //console.log(i,y.spa_appointment,y.service_id,y.service_name,y.service_rate);
                    var ser_id = y.service_id;
                    var ser_name = y.service_name;
                    var ser_rate = y.service_rate;
                    var ser="";
                    var ser_tot=0;
                    var ser_num=0;
					var ser_per_head=y.service_per_head;
					if(ser_per_head !=undefined)
                        for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]]);
                            ser+="<option>"+ser_name[ser_id[i]]+" Rs. "+parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]])+"/- (Rs."+ser_rate[ser_id[i]]+" x "+ser_per_head[ser_id[i]]+")</option>";
                            
                        }
                    else
                    
						for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]]);
                            ser+="<option class='option_spa'>"+ser_name[ser_id[i]]+" (Rs. "+ser_rate[ser_id[i]]+"/-)</option>";
                        }
                    //console.log(ser,ser_tot,ser_id);
                    //ser="<option >"+ser_num+" service(s) (Rs. "+ser_tot+"/-)</option>"+ser;
                    //console.log(ser);
                    x +="<tr><td colspan='3' align='center'><table align='center'><tr><td width='25%' class='sub-fonts'>Services:</td><td width='75%' class='sub-fonts' align='center'><select class='sersel'>"+ser+"</select></td></tr><tr><td colspan='3' class='app-details' align='center'>Amount payable:Rs."+ser_tot+"/-</td></tr></table></td></tr>";
                }
            else
                {
                    x +="<tr><td colspan='3' align='center'><table><tr><td width='100%' class='sub-fonts'>Service: Home Visit</td></tr><tr><td width='100%' class='app-details'> Amount payable:Rs. "+y.service_rate+"/-</td></tr></table></td></tr>";
                }
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			
            /*x+="<tr><th>Location</th>";
			x+="<td colspan='2'>"+y.location+"</td></tr>";
			x+="<tr><th>Address</th>";
			x+="<td colspan='2'>"+y.address+"</td></tr>";*/
			x+="<tr><td align='center'  colspan='3' >Booked on &nbsp;"+z.getDate()+"&nbsp;"+givemonth(z.getMonth()+1)+"&nbsp;"+z.getFullYear()+"</td></tr>";
			
			if(y.latitude==null || y.longitude==null || y.latitude==22.580729536394898 || y.longitude==88.35977554321289 || y.latitude==0 || y.longitude==0 )
			{
				x+= "<tr><td></td></tr>";
			}
			else
			{
				var l1= encodeURI(y.latitude);
				var l2= encodeURI(y.longitude);
                latitude=l1;
                longitude=l2;
				
                x+="<tr><td><div id='modalmap-"+y.id+"' class='map-view' onclick=mapModal('"+latitude+"','"+longitude+"','modalmap')></div></td></tr>";
				x+="<tr><td colspan='3' align='center' >Click on Map to View</td></tr>";
				//showMaps(listObjects);
			}
			x+="<tr>";
			x+="<td align='center'  colspan='3'  class="+y.status+">"+reFormat(y.status)+"</td></tr>";
			if(y.status=='REQUESTED')
			{
                x+="<tr><td align='center'><button id='"+y.id+"' onclick='acceptAppointment(&apos;"+y.id+"&apos;)'>ACCEPT</button>&nbsp;<button id='"+y.id+"'  onclick='declineAppointment(&apos;"+y.id+"&apos;)'>DECLINE</button></td></tr></table>";   
			}
			else
			{
				x +="<tr><td></td></tr></table>";
			}
		      x+="</td></tr>";
            return x;
		}
	function displayDCAppointmentsMob(x,y)
    {
            if(y==null || y==undefined )
                return;
			var z = new Date(y.timestamp);
			x += "<tr><td width='100%' align='center'><table class='apps-table' width='100%'>";
			//x += "<tr><th class='b-pat'>Patient</th><th class='b-book'>Booked On</th></tr>";
			x += "<tr><td class='b-pat' width='100%' align='center'>"+y.patient_name+"</td></tr><tr><td class='sub-fonts' align='center' width='1000%'>Booked on </td></tr><tr><td align='center' width='100%'><b>"+z.getDate()+"</b> &nbsp;"+givemonth(z.getMonth())+"&nbsp;<b>"+z.getFullYear()+" </b>&nbsp; </td></tr>";
                
                
                //" &nbsp; at &nbsp;"+z.getHours()+":"+z.getMinutes()+" hrs</td></tr>";
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>"
            x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online </td></tr><tr><td align='center' width='100%'>Amount Payable Rs. "+y.rate+"/-</td></tr>"
            x +="<tr><td colspan='2'><hr class='table-hr'></td></tr>"
            
            //x+="<tr><td align='center'>Status</td>";
			//x+="<td class="+y.status+">"+y.status+"</td></tr>";
			/*if(y.status=='REQUESTED')
			{
				//x+="<tr><th></th>";
				x+="<tr><td align='center' colspan='2'><button id='"+p_chat[i]+"'  onclick='acceptChat()' class='change-status-link-a'>ACCEPT</button>&nbsp;<button id='"+p_chat[i]+"' class='change-status-link-d' onclick='declineChat()'>DECLINE</button></td></tr></table>";
			}
			else*/ if(y.status == "STARTED" || y.status == "PAID" || y.status == "FINISHED")
			{
				//x+="<tr><th></th>";
				x += "<tr><td align='center' colspan='2'><button type='button' onclick='window.location=&apos;my-chats.html&apos;;' >CHAT</a><br/></td></tr></table>";
				}
            else if(y.status=='REQUESTED')
                {
                    x += "<tr><td align='center' class='REQUESTED' width='100%'>Payment Awaited</td></tr></table>";
                }
			else
				x += "<tr><td align='center' colspan='2'></td></tr></table>";
		
        x+="</td></tr>";
        return x;
	}
    function highlight_chat_tab()
    {
            $("#tab2").css("color","#0fb180");
            //$("#tab1").css("background-color","white");
            $("#tab2").css("border-bottom","3px solid #0fb180");
            //$("#tab1").addClass("makeGreen");
    }
    function displayContent_desk()
	{
        var out="";
		var count=0;	
            if(p_app == undefined || p_app==null )
            {
                if(user_type=='P')
                    out += "<tr><td align='center'><img src='./assets/images/noappointmentspat.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                else
                    out += "<tr><td align='center'><img src='./assets/images/noappointmentsdoc.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                    
                $('#appointments-table-1').html(out);
            }
            else
                getAppointments_desk();
            if(p_chat == undefined  || p_chat==null )
            {
                if(user_type=='P')
                    out += "<tr><td align='center'><img src='./assets/images/noappointmentspat.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                else
                    out += "<tr><td align='center'><img src='./assets/images/noappointmentsdoc.jpg' width='300vw' height='230vh'/></td></tr></table></td></tr>";
                $('#appointments-table-2').html(out);
            }
            else
                getChats_desk();
        
            if(page_type=="chat")
            {   
                 $('#chatappointmentstab').show();
                 $('#appointmentstab').hide();
                  highlight_chat_tab();
            }
            
        $('#appointments-loading').hide();
        $('#Dashboard').show();
	}
	function getAppointments_desk()
	{
         var x="";     
		 for(var i=p_app.length-1;i>=0;i--)
		 {     
			if(p_app[i]!="head")
			{
				firebase.database().ref('appointments/'+p_app[i]).once('value').then(function(snapshot) {
                    appointmentObject=snapshot.val();
					
				}).then(function()
                {
                    listObjects.push(appointmentObject);
                    if(appointmentObject != null)
                        {
                            if(user_type=='D')
                                x=displayDAppointments_desk(x,appointmentObject);
                            else
                                x=displayPAppointments_desk(x,appointmentObject);
                            $('#appointments-table-1').html(x);
                        }
                }).then(function(){
                    if(user_type=='D')
				    {
					var y=appointmentObject;
					if(y.latitude!=null || y.longitude!=null || y.latitude!=22.580729536394898 || y.longitude!=88.35977554321289 || y.latitude!=0 || y.longitude!=0 )
						showMaps(listObjects);	
                    }
                });;
			}
			
		 }
        
	}
    function getChats_desk()
	{
        var x="";
			for(var i=p_chat.length-1;i>=0;i--)
			{
				if(p_chat[i]!="head")
				{
				firebase.database().ref('text-chat-sessions/'+p_chat[i]).once('value').then(function(snapshot) {
					
					chatObject=snapshot.val();
					
				}).then(function()
                {
                    if(chatObject != null)
                        {
                            if(user_type=='D')
                                x=displayDCAppointments_desk(x,chatObject);
                            else
                                x=displayPCAppointments_desk(x,chatObject);
                            $('#appointments-table-2').html(x);
                        }
                });
				}
			
			}
		
	}
	function displayPAppointments_desk(x,y)
	{
            if(y == null || y==undefined)
                return ;
			var z = new Date(y.timestamp);
			x += "<tr><td width='100%' align='center'><table class='apps-table' width='100%'>";
            if(y.spa_appointment == true)
			     x += "<tr><td align='center' width='100%' class='name-app'>"+y.doctor_name+"</td></tr><tr><td  align='center' width='30%' class='sub-fonts'>Appointment date and time</td></tr><tr><td align='center'>"+changeDateFormat(y.date) +" &nbsp;"+formatAMPMh(y.time)+"&nbsp; - &nbsp;"+formatAMPMh(parseInt(y.time)+2)+" slot</td></tr>";
            else
                x += "<tr><td align='center' width='30%' class='name-app'>Doctor"+y.doctor_name+"</td><tr><td  align='center' width='30%' class='sub-fonts'>Appointment date and time</td></tr><tr><td align='center'>"+changeDateFormat(y.date) +" &nbsp;"+formatAMPMh(y.time)+"&nbsp; - &nbsp;"+formatAMPMh(parseInt(y.time)+2)+" slot</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
            
            x+="<tr><td align='center' class='sub-fonts'>Address</td></tr>";
			x+="<tr><td align='center'>"+getAddress(y.address)+"</td></tr>";
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
        
            x+="<tr><td align='center' class='sub-fonts'>Location</td></tr>";
			x+="<tr><td align='center'>"+y.location+"</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
            if(y.spa_appointment == true)
                {
                    var ser_id = y.service_id;
                    var ser_name = y.service_name;
                    var ser_rate = y.service_rate;
                    var ser="";
                    var ser_tot=0;
                    var ser_num=0;
                    var ser_per_head=y.service_per_head;
                    
                    if(ser_per_head !=undefined)
                        for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]]);
                            ser+="<option>"+ser_name[ser_id[i]]+" Rs. "+parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]])+"/- (Rs."+ser_rate[ser_id[i]]+" x "+ser_per_head[ser_id[i]]+")</option>";
                            
                        }
                    else
                        for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]]);
                            ser+="<option>"+ser_name[ser_id[i]]+" (Rs. "+ser_rate[ser_id[i]]+"/-)</option>";
                        }
                    
                    //ser="<option >"+ser_num+" service(s) (Rs. "+ser_tot+"/-)</option>"+ser;
                    x +="<tr><td align='center' width='50%' class='sub-fonts'>Services:&nbsp;<select class='ser'>"+ser+"</select></td></tr>";
                    x +="<tr><td align='center'>Amount payable:&nbsp;Rs."+ser_tot+"/-</td></tr>";
                }
            else
                {
                    x +="<tr><td align='center' class='sub-fonts'>Service:&nbsp;Home Visit</td></tr><tr><td align='center'>Amount payable:&nbsp;Rs. "+y.service_rate+"/-</td></tr>";
                }
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			
            //x+="<tr><td align='center'>Address</td>";
			//x+="<td>"+y.address+"</td></tr>";
			x+="<tr><td align='center' width='40%' class='sub-fonts'>Booked on &nbsp;"+z.getDate()+"&nbsp;"+givemonth(z.getMonth())+"&nbsp;"+z.getFullYear()+"</td></tr>";
			if(y.status == "REQUESTED" )
			{
                //x+="<tr><td align='center'>Status</td>";
                x+="<tr><td align='center'  class="+y.status+" >"+reFormat(y.status)+"</td></tr>";
                if(y.spa_appointment == true)
				    x+="<tr><td align='center'><button id='"+y.id+"' class='change-status-link-c' onclick='cancelAppointment(&apos;"+y.id+"&apos;,&apos;spa&apos;)'>CANCEL</button></td></tr>";
                else
                    x+="<tr><td align='center'><button id='"+y.id+"' class='change-status-link-c' onclick='cancelAppointment(&apos;"+y.id+"&apos;,&apos;norm&apos;)'>CANCEL</button></td></tr>";
            }
            else if(y.status == "ACCEPTED" )
			{
                //x+="<tr><td align='center'>Status</td>";
                x+="<tr><td align='center'  class="+y.status+" >"+reFormat(y.status)+"</td></tr>";
				x+="<tr><td colspan='3' align='center' width='100%'><button type='button' class='help' onclick='getContact()'>Contact-support</button></td></tr>";
            }
			else
            {
                //x+="<tr><!--td align='center'>Status</td-->";
                x+="<tr><td align='center' class="+y.status+" >"+reFormat(y.status)+"</td></tr>";
				x+="<tr><td><br/></td></tr>";
            }
            
            
				x += "</table>";
            x+="</td></tr>";
        
            return x;
	}
    function displayPCAppointments_desk(x,y)
    {
            if(y==null || y == undefined)
                return ;
			var z = new Date(y.timestamp);
			x+="<tr><td width='100%' align='center'><table class='apps-table' width='100%'>";
			
			x += "<tr><td width='100%' class='name-app' align='center'>"+y.doctor_name+"</td></tr><tr><td width='100%' class='sub-fonts' align='center'>Booked On</td></tr><tr><td align='center' width='100%'><b>"+z.getDate()+"</b>&nbsp;"+givemonth(z.getMonth())+"&nbsp;<b>"+z.getFullYear()+"</b>, at "+formatAMPM(z)+"</td></tr>";
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
            
			if(y.status == "STARTED" || y.status == "PAID")
			{
                x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online</td></tr><tr><td align='center' width='100%'> Amount paid Rs. "+y.rate+"/-</td></tr>";
				x+="<tr>";
				x += "<td align='center' colspan='2'><button type='button' onclick='window.location=&apos;my-chats.html&apos;;'>CHAT</button><br/></td></tr></table>";
				}
			else if(y.status =='ACCEPTED' || y.status == "AWAITING PAYMENT" || y.status == "REQUESTED")
			{
                x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online</td></tr><tr><td align='center' width='100%'> Amount payable Rs. "+y.rate+"/-</td></tr>";
				x+="<tr>";
				x += "<td align='center' colspan='2'><button id='"+y.id+"' class='change-status-link-p'onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>PAY</button></td></tr><tr><td align='center' colspan='2'></td></tr></table>";
				}
            else if(y.status == "FINISHED")
            {
                    x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online</td></tr><tr><td align='center' width='100%'> Amount payable Rs. "+y.rate+"/-</td></tr>";
				x+="<tr>";
				x += "<td align='center' colspan='2'><button id='"+y.id+"' class='change-status-link-p'onclick='showPaymentModal(&apos;"+y.id+"&apos;)'>RESTART</button></td></tr><tr><td align='center' colspan='2'></td></tr></table>";
                }
			/*else if(y.status == "REQUESTED" )
			{
				//x+="<tr><td></td>";
                x +="<tr><td align='center' width='100%' class='sub-fonts'>Service : Consult online</td></tr><tr><td align='center' width='100%'> Amount payable Rs. "+y.rate+"/-</td></tr>";
				x += "<tr><td align='center' width='100%' ><button id='"+y.id+"' class='change-status-link-c' onclick='cancelChat("+y.id+")'>CANCEL</button></td></tr></table>";
				}*/
			else
				x += "</table>";
            x+="</td></tr>";
		    return x;

    }
	function displayDAppointments_desk(x,y)
	{
            if(y==null || y==undefined )
                return;
			var z = new Date(y.timestamp);
            console.log(y);
			x += "<tr><td width='100%' align='center'><table width='100%' class='apps-table' width='100%'><tr><td></td></tr>";
			x+="<tr><td class='name-app' width='100%' align='center'>"+y.patient_name+"</td></tr>";
			x+="<tr><td align='center' class='sub-fonts' width='100%'>Appointment date and time:</td></tr><tr><td align='center'>"+changeDateFormat(y.date) +" &nbsp;  &nbsp;"+formatAMPMh(parseInt(y.time))+"&nbsp; - &nbsp;"+ formatAMPMh(parseInt(y.time)+2)+"</td></tr>";
           
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
            x+="<tr><td align='center' class='sub-fonts'>Address</td></tr>";
			x+="<tr><td align='center' >"+getAddress(y.address)+"</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			
            x+="<tr><td align='center' class='sub-fonts'>Location</td></tr>";
			x+="<tr><td align='center'>"+y.location+"</td></tr>";
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
        
            if(y.spa_appointment == true)
                {
                    var ser_id = y.service_id;
                    var ser_name = y.service_name;
                    var ser_rate = y.service_rate;
                    var ser_tot=0;
                    var ser="";
                    var ser_num=0;
                    var ser_per_head=y.service_per_head;
                    
                    if(ser_per_head !=undefined)
                        for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]]);
                            ser+="<option>"+ser_name[ser_id[i]]+" Rs. "+parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]])+"/- (Rs."+ser_rate[ser_id[i]]+" x "+ser_per_head[ser_id[i]]+")</option>";
                            
                        }
                    else
                        for(i in ser_id)
                        {
                            ser_num++;
                            ser_tot+=parseInt(ser_rate[ser_id[i]]);
                            ser+="<option >"+ser_name[ser_id[i]]+" (Rs. "+ser_rate[ser_id[i]]+"/-)</option>";
                        }
                    
                    //ser="<option >"+ser_num+" service(s) (Rs. "+ser_tot+"/-)</option>"+ser;  
                    x +="<tr><td align='center' class='sub-fonts'>Services:&nbsp;<select class='ser'>"+ser+"</select></td></tr>";
                    x+="<tr><td align='center'>Amount payable:Rs."+ser_tot+"/-</td></tr>";
                }
            else
                {
                    x +="<tr><td align='center' class='sub-fonts'>Service : &nbsp; Home Visit</td></tr>";
                    x+="<tr><td align='center'>Amount payable:Rs."+y.service_rate+"/-</td></tr>";
                }
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>";
			x+="<tr><td align='center' class='sub-fonts' width='100%'>Booked on&nbsp;"+z.getDate()+"&nbsp;"+givemonth(z.getMonth())+"&nbsp;"+z.getFullYear()+"</td></tr>";
			
			if(y.latitude==null || y.longitude==null || y.latitude==22.580729536394898 || y.longitude==88.35977554321289 || y.latitude==0 || y.longitude==0 )
			{
				x+= "<tr><td></td></tr>";
			}
			else
			{
				var l1= encodeURI(y.latitude);
				var l2= encodeURI(y.longitude);
                latitude=l1;
                longitude=l2;
				
                x+="<tr><td align='center'><div id='modalmap-"+y.id+"' class='map-view' onclick=mapModal('"+latitude+"','"+longitude+"','modalmap')></div></td></tr>";
				x+="<tr><td class='sub-fonts' align='center' >Click on Map to View</td></tr>";
				//showMaps(listObjects);
			}
			//x+="<tr><th>Status</th>";
			x+="<tr><td align='center' class="+y.status+">"+reFormat(y.status)+"</td></tr>";
			if(y.status=='REQUESTED')
			{
				x+="<tr><td align='center'><button id='"+y.id+"' onclick='acceptAppointment(&apos;"+y.id+"&apos;)'>ACCEPT</button>&nbsp;<button id='"+y.id+"'  onclick='declineAppointment(&apos;"+y.id+"&apos;)'>DECLINE</button></td></tr></table>";
			}
			else
			{
				x +="<tr><td></td></tr></table>";
			}
		      x+="</td></tr>";
		return x;
	}
	function displayDCAppointments_desk(x,y)
    {
            if(y==null || y==undefined)
                return;
			var z = new Date(y.timestamp);
			x += "<tr><td width='100%' align='center'><table class='apps-table' width='100%'>";
			x += "<tr><td class='name-app' width='100%' align='center'>"+y.patient_name+"</td></tr><tr><td class='sub-fonts' align='center' width='100%'>Booked on </td></tr><tr><td align='center' width='100%'><b>"+z.getDate()+"</b>&nbsp;"+givemonth(z.getMonth())+"&nbsp;<b>"+z.getFullYear()+" </b></td></tr>";
            
            x +="<tr><td colspan='3'><hr class='table-hr'></td></tr>"
            x +="<tr><td align='center' width='100%' class='sub-fonts'>Services : Consult online</td></tr><tr><td align='center' width='100%'> Amount payable Rs. "+y.rate+"/-</td></tr>"
            //x +="<tr><td colspan='2'><hr class='table-hr'></td></tr>"
            
            //x+="<tr><td align='center'>Status</td>";
            /*if(y.status=='REQUESTED')
                x+="<td class="+y.status+">PAYMENT AWAITED</td></tr>";
            else*/
			   // x+="<td class="+y.status+">"+y.status+"</td></tr>";
			/*if(y.status=='REQUESTED')
			{
				
				x+="<tr><td align='center' colspan='2'><button id='"+y.id+"'  onclick='acceptChat()' class='change-status-link-a'>ACCEPT</button>&nbsp;<button id='"+y.id+"' class='change-status-link-d' onclick='declineChat()'>DECLINE</button></td></tr></table>";
			}
			else*/ 
            if(y.status == "STARTED" || y.status == "FINISHED" || y.status == "PAID")
            {
				x +="<tr><td align='center' width='100%'><button type='button' onclick='window.location=&apos;my-chats.html&apos;'>CHAT</button><br/></td></tr></table>";
            }
			else if(y.status == 'REQUESTED')
            {
				x += "<tr><td align='center' width='100%' class='REQUESTED'>Payment Awaited</td></tr></table>";
            }
			else
				x += "<tr><td align='center' colspan='2'></td></tr></table>";
		
            x+="</td></tr>";
            return x;
        
    }
	function displayTab1()
	{
        var pathname = window.location.pathname; 
		$('#appointmentstab').show();
        $('#chatappointmentstab').hide();
        /*if(pathname.includes('mobile')==true)
            {*/
                $("#tab1").css("color","#0fb180");
                $("#tab1").css("border-bottom","3px solid #0fb180");
                $("#tab2").css("color","black");
                $("#tab2").css("border-bottom","none");
            //}
        /*else
            {
                $("#tab1").css("background-color","#0fb180");
                $("#tab2").css("background-color","white");
                $("#tab1").css('color',"white");
                $("#tab2").css('color',"black");
            }*/
        resetHomeNotification();
		$('#home-notification-icon').hide();
        var obj = { Title: "Careist | User Appointments", Url: "my-appointments.html" };
        history.pushState(obj, obj.Title, obj.Url);
        
        
	}
	function displayTab2()
	{
        var pathname = window.location.pathname; 
		$('#appointmentstab').hide();
        $('#chatappointmentstab').show();
        /*if(pathname.includes('mobile')==true)
            {*/
                $("#tab2").css("color","#0fb180");
                $("#tab2").css("border-bottom","3px solid #0fb180");
                $("#tab1").css("color","black");
                $("#tab1").css("border-bottom","none");
            //}
        /*else
            {
                $("#tab2").css("background-color","#0fb180");
                $("#tab1").css("background-color","white");
                $("#tab2").css('color',"white");
                $("#tab1").css('color',"black");  
            }*/
        resetChatNotification();
		$('#chat-notification-icon').hide();
        var obj = { Title: "Careist | User Appointments", Url: "my-appointments.html?=chat" };
        history.pushState(obj, obj.Title, obj.Url);
	}
	function showMaps(list)
	{
		for(i in list)
            {
                var y=list[i];
                if(y.latitude!=0 )//|| y.latitude!=22.580729536394898 || y.latitude!=null)
                        myMap(list[i].latitude,list[i].longitude,'modalmap-'+list[i].id);
			         
            }
	}  
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
			$("#location-new").html(output);
		});
	}	
	function changeDateFormat(d)
	{
        var datearr=d.split('-');
		var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
		var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var longdate=new Date(datearr[2]+"-"+datearr[1]+"-"+datearr[0]);
		return days[longdate.getDay()]+"&nbsp; <b>"+datearr[0]+"</b>&nbsp; "+month[longdate.getMonth()]+"&nbsp;"+datearr[2]+",";
	}
	function reFormat(st)
	{
		st=st.toLowerCase();
		st=st.charAt(0).toUpperCase()+st.substr(1);
		return st;
	}
	function givemonth(month)
	{
		var montharr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		return montharr[month];
	}
	function getAddress(addr)
	{
        var addarr=addr.split(';');
		return addarr[0]+','+addarr[2];
	}
    function formatAMPM(date)
    {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = ('0'+minutes).slice(-2);
        var strTime = '<b>'+hours + ':' + minutes + '</b> ' + ampm;
        return strTime;
    }
    function formatAMPMh(hours)
    {
        /*var hours = date.getHours();
        var minutes = date.getMinutes();*/
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        //minutes = ('0'+minutes).slice(-2);
        var strTime = '<b>'+hours + ':00</b> ' + ampm;
        return strTime;
    }
	function displayActionModal(x)
	{
		var modal = document.getElementById('actionModal');
		var span = document.getElementsByClassName("close")[2];
		selected_appointment_type = x;
		appointmentID = event.target.id;		
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
	function calfinalamt(appinfo)
    {
        //console.log(appinfo.spa_appointment);//REQUESTED
        
        if(appinfo.spa_appointment == true)
                {
                    var ser_per_head= appinfo.service_per_head;
                    var ser_id = appinfo.service_id;
                    var ser_rate = appinfo.service_rate;
                    var ser_tot=0;
                    if(ser_per_head !=undefined)
                        for(i in ser_id)
                        {
                            
                            ser_tot+=parseInt(ser_rate[ser_id[i]])*parseInt(ser_per_head[ser_id[i]]);
                            
                        }
                    else
                        for(i in ser_id)
                        {
                            
                            ser_tot+=parseInt(ser_rate[ser_id[i]]);
                
                        }
                    console.log(ser_tot);
                    return ser_tot;
                    
                }
        else
                {
                    return appinfo.service_rate;
                }
    }
    function formatAMPMh_msg(hours)
    {
        /*var hours = date.getHours();
        var minutes = date.getMinutes();*/
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        //minutes = ('0'+minutes).slice(-2);
        var strTime = hours+':00 '+  ampm;
        return strTime;
    }
	function cancelAppointment(x)
	{
		//var e = event || window.event;
		appointmentID = x;//e.target.id;
		console.log(appointmentID);
		var num, name, num1,appinfo;
		var updates = {};
        firebase.database().ref('appointments/'+appointmentID).once('value').then(function(snapshot) {
			appinfo=snapshot.val();
			name = snapshot.val().patient_name;
			num = snapshot.val().doctor_contact;
		}).then(function(){
		    var d = new Date();
		    var n = d.getTime();
			var action = 'Accept';
			updates['appointments/'+appointmentID+'/status/'] = "CANCELLED";
            if(appinfo.spa_appointment==false)
                {
                    updates['admin/appointments/'+appointmentID+'/status/'] = "CANCELLED";
                    updates['admin/appointments/'+appointmentID+'/timestamp/'] = n;
                    //console.log('not spa');
                }
                
            else
                {
                    updates['admin/spa_appointments/'+appointmentID+'/status/'] = "CANCELLED";
                    updates['admin/spa_appointments/'+appointmentID+'/timestamp/'] = n;
                    //console.log('spa');
                }
			firebase.database().ref().update(updates).then(function(){
								
                var msg = 'The appointment request sent earlier has been cancelled unfortunately by '+name+'. We will update you when there is a new appointment request. You can check the status of all your appointments here: https://tx.gl/r/1OFV/#AdvdTrack#';
				/*var msg = 'The appointment request sent earlier has been cancelled unfortunately by '+name+'. We will update you when there is a new appointment request. You can check the status of all your appointments in the Careist Dashboard: https://tx.gl/r/1Esl/#AdvdTrack#';*/
				msg = encodeURI(msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
                        location.reload(true);
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
                        location.reload(true);
					}
				
                });
                //location.reload(true);
            });
        });
	}            
	function acceptAppointment(x)
	{
		//var e = event || window.event;
		appointmentID =x;// e.target.id;
		//console.log(appointmentID);
		var num, name, num1,appinfo,amt;
        var updates = {};
		firebase.database().ref('appointments/'+appointmentID).once('value').then(function(snapshot) {
            appinfo=snapshot.val();
			num = snapshot.val().patient_contact;
			name = snapshot.val().doctor_name;
			num1 = snapshot.val().doctor_contact;
		}).then(function(){
            amt=calfinalamt(appinfo);
            var d = new Date();
		    var n = d.getTime();
            updates['appointments/'+appointmentID+'/status/'] = "ACCEPTED";
            if(appinfo.spa_appointment==false)
                {
                    updates['admin/appointments/'+appointmentID+'/status/'] = "ACCEPTED";
                    updates['admin/appointments/'+appointmentID+'/timestamp/'] = n;
                }
                
            else
                {
                    updates['admin/spa_appointments/'+appointmentID+'/status/'] = "ACCEPTED";
                    updates['admin/spa_appointments/'+appointmentID+'/timestamp/'] = n;
                }
                
			firebase.database().ref().update(updates).then(function(){
				
				/*var msg = 'Hello '+appinfo.patient_name+', your appointment for '+appinfo.date+', '+formatAMPMh_msg(appinfo.time)+' with '+appinfo.doctor_name+' ( '+appinfo.doctor_contact+' ) has been accepted. Amount payable Rs.'+amt+'. To view status of your appointment: https://tx.gl/r/1OFV/#AdvdTrack# Call 7605837667 for help.';*/
                var msg='Hello '+appinfo.patient_name+', your appointment for '+appinfo.date+', '+formatAMPMh_msg(appinfo.time)+' with '+appinfo.doctor_name+' ( '+appinfo.doctor_contact+' ) has been accepted. Amount payable Rs. '+amt+'. To view status of your appointment: https://tx.gl/r/1OFV/#AdvdTrack# Call 7605837667 for help.';
                
                var doc_msg='Hello '+appinfo.doctor_name+', thank you for accepting the request of '+appinfo.patient_name+' for '+appinfo.date+', '+formatAMPMh_msg(appinfo.time)+'. Call 7605837667 for any assistance.';
                
                console.log(msg);
				msg = encodeURI(msg);
				doc_msg = encodeURI(doc_msg);
                console.log(msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
                        location.reload(true);
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
                        location.reload(true);
					}
				});
                
                $.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num1,
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
                        location.reload(true);
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
                        location.reload(true);
					}
				});
            });
        });
    }
	function declineAppointment(x)
	{
        //var e = event || window.event;
		appointmentID =x;// e.target.id;;
		console.log(appointmentID);
		var num, name,appinfo;
        var updates = {};
		firebase.database().ref('appointments/'+appointmentID).once('value').then(function(snapshot) {
            appinfo=snapshot.val();
			num = snapshot.val().patient_contact;
			name = snapshot.val().doctor_name;
		}).then(function(){
            var d = new Date();
		    var n = d.getTime();
			var action = 'Decline';
			updates['appointments/'+appointmentID+'/status/'] = "DECLINED";
            if(appinfo.spa_appointment==false)
                {
                    updates['admin/appointments/'+appointmentID+'/status/'] = "DECLINED";
                    updates['admin/appointments/'+appointmentID+'/timestamp/'] = n;
                }
                
            else
                {
                    updates['admin/spa_appointments/'+appointmentID+'/status/'] = "DECLINED";
                    updates['admin/spa_appointments/'+appointmentID+'/timestamp/'] = n;
                }
                
			firebase.database().ref().update(updates).then(function(){
				
                var msg = 'We regret to inform you that '+name+' is not available to attend the appointment. Please call us for booking assitance at 7605837667 for a new service provider. To view status: https://tx.gl/r/1OFV/#AdvdTrack#';
				/*var msg = 'We regret to inform you that '+name+' is not available to attend the appointment. Please try booking a different healthcare provider through careist. Visit your dashboard to view the status of all your appointments: https://tx.gl/r/1Esl/#AdvdTrack#';*/
				msg = encodeURI(msg);
				
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
                        location.reload(true);
					},
					error: function(jqXHR, status){
						// Error code
						console.log("error: "+jqXHR);
                        location.reload(true);
					}
                });
            });
        });
    }
	function cancelChat(x)
	{
        //var e = event || window.event;
		appointmentID =x;// e.target.id;
		console.log("X: "+appointmentID);
		var num, name, num1;
		firebase.database().ref('text-chat-sessions/'+appointmentID).once('value').then(function(snapshot) {
			
			name = snapshot.val().patient_name;
			num = snapshot.val().doctor_contact;
		});
		var updates = {};
		var action = 'Cancel';
		updates['text-chat-sessions/'+appointmentID+'/status/'] = "CANCELLED";
		firebase.database().ref().update(updates).then(function(){
					
				var msg = 'Online consultancy request from '+name+' has been cancelled by the user. Please check your dashboard to view the status of all your appointments. https://tx.gl/r/1Esl/#AdvdTrack#';
				msg = encodeURI(msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
		location.reload(true);
	});
}
	function acceptChat(x)
	{
		//var e = event || window.event;
		appointmentID =x;// e.target.id;
		console.log("X: "+appointmentID);
		var num, name, num1;
		firebase.database().ref('text-chat-sessions/'+appointmentID).once('value').then(function(snapshot) {
			console.log(snapshot.val());
			name = snapshot.val().doctor_name;
			num = snapshot.val().patient_contact;
		});
		var updates = {};
		var action = 'Accept';
		updates['text-chat-sessions/'+appointmentID+'/status/'] = "ACCEPTED";
		firebase.database().ref().update(updates).then(function(){
				var msg = 'Your appointment for online consultancy with '+name+' has been accepted. Please check your dashboard to pay and proceed. Thank you! https://tx.gl/r/1Esl/#AdvdTrack#';
				msg = encodeURI(msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
		location.reload(true);
	});
}
	function declineChat(x)
	{
		//var e = event || window.event;
		appointmentID =x;// e.target.id;
		console.log("X: "+appointmentID);
		var num, name, num1;
		firebase.database().ref('text-chat-sessions/'+appointmentID).once('value').then(function(snapshot) {
			
			name = snapshot.val().doctor_name;
			num = snapshot.val().patient_contact;
		});
		var updates = {};
		var action = 'Decline';
		updates['text-chat-sessions/'+appointmentID+'/status/'] = "DECLINED";
		firebase.database().ref().update(updates).then(function(){
			var msg = name+' is unavailable to accept the online consultancy request. Please check your dashboard to view the status of your appointment or book a new one. Thank you! https://tx.gl/r/1Esl/#AdvdTrack#';
				msg = encodeURI(msg);
				$.ajax({
					url: "https://api.textlocal.in/send/",
					type: "POST",
					data: 
					{
						'username': "careist7@gmail.com",
						'hash': "66bfadccf41334cc913f4896161ae62478cfa16e",
						'numbers': num,
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
		location.reload(true);
	});
}
	/*function resetNotification(id)
	{
		var updates = {};
		updates['users/'+id+'/new_notification'] = false;
		firebase.database().ref().update(updates);
	}*/
    function resetHomeNotification()
	{
        notifications[0]="false";
		var updates = {};
		updates['users/'+uid+'/new_notification'] = notifications[0]+"%n"+notifications[1];
        $('#home-notification-icon').hide();
        firebase.database().ref().update(updates);
	}
    function resetChatNotification()
	{
        notifications[1]="false";
		var updates = {};
		updates['users/'+uid+'/new_notification'] = notifications[0]+"%n"+notifications[1];
            $('#chat-notification-icon').hide();
        firebase.database().ref().update(updates);
	}
	function displayNotificationImage(x)
	{
        firebase.database().ref('users/'+x+'/new_notification').on('value', function(snapshot) 
		{
			var flag = snapshot.val();
			//console.log("displaynotifications",flag);
			if(flag == true)
			{
				$('#notification-image').show();
                notifications=["false","false"];
			}
			else if(flag == false)
			{
				$('#notification-image').hide();
                notifications=["false","false"];
			}
            else if(flag!=true || flag!=false || flag==null || flag==undefined)
                {
                 
                    notifications=flag.trim().split('%n');
                    //console.log("display_noti2",notifications);
                    if(notifications[0]=="true")
                        $('#home-notification-icon').show();
                    else
                        $('#home-notification-icon').hide();
                    
                    if(notifications[1]=="true")
                        $('#chat-notification-icon').show();
                        
                    else
                        $('#chat-notification-icon').hide();   
                }
		});
	}
	function showPaymentModal(x)
	{
		//var e = event || window.event;
		appointmentID =x; //e.target.id;
		console.log("X: "+appointmentID);
		
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
				"email": p_email,
				"contact": p_mobile
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
			/*e.preventDefault();
			var modal = document.getElementById('paymentModal');
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
		}	*/
			
		});
		
	}
	function succesfulRazorPayPayment(payment_id, amount, sessionID)
	{
		//console.log(payment_id);
		//console.log(sessionID);
		var doc_num, doc_name, pat_num, pat_name, num1;
		firebase.database().ref('text-chat-sessions/'+sessionID).once('value').then(function(snapshot) {
			
			pat_name = snapshot.val().patient_name;
			doc_num = snapshot.val().doctor_contact;
            doc_name = snapshot.val().doctor_name;
			pat_num = snapshot.val().patient_contact;
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
            location.reload(true);
		});
	}
	$('#offers-link').click(function(){
		createModal("Coming Soon!");
	});
	
    function myMap(latitude,longitude,mapid) 
	{
        //console.log("myMap",latitude,longitude,mapid);
		var myCenter = new google.maps.LatLng(latitude,longitude);
        
		var mapCanvas = document.getElementById(mapid);
		var mapProp = {center: myCenter, zoom: 12};
		var map = new google.maps.Map(mapCanvas, mapProp);
		var marker = new google.maps.Marker({position:myCenter});
        marker.setMap(map);
    }
    function mapModal(lati,longi)
	{
		var modal = document.getElementById('mapModal');
		var span = document.getElementsByClassName("close")[6];
        var myCenter = new google.maps.LatLng(lati,longi);
        var pageURL = $(location).attr("href");
        if(pageURL.includes('mobile'))
        {
            $('#Dashboard').hide();
        }
		modal.style.display = "block";
        myMap(lati,longi,'modalmap');
        //google.maps.event.trigger(map, "resize");
        var mapProp = {center: myCenter, zoom: 12};
        var marker = new google.maps.Marker({position:myCenter});
        //marker.setMap(map);
		span.onclick = function() {
			modal.style.display = "none";
			$('#Dashboard').show();
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				$('#Dashboard').show();
			}
		}
	}	
    function errorModal(txt)
	{
		var modal = document.getElementById('errorModal');
		var span = document.getElementsByClassName("close")[5];
		
		$('#error-modal-body').html("<br><br><h4>"+txt+"</h4><br><br>")
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			window.location ='index.html';
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				window.location ='index.html';
			}
		}
	}
	/*$(document).on('click','.help',function(){
		var modal = document.getElementById('contactUsModal');
		var span = document.getElementsByClassName("close")[4];
		console.log('contactus');
				
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
	});*/

    function getContact(){
		var modal = document.getElementById('contactUsModal');
		var span = document.getElementsByClassName("close")[4];
		console.log('getContact',modal);
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
