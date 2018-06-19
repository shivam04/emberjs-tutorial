import Route from '@ember/routing/route';

export default Route.extend({
	model(){
		return this.get('store').findAll('book')/*[{title:"sasa",author:"asdasdas",date:"28-03-2018"},
		{title:"sasa",author:"asdasdas",date:"28-03-2018"},
		{title:"sasa",author:"asdasdas",date:"28-03-2018"},
		{title:"sasa",author:"asdasdas",date:"28-03-2018"},
		{title:"sasa",author:"asdasdas",date:"28-03-2018"}
		]*/;
	}
});
