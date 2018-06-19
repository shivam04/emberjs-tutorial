import Component from '@ember/component';

export default Component.extend({
	num: 100,
	click(){
		this.attrs.pressed();
	}
});
