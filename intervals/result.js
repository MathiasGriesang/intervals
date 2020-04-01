function calcular(dados) {
	var c_or_n=[];
	c_or_n[1]=0;
	c_or_n[2]=0;
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
	}
	//accc[i+21];
	//chordsAcc[p][i+21];
	if(c_or_n[1]==1&&c_or_n[2]==1){
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

	//return "<div>"+(c_or_n[1]==1?"Nota":(c_or_n[1]==2?"Acorde":"Nada"))+" → "+(c_or_n[2]==1?"Nota":(c_or_n[2]==2?"Acorde":"Nada"))+"</div>";//"<div>Cm7m → GMajAdd9</div><div>C → Em</div><div>2M Mel Asc</div><div>6m Mel Desc</div><div>13J Harm</div>";
}