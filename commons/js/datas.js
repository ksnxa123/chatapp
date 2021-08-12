export default{
	friends:function(){
		let friendarr = [
			{
				id:1,
				imgurl:'../../static/images/img/face.jpg',
				name:'小海',
				time: new Date(),
				news: 'khahsdjlsanl',
				tip:2
			},
			{
				id:2,
				imgurl:'../../static/images/img/face.jpg',
				name:'大海',
				time: new Date(),
				news: 'khahsdjlsanl',
				tip:6777
			},
			{
				id:1,
				imgurl:'../../static/images/img/face.jpg',
				name:'浪子',
				time: new Date(),
				news: 'khahsdjlsanl'
			},
			{
				id:1,
				imgurl:'../../static/images/img/face.jpg',
				name:'大海',
				time: new Date(),
				news: 'khahsdjlsanl',
				tip:3
			},
			{
				id:1,
				imgurl:'four.png',
				name:'大海',
				time: new Date(),
				news: 'khahsdjlsanl'
			},
		];
		return friendarr;
	},
	isFriend:function(){
		let isfriend=[
			{
				userid:1,
				friend:2,
			},
			{
				userid:1,
				friend:5,
			},
			{
				userid:1,
				friend:6,
			},
			{
				userid:1,
				friend:8,
			}
		];
		return isfriend;
	},
	message:function(){
		let msgs = [
			{
				id:'b',
				imgurl:'face.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:15,
			},
			{
				id:'a',
				imgurl:'face.jpg',
				message:{
					voice:'a',
					time:20
				},
				types:2,
				time:new Date(),
				tip:14,
			},
			{
				id:'a',
				imgurl:'face.jpg',
				message:'黑暗圣经拉上你',
				types:0,
				time:new Date()-1000*60,
				tip:1,
			},
			{
				id:'a',
				imgurl:'face.jpg',
				message:'黑暗圣经拉上你',
				types:0,
				time:new Date()-1000*60*36,
				tip:2,
			},
			{
				id:'b',
				imgurl:'1.jpg',
				message:'1.jpg',
				types:1,
				time:new Date()-1000,
				tip:0,
			},
			{
				id:'a',
				imgurl:'1.jpg',
				message:'后来的看看啦 ',
				types:0,
				time:new Date()-1000*60,
				tip:1,
			},
			{
				id:'b',
				imgurl:'1.jpg',
				message:'1.jpg',
				types:1,
				time:new Date()-1000*60*36,
				tip:5,
			},
			{
				id:'a',
				imgurl:'1.jpg',
				message:'shhshah',
				types:0,
				time:new Date()-1000*60,
				tip:10,
			},
			{
				id:'b',
				imgurl:'1.jpg',
				message:{
					name:'天安门',
					address:'天安门内',
					latitude:'39',
					longitude:'116'
				},
				types:3,
				time:new Date(),
				tip:20,
			},
			{
				id:'a',
				imgurl:'1.jpg',
				message:{
					name:'天安门',
					address:'天安门内',
					latitude:'39',
					longitude:'116'
				},
				types:3,
				time:new Date(),
				tip:233,
			}
		];
		return msgs;
	}
}