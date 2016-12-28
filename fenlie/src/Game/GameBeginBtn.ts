/**
 * 游戏开始按钮
 * @author 
 *
 */
class GameBeginBtn extends eui.Component {
    private game_begin_btn:eui.Button;
    private camera_effect:eui.Group;
    private btn_group:eui.Group;
    private game_begin_hand_btn:eui.Button;
    private hand_group:eui.Group;
    private hand_posY:number = 0;
    
    private myStage:eui.UILayer;
    private tween_camera:egret.Tween;
    private tween_hands:egret.Tween;
    public constructor(stage) {
      super();
      this.skinName = "src/components/GameBeginBtnSkin.exml";
     
      this.myStage = stage;
      this.myStage.addChild(this);
      this.camera_effect.alpha = 0;
      this.hand_posY = this.game_begin_hand_btn.y;

      this.game_begin_hand_btn.y = 1200;
	}
	
	public ShowBtnEffect():void{     
    	  var self = this;
        self.x = -500;
        self.tween_camera = egret.Tween.get(this);
        var _tween = this.tween_camera;      
        this.enabled = false;
        self.tween_camera.to({ x: 0 },1000).call(function() {
            self.addEventListener(egret.Event.ENTER_FRAME,this.ShowEffectFunc,this);   
            _tween.pause(); 
            
        });
	}
	
	
	
	private ShowEffectFunc():void{
	    this.camera_effect.alpha += 0.2;
        this.game_begin_hand_btn.y -= 20;
	    
        if(this.game_begin_hand_btn.y <= this.hand_posY )
        {            
            this.enabled = true;
           this.game_begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);  
           this.game_begin_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBeginFunc,this);
           this.game_begin_hand_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
    	     this.removeEventListener(egret.Event.ENTER_FRAME,this.ShowEffectFunc,this);  
             this.tween_hands = egret.Tween.get(this.game_begin_hand_btn,{ loop: true });
           this.tween_hands.to({ y: (this.hand_posY + 20) },500).to({ y: this.hand_posY },500);          
        }
	}
	
	private TouchBeginFunc():void{
        this.game_begin_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBeginFunc,this);
        var self = this;
        this.hand_group.visible = false;
	}
	
    private EnterGameBtnFunc():void{  
     
        if(this.myStage != null){                    
            this.tween_hands.pause();
            this.game_begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
            this.game_begin_hand_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.EnterGameBtnFunc,this);
            this.myStage.removeChild(this);
        }
        GameController.getInstance().EnterGame();
    }
}
