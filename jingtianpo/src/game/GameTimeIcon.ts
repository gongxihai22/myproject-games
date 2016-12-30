/**
 * 游戏倒计时部分
 * @author YaoQiao
 * @date 2016-10-11
 *
 */
class GameTimeIcon extends eui.Component{
    private tenNum:eui.Image;
    private singleNum:eui.Image;
    
    
	public constructor() {
    	super();
        this.skinName = "src/gexml/GameTimeIcon.exml";
	}
	
	
	/**
	 * 设置游戏倒计时时间
	 */ 
	public set TimeNumber(value:number){
        var ten: number = parseInt((value / 10).toString());
        var single: number = parseInt((value % 10).toString());

        this.tenNum.source = "time_" + ten.toString() + "_png";
        this.singleNum.source = "time_" + single.toString() + "_png";
	}
}
