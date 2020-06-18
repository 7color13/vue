var app=new Vue({
  el:"#player",
  data:{
      query:"",
      musicList:[],
      musicUrl:"",
      musicCover:"",
      hotComments:[],
      isPlaying:false,
      isShow:false,
      mvUrl:""
  },
  methods:{
      searchMusic:function(){
          var that =this;
          axios.get("https://autumnfish.cn/search?keywords="+this.query)
          .then(function(response){
              that.musicList=response.data.result.songs;
          },function(err){
           console.log(err);
           
          });
      },
     playMusic:function(musicId){
         var that =this;
         //console.log(musicId);
         axios.get("https://autumnfish.cn/song/url?id="+musicId)
         .then(function(response){
             //console.log(response);  
            that.musicUrl=response.data.data[0].url;  
         },function(err){
             console.log(err);
         });
         axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
        .then(function(response){
          //console.log(response.data.songs[0].al.picUrl);
          that.musicCover=response.data.songs[0].al.picUrl;
        },function(err){
            console.log(err);
        }) ;
        axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
        .then(function(response){
            
            that.hotComments=response.data.hotComments;
        },function(err){
            console.log(err);
            })
     } ,
     play:function(){
         //console.log("play");
         this.isPlaying=true;
     },
     pause:function(){
        
         this.isPlaying=false;
     },
     playMv:function(mvid){
         var that=this;
       axios.get("https://autumnfish.cn/mv/url?id="+mvid)
       .then(function(response){
          // console.log(response.data.data.url);
          that.isShow=true;
          that.mvUrl=response.data.data.url;
       },function(err){
           console.log(err);
       })
     },
     hide:function(){
         this.isShow=false;
         this.mvUrl=""
     }
  }
})