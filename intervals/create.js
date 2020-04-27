//resultado

var selecOp1=false;
var selecOp2=false;
var armaAcident="#";
var qArmaAcident=0;
var clave=1;
var lineClave=2;
var mouseH=1;
var ocorrentesA=3;
var vozes=1;

var nselId="nill";
$("input").val(0);
var cont=[];
var conta=[];
var chords=[];
var chordsAcc=[];
var accc=[];
var pautas=0;
createClave();
createArmadura();
createFormula();
createAcident(1);
createPauta(1);
createPauta(2);
createAcident(2);
changeArmadura();
resultado();
function resultado(){
	$("#resultado").html(calcular("dados"));
}
$("#partitura").append("<div style='float:left;margin-top:177px;margin-left:-5px;width:1px;height:73px;background-color:#000'></div>");
$("#partitura").append("<div style='float:left;margin-top:177px;width:5px;height:73px;background-color:#000'></div>");
function createPauta(p){
	if(p>1){
		$("#partitura").append("<div style='float:left;margin-top:177px;width:1px;height:73px;background-color:#000'></div>");
	}
  cont[p]=-1;
  conta[p]=-1;
  pautas++;
  $("#partitura").append("<div id='pauta"+p+"' class='pauta'></div>");
  $("#pauta"+p).append("<div class='noteHolder'><div class='symbol note' style='position:relative;top:-60px; color:rgba(62,168,91,0.8)'>w</div></div>");
  var d=[];
  d[0]="<div class='l-e ";
  d[1]="";//sup
  d[2]="";//l ou e
  d[3]="";//si ou ss
  d[4]=9;//numero
  d[5]="' id='";
  d[6]="'><div class='";
  d[7]="";//linha ou espaço
  d[8]="'></div></div>";
  chords[p]=[];
  chordsAcc[p]=[];
  for (var x = -21; x <= 21; x++) {
    chords[p][x+21]=0;
    chordsAcc[p][x+21]=0;
    if(x<=-5){
      d[1]="sup ";
      d[3]="ss";
      if(Math.abs(x) % 2 == 0){
        d[4]--;
        d[2]="l";
        d[7]="line";
      }else{
        d[2]="e";
        d[7]="space";
      }
    }else{
      if (x<=4) {
        if(Math.abs(x) % 2 != 0){
          d[4]--;
          d[2]="e";
          d[7]="space";
        }else{
          d[2]="l";
          d[7]="line";
        }
        if(x==-4){d[4]=5;}  
        d[1]="";
        d[3]="";
      }else{
        if(Math.abs(x) % 2 != 0){
          d[4]++;  
          d[2]="e";
          d[7]="space";
        }else{
          d[2]="l";
          d[7]="line";
        }
        if(x==5){d[4]=1;}
        d[1]="sup ";
        d[3]="si";
      }
    }
    $("#pauta"+p).append(d[0]+d[1]+d[2]+d[3]+d[4]+d[5]+p+"p"+x+d[6]+d[7]+d[8]);
  }
}


function identificaAcidentes(){
	var defaultValue=clave;
	switch(clave){
		case 1:defaultValue=2;break;//g
		case 2:defaultValue=3;break;//f
		case 3:defaultValue=6;break;//c
	}
	if(armaAcident=="b"){
		defaultValue+=3;//b
	}
	var acB = [0,3,-1,2,-2,1,-3];
	var acS = [0,4, 1,5, 2,6,3];
	var acR=[];
	switch(armaAcident){
		case "#":
			for (var i = 0; i < 7; i++) {
				acR[i]=defaultValue+acS[i]+(lineClave-1)*2;
			}
		break;
		case "b":
			for (var i = 0; i < 7; i++) {
				acR[i]=defaultValue+acB[i]+(lineClave-1)*2;
			}
		break;
	}
	for (var x = -21; x <= 21; x++) {
	  accc[x+21]=3;
	}
	var test;
	for (var i = 0; i < (qArmaAcident>7?7:qArmaAcident); i++) {
		test=acR[i];
		while(test<=21){
			accc[test+21]=armaAcident=='#'?2:4;
			test+=7;
		}
		test=acR[i];
		while(test>=-21){
			accc[test+21]=armaAcident=='#'?2:4;	
			test-=7;
		}
	}
	if(qArmaAcident>7){
		for (var i = 0; i < qArmaAcident-7; i++) {
			test=acR[i];
			while(test<=21){
				accc[test+21]=armaAcident=='#'?1:5;
				test+=7;
			}
			test=acR[i];
			while(test>=-21){
				accc[test+21]=armaAcident=='#'?1:5;	
				test-=7;
			}
		}
	}
	console.log(accc);
	
	
	
	
	//acR tem a posição dos acidentes, percorer +7 e -7 de cada posição e preencher array com os acidentes: 1 ##, 2#, 3n, 4b, 5bb
	//7;
	//qArmaAcident

}
function createClave(){
	var symbol="<div id='clave' class='symbol' style='margin-top: -39px;margin-left:5px;font-size: 46pt'>&</div>";
	var width=50;
	createExtCompas(symbol,width);
}
function createArmadura(){
	var symbol="<div id='armadura'></div>";
	var width=20;
	createExtCompas(symbol,width);
}
function createAcident(n){
	var symbol="<div id='accci"+n+"'></div>";
	var width=10;
	createExtCompas(symbol,width);
}

function createFormula(){
	var symbol="<div class='symbol' style='margin-top: -53px;font-size: 46pt'>1</div><div class='symbol' style='margin-top: -104px;font-size: 46pt'>1</div>";
	var width=25;
	createExtCompas(symbol,width);
}
function createExtCompas(symbol,width){
	var l="<div class='a'></div>";
	var e="<div class='b'></div>";
	$("#partitura").append("<div class='white-compas' style='width: "+width+"px;'>"+l+e+l+e+l+e+l+e+l+symbol+"</div>");
}

function changeArmadura(){
	var acidente;
	var aP=[];
	switch(clave){
		case 1:
			if(armaAcident=="#"){
				switch(lineClave){
					case 1:aP[1]=-82;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;//mesma da clave de fa 4 linha
					case 2:aP[1]=-100;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;
					case 3:aP[1]=-55;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;//mesma da clave de dó 1 linha
					case 4:aP[1]=-73;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-91;aP[6]=-28;aP[7]=-90;break;//mesma da clave de dó 2 linha
					case 5:aP[1]=-91;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;//mesma da clave de dó 3 linha
				}
			}else if(armaAcident=="b"){
				switch(lineClave){
					case 1:aP[1]=-45;aP[2]=-83;aP[3]=-20;aP[4]=-81;aP[5]=-19;aP[6]=-83;aP[7]=-19;break;//mesma da clave de fa 4 linha
					case 2:aP[1]=-63;aP[2]=-83;aP[3]=-20;aP[4]=-81;aP[5]=-19;aP[6]=-83;aP[7]=-19;break;
					case 3:aP[1]=-81;aP[2]=-19;aP[3]=-84;aP[4]=-19;aP[5]=-81;aP[6]=-19;aP[7]=-83;break;//mesma da clave de dó 1 linha
					case 4:aP[1]=-99;aP[2]=-19;aP[3]=-84;aP[4]=-19;aP[5]=-81;aP[6]=-19;aP[7]=-83;break;//mesma da clave de dó 2 linha
					case 5:aP[1]=-55;aP[2]=-81;aP[3]=-20;aP[4]=-83;aP[5]=-19;aP[6]=-81;aP[7]=-19;break;//mesma da clave de dó 3 linha
				}	
			}
		break;
		case 2:
			if(armaAcident=="#"){
				switch(lineClave){
					case 1:aP[1]=-91;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;//mesma da clave de dó 3 linha
					case 2:aP[1]=-46;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-91;aP[7]=-28;break;//mesma da clave de dó na 4 linha
					case 3:aP[1]=-64;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-28;aP[7]=-91;break;//mesma da clave de dó na 5 linha
					case 4:aP[1]=-82;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;
					case 5:aP[1]=-100;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;//mesma da clave de sol na 2 linha
				}
			}else if(armaAcident=="b"){
				switch(lineClave){
					case 1:aP[1]=-55;aP[2]=-81;aP[3]=-20;aP[4]=-83;aP[5]=-19;aP[6]=-81;aP[7]=-19;break;//mesma da clave de dó 3 linha
					case 2:aP[1]=-73;aP[2]=-81;aP[3]=-20;aP[4]=-83;aP[5]=-19;aP[6]=-81;aP[7]=-19;break;//mesma da clave de dó na 4 linha
					case 3:aP[1]=-91;aP[2]=-19;aP[3]=-82;aP[4]=-19;aP[5]=-83;aP[6]=-19;aP[7]=-81;break;//mesma da clave de dó na 5 linha
					case 4:aP[1]=-45;aP[2]=-83;aP[3]=-20;aP[4]=-81;aP[5]=-19;aP[6]=-83;aP[7]=-19;break;
					case 5:aP[1]=-63;aP[2]=-83;aP[3]=-20;aP[4]=-81;aP[5]=-19;aP[6]=-83;aP[7]=-19;break;//mesma da clave de sol na 2 linha
				}
			}
		break;
		case 3:
			if(armaAcident=="#"){
				switch(lineClave){
					case 1:aP[1]=-55;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;
					case 2:aP[1]=-73;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-91;aP[6]=-28;aP[7]=-90;break;
					case 3:aP[1]=-91;aP[2]=-28;aP[3]=-92;aP[4]=-28;aP[5]=-28;aP[6]=-92;aP[7]=-27;break;
					case 4:aP[1]=-46;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-91;aP[7]=-28;break;
					case 5:aP[1]=-64;aP[2]=-91;aP[3]=-29;aP[4]=-91;aP[5]=-28;aP[6]=-28;aP[7]=-91;break;
				}
			}else if(armaAcident=="b"){
				switch(lineClave){
					case 1:aP[1]=-81;aP[2]=-19;aP[3]=-84;aP[4]=-19;aP[5]=-81;aP[6]=-19;aP[7]=-83;break;//--g3
					case 2:aP[1]=-99;aP[2]=-19;aP[3]=-84;aP[4]=-19;aP[5]=-81;aP[6]=-19;aP[7]=-83;break;//--g4
					case 3:aP[1]=-55;aP[2]=-81;aP[3]=-20;aP[4]=-83;aP[5]=-19;aP[6]=-81;aP[7]=-19;break;//--g5
					case 4:aP[1]=-73;aP[2]=-81;aP[3]=-20;aP[4]=-83;aP[5]=-19;aP[6]=-81;aP[7]=-19;break;//--f2
					case 5:aP[1]=-91;aP[2]=-19;aP[3]=-82;aP[4]=-19;aP[5]=-83;aP[6]=-19;aP[7]=-81;break;//--f3
					//f4---------//--g1
					//g2---------//--f1 e f5
				}
			}
		break;
	}
	$("#partitura").find("#armadura").html("");
	var use;
	var use2=[];
	if (qArmaAcident<0) {qArmaAcident=0}
	if (qArmaAcident>14) {qArmaAcident=14}
	if(qArmaAcident>7){
		use=7;
		use2[1]=armaAcident;
		use2[2]=armaAcident;
		use2[3]=armaAcident;
		use2[4]=armaAcident;
		use2[5]=armaAcident;
		use2[6]=armaAcident;
		use2[7]=armaAcident;
		for (var i = 0; i < qArmaAcident-7; i++) {
			if (armaAcident=="#") {
				use2[i+1]="‹";
			}else if(armaAcident=="b"){
				use2[i+1]="bb";
			}
		}
	}else{
		use=qArmaAcident;
		use2[1]=armaAcident;
		use2[2]=armaAcident;
		use2[3]=armaAcident;
		use2[4]=armaAcident;
		use2[5]=armaAcident;
		use2[6]=armaAcident;
		use2[7]=armaAcident;
	}
	$("#partitura").find("#armadura").parent().css("width",("15px"));
	for (var i = 0; i < use; i++) {
		$("#partitura").find("#armadura").parent().css("width",(15*(i+1)+"px"));
		$("#partitura").find("#armadura").append("<div class='symbol' style='margin-top: "+aP[i+1]+"px;margin-left:"+(i*25-13*use+13)+"px;font-size: 36pt'>"+use2[i+1]+"</div>");	
	}
	$("#sy").html(armaAcident).css("top",(armaAcident=="#"?"1.8px":"3px"));
	identificaAcidentes();
	if(nselId!="nill"){
		var sd=nselId.substring(0,nselId.indexOf("@"));
		var p=nselId.substring(nselId.indexOf("@")+1,nselId.length);
		addAcc(p,sd);
	}
	refreshAcc(1);
	refreshAcc(2);
}

function changeClave(clve){
	clave=clve;
	switch(clve){
		case 1:$("#partitura").find("#clave").html("&").css("margin-top","-39px");$('#syb').html("&");changeClavePosition(2);$("#das").find('.a').css('background-color','#fff');$("#clavGl").css('background-color','#5EFF8A');break;
		case 2:$("#partitura").find("#clave").html("?").css("margin-top","-43px");$('#syb').html("?");changeClavePosition(4);$("#das").find('.a').css('background-color','#fff');$("#clavFl").css('background-color','#5EFF8A');break;
		case 3:$("#partitura").find("#clave").html("B").css("margin-top","-40px");$('#syb').html("B");changeClavePosition(3);$("#das").find('.a').css('background-color','#fff');$("#clavCl").css('background-color','#5EFF8A');break;
	}
	changeArmadura();
}

function changeClavePosition(li){
	lineClave=li;
	switch(clave){
		case 1:$("#partitura").find("#clave").html("&").css("margin-top",(-21-18*(li-1))+"px");break;
		case 2:$("#partitura").find("#clave").html("?").css("margin-top",(11-18*(li-1))+"px");break;
		case 3:$("#partitura").find("#clave").html("B").css("margin-top",(-4-18*(li-1))+"px");break;
	}
	changeArmadura();
}
function alinhar(p){
	for (var x = -21; x <= 21; x++) {
	  if(chords[p][x+21]==2){
	 		chords[p][x+21]=1;
	 	}
	}
  for (var x = -21; x <= 21; x++) {
    if(chords[p][x+21]!=0){
      try {
        if(chords[p][x+21+1]==chords[p][x+21]){
          switch(chords[p][x+21]){
            case 1:chords[p][x+21+1]=2;break;
            case 2:chords[p][x+21+1]=1;break;
          }
        }
      }catch (e) {}
    }
  }
  for (var x = -21; x <= 21; x++) {
    if(chords[p][x+21]==1){
      $("#pauta"+p).find(".fx"+(x*-1)).css("left","55px").css("color","#000");
    }else if(chords[p][x+21]==2){
      $("#pauta"+p).find(".fx"+(x*-1)).css("left","65px").css("color","#000");
    }
  }
}
function opcao(n,er){
  switch(er.parent().find(".tyt").attr('id')){
    case "s1":
      if(n==1){
        changeClave(2);
        er.parent().find(".m1").removeClass("m1").addClass('sss');
        er.parent().find(".tyt").removeClass("tyt").addClass('m1');
        $('.m1').css('color','#5EFF8A');
        $('.m2').css('color','#fff');
      }
      if(n==2){
        changeClave(3);
        er.parent().find(".m2").removeClass("m2").addClass('sss');
        er.parent().find(".m1").removeClass("m1").addClass('m2');
        er.parent().find(".tyt").removeClass("tyt").addClass('m1');
        $('.m1').css('color','#fff');
        $('.m2').css('color','#5EFF8A');
      }
    break;
    case "s2":
      if(n==1){
        changeClave(1);
        er.parent().find(".m1").removeClass("m1").addClass('sss');
        er.parent().find(".tyt").removeClass("tyt").addClass('m1');
      }
      if(n==2){
        changeClave(3);
        er.parent().find(".m2").removeClass("m2").addClass('sss');
        er.parent().find(".tyt").removeClass("tyt").addClass('m2');
      }
    break;
    case "s3":
      if(n==1){
        changeClave(1);
        er.parent().find(".m1").removeClass("m1").addClass('sss');
        er.parent().find(".m2").removeClass("m2").addClass('m1');
        er.parent().find(".tyt").removeClass("tyt").addClass('m2');
        $('.m1').css('color','#5EFF8A');
        $('.m2').css('color','#fff');
      }
      if(n==2){
        changeClave(2);
        er.parent().find(".m2").removeClass("m2").addClass('sss');
        er.parent().find(".tyt").removeClass("tyt").addClass('m2');
        $('.m1').css('color','#fff');
        $('.m2').css('color','#5EFF8A');
      }
    break;
  }
  er.parent().find(".sss").removeClass("sss").addClass('tyt');
  $('.tyt').css('color','#5EFF8A');
  
}
function addAcc(p,id){
	$("#acidentes > span").removeClass('selected');
  var fsf=[];
	for (var i = -21; i <= 21; i++) {
		fsf[i+21]=accc[i+21];
		if(chordsAcc[p][i+21]!=0){
			fsf[i+21]=chordsAcc[p][i+21];
		}
	}
	switch(fsf[id]){
		case 1:$('#oc1').addClass('selected');break;
		case 2:$('#oc2').addClass('selected');break;
		case 3:$('#oc3').addClass('selected');break;
		case 4:$('#oc4').addClass('selected');break;
		case 5:$('#oc5').addClass('selected');break;
	}	//$(this).append("<div style='color:#000000;z-index:-11;opacity:1;top:"+(-203-20*(+"px' class='otherHolder fx"+id+"'><div class='symbol note' style='position:relative;top:-60px'>w</div></div>");
}
function refreshAcc(p){
	$("#accci"+p).html("");
	conta[p]=-1;
	var fsf=[];
	for (var i = -21; i <= 21; i++) {
		fsf[i+21]=accc[i+21];
		if(chordsAcc[p][i+21]!=0){
			fsf[i+21]=chordsAcc[p][i+21];
		}
	}
	//console.log(chordsAcc[1]);
	//console.log(fsf);
	var xd="";
	for (var i = 21; i >= -21; i--) {
		if(chordsAcc[p][i+21]!=0){
			if(chordsAcc[p][i+21]!=accc[i+21]){
				switch(fsf[i+21]){
					case 1:xd="‹";break;
					case 2:xd="#";break;
					case 3:xd="n";break;
					case 4:xd="b";break;
					case 5:xd="bb";break;
				}
				$("#accci"+p).append("<div class='symbol' style='position:relative;top:"+(-54-37*(++conta[p])+(i*9*-1))+"px;left:50px;font-size: 24pt;"+(Math.abs(i)%2==0?((chords[p][i+21-1]!=0||chords[p][i+21+1]!=0)?"margin-left:-25px":""):"")+"'>"+xd+"</div>");
			}
		}
	}
}
function removeAcc(p,id){
	chordsAcc[p][id]=0;
}
function setStatus(text){
	$("#status > div > .i").html(text);
}