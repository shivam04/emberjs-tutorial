import Component from '@ember/component';

export default Component.extend({
	firstName: "Shivam",
	lastName: "Sinha",
	actions:{
		press(val){
			alert('hello! '+val);
		}
	}
});
