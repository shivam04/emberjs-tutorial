import Component from '@ember/component';
import { w } from '@ember/string';

export default Component.extend({
	tagName: "span",
	classNames: ['shivam'],
	init(){
		this._super(...arguments);
		this.arrayOfFruits= w(this.attrs.fruits);
	},
	actions: {
		add(val){
			this.get('arrayOfFruits').pushObject(val);
		}
	}
});
