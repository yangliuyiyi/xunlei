window.onload=function(){
	var tabs=document.querySelectorAll('#btn li'); //下边的按钮
	var tabLine=document.querySelector('#btn span'); //下边的按钮
	
	
	var lis=document.querySelectorAll('#imgWrap li');//所有图片li
	var texts=document.querySelectorAll('#imgWrap li img');//所有图片的字
	var versions=document.querySelectorAll('#imgWrap li span');//所有图片的按钮
	
	var footer=document.querySelector('#wrapper .footer');//获取底部
	
	var n=0; //对应每一个tab的索引值
	var tabWidth=tabs[0].offsetWidth;
	//存一个tab的宽度，为了在运动线的时候，能够有一个正确的值
	var timer;
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].index=i;  //给每一个标签添加一个索引值
		texts[i].t=texts[i].offsetTop;
		tabs[i].onmouseover=function(){
				/*
			 * 鼠标移入的时候需要做的事情
			 * 1、tab对应的线条要运动
			 * 2、图片切换
			 * 		当前图片透明度变为1
			 * 3、文字往下运动（上面的运动走完了）
			 * 		位置移动，往下走30px
			 * 		同时透明度变为1
			 * 4、版本按钮显示（上面的运动走完了）
			 * 		透明度变为1
			 */
			
			//鼠标放到按钮上后，要让运动停了
			clearInterval(timer);
			n=this.index;
			tab();
		};
		tabs[i].onmouseout=function(){
			autPlay();
		}
	}
	
	
	//自动播放
	function autPlay(){
		timer=setInterval(function(){
			//n的值变化
			n++;
			if(n==tabs.length){
				//这个条件成立，说明已经走到最后，要让他回去
				n=0;
			}
			tab();
		},2000);
	}
	autPlay();
	
	tab();//一下来就要让动画动起来
	
	function tab(){
		//用来让所有的运动都回到最初的状态
		
		for (var i = 0; i < tabs.length; i++) {
			//把所有的图片透明度设为0
			//lis[i].style.opacity=0;
			clearInterval(texts[i].timer);
			clearInterval(versions[i].timer);
			
			move(lis[i],{'opacity':0},500,'linear');//所有图片透明度先回到0
			
			
			texts[i].style.opacity=0;  //所有的文字透明度都回到0
			texts[i].style.top=texts[i].t+'px';   //让所有的文字的位置都回到最初的状态
			versions[i].style.opacity=0;      //让所有的版本按钮透明度都回到0    
		}
		//在一上来的时候就让底部下去
		move(footer,{"bottom":-90},200,'linear');
		
		move(tabLine,{'left':n*65},200,'linear');
		//move(tabLine,{'left',this.offsetLeft},200,'linear');  //让线条走到相对应的位置上
		
		//让大图切换
		move(lis[n],{'opacity':1},500,'linear',function(){
			//大图运动完了，开始运动文字
			move(texts[n],{'opacity':1,'top':texts[n].t+30},500,'linear',function(){
				//文字运动走完了，开始运动版本按钮
				move(versions[n],{'opacity':1},500,'linear');
			});
		});
	}
	
	
	//右侧内容
	var more=document.getElementById('more');
	var navs=document.getElementById('nav');
	var subLis=document.querySelectorAll('#nav li');
	var circle=document.querySelector('#nav span');

   more.onmouseenter=nav.onmouseenter=function(){
   	move(nav,{'right':0},200,'linear');
   }
   more.onmouseleave=nav.onmouseleave=function(){
   	move(nav,{'right':-162},200,'linear');
   	circle.style.display='none';//鼠标移开的时候，要让他不显示，同时位置要回到最初的地方
   	circle.style.top='108px';
   }
  
	
	//对每个li添加事件
	for (var i = 0; i < subLis.length; i++) {
		subLis[i].onmouseover=function(){
			circle.style.display='block';
			move(circle,{'top':this.offsetTop+6},200,'linear');
		}
	}
	
	//底部内容
	scroll(document,function(){
		//鼠标向上走，footer出来
		move(footer,{"bottom":0},200,'linear');
	},function(){
		//向下走
		move(footer,{"bottom":-90},200,'linear');
	});
	
	
	
	/*
	 * 鼠标滚轮事件
	 * mousewhell			IE/Chrom
	 * 		滚动方向：event.wheelDelta
	 * 				上：120
	 * 				下：-120
	 * 
	 * DOMMouseScroll		FF
	 * 		滚动方向：event.detail	
	 * 				上：-3
	 * 				下：3
	 */
	
	//封闭鼠标滚轮事件
	
	function scroll(obj,callBackUp,callBackDown){
		obj.onmousewheel=fn;
		obj.addEventListener('DOMMouseScroll',fn);
		
		function fn(ev){
			if(ev.wheelDelta==120 || ev.detail==-3){
				//这个条件成立，说明现在都是往上滚动
				//callBackUp();
				callBackUp.call(obj,ev);
			}else{
				//callBackDown();
				callBackDown.call(obj,ev);
			}
			
			ev.preventDefault();		//阻止默认body滚动的事件
			return false;				//阻止默认body滚动的事件
		}
	}
	
	/*scroll(document,function(){
		console.log('往上走了');
	},function(){
		console.log('往下走了');
	});*/
	
	/*document.onmousewheel=function(ev){
		console.log(ev.wheelDelta);
	};
	
	document.addEventListener('DOMMouseScroll',function(ev){
		console.log(ev.detail);
	});*/
};
