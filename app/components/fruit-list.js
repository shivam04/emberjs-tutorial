import Component from '@ember/component';

export default Component.extend({
	tagName: "span",
	classNames: ['shivam'],
	init(){
		this._super(...arguments);
		this.arrayOfFruits= Ember.String.w(this.attrs.fruits);
	},
	actions: {
		add(val){
			this.get('arrayOfFruits').pushObject(val);
		}
	}
});
