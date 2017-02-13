$(function(){
	var oL=$(".wrapbox div").length;
	var oH=$(window).height();
	var index=0,last=oL-1,next=1;
	var hack=["-webkit-","-moz-","-ms-","-o-",""];
	$(".wrapbox div").eq(index).show();
	var slidet = document.getElementById("wrap")
    if(slidet.addEventListener){
        slidet.addEventListener("touchstart", touchStart, false);
        slidet.addEventListener("touchmove", touchMove, false);
        slidet.addEventListener("touchend", touchEnd, false);
    }
    var startY=0,endY=0,changeY=0;
    var move=false;
    function touchStart(e){
    	if(e.touches.length==1){
    		move=true;
    		startY=e.touches[0].pageY;
    		endY=e.touches[0].pageY;
    		changeY=0;
    	}
    }
    var imoveing="",lmoveing="",nmoveing="",_scale=0;
    var _lstyle="display:block;",_istyle="display:block;",_nstyle="display:block;";
    function touchMove(e){
    	if(move){
    		_lstyle="display:block;";_istyle="display:block;";_nstyle="display:block;";
    		endY=e.touches[0].pageY;
    		changeY=endY-startY;
            _scale=(oH-Math.abs(changeY))/oH;
    		for(var i=0;i<hack.length;i++){
				_lstyle+=hack[i]+"transform:translateY("+(changeY-oH)+"px);";
				_nstyle+=hack[i]+"transform:translateY("+(oH+changeY)+"px);";
				_istyle+=hack[i]+"transform:translateY("+0.5*changeY+"px) scale("+_scale+");";
			}
    		
    		if(changeY>0){
				$(".wrapbox div").eq(last).attr("style",_lstyle);				
    		}
    		else if(changeY<0){
				$(".wrapbox div").eq(next).attr("style",_nstyle);
    		}
    		$(".wrapbox div").eq(index).attr("style",_istyle);
    	}
    }
    var istyle="display:block;",lstyle="display:block;",nstyle="display:block;",lnstyle="display:block;";
    var lpstyle="display:block;",npstyle="display:block;";
    function end1(){//运动结束后
    	istyle="display:block;";lnstyle="";
		for(var i=0;i<hack.length;i++){
			istyle+=hack[i]+"transform:translateY(0);";
			lnstyle+=hack[i]+"transform:translateY(0) scale(1);";
		}
		$(".wrapbox div").eq(index).attr("style",istyle);
		$(".wrapbox div").eq(last).attr("style",lnstyle);
		$(".wrapbox div").eq(next).attr("style",lnstyle);
    }
    function end(ind1,symbol){//手指离开后
        istyle="display:block;";lnstyle="display:block;";
    	for(var i=0;i<hack.length;i++){
			istyle+=hack[i]+"transition:all 0.3s;"+hack[i]+"transform:translateY("+(0.5*symbol*oH)+"px) scale(0);";
			lnstyle+=hack[i]+"transition:all 0.3s;"+hack[i]+"transform:translateY(0);";
		}
		
		$(".wrapbox div").eq(index).attr("style",istyle);
		$(".wrapbox div").eq(ind1).attr("style",lnstyle);
		setTimeout(function(){
			index=ind1;
			next=(index+1);
			last=(index-1);
			if(index==0){
				last=(oL-1);
			}
			else if(index==(oL-1)){
				next=0;
			}
			end1();
		}, 300);
    }
    function end2(ind1,symbol){
        istyle="display:block;";lnstyle="display:block;";
        for(var i=0;i<hack.length;i++){
            istyle+=hack[i]+"transform:translateY(0) scale(1);"+hack[i]+"transition:all 0.3s;";
            lnstyle+=hack[i]+"transform:translateY("+(symbol*oH)+"px);"+hack[i]+"transition:all 0.3s;";
        }
        $(".wrapbox div").eq(index).attr("style",istyle);
        $(".wrapbox div").eq(ind1).attr("style",lnstyle);
    }
    function touchEnd(e){
    	if(move){
    		move=false;
    		if(Math.abs(changeY)>200){
    			if(changeY>200){
    				end(last,1);
    			}
    			else if(changeY<-200){
    				end(next,-1);
    			}
    		}
    		else{
                if(changeY>-200&&changeY<0){
                    end2(next,1); 
                }
                else if(changeY>0&&changeY<200){
                    end2(last,-1);
                }
                setTimeout(function(){
                   
                    end1();
                }, 300);

    		}

    	}
    }
})