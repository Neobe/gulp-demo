document.addEventListener('DOMContentLoaded',function(){
	FastClick.attach(document.body);
},false);

function goto(page){
	document.getElementById('showclick').innerHTML ="点击了" + page;
}
