$(function(){
  let audioId = document.getElementById("audio");
  function init() {
  $("#bar").css("display", "none");
  moveBar();
  updateShowVolume();
}

init();
$("#audioOpen").mousemove(hoverBtn)
function hoverBtn(){
  $("#bar").css("display", "flex")
}
$("#volumeBox").mouseleave(outBtn)
function outBtn(){
  $("#bar").css("display", "none")
}

  //滑鼠拖曳
  $("#sendSound").mousemove(moveBar)

  //將音量 同步成滑鼠拖曳值
  function moveBar() {
    audio.volume = $("#sendSound").val() / 100;
    if(audioId.muted){
      audioId.muted=false;
    }; 
    updateBar();
   //刷新 音量顯示值showVolume
  updateShowVolume();
  }
   //刷新音量條
  function updateBar() {
    //如果音量大於0.09 就把CLASS 換成audioOpen ,如果音量小於0.09 就把CLASS 換成audioClose
    if (audio.volume > 0) {
      $("#audioOpen").attr("class", "audioOpen")
    }
    else if (audio.volume ==0) {
      $("#audioOpen").attr("class", "audioClose")
    }
    //動態調整CSS 左右顏色的比例
    $(".sendSound").css("background-size", `${audio.volume * 100}% 100%`)
  }

  //點擊音量鈕 切換開關圖
  $("#audioOpen").click(function () {
    if(audioId.muted){
      audioId.muted=false;
        updateBar(); 
    }; 
    //按鈕切換圖片 動態賦予CLASS
    $("#audioOpen").toggleClass("audioClose")
    //如果按鈕的CLASS 相符 就把音量調為0  不然就調成0.5
    if ($("#audioOpen").attr("class") == "audioOpen audioClose") {
      audio.volume = 0;
      $("#sendSound").val(0) ;
    } else {
      audio.volume = 0.5
      $("#sendSound").val(50);
    }
    //刷新BAR
    updateBar();
   //刷新 音量顯示值showVolume
  updateShowVolume();
  });
   
  //刷新 音量顯示值showVolume
  function updateShowVolume(){
  $("#showVolume").val(`${audio.volume*100}`);
  };
  
  //音量+
  $("#volume").click(function() {
 if(audio.volume<1){
   audio.volume+=0.1;
   if(audio.volume<0.2){
  $("#audioOpen").attr("class","audioOpen")
   }
   $("#sendSound").val(audio.volume*100);
  moveBar();
   //刷新 音量顯示值showVolume
  updateShowVolume();
 return false;
 }
    
});
  //音量-
  $("#volume-").click(function() {
if(audio.volume >0.1){
    audio.volume -=0.1;
  if(audio.volume<0.11){
  $("#audioOpen").attr("class","audioClose");
   
    audio.volume = 0;
      $("#sendSound").val(0) ;
 }
    $("#sendSound").val(audio.volume*100);
  moveBar();
   //刷新 音量顯示值showVolume
  updateShowVolume();
 return false;
}
});

  
    
  //操作元素內建音訊 調整自訂音量控制圖示開關
  audioId.onvolumechange = function() 
 
{   updateBar();
if(this.muted){
  audio.volume=0;
   $("#sendSound").val(0);
    updateBar(); 
}; 
};
  
  
  
  
  //載入JqueryUI後 輸入此語法 即可拖曳
  $( "#controlBox" ).draggable();
  
  
})

