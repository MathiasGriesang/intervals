$(document).ready(function() {
	$("html").on("click", function(e) {
		if(selecOp1){$('#escolha1').toggle();selecOp1=!selecOp1;}
		if(selecOp2){$('#escolha2').toggle();selecOp2=!selecOp2;}
		/*setTimeout(function(){ 
			selecOp1=!selecOp1;
		}, 10);*/
		/*setTimeout(function(){
  		if(nselId!="nill"){
			$(this).find(".otherHolder").css("color","#000");
			nselId="nill";
		}
  		}, 5);*/
		resultado();
  });
	$("input[type='text']").on('click', function(event) {
		$(this).select();
	}).keyup(function() {
  	if($(this).val()==''){$(this).val('0');this.select();} qArmaAcident=$(this).val();changeArmadura();
	}).keypress(function(event) {
  	return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 0
	});
	$("#add1 , #add-1").on('click', function(event) {
		var v1=Number($(this).parent().find('input').val())+Number($(this).attr('id').replace('add',''));
		if(v1<0){v1=0;}
    if(v1>14){v1=14;}
		$(this).parent().find('input').val(v1);
    qArmaAcident=v1;
    changeArmadura();
	});
	$("#escolha1 , #escolha2").on('click', function(event) {
		$(this).hide();
		selecOp1=false;
		selecOp2=false;
		/*
		setTimeout(function(){ 
			selecOp2=!selecOp2;
		}, 10);
		setTimeout(function(){ 
			selecOp2=!selecOp2;
		}, 10);*/
	});
	$(".section.sa > span").on('click', function(event) {
		$(this).parent().find('span').removeClass('selected');$(this).addClass('selected');
	});
	$("#das > .a").on('click', function(event) {
		$(this).parent().find('.a').css('background-color','#fff');$(this).css('background-color','#5EFF8A')
	});
	$("#es2").on('click', function(event) {
		$('.mm1').toggle();$('.mm2').toggle();
		if(armaAcident=='#'){armaAcident='b'}else if(armaAcident=='b'){armaAcident='#'}changeArmadura();
	}).on('mouseenter', function(event) {
		$('.mm1,.mm2').css('color','#5EFF8A');
	}).on('mouseleave', function(event) {
		$('.mm1,.mm2').css('color','#fff');
	});
	$("#es1_1,#es1_2").on('click', function(event) {
		opcao(Number($(this).attr('id').replace("es1_","")),$(this));
	}).on('mouseenter', function(event) {
		$('.m'+Number($(this).attr('id').replace("es1_",""))).css('color','#5EFF8A');
	}).on('mouseleave', function(event) {
		$('.m'+Number($(this).attr('id').replace("es1_",""))).css('color','#fff');
	});
	$("#syb1").on('click', function(event) {
		$('#escolha1').toggle();
		setTimeout(function(){ 
			selecOp1=!selecOp1;
		}, 10);
	});
	$("#sy1").on('click', function(event) {
		$('#escolha2').toggle();
		setTimeout(function(){ 
			selecOp2=!selecOp2;
		}, 10);
	});
	$("button").on('click', function(event) {
		location.reload();
	});
	$("#mouse1").on('click', function(event) {
		mouseH=1;
		$("#acidentes").css("opacity","0.5");
		$("#disab").show();
		for (var x=1; x <= pautas; x++) {
    	$("#partitura").find("#pauta"+x+">.otherHolder").css("color","#000");	
    }
	});
	$("#mouse2").on('click', function(event) {
		mouseH=2;
		$("#acidentes").css("opacity","1");
		$("#disab").hide();
	});
	$("#mouse3").on('click', function(event) {
		mouseH=3;
		$("#acidentes").css("opacity","0.5");
		$("#disab").show();
		for (var x=1; x <= pautas; x++) {
    	$("#partitura").find("#pauta"+x+">.otherHolder").css("color","#000");	
    }
	});
	
	$("#acidentes").on('click','span',function(event) {
		ocorrentesA=Number($(this).attr('id').substring(2,$(this).attr("id").length));
		var sd;
		var p;
		if(nselId!="nill"){
			sd=nselId.substring(0,nselId.indexOf("@"));
			p=nselId.substring(nselId.indexOf("@")+1,nselId.length);
			chordsAcc[p][sd]=ocorrentesA;
			
			//if(chordsAcc[p][sd]==accc[]){}
			//console.log(chordsAcc[p]);
			//console.log(accc);
		}
		refreshAcc(1);
		refreshAcc(2);
	});
	/*
	if(chords[p][id*-1+21]!=0){
		nselId=id*-1+21+"@"+p;
		//note selected
	}else{
		nselId="nill";
		//nothing
	}
	*/

  $("#partitura").on('mouseenter', '.l-e', function(event) {
    var str=$(this).attr('class');
    var id=$(this).attr("id").substring(2,$(this).attr("id").length);

    if(str.search("sup")){
      var n=(str.substring(11, str.length));
      var i;
      switch(str.substring(8, 9)){
        case "e":i=n-1;break;
        case "l":i=n;break;
      }
      for (var x=1;x<=i; x++) {
        $(this).parent().find(".ls"+str.substring(10, 11)+x+" > .line").css("background-color","black");
      }
    }
    switch(mouseH){
    	case 1:$(this).parent().find('.noteHolder').find('.note').html("w");$("#partitura").find(".l-e").css("cursor","cell");break;
    	case 2:$(this).parent().find('.noteHolder').find('.note').html("");$("#partitura").find(".l-e").css("cursor","default");break;
    	case 3:$(this).parent().find('.noteHolder').find('.note').html("¿");$("#partitura").find(".l-e").css("cursor","pointer");$("#acidentes > span").removeClass('selected');break;
    }
    $(this).parent().find('.noteHolder').find('.note').parent().css('opacity','0.8').css('top',''+((304-59)+9*(id.substring(id.indexOf("p")+1, id.length)))+'px');
  }).on('mouseleave', '.l-e', function(event) {
    var str=$(this).attr('class');
    if(str.search("sup")){
      $(this).parent().find(".sup > .line").css("background-color","transparent");
    }
    $(this).parent().find('.noteHolder').find('.note').parent().css('opacity','0');
    //accc
  }).on('click', '.l-e', function(event) {
  	if(mouseH==1){
  		var str=$(this).attr('class');
	    var id=$(this).attr("id").substring(2,$(this).attr("id").length);
	    var p=Number($(this).parent().attr("id").replace("pauta", ""));
	    if(chords[p][21-id]==0){
	    	chords[p][21-id]=1;
	    	if($(this).parent().find(".fx"+id).length){
	    		 $(this).parent().find(".fx"+id).css("opacity","1");
	    	}else{
	  			$(this).parent().append("<div style='color:#000000;z-index:-11;opacity:1;top:"+(-203-20*(++cont[p])+(Number($(this).parent().find('.noteHolder').find('.note').parent().css('opacity','1').css('top').replace("px", ""))-(263-59)))+"px' class='otherHolder fx"+id+"'><div class='symbol note' style='position:relative;top:-60px'>w</div></div>");
	  		}
	  	  if(str.search("sup")){
	  	    var n=(str.substring(11, str.length));
	  	    var i;
	  	    switch(str.substring(8, 9)){
	  	      case "e":i=n-1;break;
	  	      case "l":i=n;break;
	  	    }
	  	    for (var x=1;x<=i; x++) {
	  	      $(this).parent().find(".ls"+str.substring(10, 11)+x+" > .line").css("background-color","black").removeClass('line').addClass('linex');
	  	    }
	  	  }
	    }
	    alinhar(p);
	    for (var x=1; x <= pautas; x++) {
	    	$("#partitura").find("#pauta"+x+">.otherHolder").css("color","#000");	
	    }
	    $(this).parent().find(".fx"+id).css("color","#000");
	    addAcc(p,id*-1+21);
  		
  	}else if(mouseH==2){
  		var p=Number($(this).parent().attr("id").replace("pauta", ""));
  		alinhar(p);
	    for (var x=1; x <= pautas; x++) {
	    	$("#partitura").find("#pauta"+x+">.otherHolder").css("color","#000");	
	    }
  		var id=$(this).attr("id").substring(2,$(this).attr("id").length);
  		$(this).parent().find(".fx"+id).css("color","#3EA85B");
  		addAcc(p,id*-1+21);
  		setTimeout(function(){ 
  		if(chords[p][id*-1+21]!=0){
  			nselId=id*-1+21+"@"+p;
  			//note selected
  		}else{
  			nselId="nill";
  			//nothing
  		}
  		}, 10);
  	}else if(mouseH==3){
  		var str=$(this).attr('class');
	    var id=$(this).attr("id").substring(2,$(this).attr("id").length);
	    var p=Number($(this).parent().attr("id").replace("pauta", ""));
	    if(chords[p][21-id]!=0){
	    	chords[p][21-id]=0;
	    	$(this).parent().find(".fx"+id).css("opacity","0");
	    	if(str.search("sup")){
	  	    var n=(str.substring(11, str.length));
	  	    var i;
	  	    switch(str.substring(8, 9)){
	  	      case "e":i=n-1;break;
	  	      case "l":i=n;break;
	  	    }
	  	   	var tem=true;
	  	   	var start=1;
	  	   	var end=i;
	  	   	var identify=0;
	  	   	try{
	  		   	for (var x = -21; x <= 21; x++) {
	            if((chords[p][x+21]!=0)){
	    	    		if((str.substring(10, 11)=="i")&&(x<-4)){
	                if((x+21)>(21-id)){
	                  var rec=$(this).parent().find("#"+p+"p-"+Math.abs(x)).attr("class");
	                  switch(rec.substring(8, 11)){
	                    case "ess":start=Number(rec.substring(11, rec.lenght));break;
	                    case "lss":start=Number(rec.substring(11, rec.lenght))+1;break;
	                  }
	                }else if((x+21)<(21-id)){
	                  tem=false;
	                }
	    	   				break;
	    	    		}else if((str.substring(10, 11)=="s")&&(x>4)){
	                if((x+21)<(21-id)){
	      		    		var rec=$(this).parent().find("#"+p+"p-"+Math.abs(x)).attr("class");
	      		    		switch(rec.substring(8, 11)){
	      				      case "ess":start=Number(rec.substring(11, rec.lenght));break;
	      				      case "lss":start=Number(rec.substring(11, rec.lenght))+1;break;
	      				    }
	                }else if((x+21)>(21-id)){
	                  tem=false;
	                }
	    		    	}
	            }
	  		   	}
	  		  }catch (e){}
	  		  if(tem){
	  		    for (var y=start;y<=end; y++) {
	  			    $(this).parent().find(".ls"+str.substring(10, 11)+y+" > .linex").css("background-color","transparent").removeClass('linex').addClass('line');
	  			  }
	  			}
	  	  }
	    }
	    removeAcc(p,id*-1+21);
	    refreshAcc(1);
			refreshAcc(2);
	    alinhar(p);
  	}
  	
  }).on('dblclick', '.l-e', function(event) {
  	/*
  	var str=$(this).attr('class');
    var id=$(this).attr("id").substring(2,$(this).attr("id").length);
    var p=Number($(this).parent().attr("id").replace("pauta", ""));
    if(chords[p][21-id]!=0){
    	chords[p][21-id]=0;
    	$(this).parent().find(".fx"+id).css("opacity","0");
    	if(str.search("sup")){
  	    var n=(str.substring(11, str.length));
  	    var i;
  	    switch(str.substring(8, 9)){
  	      case "e":i=n-1;break;
  	      case "l":i=n;break;
  	    }
  	   	var tem=true;
  	   	var start=1;
  	   	var end=i;
  	   	var identify=0;
  	   	try{
  		   	for (var x = -21; x <= 21; x++) {
            if((chords[p][x+21]!=0)){
    	    		if((str.substring(10, 11)=="i")&&(x<-4)){
                if((x+21)>(21-id)){
                  var rec=$(this).parent().find("#"+p+"p-"+Math.abs(x)).attr("class");
                  switch(rec.substring(8, 11)){
                    case "ess":start=Number(rec.substring(11, rec.lenght));break;
                    case "lss":start=Number(rec.substring(11, rec.lenght))+1;break;
                  }
                }else if((x+21)<(21-id)){
                  tem=false;
                }
    	   				break;
    	    		}else if((str.substring(10, 11)=="s")&&(x>4)){
                if((x+21)<(21-id)){
      		    		var rec=$(this).parent().find("#"+p+"p-"+Math.abs(x)).attr("class");
      		    		switch(rec.substring(8, 11)){
      				      case "ess":start=Number(rec.substring(11, rec.lenght));break;
      				      case "lss":start=Number(rec.substring(11, rec.lenght))+1;break;
      				    }
                }else if((x+21)>(21-id)){
                  tem=false;
                }
    		    	}
            }
  		   	}
  		  }catch (e){}
  		  if(tem){
  		    for (var y=start;y<=end; y++) {
  			    $(this).parent().find(".ls"+str.substring(10, 11)+y+" > .linex").css("background-color","transparent").removeClass('linex').addClass('line');
  			  }
  			}
  	  }
    }
    alinhar(p);
    */
  });
});