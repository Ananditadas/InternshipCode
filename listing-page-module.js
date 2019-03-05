	
    var doctor_objects, doctor_ids, doctor_names, doctor_exp, doctor_min, doctor_max, doctor_rate_score, doctor_rate_total, doctor_spec, doctor_loc, doctor_deg, doctor_days, doctor_times, doctor_dp, doctor_av, doctor_ser, doctor_rate, doctor_prof, doctor_mobiles, doctor_emails,doctor_location_boolean;
    var doctors = new Array();
    var locations, location_filter, location_objects;
    var day_filter, time_filter, fee_filter;
    var range_max, range_min;
    var doctor_stypes;
    var rating;
    var locations, location_filter, location_objects;
    var day_filter, time_filter, fee_filter;
    var range_max, range_min;
    var uid, DID, doctor_name, patient_name, patient, doctor, patient_email, doctor_email, patient_mobile, doctor_mobile;
    var pat_noti,doc_noti;
    var selected_location, selected_speciality;
    var SearchString ;

    function createVisitApp(x)
	{
			window.location ='book-appointment.html?d='+doctors[x][0]+'&s=99';
	}
	function checkTime(x,y)
	{
		for(var i in time_filter)
		{
			if(((x>=6 && x<10) || (y>6 &&y<=10) || (x<6 && y>10) || (x>y && y>=10))  &&  time_filter[i]=='M')
				return true;
			else if(((x>=10 && x<14) || (y>10 &&y<=14) || (x<10 && y>14) || (x>y && y>=14))  &&  time_filter[i]=='D')
				return true;
			else if(((x>=14 && x<18) || (y>14 &&y<=18) || (x<14 && y>18)|| (x>y && y>=18))  &&  time_filter[i]=='E')
				return true;
			else if(((x>=18 && x<22) || (y>18 &&y<=22) || (x<18 && y>22) || (x>y && y>=22))  &&  time_filter[i]=='N')
				return true;
			else if(((x>=22 || x<2) || (y>22 ||y<=2) || (x<22 && y>2 && x>y))  &&  time_filter[i]=='LN')
				return true;
			else if(((x>=2 && x<6) || (y>2 &&y<=6) || (x<2 && y>6) || (x>y && y>=6))  &&  time_filter[i]=='EM')
				return true;
		}
		return false;
	}
	
    function checkDay(x)
	{
		for(var i in day_filter)
		{
			for(var j in x)
			{
				if(day_filter[i]==x[j])
					return true;
			}
		}
		return false;
	}
	
	function checkLoc(x)
	{
		for(var i in location_filter)
		{
			for(var j in x)
			{
				if(location_filter[i]==x[j])
					return true;
			}
		}
		return false;
	}
	
	function checkDayTime(X)
	{
		for(var i in day_filter)
		{
			for(var j in time_filter)
			{
				for(var k in X[0])
				{
					if(((X[1]>=6 && X[1]<10) || (X[2]>6 && X[2]<=10) || (X[1]<6 && X[2]>10) || (X[1]>X[2] && X[2]>=10))  &&  time_filter[j]=='M' && day_filter[i]==X[0][k])
						return true;
					else if(((X[1]>=10 && X[1]<14) || (X[2]>10 &&X[2]<=14) || (X[1]<10 && X[2]>14) || (X[1]>X[2] && X[2]>=14))  &&  time_filter[j]=='D' && day_filter[i]==X[0][k])
						return true;
					else if(((X[1]>=14 && X[1]<18) || (X[2]>14 &&X[2]<=18) || (X[1]<14 && X[2]>18)|| (X[1]>X[2] && X[2]>=18))  &&  time_filter[j]=='E' && day_filter[i]==X[0][k])
						return true;
					else if(((X[1]>=18 && X[1]<22) || (X[2]>18 &&X[2]<=22) || (X[1]<18 && X[2]>22) || (X[1]>X[2] && X[2]>=22))  &&  time_filter[j]=='N' && day_filter[i]==X[0][k])
						return true;
					else if( ((X[1]>=22 || X[1]<2) || (X[2]>22 ||X[2]<=2) || (X[1]<22 && X[2]>2 && X[1]>X[2] )) &&  time_filter[j]=='LN' && day_filter[i]==X[0][k])
						return true;
					else if(((X[1]>=2 && X[1]<6) || (X[2]>2 &&X[2]<=6) || (X[1]<2 && X[2]>6) || (X[1]>X[2] && X[2]>=6))  &&  time_filter[j]=='EM' && day_filter[i]==X[0][k])
						return true;
				}
			}
		}
		return false;		
	}
	
	function checkLocTime(X)
	{
		for(var i in location_filter)
		{
			for(var j in time_filter)
			{
				for(var k in X[3])
				{
					if(((X[1]>=6 && X[1]<10) || (X[2]>6 && X[2]<=10) || (X[1]<6 && X[2]>10) || (X[1]>X[2] && X[2]>=10))  &&  time_filter[j]=='M' && location_filter[i]==X[3][k])
						return true;
					else if(((X[1]>=10 && X[1]<14) || (X[2]>10 &&X[2]<=14) || (X[1]<10 && X[2]>14) || (X[1]>X[2] && X[2]>=14))  &&  time_filter[j]=='D' && location_filter[i]==X[3][k])
						return true;
					else if(((X[1]>=14 && X[1]<18) || (X[2]>14 &&X[2]<=18) || (X[1]<14 && X[2]>18)|| (X[1]>X[2] && X[2]>=18))  &&  time_filter[j]=='E' && location_filter[i]==X[3][k])
						return true;
					else if(((X[1]>=18 && X[1]<22) || (X[2]>18 &&X[2]<=22) || (X[1]<18 && X[2]>22) || (X[1]>X[2] && X[2]>=22))  &&  time_filter[j]=='N' && location_filter[i]==X[3][k])
						return true;
					else if(((X[1]>=22 || X[1]<2) || (X[2]>22 ||X[2]<=2) || (X[1]>X[2] && X[1]<22 && X[2]>2))  &&  time_filter[j]=='LN' && location_filter[i]==X[3][k])
						return true;
					else if(((X[1]>=2 && X[1]<6) || (X[2]>2 &&X[2]<=6) || (X[1]<2 && X[2]>6) || (X[1]>X[2] && X[2]>=6))  &&  time_filter[j]=='EM' && location_filter[i]==X[3][k])
						return true;
				}
			}
		}
		return false;		
	}
	
	function checkDayLoc(X)
	{
		for(var i in location_filter)
		{
			for(var j in day_filter)
			{
				for(var k in X[3])
				{
					for(var l in X[0])
					{
						if(X[3][k]==location_filter[i] && X[0][l]==day_filter[j])
							return true;
					}
				}
			}
		}
		return false;		
	}
	
	function checkDayLocTime(X)
	{
		for(var i in location_filter)
		{
			for(var j in time_filter)
			{
				for(var k in day_filter)
				{
					for(var l in X[3])
					{
						for(var m in X[0])
						{
							
							if(((X[1]>=6 && X[1]<10) || (X[2]>6 && X[2]<=10) || (X[1]<6 && X[2]>10) || (X[1]>X[2] && X[2]>=10))  &&  time_filter[j]=='M' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
							else if(((X[1]>=10 && X[1]<14) || (X[2]>10 &&X[2]<=14) || (X[1]<10 && X[2]>14) || (X[1]>X[2] && X[2]>=14))  &&  time_filter[j]=='D' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
							else if(((X[1]>=14 && X[1]<18) || (X[2]>14 &&X[2]<=18) || (X[1]<14 && X[2]>18)|| (X[1]>X[2] && X[2]>=18))  &&  time_filter[j]=='E' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
							else if(((X[1]>=18 && X[1]<22) || (X[2]>18 &&X[2]<=22) || (X[1]<18 && X[2]>22) || (X[1]>X[2] && X[2]>=22))  &&  time_filter[j]=='N' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
							else if(((X[1]>=22 || X[1]<2) || (X[2]>22 ||X[2]<=2) || (X[1]>X[2] && X[1]<22 && X[2]>2))  &&  time_filter[j]=='LN' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
							else if(((X[1]>=2 && X[1]<6) || (X[2]>2 &&X[2]<=6) || (X[1]<2 && X[2]>6) || (X[1]>X[2] && X[2]>=6))  &&  time_filter[j]=='EM' && location_filter[i]==X[3][l] && X[0][m]==day_filter[k])
								return true;
						}
					}
				}
			}
		}
		return false;		
	}
	function sortDocs(x)
	{	
		if(x=="exp")
		{
			doctors.sort(sortFunctionA);
			function sortFunctionA(doctors, b)
			{
				if (doctors[2] === b[2]) {
					return 0;
				}
				else {
					return (parseInt(doctors[2]) > parseInt(b[2])) ? -1 : 1;
				}
			}
			displayDoctors();
		}
		
		/*else if (x=="rating")
		{
			doctors.sort(sortFunctionB);
			function sortFunctionB(doctors, b)
			{
				if (doctors[7] === b[7]) {
					return 0;
				}
				else {
					return (parseInt(doctors[7]) > parseInt(b[7])) ? -1 : 1;
				}
			}
			displayDoctors();
		}*/
		else if (x=="minfee")
		{     
			doctors.sort(sortFunctionC);
			function sortFunctionC(doctors, b)
			{console.log(b[19]);
               
				if (doctors[19] === b[19]) {
					return 0;
				}
				else {
					return (parseInt(doctors[19]) > parseInt(b[19])) ? 1 : -1;
				}
			}
			displayDoctors();
		}
		else if (x=="maxfee")
		{
			doctors.sort(sortFunctionD);
			function sortFunctionD(doctors, b)
			{
				if (doctors[20] === b[20]) {
					return 0;
				}
				else {
					return (parseInt(doctors[20]) > parseInt(b[20])) ? -1 : 1;
				}
			}
			displayDoctors();
		}
        else if(x=="rel")
        {
            doctors=doctors1.slice(0);
            displayDoctors();    
        }
		
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
        
        if(sent_notification==true || sent_notification==false)
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
			window.location ='my-appointments.html';
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				window.location ='my-appointments.html';
			}
		}
	}
	$('#offers-link').click(function(){
		createModal("Coming Soon!");
	});
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
    /*$('#header-user-name').click(function(event)
	{	
		event.preventDefault();
		console.log("here");
		
		$('#profile-button').toggle();
		
	});*/
	$('#contact-us-link').click(function(){
		var modal = document.getElementById('contactUsModal');
		var span = document.getElementsByClassName("close")[4];
		
				
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
	});
	function errorModal(txt)
	{
		var modal = document.getElementById('errorModal');
		var span = document.getElementsByClassName("close")[5];
		
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
    
    $(document).on('click','#search-filter',function(){
		var modal = document.getElementById('filterModal');
		var span = document.getElementsByClassName("filter-close")[0];
		$('#content-body').hide();
        modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
            $('#content-body').show();
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
                $('#content-body').show();
			}
		}
		
	});
	
	$(document).on('click','#location-filter',function(){
		var modal = document.getElementById('locationModal');
		var span = document.getElementsByClassName("filter-close")[1];
		$('#content-body').hide();
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
            $('#content-body').show();
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
                $('#content-body').show();
			}
		}
		
	});
	
	$(document).on('click','.filter-button',function(event)
	{
       
        $('#filterModal').hide();
        $('#locationModal').hide();
        $('#content-body').show();
		event.preventDefault();
		location_filter = new Array();
		day_filter = new Array();
		time_filter = new Array();
		fee_filter = new Array();
        locations = [
"Ahiritola",
"Alipore",
"Bagbazar",
"Baghajatin", 
"Baguiati",
"Ballygunge", 
"Bangur", 
"Baranagar", 					
"Barabazar", 
"Barisha", 
"Bediapara", 
"Behala Chowrasta",
"Behala" ,
"Belgachia", 
"Beliaghata", 
"Beniatala" ,
"Bhawanipore", 
"Boral" ,
"Bowbazar", 
"Brahmapur", 
"Central" ,
"Chandni Chowk",
"Chetla" ,
"Chitpur" ,
"College Street",
"Cossipore" ,
"Deshapriya Park",
"Dhakuria" ,
"Dharmatala", 
"Dumdum Cantonment",
"Dumdum" ,
"Dunlop" ,
"Entally" ,
"Garden Reach",
"Garfa" ,
"Garia" ,
"Gariahat", 
"Girish Park",
"Goa Bagan",
"Gobra" ,
"Golf Green",
"Golpark" ,
"Haltu" ,
"Haridevpur", 
"Hastings" ,
"Hazra" ,
"Hedua" ,
"Howrah" ,
"Jadavpur" ,
"Jodhpur Park - Selimpur",
"Joka" ,
"Kalighat", 
"Kalikapur", 
"Kamdahari" ,
"Kankurgachi", 
"Kasba" ,
"Kestopur", 
"Khidirpur", 
"Kudghat" ,
"Kumartuli", 
"Lake Gardens",
"Lake Town",
"Machua Bazar",
"Madurdaha" ,
"Mahestala" ,
"Maniktala" ,
"Maidan" ,
"Mallikbazar", 
"Manikpore" ,
"Metiabruz" ,
"Mominpur" ,
"Mukundapur", 
"Nagerbazar" ,
"Naktala" ,
"Narendrapur", 
"Narkeldanga" ,
"Nayabad" ,
"Nazirabad", 
"Netaji Nagar" ,
"New Alipore" ,
"New Garia" ,
"New Town Action Area 1" ,
"New Town Action Area 2" ,
"New Town Action Area 3" ,
"Noapara" ,
"Paikpara" ,
"Pailan" ,
"Park Circus" ,
"Park Street" ,
"Parnasree Pally" ,
"Parui Mazua" ,
"Patipukur" ,
"Patuli" ,
"Phoolbagan", 
"Picnic Gardens",
"Rabindra Sadan", 
"Sakherbazar" ,
"Salt Lake Sector 1" ,
"Salt Lake Sector 2" ,
"Salt Lake Sector 3" ,
"Salt Lake Sector 5" ,
"Santoshpur" ,
"Sarat Bose Road" ,
"Sarsuna" ,
"Sealdah" ,
"Shyambazar", 
"Sinthee" ,
"Southern Avenue" ,
"Sovabazar" ,
"Subhash Nagar" ,
"Sutanuti" ,
"Tala" ,
"Taltala", 
"Tangra" ,
"Taratala" ,
"Teghoria" ,
"Tiljala" ,
"Tollygunge", 
"Topsia" ,
"Ultadanga", 
"VIP Bypass" 
];
            
		for (var i=0; i<locations.length; i++)
		{
           
			var x = document.getElementById(locations[i]);
			if (x.checked)
			{
				location_filter.push(locations[i]);
                
			}
		}

		if((document.getElementById("sun")).checked)
		{
			day_filter.push('Sun');
		}
		if((document.getElementById("mon")).checked)
		{
			day_filter.push('Mon');
		}
		if((document.getElementById("tue")).checked)
		{
			day_filter.push('Tue');
		}
		if((document.getElementById("wed")).checked)
		{
			day_filter.push('Wed');
		}
		if((document.getElementById("thu")).checked)
		{
			day_filter.push('Thu');
		}
		if((document.getElementById("fri")).checked)
		{
			day_filter.push('Fri');
		}
		if((document.getElementById("sat")).checked)
		{
			day_filter.push('Sat');
		}
		if((document.getElementById("morning")).checked)
		{
			time_filter.push('M');
		}
		if((document.getElementById("day")).checked)
		{
			time_filter.push('D');
		}
		if((document.getElementById("evening")).checked)
		{
			time_filter.push('E');
		}
		if((document.getElementById("night")).checked)
		{
			time_filter.push('N');
		}		
		if((document.getElementById("latenight")).checked)
		{
			time_filter.push('LN');
		}
		if((document.getElementById("earlymorning")).checked)
		{
			time_filter.push('EM');
		}
		//console.log(day_filter);
        /* console.log(range_min,range_max);
		//if(range_min!=0 && range_max!=3000)
		for(var i in doctors)
		{
            console.log("here");
            var avg=(parseInt(doctors[i][20]) + parseInt(doctors[i][19]))/2;
            //console.log(avg,range_min,range_max);
			//if((doctors[i][20]<range_min) || (doctors[i][19]>range_max))
			if(avg>=parseInt(range_min) && avg<=parseInt(range_max))	
            {
                console.log(i,doctors[i][20],doctors[i][19],avg,range_min,range_max);
                //console.log(doctors[i][20],doctors[i][19],range_min,range_max);
                doctors[i][10]="show";
            }
            else
                doctors[i][10]="hide";
           
		}*/
		if( time_filter.length==0 && day_filter.length==0 &&  location_filter.length==0)
		{
			for(var i in doctors)
			{
				doctors[i][10]="show";//all shown
			}	
             //console.log("time ,day, location all null",doctors);
		}
		else if(day_filter.length==0 &&  location_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var startX = doctors[i][9][j][1];
					var endX = doctors[i][9][j][2];
					decision = checkTime(startX,endX);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
			//console.log("day, location all null",doctors);
		}
		else if(time_filter.length==0 && location_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var daysX = doctors[i][9][j][0];
					decision = checkDay(daysX);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
            //console.log("time ,location all null",doctors);
		}
		else if(time_filter.length==0 && day_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var locX = doctors[i][9][j][3];
					decision = checkLoc(locX);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][22]="hide";
				}
				else
				{
					doctors[i][22]="show";//if available at location show
				}
			}
            //console.log("time ,day all null",doctors);
		}
		else if(location_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var availibility_row = doctors[i][9][j];
					decision = checkDayTime(availibility_row);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
            //console.log("location all null",doctors);
		}
       else if(time_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var availibility_row = doctors[i][9][j];
					decision = checkDayLoc(availibility_row);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
            //console.log("time all null",doctors);
		}
		else if(day_filter.length==0)
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var availibility_row = doctors[i][9][j];
					decision = checkLocTime(availibility_row);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
            //console.log("day all null",doctors);
		}
		else
		{
			for(var i in doctors)
			{
				var decision = false;
				for(var j in doctors[i][9])
				{
					var availibility_row = doctors[i][9][j];
					decision = checkDayLocTime(availibility_row);
					if(decision)
						break;
				}
				if(decision == false)
				{
					doctors[i][10]="hide";
				}
				else
				{
					doctors[i][10]="show";
				}
			}
            //console.log("else day all null",doctors);
		}
		for(var i in doctors)
		{
            var avg=(parseInt(doctors[i][20]) + parseInt(doctors[i][19]))/2;
			if(avg>=parseInt(range_min) && avg<=parseInt(range_max))	
            {
                
                if(doctors[i][10]!="hide")
                 doctors[i][10]="show";
            }
            else
                doctors[i][10]="hide";
           
		}
		displayDoctors();
		
	});
    
	$(document).on('click','#reset-filter-button',function(event)
    {
        document.getElementById('search-filters-form').reset();
		//document.getElementById('location-search-filters-form').reset();
			for(i in doctors)
				doctors[i][10]="show";
			displayDoctors();
		
    });
    $(document).on('click','#reset-location-filter-button',function(event)
    {
        //document.getElementById('search-filters-form').reset();
		document.getElementById('location-search-filters-form').reset();
		for(i in doctors)
				doctors[i][22]="show";
			displayDoctors();
    });

	function getprofile(docid)
    {
        console.log(docid);
        
        if(document.location.pathname.match(/[^\/]+$/)[0]=="spa-salon.html")
            window.location='profile-spa.html?id='+docid;
        else
            window.location='profile.html?id='+docid;
        
    }

	function displayDoctors_norm()
	{
		var output = "";
		var found = false;
		//console.log(doctors);
        if(SearchString.length!=0)
        {
		  for(var i=0; i<doctors_list.length; i++)
		  {
			if(doctors[i][10]=="show" && doctors[i][22]=="show" && doctor_location_boolean[i]==true)
			{
				found = true;
				output += "<tr class='doctor-list-row'><td width='100%' class='doctor-entry-row'><table width='100%' align='center' class='doctor-list-entry'>";
				output += "<tr><td width='20%' rowspan='2' align='center' onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)'><img src='"+doctors[i][8]+"' width='90vw' height='90vw' class='doc-dp'></td>";
				
				output += "<td colspan='2'><a href='profile.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td></tr>";
                
                output+="<tr><td width='60%'><table onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)'>";
				if(doctors[i][5]==-1)
				{
					output += "<tr hidden><td width='40%'></td></tr>";
				}
				else
				{
					output += "<tr hidden><td width='30%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}
				
				output += "<tr><td width='40%' class='doctor-profile-med'>"+doctors[i][4]+"</td></tr>";
                
                
				//output += "<tr><td width='40%' class='doctor-profile-med'><table>";
                for(var j in doctors[i][11])
				{
					output +=  "<tr><td class='doctor-profile-med'>"+doctors[i][11][j]+" (Rs. "+doctors[i][12][j]+"/-)</td></tr>";
				}
				//output += "</table></td></tr>";
				var x;
				if(doctors[i][13] == 'nurse')
					x = "Nurse";
				else if(doctors[i][13] == 'physio')
					x = "Physiotherapist";
				else if(doctors[i][13] == 'mental')
					x = "Mental Wellness";
				else if(doctors[i][13] == 'vet')
					x = "Veterinary Physician";
				else if(doctors[i][13] == 'diet')
					x = "Dietitian";
				else if(doctors[i][13] == 'yoga')
					x = "Yoga Instructor";
				else if(doctors[i][13] == 'dental')
					x = "Dentist";
				else if(doctors[i][13] == 'spa')
					x = "Beauty Therapist";
				else if(doctors[i][13] == 'sex')
					x = "Sexiologist";
				else if(doctors[i][13] == 'deaddict')
					x = "Addiction Counsellor";
				else if(doctors[i][13] == 'speech')
					x = "Speech Therapist";
				else if(doctors[i][13] == 'general')
					x = "General Physician";
				
                if(parseInt(doctors[i][2])>1)
				    output += "<tr><td class='doctor-profile-med'>Experience: "+doctors[i][2]+" years</td></tr>";
                else if(parseInt(doctors[i][2])==1)
				    output += "<tr><td class='doctor-profile-med'>Experience: "+doctors[i][2]+" year</td></tr>";

				if(doctors[i][14]!=2 && doctors[i][14]!=3 && doctors[i][14]!=6)
				{
					var locations = doctors[i][7];
					var loc_text;
					var locs = new Array();
					locs = locations.split(", ");
					
					if(locs.length==0)
					{
						loc_text = "";
					}
					else if (locs.length==1)
					{
						loc_text = locs[0];
					}
					else if (locs.length==2)
					{
						loc_text = locs[0]+" & "+locs[1];
					}
					else if (locs.length==3)
					{
						loc_text = locs[0]+", "+locs[1]+" & "+locs[2];
					}
					else
					{
						var l =  parseInt(locs.length)-3;
						
						loc_text = locs[0]+", "+locs[1]+", "+locs[2]+" & "+l+" more";
					}
					output += "<tr><td class='doctor-profile-med'>Available in Locations:<br/> "+loc_text+"</td></tr>";
				}
				else
				{
					output += "<tr><td class='doctor-profile-med'></td></tr>";
				}
				output += "</td></tr></table></td>";
				
				output+="<td width='40%' id='appointment-button-td'><table id='appointment-button-table'>";
                
				if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<tr><td align='center' type='button'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book.png' width='90vw' height='30vh'></a></td></tr>";
					output += "<tr><td align='center' type='button'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/chat.png' width='90vw' height='30vh'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<tr><td align='center'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book.png' width='90vw' height='30vh'></a></td></tr>";
				}
				else
				{
					output += "<tr><td align='center'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/chat.png' width='90vw' height='30vh'></a></td></tr>";
				}
				output+="</table></td></tr>";
				/*if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<tr><td align='left'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book-appointment.png' width='140vw' height='40vw'></a></td>";
					output += "<td align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/book-online.png' width='120vw' height='40vw'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<tr><td align='left'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book-appointment.png' width='140vw' height='40vw'></a></td>";
					output += "<td align='left'></td></tr>";
				}
				else
				{
					output += "<tr><td align='left'></td>";
					output += "<td align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/book-online.png' width='120vw' height='40vw'></a></td></tr>";
				}*/
				output += "</table></td></tr>";

			

			}
		  }
            
        }
        else
        {
		  for(var i=0; i<doctors_list.length; i++)
		  {
			 
			if(doctors[i][10]=="show" && doctors[i][22]=="show" )
			{
				found = true;
				output += "<tr class='doctor-list-row'><td width='100%' class='doctor-entry-row'><table  align='center' class='doctor-list-entry'>";
				output += "<tr><td width='20%' rowspan='2' align='center' onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)'><img src='"+doctors[i][8]+"' width='90vw' height='90vw' class='doc-dp'></td>";
				
				output += "<td colspan='2'><a href='profile.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td></tr>";
                
                output+="<tr><td width='60%'><table onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)'>";
				if(doctors[i][5]==-1)
				{
					output += "<tr hidden><td width='40%'></td></tr>";
				}
				else
				{
					output += "<tr hidden><td width='30%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}
				
				output += "<tr><td width='40%' class='doctor-profile-med'>"+doctors[i][4]+"</td></tr>";
                
                
				//output += "<tr><td width='40%' class='doctor-profile-med'><table>";
                for(var j in doctors[i][11])
				{
					output +=  "<tr><td class='doctor-profile-med'>"+doctors[i][11][j]+" (Rs. "+doctors[i][12][j]+"/-)</td></tr>";
				}
				//output += "</table></td></tr>";
				var x;
				if(doctors[i][13] == 'nurse')
					x = "Nurse";
				else if(doctors[i][13] == 'physio')
					x = "Physiotherapist";
				else if(doctors[i][13] == 'mental')
					x = "Mental Wellness";
				else if(doctors[i][13] == 'vet')
					x = "Veterinary Physician";
				else if(doctors[i][13] == 'diet')
					x = "Dietitian";
				else if(doctors[i][13] == 'yoga')
					x = "Yoga Instructor";
				else if(doctors[i][13] == 'dental')
					x = "Dentist";
				else if(doctors[i][13] == 'spa')
					x = "Beauty Therapist";
				else if(doctors[i][13] == 'sex')
					x = "Sexiologist";
				else if(doctors[i][13] == 'deaddict')
					x = "Addiction Counsellor";
				else if(doctors[i][13] == 'speech')
					x = "Speech Therapist";
				else if(doctors[i][13] == 'general')
					x = "General Physician";
				
                if(parseInt(doctors[i][2])>1)
				    output += "<tr><td class='doctor-profile-med'>Experience: "+doctors[i][2]+" years</td></tr>";
                else if(parseInt(doctors[i][2])==1)
				    output += "<tr><td class='doctor-profile-med'>Experience: "+doctors[i][2]+" year</td></tr>";

				if(doctors[i][14]!=2 && doctors[i][14]!=3 && doctors[i][14]!=6)
				{
					var locations = doctors[i][7];
					var loc_text;
					var locs = new Array();
					locs = locations.split(", ");
					
					if(locs.length==0)
					{
						loc_text = "";
					}
					else if (locs.length==1)
					{
						loc_text = locs[0];
					}
					else if (locs.length==2)
					{
						loc_text = locs[0]+" & "+locs[1];
					}
					else if (locs.length==3)
					{
						loc_text = locs[0]+", "+locs[1]+" & "+locs[2];
					}
					else
					{
						var l =  parseInt(locs.length)-3;
						
						loc_text = locs[0]+", "+locs[1]+", "+locs[2]+" & "+l+" more";
					}
					output += "<tr><td class='doctor-profile-med'>Available in Locations:<br/> "+loc_text+"</td></tr>";
				}
				else
				{
					output += "<tr><td class='doctor-profile-med'></td></tr>";
				}
				output += "</td></tr></table></td>";
				
				output+="<td width='40%' id='appointment-button-td'><table id='appointment-button-table'>";
                
				if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<tr><td align='center' type='button'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book.png' width='90vw' height='30vh'></a></td></tr>";
					output += "<tr><td align='center' type='button'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/chat.png' width='90vw' height='30vh'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<tr><td align='center'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book.png' width='90vw' height='30vh'></a></td></tr>";
				}
				else
				{
					output += "<tr><td align='center'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/chat.png' width='90vw' height='30vh'></a></td></tr>";
				}
				output+="</table></td></tr>";
				/*if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<tr><td align='left'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book-appointment.png' width='140vw' height='40vw'></a></td>";
					output += "<td align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/book-online.png' width='120vw' height='40vw'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<tr><td align='left'><a onclick='createVisitApp("+i+")'><img src='../assets/images/book-appointment.png' width='140vw' height='40vw'></a></td>";
					output += "<td align='left'></td></tr>";
				}
				else
				{
					output += "<tr><td align='left'></td>";
					output += "<td align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='../assets/images/book-online.png' width='120vw' height='40vw'></a></td></tr>";
				}*/
				output += "</table></td></tr>";

			}
		}
            
        }
		$('#loading-icon').hide();
		if(found==true)
			$("#list-table").html(output);
		else
		{
			var output = "<tr><td><br/><br/><br/><br/><table width='100%' align='center' class='doctor-list-entry'><tr><td align='center'><img src='../assets/images/noresult.jpg' height='300vh' width='360vw'></td></tr><tr><td><b><br/>Sorry, currently we do not have any general physician available in this area. However,we are continuously working towards expanding our array of health specialists.<br/><br/>Kindly try a different search term or search filter.</b></td></tr></table></td></tr>";
			
			$("#list-table").html(output);
		}
	}
	
    function displayDoctors_spa()
	{
		var output = "";
		var found = false;
		//console.log("In display doctors");
		if(SearchString.length!=0)
        {
			for(var i=0; i<doctors_list.length; i++)
		{
			if(doctors[i][10]=="show"  && doctors[i][22]=="show" && doctor_location_boolean[i]==true)
			{
				found = true;
				output += "<tr class='doctor-list-row'><td width='100%' class='doctor-entry-row'>";
                output +="<table width='100%' align='center' class='doctor-list-entry' border='0'><tr><td><br/></td></tr>";
				output += "<tr><td rowspan='2' width='30%' align='center' onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)' ><img src='"+doctors[i][8]+"' width='80vw' height='80vw' class='doc-dp'></td>";
				
				output += "<td colspan='4' ><a href='profile-spa.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td></tr>";
				/*if(doctors[i][5]==-1)
				{
					output += "<td width='35%'></td></tr>";
				}
				else
				{
					output += "</td><td width='35%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}*/
				var x;
				if(doctors[i][13] == 'nurse')
					x = "Nurse";
				else if(doctors[i][13] == 'physio')
					x = "Physiotherapist";
				else if(doctors[i][13] == 'mental')
					x = "Mental Wellness";
				else if(doctors[i][13] == 'vet')
					x = "Veterinary Physician";
				else if(doctors[i][13] == 'diet')
					x = "Dietitian";
				else if(doctors[i][13] == 'yoga')
					x = "Yoga Instructor";
				else if(doctors[i][13] == 'dental')
					x = "Dentist";
				else if(doctors[i][13] == 'spa')
					x = "Beauty Therapist";
				else if(doctors[i][13] == 'sex')
					x = "Sexiologist";
				else if(doctors[i][13] == 'deaddict')
					x = "Addiction Counsellor";
				else if(doctors[i][13] == 'speech')
					x = "Speech Therapist";
				else if(doctors[i][13] == 'general')
					x = "General Physician";
				else if(doctors[i][13] == 'accu')
					x = "Acupressure Therapist";
				
				output+="<tr><td id='spa-doc-info'><table id='spa-doc-info-table'  onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)' >";
				if(doctors[i][2]==0)
				{
					/*output += "<tr><td width='5%'/><td class='doctor-profile-small' width='35%'>"+x+"<br/></td>";*/
				}
				else if(doctors[i][2]==1)
				{
					output += "<tr><td class='doctor-profile-small' width='40%' align='left'>"+x+"</td></tr>";
					output+="<tr><td class='doctor-profile-small' width='40%' align='left'>Experience: "+doctors[i][2]+" year</td></tr>";
				}
				else
				{
					output += "<tr><td class='doctor-profile-small' width='40%' align='left'>"+x+"</td></tr>";
					output+="<tr><td class='doctor-profile-small' width='40%' align='left'>Experience: "+doctors[i][2]+" years</td></tr>";
				}
				//<td width='5%' align='center'></td>
				if(doctors[i][14]!=2 && doctors[i][14]!=3 && doctors[i][14]!=6)
				{
					var locations = doctors[i][7];
					var loc_text;
					var locs = new Array();
					locs = locations.split(", ");
					
					if(locs.length==0)
					{
						loc_text = "";
					}
					else if (locs.length==1)
					{
						loc_text = locs[0];
					}
					else if (locs.length==2)
					{
						loc_text = locs[0]+" & "+locs[1];
					}
					else if (locs.length==3)
					{
						loc_text = locs[0]+", "+locs[1]+" & "+locs[2];
					}
					else
					{
						var l =  parseInt(locs.length)-3;
						
						loc_text = locs[0]+", "+locs[1]+", "+locs[2]+" & "+l+" more";
					}
					output += "<tr><td class='doctor-profile-small' width='35%'align='left'>Available in Locations:<br/> "+loc_text+"</td>";
				}
				//<td width='5%' align='center'></td>
				else
				{
					output += "<tr><td width='35%'class='doctor-profile-small'align='left'></td>";
				}
				output += "</tr>";
				output+="</table></td></tr>";
				output += "<tr><td align='left' colspan='5'>";
				output+= "<table width='100%'>";
				output += "<tr><td align ='center' width='100%'><table align='left' border='0' width='100%' id='icon-table'><tr class='rates'><td align='center' colspan='5'>Click to View Rates</td></tr><tr>";
				//<td width='5%'></td>
               
                if (jQuery.inArray("3",doctors[i][15])!=-1)
                    {
						output += "<td align='center'width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",3)'><img src='../assets/images/hair.png' ></a></td>";
						
                    }
					
                if (jQuery.inArray("1",doctors[i][15])!=-1)
                    {
						
                        output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",1)'><img src='../assets/images/body.png' ></a></td>";
                    }
                if (jQuery.inArray("2",doctors[i][15])!=-1)
                    {
						
                        output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",2)'><img src='../assets/images/wax.png' ></a></td>";
                    }
					
                if (jQuery.inArray("4",doctors[i][15])!=-1)
                    {
						
						output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",4)'><img src='../assets/images/face.png' ></a></td>";
						
                    }
				if (jQuery.inArray("5",doctors[i][15])!=-1)
                    {
						output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",5)'><img src='../assets/images/bridal.png' s></a></td>";
					}	
				//}
                //output+="</tr><tr><td width='100%' colspan='5' align='center'><a onclick='createVisitApp("+i+")'><img src='../assets/images/spa button.png' id='booking-button'></a></td></tr>";
				output += "</table></td></tr></table></td></tr>";
				output += "</table></td></tr>";
			}
		}
		}
		else
		{
			for(var i=0; i<doctors_list.length; i++)
		{
			//console.log(doctors);
			if(doctors[i][10]=="show" && doctors[i][22]=="show" )
			{
				found = true;
				output += "<tr class='doctor-list-row'><td width='100%'class='doctor-entry-row'>";
                output +="<table width='100%' align='center' class='doctor-list-entry' border='0'><tr><td><br/></td></tr>";
				output += "<tr><td rowspan='2' width='30%' align='center' onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)' ><img src='"+doctors[i][8]+"' width='80vw' height='80vw' class='doc-dp'></td>";
				
				output += "<td colspan='4' ><a href='profile-spa.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td></tr>";
				/*if(doctors[i][5]==-1)
				{
					output += "<td width='35%'></td></tr>";
				}
				else
				{
					output += "</td><td width='35%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}*/
				var x;
				if(doctors[i][13] == 'nurse')
					x = "Nurse";
				else if(doctors[i][13] == 'physio')
					x = "Physiotherapist";
				else if(doctors[i][13] == 'mental')
					x = "Mental Wellness";
				else if(doctors[i][13] == 'vet')
					x = "Veterinary Physician";
				else if(doctors[i][13] == 'diet')
					x = "Dietitian";
				else if(doctors[i][13] == 'yoga')
					x = "Yoga Instructor";
				else if(doctors[i][13] == 'dental')
					x = "Dentist";
				else if(doctors[i][13] == 'spa')
					x = "Beauty Therapist";
				else if(doctors[i][13] == 'sex')
					x = "Sexiologist";
				else if(doctors[i][13] == 'deaddict')
					x = "Addiction Counsellor";
				else if(doctors[i][13] == 'speech')
					x = "Speech Therapist";
				else if(doctors[i][13] == 'general')
					x = "General Physician";
				else if(doctors[i][13] == 'accu')
					x = "Acupressure Therapist";
				
				output+="<tr><td id='spa-doc-info'><table id='spa-doc-info-table'  onclick='getprofile(&apos;"+doctors[i][0]+"&apos;)' >";
				if(doctors[i][2]==0)
				{
					/*output += "<tr><td width='5%'/><td class='doctor-profile-small' width='35%'>"+x+"<br/></td>";*/
				}
				else if(doctors[i][2]==1)
				{
					output += "<tr><td class='doctor-profile-small' width='40%' align='left'>"+x+"</td></tr>";
					output+="<tr><td class='doctor-profile-small' width='40%' align='left'>Experience: "+doctors[i][2]+" year</td></tr>";
				}
				else
				{
					output += "<tr><td class='doctor-profile-small' width='40%' align='left'>"+x+"</td></tr>";
					output+="<tr><td class='doctor-profile-small' width='40%' align='left'>Experience: "+doctors[i][2]+" years</td></tr>";
				}
				//<td width='5%' align='center'></td>
				if(doctors[i][14]!=2 && doctors[i][14]!=3 && doctors[i][14]!=6)
				{
					var locations = doctors[i][7];
					var loc_text;
					var locs = new Array();
					locs = locations.split(", ");
					
					if(locs.length==0)
					{
						loc_text = "";
					}
					else if (locs.length==1)
					{
						loc_text = locs[0];
					}
					else if (locs.length==2)
					{
						loc_text = locs[0]+" & "+locs[1];
					}
					else if (locs.length==3)
					{
						loc_text = locs[0]+", "+locs[1]+" & "+locs[2];
					}
					else
					{
						var l =  parseInt(locs.length)-3;
						
						loc_text = locs[0]+", "+locs[1]+", "+locs[2]+" & "+l+" more";
					}
					output += "<tr><td class='doctor-profile-small' width='35%'align='left'>Available in Locations:<br/> "+loc_text+"</td>";
				}
				//<td width='5%' align='center'></td>
				else
				{
					output += "<tr><td width='35%'class='doctor-profile-small'align='left'></td>";
				}
				output += "</tr>";
				output+="</table></td></tr>";
				output += "<tr><td align='left' colspan='5'>";
				output+= "<table width='100%'>";
				output += "<tr><td align ='center' width='100%'><table align='left' border='0' width='100%' id='icon-table'><tr class='rates'><td align='center' colspan='5'>Click to View Rates</td></tr><tr>";
				//<td width='5%'></td>
               
                if (jQuery.inArray("3",doctors[i][15])!=-1)
                    {
						output += "<td align='center'width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",3)'><img src='../assets/images/hair.png' ></a></td>";
						
                    }
					
                if (jQuery.inArray("1",doctors[i][15])!=-1)
                    {
						
                        output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",1)'><img src='../assets/images/body.png' ></a></td>";
                    }
                if (jQuery.inArray("2",doctors[i][15])!=-1)
                    {
						
                        output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",2)'><img src='../assets/images/wax.png' ></a></td>";
                    }
					
                if (jQuery.inArray("4",doctors[i][15])!=-1)
                    {
						
						output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",4)'><img src='../assets/images/face.png' ></a></td>";
						
                    }
				if (jQuery.inArray("5",doctors[i][15])!=-1)
                    {
						output += "<td align='center' width='20%'><a class='spa-icons' onclick='generateServiceDivMobile("+i+",5)'><img src='../assets/images/bridal.png' s></a></td>";
					}	
				//}
               // output+="</tr><tr><td width='100%' colspan='5' align='center'><a onclick='createVisitApp("+i+")'><img src='../assets/images/spa button.png' id='booking-button'></a></td></tr>";
				output += "</table></td></tr></table></td></tr>";
				output += "</table></td></tr>";
			}
		}
		}
		$('#loading-icon').hide();
		if(found==true)
			$("#list-table").html(output);
		else
		{
			var output = "<tr><td><br/><br/><br/><br/><table width='100%' align='center' class='doctor-list-entry'><tr><td align='center'><img src='../assets/images/noresult.jpg' height='300vh' width='360vw'></td></tr><tr><td><b><br/>Sorry, currently we do not have any beauticians available in this area. However,we are continuously working towards expanding our array of health specialists.<br/><br/>Kindly try a different search term or search filter.</b></td></tr></table></td></tr>";
			
			$("#list-table").html(output);
		}
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
	
	function onlineModal(x)
	{
		if (accessibility==0)
		{	
			var obj =doctors[x];
			var modal = document.getElementById('onlineModal');
			var span = document.getElementsByClassName("close")[2];
			DID = doctors[x][0];
			firebase.database().ref('users/'+DID+'/new_notification').on('value', function(snapshot) 
		      {
                doc_noti = snapshot.val();
                //console.log("doc",doc_noti);
            });
			
			doctor_name = doctors[x][1];
			doctor =doctors[x][16];
			doctor_email = doctors[x][18];
			doctor_mobile = doctors[x][17];		
			$('#text-chat-service').html("");
			//$('#text-chat-rate').html("");
			//$('#video-chat-service').html("");
			//$('#video-chat-rate').html("");
							
			for (var i in obj[11])
			{
				if(obj[15][i]==2)
				{
					$('#text-chat-service').html(obj[11][i]);
					//$('#text-chat-rate').html(obj[12][i]);
					$('#text-chat-link').attr("onclick","createChatSession("+obj[12][i]+")");
					//window.PUM.setData(obj[12][i], DID+uid,"Text Chat Service");
				}
				else if(obj[15][i]==3)
				{
					//$('#video-chat-service').html(obj[11][i]);
					//$('#video-chat-rate').html(obj[12][i]);
				}
			}
			
            var scrollpos=$(window).scrollTop();
			modal.style.display = "block";
            $("#content-body").hide();
            window.scrollTo(0,0);
            
			span.onclick = function() {
				modal.style.display = "none";
                $("#content-body").show();
                $(window).scrollTop(scrollpos);
			}
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
                    $("#content-body").show();
                    $(window).scrollTop(scrollpos);
				}
			}
		}
		else if(accessibility == 1)
		{
			 $('#myModal').show();
		}
		else if(accessibility == 2)
		{
			errorModal("You must verify your email address before booking an appointment.");
		}
	}
	
	function getDoctors(type)
	{
		return firebase.database().ref('professions/'+type+'/').once('value').then(function(snapshot) {
			doctor_objects = snapshot.val();
			doctors_list =  $.map(doctor_objects, function(el) { return el });
			
		}).then(function()
		{
			
			doctor_ids = new Array();
			doctor_names = new Array();
			doctor_exp = new Array();
			doctor_spec = new Array();
			doctor_deg = new Array();
			doctor_min = new Array();
			doctor_max = new Array();
			doctor_rate_total = new Array();
			doctor_rate_score = new Array();
			doctor_loc = new Array();
			doctor_days = new Array();
			doctor_times = new Array();
			doctor_dp = new Array();
			doctor_av = new Array();
			doctor_ser = new Array();
			doctor_rate = new Array();
			doctor_stypes = new Array();
			doctor_prof = new Array();
			doctor_app = new Array();
			doctor_mobiles = new Array();
			doctor_emails = new Array();
			doctor_min_rate = new Array();
			doctor_max_rate = new Array();
			doctor_titles = new Array();
			doctor_location_boolean = new Array();
			
			for (var i=0; i<doctors_list.length; i++)
			{
				doctor_ids[i] = doctors_list[i].user;
				doctor_names[i] = doctors_list[i].first_name +" "+ doctors_list[i].last_name;
				if(doctor_exp[i] = doctors_list[i].experience=="")
				{
					doctor_exp[i] = 0;
				}
				else
				{
					doctor_exp[i] = doctors_list[i].experience;
				}
				doctor_spec[i] = doctors_list[i].specializations;
				doctor_deg[i] = doctors_list[i].degrees;
				doctor_rate_score[i] = doctors_list[i].user_score;
				doctor_rate_total[i] = doctors_list[i].user_total;
				doctor_loc[i] = doctors_list[i].locations;
				doctor_dp[i] = doctors_list[i].profile_picture;
				doctor_av[i] = doctors_list[i].availibility;
				doctor_ser[i] = doctors_list[i].services;
				doctor_stypes[i] = doctors_list[i].services_types;
				doctor_rate[i] = doctors_list[i].rates;
				doctor_prof[i] = doctors_list[i].profession;
				doctor_app[i] = doctors_list[i].appointment_type;
				doctor_emails[i] = doctors_list[i].email;
				doctor_mobiles[i] = doctors_list[i].mobile_number;
				doctor_min_rate[i] = doctors_list[i].min_rate;
				doctor_max_rate[i] = doctors_list[i].max_rate;
				doctor_titles[i] = doctors_list[i].title;
                
                
                if( doctor_loc[i] != null && jQuery.inArray( selected_location, doctor_loc[i]) >-1 && selected_location != undefined)
				{
                    console.log(selected_location);
				    //console.log(doctor_loc[i]);
                    console.log(jQuery.inArray( selected_location, doctor_loc[i]));
					doctor_location_boolean[i] = true;
				}
				else
				{
					doctor_location_boolean[i] = false;
				}
			}
			
			
			for(var i=0;i<doctors_list.length;i++)
			{
				if(doctor_rate_total[i]==0)
				{
					rating = -1;
				}
				else
				{
					rating = doctor_rate_score[i]/doctor_rate_total[i];
				}
				var spec= "";
				for(var j=0;j<doctor_spec[i].length;j++)
				{
					if (j==doctor_spec[i].length-1)
						spec+=doctor_spec[i][j];
					else
					spec+=doctor_spec[i][j]+", ";
				}
                //console.log(spec);
				var deg= "";
				for(var j=0;j<doctor_deg[i].length;j++)
				{
					if(j==doctor_deg[i].length-1)
						deg+=doctor_deg[i][j];
					else
						deg+=doctor_deg[i][j]+", ";
				}
				var loc= "";
				if(doctor_app[i]!=2 && doctor_app[i]!=3 && doctor_app[i]!= 6)
				{
					for(var j=0;j<doctor_loc[i].length;j++)
					{
						if (j==doctor_loc[i].length-1)
							loc+=doctor_loc[i][j];
						else
							loc+=doctor_loc[i][j]+", ";
					}	
				}
				//DOCTORS ARRAY INITIALIZATION
				doctors[i] = [doctor_ids[i], doctor_names[i], doctor_exp[i], spec, deg,rating, doctor_rate_total[i], loc, doctor_dp[i],doctor_av[i],"show",doctor_ser[i],doctor_rate[i],doctor_prof[i],doctor_app[i], doctor_stypes[i],doctors_list[i], doctor_mobiles[i], doctor_emails[i], doctor_min_rate[i], doctor_max_rate[i], doctor_titles[i],"show"];
			}
            doctors1=doctors.slice(0);
			//console.log(doctors1);
		}).then(function(){
			displayDoctors();
		});	
	}
	
    /*function getDoctors_spa(type)
	{
		return firebase.database().ref('professions/'+type+'/').once('value').then(function(snapshot) {
			doctor_objects = snapshot.val();
			doctors_list =  $.map(doctor_objects, function(el) { return el });
			
		}).then(function()
		{
			
			doctor_ids = new Array();
			doctor_names = new Array();
			doctor_exp = new Array();
			doctor_spec = new Array();
			doctor_deg = new Array();
			doctor_min = new Array();
			doctor_max = new Array();
			doctor_rate_total = new Array();
			doctor_rate_score = new Array();
			doctor_loc = new Array();
			doctor_days = new Array();
			doctor_times = new Array();
			doctor_dp = new Array();
			doctor_av = new Array();
			doctor_ser = new Array();
			doctor_rate = new Array();
			doctor_stypes = new Array();
			doctor_prof = new Array();
			doctor_app = new Array();
			doctor_mobiles = new Array();
			doctor_emails = new Array();
			doctor_min_rate = new Array();
			doctor_max_rate = new Array();
			doctor_titles = new Array();
			doctor_location_boolean = new Array();
			
			for (var i=0; i<doctors_list.length; i++)
			{
				doctor_ids[i] = doctors_list[i].user;
				doctor_names[i] = doctors_list[i].first_name +" "+ doctors_list[i].last_name;
				if(doctor_exp[i] = doctors_list[i].experience=="")
				{
					doctor_exp[i] = 0;
				}
				else
				{
					doctor_exp[i] = doctors_list[i].experience;
				}
				doctor_spec[i] = doctors_list[i].specializations;
				doctor_deg[i] = doctors_list[i].degrees;
				doctor_rate_score[i] = doctors_list[i].user_score;
				doctor_rate_total[i] = doctors_list[i].user_total;
				doctor_loc[i] = doctors_list[i].locations;
				doctor_dp[i] = doctors_list[i].profile_picture;
				doctor_av[i] = doctors_list[i].availibility;
				doctor_ser[i] = doctors_list[i].services;
				doctor_stypes[i] = doctors_list[i].services_types;
				doctor_rate[i] = doctors_list[i].rates;
				doctor_prof[i] = doctors_list[i].profession;
				doctor_app[i] = doctors_list[i].appointment_type;
				doctor_emails[i] = doctors_list[i].email;
				doctor_mobiles[i] = doctors_list[i].mobile_number;
				doctor_min_rate[i] = doctors_list[i].min_rate;
				doctor_max_rate[i] = doctors_list[i].max_rate;
				doctor_titles[i] = doctors_list[i].title;
                
                
                if( doctor_loc[i] != null && jQuery.inArray( selected_location, doctor_loc[i]) >-1 && selected_location != undefined)
				{
					doctor_location_boolean[i] = true;
				}
				else
				{
					doctor_location_boolean[i] = false;
				}
			}
			
			
			for(var i=0;i<doctors_list.length;i++)
			{
				if(doctor_rate_total[i]==0)
				{
					rating = -1;
				}
				else
				{
					rating = doctor_rate_score[i]/doctor_rate_total[i];
				}
				var spec= "";
				for(var j=0;j<doctor_spec[i].length;j++)
				{
					if (j==doctor_spec[i].length-1)
						spec+=doctor_spec[i][j];
					else
					spec+=doctor_spec[i][j]+", ";
				}
                //console.log(spec);
				var deg= "";
				for(var j=0;j<doctor_deg[i].length;j++)
				{
					if(j==doctor_deg[i].length-1)
						deg+=doctor_deg[i][j];
					else
						deg+=doctor_deg[i][j]+", ";
				}
				var loc= "";
				if(doctor_app[i]!=2 && doctor_app[i]!=3 && doctor_app[i]!= 6)
				{
					for(var j=0;j<doctor_loc[i].length;j++)
					{
						if (j==doctor_loc[i].length-1)
							loc+=doctor_loc[i][j];
						else
							loc+=doctor_loc[i][j]+", ";
					}	
				}
				//DOCTORS ARRAY INITIALIZATION
				doctors[i] = [doctor_ids[i], doctor_names[i], doctor_exp[i], spec, deg,rating, doctor_rate_total[i], loc, doctor_dp[i],doctor_av[i],"show",doctor_ser[i],doctor_rate[i],doctor_prof[i],doctor_app[i], doctor_stypes[i],doctors_list[i], doctor_mobiles[i], doctor_emails[i], doctor_min_rate[i], doctor_max_rate[i], doctor_titles[i], "show" ];
			}
            doctors1=doctors.slice(0);
			//console.log(doctors1);
		}).then(function(){
			displayDoctors();
		});	
	}*/
	
     function sort()
	{
	$('#sort-show').toggle();

	}
   
   function initApp() 
   {
        var user2 = firebase.auth().currentUser;
        console.log("user-info",user2);
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
						name = snapshot.val().first_name;
						patient = snapshot.val();
						patient_name = snapshot.val().first_name +" "+snapshot.val().last_name;
						patient_mobile = snapshot.val().mobile_number;
						patient_email = snapshot.val().email;
						pat_noti=snapshot.val().new_notification;
                        //console.log("pat",pat_noti);
                       
					}).then(function()
					{					  
						  //document.getElementById('login').hidden = true;
						  name = name.trim();
						  var output= "<a id='header-user-profile'><h2> Hello "+name+"!</h2></a>";
						  //$("#header-user-name").html(output);
						  //document.getElementById('header-user-name').hidden = false;
						  
						  displayNotificationImage(uid);
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

			}
		});
		
		document.getElementById('login-sign-in').addEventListener('click', handleSignIn, false);
		document.getElementById('user-log-out').addEventListener('click', handleSignOut, false);
		document.getElementById('login-password-reset').addEventListener('click', sendPasswordReset, false);
		
	}
	
    function displayDoctors()
    {
        if(document.location.pathname.match(/[^\/]+$/)[0]=="spa-salon.html")
        {
            displayDoctors_spa();
            //console.log('spa');
        }   
        else
            displayDoctors_norm();
            
    }

