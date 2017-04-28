var vue = new Vue({
	el: "#content",
	data: {
		formData: {
			msgTo: "",
			time: "",
			content: "",
			sign: ""
		},
		showingSign: false
	},
	methods: {
		validForm: function (ev) {
			this.formData.time = (new Date()).getTime();
			if(!this.showingSign)
				this.formData.sign = "_anonymity_";

			var pass = true;
			for(item in this.formData){
				if(this.formData[item].length == 0)
					pass = false;
			}
			
			if(!pass){
				ev.preventDefault();
				alert("请检查内容是否填写完整");
			}
		},
		switchSign: function () {
			this.showingSign = !this.showingSign;
		}
	}
});