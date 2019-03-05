    function myMap(lati,longi) {
        if((lati ==0 && longi ==0) || (lati ==null && longi ==null))
            {
            lati=22.5726; 
            longi=88.3639;
            //console.log("myMap",lati,longi);
            }
        //console.log("map-vals",lati,longi);
        var uluru = {lat: lati, lng: longi};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
	
	
		map.addListener('click', function(e) {
			latitude = e.latLng.lat();
			longitude = e.latLng.lng();
			//$("#lat").html(latitude);
			//$("#lng").html(longitude);
			marker.setPosition(new google.maps.LatLng(latitude, longitude));
            console.log("change",latitude,longitude);
			$('#mapconfirm').show();
		});
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
	
	function getDoctorInfoSpa()
	{
		return firebase.database().ref('users/'+docID+'/').once('value').then(function(snapshot) {
			doctor = snapshot.val();			
		}).then(function(){
			$('#appointment-header').html("Book an appointment with "+doctor.first_name+" "+doctor.last_name);
            $('#step-2-header-text').html("Date & Time :");
			$('#step-2-header-icon').html("2.");
            $('#step-1-header-text').html("Confirm :");
			$('#step-1-header-icon').html("3.");
			$('#step-0-header-text').html("Appointment Details :");
			$('#step-0-header-icon').html("1.");
			doctor_notification=doctor.new_notification;
            //console.log("doc",doctor_notification);
            
			var c1="", c2="", c3="", c4="", c5="";
			rate = doctor.rates;
			for(var i in doctor.services)
			{
                service_per_head.push(0);
				if(doctor.services_types[i]==1)
				{
					c1+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",1)' id='"+doctor.services[i]+"' value='"+i+"' hidden/><p class='service-title'>"+doctor.services[i]+" </p><p id='service-rate-spa'>Rs. "+doctor.rates[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+doctor.services[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/subtraction.png' class='sub-but-img' onclick='subHeads("+i+",1)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/addition.png' class='add-but-img'  onclick='addHeads("+i+",1)'></td></tr></table></td></tr>";
				}
				if(doctor.services_types[i]==2)
				{
					c2+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",2)' id='"+doctor.services[i]+"' value='"+i+"' hidden/><p class='service-title'>"+doctor.services[i]+" </p><p id='service-rate-spa'>Rs. "+doctor.rates[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+doctor.services[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/subtraction.png' class='sub-but-img' onclick='subHeads("+i+",2)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/addition.png' class='add-but-img'  onclick='addHeads("+i+",2)'></td></tr></table></td></tr>";
				}
				if(doctor.services_types[i]==3)
				{
					c3+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",3)' id='"+doctor.services[i]+"' value='"+i+"' hidden/><p class='service-title'>"+doctor.services[i]+" </p><p id='service-rate-spa'>Rs. "+doctor.rates[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+doctor.services[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/subtraction.png' class='sub-but-img' onclick='subHeads("+i+",3)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/addition.png' class='add-but-img'  onclick='addHeads("+i+",3)'></td></tr></table></td></tr>";
				}
				if(doctor.services_types[i]==4)
				{
					c4+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",4)' id='"+doctor.services[i]+"' value='"+i+"' hidden/><p class='service-title'>"+doctor.services[i]+" </p><p id='service-rate-spa'>Rs. "+doctor.rates[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+doctor.services[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/subtraction.png' class='sub-but-img' onclick='subHeads("+i+",4)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/addition.png' class='add-but-img'  onclick='addHeads("+i+",4)'></td></tr></table></td></tr>";
				}
				if(doctor.services_types[i]==5)
				{
					c5+="<tr><td><br/></td></tr><tr><td width='80%'><input type='checkbox' onchange='services_checkbox("+i+",5)' id='"+doctor.services[i]+"' value='"+i+"' hidden/><p class='service-title'>"+doctor.services[i]+" </p><p id='service-rate-spa'>Rs. "+doctor.rates[i]+"/-</p></input></td><td width='20%' class='service-td'><label class='check-box-label' for='"+doctor.services[i]+"' id='label-"+i+"'>ADD</label><table class='add-sub-service-table' id='service-"+i+"' hidden width='100%' ><tr class='calc-row'><td class='sub-but-td'><img src='../assets/images/subtraction.png' class='sub-but-img' onclick='subHeads("+i+",5)'></td><td class='head_count-td' align='center'><input  id='head_count_"+i+"' class='head_count' type='number'  readonly/></td><td class='add-but-td'><img src='../assets/images/addition.png' class='add-but-img'  onclick='addHeads("+i+",5)'></td></tr></table></td></tr>";
				}
			}
			
			var x = "<table id='service-table' width='100%'><tr>";
			if(c1 != "")
				x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><input class='service' type='radio' name='sel-ser' id='body-radio' hidden/><label class='service-label' for='body-radio'>Body</label></td></tr><tr><td><input type='text' id='body-count' class='count' readonly/></td></tr></table></td>";
            else
                x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><label class='service-label disabled'>Body</label></td></tr></table></td>";
			if(c2 != "")
				x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><input class='service' type='radio' name='sel-ser' id='wax-radio' hidden/><label class='service-label' for='wax-radio'>Wax</label></td></tr><tr><td><input type='text' id='wax-count' class='count' readonly/></td></tr></table></td>";
            else
                x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><label class='service-label disabled'>Wax</label></td></tr></table></td>";
			if(c3 != "")
				x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><input class='service' type='radio' name='sel-ser' id='hair-radio' hidden/><label class='service-label' for='hair-radio'>Hair</label></td></tr><tr><td><input type='text' id='hair-count' class='count' readonly/></td></tr></table></td>";
            else
                x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><label class='service-label disabled'>Hair</label></td></tr></table></td>";
			if(c4 != "")
				x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><input class='service' type='radio' name='sel-ser' id='face-radio' hidden/><label class='service-label' for='face-radio'>Face</label></td></tr><tr><td><input type='text' id='face-count' class='count' readonly/></td></tr></table></td>";
            else
                x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><label class='service-label disabled'>Face</label></td></tr></table></td>";
            if(c5 != "")
				x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><input class='service' type='radio' name='sel-ser' id='bridal-radio' hidden/><label class='service-label' for='bridal-radio'>Bridal</label></td></tr><tr><td><input type='text' id='bridal-count' class='count' readonly/></td></tr></table></td>";
            else
                x += "<td width='20%' align='center' style='vertical-align:top;'><table class='inner-label-table'><tr><td><label class='service-label disabled'>Bridal</label></td></tr></table></td>";
            
            x+= "</tr><tr>";
            x+= "<td colspan='5' width='100%' id='body-services' hidden><div id='body-list-div' class='service-divs' width='100%'><table width='100%' border='0'>"+c1+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='wax-services' hidden><div id='wax-list-div' class='service-divs' width='100%'><table width='100%'>"+c2+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='hair-services' hidden><div id='hair-list-div' class='service-divs' width='100%'><table width='100%'>"+c3+"</table></div></td>";
            x+= "<td colspan='5' width='100%' id='face-services' hidden><div id='face-list-div' class='service-divs' width='100%'><table width='100%'>"+c4+"</table></div></td>";
			x+= "<td colspan='5' width='100%' id='bridal-services' hidden><div id='bridal-list-div' class='service-divs' width='100%'><table width='100%'>"+c5+"</table></div></td>";
			x+= "</tr></table>"
			$('#final-amount').html(0);
            
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
			$("#service-input-cell").html(x);
            //defaultshow(serflag);
            
			var x="<select id='doc-loc'>";
            var flag=0;

			for(var i in doctor.locations)
			{
               if(doctor.locations[i]==selected_location){
				    flag=1;
                   
                   x+="<option value='"+doctor.locations[i]+"' selected>"+doctor.locations[i]+"</option>";
                   $('#address-2').attr('value', doctor.locations[i]);
               }
				else{
                   
                    x+="<option value='"+doctor.locations[i]+"'>"+doctor.locations[i]+"</option>";
                }
			}
            x+="</select>";
            //console.log(flag);
            if(flag == 0)
                {
                //console.log("check2");
                selected_location=doctor.locations[0];
                //console.log(doctor.locations[0],selected_location);
                $('#address-2').attr('value', selected_location);
                }
			$("#doctor-location-cell").html(x);
			getAvail();	
			//getLocations();
			
			
			$("#appointment-body").show();
		})
        .then(function(){
            if(window.sessionStorage.length!=0)
                {
                    selected_services = JSON.parse(window.sessionStorage.getItem("selected_services"));
                    service_per_head = JSON.parse(window.sessionStorage.getItem("service_per_head"));
                    //console.log(selected_services,service_per_head);
                    caltotalamt();
                    autochecker();
                }
				$('#loading-icon').hide();
        });
	}

    function highlight_labels()
	{
		for(var i in radios)
		{
			$("label[for='"+radios[i]+"']").addClass('highlight-labels');
			
		}
	}
	$(document).on('change','#date-input',function (){
	/*$("#date-input").change(function(){*/
		var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        //console.log('time');
        $("#time-row").show();
		var x = $("#date-input").val();
		start_time= [];
		end_time = [];
		var y = x.split("-");
        
		var z = new Date(y[2], y[1]-1, y[0], 0,0,0,0);
		var day = days[z.getDay()];
		date = z;
		var avail = doctor.availibility;
        
		var avID = [];
		for(var i in avail)
		{
			for (var j in avail[i][0])
			{   
				if(avail[i][0][j] == day)
                    {
                    
					avID.push(i);
                    }
			}
		}
        
		var z =$('#address-2').val();//selected_location; //patLoc;
		for( var i in avID)
		{
			for(var j in avail[avID[i]][3])
			{    
				if(z == avail[avID[i]][3][j])
				{
					start_time.push(avail[avID[i]][1]);
					end_time.push(avail[avID[i]][2]);
				}
			}
			
		}
        //console.log(start_time,end_time);
        var ampm1,ampm2;
        var today=new Date();
        var hour_now=today.getHours()+1;//booking allowed only after 2 hrs from current time
        
        var dd=today.getDate();
        var mm=today.getMonth()+1;
        var yyyy=today.getFullYear();
        var today_flag=false;
        if(dd<10)
        {
            dd='0'+dd;
        } 
        if(mm<10)
        {
            mm='0'+mm;
        } 
        var today_string = dd+'-'+mm+'-'+yyyy;
        if(today_string==x)
            today_flag=true;
        var time_row1=[],time_row2=[],time_row3=[],time_row4=[],max_depth=0;
        var output = "<table id='time-input' width='100%'>";
			for(var j in start_time)
			{    
				if(parseInt(start_time[j])<parseInt(end_time[j]))
				{
                    for(var i =parseInt(start_time[j]); i<parseInt(end_time[j]); i++)
		              {
                           if(i>=6 && i<12)
                            time_row1.push(i);
                           if(i>=12 && i<16)
                            time_row2.push(i);
                           if(i>=16 && i<19)
                            time_row3.push(i);
                           if(i>=19 && i<24)
                            time_row4.push(i);
				        }
                }
            }
                 if(time_row1.length>max_depth)
                     max_depth=time_row1.length;
                 if(time_row2.length>max_depth)
                     max_depth=time_row2.length;
                 if(time_row3.length>max_depth)
                     max_depth=time_row3.length;
                 if(time_row4.length>max_depth)
                     max_depth=time_row4.length;
                output+="<tr>";
                    if(time_row1.length>0)
                        output+="<th>Morning</th>";
                    if(time_row2.length>0)
                        output+="<th>Afternoon</th>";
                    if(time_row3.length>0)
                        output+="<th>Evening</th>";
                    if(time_row4.length>0)
                        output+="<th>Night</th>";
                output+="</tr>";
                    
                    for(i=0;i<max_depth;i++)
                        {
                            output+="<tr>";    
                            if(today_flag)
                                {
                                    if(time_row1.length>0 && i<time_row1.length)
                                    {
                                        if(time_row1[i]> hour_now)
                                            output+="<td class='selectable-time' id='"+time_row1[i]+"' onclick='time_selected(&apos;"+time_row1[i]+"&apos;)'  width='25%'>"+formatAMPMhtt(time_row1[i])+" - "+formatAMPMhtt(time_row1[i]+1)+"</td>";
                                        else
                                            output+="<td class='unselectable-time' width='25%'>"+formatAMPMhtt(time_row1[i])+" - "+formatAMPMhtt(time_row1[i]+1)+"</td>";
                                    }
                                    else if(time_row1.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row2.length>0 && i<time_row2.length)
                                    {
                                        if(time_row2[i]> hour_now)
                                            output+="<td class='selectable-time' id='"+time_row2[i]+"' onclick='time_selected(&apos;"+time_row2[i]+"&apos;)' width='25%'>"+formatAMPMhtt(time_row2[i])+" - "+formatAMPMhtt(time_row2[i]+1)+"</td>";
                                        else
                                            output+="<td class='unselectable-time' width='25%'>"+formatAMPMhtt(time_row2[i])+" - "+formatAMPMhtt(time_row2[i]+1)+"</td>";
                                    }
                                    else if(time_row2.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row3.length>0 && i<time_row3.length)
                                    {
                                        if(time_row3[i]> hour_now)
                                            output+="<td class='selectable-time' id='"+time_row3[i]+"' onclick='time_selected(&apos;"+time_row3[i]+"&apos;)' width='25%'>"+formatAMPMhtt(time_row3[i])+" - "+formatAMPMhtt(time_row3[i]+1)+"</td>";
                                        else
                                            output+="<td class='unselectable-time' width='25%'>"+formatAMPMhtt(time_row3[i])+" - "+formatAMPMhtt(time_row3[i]+1)+"</td>";
                                    }
                                    else if(time_row3.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row4.length>0 && i<time_row4.length)
                                    {
                                        if(time_row4[i]> hour_now)
                                            output+="<td class='selectable-time'  id='"+time_row4[i]+"' onclick='time_selected(&apos;"+time_row4[i]+"&apos;)' width='25%'>"+formatAMPMhtt(time_row4[i])+" - "+formatAMPMhtt(time_row4[i]+1)+"</td>";
                                        else
                                            output+="<td class='unselectable-time' width='25%'>"+formatAMPMhtt(time_row4[i])+" - "+formatAMPMhtt(time_row4[i]+1)+"</td>";
                                    }
                                    else if(time_row4.length != 0)
                                        output+="<td class='blank-td'></td>";
                                }
                            else
                                {
                                    if(time_row1.length>0 && i<time_row1.length)
                                        output+="<td class='selectable-time'  id='"+time_row1[i]+"' width='25%'>"+formatAMPMhtt(time_row1[i])+" - "+formatAMPMhtt(time_row1[i]+1)+"</td>";
                                    else if(time_row1.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row2.length>0 && i<time_row2.length)
                                        output+="<td class='selectable-time'  id='"+time_row2[i]+"'  width='25%'>"+formatAMPMhtt(time_row2[i])+" - "+formatAMPMhtt(time_row2[i]+1)+"</td>";
                                    else if(time_row2.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row3.length>0 && i<time_row3.length)
                                        output+="<td class='selectable-time'  id='"+time_row3[i]+"'  width='25%'>"+formatAMPMhtt(time_row3[i])+" - "+formatAMPMhtt(time_row3[i]+1)+"</td>";
                                    else if(time_row3.length != 0)
                                        output+="<td class='blank-td'></td>";
                                    if(time_row4.length>0 && i<time_row4.length)
                                        output+="<td class='selectable-time'  id='"+time_row4[i]+"'  width='25%'>"+formatAMPMhtt(time_row4[i])+" - "+formatAMPMhtt(time_row4[i]+1)+"</td>";
                                    else if(time_row4.length != 0)
                                        output+="<td class='blank-td'></td>";
                                }
                        }
        output +="</table>";
		if(start_time.length>0)
		{
			$("#time-input-cell").html(output);	
		}
		else
		{
			$("#time-input-cell").html("<br/><br/>The doctor is not available at the selected location on the selected date. Please change the date to book an appointment.<br/>");	
		}	
	});
	
	function formatAMPMhtt(hours)
    {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var strTime = hours + ampm;
        return strTime;
    }
    
    $(document).on("click", "#time-input td", function(e) {
        selected_time=$(this).attr('id');
        if(selected_time!=undefined)
            {
                $('.highlighted').removeClass('highlighted');
                $(this).toggleClass('highlighted'); 
            }
    });
   
    function time_selected(time)
        {
            selected_time=time;
            //console.log(selected_time);
            $('.highlighted').removeClass('highlighted');
            $("#"+time).toggleClass('highlighted');
        }
	function getAvail()
	{
		    docAvail = doctor.availibility;
			//console.log(selected_location,$('#doc-loc').val());
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
			var x="The specialist is available at "+selected_location+" on:<br/>";
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
				x +=" from "+formatAMPMh(docAvail[avIds[i]][1])+" to "+formatAMPMh(docAvail[avIds[i]][2])+"<br/>";
			}
            $("#doc-availibility").html(x+"<br/>");
            av=[];//REINITIALIZE ARRAY CONTAINING DAYS IN NUMERICAL FORMAT TO HIGHLIGHT
            arrlength = cdays.length;
            for(x = 0; x < arrlength; x++) {
            switch (cdays[x]){
                case "Sun":
                    av.push("0");
                    break;
                case "Mon":
                    av.push("1");
                    break;
                case "Tue":
                    av.push("2");
                    break;
                case "Wed":
                    av.push("3");
                    break;
                case "Thu":
                    av.push("4");
                    break;
                case "Fri":
                    av.push("5");
                    break;
                case "Sat":
                    av.push("6");
                    break;    
                     }
            }
            //console.log("before",cdays,av);
            $("#date-input").datepicker('destroy');
            //date();
            $('#date-input').datepicker({
                minDate: 0 ,
                dateFormat: "dd-mm-yy",
                maxDate: '+1m',
                beforeShowDay: function available(date) {
                d = date.getDay().toString();
                if ($.inArray(d, av) != -1) {
                    return [true, ""];
                } 
                else {
                    return [false,""];
                }
               }
            });
            $("#date-input").datepicker('refresh');
	}
	 
    function formatAMPMh(hours)
    {
        
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var strTime = hours + ':00' + ampm;
        return strTime;
    }
    
    function submitdata()
	{
		serID =$('#service-input').val();
		date = $('#date-input').val();
		loc = $('#doc-loc').val();//selected_location;
		time = selected_time;//$('#time-input').val(); 
		response_time = $('#response-time').val();
		var d = new Date();
		var n = d.getTime();
        console.log(selected_location);
        var add1=$('#address-1').val();
        var add2=$('#address-2').val();
        var add3=$('#address-3').val();
        var pin=$('#pincode').val();
        console.log(time);
		if(serID==99)
		{
			createModal("No Service Selected! Please select a service to continue.");
		}
		else if(date == null)
		{
			createModal("No Date Selected! Please select a date to continue.");
		}
		else if(time == null)
		{
			createModal("No Time Selected! Please select a time to continue.");
		}
        else if(add1=="" || add2=="" || add3=="" || pin=="")
            {
                createModal("No Address provided! Please enter a valid address.")
            }
		else
		{
			if(lati== null || longi==null || lati==22.5726|| longi==88.3639)
			{
				lati=0; longi =0;		
			}
			
			var appRef = firebase.database().ref('appointments/');
			appID = appRef.push({ 
				'doctor_id': docID,
				'doctor_name': doctor.first_name+" "+doctor.last_name,
				'doctor_contact' : doctor.mobile_number,
				'patient_id': patID,
				'patient_name': patient.first_name+" "+patient.last_name,
				'patient_contact' : patient.mobile_number,
				'service_id': serID,
				'service_name': doctor.services[serID],
                'service_rate': doctor.rates[serID],
				'location': loc,
				'address': add1+"; \n"+add2+"; \n"+add3+" \n"+pin,
				'date': date,
				'time': time,
				'status': "REQUESTED",
				'timestamp': n,
				'latitude': lati,
				'longitude': longi,
                'spa_appointment':false
			});
			var x = appID.key;
			console.log(x);
            
            firebase.database().ref('admin/appointments/'+x).set({ 
				'doctor_id': docID,
				'doctor_name': doctor.first_name+" "+doctor.last_name,
				'doctor_contact' : doctor.mobile_number,
				'patient_id': patID,
				'patient_name': patient.first_name+" "+patient.last_name,
				'patient_contact' : patient.mobile_number,
				'service_id': serID,
				'service_name': doctor.services[serID],
                'service_rate': doctor.rates[serID],
				'location': loc,
				'address': add1+"; \n"+add2+"; \n"+add3+" \n"+pin,
				'date': date,
				'time': time,
				'status': "REQUESTED",
				'timestamp': n,
				'latitude': lati,
				'longitude': longi,
                'spa_appointment':false,
                'id':x
			});
            
			var updates = {};
			var docApp = doctor.appointments;
			
			if (docApp == null)
				docApp = [];
			var patApp = patient.appointments;
			
			if (patApp==null)
				patApp = [];
			docApp.push(x);
			patApp.push(x);
            
            user_notification=sethome(user_notification);
            doctor_notification=sethome(doctor_notification);
            //console.log("user",user_notification,"doctor",doctor_notification);
            
			updates['/users/' +docID+'/appointments'] = docApp;
			updates['/users/' +patID+'/appointments'] = patApp;
			updates['/appointments/'+x+'/id']=x;
            //updates['admin/appointments/'+x+'/id']=x;
			updates['/users/' +docID+'/new_notification'] = doctor_notification;
			updates['/users/' +patID+'/new_notification'] = user_notification;
            updates['/users/' +patID+'/address_1'] = $('#address-1').val();
		    updates['/users/' +patID+'/address_2'] = $('#address-2').val();
		    updates['/users/' +patID+'/address_3'] = $('#address-3').val();
		    updates['/users/' +patID+'/pincode'] = $('#pincode').val();
            updates['/users/' +patID+'/latitude'] = latitude;//map coordinates
		    updates['/users/' +patID+'/longitude'] = longitude;
            
			firebase.database().ref().update(updates).then(function(){
			
			     /*var pat_msg="Hello "+patient.first_name+", we have recieved your booking request with "+doctor.first_name+" "+doctor.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for help. To view status of your booking: https://tx.gl/r/1OFV/#AdvdTrack#";*/
                var pat_msg = "Hello "+patient.first_name+", we have recieved your booking request with "+ doctor.first_name+" "+doctor.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for help. To view status of your booking: https://tx.gl/r/1OFV/#AdvdTrack#";
                
				var doc_msg = "Hi, you have received a new appointment request from "+patient.first_name+" "+patient.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for assistence. Click to respond: https://tx.gl/r/1KpY/#AdvdTrack#";
                /*var doc_msg = "You have received a new appointment request from "+patient.first_name+" "+patient.last_name+". For any assistance call us on 9163849097. Please check you dashboard to accept the request: https://tx.gl/r/1Esl/#AdvdTrack#";*/
        
				console.log(pat_msg);
				console.log(doc_msg);
				doc_msg = encodeURI(doc_msg);
				pat_msg = encodeURI(pat_msg);
				console.log(pat_msg);
				console.log(doc_msg);
				$.ajax({
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
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						firebase.database().ref('admin/texterror/').push({
							'doc_number': doctor.mobile_number,
							'doc_name': doctor.first_name+" "+doctor.last_name,
							'status':status
						});
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
						'numbers': patient.mobile_number,
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
						firebase.database().ref('admin/texterror/').push({
							'pat_number': patient.mobile_number,
							'pat_name': patient.first_name+" "+patient.last_name,
							'status':status
						});
						console.log("error: "+jqXHR);
					}
				});
			
			
			
			successModal(x);
			
			});
			
		}
	}
	
	function submitdataSpa()
	{
		//serID =$('#service-input').val();
        nextflag=check2();
        if(nextflag==false)
        {    
		serID=selected_services;
		date = $('#date-input').val();
		loc =  $('#doc-loc').val();//selected_location;
		time = selected_time;//$('#time-input').val(); 
		response_time = $('#response-time').val();
		var d = new Date();
		var n = d.getTime();
        var add1=$('#address-1').val();
        var add2=$('#address-2').val();
        var add3=$('#address-3').val();
        var pin=$('#pincode').val();
        
		if(serID==99)
		{
			createModal("No Service Selected! Please select a service to continue.");
		}
		else if(date == null)
		{
			createModal("No Date Selected! Please select a date to continue.");
		}
		else if(time == null)
		{
			createModal("No Time Selected! Please select a time to continue.");
		}
        else if(add1=="" || add2=="" || add3=="" || pin=="")
            {
                createModal("No Address provided! Please enter a valid address.")
            }
		else
		{
			if(lati== null || longi==null || lati==22.57|| longi==88.36)
			{
				lati=0; longi =0;		
			}
			
			var appRef = firebase.database().ref('appointments/');
			appID = appRef.push({ 
				'doctor_id': docID,
				'doctor_name': doctor.first_name+" "+doctor.last_name,
				'doctor_contact' : doctor.mobile_number,
				'patient_id': patID,
				'patient_name': patient.first_name+" "+patient.last_name,
				'patient_contact' : patient.mobile_number,
				'service_id': selected_services,
				'service_name': doctor.services,
                'service_rate':doctor.rates,
                'service_type':doctor.services_types,
				'service_per_head':service_per_head,
				'location': loc,
				'address': add1+"; \n"+add2+"; \n"+add3+" \n"+pin,
				'date': date,
				'time': time,
				'status': "REQUESTED",
				'timestamp': n,
				'latitude': lati,
				'longitude': longi,
                'spa_appointment':true
			});
			var x = appID.key;
			console.log(x);
            
            firebase.database().ref('admin/spa_appointments/'+x).set({ 
				'doctor_id': docID,
				'doctor_name': doctor.first_name+" "+doctor.last_name,
				'doctor_contact' : doctor.mobile_number,
				'patient_id': patID,
				'patient_name': patient.first_name+" "+patient.last_name,
				'patient_contact' : patient.mobile_number,
				'service_id': selected_services,
				'service_name': doctor.services,
                'service_rate': doctor.rates,
                'service_type':doctor.services_types,
				'service_per_head':service_per_head,
				'location': loc,
				'address': add1+"; \n"+add2+"; \n"+add3+" \n"+pin,
				'date': date,
				'time': time,
				'status': "REQUESTED",
				'timestamp': n,
				'latitude': lati,
				'longitude': longi,
                'spa_appointment':true,
                'id':x
			});
            
			var updates = {};
			var docApp = doctor.appointments;
			
			if (docApp == null)
				docApp = [];
			var patApp = patient.appointments;
			
			if (patApp==null)
				patApp = [];
			docApp.push(x);
			patApp.push(x);
            
            user_notification=sethome(user_notification);
            doctor_notification=sethome(doctor_notification);
            
			updates['/users/' +docID+'/appointments'] = docApp;
			updates['/users/' +patID+'/appointments'] = patApp;
            updates['/appointments/'+x+'/id']=x;
            //updates['admin/spa_appointments/'+x+'/id']=x;
			updates['/users/' +docID+'/new_notification'] = doctor_notification;
			updates['/users/' +patID+'/new_notification'] = user_notification;
            updates['/users/' +patID+'/address_1'] = $('#address-1').val();
		    updates['/users/' +patID+'/address_2'] = $('#address-2').val();
		    updates['/users/' +patID+'/address_3'] = $('#address-3').val();
		    updates['/users/' +patID+'/pincode'] = $('#pincode').val();
            updates['/users/' +patID+'/latitude'] = latitude;//map coordinates
		    updates['/users/' +patID+'/longitude'] = longitude;
            
            
			firebase.database().ref().update(updates).then(function(){
			
			     /*var pat_msg="Hello "+patient.first_name+", we have recieved your booking request with "+doctor.first_name+" "+doctor.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for help. To view status of your booking: https://tx.gl/r/1OFV/#AdvdTrack#";*/
                var pat_msg = "Hello "+patient.first_name+", we have recieved your booking request with "+ doctor.first_name+" "+doctor.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for help. To view status of your booking: https://tx.gl/r/1OFV/#AdvdTrack#";
                
				var doc_msg = "Hi, you have received a new appointment request from "+patient.first_name+" "+patient.last_name+" for "+date+", "+formatAMPMh(time)+". Call 7605837667 for assistence. Click to respond: https://tx.gl/r/1KpY/#AdvdTrack#";
                /*var doc_msg = "You have received a new appointment request from "+patient.first_name+" "+patient.last_name+". For any assistance call us on 9163849097. Please check you dashboard to accept the request: https://tx.gl/r/1Esl/#AdvdTrack#";*/
				console.log(pat_msg);
				console.log(doc_msg);
				doc_msg = encodeURI(doc_msg);
				pat_msg = encodeURI(pat_msg);
				console.log(pat_msg);
				console.log(doc_msg);
				$.ajax({
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
					 	console.log(data);
						console.log(JSON.stringify(data));
					},
					error: function(jqXHR, status){
						// Error code
						firebase.database().ref('admin/texterror/').push({
							'doc_number': doctor.mobile_number,
							'doc_name': doctor.first_name+" "+doctor.last_name,
							'status':status
						});
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
						'numbers': patient.mobile_number,
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
						firebase.database().ref('admin/texterror/').push({
							'pat_number': patient.mobile_number,
							'pat_name': patient.first_name+" "+patient.last_name,
							'status':status
						});
						console.log("error: "+jqXHR);
					}
				});
                window.scrollTo(0,0);
                successModal(x);
			     
			});
		}
        }
	}
	 var accessibility=1;
    function initAppBooking() 
   {
        //console.log('initloggedin');
		firebase.auth().onAuthStateChanged(function(user)
		{
			if (user) 
			{
				// User is signed in.
                $('#user-img').attr("src","../assets/images/user1.png");
				var uid = user.uid;
                //console.log('loggedin');
				var name; 
				patID = uid; 
                //console.log(patID);
				emailVerified = user.emailVerified;
				if(emailVerified || !emailVerified)
				{
					accessibility=0;
					firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) 
					{
						name = snapshot.val().first_name;
						patLoc = snapshot.val().location;
						lati = snapshot.val().latitude;
						longi = snapshot.val().longitude;
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
				        $('#next').show();
                        $('#login-step-1').hide();
					  name = name.trim();
					  var output= "<a id='header-user-profile'><h2> Hello "+name+"!</h2></a>";
					  $("#header-user-name").html(output);
					  myMap(lati,longi);
                      //getDoctorInfo();
					  displayNotificationImage(uid);
                      $('#next').attr('onclick',"nextpage()");
					  $('#date-input').show();
					 });
					}
					else
					{
                        accessibility = 2;
                        $('#user-img').attr("src","../assets/images/user1.png");
						errorModal1("You have not verified your email. Please verify your email to access this section.");
					}
				
			}
			else
			{
                accessibility = 1;
				$('#next').attr('onclick',"login_alt()");
				/*$('#user-img').attr("src","../assets/images/user.png");
				errorModal1("You are not logged in. Please log in to access this section.");*/
                console.log('NOTloggedin');
				
			}
		});
		
		document.getElementById('login-sign-in').addEventListener('click', handleSignIn, false);
		document.getElementById('user-log-out').addEventListener('click', handleSignOut, false);
		document.getElementById('login-password-reset').addEventListener('click', sendPasswordReset, false);
		
		$('#loading-icon').hide();
        $('#part1').show();
        $('#part11').show();
        $('#part12').show();
       $('#step-1-header').show();
       $('#step-2-header').show();
	}
   
   function getDoctorInfo(docID)
	{
		return firebase.database().ref('users/'+docID+'/').once('value').then(function(snapshot) {
			doctor = snapshot.val();			
		}).then(function(){
			$('#appointment-header').html("Book an appointment with Dr. "+doctor.first_name+" "+doctor.last_name);
			
            $('#step-2-header-text').html("Date & Time :");
			$('#step-2-header-icon').html("2.");
            $('#step-1-header-text').html("Confirm :");
			$('#step-1-header-icon').html("3.");
			$('#step-0-header-text').html("Appointment Details :");
			$('#step-0-header-icon').html("1.");
			doctor_notification=doctor.new_notification;
			var x="<select id='service-input'>";
			for(var i in doctor.services)
			{
				if(doctor.services_types[i]==1)
				{
					x+="<option value='"+i+"'>"+doctor.services[i]+" (Rs. "+doctor.rates[i]+"/-)</option>";
				}
			}
			x +="</select>";
			
			$("#service-input-cell").html(x);
			//var loc=$('#user-location-cell').val();
            //window.alert("location "+loc);
			var x="<select id='doc-loc'>";
            var flag=0;
			//console.log(doctor.locations);
			//console.log(patLoc);
			for(var i in doctor.locations)
			{
               if(doctor.locations[i]==patLoc){
				    flag=1;//window.alert("check1");
                   x+="<option value='"+doctor.locations[i]+"' selected>"+doctor.locations[i]+"</option>";
                   $('#address-2').attr('value', doctor.locations[i]);
               }
				else{
                   //  window.alert("check3 "+doctor.locations[i]+" "+loc);	
                    x+="<option value='"+doctor.locations[i]+"'>"+doctor.locations[i]+"</option>";
                }
			}
            x+="</select>";
            //window.alert("check2");
            if(flag == 0)
                {
                    selected_location=doctor.locations[0];
                    $('#address-2').attr('value',selected_location);
                }
			$("#doctor-location-cell").html(x);
			getAvail();	
			//getLocations();
			
			
			$("#appointment-body").show();
		});
	}
	
    function login_alt()
    {
        $('#myModal').show();
        window.scrollTo(0,0);
        $('#content-body').hide();
    }

	$(document).on('click','#header-user-name',function (event)
	{	
		event.preventDefault();
		
		$('#profile-button').toggle();
		
	});
	$(document).on('click','#contact-us-link',function(){
		var modal = document.getElementById('contactUsModal');
		var span = document.getElementsByClassName("close")[5];
		
				
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
	$(document).on('click','#offers-link',function(){
		createModal("Coming Soon!");
	});
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
    function errorModal1(txt)
	{
		var modal = document.getElementById('errorModal');
		var span = document.getElementsByClassName("close")[4];
		
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
	function displayNotificationImage(x)
	{
		firebase.database().ref('users/'+x+'/new_notification').on('value', function(snapshot) 
		{
			var flag = snapshot.val();
			
            if(flag==true || flag==false || flag== null)
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
    function sethome(sent_notification)
    {
        var notifications=new Array();
        
        if(sent_notification==true || sent_notification==false || sent_notification==null || sent_notification==undefined)
        {    
            notifications[0]="true";
            notifications[1]="false"
        }
        else
        {    
            notifications=sent_notification.trim().split("%n");
        
        if(notifications[0]!="true")
            notifications[0]="true";
        }
        
        sent_notification=notifications[0]+"%n"+notifications[1];//update to db
        return sent_notification ;
    }
    
	$(document).on('change','#doctor-location-cell',function(){
		selected_location = $('#doc-loc').val();
		console.log(selected_location);
		console.log(patID);
        $('#address-2').attr('value', selected_location);
        getAvail();
		
	});	
	$(document).on('change','#location-input-cell',function(){
		selected_location = $('#location-input').val();
		console.log(selected_location);
		var updates = {};
		updates['/users/' +patID+'/location'] = selected_location;
		firebase.database().ref().update(updates).then(function(){
		
		});
	});		
			
    function confirmsubmission()
		{
		var updates={};
		updates['/users/' +patID+'/latitude'] = latitude;//map coordinates
		updates['/users/' +patID+'/longitude'] = longitude;
		firebase.database().ref().update(updates).then(function(){
		//location.reload(true);
            lati=latitude;
            longi=longitude;
            myMap(latitude,longitude);
		});
		$('#mapconfirm').hide();
		mapflag=1;
		}
    function cancelsubmission()
		{
            myMap();
		    $('#mapconfirm').hide();
		}
    function getLocations(location)
	{
		return firebase.database().ref('locations').once('value').then(function(snapshot) {
			location_objects = snapshot.val();
			locations = Object.keys(location_objects);
			var x="<select id='address-2'>";
			for (var i in locations)
			{
				 if(locations[i]==location)
				 x += "<option id='"+locations[i]+"'value='"+locations[i]+"' selected>"+locations[i]+"</option>";
				x += "<option id='"+locations[i]+"'value='"+locations[i]+"'>"+locations[i]+"</option>";
			}
			x +="</select>";
			$("#location-input-cell").html(x);
		});
	}	
	