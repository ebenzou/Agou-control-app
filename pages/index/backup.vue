<template>
	<view class="page">
		
		<scroll-view scroll-x class="bg-green nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-white cur':''" v-for="(item,index) in glist.group" :key="index" @tap="tabSelect(item.id,$event)" :data-id="index">
				<text class="cuIcon-list margin-right-xs"></text>{{item.name}}
			</view>
		</scroll-view>
		<!-- <checkbox-group class="block" @change="CheckboxChange"> -->
		<view v-for="(item,index) in glist.group" :key="index" v-if="index==TabCur">
			<view class="cu-list menu card-menu margin-top">
				<view class="cu-item cu-form-group" v-for="(item,index) in glist.list" :key="index" @tap="ChooseDevice" :data-value="item.id">
					<text class="cuIcon-title" :class="item.device_stat=='online'?'text-green':'text-orange'"></text>
					<view class="content">
						<text class="cuIcon-mobilefill margin-right-xs" :class="item.checked?'text-green':'text-grey'"></text>
						<text class="cu-tag round light" :class="item.checked?'bg-olive':'bg-grey'">{{item.num}}</text>
					</view>
					<view class="action">
						<!-- <view class="cu-tag round light margin-right-xs" :class="item.checked?'bg-olive':'bg-grey'">{{item.device_num}}</view> -->
						<button class="cu-btn sm bg-grey shadow margin-right-xs" @tap="showModal" data-target="setGroup" :data-value="item.device_num">分组</button>
						<button class="cu-btn sm bg-grey shadow" @tap="showModal" data-target="setNum" :data-value="item.device_num">编号</button>
					</view>
				</view>
			</view>
		</view>
		<!-- </checkbox-group> -->
		<view class="cu-bar justify-center margin-top">
			没有数据了
		</view>
		<!-- Modal弹窗配置区 -->
		<view class="cu-modal" :class="modalName=='commomModal'?'show':''" @tap="hideModal('commomModal')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">通用</view>
					<view class="action" @tap="hideModal('klSet')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in kl_cfg" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ChooseKlCfg" :data-value="item.id"> {{item.name}}
						</button>
					</view>
				</view>
				<view class="margin justify-center">
					<button class='cu-btn bg-green shadow' @tap="klSet">开始养号</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='klSet'?'show':''" @tap="hideModal('klSet')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">相关设置</view>
					<view class="action" @tap="hideModal('klSet')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in kl_cfg" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ChooseKlCfg" :data-value="item.id"> {{item.name}}
						</button>
					</view>
				</view>
				<view class="margin justify-center">
					<button class='cu-btn bg-green shadow' @tap="klSet">开始养号</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='fbagSet'?'show':''" @tap="hideModal('fbagSet')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">相关设置</view>
					<view class="action" @tap="hideModal('fbagSet')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in fbag_cfg" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ChooseFbagCfg" :data-value="item.id"> {{item.name}}
						</button>
					</view>
				</view>
				<view class="margin justify-center">
					<button class='cu-btn bg-green shadow' @tap="fbagSet">运行福袋</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='LiveModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<!-- <view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view> -->
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text>直播站粉管理</text>
						</view>
					</view>
					<view class="cu-form-group ">
						<!-- <view class="title">邮件</view> -->
						<input placeholder="直播间分享代码" name="input"></input>
						<button class='cu-btn sm bg-green shadow'>链接进直播间</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="抖音号" name="input"></input>
						<button class='cu-btn sm bg-green shadow'>搜索进直播间</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="11|22|33" name="input"></input>
						<button class='cu-btn sm bg-green shadow'>评论互动</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="点赞次数" name="input"></input>
						<button class='cu-btn sm bg-green shadow'>左边点赞</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="点赞次数" name="input"></input>
						<button class='cu-btn sm bg-green shadow'>右边点赞</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="11|22|33" name="input"></input>
						<button class='cu-btn sm bg-green shadow margin-right-xs'>滚屏</button>
						<button class='cu-btn sm bg-green shadow'>停止</button>
					</view>
					<view class="cu-form-group ">
						<input placeholder="随机百分比" name="input"></input>
						<button class='cu-btn sm bg-green shadow margin-right-xs'>浏览</button>
						<button class='cu-btn sm bg-green shadow'>停止</button>
					</view>
				
					<view class="grid col-3 padding-xs bg-gray light">
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">看直播</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">加粉丝团</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">加关注</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">关注前三</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">关注前五</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">赠送灯牌</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">赠送心心</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">赠送抖音</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">看小黄车</button></view>
						<view class="margin-top-xs"><button class="cu-btn sm bg-green">进对手房</button></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='setGroup'?'show':''" @tap="hideModal('setGroup')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">设置分组</view>
					<view class="action" @tap="hideModal('setGroup')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="text-grey content margin-top">设备号:{{modalDevice}}</view>
				<view class="grid col-4 padding-sm">
					<view v-for="(item,index) in glist.group" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ChooseGroup" :data-value="item.id"> {{item.name}}
						</button>
					</view>
				</view>
				<view class="margin justify-center">
					<button class='cu-btn bg-green shadow' @tap="setGroup(item.id)">设置</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='groupDevices'?'show':''" @tap="hideModal('groupDevices')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">设置分组</view>
					<view class="action" @tap="hideModal('groupDevices')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="text-grey content margin-top">您选取了{{count}}台设备</view>
				<view class="grid col-4 padding-sm">
					<view v-for="(item,index) in glist.group" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ChooseGroup" :data-value="item.id"> {{item.name}}
						</button>
					</view>
				</view>
				<view class="margin justify-center">
					<button class='cu-btn bg-green shadow' @tap="setGroup">设置</button>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='setNum'?'show':''" @tap="hideModal('setNum')">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white justify-end">
					<view class="content">设置编号</view>
					<view class="action" @tap="hideModal('setNum')">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="text-grey">设备号:{{modalDevice}}</view>
					<view class="cu-form-group margin-top">
						<view class="title">设置编号</view>
						<input placeholder="请填写编号" name="num" v-model="d_num" @focus="clearTxt"></input>
					</view>
					<view class="margin-top justify-center">
						<button class='cu-btn bg-green shadow' @tap="setDeviceNum">设置</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='LoginModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">用户登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<form @submit="login">
						<view class="cu-form-group ">
							<view class="title">账号</view>
							<input placeholder="请填写账号" name="username"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">密码</view>
							<input placeholder="请填写密码" password name="password"></input>
						</view>
						<view class="margin-top justify-center">
							<button class='cu-btn bg-green shadow' form-type="submit">登录</button>
						</view>
					</form>
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='ControlModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="selectAll">全选</view>
					<view class="action text-green" @tap="selectNone">全否</view>
				</view>
				<view class="grid col-4 padding-sm">
					<view v-for="(item,index) in controlList" class="padding-xs" :key="index">
						<button class="cu-btn green sm block" :class="item.checked?'bg-green':'line-green'" @tap="ControlCommand" :data-value="item.value"> {{item.name}}
							<!-- <view class="cu-tag sm round" :class="item.checked?'bg-white text-green':'bg-green'" v-if="item.hot">HOT</view> -->
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='SettingModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<!-- <view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view> -->
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text>配置管理</text>
						</view>
					</view>
					<view class="cu-form-group justify-center">
						<button class='cu-btn bg-green shadow'>养号配置</button>
					</view>
					<view class="cu-form-group justify-center">
						<button class='cu-btn bg-green shadow'>福袋配置</button>
					</view>
					<view class="cu-form-group justify-center">
						<button class='cu-btn bg-green shadow'>分组管理</button>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>
							<text>账号管理</text>
						</view>
					</view>
					<view class="cu-form-group justify-center">
						<button class='cu-btn bg-green shadow'  @tap="showModal" data-target="LoginModal">换号登录</button>
					</view>
					<view class="cu-form-group justify-center">
						<button class='cu-btn bg-green shadow' @tap="logout">账号退出</button>
					</view>
				</view>
			</view>
		</view>
		<!-- Modal弹窗配置区 结束-->
				
		<view class="cu-bar tabbar margin-top solid-bottom bg-white foot">
			<view class="action" :class="PageCur=='connect'?'text-green':'text-gray'" @tap="showModal" data-target="ControlModal" data-cur="operate"> <!-- @tap="showModal" -->
				<view :class="PageCur=='connect'?'cuIcon-repairfill':'cuIcon-repair'"></view> 操作
			</view>
			<view class="action" :class="PageCur=='Live'?'text-green':'text-gray'" @tap="showModal" data-target="LiveModal"  data-cur="Live">
				<view :class="PageCur=='Live'?'cuIcon-videofill':'cuIcon-video'">
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				直播
			</view>
			<view class="action add-action" :class="isConnect?'text-green':'text-red'" @tap="changeSocket()">
				<button class="cu-btn shadow" :class="isConnect?'cuIcon-lightfill bg-green':'cuIcon-light text-red'"></button>
				状态
			</view>
			<view class="action" :class="PageCur=='device'?'text-green':'text-gray'" @tap="showModal" data-target="groupDevices" data-cur="device">
				<view :class="PageCur=='device'?'cuIcon-mobilefill':'cuIcon-mobile'"></view> 设置分组
			</view>
			<view class="action" :class="PageCur=='Setting'?'text-green':'text-gray'" @tap="showModal" data-target="SettingModal"  data-cur="Setting">
				<view class="cuIcon-settings"></view>
				系统配置
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: uni.getStorageSync('isLogin'),
				isConnect: uni.getStorageSync('isConnect'),
				d_num: "为设备命名",
				d_value: null,
				deviceList: [],
				glist: [],
				kl_cfg: [],
				fbag_cfg: [],
				PageCur: '',
				modalName: null,
				modalDevice: null,
				count:0,
				controlList: [{
					value: 0,
					name: '开启养号',
					ctl: '"todo":"runyh"',
				}, {
					value: 1,
					name: '开启福袋',
					ctl: '"todo":"home"',
				}, {
					value: 2,
					name: '设置编号',
					ctl: '"todo":"home"',
				}, {
					value: 3,
					name: '调节亮度',
					ctl: '"todo":"home"',
				}, {
					value: 4,
					name: '调节音量',
					ctl: '"todo":"home"',
				}, {
					value: 5,
					name: '返回桌面',
					ctl: '"todo":"home"',
				}, {
					value: 6,
					name: '唤醒设备',
					ctl: '"todo":"home"',
				}, {
					value: 7,
					name: '停止脚本',
					ctl: '"todo":"home"',
				}, {
					value: 8,
					name: '识别设备',
					ctl: '"todo":"home"',
				}, {
					value: 9,
					name: '检查更新',
					ctl: '"todo":"home"',
				}, {
					value: 10,
					name: '通知清理',
					ctl: '"todo":"home"',
				}, {
					value: 11,
					name: '自动亮度',
					ctl: '"todo":"home"',
				}],
				TabCur: 0,
				scrollLeft: 0,
				uid: null,
			}
		},
		onLoad() {
			// this.controlList = this.Cmds;
			if (this.isLogin) {
				this.uid = uni.getStorageSync('uid')
				this.getData(this.uid)
				this.connectWS()
			}
		},
		onShow() {
			if (!this.isLogin) {
				this.modalName = 'LoginModal'
			}
		},
		methods: {
			connectWS: function() {
				let that = this;
				uni.connectSocket({
					url: 'ws://119.3.12.149:8080'
				});
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					uni.setStorageSync('isConnect',true);
					that.isConnect = true;
					uni.showToast({
						title: '云控已连接',
						icon:"none"
					});
					let hc = setInterval(that.heartCheck, 2000);
				});
				uni.onSocketClose(function(res){
					console.log("WebSocket断开连接");
					uni.setStorageSync("isConnect",false);
					that.isConnect = false;
				});
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + res.data);
					let msg = JSON.parse(res.data)
					let wsid = msg.ws_id;
					let stat = msg.stat;
					let device_num = msg.dev_num;
					switch (msg.type) {
						case "init":
							var bind = '{"type":"adminCheck","fromid":"adminctl"}';
							uni.sendSocketMessage({
								data: bind
							});
							return;
						case "control":
							console.log(msg);
							return;
						case "text":
							console.log(msg.text);
							return;
						case "adddev":
							// var dev_info = that.get_device(msg.dev_num, msg.ws_id);
							// console.log('adddev:', msg);
							let items = that.glist.list;
							for (let i = 0, lenI = items.length; i < lenI; ++i) {
								if (items[i].device_num == device_num) {
									// items[i].device_stat = 'online';
									that.glist.list[i].wsid = wsid;
									that.glist.list[i].device_stat = 'online';
									that.setStatByDid(device_num,wsid,'online');
									console.log('adddev deviceList', items[i])
									break
								}
							}
							return;
						case "info":
							if (stat == "offline") {
								// that.deleteDevice(wsid);
								let items = that.glist.list;
								for (let i = 0, lenI = items.length; i < lenI; ++i) {
									if (items[i].wsid == wsid) {
										// items[i].device_stat = 'offline';
										that.glist.list[i].device_stat = 'offline';
										that.setStatByWsid(wsid,'offline');
										break
									}
								}
								console.log(wsid, "已离线");
							}
							console.log('info:', msg);
							return;
						default:
							console.log(e)
					}
				});
			},
			get_device: function(dev_num, wsid) {
				uni.request({
					url: this.API_URL + "getter/",
					method: 'POST',
					data: {
						device_num: dev_num
					},
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败", res)
						} else {
							console.log('get_device', res)
							if (res.data.msg == "success") {
								this.deviceList = this.deviceList.concat(res.data.data)
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			fbagSet: function() {
				let devices = [];
				let cfg_id = null;
				this.glist.list.forEach(function(e,i){
					if (e.checked) {
						devices = devices.concat(e)
					}
				});
				this.fbag_cfg.forEach(function(e,i){if (e.checked) {cfg_id = e.id}});
				console.log(devices);
				console.log(cfg_id);
				this.hideModal('fbagSet')
			},
			klSet: function() {
				let devices = [];
				let cfg_id = null;
				this.glist.list.forEach(function(e,i){
					if (e.checked) {
						devices = devices.concat(e)
					}
				});
				this.kl_cfg.forEach(function(e,i){if (e.checked) {cfg_id = e.id}});
				console.log(devices);
				console.log(cfg_id);
				this.hideModal('klSet')
			},
			setGroup: function() {
				if (this.count == 0) {
					this.hideModal();
					uni.showToast({
						title: '未指定设备',
						icon:"none"
					})
					return;
				}
				let devices = [];
				let gid = null;
				this.glist.list.forEach(function(e,i){
					if (e.checked) {
						devices = devices.concat(e)
					}
				});
				this.glist.group.forEach(function(e,i){if (e.checked) {gid = e.id}});
				// console.log('选中',devices);
				// console.log('分组',gid);
				if (gid==null) {
					this.hideModal();
					uni.showToast({
						title: '未指定分组',
						icon:"none"
					});
					return;
				}
				uni.request({
					url: this.API_URL + 'update/setGroup',
					method: 'POST',
					data: {
						devices: devices,
						group_id: gid
					},
					success: res => {
						console.log(res)
						if (res.statusCode !== 200) {
							console.log("请求失败",res)
						} else {
							if (res.data.code == 200) {
								console.log('设置分组',res.data)
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
								this.selectNone();
							} else {
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
							};
						};
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {
						this.hideModal('groupDevices')
					}
				});
				
			},
			setDeviceNum: function() {
				console.log('设备号',this.modalDevice)
				console.log('编号',this.d_num)
				let items = this.glist.list;
				let did = this.modalDevice;
				let num = this.d_num;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].device_num == did) {
						items[i].checked = !items[i].checked;
						uni.request({
							url: this.API_URL + 'update/info',
							method: 'POST',
							data: {
								device_num:did,
								num:num
							},
							success: res => {
								if (res.statusCode !== 200) {
									console.log("请求失败",res)
								} else {
									console.log('update', res)
									if (res.data.code == '200') {
										console.log('更新成功',res.data.data)
										uni.showToast({
											title: res.data.msg,
											icon:"none"
										});
									} else {
										console.log('更新失败',res.data.msg)
										uni.showToast({
											title: res.data.msg,
											icon:"none"
										});
									}
								}
							},
							fail: (err) => {
								console.log(err)
							},
						});
						break
					}
				};
				this.hideModal('setNum')
			},
			heartCheck: function() {
				var send_str = '{"type":"ping"}';
				uni.sendSocketMessage({
					data: send_str
				});
			},
			tabSelect: function(id,e) {
				this.getData(this.uid,id)
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				console.log(id)
			},
			showModal(e) {
				let modal_name = e.currentTarget.dataset.target
				let modal_value = e.currentTarget.dataset.value
				this.modalName = modal_name
				this.modalDevice = modal_value
				this.PageCur = e.currentTarget.dataset.cur
				switch (modal_name){
					case 'setGroup':
						console.log('设置分组')
						break;
					case 'groupDevices':
						let devices = [];
						this.glist.list.forEach(function(e,i){
							if (e.checked) {
								devices = devices.concat(e)
							}
						});
						this.count = devices.length;
						break;
					default:
						break;
				}
				if (modal_name == 'setGroup') {
					console.log("设置分组")
				}
			},
			hideModal(e) {
				console.log(e)
				this.modalName = null
				if (e=='setNum' || e=='setGroup') {
					this.selectNone();
				}
			},
			clearTxt(e) {
				e.detail.value='';
				this.d_num='';
			},
			selectAll() {
				for (let i = 0; i < this.glist.list.length; i++) {
					this.glist.list[i].checked = true;
				}
				this.hideModal();
			},
			selectNone() {
				for (let i = 0; i < this.glist.list.length; i++) {
					this.glist.list[i].checked = false;
				}
				this.hideModal();
			},
			ControlCommand(e) {
				console.log(e)
				let _this = this;
				let cmds = this.controlList;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = cmds.length; i < lenI; ++i) {
					if (cmds[i].value == values) {
						console.log(cmds[i].name);
						console.log(cmds[i].ctl);
						if (cmds[i].name == '开启养号') {
							this.modalName = 'klSet';
							break;
						} else if (cmds[i].name == '开启福袋') {
							this.modalName = 'fbagSet';
							break;
						};
						this.sendCommand(cmds[i].ctl,cmds[i].name);
						this.hideModal('ControlModal');
						break;
					}
				}
			},
			sendCommand(ctl,text) {
				let items = this.glist.list;
				for (let i = 0; i < items.length; i++) {
					if (items[i].checked) {
						let str ='{"type":"control","fromid":"adminctl","toid":"'+items[i].device_num+'",' + ctl + ',"text":"'+text+'"}';
						console.log(str)
					}
				}
			},
			ChooseDevice(e) {
				console.log(e)
				let items = this.glist.list;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].id == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			ChooseGroup(e) {
				console.log(e)
				let items = this.glist.group;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].id == values) {
						console.log(items[i])
						items.forEach(function(e,i) {
							e.checked = false;
						})
						items[i].checked = !items[i].checked;
						break;
					}
				}
			},
			ChooseKlCfg(e) {
				console.log(e)
				let items = this.kl_cfg;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].id == values) {
						console.log(items[i])
						items.forEach(function(e,i) {
							e.checked = false;
						})
						items[i].checked = !items[i].checked;
						break;
					}
				}
			},
			ChooseFbagCfg(e) {
				console.log(e)
				let items = this.fbag_cfg;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].id == values) {
						console.log(items[i])
						items.forEach(function(e,i) {
							e.checked = false;
						})
						items[i].checked = !items[i].checked;
						break;
					}
				}
			},
			getData: function(uid,gid) {
				let _this=this;
				uni.request({
					url: this.API_URL + 'get/deviceList',
					method: 'POST',
					data: {
						uid:uid,
						gid:gid
					},
					success: res => {
						if (res.statusCode !== 200) {
							console.log("请求失败",res)
						} else {
							console.log('getdata', res)
							if (res.data.code==200) {
								console.log('get data success', res.data)
								res.data.list.forEach(function(e,i){
									e.checked=false;
								});
								res.data.group.forEach(function(e,i){
									e.checked=false;
								});
								res.data.kl_cfg.forEach(function(e,i){
									e.checked=false;
								});
								res.data.fbag_cfg.forEach(function(e,i){
									e.checked=false;
								})
								_this.glist = res.data;
								_this.kl_cfg = res.data.kl_cfg;
								_this.fbag_cfg = res.data.fbag_cfg;
								console.log('新',_this.glist)
							} else {
								console.log('get data err',res.data.msg)
							}
						}
					},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			login: function(e) {
				let _this=this;
				this.hideModal();
				uni.request({
					url: this.API_URL + "get/loginInfo",
					method: 'POST',
					data: {
						username: e.detail.value.username,
						password: e.detail.value.password
					},
					success: (res) => {
						if (res.statusCode !== 200) {
							console.log("请求失败", res)
						} else {
							console.log('loginInfo', res)
							if (res.data.code == '200') {
								console.log('登录成功',res.data.data)
								uni.setStorageSync('uid',res.data.data.uid)
								uni.setStorageSync('isLogin',true)
								_this.uid = res.data.data.uid
								_this.getData(res.data.data.uid)
								_this.connectWS();
							} else {
								console.log('登录失败',res.data.msg)
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			logout: function(e) {
				uni.setStorageSync('uid',null)
				uni.setStorageSync('isLogin',false)
				this.isLogin = false
				this.isConnect = false
				uni.closeSocket();
				uni.showToast({
					title: '云控连接已断开',
					icon:"none"
				});
				uni.reLaunch({
					url:'index'
				})
			},
			setStatByDid: function(did,wsid,stat) {
				uni.request({
					url: this.API_URL + 'update/info',
					method: 'POST',
					data: {
						device_num:did,
						wsid:wsid,
						device_stat:stat
					},
					success: res => {
						if (res.statusCode !== 200) {
							console.log("请求失败",res)
						} else {
							console.log('update', res)
							if (res.data.code == '200') {
								console.log('更新成功',res.data.data)
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
							} else {
								console.log('更新失败',res.data.msg)
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
							}
						}
					},
					fail: (err) => {
						console.log(err)
					},
				});
			},
			setStatByWsid: function(wsid,stat) {
				uni.request({
					url: this.API_URL + 'update/wsid',
					method: 'POST',
					data: {
						wsid:wsid,
						device_stat:stat
					},
					success: res => {
						if (res.statusCode !== 200) {
							console.log("请求失败",res)
						} else {
							console.log('update', res)
							if (res.data.code == '200') {
								console.log('更新成功',res.data.data)
							} else {
								console.log('更新失败',res.data.msg)
								uni.showToast({
									title: res.data.msg,
									icon:"none"
								});
							}
						}
					},
					fail: (err) => {
						console.log(err)
					},
				});
			},
			changeSocket: function() {
				if (this.isConnect) {
					uni.closeSocket();
					console.log("连接断开")
					uni.showToast({
						title: '云控连接已断开',
						icon:"none"
					});
				} else {
					this.connectWS();
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}
</style>