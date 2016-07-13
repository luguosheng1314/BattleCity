/**
 * 坦克对象，继承自MoverObj
 */
class TankObj extends MoverObj {
	constructor() {
		super();

		this.index;                        //当前坦克在aTankArr中的索引值
		this.iType = 1;                    //当前移动对象为坦克

		//渲染出生时候的动画
		this.bBorned = false;              //坦克角色是否已经出生
		this.iBornAniNum = 0;              //出生的动画循环的次数
		this.iBornPic = 0;                 //当前出生的动画所显示的图片
		this.iBornDelay = 3;               //三个循环的延迟改变一次出生的图片

		// 坦克轮胎改变相关
		this.iWheelPic = 0;
		this.iWheelDelay = 5;

		// 子弹相关
		this.iBulletDelay = 20;            //子弹延迟20个循环
		this.oBullet = new BulletObj();
	}

	born(){
		// 动画播放4次
		if (this.iBornAniNum < 4) {
			this.bornDelay = delay(this.bornDelay , 3 , () => {
				// 一个完整的动画由四张图组成
				if (this.iBornPic < 4) {
					this.iBornPic ++;
				} else {
					this.iBornPic = 0;
					this.iBornAniNum ++;
					cxt.misc.clearRect(this.x , this.y , 32 , 32);
				}
				cxt.misc.drawImage(oImg.bonus , 96 - 32 * this.iBornPic , 64 , 32 , 32 , this.x , this.y , 32 , 32);
			});
		} else {
			cxt.misc.clearRect(this.x , this.y , 32 , 32);
			this.iBornAniNum = 0;
			this.bBorned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	// 对象移动函数
	move(){
		// 改变轮胎
		this.iWheelDelay = delay(this.iWheelDelay , 5 , () => {
			this.iWheelPic = +!this.iWheelPic;
		});
		// 根据当前方向重置相关的坐标参数
		this.bMoveSet && this.moveSet();
		// 移动坦克的坐标
		if (this.bMoveAble) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
		}
		// 只有当对象的位置可以整除16才会开始检查是否可以通行（this.oPass继承自mover对象，位于碰撞函数内）
		!(this.x % 16) && !(this.y % 16) && (this.bMoveAble = this.oPass[this.iDir]());
	}

	moveSet(){
		this.bMoveSet = false;
		// 在坦克转换方向后重新定位坦克的位置，使坦克当前移动方向的左边正好能够整除16，这样就正好对齐了砖块的契合处
		this.iDir % 2 ? this.y = Math.round(this.y / 16) * 16 : this.x = Math.round(this.x / 16) * 16;
		this.speedSet();
		this.bMoveAble = this.oPass[this.iDir]();      //判断当前方向是否可以通行
	}

	shot(){
		this.oBullet.draw();
	}
}
