let debug = true;

try{
	debug = (new URL(window.location.href).searchParams.get('debug') == null);
}catch(e){
	console.log(e)
}

const debugLog = function(){
	if(debug) return;
	console.log(...arguments)
};

const debugTime = function(){
	if(debug) return;
	console.time(...arguments)
};

const debugTimeEnd = function(){
	if(debug) return;
	console.timeEnd(...arguments)
};

const debugGroup = function(){
	if(debug) return;
	console.group(...arguments)
};

const debugGroupEnd = function(){
	if(debug) return;
	console.groupEnd(...arguments)
};

export {
	debugLog,
	debugTime,
	debugTimeEnd,
	debugGroup,
	debugGroupEnd
}