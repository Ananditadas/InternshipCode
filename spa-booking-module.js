	 function services_checkbox(i)
	{
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
    function addHeads(checked_service)
    {
        console.log(checked_service);
        var getcount= parseInt($('#head_count_'+checked_service).val());
        getcount++;
        $('#head_count_'+checked_service).val(getcount);
        service_per_head[checked_service]=getcount;
        caltotalamt();
    }//);
    
    //$(document).on('click','.subHeads',function()
    function subHeads(checked_service)
    {
        
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
        total_amount = 0;
		for(var x in selected_services)
            total_amount += parseInt(doctor.rates[selected_services[x]])*service_per_head[selected_services[x]];

		$('#final-amount').html(total_amount);
    }
    