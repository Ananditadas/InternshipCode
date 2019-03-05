	function displayDoctors()
	{
		var output = "";
		var found = false;

		if(SearchString.length!=0)
        {
		  for(var i=0; i<doctors_list.length; i++)
		  {
			if(doctors[i][10]=="show" && doctor_location_boolean[i]==true)
			{
				found = true;
				output += "<tr><td width='100%' class='doctor-entry-row'><table width='100%' align='center' class='doctor-list-entry' border='0'><br/>";
				output += "<tr><td style='vertical-align: top;padding-top:1vw;' rowspan='4' width='20%' align='right'><img src='"+doctors[i][8]+"' width='100vw' height='100vw' class='doc-dp'></td>";

				output += "<td colspan='3' align='left'><a href='profile.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td>";
				if(doctors[i][5]==-1)
				{
					output += "<td width='35%'></td></tr>";
				}
				else
				{
					output += "<td width='35%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}

             if(doctors[i][4]!=null)
             {

                           var degrees= doctors[i][4];
					       var degree_text;
					       var deg = new Array();
					       deg = degrees.split(", ");
                    //

                            if(deg.length==0)
					       {
						      degree_text = "";
					       }
					       else if (deg.length==1)
					       {
						      degree_text = deg[0];
					       }
					       else if (deg.length==2)
					       {
						          degree_text = deg[0]+" & "+deg[1];
					       }
					       else
					       {
						      var d =  parseInt(deg.length)-2;

						      degree_text = deg[0]+", "+deg[1]+" & "+d+" more";
					       }






                   //
				output += "<tr><td id='qualification' style='padding-bottom:0px;' width='23%' class='doctor-profile-med' align='left'>"+degree_text+"</br>";
				}
				else
				{
					output += "<tr><td align='center'></td><td width='35%' class='doctor-profile-med' align='left'></br>";
				}

                //

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


                if(doctors[i][2]==0)
				{
					output += x+"<br/></td>";
				}
				else if(doctors[i][2]==1)
				{
					output += x+"<br/>Experience: "+doctors[i][2]+" year</td>";
				}
				else
				{
					output += x+"<br/>Experience: "+doctors[i][2]+" years</td>";
				}



				output += "<td width='33%' style='style='padding-left:none;' class='doctor-profile-med' colspan='2' align='left'><font color='#1a1a1a'>";
				for(var j in doctors[i][11])
				{
					if(doctors[i][15][j]==1)
						output +=  doctors[i][11][j]+"(Rs. "+doctors[i][12][j]+"/-)</br>";
					else if(doctors[i][15][j]==2)
						output +=  doctors[i][11][j]+"(Rs. "+doctors[i][12][j]+"/-)</br>";
					else if(doctors[i][15][j]==3)
						output +=  doctors[i][11][j]+" (Rs. "+doctors[i][12][j]+"/-)</br>";
				}
                output+="</font>";
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

					else
					{
						var l =  parseInt(locs.length)-2;

						loc_text = locs[0]+", "+locs[1]+" & "+l+" more";
					}
					output += "</br><font color='#03ebc3'>Home visit Availablity:</font><br/> "+loc_text+"</td>";
				}
				else
				{
					output += "</br></td>";
				}






                if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<td width='33%' align='left'><a onclick='createVisitApp("+i+")'><img src='./assets/images/book-appointment.png' width='120px' height='40px'></a></br>";
					output += "<a onclick='onlineModal("+i+")' id='consult-online-button'><img src='./assets/images/book-online.png' width='120px' height='40px'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<td width='33%' align='left'><a onclick='createVisitApp("+i+")'><img src='./assets/images/book-appointment.png' width='120px' height='40px'></a></td></tr>";

				}
				else
				{
					output += "<td width='33%' align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='./assets/images/book-online.png' width='120px' height='40px'></a></td></tr>";
				}

				//


					output += "<tr><td align='top' colspan='3' class='doctor-profile-small' style='vertical-align: top;'><br/></td>";
				    output += "</tr>";

				output += "</table><br></td></tr>";
			}
		}
        }
        else
        {

		  for(var i=0; i<doctors_list.length; i++)
		  {
			if(doctors[i][10]=="show")
			{
				found = true;
				output += "<tr><td width='100%' class='doctor-entry-row'><table width='100%' align='center' class='doctor-list-entry' border='0'><br/>";
				output += "<tr><td style='vertical-align: top;padding-top:1vw;' rowspan='4' width='20%' align='right'><img src='"+doctors[i][8]+"' width='100vw' height='100vw' class='doc-dp'></td>";

				output += "<td colspan='3' align='left'><a href='profile.html?id="+doctors[i][0]+"' class='doctor-name'>"+doctors[i][1]+"</a></td>";
				if(doctors[i][5]==-1)
				{
					output += "<td width='35%'></td></tr>";
				}
				else
				{
					output += "<td width='35%' class='doctor-profile-med'>User Rating: "+doctors[i][5]+"  (Rated by "+doctors[i][6]+" Users)</td></tr>";
				}

             if(doctors[i][4]!=null)
             {

                           var degrees= doctors[i][4];
					       var degree_text;
					       var deg = new Array();
					       deg = degrees.split(", ");
                    //

                            if(deg.length==0)
					       {
						      degree_text = "";
					       }
					       else if (deg.length==1)
					       {
						      degree_text = deg[0];
					       }
					       else if (deg.length==2)
					       {
						          degree_text = deg[0]+" & "+deg[1];
					       }
					       else
					       {
						      var d =  parseInt(deg.length)-2;

						      degree_text = deg[0]+", "+deg[1]+" & "+d+" more";
					       }






                   //
				output += "<tr><td id='qualification' style='padding-bottom:0px;' width='23%' class='doctor-profile-med' align='left'>"+degree_text+"</br>";
				}
				else
				{
					output += "<tr><td align='center'></td><td width='35%' class='doctor-profile-med' align='left'></br>";
				}

                //

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


                if(doctors[i][2]==0)
				{
					output += x+"<br/></td>";
				}
				else if(doctors[i][2]==1)
				{
					output += x+"<br/>Experience: "+doctors[i][2]+" year</td>";
				}
				else
				{
					output += x+"<br/>Experience: "+doctors[i][2]+" years</td>";
				}



				output += "<td width='33%' style='style='padding-left:none;' class='doctor-profile-med' colspan='2' align='left'><font color='#1a1a1a'>";
				for(var j in doctors[i][11])
				{
					if(doctors[i][15][j]==1)
						output +=  doctors[i][11][j]+"(Rs. "+doctors[i][12][j]+"/-)</br>";
					else if(doctors[i][15][j]==2)
						output +=  doctors[i][11][j]+"(Rs. "+doctors[i][12][j]+"/-)</br>";
					else if(doctors[i][15][j]==3)
						output +=  doctors[i][11][j]+" (Rs. "+doctors[i][12][j]+"/-)</br>";
				}
                output+="</font>";
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

					else
					{
						var l =  parseInt(locs.length)-2;

						loc_text = locs[0]+", "+locs[1]+" & "+l+" more";
					}
					output += "</br><font color='#03ebc3'>Home visit Availablity:</font><br/> "+loc_text+"</td>";
				}
				else
				{
					output += "</br></td>";
				}






                if(doctors[i][14]==4 || doctors[i][14]==5 || doctors[i][14]==7)
				{
					output += "<td width='33%' align='left'><a onclick='createVisitApp("+i+")'><img src='./assets/images/book-appointment.png' width='120px' height='40px'></a></br>";
					output += "<a onclick='onlineModal("+i+")' id='consult-online-button'><img src='./assets/images/book-online.png' width='120px' height='40px'></a></td></tr>";
				}
				else if(doctors[i][14]==1)
				{
					output += "<td width='33%' align='left'><a onclick='createVisitApp("+i+")'><img src='./assets/images/book-appointment.png' width='120px' height='40px'></a></td></tr>";

				}
				else
				{
					output += "<td width='33%' align='left'><a onclick='onlineModal("+i+")' id='consult-online-button'><img src='./assets/images/book-online.png' width='120px' height='40px'></a></td></tr>";
				}

				//


					output += "<tr><td align='top' colspan='3' class='doctor-profile-small' style='vertical-align: top;'><br/></td>";
				    output += "</tr>";

				output += "</table><br></td></tr>";
			}
		}

        }
		$('#loading-icon').hide();
		if(found==true)
			$("#list-table").html(output);
		else
		{
			var output = "<tr><td><br/><br/><br/><br/><table width='100%' align='center' class='doctor-list-entry'><tr><td align='center'><img src='./assets/images/noresult.jpg' height='300vh' width='360vw'></td></tr><tr><td><b><br/>Sorry, currently we do not have any physiotherapists available in this area. However,we are continuously working towards expanding our array of health specialists.<br/><br/>Kindly try a different search term or search filter.</b></td></tr></table></td></tr>";

			$("#list-table").html(output);
		}
	}
