var list=[//任务列表
	/*{
		title:"吃饭打豆豆",
		isChecked:false  //不选中
	},
	{
		title:"吃饭打豆豆",
		isChecked:true  //选中
	}*/
];
//实例化
new Vue({
	el:".main",//挂载元素
	data:{//数据
		list:list,
		todo:""
	},
	methods:{//方法
		addTodo(data,ev){//添加任务
			//向list中添加任务
			/*
			 * {
			 * 	title:
			 * }
			 */
			//事件处理函数中的this指向的是，当前这个根实例
			console.log(ev);
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo=""
		},
		deleteTodo(){//删除任务
			var index=this.list.indexOf(todo);
			this.list.splice(index,1);
		}
	}
});
