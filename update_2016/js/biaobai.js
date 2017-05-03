var vue = new Vue({
  el: "#content",
  data: {
    formData: {
      msgTo: "",
      time: "",
      content: "",
      template: "0",
      sign: "",
      align: 1
    },
    common: {
      msgTo: "",
      content: "",
      sign: ""
    },
    showingSign: true,
    validPass: false,
    previewSrc: "update_2016\\img\\preview0.jpg"
  },
  created: function () {
    var v = this;
    setInterval(v.refreshPreview, 1000);
  },
  methods: {
    validForm: function (ev) {
      var v = this;
      v.formData.time = (new Date()).getTime();
      if(!v.showingSign)
        v.formData.sign = "_anonymity_";

      v.validPass = true;
      for(item in v.formData){
        if(v.formData[item].length == 0){
          v.validPass = false;
          v.common[item] = "请填写此项";
        }
      }
      
      if(!v.validPass){
        ev.preventDefault();
      }
    },
    validInput: function (name) {
      var v = this;
      var maxlen = 0;
      switch(name){
        case "sign":
        case "msgTo": maxlen = 6; break;
        case "content":
          if((v.formData.content.match(/\n/g) !== null ? v.formData.content.match(/\n/g).length : 0) >= 7){
            v.common.content = "请控制在7行以内哦";
            return false;
          }
          maxlen = 40;
          break;
        default: return false;
      }
      if(v.formData[name].length > maxlen){
        v.common[name] = "请控制在" + maxlen + "个字以内哦";
        v.validPass = false;
        return false;
      }
      else{
        v.common[name] = "";
        return true;
      }
    },
    switchSign: function () {
      var v = this;
      v.showingSign = !v.showingSign;
      if(v.showingSign)
        v.formData.sign = "";
      else
        v.formData.sign = "_anonymity_";
    },
    changeTemplate: function (temNo) {
      var v = this;
      v.formData.template = temNo;
      if(v.formData.content.length < 2)
        v.previewSrc = "update_2016\\img\\preview" + temNo + ".jpg";
      else
        v.refreshPreview();
    },
    changeAlign: function (type) {
      var v = this;
      v.formData.align = type;
      if(v.formData.content.length < 2)
        v.previewSrc = "update_2016\\img\\preview" + v.formData.template + ".jpg";
      else
        v.refreshPreview();
    },
    refreshPreview: function () {
      var url = "http://1000.hnu.cn/weihuda/biaobai/thumbnail.php?";
      var fd = this.formData;
      if(!((fd.content.length > 2) && (this.validInput("content"))))
        return;
      for(item in fd){
        url += item + "=" + encodeURI(fd[item]) + "&";
      }
      url = url.slice(0, -1);
      this.previewSrc = url;
    }
  }
});