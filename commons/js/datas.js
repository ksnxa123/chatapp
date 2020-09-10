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
	}
}