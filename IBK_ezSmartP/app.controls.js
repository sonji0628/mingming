/*[19.02.20][김윤섭][kkobiboy] utf-8*/
/*수정이력
[19.08.20][조연주]
1. 블라블라
*/
let IsHtaPlatform = navigator.userAgent.indexOf("HtaPlatform.Application")!=-1;
var IdeDesignMode = parent["IsDesignForm"] === true;
let IdeDesignDocu = IdeDesignMode && window != parent;
if(IdeDesignDocu){ console.log("[DEBUG] Design Document : "+location.pathname); }

if(!IsHtaPlatform){
	window.onerror = function(msg, url, line, column, error) {
		if (!url || url.length == 0) {
				url = location.href;
		}
		let uri   = url.split(location.origin).join("");
		let stack = (error && error.stack ? error.stack : msg).split(location.origin).join("");
		stack = stack.replace(/(Unknown script)/g, "script");
		let text = ""
				+ "위치 : " + uri + "\n"
				+ "라인 : " + line + "\n"
				+ "컬럼 : " + column + "\n"
				+ stack
				;
		window.alert("[스크립트 에러]\r\n" + text);
		return true;
	};
}

function atoi(v,d,r){
	v = parseInt(v, (r ? r : 10));
	return isNaN(v) ? ( d ? d : 0) : v;
}

function nvl(v,d){
	return v == null ? d : v;
}

function hexcolor ( color ){
	if(typeof(color)!="string"){return "";}
	if(color == "transparent") return color;
	if(color.indexOf("rgb") != 0){return color;}
	//let decimal = "rgb(255, 64, 0)";
	//let percent = "rgb( 100%, 25%, 0% )";
	let rgb = color.replace( /[^%,.\d]/g, "" );
	rgb = rgb.split( "," );
	for(let x = 0; x < 3; x++ ) {
		if(rgb[x].indexOf("%") > -1)
			rgb[x] = Math.round(parseFloat( rgb[x] ) * 2.55);
	}
	let toHex = function( string ){
		string = parseInt( string, 10 ).toString( 16 );
		string = ( string.length === 1 ) ? "0" + string : string;
		return string;
	};
	let r = toHex( rgb[ 0 ] );
	let g = toHex( rgb[ 1 ] );
	let b = toHex( rgb[ 2 ] );
	let hexType = "#" + r + g + b;
	return hexType;
}

function makeQueryString(fcb_AddQueryStringData){
	let data = [];
	if(fcb_AddQueryStringData){
		fcb_AddQueryStringData(function(key,value){
			if(!value){value="";}
			data.push(encodeURIComponent(key)+"="+encodeURIComponent(value));
		});
	}
	return data.length==0?"":"?"+data.join("&");
}

function parseLocationQueryString(){
	let qstring = location.search.trim();
	if(!qstring) return {};
	qstring = qstring.substr(1).split("&");
	let i,kv, ds={};
	for(i=0;i<qstring.length;i++){
		kv = qstring[i].split("=");
		if(kv.length != 2){continue;}
		ds[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
	}
	return ds;
}

//base-64 encoded string
//var enc = window.btoa(str);
//var dec = window.atob(enc);

//public function, property, field : 대문자로 시작

/************************************************************************************************/
//Event Handler

document.documentElement.oncontextmenu = function(){ return false; };

function importCSS(id, url){
	let nh_css = document.createElement("link");
	nh_css.id   = id;
	nh_css.rel  = "stylesheet";
	nh_css.type = "text/css";
	nh_css.href = url;
	document.head.appendChild(nh_css);
}
function importJSS(id, url){
	let nh_js = document.createElement("script");
	nh_js.id   = id;
	nh_js.type = "text/javascript";
	nh_js.src  = url;
	document.head.appendChild(nh_js);
}

function includeCSS(id, url){
	let xhr = new XMLHttpRequest();
	xhr.open('get', url, false);
	xhr.send();
	let source = xhr.responseText + '\n//*# sourceURL=' + url + '*//\n';
	let nh_css = document.createElement("style");
	nh_css.id   = id;
	nh_css.rel  = "stylesheet";
	nh_css.type = "text/css";
	nh_css.setAttribute("url",url);
	nh_css.textContent = source;
	document.head.appendChild(nh_css);

}

function includeJSS(id, url){
	let xhr = new XMLHttpRequest();
	xhr.open('get', url, false);
	xhr.send();
	let source = xhr.responseText + '\n//*# sourceURL=' + url + '*//\n';
	let nh_control = document.createElement("script");
	nh_control.id   = id;
	nh_control.type = "text/javascript";
	nh_control.setAttribute("url",url);
	nh_control.textContent = source;
	document.head.appendChild(nh_control);
}


if(IdeDesignMode){
	importCSS("ide-style-core"     ,"/ide/ide.form.css");
	importCSS("ide-colorpicker-css","/ide/colorpicker/colorpicker.css");
	importJSS("ide-colorpicker-js" ,"/ide/colorpicker/colorpicker.js" );
}

// 화면객체
let Form = null;

// 객체 추가시 반드시 선언 및 초기화 할것. ( Error남 )
// Plug-In 객체
let SCREEN = null;

// 디바이스 객체
let EVENT = null;
let CIM = null;
let CDM = null;
let IDC = null;
let RCT = null;
let JNL = null;
let PBPR = null;
let CRD = null;
let ICS = null;
let BCR = null;
let BCRGT = null;
let COINIM = null;
let COINDM = null;
let DSM = null;
let DPM = null;
let SIU = null;
let EPP = null;
let CAM = null;
let CCR = null;
let VDM = null;
let BIO = null;
// 디바이스 선언 END


var USE_DEFAULT_STYLE = window["USE_DEFAULT_STYLE"] === true;
$(window).on("load",function(){
	if(!USE_DEFAULT_STYLE){
		$(document.body).addClass("nh-style");
	}

	$(document).keydown(function(e){
		if(e.ctrlKey && e.altKey && e.shiftKey && e.key == "F12"){
			try{host.showTrace();}catch(ee){}
			return false;
		}
	});

	UIControls.load();

	Form = new UIForm();
	Form.func = UIForm;
	Form.frame = Form.element = document.getElementById("ui-document");//디자인 타임시 IDE에서 재할당
	Form.element = Form.frame;
	Form.$element = $(Form.element);
	Form.toString = function(){
		return this.func.name
					+"("+this.element.tagName.toLowerCase()
					+"."+this.frame.id+")."
					+this.frame.getAttribute("ui-id")+"("+this.frame.id+")";
	};
	window["Form"] = Form;

	Form.iframe = { element : null, isInclude : false };
	parent.$("iframe").each(function(){
		if(this.contentWindow == window){
			if(parent.IdeDesignMode){
				window.IdeDesignMode = true;
			}
			Form.iframe.element = this;
			Form.iframe.isInclude = this.className.indexOf("ui-include") != -1;
			return false;
		}
	});

	UIControls.initialize();

	let log = [];
	if(IdeDesignDocu){
		log.push("[DEBUG] Declare Control Field");
		log.push(Form.toString());
	}
	Form.$element.find(".ui-control").each(function(){
		let control = UIControls.attach(this);
		if(IdeDesignDocu){ log.push(window[control.ID].toString()); }
	});
	if(log.length > 0){
		if(IsHtaPlatform){console.log(log.join("\n"));}
		else{ $(log).each(function(i,v){ console.log(v); }); }
	}

	if(IdeDesignMode){
		let sheet = document.styleSheets["ui-style-core"];
		$(sheet.rules).each(function(i){
			if(this.selectorText == ".ui-hide"){
				sheet.removeRule(i);
				return false;
			}
		});
	}

	if(Form.iframe.isInclude && IdeDesignMode){
		document.body.style.visibility = "visible";
		$(document.body).removeClass("ui-pre-load");
		return;
	}

	if(IdeDesignMode){
		if(parent.xdocu_onready){ parent.xdocu_onready.call(window); }
		$(document.body).removeClass("ui-pre-load");
		return;
	}

	try { SCREEN = host.SCREEN; } catch (e) { }
	try { EVENT = host.EVENT; } catch (e) { }

	// 디바이스 선언 START
	try { CIM = host.CIM; } catch (e) { }
	try { CDM = host.CDM; } catch (e) { }
	try { IDC = host.IDC; } catch (e) { }
	try { RCT = host.RCT; } catch (e) { }
	try { JNL = host.JNL; } catch (e) { }
	try { PBPR = host.PBPR; } catch (e) { }
	try { CRD = host.CRD; } catch (e) { }
	try { ICS = host.ICS; } catch (e) { }
	try { BCR = host.BCR; } catch (e) { }
	try { BCRGT = host.BCRGT; } catch (e) { }
	try { COINIM = host.COINIM; } catch (e) { }
	try { COINDM = host.COINDM; } catch (e) { }
	try { DSM = host.DSM; } catch (e) { }
	try { DPM = host.DPM; } catch (e) { }
	try { SIU = host.SIU; } catch (e) { }
	try { EPP = host.EPP; } catch (e) { }
	try { CAM = host.CAM; } catch (e) { }
	try { CCR = host.CCR; } catch (e) { }
	try { VDM = host.VDM; } catch (e) { }



	/*
	event.preventDefault() : 현재 이벤트의 기본 동작을 중단한다
	event.stopPropagation(): 현재 이벤트가 상위로 전파되지 않도록 중단한다.
	event.stopImmediatePropagation() : 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단한다.
	return false : event.preventDefault() + event.stopPropagation();// ??not work
	*/

	$(document).keydown(function(e){
		if(!IsHtaPlatform){
			if(e.key == "F5"){
				top.location.reload(true);
				return false;
			}
		}
	});

	function element_onclick(e){
		if(!(UIControls && UIControls.attach)) return;
		let control = UIControls.attach(this);
		let evtarg  = e;
		let evtname = control.OnClick;
		if(window[evtname]){
			return window[evtname].call(control, evtarg);
		}
	}
	$(Form.element).on("click",element_onclick);
	$(Form.element).on("click",".ui-control",element_onclick);

	let xjscript, xjscriptText;
	xjscript = document.getElementById("xjscript");
	if(!xjscript){
		xjscript = document.getElementsByTagName("xjscript")[0];
		xjscriptText = xjscript.textContent;
	}
	xjscriptText = xjscript.textContent;

	let script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = xjscriptText;
	$("head").append(script);

	/*
	let script = document.getElementById("ui-script-user");
	script.textContent = $("xjscript:eq(0)")[0].textContent;
	*/

	setTimeout(function(){
		let evtarg  = {};
		let evtname = Form.OnLoad;
		if(window[evtname]){
			window[evtname].call(Form, evtarg);
		}
		document.body.style.visibility = "visible";
		setTimeout(function(){
			$(document.body).removeClass("ui-pre-load");
			document.body.focus();
		},10);
	});
	// 2019.10.14 YSJ
	Net.init();
});

let Env = top.Env;

// 2019.10.14 YSJ
let Net = {
	xios: {},
	xcms: {},
	init: function () {
		let xcms = this.xcms;
		let xios = this.xios;
		$("xcomponent > xcms > xcm").each(function () {
			// xcm.Input, xcm.Output > xio - control 맵핑정보
			let xcm = eval("(" + this.innerHTML + ")");
			if (xcms[xcm.Name]) return;
			xcms[xcm.Name] = xcm;
		});
		$("xcomponent > xios > xio").each(function () {
			let xio = eval("(" + this.innerHTML + ")");
			if (xios[xio.Name]) return;
			xios[xio.Name] = xio;
		});
	},
	Request: function (cmName, fcb_OnBeforeRequest, fcb_OnAfterResponse) {
		//host.alert("@@@Request: function " + cmName);

		let xcms = this.xcms;
		let xios = this.xios;
		let xcm, xio;
		xcm = xcms[cmName];
		if (!xcm) { throw new Error("Not Found CM Object"); }
		xio = xios[xcm.RefIoName];
		if (!xio) { throw new Error("Not Found IO Object"); }

		//송신데이터생성
		let req = { prop: {}, data: {}, map: {} };
		$(xio.Input).each(function () {
			let io = this;
			req.map[io.Name] = io;
			switch (io.DataType) {
				case "String": {
					req.data[io.Name] = "";
					req.prop.__defineGetter__(io.Name, function () { return req.data[io.Name]; });
					req.prop.__defineSetter__(io.Name, function (v) {
						if (v != null && v != undefined && typeof (v) != "string") {
							throw new Error("Required String Value : " + xcm.RefIoName + "::Input." + io.Name);
						}
						req.data[io.Name] = (v == null || v == undefined ? "" : v);
					});
					break;
				}
				case "Number": {
					req.data[io.Name] = 0;
					req.prop.__defineGetter__(io.Name, function () { return req.data[io.Name]; });
					req.prop.__defineSetter__(io.Name, function (v) {
						if (v != null && v != undefined && typeof (v) != "number") {
							throw new Error("Required Number Value : " + xcm.RefIoName + "::Input." + io.Name);
						}
						req.data[io.Name] = (v == null || v == undefined ? 0 : v);
					});
					break;
				}
				case "Grid": {
					let propRows = [];
					let rows = req.data[io.Name] = [];
					let grid = req.prop[io.Name] = {
						Columns: { Map: {}, List: [] },
						Clear: function () {
							rows.length = 0;
							propRows.length = 0;
						},
						RowAdd: function (index) {
							let row = null;
							let ar = [];
							if (arguments.length == 0 || !(0 <= index && index < rows.length)) {
								row = this.__createRow__(ar, true);
								rows.push(ar);
								propRows.push(row);
							} else {
								row = this.__createRow__(ar, true);
								rows.splice(index, 1, ar);
								propRows.splice(index, 1, row);
							}
							return row;
						},
						RowDel: function (index) {
							if (arguments.length == 0 || rows.length == 0 || !(0 <= index && index < rows.length)) {
								throw new Error("Invalid Grid Row Index  : "
									+ xcm.RefIoName + "::Input." + io.Name + " (Row Index : " + index + ")");
							}
							rows.splice(index, 1);
							propRows.splice(index, 1);
						},
						Row: function (index) {
							if (arguments.length == 0 || rows.length == 0 || !(0 <= index && index < rows.length)) {
								throw new Error("Invalid Grid Row Index  : "
									+ xcm.RefIoName + "::Input." + io.Name + " (Row Index : " + index + ")");
							}
							let row = propRows[index];
							if (!row) {
								row = this.__createRow__(row[index]);
								propRows.splice(index, 1, row);
							}
							return row;
						},
						__createRow__: function (array, init) {
							let row = {};
							row.Delete = function () {
								grid.RowDel(this.Index);
							};
							row.SetValue = function (index, value) {
								if (!(0 <= index && index < array.length)) {
									throw new Error("Invalid Grid Column Index  : "
										+ xcm.RefIoName + "::Input." + io.Name + " (Column Index : " + index + ")");
								}
								this[grid.Columns.List[index].Name] = value;
							};
							row.GetValue = function (index) {
								if (!(0 <= index && index < array.length)) {
									throw new Error("Invalid Grid Column Index  : "
										+ xcm.RefIoName + "::Input." + io.Name + " (Column Index : " + index + ")");
								}
								return this[grid.Columns.List[index].Name];
							};
							row.__defineGetter__("Index", function () { return propRows.indexOf(this); });
							row.__defineGetter__("Array", function () { return array; });
							$(io.GridData).each(function (i) {
								let gio = this;
								let col = i;
								switch (gio.DataType) {
									case "String": {
										if (init === true) { array[col] = ""; }
										row.__defineGetter__(gio.Name, function () { return array[col]; });
										row.__defineSetter__(gio.Name, function (v) {
											if (v != null && v != undefined && typeof (v) != "string") {
												throw new Error("Required String Value : "
													+ xcm.RefIoName + "::Input." + io.Name + "." + gio.Name + " (Column Index : " + col + ")");
											}
											array[col] = (v == null || v == undefined ? "" : v);
										});
										break;
									}
									case "Number": {
										if (init === true) { array[col] = 0; }
										row.__defineGetter__(gio.Name, function () { return array[col]; });
										row.__defineSetter__(gio.Name, function (v) {
											if (v != null && v != undefined && typeof (v) != "number") {
												throw new Error("Required Number Value : "
													+ xcm.RefIoName + "::Input." + io.Name + "." + gio.Name + " (Column Index : " + col + ")");
											}
											array[col] = (v == null || v == undefined ? 0 : v);
										});
										break;
									}
								}
							});
							return row;
						},

					};
					$(io.GridData).each(function (i) {
						let gio = this;
						grid.Columns.Map[gio.Name] = i;
						grid.Columns.List.push({ Index: i, Name: gio.Name, Type: gio.DataType, Size: gio.Size });
					});
					grid.__defineGetter__("Count", function () { return rows.length; });
					grid.__defineGetter__("Rows", function () { return rows; });
					grid.Columns.__defineGetter__("Count", function () { return this.List.length; });
					break;
				}
			}
		});


		//[미구현]컨트롤 맵핑 >> 포멧 형식 변경필요
		$(xcm.Input).each(function () {
			let io = this;
			//console.log(req.map[this.xxx]);
		});

		//fcb_OnBeforeRequest 콜
		if (fcb_OnBeforeRequest) {
			//host.alert("@@@before fcb_OnBeforeRequest");

			fcb_OnBeforeRequest(req.prop);
		}

		//host.alert("@@@after fcb_OnBeforeRequest");

		//C# 호스트 Net API 콜 : 전문생성
		let requestMessage = host.ATMCOMM.RequestMessage();

		$(xio.Input).each(function (i) {
			let io = this;
			let data = req.data[io.Name];
			let prop = req.prop[io.Name];
			switch (io.DataType) {
				case "String": {
					requestMessage.AddStringValue(data, io.Size);
					break;
				}
				case "Number": {
					requestMessage.AddNumberValue(data, io.Size);
					break;
				}
				case "Grid": {
					let gridData = requestMessage.CreateGridData();
					$(data).each(function (rowIndex) {
						let gridRow = gridData.AddRow();
						let row = this;
						$(row).each(function (colIndex) {
							let cellData = row[colIndex];
							let column = prop.Columns.List[colIndex];
							switch (column.Type) {
								case "String": {
									gridRow.AddStringValue(cellData, column.Size);
									break;
								}
								case "Number": {
									gridRow.AddNumberValue(cellData, column.Size);
									break;
								}
							}
						});
					});
					requestMessage.AddGridData(gridData);
					break;
				}
			}
		});

		//host.alert("@@@before Send() " + xcm.ServiceName);

		//C# 호스트 Net API 콜 : 서비스명, 전문전송
		//requestMessage.Send(xcm.ServiceName, function (responseMessage) {
		requestMessage.Send(xcm.ServiceName, function (result, responseMessage) {

			//수신데이터생성
			let res = {};

			if (result == "00") {
				$(xio.Output).each(function (i) {
					let io = this;
					switch (io.DataType) {
						case "String": {
							res[io.Name] = responseMessage.GetStringValue(i, io.Name, io.Size);
							break;
						}
						case "Number": {
							res[io.Name] = responseMessage.GetNumberValue(i, io.Name, io.Size);
							break;
						}
						case "Grid": {
							let grid = [];
							grid.__defineGetter__("Count", function () { return grid.length; });
							res[io.Name] = grid;

							let columns = [];
							let columns_map = {};
							$(io.GridData).each(function (i) {
								let gio = this;
								columns_map[gio.Name] = i;
								columns.push({ Index: i, Name: gio.Name, Type: gio.DataType, Size: gio.Size });
							});

							responseMessage.GetGridData(i, io.Name, columns, function (rowIndex, colIndex, value) {
								//host.alert(value);
								if (colIndex == -1) {
									let row = {
										buffer: [],
										GetValue: function (index) {
											return this.buffer[index];
										},
										toString: function () {
											let buf = [];
											for (let k in this) {
												switch (k) {
													case "buffer":
													case "GetValue":
													case "toString":
														continue;
												}
												buf.push(k + ":" + this[k]);
											}
											return buf.join(", ");
										}
									};
									grid.push(row);
									return;
								}
								let row = grid[grid.length - 1];
								let gio = io.GridData[colIndex];

								switch (gio.DataType) {
									case "String": {
										row[gio.Name] = value + "";
										break;
									}
									case "Number": {
										row[gio.Name] = Number(value);
										break;
									}
								}
								row.buffer.push(row[gio.Name]);

							});
							break;
						}
					}
				});
			}

			//fcb_OnAfterResponse 콜
			res.CancleControlMapping = false;
			if (fcb_OnAfterResponse) {
				//fcb_OnAfterResponse(res);
				if (result == "00") {
					fcb_OnAfterResponse(result, res);
				}
				else {
					fcb_OnAfterResponse(result, responseMessage);
				}
			}
			if (res.CancleControlMapping === false) {
				//[미구현]컨트롤 맵핑 >> 포멧 형식 변경필요
				$(xcm.Output).each(function () {
					let io = this;
					//console.log(req.map[this.xxx]);
				});
			}
		});
	}
};

$(window).on("load",function(){
	if(IdeDesignMode){ return; }
});

//$(window).on("unload",function(){
$(window).on("beforeunload",function(){
	if(IdeDesignMode){ return; }
	let evtarg = { type: "unload" };
	try{ evtarg.closed = host.form.isWinFormClosed; }catch(e){}
	let evtname = Form.OnUnLoad;
	if(window[evtname]){
		window[evtname].call(Form, evtarg);
	}
});

/************************************************************************************************/
//Global Function

if(!Array.prototype.get){ Array.prototype.get = function(index){ return this[index]; }; }

if(!Array.prototype.set){ Array.prototype.set = function(index,value){ this[index] = value; }; }

if(!String.prototype.hashCode){
	String.prototype.hashCode = function() {
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};
}
/************************************************************************************************/
//Global Enum

let Lang = {
	kr : { text : "kr", value : 0 },
	en : { text : "en", value : 1 },
};
window.Lang = Lang;

let DockStyle = {
	None   : 0x00000000/*0*/,
	Top    : 0x00000001/*1*/,
	Bottom : 0x00000002/*2*/,
	Left   : 0x00000003/*3*/,
	Right  : 0x00000004/*4*/,
	Fill   : 0x00000005/*5*/,
};
window.DockStyle = DockStyle;

let AnchorStyles = {
	None   : 0x00000000/*0*/,
	Top    : 0x00000001/*1*/,
	Bottom : 0x00000002/*2*/,
	Left   : 0x00000004/*4*/,
	Right  : 0x00000008/*8*/,
};
window.AnchorStyles = AnchorStyles;

function createProperty(object, name, internal){
	object.__defineGetter__(name, function(){ return internal[name]; });
	object.__defineSetter__(name, function(v){ return internal[name] = v; });
};

function Size(width, height){
	if(!(this instanceof Size)){return new Size(width, height);}
	let internal = {};
	createProperty(this, "Width", internal);
	createProperty(this, "Height", internal);
	internal.Width  = width == null  || width  == undefined ? 0 : atoi(width );
	internal.Height = height == null || height == undefined ? 0 : atoi(height);
	Size.prototype.toString = function(){
		return this.Width+","+this.Height;
	};
}

function Position(x, y){
	if(!(this instanceof Position)){return new Position(x, y);}
	let internal = {};
	createProperty(this, "X", internal);
	createProperty(this, "Y", internal);
	internal.X = x == null || x == undefined ? 0 : atoi(x);
	internal.Y = y == null || y == undefined ? 0 : atoi(y);
	Position.prototype.toString = function(){
		return this.X+","+this.Y;
	};
}

function Padding(left, top, right, bottom){
	if(!(this instanceof Padding)){return new Padding(left, top, right, bottom);}
	let internal = {};
	createProperty(this, "Left"   , internal);
	createProperty(this, "Top"    , internal);
	createProperty(this, "Right"  , internal);
	createProperty(this, "Bottom" , internal);
	internal.Left   = atoi(left  );
	internal.Top    = atoi(top   );
	internal.Right  = atoi(right );
	internal.Bottom = atoi(bottom);
	Padding.prototype.toString = function(){
		return this.Left+","+this.Top+","+this.Right+","+this.Bottom;
	};
}

function Rounding(topLeft, topRight, bottomLeft, bottomRight){
	if(!(this instanceof Rounding)){return new Rounding(topLeft, topRight, bottomLeft, bottomRight);}
	let internal = {};
	createProperty(this, "TopLeft"    , internal);
	createProperty(this, "TopRight"   , internal);
	createProperty(this, "BottomLeft" , internal);
	createProperty(this, "BottomRight", internal);
	internal.TopLeft     = atoi(topLeft    );
	internal.TopRight    = atoi(topRight   );
	internal.BottomLeft  = atoi(bottomLeft );
	internal.BottomRight = atoi(bottomRight);
	Rounding.prototype.toString = function(){
		return this.TopLeft+","+this.TopRight+","+this.BottomLeft+","+this.BottomRight;
	};
}

function ComboxItem(text, value){
	if(!(this instanceof ComboxItem)){return new ComboxItem(text, value);}
	let internal = {};
	createProperty(this, "Text" , internal);
	createProperty(this, "Value", internal);
	internal.Text  = text;
	internal.Value = value;
	ComboxItem.prototype.toString = function(){
		return "["+this.Value+"]"+this.Text;
	};
}

let TableColumnType = {
	Label    : 1,
	TextBox  : 2,
	CheckBox : 3,
	RadioBox : 4,
	ComboBox : 5,
};
window.TableColumnType = TableColumnType;

function TableColumn(width, halign, valign, type){
	if(!(this instanceof TableColumn)){return new TableColumn(width, halign, valign, type);}
	let internal = {};
	createProperty(this, "AlignH", internal);//left, center, right,
	createProperty(this, "AlignV", internal);//top, middle, bottom,
	createProperty(this, "Width" , internal);//px, %
	createProperty(this, "Type"  , internal);//enum TableColumnType
	internal.Width  = width;
	internal.AlignH = halign;
	internal.AlignV = valign;
	internal.Type   = type;
	TableColumn.prototype.toString = function(){
		return "["+this.AlignH+","+this.AlignV+","+this.Width+","+this.Type+"]";
	};
}

/************************************************************************************************/
function UIControls(){
	if(this instanceof UIControls){return this;}
	return this;
}
UIControls.classMap  = {};
UIControls.classList = [];
UIControls.fn = {};

UIControls.load = function(){
	let A = "A".charCodeAt(0);
	let Z = "Z".charCodeAt(0);
	let base = {};
	function uiclassInfoLog(func, inst){
		let _public = { Property : {}, Method : {}, Event : {}, Static : {}};
		let _privat = { Property : {}, Method : {}, Event : {}, Static : {}};
		if(func == UIControl){
			base._public = _public;
			base._privat = _privat;
		}
		$(Object.keys(inst)).each(function(){
			let c = this.charCodeAt(0);
			let ispublic = (A <= c && c <= Z);
			let isevent = this.substring(0,2).toUpperCase() == "ON";
			let _base = ispublic ? base._public : base._privat;
			let _base_map = isevent ? _base.Event : _base.Property;
			if(_base_map[this]) return;

			let _this = ispublic ? _public : _privat;
			let _this_map = isevent ? _this.Event : _this.Property;
			_this_map[this] = true;
		});
		$(Object.keys(func.prototype)).each(function(){
			let c = this.charCodeAt(0);
			let ispublic = (A <= c && c <= Z);
			let _base_map = ispublic ? base._public.Method : base._privat.Method;
			if(_base_map[this]) return;

			let _this_map = ispublic ? _public.Method : _privat.Method;
			_this_map[this] = true;
		});
		$(Object.keys(func)).each(function(){
			let c = this.charCodeAt(0);
			let ispublic = (A <= c && c <= Z);
			let _base_map = ispublic ? base._public.Static : base._privat.Static;
			if(_base_map[this]) return;

			let _this_map = ispublic ? _public.Static : _privat.Static;
			_this_map[this] = typeof(func[this]);
		});
		log.push(func.name);
		$([["Public",_public],["Private",_privat]]).each(function(){
			log.push("    "+this[0]);
			for(let k in this[1]){
				let isstatic = k == "Static";
				let prop = this[1][k];
				let kk = Object.keys(prop);
				log.push("        "+k+(kk.length==0?" {Empty}":""));
				$(kk.sort()).each(function(){
					log.push("            "+this+(isstatic ? " : "+prop[this] : ""));
				});
			}
		});
	}

	let log = []
	if(IdeDesignDocu){
		log.push("[DEBUG] UIClass Infomation");
		UIControl.name = "UIControl";
		uiclassInfoLog(UIControl, new UIControl());
		uiclassInfoLog(UIForm, new UIForm());
	}

	let keys = Object.keys(UIControls.fn);
	for(let i=0;i<keys.length;i++){
		let name = keys[i];
		let func = UIControls.fn[name];

		if(!(typeof(func) === "function" && typeof(func.prototype.getJquery) === "function")) continue;
		if(!func.creator) continue;

		UIControls.classMap[name] = func;
		UIControls.classList.push(func);

		func.name = name;
		func.toString = function(){
			return this.name +"."+this.creator.clazz;
		};
		func.Create = function(css,parent){
			let $parent = parent ? $(parent) : $("#ui-document");
			let element = document.createElement(this.creator.tag);
			let $element = $(element);

			let ui_id = UIControls.newUIID(this.name);
			let dom_id = UIControls.newID();
			element.setAttribute("id", dom_id);
			element.setAttribute("ui-id", ui_id);
			element.setAttribute("ui-class", this.name);
			element.setAttribute("class", "ui-control "+this.creator.clazz);
			element.setAttribute("dock", "0");
			element.setAttribute("anchor", "0b0101");

			element.style.zIndex = $parent.children(".ui-control").length;
			if(css){ $element.css(css); }
			$(document.body).append($element);
			if(!element.style.left  ){ element.style.left   = "auto"; }
			if(!element.style.top   ){ element.style.top    = "auto"; }
			if(!element.style.right ){ element.style.right  = "auto"; }
			if(!element.style.bottom){ element.style.bottom = "auto"; }
			if(!element.style.width ){ element.style.width  = "auto"; }
			if(!element.style.height){ element.style.height = "auto"; }

			let control = UIControls.attach(element);
			if(this.creator.initialize){ this.creator.initialize.call(this,control); }

			element.style.visibility = "hidden";
			$parent.append(element);
			element.style.removeAttribute("visibility");
			return control;
		};

		if(IdeDesignDocu){ uiclassInfoLog(func, func()); }
	}
	if(log.length > 0){
		if(IsHtaPlatform){console.log(log.join("\n"));}
		else{ $(log).each(function(i,v){ console.log(v); }); }
	}
};

UIControls.initialize = function(){
		$(UIControls.classList).each(function(){
			if(!this.initialize){ return; }
			this.initialize.call(this);
		});
};

UIControls.creator = (function(){
	let defalut = {
		icon  : null,
		prefix: null,
		tag   : null,
		clazz : null,
		initialize : null,
	};
	return function(creator){
		let v = $.extend(true,{},defalut, creator);
		return v;
	};
})();

UIControls.attach = function(element, skip_throw){
	if(!(element instanceof HTMLElement)){
		if(skip_throw) return null;
		throw new Error("element 파라미터는 Dom Element를 요구합니다.");
	}
	if(element == Form.element || element == Form.frame){ return Form; }

	let clazz = element.getAttribute("ui-class");
	let func  = this.classMap[clazz];
	if(!func){
		if(skip_throw) return null;
		throw new Error("UIControl을 상속받은 컨트롤이 아닙니다. ["+clazz+"]"+location.href);
	}

	let ui_id = element.getAttribute("ui-id");
	let control = window[ui_id];
	if(!control){
		control = func();
		control.func = func;
		control.toString = function(){
			return this.func.name
						+"("+this.element.tagName.toLowerCase()
						+"."+this.func.creator.clazz+")."
						+this.element.getAttribute("ui-id")+"("+this.element.id+")";
		};
		control.frame = element;
		control.element = element;
		control.$element = $(element);
		window[ui_id] = control;
	}else if(control.element != element){
		control.frame = element;
		control.element = element;
		control.$element = $(element);
	}

	return control;
};

UIControls.detach = function(element){
	let ui_id = element.getAttribute("ui-id");
	let control = window[ui_id];
	if(control){
		control.$element.find(".ui-control").each(function(){
			let _ui_id = this.getAttribute("ui-id");
			if(window[_ui_id]){ delete window[_ui_id]; }
		});
		delete window[ui_id];
	}
};
UIControls.newID = function(){
	let n = new Date().getTime()+ parseInt(document.uniqueID.substr(6),10);
	return "ui-"+n.toString(16);
};
UIControls.newUIID = function(clazz){
	let func  = this.classMap[clazz];
	if(!func){ return null; }

	let css = func.creator.clazz;
	let ui_id = null;
	if(!func.nextId){
		func.nextId = { count : 1 };
	}
	let prefix = func.creator.prefix+clazz.toLowerCase().substr(2);
	while(true){
		ui_id = prefix+(func.nextId.count++);
		if(!window[ui_id]){ break; }
	}
	return ui_id;
};

UIControls.changeUIID = function(element, new_id){
	if(window[new_id]){
		//TODO UIControl.changeUIID 이미 등록된 아이디라면? 알림창???
		return false;
	}
	let ui_id = element.getAttribute("ui-id");
	element.setAttribute("ui-id",new_id);
	window[new_id] = window[ui_id];
	delete window[ui_id];
	return true;
};

UIControls.checkAndChangeIDs = function(element){
	let dom_id = element.id;
	let ui_id  = element.getAttribute("ui-id");
	if(document.getElementById(dom_id)){
		element.id = UIControls.newID();
	}
	if(window[ui_id]){
		element.setAttribute("ui-id", UIControls.newUIID(element.getAttribute("ui-class")));
	}
};

UIControls.getUIClass = function(clazz){
	return this.classMap[clazz];
};

UIControls.getCssClass = function(clazz){
	let func  = this.classMap[clazz];
	if(!func){ return null; }
	return func.creator.clazz;
};

UIControls.getPrefixID = function(clazz){
	let func  = this.classMap[clazz];
	if(!func){ return ""; }
	return func.creator.prefix;
};

UIControls.createProperty = function(control, name, f_getter, f_setter){
	if(f_getter){ control.__defineGetter__(name, f_getter); }
	if(f_setter){ control.__defineSetter__(name, f_setter); }
};

UIControls.createEventProperty = function(control, name){
		let pname = "On"+name;
		let ename = "x"+pname.toLowerCase();
		control.__defineGetter__(pname, function(){
			return control.element.getAttribute(ename);
		});
		control.__defineSetter__(pname, function(v){
			if(v){control.element.setAttribute(ename,v);}
			else{control.element.removeAttribute(ename);}
		});
};


/************************************************************************************************/
//element.ownerDocument.defaultView.getComputedStyle(dd.element)

function UIControl(){
	if(!(this instanceof UIControl)){return new UIControl();}
	this.frame = null;
	this.element = null;
	this.$element = null;
	this.internal = {};
	UIControls.createProperty(this, "$", this.getJquery);

	//속성
	UIControls.createProperty(this, "ID"                , this.getID                , function(){}             );
	UIControls.createProperty(this, "Text"              , this.getText              , this.setText             );
	UIControls.createProperty(this, "Size"              , this.getSize              , this.setSize             );
	UIControls.createProperty(this, "Position"          , this.getPosition          , this.setPosition         );
	UIControls.createProperty(this, "BackColor"         , this.getBackColor         , this.setBackColor        );
	UIControls.createProperty(this, "BackImage"         , this.getBackImage         , this.setBackImage        );
	UIControls.createProperty(this, "BackImageRepeat"   , this.getBackImageRepeat   , this.setBackImageRepeat  );
	UIControls.createProperty(this, "BackImagePosition" , this.getBackImagePosition , this.setBackImagePosition);
	UIControls.createProperty(this, "BackImageSize"     , this.getBackImageSize     , this.setBackImageSize    );
	UIControls.createProperty(this, "Dock"              , this.getDock              , this.setDock             );
	UIControls.createProperty(this, "Anchors"           , this.getAnchors           , this.setAnchors          );
	UIControls.createProperty(this, "Visible"           , this.getVisible           , this.setVisible          );
	UIControls.createProperty(this, "FontName"          , this.getFontName          , this.setFontName         );
	UIControls.createProperty(this, "FontSize"          , this.getFontSize          , this.setFontSize         );
	UIControls.createProperty(this, "FontColor"         , this.getFontColor         , this.setFontColor        );
	UIControls.createProperty(this, "FontBold"          , this.getFontBold          , this.setFontBold         );
	UIControls.createProperty(this, "BorderStyle"       , this.getBorderStyle       , this.setBorderStyle      );
	UIControls.createProperty(this, "BorderColor"       , this.getBorderColor       , this.setBorderColor      );
	UIControls.createProperty(this, "BorderWidth"       , this.getBorderWidth       , this.setBorderWidth      );
	UIControls.createProperty(this, "BorderRound"       , this.getBorderRound       , this.setBorderRound      );
	UIControls.createProperty(this, "Enabled"           , this.getEnabled           , this.setEnabled          );
	UIControls.createProperty(this, "Tag"               , this.getTag               , this.setTag              );

	//이벤트
	UIControls.createEventProperty(this, "Click");
}

UIControl.Attach = function(elementIdOrRef){
	return UIControls.attach(elementIdOrRef);
};

UIControl.arrangeDock = function(parent){
	let $parent = $(parent);
	let docks = $parent.children(".ui-dock").filter(":not(.ui-hide)").get().sort(function(e1,e2){
		//let d1 = atoi(e1.getAttribute("dock"));
		//let d2 = atoi(e2.getAttribute("dock"));
		//if(d1 == DockStyle.Fill && d2 != DockStyle.Fill) return 1;
		//if(d1 != DockStyle.Fill && d2 == DockStyle.Fill) return -1;
		let z1 = atoi(e1.style.zIndex);
		let z2 = atoi(e2.style.zIndex);
		if(z1 == z2) return 0;//never
		return z1 < z2 ? -1 : 1;
	});
	if(docks.length == 0){ return; }

	function f_css(rect){
		if(rect.left   == "auto"){ this.style.left   = rect.left  ; }else{ this.style.left   = rect.left  +"px";}
		if(rect.top    == "auto"){ this.style.top    = rect.top   ; }else{ this.style.top    = rect.top   +"px";}
		if(rect.width  == "auto"){ this.style.width  = rect.width ; }else{ this.style.width  = rect.width +"px";}
		if(rect.height == "auto"){ this.style.height = rect.height; }else{ this.style.height = rect.height+"px";}
		if(rect.right  == "auto"){ this.style.right  = rect.right ; }else{ this.style.right  = rect.right +"px";}
		if(rect.bottom == "auto"){ this.style.bottom = rect.bottom; }else{ this.style.bottom = rect.bottom+"px";}
	}

	let es = { top:null, bottom:null, left:null, right:null, fill:null };
	let or = { left: 0, top: 0, right : 0, bottom: 0 };

	$(docks).each(function(idx){
		let $this = $(this);
		let br = this.getBoundingClientRect();
		let dock = atoi(this.getAttribute("dock"));
		let nr = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
		let nnr, ds;
		switch(dock){
			case DockStyle.Top:
				es.top = $this;
				nr.left   = or.left;
				nr.top    = or.top;
				nr.right  = or.right;
				nr.height = br.height;
				nr.bottom = "auto";
				nr.width  = "auto";
				or.top += br.height;
				f_css.call(this,nr);
				$this.attr("dock-h", this.offsetHeight);
				break;
			case DockStyle.Bottom:
				es.bottom = $this;
				nr.left   = or.left;
				nr.bottom = or.bottom;
				nr.right  = or.right;
				nr.height = br.height;
				nr.top    = "auto";
				nr.width  = "auto";
				or.bottom += br.height;
				f_css.call(this,nr);
				$this.attr("dock-h", this.offsetHeight);
				break;
			case DockStyle.Left:
				es.left = $this;
				nr.top    = or.top;
				nr.left   = or.left;
				nr.bottom = or.bottom;
				nr.width  = br.width;
				nr.right  = "auto";
				nr.height = "auto";
				or.left += br.width;
				f_css.call(this,nr);
				$this.attr("dock-w", this.offsetWidth);
				break;
			case DockStyle.Right:
				es.right = $this;
				nr.top    = or.top;
				nr.right  = or.right;
				nr.bottom = or.bottom;
				nr.width  = br.width;
				nr.left   = "auto";
				nr.height = "auto";
				or.right += br.width;
				f_css.call(this,nr);
				$this.attr("dock-w", this.offsetWidth);
				break;
			case DockStyle.Fill:
				es.fill = $this;
				nr.left   = or.left;
				nr.top    = or.top;
				nr.right  = or.right;
				nr.bottom = or.bottom;
				nr.width  = "auto";
				nr.height = "auto";
				f_css.call(this,nr);
				break;
		}
	});
};

UIControl.orderIndexZ = function(parent){
	let children = [];
	$(parent).children(".ui-control").each(function(){
		children.push(this);
	});
	children.sort(function(e1,e2){
			let z1 = atoi(e1.style.zIndex);
			let z2 = atoi(e2.style.zIndex);
			if(z1 == z2) return 0;
			return z1 < z2 ? -1 : 1;
	});
	$(children).each(function(zIndex){ this.style.zIndex = zIndex; });
};

UIControl.prototype.getJquery = function(){
	return this.$element;
};

UIControl.prototype.getID = function(){
	return this.element.getAttribute("ui-id");
};

UIControl.prototype.setDesignPasteText = function(){};

UIControl.prototype.getText = function(){
	let v = this.internal.text;
	return v == null || v == undefined ? null : v;
};
UIControl.prototype.setText = function(text){
	this.internal.text = text;
};

UIControl.prototype.getTag = function(){
	let v = this.internal.tag;
	return v == null || v == undefined ? null : v;
};
UIControl.prototype.setTag = function(tag){
	this.internal.tag = tag;
};

UIControl.prototype.getSize = function(){
	return new Size(this.element.offsetWidth, this.element.offsetHeight);
};
UIControl.prototype.setSize = function(size){
	this.SizeTo(size.Width, size.Height);
};

UIControl.prototype.getPosition = function(){
	return new Position(this.element.offsetLeft, this.element.offsetTop);
};
UIControl.prototype.setPosition = function(position){
	this.MoveTo(position.X, position.Y);
};

UIControl.prototype.getBackColor = function(){
	//return this.element.currentStyle.backgroundColor;
	return this.element.style.backgroundColor;
};
UIControl.prototype.setBackColor = function(color){
	this.element.style.backgroundColor = color;
};

UIControl.prototype.getBackImage = function(){
	let $back = this.$element.children(".ui-back-image");
	if($back.length == 0){ return null; }
	let url = $back[0].style.backgroundImage;
	return url.replace(/(?:^url\(["']?|["']?\)$)/ig, "");
};
UIControl.prototype.setBackImage = function(url){
	let $back = this.$element.children(".ui-back-image");
	if($back.length == 0){
		$back = $("<span class='ui-back-image'></span>");
		this.$element.append($back);
	}
	if(!url){
		$back.remove();
		return;
	}
	let back = $back[0];
	back.style.backgroundImage = "url("+url+")";

	let v;
	v = this.element.getAttribute("back-image-repeat");
	if(v){
		back.style.backgroundRepeat = v ? "repeat" : "no-repeat";
	}

	v = this.element.getAttribute("back-image-size");
	if(v){
		back.style.backgroundSize = v ? v : "auto" ;
	}

	v = this.element.getAttribute("back-image-pos");
	if(v){
		v = v.split(",");
		back.style.backgroundPositionX = v[0];
		back.style.backgroundPositionY = v[1];
	}
};

UIControl.prototype.getBackImageRepeat = function(){
	let v = this.element.getAttribute("back-image-repeat");
	return v == "y";
};
UIControl.prototype.setBackImageRepeat = function(repeat){
	if(repeat === true){ this.element.setAttribute("back-image-repeat","y"); }
	else{ this.element.removeAttribute("back-image-repeat");}

	let $back = this.$element.children(".ui-back-image");
	if($back.length == 0){ return; }
	$back[0].style.backgroundRepeat = repeat === true ? "repeat" : "no-repeat";
};

UIControl.prototype.getBackImagePosition = function(){
	let xy = this.element.getAttribute("back-image-pos");
	if(!xy){ xy = "0px,0px"; }
	xy = xy.split(",");
	let dx = xy[0].substr(-2);//number , string : "0%", ["left", "center", "right" ]
	let dy = xy[1].substr(-2);//number , string : "0%", ["top" , "center", "bottom"]
	if(dx == "px"){ xy[0] = atoi(xy[0]); }
	if(dy == "px"){ xy[1] = atoi(xy[1]); }
	return new Position(xy[0],xy[1]);
};
UIControl.prototype.setBackImagePosition = function(position){
	if(!(position instanceof Position)){ position = new Position(0,0); }
	let x = typeof(position.X)=="number" ? position.X+"px" : position.X ;
	let y = typeof(position.Y)=="number" ? position.Y+"px" : position.Y ;
	this.element.setAttribute("back-image-pos",x+","+y);

	let $back = this.$element.children(".ui-back-image");
	if($back.length == 0){ return; }
	let back = $back[0];
	back.style.setAttribute("background-position-x",x);
	back.style.setAttribute("background-position-y",y);
};

UIControl.prototype.getBackImageSize = function(){
	//TODO UIControl.BackImageSize Value 규칙을 어떻게 ??? "", "width height"
	//예] "auto", "100%", "auto 50%", "auto 50%", "100% 100%"
	let v = this.element.getAttribute("back-image-size");
	return v ? v : "auto";
};
UIControl.prototype.setBackImageSize = function(size){
	if(size){ this.element.setAttribute("back-image-size", size); }
	else { this.element.removeAttribute("back-image-size"); }

	let $back = this.$element.children(".ui-back-image");
	if($back.length == 0){ return; }
	$back[0].style.backgroundSize = size ? size : "auto" ;
};

UIControl.prototype.computeDimension = function(dock, anchor){
	if(dock != DockStyle.None){ return; }
	let frame = this.frame;
	let parent = frame.parentElement;
	let parentRect = parent.getBoundingClientRect();
	let parentClientWidth  = parent.clientWidth +(parentRect.width -parent.offsetWidth );
	let parentClientHeight = parent.clientHeight+(parentRect.height-parent.offsetHeight);

	let left="auto",top="auto",width="auto",height="auto",right="auto",bottom="auto";
	if(anchor & AnchorStyles.Left)  { left   = frame.offsetLeft+"px"; }
	if(anchor & AnchorStyles.Top)   { top    = frame.offsetTop +"px"; }
	if(anchor & AnchorStyles.Right) { right  = (parentClientWidth -(frame.offsetLeft+frame.offsetWidth ))+"px"; }
	if(anchor & AnchorStyles.Bottom){ bottom = (parentClientHeight-(frame.offsetTop +frame.offsetHeight))+"px"; }
	if(!(left != "auto" && right  != "auto")){ width  = frame.offsetWidth +"px"; }
	if(!(top  != "auto" && bottom != "auto")){ height = frame.offsetHeight+"px"; }
	switch(anchor){
		case AnchorStyles.Left | AnchorStyles.Right:
			top  = ((frame.offsetTop / parentClientHeight) * 100)+"%";
			break;
		case AnchorStyles.Top | AnchorStyles.Bottom:
			left = ((frame.offsetLeft / parentClientWidth) * 100)+"%";
			break;
		case AnchorStyles.None:
			top  = ((frame.offsetTop / parentClientHeight) * 100)+"%";
			left = ((frame.offsetLeft / parentClientWidth) * 100)+"%";
			break;
	}
	frame.style.left   = left  ;
	frame.style.top    = top   ;
	frame.style.width  = width ;
	frame.style.height = height;
	frame.style.right  = right ;
	frame.style.bottom = bottom;
};

UIControl.prototype.getDock = function(){
	let dock = this.frame.getAttribute("dock");
	try{ dock = atoi(dock,-99); }
	catch(e){ dock = -99; }
	if(!(DockStyle.None <= dock && dock <= DockStyle.Fill)){
		dock = DockStyle.None;
		this.frame.setAttribute("dock", dock);
	}
	return dock;
};
UIControl.prototype.setDock = function(dock){
	let skipArrangeDock = arguments[1];

	if(!(typeof(dock) == "number")){
		throw new Error("Required Number Type Dock Param : Invalid Type(Value) = "+typeof(dock)+"("+dock+")");
	}
	if(!(DockStyle.None <= dock && dock <= DockStyle.Fill)){
		throw new Error("Required DockStyle Enum : Invalid Value = "+dock);
	}
	let odock = this.Dock;
	if(odock == dock){ return; }
	let frame = this.frame;
	let $frame = $(frame);

	if(odock == DockStyle.None){
		let dock_r = [];
		dock_r.push("left:"  +frame.currentStyle.left  );
		dock_r.push("top:"   +frame.currentStyle.top   );
		dock_r.push("width:" +frame.currentStyle.width );
		dock_r.push("height:"+frame.currentStyle.height);
		dock_r.push("right:" +frame.currentStyle.right );
		dock_r.push("bottom:"+frame.currentStyle.bottom);
		$frame.attr("dock", dock)
			.attr("dock-w",frame.offsetWidth).attr("dock-h",frame.offsetHeight)
			.attr("dock-r",dock_r.join(";"))
			.addClass("ui-dock");
		switch(dock){
			case DockStyle.Top   : $frame.addClass("ui-dock-top"   ); break;
			case DockStyle.Bottom: $frame.addClass("ui-dock-bottom"); break;
			case DockStyle.Left  : $frame.addClass("ui-dock-left"  ); break;
			case DockStyle.Right : $frame.addClass("ui-dock-right" ); break;
			case DockStyle.Fill  : $frame.addClass("ui-dock-fill"  ); break;
		}
	}else if(dock == DockStyle.None){
		let dock_r = $frame.attr("dock-r").split(";");
		$frame.attr("dock", dock)
			.removeAttr("undock").removeAttr("dock-r").removeAttr("dock-w").removeAttr("dock-h")
			.removeClass("ui-dock ui-dock-top ui-dock-bottom ui-dock-left ui-dock-right ui-dock-fill");
		$(dock_r).each(function(){
			let ar = this.split(":");
			if(ar.length != 2) return;
			frame.style.setAttribute(ar[0], ar[1]);
		});
	}else{
		$frame.attr("dock",dock)
			.removeClass("ui-dock-top ui-dock-bottom ui-dock-left ui-dock-right ui-dock-fill");
		switch(dock){
			case DockStyle.Top   : $frame.addClass("ui-dock-top"   ); break;
			case DockStyle.Bottom: $frame.addClass("ui-dock-bottom"); break;
			case DockStyle.Left  : $frame.addClass("ui-dock-left"  ); break;
			case DockStyle.Right : $frame.addClass("ui-dock-right" ); break;
			case DockStyle.Fill  : $frame.addClass("ui-dock-fill"  ); break;
		}
		let dock_w = atoi($frame.attr("dock-w"));
		let dock_h = atoi($frame.attr("dock-h"));
		switch(odock){
			case DockStyle.Top   :
			case DockStyle.Bottom:
				switch(dock){
					case DockStyle.Left  :
					case DockStyle.Right :
						$frame.css({width:frame.offsetHeight,height:1,top:0,left:0});
						break;
					case DockStyle.Fill  :
						$frame.css({width:dock_w,height:dock_h,top:0,left:0});
						$frame.attr("dock-h",frame.offsetHeight);
						break;
				}
				break;
			case DockStyle.Left  :
			case DockStyle.Right :
				switch(dock){
					case DockStyle.Top   :
					case DockStyle.Bottom:
						$frame.css({width:1,height:frame.offsetWidth,top:0,left:0});
						break;
					case DockStyle.Fill  :
						$frame.css({width:dock_w,height:dock_h,top:0,left:0});
						$frame.attr("dock-w", frame.offsetWidth);
						break;
				}
				break;
			case DockStyle.Fill  :
				switch(dock){
					case DockStyle.Top   :
					case DockStyle.Bottom:
						$frame.css({width:1,height:dock_h,top:0,left:0});
						break;
					case DockStyle.Left  :
					case DockStyle.Right :
						$frame.css({width:dock_w,height:1,top:0,left:0});
						break;
				}
				break;
		}
	}

	if(skipArrangeDock === true){ return; }
	UIControl.arrangeDock(this.frame.parentElement);
};

UIControl.prototype.getAnchors = function(){
	let anchor = this.frame.getAttribute("anchor");
	try{ anchor = atoi(anchor.substr(2),-1,2); }
	catch(e){ anchor = -1; }
	if(!(AnchorStyles.None <= anchor && anchor <= 0x0F)){
		anchor = (AnchorStyles.Top|AnchorStyles.Left);
		this.frame.setAttribute("anchor", "0b"+ ("0000"+anchor.toString(2)).substr(-4));
	}
	return anchor;
};
UIControl.prototype.setAnchors = function(anchor){
	let dock = this.Dock;
	if(dock != DockStyle.None){ return; }

	if(!(typeof(anchor) == "number")){
		throw new Error("Required Number Type Anchors Param : Invalid Type(Value) = "+typeof(anchor)+"("+anchor+")");
	}
	if(!(AnchorStyles.None <= anchor && anchor <= 0x0F)){
		throw new Error("Required AnchorStyles Enum : Invalid Value = "+anchor);
	}
	if(this.Anchors == anchor){ return; }

	let frame = this.frame;
	frame.setAttribute("anchor", "0b"+ ("0000"+anchor.toString(2)).substr(-4));
	this.computeDimension(dock, anchor);
};

UIControl.prototype.getVisible = function(){
	return !this.$element.hasClass("ui-hide");
};
UIControl.prototype.setVisible = function(visible){
	if(visible === true){ this.$element.removeClass("ui-hide"); }
	else{ this.$element.addClass("ui-hide"); }
	if(this == Form){
		UIControl.arrangeDock(this.frame);
	}else{
		UIControl.arrangeDock(this.frame.parentElement);
	}
};

UIControl.prototype.getFontName = function(){
	return this.element.currentStyle.fontFamily;
};
UIControl.prototype.setFontName = function(name){
	this.element.style.fontFamily = name;
};

UIControl.prototype.getFontSize = function(){
	return atoi(this.element.currentStyle.fontSize);
};
UIControl.prototype.setFontSize = function(size){
	this.element.style.fontSize = size+"px";
};

UIControl.prototype.getFontColor = function(){
	return this.element.currentStyle.color;
};
UIControl.prototype.setFontColor = function(color){
	this.element.style.color = color;
};

UIControl.prototype.getFontBold = function(){
	let bold = this.element.currentStyle.fontWeight;
	let i_bold = parseInt(bold,10);
	if(isNaN(i_bold)){
		return this.element.currentStyle.fontWeight == "bold";
	}else{
		return i_bold == 700;
	}
};
UIControl.prototype.setFontBold = function(bold){
	switch(typeof(bold)){
		case "number":
			this.element.style.fontWeight = bold;
			break;
		case "boolean":
			this.element.style.fontWeight = bold === true ? "bold" : "normal";
			break;
		default:
			this.element.style.fontWeight = "normal";
			break;
	}
};

UIControl.prototype.getBorderStyle = function(){
	return this.element.currentStyle.borderStyle;
};
UIControl.prototype.setBorderStyle = function(style){
	//style = ["solid","dotted","dashed","double","groove","ridge","inset","outset"]
	this.element.style.borderStyle = style;
};

UIControl.prototype.getBorderColor = function(){
	return this.element.currentStyle.borderColor;
};
UIControl.prototype.setBorderColor = function(color){
	this.element.style.borderColor = color;
};

UIControl.prototype.getBorderWidth = function(){
	return atoi(this.element.currentStyle.borderWidth);
};
UIControl.prototype.setBorderWidth = function(width){
	this.element.style.borderWidth = width+"px";
};

UIControl.prototype.getBorderRound = function(){
	return new Rounding(
					this.element.currentStyle.borderTopLeftRadius,
					this.element.currentStyle.borderTopRightRadius,
					this.element.currentStyle.borderBottomLeftRadius,
					this.element.currentStyle.borderBottomRightRadius
				);
};
UIControl.prototype.setBorderRound = function(rounding){
	if(!(rounding instanceof Rounding)){ rounding = new Rounding(0,0,0,0); }
	this.element.style.borderTopLeftRadius     = rounding.TopLeft    +"px";
	this.element.style.borderTopRightRadius    = rounding.TopRight   +"px";
	this.element.style.borderBottomLeftRadius  = rounding.BottomLeft +"px";
	this.element.style.borderBottomRightRadius = rounding.BottomRight+"px";
};

UIControl.prototype.getEnabled = function(){
	return !this.$element.hasClass("ui-disabled");
};
UIControl.prototype.setEnabled = function(enabled){
	this.$element.attr("disabled", !enabled);
	if(enabled){ this.$element.removeClass("ui-disabled"); }
	else{ this.$element.addClass("ui-disabled"); }
};

UIControl.prototype.MoveBy = function(x,y){
	let dock = this.Dock;
	if(dock != DockStyle.None){ return; }

	let frame  = this.frame;
	let left   = frame.offsetLeft;
	let top    = frame.offsetTop;
	let width  = frame.offsetWidth;
	let height = frame.offsetHeight;

	frame.style.left   = (left+x)+"px";
	frame.style.top    = (top +y)+"px";
	frame.style.width  = (width )+"px";
	frame.style.height = (height)+"px";
	frame.style.right  = "auto";
	frame.style.bottom = "auto";

	this.computeDimension(dock, this.Anchors);
};
UIControl.prototype.MoveTo = function(x,y){
	x = x-this.element.offsetLeft;
	y = y-this.element.offsetTop;
	this.MoveBy(x,y);
};

UIControl.prototype.SizeBy = function(w,h){
	let dock = this.Dock;
	if(dock == DockStyle.Fill){ return; }

	let direction = arguments[2] || "se-resize";
	let skipArrangeDock = arguments[3];

	let frame  = this.frame;
	let parent = frame.parentElement;
	let parentRect = parent.getBoundingClientRect();
	let parentClientWidth  = parent.clientWidth +(parentRect.width -parent.offsetWidth );
	let parentClientHeight = parent.clientHeight+(parentRect.height-parent.offsetHeight);

	let width  = frame.offsetWidth;
	let height = frame.offsetHeight;
	let left   = frame.offsetLeft;
	let top    = frame.offsetTop;
	let right  = parentClientWidth -(frame.offsetLeft+frame.offsetWidth );
	let bottom = parentClientHeight-(frame.offsetTop +frame.offsetHeight);

	function n_resize(){
		if(!(dock == DockStyle.None || dock == DockStyle.Bottom)){ return; }
		frame.style.top    = "auto";
		frame.style.bottom = bottom+"px";
		frame.style.height = (height-h)+"px";
	}

	function e_resize(){
		if(!(dock == DockStyle.None || dock == DockStyle.Left)){ return; }
		frame.style.left  = left+"px";
		frame.style.right = "auto";
		frame.style.width = (width+w)+"px";
	}

	function s_resize(){
		if(!(dock == DockStyle.None || dock == DockStyle.Top)){ return; }
		frame.style.top    = top+"px";
		frame.style.bottom = "auto";
		frame.style.height = (height+h)+"px";
	}

	function w_resize(){
		if(!(dock == DockStyle.None || dock == DockStyle.Right)){ return; }
		frame.style.left  = "auto";
		frame.style.right = right+"px";
		frame.style.width = (width-w)+"px";
	}

	switch(direction){
		case "nw-resize": n_resize(); w_resize(); break;
		case "n-resize" : n_resize();             break;
		case "ne-resize": n_resize(); e_resize(); break;
		case "e-resize" : e_resize();             break;
		case "se-resize": s_resize(); e_resize(); break;
		case "s-resize" : s_resize();             break;
		case "sw-resize": s_resize(); w_resize(); break;
		case "w-resize" : w_resize();             break;
	}

	this.computeDimension(dock, this.Anchors);
	if(skipArrangeDock === true){ return; }
	UIControl.arrangeDock(parent);
};
UIControl.prototype.SizeTo = function(w,h){
	w = w-this.element.offsetWidth;
	h = h-this.element.offsetHeight;
	this.SizeBy(w,h,arguments[2],arguments[3]);
};

UIControl.prototype.BringToFront = function(){
	this.setBringToFrontBack(true);
};
UIControl.prototype.BringToBack = function(){
	this.setBringToFrontBack(false);
};
UIControl.prototype.setBringToFrontBack = function(front){
	let skipArrangeDock = arguments[1];
	let frame  = this.frame;
	let parent = frame.parentElement;
	let children = [];
	$(parent).children(".ui-control").each(function(){
		if(frame == this) return;
		children.push(this);
	});
	children.sort(function(e1,e2){
			let z1 = atoi(e1.style.zIndex);
			let z2 = atoi(e2.style.zIndex);
			if(z1 == z2) return 0;
			return z1 < z2 ? -1 : 1;
	});
	if(front){ children.push(frame); }
	else     { children.splice(0,0,frame); }
	$(children).each(function(zIndex){ this.style.zIndex = zIndex; });

	if(skipArrangeDock === true){ return; }
	UIControl.arrangeDock(this.frame.parentElement);
};

UIControl.prototype.Remove = function(){
	UIControls.detach(this.element);
	this.$element.remove();
};

/************************************************************************************************/
function private_NotImplement(){throw new Error("Not Implement");}

function UIForm(){
	if(!(this instanceof UIForm)){return new UIForm();}
	UIControl.call(this);

	UIControls.createProperty(this, "Top"    , this.getTop   );
	UIControls.createProperty(this, "Parent" , this.getParent);
	UIControls.createProperty(this, "Opener" , this.getOpener);
	UIControls.createProperty(this, "Url"    , this.getUrl, this.setUrl);
	UIControls.createProperty(this, "Title"  , this.getTitle , this.setTitle);
	UIControls.createProperty(this, "Lang"   , this.getLang  , this.setLang);

	//ScrollbarXXX = ["hidden", "auto", "scroll"]
	//UIControls.createProperty(this, "ScrollbarH", this.getScrollbarH, this.setScrollbarH);
	//UIControls.createProperty(this, "ScrollbarV", this.getScrollbarV, this.setScrollbarV);

	//이벤트
	UIControls.createEventProperty(this, "Load");
	UIControls.createEventProperty(this, "UnLoad");
}
UIForm.name = "UIForm";
UIForm.prototype = Object.create(UIControl.prototype);
UIForm.prototype.constructor = UIForm;

UIForm.prototype.getBorderRound = function(){
	if(IdeDesignMode){ return null; }
	//private_NotImplement();
};
UIForm.prototype.setBorderRound  = function(){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};

UIForm.prototype.getVisible = function(){
	if(IdeDesignMode){ return null; }
	//private_NotImplement();
};
UIForm.prototype.setVisible = function(visible){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};

UIForm.prototype.setDock = function(element, dock){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};
UIForm.prototype.setAnchors = function(element, anchor){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};


UIForm.prototype.Open = function(url){
	if(IdeDesignMode){ return; }
	$(document.body).append("<iframe src='"+url+"' onload='this.style.visibility=\"visible\";'></iframe>");
};

UIForm.prototype.Close = function(){
	if(IdeDesignMode){ return; }
	if(parent.ViewMaster){ return; }
	if(this.iframe.isInclude){ return; }
	parent.$("iframe").each(function(){
		let $this = parent.$(this);
		if(this.contentWindow == window){
			$(window).triggerHandler("beforeunload");
			$this.hide().attr("src","about:blank").remove();
			return false;
		}
	});
};

UIForm.prototype.getUrl = function(){
	return location.pathname;
};

UIForm.prototype.setUrl = function(url){
	if(IdeDesignMode){ return; }
	location.href = url;
};

UIForm.prototype.getTop = function(){
	if(IdeDesignMode){ return  null; }
	if(parent.ViewMaster){ return null; }
	if(this.iframe.isInclude){
		return self.parent.Form.Top;
	}
	return this;
};

UIForm.prototype.getParent = function(){
	if(IdeDesignMode){ return  null; }
	if(!this.iframe.isInclude){ return null; }
	return self.parent.Form;
};

UIForm.prototype.getOpener = function(){
	if(IdeDesignMode){ return  null; }
	if(parent.ViewMaster){ return null; }
	if(this.iframe.isInclude){ return null; }
	return self.parent.Form;
};

UIForm.prototype.setBringToFrontBack = function(front){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};

UIForm.prototype.getTitle = function(){
	return document.title;
};
UIForm.prototype.setTitle = function(title){
	document.title = title;
};

UIForm.prototype.getLang = function(){
	return this.element.getAttribute("lang");
};
UIForm.prototype.setLang = function(lang){
	lang = Lang[lang];
	this.element.setAttribute("lang",lang ? lang.text : "kr");
};

UIForm.prototype.getScrollbarH = function(){
	return this.element.currentStyle.overflowX;
};
UIForm.prototype.setScrollbarH = function(scroll){
	this.element.style.overflowX = scroll;
};

UIForm.prototype.getScrollbarV = function(){
	return this.element.currentStyle.overflowY;
};
UIForm.prototype.setScrollbarV = function(scroll){
	this.element.style.overflowY = scroll;
};

UIForm.prototype.computeDimension = function(){};

UIForm.prototype.SizeBy = function(w,h){
	if(IdeDesignMode){
		let direction = arguments[2] || "se-resize";
		w = atoi(this.frame.offsetWidth +w)+"px";
		h = atoi(this.frame.offsetHeight+h)+"px";
		switch(direction){
			case "e-resize" : this.frame.style.width  = w;                              break;
			case "se-resize": this.frame.style.width  = w; this.frame.style.height = h; break;
			case "s-resize" :                              this.frame.style.height = h; break;
		}
		this.element.setAttribute("ide-size",this.element.offsetWidth+","+this.element.offsetHeight);
		return;
	}
	//private_NotImplement();
};
UIForm.prototype.SizeTo = function(w,h){
	w = w-this.element.offsetWidth;
	h = h-this.element.offsetHeight;
	this.SizeBy(w,h);
};

UIForm.prototype.MoveBy = function(x,y){
	if(IdeDesignMode){ return; }
	//private_NotImplement();
};
UIForm.prototype.MoveTo = function(x,y){
	x = x-this.element.offsetLeft;
	y = y-this.element.offsetTop;
	this.MoveBy(x,y);
};

UIForm.prototype.Alert = function(title, message, f_onclose){
	let control = this;
	let win = top;//top window
	let $$ = win.$;
	if($$(".ui-popup-container").length != 0){ return; }

	let buttonCaption = Form.Lang == "kr" ? "확인" : "OK";
	let $$popup = $$(win.document.createElement("div"));
	$$popup.addClass("ui-popup-container");
	$$popup.html(""
		+"<div class='ui-popup-back'></div>"
		+"<div class='ui-popup-front'>"
		+  "<div class='ui-popup-form alert'>"
		+    "<div class='ui-popup-title'>"
		+      "<span class='ui-popup-caption'>"
		+         "<span class='ui-popup-caption-icon'>1</span>"
		+         "<span class='ui-popup-caption-text'>"+title+"</span>"
		+      "</span>"
		+      "<span id='button-popup-close' result='X' class='ui-popup-button ui-popup-close-button'>r</span></div>"
		+    "<div class='ui-popup-content'>"+message+"</div>"
		+    "<div class='ui-popup-buttons'>"
		+     "<span class='ui-popup-button' result='OK'>"+buttonCaption+"</span>"
		+    "</div>"
		+  "</div>"
		+"</div>"
	);
	$$(win.document.body).append($$popup);
	$$popup.addClass("visible");

	$$popup.find("span.ui-popup-button").click(function(){
		let result = $(this).attr("result");
		$$popup.on("animationend transitionend",function(e){
			setTimeout(function(){ if(f_onclose){ f_onclose(result) }; });
			$$popup.remove();
		}).removeClass("visible").addClass("dispose");
	});
};

UIForm.prototype.Confirm = function(title, message, f_onclose){
	let control = this;
	let win = top;//top window
	let $$ = win.$;
	if($$(".ui-popup-container").length != 0){ return; }

	let buttonYesCaption,buttonNoCaption;
	switch(Form.Lang){
		case "kr":
			buttonYesCaption = "예";
			buttonNoCaption  = "아니요";
			break;
		case "en":
			buttonYesCaption = "Yes";
			buttonNoCaption  = "No";
			break;
	}

	let $$popup = $$(win.document.createElement("div"));
	$$popup.addClass("ui-popup-container");
	$$popup.html(""
		+"<div class='ui-popup-back'></div>"
		+"<div class='ui-popup-front'>"
		+  "<div class='ui-popup-form alert'>"
		+    "<div class='ui-popup-title'>"
		+      "<span class='ui-popup-caption'>"
		+         "<span class='ui-popup-caption-icon'>1</span>"
		+         "<span class='ui-popup-caption-text'>"+title+"</span>"
		+      "</span>"
		+      "<span id='button-popup-close' result='X' class='ui-popup-button ui-popup-close-button'>r</span></div>"
		+    "<div class='ui-popup-content'>"+message+"</div>"
		+    "<div class='ui-popup-buttons'>"
		+     "<span class='ui-popup-button' result='YES'>"+buttonYesCaption+"</span>"
		+     "<span class='ui-popup-button' result='NO' >"+buttonNoCaption+"</span>"
		+    "</div>"
		+  "</div>"
		+"</div>"
	);
	$$(win.document.body).append($$popup);
	$$popup.addClass("visible");

	$$popup.find("span.ui-popup-button").click(function(){
		let result = $(this).attr("result");
		$$popup.on("animationend transitionend",function(e){
			setTimeout(function(){ if(f_onclose){ f_onclose(result) }; });
			$$popup.remove();
		}).removeClass("visible").addClass("dispose");
	});
};

/************************************************************************************************/
function UILabel(){
	if(!(this instanceof UILabel)){return new UILabel();}
	UIControl.call(this);

	UIControls.createProperty(this, "Text"        , this.getText       , this.setText        );
	UIControls.createProperty(this, "TextAlignH"  , this.getTextAlignH , this.setTextAlignH  );
	UIControls.createProperty(this, "TextAlignV"  , this.getTextAlignV , this.setTextAlignV  );
	UIControls.createProperty(this, "TextPadding" , this.getTextPadding, this.setTextPadding );

	UIControls.createProperty(this, "Icon"        , this.getIcon       , this.setIcon        );
	UIControls.createProperty(this, "IconAlignH"  , this.getIconAlignH , this.setIconAlignH  );
	UIControls.createProperty(this, "IconAlignV"  , this.getIconAlignV , this.setIconAlignV  );
	UIControls.createProperty(this, "IconPadding" , this.getIconPadding, this.setIconPadding );

}
UIControls.fn.UILabel = UILabel;
UILabel.prototype = Object.create(UIControl.prototype);
UILabel.prototype.constructor = UILabel;
UILabel.creator = UIControls.creator({
	icon  : "/ide/controls/DomLabel.png",
	prefix: "LB_",
	tag   : "span",
	clazz : "ui-label",
	initialize : function(control){
		control.element.innerHTML = "<span class='ui-content'></span>";
		let $content = control.$element.children(".ui-content");
		$content[0].innerText = control.ID.substr(this.creator.prefix.length);
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "120px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "32px";
		}
	}
});
UILabel.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
};

UILabel.prototype.setDesignPasteText = function(){
	this.Text = this.ID.substr(this.func.creator.prefix.length);
};

UILabel.prototype.getText = function(){
	let $content = this.$element.children(".ui-content");
	return $content[0].innerHTML;
};
UILabel.prototype.setText = function(text){
	let $content = this.$element.children(".ui-content");
	$content[0].innerHTML = text;
};

UILabel.prototype.getTextAlignH = function(){
	//align = [ left, center, right ];
	let $content = this.$element.children(".ui-content");
	let align = $content[0].currentStyle.justifyContent;
	switch(align){
		case "flex-start": align = "left"  ; break;
		case "center"    : align = "center"; break;
		case "flex-end"  : align = "right" ; break;
	}
	return align;
};
UILabel.prototype.setTextAlignH = function(align){
	switch(align){
		case "left"  : align = "flex-start"; break;
		case "center": align = "center"    ; break;
		case "right" : align = "flex-end"  ; break;
		default      : align = "flex-start"; break;
	}
	let $content = this.$element.children(".ui-content");
	$content[0].style.justifyContent = align;
};

UILabel.prototype.getTextAlignV = function(){
	//align = [ top, middle, bottom ];
	let $content = this.$element.children(".ui-content");
	let align = $content[0].currentStyle.alignItems;
	switch(align){
		case "flex-start": align = "top"   ; break;
		case "center"    : align = "middle"; break;
		case "flex-end"  : align = "bottom"; break;
	}
	return align;
};
UILabel.prototype.setTextAlignV = function(align){
	switch(align){
		case "top"   : align = "flex-start"; break;
		case "middle": align = "center"    ; break;
		case "bottom": align = "flex-end"  ; break;
		default      : align = "flex-start"; break;
	}
	let $content = this.$element.children(".ui-content");
	$content[0].style.alignItems = align;
};

UILabel.prototype.getTextPadding = function(){
	let content = this.$element.children(".ui-content")[0];
	return new Padding(
					content.currentStyle.left,
					content.currentStyle.top,
					content.currentStyle.right,
					content.currentStyle.bottom
				);
};
UILabel.prototype.setTextPadding = function(padding){
	if(!(padding instanceof Padding)){ padding = new Padding(0,0,0,0); }
	let content = this.$element.children(".ui-content")[0];
	content.style.left   = padding.Left  +"px";
	content.style.top    = padding.Top   +"px";
	content.style.right  = padding.Right +"px";
	content.style.bottom = padding.Bottom+"px";
};

UILabel.prototype.getIcon = function(){
	let $icon = this.$element.children(".ui-icon-image");
	if($icon.length == 0){ return null; }
	let url = $icon[0].style.backgroundImage;
	return url.replace(/(?:^url\(["']?|["']?\)$)/ig, "");
};
UILabel.prototype.setIcon = function(url){
	let $icon = this.$element.children(".ui-icon-image");
	if($icon.length == 0){
		$icon = $("<span class='ui-icon-image'></span>");
		this.$element.append($icon);
	}
	if(!url){
		$icon.remove();
		return;
	}
	let icon = $icon[0];
	icon.style.backgroundImage = "url("+url+")";

	let align = this.iconAlign();
	if(align){
		icon.style.backgroundPositionX = align.h;
		icon.style.backgroundPositionY = align.v=="middle"?"center":align.v;
	}
	let padding = this.getIconPadding(true);
	if(padding){
		icon.style.left   = padding.Left  +"px";
		icon.style.top    = padding.Top   +"px";
		icon.style.right  = padding.Right +"px";
		icon.style.bottom = padding.Bottom+"px";
	}
};

UILabel.prototype.iconAlign = function(setter, align){
	//h-align = [ left, center, right ];
	//v-align = [ top, middle, bottom ];
	if(setter === true){
		this.element.setAttribute("icon-image-align",align);
		return;
	}
	align = this.element.getAttribute("icon-image-align");
	if(!align){ align = "left,middle"; }
	align = align.split(",");
	return {
		h : align[0], v : align[1],
		toString : function(){ return this.h+","+this.v; }
	};
};

UILabel.prototype.getIconAlignH = function(){
	return this.iconAlign().h;
};
UILabel.prototype.setIconAlignH = function(align){
	let xalign = this.iconAlign();
	switch(align){
		case "left"  : xalign.h = "left";   break;
		case "center": xalign.h = "center"; break;
		case "right" : xalign.h = "right" ; break;
		default      : xalign.h = "center"; break;
	}
	this.iconAlign(true,xalign);

	let $icon = this.$element.children(".ui-icon-image");
	if($icon.length == 0){ return; }
	$icon[0].style.backgroundPositionX = xalign.h;
};

UILabel.prototype.getIconAlignV = function(){
	return this.iconAlign().v;
};
UILabel.prototype.setIconAlignV = function(align){
	let xalign = this.iconAlign();
	switch(align){
		case "top"   : xalign.v = "top";    break;
		case "middle": xalign.v = "middle"; break;
		case "bottom": xalign.v = "bottom"; break;
		default      : xalign.v = "middle"; break;
	}
	this.iconAlign(true,xalign);

	let $icon = this.$element.children(".ui-icon-image");
	if($icon.length == 0){ return; }
	$icon[0].style.backgroundPositionY = xalign.v == "middle" ? "center" : xalign.v ;
};

UILabel.prototype.getIconPadding = function(nulls){
	let v = this.element.getAttribute("icon-image-padding");
	if(!v){
		if(nulls === true){ return null; }
		v = "0,0,0,0";
	}
	v = v.split(",");
	return new Padding(v[0],v[2],v[3],v[4]);
};
UILabel.prototype.setIconPadding = function(padding){
	if(!(padding instanceof Padding)){ padding = new Padding(0,0,0,0); }
	this.element.setAttribute("icon-image-padding", padding);

	let $icon = this.$element.children(".ui-icon-image");
	if($icon.length == 0){ return null; }
	let icon = $icon[0];
	icon.style.left   = padding.Left  +"px";
	icon.style.top    = padding.Top   +"px";
	icon.style.right  = padding.Right +"px";
	icon.style.bottom = padding.Bottom+"px";
};

/************************************************************************************************/
function UIButton(){
	if(!(this instanceof UIButton)){return new UIButton();}
	UILabel.call(this);

	/*"blue","green","orange","red","dark","mint","gray"*/
	UIControls.createProperty(this, "Style" , this.getStyle , this.setStyle);
}

UIControls.fn.UIButton = UIButton;
UIButton.prototype = Object.create(UILabel.prototype);
UIButton.prototype.constructor = UIButton;
UIButton.creator = UIControls.creator({
	icon  : "/ide/controls/DomButton.png",
	prefix: "BT_",
	tag   : "span",
	clazz : "ui-button",
	initialize : function(control){
		control.element.innerHTML = "<span class='ui-content'></span>";
		let $content = control.$element.children(".ui-content");
		$content[0].innerText = control.ID.substr(this.creator.prefix.length);

		control.Style = "blue";
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "80px";
		}
	}
});
UIButton.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("mousedown mouseup",".ui-button",function(e){
		if(!$(this).hasClass("ui-control")) return;
		if(e.type == "mousedown"){
			$(this).addClass("ui-mousedown")[0].setCapture();
		}else{
			$(this).removeClass("ui-mousedown")[0].releaseCapture();
		}
	});
	$(".ui-button").mousedown(btnClick); //버튼클릭 이벤트

	function btnClick(){
		var click = this;
		$(click).animate({
			top: '+=5px',
			opacity: '0.5',
		},50,reback);

		function reback(){
			$(click).animate({
				top: '-=5px',
				opacity: '1',
			},50);

			click = null;
		}
	}
};

UIButton.prototype.getStyle = function(){
	return this.$element.attr("theme");
}

/*"", "blue","green","orange","red","dark","mint","gray"*/
UIButton.prototype.setStyle = function(styleName){
	this.$element.removeClass("theme-blue theme-green theme-orange theme-red theme-dark theme-mint theme-gray");
	this.$element.attr("theme", "");
	if(styleName.length == 0){return;}
	this.$element.addClass("theme-"+styleName);
	this.$element.attr("theme", styleName);
}

/************************************************************************************************/
function UICheckBox(){
	if(!(this instanceof UICheckBox)){return new UICheckBox();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "Text"    , this.getText    , this.setText   );
	UIControls.createProperty(this, "Value"   , this.getValue   , this.setValue  );
	UIControls.createProperty(this, "Checked" , this.getChecked , this.setChecked);

	//이벤트
	UIControls.createEventProperty(this, "Checked");
}
UIControls.fn.UICheckBox = UICheckBox;
UICheckBox.prototype = Object.create(UIControl.prototype);
UICheckBox.prototype.constructor = UICheckBox;
UICheckBox.creator = UIControls.creator({
	icon  : "/ide/controls/DomCheckBox.png",
	prefix: "CB_",
	tag   : "span",
	clazz : "ui-checkbox",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<span class='ui-icon-image'><span></span></span>"
			+"<span class='ui-content'></span>";
		let $content = control.$element.children(".ui-content");
		$content[0].innerText = control.ID.substr(this.creator.prefix.length);
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "36px";
		}
	}
});
UICheckBox.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("click",".ui-checkbox",function(e){
		let control = UIControls.attach(this);
		let oldChecked = control.Checked;
		control.Checked = !oldChecked;
		let evtarg = e;
		let evtname = control.OnChecked;
		if(window[evtname]){
			let e = {};
			return window[evtname].call(control, evtarg);
		}
	});
};

UICheckBox.prototype.setDesignPasteText = function(){
	this.Text = this.ID.substr(this.func.creator.prefix.length);
};

UICheckBox.prototype.getText = function(){
	return this.$element.children(".ui-content").html();
};
UICheckBox.prototype.setText = function(text){
	this.$element.children(".ui-content").html(text);
};

UICheckBox.prototype.getValue = function(){
	return this.element.getAttribute("value");
};
UICheckBox.prototype.setValue = function(value){
	if(!value){
		this.element.removeAttribute("value");
	}else{
		this.element.setAttribute("value", value);
	}
};

UICheckBox.prototype.getChecked = function(){
	return this.$element.hasClass("ui-checked");
};
UICheckBox.prototype.setChecked = function(checked){
	if(typeof(checked) != "boolean") checked = false;
	//if (!this.Enabled) return false;
	let ochecked = this.$element.hasClass("ui-checked");
	if(ochecked == checked) return false;
	if(checked){ this.$element.addClass("ui-checked"); }
	else{ this.$element.removeClass("ui-checked"); }
	return true;
};

/************************************************************************************************/
function UIRadioBox(){
	if(!(this instanceof UIRadioBox)){return new UIRadioBox();}
	UICheckBox.call(this);

	//속성
	UIControls.createProperty(this,"Style"              , this.getStyle     , this.setStyle);
	UIControls.createProperty(this, "Checked"           , this.getChecked   , this.setChecked  );
	UIControls.createProperty(this, "GroupName"         , this.getGroupName , this.setGroupName);
	UIControls.createProperty(this, "CheckedGroupText"  , this.getCheckedGroupText );
	UIControls.createProperty(this, "CheckedGroupValue" , this.getCheckedGroupValue);
	UIControls.createProperty(this, "CheckedGroupRadioBox", this.getCheckedGroupRadioBox);
}
UIControls.fn.UIRadioBox = UIRadioBox;
UIRadioBox.prototype = Object.create(UICheckBox.prototype);
UIRadioBox.prototype.constructor = UIRadioBox;
UIRadioBox.creator = UIControls.creator({
	icon  : "/ide/controls/DomRadioBox.png",
	prefix: "RB_",
	tag   : "span",
	clazz : "ui-radiobox",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<span class='ui-icon-image'><span></span></span>"
			+"<span class='ui-content'></span>";
		let $content = control.$element.children(".ui-content");
		$content[0].innerText = control.ID.substr(this.creator.prefix.length);
		control.Style = "round";
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		} if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "36px";
		}
	}
});
UIRadioBox.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("click",".ui-radiobox",function(e){
		let control = UIControls.attach(this);
		let oldChecked = control.Checked;
		control.Checked = !oldChecked;
		let evtarg = e;
		let evtname = control.OnChecked;
		if(window[evtname]){
			let e = {};
			return window[evtname].call(control, evtarg);
			//e.stopImmediatePropagation();
		}
	});
};

UIRadioBox.prototype.getStyle = function(){
	return this.$element.attr("x-style");

};
UIRadioBox.prototype.setStyle = function(style){
	this.$element.removeClass("round square");
	this.$element.attr("x-style","");
	if(typeof (style) != "string" || style.length == 0){return;}
	this.$element.addClass(style);
	this.$element.attr("x-style",style);
};

UIRadioBox.prototype.getGroupClass = function(){
	let gname = this.GroupName;
	if(!gname){ return ""; }
	return "ui-radiobox-"+gname.hashCode();
};

UIRadioBox.prototype.getChecked = function(){
	return UICheckBox.prototype.getChecked.call(this);
};
UIRadioBox.prototype.setChecked = function(checked){
	let changed = UICheckBox.prototype.setChecked.call(this,checked);
	if(!changed){ return; }
	let clazz = this.getGroupClass();
	if(!clazz){ return; }
	let $radio = $("."+clazz);
	if(checked){
		if($radio.length != 0){
			$radio.removeClass(clazz);
			UIControls.attach($radio[0]).Checked = false;
		}
		this.$element.addClass(clazz);
	}else if($radio.length != 0 && $radio[0] == this.element){
		$radio.removeClass(clazz);
	}
};

UIRadioBox.prototype.getGroupName = function(){
	return this.element.getAttribute("group-name");
};
UIRadioBox.prototype.setGroupName = function(name){
	name = typeof(name) === "string" ? name.trim() : "";
	let clazz = this.getGroupClass();
	if(clazz){
		let $radio = $("."+clazz);
		$radio.removeClass(clazz);
	}
	if(name){ this.element.setAttribute("group-name", name); }
	else{ this.element.removeAttribute("group-name"); }
	this.Checked = false;
};

UIRadioBox.prototype.getCheckedGroupText = function(){
	let clazz = this.getGroupClass();
	if(!clazz){ return null; }
	let $radio = $("."+clazz);
	if($radio.length == 0){ return null; }
	return UIControls.attach($radio[0]).Text;
};

UIRadioBox.prototype.getCheckedGroupValue = function(){
	let clazz = this.getGroupClass();
	if(!clazz){ return null; }
	let $radio = $("."+clazz);
	if($radio.length == 0){ return null; }
	return UIControls.attach($radio[0]).Value;
};

UIRadioBox.prototype.getCheckedGroupRadioBox = function(){
	let clazz = this.getGroupClass();
	if(!clazz){ return null; }
	let $radio = $("."+clazz);
	if($radio.length == 0){ return null; }
	return UIControls.attach($radio[0]);
};

/************************************************************************************************/
function UIPanel(){
	if(!(this instanceof UIPanel)){return new UIPanel();}
	UIControl.call(this);

	//속성
	//ScrollbarXXX = ["hidden", "auto", "scroll"]
	//UIControls.createProperty(this, "ScrollbarH" , function(){ return this.element.currentStyle.overflowX; } , function(scroll){ this.element.style.overflowX = scroll; });
	//UIControls.createProperty(this, "ScrollbarV" , function(){ return this.element.currentStyle.overflowY; } , function(scroll){ this.element.style.overflowY = scroll; });
	UIControls.createProperty(this,"IncludeUrl", this.getIncludeUrl, this.setIncludeUrl);

	//IDE 비노출 속성
	UIControls.createProperty(this,"IncludeWindow", this.getIncludeWindow);
}
UIControls.fn.UIPanel = UIPanel;
UIPanel.prototype = Object.create(UIControl.prototype);
UIPanel.prototype.constructor = UIPanel;
UIPanel.creator = UIControls.creator({
	icon  : "/ide/controls/DomPanel.png",
	prefix: "PN_",
	tag   : "div",
	clazz : "ui-panel ui-container",
	initialize : function(control){
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "100px";
		}
	}
});
UIPanel.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}

	// 템플릿 CSS
	$("[ui-id='PN_Title']").css({
		"left"            : "0px",
		"top"             : "0px",
		"height"          : "102px",
		"background-color": "#176bc8"
	 });
	 $("[ui-id='PN_Title'] > [ui-id='LB_title']").css({
		"left"       : "80px",
		"top"        : "31px",
		"font-family": "IBK iDream M",
		"font-size"  : "38px"
	 });
	 $("[ui-id='PN_Subtitle']").css({
		"left"            : "0px",
		"top"             : "102px",
		"height"          : "92px",
		"background-color": "#eff0f2"
	 });
	 $("[ui-id='PN_Subtitle'] > [ui-id='LB_Subtitle']").css({
		"left"       : "80px",
		"top"        : "31px",
		"font-family": "IBK iDream L",
		"font-size"  : "28px"
	 });
	 $("[ui-id='PN_btn']").css({
		"height"          : "140px",
		"background-color": "transparent"
	 });
	 $("[ui-id='PN_btn'] > [ui-id='BT_left']").css({
		"left"       : "36px",
		"top"        : "31px",
		"font-family": "IBK iDream M",
		"font-size"  : "32px"
	 });
	 $("[ui-id='PN_btn'] > [ui-id='BT_right']").css({
		"right"       : "36px",
		"top"        : "31px",
		"font-family": "IBK iDream M",
		"font-size"  : "32px"
	 });
};

UIPanel.prototype.getIncludeUrl = function(){
	let $iframe = this.$element.find("iframe.ui-include:eq(0)");
	return $iframe.length == 0 ? null : $iframe.attr("src");
};
UIPanel.prototype.setIncludeUrl = function(url){
	if(typeof (url)==="string"&&url) {
		let $iframe=this.$element.find("iframe.ui-include:eq(0)");
		if($iframe.length==0) {
			$iframe=$("<iframe class='ui-include' frameborder='0' scrolling='0'></iframe>");
			$iframe.attr("src",url);
			this.$element.append($iframe);
		} else {
			$iframe.attr("src",url);
		}
	}else {
		this.$element.find("iframe.ui-include").remove();
	}
};

UIPanel.prototype.getIncludeWindow = function(){
	let $iframe = this.$element.find("iframe.ui-include:eq(0)");
	if($iframe.length == 0) return;
	return $iframe[0].contentWindow;
};


/************************************************************************************************/
//TODO UITextBox > nuber textbox 구현
function UITextBox(){
	if(!(this instanceof UITextBox)){return new UITextBox();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "Text"              , this.getText              , this.setText             );
	UIControls.createProperty(this, "TextAlign"         , this.getTextAlign         , this.setTextAlign        );
	UIControls.createProperty(this, "IsMultiLine"       , this.getIsMultiLine       , this.setIsMultiLine      );
	UIControls.createProperty(this, "MaxLength"         , this.getMaxLength         , this.setMaxLength        );
	//UIControls.createProperty(this, "InputType"         , this.getInputType         , this.setInputType        );
	//UIControls.createProperty(this, "IsRequired"        , this.getIsRequired        , this.setIsRequired       );
	//UIControls.createProperty(this, "CanNumberSeprator" , this.getCanNumberSeprator , this.setCanNumberSeprator);
	//UIControls.createProperty(this, "CanNegative"       , this.getCanNegative       , this.setCanNegative      );
	//UIControls.createProperty(this, "CanEncryptValue"   , this.getCanEncryptValue   , this.setCanEncryptValue  );
	//천단위(,) 표시여부, '-' 입력여부, Data암호화,

	//이벤트
	UIControls.createEventProperty(this, "KeyPress");
	UIControls.createEventProperty(this, "Changed");
}
UIControls.fn.UITextBox = UITextBox;
UITextBox.prototype = Object.create(UIControl.prototype);
UITextBox.prototype.constructor = UITextBox;
UITextBox.creator = UIControls.creator({
	icon  : "/ide/controls/DomTextBox.png",
	prefix: "TB_",
	tag   : "span",
	clazz : "ui-textbox",
	initialize : function(control){
		control.element.innerHTML = "<span><input maxlength='32767' type='text' class='ui-input'/></span>";
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "120px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "32px";
		}
	}
});
UITextBox.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("keydown","textarea.ui-input",function(e){
		if(e.key == "Tab"){
			e.preventDefault();
			let start = this.selectionStart;
			let end = this.selectionEnd;
			let value = this.value;
			this.value = value.substring(0, start)+"\t"+value.substring(end);
			this.selectionStart = this.selectionEnd = start + 1;
		}
	});
	$(Form.element).on("keyup","textarea.ui-input",function(e){
		if(e.key == "Tab"){
			e.type = "keypress";
			$(this).trigger(e);
		}
	});
	$(Form.element).on("keypress","input.ui-input,textarea.ui-input",function(e){
		let control = UIControls.attach(this.parentElement.parentElement);
		let evtarg = e;
		let evtname = control.OnKeyPress;
		if(window[evtname]){
			return window[evtname].call(control, evtarg);
		}
	});
	$(Form.element).on("change","input.ui-input,textarea.ui-input",function(e){
		let control = UIControls.attach(this.parentElement.parentElement);
		let evtarg = e;
		let evtname = control.OnChanged;
		if(window[evtname]){
			return window[evtname].call(control, evtarg);
		}
	});
<<<<<<< .mine
	$(Form.element).on("focus","input.ui-input,textarea.ui-input",function(e){
		this.style.border="3px solid #046fd9";


	});
	$(Form.element).on("blur","input.ui-input,textarea.ui-input",function(e){
		this.style.border = "2px solid #9e9e9e";
	});
||||||| .r458
=======
	$(Form.element).on("focus","input.ui-input,textarea.ui-input",function(e){
		this.parentElement.parentElement.style.border = "3px solid #046fd9";


	});
	$(Form.element).on("blur","input.ui-input,textarea.ui-input",function(e){
		this.parentElement.parentElement.style.border = "2px solid #9e9e9e";
	});
>>>>>>> .r549
};

UITextBox.prototype.getText = function(){

	if(this.IsMultiLine){
		return this.element.firstElementChild.firstElementChild.textContent;
	}else{
		return this.element.firstElementChild.firstElementChild.value;
	}
};
UITextBox.prototype.setText = function(text){
	/*
	//let b,i,c;
	//for(b=i=0;c=s.charCodeAt(i++); b+=c>>11?3:c>>7?2:1); //document charset and file encoding 에 따라서
	for(let i=0,b=0;i<text.length;i++){ b += text.charCodeAt(i) >= 127 ? 2 : 1; } //ansi
	*/
	//ctrl+v시 길이 확인

	let type = typeof(text);
	if(type == "undefined" || text === null){text = "";}
	if(typeof(text) != "string"){ text = text+""; }

	if(this.IsMultiLine){
		this.element.firstElementChild.firstElementChild.textContent = text;
	}else{
		this.element.firstElementChild.firstElementChild.setAttribute("value",text);
		this.element.firstElementChild.firstElementChild.value = text;
	}

	//this.element.firstElementChild.firstElementChild.value = text.substr(0,this.MaxLength);

};

UITextBox.prototype.getInputType = function(){
	InputType = [ text, password, number]
	return this.element.firstElementChild.firstElementChild.getAttribute("type");
};

UITextBox.prototype.setInputType = function(type){
	if(!this.IsMultiLine){
		switch(type){
			case "text":
				this.$element.addClass("ui-input-text");
				break;
			case "password":
				this.$element.addClass("ui-input-password");
				break;
			case "number":
				this.$element.addClass("ui-input-number");
				break;
		}
	}
	this.element.firstElementChild.firstElementChild.setAttribute("type", type);
};

UITextBox.prototype.getIsMultiLine = function(){
	return this.element.firstElementChild.firstElementChild.tagName == "TEXTAREA";
};
UITextBox.prototype.setIsMultiLine = function(bIsMultiLine){
	let text       = this.Text;
	let maxLength  = this.MaxLength;
	//let inputType  = this.InputType;
	//let isRequired = this.IsRequired;
	if(bIsMultiLine){
		this.element.firstElementChild.innerHTML = "<textarea type='text' class='ui-input' wrap='off'></textarea>";
	}else{
		this.element.firstElementChild.innerHTML = "<input type='text' class='ui-input'/>";
	}
	//this.IsRequired = isRequired;
	//this.InputType  = inputType;
	this.MaxLength  = maxLength;
	this.Text       = text;
};

UITextBox.prototype.getTextAlign = function(){
	//align = [ left, center, right ]
	return this.element.firstElementChild.firstElementChild.currentStyle.textAlign;
};
UITextBox.prototype.setTextAlign = function(align){
	this.element.firstElementChild.firstElementChild.style.textAlign = align;
};

UITextBox.prototype.getMaxLength = function(){
	return atoi(this.element.firstElementChild.firstElementChild.getAttribute("maxlength"),32767);
};
UITextBox.prototype.setMaxLength = function(maxLength){
	if(typeof(maxLength) != "number" || maxLength <= 0){ maxLength = 32767; }
	this.element.firstElementChild.firstElementChild.setAttribute("maxlength", maxLength);
};

UITextBox.prototype.getIsRequired = function(){
	return this.$element.hasClass("ui-required");
};
UITextBox.prototype.setIsRequired = function(isRequired){
	if(isRequired){ this.$element.addClass("ui-required"); }
	else{ this.$element.removeClass("ui-required"); }
};

UITextBox.prototype.getCanNumberSeprator = function(){
	return this.element.getAttribute("seprator");
};
UITextBox.prototype.setCanNumberSeprator = function(can){
	if(can === true){ this.element.setAttribute("seprator", "y"); }
	else { this.element.removeAttribute("seprator"); }
};

UITextBox.prototype.getCanNegative = function(){
	return this.element.getAttribute("negative");
};
UITextBox.prototype.setCanNegative = function(can){
	if(can === true){ this.element.setAttribute("negative", "y"); }
	else { this.element.removeAttribute("negative"); }
};

UITextBox.prototype.getCanEncryptValue = function(){
	return this.element.getAttribute("encrypt");
};
UITextBox.prototype.setCanEncryptValue = function(can){
	if(can === true){ this.element.setAttribute("encrypt", "y"); }
	else { this.element.removeAttribute("encrypt"); }
};
/************************************************************************************************/
function UIComboBox(){
	if(!(this instanceof UIComboBox)){return new UIComboBox();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "Text"          , this.getText          , this.setText         );
	UIControls.createProperty(this, "Value"         , this.getValue         , this.setValue        );
	UIControls.createProperty(this, "SelectedIndex" , this.getSelectedIndex , this.setSelectedIndex);
	//UIControls.createProperty(this, "DropDownStyle" , this.getDropDownStyle , this.setDropDownStyle);
	UIControls.createProperty(this, "ItemHeight"    , this.getItemHeight    , this.setItemHeight   );
	UIControls.createProperty(this, "ItemList"      , this.getItemList      , this.setItemList     );

	//UIControls.createProperty(this, "PopupTitle"    , this.getPopupTitle, this.setPopupTitle);

	//이벤트
	UIControls.createEventProperty(this, "SelectedItemChanged");
}
UIControls.fn.UIComboBox = UIComboBox;
UIComboBox.prototype = Object.create(UIControl.prototype);
UIComboBox.prototype.constructor = UIComboBox;
UIComboBox.creator = UIControls.creator({
	icon  : "/ide/controls/DomComboBox.png",
	prefix: "DL_",
	tag   : "span",
	clazz : "ui-combobox",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<span class='ui-content'></span>"
			+"<span class='ui-icon-image' fontsize='16' >▼ </span>"
			+"<select><option selected='selected'></option></select>";
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "220px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "36px";
		}
	}
});

UIComboBox.initialize = function () {
	//window onload 초기화
	if (IdeDesignMode){
		return;
	}
	$(Form.element).on("mousedown",".ui-combobox",function(e){
		e.stopImmediatePropagation () ;
		let control = UIControls.attach(this);
		let win = top; //top window
		let $$ = win.$;

		let $$popbk = $$(".ui-combo-list-popup-bk");
		if ($$popbk.length != 0){
			//$$popbk.remove () ;
			//control.$.removeClass("list-popup");
			return;
		}

		function viewPosition(element){
			let rc = element.getBoundingClientRect () ;
			let vrc = {x: rc.left,y: rc.top,w: rc.width,h: rc.height};
			let _win = window;
			do{
				if (_win == top){break;}
				let iframes = _win.parent.$("iframe");
				for(let i = 0; i < iframes.length; i++){
					if (_win == iframes[i].contentWindow){
						rc = iframes[i].getBoundingClientRect () ;
						vrc.x += rc.left;
						vrc.y += rc.top;
						break;
					}
				}
				_win = _win.parent;
			} while(true);
			return vrc;
		}
		control.$.addClass("list-popup");

		$$popbk = $$("<div class='ui-combo-list-popup-bk'></div>");
		$$(win.document.body).append($$popbk);

		let items = control.ItemList;
		let itemHeight = control.ItemHeight;
		let itemsTag = [];
		itemsTag.push("<div class='ui-combobox-scrollview'><div class='ui-combobox-items'>");
		$(items).each(function(i){
			itemsTag.push("<div class='ui-combobox-item" + (this.selected ? " selected" : "") + "'><div></div></div>");
		});
		if (items.length == 0){
			itemsTag.push("<div class='ui-combobox-item-empty'></div>");
		}
		itemsTag.push("</div></div>");

		let rc = viewPosition(control.element);
		let poph = Math.min(items.length * itemHeight,itemHeight * 10);
		let popy = rc.y + rc.h + 0;
		let viwh = win.document.documentElement.offsetHeight;

		let $$popup = $$("<div class='ui-combo-list-popup'></div>");
		$$popup.css({width: rc.w + "px",height: poph + "px",left: "0px",top: "0px"});
		$$popup.html(itemsTag.join(""));
		$$(win.document.body).append($$popup);
		let $$listbox = $$popup.find("div.ui-combobox-scrollview > div:eq(0)");
		poph += ($$listbox[0].getBoundingClientRect () .top - $$popup[0].getBoundingClientRect () .top) * 2;
		if (popy + poph > viwh){
			let _popy = popy - Math.abs((popy + poph) - viwh) - 10;
			if (rc.y <= _popy && _popy <= popy){
				_popy = rc.y;
			}
			popy = _popy;
		}
		$$popup.css({
			width: rc.w + "px",
			height: poph + "px",
			left: rc.x + "px",
			top: popy + "px"
		});

		$$popup.find("div.ui-combobox-item").each(function(i){
			let $$this = $$(this);
			$$this.attr("index",i).css("height",itemHeight).children("div:eq(0)").text(items[i].Text);
		});
		$$popup.css("opacity","1");
		let scorllview = $$popup[0].firstElementChild;
		if (scorllview.clientHeight != scorllview.scrollHeight){
			$$listbox.addClass("scroll");
			let $$scroll = $("<div class='ui-combobox-list-scroll'><span class='track'></span><span class='trackbutton'></span></div>");
			$$popup.append($$scroll);
			let trackbar = $$scroll[0].firstElementChild;
			let trackButton = $$scroll[0].lastElementChild;
			let ch = scorllview.offsetHeight;
			let sh = scorllview.scrollHeight;
			let range = sh - ch;
			let tarckButtonH = (trackbar.scrollHeight - range);
			if (tarckButtonH < 50) tarckButtonH = 50;
			trackButton.style.height = tarckButtonH + "px";
			$$(trackButton).mousedown(function(e){
				let track = trackbar.scrollHeight - trackButton.scrollHeight;
				let off = Math.round(track / range);
				let track_t = parseInt(trackButton.style.top);
				let pos_y = e.pageY;
				if (isNaN(track_t)) track_t = 0;

				function on_move(me){
					let ml = me.pageY - pos_y;
					let vtop = track_t + ml;
					if (vtop < 0){
						vtop = 0;
					} else if (vtop + trackButton.scrollHeight > trackbar.scrollHeight){
						vtop = trackbar.scrollHeight - trackButton.scrollHeight;
					}
					trackButton.style.top = vtop + "px";
					let p = (vtop / track) * 100;

					scorllview.scrollTop = p == 100 ? range : range * (p / 100);
				}

				function on_up(ue){
					$(trackButton).off("mousemove",on_move).on("mouseup",on_up);
					trackButton.releaseCapture () ;
				}
				$(trackButton).on("mousemove",on_move).on("mouseup",on_up);
				trackButton.setCapture () ;
			});

			$(scorllview).on("mousewheel DOMMouseScroll",function(e){
				e.preventDefault () ;
				e = e.originalEvent;
				var delta = (e.wheelDelta / 120) * itemHeight;
				scorllview.scrollTop -= delta;

				let track = trackbar.scrollHeight - trackButton.scrollHeight;
				let vtop = scorllview.scrollTop;
				let p = (vtop / (range - 2)) * 100;
				trackButton.style.top = (track * (p / 100)) + "px";
			});
		}

		function _close () {
			$$popbk.remove () ;
			$$popup.remove () ;
			control.$.removeClass("list-popup");
		}
		$$popbk.mousedown(_close);
		$$popup.find("div.ui-combobox-item").mousedown(function () {
			function _f(val){
				let item = items[val.index];
				if (item){
					val.text = item.text;
					val.value = item.value;
				} else{
					val.text = "";
					val.value = "";
				}
				val.toString = function () {return "[" + this.index + "][" + this.value + "]" + this.text;};
			}
			let evtarg = {
				before:{index: control.SelectedIndex},
				after:{index: atoi($(this).attr("index"))},
				cancel: false,
				close: true,
			};
			_f(evtarg.before);
			_f(evtarg.after);
			if (evtarg.before.index != evtarg.after.index){
				let evtname = control.OnSelectedItemChanged;
				if (window[evtname]){
					window[evtname].call(control,evtarg);
				}
				if (!evtarg.cancel){
					control.SelectedIndex = evtarg.after.index;
				}
			}
			if (evtarg.close){
				_close () ;
			}
		});
	});
};

UIComboBox.prototype.getPopupTitle = function(){
	let title = this.$element.attr("popup-title");
	if(!title) title = null;
	return title;
};

UIComboBox.prototype.setPopupTitle = function(title){
	if(title){
		this.$element.attr("popup-title", title);
	}else{
		this.$element.removeAttr("popup-title");
	}
};

UIComboBox.prototype.getItemHeight = function(){
	return atoi(this.element.getAttribute("item-height"),36);
};
UIComboBox.prototype.setItemHeight = function(itemHeight){
	if(typeof (itemHeight) != "number" || itemHeight <= 0) {itemHeight = 36; }
	this.element.setAttribute("item-height", itemHeight);
};

UIComboBox.prototype.getDropDownStyle = function(){
	let style = this.element.getAttribute("dropdown-style");
	if(!style){ style = "popup"; }
	return style;
};
UIComboBox.prototype.setDropDownStyle = function(style){
	switch(style){
		case "popup" :
		case "dropdown" : break;
		default: style = "popup"; break;
	}
	this.element.setAttribute("dropdown-style", style);
};

UIComboBox.prototype.getSelectedIndex = function(){
	return this.$element.children("select")[0].selectedIndex-1;
};
UIComboBox.prototype.setSelectedIndex = function(index){
	if(typeof(index) != "number"){ index = 0;}
	let select = this.$element.children("select")[0];
	select.selectedIndex = index+1;
	if(select.selectedIndex < 0){ select.selectedIndex = 0; }
	for(let i=0;i<select.options.length;i++){
		select.options[i].removeAttribute("selected");
	}
	let op = select.options[select.selectedIndex];
	op.setAttribute("selected","selected");
	this.$element.children(".ui-content")[0].innerText = op.text;
};

UIComboBox.prototype.getText = function(){
	return this.$element.children(".ui-content")[0].innerText;
};
UIComboBox.prototype.setText = function(text){
	let index = -1;
	this.$element.children("select").children("option").each(function(i){
		if(i==0){return;}
		if(this.text == text){ index = i-1; return false;}
	});
	this.SelectedIndex = index;
};

UIComboBox.prototype.getValue = function(){
	return this.$element.children("select").val();
};
UIComboBox.prototype.setValue = function(value){
	let index = -1;
	this.$element.children("select").children("option").each(function(i){
		if(i==0){return;}
		if(this.value == value){ index = i-1; return false;}
	});
	this.SelectedIndex = index;
};

UIComboBox.prototype.getItemList = function(){
	let ds = this.internal.itemlist;
	if(ds){ return ds; }
	let combo = this;
	let content = this.$element.children(".ui-content")[0];
	let select = this.$element.children("select")[0];
	function optionex(op){
		op.content = content;
		op.__defineGetter__("Text" , function() { return this.text; });
		op.__defineSetter__("Text" , function(v){ this.text = v;    });
		op.__defineGetter__("Value", function() { return this.value; });
		op.__defineSetter__("Value", function(v){ this.value = v;    });
		return op;
	}
	ds = [];
	ds.AddItem = function(text,value){
		let oidx = select.selectedIndex;
		let op = optionex(new Option());
		op.text = text;
		op.value = value;
		$(select).append(op);
		this.push(op);
		select.selectedIndex = oidx;
		return op;
	};
	ds.RemoveItem = function(value){
		let _this = this;
		$(select).children("option").each(function(i){
			if(i==0){return;}
			if(this.value == value){
				$(this).remove();
				if(this.selected){
					content.innerText = "";
					select.selectedIndex = -1;
				}
				_this.splice(_this.indexOf(this),1);
				return false;
			}
		});
	};
	$(select).children("option").each(function(i){
		if(i==0){return;}
		ds.push(optionex(this));
	});
	this.internal.itemlist = ds;
	return ds;
};
UIComboBox.prototype.setItemList = function(arComboxItem){
	let tag = [];
	tag.push("<option selected='selected'></option>");
	if($.isArray(arComboxItem)){
		let op = new Option();
		for(let i=0;i<arComboxItem.length;i++){
			let tv = arComboxItem[i];
			op.text = tv.Text;
			op.value = tv.Value;
			tag.push(op.outerHTML);
		}
	}
	this.internal.itemlist = null;
	this.$element.children("select").html(tag.join(""));
	this.$element.children(".ui-content")[0].innerText = "";
};

/************************************************************************************************/
function UIDatePicker(){
	if(!(this instanceof UIDatePicker)){return new UIDatePicker();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "Text"  , this.getText   , this.setText  );
	UIControls.createProperty(this, "Value" , this.getValue  , this.setValue );
	UIControls.createProperty(this, "Format", this.getFormat , this.setFormat);

	//이벤트
	UIControls.createEventProperty(this, "SelectedDate");
}
UIControls.fn.UIDatePicker = UIDatePicker;
UIDatePicker.prototype = Object.create(UIControl.prototype);
UIDatePicker.prototype.constructor = UIDatePicker;
UIDatePicker.creator = UIControls.creator({
	icon  : "/ide/controls/DomDatePicker.png",
	prefix: "DP_",
	tag   : "span",
	clazz : "ui-datepicker",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<span class='ui-content'></span>"
			+"<span class='ui-icon-image'></span>";
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "120px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "32px";
		}
		control.Value = new Date();
	}
});
UIDatePicker.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("mousedown",".ui-datepicker",function(e){
		e.stopImmediatePropagation();
		let control = UIControls.attach(this);
		let win = top;//top window
		let $$ = win.$;
		if($$(".ui-popup-container").length != 0){ return; }

		let opt = [
			{
				year  : "년",
				month : {
					alias : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
					full  : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
				},
				days : {
					alias : ["일","월","화","수","목","금","토","일"],
					full  : ["일요일","월요일","화요일","수요일","목요일","금요일","토요일","일요일"]
				},
				getYearMonthTag : function(){
						return "<span class='ui-datepicker-calendar-cell year' ><span id='datepicker-year' >1900년</span><span class='arr-down'>▼</span></span>"
									+"<span class='ui-datepicker-calendar-cell month'><span id='datepicker-month'>1월</span><span class='arr-down'>▼</span></span>"
				},
				formatToday : function(dt){
					return "오늘 <span>&nbsp;&nbsp;</span> "
								+dt.getFullYear()+"년 "
								+(dt.getMonth()+1)+"월 "
								+dt.getDate()+"일 "
								+this.days.full[dt.getDay()]+" "
								+"<span class='ui-datepicker-calendar-time'>"
								+" "+( dt.getHours()<12 ? "오전" : "오후" )+" "
								+(dt.getHours()-(dt.getHours()>12?12:0))+":"
								+("0"+dt.getMinutes()).substr(-2)+":"
								+("0"+dt.getSeconds()).substr(-2)
								+"</span>";
				}
			},
			{
				year  : "",
				month : {
					alias : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
					full  : ["January","February","March","April","May","June","July","August","September","October","November","December"]
				},
				days : {
					alias : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
					full  : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
				},
				getYearMonthTag : function(){
						return "<span class='ui-datepicker-calendar-cell month'><span id='datepicker-month'>January</span><span class='arr-down'>▼</span></span>"
									+"<span class='ui-datepicker-calendar-cell year' ><span id='datepicker-year' >1900</span><span class='arr-down'>▼</span></span>"
				},
				formatToday : function(dt){
					return "Today <span>&nbsp;◈&nbsp;</span> "
								+this.month.full[dt.getMonth()]+" "
								+dt.getDate()+"th , "
								+dt.getFullYear()+" "
								+this.days.full[dt.getDay()]+" "
								+"<span class='ui-datepicker-calendar-time'>"
								+" "+( dt.getHours()<12 ? "AM" : "PM" )+" "
								+(dt.getHours()-(dt.getHours()>12?12:0))+":"
								+("0"+dt.getMinutes()).substr(-2)+":"
								+("0"+dt.getSeconds()).substr(-2)
								+"</span>";
				}
			}
		][Lang[Form.Lang].value];

		let calendarTag = [];
		calendarTag.push("<table class='ui-datepicker-calendar' cellspacing='0' cellpadding='0' border='0'>");
		calendarTag.push("<tbody>");
		calendarTag.push("<tr>");
		calendarTag.push("<td class='ui-datepicker-calendar-cell prev'>◀</td>");
		calendarTag.push("<td colspan='5' nowrap>"+opt.getYearMonthTag()+"</td>");
		calendarTag.push("<td class='ui-datepicker-calendar-cell next'>▶</td>");
		calendarTag.push("</tr>");
		calendarTag.push("</tbody>");
		calendarTag.push("<tbody>");
		calendarTag.push("<tr>");
		for(let i=0;i<7;i++){
			calendarTag.push("<td class='ui-datepicker-calendar-cell day'></td>");
		}
		calendarTag.push("</tr>");
		for(let i=0;i<6;i++){
			calendarTag.push("<tr>");
			for(let i=0;i<7;i++){
				calendarTag.push("<td class='ui-datepicker-calendar-cell date'>.</td>");
			}
			calendarTag.push("</tr>");
		}
		calendarTag.push("</tbody>");
		calendarTag.push("</table>");

		let $$popup = $$(win.document.createElement("div"));
		$$popup.addClass("ui-popup-container");
		$$popup.html(""
			+"<div class='ui-popup-back'></div>"
			+"<div class='ui-popup-front'>"
			+  "<div class='ui-popup-form ui-datepicker-calendar'>"
			+    "<div class='ui-popup-title'>"
			+      "<span class='ui-datepicker-calendar-today'>"
			+         "<span id='datepicker-today' class='ui-datepicker-calendar-cell today'></span>"
			+      "</span>"
			+      "<span id='button-popup-close' class='ui-popup-close-button'>r</span>"
			+    "</div>"
			+    calendarTag.join("")
			+  "</div>"
			+"</div>"
		);
		$$(win.document.body).append($$popup);
		$$popup.addClass("visible");

		let today = (function(){
			function _f(){
				let now = new Date();
				let date = new Date(now.getFullYear(),now.getMonth(),now.getDate());
				date.now = arguments.callee;
				date.val = function(){ return now; };
				return date;
			}
			let dt = _f();
			return dt;
		})();
		function setToday(force){
			let $ele = $$("#datepicker-today");
			let _today = force ? today : today.now();
			if(force || today.getTime() != _today.getTime()){
				today = _today;
				$ele.data("value", today);
			}
			$ele.html(opt.formatToday(_today.val()));
		}
		setToday(true);
		let todayTimer = setInterval(setToday,1000);
		$$("#button-popup-close").click(function(){
			$$popup.on("animationend transitionend",function(e){
				clearInterval(todayTimer);
				$$popup.remove();
			}).removeClass("visible").addClass("dispose");
		});
		let MODE = { year : 0, month : 1, day : 2 };
		let mode = MODE.day;
		$$(".ui-datepicker-calendar-cell").click(function(){
			let $this = $$(this);
			if($this.hasClass("year-v")){
				let year = atoi($this.text());
				let month = $$("#datepicker-month").data("month");
				$$("#datepicker-year" ).data("year",year).text(year+opt.year);
				setCellDate(new Date(year,month-1,1));
				return;
			}
			if($this.hasClass("month-v")){
				let year  = $$("#datepicker-year" ).data("year");
				let month = atoi(this.firstElementChild.getAttribute("month"));
				$$("#datepicker-month").data("month",month).text(opt.month.full[month-1]);
				setCellDate(new Date(year,month-1,1));
				return;
			}
			if($this.hasClass("date")){
				//console.log($this.data("date").toLocaleString());
				let evtarg  = {
					before : control.Value,
					after : $this.data("date"),
					cancel : false,
				};
				let evtname = control.OnSelectedDate;
				if(window[evtname]){
					window[evtname].call(control, evtarg);
				}
				if(evtarg.cancel){return;}
				control.Value = evtarg.after;
				$$("#button-popup-close").click();
				return;
			}
			if($this.hasClass("today")){
				mode = MODE.day;
				setCellDate(new Date());
				return;
			}
			if($this.hasClass("prev")){
				let year  = $$("#datepicker-year" ).data("year");
				let month = $$("#datepicker-month").data("month");
				switch(mode){
					case MODE.year:
						setCellYear(atoi($$("td.ui-datepicker-calendar-cell.day:first").text())-49);
						break;
					case MODE.month:
						break;
					case MODE.day:
						if(month == 1){ year -= 1; month = 12;}
						else{ month -= 1; }
						setCellDate(new Date(year,month-1,1));
						break;
				}
				return;
			}
			if($this.hasClass("next")){
				let year  = $$("#datepicker-year" ).data("year");
				let month = $$("#datepicker-month").data("month");
				switch(mode){
					case MODE.year:
						setCellYear(atoi($$("td.ui-datepicker-calendar-cell.date:last").text())+1);
						break;
					case MODE.month:
						break;
					case MODE.day:
						if(month == 12){year += 1;month = 1;}
						else{month += 1;}
						setCellDate(new Date(year,month-1,1));
						break;
				}
				return;
			}
			if($this.hasClass("year")){
				let year  = $$("#datepicker-year" ).data("year");
				mode = MODE.year;
				setCellYear(year-24);
				return;
			}
			if($this.hasClass("month")){
				let month = $$("#datepicker-month").data("month");
				mode = MODE.month;
				setCellMonth(month);
				return;
			}
		});
		let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		function getDaysOfMonth(date) {
			let year = date.getFullYear(), month = date.getMonth()+1;
			if (month == 2) {
				let isLeapYear = ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0))
				if(isLeapYear){ return daysOfMonth[month - 1] + 1; }
			}
			return daysOfMonth[month - 1];
		}
		let selectedDate = control.Value;
		function setCellDate(date){
			mode = MODE.day;
			let days = [];//size=7*6
			let daysCnt = getDaysOfMonth(date);
			let firstDate = new Date(date.getFullYear(),date.getMonth(),1);
			let lastDate  = new Date(date.getFullYear(),date.getMonth(),daysCnt);
			let firstDay = firstDate.getDay();
			let x,y;
			for(x=0,y=firstDay;x<firstDay;x++,y--){
				let dt = new Date( firstDate.getTime() - (24*60*60*1000)*y );
				days.push({ day : dt.getDate(), date : dt, clazz : "opacity",  });
			}
			let clazz = [];
			let now = new Date();
			for(y=0;y<daysCnt;y++,x++){
				clazz.length = 0;
				if(selectedDate.getFullYear() == date.getFullYear() &&
					selectedDate.getMonth() == date.getMonth() &&
					selectedDate.getDate() == (y+1)
				){ clazz.push("selected"); }
				if(now.getFullYear() == date.getFullYear() &&
					now.getMonth() == date.getMonth() &&
					now.getDate() == (y+1)
				){ clazz.push("today"); }
				days.push({ day : y+1, date : new Date(date.getFullYear(),date.getMonth(),y+1), clazz:"", tdclazz: clazz.join(" ") });
			}
			for(y=1;x<42;x++,y++){
				let dt = new Date( lastDate.getTime() + (24*60*60*1000)*y );
				days.push({ day : dt.getDate(), date : dt, clazz : "opacity"  });
			}
			$$("table.ui-datepicker-calendar > tbody > tr:first-child > td.ui-datepicker-calendar-cell").removeClass("hide");
			$$("td.ui-datepicker-calendar-cell.day").each(function(i){
				$$(this).removeClass("year-v hide").html("<span>"+opt.days.alias[i]+"</span>");
			});
			$$("td.ui-datepicker-calendar-cell.date").each(function(i){
				$$(this).removeClass("selected today noselect month-v year-v").data("date", days[i].date).html("<span class='"+days[i].clazz+"'>"+days[i].day+"</span>");
				if(days[i].tdclazz){
					$$(this).addClass(days[i].tdclazz);
				}
			});
			$$("#datepicker-year" ).data("year" ,date.getFullYear()).text(date.getFullYear()+opt.year);
			$$("#datepicker-month").data("month",date.getMonth()+1 ).text(opt.month.full[date.getMonth()]);
		}
		function setCellMonth(month){
			let cmonth = $$("#datepicker-month").data("month");
			let x = 0;
			$$("table.ui-datepicker-calendar > tbody > tr:first-child > td.ui-datepicker-calendar-cell").addClass("hide");
			$$("td.ui-datepicker-calendar-cell.day").removeClass("year-v").addClass("hide");
			$$("td.ui-datepicker-calendar-cell.date").each(function(i){
				let $this = $$(this);
				if(
						1 <= this.parentElement.sectionRowIndex && this.parentElement.sectionRowIndex <= 4 &&
						2 <= this.cellIndex && this.cellIndex <= 4
				){
					$this.removeClass("selected today noselect year-v month-v").addClass("month-v").html("<span month='"+(x+1)+"'>"+opt.month.full[x++]+"</span>");
					if(cmonth == x){ $this.addClass("selected"); }
				}else{
					$this.removeClass("selected today noselect year-v month-v").addClass("noselect").html("<span style='visibility:hidden;'>012345678</span>");
				}
			});
		}
		function setCellYear(year){
			let cyear  = $$("#datepicker-year" ).data("year");
			let cells = [];
			$$("table.ui-datepicker-calendar > tbody > tr:first-child > td.ui-datepicker-calendar-cell").removeClass("hide");
			$$("td.ui-datepicker-calendar-cell.day").each(function(){
				$$(this).removeClass("hide").addClass("year-v");
				cells.push(this);
			})
			$$("td.ui-datepicker-calendar-cell.date").each(function(i){
				$$(this).removeClass("selected today noselect year-v month-v").addClass("year-v");
				cells.push(this);
			});
			$$(cells).each(function(i){
				let $this = $$(this);
				$this.html("<span>"+(year+i)+"</span>");
				if(cyear == (year+i)){ $this.addClass("selected"); }
			});
		}
		setToday();
		setCellDate(selectedDate);
	});
};

UIDatePicker.format = function(date, format){
	return format.replace(/(yyyy|mm|dd)/gi,
					function($1){
						switch($1){
							case 'yyyy': return date.getFullYear();
							case 'mm'  : return ("0"+(date.getMonth()+1)).substr(-2);
							case 'dd'  : return ("0"+date.getDate()).substr(-2);
						}
					}
				);
};
UIDatePicker.parse = function(date, format){
	try{
		let yy, mm, dd;
		if(typeof(date) != "string"){ throw ""; }
		format.replace(/(yyyy|mm|dd)/gi,
			function($1){
				switch($1){
					case 'yyyy': yy = date.substr(format.indexOf($1),4); break;
					case 'mm'  : mm = date.substr(format.indexOf($1),2); break;
					case 'dd'  : dd = date.substr(format.indexOf($1),2); break;
				}
			}
		);
		let iyy = parseInt(yy,10);
		let imm = parseInt(mm,10);
		let idd = parseInt(dd,10);
		if(isNaN(iyy) || isNaN(imm) || isNaN(idd)){ throw ""; }
		return new Date(iyy,imm-1,idd);
	}catch(e){
		return null;
	}
};

UIDatePicker.prototype.getText = function(){
	return this.$element.children(".ui-content")[0].innerText;
};
UIDatePicker.prototype.setText = function(date){
	this.Value = UIDatePicker.parse(date, this.Format);
};

UIDatePicker.prototype.getValue = function(){
	let tick = this.element.getAttribute("tick");
	if(tick == null) return null;
	return new Date(parseInt(tick,10));
};
UIDatePicker.prototype.setValue = function(date){
	if(!(date instanceof Date)){ return; }
	date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	let odate = this.Value;
	if(odate && odate.getTime() == date.getTime()){ return; }
	this.element.setAttribute("tick", date.getTime());
	this.$element.children(".ui-content")[0].innerText = UIDatePicker.format(date, this.Format);
};
UIDatePicker.prototype.getFormat = function(){
	let format = this.element.getAttribute("format");
	if(format == null){ format = "yyyy-mm-dd"; }
	return format;
};
UIDatePicker.prototype.setFormat = function(format){
	//format = [ yyyy, mm, dd ]
	this.element.setAttribute("format", format ? format : "yyyy-mm-dd" );
	this.$element.children(".ui-content")[0].innerText = UIDatePicker.format(this.Value, format);
};


/************************************************************************************************/
function UITab(){
	if(!(this instanceof UITab)){return new UITab();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "TabHeaderVisible" , this.getTabHeaderVisible , this.setTabHeaderVisible );
	UIControls.createProperty(this, "SelectedTabIndex" , this.getSelectedTabIndex , this.setSelectedTabIndex );
	UIControls.createProperty(this, "TabPageCount"     , this.getTabPageCount);

	//이벤트
	UIControls.createEventProperty(this, "ChangedTab");
}
UIControls.fn.UITab = UITab;
UITab.prototype = Object.create(UIControl.prototype);
UITab.prototype.constructor = UITab;
UITab.creator = UIControls.creator({
	icon  : "/ide/controls/DomTab.png",
	prefix: "TP_",
	tag   : "div",
	clazz : "ui-tab",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<div class='ui-tab-heads'>"
			+  "<div class='ui-tab-head ui-tab-selected'>TabPage1</div>"
			+  "<div class='ui-tab-head'>TabPage2</div>"
			+"</div>"
			+"<div class='ui-tab-pages'>"
			+  "<div class='ui-tab-page ui-container ui-tab-selected'ui-class='UITapPage'></div>"
			+  "<div class='ui-tab-page ui-container' ui-class='UITapPage'></div>"
			+"</div>"
			+""
			;
		control.$element.find("div").each(function(){
			this.id = UIControls.newID();
		});
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "100px";
		}
	}
});
UITab.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		if(!Form.iframe.isInclude){ return; }
	}
	$(Form.element).on("click",".ui-tab-head",function(e){
		let control = UIControls.attach($(e.target).parents(".ui-tab:eq(0)")[0]);
		return control.onMouseDownTabHead(e);
	});
};

UITab.prototype.onMouseDownTabHead = function(e){
	let $heads = this.$element.children(".ui-tab-heads");
	let index = -1;
	$heads.children("div").each(function(i){
		if(this == e.target){
			index = i;
			return false;
		}
	});
	let returnValue = true;
	if(this.SelectedTabIndex != index){
		let evtarg = {
			before : { index : this.SelectedTabIndex },
			after  : { index : index },
			cancel : false,
		};
		let evtname = this.OnChangedTab;
		if(window[evtname]){
			returnValue = window[evtname].call(this,evtarg);
		}
		if(!evtarg.cancel){
			this.SelectedTabIndex = index;
		}
	}
	return returnValue;
};

UITab.prototype.getTabHeaderVisible = function(){
	return !this.$element.hasClass("ui-tab-head-hide");
};
UITab.prototype.setTabHeaderVisible = function(visible){
	if(visible == true){ this.$element.removeClass("ui-tab-head-hide"); }
	else{ this.$element.addClass("ui-tab-head-hide"); }
};

UITab.prototype.getSelectedTabIndex = function(){
	let index = -1;
	this.$element.find("> .ui-tab-pages > .ui-tab-page").each(function(i){
		if($(this).hasClass("ui-tab-selected")){
			index = i;
			return false;
		}
	});
	return index;
};
UITab.prototype.setSelectedTabIndex = function(index){
	let skip_eq = arguments[1];
	if(!skip_eq && index == this.SelectedTabIndex){ return; }
	let $heads = this.$element.children(".ui-tab-heads");
	let $pages = this.$element.children(".ui-tab-pages");
	if(index < 0 || index >= $pages.children().length) index = 0;

	$heads.children(".ui-tab-selected").removeClass("ui-tab-selected");
	$pages.children(".ui-tab-selected").removeClass("ui-tab-selected");

	$heads.children("div:eq("+index+")").addClass("ui-tab-selected");
	$pages.children("div:eq("+index+")").addClass("ui-tab-selected");
};

UITab.prototype.getTabPageCount = function(){
	return this.$element.find("> .ui-tab-heads > .ui-tab-head").length;
};

UITab.prototype.addTabPage = function(ids){
	let $heads = this.$element.children(".ui-tab-heads");
	let $pages = this.$element.children(".ui-tab-pages");
	let head_id = UIControls.newID();
	let page_id = UIControls.newID();
	$heads.append("<div class='ui-tab-head' id='"+head_id+"'>새탭</div>");
	$pages.append("<div class='ui-tab-page ui-container' id='"+page_id+"' ui-class='UITapPage'></div>");
	let index = this.TabPageCount-1;
	this.SelectedTabIndex = index;
	return index;
}

UITab.prototype.delTabPage = function(index){
	let $heads = this.$element.children(".ui-tab-heads");
	let $pages = this.$element.children(".ui-tab-pages");
	if($heads.children().length == 1){ return; }
	$heads.children("div:eq("+index+")").remove();
	$pages.children("div:eq("+index+")").remove();
	if($heads.children(".ui-tab-selected").length == 0){
		this.SelectedTabIndex = 0;
	}
};

UITab.prototype.moveTabPage = function(targetIndex, moveIndex){
	if(targetIndex == moveIndex){return;}
	let $heads = this.$element.children(".ui-tab-heads");
	let $pages = this.$element.children(".ui-tab-pages");
	let count = $heads.children().length;
	if(count == 1){ return; }

	let $h0 = $heads.children("div:eq("+targetIndex+")");
	let $p0 = $pages.children("div:eq("+targetIndex+")");

	let $h1 = $heads.children("div:eq("+moveIndex+")");
	let $p1 = $pages.children("div:eq("+moveIndex+")");

	if(!($h0.length == 1 && $p0.length == 1 && $h1.length == 1 && $p1.length == 1)){return;}
	if(targetIndex < moveIndex){
		$h0.insertAfter($h1);
		$p0.insertAfter($p1);
	}else{
		$h0.insertBefore($h1);
		$p0.insertBefore($p1);
	}
};

/************************************************************************************************/
function UITable(){
	if(!(this instanceof UITable)){return new UITable();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "TableLineO" , this.getTableLineO, this.setTableLineO);
	UIControls.createProperty(this, "TableLineH" , this.getTableLineH, this.setTableLineH);
	UIControls.createProperty(this, "TableLineV" , this.getTableLineV, this.setTableLineV);
	UIControls.createProperty(this, "Rows"       , this.getRows      , this.setRows      );
	UIControls.createProperty(this, "Cols"       , this.getCols      , this.setCols      );
	UIControls.createProperty(this, "HeadRows"   , this.getHeadRows  , this.setHeadRows  );
	UIControls.createProperty(this, "DataRows"   , this.getDataRows  );
	UIControls.createProperty(this, "Style"   , this.getStyle  , this.setStyle  );

	//이벤트
	//UIControls.createEventProperty(this, "InternalControlEvent");
}
UIControls.fn.UITable = UITable;
UITable.prototype = Object.create(UIControl.prototype);
UITable.prototype.constructor = UITable;
UITable.creator = UIControls.creator({
	icon  : "/ide/controls/DomTable.png",
	prefix: "TL_",
	tag   : "div",
	clazz : "ui-table",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<table border='0' cellspacing='0' cellpadding='0'>"
			+  "<thead>"
			+    "<tr>"
			+      "<td width='45%' align-h='align-left' align-v='align-middle' type='1'></td>"
			+      "<td width='65%' align-h='align-left' align-v='align-middle' type='1'></td>"
			+    "</tr>"
			+  "</thead>"
			+  "<tbody>"
			+    "<tr height='50%'>"
			+      "<td><div class='ui-table-cell align-left align-middle ui-container'></div></td>"
			+      "<td><div class='ui-table-cell align-left align-middle ui-container'></div></td>"
			+    "</tr>"
			+    "<tr height='50%'>"
			+      "<td><div class='ui-table-cell align-left align-middle ui-container'></div></td>"
			+      "<td><div class='ui-table-cell align-left align-middle ui-container'></div></td>"
			+    "</tr>"
			+  "</tbody>"
			+"</table>"
			;
		control.$element.find(">table>tbody>tr>td>div.ui-table-cell").each(function(){
			this.id = UIControls.newID();
		});
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "350px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "147px";
		}
	}
});
UITable.initialize = function(){
	//window onload 초기화
};

UITable.prototype.getTableLineO = function(){
	return !this.$element.find(">table").hasClass("ui-hide-oline");
};
UITable.prototype.setTableLineO = function(visible){
	if(visible === true){ this.$element.find(">table").removeClass("ui-hide-oline");	}
	else{ this.$element.find(">table").addClass("ui-hide-oline"); }
};

UITable.prototype.getTableLineH = function(){
	return !this.$element.find(">table>tbody").hasClass("ui-hide-hline");
};
UITable.prototype.setTableLineH = function(visible){
	if(visible === true){ this.$element.find(">table>tbody").removeClass("ui-hide-hline");	}
	else{ this.$element.find(">table>tbody").addClass("ui-hide-hline"); }
};

UITable.prototype.getTableLineV = function(){
	return !this.$element.find(">table>tbody").hasClass("ui-hide-vline");
};
UITable.prototype.setTableLineV = function(visible){
	if(visible === true){ this.$element.find(">table>tbody").removeClass("ui-hide-vline");	}
	else{ this.$element.find(">table>tbody").addClass("ui-hide-vline"); }
};

UITable.prototype.getRows = function(){
	return this.element.firstElementChild.tBodies[0].rows.length;
};
UITable.prototype.setRows = function(){

};

UITable.prototype.getCols = function(){
	return this.element.firstElementChild.tHead.rows[0].cells.length;
};
UITable.prototype.setCols = function(){

};
UITable.prototype.getHeadRows = function(){
	return atoi(this.$element.find(">table>tbody").attr("head-rows"),0);
};
UITable.prototype.setHeadRows = function(hrows){
	if(typeof(hrows) != "number") hrows = 0;
	if(isNaN(hrows)) hrows = 0;
	let rows = this.Rows;
	if(hrows > rows){ hrows = rows; }
	this.$element.find(">table>tbody").attr("head-rows",hrows);
};

UITable.prototype.getDataRows = function(){
	return this.Rows-this.HeadRows;
};

UITable.prototype.Cell = function(row, col, property, value){
	let tr = this.element.firstElementChild.tBodies[0].rows[row];
	if(!tr){ return null;	}
	let td = tr.cells[col];
	if(!td){ return null;	}
	let ele = null;
	switch(property){
		case "align-h":
			property = "justify-content";
			switch(value){
				case "left"   : value = "flex-start"; break;
				case "center" : value = "center"    ; break;
				case "right"  : value = "flex-end"  ; break;
			}
			break;
		case "align-v":
			property = "align-items";
			switch(value){
				case "top"    : value = "flex-start"; break;
				case "middle" : value = "center"    ; break;
				case "bottom" : value = "flex-end"  ; break;
			}
			break;
	}
	ele = (property.indexOf("border") == 0) ? td : td.firstElementChild;
	if(arguments.length == 3){
		if(property == "text"){
			/*
			let textNode = ele.firstChild;
			return textNode ? textNode.textContent : "";
			*/
			let $lable = $(ele).children("span.cell-control-label");
			return $lable.length == 0 ? "" : $lable[0].innerText;
		}else{
			let value = ele.style[property] || ele.currentStyle[property];
			switch(property){
				case "justify-content":
					switch(value){
						case "flex-start" : value = "left"  ; break;
						case "center"     : value = "center"; break;
						case "flex-end"   : value = "right" ; break;
					}
					break;
				case "align-items":
					switch(value){
						case "flex-start" : value = "top"   ; break;
						case "center"     : value = "middle"; break;
						case "flex-end"   : value = "bottom"; break;
					}
					break;
			}
			return value;
		}
	}else{
		if(property == "text"){
			/*
			let textNode = ele.firstChild;
			if(!textNode){
				textNode = document.createTextNode("");
				$(ele).prepend(textNode);
			}
			textNode.textContent = value;
			*/

			let $lable = $(ele).children("span.cell-control-label");
			if(value){
				if($lable.length == 0){
					$lable = $("<span class='cell-control-label'></span>");
					$(ele).prepend($lable);
				}
				$lable[0].innerText = value;
			}else if($lable.length != 0){
				$lable.remove();
			}
		}else{
			if(ele.currentStyle[property] != undefined){
				if(!value){ele.style.removeProperty(property);}
				else{ele.style[property] = value;}
				if(!ele.style.cssText){
					ele.removeAttribute("style");
				}
			}
		}
	}
	if(ele.style["border-image"] == "none"){
		ele.style.removeProperty("border-image");
	}
	if(!ele.style.cssText.trim()){
		ele.removeAttribute("style");
	}
};

UITable.prototype.DataCell = function(row, col, property, value){
	if(arguments.length == 3)
		return this.Cell(this.HeadRows+row,col,property);
	else
		this.Cell(this.HeadRows+row,col,property,value);
};

UITable.prototype.getStyle = function(){
	return this.$element.attr("theme");
}
UITable.prototype.setStyle = function(styleName){
	this.$element.removeClass("theme-col theme-row theme-all");
	if(!styleName) return;
	this.$element.addClass("theme-"+styleName);
	this.$element.attr("theme", styleName);
}

/************************************************************************************************/
function UINumberPad(){
	if(!(this instanceof UINumberPad)){return new UINumberPad();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "Shuffle" , this.getShuffle, this.setShuffle);

	//이벤트
	UIControls.createEventProperty(this, "KeyClick");
}
UIControls.fn.UINumberPad = UINumberPad;
UINumberPad.prototype = Object.create(UIControl.prototype);
UINumberPad.prototype.constructor = UINumberPad;
UINumberPad.creator = UIControls.creator({
	icon  : "/ide/controls/DomNumberPad.png",
	prefix: "NP_",
	tag   : "div",
	clazz : "ui-numberpad",
	initialize : function(control){
		control.$.addClass("fixed");
		control.element.innerHTML = ""
			+ "<table class='fixed' border='0' cellspacing='0' cellpadding='0'>"
			+    "<tbody>"
			+      "<tr><td><div>1</div></td><td><div>2</div></td><td><div>3</div></td></tr>"
			+      "<tr><td><div>4</div></td><td><div>5</div></td><td><div>6</div></td></tr>"
			+      "<tr><td><div>7</div></td><td><div>8</div></td><td><div>9</div></td></tr>"
			+      "<tr><td class='fix backspace' key='backspace'><div></div></td><td><div>0</div></td><td class='fix clear' key='clear'><div>정정</div></td></tr>"
			+    "</tbody>"
			+  "</table>"
			+"</div>"
			+"<table class='shuffle' border='0' cellspacing='0' cellpadding='0'>"
			+  "<tbody>"
			+     "<tr><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>"
			+     "<tr><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>"
			+     "<tr><td><div></div></td><td><div></div></td><td><div></div></td><td><div></div></td></tr>"
			+     "<tr><td class='fix shuffle' colspan='2'><div>재배열</div></td><td class='fix backspace' key='backspace'><div></div></td><td class='fix clear' key='clear'><div>정정</div></td></tr>"
			+   "</tbody>"
			+"</table>"
			;
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "200px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "200px";
		}
		control.$.find(" table.fixed > tbody > tr > td").each(function(){
			let $this = $(this);
			$this.attr("key", $this.text());
		});
	}
});
UINumberPad.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("click",".ui-numberpad > table > tbody > tr > td",function(e){
		let $this = $(this);
		let control = UIControls.attach($this.closest(".ui-control")[0]);
		if($this.hasClass("shuffle")){
			control.RunShuffle();
			return;
		}
		let evtarg  = { key : $this.attr("key") };
		if(!evtarg.key) return;
		console.log(evtarg);
		let evtname = control.OnKeyClick;
		if(window[evtname]){
			window[evtname].call(control, evtarg);
		}
	});
	$(".ui-numberpad > table > tbody > tr > td > div").mousedown(btnClick); //버튼클릭 이벤트

	function btnClick(){
		var click = this;
		$(click).animate({
			top: '+=5px',
			opacity: '0.5',
		},50,reback);

		function reback(){
			$(click).animate({
				top: '-=5px',
				opacity: '1',
			},50);

			click = null;
		}
	}
};


UINumberPad.prototype.getShuffle = function(){
	return this.$.hasClass("shuffle");
};

UINumberPad.prototype.setShuffle = function(isShuffle){
	this.$.removeClass("fixed shuffle");
	if(isShuffle){
		this.RunShuffle();
		this.$.addClass("shuffle");
	}else{
		this.$.addClass("fixed");
	}
};

UINumberPad.prototype.RunShuffle = function(){
	this.$.find("table.shuffle > tbody > tr > td").each(function(i){
		let $this = $(this);
		if($this.hasClass("fix")){ return false;}
		$(this).removeClass("key-empty").attr("key","").children("div:eq(0)").html("");
	});

	var empty1 = Math.floor(Math.random()*12);//0-11
	var empty1_r = Math.floor(empty1 / 4);
	var empty2,empty2_r;
	while(true){
		empty2 = Math.floor(Math.random()*12);//0-11
		empty2_r = Math.floor(empty2 / 4);
		if(empty1 != empty2 && empty1_r != empty2_r){
			break;
		}
	}
	this.$.find("table.shuffle > tbody > tr > td:eq("+empty1+")").addClass("key-empty");
	this.$.find("table.shuffle > tbody > tr > td:eq("+empty2+")").addClass("key-empty");

	let map = {};
	this.$.find("table.shuffle > tbody > tr > td").each(function(i){
		let $this = $(this);
		if($this.hasClass("fix") || $this.hasClass("key-empty")){ return;}
		while(true){
			let n = Math.floor(Math.random()*10);//0-9
			let k = "num-"+n;
			if(!map[k]){
				map[k] = "val-"+n;
				$(this).attr("key", n).children("div:eq(0)").html(n);
				break;
			}
		}
	});
};

/************************************************************************************************/
function UIScrollBar(){
	if(!(this instanceof UIScrollBar)){return new UIScrollBar();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "IsVertical" , this.getIsVertical , this.setIsVertical);
	UIControls.createProperty(this, "AutoScroll" , this.getAutoScroll , this.setAutoScroll);
	UIControls.createProperty(this, "ScrollControlID" , this.getScrollControlID , this.setScrollControlID);

	//이벤트
}
UIControls.fn.UIScrollBar = UIScrollBar;
UIScrollBar.prototype = Object.create(UIControl.prototype);
UIScrollBar.prototype.constructor = UIScrollBar;
UIScrollBar.creator = UIControls.creator({
	icon  : "/ide/controls/UIScrollBar.png",
	prefix: "SB_",
	tag   : "span",
	clazz : "ui-scrollbar",
	initialize : function(control){
		control.element.innerHTML = ""
			+"<span class='track'></span>"
			+"<span class='trackbutton'></span>"
			;
		control
		if(control.element.currentStyle.width == "auto"){
			control.element.style.width = "47px";
		}if(control.element.currentStyle.height == "auto"){
			control.element.style.height = "400px";
		}
	}
});
UIScrollBar.initialize = function(){
	//window onload 초기화

	$(Form.element).on("mousedown",".ui-scrollbar > span.trackbutton",function(e){
		 trackButton = this;
		let control = UIControls.attach(this.parentElement);
		var scrollControl = window[control.ScrollControlID];
		if(!scrollControl) return;
		let cw = scrollControl.element.offsetWidth;
		let ch = scrollControl.element.offsetHeight;
		let sw = scrollControl.element.scrollWidth;
		let sh = scrollControl.element.scrollHeight;
		let domele = scrollControl.element;
		if(
			scrollControl.element.firstElementChild &&
			scrollControl.element.firstElementChild.tagName == "IFRAME")
		{
			if(!scrollControl.element.firstElementChild.contentWindow) return;
			let uidoc = scrollControl.element.firstElementChild.contentWindow.$("#ui-document")[0];
			sw = uidoc.scrollWidth;
			sh = uidoc.scrollHeight;
			domele = uidoc;
		}
		if(control.IsVertical){
			if(!(sh > ch)) return;
			let track = control.element.scrollHeight - trackButton.scrollHeight;
			let range = sh-ch;
			let off = Math.round(track/range);
			let track_t = parseInt(trackButton.style.top);
			let pos_y = e.pageY;
			if(isNaN(track_t)) track_t = 0;
			function on_move(me){
				let ml = me.pageY-pos_y;
				let vtop = track_t + ml;
				if(vtop < 0){
					vtop = 0;
				} else if(vtop+trackButton.scrollHeight > control.element.scrollHeight){
					vtop = control.element.scrollHeight - trackButton.scrollHeight;
				}
				trackButton.style.top = vtop+"px";
				let p = (vtop / track) * 100;
				domele.scrollTop = range * (p / 100);
			}
			function on_up(ue){
				$(this).off("mousemove",on_move).on("mouseup",on_up);
				this.releaseCapture();
			}
			$(this).on("mousemove",on_move).on("mouseup",on_up);
			this.setCapture();

		}else{
			if(!(sw > cw)) return;
		}
	});

	if(IdeDesignMode){
		return;
	}
};

UIScrollBar.prototype.getScrollControlID = function(){
	return this.$element.attr("scroll-control-id");
};
UIScrollBar.prototype.setScrollControlID = function(controlID){
	this.$element.attr("scroll-control-id", controlID);
};

UIScrollBar.prototype.getIsVertical = function(){
	return !(this.$element.attr("is-vertical") == "0");
};
UIScrollBar.prototype.setIsVertical = function(isVertical){
	this.$element.attr("is-vertical", isVertical ? "1" : "0");
};

UIScrollBar.prototype.getAutoScroll = function(){
	return !(this.$element.attr("auto-scroll") == "0");
};
UIScrollBar.prototype.setAutoScroll = function(isAutoScroll){
	this.$element.attr("auto-scroll", isAutoScroll ? "1" : "0");
};

UIScrollBar.prototype.Invalidate = function(){
	if(!this.Visible) return;
	var scrollControl = window[this.ScrollControlID];
	if(!scrollControl) return;
	let cw = scrollControl.element.offsetWidth;
	let ch = scrollControl.element.offsetHeight;
	let sw = scrollControl.element.scrollWidth;
	let sh = scrollControl.element.scrollHeight;
	if(
		scrollControl.element.firstElementChild &&
		scrollControl.element.firstElementChild.tagName == "IFRAME")
	{
		if(!scrollControl.element.firstElementChild.contentWindow) return;
		let uidoc = scrollControl.element.firstElementChild.contentWindow.$("#ui-document")[0];
		sw = uidoc.scrollWidth;
		sh = uidoc.scrollHeight;
	}
	if(this.IsVertical){
		if(this.AutoScroll){
			this.$element.css("display", sh > ch ? "flex" : "none");
		}
	}else{
		if(this.AutoScroll){
			this.$element.css("display", sw > cw ? "flex" : "none");
		}
	}
};


/************************************************************************************************/
function UIOnOff(){
	if(!(this instanceof UIOnOff)){return new UIOnOff();}
	UIControl.call(this);

	//속성
	UIControls.createProperty(this, "IsOn" , this.getIsOn , this.setIsOn);

	//이벤트
}
UIControls.fn.UIOnOff = UIOnOff;
UIOnOff.prototype = Object.create(UIControl.prototype);
UIOnOff.prototype.constructor = UIOnOff;
UIOnOff.creator = UIControls.creator({
	icon  : "/ide/controls/UIOnOff.png",
	prefix: "OO_",
	tag   : "span",
	clazz : "ui-onoff",
	initialize : function(control){
		control.element.innerHTML = ""+
			'<div class="bar"><span>OFF</span></div>'+
			'<div class="control"></div>';
	}
});
UIOnOff.initialize = function(){
	//window onload 초기화
	if(IdeDesignMode){
		return;
	}
	$(Form.element).on("click",".ui-onoff",function(e){
		let control = UIControls.attach(this);
		control.IsOn = !control.IsOn;
	});
};

UIOnOff.prototype.getIsOn = function(){
	return this.$element.hasClass("on");
};
UIOnOff.prototype.setIsOn = function(isOn){
	if(isOn == true){
		this.$element.addClass("on");
		this.element.firstElementChild.firstElementChild.innerHTML="ON";
	}else{
		this.$element.removeClass("on");
		this.element.firstElementChild.firstElementChild.innerHTML="OFF";
	}
};


/************************************************************************************************/
// (function(super_class){
// 	if(USE_DEFAULT_STYLE){ return; }

// 	let super_creator =  super_class.creator;
// 	let super_initialize = super_class.initialize;

// 	let f_initialize = super_creator.initialize;
// 	super_creator.initialize = function(control){
// 		f_initialize(control);
// 	};

// 	super_class.initialize = function(){
// 		if(IdeDesignMode){
// 			return;
// 		}
// 		$(Form.element).on("mousedown",".ui-combobox",function(e){
// 			e.stopImmediatePropagation();
// 			let control = UIControls.attach(this);
// 			let win = window;
// 			let $$ = win.$;
// 			let $popup = $$("iframe.iframe-popup");
// 			if($popup.length != 0){ $popup.remove(); }
// 			$popup = $$("<iframe class='iframe-popup' src=''></iframe>");
// 			$$(win.document.body).append($popup);

// 			win.iframe_popup_onloadcompleted = function(iframeWindow){
// 				$popup.css("opacity",1);
// 				return {
// 					items : control.ItemList,
// 					selectedIndex : control.SelectedIndex,
// 					onselect : function(item, index){
// 						control.SelectedIndex = index;
// 						this.close();
// 					},
// 					onclose : function(){
// 						this.close();
// 					},
// 					close : function(){
// 						delete win.iframe_popup_onloadcompleted;
// 						$popup.on("transitionend",function(){
// 							$popup.remove();
// 						}).css("opacity",0);
// 					}
// 				};
// 			};

// 			var querystring = makeQueryString(function(f_add){
// 				f_add("url", "/core/combobox.html");
// 				f_add("title", control.PopupTitle);
// 			});

// 			$popup.attr("src","/core/popup.html"+querystring);
// 		});
// 	};
// })(UIComboBox);

/************************************************************************************************/
//달력 팝업 show
(function(super_class){
	if(USE_DEFAULT_STYLE){ return; }

	let super_creator =  super_class.creator;
	let super_initialize = super_class.initialize;

	super_class.ShowDatePicker = function(option){
		let win = window;
		let $$ = win.$;

		let $popup = $$("iframe.iframe-popup");
		if($popup.length != 0){ $popup.remove(); }
		$popup = $$("<iframe class='iframe-popup' src=''></iframe>");
		$$(win.document.body).append($popup);

		win.iframe_popup_onloadcompleted = function(iframeWindow){
			$popup.css("opacity",1);
			return {
				onselect : function(date){
					if(option && option.onselect){
						option.onselect(date);
					}
					this.close();
				},
				onclose : function(){
					this.close();
				},
				close : function(){
					delete win.iframe_popup_onloadcompleted;
					$popup.on("transitionend",function(){
						$popup.remove();
					}).css("opacity",0);
				}
			};
		};

		var querystring = makeQueryString(function(f_add){
			let dt = null;
			if(option && option.oninitdate){
				dt = option.oninitdate();
			}else{
				dt = new Date();
			}
			let yyyymmdd = dt.getFullYear() + ("0"+(dt.getMonth()+1)).substr(-2) + ("0"+(dt.getDate())).substr(-2);
			let url = "/core/datepicker.html?date="+yyyymmdd;
			f_add("url", url);
			//f_add("title", "날짜선택");
		});
		$popup.attr("src","/core/date-popup.html"+querystring);
	};

	let f_initialize = super_creator.initialize;
	super_creator.initialize = function(control){
		f_initialize(control);
		control.element.style.width  = "200px";
		control.element.style.height = "48px";
	};

	super_class.initialize = function(){
		if(IdeDesignMode){
			return;
		}
		$(Form.element).on("mousedown",".ui-datepicker",function(e){
			e.stopImmediatePropagation();
			let control = UIControls.attach(this);

			UIDatePicker.ShowDatePicker({
				oninitdate : function(){
					return control.Value;
				},
				onselect : function(date){
					control.Value = new Date(date.getTime());
				},
			});
		});
	};
})(UIDatePicker);

/************************************************************************************************/
//공통 팝업 show
(function(super_class){
	if(USE_DEFAULT_STYLE){ return; }

	super_class.prototype.ShowPopup = function(option){
		let win = window;
		let $$ = win.$;

		let $popup = $$("div.iframe-popup");
		if($popup.length != 0){ $popup.remove(); }
		$popup = $$("<div class='iframe-popup'><iframe></iframe></div>");
		$$(win.document.body).append($popup);

		let pop = {
			Close : function(){
				delete win.popup_onload;
				delete win.popup_onclose;
				$popup.on("transitionend",function(){
					try{ option.arg.onclose(); }
					catch(e){}
					$popup.remove();
				}).css("opacity",0);
			}
		};

		win.popup_onload = function(iframeWindow){
			iframeWindow.document.body.focus();
			$popup.css("opacity",1);
			return option.arg;
		};

		win.popup_onclose = function(iframeWindow){
			pop.Close();
		};

		$popup.children("iframe:eq(0)").attr("src",option.url);

		return pop;
	};

	super_class.prototype.ShowNumberPad = function(option){
		let win = window;
		let $$ = win.$;

		let $popup = $$("iframe.iframe-popup");
		if($popup.length != 0){ $popup.remove(); }
		$popup = $$("<iframe class='iframe-popup'></iframe>");
		$$(win.document.body).append($popup);

		win.keyboard_onload = function(iframeWindow){
			iframeWindow.document.body.focus();
			$popup.css("opacity",1);
		};

		win.keyboard_confirm = function(iframeWindow, text){
			delete win.keyboard_onload;
			delete win.keyboard_confirm;
			$popup.on("transitionend",function(){
				if(option.onchange){
					option.onchange(text);
				}
				$popup.remove();
			}).css("opacity",0);
		};

		let url = "/core/keyboard.html"
				+"?type=2"
				+"&password="+option.password
				+"&maxlength="+option.maxlength
				;
		$popup.attr("src",url);
	};
})(UIForm);