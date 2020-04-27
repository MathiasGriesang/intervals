notasSequ=["C","D","E","F","G","A","B"];
notasSequ2=["B","A","G","F","E","D","C"];
function identifyCorelatives(){
	switch(clave){
		case 1:
			switch(lineClave){
				case 1:return /*C4"l s i 2"*/-8;break;
				case 2:return /*C4"l s i 1"*/-6;break;
				case 3:return /*C4"l 1"*/-4;break;
				case 4:return /*C4"l 2"*/-2;break;
				case 5:return /*C4"l 3"*/0;break;
			}
		break;//G2
		case 2:
			switch(lineClave){
				case 1:return /*C4*l 3"*/0;break;
				case 2:return /*C4*l 4"*/2;break;
				case 3:return /*C4*l 5"*/4;break;
				case 4:return /*C4*l s t 1"*/6;break;
				case 5:return /*C4*l s t 2"*/8;break;
			}
		break;
		case 3:
			switch(lineClave){
				case 1:return /*C4*l1"*/-4;break;
				case 2:return /*C4*l2"*/-2;break;
				case 3:return /*C4*l3"*/0;break;
				case 4:return /*C4*l4"*/2;break;
				case 5:return /*C4"l5"*/4;break;
			}
		break;
	}
}
function notaNota(c4,p){
	var cx=0;
	var fsf=[];
	var retornaTd=[];
	for (var i = -21; i <= 21; i++) {
		fsf[i+21]=accc[i+21];
		if(chordsAcc[p][i+21]!=0){
			fsf[i+21]=chordsAcc[p][i+21];
		}
		retornaTd[i+21]="nill";
	}
	var xd="";
	for (var i = -21; i <= 21; i++) {
		if(chords[p][i+21]!=0){
			switch(fsf[i+21]){
				case 1:xd="<span class='symbol samtt'>‹</span>";break;
				case 2:xd="<span class='symbol samtt'>#</span>";break;
				case 3:xd="";break;
				case 4:xd="<span class='symbol samtt'>b</span>";break;
				case 5:xd="<span class='symbol samtt'>bb</span>";break;
			}
			if(i==c4){
				retornaTd[i+21]="C"+xd+"4";
			}else	if(i>c4){
				for(var x=0;x<=(i-c4);x++){
					if(x%(8-1)==0){
						cx++;
					}
					//11
					//notasSequ=["C","D","E","F","G","A","B"]
				}
				//alert((i-c4)-((cx-1)*(8-1)));
				retornaTd[i+21]=notasSequ[(i-c4)-((cx-1)*(8-1))]+xd+(4+cx-1);
			}else if(i<c4){
				for(var x=0;x<=((i-c4+1)*-1);x++){
					if(x%(8-1)==0){
						cx++;
					}
				}
				retornaTd[i+21]=notasSequ2[((i-c4+1)*-1)-((cx-1)*(8-1))]+xd+(3-cx+1);
			}
			cx=0;
			xd="";
		}
	}
	return retornaTd;
}
function descobreNota(c4,p){
	var retorni=notaNota(c4,p);
	for (var i = -21; i <= 21; i++) {
		if(retorni[i+21]!="nill"){
			return retorni[i+21];
		}
	}
}

function descobreIntervaloHarm(c4,p){
	var retorni=notaNota(c4,p);
	var fss="(";
	for (var i = -21; i <= 21; i++) {
		if(retorni[i+21]!="nill"){
			fss+=retorni[i+21]+" + ";
		}
	}
	fss+=")";
	fss=fss.replace(" + )",")");
	//fss
	return fss;
}

function descobreAcorde(c4,p){
	var retorni=notaNota(c4,p);
	var fss="(";
	for (var i = -21; i <= 21; i++) {
		if(retorni[i+21]!="nill"){
			fss+=retorni[i+21]+" + ";
		}
	}
	fss+=")";
	fss=fss.replace(" + )",")");
	//fss
	return fss;
}

function calcular(dados) {
	var c_or_n=[];
	c_or_n[1]=0;
	c_or_n[2]=0;
	var variation=[];
	for (var p = 1; p <= 2; p++) {
		for (var i = -21; i <= 21; i++) {
			if(chords[p][i+21]!=0){
				if(c_or_n[p]==0){
					c_or_n[p]=1;//note
				}else if(c_or_n[p]==1){
					c_or_n[p]=2;//harmonic
				}else if(c_or_n[p]==2){
					c_or_n[p]=3;//chord
				}
			}
		}
		variation[p]=true;
	}

	//accc[i+21];
	//chordsAcc[p][i+21];
	var textt="";
	var c4=identifyCorelatives();
	for (var i = 1; i <=2; i++) {
		switch(c_or_n[i]){
			case 0:variation[i]=false;break;
			case 1:textt+=descobreNota(c4,i);break;
			case 2:textt+=descobreIntervaloHarm(c4,i);break;
			case 3:textt+=descobreAcorde(c4,i);break;
		}
		if(variation[i]&&i==1&&c_or_n[2]!=0){
			textt+=" → ";
		}
	}
	return textt;
/*
	if(c_or_n[1]==0){

	}else if(c_or_n[1]==1&&c_or_n[2]==1){
		return "<div>intervalo melódico</div>";
		//ex:
    	//     2m 
		// C#4 -→ D4
	}else if(c_or_n[1]==3&&c_or_n[2]==1){
		return "<div>Acorde seguido de nota</div>";
		//ex:
		//      2m
		// C#M  -→  D4
	}else if(c_or_n[1]==1&&c_or_n[2]==3){
		return "<div>Nota seguida de acorde</div>";		
		//ex:
		//     2m
		// C#4 -→ DM
	}else if(c_or_n[1]==3&&c_or_n[2]==3){
		return "<div>Acorde seguido de acorde</div>";
		//ex:
		//     2m
		// C#M -→ DM
	}else if(c_or_n[1]==1&&c_or_n[2]==2){
		return "<div>Nota seguida de intervalo harmonico</div>";
		//ex:
		//     2m
		// C#4 -→ (D4 + D5) 8J
	}else if(c_or_n[1]==2&&c_or_n[2]==1){
		return "<div>Intervalo harmonico seguido de nota</div>";
		//ex:
		//                2m
		// 8J (C#4 + C#5) -→ D4
	}else if(c_or_n[1]==2&&c_or_n[2]==3){
		return "<div>Intervalo harmonico seguido de acorde</div>";
		//ex:
		//                2m
		// 8J (C#4 + C#5) -→ DM
	}else if(c_or_n[1]==3&&c_or_n[2]==2){
		return "<div>Acorde seguido de intervalo harmonico</div>";
		//ex:
		//     2m    
		// C#M -→ (D4 + D5) 8J
	}else if(c_or_n[1]==2&&c_or_n[2]==2){
		return "<div>Intervalo harmonico seguido de intervalo harmonico</div>";
		//ex:
		//                2m
		// 8J (C#4 + C#5) -→ (D4 + D5) (8J)
	}
*/
	//return "<div>"+(c_or_n[1]==1?"Nota":(c_or_n[1]==2?"Acorde":"Nada"))+" → "+(c_or_n[2]==1?"Nota":(c_or_n[2]==2?"Acorde":"Nada"))+"</div>";//"<div>Cm7m → GMajAdd9</div><div>C → Em</div><div>2M Mel Asc</div><div>6m Mel Desc</div><div>13J Harm</div>";
}