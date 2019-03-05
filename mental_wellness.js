window.onload = function(){
  var config =
  {
    apiKey: "AIzaSyBXeK6IFvPS4TySnJbp5Ya1LUA7tlifGMY",
    authDomain: "careist-20c8a.firebaseapp.com",
    databaseURL: "https://careist-20c8a.firebaseio.com",
    storageBucket: "careist-20c8a.appspot.com",
  };

  //-------------- initialising the firebase reference------------------------//
  firebase.initializeApp(config);
  var ref = firebase.database().ref('professions/mental');

  var doctors = new Array();//array containing the doctors inoformation.


  firebase.database().ref('professions/mental').on('value', function(snapshot) {
    doctors = snapshotToArray(snapshot); //Array containing the list of doctors.
    for(var i=0;i<doctors.length;i++)
    {
      var image = "";
      image = "<img src="+doctors[i].profile_picture+">";
      $("#imgdiv"+i).html(image);

      var details = "";
      details="<h3>Dr "+doctors[i].first_name+" "+doctors[i].last_name+"</h3></br></br><p class=details>"+doctors[i].degrees+"</br>Experience: <span id=ep>"+doctors[i].experience+"</span> years</br>"+doctors[i].services[0]+" Rs."+doctors[i].rates[0]+"/-";

      if(doctors[i].services[1] != undefined)
      {
        details += "</br>"+doctors[i].services[1]+" Rs. "+doctors[i].rates[1]+"/-";
      }

      if(doctors[i].availibility != undefined)
      {

        details += "</br><span style='color:#03dba2;'>Home Visit Availibility</span></br>"+doctors[i].availibility[0][3][0]+", "+doctors[i].availibility[0][3][1]+", "+doctors[i].availibility[0][3][2]+"..</p>";

      }

      $("#col2"+i).html(details);
    }




    //------- when the checkbox for consult online is checkhed.---------------//
    $('input[type="checkbox"]').click(function(){

      for(var i=0;i<doctors.length;i++)
      {
        $("#doc"+i).show();
      }

      if($(this).prop("checked") == true)
      {
        for(var i=0;i<doctors.length;i++)
        {
          if(doctors[i].services_types.indexOf("2") === -1)
          {
            $("#doc"+i).hide();
          }
        }

        $("select").attr("disabled","true");
        $(".filter-option").hover(function(){
          $(this).css("cursor","not-allowed");
        });
      }



      if($(this).prop("checked") == false)
      {
        for(var j=0;j<doctors.length;j++)
        {
          $("#doc"+j).show();
        }
        $("select").removeAttr("disabled");
        $(".filter-option").hover(function(){
          $(this).css("cursor","pointer");
        });
      }
    });
    //----------------------------------------------------------------------//







    //------------------Sort By Experience-----------------------------------//
    for(var i=0;i<doctors.length;i++)
    {
      var m = parseInt($("#doc"+i).find("#ep").text());
      console.log(m);
    }

    var $divs = $("div.doctor");
    $('#exp1').on('click', function (){
      var numericallyOrderedDivs = $divs.sort(function (a, b) {
        return Number($(a).find("#ep").text()) >= Number($(b).find("#ep").text());

      });
      $("#div3").html(numericallyOrderedDivs);
    });
      //---------------------------------------------------------------------------//


      //--------------------Sort By Fees(Low to High)-------------------------//

      var $divs = $("div.doctor");
      $('#ltoh').on('click', function (){
        var numericallyOrderedDivs = $divs.sort(function (a, b) {
          return Number($(a).find("#rate").text()) > Number($(b).find("#rate").text());

        });
      $("#div3").html(numericallyOrderedDivs);
      });

      //----------------------------------------------------------------------//


      //---------------------Sort By Fees(High to Low)------------------------//

      var $divs = $("div.doctor");
      $('#htol').on('click', function (){
        var numericallyOrderedDivs = $divs.sort(function (a, b) {
          return Number($(a).find("#rate").text()) < Number($(b).find("#rate").text());

        });
      $("#div3").html(numericallyOrderedDivs);
      });
      //-------------------------------------------------------------------------------//


      //---------------------Sort By Relevance--------------------------------//

      var $divs = $("div.doctor");
      $('#rel').on('click', function (){
        var numericallyOrderedDivs = $divs.sort(function (a, b) {
          return $(a).find("p").text() > $(b).find("p").text();

        });
      $("#div3").html(numericallyOrderedDivs);
      });
      //----------------------------------------------------------------------//

















      //------------------hide buttons for online Consultation------------------//

      for(var i=0;i<doctors.length;i++)
      {
        if(doctors[i].availibility == undefined)
        {
          $("#doc"+i).find(".slideshow-container").hide();
        }
      }

      //------------------------------------------------------------------------//














      //--------------------------Location filter-------------------------------//
      $('.selectpicker').on('changed.bs.select', function(){

        for(var i=0;i<doctors.length;i++)
        {
          $("#doc"+i).show();
        }

        var s = $(".pull-left").text();
        var loc = s.replace("Select Location","");
        console.log(loc);

        for(var i=0;i<doctors.length;i++)
        {
          if(doctors[i].availibility != undefined)
          {

            var docLocations = new Array();
            for(var j=0;j<doctors[i].availibility.length;j++)
            {
              docLocations = docLocations.concat(doctors[i].availibility[j][3]);

            }

            if(docLocations.indexOf(loc) === -1)
            {
              $("#doc"+i).hide();
            }

          }
        }
      });






  });
  //------------------------------------------------------------------------//









  //-------------------------Reset Button----------------------------------//

  $('#reset').click(function() {
    location.reload();
  });
  //-----------------------------------------------------------------------//








  // -------------------------slider for buttons----------------------------
    $(document).ready(function(){
      $(".next").click(function(){
        $(".mySlides1").hide();
        $(".mySlides2").show();
        $(".mySlides2").css({"display": "inline-block", "margin-left": "0.2em"});
      });

      $(".prev").click(function(){
        $(".mySlides2").hide();
        $(".mySlides1").show();
      });

    });
  //----------------------------end of slide code.-----------------------------







    //--------------displaying the current date in the calendar----------------//
    var s = $.datepicker.formatDate('M d', new Date());
    $("#datepicker-2").val(s);
    //--------------------------------------------------------------------------//

















}


//---------- Retrieving the list of doctors from databse into an array--------
function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    returnArr.push(item);
  });

  return returnArr;
};
//-----------------------------------------------------------------------------
