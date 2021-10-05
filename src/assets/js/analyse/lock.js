window.lock = {};

export default {
	set(d){
		window.lock[d] = true;
	},
	unset(d){
		window.lock[d] = false;
	},
	get state(){
		return Object.values(window.lock).every(item => item === false);
	}
}