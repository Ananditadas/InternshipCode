	var doctor_objects, doctor_ids, doctor_names, doctor_exp, doctor_min, doctor_max, doctor_rate_score, doctor_rate_total, doctor_spec, doctor_loc, doctor_deg, doctor_days, doctor_times, doctor_dp, doctor_av, doctor_ser, doctor_rate, doctor_prof, doctor_mobiles, doctor_emails,doctor_location_boolean;
    var doctors = new Array();
    var doctors1 = new Array();
    var doctor_stypes;
    var rating;
    var locations, location_filter, location_objects;
    var day_filter, time_filter, fee_filter;
    var range_max, range_min;
    var uid, DID, doctor_name, patient_name, patient, doctor, patient_email, doctor_email, patient_mobile, doctor_mobile;
    var pat_noti,doc_noti;
    var selected_location, selected_speciality;
    var SearchString ;
    var selected_services=[],service_per_head=[],init_service_per_head=[],checked_service,service_length=[],length_flag;
	
	 var rate,total_amount;
	 function services_checkbox(i,mode)
	{
		//console.log(i);
        toggleHighlight(mode);
        checked_service=i;
        $('#service-'+i).show();
        $('#label-'+i).hide();
		if(belongsTo(selected_services,i)==-1)
		{
			selected_services.push(i);
            if(service_per_head[i]==0)
                {
                    $('#head_count_'+i).val(1);
                    service_per_head[i]=1;
                }
            else
                $('#head_count_'+i).val(service_per_head[i]);
		}
		else
		{
			selected_services = removeElement(selected_services, belongsTo(selected_services, i));
            service_per_head[i]=0;
            $('#head_count_'+i).val("");
            $('#service-'+i).hide();
            $('#label-'+i).show();
		}	

        caltotalamt();
	}
    function belongsTo(arr, i)
	{
		for(var x in arr){
			if(arr[x]==i)
				return x;
		}
		return -1;
	}
    function removeElement(arr,i)
	{
		for(var x=i; x<arr.length-1; x++)
		{
			arr[x]=arr[parseInt(x)+parseInt(1)];
		}
		arr.pop();
		return arr;
	}
    
    //$(document).on('click','.addHeads',function()
    function addHeads(checked_service,mode)
    {
        //console.log(checked_service);
        var getcount= parseInt($('#head_count_'+checked_service).val());
        getcount++;
        $('#head_count_'+checked_service).val(getcount);
        service_per_head[checked_service]=getcount;
        caltotalamt();
    }//);
    
    //$(document).on('click','.subHeads',function()
    function subHeads(checked_service,mode)
    {
        //console.log(mode);
        toggleHighlight(mode);
        var getcount= parseInt($('#head_count_'+checked_service).val());
        if(getcount>1)
        {
            getcount--;
            $('#head_count_'+checked_service).val(getcount);
            service_per_head[checked_service]=getcount;
            caltotalamt();
        }
        else if(getcount==1)
        {
            selected_services = removeElement(selected_services, belongsTo(selected_services, checked_service));
            service_per_head[checked_service]=0;
            $('#service-'+checked_service).hide();
            $('#label-'+checked_service).show();
            $('input:checkbox[value="' +checked_service+ '"]').attr('checked', false);
            caltotalamt();
        }
    }//);
    
    function addButton(serviceid)
    {
        $('#'+serviceid).prop('checked',true);
    }
    function caltotalamt()
    {
		var total_head_count=0;
        total_amount = 0;
		for(var x in selected_services)
        {
            total_amount += parseInt(rate[selected_services[x]])*service_per_head[selected_services[x]];
            total_head_count+=service_per_head[selected_services[x]];
        }
        if(total_amount >0)
            {
                $('#final-amount').html("Rs. "+total_amount);
                //console.log(selected_services);
                $('#total-box').html(total_head_count);
            }
        else
            {
                $('#final-amount').hide();
                //console.log(selected_services);
                $('#total-box').hide();
            }
        if(selected_services.length==0)
         {  
            $('#final-amount').hide();
            $('#total-box').hide();
         }
        else
        {
            $('#final-amount').show();
            $('#total-box').show();
        }
		if(total_amount>=499)
		{
			$("#checkout-arrow-td").show();
			$("#checkout-td").show();
			$("#min-checkout-td").hide();
		}
		else
		{
			$("#checkout-arrow-td").hide();
			$("#checkout-td").hide();
			$("#min-checkout-td").show();
		}
        tabCount();
    }

    $(document).on('click', '#body-radio', function(){
        $('#body-services').show();
        $('#wax-services').hide();
        $('#face-services').hide();
		$('#bridal-services').hide();
        $('#hair-services').hide();
    });
    $(document).on('click', '#wax-radio', function(){
        $('#body-services').hide();
        $('#wax-services').show();
        $('#face-services').hide();
		$('#bridal-services').hide();
        $('#hair-services').hide();
        
    });
    $(document).on('click', '#face-radio', function(){
        $('#body-services').hide();
        $('#wax-services').hide();
        $('#face-services').show();
		$('#bridal-services').hide();
        $('#hair-services').hide();
        
    });
    $(document).on('click', '#hair-radio', function(){
        $('#body-services').hide();
        $('#wax-services').hide();
        $('#face-services').hide();
		$('#bridal-services').hide();
        $('#hair-services').show();
        
    });
	$(document).on('click', '#bridal-radio', function(){
        $('#body-services').hide();
        $('#wax-services').hide();
        $('#face-services').hide();
		$('#hair-services').hide();
        $('#bridal-services').show();
        
    });

    function autochecker()
    {
		//console.log("in autochecker",selected_services);
        for(i in selected_services)
            {
				var j=""+selected_services[i];
				//console.log(j);
                $('input:checkbox[value="'+j+'"]').prop('checked', true);
				$('#label-'+j).hide();
                $('#service-'+j).show();
				//services_checkbox(i);
                $('#head_count_'+j).val(service_per_head[j]);
            }
        highlightTabs();
        tabCount();
    }
    
    function findCheckedRadio(divName)
    {
        var selected = [];
        $('#'+divName+' input:checked').each(function() {
        selected.push(parseInt($(this).attr('value')));
        });  
        return count_heads(selected);
    }
    function count_heads(id_arr)
    {
        var count=0;
        for(i in id_arr)
            count+=service_per_head[id_arr[i]];
        return count;
    }
    function toggleHighlight(serno)
    {
        switch(serno)
        {
            case 1: if($("label[for='body-radio']").css("background-color")== "rgb(210, 255, 247)")
                        $("label[for='body-radio']").removeAttr('style');
                    else
                        {
                            $("label[for='body-radio']").css("background-color",'#d2fff7');
                            //$("label[for='body-radio']").css("color",'white');
                        }
                    break;
            case 2: if($("label[for='wax-radio']").css("background-color")== "rgb(210, 255, 247)")
                        $("label[for='wax-radio']").removeAttr('style');
                    else
                        {
                            $("label[for='wax-radio']").css("background-color",'#d2fff7');
                            //$("label[for='wax-radio']").css("color",'white');
                        }
                    break;
            case 3: if($("label[for='hair-radio']").css("background-color")== "rgb(210, 255, 247)")
                        $("label[for='hair-radio']").removeAttr('style');
                    else
                        {
                            $("label[for='hair-radio']").css("background-color",'#d2fff7');
                            //$("label[for='hair-radio']").css("color",'white');
                        }
                    break;
            case 4: if($("label[for='face-radio']").css("background-color")== "rgb(210, 255, 247)")
                        $("label[for='face-radio']").removeAttr('style');
                    else
                        {
                            $("label[for='face-radio']").css("background-color",'#d2fff7');
                            //$("label[for='face-radio']").css("color",'white');
                        }
                    break;
            case 5: console.log($("label[for='bridal-radio']").css("background-color")); 
                if($("label[for='bridal-radio']").css("background-color")== "rgb(210, 255, 247)")
                        $("label[for='bridal-radio']").removeAttr('style');
                    else
                        {
                            $("label[for='bridal-radio']").css("background-color",'#d2fff7');
                            //$("label[for='bridal-radio']").css("color",'white');
                        }
                    break;
        }
        
    }
    function highlightTabs()
    {
        var flag=0;
        if(findCheckedRadio("body-list-div")>0)
            {
                $("label[for='body-radio']").css("background-color",'#d2fff7');
                //$("label[for='body-radio']").css("color",'white');
                flag=1;
            }
        if(findCheckedRadio("wax-list-div")>0)
            {
                $("label[for='wax-radio']").css("background-color",'#d2fff7');
                 //$("label[for='wax-radio']").css("color",'white');
                flag=2;
            }
        if(findCheckedRadio("hair-list-div")>0)
            {
                $("label[for='hair-radio']").css("background-color",'#d2fff7');
                //$("label[for='hair-radio']").css("color",'white');
                flag=3;
            }
        if(findCheckedRadio("face-list-div")>0)
            {
                $("label[for='face-radio']").css("background-color",'#d2fff7');
                //$("label[for='face-radio']").css("color",'white');
                flag=4;
            }
        if(findCheckedRadio("bridal-list-div")>0)
            {
                $("label[for='bridal-radio']").css("background-color",'#d2fff7');
                //$("label[for='bridal-radio']").css("color",'white');
                flag=5;
            }
        defaultshow(flag);
            
    }
    function unHighlightTabs()
    {

        if(findCheckedRadio("body-list-div")==0)
            {
                $("label[for='body-radio']").css("background-color",'#bdbaba');
                $("label[for='body-radio']").css("color",'black');
            }
        if(findCheckedRadio("wax-list-div")==0)
            {
                $("label[for='wax-radio']").css("background-color",'#bdbaba');
                 $("label[for='wax-radio']").css("color",'black');
            }
        if(findCheckedRadio("hair-list-div")==0)
            {
                $("label[for='hair-radio']").css("background-color",'#bdbaba');
                $("label[for='hair-radio']").css("color",'black');
            }
        if(findCheckedRadio("face-list-div")==0)
            {
                $("label[for='face-radio']").css("background-color",'#bdbaba');
                $("label[for='face-radio']").css("color",'black');
            }
        if(findCheckedRadio("bridal-list-div")==0)
            {
                $("label[for='bridal-radio']").css("background-color",'#bdbaba');
                $("label[for='bridal-radio']").css("color",'black');
            }
     
    }
    function tabCount()
    {
        var count=[];
        count=findCheckedRadio("body-list-div");
        if(count==0)
            $('#body-count').hide();
        else
        {
            $('#body-count').show();
            $('#body-count').val(count);
        }
        count=findCheckedRadio("wax-list-div");
        if(count==0)
            $('#wax-count').hide();
        else
        {
            $('#wax-count').show();
            $('#wax-count').val(count);
        }
        count=findCheckedRadio("hair-list-div");
        if(count==0)
            $('#hair-count').hide();
        else
         {
             $('#hair-count').show();
             $('#hair-count').val(count);
         }   
        
        count=findCheckedRadio("face-list-div");
        if(count==0)
            $('#face-count').hide();
        else
        {
            $('#face-count').show();
            $('#face-count').val(count);
        }
        count=findCheckedRadio("bridal-list-div");
        if(count==0)
            $('#bridal-count').hide();
        else
        {
            $('#bridal-count').show();
            $('#bridal-count').val(count);
        }
    }
    
	function sort()
	{
	$('#sort-show').toggle();

	}
   
    var accessibility;
    function initApp(mode) 
    {
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user) 
			{
				// User is signed in.
                $('#user-img').attr("src","../assets/images/user1.png");
				uid = user.uid;
                var user2 = firebase.auth().currentUser;
				console.log(user,user2);
                console.log('spamodeloggedin');
                patID=uid;
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
                        user_notification=snapshot.val().new_notification;
                        
						address = "<br><br>Address:&nbsp;&nbsp;&nbsp;"+snapshot.val().address_1 + "<br><br>Locality:&nbsp;&nbsp;&nbsp;&nbsp;"+snapshot.val().address_2 + "&nbsp;&nbsp;&nbsp;&nbsp;<br><br>City:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+snapshot.val().address_3 + "<br><br>Pincode:&nbsp;&nbsp;&nbsp;"+snapshot.val().pincode;
						
						selected_location = patLoc;
						$('#user-location-cell').html(patLoc);
						$('#user-address-cell').html(address);
                        $('#user-name-1').attr('value', snapshot.val().first_name);
						$('#address-3').val('Kolkata');
                        if(snapshot.val().address_1!=null ||snapshot.val().address_1!=undefined)
                        {    
						  $('#address-1').attr('value', snapshot.val().address_1);
						  //$('#address-2').attr('value', snapshot.val().address_2);
						  $('#address-3').attr('value', snapshot.val().address_3);
						  $('#pincode').attr('value', snapshot.val().pincode);
                        }
                        patient = snapshot.val();
                       
					}).then(function()
					{					  
						  
						  name = name.trim();
						  var output= "<a id='header-user-profile'><h2> Hello "+name+"!</h2></a>";
						  displayNotificationImage(uid);
                          if(mode==1)
                              $('#next1').attr('onclick',"nextpage1()");
						  
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
                $('#user-img').attr("src","../assets/images/user.png");
				if(mode==1)
					 $('#next1').attr('onclick',"login_alt()");
                console.log('modeNOTloggedin');
				//$('#login').show();
			}
		});
		
		document.getElementById('login-sign-in').addEventListener('click', handleSignIn, false);
		document.getElementById('user-log-out').addEventListener('click', handleSignOut, false);
		document.getElementById('login-password-reset').addEventListener('click', sendPasswordReset, false);
		
	}
    
    function login_alt()
    {
        $('#myModal').show();
        window.scrollTo(0,0);
        $('#content-body').hide();
    }

	function hairModal(x)
	{
		var ser = doctors[x][11];
		var rate = doctors[x][12];
		var st = doctors[x][15];
		var output = "<table>";
		for(var i in ser)
		{
			if(st[i]==3)
				output += "<tr><td>"+ser[i]+"</td><td>Rs. "+rate[i]+"/-</td></tr>";
		}
		output += "</table>"
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("close")[8];
		$('#spa-modal-header').html("<br><br>Service Type: Hair<br><br>");
		$('#spa-modal-body').html("<br><br>"+output+"<br><br>");
		
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
	function bodyModal(x)
	{
		var ser = doctors[x][11];
		var rate = doctors[x][12];
		var st = doctors[x][15];
		var output = "<table>";
		for(var i in ser)
		{
			if(st[i]==1)
				output += "<tr><td>"+ser[i]+"</td><td>Rs. "+rate[i]+"/-</td></tr>";
		}
		output += "</table>"
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("close")[8];
		$('#spa-modal-header').html("<br><br>Service Type: Body<br><br>");
		$('#spa-modal-body').html("<br><br>"+output+"<br><br>");
		
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
	function faceModal(x)
	{
		var ser = doctors[x][11];
		var rate = doctors[x][12];
		var st = doctors[x][15];
		var output = "<table>";
		for(var i in ser)
		{
			if(st[i]==4)
				output += "<tr><td>"+ser[i]+"</td><td>Rs. "+rate[i]+"/-</td></tr>";
		}
		output += "</table>"
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("close")[8];
		$('#spa-modal-header').html("<br><br>Service Type: Face<br><br>");
		$('#spa-modal-body').html("<br><br>"+output+"<br><br>");
		
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
	function bridalModal(x)
	{
		var ser = doctors[x][11];
		var rate = doctors[x][12];
		var st = doctors[x][15];
		var output = "<table>";
		for(var i in ser)
		{
			if(st[i]==5)
				output += "<tr><td>"+ser[i]+"</td><td>Rs. "+rate[i]+"/-</td></tr>";
		}
		output += "</table>"
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("close")[8];
		$('#spa-modal-header').html("<br><br>Service Type: Face<br><br>");
		$('#spa-modal-body').html("<br><br>"+output+"<br><br>");
		
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
    function waxModal(x)
	{
		var ser = doctors[x][11];
		var rate = doctors[x][12];
		var st = doctors[x][15];
		var output = "<table>";
		for(var i in ser)
		{
			if(st[i]==2)
				output += "<tr><td>"+ser[i]+"</td><td>Rs. "+rate[i]+"/-</td></tr>";
		}
		output += "</table>"
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("close")[8];
		$('#spa-modal-header').html("<br><br>Service Type: Waxing<br><br>");
		$('#spa-modal-body').html("<br><br>"+output+"<br><br>");
		
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

    function generateServiceDivMobile_profile(serflag)
	{
        selected_services=[];
        service_per_head=[];
        caltotalamt();
        var iddoc=docId;
		var ser = doctor.services;
		rate = doctor.rates;
		var st = doctor.services_types;
		var c1="", c2="", c3="", c4="", c5="";
		var radios=[];
			for(var i in ser)
			{
                service_per_head.push(0);
				if(st[i]==1)
				{
					c1+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==2)
				{
					c2+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==3)
				{
					c3+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==4)
				{
					c4+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==5)
				{
					c5+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
			}
			var x = "<table id='service-table' width='100%' align='center'><tr>";
            x+= "<td colspan='5' width='100%' id='body-services' hidden><div id='body-list-div' class='service-divs' width='100%'><table width='100%' border='0'>"+c1+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='wax-services' hidden><div id='wax-list-div' class='service-divs' width='100%'><table width='100%'>"+c2+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='hair-services' hidden><div id='hair-list-div' class='service-divs' width='100%'><table width='100%'>"+c3+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='face-services' hidden><div id='face-list-div' class='service-divs' width='100%'><table width='100%'>"+c4+"</table></div></td>";
			x+= "<td colspan='5' width='100%' id='bridal-services' hidden><div id='bridal-list-div' class='service-divs' width='100%'><table width='100%'>"+c5+"</table></div></td>";
			x+= "</tr></table>";
			
			/*if(c1 != "")
				serflag=1;
            else if(c2 != "")
				serflag=2;
			else if(c3 != "")
				serflag=3;
			else if(c4 != "")
                serflag=4;
			else if(c5 != "")
                serflag=5;*/
				
            var x2="<table width='100%' id='outer-label-table'><tr>";
			if(c1 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='body-radio' hidden/><label class='service-label' for='body-radio'>Body</label></td></tr><tr><td><input type='text' id='body-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='disabled service-label ' >Body</label></td></tr></table></td>";
			if(c2 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='wax-radio' hidden/><label class='service-label' for='wax-radio'>Wax</label></td></tr><tr><td><input type='text' id='wax-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Wax</label></td></tr></table></td>";
			if(c3 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='hair-radio' hidden/><label class='service-label' for='hair-radio'>Hair</label></td></tr><tr><td><input type='text' id='hair-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Hair</label></td></tr></table></td>";
			if(c4 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='face-radio' hidden/><label class='service-label' for='face-radio'>Face</label></td></tr><tr><td><input type='text' id='face-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Face</label></td></tr></table></td>";
            if(c5 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='bridal-radio' hidden/><label class='service-label' for='bridal-radio'>Bridal</label></td></tr><tr><td><input type='text' id='bridal-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Bridal</label></td></tr></table></td>";
        
            x2+="</tr></table>";
           $('#label-table').html(x2);
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("back-button")[0];
		$('#spa-modal-body').html("<br>"+x+"<br><br>");
		
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
        defaultshow(serflag);
        tabCount();
        
        $('#checkout').click(function(){
            window.sessionStorage.setItem("selected_services", JSON.stringify(selected_services));
            window.sessionStorage.setItem("service_per_head", JSON.stringify(service_per_head));
            window.location ='book-appointment-spa.html?d='+iddoc+'&s=99';
        });
		$('#check-out-arrow').click(function(){
            window.sessionStorage.setItem("selected_services", JSON.stringify(selected_services));
            window.sessionStorage.setItem("service_per_head", JSON.stringify(service_per_head));
            window.location ='book-appointment-spa.html?d='+iddoc+'&s=99';
        });
	}
	function generateServiceDivMobile(x,serflag)
	{
        console.log('generateServiceDivMob');
        selected_services=[];
        service_per_head=[];
        caltotalamt();
        var iddoc=doctors[x][0];
		var ser = doctors[x][11];
		rate = doctors[x][12];
		var st = doctors[x][15];
		var c1="", c2="", c3="", c4="", c5="";
		var radios=[];
			for(var i in ser)
			{
                service_per_head.push(0);
				if(st[i]==1)
				{
					c1+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==2)
				{
					c2+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==3)
				{
					c3+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==4)
				{
					c4+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
				if(st[i]==5)
				{
					c5+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",0)' id='"+ser[i]+"' value='"+i+"' hidden/><p class='service-title'>"+ser[i]+" </p><p id='service-rate-spa'>Rs. "+rate[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+ser[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/minus%20purple.png' class='sub-but-img' onclick='subHeads("+i+",0)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/plus%20purple.png' class='add-but-img'  onclick='addHeads("+i+",0)'></td></tr></table></td></tr>";
				}
			}
			var x = "<table id='service-table' width='100%' align='center'><tr>";
            x+= "<td colspan='5' width='100%' id='body-services' hidden><div id='body-list-div' class='service-divs' width='100%'><table width='100%' border='0'>"+c1+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='wax-services' hidden><div id='wax-list-div' class='service-divs' width='100%'><table width='100%'>"+c2+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='hair-services' hidden><div id='hair-list-div' class='service-divs' width='100%'><table width='100%'>"+c3+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='face-services' hidden><div id='face-list-div' class='service-divs' width='100%'><table width='100%'>"+c4+"</table></div></td>";
			x+= "<td colspan='5' width='100%' id='bridal-services' hidden><div id='bridal-list-div' class='service-divs' width='100%'><table width='100%'>"+c5+"</table></div></td>";
			x+= "</tr></table>";
			
			/*if(c1 != "")
				serflag=1;
            else if(c2 != "")
				serflag=2;
			else if(c3 != "")
				serflag=3;
			else if(c4 != "")
                serflag=4;
			else if(c5 != "")
                serflag=5;*/
				
            var x2="<table width='100%' id='outer-label-table'><tr>";
			if(c1 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='body-radio' hidden/><label class='service-label' for='body-radio'>Body</label></td></tr><tr><td><input type='text' id='body-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='disabled service-label ' >Body</label></td></tr></table></td>";
			if(c2 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='wax-radio' hidden/><label class='service-label' for='wax-radio'>Wax</label></td></tr><tr><td><input type='text' id='wax-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Wax</label></td></tr></table></td>";
			if(c3 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='hair-radio' hidden/><label class='service-label' for='hair-radio'>Hair</label></td></tr><tr><td><input type='text' id='hair-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Hair</label></td></tr></table></td>";
			if(c4 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='face-radio' hidden/><label class='service-label' for='face-radio'>Face</label></td></tr><tr><td><input type='text' id='face-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Face</label></td></tr></table></td>";
            if(c5 != "")
				x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><input class='service' type='radio' name='sel-ser' id='bridal-radio' hidden/><label class='service-label' for='bridal-radio'>Bridal</label></td></tr><tr><td><input type='text' id='bridal-count' class='count' readonly/></td></tr></table></td>";
            else
                x2 += "<td width='20%' align='center' style='vertical-align:top;'><table><tr><td><label class='service-label disabled' >Bridal</label></td></tr></table></td>";
        
            x2+="</tr></table>";
           $('#label-table').html(x2);
		var modal = document.getElementById('spaModal');
		var span = document.getElementsByClassName("back-button")[0];
		$('#spa-modal-body').html("<br>"+x+"<br><br>");
		
		
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
		}
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
        defaultshow(serflag);
        tabCount();
        console.log('here');
        $('#checkout').click(function(){
            window.sessionStorage.setItem("selected_services", JSON.stringify(selected_services));
            window.sessionStorage.setItem("service_per_head", JSON.stringify(service_per_head));
            window.location ='book-appointment-spa.html?d='+iddoc+'&s=99';
            console.log('here2');
        });
		$('#check-out-arrow').click(function(){
           window.sessionStorage.setItem("selected_services", JSON.stringify(selected_services));
            window.sessionStorage.setItem("service_per_head", JSON.stringify(service_per_head));
            window.location ='book-appointment-spa.html?d='+iddoc+'&s=99';
            console.log('here3');
        });
	}
	
    function defaultshow(serflag)
    {
        //console.log('testing2',serflag);
        switch(parseInt(serflag))
        {
        case 1:
            $("#body-radio").prop("checked", true);
            $('#body-services').show();
            break;
        case 2:
            $("#wax-radio").prop("checked", true);
            $('#wax-services').show();
            break;
        case 4:
             $("#face-radio").prop("checked", true);
            $('#face-services').show();
            break;
        case 3:
            $("#hair-radio").prop("checked", true);
            $('#hair-services').show();
            break;
		case 5:
			 $("#bridal-radio").prop("checked", true);
            $('#bridal-services').show();
           
        }
    }

    